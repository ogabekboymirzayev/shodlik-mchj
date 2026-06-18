import { Facebook, Instagram, Send } from "lucide-react";
import { useLang } from "../i18n/LanguageContext.jsx";

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-concrete-light border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <img src="/Logo.png" alt="Shodlik Group Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed">{t("footer.tagline")}</p>
            <div className="mt-6 flex gap-3">
              <a href="https://t.me/SHODLIK_NY" target="_blank" rel="noopener noreferrer" aria-label="Telegram" className="w-9 h-9 rounded border border-white/15 hover:border-accent hover:text-accent flex items-center justify-center transition-colors">
                <Send className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com/shodlik_group_/" aria-label="Instagram" className="w-9 h-9 rounded border border-white/15 hover:border-accent hover:text-accent flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("footer.address")}
            </h4>
            <p className="text-sm leading-relaxed">{t("footer.addressValue")}</p>
            <p className="text-sm mt-3 text-concrete">{t("footer.hours")}: <br/>{t("footer.hoursValue")}</p>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              {t("nav.contact")}
            </h4>
            <ul className="space-y-2 text-sm">
              <li><a href="tel:+998887502222" className="hover:text-accent transition-colors">+998 88 750 22 22</a></li>
              <li><a href="tel:+998887512222" className="hover:text-accent transition-colors">+998 88 751 22 22</a></li>
              <li><a href="mailto:Shodlik.standart@mail.ru" className="hover:text-accent transition-colors">Shodlik.standart@mail.ru</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-2 text-xs text-concrete">
          <div>© {year} Shodlik Group. {t("footer.rights")}</div>
          <div>Made by Og'abek Boymirzayev 🇺🇿</div>
        </div>
      </div>
    </footer>
  );
}
