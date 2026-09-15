import type { ProcessStep, Stat, WhyItem, Faq, TeamMember, Testimonial } from "@/types";

// DUMMY content — structured for easy replacement later.
export const stats: Stat[] = [
  { value: "50+", label: { id: "Proyek Terkirim", en: "Projects Delivered" } },
  { value: "20+", label: { id: "Klien di Berbagai Negara", en: "Clients Worldwide" } },
  { value: "10+", label: { id: "Tahun Pengalaman", en: "Years of Experience" } },
  { value: "12", label: { id: "Spesialis Digital", en: "Digital Specialists" } },
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

export const team: TeamMember[] = [
  { name: "Adrian Pratama", role: { id: "Chief Executive Officer", en: "Chief Executive Officer" } },
  { name: "Maya Putri", role: { id: "Product & UX Lead", en: "Product & UX Lead" } },
  { name: "Reza Mahendra", role: { id: "Lead Software Engineer", en: "Lead Software Engineer" } },
  { name: "Nabila Sari", role: { id: "Project & Client Success Manager", en: "Project & Client Success Manager" } },
];

export const testimonials: Testimonial[] = [
  { quote: { id: "\u201CXplor Digital mengubah ide kami menjadi produk yang benar-benar dicintai pelanggan.\u201D", en: "\u201CXplor Digital transformed our idea into a product that our customers actually love.\u201D" }, author: "Daniel Hart", role: "CEO, Finova" },
  { quote: { id: "\u201CKomunikasinya jelas, prosesnya transparan, dan hasil akhirnya melebihi ekspektasi.\u201D", en: "\u201CThe communication was clear, the process was transparent, and the final product exceeded our expectations.\u201D" }, author: "Sarah Wijaya", role: "Product Director, MedikaCare" },
  { quote: { id: "\u201CMereka menghadirkan platform scalable dengan UX yang simpel dan intuitif.\u201D", en: "\u201CThey delivered a scalable platform while keeping the user experience simple and intuitive.\u201D" }, author: "Michael Tan", role: "Founder, Arunika" },
];

export const faqs: Faq[] = [
  { q: { id: "Bagaimana proyek biasanya dimulai?", en: "How does a project typically start?" }, a: { id: "Kami mulai dengan discovery session untuk memahami goals, requirements, users, dan kebutuhan teknis Anda.", en: "We begin with a discovery session to understand your goals, requirements, users, and technical needs." } },
  { q: { id: "Berapa lama durasi proyek?", en: "How long does a project take?" }, a: { id: "Tergantung scope dan kompleksitas, proyek tipikal memakan 4–16 minggu.", en: "Depending on scope and complexity, a typical project can take between 4 and 16 weeks." } },
  { q: { id: "Apakah ada maintenance setelah launch?", en: "Can you maintain the product after launch?" }, a: { id: "Ya. Kami menyediakan maintenance, monitoring, optimasi, dan pengembangan fitur lanjutan.", en: "Yes. We provide ongoing maintenance, monitoring, optimization, and feature development." } },
];
