import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact DataCraft | Let’s Build Something Meaningful",
  description:
    "Get in touch with Aditya Kumar and Shreya at DataCraft. Direct founder collaboration for websites, e-commerce storefronts, and custom software.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

