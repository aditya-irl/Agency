export interface LocationPage {
  slug: string;
  name: string;
  regionLabel: string;
  areasServed: string[];
  title: string;
  description: string;
  heading: string;
  introduction: string[];
  challenges: {
    title: string;
    context: string;
    approach: string;
  }[];
  industries: {
    name: string;
    examples: string;
  }[];
  services: {
    name: string;
    description: string;
    contactService: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "website-development-company-auraiya",
    name: "Auraiya",
    regionLabel: "Auraiya, Uttar Pradesh · UP-79",
    areasServed: ["Auraiya", "Uttar Pradesh", "India"],
    title: "Website Development Company in Auraiya | DataCrafts",
    description:
      "DataCrafts builds mobile-friendly business websites, e-commerce stores and custom software for businesses in Auraiya, Uttar Pradesh.",
    heading: "Website development for growing businesses in Auraiya",
    introduction: [
      "A clear, dependable website helps customers understand what a business offers before they call, visit or request a quote. DataCrafts plans and builds custom business websites, online stores and practical software for organizations serving Auraiya.",
      "Whether you need a first website, a better way to present a product range, or a more useful enquiry journey, we start with your customers and business goals—not a one-size-fits-all template. Pages are designed for mobile use, straightforward navigation and search-friendly structure.",
    ],
    challenges: [
      {
        title: "Customers need useful information quickly",
        context:
          "A business website can lose enquiries when services, contact details, service coverage or next steps are difficult to find on a phone.",
        approach:
          "We organize the most important information around real customer questions, make contact actions prominent and test the experience across screen sizes.",
      },
      {
        title: "Product catalogues change over time",
        context:
          "Retailers, distributors and makers may need to show a changing range without rebuilding their whole online presence for every update.",
        approach:
          "We scope a maintainable catalogue or e-commerce setup around how products, enquiries, orders and updates are handled today.",
      },
      {
        title: "Manual follow-up can slow down a small team",
        context:
          "When enquiries arrive through several channels, it can be difficult to keep their details and follow-ups together.",
        approach:
          "Where it makes sense, we connect website forms to a CRM, shared workflow or notification process, with clear ownership of each new lead.",
      },
    ],
    industries: [
      {
        name: "Retail and product businesses",
        examples:
          "Present product ranges, key details and store contact options; add online ordering when it fits the business model.",
      },
      {
        name: "Local services and professional practices",
        examples:
          "Explain services, answer common questions and help prospective customers request a consultation or estimate.",
      },
      {
        name: "Education, training and community organizations",
        examples:
          "Make courses, schedules, admissions information and enquiry routes easier to understand on mobile.",
      },
    ],
    services: [
      {
        name: "Custom business websites",
        description:
          "A clear, mobile-first site for your services, products, locations served and customer enquiries.",
        contactService: "Website Development",
      },
      {
        name: "E-commerce and product catalogues",
        description:
          "A structured storefront or catalogue planned around your products, fulfilment and customer support.",
        contactService: "E-commerce Development",
      },
      {
        name: "Lead workflows and CRM",
        description:
          "Purpose-built enquiry capture, lead tracking and integrations to reduce repetitive follow-up.",
        contactService: "Custom Software Development",
      },
      {
        name: "Landing pages and website refreshes",
        description:
          "Focused campaign pages or a considered redesign that improves content hierarchy and usability.",
        contactService: "Website Development",
      },
    ],
    faqs: [
      {
        question: "Do you provide website development services in Auraiya?",
        answer:
          "Yes. DataCrafts works with businesses in Auraiya on custom websites, e-commerce projects and software requirements. We first discuss the audience, scope and preferred collaboration arrangements; this service-area page does not represent a local office.",
      },
      {
        question: "Can you build an e-commerce website for my Auraiya business?",
        answer:
          "Yes. We can scope a product catalogue or online store around your products, payment and fulfilment requirements, and the way you want to manage orders. The right platform depends on those needs.",
      },
      {
        question: "Will my website work well on mobile and be search-friendly?",
        answer:
          "Mobile layouts, descriptive page titles, crawlable page structure and useful content are part of our planning. Search visibility depends on many factors beyond the website, so no ranking position is guaranteed.",
      },
      {
        question: "How do I discuss a project or get an estimate?",
        answer:
          "Send a brief through the enquiry form or message DataCrafts on WhatsApp. We will clarify the goals, features, content and timing before recommending a scope and estimate.",
      },
    ],
  },
  {
    slug: "website-development-company-kanpur",
    name: "Kanpur",
    regionLabel: "Kanpur City · Uttar Pradesh",
    areasServed: ["Kanpur", "Kanpur Nagar", "Uttar Pradesh", "India"],
    title: "Website Development Company in Kanpur | DataCrafts",
    description:
      "Custom website development, e-commerce and business software for Kanpur companies—from product-led manufacturers to service businesses.",
    heading: "Digital products built around how Kanpur businesses work",
    introduction: [
      "For a manufacturer, supplier or service firm, a website should do more than look polished: it should help the right customer understand the offer and take a useful next step. DataCrafts builds custom business websites, online stores and web applications for organizations in Kanpur.",
      "We shape each project around its sales process—whether that means presenting technical products, collecting quote requests, improving a direct-to-customer storefront or connecting a website to internal tools. The result is designed to be maintainable as the business and its catalogue evolve.",
    ],
    challenges: [
      {
        title: "Complex products need a clear digital presentation",
        context:
          "A broad catalogue or technical offering can be hard to explain when pages rely on unstructured PDFs, outdated product lists or generic copy.",
        approach:
          "We map products and buyer questions into a browsable information structure, with specifications, supporting content and enquiry routes suited to each offering.",
      },
      {
        title: "A website enquiry should reach the right person",
        context:
          "Quote requests and sales leads can be delayed when a form collects too little context or sends every message into one unowned inbox.",
        approach:
          "We design forms around qualification needs and can connect them to CRM or notification workflows, keeping handover and follow-up visible.",
      },
      {
        title: "Disconnected tools create avoidable administration",
        context:
          "Teams using separate spreadsheets and business tools may need to repeat the same updates across systems.",
        approach:
          "We assess where a focused integration, automation or custom web application can simplify the workflow without adding unnecessary software.",
      },
    ],
    industries: [
      {
        name: "Manufacturing and industrial suppliers",
        examples:
          "Organize product specifications, capabilities, certifications supplied by the business and quote enquiries in a buyer-friendly site.",
      },
      {
        name: "Retail and consumer brands",
        examples:
          "Build a brand-led catalogue or e-commerce experience with product discovery and a straightforward mobile checkout.",
      },
      {
        name: "Professional and local service firms",
        examples:
          "Explain service packages, establish credibility through clear information and route enquiries to the right team.",
      },
    ],
    services: [
      {
        name: "Custom business websites",
        description:
          "Fast, responsive sites with clear service, product and lead-generation journeys.",
        contactService: "Website Development",
      },
      {
        name: "E-commerce development",
        description:
          "A storefront planned around catalogue size, operations, payments and customer support.",
        contactService: "E-commerce Development",
      },
      {
        name: "CRM, ERP and business applications",
        description:
          "Custom dashboards, CRM workflows and ERP-style modules that help teams manage enquiries, records or operations.",
        contactService: "Custom Software Development",
      },
      {
        name: "Automation and system integrations",
        description:
          "Connect relevant tools and reduce repetitive hand-offs where a reliable integration is practical.",
        contactService: "Automation & Integrations",
      },
    ],
    faqs: [
      {
        question: "Does DataCrafts work with companies in Kanpur?",
        answer:
          "Yes. DataCrafts serves businesses in Kanpur with website development, e-commerce, CRM and custom software projects. We are describing service coverage, not claiming a Kanpur office or local branch.",
      },
      {
        question: "Can you build a website for a manufacturer or B2B supplier?",
        answer:
          "Yes. We can structure product and capability information, add quote or consultation forms and plan integrations with the tools your team uses. Requirements vary, so we define the scope after understanding your sales workflow.",
      },
      {
        question: "Can a website connect to our CRM or existing systems?",
        answer:
          "Often, if the systems provide a suitable and secure integration method. We review the available APIs, data flow and operational requirements before confirming what can be connected.",
      },
      {
        question: "Do you guarantee search rankings in Kanpur?",
        answer:
          "No responsible developer can guarantee specific rankings. We can build a technically sound, indexable website and help structure relevant content, while rankings depend on competition, content quality, authority and other changing search factors.",
      },
    ],
  },
  {
    slug: "website-development-company-delhi-ncr",
    name: "Delhi NCR",
    regionLabel: "Delhi · Noida · Greater Noida · Ghaziabad · Gurugram · Faridabad",
    areasServed: [
      "Delhi",
      "Noida",
      "Greater Noida",
      "Ghaziabad",
      "Gurugram",
      "Faridabad",
      "National Capital Region",
      "India",
    ],
    title: "Website Development Company in Delhi NCR | DataCrafts",
    description:
      "DataCrafts delivers custom websites, e-commerce, CRM and software development for growing businesses across Delhi NCR.",
    heading: "Website and software development for Delhi NCR businesses",
    introduction: [
      "Businesses operating across Delhi NCR often need a digital experience that can support more than one audience, channel or internal workflow. DataCrafts plans and builds business websites, e-commerce experiences and custom software for teams in Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad.",
      "From a focused lead-generation site to a connected CRM workflow or product storefront, our work starts with the business problem, the people using the product and the systems already in place. We build with clear information architecture, responsive interfaces and a practical plan for ongoing content and product changes.",
    ],
    challenges: [
      {
        title: "Many audiences need a coherent experience",
        context:
          "A company serving multiple cities, industries or customer types can end up with scattered pages and unclear routes to enquiry.",
        approach:
          "We map customer journeys and organize services, locations and proof points so visitors can find the information relevant to them without duplicating thin city pages.",
      },
      {
        title: "Marketing leads need a reliable hand-off",
        context:
          "Campaign traffic is wasted when landing pages are slow or unclear, forms ask the wrong questions, or leads do not reach the sales workflow.",
        approach:
          "We build focused landing pages, make the next step explicit and connect enquiry capture to suitable email, CRM or analytics workflows.",
      },
      {
        title: "Growth exposes gaps between business systems",
        context:
          "As teams and order volumes grow, manual processes between storefronts, customer records and internal operations can become harder to manage.",
        approach:
          "We identify high-friction steps and scope custom software or integrations around measurable operational needs rather than adding technology for its own sake.",
      },
    ],
    industries: [
      {
        name: "B2B, technology and professional services",
        examples:
          "Explain complex services, route qualified enquiries and connect lead capture to a considered sales process.",
      },
      {
        name: "D2C and e-commerce brands",
        examples:
          "Create a distinctive storefront with structured product discovery, a clear checkout journey and room for catalogue growth.",
      },
      {
        name: "Multi-location and operations-led businesses",
        examples:
          "Present accurate service coverage and develop internal dashboards or CRM workflows for distributed teams.",
      },
    ],
    services: [
      {
        name: "Website design and development",
        description:
          "Conversion-focused business websites and landing pages with responsive design and technically sound foundations.",
        contactService: "Website Development",
      },
      {
        name: "E-commerce development",
        description:
          "Custom storefronts and Shopify experiences planned around merchandising and fulfilment workflows.",
        contactService: "E-commerce Development",
      },
      {
        name: "Custom software, CRM and ERP workflows",
        description:
          "Web applications and operational tools designed around your team, data and process requirements.",
        contactService: "Custom Software Development",
      },
      {
        name: "Business automation and integrations",
        description:
          "Practical connections between forms, communications, analytics and the systems your business depends on.",
        contactService: "Automation & Integrations",
      },
    ],
    faqs: [
      {
        question: "Which Delhi NCR locations does DataCrafts serve?",
        answer:
          "DataCrafts serves projects in Delhi, Noida, Greater Noida, Ghaziabad, Gurugram and Faridabad. The service area does not imply a physical office in any of these cities.",
      },
      {
        question: "Can you develop a custom CRM or business web application?",
        answer:
          "Yes. We scope custom applications around real workflows, user roles, data requirements and integrations. We first assess whether a custom build is appropriate compared with adapting an existing tool.",
      },
      {
        question: "Can you build separate pages for our NCR service areas?",
        answer:
          "We can help structure location information where each page serves a distinct user need and has accurate, useful content. We do not recommend cloning near-identical city pages solely to target keywords.",
      },
      {
        question: "How do we start a Delhi NCR project?",
        answer:
          "Share your goals, current website or systems, target users and preferred timeline through the enquiry form or WhatsApp. DataCrafts will review the brief and discuss a suitable scope and next steps.",
      },
    ],
  },
];

export function getLocationPage(slug: string): LocationPage {
  const location = LOCATION_PAGES.find((page) => page.slug === slug);
  if (!location) {
    throw new Error(`Missing service-area page content for "${slug}".`);
  }
  return location;
}
