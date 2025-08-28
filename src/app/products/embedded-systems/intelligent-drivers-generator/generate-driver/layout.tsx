'use client';

import { Inter, JetBrains_Mono, Fira_Code } from "next/font/google";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
});

export default function DriverGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${jetbrainsMono.variable} ${firaCode.variable} min-h-screen flex flex-col`}>
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}