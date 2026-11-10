import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact DataCraft | Let’s Build Something Meaningful",
  description:
    "Get in touch with Aditya Kumar and Shreya at DataCraft. Direct founder collaboration for websites, e-commerce storefronts, and custom software.",
  path: "/contact",
});

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
