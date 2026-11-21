import type { Metadata } from "next";
import CardView from "@/components/CardView";
import { CARD, CARD_URL } from "@/lib/card-data";

const TITLE = `${CARD.name} | Contact card`;
const DESCRIPTION = `Call, WhatsApp, email or save the contact details for ${CARD.name} of ${CARD.brand}, a Durban web and mobile development studio.`;
const OG_IMAGE = `${CARD.site}/opengraph-image`;

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: CARD_URL },
  // A utility page reached by QR code: keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    type: "profile",
    url: CARD_URL,
    siteName: CARD.brand,
    locale: "en_ZA",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: CARD.brand }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function CardPage() {
  return <CardView />;
}
