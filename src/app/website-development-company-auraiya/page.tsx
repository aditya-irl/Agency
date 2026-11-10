import LocationLandingPage from "@/components/LocationLandingPage";
import { getLocationPage } from "@/data/locations";
import { createPageMetadata } from "@/lib/seo";

const location = getLocationPage("website-development-company-auraiya");

export const metadata = createPageMetadata({
  title: location.title,
  description: location.description,
  path: `/${location.slug}`,
});

export default function AuraiyaWebsiteDevelopmentPage() {
  return <LocationLandingPage location={location} />;
}
