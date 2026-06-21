"use client";

// app/dashboard/page.tsx
//
// Hidden, PIN-gated leads dashboard. Pulls from /api/leads (which reads the
// Google Sheet server-side) and lets you filter by recency, category, and
// outreach status, then jump straight into WhatsApp or email with one click.
//
// This page is intentionally not linked from anywhere in the site nav —
// reach it directly at tafadzwa.site/dashboard. It is also excluded from
// the sitemap and given a noindex meta tag below.

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  Lock,
  Search,
  MessageCircle,
  Mail,
  MapPin as MapPinIcon,
  RefreshCcw,
  ChevronDown,
  Building2,
  CalendarClock,
} from "lucide-react";

type Lead = {
  rowIndex: number;
  businessName: string;
  phone: string;
  address: string;
  mapsUrl: string;
  hasWebsite: string;
  category: string;
  city: string;
  country: string;
  dateAdded: string;
  email: string;
  waLink: string;
  outreachStatus: string;
  lastContacted: string;
};

const PIN_STORAGE_KEY = "leads-dashboard-pin";

// ─── Date grouping helpers ───────────────────────────────────────────────

function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function groupLabel(dateStr: string): string {
  const parsed = new Date(dateStr);
  if (isNaN(parsed.getTime())) return "Undated";

  const today = startOfDay(new Date());
  const day = startOfDay(parsed);
  const diffDays = Math.round((today.getTime() - day.getTime()) / 86400000);

  if (diffDays === 0) return "Today";
  if (diffDays === 1) return "Yesterday";
  if (diffDays > 1 && diffDays <= 7) return "This week";
  if (diffDays > 7 && diffDays <= 30) return "This month";
  return "Older";
}

const GROUP_ORDER = [
  "Today",
  "Yesterday",
  "This week",
  "This month",
  "Older",
  "Undated",
];

// ─── PIN Gate ────────────────────────────────────────────────────────────

