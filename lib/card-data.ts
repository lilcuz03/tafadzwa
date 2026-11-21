// Single source of truth for the digital business card.
// Used by the /card page AND the downloadable vCard, so they never drift apart.

export const CARD = {
  name: "Tafadzwa Chiripanyanga",
  givenName: "Tafadzwa",
  familyName: "Chiripanyanga",
  initials: "TC",
  role: "Founder & fullstack developer",
  brand: "taachii",
  location: "Durban, South Africa",
  locationShort: "Durban · Remote",
  phone: "+27813532248",
  phoneDisplay: "+27 81 353 2248",
  email: "tafadzwachiri03@outlook.com",
  site: "https://tafadzwa.site",
  siteDisplay: "tafadzwa.site",
  whatsappText:
    "Hi Tafadzwa, I got your card and I'd like to talk about a project.",
  socials: [
    {
      id: "instagram",
      label: "Instagram",
      handle: "@_tafadzwa_03",
      href: "https://www.instagram.com/_tafadzwa_03",
    },
    {
      id: "github",
      label: "GitHub",
      handle: "@lilcuz03",
      href: "https://github.com/lilcuz03",
    },
    {
      id: "facebook",
      label: "Facebook",
      handle: "Tafadzwa Chiripanyanga",
      href: "https://www.facebook.com/tafadzwa.chiripanyanga.87727",
    },
  ],
} as const;

export const CARD_URL = `${CARD.site}/card`;
