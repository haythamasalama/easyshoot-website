// The privacy policy, support and accessibility pages exist in English and Arabic; App Store Connect links to the English URLs.
export const CONTACT = "support@easyshoot.app";
const mail = `<a href="mailto:${CONTACT}" dir="ltr">${CONTACT}</a>`;

export interface LegalPage {
  title: string;
  description: string;
  h1: string;
  date?: string;
  lead: string;
  summary?: { icon: string; t: string; b: string }[];
  toc: string;
  sections: { id: string; h2: string; html: string }[];
}

export const LEGAL: Record<"en" | "ar", { privacy: LegalPage; support: LegalPage; accessibility: LegalPage }> = {
  en: {
    privacy: {
      title: "Privacy policy | EasyShoot",
      description: "EasyShoot collects no personal data. Screenshots stay on your Mac: no account, no analytics, no uploads.",
      h1: "Privacy policy",
      date: "Effective 11 November 2026",
      lead: "EasyShoot collects no personal data. Your screenshots stay on your Mac.",
      summary: [
        { icon: "user", t: "No account", b: "Nothing to sign up for." },
        { icon: "cloud", t: "Nothing uploaded", b: "Screenshots never leave your Mac." },
        { icon: "eye", t: "No tracking", b: "No analytics and no ads, in the app or on this site." },
        { icon: "font", t: "One exception", b: "Fonts you download come from Google Fonts." },
      ],
      toc: "On this page",
      sections: [
        { id: "collect", h2: "What EasyShoot collects", html: "<p>Nothing. EasyShoot has no account, no analytics, no advertising and no tracking. We don’t run servers that receive your data, and we don’t sell or share any data with anyone.</p>" },
        { id: "screenshots", h2: "Your screenshots", html: "<ul><li>Screenshots and edits are processed on your Mac and never uploaded.</li><li>They are saved only to the folder you choose, and copied to the clipboard only when you ask.</li><li>Your settings, shortcuts and presets are stored on your Mac in the app’s preferences.</li></ul>" },
        { id: "permissions", h2: "Permissions", html: "<ul><li><strong>Screen Recording</strong> lets EasyShoot capture your screen. It is used only when you take a screenshot.</li></ul>" },
        { id: "online", h2: "When EasyShoot goes online", html: "<ul><li><strong>Fonts.</strong> When you download a font in the editor, EasyShoot fetches it from Google Fonts (fonts.google.com, fonts.googleapis.com, fonts.gstatic.com). Like any web request, Google receives your IP address; see <a href=\"https://policies.google.com/privacy\">Google’s Privacy Policy</a>. Nothing about you or your screenshots is sent.</li><li><strong>Updates.</strong> A few times a day, and when you choose Check for Updates, EasyShoot asks Apple’s App Store (itunes.apple.com) for the number of its newest version. The request names EasyShoot and a country, nothing about you. Turn it off in Settings › General.</li></ul><p>EasyShoot makes no other network requests.</p>" },
        { id: "website", h2: "This website", html: "<ul><li>The site has no cookies, analytics or ads.</li><li>It is hosted on GitHub Pages, which, like any web host, receives your IP address when you visit; see <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement\">GitHub’s Privacy Statement</a>.</li><li>It loads fonts from Google Fonts, so Google receives your IP address.</li><li>If you choose light or dark mode, that choice is saved only in your browser.</li></ul>" },
        { id: "children", h2: "Children", html: "<p>EasyShoot collects no data from anyone, including children.</p>" },
        { id: "contact", h2: "Changes and contact", html: `<p>If this policy changes, the new version will be posted on this page with a new date. Questions: email ${mail} or see the <a href=\"/support.html\">support page</a>.</p>` },
      ],
    },
    support: {
      title: "Support | EasyShoot",
      description: "Help with EasyShoot for Mac: where to find it, Screen Recording permission, shortcuts, where screenshots are saved and how to uninstall.",
      h1: "Support",
      lead: `Questions, problems or ideas: email ${mail}.`,
      summary: [
        { icon: "mac", t: "macOS 14 or later", b: "On Apple silicon or Intel." },
        { icon: "mail", t: "Email us", b: CONTACT },
      ],
      toc: "On this page",
      sections: [
        { id: "where", h2: "Where is EasyShoot after I open it?", html: "<p>It lives in the menu bar at the top of the screen, not in the Dock. If the notch hides the icon, use the shortcuts below. Opening EasyShoot again from Applications shows the Welcome window.</p>" },
        { id: "permission", h2: "It doesn’t take screenshots", html: "<p>EasyShoot needs <strong>Screen Recording</strong> permission. Open System Settings → Privacy &amp; Security → Screen &amp; System Audio Recording and turn on EasyShoot. macOS applies the change after a restart: choose <strong>Welcome &amp; Permissions…</strong> in the menu bar icon and click <strong>Restart</strong>.</p>" },
        { id: "shortcuts", h2: "Shortcuts", html: "<table><tbody><tr><th scope=\"row\">Capture Area</th><td><kbd dir=\"ltr\">⌥⇧⌘4</kbd></td></tr><tr><th scope=\"row\">Capture Window</th><td><kbd dir=\"ltr\">⌥⇧⌘5</kbd></td></tr><tr><th scope=\"row\">Capture Fullscreen</th><td><kbd dir=\"ltr\">⌥⇧⌘3</kbd></td></tr></tbody></table><p>Change them in Settings → Shortcuts.</p>" },
        { id: "saved", h2: "Where are my screenshots saved?", html: "<p>The first time you save without a dialog, EasyShoot asks which folder to use and remembers it. Change it any time in Settings → General → Save location. <strong>Save As…</strong> in the editor lets you pick a place each time.</p>" },
        { id: "uninstall", h2: "How do I uninstall it?", html: "<p>Choose <strong>Quit EasyShoot</strong> in the menu bar icon, then move EasyShoot from Applications to the Trash.</p>" },
        { id: "privacy", h2: "Privacy", html: "<p>EasyShoot collects no personal data and never uploads your screenshots. Read the <a href=\"/privacy.html\">privacy policy</a>.</p>" },
      ],
    },
    accessibility: {
      title: "Accessibility | EasyShoot",
      description: "How EasyShoot works with macOS accessibility: Dark Mode, information not shown by colour alone, clear contrast, keyboard shortcuts and VoiceOver labels.",
      h1: "Accessibility",
      date: "Updated 11 November 2026",
      lead: "EasyShoot is built from the Mac’s own controls, so it follows your accessibility settings. Here is what works today, and what doesn’t yet.",
      summary: [
        { icon: "moon", t: "Dark Mode", b: "Every window follows Light or Dark." },
        { icon: "shapes", t: "Not by colour alone", b: "Selection shows as a ring, outline or handles." },
        { icon: "contrast", t: "Clear contrast", b: "The Mac’s text colours, and Increase Contrast." },
        { icon: "keyboard", t: "Keyboard", b: "Shortcuts for every capture and tool." },
      ],
      toc: "On this page",
      sections: [
        { id: "app-store", h2: "On the App Store", html: "<p>EasyShoot’s App Store page lists three accessibility features for Mac: <strong>Dark Interface</strong>, <strong>Differentiate Without Color Alone</strong> and <strong>Sufficient Contrast</strong>. We list a feature only when it works across the app’s common tasks: capturing, marking up, and copying or saving.</p>" },
        { id: "dark", h2: "Dark Mode", html: "<p>The editor, Settings, the Welcome window, Quick Access and the capture overlays follow your Mac’s Light or Dark appearance, and switch when you change it. Your screenshots and the colours of your marks stay as you made them.</p>" },
        { id: "colour", h2: "Not by colour alone", html: "<ul><li>The selected tool, tab or option is marked by a filled shape, not only a colour, and VoiceOver reads it as selected.</li><li>The selected colour swatch has a ring around it.</li><li>Selected marks on the screenshot show an outline and handles.</li><li>Permission status shows a symbol and a word, such as Allowed.</li></ul>" },
        { id: "contrast", h2: "Contrast", html: "<p>Text uses the Mac’s label colours, which keep their contrast in Light and Dark. Controls are standard macOS controls, so <strong>Increase Contrast</strong> and <strong>Reduce Transparency</strong> in System Settings › Accessibility › Display apply to them too.</p>" },
        { id: "keyboard", h2: "Keyboard", html: "<ul><li>Capture Area, Capture Window and Capture Fullscreen have global shortcuts you can change in Settings › Shortcuts.</li><li>Every drawing tool has a one-letter key, such as A for Arrow and T for Text.</li><li>Copy, Save, Undo, zoom and the inspector use the usual Mac shortcuts, and Esc cancels a capture.</li></ul>" },
        { id: "voiceover", h2: "VoiceOver and Voice Control", html: "<p>Buttons, tools, menus and settings have names that VoiceOver reads, icon-only buttons included. Drawing marks on a screenshot still needs a pointer, so we don’t list VoiceOver or Voice Control on the App Store yet.</p>" },
        { id: "motion", h2: "Motion", html: "<p>EasyShoot uses few animations, all short fades. Quick Access appears without sliding when <strong>Reduce Motion</strong> is on.</p>" },
        { id: "languages", h2: "Languages and right to left", html: "<p>The whole app comes in English, Arabic, French, German and Spanish, and lays out right to left in Arabic, including the text you type on a screenshot.</p>" },
        { id: "feedback", h2: "Tell us", html: `<p>If something in EasyShoot is hard to use with your setup, email ${mail} and tell us what you use, such as VoiceOver, Switch Control or a larger pointer. We read every message.</p>` },
      ],
    },
  },
  ar: {
    privacy: {
      title: "سياسة الخصوصية | EasyShoot",
      description: "لا يجمع EasyShoot أي بيانات شخصية. لقطاتك تبقى على جهازك: بلا حساب ولا تحليلات ولا رفع.",
      h1: "سياسة الخصوصية",
      date: "سارية من 11 نوفمبر 2026",
      lead: "لا يجمع EasyShoot أي بيانات شخصية. لقطاتك تبقى على جهازك.",
      summary: [
        { icon: "user", t: "بلا حساب", b: "لا يوجد ما تسجّل فيه." },
        { icon: "cloud", t: "لا يُرفع شيء", b: "اللقطات لا تغادر جهازك أبدًا." },
        { icon: "eye", t: "بلا تتبّع", b: "لا تحليلات ولا إعلانات، في التطبيق ولا في هذا الموقع." },
        { icon: "font", t: "استثناء واحد", b: "الخطوط التي تنزّلها تأتي من Google Fonts." },
      ],
      toc: "في هذه الصفحة",
      sections: [
        { id: "collect", h2: "ما الذي يجمعه EasyShoot", html: "<p>لا شيء. لا حساب ولا تحليلات ولا إعلانات ولا تتبّع. ليست لدينا خوادم تستقبل بياناتك، ولا نبيع أي بيانات أو نشاركها مع أحد.</p>" },
        { id: "screenshots", h2: "لقطاتك", html: "<ul><li>تُعالَج اللقطات والتعديلات على جهازك ولا تُرفع إلى أي مكان.</li><li>تُحفظ فقط في المجلد الذي تختاره، ولا تُنسخ إلى الحافظة إلا عندما تطلب ذلك.</li><li>إعداداتك واختصاراتك وإعداداتك المحفوظة مخزّنة على جهازك في تفضيلات التطبيق.</li></ul>" },
        { id: "permissions", h2: "الأذونات", html: "<ul><li><strong>تسجيل الشاشة</strong>: يسمح لـ EasyShoot بالتقاط شاشتك، ويُستخدم فقط عندما تلتقط صورة.</li></ul>" },
        { id: "online", h2: "متى يتصل EasyShoot بالإنترنت", html: "<ul><li><strong>الخطوط.</strong> عندما تنزّل خطًا من المحرر، يجلبه EasyShoot من Google Fonts. ومثل أي طلب على الويب، يصل عنوان IP الخاص بك إلى Google؛ راجع <a href=\"https://policies.google.com/privacy?hl=ar\">سياسة خصوصية Google</a>. لا يُرسَل أي شيء عنك أو عن لقطاتك.</li><li><strong>التحديثات.</strong> بضع مرات في اليوم، وعندما تختار «التحقق من التحديثات»، يسأل EasyShoot متجر App Store من Apple ‏(itunes.apple.com) عن رقم أحدث إصدار منه. الطلب يذكر EasyShoot وبلدًا فقط، ولا شيء عنك. يمكنك إيقافه من الإعدادات › عام.</li></ul><p>لا يجري EasyShoot أي اتصالات أخرى بالشبكة.</p>" },
        { id: "website", h2: "هذا الموقع", html: "<ul><li>لا يستخدم الموقع ملفات تعريف الارتباط (الكوكيز) ولا تحليلات ولا إعلانات.</li><li>الموقع مستضاف على GitHub Pages، ومثل أي استضافة يصلها عنوان IP الخاص بك عند الزيارة؛ راجع <a href=\"https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement\">بيان خصوصية GitHub</a>.</li><li>يحمّل الموقع الخطوط من Google Fonts، فيصل عنوان IP الخاص بك إلى Google.</li><li>إن اخترت الوضع الفاتح أو الداكن، يُحفظ اختيارك في متصفحك فقط.</li></ul>" },
        { id: "children", h2: "الأطفال", html: "<p>لا يجمع EasyShoot بيانات من أي أحد، ومن ذلك الأطفال.</p>" },
        { id: "contact", h2: "التغييرات والتواصل", html: `<p>إذا تغيّرت هذه السياسة، ستُنشر النسخة الجديدة في هذه الصفحة بتاريخ جديد. للأسئلة: راسلنا على ${mail} أو زر <a href=\"/ar/support.html\">صفحة الدعم</a>.</p>` },
      ],
    },
    support: {
      title: "الدعم | EasyShoot",
      description: "مساعدة في EasyShoot للماك: أين تجده، وإذن تسجيل الشاشة، والاختصارات، وأين تُحفظ اللقطات، وطريقة حذفه.",
      h1: "الدعم",
      lead: `للأسئلة أو المشاكل أو الأفكار: راسلنا على ${mail}.`,
      summary: [
        { icon: "mac", t: "macOS 14 أو أحدث", b: "على معالجات Apple أو Intel." },
        { icon: "mail", t: "راسلنا", b: CONTACT },
      ],
      toc: "في هذه الصفحة",
      sections: [
        { id: "where", h2: "أين EasyShoot بعد أن أفتحه؟", html: "<p>يعيش في شريط القوائم أعلى الشاشة، وليس في الـ Dock. إذا أخفت الكاميرا العلوية الأيقونة، استخدم الاختصارات في الأسفل. وعندما تفتح EasyShoot من مجلد التطبيقات تظهر نافذة الترحيب.</p>" },
        { id: "permission", h2: "لا يلتقط صورًا للشاشة", html: "<p>يحتاج EasyShoot إلى <strong>إذن تسجيل الشاشة</strong>. افتح إعدادات النظام ← الخصوصية والأمان ← تسجيل الشاشة وصوت النظام، وفعّل EasyShoot. يطبّق macOS التغيير بعد إعادة التشغيل: اختر <strong>الترحيب والأذونات…</strong> من أيقونة شريط القوائم، ثم اضغط <strong>إعادة التشغيل</strong>.</p>" },
        { id: "shortcuts", h2: "الاختصارات", html: "<table><tbody><tr><th scope=\"row\">التقاط منطقة</th><td><kbd dir=\"ltr\">⌥⇧⌘4</kbd></td></tr><tr><th scope=\"row\">التقاط نافذة</th><td><kbd dir=\"ltr\">⌥⇧⌘5</kbd></td></tr><tr><th scope=\"row\">التقاط الشاشة كاملة</th><td><kbd dir=\"ltr\">⌥⇧⌘3</kbd></td></tr></tbody></table><p>غيّرها من الإعدادات ← الاختصارات.</p>" },
        { id: "saved", h2: "أين تُحفظ لقطاتي؟", html: "<p>أول مرة تحفظ فيها بدون نافذة حفظ، يسألك EasyShoot عن المجلد ويتذكّره. غيّره متى شئت من الإعدادات ← عام ← مكان الحفظ. وخيار <strong>حفظ باسم…</strong> في المحرر يتيح لك اختيار المكان في كل مرة.</p>" },
        { id: "uninstall", h2: "كيف أحذفه؟", html: "<p>اختر <strong>إنهاء EasyShoot</strong> من أيقونة شريط القوائم، ثم انقل EasyShoot من مجلد التطبيقات إلى سلة المهملات.</p>" },
        { id: "privacy", h2: "الخصوصية", html: "<p>لا يجمع EasyShoot أي بيانات شخصية ولا يرفع لقطاتك أبدًا. اقرأ <a href=\"/ar/privacy.html\">سياسة الخصوصية</a>.</p>" },
      ],
    },
    accessibility: {
      title: "إمكانية الوصول | EasyShoot",
      description: "كيف يعمل EasyShoot مع إعدادات إمكانية الوصول في الماك: الوضع الداكن، ومعلومات لا تعتمد على اللون وحده، وتباين واضح، واختصارات لوحة المفاتيح، وأسماء يقرأها VoiceOver.",
      h1: "إمكانية الوصول",
      date: "آخر تحديث 11 نوفمبر 2026",
      lead: "بُني EasyShoot من عناصر الماك نفسها، لذلك يتبع إعدادات إمكانية الوصول عندك. هنا ما يعمل اليوم، وما لم يكتمل بعد.",
      summary: [
        { icon: "moon", t: "الوضع الداكن", b: "كل النوافذ تتبع المظهر الفاتح أو الداكن." },
        { icon: "shapes", t: "ليس باللون وحده", b: "التحديد يظهر بحلقة أو إطار أو مقابض." },
        { icon: "contrast", t: "تباين واضح", b: "ألوان نصوص الماك، وخيار زيادة التباين." },
        { icon: "keyboard", t: "لوحة المفاتيح", b: "اختصار لكل طريقة التقاط ولكل أداة." },
      ],
      toc: "في هذه الصفحة",
      sections: [
        { id: "app-store", h2: "في App Store", html: "<p>تعرض صفحة EasyShoot في App Store ثلاث ميزات لإمكانية الوصول على الماك: <strong>الواجهة الداكنة</strong>، و<strong>التمييز بدون الاعتماد على اللون</strong>، و<strong>التباين الكافي</strong>. لا نذكر ميزة إلا إذا عملت في المهام الأساسية كلها: الالتقاط، والتوضيح، والنسخ أو الحفظ.</p>" },
        { id: "dark", h2: "الوضع الداكن", html: "<p>المحرر والإعدادات ونافذة الترحيب والنسخة المصغّرة بعد الالتقاط وواجهة الالتقاط كلها تتبع مظهر جهازك الفاتح أو الداكن، وتتغيّر فور تغييره. لقطاتك وألوان علاماتك تبقى كما صنعتها.</p>" },
        { id: "colour", h2: "ليس باللون وحده", html: "<ul><li>الأداة أو التبويب أو الخيار المحدد يظهر بشكل ممتلئ، لا بلون فقط، ويقرؤه VoiceOver على أنه محدد.</li><li>حول اللون المختار حلقة.</li><li>العلامات المحددة على اللقطة يظهر حولها إطار ومقابض.</li><li>حالة الأذونات تظهر برمز وكلمة، مثل «مسموح».</li></ul>" },
        { id: "contrast", h2: "التباين", html: "<p>النصوص تستخدم ألوان الماك نفسها، فتحافظ على تباينها في الوضعين الفاتح والداكن. والأزرار وعناصر التحكم هي عناصر macOS القياسية، لذلك يسري عليها خيارا <strong>زيادة التباين</strong> و<strong>تقليل الشفافية</strong> من إعدادات النظام › إمكانية الوصول › شاشة العرض.</p>" },
        { id: "keyboard", h2: "لوحة المفاتيح", html: "<ul><li>التقاط منطقة والتقاط نافذة والتقاط الشاشة كاملة لها اختصارات عامة تغيّرها من الإعدادات › الاختصارات.</li><li>لكل أداة رسم حرف واحد، مثل A للسهم وT للنص.</li><li>النسخ والحفظ والتراجع والتكبير ولوحة الخصائص لها اختصارات الماك المعتادة، وزر Esc يلغي الالتقاط.</li></ul>" },
        { id: "voiceover", h2: "VoiceOver والتحكم الصوتي", html: "<p>الأزرار والأدوات والقوائم والإعدادات لها أسماء يقرؤها VoiceOver، ومنها الأزرار التي تظهر كرمز فقط. لكن رسم العلامات على اللقطة ما زال يحتاج إلى مؤشر، لذلك لا نذكر VoiceOver ولا التحكم الصوتي في App Store بعد.</p>" },
        { id: "motion", h2: "الحركة", html: "<p>يستخدم EasyShoot حركات قليلة، وكلها ظهور واختفاء قصير. وعند تفعيل <strong>تقليل الحركة</strong> تظهر النسخة المصغّرة بعد الالتقاط بدون انزلاق.</p>" },
        { id: "languages", h2: "اللغات والكتابة من اليمين", html: "<p>التطبيق كله متوفر بالعربية والإنجليزية والفرنسية والألمانية والإسبانية، ويُعرض من اليمين إلى اليسار بالعربية، ومعه النص الذي تكتبه على اللقطة.</p>" },
        { id: "feedback", h2: "أخبرنا", html: `<p>إذا كان شيء في EasyShoot صعب الاستخدام مع إعداداتك، راسلنا على ${mail} وأخبرنا بما تستخدمه، مثل VoiceOver أو التحكم بالمفاتيح أو مؤشر أكبر. نقرأ كل رسالة.</p>` },
      ],
    },
  },
};
