import { getPublishedListings } from "@/lib/discover/listings";
import { SelectionDeck } from "@/components/discover/SelectionDeck";

export default async function SelectionPage() {
  const listings = await getPublishedListings();

  return <SelectionDeck listings={listings} />;
}
