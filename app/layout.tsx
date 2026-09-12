import type { Metadata } from "next";
import "./globals.css";
import SectionNav from "@/components/SectionNav";

export const metadata: Metadata = {
  title: "Palm Bay Resort Phu Quoc — Tropical Serenity",
  description: "Palm Bay Resort Phu Quoc — a peaceful tropical stay in Cửa Lấp, Phú Quốc."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SectionNav />
        {children}
      </body>
    </html>
  );
}
