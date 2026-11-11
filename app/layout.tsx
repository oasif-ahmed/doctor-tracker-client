import type { Metadata } from "next";
// Font imports removed (offline build)
// import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Navbar from "@/components/shared/navbar";
import Footer from "@/components/shared/footer";

// Font styles disabled for offline build

export const metadata: Metadata = {
  title: "Doctor Tracker - Clinical Administration & Intelligence",
  description: "Enterprise administrative web application for healthcare providers and clinical management",
};

export const instant = false;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans selection:bg-primary/10 selection:text-primary">
        <Suspense fallback={<div className="h-16 border-b border-border bg-background" />}>
          <Navbar />
        </Suspense>
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
