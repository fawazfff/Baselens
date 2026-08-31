import Link from "next/link";

export default function NotFound() {
  return (
    <main className="shell analysis-error-page">
      <div className="analysis-error-card">
        <span>404 · BaseLens</span>
        <h1>This research path does not exist.</h1>
        <p>Start a fresh Base token analysis or return to the BaseLens homepage.</p>
        <div className="product-actions">
          <Link className="product-primary" href="/analyze">Analyze a token <span>→</span></Link>
          <Link className="product-secondary" href="/">Back home</Link>
        </div>
      </div>
    </main>
  );
}
