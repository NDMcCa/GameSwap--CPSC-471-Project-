export interface CreateListingRequest {
  title: string;
  description: string;
  price: number;
  platform: string;
  category: string;
}

export type SaveListingRequest = CreateListingRequest & { listingId: number };
