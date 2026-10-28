import beigeTrousers from "@/assets/beige-wide-leg-trousers.jpg";
import blackJeans from "@/assets/black-wide-leg-jeans.jpg";
import camelTrench from "@/assets/camel-trench-coat.jpg";
import creamBlouse from "@/assets/cream-puff-blouse.jpg";
import knitSet from "@/assets/oatmeal-knit-set.jpg";
import whiteShirtLook from "@/assets/look-white-shirt-jeans.jpg.asset.json";
import maroonShirt from "@/assets/shirt-maroon-oversized.jpg.asset.json";
import setButterflyBlue from "@/assets/set-butterfly-blue.jpg.asset.json";
import setButterflyWhite from "@/assets/set-butterfly-white.jpg.asset.json";
import setPlanetPink from "@/assets/set-planet-pink.jpg.asset.json";
import setFearlessMustard from "@/assets/set-fearless-mustard.jpg.asset.json";
import setMmnfLilac from "@/assets/set-mmnf-lilac.jpg.asset.json";
import skirtWashedDenim from "@/assets/skirt-washed-denim.jpg.asset.json";

export const heroImage = whiteShirtLook.url;

export type CategorySlug = "tops" | "bottoms" | "sets" | "outerwear";

export type ColorOption = { name: string; hex: string };

export type Product = {
  slug: string;
  name: string;
  category: CategorySlug;
  price: number;
  image: string;
  description: string;
  details: string[];
  colors: ColorOption[];
  sizes: string[];
  featured?: boolean;
  badge?: string;
};

export const categoryLabels: Record<CategorySlug, string> = {
  tops: "Tops",
  bottoms: "Bottoms",
  sets: "Co-ord Sets",
  outerwear: "Outerwear",
};

export const categories: { slug: CategorySlug; label: string; image: string; blurb: string }[] = [
  {
    slug: "tops",
    label: "Tops",
    image: maroonShirt.url,
    blurb: "Oversized shirting & soft blouses",
  },
  {
    slug: "bottoms",
    label: "Bottoms",
    image: blackJeans,
    blurb: "Wide-leg jeans, trousers & skirts",
  },
  {
    slug: "sets",
    label: "Co-ord Sets",
    image: setButterflyBlue.url,
    blurb: "Matching tee & trouser sets",
  },
  {
    slug: "outerwear",
    label: "Outerwear",
    image: camelTrench,
    blurb: "Layers that finish the look",
  },
];

const APPAREL_SIZES = ["XS", "S", "M", "L", "XL"];

