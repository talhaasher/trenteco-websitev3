-- Create articles table for blog posts
CREATE TABLE IF NOT EXISTS public.articles (
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

-- Add Row Level Security (RLS) for articles
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- Allow public read access to published articles
CREATE POLICY IF NOT EXISTS "Allow public read access" ON public.articles
    FOR SELECT USING (published = true);

-- Create an updated_at trigger for articles
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER IF NOT EXISTS update_articles_updated_at
    BEFORE UPDATE ON public.articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Clear existing products and insert new ones
TRUNCATE TABLE public.products RESTART IDENTITY CASCADE;

-- Insert your custom products
INSERT INTO public.products (name, category, price, size, material, image_url, description, sku, stock_quantity, is_featured, slug) VALUES
('Standard Kraft Paper Bag', 'retail', 0.45, 'medium', 'kraft', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 'Our recyclable kraft paper bags are strong, high-quality, and sustainably sourced. Perfect for retail stores with eco-friendly branding.', 'SKU-001', 100, true, 'standard-kraft-paper-bag'),
('White Paper Bag with Flat Handles', 'retail', 0.55, 'large', 'white', 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400', 'Elegant white paper bag with flat handles, ideal for clothing and accessories. Made locally in Sutton Coldfield, Birmingham.', 'SKU-002', 75, false, 'white-paper-bag-flat-handles'),
('Food Delivery Bag', 'food', 0.35, 'small', 'kraft', 'https://images.unsplash.com/photo-1563379091339-03246963d59a?w=400', 'Grease-resistant paper bag designed for takeaway food items. Get printed food packaging in the UK that''s branded to reflect your identity.', 'SKU-003', 200, true, 'food-delivery-bag'),
('Luxury Boutique Bag', 'luxury', 0.95, 'medium', 'premium', 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400', 'Premium quality paper bag with ribbon handles and gold foil printing. Custom printed paper bags that reflect your brand identity.', 'SKU-004', 50, true, 'luxury-boutique-bag'),
('Bakery Paper Bag', 'food', 0.25, 'small', 'kraft', 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400', 'Food-safe paper bag perfect for bakery items and pastries. We use eco-friendly materials and methods — ideal for sustainable brands.', 'SKU-005', 150, false, 'bakery-paper-bag'),
('Gift Bag with Rope Handles', 'luxury', 0.85, 'medium', 'premium', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400', 'Elegant gift bag with rope handles and matte finish. UK manufactured, cutting lead times and carbon emissions.', 'SKU-006', 60, false, 'gift-bag-rope-handles'),
('Grocery Paper Bag', 'retail', 0.65, 'large', 'kraft', 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400', 'Strong kraft paper bag with reinforced bottom, ideal for groceries. Our recyclable kraft paper bags are sustainably sourced.', 'SKU-007', 120, false, 'grocery-paper-bag'),
('Pharmacy Paper Bag', 'retail', 0.4, 'small', 'white', 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=400', 'Clean white paper bag suitable for pharmacies and healthcare products. Made locally in Birmingham with eco-friendly methods.', 'SKU-008', 90, false, 'pharmacy-paper-bag'),
('Wine Bottle Bag', 'luxury', 0.75, 'medium', 'premium', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400', 'Specialized paper bag designed to hold wine bottles securely. Premium UK manufactured with custom branding options.', 'SKU-009', 40, false, 'wine-bottle-bag'),
('Custom Printed Bag', 'retail', 0.85, 'large', 'kraft', 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400', 'Customizable kraft paper bag with your logo and branding. Get printed food packaging in the UK that reflects your identity perfectly.', 'SKU-010', 80, true, 'custom-printed-bag');

-- Insert sample articles with TrentEco-focused content
INSERT INTO public.articles (title, slug, excerpt, content, category, tags, read_time, image_url) VALUES
(
    'Eco-Friendly Paper Bags UK: Why Our Recyclable Kraft Bags Lead the Market',
    'eco-friendly-paper-bags-uk-recyclable-kraft',
    'Our recyclable kraft paper bags are strong, high-quality, and sustainably sourced. Discover why UK businesses choose TrentEco for eco-friendly packaging solutions.',
    'In today''s environmentally conscious market, businesses across jts giv eseritp atoadd into the UK are seeking sustainable packaging solutions that don''t compromise on quality. Our recyclable kraft paper bags represent the perfect balance between environmental responsibility and practical functionality.

Our kraft paper bags are manufactured using sustainably sourced materials, ensuring that every bag contributes to a circular economy. The natural kraft material provides exceptional strength and durability, making these bags ideal for retail stores, food outlets, and luxury boutiques alike.

What sets our eco-friendly paper bags apart is their versatility. Whether you''re packaging clothing, food items, or luxury goods, our kraft bags maintain their integrity while providing an attractive, professional appearance that reflects positively on your brand.

The recyclable nature of our kraft paper bags means your customers can easily dispose of them in standard recycling streams, supporting their own environmental commitments. This creates a positive brand association that resonates with today''s eco-conscious consumers.

Choose TrentEco''s eco-friendly paper bags and join the growing number of UK businesses making a positive environmental impact without sacrificing quality or aesthetics.',
    'sustainability',
    ARRAY['eco-friendly', 'recyclable', 'kraft paper', 'UK', 'sustainability'],
    '5 min read',
    'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400'
),
(
    'UK Manufactured Paper Bags: Made Locally in Sutton Coldfield, Birmingham',
    'uk-manufactured-paper-bags-sutton-coldfield-birmingham',
    'Made locally in Sutton Coldfield, Birmingham — cutting lead times and carbon emissions. Discover the benefits of choosing UK-manufactured paper bags.',
    'At TrentEco, we''re proud to manufacture our paper bags locally in Sutton Coldfield, Birmingham. This strategic location allows us to serve businesses across the UK while significantly reducing lead times and carbon emissions associated with international shipping.

Our UK manufacturing approach offers several key advantages for businesses seeking reliable packaging solutions. First, dramatically reduced lead times mean you can respond quickly to market demands and seasonal fluctuations without lengthy waiting periods for overseas shipments.

Local manufacturing also means reduced carbon emissions throughout the supply chain. By eliminating long-distance transportation, we help your business reduce its environmental footprint while supporting the local Birmingham economy.

Quality control is another significant benefit of our UK manufacturing process. Our experienced team oversees every stage of production, ensuring consistent quality and the ability to quickly address any specific requirements or customizations.

The proximity of our Sutton Coldfield facility also enables better communication and collaboration. We can work closely with you to develop custom solutions, provide samples quickly, and offer responsive customer service that''s simply not possible with overseas suppliers.

By choosing TrentEco''s UK-manufactured paper bags, you''re not just getting superior packaging — you''re supporting British manufacturing and contributing to a more sustainable, responsive supply chain.',
    'manufacturing',
    ARRAY['UK manufacturing', 'Sutton Coldfield', 'Birmingham', 'local', 'lead times'],
    '6 min read',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400'
),
(
    'Custom Printed Paper Bags: Food Packaging UK Solutions',
    'custom-printed-paper-bags-food-packaging-uk',
    'Get printed food packaging in the UK that''s branded to reflect your identity. Learn how custom printed paper bags can enhance your brand recognition.',
    'Custom printed paper bags represent one of the most effective ways to extend your brand presence beyond your physical location. At TrentEco, we specialize in creating printed food packaging solutions that help UK businesses build stronger brand recognition and customer loyalty.

Our custom printing capabilities allow you to incorporate your logo, brand colors, and messaging directly onto high-quality paper bags. This transforms every customer interaction into a marketing opportunity, as your branded bags travel with customers throughout their day.

For food businesses, custom printed paper bags serve a dual purpose: they provide practical, food-safe packaging while reinforcing your brand identity. Whether you''re running a bakery, restaurant, or specialty food store, our printed bags help create a cohesive brand experience that customers remember.

The printing process we use ensures vibrant, long-lasting colors that won''t fade or smudge, even when handling food items. Our food-grade inks and materials meet all UK safety standards, giving you confidence in both the appearance and safety of your packaging.

Beyond basic logo printing, we offer various design options including full-color printing, metallic foils, and embossed finishes. This flexibility allows you to create packaging that truly reflects your brand''s personality and values.

Custom printed paper bags also demonstrate professionalism and attention to detail that customers appreciate. In a competitive market, these subtle brand touchpoints can make the difference between a one-time purchase and a loyal customer relationship.',
    'branding',
    ARRAY['custom printing', 'food packaging', 'branding', 'UK', 'logo'],
    '4 min read',
    'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400'
),
(
    'Sustainability-Focused Paper Bags: Eco-Friendly Materials and Methods',
    'sustainability-focused-paper-bags-eco-friendly-materials',
    'We use eco-friendly materials and methods — ideal for brands seeking eco-friendly paper bags in the UK. Learn about our sustainable manufacturing process.',
    'Sustainability isn''t just a buzzword at TrentEco — it''s the foundation of everything we do. Our commitment to eco-friendly materials and methods makes us the ideal choice for brands seeking truly sustainable paper bag solutions in the UK.

Our sustainability approach begins with material selection. We source our paper from certified sustainable forests, ensuring that every bag contributes to responsible forest management rather than deforestation. These materials are not only environmentally responsible but also provide the strength and durability your business needs.

The manufacturing process itself incorporates eco-friendly methods at every stage. We''ve invested in energy-efficient equipment and renewable energy sources, significantly reducing the carbon footprint of our production. Our water-based inks and adhesives eliminate harmful solvents and chemicals, creating packaging that''s safe for both people and the environment.

Waste reduction is another key focus area. Our production processes are designed to minimize material waste, and any off-cuts or waste materials are recycled back into the manufacturing process or sent to certified recycling facilities.

For businesses committed to sustainability, our paper bags offer a complete lifecycle advantage. They''re made from renewable materials, produced using clean methods, and fully recyclable at the end of their use. This comprehensive approach helps your business meet sustainability goals while providing customers with packaging they can feel good about.

The result is packaging that doesn''t compromise between environmental responsibility and practical functionality. Your customers receive high-quality bags that support their own environmental values while effectively carrying and protecting their purchases.',
    'sustainability',
    ARRAY['sustainability', 'eco-friendly materials', 'manufacturing', 'renewable', 'recycling'],
    '7 min read',
    'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400'
),
(
    'Kraft Paper Bags vs Plastic: The Environmental Impact Comparison',
    'kraft-paper-bags-vs-plastic-environmental-impact',
    'Understanding the environmental benefits of choosing kraft paper bags over plastic alternatives for your business packaging needs.',
    'The debate between kraft paper bags and plastic packaging has never been more relevant for UK businesses looking to reduce their environmental impact. At TrentEco, we believe in providing factual information to help you make informed decisions about your packaging choices.

Kraft paper bags offer significant environmental advantages over plastic alternatives. Unlike plastic, which can take hundreds of years to decompose, kraft paper bags biodegrade naturally within months when disposed of properly. This dramatic difference in decomposition time reduces long-term environmental impact substantially.

The production process also differs significantly. Kraft paper bags are made from renewable wood fiber resources, while plastic bags rely on fossil fuels. This fundamental difference means that kraft paper supports sustainable forestry practices rather than depleting non-renewable resources.

Recycling presents another clear advantage for kraft paper bags. They can be recycled multiple times through standard paper recycling streams, while plastic bags require specialized recycling facilities that aren''t widely available. This accessibility makes it easier for consumers to dispose of kraft bags responsibly.

From a carbon footprint perspective, the local manufacturing of kraft paper bags in our Sutton Coldfield facility significantly reduces transportation emissions compared to imported plastic alternatives. This local production advantage compounds the environmental benefits throughout the supply chain.

For businesses concerned about customer perception, kraft paper bags also provide a visible demonstration of environmental commitment that customers appreciate and remember.',
    'sustainability',
    ARRAY['kraft paper', 'plastic', 'environmental impact', 'biodegradable', 'recycling'],
    '6 min read',
    'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400'
),
(
    'Food Safety Standards for Paper Bag Packaging in the UK',
    'food-safety-standards-paper-bag-packaging-uk',
    'Essential information about UK food safety regulations and how our paper bags meet the highest standards for food contact packaging.',
    'Food safety is paramount when selecting packaging materials for food businesses. At TrentEco, we ensure all our paper bags designed for food use meet and exceed UK food safety standards, providing you with confidence in both product safety and regulatory compliance.

Our food-grade paper bags are manufactured using materials that have been specifically approved for direct food contact. These materials undergo rigorous testing to ensure they don''t transfer harmful substances to food items, maintaining the integrity and safety of your products.

The inks and adhesives used in our food packaging are water-based and certified food-safe, eliminating concerns about chemical migration. This is particularly important for items with high moisture content or acidic foods that might interact with packaging materials.

Temperature resistance is another critical factor we address in our food packaging design. Our bags maintain their integrity and safety properties across a wide temperature range, making them suitable for both hot and cold food items without compromising food safety.

Grease and moisture resistance features are incorporated into our food bags without using harmful chemical coatings. Instead, we use mechanical processes and food-safe barriers that provide protection while maintaining safety standards.

Regular testing and certification ensure our food packaging continues to meet evolving UK regulations. We work closely with regulatory bodies and conduct periodic audits to maintain compliance and provide you with current certification documentation.

For businesses in the food industry, choosing certified food-safe packaging isn''t just about compliance — it''s about protecting your customers and your reputation while demonstrating your commitment to quality and safety.',
    'food safety',
    ARRAY['food safety', 'UK regulations', 'food packaging', 'compliance', 'certification'],
    '5 min read',
    'https://images.unsplash.com/photo-1563379091339-03246963d59a?w=400'
);