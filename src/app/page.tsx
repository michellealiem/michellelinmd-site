import BlurFade from "@/components/magicui/blur-fade";
import BlurFadeText from "@/components/magicui/blur-fade-text";
import { ProjectCard } from "@/components/project-card";
import { PublicationCard } from "@/components/publication-card";
import { ResumeCard } from "@/components/resume-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DATA } from "@/data/resume";
import { getBlogPosts } from "@/data/blog";
import Link from "next/link";
import Markdown from "react-markdown";

const BLUR_FADE_DELAY = 0.04;

export default async function Page() {
  const posts = await getBlogPosts();
  const recentPosts = posts
    .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
    .slice(0, 3);
  return (
    <main className="flex flex-col min-h-[100dvh] space-y-14">
      <section id="hero" className="animated-gradient -mx-6 px-6 -mt-12 pt-12 sm:-mt-24 sm:pt-24 pb-8 rounded-b-3xl">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between">
            <div className="flex-col flex flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <BlurFadeText
                  delay={BLUR_FADE_DELAY}
                  className="text-2xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-display"
                  yOffset={8}
                  text="Dr. Michelle Lin"
                />
                <svg className="w-5 h-5 sm:w-8 sm:h-8 xl:w-9 xl:h-9 inline-block mb-2 sm:mb-3 animate-pulse" viewBox="0 0 24 24" fill="#0099FF" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z"/>
                </svg>
              </div>
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY}
                text="Emergency physician by night."
              />
              <BlurFadeText
                className="max-w-[600px] md:text-xl"
                delay={BLUR_FADE_DELAY * 1.5}
                text="Educator by day."
              />
              <BlurFadeText
                className="max-w-[600px] md:text-lg italic text-muted-foreground"
                delay={BLUR_FADE_DELAY * 2}
                text="AI tinkerer always."
              />
            </div>
            <BlurFade delay={BLUR_FADE_DELAY}>
              <Avatar className="size-32 border">
                <AvatarImage alt={DATA.name} src={DATA.avatarUrl} />
                <AvatarFallback>{DATA.initials}</AvatarFallback>
              </Avatar>
            </BlurFade>
          </div>
        </div>
      </section>
      <section id="about">
        <BlurFade delay={BLUR_FADE_DELAY * 3}>
          <h2 className="text-xl font-bold">About</h2>
        </BlurFade>
        <BlurFade delay={BLUR_FADE_DELAY * 4}>
          <Markdown className="prose max-w-full text-pretty font-sans text-sm text-muted-foreground dark:prose-invert">
            {DATA.summary}
          </Markdown>
        </BlurFade>
      </section>
      {recentPosts.length > 0 && (
        <section id="blog">
          <div className="flex min-h-0 flex-col gap-y-3">
            <BlurFade delay={BLUR_FADE_DELAY * 4.5}>
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">Latest from the Blog</h2>
                <Link href="/blog" className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors">
                  View all →
                </Link>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-3">
              {recentPosts.map((post, id) => (
                <BlurFade key={post.slug} delay={BLUR_FADE_DELAY * 4.6 + id * 0.05}>
                  <Link href={`/blog/${post.slug}`} className="block group">
                    <div className="flex items-center gap-4 p-4 border rounded-lg hover:shadow-lg hover:scale-[1.01] transition-all duration-300">
                      {post.metadata.image && (
                        <img
                          src={post.metadata.image}
                          alt={post.metadata.title}
                          className="w-20 h-14 object-cover rounded-md flex-shrink-0"
                        />
                      )}
                      <div className="flex-grow min-w-0">
                        <h3 className="font-semibold text-sm group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors truncate">
                          {post.metadata.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {post.metadata.summary}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {post.metadata.publishedAt}
                        </p>
                      </div>
                    </div>
                  </Link>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>
      )}
      {/* OPTION A: Work Experience as 2x2 Grid */}
      <section id="work">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 5}>
            <h2 className="text-xl font-bold">Work Experience</h2>
          </BlurFade>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 6 + id * 0.05}
              >
                <Link href={work.href} className="block group">
                  <div className="flex items-center gap-3 p-3 border rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                    <Avatar className="size-10 bg-muted flex-shrink-0">
                      <AvatarImage
                        src={work.logoUrl}
                        alt={work.company}
                        className="object-contain p-1"
                      />
                      <AvatarFallback className="text-xs">{work.company[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow min-w-0">
                      <h3 className="font-semibold text-sm truncate">{work.company}</h3>
                      <p className="text-xs text-muted-foreground">{work.start} - {work.end ?? "Present"}</p>
                      <p className="text-xs text-muted-foreground truncate">{work.title}</p>
                    </div>
                  </div>
                </Link>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="projects">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 7} inView={true}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Featured Work
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Projects & Publications
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A selection of initiatives in medical education, clinical resources, and knowledge translation
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 max-w-[800px] mx-auto">
            {DATA.projects.map((project, id) => (
              <BlurFade
                key={project.title}
                delay={BLUR_FADE_DELAY * 8 + id * 0.05}
                inView={true}
              >
                <ProjectCard
                  href={project.href}
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  dates={project.dates}
                  tags={project.technologies}
                  image={project.image}
                  video={project.video}
                  links={project.links}
                />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="exploring">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 9} inView={true}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  AI Lab
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Currently Exploring
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  AI projects in healthcare and academic medicine
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[900px] mx-auto">
            {DATA.exploring.map((item, id) => (
              <BlurFade
                key={item.title}
                delay={BLUR_FADE_DELAY * 10 + id * 0.05}
                inView={true}
              >
                <div className="flex flex-col h-full p-4 border rounded-lg hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-block px-2 py-0.5 text-[10px] font-medium rounded ${
                      item.status === "In Use" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : item.status === "Planned"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                    }`}>
                      {item.status}
                    </span>
                    {item.irbApproved && (
                      <span className="inline-block px-2 py-0.5 text-[10px] font-medium rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                        IRB Approved
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-sm mb-2">{item.title}</h3>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="publications">
        <div className="space-y-12 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 11} inView={true}>
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Research
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Select Journal Publications
                </h2>
                <p className="text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Peer-reviewed publications organized by theme
                </p>
              </div>
            </div>
          </BlurFade>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-[1000px] mx-auto">
            {DATA.publications.map((pub, id) => (
              <BlurFade
                key={pub.theme}
                delay={BLUR_FADE_DELAY * 12 + id * 0.05}
                inView={true}
              >
                <PublicationCard publication={pub} />
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="skills">
        <div className="flex min-h-0 flex-col gap-y-3">
          <BlurFade delay={BLUR_FADE_DELAY * 13} inView={true}>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <div className="flex flex-wrap gap-1">
            {DATA.skills.map((skill, id) => (
              <BlurFade key={skill} delay={BLUR_FADE_DELAY * 14 + id * 0.05} inView={true}>
                <Badge key={skill}>{skill}</Badge>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>
      <section id="contact">
        <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
          <BlurFade delay={BLUR_FADE_DELAY * 15} inView={true}>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Have a question or want to collaborate? Send me a message.
                </p>
              </div>
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                className="mx-auto max-w-[500px] space-y-4 text-left"
              >
                <input type="hidden" name="form-name" value="contact" />
                <input type="hidden" name="bot-field" />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    required
                    className="w-full px-3 py-2 border rounded-lg bg-background text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 bg-foreground text-background rounded-lg text-sm font-medium hover:bg-foreground/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </BlurFade>
        </div>
      </section>
    </main>
  );
}
