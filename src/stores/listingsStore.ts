import { writable } from "svelte/store";
import type { GameListingModel } from "$lib/models/GameListingModel";
import type { SellerModel } from "$lib/models/SellerModel";

// This will store game listings joined with seller information
export const listingsStore = writable<(GameListingModel & SellerModel)[]>([]);

export const setListingsStore = (
  listings: (GameListingModel & SellerModel)[]
) => {
  listingsStore.set(listings);
};
