import { useState, useMemo } from "react";
import { Calculator, Layers, Weight, ArrowRight, ChevronDown } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

// ─── Constants ────────────────────────────────────────────────────────────────

const WIDTH_OPTIONS = [
  { value: 1.0, label: "1.0 m" },
  { value: 1.2, label: "1.2 m" },
];

const LENGTH_OPTIONS = [1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.1];

const BUFFER_OPTIONS = [
  { value: 0.05, label: "+5%" },
  { value: 0.10, label: "+10%" },
];

const SLAB_THICKNESS = 0.22; // m
const CONCRETE_DENSITY = 2400; // kg/m³

// ─── Helper ───────────────────────────────────────────────────────────────────

function calcResults({ area, width, length, buffer }) {
  if (!area || area <= 0) return null;
  const slabArea = width * length;
  const slabVolume = slabArea * SLAB_THICKNESS;
  const slabWeight = slabVolume * CONCRETE_DENSITY; // kg
  const requiredRaw = area / slabArea;
  const requiredWithBuffer = Math.ceil(requiredRaw * (1 + buffer));
  const totalWeight = requiredWithBuffer * slabWeight;
  return {
    slabArea: slabArea.toFixed(2),
    slabWeight: Math.round(slabWeight),
    requiredSlabs: requiredWithBuffer,
    totalWeightKg: Math.round(totalWeight).toLocaleString("uz-UZ"),
    totalWeightTon: (totalWeight / 1000).toFixed(2),
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function ResultCard({ icon: Icon, label, value, unit, accent }) {
  return (
    <div
      className={`relative flex flex-col gap-1 rounded-xl p-4 border transition-all duration-300 ${
        accent
          ? "bg-accent/10 border-accent/40"
          : "bg-white/5 border-white/10"
      }`}
    >
      <span className="flex items-center gap-2 text-concrete text-xs font-medium uppercase tracking-widest">
        <Icon className={`w-3.5 h-3.5 ${accent ? "text-accent" : "text-concrete"}`} />
        {label}
      </span>
      <span
        className={`text-2xl sm:text-3xl font-bold leading-none ${
          accent ? "text-accent" : "text-white"
        }`}
      >
        {value}
      </span>
      {unit && (
        <span className="text-concrete-light text-xs mt-0.5">{unit}</span>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function PlitaCalculator() {
  const [area, setArea] = useState("");
  const [width, setWidth] = useState(1.2);
  const [length, setLength] = useState(3.0);
  const [buffer, setBuffer] = useState(0.10);

  const { ref, isVisible } = useScrollReveal();

  const results = useMemo(
    () => calcResults({ area: parseFloat(area), width, length, buffer }),
    [area, width, length, buffer]
  );

  return (
    <section
      id="calculator"
      className="py-20 lg:py-28 bg-ink text-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ── Heading ── */}
        <div
          ref={ref}
          className={`max-w-2xl reveal${isVisible ? " is-visible" : ""}`}
        >
          <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold flex items-center gap-2">
            <Calculator className="w-3.5 h-3.5" />
            Hisob-kitob
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
            Plita kalkulyatori
          </h2>
          <p className="mt-4 text-concrete-light text-lg leading-relaxed">
            Kerakli temir-beton plitalar sonini va umumiy og'irligini avtomatik
            hisoblang.
          </p>
        </div>

        {/* ── Card ── */}
        <div
          className={`mt-12 bg-[#1a1a1a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl shadow-black/60 reveal${isVisible ? " is-visible" : ""}`}
          style={{ transitionDelay: "120ms" }}
        >
          <div className="grid lg:grid-cols-2">
            {/* ── Left: Inputs ── */}
            <div className="p-6 sm:p-8 border-b border-white/10 lg:border-b-0 lg:border-r">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-concrete-light uppercase tracking-widest mb-6">
                <Layers className="w-4 h-4 text-accent" />
                Kirish ma'lumotlari
              </h3>

              <div className="flex flex-col gap-6">
                {/* Total area */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="calc-area"
                    className="text-sm font-medium text-concrete-light"
                  >
                    Umumiy maydon (m²)
                  </label>
                  <input
                    id="calc-area"
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Masalan: 120"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-base placeholder-concrete/50 outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 [-moz-appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>

                {/* Width – radio */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-concrete-light">
                    Plita eni
                  </span>
                  <div className="flex gap-3">
                    {WIDTH_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setWidth(opt.value)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                          width === opt.value
                            ? "bg-accent border-accent text-white shadow-lg shadow-accent/30"
                            : "bg-white/5 border-white/15 text-concrete-light hover:border-accent/50 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Length – select */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="calc-length"
                    className="text-sm font-medium text-concrete-light"
                  >
                    Plita uzunligi (m)
                  </label>
                  <div className="relative">
                    <select
                      id="calc-length"
                      value={length}
                      onChange={(e) => setLength(parseFloat(e.target.value))}
                      className="w-full appearance-none bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-base outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-200 cursor-pointer"
                    >
                      {LENGTH_OPTIONS.map((l) => (
                        <option key={l} value={l} className="bg-[#1a1a1a] text-white">
                          {l.toFixed(1)} m
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-concrete" />
                  </div>
                </div>

                {/* Buffer – toggle */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-medium text-concrete-light">
                    Isrofgarchilik zahirasi
                  </span>
                  <div className="flex gap-3">
                    {BUFFER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setBuffer(opt.value)}
                        className={`flex-1 py-3 rounded-xl text-sm font-semibold border transition-all duration-200 cursor-pointer ${
                          buffer === opt.value
                            ? "bg-accent border-accent text-white shadow-lg shadow-accent/30"
                            : "bg-white/5 border-white/15 text-concrete-light hover:border-accent/50 hover:text-white"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-concrete text-xs mt-0.5">
                    Standart tavsiya: <strong className="text-concrete-light">+10%</strong>
                  </p>
                </div>
              </div>
            </div>

            {/* ── Right: Results ── */}
            <div className="p-6 sm:p-8 flex flex-col">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-concrete-light uppercase tracking-widest mb-6">
                <Weight className="w-4 h-4 text-accent" />
                Natijalar
              </h3>

              {results ? (
                <div className="flex flex-col gap-4 flex-1">
                  {/* Slab specs */}
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard
                      icon={Layers}
                      label="1 plita maydoni"
                      value={results.slabArea}
                      unit="m² (uzunlik × en)"
                    />
                    <ResultCard
                      icon={Weight}
                      label="1 plita og'irligi"
                      value={results.slabWeight.toLocaleString("uz-UZ")}
                      unit="kg"
                    />
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-white/10 my-1" />

                  {/* Required slabs */}
                  <ResultCard
                    icon={Layers}
                    label={`Kerakli plitalar soni (${buffer === 0.10 ? "+10%" : "+5%"} zahira bilan)`}
                    value={results.requiredSlabs}
                    unit="dona (yuqoriga yaxlitlangan)"
                    accent
                  />

                  {/* Weights */}
                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard
                      icon={Weight}
                      label="Umumiy og'irlik"
                      value={results.totalWeightKg}
                      unit="kg"
                    />
                    <ResultCard
                      icon={Weight}
                      label="Umumiy og'irlik"
                      value={results.totalWeightTon}
                      unit="tonna"
                    />
                  </div>

                  {/* Formula note */}
                  <p className="text-concrete text-xs leading-relaxed mt-auto pt-2 border-t border-white/10">
                    Formula: uzunlik × en × 0.22 m × 2 400 kg/m³
                  </p>
                </div>
              ) : (
                /* Placeholder when no area entered */
                <div className="flex-1 flex flex-col items-center justify-center gap-4 py-8">
                  <div className="w-16 h-16 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                    <Calculator className="w-7 h-7 text-accent" />
                  </div>
                  <p className="text-concrete text-sm text-center leading-relaxed max-w-xs">
                    Hisob-kitobni boshlash uchun{" "}
                    <span className="text-concrete-light font-medium">
                      umumiy maydonni
                    </span>{" "}
                    kiriting
                  </p>
                  {/* Ghost skeleton cards */}
                  <div className="w-full grid grid-cols-2 gap-3 mt-2 opacity-20 pointer-events-none select-none">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="h-16 rounded-xl bg-white/5 border border-white/10 animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ── CTA Footer ── */}
          <div className="px-6 sm:px-8 py-5 bg-white/[0.03] border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-concrete-light text-sm text-center sm:text-left">
              Narx buyurtma hajmi va yetkazib berish manziliga qarab belgilanadi.
            </p>
            <a
              href="#contact"
              className="group inline-flex items-center gap-2 bg-accent hover:bg-accent-hover text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:scale-[1.02] whitespace-nowrap"
            >
              Narx so'rash
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
