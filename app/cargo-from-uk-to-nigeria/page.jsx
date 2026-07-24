// app/cargo-from-uk-to-nigeria/page.jsx
// URL: https://r-zoneenterprises.com/cargo-from-uk-to-nigeria
// ─────────────────────────────────────────────────────────────────────────────
// Commercial money page for the head term "cargo from UK to Nigeria", rendered
// with the SAME blog-post design (ArticleReader) as every /blog article, so it
// gets the identical hero, table of contents, sections, FAQ accordion, CTA and
// related-articles layout. Server component: owns SEO metadata + JSON-LD and
// passes an inline article object to the client reader.
// Copy intentionally avoids em/en dashes.
// ─────────────────────────────────────────────────────────────────────────────

import ArticleReader from "../blog/[slug]/ArticleReader";
import { SITE_URL, ORGANIZATION_SCHEMA, getRelatedArticles } from "../../lib/articles";

const CANONICAL = "https://r-zoneenterprises.com/cargo-from-uk-to-nigeria";
const HERO_IMG =
  "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1400&q=80&auto=format&fit=crop";
const OG_IMG =
  "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=1200&q=85&auto=format&fit=crop";

const article = {
  id: -1,
  slug: "cargo-from-uk-to-nigeria",
  category: "guides",
  canonicalUrl: CANONICAL,
  wordCount: 1600,

  metaTitle:
    "Cargo from UK to Nigeria 2026 | Door to Door, Air & Sea Freight from £3/kg",
  metaDesc:
    "Send cargo from the UK to Nigeria from £3/kg. Door to door collection and delivery, air freight (5 to 10 days) and sea freight (4 to 6 weeks) to Lagos, Abuja, Port Harcourt and every state. Cheap all inclusive prices, weekly departures, 107+ five star reviews. Free same day quote.",
  keywords: [
    "cargo from UK to Nigeria",
    "cargo to Nigeria from UK",
    "door to door shipping from UK to Nigeria",
    "air freight from UK to Nigeria",
    "sea freight from UK to Nigeria",
    "cheap cargo to Nigeria",
    "cheapest cargo from UK to Nigeria",
    "shipping to Nigeria from UK",
    "send cargo to Nigeria",
    "cargo company UK to Nigeria",
    "cargo prices UK to Nigeria",
  ],
  ogImage: OG_IMG,
  datePublished: "2026-07-24",
  dateModified: "2026-07-24",

  title: "Cargo from the UK to Nigeria in 2026: Door to Door, Air, Sea and Cheap Prices",
  excerpt:
    "Send cargo from the UK to Nigeria from £3 per kg. Door to door collection and delivery, air freight and sea freight, cheap all inclusive prices and weekly departures to every state in Nigeria.",
  author: "R-Zone Cargo Team",
  date: "24 July 2026",
  readTime: "8 min read",
  img: HERO_IMG,
  imgAlt: "Container ship loaded with cargo bound from the UK to Nigeria in 2026",
  tags: ["Cargo", "UK to Nigeria", "Door to Door", "Air Freight", "Sea Freight", "Cheap Prices"],

  relatedSlugs: [
    "door-to-door-shipping-uk-to-nigeria",
    "air-freight-uk-to-nigeria",
    "sea-freight-uk-to-nigeria",
  ],

  faqSchema: [
    {
      question: "How much does it cost to send cargo from the UK to Nigeria?",
      answer:
        "Cargo from the UK to Nigeria starts from £3/kg by sea and £5/kg by air with R-Zone; door to door starts from £6/kg. A 20kg box is roughly £60 to £90 by sea or £100 to £160 by air, all inclusive of documentation, transit, Nigeria customs clearance and delivery. There are no hidden fees. The price you are quoted is the price you pay.",
    },
    {
      question: "What is the cheapest way to send cargo to Nigeria from the UK?",
      answer:
        "Sea freight from £3/kg is the cheapest way to send cargo to Nigeria, especially for large or heavy shipments. The saving over air grows with weight, so a 100kg shipment is about £300 to £450 by sea versus £500 to £700 by air. The trade off is time, 4 to 6 weeks by sea versus 5 to 10 working days by air.",
    },
    {
      question: "How long does cargo take to reach Nigeria from the UK?",
      answer:
        "Air freight takes 5 to 10 working days and sea freight takes 4 to 6 weeks, each including UK handling, transit to Lagos, Nigeria customs clearance and final delivery. R-Zone runs weekly air and sea departures, so your cargo joins the next available service.",
    },
    {
      question: "Do you offer door to door cargo to Nigeria?",
      answer:
        "Yes. Door to door means we collect from your UK address and deliver to the recipient door anywhere in Nigeria, with no depot visits. It is available on both air and sea from £6/kg, including UK collection, customs clearance and final mile delivery.",
    },
    {
      question: "Which parts of Nigeria do you deliver to?",
      answer:
        "R-Zone delivers to Lagos, Abuja, Port Harcourt, Ibadan, Kano, Benin City and every state in Nigeria. Delivery to the main cities is included in the standard quote; remote destinations may carry a small onward delivery charge confirmed upfront at booking.",
    },
    {
      question: "Do you handle Nigerian customs clearance?",
      answer:
        "Yes. Every price includes Nigeria customs clearance through Nigeria Customs Service, plus NAFDAC and SON clearance where applicable, handled by our own team in Lagos. Import duty is a separate government charge that most personal use household goods attract little or none of.",
    },
  ],

  content: [
    {
      h: "Cargo from the UK to Nigeria, Made Simple",
      body: "Sending cargo from the UK to Nigeria comes down to a few simple choices: air or sea, drop off or door to door, and how to pack so you are not paying for empty space. Get those right and shipping to Nigeria is straightforward and affordable.\n\nR-Zone Enterprises has been the trusted name in UK to Nigeria cargo since 2012, with over 50,000 shipments delivered, 107+ five star reviews, weekly air and sea departures, and our own teams in the UK and Lagos. The price we quote is the price you pay, with no hidden fees.\n\nThis guide covers everything: cheap prices, door to door, air freight, sea freight, transit times, customs and how to book.",
    },
    {
      h: "Cheap Cargo Prices from the UK to Nigeria (2026)",
      body: "R-Zone offers some of the cheapest all inclusive cargo prices from the UK to Nigeria, with no hidden handling fees, fuel surcharges or surprise charges.\n\n**Sea freight from £3 per kg.** The cheapest option for large or heavy cargo. Transit 4 to 6 weeks.\n\n**Air freight from £5 per kg.** The fastest option. Transit 5 to 10 working days.\n\n**Door to door from £6 per kg.** Includes UK collection and delivery to the recipient door in Nigeria.\n\n**Example, 20kg box from London to Lagos:** sea £60 to £90, air £100 to £160, door to door £120 to £180.\n\nEvery rate covers UK export documentation, transit, Nigeria customs clearance and delivery. You pay for actual or volumetric weight, whichever is greater, so packing densely keeps your price low.",
    },
    {
      h: "Door to Door Shipping from the UK to Nigeria",
      body: "Door to door is the most convenient way to send cargo to Nigeria. We collect from your UK address, home or business, anywhere in the country, and deliver directly to the recipient door in Nigeria. No depot visits, no customs queues. From **£6 per kg**, all inclusive.\n\nThe service covers UK collection, export documentation, air or sea transit, Nigeria customs clearance and final mile delivery, all managed by R-Zone with our own teams in the UK and Lagos.\n\nFor most families and businesses, door to door is worth the small premium over drop off because it removes the two hardest parts of shipping: getting cargo to a UK depot and the recipient collecting it in Nigeria.",
    },
    {
      h: "Air Freight from the UK to Nigeria",
      body: "When speed matters, air freight delivers in **5 to 10 working days** from **£5 per kg**, with weekly departures from Heathrow, Gatwick and Manchester to Lagos.\n\nAir freight is ideal for electronics, phones, documents, medicine, perfumes, fashion and gifts, where speed and security outweigh the higher per kg price. It also avoids the port congestion that can affect sea shipments.\n\nAir freight is charged on actual weight or volumetric weight (length by width by height in cm, divided by 6,000), whichever is greater. A compact, densely packed box always costs less.",
    },
    {
      h: "Sea Freight from the UK to Nigeria",
      body: "Sea freight is the cheapest way to move large or heavy cargo, from **£3 per kg**, with weekly sailings to Lagos (Apapa and Tin Can Island) and a **4 to 6 week** transit.\n\nIt is the right choice for household goods, furniture, bulk food, vehicles, relocations and commercial shipments. Ship as little as a single box (sharing a container) or book a full 20ft or 40ft container for high volume cargo.\n\nSea freight uses a volumetric divisor of 1,000, so a large, light box generates a high volumetric charge. Dense, compact packing is the single biggest lever on your sea freight cost.",
    },
    {
      h: "How to Send Cargo to Nigeria in Four Steps",
      body: "**1. Get a free quote.** Tell us what you are sending, the rough weight and your UK and Nigeria locations. We respond the same day.\n\n**2. We collect or you drop off.** We collect from your UK address for door to door, or you drop off at our depot.\n\n**3. We ship and clear customs.** Air or sea to Lagos, then Nigeria customs clearance by our own Lagos team.\n\n**4. Delivered in Nigeria.** Your cargo reaches the recipient door in Lagos, Abuja, Port Harcourt or any state.",
    },
    {
      h: "Why Send Your Cargo to Nigeria with R-Zone",
      body: "**12+ years of experience.** Shipping UK to Nigeria cargo since 2012, with 50,000+ shipments delivered.\n\n**Transparent, cheap prices.** All inclusive rates from £3 per kg. The price we quote is the price you pay.\n\n**Weekly air and sea departures.** Your cargo never waits. It joins the next available flight or sailing.\n\n**Own teams in the UK and Lagos.** We control collection, customs clearance and delivery from end to end.\n\n**107+ five star reviews.** One of the highest rated UK to Nigeria cargo companies on Google.\n\n**Every state in Nigeria.** Delivery to Lagos, Abuja, Port Harcourt, Ibadan, Kano and beyond.",
    },
    {
      h: "Book Your Cargo to Nigeria Today",
      body: "Every shipment is different, and the most accurate price always comes from a direct quote based on your specific cargo.\n\nTo get your free same day quote, call **+44 (0) 800 772 0864**, WhatsApp **+44 7915 647 119**, or use our online quote form. Tell us what you are sending and where it is going, and we will give you the cheapest way to get it to Nigeria.\n\nWith 12+ years of UK to Nigeria cargo experience, 107+ five star reviews, and our own teams in the UK and Lagos, R-Zone is the most trusted name in UK to Nigeria cargo.",
    },
  ],
};

