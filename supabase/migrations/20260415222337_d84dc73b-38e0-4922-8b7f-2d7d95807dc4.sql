
CREATE TABLE public.listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  agent_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  address TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT '',
  state TEXT NOT NULL DEFAULT '',
  price NUMERIC NOT NULL,
  bedrooms INTEGER NOT NULL DEFAULT 0,
  bathrooms NUMERIC NOT NULL DEFAULT 0,
  sqft INTEGER,
  description TEXT,
  photos TEXT[] DEFAULT '{}',
  agent_name TEXT NOT NULL DEFAULT '',
  agent_email TEXT NOT NULL DEFAULT '',
  agent_phone TEXT DEFAULT '',
  is_published BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

CREATE TABLE public.leads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id UUID NOT NULL REFERENCES public.listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.listings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Agents can view their own listings" ON public.listings FOR SELECT TO authenticated USING (auth.uid() = agent_id);
CREATE POLICY "Agents can create listings" ON public.listings FOR INSERT TO authenticated WITH CHECK (auth.uid() = agent_id);
CREATE POLICY "Agents can update their own listings" ON public.listings FOR UPDATE TO authenticated USING (auth.uid() = agent_id);
CREATE POLICY "Agents can delete their own listings" ON public.listings FOR DELETE TO authenticated USING (auth.uid() = agent_id);
CREATE POLICY "Published listings are public" ON public.listings FOR SELECT TO anon USING (is_published = true);

CREATE POLICY "Anyone can submit a lead" ON public.leads FOR INSERT TO anon, authenticated WITH CHECK (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND is_published = true)
);
CREATE POLICY "Agents can view leads for their listings" ON public.leads FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.listings WHERE id = listing_id AND agent_id = auth.uid())
);

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_listings_updated_at
  BEFORE UPDATE ON public.listings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
