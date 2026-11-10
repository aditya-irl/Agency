import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { LOCATION_PAGES, type LocationPage } from "@/data/locations";
import { BRAND } from "@/data/studio";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
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
                className="inline-flex items-center gap-2 rounded-full border border-[rgba(35,31,32,0.18)] bg-[#FFFDF6] px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-emerald-700 hover:text-emerald-800"
              >
                <MessageCircle className="h-4 w-4" />
                Enquire on WhatsApp
              </a>
            </div>
          </div>
          <aside className="rounded-3xl bg-[#231F20] p-7 text-[#FFFDF6] md:col-span-4 md:p-8">
            <span className="font-mono text-xs uppercase tracking-[0.16em] text-[#D4C9BC]">
              A practical starting point
            </span>
            <p className="mt-4 text-xl font-semibold leading-snug">
              Start with the business problem. Build only what helps solve it.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-[#D4C9BC]">
              Work directly with DataCrafts founders to define the audience,
              scope, priorities and next steps for your project.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#F1A78C]"
            >
              Meet the studio
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </aside>
        </header>

        <section aria-labelledby="services-heading" className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Capabilities</span>
            <h2
              id="services-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Digital services for businesses in {location.name}
            </h2>
            <p className="leading-relaxed text-text-secondary">
              Choose a focused improvement or combine services into a connected
              project. We’ll recommend an approach after understanding your
              requirements.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {location.services.map((service, index) => (
              <article
                key={service.name}
                className="rounded-3xl border border-[rgba(35,31,32,0.1)] bg-[#FFFDF6] p-6 md:p-8"
              >
                <span className="font-mono text-xs text-accent">
                  0{index + 1}
                </span>
                <h3 className="mt-3 text-xl font-bold tracking-tight text-foreground">
                  {service.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {service.description}
                </p>
                <Link
                  href={`/contact?service=${encodeURIComponent(service.contactService)}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Discuss this service
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </article>
            ))}
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
          >
            Explore all DataCrafts services
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </section>

        <section
          aria-labelledby="challenges-heading"
          className="rounded-[2rem] bg-[#FFFDF6] p-6 md:p-10"
        >
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Built around real workflows</span>
            <h2
              id="challenges-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Common digital challenges—and thoughtful ways to address them
            </h2>
          </div>
          <div className="mt-8 divide-y divide-[rgba(35,31,32,0.1)]">
            {location.challenges.map((challenge, index) => (
              <article
                key={challenge.title}
                className="grid gap-4 py-6 md:grid-cols-12 md:gap-8"
              >
                <div className="md:col-span-4">
                  <span className="font-mono text-xs text-accent">
                    CHALLENGE 0{index + 1}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-foreground">
                    {challenge.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-text-secondary md:col-span-4">
                  {challenge.context}
                </p>
                <p className="text-sm leading-relaxed text-foreground md:col-span-4">
                  {challenge.approach}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="industries-heading" className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill">Useful applications</span>
            <h2
              id="industries-heading"
              className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
            >
              Where a well-planned digital product can help
            </h2>
            <p className="leading-relaxed text-text-secondary">
              These are example use cases, not claims about specific local
              clients. The right solution depends on your customers and the way
              your business operates.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {location.industries.map((industry) => (
              <article
                key={industry.name}
                className="border-t-2 border-accent pt-5"
              >
                <h3 className="text-lg font-bold text-foreground">
                  {industry.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {industry.examples}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="process-heading"
          className="tech-section rounded-[2rem] p-6 md:p-10"
        >
          <div className="max-w-3xl space-y-3">
            <span className="badge-pill border-[#494244] bg-[#292426] text-[#F6EEE2]">
              Clear collaboration
            </span>
            <h2
              id="process-heading"
              className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl"
            >
              From first conversation to launch
            </h2>
          </div>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {BRAND.process.map((step) => (
              <li key={step.step} className="border-t border-[#494244] pt-4">
                <span className="font-mono text-xs text-[#F1A78C]">
                  {step.step} / {step.phase}
                </span>
                <h3 className="mt-3 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#D4C9BC]">
                  {step.details}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="work-heading" className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl space-y-3">
              <span className="badge-pill">Selected work</span>
              <h2
                id="work-heading"
                className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl"
              >
                See how we approach digital projects
              </h2>
              <p className="text-sm leading-relaxed text-text-secondary">
                Examples from the studio portfolio. They are shared as work
                samples, not as claims of clients based in {location.name}.
              </p>
            </div>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:text-accent"
            >
              View all work
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: "Business website",
                description:
                  "A product-led brand experience with a considered responsive presentation.",
                href: "/work/asquare-beverages",
              },
              {
                name: "E-commerce storefront",
                description:
                  "A Shopify store structured for product discovery and online purchasing.",
                href: "/work/aurified",
              },
              {
                name: "Custom CRM platform",
                description:
                  "A tailored application interface for operational and customer workflows.",
                href: "/work/finance-crm",
              },
            ].map((project) => (
              <Link
                key={project.href}
                href={project.href}
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
