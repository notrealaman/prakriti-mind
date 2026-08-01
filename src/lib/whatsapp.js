const PHONE = "918810584268";

const TALK_NOW =
  "Hi Prakriti Mind 🙏 I'm going through a tough time and need someone to talk to right now. Can I speak with someone?";

const SCHEDULE =
  "Hi Prakriti Mind 🙏 I'd like to book a free 30-minute session. Can you help me with the available slots and timings?";

export function waLink(message = TALK_NOW) {
  return `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;
}

export { TALK_NOW, SCHEDULE };
