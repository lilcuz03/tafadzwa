
// app/api/leads/route.ts
//
// Server-side route that reads the "Freelance Leads" Google Sheet and returns
// clean JSON for the dashboard. Uses a Google service account (read-only) so
// no OAuth flow is needed for this internal page.
//
// ── SETUP ────────────────────────────────────────────────────────────────
// 1. In Google Cloud Console (you already have project "leads" / leads-499314):
//      APIs & Services → Credentials → Create Credentials → Service Account
//      Give it the "Viewer" role (read-only is all this needs).
// 2. Create a JSON key for that service account, download it.
// 3. Share your "Freelance Leads" Google Sheet with the service account's
//    email address (looks like xxx@leads-499314.iam.gserviceaccount.com),
//    same as sharing with any other Google user — Viewer access is enough.
// 4. Enable the "Google Sheets API" for the project if not already on.
// 5. Add these to your .env.local (and your hosting provider's env vars):
//
//      GOOGLE_SERVICE_ACCOUNT_EMAIL=xxx@leads-499314.iam.gserviceaccount.com
//      GOOGLE_SERVICE_ACCOUNT_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
//      LEADS_SHEET_ID=1cswc52c4vhShjuMbVfjJUv7ut3LZu33gDdvB676c0yA
//      LEADS_SHEET_TAB=Sheet1   (the tab name your data lives on)
//      DASHBOARD_PIN=your-chosen-pin
//
//    Note: the private key has literal "\n" sequences when pasted into an
//    env var — the code below converts them back to real newlines.
//
// 6. npm install google-auth-library
// ────────────────────────────────────────────────────────────────────────

import { NextRequest, NextResponse } from "next/server";
import { JWT } from "google-auth-library";

export const dynamic = "force-dynamic"; // never cache — always fetch fresh

// Column layout, matching the sheet exactly (A → Q).
// Index 0 = column A, 1 = column B, etc.
const COLS = {
  businessName: 0, // A
  phone: 1, // B
  address: 2, // C
  mapsUrl: 3, // D
  hasWebsite: 4, // E
  websiteStatus: 5, // F
  pitchAngle: 6, // G
  category: 7, // H
  city: 8, // I
  country: 9, // J
  dateAdded: 10, // K
  email: 11, // L
  contactChannel: 12, // M
  phoneE164: 13, // N
  waLink: 14, // O
  outreachStatus: 15, // P
  lastContacted: 16, // Q
};

export type Lead = {
  rowIndex: number;
  businessName: string;
  phone: string;
  address: string;
  mapsUrl: string;
  hasWebsite: string;
  category: string;
  city: string;
  country: string;
  dateAdded: string; // raw string as stored in the sheet
  email: string;
  waLink: string;
  outreachStatus: string;
  lastContacted: string;
};

function getClient() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;

  if (!email || !rawKey) {
    throw new Error(
      "Missing GOOGLE_SERVICE_ACCOUNT_EMAIL or GOOGLE_SERVICE_ACCOUNT_KEY env vars"
    );
  }

  const key = rawKey.replace(/\\n/g, "\n");

  return new JWT({
    email,
    key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
}

async function fetchSheetRows(): Promise<string[][]> {
  const sheetId = process.env.LEADS_SHEET_ID;
  const tab = process.env.LEADS_SHEET_TAB || "Sheet1";

  if (!sheetId) {
    throw new Error("Missing LEADS_SHEET_ID env var");
  }

  const client = getClient();
  await client.authorize();

  // Pull columns A:Q, skipping the header row (row 1) — we ask for 2:10000
  // to cover growth without re-deploying when the sheet gets longer.
  const range = `${tab}!A2:Q10000`;
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(
    range
  )}`;

  const res = await client.request<{ values?: string[][] }>({ url });
  return res.data.values || [];
}

function rowToLead(row: string[], idx: number): Lead {
  const get = (i: number) => (row[i] ?? "").toString().trim();
  return {
    rowIndex: idx,
    businessName: get(COLS.businessName),
    phone: get(COLS.phone),
    address: get(COLS.address),
    mapsUrl: get(COLS.mapsUrl),
    hasWebsite: get(COLS.hasWebsite),
    category: get(COLS.category),
    city: get(COLS.city),
    country: get(COLS.country),
    dateAdded: get(COLS.dateAdded),
    email: get(COLS.email),
    waLink: get(COLS.waLink),
    outreachStatus: get(COLS.outreachStatus),
    lastContacted: get(COLS.lastContacted),
  };
}

export async function GET(req: NextRequest) {
  // Simple PIN check — the dashboard page also gates client-side, but this
  // protects the data endpoint itself from being hit directly.
  const pin = req.nextUrl.searchParams.get("pin");
  if (!process.env.DASHBOARD_PIN || pin !== process.env.DASHBOARD_PIN) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const rows = await fetchSheetRows();

    const leads = rows
      .map((row, i) => rowToLead(row, i))
      // Drop fully blank rows (trailing empty rows in the sheet range)
      .filter((l) => l.businessName !== "")
      // Only leads that actually have a way to be contacted
      .filter((l) => l.waLink !== "" || l.email !== "");

    // Most recent first — parse Date Added, fall back to row order if unparseable
    leads.sort((a, b) => {
      const da = Date.parse(a.dateAdded);
      const db = Date.parse(b.dateAdded);
      if (!isNaN(db) && !isNaN(da)) return db - da;
      return b.rowIndex - a.rowIndex;
    });

    return NextResponse.json({ leads });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Leads fetch failed:", message);
    return NextResponse.json(
      { error: "Failed to load leads", detail: message },
      { status: 500 }
    );
  }
}