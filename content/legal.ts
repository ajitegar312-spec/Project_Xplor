import type { Localized } from "@/types";

export type LegalSection = {
  heading: Localized;
  paragraphs: Localized[];
  bullets?: Localized[];
};

export type LegalDoc = {
  slug: "privacy" | "terms";
  title: Localized;
  description: Localized;
  updatedLabel: Localized;
  updatedDate: Localized;
  intro: Localized[];
  sections: LegalSection[];
  closingNote: Localized;
};

const contactPrivacyId =
  "Untuk pertanyaan terkait data, gunakan halaman kontak kami dan sampaikan keperluan Anda dengan jelas.";
const contactPrivacyEn =
  "For data-related questions, use our contact page and describe your request clearly.";

export const privacyDoc: LegalDoc = {
  slug: "privacy",
  title: { id: "Kebijakan Privasi", en: "Privacy Policy" },
  description: {
    id: "Kebijakan Privasi Xplor Digital: informasi yang dikumpulkan, tujuan penggunaan, dan hak pengguna.",
    en: "Xplor Digital Privacy Policy: what information may be collected, how it is used, and user rights.",
  },
  updatedLabel: { id: "Terakhir diperbarui", en: "Last updated" },
  updatedDate: { id: "17 September 2026", en: "September 17, 2026" },
  intro: [
    {
      id: "Xplor Digital menghargai privasi pengunjung. Kebijakan ini menjelaskan bagaimana informasi dapat diproses ketika seseorang menggunakan website ini atau menghubungi Xplor Digital.",
      en: "Xplor Digital respects visitor privacy. This policy explains how information may be processed when someone uses this website or contacts Xplor Digital.",
    },
  ],
  sections: [
    {
      heading: { id: "1. Pendahuluan", en: "1. Introduction" },
      paragraphs: [
        {
          id: "Kebijakan ini berlaku untuk website Xplor Digital beserta formulir kontak dan newsletter yang tersedia di dalamnya.",
          en: "This policy applies to the Xplor Digital website, including the contact and newsletter forms available on it.",
        },
      ],
    },
    {
      heading: { id: "2. Informasi yang Dapat Dikumpulkan", en: "2. Information That May Be Collected" },
      paragraphs: [
        {
          id: "Tergantung pada cara Anda menggunakan website, informasi berikut dapat diproses:",
          en: "Depending on how you use the website, the following information may be processed:",
        },
      ],
      bullets: [
        {
          id: "Informasi yang Anda berikan secara langsung, seperti nama, alamat email, nama perusahaan, estimasi budget, dan isi pesan melalui formulir kontak atau alamat email melalui formulir newsletter.",
          en: "Information you provide directly, such as your name, email address, company name, estimated budget, and message content through the contact form, or your email address through the newsletter form.",
        },
        {
          id: "Informasi teknis dasar yang umum diproses oleh infrastruktur web/server, seperti log permintaan, jenis browser, dan perkiraan wilayah, sejauh diperlukan untuk mengoperasikan dan mengamankan website.",
          en: "Basic technical information commonly processed by web/server infrastructure, such as request logs, browser type, and approximate region, to the extent needed to operate and secure the website.",
        },
      ],
    },
    {
      heading: { id: "3. Penggunaan Informasi", en: "3. How Information Is Used" },
      paragraphs: [
        {
          id: "Informasi digunakan untuk tujuan berikut:",
          en: "Information is used for the following purposes:",
        },
      ],
      bullets: [
        { id: "Merespons pertanyaan dan pesan yang Anda kirimkan.", en: "Responding to questions and messages you send." },
        { id: "Menindaklanjuti permintaan layanan atau kerja sama.", en: "Following up on service or partnership inquiries." },
        { id: "Mengoperasikan, memelihara, dan mengamankan website.", en: "Operating, maintaining, and securing the website." },
        { id: "Meningkatkan layanan apabila relevan dengan kebutuhan Anda.", en: "Improving services where relevant to your needs." },
      ],
    },
    {
      heading: { id: "4. Email dan Komunikasi", en: "4. Email and Communication" },
      paragraphs: [
        {
          id: "Informasi kontak yang Anda berikan dapat digunakan untuk merespons permintaan yang Anda kirimkan. Mengisi formulir kontak tidak serta-merta mendaftarkan Anda ke komunikasi pemasaran.",
          en: "Contact information you provide may be used to respond to requests you submit. Submitting the contact form does not automatically subscribe you to marketing communications.",
        },
      ],
    },
    {
      heading: { id: "5. Penyedia Layanan Pihak Ketiga", en: "5. Third-Party Service Providers" },
      paragraphs: [
        {
          id: "Untuk mengoperasikan website, layanan pihak ketiga dapat digunakan, misalnya untuk hosting, pengiriman email, atau infrastruktur teknis lainnya, apabila diperlukan.",
          en: "To operate the website, third-party services may be used, for example for hosting, email delivery, or other technical infrastructure, where needed.",
        },
      ],
    },
    {
      heading: { id: "6. Penyimpanan dan Keamanan", en: "6. Storage and Security" },
      paragraphs: [
        {
          id: "Langkah teknis yang wajar diterapkan untuk melindungi informasi yang diproses. Namun demikian, tidak ada sistem yang dapat menjamin keamanan absolut, sehingga keamanan mutlak tidak dijanjikan.",
          en: "Reasonable technical measures are applied to protect processed information. However, no system can guarantee absolute security, so absolute security is not promised.",
        },
      ],
    },
    {
      heading: { id: "7. Hak Pengguna", en: "7. User Rights" },
      paragraphs: [
        {
          id: "Anda memiliki hak atas informasi pribadi Anda sesuai hukum yang berlaku, termasuk meminta akses, koreksi, atau penghapusan sepanjang memungkinkan secara teknis dan hukum.",
          en: "You have rights over your personal information under applicable law, including requesting access, correction, or deletion where technically and legally possible.",
        },
        { id: contactPrivacyId, en: contactPrivacyEn },
      ],
    },
    {
      heading: { id: "8. Cookie dan Teknologi Serupa", en: "8. Cookies and Similar Technologies" },
      paragraphs: [
        {
          id: "Website ini tidak menggunakan cookie pelacakan atau analitik. Website dapat menyimpan preferensi tampilan (misalnya mode terang/gelap) secara lokal di browser Anda agar pilihan tersebut tetap berlaku pada kunjungan berikutnya.",
          en: "This website does not use tracking or analytics cookies. The website may store display preferences (for example light/dark mode) locally in your browser so your choice persists across visits.",
        },
      ],
    },
    {
      heading: { id: "9. Tautan Eksternal", en: "9. External Links" },
      paragraphs: [
        {
          id: "Website ini dapat memuat tautan ke website pihak ketiga. Kebijakan privasi masing-masing website tersebut berlaku secara terpisah dan di luar tanggung jawab kebijakan ini.",
          en: "This website may contain links to third-party websites. Each of those websites is governed by its own separate privacy policy, outside the scope of this policy.",
        },
      ],
    },
    {
      heading: { id: "10. Perubahan Kebijakan Privasi", en: "10. Changes to This Privacy Policy" },
      paragraphs: [
        {
          id: "Xplor Digital dapat memperbarui kebijakan ini dari waktu ke waktu. Setiap perubahan akan tercermin pada tanggal pembaruan yang tercantum di halaman ini.",
          en: "Xplor Digital may update this policy from time to time. Any change will be reflected in the update date shown on this page.",
        },
      ],
    },
    {
      heading: { id: "11. Kontak", en: "11. Contact" },
      paragraphs: [
        {
          id: "Untuk pertanyaan mengenai kebijakan ini atau permintaan terkait data Anda, silakan gunakan mekanisme kontak yang tersedia di website ini.",
          en: "For questions about this policy or requests regarding your data, please use the contact mechanism available on this website.",
        },
      ],
    },
  ],
  closingNote: {
    id: "Kebijakan ini merupakan informasi umum mengenai praktik privasi website dan dapat diperbarui sesuai kebutuhan operasional serta hukum yang berlaku.",
    en: "This policy provides general information about the website's privacy practices and may be updated according to operational needs and applicable law.",
  },
};

