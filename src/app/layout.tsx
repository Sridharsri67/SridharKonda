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
  title: "Konda Sridhar",
  description: "Portfolio of Konda Sridhar, an aspiring SecOps Engineer and Cybersecurity Specialist. Specialized in SOC Operations, Threat Intelligence, and SIEM monitoring.",
  keywords: [
    "Konda Sridhar",
    "Cybersecurity Portfolio",
    "SecOps Engineer",
    "SOC Analyst",
    "Threat Intelligence",
    "Vulnerability Assessment",
    "Splunk",
    "Penetration Testing"
  ],
  authors: [{ name: "Konda Sridhar" }],
  openGraph: {
    title: "Konda Sridhar",
    description: "Aspiring SecOps Engineer specializing in SIEM, threat detection, incident response, and security monitoring.",
    url: "https://sridharkonda.com",
    siteName: "Konda Sridhar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Konda Sridhar SOC Dashboard Portfolio"
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Konda Sridhar",
    description: "Aspiring SecOps Engineer specializing in SIEM, threat detection, incident response, and security monitoring.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
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
