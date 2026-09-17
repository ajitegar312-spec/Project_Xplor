import type { Work } from "@/types";

// Sample concept projects for portfolio display — replace with verified
// project/company content when available. Outcomes use safe design-intent
// wording only, never fabricated business numbers.
export const works: Work[] = [
  {
    slug: "finova-digital-banking",
    client: "Finova (Concept)",
    year: "2025",
    category: "Fintech",
    title: { id: "Finova — Platform Digital Banking", en: "Finova — Digital Banking Platform" },
    summary: { id: "Onboarding digital & dashboard keuangan real-time.", en: "Digital onboarding & real-time finance dashboard." },
    challenge: { id: "Onboarding lambat dan drop-off tinggi di mobile.", en: "Slow onboarding and high mobile drop-off." },
    solution: { id: "Merancang ulang alur KYC menjadi 3 langkah dengan verifikasi progresif dan dashboard ringan.", en: "Redesigned KYC into 3 steps with progressive verification and a lightweight dashboard." },
    stack: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
    features: [
      { id: "Alur KYC tiga langkah", en: "Three-step KYC flow" },
      { id: "Verifikasi progresif", en: "Progressive verification" },
      { id: "Dashboard keuangan real-time", en: "Real-time finance dashboard" },
      { id: "Onboarding digital end-to-end", en: "End-to-end digital onboarding" },
    ],
    outcomes: [
      { id: "Dirancang untuk meningkatkan penyelesaian onboarding melalui alur yang sederhana.", en: "Designed to improve onboarding completion through a simple flow." },
      { id: "Dibangun untuk mendukung visibilitas keuangan real-time bagi pengguna.", en: "Built to support real-time financial visibility for users." },
      { id: "Berfokus pada pengalaman yang ringan dan cepat di perangkat mobile.", en: "Focused on a lightweight, fast experience on mobile devices." },
    ],
  },
  {
    slug: "medikacare-healthcare-system",
    client: "MedikaCare (Concept)",
    year: "2024",
    category: "Healthcare",
    title: { id: "MedikaCare — Sistem Manajemen Kesehatan", en: "MedikaCare — Healthcare Management System" },
    summary: { id: "Antrian, rekam medis, dan jadwal dokter terintegrasi.", en: "Integrated queue, records, and doctor scheduling." },
    challenge: { id: "Antrian manual dan data pasien tersebar.", en: "Manual queues and fragmented patient data." },
    solution: { id: "Membangun portal pasien + dashboard klinik dengan antrian real-time dan rekam medis terpusat.", en: "Built patient portal + clinic dashboard with real-time queue and centralized records." },
    stack: ["React", "Laravel", "MySQL", "Docker"],
    features: [
      { id: "Portal pasien", en: "Patient portal" },
      { id: "Antrian real-time", en: "Real-time queue" },
      { id: "Rekam medis terpusat", en: "Centralized medical records" },
      { id: "Dashboard klinik & penjadwalan dokter", en: "Clinic dashboard & doctor scheduling" },
    ],
    outcomes: [
      { id: "Dirancang untuk mengurangi waktu tunggu dengan sistem antrian real-time.", en: "Designed to reduce waiting times with a real-time queue system." },
      { id: "Dibangun untuk mendukung data pasien yang terpusat dan mudah diakses.", en: "Built to support centralized, easily accessible patient data." },
      { id: "Berfokus pada pengalaman yang jelas bagi pasien dan staf klinik.", en: "Focused on a clear experience for patients and clinic staff." },
    ],
  },
  {
    slug: "arunika-ecommerce",
    client: "Arunika (Concept)",
    year: "2025",
    category: "E-Commerce",
    title: { id: "Arunika — Platform E-Commerce", en: "Arunika — E-Commerce Platform" },
    summary: { id: "Storefront cepat dengan checkout 1 halaman.", en: "Fast storefront with 1-page checkout." },
    challenge: { id: "Bounce tinggi di halaman produk dan checkout.", en: "High bounce on product and checkout pages." },
    solution: { id: "Membangun storefront edge-rendered dengan pencarian instan dan checkout teroptimasi.", en: "Built edge-rendered storefront with instant search and optimized checkout." },
    stack: ["Next.js", "Tailwind CSS", "PostgreSQL", "Cloudflare"],
    features: [
      { id: "Storefront edge-rendered", en: "Edge-rendered storefront" },
      { id: "Pencarian instan", en: "Instant search" },
      { id: "Checkout satu halaman", en: "One-page checkout" },
      { id: "Katalog produk yang cepat", en: "Fast product catalog" },
    ],
    outcomes: [
      { id: "Dirancang untuk meningkatkan penyelesaian checkout melalui alur satu halaman.", en: "Designed to improve checkout completion with a one-page flow." },
      { id: "Dibangun untuk mendukung pencarian produk yang cepat dan relevan.", en: "Built to support fast, relevant product discovery." },
      { id: "Berfokus pada waktu muat yang konsisten di semua perangkat.", en: "Focused on consistently fast load times across devices." },
    ],
  },
  {
    slug: "karta-logistics-dashboard",
    client: "Karta (Concept)",
    year: "2024",
    category: "SaaS",
    title: { id: "Karta — Dashboard Logistik", en: "Karta — Logistics Dashboard" },
    summary: { id: "Visibilitas armada & SLA real-time.", en: "Real-time fleet & SLA visibility." },
    challenge: { id: "Data operasional tersebar di spreadsheet.", en: "Ops data scattered across sheets." },
    solution: { id: "Dashboard terpusat dengan alert SLA dan ekspor laporan.", en: "Central dashboard with SLA alerts and report export." },
    stack: ["Next.js", "Python", "PostgreSQL"],
    features: [
      { id: "Dashboard operasional terpusat", en: "Centralized ops dashboard" },
      { id: "Peringatan SLA", en: "SLA alerts" },
      { id: "Ekspor laporan", en: "Report export" },
    ],
    outcomes: [
      { id: "Dirancang untuk meningkatkan visibilitas operasional harian.", en: "Designed to improve day-to-day operational visibility." },
      { id: "Dibangun untuk mendukung respons cepat terhadap pelanggaran SLA.", en: "Built to support fast responses to SLA breaches." },
      { id: "Berfokus pada laporan yang mudah dibagikan kepada pemangku kepentingan.", en: "Focused on reports that are easy to share with stakeholders." },
    ],
  },
  {
    slug: "svara-edtech-platform",
    client: "Svara (Concept)",
    year: "2023",
    category: "EdTech",
    title: { id: "Svara — Platform EdTech", en: "Svara — EdTech Platform" },
    summary: { id: "Kelas online & analitik belajar.", en: "Online classes & learning analytics." },
    challenge: { id: "Retensi murid rendah.", en: "Low student retention." },
    solution: { id: "Gamifikasi progres dan reminder belajar personal.", en: "Progress gamification and personal nudges." },
    stack: ["React", "Node.js", "MySQL"],
    features: [
      { id: "Gamifikasi progres belajar", en: "Learning progress gamification" },
      { id: "Pengingat belajar personal", en: "Personal learning reminders" },
      { id: "Analitik pembelajaran", en: "Learning analytics" },
    ],
    outcomes: [
      { id: "Dirancang untuk mendorong kebiasaan belajar yang konsisten.", en: "Designed to encourage consistent study habits." },
      { id: "Dibangun untuk mendukung wawasan progres bagi pengajar.", en: "Built to support progress insights for instructors." },
      { id: "Berfokus pada pengalaman belajar yang memotivasi.", en: "Focused on a motivating learning experience." },
    ],
  },
  {
    slug: "wastu-proptech-site",
    client: "Wastu (Concept)",
    year: "2023",
    category: "Website",
    title: { id: "Wastu — Website Proptech", en: "Wastu — Proptech Site" },
    summary: { id: "Katalog properti SEO-ready.", en: "SEO-ready property catalog." },
    challenge: { id: "Lead organik stagnan.", en: "Stagnant organic leads." },
    solution: { id: "IA baru + halaman programmatic SEO + form terjadwal.", en: "New IA + programmatic SEO + scheduled forms." },
    stack: ["Next.js", "Tailwind CSS", "Cloudflare"],
    features: [
      { id: "Arsitektur informasi baru", en: "New information architecture" },
      { id: "Halaman SEO terprogram", en: "Programmatic SEO pages" },
      { id: "Formulir inquiry terjadwal", en: "Scheduled inquiry forms" },
    ],
    outcomes: [
      { id: "Dirancang untuk meningkatkan penemuan organik melalui struktur konten yang rapi.", en: "Designed to improve organic discovery through tidy content structure." },
      { id: "Dibangun untuk mendukung pertumbuhan katalog tanpa mengorbankan kecepatan.", en: "Built to support catalog growth without sacrificing speed." },
      { id: "Berfokus pada alur inquiry yang sederhana bagi calon pembeli.", en: "Focused on a simple inquiry flow for prospective buyers." },
    ],
  },
];

export const getWork = (slug: string) => works.find((w) => w.slug === slug);
export const workSlugs = () => works.map((w) => w.slug);
export const workCategories = () => ["All", ...Array.from(new Set(works.map((w) => w.category)))];
