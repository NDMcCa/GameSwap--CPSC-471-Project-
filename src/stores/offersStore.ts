import { writable } from "svelte/store";
import type { JoinedOfferModel } from "$lib/models/SendsOfferModel";

export const offersStore = writable<JoinedOfferModel[]>([]);

export const setOffersStore = (sellers: JoinedOfferModel[]) => {
  offersStore.set(sellers);
};
