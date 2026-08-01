import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/whatsapp";

export const metadata = { title: "Contact — Prakriti Mind", description: "Get in touch with Prakriti Mind for support, inquiries, or collaboration." };

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark">
              Get in <span className="text-primary">Touch</span>
            </h1>
            <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
              We are here for you. Reach out any time.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-dark">Contact Information</h2>
                <p className="mt-4 text-muted leading-relaxed">
                  Whether you have a question, want to collaborate, or need someone to talk to —
                  we are just a message away.
                </p>

                <div className="mt-8 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-lighter flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark">Email</h3>
                      <a href="mailto:hello@prakritimind.org" className="text-muted hover:text-primary transition-colors">
                        hello@prakritimind.org
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-secondary-light/20 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark">Phone / WhatsApp</h3>
                      <a href="tel:+911234567890" className="text-muted hover:text-primary transition-colors">
                        +91 12345 67890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-semibold text-dark">Location</h3>
                      <p className="text-muted">India</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a
                    href={waLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-dark transition-all"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Book a Free Session
                  </a>
                </div>
              </div>

              <div>
                <form className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm space-y-5">
                  <h2 className="text-xl font-bold text-dark">Send Us a Message</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input type="text" placeholder="Your Name" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" />
                    <input type="email" placeholder="Your Email" required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" />
                  </div>
                  <input type="text" placeholder="Subject" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition" />
                  <textarea rows={4} placeholder="Your message..." required className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-dark focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition resize-none" />
                  <button type="submit" className="w-full py-3 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all">
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
