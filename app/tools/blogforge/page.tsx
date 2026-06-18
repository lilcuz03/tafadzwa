"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Copy,
  Download,
  RefreshCw,
  Check,
  Loader2,
  X,
  Plus,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormState {
  brand: string;
  topic: string;
  audience: string;
  points: string;
  tone: string;
  format: string;
  words: number;
  language: string;
  keywords: string[];
}

const TONES = [
  "Professional",
  "Friendly",
  "Casual",
  "Authoritative",
  "Conversational",
];

const FORMATS = [
  {
    value: "structured with headings and subheadings",
    label: "Headings + Subheadings",
  },
  { value: "listicle with numbered points", label: "Listicle (Numbered)" },
  {
    value: "how-to guide with step-by-step instructions",
    label: "How-To Guide",
  },
  {
    value: "opinion piece with a clear argument",
    label: "Opinion / Thought Leadership",
  },
  { value: "FAQ format", label: "FAQ Format" },
];

const LANGUAGES = [
  "English",
  "South African English",
  "British English",
  "American English",
];

const PROGRESS_MESSAGES = [
  "Analysing your brief...",
  "Crafting the structure...",
  "Writing the content...",
  "Adding SEO optimisation...",
  "Polishing the final draft...",
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogForgePage() {
  const [form, setForm] = useState<FormState>({
    brand: "",
    topic: "",
    audience: "",
    points: "",
    tone: "Professional",
    format: "structured with headings and subheadings",
    words: 800,
    language: "English",
    keywords: [],
  });

  const [kwInput, setKwInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressMsg, setProgressMsg] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [genTime, setGenTime] = useState(0);
  const progressRef = useRef<NodeJS.Timeout | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // ── Helpers ────────────────────────────────────────────────────────────────

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function addKeyword(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && kwInput.trim()) {
      e.preventDefault();
      const kw = kwInput.trim();
      if (!form.keywords.includes(kw)) {
        setField("keywords", [...form.keywords, kw]);
      }
      setKwInput("");
    }
  }

  function removeKeyword(i: number) {
    setField(
      "keywords",
      form.keywords.filter((_, idx) => idx !== i),
    );
  }

  function startProgress() {
    setProgress(0);
    setProgressMsg(PROGRESS_MESSAGES[0]);
    let pct = 0;
    let step = 0;
    progressRef.current = setInterval(() => {
      pct = Math.min(pct + Math.random() * 7, 90);
      setProgress(pct);
      if (step < PROGRESS_MESSAGES.length - 1 && pct > (step + 1) * 18) {
        step++;
        setProgressMsg(PROGRESS_MESSAGES[step]);
      }
    }, 400);
  }

  function endProgress() {
    if (progressRef.current) clearInterval(progressRef.current);
    setProgress(100);
  }

  // ── Generate ───────────────────────────────────────────────────────────────

  async function generate() {
    if (!form.topic.trim()) {
      setError("Please enter a blog topic.");
      return;
    }
    setError("");
    setOutput("");
    setLoading(true);
    startProgress();
    const start = Date.now();

    try {
      const res = await fetch("/api/generate-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, tone: form.tone.toLowerCase() }),
      });
      const data = await res.json();
      endProgress();

      if (!res.ok || data.error) {
        setError(data.error || "Something went wrong. Try again.");
        return;
      }

      setOutput(data.content);
      setGenTime(parseFloat(((Date.now() - start) / 1000).toFixed(1)));
      setTimeout(
        () =>
          outputRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          }),
        100,
      );
    } catch {
      endProgress();
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  async function copyPost() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function downloadPost() {
    const slug = form.topic
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .slice(0, 50);
    const blob = new Blob([output], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = slug + ".txt";
    a.click();
  }

  const wordCount = output ? output.split(/\s+/).filter(Boolean).length : 0;
  const readMins = Math.ceil(wordCount / 200);

  // ─── Render ───────────────────────────────────────────────────────────────

  return (
    <main className="relative min-h-screen bg-[#060a0a] text-[#f0fdfa] antialiased overflow-hidden">
      {/* Aurora */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-cyan-400/[0.06] blur-[100px] animate-[drift1_18s_ease-in-out_infinite]" />
        <div className="absolute top-[40%] -left-40 w-[400px] h-[400px] rounded-full bg-emerald-400/[0.05] blur-[100px] animate-[drift2_22s_ease-in-out_infinite]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black_40%,transparent)]" />
      </div>

      <div className="relative z-10 max-w-[800px] mx-auto px-5 sm:px-8 lg:px-12 pb-24">
        {/* ── Header ── */}
        <section className="pt-[clamp(5rem,9vw,7rem)] pb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[13px] text-slate-500 hover:text-slate-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back home
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400/20 to-emerald-400/20 border border-cyan-400/20 flex items-center justify-center">
              <Sparkles
                className="w-5 h-5 text-cyan-300"
                strokeWidth={1.8}
              />
            </div>
            <span className="text-[10.5px] font-semibold text-cyan-400/80 uppercase tracking-[0.12em]">
              AI Tool
            </span>
          </div>

          <h1 className="text-[clamp(2rem,6vw,3rem)] font-bold tracking-[-0.04em] leading-[1.06] mb-3">
            Blog
            <span
              style={{
                background: "linear-gradient(110deg,#22d3ee,#4ade80)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Forge
            </span>
          </h1>
          <p className="text-[clamp(0.9rem,2vw,1rem)] text-slate-400 max-w-[500px] leading-[1.75] font-light">
            Generate SEO-optimised blog posts in seconds. Fill in the details
            below and let AI handle the writing.
          </p>
        </section>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-8" />

        {/* ── Form ── */}
        <div className="space-y-4">
          {/* Article details */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[10.5px] font-semibold text-cyan-400/80 uppercase tracking-[0.12em] mb-5">
              Article Details
            </p>
            <div className="space-y-4">
              <Field label="Business / Brand Name">
                <input
                  type="text"
                  value={form.brand}
                  onChange={(e) => setField("brand", e.target.value)}
                  placeholder="e.g. BrightFix Appliance Repair"
                  className={inputCls}
                />
              </Field>
              <Field label="Blog Topic or Title *">
                <input
                  type="text"
                  value={form.topic}
                  onChange={(e) => setField("topic", e.target.value)}
                  placeholder="e.g. 5 Signs Your Washing Machine Needs Servicing"
                  className={inputCls}
                />
              </Field>
              <Field label="Target Audience">
                <input
                  type="text"
                  value={form.audience}
                  onChange={(e) => setField("audience", e.target.value)}
                  placeholder="e.g. South African homeowners, small business owners"
                  className={inputCls}
                />
              </Field>
              <Field label="Specific Points to Cover (optional)">
                <textarea
                  value={form.points}
                  onChange={(e) => setField("points", e.target.value)}
                  placeholder="e.g. Include cost savings, mention 24hr service, add WhatsApp CTA at the end"
                  rows={3}
                  className={`${inputCls} resize-none`}
                />
              </Field>
            </div>
          </div>

          {/* Style & format */}
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8">
            <p className="text-[10.5px] font-semibold text-cyan-400/80 uppercase tracking-[0.12em] mb-5">
              Style & Format
            </p>
            <div className="space-y-5">
              {/* Tone pills */}
              <Field label="Tone of Voice">
                <div className="flex flex-wrap gap-2 mt-1">
                  {TONES.map((t) => (
                    <button
                      key={t}
                      onClick={() => setField("tone", t)}
                      className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-medium border transition-all duration-200 ${
                        form.tone === t
                          ? "bg-cyan-400/10 border-cyan-400/50 text-cyan-300"
                          : "border-white/[0.08] text-slate-500 hover:border-white/20 hover:text-slate-300"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>

              {/* Word count */}
              <Field label={`Word Count — ${form.words} words`}>
                <div className="flex items-center gap-4 mt-1">
                  <input
                    type="range"
                    min={300}
                    max={2000}
                    step={100}
                    value={form.words}
                    onChange={(e) => setField("words", Number(e.target.value))}
                    className="flex-1 accent-cyan-400 h-1 cursor-pointer"
                  />
                  <span className="text-[13px] font-semibold text-cyan-300 min-w-[48px] text-right">
                    {form.words}
                  </span>
                </div>
              </Field>

              {/* Format + Language */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field label="Format">
                  <select
                    value={form.format}
                    onChange={(e) => setField("format", e.target.value)}
                    className={selectCls}
                  >
                    {FORMATS.map((f) => (
                      <option
                        key={f.value}
                        value={f.value}
                      >
                        {f.label}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Language">
                  <select
                    value={form.language}
                    onChange={(e) => setField("language", e.target.value)}
                    className={selectCls}
                  >
                    {LANGUAGES.map((l) => (
                      <option
                        key={l}
                        value={l}
                      >
                        {l}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              {/* Keywords */}
              <Field label="SEO Keywords — press Enter to add">
                <input
                  type="text"
                  value={kwInput}
                  onChange={(e) => setKwInput(e.target.value)}
                  onKeyDown={addKeyword}
                  placeholder="Type a keyword and press Enter"
                  className={inputCls}
                />
                {form.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {form.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 bg-cyan-400/10 border border-cyan-400/20 rounded-full px-3 py-1 text-[12px] text-cyan-300"
                      >
                        {kw}
                        <button
                          onClick={() => removeKeyword(i)}
                          className="text-cyan-400/50 hover:text-white transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </Field>
            </div>
          </div>

          {/* Generate button */}
          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-[13.5px] text-[#060a0a] flex items-center justify-center gap-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: "linear-gradient(110deg,#22d3ee,#4ade80)",
              backgroundSize: "200% auto",
            }}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles
                  className="w-4 h-4"
                  strokeWidth={2}
                />
                Generate Blog Post
              </>
            )}
          </button>

          {/* Progress bar */}
          {loading && (
            <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
              <p className="text-[12px] text-slate-500 mb-2">{progressMsg}</p>
              <div className="h-1 bg-white/[0.06] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg,#22d3ee,#4ade80)",
                  }}
                />
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-xl bg-rose-400/[0.08] border border-rose-400/20 p-4 text-[13px] text-rose-300">
              ⚠️ {error}
            </div>
          )}

          {/* Output */}
          {output && (
            <div
              ref={outputRef}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-8"
            >
              {/* Output header */}
              <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
                <p className="text-[10.5px] font-semibold text-cyan-400/80 uppercase tracking-[0.12em]">
                  Generated Blog Post
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={copyPost}
                    className={actionBtn}
                  >
                    {copied ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copied ? "Copied!" : "Copy"}</span>
                  </button>
                  <button
                    onClick={downloadPost}
                    className={actionBtn}
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                  <button
                    onClick={generate}
                    disabled={loading}
                    className={actionBtn}
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Regenerate</span>
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="bg-black/20 border border-white/[0.04] rounded-xl p-5 text-[13.5px] text-slate-400 leading-[1.85] whitespace-pre-wrap max-h-[600px] overflow-y-auto font-light">
                {output}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-x-6 gap-y-1 mt-4 pt-4 border-t border-white/[0.04]">
                {[
                  ["Words", wordCount.toLocaleString()],
                  ["Characters", output.length.toLocaleString()],
                  ["Read time", `${readMins} min`],
                  ["Generated in", `${genTime}s`],
                ].map(([label, val]) => (
                  <div
                    key={label}
                    className="text-[12px] text-slate-500"
                  >
                    {label}:{" "}
                    <span className="text-cyan-300 font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-6 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
          <p className="text-[12px] text-slate-600">
            Built by <span className="text-cyan-400">Tafadzwa Chiri</span> ·
            tafadzwa.site
          </p>
          <p className="text-[11px] text-slate-600">
            Powered by Groq LLaMA · Review content before publishing
          </p>
        </div>
      </div>

      <style
        jsx
        global
      >{`
        @keyframes drift1 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(60px, 40px) scale(1.15);
          }
        }
        @keyframes drift2 {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
          }
          50% {
            transform: translate(-50px, 60px) scale(1.1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          [class*="animate-"] {
            animation: none !important;
          }
        }
      `}</style>
    </main>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-[12px] font-semibold text-slate-500 mb-1.5 tracking-wide">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full bg-black/30 border border-white/[0.06] rounded-xl text-[13.5px] text-[#f0fdfa] placeholder:text-slate-600 px-3.5 py-2.5 outline-none focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/[0.06] transition-all font-light";

const selectCls =
  "w-full bg-black/30 border border-white/[0.06] rounded-xl text-[13.5px] text-[#f0fdfa] px-3.5 py-2.5 outline-none focus:border-cyan-400/30 focus:ring-2 focus:ring-cyan-400/[0.06] transition-all appearance-none cursor-pointer font-light";

const actionBtn =
  "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-slate-400 text-[12px] font-medium hover:text-white hover:border-white/20 transition-all";
