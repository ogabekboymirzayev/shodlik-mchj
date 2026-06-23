import { useEffect, useState } from "react";
import { Menu, X, Globe, Phone } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Navbar() {
  const { t, lang, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#home",       label: t("nav.home") },
    { href: "#about",      label: t("nav.about") },
    { href: "#services",   label: t("nav.services") },
    { href: "#calculator", label: lang === "ru" ? "Калькулятор" : "Kalkulyator" },
    { href: "#projects",   label: t("nav.projects") },
    { href: "#contact",    label: t("nav.contact") },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ink/95 backdrop-blur border-b border-white/10" : "bg-ink/40 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 lg:h-20">
        <a href="#home" className="flex items-center gap-2 group">
          <img src="/Logo.png" alt="Shodlik Group Logo" className="h-10 w-auto object-contain" />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-concrete-light hover:text-white text-sm font-medium tracking-wide transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:flex items-center gap-1.5 text-concrete-light hover:text-white text-sm font-semibold px-3 py-1.5 rounded border border-white/15 hover:border-white/40 transition-colors"
            aria-label="Toggle language"
          >
            <Globe className="w-4 h-4" />
            {lang === "uz" ? "UZ" : "RU"}
          </button>

          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-white p-2"
            aria-label={open ? "Menyuni yopish" : "Menyuni ochish"}
            aria-expanded={open}
            aria-controls="mobile-nav-menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav-menu" className="md:hidden bg-ink border-t border-white/10 px-4 py-4 space-y-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex items-center text-concrete-light hover:text-white text-base font-medium py-2.5 border-b border-white/[0.06] last:border-0 transition-colors"
            >
              {l.label}
            </a>
          ))}

          {/* Language toggle */}
          <div className="pt-2">
            <button
              onClick={() => { toggle(); setOpen(false); }}
              className="flex items-center gap-2 text-concrete-light hover:text-white text-sm font-semibold px-3 py-2 rounded-lg border border-white/15 hover:border-white/30 transition-colors w-full"
            >
              <Globe className="w-4 h-4" />
              {lang === "uz" ? "O'zbekcha" : "Русский"}
            </button>
          </div>

          {/* ── Mobile drawer ichidagi CTA ── */}
          {/* MobileStickyCTA bilan duplication bo'lmasligi uchun bu faqat tel: tugma */}
          <div className="pt-2 pb-1">
            <a
              href="tel:+998887502222"
              onClick={() => setOpen(false)}
              className="
                flex items-center justify-center gap-2.5
                w-full py-3.5 rounded-xl
                bg-accent hover:bg-accent-hover
                text-white font-bold text-base
                shadow-lg shadow-accent/30
                transition-all duration-200 active:scale-[0.98]
              "
              aria-label="+998 88 750 22 22 ga qo'ng'iroq qilish"
            >
              <Phone className="w-4 h-4" />
              +998 88 750 22 22
            </a>
          </div>
        </div>
      )}
    </header>
  );
}