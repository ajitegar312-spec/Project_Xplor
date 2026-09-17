import type { Service } from "@/types";

// Sample content — replace with verified company content when available. Structure is backend-ready.
export const services: Service[] = [
  {
    slug: "web-development",
    icon: "🌐",
    title: { id: "Web Development", en: "Web Development" },
    excerpt: { id: "Website & aplikasi web cepat, aman, dan SEO-ready.", en: "Fast, secure, SEO-ready websites & web apps." },
    body: { id: "Kami membangun website corporate, dashboard, dan platform SaaS dengan Next.js dan standar engineering modern.", en: "We build corporate sites, dashboards, and SaaS platforms with Next.js and modern engineering standards." },
    deliverables: ["Corporate website", "Web app / dashboard", "CMS integration", "Performance & SEO audit"],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js"],
  },
  {
    slug: "mobile-app-development",
    icon: "📱",
    title: { id: "Mobile App Development", en: "Mobile App Development" },
    excerpt: { id: "Aplikasi iOS & Android yang scalable.", en: "Scalable iOS & Android apps." },
    body: { id: "Pengembangan aplikasi cross-platform yang maintainable dengan fokus pada UX dan performa.", en: "Maintainable cross-platform development focused on UX and performance." },
    deliverables: ["iOS & Android apps", "App store release", "Push & analytics", "OTA updates"],
    stack: ["React", "Node.js", "PostgreSQL"],
  },
  {
    slug: "ui-ux-design",
    icon: "🎨",
    title: { id: "UI/UX Design", en: "UI/UX Design" },
    excerpt: { id: "Riset, wireframe, hingga design system.", en: "Research, wireframes, to design systems." },
    body: { id: "Proses desain berbasis riset: discovery, prototyping, usability testing, dan design system.", en: "Research-driven design: discovery, prototyping, usability testing, and design systems." },
    deliverables: ["UX research", "UI design", "Design system", "Prototype & testing"],
    stack: ["Figma", "Tailwind CSS"],
  },
  {
    slug: "cloud-devops",
    icon: "☁️",
    title: { id: "Cloud & DevOps", en: "Cloud & DevOps" },
    excerpt: { id: "Infrastruktur andal, deploy otomatis.", en: "Reliable infra, automated deploys." },
    body: { id: "Setup cloud, CI/CD, observability, dan hardening keamanan untuk workload production.", en: "Cloud setup, CI/CD, observability, and security hardening for production workloads." },
    deliverables: ["Cloud architecture", "CI/CD pipeline", "Monitoring & alerting", "Cost optimization"],
    stack: ["AWS", "Docker", "Cloudflare"],
  },
  {
    slug: "it-consulting",
    icon: "🧭",
    title: { id: "IT Consulting", en: "IT Consulting" },
    excerpt: { id: "Audit teknis & roadmap transformasi.", en: "Technical audits & roadmaps." },
    body: { id: "Kami membantu memetakan kondisi existing, memilih stack, dan menyusun roadmap eksekusi.", en: "We assess your current state, recommend stacks, and plan execution roadmaps." },
    deliverables: ["Tech audit", "Architecture review", "Roadmap", "Team augmentation"],
    stack: ["Next.js", "Python", "PostgreSQL"],
  },
  {
    slug: "digital-transformation",
    icon: "🚀",
    title: { id: "Digital Transformation", en: "Digital Transformation" },
    excerpt: { id: "Digitalisasi proses bisnis end-to-end.", en: "End-to-end business digitization." },
    body: { id: "Dari proses manual ke platform digital terintegrasi dengan metrik yang jelas.", en: "From manual processes to integrated digital platforms with clear metrics." },
    deliverables: ["Process digitization", "System integration", "Change management", "KPI dashboard"],
    stack: ["Laravel", "MySQL", "AWS"],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const serviceSlugs = () => services.map((s) => s.slug);
