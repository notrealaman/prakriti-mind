import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.jpg" alt="Prakriti Mind logo" className="w-9 h-9 rounded-full object-cover" />
              <span className="font-semibold text-lg text-white">
                Prakriti <span className="text-primary-light">Mind</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              Free psychological assistance for everyone. Because mental health is not a luxury — it is a necessity.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h3>
            <ul className="space-y-2.5">
              {["Home", "Blog", "Books", "About", "Session", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                    className="text-sm text-gray-400 hover:text-primary-light transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Support</h3>
            <ul className="space-y-2.5">
              <li>
                <span className="text-sm text-gray-400">Emergency: 24/7 Helpline</span>
              </li>
              <li>
                <a href="tel:+918810584268" className="text-sm text-gray-400 hover:text-primary-light transition-colors">
                  +91 8810584268
                </a>
              </li>
              <li>
                <a href="mailto:amanforsure@gmail.com" className="text-sm text-gray-400 hover:text-primary-light transition-colors">
                  amanforsure@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Follow Us</h3>
            <div className="flex gap-3">
              {["facebook", "twitter", "instagram", "linkedin"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-9 h-9 rounded-full bg-gray-700 flex items-center justify-center hover:bg-primary transition-colors"
                  aria-label={social}
                >
                  <span className="text-xs text-gray-300 uppercase font-bold">{social[0]}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-700 text-center text-sm text-gray-500">
          <Link href="/portal" className="hover:text-primary-light transition-colors">
            Experts Portal
          </Link>
          <span className="mx-3">•</span>
          &copy; {new Date().getFullYear()} Prakriti Mind. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
