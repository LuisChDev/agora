"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { ThemeProvider } from "next-themes";

export function Providers({
  session,
  children
}: {
  session: Session | null;
  children: React.ReactNode
}) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
