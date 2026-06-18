import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import heroImg from "../assets/hero.jpg";
import sliderImg1 from "../assets/pics/03.JPG";
import slider07 from "../assets/pics/07.jpg";
import slider10 from "../assets/pics/10.jpg";
import slider11 from "../assets/pics/11.jpg";
import slider12 from "../assets/pics/12.jpg";
import slider13 from "../assets/pics/13.jpg";
import { useLang } from "../i18n/LanguageContext.jsx";

const slides = [
  heroImg,
  sliderImg1,
  slider07,
  slider10,
  slider11,
  slider12,
  slider13,
];

const SLIDE_DURATION = 4500; // ms each slide is shown
const FADE_DURATION = 800;   // ms crossfade transition (must match CSS)

export default function Hero() {
  const { t } = useLang();
  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIdx = (current + 1) % slides.length;
      setNext(nextIdx);
      setFading(true);

      // After fade completes, snap current to next and reset
      const cleanup = setTimeout(() => {
        setCurrent(nextIdx);
        setNext(null);
        setFading(false);
      }, FADE_DURATION);

      return () => clearTimeout(cleanup);
    }, SLIDE_DURATION);

    return () => clearInterval(timer);
  }, [current]);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Base (current) slide */}
      <img
        key={`base-${current}`}
        src={slides[current]}
        alt="Shodlik concrete factory"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
      />

      {/* Next slide fading in on top */}
      {next !== null && (
        <img
          key={`next-${next}`}
          src={slides[next]}
          alt="Shodlik concrete factory"
          width={1920}
          height={1080}
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            zIndex: 1,
            opacity: fading ? 1 : 0,
            transition: `opacity ${FADE_DURATION}ms ease`,
          }}
        />
      )}

      {/* Overlays (on top of all slides) */}
      <div className="absolute inset-0 bg-linear-to-r from-ink via-ink/85 to-ink/40" style={{ zIndex: 2 }} />
      <div className="absolute inset-0 bg-linear-to-t from-ink/80 via-transparent to-ink/30" style={{ zIndex: 2 }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40 w-full" style={{ zIndex: 3 }}>
        <div className="max-w-3xl animate-fade-up">
          <span className="inline-block text-accent uppercase tracking-[0.2em] text-xs sm:text-sm font-semibold mb-6">
            {t("hero.eyebrow")}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight">
            {t("hero.title")}
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-concrete-light max-w-2xl leading-relaxed">
            {t("hero.subtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-7 py-4 rounded-md transition-all hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-accent/30"
            >
              {t("hero.cta")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#services"
              className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white font-semibold px-7 py-4 rounded-md transition-colors"
            >
              {t("hero.ctaSecondary")}
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-px bg-linear-to-r from-transparent via-accent/50 to-transparent" style={{ zIndex: 3 }} />
    </section>
  );
}
