import Link from "next/link";

export default function AboutPreview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark leading-tight">
              We Believe{" "}
              <span className="text-primary">Healing Begins</span> With a Conversation
            </h2>
            <p className="mt-6 text-muted leading-relaxed text-base sm:text-lg">
              At Prakriti Mind, we provide free 30-minute psychological assistance
              sessions to anyone in need. We publish articles and resources to spread
              mental health awareness and help you build resilience.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-lighter flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-dark">Compassionate Care</h3>
                  <p className="text-sm text-muted mt-1">Judgment-free support from qualified professionals</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-light/20 flex items-center justify-center shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-dark">Always Free</h3>
                  <p className="text-sm text-muted mt-1">No hidden costs, ever. Mental health support for everyone</p>
                </div>
              </div>
            </div>
            <Link
              href="/about"
              className="mt-8 inline-flex items-center text-primary font-semibold hover:text-primary-dark transition-colors"
            >
              Know More About Us
              <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          <div className="relative">
            <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-primary-lighter to-secondary-light/20 flex items-center justify-center">
              <div className="text-center p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                  </svg>
                </div>
                <p className="text-4xl font-bold text-primary">100+</p>
                <p className="text-muted mt-2">Sessions Completed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
