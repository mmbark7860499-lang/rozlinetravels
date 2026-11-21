import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"]
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rozlinetravels.com"),
  title: "Rozline Travel and Tours | Flights, Visas & Holiday Packages",
  description:
    "Book verified international flights, fast-track Gulf & world visas, luxury 5-star Umrah tours, and bespoke holiday packages with Rozline Travel and Tours, Tirur, Kerala.",
  keywords: [
    "Rozline Travel and Tours",
    "Rozline Travels",
    "travel agency Tirur",
    "rozlinetravels.com",
    "visa services Kerala",
    "flight booking Tirur CCJ COK",
    "luxury Umrah packages Malappuram",
    "holiday packages Kerala",
    "Dubai visa Tirur",
    "Saudi visa Tirur",
    "cheap flights to gulf"
  ],
  alternates: {
    canonical: "https://rozlinetravels.com"
  },
  icons: {
    icon: [
      { url: "/logo.png" },
      { url: "/favicon.ico" }
    ],
    shortcut: "/logo.png",
    apple: [
      { url: "/logo.png", sizes: "180x180", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Rozline Travel and Tours | Official Travel Desk",
    description:
      "Instant flight booking, fast-track Gulf visit visas, 5-star Umrah tours, and dedicated travel support from Tirur, Kerala.",
    url: "https://rozlinetravels.com",
    siteName: "Rozline Travel and Tours",
    images: [
      {
        url: "https://rozlinetravels.com/logo.png",
        width: 400,
        height: 400,
        alt: "Rozline Travel and Tours Logo",
        type: "image/png"
      }
    ],
    locale: "en_IN",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Rozline Travel and Tours | Official Travel Desk",
    description:
      "Instant flight booking, fast-track Gulf visit visas, 5-star Umrah tours, and dedicated travel support from Tirur, Kerala.",
    images: ["https://rozlinetravels.com/logo.png"]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  themeColor: "#0284C7",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Rozline Travel and Tours",
    url: "https://rozlinetravels.com",
    image: "https://rozlinetravels.com/logo.png",
    telephone: ["+91 8590624181", "+91 9188250904"],
    email: "rozlinetravels@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Opposite Townhall, Tirur",
      addressLocality: "Malappuram",
      addressRegion: "Kerala",
      addressCountry: "IN"
    },
    sameAs: [
      "https://www.instagram.com/skyway_travels/",
      "https://www.facebook.com/profile.php?id=61561634927052"
    ],
    areaServed: ["India", "UAE", "Saudi Arabia", "Europe", "Malaysia", "Singapore", "Oman", "Qatar", "Kuwait"]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${jakarta.variable} font-sans antialiased bg-white text-zinc-900 tracking-normal`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
      </body>
    </html>
  );
}
