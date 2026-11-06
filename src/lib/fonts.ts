import { Cormorant_Garamond, Manrope, Marcellus } from "next/font/google";

// latin-ext is required for Albanian characters (ë, ç).
export const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const marcellus = Marcellus({
  subsets: ["latin", "latin-ext"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
});

export const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
});

export const fontVariables = `${cormorant.variable} ${marcellus.variable} ${manrope.variable}`;
