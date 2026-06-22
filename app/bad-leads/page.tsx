"use client";

// app/bad-leads/page.tsx
//
// Hidden, PIN-gated dashboard for Bad Website Pitch leads.
// Pulls from /api/bad-leads (BadWebsiteLeads Google Sheet tab).
// Sorted newest-first, grouped by date. Each card has:
//   - Business name + verdict badge
//   - Impression from Groq
//   - Address + phone
//   - Send Email button (opens Gmail compose with pitch pre-filled)
//   - Send WhatsApp button (opens wa.me with pitch pre-filled)
//
// Colour theme: dark cyan / emerald — distinct from the violet/amber dashboard.
// Secret URL: tafadzwa.site/bad-leads — not linked anywhere in the site.

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import {
  Lock,
  Search,
  MessageCircle,
  Mail,
  MapPin as MapPinIcon,
  RefreshCcw,
  ChevronDown,
  Globe,
  CalendarClock,
  TrendingDown,
  Copy,
  Check,
} from "lucide-react";

type BadLead = {
  rowIndex: number;
  businessName: string;
  website: string;
  verdict: string;
  impression: string;
  observations: string;
  emailPitch: string;
  whatsappPitch: string;
  phone: string;
  address: string;
  date: string;
};

const PIN_STORAGE_KEY = "bad-leads-dashboard-pin";

