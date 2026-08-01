import Link from "next/link";
import OpenChatButton from "@/components/OpenChatButton";

export default function CtaSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-primary to-primary-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-white blur-3xl" />
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-accent-light blur-3xl" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
          Ready to Take the First Step?
        </h2>
        <p className="mt-4 text-primary-light text-lg max-w-xl mx-auto">
          Your 30-minute free session is just a click away. No commitments, no charges — just care.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <OpenChatButton className="inline-flex items-center px-8 py-3.5 rounded-full bg-accent text-white font-semibold text-base shadow-lg shadow-black/20 hover:bg-accent-dark hover:shadow-xl transition-all">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Book Your Free Session
          </OpenChatButton>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 rounded-full border-2 border-white/30 text-white font-semibold text-base hover:bg-white/10 transition-all"
          >
            Get In Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
