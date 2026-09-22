import { create } from "zustand";

import { authDecorData } from "@/data/auth/auth-decor.data";
import { authHeroData } from "@/data/auth/auth-hero.data";
import { signInData } from "@/data/auth/sign-in.data";

/**
 * Serves the auth screens' dummy content.
 *
 * Components read from here instead of importing `src/data` directly, so when a
 * real API lands only this store changes. Every slice is a stable reference, so
 * selecting one never causes a spurious re-render.
 */
export const useAuthContentStore = create((set) => ({
  hero: authHeroData,
  decor: authDecorData,
  signIn: signInData,

  /** Swap in server-provided content once an API exists. */
  setHero: (hero) => set({ hero }),
  setSignIn: (signIn) => set({ signIn }),
}));
