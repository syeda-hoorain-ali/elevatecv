"use client";

import { ResumeProvider } from "@/context/ResumeContext";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode
}

const Providers = ({ children }: Props) => {
  return (
    <SessionProvider>
      <ResumeProvider>
        {children}
      </ResumeProvider>
    </SessionProvider>
  )
}

export default Providers;
