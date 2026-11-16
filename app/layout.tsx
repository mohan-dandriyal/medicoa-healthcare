
import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Poppins,
  Montserrat,
} from "next/font/google";

import "./globals.css";

// Geist Font
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

// Geist Mono Font
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

// Poppins Font
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  style: ["normal", "italic"],
  display: "swap",
});

// Montserrat Font
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900",
  ],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "MedicoA | Healthcare & Pharmaceuticals",
  description:
    "Trusted healthcare and pharmaceutical services.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        ${poppins.variable}
        ${montserrat.variable}
        h-full antialiased
      `}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
