import Navbar from "@/components/navbar";
import ReadingProgress from "@/components/reading-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DATA } from "@/data/resume";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Inter as FontSans, Bricolage_Grotesque as FontDisplay, Playfair_Display as FontSerif, Lora as FontLora, Crimson_Text as FontCrimson } from "next/font/google";
import "./globals.css";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontDisplay = FontDisplay({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600", "700", "800"],
});

const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
});

const fontLora = FontLora({
  subsets: ["latin"],
  variable: "--font-lora",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const fontCrimson = FontCrimson({
  subsets: ["latin"],
  variable: "--font-crimson",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DATA.url),
  title: {
    default: DATA.name,
    template: `%s | ${DATA.name}`,
  },
  description: DATA.description,
  openGraph: {
    title: `${DATA.name}`,
    description: DATA.description,
    url: DATA.url,
    siteName: `${DATA.name}`,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: `${DATA.name}`,
    card: "summary_large_image",
  },
  verification: {
    google: "",
    yandex: "",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased max-w-2xl mx-auto py-12 sm:py-24 px-6 overflow-x-clip",
          fontSans.variable,
          fontDisplay.variable,
          fontSerif.variable,
          fontLora.variable,
          fontCrimson.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="light">
          <TooltipProvider delayDuration={0}>
            <ReadingProgress />
            {children}
            <Navbar />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
