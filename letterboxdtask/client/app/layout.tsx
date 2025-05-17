import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {Navigation } from "./components/navigation";
import { ClerkProvider } from "@clerk/nextjs";
import SearchBar from "./components/searchbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RANt n’ Review",
  description: "This is a movie review website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* <header className="bg-slate-900 text-white p-4 text-center">
          <Navigation />
        </header> */}
        {children}
        {/* <footer className="bg-slate-900 text-white p-4 text-center">
          Codevolution
        </footer> */}
      </body>
    </html>
    </ClerkProvider>
  );
}