function PinGate({
  onUnlock,
  errorMessage,
}: {
  onUnlock: (pin: string) => void;
  errorMessage?: string | null;
}) {
  const [pin, setPin] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (pin.trim().length === 0) return;
    onUnlock(pin.trim());
  }

  return (
    <main className="relative min-h-screen bg-[#0c0a0f] text-[#f3f0fa] antialiased flex items-center justify-center px-5 font-[family-name:var(--font-mono,monospace)]">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full opacity-30"
          style={{
            width: 500,
            height: 500,
            top: -140,
            left: -100,
            filter: "blur(100px)",
            background:
              "radial-gradient(circle, rgba(167,139,250,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-25"
          style={{
            width: 420,
            height: 420,
            bottom: -140,
            right: -100,
            filter: "blur(100px)",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.25), transparent 70%)",
          }}
        />
        <div className="dash-grid-overlay" />
      </div>

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-[360px] rounded-xl border border-violet-400/[0.15] bg-white/[0.02] p-8 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
          </span>
          <span className="text-[10px] text-violet-300/70 font-medium uppercase tracking-[0.18em]">
            Restricted access
          </span>
        </div>

        <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 bg-violet-400/[0.08] border border-violet-400/20">
          <Lock
            className="w-5 h-5 text-violet-300"
            strokeWidth={1.8}
          />
        </div>
        <h1 className="text-[19px] font-bold tracking-[-0.01em] mb-1.5 font-sans">
          leads // console
        </h1>
        <p className="text-[12.5px] text-violet-200/40 mb-6 leading-relaxed font-sans font-light">
          Enter your PIN to continue.
        </p>
        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          autoFocus
          className="w-full bg-black/30 border border-violet-400/20 rounded-lg px-4 py-3 text-[15px] text-violet-50 placeholder:text-violet-300/20 outline-none focus:border-amber-400/50 transition-colors mb-3 tracking-[0.3em]"
        />
        {errorMessage && (
          <p className="text-[12px] text-amber-400 mb-3 -mt-1 font-sans">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 text-[#0c0a0f] text-[13px] font-bold px-5 py-3 rounded-lg tracking-tight transition-all font-sans hover:brightness-110"
          style={{
            background: "linear-gradient(110deg, #a78bfa, #fbbf24)",
          }}
        >
          Unlock
        </button>
      </form>

      <style
        jsx
        global
      >{`
        .dash-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(167, 139, 250, 0.04) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(167, 139, 250, 0.04) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
        }
      `}</style>
    </main>
  );
}

// ─── Lead Card ───────────────────────────────────────────────────────────

// Status → accent color mapping for the left-edge bar. Anything not
// recognized falls back to a neutral grey — the bar's job is to let your
// eye sort the grid by status without reading every badge.
function statusAccent(status: string): string {
  const s = status.toLowerCase();
  if (s.includes("replied") || s.includes("won") || s.includes("interested")) {
    return "#fbbf24"; // amber — something needs action from you
  }
  if (s.includes("sent") || s.includes("contacted")) {
    return "#a78bfa"; // violet — already in motion
  }
  if (s.includes("declined") || s.includes("closed") || s.includes("lost")) {
    return "#52525b"; // muted grey — done, no action needed
  }
  return "#3f3b4a"; // default — not yet contacted
}

function LeadCard({ lead }: { lead: Lead }) {
  const accent = statusAccent(lead.outreachStatus);

  return (
    <div className="group relative rounded-lg border border-violet-400/[0.08] bg-white/[0.015] pl-4 pr-5 py-5 hover:border-violet-400/25 hover:bg-violet-400/[0.02] transition-all duration-300 overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-[3px]"
        style={{ background: accent }}
      />

      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-violet-50 tracking-tight truncate font-sans">
            {lead.businessName}
          </h3>
          <div className="flex items-center gap-2 mt-1.5 flex-wrap font-[family-name:var(--font-mono,monospace)]">
            {lead.category && (
              <span className="inline-flex items-center gap-1 text-[10px] text-violet-300/60 bg-violet-400/[0.06] rounded px-1.5 py-0.5 uppercase tracking-wide">
                <Building2 className="w-2.5 h-2.5" />
                {lead.category}
              </span>
            )}
            {lead.city && (
              <span className="inline-flex items-center gap-1 text-[10px] text-violet-200/30 uppercase tracking-wide">
                <MapPinIcon className="w-2.5 h-2.5" />
                {lead.city}
              </span>
            )}
          </div>
        </div>
        {lead.outreachStatus && (
          <span
            className="flex-shrink-0 text-[9.5px] font-semibold uppercase tracking-wider rounded px-2 py-1 font-[family-name:var(--font-mono,monospace)]"
            style={{
              color: accent,
              background: `${accent}1a`,
              border: `1px solid ${accent}33`,
            }}
          >
            {lead.outreachStatus}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 mt-4">
        {lead.waLink && (
          <a
            href={lead.waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[12px] font-semibold px-3 py-2.5 rounded-md transition-all font-sans hover:brightness-110"
            style={{
              background: "linear-gradient(110deg, #a78bfa, #fbbf24)",
              color: "#0c0a0f",
            }}
          >
            <MessageCircle
              className="w-3.5 h-3.5"
              strokeWidth={2}
            />
            WhatsApp
          </a>
        )}
        {lead.email && (
          <a
            href={`mailto:${lead.email}`}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/[0.03] border border-violet-400/15 text-violet-200/70 text-[12px] font-medium px-3 py-2.5 rounded-md hover:bg-white/[0.06] hover:border-violet-400/30 transition-all font-sans"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
        )}
        {!lead.waLink && !lead.email && (
          <span className="flex-1 text-center text-[11px] text-violet-200/25 py-2.5 font-sans">
            No contact method
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Data-fetching hook ──────────────────────────────────────────────────
//
// Pulled out of the Dashboard component into its own hook. This is the
// pattern the React Compiler's exhaustive-deps / "no setState in effect"
// rule actually wants: the effect's job is to *subscribe* to the pin +
// reloadToken inputs and synchronize `leads`/`loading`/`error` with
// whatever the network currently says, rather than a component directly
// calling an imperative async function from inside (or adjacent to) an
// effect. Bumping `reloadToken` is how the Refresh button asks this hook
// to re-run, without ever calling setState from inside the effect's own
// closure chain.

function useLeads(pin: string, onAuthFailed: () => void) {
  const [leads, setLeads] = useState<Lead[]>([]);
  // loading starts true so the very first render already shows the
  // loading state — no need to set it inside the effect.
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(`/api/leads?pin=${encodeURIComponent(pin)}`, {
          cache: "no-store",
        });
        if (res.status === 401) {
          if (!cancelled) onAuthFailed();
          return;
        }
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || `Request failed (${res.status})`);
        }
        const data = await res.json();
        if (!cancelled) {
          setLeads(data.leads || []);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Failed to load leads");
        }
      } finally {
        // The only place loading is ever set to false. The effect never
        // sets it to true — that's handled by the initial useState(true)
        // for the first run, and by refetch() for subsequent ones — so
        // there's no setState call sitting directly in the effect body.
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    run();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, reloadToken]);

  // refetch is a user-triggered event handler (called from a button's
  // onClick), not effect code, so setState here is completely normal —
  // it's what flips loading back to true before bumping reloadToken to
  // kick the effect off again.
  const refetch = () => {
    setLoading(true);
    setReloadToken((t) => t + 1);
  };

  return { leads, loading, error, refetch };
}

// ─── Main Dashboard ──────────────────────────────────────────────────────

function Dashboard({
  pin,
  onAuthFailed,
}: {
  pin: string;
  onAuthFailed: () => void;
}) {
  const {
    leads,
    loading,
    error: errorMsg,
    refetch,
  } = useLeads(pin, onAuthFailed);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [recencyFilter, setRecencyFilter] = useState<string>("All");
  const [channelFilter, setChannelFilter] = useState<
    "All" | "WhatsApp" | "Email"
  >("All");

  const categories = useMemo(() => {
    const set = new Set(leads.map((l) => l.category).filter(Boolean));
    return ["All", ...Array.from(set).sort()];
  }, [leads]);

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (
        search.trim() &&
        !l.businessName.toLowerCase().includes(search.trim().toLowerCase())
      ) {
        return false;
      }
      if (categoryFilter !== "All" && l.category !== categoryFilter)
        return false;
      if (channelFilter === "WhatsApp" && !l.waLink) return false;
      if (channelFilter === "Email" && !l.email) return false;
      if (recencyFilter !== "All" && groupLabel(l.dateAdded) !== recencyFilter)
        return false;
      return true;
    });
  }, [leads, search, categoryFilter, channelFilter, recencyFilter]);

  // Group by recency label, most-recent group first, leads within each
  // group already sorted newest-first by the API.
  const grouped = useMemo(() => {
    const map = new Map<string, Lead[]>();
    for (const lead of filtered) {
      const label = groupLabel(lead.dateAdded);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(lead);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      label: g,
      leads: map.get(g)!,
    }));
  }, [filtered]);

  const todayCount = useMemo(
    () => leads.filter((l) => groupLabel(l.dateAdded) === "Today").length,
    [leads],
  );

  return (
    <main className="relative min-h-screen bg-[#0c0a0f] text-[#f3f0fa] antialiased overflow-hidden">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full opacity-25"
          style={{
            width: 520,
            height: 520,
            top: -140,
            left: -100,
            filter: "blur(110px)",
            background:
              "radial-gradient(circle, rgba(167,139,250,0.4), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 460,
            height: 460,
            top: 240,
            right: -120,
            filter: "blur(110px)",
            background:
              "radial-gradient(circle, rgba(251,191,36,0.3), transparent 70%)",
          }}
        />
        <div className="dash-grid-overlay" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-[clamp(2.5rem,5vw,4rem)]">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-violet-400/[0.1]">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
              </span>
              <span className="text-[10px] text-violet-300/60 font-medium uppercase tracking-[0.18em] font-[family-name:var(--font-mono,monospace)]">
                Internal · Live
              </span>
            </div>
            <h1 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-1.5 font-sans">
              leads // console
            </h1>
            <p className="text-[12.5px] text-violet-200/40 font-[family-name:var(--font-mono,monospace)]">
              {leads.length} total
              {todayCount > 0 && (
                <span className="text-amber-400/80">
                  {" "}
                  · {todayCount} added today
                </span>
              )}
            </p>
          </div>
          <button
            onClick={refetch}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-white/[0.03] border border-violet-400/15 text-violet-200/70 text-[12px] font-medium px-4 py-2.5 rounded-lg hover:bg-white/[0.06] hover:border-violet-400/30 transition-all disabled:opacity-50 font-sans"
          >
            <RefreshCcw
              className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
        </div>

        {/* Filters */}
        <div className="rounded-lg border border-violet-400/[0.1] bg-white/[0.015] p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-violet-300/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search business name..."
                className="w-full bg-black/20 border border-violet-400/15 rounded-md pl-9 pr-3 py-2.5 text-[12.5px] text-violet-50 placeholder:text-violet-300/25 outline-none focus:border-amber-400/40 transition-colors font-[family-name:var(--font-mono,monospace)]"
              />
            </div>

            <FilterSelect
              icon={<CalendarClock className="w-3.5 h-3.5" />}
              value={recencyFilter}
              onChange={setRecencyFilter}
              options={["All", ...GROUP_ORDER]}
            />

            <FilterSelect
              icon={<Building2 className="w-3.5 h-3.5" />}
              value={categoryFilter}
              onChange={setCategoryFilter}
              options={categories}
            />

            <FilterSelect
              icon={<MessageCircle className="w-3.5 h-3.5" />}
              value={channelFilter}
              onChange={(v) =>
                setChannelFilter(v as "All" | "WhatsApp" | "Email")
              }
              options={["All", "WhatsApp", "Email"]}
            />
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="text-center py-20 text-[12.5px] text-violet-200/40 font-[family-name:var(--font-mono,monospace)]">
            loading leads…
          </div>
        )}

        {!loading && errorMsg && (
          <div className="text-center py-20">
            <p className="text-[12.5px] text-amber-400 mb-2 font-[family-name:var(--font-mono,monospace)]">
              {errorMsg}
            </p>
            <button
              onClick={refetch}
              className="text-[12px] text-violet-300 hover:text-violet-200 transition-colors font-sans"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !errorMsg && filtered.length === 0 && (
          <div className="text-center py-20 text-[12.5px] text-violet-200/40 font-[family-name:var(--font-mono,monospace)]">
            no leads match these filters
          </div>
        )}

        {/* Grouped results */}
        {!loading &&
          !errorMsg &&
          grouped.map((group) => (
            <div
              key={group.label}
              className="mb-10"
            >
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-[12px] font-semibold text-amber-400/90 tracking-wide uppercase font-[family-name:var(--font-mono,monospace)]">
                  {group.label}
                </h2>
                <span className="text-[11px] text-violet-200/30 font-[family-name:var(--font-mono,monospace)]">
                  {group.leads.length}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-violet-400/15 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.leads.map((lead) => (
                  <LeadCard
                    key={`${lead.rowIndex}-${lead.businessName}`}
                    lead={lead}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>

      <style
        jsx
        global
      >{`
        .dash-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(167, 139, 250, 0.035) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(167, 139, 250, 0.035) 1px,
              transparent 1px
            );
          background-size: 48px 48px;
          mask-image: radial-gradient(
            ellipse 80% 60% at 50% 0%,
            black 40%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 80% 60% at 50% 0%,
            black 40%,
            transparent 100%
          );
        }
      `}</style>
    </main>
  );
}

function FilterSelect({
  icon,
  value,
  onChange,
  options,
}: {
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-violet-300/40 pointer-events-none">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-black/20 border border-violet-400/15 rounded-md pl-9 pr-8 py-2.5 text-[12px] text-violet-200/80 outline-none focus:border-amber-400/40 transition-colors cursor-pointer font-[family-name:var(--font-mono,monospace)]"
      >
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className="bg-[#0c0a0f] text-violet-100"
          >
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-violet-300/40 pointer-events-none" />
    </div>
  );
}

// ─── sessionStorage subscription ─────────────────────────────────────────
//
// useSyncExternalStore is the React-supplied primitive for exactly this
// situation: reading a value from something outside React (sessionStorage)
// in a way that's safe for SSR. It takes three functions:
//   1. subscribe   — how to listen for external changes (storage events)
//   2. getSnapshot — how to read the current value on the client
//   3. getServerSnapshot — what to render during SSR, where sessionStorage
//      doesn't exist at all
// React guarantees the server snapshot is what both the server render and
// the client's first render use, so there's no hydration mismatch — and
// no setState call sitting in an effect body at all, since this hook
// doesn't use an effect internally for the value itself.

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}

function getStoredPin(): string | null {
  return sessionStorage.getItem(PIN_STORAGE_KEY);
}

function getServerPin(): string | null {
  // No sessionStorage during SSR — always render as "no pin yet" on the
  // server, matching what the client would see before it can check.
  return null;
}

// ─── Page Export — handles the PIN gate / unlock flow ───────────────────

export default function DashboardPage() {
  const pin = useSyncExternalStore(
    subscribeToStorage,
    getStoredPin,
    getServerPin,
  );
  const [authError, setAuthError] = useState<string | null>(null);

  function handleUnlock(enteredPin: string) {
    setAuthError(null);
    sessionStorage.setItem(PIN_STORAGE_KEY, enteredPin);
    // Manually notify useSyncExternalStore's subscription, since the
    // native "storage" event only fires in *other* tabs/windows, never
    // the one that made the change.
    window.dispatchEvent(new Event("storage"));
  }

  // Called by Dashboard when /api/leads responds 401 — the stored PIN was
  // wrong (or has since changed). Clears it and bounces back to the gate
  // with a visible error, rather than silently failing.
  function handleAuthFailed() {
    sessionStorage.removeItem(PIN_STORAGE_KEY);
    window.dispatchEvent(new Event("storage"));
    setAuthError("Incorrect PIN. Try again.");
  }

  if (!pin) {
    return (
      <PinGate
        onUnlock={handleUnlock}
        errorMessage={authError}
      />
    );
  }

  return (
    <Dashboard
      pin={pin}
      onAuthFailed={handleAuthFailed}
    />
  );
}
