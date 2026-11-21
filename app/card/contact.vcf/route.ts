import { CARD } from "@/lib/card-data";

export const dynamic = "force-static";

// vCard values: escape backslash, semicolon, comma and newlines
const esc = (s: string) =>
  s
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\r?\n/g, "\\n");

export function GET() {
  const social = (type: string, href: string) =>
    `X-SOCIALPROFILE;TYPE=${type}:${href}`;

  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:${esc(CARD.familyName)};${esc(CARD.givenName)};;;`,
    `FN:${esc(CARD.name)}`,
    `ORG:${esc(CARD.brand)}`,
    `TITLE:${esc(CARD.role)}`,
    `TEL;TYPE=CELL,VOICE:${CARD.phone}`,
    `EMAIL;TYPE=INTERNET,WORK:${CARD.email}`,
    `URL:${CARD.site}`,
    `ADR;TYPE=WORK:;;;Durban;KwaZulu-Natal;;South Africa`,
    ...CARD.socials.map((s) => social(s.id, s.href)),
    "END:VCARD",
  ];

  return new Response(lines.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition":
        'attachment; filename="tafadzwa-chiripanyanga.vcf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
