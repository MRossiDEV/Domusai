import { getPublishedListings } from "@/lib/discover/listings";
import { DiscoverDeck } from "@/components/discover/DiscoverDeck";

export default async function DiscoverPage() {
  const listings = await getPublishedListings();

  return <DiscoverDeck listings={listings} />;
}
