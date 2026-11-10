import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Work & Case Studies | DataCraft",
  description:
    "Explore DataCraft's portfolio of brand showcases, Shopify e-commerce stores, and custom software systems.",
  path: "/work",
});

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
