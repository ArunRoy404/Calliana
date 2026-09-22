import { z } from "zod";

/**
 * Field rules shared across the auth forms, so sign-in, forgot-password and
 * reset-password cannot drift apart on what counts as a valid email or a
 * strong enough password.
 */

export const emailField = z
  .string()
  .trim()
  .min(1, "Enter your work email")
  .pipe(z.email("That doesn’t look like a valid email"));

export const passwordField = z
  .string()
  .min(1, "Enter your password")
  .min(8, "Password must be at least 8 characters");

/** A new password has to clear a higher bar than one being typed to sign in. */
export const newPasswordField = z
  .string()
  .min(1, "Enter a new password")
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Include at least one lowercase letter")
  .regex(/[A-Z]/, "Include at least one uppercase letter")
  .regex(/[0-9]/, "Include at least one number");

export const OTP_LENGTH = 6;

export const otpField = z
  .string()
  .min(1, "Enter the code we sent you")
  .length(OTP_LENGTH, `Enter all ${OTP_LENGTH} digits`)
  .regex(/^\d+$/, "The code is digits only");
