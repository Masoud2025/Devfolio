import { LanguageProvider } from "@/app/context/LanguageContext";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devfolio.vercel.app"), // ReplaceMain portfolio with this

  title: {
    default: "DevFolio",
    template: "%s | DevFolio",
  },

  description:
    "A modern, fast, and minimalist developer portfolio built with Next.js, TypeScript, and Tailwind CSS.",

  applicationName: "DevFolio",

  keywords: [
    "Frontend Developer",
    "Portfolio",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "Web Developer",
    "UI",
    "UX",
    "Responsive Design",
  ],

  authors: [
    {
      name: "Masoud Jafari",
      url: "https://devfolio.vercel.app",
    },
  ],

  creator: "Masoud Jafari",

  publisher: "Masoud Jafari",

  category: "Technology",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "/",
    languages: {
      en: "/en",
      fa: "/fa",
      de: "/de",
      es: "/es",
      "pt-BR": "/pt-BR",
      ja: "/ja",
      zh: "/zh",
      sv: "/sv",
      no: "/no",
      ru: "/ru",
      uk: "/uk",
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://devfolio.vercel.app",
    siteName: "DevFolio",
    title: "DevFolio",
    description: "A modern, fast, and minimalist developer portfolio.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "DevFolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "DevFolio",
    description: "A modern, fast, and minimalist developer portfolio.",

    images: ["/og-image.png"],

    creator: "@your_username",
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={"h-full antialiased dark"}>
      <head>
        <link
          rel="preload"
          href="/fonts/Morabba/ttf/Morabba-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
