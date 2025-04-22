import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Header from '@/components/layout/Header';
import Providers from '@/components/Providers';
import "./globals.css";
import ContextProvider from "../../context";
import { headers } from "next/headers"; 
import { createAppKit } from "@reown/appkit";
import { wagmiAdapter } from "../../config";
import { mainnet, opBNBTestnet } from '@reown/appkit/networks';
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
  projectId: 'YOUR_PROJECT_ID',
  adapters: [wagmiAdapter],
  networks: [mainnet, opBNBTestnet],
  features: { analytics: true },
  themeMode: 'light',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = await headers();
  const cookies = headersObj.get('cookie')
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <Providers>
        
          <Header />
          <ContextProvider cookies={cookies}>
          <main className="relative">{children}</main>
          </ContextProvider>
        </Providers>
      </body>
    </html>
  );
}