export const termsDoc: LegalDoc = {
  slug: "terms",
  title: { id: "Syarat dan Ketentuan", en: "Terms of Service" },
  description: {
    id: "Syarat dan Ketentuan penggunaan website Xplor Digital beserta ketentuan layanan yang berlaku.",
    en: "Terms of Service governing the use of the Xplor Digital website and applicable service terms.",
  },
  updatedLabel: { id: "Terakhir diperbarui", en: "Last updated" },
  updatedDate: { id: "17 September 2026", en: "September 17, 2026" },
  intro: [
    {
      id: "Dengan mengakses website Xplor Digital, Anda dianggap telah membaca, memahami, dan menyetujui syarat dan ketentuan berikut.",
      en: "By accessing the Xplor Digital website, you are deemed to have read, understood, and agreed to the following terms and conditions.",
    },
  ],
  sections: [
    {
      heading: { id: "1. Pendahuluan", en: "1. Introduction" },
      paragraphs: [
        {
          id: "Syarat dan ketentuan ini mengatur penggunaan website Xplor Digital. Jika Anda tidak menyetujui ketentuan ini, harap tidak melanjutkan penggunaan website.",
          en: "These terms and conditions govern the use of the Xplor Digital website. If you do not agree with these terms, please discontinue use of the website.",
        },
      ],
    },
    {
      heading: { id: "2. Penggunaan Website", en: "2. Use of the Website" },
      paragraphs: [
        {
          id: "Anda setuju untuk menggunakan website secara wajar dan sesuai hukum, serta tidak melakukan tindakan yang dapat merusak, mengganggu, atau menyalahgunakan website dan layanannya, termasuk upaya akses tidak sah, pengiriman spam, atau distribusi konten berbahaya.",
          en: "You agree to use the website fairly and lawfully, and not to take actions that could damage, disrupt, or misuse the website and its services, including unauthorized access attempts, spamming, or distributing harmful content.",
        },
      ],
    },
    {
      heading: { id: "3. Layanan Xplor Digital", en: "3. Xplor Digital Services" },
      paragraphs: [
        {
          id: "Xplor Digital menyediakan layanan di bidang pengembangan web dan aplikasi, desain UI/UX, cloud dan DevOps, konsultasi TI, serta transformasi digital, sebagaimana dijelaskan pada halaman layanan website ini.",
          en: "Xplor Digital provides services in web and application development, UI/UX design, cloud and DevOps, IT consulting, and digital transformation, as described on this website's services pages.",
        },
      ],
    },
    {
      heading: { id: "4. Informasi dan Materi Website", en: "4. Website Information and Materials" },
      paragraphs: [
        {
          id: "Seluruh informasi di website ini disediakan untuk tujuan informasi umum. Xplor Digital berupaya menjaga keakuratan materi, namun tidak menjamin bahwa setiap informasi selalu lengkap, terkini, atau bebas dari kesalahan.",
          en: "All information on this website is provided for general informational purposes. Xplor Digital strives to keep materials accurate but does not guarantee that every piece of information is always complete, current, or error-free.",
        },
      ],
    },
    {
      heading: { id: "5. Kekayaan Intelektual", en: "5. Intellectual Property" },
      paragraphs: [
        {
          id: "Seluruh konten website, termasuk teks, desain, logo, dan materi visual, dilindungi oleh hukum kekayaan intelektual yang berlaku. Penggunaan ulang materi website untuk keperluan komersial memerlukan izin tertulis terlebih dahulu.",
          en: "All website content, including text, design, logos, and visual materials, is protected by applicable intellectual property law. Reusing website materials for commercial purposes requires prior written permission.",
        },
      ],
    },
    {
      heading: { id: "6. Permintaan Proyek dan Komunikasi", en: "6. Project Inquiries and Communication" },
      paragraphs: [
        {
          id: "Pengiriman formulir kontak atau komunikasi lainnya tidak serta-merta membentuk kontrak proyek atau hubungan kerja sama. Ruang lingkup, harga, timeline, dan ketentuan proyek, apabila relevan, akan ditentukan melalui kesepakatan terpisah antara para pihak.",
          en: "Submitting a contact form or other communication does not by itself form a project contract or partnership. Scope, pricing, timelines, and project terms, where relevant, will be determined through a separate agreement between the parties.",
        },
      ],
    },
    {
      heading: { id: "7. Tidak Ada Jaminan Mutlak", en: "7. No Absolute Warranty" },
      paragraphs: [
        {
          id: "Website disediakan sebagaimana adanya, tanpa jaminan mutlak mengenai ketersediaan tanpa gangguan, kesesuaian untuk tujuan tertentu, atau hasil spesifik dari penggunaan informasi di dalamnya.",
          en: "The website is provided as is, without absolute warranty regarding uninterrupted availability, fitness for a particular purpose, or specific outcomes from using the information within it.",
        },
      ],
    },
    {
      heading: { id: "8. Batasan Tanggung Jawab", en: "8. Limitation of Liability" },
      paragraphs: [
        {
          id: "Sepanjang diizinkan oleh hukum yang berlaku, Xplor Digital tidak bertanggung jawab atas kerugian tidak langsung atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan website ini.",
          en: "To the extent permitted by applicable law, Xplor Digital is not liable for indirect or consequential losses arising from the use of, or inability to use, this website.",
        },
      ],
    },
    {
      heading: { id: "9. Tautan dan Layanan Pihak Ketiga", en: "9. Third-Party Links and Services" },
      paragraphs: [
        {
          id: "Tautan atau layanan pihak ketiga yang dirujuk website ini tunduk pada ketentuan masing-masing penyedia dan berada di luar kendali serta tanggung jawab Xplor Digital.",
          en: "Third-party links or services referenced by this website are subject to their respective providers' terms and are beyond Xplor Digital's control and responsibility.",
        },
      ],
    },
    {
      heading: { id: "10. Perubahan Website dan Ketentuan", en: "10. Changes to the Website and Terms" },
      paragraphs: [
        {
          id: "Xplor Digital dapat memperbarui isi website maupun ketentuan ini dari waktu ke waktu. Penggunaan website secara berkelanjutan setelah perubahan dianggap sebagai persetujuan atas ketentuan yang berlaku.",
          en: "Xplor Digital may update the website content and these terms from time to time. Continued use of the website after changes constitutes acceptance of the applicable terms.",
        },
      ],
    },
    {
      heading: { id: "11. Hukum yang Berlaku", en: "11. Governing Law" },
      paragraphs: [
        {
          id: "Ketentuan ini diatur dan ditafsirkan berdasarkan hukum yang berlaku di Republik Indonesia. Setiap perselisihan diselesaikan terlebih dahulu secara musyawarah, dan apabila tidak tercapai, mengikuti mekanisme hukum yang berlaku.",
          en: "These terms are governed by and construed in accordance with the laws applicable in the Republic of Indonesia. Any dispute shall first be settled amicably, and failing that, through applicable legal mechanisms.",
        },
      ],
    },
    {
      heading: { id: "12. Kontak", en: "12. Contact" },
      paragraphs: [
        {
          id: "Untuk pertanyaan mengenai ketentuan ini, silakan gunakan mekanisme kontak yang tersedia di website ini.",
          en: "For questions about these terms, please use the contact mechanism available on this website.",
        },
      ],
    },
  ],
  closingNote: {
    id: "Ketentuan ini merupakan informasi umum dan dapat diperbarui sesuai kebutuhan operasional serta hukum yang berlaku.",
    en: "These terms provide general information and may be updated according to operational needs and applicable law.",
  },
};
