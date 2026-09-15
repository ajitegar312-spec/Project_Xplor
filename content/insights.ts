import type { Post } from "@/types";

// DUMMY posts — replace with CMS later.
export const posts: Post[] = [
  {
    slug: "design-engineering-collaboration",
    category: "Process",
    date: "2026-08-20",
    author: "Maya Putri",
    readMinutes: 6,
    title: { id: "Kolaborasi desain & engineering tanpa friksi", en: "Frictionless design-engineering collaboration" },
    excerpt: { id: "Cara kami menyatukan Figma, token, dan code review.", en: "How we align Figma, tokens, and code reviews." },
    body: { id: "Artikel dummy: design system, token, dan handoff yang rapi mempercepat delivery dan menjaga kualitas.", en: "Dummy article: design systems, tokens, and clean handoff speed up delivery and protect quality." },
  },
  {
    slug: "nextjs-performance-checklist",
    category: "Engineering",
    date: "2026-08-02",
    author: "Reza Mahendra",
    readMinutes: 8,
    title: { id: "Checklist performa Next.js untuk skor 90+", en: "Next.js performance checklist for 90+ scores" },
    excerpt: { id: "Image, font, caching, dan bundle yang kami audit.", en: "Images, fonts, caching, and bundles we audit." },
    body: { id: "Artikel dummy: prioritaskan LCP, hindari JS berlebih, gunakan SSG dan next/image dengan sizes.", en: "Dummy article: prioritize LCP, avoid excess JS, use SSG and next/image with sizes." },
  },
  {
    slug: "discovery-before-build",
    category: "Strategy",
    date: "2026-07-15",
    author: "Adrian Pratama",
    readMinutes: 5,
    title: { id: "Kenapa discovery menghemat 30% biaya build", en: "Why discovery saves 30% of build cost" },
    excerpt: { id: "Validasi masalah sebelum menulis kode.", en: "Validate problems before writing code." },
    body: { id: "Artikel dummy: scope yang tajam lahir dari riset pengguna dan pemetaan risiko teknis.", en: "Dummy article: sharp scope comes from user research and technical risk mapping." },
  },
  {
    slug: "cloud-cost-optimization",
    category: "Cloud",
    date: "2026-06-28",
    author: "Reza Mahendra",
    readMinutes: 7,
    title: { id: "Optimasi biaya cloud tanpa mengorbankan reliabilitas", en: "Cutting cloud cost without hurting reliability" },
    excerpt: { id: "Rightsizing, caching, dan observability.", en: "Rightsizing, caching, and observability." },
    body: { id: "Artikel dummy: ukur dulu, lalu optimalkan cache, autoscaling, dan retensi log.", en: "Dummy article: measure first, then optimize cache, autoscaling, and log retention." },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postSlugs = () => posts.map((p) => p.slug);
export const postCategories = () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
