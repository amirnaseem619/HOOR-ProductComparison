const img = (n) => new URL(`../assets/home/${n}`, import.meta.url).href;
export { img };

export const categories = [
  ["Makeup", "cat-makeup.png"],
  ["Skincare", "cat-skincare.png"],
  ["Haircare", "cat-haircare.png"],
  ["Fragrance", "cat-fragrance.png"],
  ["Lipstick", "cat-lipstick.png"],
  ["Beauty Tools", "cat-tools.png"],
  ["Show All", "cat-all.png"],
].map(([name, f]) => ({ name, img: img(f) }));

const P = (store, name, price, stores, f, compare = false) => ({
  store,
  name,
  price,
  stores,
  img: img(f),
  compare,
});
export const flashSale = [
  P("Luxe Beauty", "Hydrating Rose Serum", 120, 7, "p-glossier.png"),
  P("Glow Center", "Oriental Oud Perfume", 340, 23, "p-versace.png"),
  P("Luxe Beauty", "Nivea Lip Balm", 70, 7, "p-nivea.png"),
  P("Luxe Beauty", "Retinal Eye Cream", 120, 7, "p-eyecream.png"),
];
export const featured = [
  P("Luxe Beauty", "Niacinamide Serum", 120, 7, "p-glossier.png"),
  P("Glow Center", "Oriental Eau Perfume", 340, 23, "p-versace.png"),
  P("Luxe Beauty", "Protecting Nail Paint", 70, 7, "p-lipserum.png"),
  P("Luxe Beauty", "AHA BHA Serum", 120, 7, "p-korres.png"),
  P("Luxe Beauty", "Concealer Pallette", 120, 7, "p-blush.png"),
  P("Glow Center", "Rare Correcting Powder", 140, 23, "p-compact.png"),
  P("Luxe Beauty", "Silk Smooth Foundation", 310, 7, "p-foundation.png"),
  P("Luxe Beauty", "Nude Eye Shadow Palette", 220, 7, "p-maybelline.png"),
];
export const nearStores = [
  ["Glow Glam Shop", "3.1KM"],
  ["Aesthetics Faah", "3.2KM"],
  ["Expressions", "3.1KM"],
  ["Sephora", "3.1KM"],
  ["Beauty Bar", "3.1KM"],
  ["Luxe Shop", "3.1KM"],
].map(([name, km]) => ({ name, km, address: "45a Street shop 211, KSA" }));

const S = (name, rating, stores, products, f) => ({
  name,
  rating,
  stores,
  products,
  hours: "8:00 AM - 11:00 PM",
  img: img(f),
});
export const locationStores = [
  S("Luxe Beauty", 95, 20, 900, "store-white.png"),
  S("Glam Bar", 89, 16, 1200, "store-mgouna.png"),
  S("Shoppee Hub", 89, 16, 1200, "store-white.png"),
  S("Ela De Pure", 94, 4, 200, "store-ela.png"),
  S("Sephora", 200, 70, 5000, "store-sephora.png"),
  S("Fair Glow", 200, 70, 5000, "store-face.png"),
];

const O = (name, rating, site, products, stores, f) => ({
  name,
  rating,
  site,
  products,
  stores,
  hours: "8:00 AM - 11:00 PM",
  img: img(f),
});
export const allStores = [
  O("Luxe Beauty", 95, "www.luxebeauty.com", 500, 20, "store-white.png"),
  O("Glam Bar", 89, "www.glambar.com", 1200, 16, "store-mgouna.png"),
  O("Glam Bar", 89, "www.glambar.com", 1200, 16, "store-mgouna.png"),
  O("Ela De Pure", 94, "www.eladepure.com", 200, 4, "store-ela.png"),
  O("Sephora", 200, "www.sephora.com", 5000, 70, "store-sephora.png"),
  O("Sephora", 200, "www.sephora.com", 5000, 70, "store-sephora.png"),
  ...Array(3).fill(
    O("Shoppee Hub", 89, "www.shoppeehub.com", 1200, 16, "store-white.png"),
  ),
  ...Array(3).fill(
    O("Fair Glow", 200, "www.fairglow.com", 5000, 70, "store-face.png"),
  ),
];

