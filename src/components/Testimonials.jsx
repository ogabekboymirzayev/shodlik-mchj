import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

export default function Testimonials() {
  const { t } = useLang();
  const items = t("testimonials.items");
  const sectionRef = useRef(null);

  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const cards = Array.from(el.querySelectorAll("[data-testimonial-card]"));
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 lg:py-28 bg-[#111111] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`max-w-3xl reveal${headingVisible ? " is-visible" : ""}`}
        >
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">{t("testimonials.eyebrow")}</span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {t("testimonials.title")}
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.isArray(items) &&
            items.map((item, index) => (
              <article
                key={index}
                data-testimonial-card
                className="testimonial-card bg-[#1e1e1e] border border-white/10 rounded-xl p-6 md:p-7"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <Quote className="w-7 h-7 text-accent" />

                <p className="mt-5 text-concrete-light leading-relaxed">"{item.quote}"</p>

                <div className="mt-6 flex items-center gap-1 text-accent" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>

                <div className="mt-5">
                  <p className="font-semibold text-white">{item.name}</p>
                  <p className="text-sm text-concrete">{item.role}</p>
                </div>
              </article>
            ))}
        </div>
      </div>
    </section>
  );
}
