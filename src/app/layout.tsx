import type { Metadata } from "next";
import "./globals.css";
import '@smastrom/react-rating/style.css'
import Footer from "@/components/footer";
import Providers from "@/components/providers";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/navbar";


export const metadata: Metadata = {
  title: "ElevateCV - Your AI Resume Builder",
  description: "Create stunning resumes effortlessly with ElevateCV. Our AI-powered resume builder helps you craft professional resumes in minutes. Start building your dream career today!",
  keywords: [
    "resume builder",
    "AI resume builder",
    "professional resumes",
    "easy resume creation",
    "customizable templates",
    "job application",
    "career development",
    "resume tips",
    "elevate your career"
  ],
  authors: { name: "Syeda Hoorain Ali", url: "https://syeda-hoorain-ali.vercel.app/" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-qb-installed="true"
    >
      <body
        className="antialiased bg-zinc-200 relative overflow-x-hidden"
        cz-shortcut-listen="true"
      >
        <Providers>
          <Navbar />
          <main className="mt-20">{children}</main>
          <Footer />
          <Toaster
            position="top-center"
            reverseOrder={false}

          />
        </Providers>
      </body>
    </html>
  );
}