const related = getRelatedArticles(article.id, article.category, article.relatedSlugs, 3);

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${article.canonicalUrl}#article`,
    headline: article.title,
    description: article.metaDesc,
    image: { "@type": "ImageObject", url: article.ogImage, width: 1200, height: 630 },
    datePublished: article.datePublished,
    dateModified: article.dateModified,
    author: { "@type": "Organization", name: article.author, url: `${SITE_URL}/about` },
    publisher: ORGANIZATION_SCHEMA,
    mainEntityOfPage: { "@type": "WebPage", "@id": article.canonicalUrl },
    keywords: article.keywords.join(", "),
    wordCount: article.wordCount,
    inLanguage: "en-GB",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${article.canonicalUrl}#service`,
    serviceType: "Cargo shipping from the UK to Nigeria",
    name: "Cargo from UK to Nigeria",
    description: article.metaDesc,
    provider: ORGANIZATION_SCHEMA,
    areaServed: [
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "Nigeria" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "UK to Nigeria cargo services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Sea freight UK to Nigeria" }, priceCurrency: "GBP", price: "3" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Air freight UK to Nigeria" }, priceCurrency: "GBP", price: "5" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Door to door cargo UK to Nigeria" }, priceCurrency: "GBP", price: "6" },
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Cargo from UK to Nigeria", item: article.canonicalUrl },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faqSchema.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${article.canonicalUrl}#webpage`,
    url: article.canonicalUrl,
    name: article.title,
    speakable: { "@type": "SpeakableSpecification", cssSelector: ["h1", "h2"] },
  },
  { "@context": "https://schema.org", ...ORGANIZATION_SCHEMA },
];

