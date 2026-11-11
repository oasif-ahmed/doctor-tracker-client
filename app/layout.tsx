
import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

export const metadata: Metadata = {
  title: "Doctor Tracker - Clinical Administration & Intelligence",
  description:
    "Enterprise administrative web application for healthcare providers and clinical management",
};

export const instant = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Suspense fallback={<div className="h-16" />}>
          <Navbar />
        </Suspense>

        <div className="flex-1 flex flex-col">
          {children}
        </div>

        <Suspense fallback={<div />}>
          <Footer />
        </Suspense>
      </body>
    </html>
  );
}
