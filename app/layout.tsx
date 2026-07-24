import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const geist = Geist({ subsets: ["latin"] });

const BASE_URL = "https://portfolio-yobskohler.vercel.app/"; 

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL), // ← TRÈS IMPORTANT pour les images
  title: "YOBS KOLER — Fullstack Developer",
  description:
    "Développeur Fullstack & Mobile basé à Douala, Cameroun. Spécialisé en React, Next.js, Laravel, React Native.",
  openGraph: {
    type: "website",
    url: BASE_URL,
    title: "YOBS KOLER — Fullstack Developer",
    description: "Développeur Fullstack & Mobile basé à Douala, Cameroun.",
    siteName: "YOBS KOLER Portfolio",
    images: [
      {
        url: "/images/og-image.jpg", // relatif grâce à metadataBase
        width: 1200,
        height: 630,
        alt: "YOBS KOLER — Fullstack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "YOBS KOLER — Fullstack Developer",
    description: "Développeur Fullstack & Mobile basé à Douala, Cameroun.",
    images: ["/images/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={geist.className}>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
