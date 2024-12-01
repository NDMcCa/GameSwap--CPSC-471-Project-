import { writable } from "svelte/store";
import type { SellerModel } from "$lib/models/SellerModel";

export const sellersStore = writable<SellerModel[]>([]);

export const setSellersStore = (sellers: SellerModel[]) => {
    sellersStore.set(sellers);
};
