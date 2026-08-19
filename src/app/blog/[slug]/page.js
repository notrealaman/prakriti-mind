import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import posts from "@/data/posts";
import { waLink } from "@/lib/whatsapp";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return { title: `${post.title} — Prakriti Mind`, description: post.excerpt };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="flex-1">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="mb-8">
            <Link href="/blog" className="text-sm text-muted hover:text-primary transition-colors">
              &larr; Back to Blog
            </Link>
          </div>
          <span className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-primary-lighter text-primary-dark mb-4">
            {post.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-dark leading-tight mt-3">{post.title}</h1>
          <time className="block mt-4 text-sm text-muted">{post.date}</time>
          {post.coverImage && (
            <div className="mt-8 rounded-2xl overflow-hidden">
              <img src={post.coverImage} alt={post.title} className="w-full h-auto object-cover max-h-[480px]" />
            </div>
          )}
          <div className="mt-10 prose prose-gray max-w-none">
            {post.content ? (
              post.content.split("\n").map((line, i) => {
                if (line.startsWith("**") && line.endsWith("**")) {
                  return <h2 key={i} className="text-xl font-bold text-dark mt-8 mb-4">{line.replace(/\*\*/g, "")}</h2>;
                }
                if (line.startsWith("- ")) {
                  return <li key={i} className="text-muted ml-4">{line.slice(2)}</li>;
                }
                if (line.match(/^\d+\.\s/)) {
                  const match = line.match(/^\d+\.\s(.+)/);
                  return match ? (
                    <div key={i} className="flex gap-2 mt-2">
                      <span className="font-bold text-primary shrink-0">{line.split(".")[0]}.</span>
                      <span className="text-muted">{match[1]}</span>
                    </div>
                  ) : null;
                }
                const imgMatch = line.match(/^!\[(.*?)\]\((.*?)\)$/);
                if (imgMatch) {
                  return <img key={i} src={imgMatch[2]} alt={imgMatch[1]} className="w-full rounded-xl my-6 object-cover max-h-[400px]" />;
                }
                if (line.trim() === "") return null;
                return <p key={i} className="text-muted leading-relaxed mt-4">{line}</p>;
              })
            ) : (
              <p className="text-muted leading-relaxed">
                Full article coming soon. In the meantime, we invite you to book a free 30-minute session with our team to discuss this topic in person.
              </p>
            )}
          </div>

          <div className="mt-12 pt-8 border-t border-gray-100">
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 rounded-full bg-accent text-white font-semibold shadow-lg shadow-accent/25 hover:bg-accent-dark transition-all"
            >
              Book a Free Session
            </a>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
