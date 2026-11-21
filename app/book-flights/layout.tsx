import type { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Book Flight Tickets | Sky Way Travels Tirur",
  description:
    "Direct and connecting flight searches from Calicut (CCJ), Cochin (COK), and Kannur (CNN) to Dubai, Jeddah, Riyadh, London, and world destinations with Sky Way Travels Tirur."
};

export const viewport: Viewport = {
  themeColor: "#0B7A2B",
  width: "device-width",
  initialScale: 1
};

export default function FlightLayout({ children }: { children: React.ReactNode }) {
  return children;
}
