import { useEffect, useRef, useState } from "react";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

/** easeOutCubic easing function */
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

/**
 * Animate a numeric count-up.
 * @param {number} target   - final number to count to
 * @param {number} duration - animation duration in ms
 * @param {function} setter - React state setter
 */
function animateCount(target, duration, setter) {
  const start = performance.now();
  function step(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutCubic(progress);
    setter(Math.round(eased * target));
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

export default function About() {
  const { t } = useLang();
  const stats = t("about.stats");

  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal();

  // Count-up state: one entry per stat
  const STATS_COUNT = 4;
  const [counts, setCounts] = useState(() => Array(STATS_COUNT).fill(0));
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!statsVisible || hasAnimated.current) return;
    hasAnimated.current = true;

    if (!Array.isArray(stats)) return;

    stats.forEach((s, i) => {
      const raw = String(s.value).replace(/\D/g, "");
      const num = parseInt(raw, 10);
      if (!isNaN(num)) {
        animateCount(num, 2000, (val) =>
          setCounts((prev) => {
            const next = [...prev];
            next[i] = val;
            return next;
          })
        );
      }
    });
  }, [statsVisible, stats]);

  return (
    <section id="about" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div ref={headingRef} className={`reveal-left${headingVisible ? " is-visible" : ""}`}>
            <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
              {t("about.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight">
              {t("about.title")}
            </h2>
            <div className="mt-6 h-1 w-16 bg-accent" />
          </div>
          <div>
            <p className="text-lg text-ink/75 leading-relaxed">{t("about.body")}</p>
          </div>
        </div>

        <div
          ref={statsRef}
          className={`mt-16 grid grid-cols-2 lg:grid-cols-4 gap-px bg-concrete-light rounded-md overflow-hidden border border-concrete-light reveal${statsVisible ? " is-visible" : ""}`}
        >
          {Array.isArray(stats) &&
            stats.map((s, i) => {
              // Determine if this stat has a numeric component
              const rawNum = parseInt(String(s.value).replace(/\D/g, ""), 10);
              const hasSuffix = /[+]/.test(String(s.value));
              const isNumeric = !isNaN(rawNum);

              let displayValue;
              if (isNumeric && statsVisible) {
                displayValue = counts[i] + (hasSuffix ? "+" : "");
              } else {
                displayValue = s.value;
              }

              return (
                <div
                  key={i}
                  className="bg-white p-6 lg:p-8 text-center hover:bg-ink hover:text-white transition-colors duration-300 group"
                >
                  <div className="text-3xl lg:text-4xl font-bold text-ink group-hover:text-accent transition-colors">
                    {displayValue}
                  </div>
                  <div className="mt-2 text-sm uppercase tracking-wider text-concrete group-hover:text-concrete-light">
                    {s.label}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
