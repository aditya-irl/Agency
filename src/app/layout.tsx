import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import CookieConsent from "@/components/CookieConsent";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import { BRAND } from "@/data/studio";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${BRAND.name} — Crafting Digital. Building Possibilities.`,
  description:
    "DataCraft is an independent founder-led digital studio helping businesses transform ideas into websites, e-commerce experiences and custom software.",
  keywords: [
    "DataCraft",
    "Digital Studio",
    "Web Development Studio",
    "Shopify E-commerce Development",
    "Custom Software Engineering",
    "Next.js Development",
    "Business Automation",
    "Bespoke Website Design",
    "Founder-Led Studio",
  ],
  authors: [
    { name: "Aditya Kumar" },
    { name: "Shreya" },
    { name: "DataCraft", url: "https://www.datacrafts.in" },
  ],
  creator: "DataCraft",
  metadataBase: new URL("https://www.datacrafts.in"),
  icons: {
    icon: [
      { url: "/images/logo_badge.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/images/logo_badge.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: `${BRAND.name} — We turn ambitious ideas into digital experiences.`,
    description:
      "From high-performing websites to custom business applications, DataCraft designs and builds digital products that help businesses move forward.",
    url: "https://www.datacrafts.in",
    siteName: BRAND.name,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/asquare_homepage.jpg",
        width: 1024,
        height: 567,
        alt: "DataCraft - Premium Digital Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Crafting Digital. Building Possibilities.`,
    description:
      "Founder-led digital studio building websites, e-commerce storefronts, and custom software.",
    images: ["/images/asquare_homepage.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2250%22 fill=%22%23231F20%22/><text y=%22.72em%22 x=%2250%22 text-anchor=%22middle%22 font-size=%2258%22 font-family=%22sans-serif%22 font-weight=%22800%22 fill=%22%23C6532E%22>D</text></svg>"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-accent selection:text-white">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-foreground focus:text-background focus:rounded-full"
        >
          Skip to main content
        </a>
        <AnalyticsProvider />
        <SmoothScroll />
        <Navbar />
        <main id="main-content" className="flex-1 pt-24 md:pt-28">
          {children}
        </main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
