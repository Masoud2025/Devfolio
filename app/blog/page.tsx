// app/blog/page.tsx
"use client";
import { motion } from "framer-motion";
import { useLang } from "@/context/LangContext";
import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, UserIcon, ClockIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function BlogPage() {
  const { lang } = useLang();
  const isRTL = lang === "fa";

  const blogPosts = [
    {
      id: 1,
      title: lang === "fa" ? "آموزش Next.js 14" : "Next.js 14 Tutorial",
      excerpt: lang === "fa" 
        ? "آموزش کامل Next.js 14 با رویکرد عملی و پروژه‌محور" 
        : "Complete Next.js 14 tutorial with practical and project-based approach",
      image: "/blog/nextjs.jpg",
      date: lang === "fa" ? "۱۴۰۳/۰۴/۱۵" : "2024/07/15",
      readTime: lang === "fa" ? "۵ دقیقه" : "5 min",
      author: lang === "fa" ? "مسعود جعفری" : "Masoud Jafari",
      category: lang === "fa" ? "آموزش" : "Tutorial",
    },
    {
      id: 2,
      title: lang === "fa" ? "بهترین کتاب‌های برنامه‌نویسی" : "Best Programming Books",
      excerpt: lang === "fa"
        ? "معرفی بهترین کتاب‌های برنامه‌نویسی برای یادگیری عمیق و حرفه‌ای"
        : "Introducing the best programming books for deep and professional learning",
      image: "/blog/books.jpg",
      date: lang === "fa" ? "۱۴۰۳/۰۴/۱۰" : "2024/07/10",
      readTime: lang === "fa" ? "۴ دقیقه" : "4 min",
      author: lang === "fa" ? "مسعود جعفری" : "Masoud Jafari",
      category: lang === "fa" ? "معرفی کتاب" : "Book Review",
    },
    {
      id: 3,
      title: lang === "fa" ? "معماری Microservices" : "Microservices Architecture",
      excerpt: lang === "fa"
        ? "مبانی و اصول معماری میکروسرویس‌ها با مثال‌های عملی"
        : "Fundamentals and principles of microservices architecture with practical examples",
      image: "/blog/microservices.jpg",
      date: lang === "fa" ? "۱۴۰۳/۰۴/۰۵" : "2024/07/05",
      readTime: lang === "fa" ? "۷ دقیقه" : "7 min",
      author: lang === "fa" ? "مسعود جعفری" : "Masoud Jafari",
      category: lang === "fa" ? "معماری نرم‌افزار" : "Software Architecture",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 py-8 md:py-12 pb-24 md:pb-32"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/"
          className="p-2 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ArrowLeftIcon className="w-5 h-5" />
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold">
          {lang === "fa" ? "وبلاگ" : "Blog"}
        </h1>
      </div>

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="border border-gray-300 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="relative w-full aspect-video bg-gray-200 dark:bg-gray-800 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <span className="absolute top-3 right-3 text-xs px-2 py-1 rounded-full bg-black/70 backdrop-blur-sm">
                {post.category}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 flex-1 flex flex-col">
              <h2 className="text-lg font-semibold mb-2 line-clamp-2 hover:underline transition-colors">
                <Link href={`/blog/${post.id}`}>{post.title}</Link>
              </h2>
              
              <p className="text-sm mb-3 line-clamp-2 flex-1">
                {post.excerpt}
              </p>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-3 text-xs pt-3 border-t border-gray-200 dark:border-gray-700">
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3.5 h-3.5" />
                  {post.date}
                </span>
                <span className="flex items-center gap-1">
                  <ClockIcon className="w-3.5 h-3.5" />
                  {post.readTime}
                </span>
                <span className="flex items-center gap-1 ml-auto">
                  <UserIcon className="w-3.5 h-3.5" />
                  <span>{post.author}</span>
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Empty State */}
      {blogPosts.length === 0 && (
        <div className="text-center py-16">
          <p>
            {lang === "fa" ? "هنوز پستی منتشر نشده است" : "No posts published yet"}
          </p>
        </div>
      )}
    </motion.div>
  );
}