import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Plus, ExternalLink, Users, Eye, LogOut, Copy, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";

type Listing = Tables<"listings">;
type Lead = Tables<"leads">;

const Dashboard = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [leads, setLeads] = useState<Record<string, Lead[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/auth");
        return;
      }
      fetchListings();
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/auth");
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchListings = async () => {
    const { data, error } = await supabase.from("listings").select("*").order("created_at", { ascending: false });
    if (!error && data) setListings(data);
    setLoading(false);
  };

  const fetchLeads = async (listingId: string) => {
    if (leads[listingId]) {
      setSelectedListing(selectedListing === listingId ? null : listingId);
      return;
    }
    const { data, error } = await supabase.from("leads").select("*").eq("listing_id", listingId).order("created_at", { ascending: false });
    if (!error && data) {
      setLeads((prev) => ({ ...prev, [listingId]: data }));
    }
    setSelectedListing(listingId);
  };

  const deleteListing = async (id: string) => {
    const { error } = await supabase.from("listings").delete().eq("id", id);
    if (!error) {
      setListings((prev) => prev.filter((l) => l.id !== id));
      toast({ title: "Listing deleted" });
    }
  };

  const copyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/p/${id}`);
    toast({ title: "Link copied!" });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(price);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-heading text-sm font-bold text-primary-foreground">L</span>
            </div>
            <span className="font-heading text-xl font-bold text-foreground">ListingKit</span>
          </Link>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate("/create")} className="bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold">
              <Plus className="mr-2 h-4 w-4" /> New Listing
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-10">
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-foreground">Your Listings</h1>
          <p className="text-muted-foreground mt-1">Create property pages and track leads.</p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20 bg-card rounded-2xl shadow-soft">
            <div className="h-16 w-16 rounded-2xl bg-gold/10 flex items-center justify-center mx-auto mb-4">
              <Plus className="h-8 w-8 text-gold" />
            </div>
            <h2 className="font-heading text-xl font-bold text-foreground mb-2">No listings yet</h2>
            <p className="text-muted-foreground mb-6">Create your first property page and start capturing leads.</p>
            <Button onClick={() => navigate("/create")} className="bg-gold hover:bg-gold/90 text-secondary-foreground font-semibold">
              Create Your First Listing
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {listings.map((listing) => (
              <div key={listing.id} className="bg-card rounded-2xl shadow-soft overflow-hidden">
                <div className="p-6 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-bold text-foreground truncate">{listing.address}</h3>
                    <p className="text-sm text-muted-foreground">
                      {listing.city}{listing.state ? `, ${listing.state}` : ""} · {formatPrice(listing.price)}
                      {listing.bedrooms ? ` · ${listing.bedrooms} bd` : ""}
                      {listing.bathrooms ? ` / ${listing.bathrooms} ba` : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="outline" size="sm" onClick={() => fetchLeads(listing.id)}>
                      <Users className="mr-1.5 h-3.5 w-3.5" />
                      Leads {leads[listing.id] ? `(${leads[listing.id].length})` : ""}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => copyLink(listing.id)}>
                      <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy Link
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <a href={`/p/${listing.id}`} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-1.5 h-3.5 w-3.5" /> View
                      </a>
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deleteListing(listing.id)} className="text-destructive hover:text-destructive">
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
                {selectedListing === listing.id && leads[listing.id] && (
                  <div className="border-t border-border px-6 py-4 bg-muted/30">
                    {leads[listing.id].length === 0 ? (
                      <p className="text-sm text-muted-foreground">No leads yet. Share your property page to start collecting leads.</p>
                    ) : (
                      <div className="space-y-3">
                        {leads[listing.id].map((lead) => (
                          <div key={lead.id} className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                            <span className="font-medium text-foreground">{lead.name}</span>
                            <span className="text-muted-foreground">{lead.email}</span>
                            {lead.phone && <span className="text-muted-foreground">{lead.phone}</span>}
                            {lead.message && <span className="text-muted-foreground italic truncate max-w-xs">"{lead.message}"</span>}
                            <span className="text-xs text-muted-foreground ml-auto">{new Date(lead.created_at).toLocaleDateString()}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
