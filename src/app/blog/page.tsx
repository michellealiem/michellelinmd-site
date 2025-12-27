import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Blog",
  description: "My thoughts on AI, medical education, and building things without code.",
};

const BLUR_FADE_DELAY = 0.04;

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <section>
      <BlurFade delay={BLUR_FADE_DELAY}>
        <Link 
          href="/" 
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-blue-500 dark:hover:text-blue-400 transition-colors mb-6"
        >
          <ArrowLeft className="size-4" />
          Back to home
        </Link>
      </BlurFade>
      <BlurFade delay={BLUR_FADE_DELAY * 1.5}>
        <h1 className="font-medium text-2xl mb-8 tracking-tighter">Blog</h1>
      </BlurFade>
      {posts
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post, id) => (
          <BlurFade delay={BLUR_FADE_DELAY * 2 + id * 0.05} key={post.slug}>
            <Link
              className="flex gap-4 mb-8 group"
              href={`/blog/${post.slug}`}
            >
              {/* Thumbnail */}
              {post.metadata.image && (
                <div className="flex-shrink-0 w-32 h-20 sm:w-48 sm:h-28 relative rounded-lg overflow-hidden">
                  <Image
                    src={post.metadata.image}
                    alt={post.metadata.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              {/* Content */}
              <div className="flex flex-col justify-center">
                <h2 className="font-medium text-lg tracking-tight text-foreground group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {post.metadata.title}
                </h2>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {post.metadata.summary}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
