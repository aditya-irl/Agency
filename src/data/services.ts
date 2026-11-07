export interface Service {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  tagline: string;
  deliverables: string[];
  techStack: string[];
  idealFor: string;
  outcome: string;
  ctaText: string;
}

export const SERVICES: Service[] = [
  {
    id: "website-development",
    number: "01",
    title: "Website Development",
    tagline: "High-performance digital flagships that convert visitors into qualified buyers.",
    shortDescription:
      "Modern, bespoke websites built from the ground up for speed, search visibility, and conversion.",
    fullDescription:
      "We design and engineer bespoke web presences for brands that cannot afford to look generic. From fast marketing landing pages to full-scale corporate websites, every build pairs editorial aesthetics with clean, semantic code that ranks on search engines and converts traffic into real inquiries.",
    deliverables: [
      "Business websites & company flagships",
      "High-converting campaign landing pages",
      "Corporate & institutional websites",
      "Creative studio & portfolio platforms",
      "Conversion-focused architecture & micro-copy",
    ],
    techStack: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion", "Headless CMS"],
    idealFor: "B2B firms, high-growth startups, luxury brands, and professional service providers wanting an authoritative online presence.",
    outcome: "A blazing fast, responsive digital home that establishes immediate credibility and drives measurable inquiries.",
    ctaText: "Discuss Website Project",
  },
  {
    id: "ecommerce-development",
    number: "02",
    title: "E-commerce Development",
    tagline: "Frictionless online retail experiences engineered for higher average order value.",
    shortDescription:
      "Shopify stores and custom e-commerce experiences built for smooth browsing and frictionless checkout.",
    fullDescription:
      "We build modern digital storefronts designed around real customer behavior. Whether creating a custom Shopify theme, optimizing a high-traffic catalogue, or engineering a custom checkout flow, we eliminate purchase hurdles and create shopping journeys customers genuinely enjoy.",
    deliverables: [
      "Custom Shopify & Shopify Plus themes",
      "Headless & custom storefront development",
      "Product catalogue architecture & filtering",
      "Payment gateway & local checkout integrations (Razorpay, Stripe, UPI)",
      "Mobile commerce & speed optimization",
    ],
    techStack: ["Shopify Liquid", "Online Store 2.0", "Next.js Commerce", "Tailwind CSS", "Shopify API"],
    idealFor: "Direct-to-consumer (D2C) brands, boutique retailers, and product businesses expanding online.",
    outcome: "A shopping experience that loads instantly on mobile, highlights product value, and converts visitors into paying customers.",
    ctaText: "Build Your Store",
  },
  {
    id: "custom-web-applications",
    number: "03",
    title: "Custom Web Applications",
    tagline: "Tailor-made business software that streamlines internal workflows and scales your operations.",
    shortDescription:
      "Bespoke software platforms, administrative dashboards, and internal business tools.",
    fullDescription:
      "Off-the-shelf software rarely fits unique business processes. We design and build bespoke web applications, interactive customer portals, internal CRM systems, and administrative control panels that automate repetitive tasks and give management complete operational visibility.",
    deliverables: [
      "Executive & operational business dashboards",
      "Custom CRM & lead management systems",
      "Client portals & secure customer accounts",
      "Inventory, order & field operations tracking",
      "Role-based access control (RBAC) & admin panels",
    ],
    techStack: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Tailwind CSS"],
    idealFor: "Growing businesses outgrowing spreadsheets, financial services, logistics, and operational teams.",
    outcome: "Custom software that fits your exact operating model, reduces manual errors, and saves hundreds of staff hours.",
    ctaText: "Plan Custom Software",
  },
  {
    id: "mobile-pwa-development",
    number: "04",
    title: "Mobile & PWA Development",
    tagline: "App-like performance without the app store friction or high distribution barriers.",
    shortDescription:
      "Progressive Web Apps and mobile-first experiences that work seamlessly across every modern device.",
    fullDescription:
      "Modern users demand fluid handheld experiences. We build progressive web applications (PWAs) and responsive mobile interfaces that install directly onto customer devices, load instantly over spotty cellular networks, and offer offline resilience without the high cost of native app store distribution.",
    deliverables: [
      "Installable Progressive Web Applications (PWAs)",
      "Mobile-first customer-facing portals",
      "Offline-capable data entry interfaces",
      "Cross-platform hybrid builds via Capacitor",
      "Touch-optimized ergonomic UI design",
    ],
    techStack: ["PWA Web Standards", "Capacitor", "React", "Service Workers", "IndexedDB", "Tailwind"],
    idealFor: "Field teams, customer loyalty programs, on-the-go service teams, and mobile-first retail audiences.",
    outcome: "A lightweight, installable application that reaches users everywhere with zero download friction.",
    ctaText: "Explore Mobile Solutions",
  },
  {
    id: "automation-integrations",
    number: "05",
    title: "Automation & Integrations",
    tagline: "Connected business systems that work 24/7 so your team doesn't have to.",
    shortDescription:
      "API integrations, WhatsApp business workflows, and automated communication pipelines.",
    fullDescription:
      "Manual data entry and fragmented apps slow businesses down. We connect your digital touchpoints into unified automated pipelines—from automated WhatsApp order updates and payment webhooks to CRM syncs and real-time internal alerts.",
    deliverables: [
      "WhatsApp Business API automations & notifications",
      "Third-party API integrations (Stripe, Razorpay, Zoho, Google Workspace)",
      "Webhook processing & automated event routing",
      "Payment gateway reconciliation flows",
      "Automated lead delivery & notification systems",
    ],
    techStack: ["Node.js", "Serverless Functions", "WhatsApp Cloud API", "REST / Webhooks", "Redis"],
    idealFor: "Businesses looking to cut customer response times, eliminate manual bookkeeping, and automate client follow-ups.",
    outcome: "Reliable, background pipelines that keep customers informed and staff focused on high-value work.",
    ctaText: "Automate Your Workflows",
  },
];

