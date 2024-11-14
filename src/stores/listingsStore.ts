import { writable } from "svelte/store";
import type { JoinedGameListingModel } from "$lib/models/GameListingModel";

export const listingsStore = writable<JoinedGameListingModel[]>([]);

export const setListingsStore = (listings: JoinedGameListingModel[]) => {
  listingsStore.set(listings);
};
