import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ECHOS - Plateforme Sociale avec Marketplace",
  description: "ECHOS est une plateforme sociale moderne combinant espaces boutiques, marketplace intégré et messagerie avancée. Découvrez, achetez et connectez-vous avec les meilleures entreprises locales.",
  keywords: ["réseau social", "marketplace", "boutiques en ligne", "messagerie", "ecommerce"],
  authors: [{ name: "MiniMax Agent" }],
  creator: "MiniMax Agent",
  publisher: "ECHOS",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://echops.com'),
  openGraph: {
    title: "ECHOS - Votre Espace Social & Marketplace",
    description: "Découvrez ECHOS : la plateforme qui connecte les entreprises et les clients avec un marketplace intégré",
    url: "https://echops.com",
    siteName: "ECHOS",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ECHOS - Plateforme Sociale avec Marketplace",
    description: "Découvrez ECHOS : la plateforme qui connecte les entreprises et les clients avec un marketplace intégré",
    creator: "@echops",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#3B82F6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body
        className={`${inter.className} antialiased bg-gray-50 text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
