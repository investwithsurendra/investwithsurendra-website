"use client";

export const PHONE = "+91 9352835139";
export const PHONE_TEL = "+919352835139";
export const WA = "919352835139";
export const EMAIL = "surendra.kumar.ctl@gmail.com";
export const ADDRESS =
  "356, Vardhaman Nagar B, Gopalpura Bypass Road, Patrakar Colony, Mansarovar, Jaipur, Rajasthan 302020";
export const MAP_QUERY = encodeURIComponent(ADDRESS);
export const MAP_EMBED = `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`;
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`;

export const NAV_LINKS = [
  { label: "Home", href: "/#home" },
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Why Us", href: "/#why" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export const waLink = (msg) =>
  `https://wa.me/${WA}?text=${encodeURIComponent(
    msg || "Hi Surendra, I'm interested in JDA approved plots in Jaipur. Please share details."
  )}`;
