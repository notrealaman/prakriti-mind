import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { waLink, TALK_NOW, SCHEDULE } from "@/lib/whatsapp";

export const metadata = { title: "Free Session — Prakriti Mind", description: "Talk to someone now or schedule a free 30-minute session." };

export default function SessionPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-lighter text-primary-dark text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Completely Free • Confidential
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-dark">
              Get the Support You <span className="text-primary">Deserve</span>
            </h1>
            <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
              30-minute one-on-one session with a trained volunteer. No charges, no judgments.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              <a
                href={waLink(TALK_NOW)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border-2 border-green-100 p-8 text-center hover:border-green-400 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-green-200 transition-colors">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-dark mb-2">Talk Now</h2>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Connect instantly with a volunteer. Someone will be with you shortly.
                </p>
                <span className="inline-flex items-center px-6 py-3 rounded-full bg-green-600 text-white font-semibold group-hover:bg-green-700 transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  Start Chat on WhatsApp
                </span>
              </a>

              <a
                href={waLink(SCHEDULE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white rounded-2xl border-2 border-primary/10 p-8 text-center hover:border-primary/40 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary-lighter flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-light transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-dark mb-2">Schedule Later</h2>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Pick a date and time that works for you. We&rsquo;ll confirm your session.
                </p>
                <span className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-semibold group-hover:bg-primary-dark transition-colors">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347" />
                  </svg>
                  Schedule on WhatsApp
                </span>
              </a>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted">
                Both options open WhatsApp. Your conversation is private and confidential.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
