import { useEffect, useState, useCallback } from "react";
import { Phone, ArrowRight, X } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

/**
 * MobileStickyCTA
 * ─────────────────────────────────────────────────────────────
 * • Faqat mobile qurilmalarda ko'rinadi (lg:hidden)
 * • Hero section tugagandan keyin (50vh scroll) animatsiya bilan paydo bo'ladi
 * • safe-area-inset-bottom — iPhone X+ home indicator uchun
 * • Backdrop blur + frosted glass effekti
 * • Dismiss tugmasi — foydalanuvchi yashira oladi (session davomida)
 * • #contact ga o'tganda avtomatik yashirinadi (UX improvement)
 * ─────────────────────────────────────────────────────────────
 */
export default function MobileStickyCTA() {
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  // i18n strings (RU qo'llab-quvvatlash bilan)
  const copy = {
    uz: { call: "Qo'ng'iroq", cta: "Narx so'rash" },
    ru: { call: "Позвонить", cta: "Узнать цену" },
  }[lang] ?? { call: "Qo'ng'iroq", cta: "Narx so'rash" };

  const handleScroll = useCallback(() => {
    // Hero (100vh) dan o'tgandan keyin paydo bo'ladi
    setVisible(window.scrollY > window.innerHeight * 0.7);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // boshlang'ich holat
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // #contact ga o'tganda dismiss — forma ko'rinib tursa CTA keraksiz
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setDismissed(true); },
      { threshold: 0.3 }
    );
    const contactSection = document.getElementById("contact");
    if (contactSection) observer.observe(contactSection);
    return () => observer.disconnect();
  }, []);

  // Contact section'dan uzoqlashsa qayta ko'rsat
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (!entry.isIntersecting && visible) setDismissed(false); },
      { threshold: 0 }
    );
    const contactSection = document.getElementById("contact");
    if (contactSection) observer.observe(contactSection);
    return () => observer.disconnect();
  }, [visible]);

  const shouldShow = visible && !dismissed;

  return (
    <div
      role="complementary"
      aria-label="Tezkor aloqa"
      className={`
        fixed bottom-0 inset-x-0 z-[1100]
        lg:hidden
        transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
        ${shouldShow ? "translate-y-0" : "translate-y-full"}
      `}
      /* safe-area-inset-bottom: iPhone X notch / home indicator uchun */
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
    >
      {/* ── Frosted glass backdrop ── */}
      <div className="
        relative
        bg-ink/85 backdrop-blur-2xl
        border-t border-white/[0.12]
        shadow-[0_-8px_32px_rgba(0,0,0,0.4)]
        px-4 pt-3 pb-3
      ">

        {/* ── Dismiss button ── */}
        <button
          onClick={() => setDismissed(true)}
          aria-label="Yashirish"
          className="
            absolute top-2.5 right-3
            w-6 h-6 flex items-center justify-center
            text-concrete/60 hover:text-white
            transition-colors duration-200
          "
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* ── Label ── */}
        <p className="text-center text-[10px] text-concrete/50 uppercase tracking-[0.18em] mb-2.5 font-medium">
          {lang === "ru" ? "Бесплатная консультация" : "Bepul konsultatsiya"}
        </p>

        {/* ── Action buttons ── */}
        <div className="flex items-center gap-2.5">

          {/* Phone call — secondary action */}
          <a
            href="tel:+998887502222"
            id="mobile-cta-call"
            aria-label="+998 88 750 22 22 ga qo'ng'iroq qilish"
            className="
              shrink-0
              flex items-center justify-center gap-1.5
              bg-white/[0.08] hover:bg-white/[0.15]
              border border-white/[0.18] hover:border-white/30
              text-white font-semibold
              h-12 px-4 rounded-xl
              transition-all duration-200
              active:scale-95 active:bg-white/20
              select-none
            "
          >
            <Phone className="w-4 h-4 shrink-0" aria-hidden="true" />
            <span className="text-sm">{copy.call}</span>
          </a>

          {/* Contact CTA — primary action */}
          <a
            href="#contact"
            id="mobile-cta-contact"
            onClick={() => setDismissed(true)}
            className="
              flex-1
              flex items-center justify-center gap-2
              bg-accent hover:bg-accent-hover
              text-white font-bold text-sm
              h-12 rounded-xl
              transition-all duration-200
              shadow-[0_4px_20px_rgba(230,92,0,0.4)]
              hover:shadow-[0_4px_28px_rgba(230,92,0,0.55)]
              active:scale-95 active:shadow-none
              select-none
            "
          >
            <span>{copy.cta}</span>
            <ArrowRight className="w-4 h-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
