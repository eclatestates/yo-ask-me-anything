import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Download, Eye, Sparkles } from "lucide-react";
import { buildPresentationHTML, type PresentationData } from "@/lib/presentationTemplate";
import { toast } from "@/hooks/use-toast";

const DEFAULT_DATA: PresentationData = {
  title: "The Hillcrest Residence",
  price: "$4,250,000",
  location: "Beverly Hills, CA",
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=80",
  gallery: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&q=80",
    "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80",
  ],
  description:
    "A masterwork of contemporary architecture nestled in the hills.\nFloor-to-ceiling glass frames panoramic city views from every principal room.",
  sellingPoints: [
    "5 bedrooms, 6 bathrooms",
    "Infinity-edge pool overlooking the city",
    "Custom Italian kitchen with Gaggenau appliances",
    "Smart home automation throughout",
  ],
  agentName: "Sophia Laurent",
  agentTagline: "Private Property Consultant",
  agentLogoUrl: "",
  whatsappNumber: "+1 555 123 4567",
  whatsappMessage: "",
  accentColor: "#c9a84c",
};

export default function Generator() {
  const [data, setData] = useState<PresentationData>(DEFAULT_DATA);
  const [galleryRaw, setGalleryRaw] = useState(DEFAULT_DATA.gallery.join("\n"));
  const [pointsRaw, setPointsRaw] = useState(DEFAULT_DATA.sellingPoints.join("\n"));

  const html = useMemo(
    () =>
      buildPresentationHTML({
        ...data,
        gallery: galleryRaw.split("\n").map(s => s.trim()).filter(Boolean),
        sellingPoints: pointsRaw.split("\n").map(s => s.trim()).filter(Boolean),
      }),
    [data, galleryRaw, pointsRaw]
  );

  const update = <K extends keyof PresentationData>(k: K, v: PresentationData[K]) =>
    setData(d => ({ ...d, [k]: v }));

  const handlePreview = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  };

  const handleDownload = () => {
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "listing";
    a.download = `${slug}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "Upload index.html to GitHub Pages, Netlify, or any static host." });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur sticky top-0 z-30">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4" /> Back
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-gold" />
            <h1 className="font-heading font-bold text-foreground">Premium Listing Generator</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePreview}>
              <Eye className="h-4 w-4 mr-2" /> Preview
            </Button>
            <Button size="sm" onClick={handleDownload} className="bg-gold hover:bg-gold/90 text-secondary-foreground">
              <Download className="h-4 w-4 mr-2" /> Download HTML
            </Button>
          </div>
        </div>
      </header>

      <div className="grid lg:grid-cols-[420px_1fr] min-h-[calc(100vh-65px)]">
        {/* Form */}
        <aside className="border-r border-border bg-card overflow-y-auto p-6 space-y-6">
          <Section title="Property">
            <Field label="Title">
              <Input value={data.title} onChange={e => update("title", e.target.value)} maxLength={120} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price">
                <Input value={data.price} onChange={e => update("price", e.target.value)} maxLength={40} />
              </Field>
              <Field label="Location">
                <Input value={data.location} onChange={e => update("location", e.target.value)} maxLength={80} />
              </Field>
            </div>
            <Field label="Hero image URL">
              <Input value={data.heroImage} onChange={e => update("heroImage", e.target.value)} placeholder="https://..." />
            </Field>
            <Field label="Description (one paragraph per line)">
              <Textarea rows={4} value={data.description} onChange={e => update("description", e.target.value)} maxLength={2000} />
            </Field>
            <Field label="Key selling points (one per line)">
              <Textarea rows={5} value={pointsRaw} onChange={e => setPointsRaw(e.target.value)} maxLength={1000} />
            </Field>
            <Field label="Gallery image URLs (one per line)">
              <Textarea rows={5} value={galleryRaw} onChange={e => setGalleryRaw(e.target.value)} maxLength={2000} />
            </Field>
          </Section>

          <Section title="Agent branding">
            <Field label="Name">
              <Input value={data.agentName} onChange={e => update("agentName", e.target.value)} maxLength={80} />
            </Field>
            <Field label="Tagline">
              <Input value={data.agentTagline} onChange={e => update("agentTagline", e.target.value)} maxLength={80} />
            </Field>
            <Field label="Logo URL (optional)">
              <Input value={data.agentLogoUrl} onChange={e => update("agentLogoUrl", e.target.value)} placeholder="https://..." />
            </Field>
            <Field label="WhatsApp number (with country code)">
              <Input value={data.whatsappNumber} onChange={e => update("whatsappNumber", e.target.value)} placeholder="+1 555 123 4567" maxLength={20} />
            </Field>
            <Field label="WhatsApp prefilled message (optional)">
              <Input value={data.whatsappMessage} onChange={e => update("whatsappMessage", e.target.value)} maxLength={200} />
            </Field>
            <Field label="Accent color">
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  value={data.accentColor}
                  onChange={e => update("accentColor", e.target.value)}
                  className="h-10 w-14 rounded border border-border bg-transparent cursor-pointer"
                />
                <Input value={data.accentColor} onChange={e => update("accentColor", e.target.value)} maxLength={9} />
              </div>
            </Field>
          </Section>

          <div className="text-xs text-muted-foreground border-t border-border pt-4">
            Output is a single self-contained <code className="text-foreground">.html</code> file. Drop it into any static host — GitHub Pages, Netlify, Vercel.
          </div>
        </aside>

        {/* Live preview */}
        <main className="bg-muted">
          <div className="sticky top-[65px] bg-muted px-6 py-2 text-xs text-muted-foreground border-b border-border">
            Live preview
          </div>
          <iframe
            title="Presentation preview"
            srcDoc={html}
            className="w-full h-[calc(100vh-105px)] bg-black"
          />
        </main>
      </div>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h2 className="text-xs font-semibold uppercase tracking-wider text-gold">{title}</h2>
    <div className="space-y-3">{children}</div>
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1.5">
    <Label className="text-xs text-muted-foreground">{label}</Label>
    {children}
  </div>
);
