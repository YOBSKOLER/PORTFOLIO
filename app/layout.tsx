import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { LanguageProvider } from "@/components/providers/LanguageProvider";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YOBS KOLER — Fullstack Developer",
  description:
    "Développeur Fullstack & Mobile basé à Douala, Cameroun. Spécialisé en React, Next.js, Laravel, React Native.",
  keywords: [
    "fullstack",
    "developer",
    "react",
    "nextjs",
    "laravel",
    "douala",
    "cameroon",
    "mobile",
  ],
  authors: [{ name: "YOBS KOLER", url: "https://ton-portfolio.vercel.app" }],
  creator: "YOBS KOLER",

  // Open Graph — ce qui s'affiche quand tu partages le lien
  openGraph: {
    type: "website",
    url: "https://ton-portfolio.vercel.app",
    title: "YOBS KOLER — Fullstack Developer",
    description:
      "Développeur Fullstack & Mobile basé à Douala, Cameroun. Je construis des solutions web & mobile scalables.",
    siteName: "YOBS KOLER Portfolio",
    images: [
      {
        url: "https://ton-portfolio.vercel.app/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "YOBS KOLER — Fullstack Developer",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    title: "YOBS KOLER — Fullstack Developer",
    description: "Développeur Fullstack & Mobile basé à Douala, Cameroun.",
    images: ["https://ton-portfolio.vercel.app/images/og-image.jpg"],
    creator: "@yobskoler",
  },

  // Icône du site
  icons: {
    icon: "/favicon.ico",
    apple: "/images/profile.jpg",
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
