import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";
import SessionWrapper from "@/components/SessionWrapper";
import NextAuthProvider from "@/components/NextAuthProvider";
import NextTopLoader from "nextjs-toploader";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased selection:bg-primary selection:text-primary-foreground bg-background text-foreground`}>
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

