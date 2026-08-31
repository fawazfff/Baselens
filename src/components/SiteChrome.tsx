"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const saved = localStorage.getItem("baselens-theme");
    const next = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light";
  }, []);
  function toggle() { const next = !dark; setDark(next); document.documentElement.dataset.theme = next ? "dark" : "light"; localStorage.setItem("baselens-theme", next ? "dark" : "light"); }
  return <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`} title={`Switch to ${dark ? "light" : "dark"} mode`}><span aria-hidden="true">{dark ? "☀" : "◐"}</span></button>;
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu-wrap"><button className="mobile-menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><span/><span/><span/><b className="sr-only">Menu</b></button>{open && <div id="mobile-nav" className="mobile-nav"><Link onClick={() => setOpen(false)} href="/analyze">Analyze</Link><Link onClick={() => setOpen(false)} href="/compare">Compare</Link><Link onClick={() => setOpen(false)} href="/how-it-works">How it works</Link><Link onClick={() => setOpen(false)} href="/methodology">Methodology</Link></div>}</div>;
}

export function PageUtilities() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => { const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? (window.scrollY / max) * 100 : 0); setShowTop(window.scrollY > 600); }; update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); }; }, []);
  return <><div className="scroll-progress" aria-hidden="true"><i style={{width:`${progress}%`}}/></div>{showTop && <button className="back-to-top" onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">↑</button>}</>;
}

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1600); }
  return <button className="copy-button" onClick={copy}>{copied ? "Copied" : label}</button>;
}