export const products: Product[] = [
  {
    slug: "the-essential-oversized-shirt",
    name: "The Essential Oversized Shirt",
    category: "tops",
    price: 3290,
    image: whiteShirtLook.url,
    badge: "Signature",
    featured: true,
    description:
      "The shirt that built the brand. Cut oversized with dropped shoulders, a curved shirttail hem and cuffed sleeves — worn here with our washed-black wide-leg jeans, exactly as seen on the feed.",
    details: [
      "Crisp oversized button-down shirt",
      "Relaxed oversized fit — size down for a classic fit",
      "Drop shoulders, rolled cuffs, curved hem",
      "Wear it buttoned, open over a tee, or belted",
    ],
    colors: [
      { name: "White", hex: "#fbfaf6" },
      { name: "Maroon", hex: "#6d1f2c" },
      { name: "Black", hex: "#1d1b18" },
    ],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "maroon-oversized-shirt",
    name: "The Maroon Oversized Shirt",
    category: "tops",
    price: 3590,
    image: maroonShirt.url,
    badge: "New In",
    description:
      "A deep maroon take on the signature shirt. Full button-down with an easy drape, curved shirttail hem and sleeves that cuff beautifully — pairs effortlessly with washed-black denim.",
    details: [
      "Rich maroon woven fabric",
      "Relaxed oversized fit",
      "Full button placket, curved hem",
      "Style it with our wide-leg jeans like the feed",
    ],
    colors: [{ name: "Maroon", hex: "#6d1f2c" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "noir-wide-leg-jeans",
    name: "Noir Wide-Leg Jeans",
    category: "bottoms",
    price: 4490,
    image: blackJeans,
    badge: "Bestseller",
    featured: true,
    description:
      "High-waisted, washed-black and dramatically wide. Structured denim that holds its shape from waist to floor-length hem — the pair every outfit needs.",
    details: [
      "Structured denim, washed black",
      "High rise with button fly",
      "Wide leg, floor-grazing length",
      "Pairs with every top in the collection",
    ],
    colors: [
      { name: "Washed Black", hex: "#2b2926" },
      { name: "Indigo", hex: "#37455c" },
    ],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "camille-puff-sleeve-blouse",
    name: "Camille Puff-Sleeve Blouse",
    category: "tops",
    price: 3190,
    image: creamBlouse,
    featured: true,
    description:
      "Voluminous gathered sleeves balanced by a soft V neckline and a nipped-in body. In a fluid ivory fabric that moves from desk to dinner without a wrinkle.",
    details: [
      "Lightweight woven fabric in ivory",
      "Puff sleeves with buttoned cuffs",
      "Half button placket, soft V neck",
      "Pairs perfectly with wide-leg bottoms",
    ],
    colors: [
      { name: "Ivory", hex: "#f2ead9" },
      { name: "Black", hex: "#1d1b18" },
    ],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "pleated-wide-leg-trousers",
    name: "Pleated Wide-Leg Trousers",
    category: "bottoms",
    price: 3990,
    image: beigeTrousers,
    description:
      "Tailored in a soft beige suiting fabric with a pressed front pleat, deep pockets and a fluid wide leg. The most versatile trouser in the collection.",
    details: [
      "Soft tailored suiting fabric",
      "High rise, front pleat, side pockets",
      "Wide leg with clean floor-length finish",
      "Model is 5'7\" wearing size S",
    ],
    colors: [
      { name: "Beige", hex: "#d5c5ab" },
      { name: "Charcoal", hex: "#3a3835" },
    ],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "washed-denim-maxi-skirt",
    name: "Washed Denim Maxi Skirt",
    category: "bottoms",
    price: 4290,
    image: skirtWashedDenim.url,
    badge: "New In",
    description:
      "An A-line maxi skirt in soft washed blue denim with a centre-front seam, high waist and side pockets — the midi-maxi piece styled everywhere this season.",
    details: [
      "Washed blue denim",
      "High waist, A-line silhouette",
      "Centre-front seam, side pockets",
      "Ankle-grazing maxi length",
    ],
    colors: [{ name: "Washed Blue", hex: "#8ba3b5" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "oatmeal-ribbed-knit-set",
    name: "Oatmeal Ribbed Knit Set",
    category: "sets",
    price: 5290,
    image: knitSet,
    badge: "New In",
    description:
      "A two-piece moment: short-sleeve ribbed top and matching A-line midi skirt in a cozy oatmeal knit. Wear together or split across the week.",
    details: [
      "Soft ribbed knit in oatmeal",
      "Top: crew neck, short sleeve, slightly cropped",
      "Skirt: high-waist A-line, midi length",
      "Sold as a two-piece set",
    ],
    colors: [{ name: "Oatmeal", hex: "#d9cfbe" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "butterfly-tee-set-sky",
    name: "Butterfly Tee Set — Sky Blue",
    category: "sets",
    price: 4690,
    image: setButterflyBlue.url,
    badge: "New In",
    featured: true,
    description:
      "A relaxed sky-blue tee with butterfly embroidery, styled with black wide-leg pull-on pants and a drawstring waist. The two-piece our feed can't stop wearing.",
    details: [
      "Soft cotton-blend tee in sky blue",
      "Butterfly embroidery at the chest",
      "Black wide-leg pants, elastic drawstring waist",
      "Sold as a two-piece set",
    ],
    colors: [{ name: "Sky Blue", hex: "#4db3e6" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "butterfly-tee-set-white",
    name: "Butterfly Tee Set — White",
    category: "sets",
    price: 4690,
    image: setButterflyWhite.url,
    description:
      "The white version of the butterfly moment: oversized tee with embroidered detailing over black wide-leg pants. Effortless, matching, done.",
    details: [
      "Soft cotton-blend tee in white",
      "Butterfly embroidery at the chest",
      "Black wide-leg pants, elastic drawstring waist",
      "Sold as a two-piece set",
    ],
    colors: [{ name: "White", hex: "#fbfaf6" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "planet-graphic-tee-set-pink",
    name: "Planet Graphic Tee Set — Pink",
    category: "sets",
    price: 4490,
    image: setPlanetPink.url,
    description:
      "Baby-pink tee with a lined planet-and-stars print, paired with flowing black wide-leg pants. Comfortable enough for class, cute enough for the feed.",
    details: [
      "Baby-pink cotton-blend tee",
      "Planet & stars print",
      "Black wide-leg pants, drawstring waist",
      "Sold as a two-piece set",
    ],
    colors: [{ name: "Baby Pink", hex: "#eab6c4" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "fearless-graphic-tee-set-mustard",
    name: "Fearless Graphic Tee Set — Mustard",
    category: "sets",
    price: 4490,
    image: setFearlessMustard.url,
    description:
      "A bold mustard tee with boxed 'Be Fearless, Be Strong, Be You' print over black wide-leg pants. The statement set that does the talking for you.",
    details: [
      "Mustard cotton-blend tee",
      "Boxed slogan print",
      "Black wide-leg pants, drawstring waist",
      "Sold as a two-piece set",
    ],
    colors: [{ name: "Mustard", hex: "#d9a514" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "statement-graphic-tee-set-lilac",
    name: "Statement Graphic Tee Set — Lilac",
    category: "sets",
    price: 4490,
    image: setMmnfLilac.url,
    badge: "New In",
    featured: true,
    description:
      "A lilac oversized tee with the 'Make Money Not Friends' print, matched with black wide-leg pants. Soft colour, sharp attitude.",
    details: [
      "Lilac cotton-blend tee",
      "Oversized fit with graphic print",
      "Black wide-leg pants, drawstring waist",
      "Sold as a two-piece set",
    ],
    colors: [{ name: "Lilac", hex: "#c9a8e0" }],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "camel-trench-coat",
    name: "The Camel Trench",
    category: "outerwear",
    price: 8490,
    image: camelTrench,
    description:
      "The finishing layer. A classic double-breasted trench in warm camel with storm flap, buckled cuffs and a detachable belt — cut long and clean.",
    details: [
      "Structured cotton-gabardine feel",
      "Double-breasted with horn-look buttons",
      "Storm flap, buckled cuffs, belted waist",
      "Midi length, fully lined",
    ],
    colors: [
      { name: "Camel", hex: "#c4a57b" },
      { name: "Black", hex: "#1d1b18" },
    ],
    sizes: APPAREL_SIZES,
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getFeatured(): Product[] {
  return products.filter((p) => p.featured);
}

export function byCategory(slug: CategorySlug): Product[] {
  return products.filter((p) => p.category === slug);
}

export function related(product: Product, count = 4): Product[] {
  const sameCategory = products.filter((p) => p.slug !== product.slug && p.category === product.category);
  const rest = products.filter((p) => p.slug !== product.slug && p.category !== product.category);
  return [...sameCategory, ...rest].slice(0, count);
}
