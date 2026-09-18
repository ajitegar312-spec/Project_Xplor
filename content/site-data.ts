import type { ProcessStep, Stat, WhyItem, Faq } from "@/types";

// Sample content — replace with verified project/company content when available.
export const stats: Stat[] = [
  { value: "6", label: { id: "Kapabilitas Utama", en: "Core Capabilities" } },
  { value: "2", label: { id: "Bahasa", en: "Languages" } },
  { value: "24/7", label: { id: "Ketersediaan Digital", en: "Digital Availability" } },
];

export const whyChooseUs: WhyItem[] = [
  { title: { id: "Strategy-Driven", en: "Strategy-Driven" }, desc: { id: "Kami fokus menyelesaikan masalah bisnis yang tepat sebelum membangun solusi.", en: "We focus on solving the right business problems before building the solution." } },
  { title: { id: "Engineering Excellence", en: "Engineering Excellence" }, desc: { id: "Kami membangun produk digital yang andal, scalable, dan maintainable.", en: "We build reliable, scalable, and maintainable digital products." } },
  { title: { id: "Transparent Collaboration", en: "Transparent Collaboration" }, desc: { id: "Komunikasi jelas, proses terprediksi, dan update progres rutin.", en: "Clear communication, predictable processes, and regular progress updates." } },
  { title: { id: "Long-Term Partnership", en: "Long-Term Partnership" }, desc: { id: "Kami mendampingi klien jauh setelah peluncuran awal.", en: "We support our clients beyond the initial project launch." } },
];

export const processSteps: ProcessStep[] = [
  { title: { id: "Discover", en: "Discover" }, desc: { id: "Memahami bisnis, pengguna, dan objektif.", en: "Understand the business, users, and objectives." } },
  { title: { id: "Strategize", en: "Strategize" }, desc: { id: "Menentukan solusi, scope, dan arah teknis.", en: "Define the solution, scope, and technical direction." } },
  { title: { id: "Build", en: "Build" }, desc: { id: "Desain, develop, testing, dan refinement produk.", en: "Design, develop, test, and refine the product." } },
  { title: { id: "Launch", en: "Launch" }, desc: { id: "Deploy, monitoring, dan continuous improvement.", en: "Deploy, monitor, and continuously improve." } },
];

export const techStack: string[] = ["Next.js", "TypeScript", "Tailwind CSS", "React", "Node.js", "Python", "Laravel", "PostgreSQL", "MySQL", "Docker", "AWS", "Cloudflare"];

export const faqs: Faq[] = [
  { q: { id: "Bagaimana proyek biasanya dimulai?", en: "How does a project typically start?" }, a: { id: "Kami mulai dengan discovery session untuk memahami goals, requirements, users, dan kebutuhan teknis Anda.", en: "We begin with a discovery session to understand your goals, requirements, users, and technical needs." } },
  { q: { id: "Berapa lama durasi proyek?", en: "How long does a project take?" }, a: { id: "Tergantung scope dan kompleksitas, proyek tipikal memakan 4–16 minggu.", en: "Depending on scope and complexity, a typical project can take between 4 and 16 weeks." } },
  { q: { id: "Apakah ada maintenance setelah launch?", en: "Can you maintain the product after launch?" }, a: { id: "Ya. Kami menyediakan maintenance, monitoring, optimasi, dan pengembangan fitur lanjutan.", en: "Yes. We provide ongoing maintenance, monitoring, optimization, and feature development." } },
];
