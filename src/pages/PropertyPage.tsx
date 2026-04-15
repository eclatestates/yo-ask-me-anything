import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Bed, Bath, Maximize, MapPin, Phone, Mail, User, ChevronLeft, ChevronRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Listing = Tables<"listings">;

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [leadForm, setLeadForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      if (!id) return;
      const { data, error } = await supabase.from("listings").select("*").eq("id", id).single();
      if (!error && data) setListing(data);
      setLoading(false);
    };
    fetchListing();
  }, [id]);

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSubmitting(true);

    const { error } = await supabase.from("leads").insert({
      listing_id: id,
      name: leadForm.name.trim(),
      email: leadForm.email.trim(),
      phone: leadForm.phone.trim() || null,
      message: leadForm.message.trim() || null,
    });

    if (error) {
      toast({ title: "Error", description: "Could not submit. Please try again.", variant: "destructive" });
    } else {
      setSubmitted(true);
    }
    setSubmitting(false);
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading property...</div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Property Not Found</h1>
          <p className="text-muted-foreground">This listing may have been removed or the link is incorrect.</p>
        </div>
      </div>
    );
  }

  const photos = listing.photos?.length ? listing.photos : [];
  const hasPhotos = photos.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Photos */}
      {hasPhotos && (
        <div className="relative h-[50vh] md:h-[60vh] bg-muted overflow-hidden">
          <img
            src={photos[photoIndex]}
            alt={`Property photo ${photoIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={() => setPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-card transition"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPhotoIndex((prev) => (prev + 1) % photos.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-card/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-card transition"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIndex(i)}
                    className={`h-2 w-2 rounded-full transition ${i === photoIndex ? "bg-card" : "bg-card/40"}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <div className="container mx-auto px-6 py-10">
        <div className="grid lg:grid-cols-3 gap-10">
          {/* Property Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                <MapPin className="h-4 w-4" />
                {listing.city}{listing.state ? `, ${listing.state}` : ""}
              </div>
              <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">{listing.address}</h1>
              <p className="font-heading text-3xl font-bold text-gold">{formatPrice(listing.price)}</p>
            </div>

            <div className="flex flex-wrap gap-6">
              {listing.bedrooms > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Bed className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-foreground">{listing.bedrooms}</div>
                    <div className="text-xs text-muted-foreground">Bedrooms</div>
                  </div>
                </div>
              )}
              {listing.bathrooms > 0 && (
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Bath className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-foreground">{listing.bathrooms}</div>
                    <div className="text-xs text-muted-foreground">Bathrooms</div>
                  </div>
                </div>
              )}
              {listing.sqft && (
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-gold/10 flex items-center justify-center">
                    <Maximize className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <div className="font-heading font-bold text-foreground">{listing.sqft.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">Sq Ft</div>
                  </div>
                </div>
              )}
            </div>

            {listing.description && (
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground mb-3">About This Property</h2>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">{listing.description}</p>
              </div>
            )}

            {/* Agent Card */}
            <div className="bg-card rounded-2xl p-6 shadow-soft">
              <h3 className="font-heading text-lg font-bold text-foreground mb-4">Listed By</h3>
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gold/15 flex items-center justify-center">
                  <User className="h-7 w-7 text-gold" />
                </div>
                <div>
                  <div className="font-heading font-bold text-foreground">{listing.agent_name}</div>
                  <div className="flex flex-wrap gap-4 mt-1 text-sm text-muted-foreground">
                    <a href={`mailto:${listing.agent_email}`} className="flex items-center gap-1 hover:text-gold transition-colors">
                      <Mail className="h-3.5 w-3.5" /> {listing.agent_email}
                    </a>
                    {listing.agent_phone && (
                      <a href={`tel:${listing.agent_phone}`} className="flex items-center gap-1 hover:text-gold transition-colors">
                        <Phone className="h-3.5 w-3.5" /> {listing.agent_phone}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Lead Capture Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-8 shadow-soft sticky top-6">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="h-16 w-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Thank You!</h3>
                  <p className="text-muted-foreground">Your inquiry has been sent. The agent will be in touch shortly.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">Interested?</h3>
                  <p className="text-sm text-muted-foreground mb-6">Send a message and the listing agent will get back to you.</p>
                  <form onSubmit={handleLeadSubmit} className="space-y-4">
                    <Input
                      placeholder="Your name *"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm((p) => ({ ...p, name: e.target.value }))}
                      required
                    />
                    <Input
                      type="email"
                      placeholder="Your email *"
                      value={leadForm.email}
                      onChange={(e) => setLeadForm((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                    <Input
                      placeholder="Phone (optional)"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm((p) => ({ ...p, phone: e.target.value }))}
                    />
                    <Textarea
                      placeholder="I'd like to learn more about this property..."
                      value={leadForm.message}
                      onChange={(e) => setLeadForm((p) => ({ ...p, message: e.target.value }))}
                      rows={3}
                    />
                    <Button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold"
                    >
                      {submitting ? "Sending..." : "Send Inquiry"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Minimal footer */}
      <footer className="border-t border-border py-6 mt-10">
        <div className="container mx-auto px-6 text-center text-xs text-muted-foreground">
          Powered by <span className="font-heading font-semibold">ListingKit</span>
        </div>
      </footer>
    </div>
  );
};

export default PropertyPage;
