import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers";

export const metadata: Metadata = {
  title: "Dr. Alexander Hamilton | Board Certified Plastic Surgeon — Beverly Hills",
  description:
    "World-renowned board-certified plastic and reconstructive surgeon with 18+ years of experience. Specializing in rhinoplasty, facelifts, breast augmentation, and body contouring in Beverly Hills, CA.",
  keywords: [
    "plastic surgeon",
    "Beverly Hills",
    "rhinoplasty",
    "facelift",
    "breast augmentation",
    "cosmetic surgery",
    "board certified",
  ],
  openGraph: {
    title: "Dr. Alexander Hamilton | Board Certified Plastic Surgeon",
    description: "Premier aesthetic surgery in Beverly Hills. Natural, elegant results.",
    type: "website",
    locale: "en_US",
    siteName: "Surgeon Platform",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dr. Alexander Hamilton | Board Certified Plastic Surgeon",
    description: "Premier aesthetic surgery in Beverly Hills.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured data for medical business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              name: "Hamilton Aesthetic Surgery Center",
              description: "Board certified plastic and reconstructive surgery",
              address: {
                "@type": "PostalAddress",
                streetAddress: "9400 Brighton Way, Suite 310",
                addressLocality: "Beverly Hills",
                addressRegion: "CA",
                postalCode: "90210",
                addressCountry: "US",
              },
              telephone: "+1-310-555-0123",
              priceRange: "$$$",
              medicalSpecialty: "Plastic Surgery",
            }),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
