// Contact form: validation and hand-off URLs. Pure functions, no React.

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const initialContact = { name: '', email: '', phone: '', subject: 'general', message: '' };

export function validateContactForm(f, msg) {
  const e = {};
  if (f.name.trim().length < 2) e.name = msg.name;
  if (!EMAIL_RE.test(f.email.trim())) e.email = msg.email;
  if (f.phone.trim()) {
    const digits = f.phone.replace(/\D/g, '');
    if (!/^\+?[\d\s()-]+$/.test(f.phone.trim()) || digits.length < 9 || digits.length > 15) e.phone = msg.phone;
  }
  const len = f.message.trim().length;
  if (len < MESSAGE_MIN) e.message = msg.message;
  else if (len > MESSAGE_MAX) e.message = msg.messageLong;
  return e;
}

/** mailto: link to the company address with subject and body prefilled. */
export function emailHandoffUrl(to, subjectLabel, body) {
  const q = `subject=${encodeURIComponent(`${subjectLabel} – website enquiry`)}&body=${encodeURIComponent(body)}`;
  return `mailto:${to}?${q}`;
}

/** WhatsApp click-to-chat link (existing verified number) with the message prefilled. */
export function whatsappHandoffUrl(waBase, subjectLabel, body) {
  return `${waBase}?text=${encodeURIComponent(`${subjectLabel}\n\n${body}`)}`;
}
