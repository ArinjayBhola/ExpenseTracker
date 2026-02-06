import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import NextAuthProvider from "@/components/NextAuthProvider";
import NextTopLoader from "nextjs-toploader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-primary/20 selection:text-primary`}>
        <NextTopLoader color="var(--primary)" showSpinner={false} zIndex={99999} />
        <NextAuthProvider>
          <SessionWrapper>
            {children}
          </SessionWrapper>
        </NextAuthProvider>
      </body>
    </html>
  );
}
