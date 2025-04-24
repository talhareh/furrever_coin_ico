import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/layout/Header';
import Providers from '@/components/Providers';
import "./globals.css";
import ContextProvider from "../../context";
import { headers } from "next/headers"; 
import { createAppKit } from "@reown/appkit";
import { wagmiAdapter } from "../../config";
import { bscChain, bscTestnet } from '@/config/chains';
import { useAppKitProvider } from "@reown/appkit/react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FURREVER - The Superhero of Crypto",
  description: "Join the FURREVER presale and be part of the next big thing in crypto!",
};

export const appKit = createAppKit({
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  adapters: [wagmiAdapter],
  networks: [bscChain, bscTestnet],
  features: { analytics: true },
  themeMode: 'light',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Providers>
          <Header />
          <ContextProvider cookies={null}>
            {children}
          </ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
