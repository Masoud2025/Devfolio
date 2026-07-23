import "./globals.css";

export const metadata = {
  title: "Masoud Jafari",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body>{children}</body>
    </html>
  );
}