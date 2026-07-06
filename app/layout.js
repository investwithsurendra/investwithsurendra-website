import { Playfair_Display, Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Toaster } from "sonner";
import { SITE_URL, PHONE, EMAIL, ADDRESS } from "@/lib/shared";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap", weight: ["400", "500", "600", "700", "800", "900"] });
const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", display: "swap", weight: ["300", "400", "500", "600", "700"] });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Invest With Surendra | Premium JDA Approved Plots in Jaipur",
    template: "%s | Invest With Surendra",
  },
  description:
    "Buy premium JDA approved & RERA registered plots in Jaipur. Invest With Surendra offers The Orbis SEZ, Silver Dune, Akira Living & Knowledge Park with 80\u201390% bank loan and complete legal support.",
  keywords: [
    "JDA approved plots Jaipur",
    "RERA registered projects Jaipur",
    "real estate Jaipur",
    "luxury township Jaipur",
    "premium plots Jaipur",
    "Surendra Kumar Meena",
    "invest with surendra",
    "Mahindra SEZ plots",
    "Ajmer Road properties",
    "Knowledge City Jaipur",
    "NRI investment Jaipur",
    "home loan Jaipur",
  ],
  authors: [{ name: "Surendra Kumar Meena" }],
  creator: "Invest With Surendra",
  publisher: "Invest With Surendra",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Invest With Surendra \u2014 Premium JDA Approved Townships in Jaipur",
    description: "JDA Approved \u2022 RERA Registered \u2022 80\u201390% Bank Loan. Buy premium plots in Jaipur with full transparency.",
    url: SITE_URL,
    siteName: "Invest With Surendra",
    locale: "en_IN",
    type: "website",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Invest With Surendra" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invest With Surendra \u2014 Premium JDA Approved Plots",
    description: "Premium JDA approved plots in Jaipur with RERA and 80\u201390% bank loan.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION } : undefined,
  category: "real estate",
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Invest With Surendra",
  image: `${SITE_URL}/og-image.jpg`,
  "@id": SITE_URL,
  url: SITE_URL,
  telephone: PHONE,
  email: EMAIL,
  priceRange: "\u20b918L \u2013 \u20b91Cr+",
  address: {
    "@type": "PostalAddress",
    streetAddress: "356, Vardhaman Nagar B, Gopalpura Bypass Road, Patrakar Colony",
    addressLocality: "Mansarovar, Jaipur",
    addressRegion: "Rajasthan",
    postalCode: "302020",
    addressCountry: "IN",
  },
  geo: { "@type": "GeoCoordinates", latitude: 26.8467, longitude: 75.7648 },
  openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], opens: "09:00", closes: "21:00" }],
  founder: { "@type": "Person", name: "Surendra Kumar Meena", jobTitle: "Founder & CEO" },
  sameAs: ["https://www.facebook.com/investwithsurendra", "https://www.instagram.com/investwithsurendra", "https://www.youtube.com/@investwithsurendra"],
  areaServed: { "@type": "City", name: "Jaipur" },
  makesOffer: ["JDA Approved Plots", "RERA Registered Projects", "Home Loan Assistance", "NRI Property Investment"],
};

export default function RootLayout({ children }) {
  const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
  const META_PIXEL = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const GADS_ID = process.env.NEXT_PUBLIC_GADS_ID;

  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <head>
        <link rel="canonical" href={SITE_URL} />
        <meta name="format-detection" content="telephone=yes" />
        <meta name="geo.region" content="IN-RJ" />
        <meta name="geo.placename" content="Jaipur" />
        <meta name="geo.position" content="26.8467;75.7648" />
        <meta name="ICBM" content="26.8467, 75.7648" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

        {/* GA4 */}
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${GA_ID}');${GADS_ID ? `gtag('config','${GADS_ID}');` : ''}`}</Script>
          </>
        )}

        {/* Google Ads standalone (if no GA) */}
        {!GA_ID && GADS_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GADS_ID}`} strategy="afterInteractive" />
            <Script id="gads-init" strategy="afterInteractive">{`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config','${GADS_ID}');`}</Script>
          </>
        )}

        {/* Meta Pixel */}
        {META_PIXEL && (
          <Script id="meta-pixel" strategy="afterInteractive">{`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${META_PIXEL}');fbq('track','PageView');`}</Script>
        )}
      </head>
      <body className="bg-white text-primary antialiased">
        {META_PIXEL && (<noscript><img height="1" width="1" style={{ display: "none" }} src={`https://www.facebook.com/tr?id=${META_PIXEL}&ev=PageView&noscript=1`} alt="" /></noscript>)}
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
