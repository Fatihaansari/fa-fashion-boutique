import hero from "@/assets/hero.jpg";
import whiteShirt from "@/assets/white-oversized-shirt.jpg";
import blackJeans from "@/assets/black-wide-leg-jeans.jpg";
import creamBlouse from "@/assets/cream-puff-blouse.jpg";
import beigeTrousers from "@/assets/beige-wide-leg-trousers.jpg";
import knitSet from "@/assets/oatmeal-knit-set.jpg";
import sageDress from "@/assets/sage-satin-midi-dress.jpg";
import camelTrench from "@/assets/camel-trench-coat.jpg";

export const heroImage = hero;

export type CategorySlug = "tops" | "bottoms" | "dresses" | "sets" | "outerwear";

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
  dresses: "Dresses",
  sets: "Co-ord Sets",
  outerwear: "Outerwear",
};

export const categories: { slug: CategorySlug; label: string; image: string; blurb: string }[] = [
  {
    slug: "tops",
    label: "Tops",
    image: whiteShirt,
    blurb: "Crisp shirting, soft blouses",
  },
  {
    slug: "bottoms",
    label: "Bottoms",
    image: blackJeans,
    blurb: "Wide-leg jeans & tailored trousers",
  },
  {
    slug: "dresses",
    label: "Dresses",
    image: sageDress,
    blurb: "Fluid satin & occasion-ready",
  },
  {
    slug: "sets",
    label: "Co-ord Sets",
    image: knitSet,
    blurb: "Matching knits, styled for you",
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
    image: whiteShirt,
    badge: "Signature",
    featured: true,
    description:
      "The shirt that built the brand. Cut from crisp breathable cotton with dropped shoulders, a curved shirttail hem and cuffs that roll beautifully — designed to be worn oversized and lived in.",
    details: [
      "100% breathable cotton poplin",
      "Relaxed oversized fit — size down for a classic fit",
      "Drop shoulders, rolled cuffs, curved hem",
      "Model is 5'7\" wearing size S",
    ],
    colors: [
      { name: "White", hex: "#fbfaf6" },
      { name: "Black", hex: "#1d1b18" },
      { name: "Beige", hex: "#d9c9b2" },
    ],
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
      "High-waisted, washed-black and dramatically wide. A structured rigid denim that holds its shape from waist to floor-length hem — the pair every outfit needs.",
    details: [
      "Rigid non-stretch denim, washed black",
      "High rise with button fly",
      "Wide leg, floor-grazing length",
      "Model is 5'7\" wearing size S",
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
    slug: "oatmeal-ribbed-knit-set",
    name: "Oatmeal Ribbed Knit Set",
    category: "sets",
    price: 5290,
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
    slug: "sage-satin-midi-dress",
    name: "Sage Satin Midi Dress",
    category: "dresses",
    price: 4790,
    featured: true,
    description:
      "Liquid-soft satin in a muted sage, cut on the bias with a cowl neckline and delicate straps. Skims the body and pools just right at the midi hem.",
    details: [
      "Soft drapey satin fabric",
      "Cowl neck, adjustable thin straps",
      "Bias cut, midi length",
      "Fully lined at the bodice",
    ],
    colors: [
      { name: "Sage", hex: "#a9b49a" },
      { name: "Champagne", hex: "#e4d5bd" },
      { name: "Noir", hex: "#1d1b18" },
    ],
    sizes: APPAREL_SIZES,
  },
  {
    slug: "camel-trench-coat",
    name: "The Camel Trench",
    category: "outerwear",
    price: 8490,
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
