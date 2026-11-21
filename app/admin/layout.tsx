import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Agency Admin Desk & Bookings Portal | Sky Way Travels Tirur",
  description:
    "Secure administrative control center for Sky Way Travels & Rozline Travels. Live bookings pipeline, passenger ticketing, customer inquiries, and WhatsApp customer communications."
};

export const viewport: Viewport = {
  themeColor: "#0B7A2B",
  width: "device-width",
  initialScale: 1
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return children;
}