// ─── Date grouping ────────────────────────────────────────────────────────

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
  const diff = Math.round((today.getTime() - day.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Yesterday";
  if (diff <= 7) return "This week";
  if (diff <= 30) return "This month";
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

// ─── PIN Gate ─────────────────────────────────────────────────────────────

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
    <main className="relative min-h-screen bg-[#060d0d] text-[#e8f5f0] antialiased flex items-center justify-center px-5 font-[family-name:var(--font-mono,monospace)]">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full opacity-25"
          style={{
            width: 500,
            height: 500,
            top: -140,
            left: -100,
            filter: "blur(100px)",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.35), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 420,
            height: 420,
            bottom: -140,
            right: -100,
            filter: "blur(100px)",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.3), transparent 70%)",
          }}
        />
        <div className="bad-grid-overlay" />
      </div>

      <form
        onSubmit={submit}
        className="relative z-10 w-full max-w-[360px] rounded-xl border border-cyan-400/[0.15] bg-white/[0.02] p-8 backdrop-blur-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
          </span>
          <span className="text-[10px] text-cyan-300/70 font-medium uppercase tracking-[0.18em]">
            Restricted access
          </span>
        </div>

        <div className="w-11 h-11 rounded-lg flex items-center justify-center mb-5 bg-cyan-400/[0.08] border border-cyan-400/20">
          <Lock
            className="w-5 h-5 text-cyan-300"
            strokeWidth={1.8}
          />
        </div>

        <h1 className="text-[19px] font-bold tracking-[-0.01em] mb-1.5 font-sans">
          bad leads // console
        </h1>
        <p className="text-[12.5px] text-cyan-200/40 mb-6 leading-relaxed font-sans font-light">
          Enter your PIN to continue.
        </p>

        <input
          type="password"
          inputMode="numeric"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
          placeholder="••••"
          autoFocus
          className="w-full bg-black/30 border border-cyan-400/20 rounded-lg px-4 py-3 text-[15px] text-cyan-50 placeholder:text-cyan-300/20 outline-none focus:border-emerald-400/50 transition-colors mb-3 tracking-[0.3em]"
        />
        {errorMessage && (
          <p className="text-[12px] text-emerald-400 mb-3 -mt-1 font-sans">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 text-[#060d0d] text-[13px] font-bold px-5 py-3 rounded-lg tracking-tight transition-all font-sans hover:brightness-110"
          style={{ background: "linear-gradient(110deg, #06b6d4, #10b981)" }}
        >
          Unlock
        </button>
      </form>

      <style
        jsx
        global
      >{`
        .bad-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 182, 212, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.04) 1px, transparent 1px);
          background-size: 48px 48px;
        }
      `}</style>
    </main>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────

function CopyButton({ text, label }: { text: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      onClick={copy}
      className="inline-flex items-center gap-1 text-[10px] text-cyan-300/50 hover:text-cyan-300 transition-colors"
      title={`Copy ${label}`}
    >
      {copied ? (
        <Check className="w-3 h-3 text-emerald-400" />
      ) : (
        <Copy className="w-3 h-3" />
      )}
      {copied ? "Copied" : label}
    </button>
  );
}

// ─── Verdict badge ────────────────────────────────────────────────────────

function VerdictBadge({ verdict }: { verdict: string }) {
  const v = verdict.toLowerCase();
  const color =
    v === "weak"
      ? "#ef4444"
      : v === "adequate"
        ? "#f59e0b"
        : v === "strong"
          ? "#10b981"
          : "#64748b";

  return (
    <span
      className="flex-shrink-0 text-[9px] font-bold uppercase tracking-wider rounded px-2 py-0.5 font-[family-name:var(--font-mono,monospace)]"
      style={{
        color,
        background: `${color}1a`,
        border: `1px solid ${color}33`,
      }}
    >
      {verdict || "—"}
    </span>
  );
}

// ─── Lead Card ────────────────────────────────────────────────────────────

function BadLeadCard({ lead }: { lead: BadLead }) {
  const [expanded, setExpanded] = useState(false);

  // Build WhatsApp URL using phone number
  const rawPhone = lead.phone.replace(/\D/g, "");
  const waPhone = rawPhone.startsWith("0")
    ? "27" + rawPhone.slice(1)
    : rawPhone;
  const waUrl = lead.phone
    ? `https://wa.me/${waPhone}?text=${encodeURIComponent(lead.whatsappPitch)}`
    : null;

  // Build Gmail compose URL with email pitch
  const gmailUrl = lead.emailPitch
    ? `https://mail.google.com/mail/?view=cm&fs=1&su=${encodeURIComponent(
        `${lead.businessName} — Your Website Could Be Costing You Customers`,
      )}&body=${encodeURIComponent(lead.emailPitch)}`
    : null;

  return (
    <div className="group relative rounded-lg border border-cyan-400/[0.08] bg-white/[0.015] px-5 py-5 hover:border-cyan-400/20 hover:bg-cyan-400/[0.02] transition-all duration-300 overflow-hidden">
      {/* Left accent bar — always cyan for bad leads */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-cyan-400 to-emerald-500" />

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-[14px] font-semibold text-cyan-50 tracking-tight truncate font-sans">
            {lead.businessName}
          </h3>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            {lead.website && (
              <a
                href={lead.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] text-cyan-300/50 hover:text-cyan-300 transition-colors font-[family-name:var(--font-mono,monospace)] truncate max-w-[180px]"
              >
                <Globe className="w-2.5 h-2.5 flex-shrink-0" />
                {lead.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
              </a>
            )}
          </div>
        </div>
        <VerdictBadge verdict={lead.verdict} />
      </div>

      {/* Impression */}
      {lead.impression && (
        <p className="text-[12px] text-cyan-200/60 leading-relaxed mb-3 font-sans line-clamp-2">
          {lead.impression}
        </p>
      )}

      {/* Address + Phone */}
      <div className="flex flex-col gap-1 mb-4">
        {lead.address && (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] text-cyan-200/35 font-[family-name:var(--font-mono,monospace)]">
            <MapPinIcon className="w-2.5 h-2.5 flex-shrink-0" />
            {lead.address}
          </span>
        )}
        {lead.phone && (
          <span className="inline-flex items-center gap-1.5 text-[10.5px] text-cyan-200/35 font-[family-name:var(--font-mono,monospace)]">
            <span className="w-2.5 h-2.5 flex-shrink-0 text-center">☎</span>
            {lead.phone}
          </span>
        )}
      </div>

      {/* Observations toggle */}
      {lead.observations && (
        <div className="mb-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[10px] text-cyan-400/60 hover:text-cyan-400 transition-colors flex items-center gap-1 font-[family-name:var(--font-mono,monospace)]"
          >
            <ChevronDown
              className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
            />
            {expanded ? "hide observations" : "show observations"}
          </button>
          {expanded && (
            <div className="mt-2 p-3 rounded-md bg-black/20 border border-cyan-400/10">
              <p className="text-[11px] text-cyan-200/50 leading-relaxed font-sans whitespace-pre-line">
                {lead.observations}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {waUrl ? (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 text-[#060d0d] text-[12px] font-bold px-3 py-2.5 rounded-md transition-all font-sans hover:brightness-110"
            style={{ background: "linear-gradient(110deg, #06b6d4, #10b981)" }}
          >
            <MessageCircle
              className="w-3.5 h-3.5"
              strokeWidth={2}
            />
            WhatsApp
          </a>
        ) : (
          <div className="flex-1 inline-flex items-center justify-center gap-1.5 text-cyan-200/20 text-[12px] px-3 py-2.5 rounded-md border border-cyan-400/10 font-sans">
            <MessageCircle
              className="w-3.5 h-3.5"
              strokeWidth={1.5}
            />
            No phone
          </div>
        )}

        {gmailUrl ? (
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-white/[0.03] border border-cyan-400/15 text-cyan-200/70 text-[12px] font-medium px-3 py-2.5 rounded-md hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all font-sans"
          >
            <Mail className="w-3.5 h-3.5" />
            Email
          </a>
        ) : (
          <div className="flex-1 inline-flex items-center justify-center gap-1.5 text-cyan-200/20 text-[12px] px-3 py-2.5 rounded-md border border-cyan-400/10 font-sans">
            <Mail
              className="w-3.5 h-3.5"
              strokeWidth={1.5}
            />
            No email
          </div>
        )}
      </div>

      {/* Copy pitch shortcuts */}
      <div className="flex items-center gap-3 mt-3 pt-3 border-t border-cyan-400/[0.07]">
        {lead.emailPitch && (
          <CopyButton
            text={lead.emailPitch}
            label="email pitch"
          />
        )}
        {lead.whatsappPitch && (
          <CopyButton
            text={lead.whatsappPitch}
            label="wa pitch"
          />
        )}
        {lead.date && (
          <span className="ml-auto text-[9.5px] text-cyan-200/25 font-[family-name:var(--font-mono,monospace)]">
            {lead.date}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── Data hook ────────────────────────────────────────────────────────────

function useBadLeads(pin: string, onAuthFailed: () => void) {
  const [leads, setLeads] = useState<BadLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      try {
        const res = await fetch(
          `/api/bad-leads?pin=${encodeURIComponent(pin)}`,
          {
            cache: "no-store",
          },
        );
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
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pin, reloadToken]);

  const refetch = () => {
    setLoading(true);
    setReloadToken((t) => t + 1);
  };

  return { leads, loading, error, refetch };
}

// ─── Filter Select ────────────────────────────────────────────────────────

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
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-300/40 pointer-events-none">
        {icon}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-black/20 border border-cyan-400/15 rounded-md pl-9 pr-8 py-2.5 text-[12px] text-cyan-200/80 outline-none focus:border-emerald-400/40 transition-colors cursor-pointer font-[family-name:var(--font-mono,monospace)]"
      >
        {options.map((opt) => (
          <option
            key={opt}
            value={opt}
            className="bg-[#060d0d] text-cyan-100"
          >
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-cyan-300/40 pointer-events-none" />
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────

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
  } = useBadLeads(pin, onAuthFailed);

  const [search, setSearch] = useState("");
  const [verdictFilter, setVerdictFilter] = useState("All");
  const [recencyFilter, setRecencyFilter] = useState("All");

  const todayCount = useMemo(
    () => leads.filter((l) => groupLabel(l.date) === "Today").length,
    [leads],
  );

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      if (
        search.trim() &&
        !l.businessName.toLowerCase().includes(search.trim().toLowerCase()) &&
        !l.address.toLowerCase().includes(search.trim().toLowerCase())
      )
        return false;
      if (
        verdictFilter !== "All" &&
        l.verdict.toLowerCase() !== verdictFilter.toLowerCase()
      )
        return false;
      if (recencyFilter !== "All" && groupLabel(l.date) !== recencyFilter)
        return false;
      return true;
    });
  }, [leads, search, verdictFilter, recencyFilter]);

  const grouped = useMemo(() => {
    const map = new Map<string, BadLead[]>();
    for (const lead of filtered) {
      const label = groupLabel(lead.date);
      if (!map.has(label)) map.set(label, []);
      map.get(label)!.push(lead);
    }
    return GROUP_ORDER.filter((g) => map.has(g)).map((g) => ({
      label: g,
      leads: map.get(g)!,
    }));
  }, [filtered]);

  const weakCount = leads.filter(
    (l) => l.verdict.toLowerCase() === "weak",
  ).length;

  return (
    <main className="relative min-h-screen bg-[#060d0d] text-[#e8f5f0] antialiased overflow-hidden">
      {/* Ambient glows */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute rounded-full opacity-20"
          style={{
            width: 520,
            height: 520,
            top: -140,
            left: -100,
            filter: "blur(110px)",
            background:
              "radial-gradient(circle, rgba(6,182,212,0.4), transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full opacity-15"
          style={{
            width: 460,
            height: 460,
            top: 240,
            right: -120,
            filter: "blur(110px)",
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)",
          }}
        />
        <div className="bad-grid-overlay" />
      </div>

      <div className="relative z-10 max-w-[1100px] mx-auto px-5 sm:px-8 lg:px-12 py-[clamp(2.5rem,5vw,4rem)]">
        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4 mb-8 pb-6 border-b border-cyan-400/[0.1]">
          <div>
            <div className="flex items-center gap-2 mb-2.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
              </span>
              <span className="text-[10px] text-cyan-300/60 font-medium uppercase tracking-[0.18em] font-[family-name:var(--font-mono,monospace)]">
                Internal · Live
              </span>
            </div>
            <h1 className="text-[clamp(1.5rem,3.5vw,2rem)] font-bold tracking-[-0.03em] leading-[1.1] mb-1.5 font-sans">
              bad leads // console
            </h1>
            <p className="text-[12.5px] text-cyan-200/40 font-[family-name:var(--font-mono,monospace)]">
              {leads.length} total
              {weakCount > 0 && (
                <span className="text-cyan-400/70"> · {weakCount} weak</span>
              )}
              {todayCount > 0 && (
                <span className="text-emerald-400/80">
                  {" "}
                  · {todayCount} added today
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/dashboard"
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-cyan-400/15 text-cyan-200/50 text-[12px] font-medium px-4 py-2.5 rounded-lg hover:bg-white/[0.06] transition-all font-sans"
            >
              ← Main leads
            </a>
            <button
              onClick={refetch}
              disabled={loading}
              className="inline-flex items-center gap-2 bg-white/[0.03] border border-cyan-400/15 text-cyan-200/70 text-[12px] font-medium px-4 py-2.5 rounded-lg hover:bg-white/[0.06] hover:border-cyan-400/30 transition-all disabled:opacity-50 font-sans"
            >
              <RefreshCcw
                className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats bar */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { label: "Total leads", value: leads.length, color: "#06b6d4" },
            { label: "Weak verdict", value: weakCount, color: "#ef4444" },
            { label: "Added today", value: todayCount, color: "#10b981" },
          ].map(({ label, value, color }) => (
            <div
              key={label}
              className="rounded-lg border border-cyan-400/[0.08] bg-white/[0.015] px-4 py-3"
            >
              <p className="text-[10px] text-cyan-200/40 uppercase tracking-wide font-[family-name:var(--font-mono,monospace)] mb-1">
                {label}
              </p>
              <p
                className="text-[22px] font-bold font-sans tracking-tight"
                style={{ color }}
              >
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="rounded-lg border border-cyan-400/[0.1] bg-white/[0.015] p-4 mb-8">
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-cyan-300/40" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="search business name or address..."
                className="w-full bg-black/20 border border-cyan-400/15 rounded-md pl-9 pr-3 py-2.5 text-[12.5px] text-cyan-50 placeholder:text-cyan-300/25 outline-none focus:border-emerald-400/40 transition-colors font-[family-name:var(--font-mono,monospace)]"
              />
            </div>

            <FilterSelect
              icon={<CalendarClock className="w-3.5 h-3.5" />}
              value={recencyFilter}
              onChange={setRecencyFilter}
              options={["All", ...GROUP_ORDER]}
            />

            <FilterSelect
              icon={<TrendingDown className="w-3.5 h-3.5" />}
              value={verdictFilter}
              onChange={setVerdictFilter}
              options={["All", "weak", "adequate", "strong"]}
            />
          </div>
        </div>

        {/* States */}
        {loading && (
          <div className="text-center py-20 text-[12.5px] text-cyan-200/40 font-[family-name:var(--font-mono,monospace)]">
            loading bad leads…
          </div>
        )}

        {!loading && errorMsg && (
          <div className="text-center py-20">
            <p className="text-[12.5px] text-red-400 mb-2 font-[family-name:var(--font-mono,monospace)]">
              {errorMsg}
            </p>
            <button
              onClick={refetch}
              className="text-[12px] text-cyan-300 hover:text-cyan-200 transition-colors font-sans"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !errorMsg && filtered.length === 0 && (
          <div className="text-center py-20 text-[12.5px] text-cyan-200/40 font-[family-name:var(--font-mono,monospace)]">
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
                <h2 className="text-[12px] font-semibold text-emerald-400/90 tracking-wide uppercase font-[family-name:var(--font-mono,monospace)]">
                  {group.label}
                </h2>
                <span className="text-[11px] text-cyan-200/30 font-[family-name:var(--font-mono,monospace)]">
                  {group.leads.length}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-400/15 to-transparent" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {group.leads.map((lead) => (
                  <BadLeadCard
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
        .bad-grid-overlay {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(6, 182, 212, 0.035) 1px, transparent 1px),
            linear-gradient(
              90deg,
              rgba(6, 182, 212, 0.035) 1px,
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

// ─── sessionStorage subscription ─────────────────────────────────────────

function subscribeToStorage(callback: () => void) {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
}
function getStoredPin(): string | null {
  return sessionStorage.getItem(PIN_STORAGE_KEY);
}
function getServerPin(): string | null {
  return null;
}

// ─── Page export ──────────────────────────────────────────────────────────

export default function BadLeadsPage() {
  const pin = useSyncExternalStore(
    subscribeToStorage,
    getStoredPin,
    getServerPin,
  );
  const [authError, setAuthError] = useState<string | null>(null);

  function handleUnlock(enteredPin: string) {
    setAuthError(null);
    sessionStorage.setItem(PIN_STORAGE_KEY, enteredPin);
    window.dispatchEvent(new Event("storage"));
  }

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
