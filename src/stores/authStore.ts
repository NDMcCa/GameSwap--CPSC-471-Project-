import { writable } from "svelte/store";
import type { TokenContent } from "$lib/jwt";

export const authTokenContent = writable<TokenContent | undefined>(undefined);

export const setTokenContent = (content: TokenContent) => {
  authTokenContent.set(content);
};

export const clearTokenContent = () => {
  authTokenContent.set(undefined);
};

export const saveJwt = (token: string) => {
  localStorage.setItem("token", token);
};

export const deleteJwt = () => {
  localStorage.removeItem("token");
};
