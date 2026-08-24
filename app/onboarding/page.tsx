// app/onboarding/page.tsx
"use client";

import { useState, FormEvent } from "react";
import { CheckCircle2, Loader2, ArrowRight, AlertCircle } from "lucide-react";

// Replace with your actual Formspree form ID (from your Formspree dashboard,
// looks like "https://formspree.io/f/xxxxabcd")
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xppaegea";

type Status = "idle" | "submitting" | "success" | "error";

interface FormState {
  // 01 — About your business
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  industry: string;
  businessDescription: string;
  yearsInBusiness: string;
  teamSize: string;
  serviceArea: string;

  // 02 — Online presence
  currentWebsite: string;
  socialLinks: string;
  googleBusinessProfile: string;

  // 03 — The project
  projectGoals: string;
  primaryAction: string;
  targetAudience: string;
  differentiator: string;
  inspirationLinks: string;

  // 04 — Design & branding
  hasLogo: string;
  brandColors: string;
  brandAdjectives: string;
  stylePreferences: string;

  // 05 — Content
  hasContent: string;
  needsCopywriting: string;
  mediaStatus: string;
  testimonials: string;
  productsServices: string;

  // 06 — Functionality
  mustHaveFeatures: string;
  needsEcommerce: string;
  needsBooking: string;
  needsBlog: string;
  needsMultiLanguage: string;

  // 07 — Logistics
  budget: string;
  timeline: string;
  decisionMakers: string;
  preferredContact: string;
  additionalNotes: string;

  company_website: string; // honeypot, kept empty by real users
}

const initialState: FormState = {
  businessName: "",
  contactName: "",
  email: "",
  phone: "",
  industry: "",
  businessDescription: "",
  yearsInBusiness: "",
  teamSize: "",
  serviceArea: "",

  currentWebsite: "",
  socialLinks: "",
  googleBusinessProfile: "",

  projectGoals: "",
  primaryAction: "",
  targetAudience: "",
  differentiator: "",
  inspirationLinks: "",

  hasLogo: "",
  brandColors: "",
  brandAdjectives: "",
  stylePreferences: "",

  hasContent: "",
  needsCopywriting: "",
  mediaStatus: "",
  testimonials: "",
  productsServices: "",

  mustHaveFeatures: "",
  needsEcommerce: "",
  needsBooking: "",
  needsBlog: "",
  needsMultiLanguage: "",

  budget: "",
  timeline: "",
  decisionMakers: "",
  preferredContact: "",
  additionalNotes: "",

  company_website: "",
};

const fieldClass =
  "w-full border-b border-white/10 bg-transparent py-2.5 text-[15px] text-zinc-100 outline-none transition-colors placeholder:text-zinc-600 focus:border-cyan-400";

const selectClass = fieldClass + " appearance-none";

