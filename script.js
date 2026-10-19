(function () {
    var EN = {
        skip: "Skip to content",
        nav_home: "Home",
        nav_about: "About",
        nav_skills: "Skills",
        nav_experience: "Experience",
        nav_contact: "Contact",
        menu_open: "Open menu",
        menu_close: "Close menu",
        hero_alt: "Ranger illustration, the Alej logo",
        about_alt: "Illustration of a ranger with a helmet and gas mask",
        hero_hi: "Hey, I'm",
        hero_sub: "I build fast websites and get them ready for Google so your business gets more customers.",
        cta_whatsapp: "Message me on WhatsApp",
        cta_services: "See what I do",
        about_title: "About Me",
        about_topic: "Technology has always been my thing",
        about_p1: "I grew up surrounded by computers. My mom owned an internet café, and that is where it all started.",
        about_p2: "I couldn't study a tech degree, so I taught myself, one project at a time. Today I work in web development and technical SEO.",
        about_p3: "I build pages that load fast, structure them so Google understands them, and set up tracking to know what is working.",
        quote: "\"Every art aims for the method it adopts to be well suited to the end for which it was adopted.\"",
        quote_book: "Meditations",
        term_label: "Summary",
        t_role: "role",
        t_role_v: "web development + technical SEO",
        t_build: "build with",
        t_measure: "measure with",
        t_struct: "structure",
        t_struct_v: "JSON-LD structured data, sitemaps, robots.txt",
        t_auto: "automate with",
        t_auto_v: "Node.js and AI",
        t_cert: "certification",
        t_lang: "languages",
        t_lang_v: "Spanish, English",
        t_status: "status",
        t_status_v: "open to projects",
        skills_title: "My Skills",
        skills_lead: "What I use every day so a site looks good, loads fast, and gets found on Google.",
        sk_seo: "Technical SEO",
        sk_seo_p: "Crawl and indexing audits, speed, page structure, and structured data that passes Google's tests with zero errors.",
        chip_schema: "Structured data",
        chip_gbp: "Google Business Profile",
        sk_web: "Web development",
        sk_data: "Tracking and cloud",
        exp_title: "What I Do",
        exp_lead: "Over a year in technical SEO for service businesses. Now I build their websites too.",
        sv1: "Websites",
        sv1_p: "Mobile-first sites with a WhatsApp button, ready for Google from day one.",
        sv2: "Google Maps",
        sv2_p: "I create or fix your Business Profile: categories, hours, photos, and a QR code to ask for reviews.",
        sv3: "Technical SEO",
        sv3_p: "Speed, structure, sitemap, and structured data so Google crawls and indexes your site properly.",
        sv4: "Tracking",
        sv4_p: "Analytics, Tag Manager, and Search Console to know how many people find you and reach out.",
        contact_title: "Does your business need to show up on Google?",
        contact_p: "Tell me what you do and I'll tell you how we can work together.",
        email: "Email",
        footer: "Made by"
    };

    var ROLES = {
        es: ["Desarrollador web", "Especialista en SEO técnico", "AWS Cloud Practitioner"],
        en: ["Web Developer", "Technical SEO Specialist", "AWS Cloud Practitioner"]
    };

    var META = {
        es: {
            title: "Diseño de páginas web y SEO en Santo Domingo | Alejandro",
            desc: "Diseño páginas web rápidas para negocios en Santo Domingo y las dejo listas para Google: SEO técnico, Google Maps y Analytics. Escríbeme por WhatsApp."
        },
        en: {
            title: "Web Design and SEO in Santo Domingo, DR | Alejandro",
            desc: "I build fast websites for businesses in Santo Domingo and get them ready for Google: technical SEO, Google Maps and Analytics. Message me on WhatsApp."
        }
    };

    var ES = {};
    var lang = "es";

    function store(key, value) {
        try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
    }

    function read(key) {
        try { return localStorage.getItem(key); } catch (e) { return null; }
    }

    // Save the Spanish copy already in the HTML so we can switch back.
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
        ES[el.getAttribute("data-i18n")] = el.textContent;
    });
    document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
        ES[el.getAttribute("data-i18n-alt")] = el.getAttribute("alt");
    });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
        ES[el.getAttribute("data-i18n-aria")] = el.getAttribute("aria-label");
    });
    ES.menu_close = "Cerrar menú";

    function t(key) {
        var dict = lang === "en" ? EN : ES;
        return dict[key] !== undefined ? dict[key] : ES[key];
    }

    function applyLang(next) {
        lang = next === "en" ? "en" : "es";
        document.documentElement.lang = lang;

        document.querySelectorAll("[data-i18n]").forEach(function (el) {
            el.textContent = t(el.getAttribute("data-i18n"));
        });
        document.querySelectorAll("[data-i18n-alt]").forEach(function (el) {
            el.setAttribute("alt", t(el.getAttribute("data-i18n-alt")));
        });
        document.querySelectorAll("[data-i18n-aria]").forEach(function (el) {
            el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
        });

        document.title = META[lang].title;
        var desc = document.querySelector('meta[name="description"]');
        if (desc) desc.setAttribute("content", META[lang].desc);

        var sw = document.querySelector(".lang-switch");
        sw.setAttribute("data-active", lang);
        document.querySelectorAll(".lang-btn").forEach(function (b) {
            var on = b.getAttribute("data-lang") === lang;
            b.classList.toggle("is-active", on);
            b.setAttribute("aria-pressed", on ? "true" : "false");
        });

        store("alej-lang", lang);
        restartTypewriter();
    }

    // Typewriter
    var tw = document.querySelector(".typewriter-text");
    var timer = null;
    var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function restartTypewriter() {
        clearTimeout(timer);
        var roles = ROLES[lang];
        if (reduceMotion) {
            tw.textContent = roles.join(" / ");
            return;
        }
        var i = 0, j = 0, deleting = false;
        function step() {
            var word = roles[i];
            tw.textContent = word.substring(0, j);
            if (!deleting && j === word.length) {
                deleting = true;
                timer = setTimeout(step, 1400);
                return;
            }
            if (deleting && j === 0) {
                deleting = false;
                i = (i + 1) % roles.length;
                timer = setTimeout(step, 400);
                return;
            }
            j += deleting ? -1 : 1;
            timer = setTimeout(step, deleting ? 45 : 90);
        }
        step();
    }

    // Mobile menu
    var toggle = document.querySelector(".menu-toggle");
    var menu = document.getElementById("mobile-menu");

    function setMenu(open) {
        menu.hidden = !open;
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        toggle.setAttribute("aria-label", t(open ? "menu_close" : "menu_open"));
        toggle.querySelector("i").className = open ? "ph ph-x" : "ph ph-list";
    }

    toggle.addEventListener("click", function () { setMenu(menu.hidden); });
    menu.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape" && !menu.hidden) { setMenu(false); toggle.focus(); }
    });

    // Language buttons
    document.querySelectorAll(".lang-btn").forEach(function (b) {
        b.addEventListener("click", function () { applyLang(b.getAttribute("data-lang")); });
    });

    // Reveal animations. Once an element has finished animating, its reveal
    // classes are removed so hover effects and normal transitions take over.
    var items = document.querySelectorAll(".reveal");

    function settle(el) {
        var d = parseFloat(getComputedStyle(el).getPropertyValue("--d")) || 0;
        var t = parseFloat(getComputedStyle(el).getPropertyValue("--t")) || 0.9;
        setTimeout(function () {
            el.classList.remove("reveal", "is-visible");
            el.removeAttribute("data-anim");
        }, d + t * 1000 + 50);
    }

    if (reduceMotion || !("IntersectionObserver" in window)) {
        items.forEach(function (el) {
            el.classList.remove("reveal");
            el.removeAttribute("data-anim");
        });
    } else {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    settle(entry.target);
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
        items.forEach(function (el) { io.observe(el); });
    }

    document.getElementById("year").textContent = new Date().getFullYear();

    var saved = read("alej-lang");
    applyLang(saved === "en" ? "en" : "es");
})();
