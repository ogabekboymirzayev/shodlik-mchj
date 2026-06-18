import { useLang } from "../i18n/LanguageContext.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const videos = [
  "dlglji0UbUk",
  "vmoPxkPA4ZY",
  "Sq7R764i7BA",
  "PEOyQNaWU0I",
  "Safn9jf5wNo",
];

export default function Projects() {
  const { t } = useLang();
  const videoLabels = t("projects.videos");

  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal();

  return (
    <section id="projects" className="py-20 lg:py-28 bg-ink-2 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`max-w-3xl reveal${headingVisible ? " is-visible" : ""}`}
        >
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
            {t("projects.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {t("projects.title")}
          </h2>
          <p className="mt-5 text-lg text-concrete-light">{t("projects.subtitle")}</p>
        </div>

        <div
          ref={cardsRef}
          className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {videos.map((id, i) => (
            <div
              key={i}
              className={`group relative bg-ink border border-white/10 rounded-md overflow-hidden hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-accent/10 reveal${cardsVisible ? " is-visible" : ""}`}
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="aspect-9/16 w-full overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${id}`}
                  title={Array.isArray(videoLabels) ? videoLabels[i] : `Loyiha ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <p className="text-concrete-light text-sm">
                  {Array.isArray(videoLabels) ? videoLabels[i] : `${t("projects.videoLabel")} ${i + 1}`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}