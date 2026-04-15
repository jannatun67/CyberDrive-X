import type { Metadata } from "next";
import { Orbitron, Inter } from "next/font/google";
import Providers from "@/components/providers/Providers";
import "./globals.css";

/* ══════════════════════════════════════════════
   Root Layout — Updated with Providers
   ══════════════════════════════════════════════ */

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VELOCITY | 3D Car Racing Showcase",
  description:
    "A next-generation 3D car racing showcase built with React Three Fiber, Next.js 14, TypeScript, and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${orbitron.variable} ${inter.variable}
          font-sans bg-dark-900 text-white
          antialiased overflow-x-hidden
        `}
      >
        {/* ── All Providers Wrapped Here ── */}
        <Providers>
          <div className="container">{children}</div>
        </Providers>
      </body>
    </html>
  );
}