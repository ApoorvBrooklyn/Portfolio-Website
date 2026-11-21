import { Source_Serif_4 } from "next/font/google";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata = {
  title: "Apoorv Sadhale — Backend Engineer",
  description:
    "Backend engineer at Ethos Life. Building production systems and AI-assisted underwriting workflows.",
  openGraph: {
    title: "Apoorv Sadhale",
    description:
      "Backend engineer at Ethos Life. Building production systems and AI-assisted underwriting workflows.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={sourceSerif.variable}>
      <body className={sourceSerif.className}>{children}</body>
    </html>
  );
}
