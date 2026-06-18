import { Send, MessageCircle } from "lucide-react";

export default function FloatingContactButtons() {
  return (
    <div className="floating-contact" aria-label="Contact quick actions">
      <a
        href="https://t.me/+998887502222"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn floating-contact__btn--telegram"
        aria-label="Telegram orqali yozing"
        title="Telegram orqali yozing"
      >
        <Send className="w-6 h-6" />
      </a>

      <a
        href="https://wa.me/998887502222"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-contact__btn floating-contact__btn--whatsapp"
        aria-label="WhatsApp orqali yozing"
        title="WhatsApp orqali yozing"
      >
        <MessageCircle className="w-6 h-6" />
      </a>
    </div>
  );
}
