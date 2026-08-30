import Link from "next/link";

export function Nav() {
  return (
    <div className="shell">
      <nav className="nav" aria-label="Primary navigation">
        <Link href="/" className="brand link" aria-label="BaseLens home">
          <span className="base-dot" aria-hidden="true" />
          BaseLens
        </Link>
        <div className="navlinks">
          <Link href="/compare">Compare</Link>
          <Link href="/how-it-works">How it works</Link>
          <Link href="/methodology">Methodology</Link>
        </div>
        <Link href="/compare" className="btn ghost link">
          Compare tokens
        </Link>
      </nav>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        BaseLens is a research tool, not financial advice. Data can be incomplete
        or delayed, so verify critical information before making a decision.
      </div>
    </footer>
  );
}
