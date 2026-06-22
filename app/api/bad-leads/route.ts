// app/api/bad-leads/route.ts
//
// Reads the BadWebsiteLeads tab from the existing Google Sheet.
// Uses the same JWT auth pattern as /api/leads/route.ts.
//
// Column mapping:
//   A: Business Name  B: Website     C: Verdict      D: Impression
//   E: Observations   F: Email Pitch  G: WhatsApp Pitch
//   H: Phone          I: Address     J: Date

import { NextRequest, NextResponse } from "next/server";
import { JWT } from "google-auth-library";

export const dynamic = "force-dynamic";

const SHEET_ID = "1cswc52c4vhShjuMbVfjJUv7ut3LZu33gDdvB676c0yA";
const TAB_NAME = "BadWebsiteLeads";

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars",
    );
  }

  const key = rawKey.replace(/\\n/g, "\n");

  return new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function fetchRows(): Promise<string[][]> {
  const client = getClient();
  await client.authorize();

  const range = `${TAB_NAME}!A2:J`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(range)}`;

  const res = await client.request<{ values?: string[][] }>({ url });
  return res.data.values || [];
}

export async function GET(req: NextRequest) {
  const pin = req.nextUrl.searchParams.get("pin");
  if (!process.env.DASHBOARD_PIN || pin !== process.env.DASHBOARD_PIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await fetchRows();

    const leads = rows
      .map((row, i) => ({
        rowIndex: i + 2,
        businessName: (row[0] ?? "").trim(),
        website: (row[1] ?? "").trim(),
        verdict: (row[2] ?? "").trim(),
        impression: (row[3] ?? "").trim(),
        observations: (row[4] ?? "").trim(),
        emailPitch: (row[5] ?? "").trim(),
        whatsappPitch: (row[6] ?? "").trim(),
        phone: (row[7] ?? "").trim(),
        address: (row[8] ?? "").trim(),
        date: (row[9] ?? "").trim(),
      }))
      .filter((l) => l.businessName !== "")
      .sort((a, b) => {
        const da = Date.parse(a.date);
        const db = Date.parse(b.date);
        if (!isNaN(db) && !isNaN(da)) return db - da;
        return b.rowIndex - a.rowIndex;
      });

    return NextResponse.json({ leads });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("[bad-leads api]", message);
    return NextResponse.json(
      { error: "Failed to fetch leads", detail: message },
      { status: 500 },
    );
  }
}
