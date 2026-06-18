import { Layers, Truck, Building2, Box, Footprints, Wrench } from "lucide-react";
import floorImg from "../assets/photo_2026-06-17_03-07-02.jpg";
import roadImg from "../assets/road-slab.jpg";
import wallImg from "../assets/wall-panel.jpg";
import img from "../assets/image.jpg";
import roof from "../assets/roof.png";
import order from "../assets/order.png";
import { useLang } from "../i18n/LanguageContext.jsx";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

const icons = [Layers, Truck, Building2, Box, Footprints, Wrench];
const images = [floorImg, roadImg, wallImg, img, roof, order];

export default function Services() {
  const { t } = useLang();
  const items = t("services.items");

  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal();

  return (
    <section id="services" className="py-20 lg:py-28 bg-ink text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headingRef}
          className={`max-w-3xl reveal${headingVisible ? " is-visible" : ""}`}
        >
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
            {t("services.eyebrow")}
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            {t("services.title")}
          </h2>
          <p className="mt-5 text-lg text-concrete-light">{t("services.subtitle")}</p>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) &&
            items.map((item, i) => {
              const Icon = icons[i] ?? Layers;
              const cardImg = images[i];
              return (
                <article
                  key={i}
                  className={`group relative bg-ink-2 border border-white/10 rounded-md overflow-hidden hover:border-accent transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-accent/10 reveal${headingVisible ? " is-visible" : ""}`}
                  style={{ transitionDelay: `${i * 120}ms` }}
                >
                  {cardImg ? (
                    <div className="aspect-16/10 overflow-hidden bg-ink">
                      <img
                        src={cardImg}
                        alt={item.title}
                        loading="lazy"
                        width={800}
                        height={500}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-16/10 bg-linear-to-br from-ink-2 to-ink flex items-center justify-center">
                      <Icon className="w-16 h-16 text-concrete/60 group-hover:text-accent group-hover:scale-110 transition-all duration-300" />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded bg-accent/15 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="font-bold text-lg text-white">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-concrete-light text-sm leading-relaxed">{item.desc}</p>
                    <a
                      href="#contact"
                      className="mt-5 inline-flex items-center justify-center border border-accent text-accent font-semibold px-4 py-2 rounded hover:bg-accent hover:text-white transition-colors"
                    >
                      {t("services.askPrice")}
                    </a>
                  </div>
                </article>
              );
            })}
        </div>
      </div>
    </section>
  );
}
