import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { getServerSession } from "next-auth";
import { Providers } from "./providers";

import { options } from "@/app/api/auth/[...nextauth]/options";
import { auth } from "@/lib/auth";

import { Navbar } from "flowbite-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AgorApp - your local place",
  description: "AgorApp es el sitio para encontrarte con quienes te rodean.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  /* const session = await getServerSession(options); */
  const session = await auth();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers session={session}>

          {children}
        </Providers>
      </body>
    </html>
  );
}
