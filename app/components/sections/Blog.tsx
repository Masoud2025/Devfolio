"use client";

import { useMemo, useState } from "react";
import { useLanguage } from "../../context/LanguageContext";
import { Calendar, Clock, Search, Tag, User } from "lucide-react";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: number;
  author: string;
  content?: string;
}

type TabName = "all" | "technology" | "tutorial" | "design" | "career";

const categoryLabels: Record<string, string> = {
  all: "All",
  technology: "Technology",
  tutorial: "Tutorial",
  design: "Design",
  career: "Career",
};

export default function Blog() {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TabName>("all");

  const labels = t.blogSection || {
    title: "Blog",
    subtitle: "Thoughts, tutorials, and insights about web development",
    featured: "Featured Post",
    readMore: "Read More",
    searchPlaceholder: "Search articles...",
    noPosts: "No articles found",
    categories: ["All", "Technology", "Tutorial", "Design", "Career"],
  };

  const posts: BlogPost[] = useMemo(() => {
    const raw = t.blogPosts || [];
    return raw.map((p: Record<string, unknown>) => ({
      id: p.id as number,
      title: p.title as string,
      excerpt: p.excerpt as string,
      date: p.date as string,
      category: p.category as string,
      readTime: p.readTime as number,
      author: p.author as string,
      content: p.content as string | undefined,
    }));
  }, [t]);

  const categories: TabName[] = ["all", "technology", "tutorial", "design", "career"];

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || post.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden mt-4">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
          {labels.title}
        </h1>
        <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
          {labels.subtitle}
        </p>
      </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={labels.searchPlaceholder}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-white text-black shadow-lg shadow-black/10"
                    : "bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {labels.categories?.[categories.indexOf(cat)] || categoryLabels[cat] || cat}
              </button>
            ))}
          </div>
        </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-zinc-400 text-lg">{labels.noPosts}</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/20"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-zinc-300">
                  <Tag size={12} />
                  {labels.categories?.[
                    post.category === "technology"
                      ? 1
                      : post.category === "tutorial"
                        ? 2
                        : post.category === "design"
                          ? 3
                          : post.category === "career"
                            ? 4
                            : 0
                  ] || post.category}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-white group-hover:text-white/90 transition-colors">
                {post.title}
              </h3>

              <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime} min read
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                  <User size={14} />
                  {post.author}
                </span>
                <button className="inline-flex items-center gap-1 text-sm font-medium text-white hover:text-white/80 transition-colors">
                  {labels.readMore}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
