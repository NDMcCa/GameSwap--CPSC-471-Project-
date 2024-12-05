import { writable } from "svelte/store";
import type { SaveSellerRating } from "$lib/models/SellerRating";

export const ratingStore = writable<SaveSellerRating[]>([]);

export const setRatingStore = (ratings: SaveSellerRating[]) => {
    ratingStore.set(ratings);
};
