import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "Apoorv Sadhale — AI Engineer",
  description: "AI Engineer. Building neural networks and ML systems.",
  openGraph: {
    title: "Apoorv Sadhale",
    description: "AI Engineer. Building neural networks and ML systems.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
