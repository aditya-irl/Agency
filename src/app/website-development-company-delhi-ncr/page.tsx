import LocationLandingPage from "@/components/LocationLandingPage";
import { getLocationPage } from "@/data/locations";
import { createPageMetadata } from "@/lib/seo";

const location = getLocationPage("website-development-company-delhi-ncr");

export const metadata = createPageMetadata({
  title: location.title,
  description: location.description,
  path: `/${location.slug}`,
});

export default function DelhiNcrWebsiteDevelopmentPage() {
  return <LocationLandingPage location={location} />;
}
