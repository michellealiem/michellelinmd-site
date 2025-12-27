import BlurFade from "@/components/magicui/blur-fade";
import { getBlogPosts } from "@/data/blog";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
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
              className="flex flex-col space-y-1 mb-4 group"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col">
                <p className="tracking-tight group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                  {post.metadata.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {post.metadata.summary}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {formatDate(post.metadata.publishedAt)}
                </p>
              </div>
            </Link>
          </BlurFade>
        ))}
    </section>
  );
}
