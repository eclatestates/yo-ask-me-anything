import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "@/assets/hero-property.jpg";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-card/90 backdrop-blur-xl shadow-soft" : "bg-transparent"}`}>
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-heading text-sm font-bold text-primary-foreground">L</span>
          </div>
          <span className={`font-heading text-xl font-bold transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground"}`}>
            ListingKit
          </span>
        </div>
        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${scrolled ? "text-foreground" : "text-primary-foreground/80"}`}>
          <a href="#features" className="hover:text-gold transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-gold transition-colors">How It Works</a>
          <a href="#testimonials" className="hover:text-gold transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-gold transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" className={`hidden sm:inline-flex ${scrolled ? "text-foreground" : "text-primary-foreground"}`} onClick={() => navigate("/auth")}>
            Log In
          </Button>
          <Button className="bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold shadow-glow" onClick={() => navigate("/auth")}>
            Start Free Trial
          </Button>
        </div>
      </div>
    </nav>
  );
};

const HeroSection = () => {
  const navigate = useNavigate();
  return (
  <section className="relative min-h-[100vh] flex items-center overflow-hidden">
    <div className="absolute inset-0">
      <img src={heroImg} alt="Luxury property" width={1920} height={1080} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/80 to-navy/40" />
    </div>
    <div className="relative container mx-auto px-6 py-32">
      <div className="max-w-2xl space-y-8 animate-fade-up">
        <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm text-gold backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse" />
          Trusted by 2,400+ top agents
        </div>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] text-primary-foreground">
          Turn Every Listing Into a
          <span className="text-gradient-gold block mt-1">Lead Machine</span>
        </h1>
        <p className="text-lg text-primary-foreground/70 max-w-lg leading-relaxed">
          Beautiful property pages with built-in lead capture, seller reports, and open house tools. Everything agents need to win more listings and close more deals.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Button size="lg" className="bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold text-base px-8 shadow-glow">
            Get Started Free
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 font-medium text-base">
            <Play className="mr-2 h-4 w-4" />
            Watch Demo
          </Button>
        </div>
        <div className="flex items-center gap-6 pt-4">
          {[
            { value: "12K+", label: "Listings Created" },
            { value: "3.2x", label: "More Leads" },
            { value: "98%", label: "Agent Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl font-bold text-gold">{stat.value}</div>
              <div className="text-xs text-primary-foreground/50">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export { Navbar, HeroSection };
