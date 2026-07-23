"use client";
import { useMemo, useState } from "react";
import { Calendar, Clock, Search, Tag, User } from "lucide-react";
import { useInView } from "react-intersection-observer";

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
  all: "همه",
  technology: "تکنولوژی",
  tutorial: "آموزشی",
  design: "طراحی",
  career: "مسیر شغلی",
};

export default function Blog() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<TabName>("all");

  const posts: BlogPost[] = [
    {
      id: 1,
      title: "ساخت رابط‌های کاربری مدرن با Next.js و Tailwind CSS",
      excerpt: "کشف کنید که Next.js و Tailwind CSS چگونه با هم همکاری می‌کنند تا رابط‌های کاربری خیره‌کننده و با عملکرد بالا ایجاد کنند.",
      date: "۱۵ دسامبر ۲۰۲۴",
      category: "technology",
      readTime: 5,
      author: "مسعود جعفری",
    },
    {
      id: 2,
      title: "تسلط بر TypeScript: الگوهای پیشرفته",
      excerpt: "نگاهی عمیق به انواع پیشرفته، جنریک‌ها و الگوهای TypeScript که توسعه شما را ارتقا خواهند داد.",
      date: "۲۸ نوامبر ۲۰۲۴",
      category: "tutorial",
      readTime: 8,
      author: "مسعود جعفری",
    },
    {
      id: 3,
      title: "آینده انیمیشن‌های وب",
      excerpt: "آخرین روندهای انیمیشن‌های وب را کشف کنید و چگونه تجربه‌های کاربری لذت‌بخش ایجاد کنید.",
      date: "۱۰ اکتبر ۲۰۲۴",
      category: "design",
      readTime: 4,
      author: "مسعود جعفری",
    },
    {
      id: 4,
      title: "از توسعه‌دهنده júnior به senior",
      excerpt: "سفر من و درس‌های Learned از پیشرفت از یک توسعه‌دهنده júnior به senior.",
      date: "۵ سپتامبر ۲۰۲۴",
      category: "career",
      readTime: 6,
      author: "مسعود جعفری",
    },
  ];

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
    <section ref={ref} className={`mx-auto max-w-7xl px-6 py-32 scroll-mt-28 relative overflow-hidden mt-4 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 right-20 w-96 h-96 bg-foreground/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
          وبلاگ
        </h1>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          افکار، آموزش‌ها و بینش‌هایی در مورد توسعه وب
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-12">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-4 top-1/2 -translate-x-1/2 text-muted-foreground" size={18} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="جستجوی مقالات..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-background/50 border border-border/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 transition-all backdrop-blur-sm"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-200 ${
                activeCategory === cat
                  ? "bg-foreground text-background shadow-lg shadow-foreground/10"
                  : "bg-background/30 text-muted-foreground hover:text-foreground hover:bg-foreground/10 border border-border/10"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">مقاله‌ای یافت نشد</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="group relative rounded-3xl border border-border/10 bg-background/30 p-6 hover:bg-background/60 hover:border-border/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-foreground/5"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-foreground/10 text-foreground/70 text-xs font-medium">
                  <Tag size={12} />
                  {categoryLabels[
                    post.category === "technology"
                      ? 1
                      : post.category === "tutorial"
                        ? 2
                        : post.category === "design"
                          ? 3
                          : post.category === "career"
                            ? 4
                            : 0
                  ]}
                </span>
              </div>

              <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-foreground/80 transition-colors">
                {post.title}
              </h3>

              <p className="text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                {post.excerpt}
              </p>

              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="inline-flex items-center gap-1">
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock size={14} />
                  {post.readTime} دقیقه
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                  <User size={14} />
                  {post.author}
                </span>
                <button className="inline-flex items-center gap-1 text-sm font-medium text-foreground hover:text-foreground/80 transition-colors">
                  ادامه مطلب
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
