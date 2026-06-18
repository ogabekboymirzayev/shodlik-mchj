import { BadgeCheck } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function CertificatesStandards() {
  const { t } = useLang();
  const items = t("certificates.items");

  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section id="certificates" className="py-20 lg:py-24 bg-[#f8f8f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`max-w-3xl reveal-left${headingVisible ? " is-visible" : ""}`}
        >
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
            {t("certificates.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight">
            {t("certificates.title")}
          </h2>
          <p className="mt-5 text-lg text-ink/70">{t("certificates.subtitle")}</p>
        </div>

        <div
          ref={cardsRef}
          className="mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 lg:gap-6"
        >
          {Array.isArray(items) &&
            items.map((item, index) => (
              <article
                key={index}
                className={`bg-white border border-black/10 rounded-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 reveal-scale${cardsVisible ? " is-visible" : ""}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-11 h-11 rounded-full bg-accent/15 text-accent flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-ink">{item.name}</h3>
                <p className="mt-2 text-sm text-ink/70 leading-relaxed">{item.desc}</p>
              </article>
            ))}
        </div>

        <p className="mt-10 text-sm sm:text-base text-ink/75 font-medium">{t("certificates.note")}</p>
      </div>
    </section>
  );
}
