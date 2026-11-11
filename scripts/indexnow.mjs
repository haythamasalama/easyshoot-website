// Tells Bing, Yandex and other IndexNow engines which pages changed, right after a deploy.
import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";

const host = "easyshoot.app";
const key = readdirSync("public").find(f => /^[0-9a-f]{32}\.txt$/.test(f))?.replace(".txt", "");
if (!key) throw new Error("No IndexNow key file in public/");

const pages = [...readFileSync("dist/sitemap-0.xml", "utf8").matchAll(/<url>(.*?)<\/url>/g)].map(m => ({
  url: m[1].match(/<loc>([^<]+)<\/loc>/)[1],
  lastmod: m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1],
}));

// SINCE is the commit main pointed at before this push; without it (a manual run) every page is sent.
const since = process.env.SINCE && !/^0+$/.test(process.env.SINCE)
  ? (() => { try { return new Date(Number(execFileSync("git", ["show", "-s", "--format=%ct", process.env.SINCE], { encoding: "utf8" })) * 1000); } catch { return null; } })()
  : null;
const urlList = pages.filter(p => !since || (p.lastmod && new Date(p.lastmod) > since)).map(p => p.url);

if (!urlList.length) {
  console.log("IndexNow: no page content changed in this push");
  process.exit(0);
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation: `https://${host}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs`);
