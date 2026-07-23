import "./globals.css";

export const metadata = {
  title: "Masoud Jafari",
  description: "Portfolio website",
};

export default function RootLayout({ children }) {
  return (
    <html >
      <body>{children}</body>
    </html>
  );
}