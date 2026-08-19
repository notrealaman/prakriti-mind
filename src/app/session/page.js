import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OpenChatButton from "@/components/OpenChatButton";

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
              <OpenChatButton className="group bg-white rounded-2xl border-2 border-green-100 p-8 text-center hover:border-green-400 hover:shadow-lg transition-all">
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
                  Start Chat
                </span>
              </OpenChatButton>

              <OpenChatButton className="group bg-white rounded-2xl border-2 border-primary/10 p-8 text-center hover:border-primary/40 hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-full bg-primary-lighter flex items-center justify-center mx-auto mb-5 group-hover:bg-primary-light transition-colors">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-dark mb-2">Schedule a Session</h2>
                <p className="text-muted text-sm leading-relaxed mb-6">
                  Start a chat to pick a date and time that works for you.
                </p>
                <span className="inline-flex items-center px-6 py-3 rounded-full bg-primary text-white font-semibold group-hover:bg-primary-dark transition-colors">
                  Schedule Now
                </span>
              </OpenChatButton>
            </div>

            <div className="mt-12 text-center">
              <p className="text-sm text-muted">
                Both options open our on-site chat. Your conversation is private and confidential.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
