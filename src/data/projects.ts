export interface Project {
  slug: string;
  name: string;
  client: string;
  category: string;
  industry: string;
  year: string;
  location: string;
  locationVerified: boolean;
  statusBadge: string;
  statusType: "completed" | "in_progress" | "paused" | "cancelled" | "planning";
  liveUrl?: string;
  tagline: string;
  description: string;
  features: string[];
  highlights: string[];
  tags: string[];
  overview: string;
  businessRequirements: string[];
  challenges: string[];
  ourApproach: string[];
  designDecisions: string[];
  featuresDelivered: {
    title: string;
    description: string;
    items?: string[];
  }[];
  techStack: {
    category: string;
    technologies: string[];
  }[];
  screenshots: {
    desktop: string;
    mobile?: string;
    tablet?: string;
    caption: string;
  };
  ctaLabel: string;
  isMainPortfolio: boolean;
}

export const MAIN_PROJECTS: Project[] = [
  {
    slug: "asquare-beverages",
    name: "ASQUARE BEVERAGES",
    client: "Asquare Beverages",
    category: "Brand Website / Product Showcase",
    industry: "Packaged Drinking Water & Beverages",
    year: "2024",
    location: "Kakor / Kanpur, Uttar Pradesh, India",
    locationVerified: true,
    statusBadge: "Live Website",
    statusType: "completed",
    liveUrl: "https://www.asquaredrinks.co.in/",
    ctaLabel: "Visit Live Website",
    isMainPortfolio: true,
    tagline:
      "A product-focused digital presence showcasing bottled water purity, packaging craft, and regional distribution.",
    description:
      "A product-focused digital presence for a packaged drinking water brand, showcasing its products, brand identity, quality standards and business information.",
    features: [
      "Product showcase & volume specifications",
      "Brand storytelling (#KillTheThirst narrative)",
      "Multi-stage purification presentation (Sand, Carbon, RO, UV, Ozone)",
      "Responsive design across desktop & handheld devices",
      "Mobile-friendly navigation and distributor inquiry funnel",
      "Direct business enquiry experience for bulk supply",
    ],
    highlights: [
      "Product showcase & interactive SKU presentation",
      "Brand storytelling highlighting water treatment stages",
      "Mobile-friendly navigation and distributor inquiry funnel",
      "Responsive design engineered for fast mobile load times",
    ],
    tags: ["Brand Website", "Product Showcase", "React", "Mobile-First", "Tailwind CSS"],
    overview:
      "Asquare Beverages operates out of Kakor / Kanpur, Uttar Pradesh, manufacturing and distributing high-grade packaged drinking water. DataCraft designed and engineered a clean, modern digital presence that establishes immediate credibility with corporate buyers, hospitality partners, and regional distributors while telling the brand’s story of purity and clinical water filtration.",
    businessRequirements: [
      "Build a modern product-focused digital home that differentiates Asquare from regional commoditized bottlers.",
      "Prominently showcase packaging volumes (250ml, 500ml, 1L, 2L, and bulk supply).",
      "Highlight the advanced multi-stage purification technology (Sand filtration, Activated carbon, Reverse osmosis, UV, and Ozonation).",
      "Facilitate fast distributor inquiries via direct touch-friendly action buttons.",
    ],
    challenges: [
      "Designing a brand presence that feels consumer-inviting while catering directly to B2B distributors and event procurement managers.",
      "Ensuring high performance on mobile devices in regional industrial corridors.",
    ],
    ourApproach: [
      "Built a clear, vertical visual hierarchy: Hero product identity → Quality & purification narrative → Product catalogue showcase → Distributor contact funnel.",
      "Used clean water-inspired marine accents paired with crisp white surfaces for tactile freshness.",
      "Integrated direct inquiry triggers at key decision points throughout the visitor journey.",
    ],
    designDecisions: [
      "Large hero showcase featuring the signature Asquare bottle asset and brand motto.",
      "Clear visual badge system for certification and quality indicators.",
      "Streamlined layout that avoids clutter and puts the products front and center.",
    ],
    featuresDelivered: [
      {
        title: "Product Showcase & Volume Catalogue",
        description: "Clear presentation of all SKU packaging variations from single-serve bottles to 20L commercial dispensers.",
      },
      {
        title: "Brand Storytelling & Process Timeline",
        description: "Visual breakdown of multi-stage water filtration ensuring consumer confidence in hygiene and safety.",
      },
      {
        title: "Distributor & Procurement Portal",
        description: "Fast inquiry flow tailored for offices, hotels, distributors, and bulk event inquiries.",
      },
      {
        title: "Mobile-First Responsive Interface",
        description: "Touch-optimized navigation bar and fluid layouts calibrated for smartphones.",
      },
    ],
    techStack: [
      { category: "Frontend Framework", technologies: ["React", "Vite", "TypeScript"] },
      { category: "Styling & UI", technologies: ["Tailwind CSS", "Custom Keyframe Animations", "Lucide Icons"] },
      { category: "Optimization", technologies: ["Next-Gen Image Assets", "CSS Code Splitting", "Mobile Caching"] },
      { category: "Deployment", technologies: ["Vercel Edge Network", "Custom SSL", "DNS Acceleration"] },
    ],
    screenshots: {
      desktop: "/images/asquare_homepage.jpg", // ATTACHMENT 2: Exact user uploaded image
      mobile: "/screenshots/asquare_mobile.png", // Actual mobile capture
      caption: "Asquare Beverages homepage: original desktop preview featuring brand hero, product bottle, and distributor action.",
    },
  },
  {
    slug: "aurified",
    name: "AURIFIED SHOPIFY STORE",
    client: "Parth",
    category: "E-commerce Development",
    industry: "D2C Lifestyle & Wellness Products",
    year: "2024",
    location: "Varanasi, Uttar Pradesh, India",
    locationVerified: true,
    statusBadge: "In Progress",
    statusType: "in_progress",
    liveUrl: "https://aurified.in/",
    ctaLabel: "Visit Website",
    isMainPortfolio: true,
    tagline:
      "A structured and responsive Shopify storefront built around modern online shopping journeys.",
    description:
      "A Shopify-based e-commerce storefront developed for Aurified, a brand based in Varanasi, Uttar Pradesh. The project focuses on creating a polished online shopping experience with product discovery, responsive storefront design, product presentation, and a streamlined shopping journey.",
    features: [
      "Shopify storefront development & theme customization",
      "E-commerce product catalogue architecture",
      "Product presentation with clear pricing and variants",
      "Responsive shopping experience optimized for mobile checkout",
      "Brand-focused design with structured navigation",
    ],
    highlights: [
      "Shopify development & theme customization",
      "E-commerce storefront tailored for lifestyle commerce",
      "Product presentation with clear variant matrices",
      "Responsive shopping experience across mobile viewports",
      "Brand-focused design with frictionless browsing",
    ],
    tags: ["Shopify", "E-commerce Development", "Liquid", "Conversion Optimization", "Mobile Commerce"],
    overview:
      "A Shopify-based e-commerce storefront developed for Aurified, a brand based in Varanasi, Uttar Pradesh. The project focuses on creating a polished online shopping experience with product discovery, responsive storefront design, product presentation, and a streamlined shopping journey.",
    businessRequirements: [
      "Structure multi-category product lines (Accessories, Gym Wear, Home Essentials) for effortless discovery.",
      "Ensure fast page load speeds on mobile networks where the majority of D2C shoppers browse.",
      "Implement clear product value props, transparent pricing, and reassuring checkout signals.",
      "Integrate native Shopify checkout, UPI gateways, and automated order fulfillment tracking.",
    ],
    challenges: [
      "Organizing varied utility and wellness products without creating visual clutter.",
      "Maintaining quick page response times while loading high-resolution lifestyle imagery.",
    ],
    ourApproach: [
      "Implemented an uncluttered, modern layout with generous negative space and clear typographic rhythm.",
      "Created quick-browse collection grids allowing shoppers to scan variants and prices instantly.",
      "Optimized the mobile cart drawer and slide-out navigation to minimize checkout drop-offs.",
    ],
    designDecisions: [
      "Clean neutral surfaces that elevate product photography and texture.",
      "Restrained badges and icons avoiding generic drop-shipping aesthetic.",
      "Thumb-friendly navigation bar on mobile viewports for effortless category switching.",
    ],
    featuresDelivered: [
      {
        title: "Curated Category Discovery",
        description: "Taxonomy and product grids allowing users to filter across home, fitness, and lifestyle accessories.",
      },
      {
        title: "Mobile Commerce Funnel",
        description: "Optimized mobile slide-over cart and quick-add actions tailored for handheld purchasing.",
      },
      {
        title: "Shopify Theme Architecture",
        description: "Modular theme sections allowing the merchant team to launch new campaigns and drops easily.",
      },
      {
        title: "Checkout Trust & Gateway Integration",
        description: "Configured secure payment processing, UPI gateways, and automated shipment notifications.",
      },
    ],
    techStack: [
      { category: "Platform", technologies: ["Shopify Storefront", "Shopify Liquid", "Online Store 2.0"] },
      { category: "Frontend Engine", technologies: ["Modern JavaScript", "Modular CSS", "Web Components"] },
      { category: "Analytics & Tracking", technologies: ["Shopify Web Pixels", "Event Tracking", "Meta Pixel"] },
      { category: "Checkout", technologies: ["Shopify Hosted Checkout", "UPI / Razorpay Gateway", "SMS Updates"] },
    ],
    screenshots: {
      desktop: "/screenshots/aurified_desktop.png",
      mobile: "/screenshots/aurified_mobile.png",
      caption: "Aurified storefront: responsive desktop home and mobile product browsing experience.",
    },
  },
  {
    slug: "finance-crm",
    name: "FINANCE CRM PLATFORM",
    client: "Confidential Finance Client",
    category: "Custom Software Development",
    industry: "Finance Management & Loan Operations CRM",
    year: "2024",
    location: "Auraiya, Uttar Pradesh, India",
    locationVerified: true,
    statusBadge: "Prototyped / Paused",
    statusType: "paused",
    liveUrl: "https://crm-two-orcin-18.vercel.app/#dashboard",
    ctaLabel: "Explore Project",
    isMainPortfolio: true,
    tagline:
      "A custom-built finance management and loan operations platform designed to automate EMI operations and field recovery.",
    description:
      "A custom-built finance management and loan operations platform developed for a finance company based in Auraiya, Uttar Pradesh. The platform centralizes customer onboarding, loan management, EMI calculations, payment allocation, field recovery operations, reporting, and administrative workflows into one integrated system.",
    features: [
      "Customer onboarding & digital KYC verification",
      "Loan application, lifecycle & collateral management",
      "Automated EMI calculation & waterfall payment allocation",
      "Payment collection, allocation & reversal tracking",
      "Field recovery queues, agent tracking & contact logs",
      "Role-based access control & executive operational monitoring",
    ],
    highlights: [
      "Executive finance dashboard with real-time portfolio metrics",
      "ACID-compliant collection ledger with automated waterfall allocation",
      "Field recovery queues, agent tracking & contact activity logs",
      "Portfolio-at-Risk (PAR) aging and credit exposure reporting",
      "Role-based access control safeguarding sensitive ledger operations",
    ],
    tags: ["Custom Software Development", "Finance Management CRM", "TypeScript", "React", "Capacitor", "Role-Based Access"],
    overview:
      "A custom-built finance management and loan operations platform developed for a finance company based in Auraiya, Uttar Pradesh. The platform centralizes customer onboarding, loan management, EMI calculations, payment allocation, field recovery operations, reporting, and administrative workflows into one integrated system. Built as an enterprise operational system, it replaces physical ledgers and disparate spreadsheets with a central, ACID-compliant collection ledger.",
    businessRequirements: [
      "Replace physical ledgers and disparate spreadsheets with a central, ACID-compliant collection ledger.",
      "Calculate amortization schedules, overdue penalty fees, and waterfall payment allocations automatically.",
      "Provide field recovery agents with mobile-ready verification tools, contact logging, and recovery queues.",
      "Enforce granular role-based permissions between store dealers, field officers, and executive management.",
    ],
    challenges: [
      "Translating complex financial calculation edge cases (irregular repayments, grace periods, DPD buckets) into reliable software logic.",
      "Structuring high-density data views that remain readable on both desktop monitors and field tablet screens.",
    ],
    ourApproach: [
      "Engineered a strongly typed TypeScript frontend paired with strict runtime schema validation to eliminate calculation errors.",
      "Designed a dark technical aesthetic with high-contrast data visualizations for portfolio health and collection efficiency.",
      "Created modular tabbed views for Operations Dashboard, Dealer Stores, Field Agents, and Recovery Follow-ups.",
    ],
    designDecisions: [
      "Executive command layout featuring quick-view cards: Total Disbursed, Active Portfolio, Total Overdue, Collection Efficiency.",
      "Visual channel breakdown distinguishing Direct Customer, Store Dealer, and Recovery Agent collection streams.",
      "Color-coded risk indicators for delinquent accounts to help collection teams prioritize recovery outreach.",
    ],
    featuresDelivered: [
      {
        title: "Customer & Loan Management",
        description: "Customer onboarding and profile management, digital KYC verification, and complete loan lifecycle administration.",
        items: [
          "Customer onboarding and profile management.",
          "KYC and document management.",
          "Loan application and lifecycle management.",
          "Product and collateral management.",
        ],
      },
      {
        title: "EMI & Financial Operations",
        description: "Automated calculations, payment allocation algorithms, and transaction ledgers.",
        items: [
          "Automated EMI calculations.",
          "Payment collection and allocation.",
          "Waterfall-based payment allocation.",
          "Payment reversals and transaction tracking.",
          "Outstanding balance management.",
        ],
      },
      {
        title: "Field Recovery & Collections",
        description: "Field recovery operations, mobile agent tracking, and dealer store workflows.",
        items: [
          "Agent and dealer management.",
          "Recovery queues and collection tracking.",
          "Agent contact activity logs.",
          "Follow-up and payment commitment tracking.",
          "Collection performance summaries.",
        ],
      },
      {
        title: "Administration & Reporting",
        description: "Granular role-based security, comprehensive audit trails, and portfolio intelligence.",
        items: [
          "Role-based access control.",
          "Admin and manager dashboards.",
          "Financial reports and exports.",
          "Audit logs and activity tracking.",
          "Notifications and operational monitoring.",
        ],
      },
    ],
    techStack: [
      { category: "Frontend Engine", technologies: ["React", "TypeScript", "Vite", "Capacitor Mobile Bridge"] },
      { category: "Design System", technologies: ["Tailwind CSS", "Plus Jakarta Sans", "JetBrains Mono"] },
      { category: "State & Data Validation", technologies: ["Zod Schemas", "React Context", "Decimal.js Financial Engine"] },
      { category: "Infrastructure", technologies: ["Vercel Edge Network", "PWA Service Workers", "IndexedDB"] },
    ],
    screenshots: {
      desktop: "/images/crm_dashboard.jpg", // ATTACHMENT 1: Exact user uploaded image
      mobile: "/screenshots/crm_mobile.webp", // Newly attached CRM mobile screenshot
      caption: "Finance CRM Platform: original executive dashboard screenshot showing live portfolio command, collection efficiency, and channel distribution.",
    },
  },
];

