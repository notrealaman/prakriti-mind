import Link from "next/link";
import posts from "@/data/posts";

const colorMap = {
  primary: { border: "border-primary/20", badge: "bg-primary-lighter text-primary-dark", link: "text-primary hover:text-primary-dark" },
  secondary: { border: "border-secondary/20", badge: "bg-secondary-light/20 text-secondary", link: "text-secondary" },
  accent: { border: "border-accent/20", badge: "bg-accent/10 text-accent-dark", link: "text-accent" },
};

const latestPosts = posts.slice(0, 6);

export default function BlogPreview() {
  if (posts.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-dark">
              Latest from <span className="text-primary">Our Blog</span>
            </h2>
            <p className="text-muted mt-3 max-w-lg">
              Insights, stories, and practical advice on mental health and well-being.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center text-sm font-semibold text-muted hover:text-primary transition-colors shrink-0"
          >
            View All Articles
            <svg className="w-4 h-4 ml-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestPosts.map((post) => {
            const colors = colorMap[post.color] || colorMap.primary;
            return (
              <article
                key={post.slug}
                className={`group bg-white rounded-2xl border ${colors.border} overflow-hidden hover:shadow-lg transition-shadow flex flex-col`}
              >
                {post.coverImage && (
                  <img src={post.coverImage} alt={post.title} className="w-full h-44 object-cover" />
                )}
                <div className="p-6 flex flex-col flex-1">
                <span className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-semibold ${colors.badge} mb-4`}>
                  {post.category}
                </span>
                <h3 className="text-lg font-bold text-dark leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm text-muted mt-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                  <time className="text-xs text-muted">{post.date}</time>
                  <Link href={`/blog/${post.slug}`} className={`text-sm font-semibold ${colors.link} transition-colors`}>
                    Read More &rarr;
                  </Link>
                </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
