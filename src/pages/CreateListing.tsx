import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const CreateListing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    address: "",
    city: "",
    state: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    sqft: "",
    description: "",
    agent_name: "",
    agent_email: "",
    agent_phone: "",
    photo_url: "",
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) navigate("/auth");
    };
    checkAuth();
  }, [navigate]);

  const update = (key: string, value: string) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) { navigate("/auth"); return; }

    const photos = form.photo_url.trim()
      ? form.photo_url.split("\n").map((u) => u.trim()).filter(Boolean)
      : [];

    const { data, error } = await supabase.from("listings").insert({
      agent_id: session.user.id,
      address: form.address.trim(),
      city: form.city.trim(),
      state: form.state.trim(),
      price: parseFloat(form.price),
      bedrooms: form.bedrooms ? parseInt(form.bedrooms) : 0,
      bathrooms: form.bathrooms ? parseFloat(form.bathrooms) : 0,
      sqft: form.sqft ? parseInt(form.sqft) : null,
      description: form.description.trim() || null,
      agent_name: form.agent_name.trim(),
      agent_email: form.agent_email.trim(),
      agent_phone: form.agent_phone.trim() || null,
      photos,
    }).select().single();

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      setLoading(false);
      return;
    }

    toast({ title: "Listing created!", description: "Your property page is live." });
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Dashboard
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10 max-w-2xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">Create Property Page</h1>
        <p className="text-muted-foreground mb-8">Fill in the listing details. You'll get a shareable link with built-in lead capture.</p>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Property Details */}
          <div className="bg-card rounded-2xl p-8 shadow-soft space-y-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Property Details</h2>
            <div className="space-y-2">
              <Label htmlFor="address">Street Address *</Label>
              <Input id="address" value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="123 Main St" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City *</Label>
                <Input id="city" value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="Miami" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" value={form.state} onChange={(e) => update("state", e.target.value)} placeholder="FL" />
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price *</Label>
                <Input id="price" type="number" value={form.price} onChange={(e) => update("price", e.target.value)} placeholder="750000" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Beds</Label>
                <Input id="bedrooms" type="number" value={form.bedrooms} onChange={(e) => update("bedrooms", e.target.value)} placeholder="4" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Baths</Label>
                <Input id="bathrooms" type="number" step="0.5" value={form.bathrooms} onChange={(e) => update("bathrooms", e.target.value)} placeholder="3" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sqft">Sq Ft</Label>
                <Input id="sqft" type="number" value={form.sqft} onChange={(e) => update("sqft", e.target.value)} placeholder="2400" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" value={form.description} onChange={(e) => update("description", e.target.value)} placeholder="Describe the property..." rows={4} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="photo_url">Photo URLs (one per line)</Label>
              <Textarea id="photo_url" value={form.photo_url} onChange={(e) => update("photo_url", e.target.value)} placeholder="https://images.unsplash.com/..." rows={3} />
              <p className="text-xs text-muted-foreground">Paste image URLs from Unsplash, MLS, or your hosting.</p>
            </div>
          </div>

          {/* Agent Info */}
          <div className="bg-card rounded-2xl p-8 shadow-soft space-y-5">
            <h2 className="font-heading text-lg font-bold text-foreground">Your Info (shown on the page)</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="agent_name">Your Name *</Label>
                <Input id="agent_name" value={form.agent_name} onChange={(e) => update("agent_name", e.target.value)} placeholder="Jane Smith" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="agent_email">Your Email *</Label>
                <Input id="agent_email" type="email" value={form.agent_email} onChange={(e) => update("agent_email", e.target.value)} placeholder="jane@realty.com" required />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="agent_phone">Phone</Label>
              <Input id="agent_phone" value={form.agent_phone} onChange={(e) => update("agent_phone", e.target.value)} placeholder="(305) 555-1234" />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold text-base py-6">
            {loading ? "Creating..." : "Create Property Page"}
          </Button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
