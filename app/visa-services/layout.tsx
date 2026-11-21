import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "International Visa Assistance & Document Checklists | Rozline Travel and Tours Tirur",
  description:
    "Country-wise visa requirements, document checklists, fast-track processing times, and embassy guidelines for UAE, Saudi Arabia, Oman, Qatar, UK, Schengen, Malaysia, Singapore, and 17+ destinations."
};

export const viewport: Viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1
};

export default function VisaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
