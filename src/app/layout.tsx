import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Fira_Code } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/ConditionalLayout"; // 👈 new wrapper

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

export const metadata: Metadata = {
  title: "MCUZA - AI-Powered Electronics Development Platform",
  description:
    "Empower your electronics projects with AI-driven tools for embedded systems, Edge AI, FPGA workflows, and rapid prototyping.",
  icons: {
    icon: "/fav.svg",
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
        className={`${inter.variable} ${jetbrainsMono.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
      </body>
    </html>
  );
}
