"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUpIcon } from "./Icons";

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  return <div className="mobile-menu-wrap"><button className="mobile-menu-button" aria-expanded={open} aria-controls="mobile-nav" onClick={() => setOpen(!open)}><span/><span/><span/><b className="sr-only">Menu</b></button>{open && <div id="mobile-nav" className="mobile-nav"><Link onClick={() => setOpen(false)} href="/analyze">Analyze</Link><Link onClick={() => setOpen(false)} href="/compare">Compare</Link><Link onClick={() => setOpen(false)} href="/how-it-works">How it works</Link><Link onClick={() => setOpen(false)} href="/methodology">Methodology</Link><Link onClick={() => setOpen(false)} href="/privacy">Privacy</Link></div>}</div>;
}

export function PageUtilities() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => { const update = () => { const max = document.documentElement.scrollHeight - window.innerHeight; setProgress(max > 0 ? (window.scrollY / max) * 100 : 0); setShowTop(window.scrollY > 600); }; update(); window.addEventListener("scroll", update, { passive: true }); window.addEventListener("resize", update); return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", update); }; }, []);
  return <><div className="scroll-progress" aria-hidden="true"><i style={{width:`${progress}%`}}/></div>{showTop && <button className="back-to-top" onClick={() => window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top"><ArrowUpIcon/></button>}</>;
}

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);
  async function copy() { await navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1600); }
  return <button className="copy-button" onClick={copy}>{copied ? "Copied" : label}</button>;
}
