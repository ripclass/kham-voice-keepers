
const FundingBreakdownSection = () => {
  return (
    <section className="py-20 px-6 md:px-12">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="font-serif text-3xl md:text-4xl text-ink">Where Your Support Goes</h2>
        <div className="space-y-4 text-lg font-light text-ink/80">
          <p>$500 → Registering KhaM as a U.S. company (via Stripe Atlas)</p>
          <p>$1,200 → Audio gear + archival storage for preserving disappearing voices</p>
          <p>$2,000 → Compute costs for training voice-aware language models</p>
          <p>$1,500 → Paying linguists and native speakers who help refine tone, rhythm, and emotional fidelity</p>
          <p>∞ → My time is unpaid—but not free. Every bit of support helps this move forward.</p>
        </div>
      </div>
    </section>
  );
};

export default FundingBreakdownSection;