const N = (name, price, stores, f, extra = {}) => ({
  store: "Glow Cosmetics",
  name,
  price,
  stores,
  img: img(f),
  discount: "-40%",
  reviews: 95,
  tags: true,
  ...extra,
});
export const nearProducts = [
  N("Velvet Matte Lipstick", 120, 4, "prod-1.jpg"),
  N("Velvet Matte Lipstick", 120, 7, "prod-2.jpg"),
  N("Hydrating Night Serum", 120, 7, "prod-3.jpg", { compareActive: true }),
  N("Hydrating Day Serum", 120, 7, "prod-4.jpg"),
  N("Hydrating Serum", 120, 7, "prod-5.jpg"),
  N("Hydrating Serum", 120, 7, "prod-6.jpg"),
  N("Hydrating Serum", 120, 7, "prod-7.png"),
  N("Hydrating Serum", 120, 7, "prod-8.png"),
];

export const slug = (n) => n.toLowerCase().replace(/\s+/g, "-");

export const onlineStoresList = [
  {
    name: "Luxe Beauty",
    site: "www.luxebeauty.com",
    rating: 98,
    products: 850,
    perk: "Free delivery over 100 SAR",
    img: img("store-white.png"),
    badge: "Official Seller",
  },
  {
    name: "Sephora",
    site: "www.sephora.sa",
    rating: 200,
    products: 5000,
    perk: "Same-day delivery in Riyadh",
    img: img("store-sephora.png"),
    badge: "Top Rated",
  },
  {
    name: "Glam Bar",
    site: "www.glambar.com",
    rating: 92,
    products: 1200,
    perk: "Express 24h shipping",
    img: img("store-mgouna.png"),
    badge: "Trending Store",
  },
  {
    name: "Ela De Pure",
    site: "www.eladepure.com",
    rating: 94,
    products: 340,
    perk: "Clean & organic certified",
    img: img("store-ela.png"),
    badge: "Eco Certified",
  },
  {
    name: "Fair Glow",
    site: "www.fairglow.com",
    rating: 110,
    products: 620,
    perk: "15% off first app order",
    img: img("store-face.png"),
    badge: "Special Deals",
  },
  {
    name: "Shoppee Hub",
    site: "www.shoppeehub.com",
    rating: 89,
    products: 940,
    perk: "Free 14-day hassle-free returns",
    img: img("store-white.png"),
    badge: "Verified Market",
  },
];

const ON = (name, price, originalPrice, store, site, f, extra = {}) => ({
  name,
  price,
  originalPrice,
  store,
  site,
  img: img(f),
  discount: extra.discount || "-30%",
  reviews: extra.reviews || 128,
  rating: extra.rating || 4.9,
  shipping: extra.shipping || "Free Shipping",
  deliveryTime: extra.deliveryTime || "1-2 Days",
  tag: extra.tag || "Online Deal",
  category: extra.category || "Makeup",
  inStock: true,
  isOnline: true,
  description:
    extra.description ||
    "Premium luxury formula crafted with nourishing botanical extracts for an effortlessly radiant look.",
  ...extra,
});