export const metadata = {
  title: { absolute: article.metaTitle },
  description: article.metaDesc,
  keywords: article.keywords,
  alternates: { canonical: article.canonicalUrl },
  openGraph: {
    type: "article",
    url: article.canonicalUrl,
    title: article.metaTitle,
    description: article.metaDesc,
    siteName: "R-Zone Enterprises",
    images: [{ url: article.ogImage, width: 1200, height: 630, alt: article.imgAlt }],
    publishedTime: article.datePublished,
    modifiedTime: article.dateModified,
    tags: article.tags,
  },
  twitter: { card: "summary_large_image", site: "@RZoneCargo", title: article.metaTitle, description: article.metaDesc, images: [article.ogImage] },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function Page() {
  return (
    <>
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
      <div aria-hidden="true" style={{ position: "absolute", width: "1px", height: "1px", overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap" }}>
        <h1>{article.title}</h1><p>{article.excerpt}</p>
        {article.content.map((s, i) => <div key={i}><h2>{s.h}</h2><p>{s.body.replace(/\*\*(.*?)\*\*/g, "$1")}</p></div>)}
        <h2>Frequently Asked Questions</h2>
        {article.faqSchema.map((f, i) => <div key={i}><h3>{f.question}</h3><p>{f.answer}</p></div>)}
      </div>
      <ArticleReader article={article} related={related} />
    </>
  );
}
