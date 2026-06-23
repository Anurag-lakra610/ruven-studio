-- Ruven OS — Initial Seed Data
-- Timestamp: 2026-06-23T09:25:00Z

-- 1. Seed Roles
INSERT INTO roles (id, name, description) VALUES
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b201', 'Super Admin', 'Full control over the entire system, database, settings, and users.'),
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b202', 'Store Manager', 'Manages product catalog, inventory, collections, pricing, and orders.'),
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b203', 'Content Editor', 'Writes, edits, and manages devotionals, blog articles, and sitemaps.'),
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b204', 'Warehouse Operator', 'Fulfills orders, prints shipping labels, scans barcodes, and updates inventory stock.'),
('b2b2b2b2-b2b2-b2b2-b2b2-b2b2b2b2b205', 'Support Specialist', 'Manages customer profiles, tickets, returns processing, and issues refunds.');

-- 2. Seed Permissions
INSERT INTO permissions (id, action_key, description, module) VALUES
(gen_random_uuid(), 'PRODUCTS_CREATE', 'Can create products listings', 'Commerce'),
(gen_random_uuid(), 'PRODUCTS_PUBLISH', 'Can publish products to the storefront', 'Commerce'),
(gen_random_uuid(), 'PRODUCTS_DELETE', 'Can delete products records', 'Commerce'),
(gen_random_uuid(), 'ORDERS_REFUND', 'Can process refunds via payment gateways', 'Commerce'),
(gen_random_uuid(), 'ARTICLES_PUBLISH', 'Can publish articles to the Journal', 'Content'),
(gen_random_uuid(), 'SETTINGS_GATEWAY', 'Can update payment gateway credentials', 'Settings');

-- 3. Seed Warehouses
INSERT INTO warehouses (id, name, address_json, is_active) VALUES
('e1111111-1111-1111-1111-111111111111', 'South India Fulfillment Center', '{"street": "12/A Textile Park", "city": "Tiruppur", "state": "Tamil Nadu", "zip": "641601", "country": "India"}', TRUE);

-- 4. Seed Categories
INSERT INTO categories (id, name, slug, description) VALUES
('c1111111-1111-1111-1111-111111111111', 'Streetwear', 'streetwear', 'Premium Christian streetwear drops'),
('c1111111-1111-1111-1111-111111111112', 'Oversized Tees', 'oversized-tees', 'Heavy-weight 240 GSM organic cotton boxy tees'),
('c1111111-1111-1111-1111-111111111113', 'French Terry Hoodies', 'hoodies', 'Cozy 380 GSM combed French Terry streetwear hoodies');

-- 5. Seed Products
INSERT INTO products (id, category_id, name, slug, description, base_price, status, meta_title, meta_description) VALUES
('f1111111-1111-1111-1111-111111111111', 'c1111111-1111-1111-1111-111111111112', 'Armor of Light Heavyweight Tee', 'armor-of-light-heavyweight-tee', '240 GSM organic combed cotton oversized streetwear tee with hand-screen printed Romans 13:12 linear shield graphic.', 1999.00, 'Published', 'Armor of Light Heavyweight Tee — Ruven Studio', 'Heavyweight 240 GSM organic cotton oversized streetwear tee with linear shield design. Inspired by Romans 13:12.'),
('f1111111-1111-1111-1111-111111111112', 'c1111111-1111-1111-1111-111111111113', 'Renewal of Mind French Terry Hoodie', 'renewal-of-mind-french-terry-hoodie', '380 GSM ultra-heavy French Terry hoodie. Features a relaxed boxy silhouette, loop-back lining, and embroidered Romans 12:2 details on the chest.', 3499.00, 'Published', 'Renewal of Mind French Terry Hoodie — Ruven Studio', 'Cozy 380 GSM combed French Terry hoodie with embroidered Romans 12:2 scripture details.');

-- 6. Seed Product Variants
INSERT INTO product_variants (id, product_id, sku, size, color, weight_grams, cost_price) VALUES
('d1111111-1111-1111-1111-111111111111', 'f1111111-1111-1111-1111-111111111111', 'RU-OVS-GRC-S', 'S', 'Ink Black', 240, 800.00),
('d1111111-1111-1111-1111-111111111112', 'f1111111-1111-1111-1111-111111111111', 'RU-OVS-GRC-M', 'M', 'Ink Black', 240, 800.00),
('d1111111-1111-1111-1111-111111111113', 'f1111111-1111-1111-1111-111111111111', 'RU-OVS-GRC-L', 'L', 'Ink Black', 240, 800.00),
('d1111111-1111-1111-1111-111111111114', 'f1111111-1111-1111-1111-111111111111', 'RU-OVS-GRC-XL', 'XL', 'Ink Black', 240, 800.00),
('d1111111-1111-1111-1111-111111111115', 'f1111111-1111-1111-1111-111111111112', 'RU-HD-RNW-M', 'M', 'Warm Charcoal', 380, 1400.00),
('d1111111-1111-1111-1111-111111111116', 'f1111111-1111-1111-1111-111111111112', 'RU-HD-RNW-L', 'L', 'Warm Charcoal', 380, 1400.00),
('d1111111-1111-1111-1111-111111111117', 'f1111111-1111-1111-1111-111111111112', 'RU-HD-RNW-XL', 'XL', 'Warm Charcoal', 380, 1400.00);

-- 7. Seed Inventory Stock
INSERT INTO inventory (variant_id, warehouse_id, quantity, low_stock_threshold, bin_location) VALUES
('d1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 120, 5, 'A-01-1'),
('d1111111-1111-1111-1111-111111111112', 'e1111111-1111-1111-1111-111111111111', 150, 5, 'A-01-2'),
('d1111111-1111-1111-1111-111111111113', 'e1111111-1111-1111-1111-111111111111', 180, 5, 'A-01-3'),
('d1111111-1111-1111-1111-111111111114', 'e1111111-1111-1111-1111-111111111111', 90, 5, 'A-01-4'),
('d1111111-1111-1111-1111-111111111115', 'e1111111-1111-1111-1111-111111111111', 75, 5, 'B-04-1'),
('d1111111-1111-1111-1111-111111111116', 'e1111111-1111-1111-1111-111111111111', 80, 5, 'B-04-2'),
('d1111111-1111-1111-1111-111111111117', 'e1111111-1111-1111-1111-111111111111', 45, 5, 'B-04-3');

-- 8. Seed Scriptures
INSERT INTO scriptures (id, book, chapter, verse, translation, text_content) VALUES
('b1111111-1111-1111-1111-111111111111', 'Romans', 13, '12', 'ESV', 'The night is far gone; the day is at hand. So then let us cast off the works of darkness and put on the armor of light.'),
('b1111111-1111-1111-1111-111111111112', 'Romans', 12, '2', 'ESV', 'Do not be conformed to this world, but be transformed by the renewal of your mind, that by testing you may discern what is the will of God, what is good and acceptable and perfect.');
