import LocationLandingPage from "@/components/LocationLandingPage";
import { getLocationPage } from "@/data/locations";
import { createPageMetadata } from "@/lib/seo";

const location = getLocationPage("website-development-company-delhi-ncr");

export const metadata = createPageMetadata({
  title: location.title,
  description: location.description,
  path: `/${location.slug}`,
  keywords: location.keywords,
  geo: {
    latitude: location.geo.latitude,
    longitude: location.geo.longitude,
    placename: "Noida, Delhi NCR, India",
    region: "IN-UP",
  },
});

export default function DelhiNcrWebsiteDevelopmentPage() {
  return <LocationLandingPage location={location} />;
}
