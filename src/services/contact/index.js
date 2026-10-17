// Contact service. There is no contact backend yet, so the default mode is
// "handoff": the form opens the visitor's own email app or WhatsApp with the
// message prefilled, and the visitor sends it there. Nothing is sent from the
// website and the UI says so.
//
// ┌─────────────────────────────────────────────────────────────────────────┐
// │ INTEGRATION POINT: when the client provides a contact endpoint (or a   │
// │ form service), implement `submitContactMessage` below and set          │
// │ VITE_CONTACT_MODE=api. The form then shows a single "Send Message"     │
// │ button with real loading / success / failure states. Success is only  │
// │ shown when the endpoint confirms it.                                   │
// └─────────────────────────────────────────────────────────────────────────┘

const env = import.meta.env;

export const contactMode = env.VITE_CONTACT_MODE === 'api' ? 'api' : 'handoff';

export class ContactApiNotImplementedError extends Error {
  constructor() {
    super('Contact API is not implemented. Set VITE_CONTACT_MODE=handoff or implement src/services/contact/index.js.');
    this.name = 'ContactApiNotImplementedError';
  }
}

/**
 * @param {{name:string,email:string,phone:string,subject:string,message:string}} _message
 * @returns {Promise<{ok:boolean}>}
 */
// eslint-disable-next-line no-unused-vars
export async function submitContactMessage(_message) {
  // e.g. POST to `${env.VITE_CONTACT_API_URL}` and return { ok: true } only
  // when the server confirms. Never put secrets in VITE_* variables.
  throw new ContactApiNotImplementedError();
}
