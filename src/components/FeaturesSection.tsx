import dashboardImg from "@/assets/dashboard-preview.jpg";
import mobileImg from "@/assets/mobile-listing.jpg";
import openHouseImg from "@/assets/open-house.jpg";
import { BarChart3, Users, FileText, Smartphone, Zap, ClipboardList } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Smart Lead Capture",
    description: "Every visitor becomes a potential client. Capture leads with elegant forms that sync directly to your CRM — Follow Up Boss, KVCore, and more.",
    tag: "Lead Generation",
  },
  {
    icon: BarChart3,
    title: "Seller Reporting",
    description: "Auto-generate weekly PDF reports with page views, lead count, and engagement data. Prove your marketing value and keep your listings.",
    tag: "Analytics",
  },
  {
    icon: ClipboardList,
    title: "Digital Open House Sign-In",
    description: "Replace paper sign-in sheets with a sleek digital experience. Capture visitor info that feeds directly into your pipeline.",
    tag: "Open House",
  },
  {
    icon: Smartphone,
    title: "Social-Ready Assets",
    description: "Auto-generate Instagram stories, Facebook ads, and print-ready flyers from your listing data. Save hours of Canva work every week.",
    tag: "Marketing",
  },
  {
    icon: Zap,
    title: "MLS Auto-Import",
    description: "Paste an MLS number and watch everything populate automatically. No manual data entry — ever.",
    tag: "Automation",
  },
  {
    icon: FileText,
    title: "Branded Property Pages",
    description: "Stunning, mobile-first property pages with your branding, virtual tours, and neighborhood data that impress sellers and attract buyers.",
    tag: "Pages",
  },
];

const FeaturesGrid = () => (
  <section id="features" className="py-24 bg-surface-warm">
    <div className="container mx-auto px-6">
      <div className="text-center max-w-2xl mx-auto mb-16 animate-fade-up">
        <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider mb-3">
          Everything You Need
        </span>
        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Not Just a Page — A Complete Listing Marketing System
        </h2>
        <p className="text-muted-foreground text-lg">
          Tools that fit into how agents actually work. Every feature is designed to save time and generate leads.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, i) => (
          <div
            key={feature.title}
            className="group relative bg-card rounded-2xl p-8 shadow-soft hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 text-gold group-hover:bg-gold group-hover:text-secondary-foreground transition-colors">
                <feature.icon className="h-5 w-5" />
              </div>
              <span className="text-xs font-semibold uppercase tracking-wider text-gold">{feature.tag}</span>
            </div>
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const ShowcaseSection = () => (
  <section className="py-24">
    <div className="container mx-auto px-6 space-y-24">
      {/* Dashboard showcase */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider">Seller Reports</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Prove Your Value With Data Sellers Can See
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Auto-generated weekly reports show sellers exactly how their listing is performing. Page views, lead activity, engagement metrics — all branded with your info.
          </p>
          <ul className="space-y-3">
            {["Weekly PDF reports sent automatically", "Page views, unique visitors & lead count", "Compare performance across listings", "Your branding on every report"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={dashboardImg} alt="Analytics dashboard" loading="lazy" width={1024} height={1024} className="w-full" />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-card rounded-xl p-4 shadow-elevated hidden lg:block">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-gold/15 flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-gold" />
              </div>
              <div>
                <div className="text-sm font-bold text-foreground">+247%</div>
                <div className="text-xs text-muted-foreground">More engagement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile showcase */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1 relative">
          <div className="rounded-2xl overflow-hidden shadow-elevated max-w-md mx-auto">
            <img src={mobileImg} alt="Mobile property listing" loading="lazy" width={1024} height={1024} className="w-full" />
          </div>
        </div>
        <div className="order-1 lg:order-2 space-y-6">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider">Mobile First</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Beautiful On Every Device
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            85% of homebuyers search on their phone first. Your property pages look stunning on every screen size — no extra work required.
          </p>
          <ul className="space-y-3">
            {["Responsive design out of the box", "Fast loading, optimized images", "Touch-friendly virtual tours", "One-tap lead capture forms"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Open house showcase */}
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <span className="inline-block text-sm font-semibold text-gold uppercase tracking-wider">Open House</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
            Digital Sign-In That Actually Works
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Ditch the clipboard. Visitors sign in on a tablet or their own phone, and their info goes straight to your CRM. Follow up within minutes, not days.
          </p>
          <ul className="space-y-3">
            {["QR code or tablet sign-in", "Auto-sync to your CRM", "Instant follow-up triggers", "Track attendance across events"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-foreground">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold/15 text-gold text-xs">✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <div className="rounded-2xl overflow-hidden shadow-elevated">
            <img src={openHouseImg} alt="Open house event" loading="lazy" width={1024} height={1024} className="w-full" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

export { FeaturesGrid, ShowcaseSection };
