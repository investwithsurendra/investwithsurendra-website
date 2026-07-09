export const PHONE = "+91 9352835139";
export const PHONE_TEL = "+919352835139";
export const WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919352835139";
export const EMAIL = "surendra.kumar.ctl@gmail.com";
export const ADDRESS =
  "356, Vardhaman Nagar B, Gopalpura Bypass Road, Patrakar Colony, Mansarovar, Jaipur, Rajasthan 302020";
export const MAP_QUERY = encodeURIComponent(ADDRESS);
export const MAP_EMBED ="https://www.google.com/maps?q=Chart%20Group%2C%20356%2C%20Vardhaman%20Nagar%20B%2C%20Gopalpura%20Bypass%20Road%2C%20Patrakar%20Colony%2C%20Mansarovar%2C%20Jaipur%20302020&output=embed";
export const MAP_LINK ="https://www.google.com/maps?cid=4242797736907051441&hl=en";

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Property Finder", href: "/property-finder" },
  { label: "Calculators", href: "/tools/emi-calculator" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/contact" },
];

export const waLink = (msg) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    msg || "Hi Surendra, I'm interested in JDA approved plots in Jaipur. Please share details."
  )}`;

export const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://www.investwithsurendra.com";
