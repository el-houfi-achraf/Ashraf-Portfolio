import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans", // Keeping variable name to avoid breaking css
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono", // Keeping variable name to avoid breaking css
  subsets: ["latin"],
});

import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "Ashraf El Houfi - Portfolio",
  description: "Computer Engineering Student & Creative Developer based in Marrakech. Specializing in modern web technologies and immersive digital experiences.",
  keywords: ["Creative Developer", "Portfolio", "Web Design", "Three.js", "Next.js", "React", "Morocco", "Computer Engineering"],
  authors: [{ name: "Ashraf El Houfi" }],
  openGraph: {
    title: "Ashraf El Houfi - Creative Portfolio",
    description: "Computer Engineering Student & Creative Developer based in Marrakech.",
    url: "https://ashraf-elhoufi.com",
    siteName: "Ashraf El Houfi Portfolio",
    images: [
      {
        url: "/og-image.png", // You should add an actual OG image later
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashraf El Houfi - Creative Portfolio",
    description: "Computer Engineering Student & Creative Developer based in Marrakech.",
    creator: "@ashraf_elhoufi",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased bg-black text-white`}
      >
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
