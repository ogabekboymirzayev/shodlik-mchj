import { useState } from "react";
import { Send, CheckCircle2, Phone, Mail, MapPin } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function ContactForm() {
  const { t, lang } = useLang();
  const [status, setStatus] = useState("idle");
  const [isSending, setIsSending] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("idle");
    setIsSending(true);

    try {
      const token = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
      const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

      if (!token || !chatId) {
        throw new Error("Missing Telegram configuration");
      }

      const datetime = new Date().toLocaleString(lang === "ru" ? "ru-RU" : "uz-UZ");
      const text = [
        "📋 Yangi ariza!",
        `👤 Ism: ${form.name}`,
        `📞 Telefon: ${form.phone}`,
        `💬 Xabar: ${form.message || "-"}`,
        `🕐 Vaqt: ${datetime}`,
      ].join("\n");

      const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data?.ok) {
        throw new Error("Telegram send failed");
      }

      setStatus("success");
      setForm({ name: "", phone: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    } finally {
      setIsSending(false);
    }
  };

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  return (
    <section id="contact" className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left column: contact info + map */}
          <div>
            <span className="text-accent uppercase tracking-[0.2em] text-xs font-semibold">
              {t("contact.eyebrow")}
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold text-ink leading-tight tracking-tight">
              {t("contact.title")}
            </h2>
            <p className="mt-5 text-lg text-ink/70">{t("contact.subtitle")}</p>

            <ul className="mt-10 space-y-5">
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded bg-ink text-accent flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-concrete">{t("footer.phone")}</div>
                  <a href="tel:+998887502222" className="text-ink font-semibold hover:text-accent transition-colors">
                    +998 88 750 22 22
                  </a>
                  <br />
                  <a href="tel:+998887512222" className="text-ink font-semibold hover:text-accent transition-colors">
                    +998 88 751 22 22
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded bg-ink text-accent flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-concrete">{t("footer.email")}</div>
                  <a href="mailto:Shodlik.standart@mail.ru" className="text-ink font-semibold hover:text-accent transition-colors">
                    Shodlik.standart@mail.ru
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="w-10 h-10 rounded bg-ink text-accent flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-concrete">{t("footer.address")}</div>
                  <div className="text-ink font-semibold">{t("footer.addressValue")}</div>
                </div>
              </li>
            </ul>
          </div>

          {/* Right column: form */}
          <form
            onSubmit={onSubmit}
            className="bg-ink text-white p-8 lg:p-10 rounded-md shadow-2xl border-t-4 border-accent"
          >
            <div className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-wider text-concrete-light mb-2">
                  {t("contact.name")}
                </label>
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={onChange}
                  type="text"
                  className="w-full bg-ink-2 border border-white/10 focus:border-accent rounded px-4 py-3 text-white placeholder-concrete outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-concrete-light mb-2">
                  {t("contact.phone")}
                </label>
                <input
                  required
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  type="tel"
                  placeholder="+998 __ ___ __ __"
                  className="w-full bg-ink-2 border border-white/10 focus:border-accent rounded px-4 py-3 text-white placeholder-concrete outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wider text-concrete-light mb-2">
                  {t("contact.message")}
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={onChange}
                  rows={4}
                  className="w-full bg-ink-2 border border-white/10 focus:border-accent rounded px-4 py-3 text-white placeholder-concrete outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                aria-busy={isSending}
                className="w-full inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-hover text-white font-semibold px-6 py-4 rounded transition-all hover:shadow-lg hover:shadow-accent/30"
              >
                {isSending ? t("contact.sending") : t("contact.submit")}
                <Send className="w-4 h-4" />
              </button>

              {status === "success" && (
                <div className="flex items-center gap-2 text-green-400 text-sm animate-fade-up">
                  <CheckCircle2 className="w-5 h-5" />
                  {t("contact.success")}
                </div>
              )}

              {status === "error" && <div className="text-red-400 text-sm animate-fade-up">{t("contact.error")}</div>}
            </div>
          </form>
        </div>

        {/* Full-width map section below grid (existing) */}
        <div className="mt-12">
          <div className="w-full overflow-hidden rounded-xl border-2 border-[#2a2a2a]">
            <iframe
              title="Shodlik location map"
              src="https://www.google.com/maps?q=41.148628,69.208361&output=embed"
              className="w-full h-62.5 md:h-100"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>

          <a
            href="https://www.google.com/maps/place/41%C2%B008'55.1%22N+69%C2%B012'30.1%22E/@41.148628,69.208361,1727m/data=!3m1!1e3!4m4!3m3!8m2!3d41.148628!4d69.208361?entry=ttu&g_ep=EgoyMDI2MDYxMC4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center justify-center border-2 border-ink text-ink font-semibold px-6 py-3 rounded hover:bg-ink hover:text-white transition-colors"
          >
            {t("contact.directions")}
          </a>
        </div>
      </div>
    </section>
  );
}
