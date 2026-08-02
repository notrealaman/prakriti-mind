import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import posts from "@/data/posts";

const colorMap = {
  primary: { badge: "bg-primary-lighter text-primary-dark", link: "text-primary hover:text-primary-dark" },
  secondary: { badge: "bg-secondary-light/20 text-secondary", link: "text-secondary" },
  accent: { badge: "bg-accent/10 text-accent-dark", link: "text-accent" },
};

export const metadata = { title: "Blog — Prakriti Mind", description: "Mental health articles, tips, and awareness resources." };

export default function BlogPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary-lighter via-white to-secondary-light/20 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-dark">
              Our <span className="text-primary">Blog</span>
            </h1>
            <p className="mt-4 text-muted text-lg max-w-xl mx-auto">
              Stories, research, and practical advice to support your mental health journey.
            </p>
          </div>
        </section>

        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {posts.length === 0 ? (
              <div className="text-center py-16 md:py-24">
                <h2 className="text-2xl font-bold text-dark">Articles Coming Soon</h2>
                <p className="text-muted mt-4 max-w-md mx-auto">
                  We are preparing new articles on mental health and well-being. Please check back soon.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const colors = colorMap[post.color] || colorMap.primary;
                return (
                  <article
                    key={post.slug}
                    className="group bg-white rounded-2xl border border-gray-100 p-6 hover:shadow-lg transition-shadow flex flex-col"
                  >
                    <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} mb-4`}>
                      {post.category}
                    </span>
                    <h2 className="text-lg font-bold text-dark leading-snug group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted mt-3 leading-relaxed flex-1">{post.excerpt}</p>
                    <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                      <time className="text-xs text-muted">{post.date}</time>
                      <Link href={`/blog/${post.slug}`} className={`text-sm font-semibold ${colors.link} transition-colors`}>
                        Read More &rarr;
                      </Link>
                    </div>
                  </article>
                );
              })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
