import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ishaara — Kathak AI Coach",
  description:
    "Real-time AI-powered Kathak dance coaching. Detect classical Mudras, receive voice corrections, and explore the rich history of each gesture.",
  keywords: ["Kathak", "Indian classical dance", "Mudra", "AI coaching"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen bg-[#0C0A09] text-[#F5F0E8] antialiased">{children}</body>
    </html>
  );
}
