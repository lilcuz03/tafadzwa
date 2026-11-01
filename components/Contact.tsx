"use client";

import { useRef, useState } from "react";
import Reveal from "./Reveal";

const WHATSAPP_NUMBER = "27813532248";
const EMAIL = "tafadzwachiri03@outlook.com";

const SERVICES = [
  "Mobile app",
  "Website or web app",
  "Backend & API",
  "UI / UX design",
  "Not sure yet",
];
const BUDGETS = [
  "Under R10k",
  "R10k to R30k",
  "R30k to R100k",
  "R100k+",
  "Not sure yet",
];

type Field = "name" | "email" | "service" | "message";
type Errors = Partial<Record<Field, string>>;

const WhatsApp = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.3-1.4A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15.1l-.3-.2-3.1.8.8-3-.2-.3A8.1 8.1 0 0 1 12.04 3.8zM8.6 7.6c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1 2.7c.1.2 1.8 2.8 4.4 3.9 2.2.9 2.6.7 3.1.7.5 0 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.2-.2-.5-.3l-1.6-.8c-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-.8-.4-1.6-.9-2.3-1.6-.5-.6-1-1.3-1.2-1.7-.1-.2 0-.3.1-.4l.4-.4.2-.4c.1-.1 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.5-.4z" />
  </svg>
);

const Check = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7" />
  </svg>
);

// Cursor glow inside the form card (sets CSS variables directly, no state)
const onMove = (e: React.MouseEvent<HTMLElement>) => {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--cx", `${e.clientX - r.left}px`);
  el.style.setProperty("--cy", `${e.clientY - r.top}px`);
};

function validate(d: FormData): Errors {
  const errors: Errors = {};
  const name = String(d.get("name") ?? "").trim();
  const email = String(d.get("email") ?? "").trim();
  const message = String(d.get("message") ?? "").trim();

  if (name.length < 2) errors.name = "Please tell me your name.";
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "That email doesn’t look right.";
  if (!d.get("service"))
    errors.service = "Pick what you need so I can prepare.";
  if (message.length < 10)
    errors.message = "A sentence or two about the project helps a lot.";
  return errors;
}

