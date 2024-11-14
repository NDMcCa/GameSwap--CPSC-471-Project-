import type { TokenContent } from "$lib/jwt";
import { writable } from "svelte/store";

export const tokenStore = writable<TokenContent | undefined>(undefined);

export const setTokenStore = (token: TokenContent | undefined) => {
  tokenStore.set(token);
};
