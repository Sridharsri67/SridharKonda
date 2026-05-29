import type { Metadata } from "next";
import { Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sridhar Konda",
  description: "Portfolio of Sridhar Konda, an aspiring SecOps Engineer and Cybersecurity Specialist. Specialized in SOC Operations, Threat Intelligence, and SIEM monitoring.",
  keywords: [
    "Sridhar Konda",
    "Cybersecurity Portfolio",
    "SecOps Engineer",
    "SOC Analyst",
    "Threat Intelligence",
    "Vulnerability Assessment",
    "Splunk",
    "Penetration Testing"
  ],
  authors: [{ name: "Sridhar Konda" }],
  openGraph: {
    title: "Sridhar Konda",
    description: "Aspiring SecOps Engineer specializing in SIEM, threat detection, incident response, and security monitoring.",
    url: "https://sridharkonda.com",
    siteName: "Sridhar Konda Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sridhar Konda SOC Dashboard Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sridhar Konda",
    description: "Aspiring SecOps Engineer specializing in SIEM, threat detection, incident response, and security monitoring.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#020208] text-slate-200 selection:bg-cyan-500/30 selection:text-cyan-200">
        {children}
      </body>
    </html>
  );
}
