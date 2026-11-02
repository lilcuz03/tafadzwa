"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";

// Real pages only. Add Services and About here once they have their own pages.
const LINKS = [
  { href: "/", label: "Home" },
  { href: "/Projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  // { href: "/Craft", label: "Craft" },
];

const LOGO = "taachii".split("");

const isActive = (href: string, pathname: string) => {
  const p = pathname.toLowerCase();
  const h = href.toLowerCase();
  return h === "/" ? p === "/" : p === h || p.startsWith(`${h}/`);
};

const Arrow = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  const navRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const pillRef = useRef<HTMLSpanElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const lastY = useRef(0);
  const openRef = useRef(false);

  // Scroll: blur state, progress bar, hide on scroll down / show on scroll up
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 8);
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${max > 0 ? Math.min(y / max, 1) : 0})`;
      setHidden(!openRef.current && y > lastY.current && y > 180);
      lastY.current = y;
    };
    // Initial check runs in a frame callback, so no setState happens synchronously in the effect
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  // Mobile menu: lock scroll, Escape to close, auto-close on desktop widths
  useEffect(() => {
    openRef.current = open;
    document.body.style.overflow = open ? "hidden" : "";

    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const mq = window.matchMedia("(min-width:880px)");
    const onMq = (e: MediaQueryListEvent) => e.matches && setOpen(false);
    document.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
      document.body.style.overflow = "";
    };
  }, [open]);

  // The nav pill rests on the current page and follows the cursor on hover
  const restPill = useCallback(() => {
    const pill = pillRef.current;
    if (!pill) return;
    const active = navRef.current?.querySelector<HTMLAnchorElement>(
      'a[aria-current="page"]',
    );
    if (!active) {
      pill.style.opacity = "0";
      return;
    }
    pill.style.opacity = "1";
    pill.style.width = `${active.offsetWidth}px`;
    pill.style.transform = `translateX(${active.offsetLeft}px)`;
  }, []);

  useEffect(() => {
    restPill();
    window.addEventListener("resize", restPill);
    return () => window.removeEventListener("resize", restPill);
  }, [pathname, restPill]);

  const movePill = (e: React.SyntheticEvent<HTMLAnchorElement>) => {
    const a = e.currentTarget;
    const p = pillRef.current;
    if (!p) return;
    p.style.opacity = "1";
    p.style.width = `${a.offsetWidth}px`;
    p.style.transform = `translateX(${a.offsetLeft}px)`;
  };

  const onCtaMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ctaRef.current;
    if (!el) return;
    const q = el.getBoundingClientRect();
    el.style.setProperty(
      "--mx",
      `${(e.clientX - q.left - q.width / 2) * 0.25}px`,
    );
    el.style.setProperty(
      "--my",
      `${(e.clientY - q.top - q.height / 2) * 0.35}px`,
    );
  };
  const onCtaLeave = () => {
    ctaRef.current?.style.setProperty("--mx", "0px");
    ctaRef.current?.style.setProperty("--my", "0px");
  };

  const toggleTheme = () => {
    const root = document.documentElement;
    const t = root.dataset.theme;
    const dark =
      t === "dark" ||
      (!t && window.matchMedia("(prefers-color-scheme:dark)").matches);
    const next = dark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("taachii-theme", next);
    } catch {}
  };

  return (
    <>
      <header
        id="top"
        className={`${styles.header} ${scrolled ? styles.scrolled : ""} ${hidden && !open ? styles.hide : ""}`}
      >
        <Link
          href="/"
          className={styles.logo}
          aria-label="taachii home"
        >
          {LOGO.map((c, i) => (
            <span
              key={i}
              className={styles.ch}
              style={{ "--i": i } as React.CSSProperties}
              aria-hidden="true"
            >
              {c}
            </span>
          ))}
          <span
            className={styles.dot}
            aria-hidden="true"
          >
            .
          </span>
        </Link>

        <nav
          ref={navRef}
          className={styles.nav}
          aria-label="Primary"
          onMouseLeave={restPill}
        >
          <span
            ref={pillRef}
            className={styles.pill}
            aria-hidden="true"
          />
          <ul>
            {LINKS.map((l, i) => (
              <li
                key={l.href}
                style={{ "--i": i } as React.CSSProperties}
              >
                <Link
                  href={l.href}
                  aria-current={isActive(l.href, pathname) ? "page" : undefined}
                  onMouseEnter={movePill}
                  onFocus={movePill}
                  onBlur={restPill}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            className={`${styles.iconBtn} ${styles.themeBtn}`}
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle light and dark theme"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="9"
              />
              <path
                d="M12 3a9 9 0 0 0 0 18z"
                fill="currentColor"
              />
            </svg>
          </button>

          <Link
            ref={ctaRef}
            className="cta"
            href="/#contact"
            onMouseMove={onCtaMove}
            onMouseLeave={onCtaLeave}
          >
            Start a project <Arrow />
          </Link>

          <button
            className={`${styles.iconBtn} ${styles.burger}`}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>

        <div
          ref={barRef}
          className={styles.progress}
          aria-hidden="true"
        />
      </header>

      <div
        id="mobile-menu"
        className={`${styles.panel} ${open ? styles.open : ""}`}
        aria-hidden={!open}
        onClick={(e) =>
          (e.target as HTMLElement).closest("a") && setOpen(false)
        }
      >
        {LINKS.map((l, i) => (
          <Link
            key={l.href}
            className={styles.link}
            href={l.href}
            aria-current={isActive(l.href, pathname) ? "page" : undefined}
          >
            <span className={styles.n}>{String(i + 1).padStart(2, "0")}</span>
            {l.label}
          </Link>
        ))}
        <Link
          className="cta"
          href="/#contact"
        >
          Start a project
        </Link>
        <div className={styles.meta}>
          <span>Let’s talk</span>
          <a href="mailto:tafadzwachiri03@outlook.com">
            tafadzwachiri03@outlook.com
          </a>
          <a href="https://wa.me/27813532248">WhatsApp +27 81 353 2248</a>
        </div>
      </div>
    </>
  );
}
