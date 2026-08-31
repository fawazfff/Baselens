import Link from "next/link";
import { MobileMenu, ThemeToggle } from "./SiteChrome";
import { ArrowRightIcon } from "./Icons";

function BrandMark() { return <span className="brand-mark" aria-hidden="true"><span className="brand-mark-dot" /><span className="brand-mark-ring"><i /></span><span className="brand-mark-handle" /></span>; }

export function Nav() {
  return <header className="site-header"><div className="shell"><nav className="nav" aria-label="Primary navigation"><Link href="/" className="brand link" aria-label="BaseLens home"><BrandMark /><span>BaseLens</span></Link><div className="navlinks"><Link href="/analyze">Analyze</Link><Link href="/compare">Compare</Link><Link href="/how-it-works">How it works</Link><Link href="/methodology">Methodology</Link></div><div className="nav-tools"><ThemeToggle/><Link href="/analyze" className="nav-action link">Launch agent <ArrowRightIcon size={14}/></Link><MobileMenu/></div></nav></div></header>;
}

export function Footer() {
  return <footer className="footer"><div className="shell footer-inner"><div className="footer-brand"><BrandMark /><b>BaseLens</b></div><p>BaseLens grades available token evidence. It does not predict returns or provide financial advice. Verify critical information before making a decision.</p><nav className="footer-links" aria-label="Footer navigation"><Link href="/analyze">Analyze</Link><Link href="/compare">Compare</Link><Link href="/methodology">Methodology</Link><Link href="/privacy">Privacy</Link></nav></div></footer>;
}
