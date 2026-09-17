import type { Post } from "@/types";

// Sample articles — replace with verified company content when available.
export const posts: Post[] = [
  {
    slug: "design-engineering-collaboration",
    category: "Process",
    date: "2026-08-20",
    author: "Xplor Digital Team",
    readMinutes: 6,
    title: { id: "Kolaborasi desain & engineering tanpa friksi", en: "Frictionless design-engineering collaboration" },
    excerpt: { id: "Cara kami menyatukan Figma, token, dan code review.", en: "How we align Figma, tokens, and code reviews." },
    body: { id: "Kolaborasi yang rapi antara desainer dan engineer bermula dari bahasa yang sama: token desain untuk warna, tipografi, dan spacing yang dipakai konsisten dari Figma hingga kode.\n\nKomponen yang didokumentasikan dengan jelas — kapan dipakai, varian apa saja, dan state apa yang didukung — mengurangi tanya-jawab berulang dan mencegah implementasi menyimpang dari desain.\n\nRitual ringan seperti review desain sebelum development dan review implementasi sebelum rilis menjaga kualitas tanpa memperlambat tim.", en: "Clean collaboration between designers and engineers starts with a shared language: design tokens for color, typography, and spacing used consistently from Figma to code.\n\nWell-documented components — when to use them, which variants exist, and which states are supported — reduce repeated questions and keep implementation aligned with design.\n\nLightweight rituals such as a design review before development and an implementation review before release protect quality without slowing the team down." },
  },
  {
    slug: "nextjs-performance-checklist",
    category: "Engineering",
    date: "2026-08-02",
    author: "Xplor Digital Team",
    readMinutes: 8,
    title: { id: "Checklist performa Next.js untuk skor 90+", en: "Next.js performance checklist for 90+ scores" },
    excerpt: { id: "Image, font, caching, dan bundle yang perlu diperiksa.", en: "Images, fonts, caching, and bundles worth reviewing." },
    body: { id: "Skor performa yang tinggi biasanya ditentukan oleh beberapa keputusan dasar: gambar yang dioptimalkan dengan ukuran tepat, font yang di-host sendiri dengan subset seperlunya, dan JavaScript seminimal mungkin pada halaman awal.\n\nRendering statis untuk halaman konten, caching yang tepat untuk data dinamis, dan audit bundle berkala mencegah regresi: setiap dependensi baru sebaiknya dipertanyakan dampaknya terhadap First Load JavaScript.\n\nUkur dengan Lighthouse pada build production dan perangkat mobile kelas menengah — angka pada mode development tidak mewakili pengalaman pengguna.", en: "High performance scores are usually decided by a few fundamentals: properly sized optimized images, self-hosted fonts with only needed subsets, and minimal JavaScript on initial pages.\n\nStatic rendering for content pages, correct caching for dynamic data, and regular bundle audits prevent regressions: every new dependency should justify its impact on First Load JavaScript.\n\nMeasure with Lighthouse on production builds and mid-range mobile devices — development-mode numbers do not represent user experience." },
  },
  {
    slug: "discovery-before-build",
    category: "Strategy",
    date: "2026-07-15",
    author: "Xplor Digital Team",
    readMinutes: 5,
    title: { id: "Kenapa discovery dapat menghemat biaya build", en: "Why discovery can reduce build costs" },
    excerpt: { id: "Validasi masalah sebelum menulis kode.", en: "Validate problems before writing code." },
    body: { id: "Fase discovery yang singkat — memetakan pengguna, masalah, dan risiko teknis — sering menghemat biaya build yang jauh lebih besar daripada biayanya sendiri.\n\nHasil discovery yang baik bukan dokumen tebal, melainkan scope yang tajam: masalah yang divalidasi, prioritas yang disepakati, dan batasan yang eksplisit.\n\nRisiko teknis terbesar, seperti integrasi pihak ketiga atau kebutuhan performa, sebaiknya diuji paling awal, saat perubahan arah masih murah.", en: "A short discovery phase — mapping users, problems, and technical risks — often saves build costs far larger than its own.\n\nGood discovery output is not a thick document but sharp scope: validated problems, agreed priorities, and explicit constraints.\n\nThe biggest technical risks, such as third-party integrations or performance requirements, should be tested earliest, while changing direction is still cheap." },
  },
  {
    slug: "cloud-cost-optimization",
    category: "Cloud",
    date: "2026-06-28",
    author: "Xplor Digital Team",
    readMinutes: 7,
    title: { id: "Optimasi biaya cloud tanpa mengorbankan reliabilitas", en: "Cutting cloud cost without hurting reliability" },
    excerpt: { id: "Rightsizing, caching, dan observability.", en: "Rightsizing, caching, and observability." },
    body: { id: "Optimasi biaya cloud dimulai dari pengukuran: pahami layanan mana yang paling mahal dan mengapa, sebelum mengubah apa pun.\n\nRightsizing instance, caching agresif untuk konten statis, autoscaling yang mengikuti beban aktual, dan retensi log yang wajar menekan tagihan tanpa mengorbankan keandalan.\n\nObservabilitas yang baik — alert yang tidak berisik dan dashboard biaya per layanan — membuat optimasi menjadi kebiasaan, bukan proyek sesekali.", en: "Cloud cost optimization starts with measurement: understand which services cost the most and why, before changing anything.\n\nRightsizing instances, aggressive caching for static content, autoscaling that follows actual load, and sensible log retention cut bills without hurting reliability.\n\nGood observability — quiet alerts and per-service cost dashboards — turns optimization into a habit instead of an occasional project." },
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
export const postSlugs = () => posts.map((p) => p.slug);
export const postCategories = () => ["All", ...Array.from(new Set(posts.map((p) => p.category)))];
