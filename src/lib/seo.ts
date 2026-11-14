import type { Metadata } from "next";
import { BRAND } from "@/data/studio";

const DEFAULT_OG_IMAGE = "/audit/preview.PNG";
const DEFAULT_OG_IMAGE_ALT = "DataCrafts digital studio website preview";

export interface GeoLocationInput {
  latitude: number;
  longitude: number;
  placename?: string;
  region?: string;
}

export interface PageMetadataInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
  keywords?: string[];
  geo?: GeoLocationInput;
}

export const DEFAULT_GEO: GeoLocationInput = {
  latitude: 26.4674,
  longitude: 79.5186,
  placename: "Auraiya, Uttar Pradesh, India",
  region: "IN-UP",
};

export function createPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  imageAlt = DEFAULT_OG_IMAGE_ALT,
  type = "website",
  keywords,
  geo = DEFAULT_GEO,
}: PageMetadataInput): Metadata {
  const canonicalUrl = `${BRAND.websiteUrl}${
    path.startsWith("/") ? path : `/${path}`
  }`;

  const defaultKeywords = [
    "DataCrafts",
    "Digital Studio",
    "Web Development Company in Auraiya",
    "Website Designer in Auraiya",
    "Website Development Company in Kanpur",
    "Custom Software Development Uttar Pradesh",
    "Shopify Store Developer India",
    "Next.js Development Agency",
    "CRM and ERP Systems",
    "Business Automation India",
  ];

  const mergedKeywords = Array.from(
    new Set([...(keywords || []), ...defaultKeywords])
  );

  const lat = geo.latitude;
  const lon = geo.longitude;
  const placename = geo.placename || DEFAULT_GEO.placename;
  const region = geo.region || DEFAULT_GEO.region;

  return {
    title,
    description,
    keywords: mergedKeywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: BRAND.name,
      locale: "en_IN",
      type,
      images: [
        {
          url: image,
          width: 1789,
          height: 879,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
    other: {
      "geo.region": region || "IN-UP",
      "geo.placename": placename || "Auraiya, Uttar Pradesh, India",
      "geo.position": `${lat};${lon}`,
      ICBM: `${lat}, ${lon}`,
      "DC.title": title,
      "DC.creator": BRAND.fullName,
      "DC.language": "en-IN",
    },
  };
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * Builds the comprehensive Schema.org JSON-LD graph connecting Organization,
 * ProfessionalService / LocalBusiness, and WebSite for advanced Local SEO & Google Knowledge Graph.
 */
export function generateGlobalStructuredData(areasServedList: string[]) {
  const organizationId = `${BRAND.websiteUrl}/#organization`;
  const localBusinessId = `${BRAND.websiteUrl}/#localbusiness`;
  const websiteId = `${BRAND.websiteUrl}/#website`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": organizationId,
        name: BRAND.fullName,
        alternateName: [BRAND.name, BRAND.shortName],
        url: BRAND.websiteUrl,
        logo: `${BRAND.websiteUrl}/images/logo_mark.png`,
        image: `${BRAND.websiteUrl}/audit/preview.PNG`,
        email: BRAND.primaryEmail,
        telephone: BRAND.callingOnlyPhoneRaw,
        foundingDate: BRAND.established,
        founders: BRAND.founders.map((founder) => ({
          "@type": "Person",
          name: founder.name,
          jobTitle: founder.role,
          description: founder.bio,
          url: `${BRAND.websiteUrl}/about`,
        })),
        contactPoint: [
          {
            "@type": "ContactPoint",
            contactType: "customer service",
            telephone: BRAND.callingOnlyPhoneRaw,
            email: BRAND.primaryEmail,
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
          {
            "@type": "ContactPoint",
            contactType: "sales and consultations",
            telephone: BRAND.callWhatsappPhoneRaw,
            email: BRAND.primaryEmail,
            areaServed: "IN",
            availableLanguage: ["English", "Hindi"],
          },
        ],
        sameAs: [
          "https://github.com/aditya-irl/Agency",
        ],
      },
      {
        "@type": ["ProfessionalService", "LocalBusiness"],
        "@id": localBusinessId,
        name: BRAND.fullName,
        alternateName: BRAND.name,
        description: BRAND.positioning,
        url: BRAND.websiteUrl,
        telephone: BRAND.callingOnlyPhoneRaw,
        email: BRAND.primaryEmail,
        image: `${BRAND.websiteUrl}/audit/preview.PNG`,
        priceRange: "₹3,000 - ₹1,50,000",
        currenciesAccepted: "INR, USD",
        paymentAccepted: "UPI, Net Banking, Credit Card, Bank Transfer",
        address: {
          "@type": "PostalAddress",
          streetAddress: "Auraiya City",
          addressLocality: "Auraiya",
          addressRegion: "Uttar Pradesh",
          postalCode: "206122",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: DEFAULT_GEO.latitude,
          longitude: DEFAULT_GEO.longitude,
        },
        areaServed: areasServedList.map((area) => ({
          "@type": "Place",
          name: area,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "09:00",
            closes: "20:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Digital Studio Capabilities",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Website Design and Development",
                description:
                  "High-converting, responsive business websites engineered with Next.js, React, and Tailwind CSS.",
                url: `${BRAND.websiteUrl}/services`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Shopify E-Commerce Store Development",
                description:
                  "Tailor-made Shopify storefronts, product catalogues, payment gateways, and checkout flows.",
                url: `${BRAND.websiteUrl}/services`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Custom Software, CRM and ERP Platform Engineering",
                description:
                  "Bespoke internal systems, finance management, customer onboarding, and EMI recovery platforms.",
                url: `${BRAND.websiteUrl}/services`,
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Business Process Automation and API Integrations",
                description:
                  "Automating lead workflows, WhatsApp business notifications, CRM sync, and database integrations.",
                url: `${BRAND.websiteUrl}/services`,
              },
            },
          ],
        },
        parentOrganization: {
          "@id": organizationId,
        },
      },
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: BRAND.websiteUrl,
        name: BRAND.name,
        alternateName: BRAND.fullName,
        inLanguage: ["en-IN", "hi-IN"],
        publisher: {
          "@id": organizationId,
        },
      },
    ],
  };
}
