-- Create invitations table for multi-client wedding invitations
CREATE TABLE public.invitations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  bride_name TEXT NOT NULL,
  groom_name TEXT NOT NULL,
  wedding_date DATE NOT NULL,
  venue TEXT NOT NULL,
  story TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Allow public read access (invitations are meant to be viewed by anyone with the link)
CREATE POLICY "Invitations are publicly viewable"
  ON public.invitations
  FOR SELECT
  USING (true);

-- Create index on slug for fast lookups
CREATE INDEX idx_invitations_slug ON public.invitations (slug);

-- Insert a sample invitation
INSERT INTO public.invitations (slug, bride_name, groom_name, wedding_date, venue, story)
VALUES (
  'priya-arjun',
  'Priya',
  'Arjun',
  '2026-12-12',
  'The Royal Palace, Udaipur',
  'Together with their families invite you to celebrate their wedding'
);