import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { waLink } from "@/lib/whatsapp";

export const metadata = { title: "About — Prakriti Mind", description: "Learn about our mission to provide free psychological assistance to everyone." };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark">
              About <span className="text-primary">Prakriti Mind</span>
            </h1>
            <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
              Healing begins with a conversation. We are here to listen.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-dark">Our Mission</h2>
                <p className="mt-4 text-muted leading-relaxed">
                  Prakriti Mind is a non-profit initiative dedicated to making psychological support
                  accessible to everyone. We believe that mental health care is a fundamental right,
                  not a privilege.
                </p>
                <p className="mt-4 text-muted leading-relaxed">
                  Our name draws inspiration from the Sanskrit word &ldquo;Prakriti&rdquo; meaning nature.
                  Just as nature heals and restores, we aim to provide a space where minds can find
                  peace, clarity, and growth.
                </p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-dark">What We Offer</h2>
                <ul className="mt-4 space-y-4">
                  {[
                    { title: "Free 30-Min Sessions", desc: "Confidential one-on-one psychological support, no strings attached." },
                    { title: "Educational Resources", desc: "Blogs and articles to help you understand and manage your mental health." },
                    { title: "Safe Community", desc: "A judgment-free environment where your story matters." },
                  ].map((item) => (
                    <li key={item.title} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                      <div>
                        <strong className="text-dark">{item.title}</strong>
                        <p className="text-sm text-muted mt-0.5">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-16 p-8 rounded-2xl bg-gray-50 text-center">
              <h2 className="text-2xl font-bold text-dark">Our Promise</h2>
              <p className="mt-4 text-muted max-w-2xl mx-auto leading-relaxed">
                Every person who reaches out to Prakriti Mind will be heard with compassion and respect.
                We are committed to providing professional, confidential, and completely free support —
                because everyone deserves someone to talk to.
              </p>
              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center px-6 py-3 rounded-full bg-accent text-white font-semibold hover:bg-accent-dark transition-all"
              >
                Book Your Free Session
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
