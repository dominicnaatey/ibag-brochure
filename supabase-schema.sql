-- IBAG Brochure Database Schema
-- Run this in your Supabase SQL Editor to create the required tables

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date TIMESTAMP WITH TIME ZONE NOT NULL,
  location VARCHAR(255) NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News table
CREATE TABLE IF NOT EXISTS news (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  published_date TIMESTAMP WITH TIME ZONE NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Members table
CREATE TABLE IF NOT EXISTS members (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  position VARCHAR(255),
  membership_type VARCHAR(100) NOT NULL,
  joined_date DATE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Gallery table
CREATE TABLE IF NOT EXISTS gallery (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  event_id UUID REFERENCES events(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON news(published_date);
CREATE INDEX IF NOT EXISTS idx_members_email ON members(email);
CREATE INDEX IF NOT EXISTS idx_members_membership_type ON members(membership_type);
CREATE INDEX IF NOT EXISTS idx_gallery_event_id ON gallery(event_id);

-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Events are viewable by everyone" ON events
  FOR SELECT USING (true);

CREATE POLICY "News are viewable by everyone" ON news
  FOR SELECT USING (true);

CREATE POLICY "Members are viewable by everyone" ON members
  FOR SELECT USING (true);

CREATE POLICY "Gallery items are viewable by everyone" ON gallery
  FOR SELECT USING (true);

-- Create policies for contact submissions (public can insert, admin can read)
CREATE POLICY "Allow public insert on contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin read on contact_submissions" ON contact_submissions FOR SELECT USING (auth.jwt() ->> 'email' = 'admin@ibag-ghana.org');
CREATE POLICY "Allow admin update on contact_submissions" ON contact_submissions FOR UPDATE USING (auth.jwt() ->> 'email' = 'admin@ibag-ghana.org');
CREATE POLICY "Allow admin delete on contact_submissions" ON contact_submissions FOR DELETE USING (auth.jwt() ->> 'email' = 'admin@ibag-ghana.org');

-- Create policies for authenticated users (admin) to manage content
CREATE POLICY "Authenticated users can insert events" ON events
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update events" ON events
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete events" ON events
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert news" ON news
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update news" ON news
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete news" ON news
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert members" ON members
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update members" ON members
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete members" ON members
  FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert gallery items" ON gallery
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery items" ON gallery
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery items" ON gallery
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('events', 'events', true),
  ('news', 'news', true),
  ('gallery', 'gallery', true),
  ('members', 'members', true)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies
CREATE POLICY "Public can view event images" ON storage.objects
  FOR SELECT USING (bucket_id = 'events');

CREATE POLICY "Authenticated users can upload event images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'events' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update event images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'events' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete event images" ON storage.objects
  FOR DELETE USING (bucket_id = 'events' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view news images" ON storage.objects
  FOR SELECT USING (bucket_id = 'news');

CREATE POLICY "Authenticated users can upload news images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'news' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update news images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'news' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete news images" ON storage.objects
  FOR DELETE USING (bucket_id = 'news' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery' AND auth.role() = 'authenticated');

CREATE POLICY "Public can view member logos" ON storage.objects
  FOR SELECT USING (bucket_id = 'members');

CREATE POLICY "Authenticated users can upload member logos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update member logos" ON storage.objects
  FOR UPDATE USING (bucket_id = 'members' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete member logos" ON storage.objects
  FOR DELETE USING (bucket_id = 'members' AND auth.role() = 'authenticated');

-- Insert sample data
INSERT INTO events (title, description, date, location, image_url) VALUES
('Italian Business Workshop', 'Learn about doing business in Italy and Ghana', '2024-03-15 18:00:00+00', 'IBAG Conference Center, Accra', '/business-workshop.png'),
('Italian Food Festival', 'Celebrate Italian cuisine with authentic dishes', '2024-04-20 16:00:00+00', 'Labadi Beach Hotel, Accra', '/italian-food-festival.png'),
('Networking Evening', 'Connect with Italian and Ghanaian business leaders', '2024-05-10 19:00:00+00', 'Kempinski Hotel, Accra', '/italian-wine-networking.png')
ON CONFLICT DO NOTHING;

INSERT INTO news (title, content, excerpt, author, published_date, image_url) VALUES
('IBAG Welcomes New Members', 'We are excited to announce that 15 new members have joined the Italian Business Association of Ghana this quarter...', 'IBAG continues to grow with new member acquisitions', 'IBAG Communications', '2024-02-15 10:00:00+00', '/italian-business-meeting.png'),
('Successful Trade Mission to Italy', 'Our recent trade mission to Milan and Rome was a great success, with over 20 Ghanaian businesses participating...', 'Trade mission creates new opportunities for Ghana-Italy business', 'Marco Rossi', '2024-01-30 14:00:00+00', '/italian-ghanaian-event.png')
ON CONFLICT DO NOTHING;

INSERT INTO members (name, email, phone, company, position, membership_type, joined_date) VALUES
('Marco Rossi', 'marco.rossi@example.com', '+233 24 123 4567', 'Rossi Trading Ltd', 'CEO', 'Corporate', '2023-01-15'),
('Giuseppe Bianchi', 'giuseppe.bianchi@example.com', '+233 20 987 6543', 'Bianchi Imports', 'Managing Director', 'Corporate', '2023-03-20'),
('Francesca Verdi', 'francesca.verdi@example.com', '+233 26 555 0123', 'Verdi Consulting', 'Consultant', 'Individual', '2023-06-10')
ON CONFLICT DO NOTHING;

INSERT INTO gallery (title, description, image_url, event_id) VALUES
('Business Workshop Highlights', 'Photos from our successful business workshop', '/business-workshop.png', (SELECT id FROM events WHERE title = 'Italian Business Workshop' LIMIT 1)),
('Food Festival Moments', 'Capturing the joy of Italian cuisine', '/italian-food-festival.png', (SELECT id FROM events WHERE title = 'Italian Food Festival' LIMIT 1)),
('Networking Success', 'Great connections made at our networking event', '/italian-wine-networking.png', (SELECT id FROM events WHERE title = 'Networking Evening' LIMIT 1))
ON CONFLICT DO NOTHING;