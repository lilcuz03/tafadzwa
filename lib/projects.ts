export type ProjectCategory = "websites" | "ecommerce" | "automation";
export type ProjectStatus = "live" | "running" | "soon" | "dev";

export type Project = {
  slug: string;
  name: string;
  sector: string;
  category: ProjectCategory;
  status: ProjectStatus;
  url?: string;
  display?: string;
  summary: string;
  points: string[];
  tags: string[];
  accent: string; // colour used for the generated cover
  image?: string; // optional real screenshot in /public, e.g. "/projects/ttfrech.png"
};

export const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  websites: "Websites",
  ecommerce: "E-commerce",
  automation: "AI & automation",
};

export const STATUS: Record<ProjectStatus, { label: string; color: string }> = {
  live: { label: "Live", color: "#22c55e" },
  running: { label: "Running daily", color: "#22c55e" },
  soon: { label: "Opening soon", color: "var(--orange)" },
  dev: { label: "In development", color: "var(--cyan)" },
};

export const PROJECTS: Project[] = [
  {
    slug: "ttfrech",
    name: "TtFRECH",
    sector: "Construction & renovations",
    category: "websites",
    status: "live",
    url: "https://www.ttfrech.co.za/",
    display: "ttfrech.co.za",
    summary:
      "A premium online presence for a construction company, with a full services breakdown, testimonials, blog, FAQ and a Resend-powered contact form. Built with a luxury navy and gold look.",
    points: [
      "6 service pages with detail tabs",
      "Resend contact form integration",
      "Client reviews and testimonials",
      "Blog with category filtering",
      "FAQ with animated accordion",
      "Fully responsive and SEO ready",
    ],
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    accent: "#d4a72c",
  },
  {
    slug: "tawedzerwa",
    name: "Tawedzerwa Construction",
    sector: "Construction & renovations",
    category: "websites",
    status: "live",
    url: "https://tawedzerwa.vercel.app/",
    display: "tawedzerwa.vercel.app",
    summary:
      "A strong online presence for a builder covering 12 trade categories, with testimonials, a project gallery, service areas and WhatsApp-integrated lead capture.",
    points: [
      "12 service categories",
      "WhatsApp and contact form lead capture",
      "Project gallery with category labels",
      "Client testimonials section",
      "Service areas coverage map",
      "Fully responsive and SEO optimised",
    ],
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    accent: "#f97316",
  },
  {
    slug: "devine-medical-group",
    name: "Devine Medical Group",
    sector: "Healthcare, Mt Darwin",
    category: "websites",
    status: "live",
    url: "https://www.devinemedicalgroup.co.zw/",
    display: "devinemedicalgroup.co.zw",
    summary:
      "A website for a hospital, nursing home and rehabilitation centre in Mt Darwin, Zimbabwe, built to be found locally and to let patients reach the team in one tap.",
    points: [
      "Pages for the hospital, nursing home and rehabilitation centre",
      "Contact form that sends by email or straight to WhatsApp",
      "Emergency details, FAQ and Google Maps directions",
      "Built for local search and fast loading on mobile",
    ],
    tags: ["Next.js", "Local SEO", "WhatsApp"],
    accent: "#14b8a6",
  },
  {
    slug: "brightfix",
    name: "BrightFix",
    sector: "Home appliance repair",
    category: "websites",
    status: "live",
    url: "https://brightfix-alpha.vercel.app/",
    display: "brightfix-alpha.vercel.app",
    summary:
      "A professional site that turns visitors into repair bookings, with a service catalogue, multi-step booking form, customer reviews and a blog, all optimised for local SEO.",
    points: [
      "Online repair booking form",
      "Full services catalogue",
      "Customer reviews section",
      "Blog and content pages",
      "WhatsApp and call buttons",
      "Local SEO optimised",
    ],
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    accent: "#3b82f6",
  },
  {
    slug: "sah-veh",
    name: "Sah Veh",
    sector: "Holistic wellness store",
    category: "ecommerce",
    status: "live",
    url: "https://sa-vah.vercel.app/",
    display: "sa-vah.vercel.app",
    summary:
      "A premium-feeling online store for a natural wellness brand. Products are ordered through WhatsApp for a personal touch, with a blog covering supplement science and wellness.",
    points: [
      "Product catalogue with detail pages",
      "WhatsApp-integrated ordering",
      "Wellness blog with articles",
      "Hero image carousel",
      "Mobile-first responsive design",
      "Brand-matched visual design",
    ],
    tags: ["Next.js", "Tailwind CSS", "TypeScript"],
    accent: "#84a98c",
  },
  {
    slug: "offline-house",
    name: "Offline House",
    sector: "Tech, home & lifestyle store",
    category: "ecommerce",
    status: "soon",
    url: "https://www.offlinehouse.co.za/",
    display: "offlinehouse.co.za",
    summary:
      "An online store for top-selling tech, home and everyday essentials, with a mega menu, instant search, wishlist, bag and order tracking, all priced in rand.",
    points: [
      "Collections, filters and best-seller sorting",
      "Search with a keyboard shortcut, wishlist and bag",
      "Delivery, returns and order-tracking pages",
      "Email sign-up for the launch",
    ],
    tags: ["Next.js", "E-commerce", "SEO"],
    accent: "#a8a29e",
  },
  {
    slug: "ai-lead-generation-engine",
    name: "AI Lead Generation Engine",
    sector: "AI automation system",
    category: "automation",
    status: "running",
    summary:
      "A fully automated system that runs daily across 27 cities in Africa, the UK, Europe and North America. It finds businesses with no website or a weak online presence, writes an AI outreach pitch for each, and logs structured leads to a Google Sheet, hands-free.",
    points: [
      "Searches 27 cities across 4 continents daily",
      "Filters businesses with no website or a low rating",
      "AI-written outreach pitch per lead",
      "Logs full contact data to Google Sheets",
      "Runs on a schedule with no manual input",
      "Deployed 24/7 on Railway",
    ],
    tags: [
      "n8n",
      "Google Places API",
      "Groq AI",
      "Google Sheets API",
      "Railway",
    ],
    accent: "#22d3ee",
  },
  {
    slug: "bad-website-pitch-engine",
    name: "Bad Website Pitch Engine",
    sector: "AI automation system",
    category: "automation",
    status: "running",
    summary:
      "An outreach automation that finds businesses with low-quality websites, uses Groq AI to audit each site and reach a quality verdict, then drafts personalised pitch emails and WhatsApp messages that reference what it actually saw.",
    points: [
      "Fetches and audits live website content",
      "AI verdict: weak, adequate or strong",
      "Personalised email and WhatsApp pitch per lead",
      "Extracts contact emails from the site HTML",
      "Sends HTML pitch emails through Gmail",
      "Private dashboard with one-click outreach",
    ],
    tags: ["n8n", "Google Places API", "Groq AI", "Gmail API", "Railway"],
    accent: "#a78bfa",
  },
  {
    slug: "blogforge",
    name: "BlogForge",
    sector: "AI SaaS tool",
    category: "automation",
    status: "dev",
    summary:
      "An AI-powered blog generator for agencies and freelancers. Give it a business, topic, audience and style, and it produces a formatted, SEO-optimised post in seconds. Built as an internal tool to deliver content faster.",
    points: [
      "Blog generation in under 10 seconds",
      "5 tone options and 5 format styles",
      "SEO keyword integration",
      "Word count control from 300 to 2,000",
      "Copy and download instantly",
      "South African and international English",
    ],
    tags: ["Next.js", "TypeScript", "Groq AI", "Tailwind CSS"],
    accent: "#fb923c",
  },
];
