import { Navbar, HeroSection } from "@/components/HeroSection";
import { FeaturesGrid, ShowcaseSection } from "@/components/FeaturesSection";
import { TestimonialsSection, PricingSection, CTASection, Footer } from "@/components/BottomSections";

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Import Your Listing", desc: "Paste your MLS number or enter details manually. We'll pull photos, descriptions, and specs automatically." },
    { num: "02", title: "Customize & Brand", desc: "Add your branding, choose a template, and enable the tools you need — lead capture, open house, social assets." },
    { num: "03", title: "Launch & Track", desc: "Share your listing page and watch leads roll in. Send automated seller reports with real performance data." },
  ];

  return (
    <section id="how-it-works" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">How It Works</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Live in Under 5 Minutes
          </h2>
          <p className="text-muted-foreground text-lg">No tech skills needed. No learning curve.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={step.num} className="relative text-center space-y-4 group">
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-border" />
              )}
              <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10 text-gold font-heading text-2xl font-bold group-hover:bg-gold group-hover:text-secondary-foreground transition-colors">
                {step.num}
              </div>
              <h3 className="font-heading text-xl font-bold text-foreground">{step.title}</h3>
              <p className="text-muted-foreground leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const LogoBanner = () => (
  <section className="py-12 border-y border-border">
    <div className="container mx-auto px-6">
      <p className="text-center text-sm text-muted-foreground mb-6">Integrates with the tools you already use</p>
      <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
        {["Follow Up Boss", "KVCore", "Zillow", "Realtor.com", "MLS", "Canva"].map((name) => (
          <span key={name} className="font-heading font-semibold text-lg text-foreground">{name}</span>
        ))}
      </div>
    </div>
  </section>
);

const Index = () => (
  <div className="min-h-screen">
    <Navbar />
    <HeroSection />
    <LogoBanner />
    <FeaturesGrid />
    <HowItWorks />
    <ShowcaseSection />
    <TestimonialsSection />
    <PricingSection />
    <CTASection />
    <Footer />
  </div>
);

export default Index;
