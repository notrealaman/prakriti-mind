import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = { title: "Books — Prakriti Mind", description: "Curated reference books on mental health, anxiety, mindfulness, and self-care." };

const books = [
  { title: "The Anxiety and Phobia Workbook", author: "Edmund J. Bourne", category: "Anxiety", desc: "A practical guide with proven techniques to manage anxiety, panic, and phobias.", url: "https://www.google.com/search?tbm=bks&q=The+Anxiety+and+Phobia+Workbook+Edmund+Bourne" },
  { title: "Feeling Good: The New Mood Therapy", author: "David D. Burns", category: "Depression", desc: "Classic CBT-based methods to overcome depression and negative thought patterns.", url: "https://www.google.com/search?tbm=bks&q=Feeling+Good+The+New+Mood+Therapy+David+Burns" },
  { title: "The Body Keeps the Score", author: "Bessel van der Kolk", category: "Trauma", desc: "How trauma reshapes the brain and body — and the paths to healing.", url: "https://www.google.com/search?tbm=bks&q=The+Body+Keeps+the+Score+Bessel+van+der+Kolk" },
  { title: "Wherever You Go, There You Are", author: "Jon Kabat-Zinn", category: "Mindfulness", desc: "Mindfulness meditation for everyday life by the pioneer of MBSR.", url: "https://www.google.com/search?tbm=bks&q=Wherever+You+Go+There+You+Are+Jon+Kabat-Zinn" },
  { title: "Man&rsquo;s Search for Meaning", author: "Viktor E. Frankl", category: "Resilience", desc: "A profound reflection on finding purpose even in the darkest circumstances.", url: "https://www.google.com/search?tbm=bks&q=Man%27s+Search+for+Meaning+Viktor+Frankl" },
  { title: "Daring Greatly", author: "Bren&eacute; Brown", category: "Self-Esteem", desc: "How vulnerability and courage can transform the way we live and connect.", url: "https://www.google.com/search?tbm=bks&q=Daring+Greatly+Brene+Brown" },
  { title: "The Happiness Trap", author: "Russ Harris", category: "Wellness", desc: "An ACT-based guide to building a rich and meaningful life beyond happiness.", url: "https://www.google.com/search?tbm=bks&q=The+Happiness+Trap+Russ+Harris" },
  { title: "Atomic Habits", author: "James Clear", category: "Self-Care", desc: "Tiny changes that lead to remarkable results — essential for building healthy routines.", url: "https://www.google.com/search?tbm=bks&q=Atomic+Habits+James+Clear" },
  { title: "Lost Connections", author: "Johann Hari", category: "Depression", desc: "Uncovering the real causes of depression and the unexpected solutions.", url: "https://www.google.com/search?tbm=bks&q=Lost+Connections+Johann+Hari" },
  { title: "The Power of Now", author: "Eckhart Tolle", category: "Mindfulness", desc: "A guide to spiritual enlightenment through living fully in the present moment.", url: "https://www.google.com/search?tbm=bks&q=The+Power+of+Now+Eckhart+Tolle" },
];

const categoryColors = {
  Anxiety: "text-rose-700 bg-rose-50 border-rose-200",
  Depression: "text-indigo-700 bg-indigo-50 border-indigo-200",
  Trauma: "text-orange-700 bg-orange-50 border-orange-200",
  Mindfulness: "text-emerald-700 bg-emerald-50 border-emerald-200",
  Resilience: "text-cyan-700 bg-cyan-50 border-cyan-200",
  "Self-Esteem": "text-violet-700 bg-violet-50 border-violet-200",
  Wellness: "text-teal-700 bg-teal-50 border-teal-200",
  "Self-Care": "text-sky-700 bg-sky-50 border-sky-200",
};

export default function BooksPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark">
              Reference <span className="text-primary">Books</span>
            </h1>
            <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
              Curated readings to support your mental health journey.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book) => {
                const colors = categoryColors[book.category] || "text-gray-700 bg-gray-50 border-gray-200";
                return (
                  <article
                    key={book.title}
                    className="bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-primary-lighter to-primary-light flex items-center justify-center mb-4 text-primary-dark font-bold text-sm">
                      {book.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>

                    <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold border ${colors} mb-3`}>
                      {book.category}
                    </span>

                    <h2 className="text-base font-bold text-dark leading-snug">{book.title}</h2>
                    <p className="text-xs text-muted mt-1">by {book.author}</p>
                    <p className="text-sm text-muted mt-3 leading-relaxed flex-1">{book.desc}</p>

                    <a
                      href={book.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-flex items-center text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
                    >
                      Get the Book &rarr;
                    </a>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
