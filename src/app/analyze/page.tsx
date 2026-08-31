import { AnalyzeStartClient } from "@/components/AnalyzeStartClient";

export default function AnalyzeStartPage() {
  return (
    <main className="research-start-page" id="main-content">
      <div className="shell research-start-shell">
        <div className="research-start-kicker">BaseLens Agent</div>
        <AnalyzeStartClient />
        <p className="research-disclaimer">BaseLens grades the available evidence. It does not predict returns or tell you what to buy.</p>
      </div>
    </main>
  );
}
