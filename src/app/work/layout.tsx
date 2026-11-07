import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work & Case Studies | DataCraft",
  description:
    "Explore DataCraft's portfolio of brand showcases, Shopify e-commerce stores, and custom software systems.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

