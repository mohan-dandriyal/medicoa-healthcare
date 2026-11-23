
import type { Metadata } from "next";

import "./globals.css";

const fontStylesheet = "https://fonts.googleapis.com/css2?" + [
  "family=Geist:wght@100..900",
  "family=Geist+Mono:wght@100..900",
  "family=Montserrat:ital,wght@0,100..900;1,100..900",
  "family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400",
  "display=swap",
].join("&");

export const metadata: Metadata = {
  title: "MedicoA | Healthcare & Pharmaceuticals",
  description:
    "Trusted healthcare and pharmaceutical services.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="stylesheet" href={fontStylesheet} />
      </head>
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
