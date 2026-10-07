import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Manzil — Northern Pakistan, planned with care",
  description:
    "An interactive prototype of Manzil: conversational trip planning for northern Pakistan with a safety layer and a companion that stays with you on the road.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
