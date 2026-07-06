import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Invest With Surendra | Premium JDA Approved Plots in Jaipur",
  description:
    "Invest With Surendra helps families and investors buy premium JDA approved plots in Jaipur with complete transparency, legal guidance and end-to-end support. RERA registered projects with 80–90% bank loan.",
  keywords:
    "JDA approved plots Jaipur, RERA registered projects, real estate Jaipur, luxury township Jaipur, Surendra Kumar Meena, invest with surendra, premium plots",
  openGraph: {
    title: "Invest With Surendra — Premium JDA Approved Townships in Jaipur",
    description:
      "JDA Approved • RERA Registered • 80–90% Bank Loan. Buy premium plots in Jaipur with full transparency.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${poppins.variable}`}>
      <body className="bg-white text-primary antialiased">
        {children}
        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
