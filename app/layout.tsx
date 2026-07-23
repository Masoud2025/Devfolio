import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://devfolio.vercel.app"),

  title: {
    default: "مسعود جعفری | برنامه نویس",
    template: "%s | DevFolio",
  },

  description:
    "یک پورتفولیو مدرن، سریع و مینیمالیستی برای توسعه‌دهنده‌ها.",

  applicationName: "DevFolio",

  keywords: [
    "برنامه نویس",
    "پورتفولیو",
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "JavaScript",
    "توسعه وب",
    "رابط کاربری",
    "تجربه کاربری",
    "طراحی واکنش‌گرا",
  ],

  authors: [
    {
      name: "مسعود جعفری",
      url: "https://devfolio.vercel.app",
    },
  ],

  creator: "مسعود جعفری",

  publisher: "مسعود جعفری",

  category: "تکنولوژی",

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
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "fa_IR",
    url: "https://devfolio.vercel.app",
    siteName: "DevFolio",
    title: "مسعود جعفری | برنامه نویس",
    description: "یک پورتفولیو مدرن، سریع و مینیمالیستی.",

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
    title: "مسعود جعفری | برنامه نویس",
    description: "یک پورتفولیو مدرن، سریع و مینیمالیستی.",

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
    <html lang="fa" dir="rtl" className={"h-full antialiased dark"}>
      <head>
        <link
          rel="preload"
          href="/fonts/Morabba/ttf/Morabba-Bold.ttf"
          as="font"
          type="font/ttf"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col bg-background" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
