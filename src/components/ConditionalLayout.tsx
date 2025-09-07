'use client';

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // paths where the global header should be hidden
  const hideHeaderOn = [
    "/products/embedded-systems/intelligent-drivers-generator/generate-driver",
    
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {!hideHeaderOn.includes(pathname) && <Header />}

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