export const onlineProducts = [
  ON(
    "Ambre D'Or Luxury Eau de Parfum",
    380,
    520,
    "Sephora Online",
    "www.sephora.sa",
    "online-perfume.jpg",
    {
      category: "Fragrance",
      discount: "-27%",
      tag: "Best Seller",
      reviews: 248,
      rating: 4.9,
      shipping: "Free Express Shipping",
      deliveryTime: "24h Delivery",
      description:
        "An opulent amber and golden vanilla eau de parfum bottled in an exquisite faceted crystal flacon. Long-lasting scent projection with noble woods.",
    },
  ),
  ON(
    "Aurélia Luminous Matte Foundation SPF 20",
    195,
    260,
    "Luxe Beauty",
    "www.luxebeauty.com",
    "online-foundation.jpg",
    {
      category: "Makeup",
      discount: "-25%",
      tag: "Official Store",
      reviews: 185,
      rating: 4.8,
      shipping: "Free Shipping",
      deliveryTime: "1-2 Days",
      description:
        "Velvety seamless coverage that controls shine while preserving natural luminosity. Infused with SPF 20 sun defense and hyaluronic beads.",
    },
  ),
  ON(
    "Aurora Sunset 9-Shade Eyeshadow Palette",
    165,
    240,
    "Glam Bar",
    "www.glambar.com",
    "online-palette.jpg",
    {
      category: "Makeup",
      discount: "-31%",
      tag: "Online Exclusive",
      reviews: 142,
      rating: 4.9,
      shipping: "Free Shipping",
      deliveryTime: "2 Days",
      description:
        "Nine ultra-pigmented buttery shades from warm terracotta mattes to dazzling rose gold duochrome toppers for day to evening looks.",
    },
  ),
  ON(
    "Velvet Infusion Whipped Moisturizer Cream",
    145,
    210,
    "Ela De Pure",
    "www.eladepure.com",
    "online-cream.jpg",
    {
      category: "Skincare",
      discount: "-31%",
      tag: "Clean Beauty",
      reviews: 196,
      rating: 5.0,
      shipping: "Free Shipping",
      deliveryTime: "1-2 Days",
      description:
        "Deeply replenishing whipped cream moisturizer packed with plant ceramides, eucalyptus water, and squalane for 48-hour moisture barrier support.",
    },
  ),
  ON(
    "Rouge Beauté Velvet Matte Lipstick",
    95,
    140,
    "Fair Glow",
    "www.fairglow.com",
    "prod-1.jpg",
    {
      category: "Lipstick",
      discount: "-32%",
      tag: "Trending",
      reviews: 310,
      rating: 4.9,
      shipping: "Free Shipping over 100 SAR",
      deliveryTime: "1-2 Days",
      description:
        "Rich true red velvet lipstick with a non-drying weightless matte texture and up to 12 hours of transfer-resistant wear.",
    },
  ),
  ON(
    "Aura Luna Golden Satin Lipstick",
    110,
    165,
    "Shoppee Hub",
    "www.shoppeehub.com",
    "prod-2.jpg",
    {
      category: "Lipstick",
      discount: "-33%",
      tag: "Limited Edition",
      reviews: 120,
      rating: 4.8,
      shipping: "Free Delivery",
      deliveryTime: "2 Days",
      description:
        "Luxurious burgundy satin lipstick housed in an embossed matte black and gold magnetic case. Nourishing formula with argan oil.",
    },
  ),
  ON(
    "Aurora Pure Radiance Glow Serum 30ml",
    135,
    190,
    "Luxe Beauty",
    "www.luxebeauty.com",
    "prod-3.jpg",
    {
      category: "Skincare",
      discount: "-29%",
      tag: "Top Rated",
      reviews: 275,
      rating: 4.9,
      shipping: "Free Express Shipping",
      deliveryTime: "24h Delivery",
      description:
        "Potent radiance elixir combining golden botanical oils and peptides to illuminate tired skin and soften fine dehydration lines.",
    },
  ),
  ON(
    "Luna Beauté Hyaluronic Hydrating Serum",
    125,
    180,
    "Sephora Online",
    "www.sephora.sa",
    "prod-4.jpg",
    {
      category: "Skincare",
      discount: "-30%",
      tag: "Best Price",
      reviews: 154,
      rating: 4.7,
      shipping: "Free Shipping",
      deliveryTime: "1-2 Days",
      description:
        "Triple-weight hyaluronic acid serum paired with French neroli water for instant plumping hydration and silky smooth skin feel.",
    },
  ),
  ON(
    "Luminia Botanical Radiance Dropper",
    140,
    200,
    "Glam Bar",
    "www.glambar.com",
    "prod-5.jpg",
    {
      category: "Skincare",
      discount: "-30%",
      tag: "Dermatologist Tested",
      reviews: 98,
      rating: 4.8,
      shipping: "Free Delivery",
      deliveryTime: "2 Days",
      description:
        "Concentrated clinical brightening solution featuring 10% niacinamide and botanical extracts to minimize pores and even out tone.",
    },
  ),
  ON(
    "Orange Botanicals Vitamin C Radiance Duo",
    210,
    310,
    "Ela De Pure",
    "www.eladepure.com",
    "prod-6.jpg",
    {
      category: "Skincare",
      discount: "-32%",
      tag: "Best Value Set",
      reviews: 215,
      rating: 4.9,
      shipping: "Free Express Shipping",
      deliveryTime: "24h Delivery",
      description:
        "Complete citrus glow regimen with stabilized Vitamin C serum, nourishing seed booster oil, and brightening daily moisturizer.",
    },
  ),
];