// Experimental & Unfinished Works (Clearly separated per prompt requirements)
export const EXPERIMENTAL_PROJECTS: Project[] = [
  {
    slug: "phonevault-pro",
    name: "PHONEVAULT PRO",
    client: "Shivendra Rathore",
    category: "Mobile Inventory Management / PWA",
    industry: "Consumer Electronics Retail & Buyback",
    year: "2024",
    location: "Location not verified",
    locationVerified: false,
    statusBadge: "Cancelled Before Completion",
    statusType: "cancelled",
    isMainPortfolio: false,
    ctaLabel: "Archived Specifications",
    tagline:
      "An inventory and buyback management application prototyped for smartphone retailers.",
    description:
      "An inventory and buyback management application designed for smartphone retailers. This project was cancelled prior to completion and is preserved in our research archive.",
    features: [
      "Smartphone inventory tracking & IMEI cataloguing",
      "Device purchase and wholesale intake tracking",
      "Retail customer directory & KYC document handling",
      "Buyback pricing evaluation & trade-in management",
      "Inventory reporting & CSV data export workflows",
      "Mobile-friendly Progressive Web App (PWA) architecture",
    ],
    highlights: [
      "IMEI scanning and device intake workflow design",
      "Trade-in buyback estimation calculator",
      "Customer identity & KYC upload pipeline",
      "Lightweight installable PWA interface",
    ],
    tags: ["Unfinished Prototype", "Inventory PWA", "Mobile Web App", "Research Archive"],
    overview:
      "PhoneVault Pro was conceptualized as a mobile-first inventory and buyback platform for independent mobile handset retailers. The scope encompassed IMEI tracking, refurbished device trade-ins, customer KYC documentation, and purchase logs. The engagement was cancelled before completion and is presented here exclusively as an archival technical case study.",
    businessRequirements: [
      "Replace manual paper registers for second-hand device purchases.",
      "Capture customer identification to comply with local electronics trade-in regulations.",
      "Provide instantaneous pricing guidelines for refurbished smartphone trade-ins.",
    ],
    challenges: [
      "Streamlining multi-point device grading and IMEI validation on handheld smartphone screens.",
      "Managing offline image capture for physical phone defect logging.",
    ],
    ourApproach: [
      "Architected a mobile-first PWA flow with client-side camera access for barcode and ID card scanning.",
      "Engineered an offline-first data model utilizing IndexedDB for store environments with intermittent Wi-Fi.",
    ],
    designDecisions: [
      "High-contrast card views optimized for fast retail counter interactions.",
      "Step-by-step device evaluation wizard minimizing staff intake errors.",
    ],
    featuresDelivered: [
      {
        title: "Device Intake & IMEI Scanner Architecture",
        description: "Initial specification and UI flow for logging incoming handsets with IMEI verification.",
      },
      {
        title: "Trade-In Pricing Calculator Prototype",
        description: "Algorithmic grading model adjusting trade-in buyback offer based on screen, battery, and cosmetic health.",
      },
    ],
    techStack: [
      { category: "Target Framework", technologies: ["React", "PWA Web Standards", "Capacitor Android"] },
      { category: "Data Storage", technologies: ["IndexedDB", "Offline Storage Sync"] },
    ],
    screenshots: {
      desktop: "/screenshots/crm_loans.png",
      caption: "Archival component prototype: mobile inventory table & data views.",
    },
  },
];

// Planning Stage (NOT shown in public portfolio, preserved for internal records)
export const PLANNING_PROJECTS = [
  {
    name: "Shopify Store",
    client: "Private Client",
    category: "Shopify / E-commerce",
    status: "Planning",
    location: "Location not verified",
    note: "No confirmed live website or completed deliverables are available. Kept strictly out of the public portfolio.",
  },
];

// Unified helper
export const ALL_PUBLIC_PROJECTS = [...MAIN_PROJECTS];
