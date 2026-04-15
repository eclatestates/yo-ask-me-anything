import agentImg from "@/assets/agent-testimonial.jpg";
import { Star, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Luxury Agent, Compass",
    image: agentImg,
    quote: "ListingKit changed the game for me. My sellers love getting weekly reports, and I've generated 3x more leads from my property pages. It's not a nice-to-have anymore — it's essential.",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    role: "Team Lead, eXp Realty",
    image: null,
    quote: "The MLS auto-import alone saves my team 4 hours per listing. Add the social media assets and we've cut our marketing time in half.",
    rating: 5,
  },
  {
    name: "Jessica Torres",
    role: "Broker, RE/MAX Elite",
    image: null,
    quote: "I won 3 listing presentations last month by showing sellers the analytics dashboard. They could see exactly how I'd market their home differently.",
    rating: 5,
  },
];

const TestimonialsSection = () => (
  <section id="testimonials" className="py-24 bg-surface-warm">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">Testimonials</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Agents Who Closed More Deals
        </h2>
        <p className="text-muted-foreground text-lg">
          Join thousands of top-performing agents who turned their listings into lead-generating machines.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={t.name} className={`bg-card rounded-2xl p-8 shadow-soft ${i === 0 ? "md:row-span-1 border-2 border-gold/20" : ""}`}>
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.rating }).map((_, j) => (
                <Star key={j} className="h-4 w-4 fill-gold text-gold" />
              ))}
            </div>
            <p className="text-foreground leading-relaxed mb-6 italic">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              {t.image ? (
                <img src={t.image} alt={t.name} loading="lazy" width={40} height={40} className="h-10 w-10 rounded-full object-cover" />
              ) : (
                <div className="h-10 w-10 rounded-full bg-gold/15 flex items-center justify-center font-heading font-bold text-gold text-sm">
                  {t.name[0]}
                </div>
              )}
              <div>
                <div className="font-heading font-semibold text-foreground text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    description: "Perfect for solo agents getting started",
    features: ["5 active listings", "Lead capture forms", "Basic analytics", "Email support", "Mobile-optimized pages"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$79",
    period: "/mo",
    description: "For agents who want the full marketing system",
    features: ["Unlimited listings", "Seller reports (PDF)", "CRM integrations", "Social media assets", "Open house sign-in", "Priority support", "Custom branding"],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Team",
    price: "$199",
    period: "/mo",
    description: "For teams and brokerages",
    features: ["Everything in Pro", "Up to 10 agents", "Team analytics", "White-label option", "API access", "Dedicated account manager"],
    cta: "Contact Sales",
    popular: false,
  },
];

const PricingSection = () => (
  <section id="pricing" className="py-24">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">Pricing</span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-muted-foreground text-lg">
          Start free for 14 days. No credit card required.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`relative bg-card rounded-2xl p-8 shadow-soft transition-all hover:shadow-elevated hover:-translate-y-1 ${
              plan.popular ? "border-2 border-gold ring-1 ring-gold/20" : "border border-border"
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-secondary-foreground text-xs font-bold uppercase tracking-wider px-4 py-1 rounded-full">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="font-heading text-xl font-bold text-foreground">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
            </div>
            <div className="mb-6">
              <span className="font-heading text-4xl font-bold text-foreground">{plan.price}</span>
              <span className="text-muted-foreground">{plan.period}</span>
            </div>
            <ul className="space-y-3 mb-8">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="h-4 w-4 text-gold flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              className={`w-full font-semibold ${
                plan.popular
                  ? "bg-gold hover:bg-gold/90 text-secondary-foreground shadow-glow"
                  : "bg-primary hover:bg-primary/90 text-primary-foreground"
              }`}
            >
              {plan.cta}
            </Button>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const CTASection = () => (
  <section className="py-24 relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy" />
    <div className="relative container mx-auto px-6 text-center">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground">
          Ready to Win More Listings?
        </h2>
        <p className="text-lg text-primary-foreground/70">
          Join 2,400+ agents already using ListingKit to generate more leads, impress sellers, and close more deals.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold text-base px-8 shadow-glow">
            Start Your Free Trial
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-medium text-base">
            Schedule a Demo
          </Button>
        </div>
        <p className="text-sm text-primary-foreground/40 pt-2">
          14-day free trial · No credit card required · Cancel anytime
        </p>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="py-12 border-t border-border">
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-heading text-sm font-bold text-primary-foreground">L</span>
            </div>
            <span className="font-heading text-xl font-bold text-foreground">ListingKit</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            The complete listing marketing system for modern real estate agents.
          </p>
        </div>
        {[
          { title: "Product", links: ["Features", "Pricing", "Integrations", "API"] },
          { title: "Company", links: ["About", "Blog", "Careers", "Contact"] },
          { title: "Support", links: ["Help Center", "Documentation", "Status", "Privacy"] },
        ].map((col) => (
          <div key={col.title}>
            <h4 className="font-heading font-semibold text-foreground mb-4">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-gold transition-colors">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border mt-12 pt-8 text-center text-sm text-muted-foreground">
        © 2026 ListingKit. All rights reserved.
      </div>
    </div>
  </footer>
);

export { TestimonialsSection, PricingSection, CTASection, Footer };
