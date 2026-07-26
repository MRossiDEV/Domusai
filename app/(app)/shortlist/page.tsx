import { getPublishedListings } from "@/lib/discover/listings";
import { ShortlistView } from "@/components/discover/ShortlistView";

export default async function ShortlistPage() {
  const listings = await getPublishedListings();

  return <ShortlistView listings={listings} />;
}
