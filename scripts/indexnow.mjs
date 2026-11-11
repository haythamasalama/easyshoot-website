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
// Bing rejects a key for good once it fails to fetch the key file, so never send before the file is live.
const keyLocation = `https://${host}/${key}.txt`;
let live = false;
for (let attempt = 0; attempt < 6 && !live; attempt++) {
  if (attempt) await new Promise(r => setTimeout(r, 10_000));
  live = await fetch(keyLocation, { cache: "no-store" }).then(r => r.ok && r.text()).then(t => t?.trim() === key).catch(() => false);
}
if (!live) {
  console.log(`IndexNow: ${keyLocation} doesn't serve the key yet; nothing sent`);
  process.exit(0);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host, key, keyLocation, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URLs${res.ok ? "" : ` ${await res.text()}`}`);
