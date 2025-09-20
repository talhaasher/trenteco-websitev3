-- Add Square Bottom Paper Bags and Flat Bottom Satchel Bags to products table

INSERT INTO public.products (name, category, price, size, material, image_url, description, sku, stock_quantity, is_featured) VALUES
(
    'Square Bottom Paper Bags',
    'retail',
    0.55,
    'medium',
    'kraft',
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    'Ideal for takeaways, groceries, and retail packaging. These takeaway paper bags wholesale come in white kraft, brown kraft, or recycled brown kraft paper, offering both strength and style. Available with custom printing to reflect your brand identity.',
    'SKU-011',
    150,
    true
),
(
    'Flat Bottom / Greaseproof Satchel Bags',
    'food',
    0.45,
    'small',
    'greaseproof',
    'https://images.unsplash.com/photo-1563379091339-03246963d59a?w=400',
    'Perfect for chips, snacks, and baked goods, these greaseproof satchel bags are available with or without OPP windows. Ideal for cafés, bakeries, and fast food outlets looking for functional and visually appealing packaging.',
    'SKU-012',
    200,
    true
);