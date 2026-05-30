import type { Metadata } from "next";
import Image from "next/image";
import PageWrapper from "@/components/layout/PageWrapper";
import Hero from "@/components/sections/Hero";
import SectionHeader from "@/components/sections/SectionHeader";
import EmailSignup from "@/components/sections/EmailSignup";
import Badge from "@/components/ui/Badge";

export const metadata: Metadata = {
  title: "Gear",
  description: "The exact bags, tech, and travel gear we use on every trip. Tested on four continents, approved by two kids.",
};

const GEAR_ITEMS = [
  {
    name: "Peak Design 45L Travel Bag",
    category: "Bags",
    price: "$299",
    rating: "5/5",
    summary: "The bag that made one-bag travel a reality for us. Fits in every overhead bin we've tested, including European budget carriers.",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=400&fit=crop",
    affiliateUrl: "#",
  },
  {
    name: "Sony ZV-E10 Camera",
    category: "Camera",
    price: "$548",
    rating: "4/5",
    summary: "Lightweight enough to carry all day, capable enough for all our episode footage. Perfect entry into mirrorless for travel video.",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
    affiliateUrl: "#",
  },
  {
    name: "Anker 100W GaN Charger",
    category: "Tech",
    price: "$56",
    rating: "5/5",
    summary: "One charger, four devices. We replaced every plug-in charger we own with this one brick. Non-negotiable for family travel.",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=600&h=400&fit=crop",
    affiliateUrl: "#",
  },
  {
    name: "Osprey Daylite 13L",
    category: "Bags",
    price: "$65",
    rating: "5/5",
    summary: "Our kids' daily carry. Light, durable, and somehow still standing after three years of being dragged through cobblestone streets.",
    image: "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=600&h=400&fit=crop",
    affiliateUrl: "#",
  },
  {
    name: "eSIM — Airalo",
    category: "Connectivity",
    price: "From $5",
    rating: "4/5",
    summary: "We haven't bought a physical SIM card in two years. Airalo works in 190+ countries and installs in under five minutes.",
    image: "https://images.unsplash.com/photo-1512428813834-c702c7702b78?w=600&h=400&fit=crop",
    affiliateUrl: "#",
  },
  {
    name: "Away Bigger Carry-On",
    category: "Bags",
    price: "$245",
    rating: "4/5",
    summary: "When one-bag isn't enough. The built-in battery is genuinely useful and the hard shell has survived every checked-luggage disaster.",
    image: "https://images.unsplash.com/photo-1565026057447-bc90a3dceb87?w=600&h=400&fit=crop",
    affiliateUrl: "#",
  },
  {
    name: "DJI Osmo Pocket 3",
    category: "Camera",
    price: "$519",
    rating: "5/5",
    summary: "Our secret weapon for smooth, cinematic footage without a gimbal setup. The 1-inch sensor is overkill in the best way — we use this for 80% of our walking shots.",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/c2/DJI_Osmo_Pocket.jpg",
    affiliateUrl: "#",
  },
  {
    name: "SanDisk Extreme 512GB",
    category: "Tech",
    price: "$65",
    rating: "5/5",
    summary: "We shoot a lot of footage. A lot. The SanDisk Extreme handles 4K video without breaking a sweat and we've never had a card failure — knock on wood.",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Sandisk_Extreme_SD-Card.jpg",
    affiliateUrl: "#",
  },
  {
    name: "GoPro Hero 4",
    category: "Camera",
    price: "Used ~$80",
    rating: "4/5",
    summary: "Yes, it's old. No, we won't replace it. Strapped to the kids' helmets in Greece, dunked in the Adriatic, dragged through airport security 40+ times — still going. Sometimes durability beats specs.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2f/GoPro_Hero_4_Black.jpg",
    affiliateUrl: "#",
  },
  {
    name: "Canon G7X Mark II",
    category: "Camera",
    price: "$629",
    rating: "4/5",
    summary: "The flip screen sold us. Vlogging with kids requires holding the camera at weird angles in cramped spaces — the G7X handles it all with a form factor that doesn't scream 'tourist'.",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/64/Canon_Powershot_G7_X.jpg",
    affiliateUrl: "#",
  },
];

const CATEGORIES = ["All", "Camera", "Bags", "Tech", "Connectivity", "Kids Gear"];

export default function GearPage() {
  return (
    <PageWrapper>
      <Hero
        eyebrow="What We Actually Use"
        headline="Our Gear"
        subheadline="Tested on four continents, approved by two kids. This is every piece of gear that made the cut — and why."
        backgroundImage="https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=1600&h=900&fit=crop"
      />

      <section className="bg-warm-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <SectionHeader
            eyebrow="Gear Guide"
            headline="Everything We Carry"
            subtext="Affiliate links help keep the lights on. We only list gear we've actually used and would buy again."
            className="mb-12"
          />

          {/* Category filters */}
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <button
                key={cat}
                className={`border px-4 py-2 font-sans text-sm tracking-wide transition-colors ${
                  i === 0
                    ? "border-ink bg-ink text-warm-white"
                    : "border-mist text-ink/60 hover:border-earth hover:text-ink"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {GEAR_ITEMS.map((item) => (
              <div key={item.name} className="group flex flex-col">
                <div className="relative aspect-[3/2] overflow-hidden bg-mist">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="mt-4 flex flex-1 flex-col space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="default">{item.category}</Badge>
                    <span className="font-sans text-xs text-ink/40">{item.rating} ★</span>
                  </div>
                  <h3 className="font-serif text-xl font-bold italic text-ink">{item.name}</h3>
                  <p className="font-sans text-sm leading-relaxed text-ink/55">{item.summary}</p>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <span className="font-sans text-sm font-medium text-ocean">{item.price}</span>
                    <a
                      href={item.affiliateUrl}
                      className="font-sans text-xs tracking-widest text-earth uppercase hover:text-ink transition-colors"
                    >
                      Shop →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EmailSignup />
    </PageWrapper>
  );
}
