import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FasoCV — Créer un CV professionnel gratuit au Burkina Faso",
  description: "Créer un CV professionnel en ligne gratuitement. Télécharge ton CV en PDF en quelques minutes. Sans inscription. Modèles de CV pour le Burkina Faso.",
  keywords: [
    "créer un cv",
    "cv gratuit",
    "cv en ligne",
    "créer cv burkina faso",
    "modèle cv burkina",
    "cv pdf gratuit",
    "faire son cv",
    "cv professionnel",
    "créer cv ouagadougou",
    "cv sans inscription",
    "générateur cv",
    "cv emploi burkina",
    "cv word pdf",
    "exemple cv burkina faso",
    "fasocv"
  ],
  authors: [{ name: "FasoCV" }],
  creator: "FasoCV",
  metadataBase: new URL("https://fasocv.vercel.app"),
  alternates: {
    canonical: "https://fasocv.vercel.app",
  },
  openGraph: {
    title: "FasoCV — Créer un CV professionnel gratuit",
    description: "Créer un CV professionnel en ligne gratuitement. Télécharge ton CV en PDF en quelques minutes. Sans inscription.",
    url: "https://fasocv.vercel.app",
    siteName: "FasoCV",
    locale: "fr_BF",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FasoCV — Créer un CV professionnel gratuit",
    description: "Créer un CV professionnel en ligne gratuitement au Burkina Faso.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}