import type { Metadata } from "next";
import { Press_Start_2P, JetBrains_Mono, Inter } from "next/font/google";
import "@/styles/globals.css";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yuxuan Liu — Pixel Lab",
  description:
    "Personal portfolio of Yuxuan Liu (刘宇轩) — AI/Robotics researcher, " +
    "System Engineer at TIER IV. Publications, open-source projects, and daily AI intel.",
  openGraph: {
    title: "Yuxuan Liu — Pixel Lab",
    description: "AI/Robotics researcher & engineer. Publications, projects, and more.",
    url: "https://owen-liuyuxuan.github.io",
    siteName: "Pixel Lab",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Yuxuan Liu — Pixel Lab",
    description: "AI/Robotics researcher & engineer.",
  },
  icons: {
    icon: "/favicon-32x32.png",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${pixelFont.variable} ${monoFont.variable} ${bodyFont.variable}`}
    >
      <body className="bg-base-dark text-white-soft antialiased">
        {children}
      </body>
    </html>
  );
}
