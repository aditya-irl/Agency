import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { LOCATION_PAGES, type LocationPage } from "@/data/locations";
import { BRAND } from "@/data/studio";
import { MAIN_PROJECTS } from "@/data/projects";
import { serializeJsonLd } from "@/lib/seo";

interface LocationLandingPageProps {
  location: LocationPage;
}

const SITE_URL = BRAND.websiteUrl;

export default function LocationLandingPage({
  location,
}: LocationLandingPageProps) {
  const pageUrl = `${SITE_URL}/${location.slug}`;
  const whatsappUrl = new URL(BRAND.officialWhatsAppUrl);
  whatsappUrl.searchParams.set(
    "text",
    `Hi DataCrafts, I would like to discuss a website or software project for my business in ${location.name}.`
  );

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["ProfessionalService", "LocalBusiness"],
    "@id": `${pageUrl}#localbusiness`,
    name: `DataCrafts — Website & Software Development in ${location.name}`,
    description: location.description,
    url: pageUrl,
    telephone: BRAND.callingOnlyPhoneRaw,
    email: BRAND.primaryEmail,
    priceRange: "₹3,000 - ₹1,50,000",
    image: `${SITE_URL}/audit/preview.PNG`,
    address: {
      "@type": "PostalAddress",
      addressLocality: location.addressLocality,
      addressRegion: location.addressRegion,
      postalCode: location.postalCode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: location.geo.latitude,
      longitude: location.geo.longitude,
    },
    areaServed: location.areasServed.map((name) => ({
      "@type": "Place",
      name,
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
    parentOrganization: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Website and software development services in ${location.name}`,
    description: location.description,
    serviceType: [
      "Website development",
      "E-commerce development",
      "Custom software development",
      "CRM and ERP development",
      "Business automation",
    ],
    provider: {
      "@id": `${SITE_URL}/#organization`,
    },
    areaServed: location.areasServed.map((name) => ({
      "@type": "Place",
      name,
    })),
    url: pageUrl,
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${SITE_URL}/services`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `Website development in ${location.name}`,
        item: pageUrl,
      },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: location.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema) }}
      />

      <div className="editorial-container space-y-16 pb-24 md:space-y-24">
        <nav aria-label="Breadcrumb" className="pt-4">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-text-secondary">
            <li>
              <Link href="/" className="hover:text-accent">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/services" className="hover:text-accent">
                Services
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-foreground">
              {location.name}
            </li>
          </ol>
        </nav>

        <header className="grid gap-10 border-b border-[rgba(35,31,32,0.12)] pb-12 md:grid-cols-12 md:items-end md:pb-16">
          <div className="space-y-6 md:col-span-8">
            <span className="badge-pill">{location.regionLabel}</span>
            <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {location.heading}
            </h1>
            {location.introduction.map((paragraph) => (
              <p
                key={paragraph}
                className="max-w-3xl text-base leading-relaxed text-text-secondary md:text-lg"
              >
                {paragraph}
              </p>
            ))}
            <p className="max-w-3xl border-l-2 border-accent pl-4 text-sm leading-relaxed text-text-secondary">
              DataCrafts serves projects in {location.name}. This is a service
              area, not a claim of a local office or staffed branch.
            </p>
            <div className="flex flex-wrap gap-3 pt-1">
              <Link
                href="#enquiry"
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent"
              >
                Get a free consultation
                <ArrowDown className="h-4 w-4" />
              </Link>
              <a
                href={whatsappUrl.toString()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-emerald-700 bg-emerald-950/70 px-5 py-3 text-sm font-semibold text-emerald-300 transition-colors hover:bg-emerald-900/80"
              >
                <MessageCircle className="h-4 w-4 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </header>

        <section aria-labelledby="challenges-heading" className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Common digital challenges</span>
            <h2
              id="challenges-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Practical ways we approach digital growth in {location.name}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {location.challenges.map((challenge) => (
              <div
                key={challenge.title}
                className="rounded-3xl border border-[rgba(35,31,32,0.1)] bg-[#FFFDF6] p-6 shadow-sm"
              >
                <h3 className="text-lg font-bold text-foreground">
                  {challenge.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {challenge.context}
                </p>
                <div className="mt-4 border-t border-[rgba(35,31,32,0.08)] pt-4 text-xs font-semibold uppercase tracking-wider text-accent">
                  How we solve it
                </div>
                <p className="mt-1 text-sm leading-relaxed text-foreground">
                  {challenge.approach}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="services-heading" className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Capabilities</span>
            <h2
              id="services-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Services we provide for {location.name} projects
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {location.services.map((service) => (
              <div
                key={service.name}
                className="rounded-3xl border border-[rgba(35,31,32,0.1)] bg-[#FFFDF6] p-7 shadow-sm"
              >
                <h3 className="text-xl font-bold text-foreground">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <Link
                  href={`#enquiry`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Discuss this capability
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="industries-heading" className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Industry experience</span>
            <h2
              id="industries-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Who we work with in {location.name} and across Uttar Pradesh
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {location.industries.map((ind) => (
              <div
                key={ind.name}
                className="rounded-3xl border border-[rgba(35,31,32,0.1)] bg-[#FCFAF8] p-6"
              >
                <h3 className="text-base font-bold text-foreground">
                  {ind.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {ind.examples}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="projects-heading" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-2">
              <span className="badge-pill">Selected Work</span>
              <h2
                id="projects-heading"
                className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
              >
                Real client systems built for scale
              </h2>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              View all case studies
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {MAIN_PROJECTS.map((project) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group rounded-3xl border border-[rgba(35,31,32,0.1)] bg-[#FFFDF6] p-6 transition-colors hover:border-accent/50"
              >
                <h3 className="text-lg font-bold text-foreground group-hover:text-accent">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {project.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent">
                  View case study
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="faq-heading" className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Questions and answers</span>
            <h2
              id="faq-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Website development in {location.name}: FAQs
            </h2>
          </div>
          <div className="divide-y divide-[rgba(35,31,32,0.12)] border-y border-[rgba(35,31,32,0.12)]">
            {location.faqs.map((faq) => (
              <details key={faq.question} className="group py-5">
                <summary className="cursor-pointer list-none pr-6 text-base font-semibold text-foreground marker:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span
                      aria-hidden="true"
                      className="text-xl text-accent transition-transform group-open:rotate-45"
                    >
                      +
                    </span>
                  </span>
                </summary>
                <p className="max-w-4xl pt-4 text-sm leading-relaxed text-text-secondary">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        <section
          id="enquiry"
          aria-labelledby="enquiry-heading"
          className="scroll-mt-32 rounded-[2rem] bg-[#FFFDF6] p-6 md:p-10"
        >
          <div className="mb-8 grid gap-5 md:grid-cols-12 md:items-end">
            <div className="space-y-3 md:col-span-8">
              <span className="badge-pill">Start a conversation</span>
              <h2
                id="enquiry-heading"
                className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
              >
                Tell us what your business needs in {location.name}
              </h2>
              <p className="max-w-2xl leading-relaxed text-text-secondary">
                Share a little about your project. We’ll review your brief and
                discuss a suitable next step—without pressure to choose a
                particular technology or scope.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline md:col-span-4 md:justify-self-end"
            >
              Visit the contact page
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <ContactForm initialService="Website Development" />
        </section>

        <nav aria-label="Other service areas" className="border-t border-[rgba(35,31,32,0.12)] pt-8">
          <h2 className="text-sm font-bold text-foreground">
            Explore other DataCrafts service areas
          </h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
            {LOCATION_PAGES.filter((page) => page.slug !== location.slug).map(
              (page) => (
                <li key={page.slug}>
                  <Link
                    href={`/${page.slug}`}
                    className="text-sm font-semibold text-accent hover:underline"
                  >
                    Website development in {page.name}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>
      </div>
    </>
  );
}
