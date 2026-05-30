import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: {
    default: "Flying Wolfpack — Family Travel",
    template: "%s | Flying Wolfpack",
  },
  description:
    "Real family travel. Honest moments. Practical adventure. Follow the Wolfpack as we explore the world as a family of four.",
  keywords: ["family travel", "travel blog", "Europe travel", "travel hacks", "family adventures"],
  authors: [{ name: "The Wolfpack" }],
  creator: "Flying Wolfpack",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flyingwolfpack.com",
    siteName: "Flying Wolfpack",
    title: "Flying Wolfpack — Family Travel",
    description: "Real family travel. Honest moments. Practical adventure.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&h=630&fit=crop",
        width: 1200,
        height: 630,
        alt: "Flying Wolfpack — Family Travel",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flying Wolfpack — Family Travel",
    description: "Real family travel. Honest moments. Practical adventure.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="flex min-h-screen flex-col bg-warm-white text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
