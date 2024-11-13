import type { TokenContent } from "$lib/jwt";

export interface AuthResponse {
  tokenContent: TokenContent;
  serializedToken: string;
}
