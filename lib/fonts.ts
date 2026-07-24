// lib/fonts.ts
import { Inter, Poppins } from "next/font/google";
import localFont from "next/font/local";

// English Fonts
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

// Persian Fonts (Local)
export const vazir = localFont({
  src: [
    {
      path: "../public/fonts/Vazir-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazir-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Vazir-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-vazir",
  display: "swap",
});

export const iransans = localFont({
  src: [
    {
      path: "../public/fonts/IRANSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/IRANSans-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-iransans",
  display: "swap",
});

export const sahel = localFont({
  src: [
    {
      path: "../public/fonts/Sahel-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Sahel-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Sahel-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-sahel",
  display: "swap",
});