function Field({
  label,
  required,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-baseline justify-between text-[13px] text-zinc-500">
        <span>
          {label}
          {required && <span className="ml-1 text-emerald-400">*</span>}
        </span>
        {hint && <span className="text-zinc-600">{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function SectionHeading({ index, title }: { index: string; title: string }) {
  return (
    <div className="mb-8 flex items-center gap-3">
      <span className="text-xs text-zinc-600">{index}</span>
      <span className="h-px flex-1 bg-white/10" />
      <h2 className="text-sm font-medium text-zinc-300">{title}</h2>
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
  required,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  required?: boolean;
}) {
  return (
    <select
      required={required}
      className={selectClass}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option
        value=""
        className="bg-[#060a0a]"
      >
        Select one
      </option>
      {options.map((opt) => (
        <option
          key={opt}
          value={opt}
          className="bg-[#060a0a]"
        >
          {opt}
        </option>
      ))}
    </select>
  );
}

export default function OnboardingPage() {
  const [form, setForm] = useState<FormState>(initialState);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const { company_website, ...payload } = form;
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          ...payload,
          // Formspree's own honeypot convention
          _gotcha: company_website,
          _subject: `Onboarding: ${form.businessName || "New submission"}`,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        const message =
          data?.errors?.map((e: { message: string }) => e.message).join(", ") ||
          "Something went wrong";
        throw new Error(message);
      }

      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#060a0a] px-6">
        <div className="max-w-sm text-center">
          <CheckCircle2
            className="mx-auto mb-5 h-9 w-9 text-emerald-400"
            strokeWidth={1.5}
          />
          <h1 className="mb-2 text-xl font-medium text-zinc-100">
            You&apos;re all set
          </h1>
          <p className="text-[15px] leading-relaxed text-zinc-500">
            Thanks — I&apos;ve got your details and I&apos;ll be in touch
            shortly to get started on your site.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="mt-8 text-sm text-cyan-400 transition-colors hover:text-cyan-300"
          >
            Submit another response
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#060a0a] px-6 py-24">
      <div className="mx-auto max-w-xl">
        <div className="mb-16">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-zinc-600">
            Client Onboarding
          </p>
          <h1 className="bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-[32px] font-semibold leading-tight text-transparent">
            Let&apos;s get your project started
          </h1>
          <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-500">
            The more detail you give me here, the more I can personalise the
            site to your business from day one. Takes about 5 minutes.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-16"
        >
          {/* honeypot — hidden from real users */}
          <input
            type="text"
            name="company_website"
            value={form.company_website}
            onChange={(e) => update("company_website", e.target.value)}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
          />

          <div>
            <SectionHeading
              index="01"
              title="About your business"
            />
            <div className="space-y-7">
              <Field
                label="Business name"
                required
              >
                <input
                  required
                  className={fieldClass}
                  value={form.businessName}
                  onChange={(e) => update("businessName", e.target.value)}
                  placeholder="e.g. TtFRECH Renovators"
                />
              </Field>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field
                  label="Your name"
                  required
                >
                  <input
                    required
                    className={fieldClass}
                    value={form.contactName}
                    onChange={(e) => update("contactName", e.target.value)}
                  />
                </Field>
                <Field
                  label="Email"
                  required
                >
                  <input
                    required
                    type="email"
                    className={fieldClass}
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Phone">
                  <input
                    className={fieldClass}
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </Field>
                <Field
                  label="Industry"
                  required
                >
                  <input
                    required
                    className={fieldClass}
                    value={form.industry}
                    onChange={(e) => update("industry", e.target.value)}
                    placeholder="e.g. construction, photography"
                  />
                </Field>
              </div>
              <Field
                label="What does your business do?"
                required
                hint="short pitch"
              >
                <textarea
                  required
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.businessDescription}
                  onChange={(e) =>
                    update("businessDescription", e.target.value)
                  }
                  placeholder="As if explaining it to a stranger in one breath"
                />
              </Field>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Years in business">
                  <input
                    className={fieldClass}
                    value={form.yearsInBusiness}
                    onChange={(e) => update("yearsInBusiness", e.target.value)}
                  />
                </Field>
                <Field label="Team size">
                  <input
                    className={fieldClass}
                    value={form.teamSize}
                    onChange={(e) => update("teamSize", e.target.value)}
                    placeholder="e.g. just me, 5 people"
                  />
                </Field>
              </div>
              <Field label="Address / service area">
                <input
                  className={fieldClass}
                  value={form.serviceArea}
                  onChange={(e) => update("serviceArea", e.target.value)}
                  placeholder="e.g. Durban and surrounds, nationwide, online only"
                />
              </Field>
            </div>
          </div>

          <div>
            <SectionHeading
              index="02"
              title="Online presence"
            />
            <div className="space-y-7">
              <Field
                label="Current website"
                hint="if any"
              >
                <input
                  className={fieldClass}
                  value={form.currentWebsite}
                  onChange={(e) => update("currentWebsite", e.target.value)}
                  placeholder="https://"
                />
              </Field>
              <Field
                label="Social media links"
                hint="Instagram, Facebook, TikTok, etc."
              >
                <textarea
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.socialLinks}
                  onChange={(e) => update("socialLinks", e.target.value)}
                />
              </Field>
              <Field
                label="Google Business profile"
                hint="if listed"
              >
                <input
                  className={fieldClass}
                  value={form.googleBusinessProfile}
                  onChange={(e) =>
                    update("googleBusinessProfile", e.target.value)
                  }
                  placeholder="https://"
                />
              </Field>
            </div>
          </div>

          <div>
            <SectionHeading
              index="03"
              title="The project"
            />
            <div className="space-y-7">
              <Field
                label="What should the site achieve?"
                required
              >
                <textarea
                  required
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.projectGoals}
                  onChange={(e) => update("projectGoals", e.target.value)}
                  placeholder="e.g. generate leads, showcase past work, sell products"
                />
              </Field>
              <Field label="What's the one action you want visitors to take?">
                <input
                  className={fieldClass}
                  value={form.primaryAction}
                  onChange={(e) => update("primaryAction", e.target.value)}
                  placeholder="e.g. call for a quote, book online, message on WhatsApp"
                />
              </Field>
              <Field label="Who's the target audience?">
                <input
                  className={fieldClass}
                  value={form.targetAudience}
                  onChange={(e) => update("targetAudience", e.target.value)}
                />
              </Field>
              <Field label="What makes you different from competitors?">
                <textarea
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.differentiator}
                  onChange={(e) => update("differentiator", e.target.value)}
                />
              </Field>
              <Field
                label="Inspiration links"
                hint="competitors or sites you like"
              >
                <input
                  className={fieldClass}
                  value={form.inspirationLinks}
                  onChange={(e) => update("inspirationLinks", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div>
            <SectionHeading
              index="04"
              title="Design & branding"
            />
            <div className="space-y-7">
              <Field
                label="Do you already have a logo/branding?"
                required
              >
                <Select
                  required
                  value={form.hasLogo}
                  onChange={(v) => update("hasLogo", v)}
                  options={[
                    "Yes, ready to send",
                    "Yes, but needs work",
                    "No, need this designed",
                  ]}
                />
              </Field>
              <Field
                label="Brand colours"
                hint="if you have any set"
              >
                <input
                  className={fieldClass}
                  value={form.brandColors}
                  onChange={(e) => update("brandColors", e.target.value)}
                  placeholder="e.g. navy and gold, or hex codes"
                />
              </Field>
              <Field label="Three words for how the brand should feel">
                <input
                  className={fieldClass}
                  value={form.brandAdjectives}
                  onChange={(e) => update("brandAdjectives", e.target.value)}
                  placeholder="e.g. bold, trustworthy, modern"
                />
              </Field>
              <Field label="Any other style preferences?">
                <textarea
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.stylePreferences}
                  onChange={(e) => update("stylePreferences", e.target.value)}
                />
              </Field>
            </div>
          </div>

          <div>
            <SectionHeading
              index="05"
              title="Content"
            />
            <div className="space-y-7">
              <Field
                label="Is your content (text, photos) ready?"
                required
              >
                <Select
                  required
                  value={form.hasContent}
                  onChange={(v) => update("hasContent", v)}
                  options={[
                    "Yes, all ready",
                    "Partly ready",
                    "No, need help with this",
                  ]}
                />
              </Field>
              <Field label="Do you need copywriting help?">
                <Select
                  value={form.needsCopywriting}
                  onChange={(v) => update("needsCopywriting", v)}
                  options={["Yes", "No, I'll write it myself", "Not sure yet"]}
                />
              </Field>
              <Field
                label="Photos and videos"
                hint="what you have available"
              >
                <Select
                  value={form.mediaStatus}
                  onChange={(v) => update("mediaStatus", v)}
                  options={[
                    "I have professional photos/videos",
                    "I have some, but need more",
                    "None yet, need this shot",
                  ]}
                />
              </Field>
              <Field label="Testimonials or reviews to include?">
                <textarea
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.testimonials}
                  onChange={(e) => update("testimonials", e.target.value)}
                  placeholder="Paste a few, or a link to where they live (Google, Facebook, etc.)"
                />
              </Field>
              <Field label="Products or services to list">
                <textarea
                  rows={3}
                  className={fieldClass + " resize-none"}
                  value={form.productsServices}
                  onChange={(e) => update("productsServices", e.target.value)}
                  placeholder="List them out, roughly — I'll help structure it"
                />
              </Field>
            </div>
          </div>

          <div>
            <SectionHeading
              index="06"
              title="Functionality"
            />
            <div className="space-y-7">
              <Field label="Must-have pages or features">
                <textarea
                  rows={2}
                  className={fieldClass + " resize-none"}
                  value={form.mustHaveFeatures}
                  onChange={(e) => update("mustHaveFeatures", e.target.value)}
                  placeholder="e.g. booking form, gallery, blog, WhatsApp button"
                />
              </Field>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Online store / payments?">
                  <Select
                    value={form.needsEcommerce}
                    onChange={(v) => update("needsEcommerce", v)}
                    options={["Yes", "No", "Maybe later"]}
                  />
                </Field>
                <Field label="Booking / appointments?">
                  <Select
                    value={form.needsBooking}
                    onChange={(v) => update("needsBooking", v)}
                    options={["Yes", "No", "Maybe later"]}
                  />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Blog / news section?">
                  <Select
                    value={form.needsBlog}
                    onChange={(v) => update("needsBlog", v)}
                    options={["Yes", "No", "Maybe later"]}
                  />
                </Field>
                <Field label="Multiple languages?">
                  <Select
                    value={form.needsMultiLanguage}
                    onChange={(v) => update("needsMultiLanguage", v)}
                    options={["Yes", "No"]}
                  />
                </Field>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              index="07"
              title="Logistics"
            />
            <div className="space-y-7">
              <div className="grid grid-cols-1 gap-7 sm:grid-cols-2">
                <Field label="Budget range">
                  <input
                    className={fieldClass}
                    value={form.budget}
                    onChange={(e) => update("budget", e.target.value)}
                    placeholder="e.g. R5,000 – R10,000"
                  />
                </Field>
                <Field label="Timeline">
                  <input
                    className={fieldClass}
                    value={form.timeline}
                    onChange={(e) => update("timeline", e.target.value)}
                    placeholder="e.g. within 4 weeks"
                  />
                </Field>
              </div>
              <Field label="Anyone else involved in decisions?">
                <input
                  className={fieldClass}
                  value={form.decisionMakers}
                  onChange={(e) => update("decisionMakers", e.target.value)}
                  placeholder="e.g. business partner, just me"
                />
              </Field>
              <Field label="Preferred way to stay in touch">
                <Select
                  value={form.preferredContact}
                  onChange={(v) => update("preferredContact", v)}
                  options={["Email", "WhatsApp", "Phone call"]}
                />
              </Field>
              <Field label="Anything else I should know?">
                <textarea
                  rows={3}
                  className={fieldClass + " resize-none"}
                  value={form.additionalNotes}
                  onChange={(e) => update("additionalNotes", e.target.value)}
                />
              </Field>
            </div>
          </div>

          {status === "error" && (
            <div className="flex items-center gap-2 text-sm text-red-400">
              <AlertCircle
                className="h-4 w-4 shrink-0"
                strokeWidth={1.5}
              />
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="group flex items-center gap-2 text-[15px] font-medium text-zinc-100 transition-colors hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {status === "submitting" ? (
              <>
                <Loader2
                  className="h-4 w-4 animate-spin"
                  strokeWidth={1.5}
                />
                Sending
              </>
            ) : (
              <>
                Submit onboarding info
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={1.5}
                />
              </>
            )}
          </button>
        </form>
      </div>
    </main>
  );
}
