import Link from "next/link";
import OpenChatButton from "@/components/OpenChatButton";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-lighter text-primary-dark text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Free Professional Support
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-dark leading-tight">
            Your Mental Health{" "}
            <span className="text-primary">Matters</span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-muted max-w-xl mx-auto leading-relaxed">
            Get a free 30-minute psychological assistance session. Professional care,
            zero cost — because your mind deserves attention.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <OpenChatButton className="inline-flex items-center px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-accent/25 hover:bg-accent-dark hover:shadow-xl hover:shadow-accent/30 transition-all">
              <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              Book Free 30-Min Session
            </OpenChatButton>
            <Link
              href="/blog"
              className="inline-flex items-center px-8 py-3.5 rounded-full border-2 border-primary text-primary font-semibold text-base hover:bg-primary hover:text-white transition-all"
            >
              Read Our Blog
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Confidential
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              30 Minutes
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Professional
            </div>
          </div>
        </div>
      </div>

      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-lighter/50 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary-light/20 blur-3xl" />
    </section>
  );
}
