-- Create articles table for blog posts
CREATE TABLE public.articles (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT,
    author TEXT DEFAULT 'TrentEco Team',
    category TEXT,
    tags TEXT[] DEFAULT '{}',
    image_url TEXT,
    image_urls TEXT,
    read_time TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Add Row Level Security (RLS)
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published articles
CREATE POLICY "Allow public read access" ON public.articles
    FOR SELECT USING (published = true);

-- Create an updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample articles
INSERT INTO public.articles (title, slug, excerpt, content, category, tags, read_time, image_url) VALUES
(
    'The Benefits of Switching to Eco-Friendly Paper Bags',
    'benefits-of-eco-friendly-paper-bags',
    'Discover why more businesses are making the switch to sustainable paper packaging and how it benefits both your brand and the environment.',
    'In today''s environmentally conscious world, businesses are increasingly recognizing the importance of sustainable packaging solutions. Paper bags offer a perfect alternative to plastic, providing durability while being completely biodegradable...',
    'sustainability',
    ARRAY['sustainability', 'eco-friendly', 'packaging'],
    '5 min read',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
),
(
    'Custom Branding Options for Paper Bags',
    'custom-branding-paper-bags',
    'Learn about the various ways you can customize paper bags to reflect your brand identity and create a memorable customer experience.',
    'Custom branding on paper bags is more than just adding a logo. It''s about creating a cohesive brand experience that extends from your store to your customer''s home...',
    'branding',
    ARRAY['branding', 'customization', 'marketing'],
    '4 min read',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'
),
(
    'UK Manufacturing: Supporting Local Economy',
    'uk-manufacturing-local-economy',
    'Why choosing UK-made paper bags matters for local businesses and the economy, plus the advantages of reduced lead times.',
    'When you choose UK-manufactured paper bags, you''re not just getting a quality product – you''re supporting the local economy and reducing your carbon footprint...',
    'manufacturing',
    ARRAY['UK manufacturing', 'local economy', 'sustainability'],
    '6 min read',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400'
),
(
    'Kraft Paper vs Other Materials: A Comparison',
    'kraft-paper-vs-other-materials',
    'A comprehensive comparison of kraft paper against other packaging materials, highlighting strength, sustainability, and cost-effectiveness.',
    'Kraft paper has become the gold standard for eco-friendly packaging, but how does it compare to other materials? Let''s explore the benefits and considerations...',
    'materials',
    ARRAY['kraft paper', 'materials', 'comparison'],
    '7 min read',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
),
(
    'Food Packaging Safety and Paper Bags',
    'food-packaging-safety-paper-bags',
    'Essential information about using paper bags for food packaging, including safety standards and best practices.',
    'Food safety is paramount when choosing packaging materials. Paper bags designed for food use must meet specific standards to ensure they''re safe for direct contact...',
    'food safety',
    ARRAY['food packaging', 'safety', 'regulations'],
    '5 min read',
    'https://images.unsplash.com/photo-1563379091339-03246963d59a?w=400'
),
(
    'Seasonal Packaging Trends for Retail',
    'seasonal-packaging-trends-retail',
    'Stay ahead of the curve with seasonal packaging trends that can boost your retail sales and customer engagement.',
    'Seasonal packaging offers retailers an opportunity to connect with customers on an emotional level while showcasing products in the best possible light...',
    'trends',
    ARRAY['retail', 'seasonal', 'trends'],
    '4 min read',
    'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400'
);