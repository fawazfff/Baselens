import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./product.css";
import "./research.css";
import "./polish.css";
import { Nav, Footer } from "@/components/Nav";
import { PageUtilities } from "@/components/SiteChrome";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://baselens-git-main-fawaz-ibrahims-projects.vercel.app"),
  title: { default: "BaseLens | Research Base tokens before you trade", template: "%s | BaseLens" },
  description: "Research Base tokens using live market, liquidity, holder, contract and social evidence with explainable AI analysis.",
  applicationName: "BaseLens",
  openGraph: { title: "BaseLens | Research Base tokens before you trade", description: "Investigate Base tokens using live evidence and explainable AI analysis.", type: "website", siteName: "BaseLens" },
  twitter: { card: "summary_large_image", title: "BaseLens | Research Base tokens before you trade", description: "Investigate Base tokens using live evidence and explainable AI analysis." },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en" suppressHydrationWarning><body className={`${geist.variable} ${geistMono.variable}`}><a className="skip-link" href="#main-content">Skip to content</a><PageUtilities/><Nav />{children}<Footer /></body></html>;
}