function buildMessage(d: FormData) {
  const lines = ["Hi taachii, I’d like to start a project.", ""];
  lines.push(`*Name:* ${String(d.get("name")).trim()}`);
  lines.push(`*Needs:* ${String(d.get("service"))}`);
  if (d.get("budget")) lines.push(`*Budget:* ${String(d.get("budget"))}`);
  const email = String(d.get("email") ?? "").trim();
  if (email) lines.push(`*Email:* ${email}`);
  lines.push("", "*About the project:*", String(d.get("message")).trim());
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join("\n"))}`;
}

export default function Contact() {
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sentUrl, setSentUrl] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const found = validate(data);
    setErrors(found);

    const first = (Object.keys(found) as Field[])[0];
    if (first) {
      const target = form.querySelector<HTMLElement>(`[name="${first}"]`);
      target?.focus();
      return;
    }

    const url = buildMessage(data);
    setSentUrl(url);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const clearError = (f: Field) =>
    setErrors((prev) => (prev[f] ? { ...prev, [f]: undefined } : prev));

  return (
    <section
      id="contact"
      className="gutter relative py-[clamp(4rem,10vw,9rem)]"
    >
      <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_1fr] lg:gap-20">
        {/* Left: intro + direct contact */}
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2.5 text-[.8rem] font-medium uppercase tracking-[.18em] t-muted">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--orange)" }}
            />
            Contact
          </p>
          <h2 className="font-display text-[clamp(2.2rem,5.5vw,4.25rem)] font-semibold leading-none tracking-[-0.04em]">
            Let’s build something{" "}
            <span className="grad-text">great together.</span>
          </h2>
          <p className="mt-6 max-w-[42ch] text-[clamp(1rem,1.4vw,1.1rem)] t-muted">
            Tell me a little about your project. The form opens a WhatsApp chat
            with everything filled in, so we can start talking straight away.
          </p>

          <dl className="mt-10 grid gap-0 text-[.95rem]">
            {[
              [
                "WhatsApp",
                "+27 81 353 2248",
                `https://wa.me/${WHATSAPP_NUMBER}`,
              ],
              ["Email", EMAIL, `mailto:${EMAIL}`],
              ["Based in", "Durban, South Africa · Remote", ""],
            ].map(([k, v, href]) => (
              <div
                key={k}
                className="flex items-baseline justify-between gap-6 border-t b-line py-4 last:border-b"
              >
                <dt className="t-muted">{k}</dt>
                <dd className="text-right font-medium">
                  {href ? (
                    <a
                      href={href}
                      className="svc-link inline-flex"
                    >
                      {v}
                    </a>
                  ) : (
                    v
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-[.82rem] t-muted">
            Nothing is sent until you press send inside WhatsApp.
          </p>
        </Reveal>

        {/* Right: form */}
        <Reveal delay={0.1}>
          <div
            className="svc no-lift p-6 md:p-10"
            onMouseMove={onMove}
          >
            {/* Success state */}
            {sentUrl && (
              <div
                className="relative flex flex-col items-start gap-5 py-6"
                role="status"
              >
                <span
                  className="pop grid h-14 w-14 place-items-center rounded-full"
                  style={{ background: "var(--cyan)", color: "#06222b" }}
                >
                  <Check />
                </span>
                <h3 className="font-display text-[clamp(1.6rem,3vw,2.2rem)] font-semibold tracking-[-0.03em]">
                  Almost there.
                </h3>
                <p className="max-w-[44ch] t-muted">
                  WhatsApp should have opened with your message ready. Press
                  send there and I will reply as soon as I can. If nothing
                  opened, use the button below.
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={sentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cta cta-lg"
                  >
                    <WhatsApp /> Open WhatsApp
                  </a>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => setSentUrl(null)}
                  >
                    Edit details
                  </button>
                </div>
              </div>
            )}

            {/* Form (stays mounted so details are kept if the visitor edits) */}
            <form
              ref={formRef}
              onSubmit={onSubmit}
              noValidate
              hidden={!!sentUrl}
              className="relative grid gap-7"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-[.85rem] font-medium"
                  >
                    Your name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    className="input"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "name-err" : undefined}
                    onChange={() => clearError("name")}
                  />
                  {errors.name && (
                    <p
                      id="name-err"
                      className="err"
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[.85rem] font-medium"
                  >
                    Email <span className="t-muted">(optional)</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@company.com"
                    className="input"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-err" : undefined}
                    onChange={() => clearError("email")}
                  />
                  {errors.email && (
                    <p
                      id="email-err"
                      className="err"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-3 text-[.85rem] font-medium">
                  What do you need?
                </legend>
                <div className="flex flex-wrap gap-2">
                  {SERVICES.map((s, i) => (
                    <span
                      key={s}
                      className="relative"
                    >
                      <input
                        id={`service-${i}`}
                        className="chip-input"
                        type="radio"
                        name="service"
                        value={s}
                        onChange={() => clearError("service")}
                      />
                      <label
                        htmlFor={`service-${i}`}
                        className="chip"
                      >
                        {s}
                      </label>
                    </span>
                  ))}
                </div>
                {errors.service && (
                  <p
                    className="err"
                    role="alert"
                  >
                    {errors.service}
                  </p>
                )}
              </fieldset>

              <fieldset className="m-0 border-0 p-0">
                <legend className="mb-3 text-[.85rem] font-medium">
                  Budget <span className="t-muted">(optional)</span>
                </legend>
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b, i) => (
                    <span
                      key={b}
                      className="relative"
                    >
                      <input
                        id={`budget-${i}`}
                        className="chip-input"
                        type="radio"
                        name="budget"
                        value={b}
                      />
                      <label
                        htmlFor={`budget-${i}`}
                        className="chip"
                      >
                        {b}
                      </label>
                    </span>
                  ))}
                </div>
              </fieldset>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-[.85rem] font-medium"
                >
                  Tell me about your project
                </label>
                <textarea
                  id="message"
                  name="message"
                  maxLength={1000}
                  placeholder="What are you building, who is it for, and when do you need it?"
                  className="input"
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? "message-err" : undefined}
                  onChange={() => clearError("message")}
                />
                {errors.message && (
                  <p
                    id="message-err"
                    className="err"
                    role="alert"
                  >
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="cta cta-lg"
                >
                  <WhatsApp /> Send on WhatsApp
                </button>
                <span className="text-[.82rem] t-muted">
                  Opens WhatsApp with your details ready to send.
                </span>
              </div>
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
