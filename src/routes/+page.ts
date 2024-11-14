import type { AuthRequest } from "$lib/models/AuthRequest";
import type { AuthResponse } from "$lib/models/AuthResponse";
import {
  clearTokenContent,
  deleteJwt,
  saveJwt,
  setTokenContent,
} from "../stores/authStore";
import { authTokenContent } from "../stores/authStore";

export const ssr = false;
export const csr = true;

export const load = async ({ fetch }) => {
  // Check for token
  const token = localStorage.getItem("token") as string | undefined;

  if (token) {
    const req: AuthRequest = { token };

    const res = await fetch("/api/login/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(req),
    });

    if (res.ok) {
      try {
        const data: AuthResponse = await res.json();

        setTokenContent(data.tokenContent);
        saveJwt(data.serializedToken);

        return;
      } catch (_) {}
    }
  }

  // No token found or token was invalid or an error occurred
  clearTokenContent();
  deleteJwt();
};
