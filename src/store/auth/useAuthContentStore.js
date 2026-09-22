import { create } from "zustand";

import { allSetData } from "@/data/auth/all-set.data";
import { authDecorData } from "@/data/auth/auth-decor.data";
import { authHeroData } from "@/data/auth/auth-hero.data";
import { forgotPasswordData } from "@/data/auth/forgot-password.data";
import { resetPasswordData } from "@/data/auth/reset-password.data";
import { signInData } from "@/data/auth/sign-in.data";
import { verifyEmailData } from "@/data/auth/verify-email.data";

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
  forgotPassword: forgotPasswordData,
  verifyEmail: verifyEmailData,
  resetPassword: resetPasswordData,
  allSet: allSetData,

  /** Swap in server-provided content once an API exists. */
  setHero: (hero) => set({ hero }),
  setScreen: (screen, content) => set({ [screen]: content }),
}));
