import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const chosunNm = localFont({
  src: "./fonts/ChosunNm.woff2",
  variable: "--font-chosun-nm",
  display: "swap",
  preload: false,
  fallback: ["system-ui", "Arial", "sans-serif"],
});

export const metadata: Metadata = {
  title: "K-Fortune — Discover your Korean astrology",
  description: "Meet your Four Pillars and discover the element at your core.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={chosunNm.variable}><body>{children}</body></html>;
}
