import {
  signInDefaultValues,
  signInSchema,
} from "@/schemas/auth/sign-in.schema";
import { createFormStore } from "@/store/createFormStore";

/** Sign-in form state — Figma 43:8217. */
export const useSignInFormStore = createFormStore({
  schema: signInSchema,
  defaultValues: signInDefaultValues,
});
