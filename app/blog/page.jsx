"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useMemo, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronRight, Clock, BookOpen, Package,
  Globe, FileCheck, Zap, Star, Mail, ChevronDown,
  X, Calendar, User, TrendingUp, Search,
  ArrowLeft, Share2, Copy, Check, CheckCircle,
  AlertCircle, Loader2, Send, Link2,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// ─── Categories ───────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: "all",     label: "All Posts",       icon: BookOpen,  color: "#0818A8" },
  { id: "guides",  label: "Shipping Guides", icon: Package,   color: "#1F51FF" },
  { id: "customs", label: "Customs & Duty",  icon: FileCheck, color: "#0437F2" },
  { id: "news",    label: "Industry News",   icon: Globe,     color: "#0818A8" },
  { id: "updates", label: "R-Zone Updates",  icon: Zap,       color: "#1F51FF" },
  { id: "tips",    label: "Expert Tips",     icon: Star,      color: "#0437F2" },
];

// ─── Articles (all 2026 dates) ────────────────────────────────────────────────
const ARTICLES = [
  // ── FEATURED ────────────────────────────────────────────────────────────────
  {
    id: 1,
    slug: "air-freight-vs-sea-freight-ultimate-guide",
    category: "guides",
    featured: true,
    title: "Air Freight vs Sea Freight: The Ultimate UK–Nigeria Decision Guide",
    excerpt: "Not sure whether to fly or sail your cargo to Nigeria? We break down transit times, cost differences, cargo restrictions, and exactly when each method makes financial sense for your situation.",
    author: "R-Zone Operations Team",
    date: "14 April 2026",
    readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Cargo aircraft at London Heathrow for Nigeria air freight",
    tags: ["Air Freight", "Sea Freight", "Cost Comparison"],
    content: [
      { h: "The Core Question: Speed vs Cost", body: "When shipping from the UK to Nigeria, the single most important decision you will make is whether to use air freight or sea freight. This choice affects your delivery timeline, your total cost, what items you can send, and how your cargo is handled from end to end.\n\nR-Zone Enterprises has been facilitating UK–Nigeria cargo since 2012. In that time we have helped over 10,000 customers make this exact decision — and the right answer always depends on three things: your urgency, your volume, and what you are sending." },
      { h: "Air Freight to Nigeria: What You Need to Know", body: "Air freight is the fastest way to get cargo from the UK to Nigeria. At R-Zone, our air freight service operates three times weekly — Monday, Wednesday and Friday — from London Heathrow, Gatwick and Manchester.\n\nTransit time is 5–10 working days. Your cargo is consolidated, palletised, and loaded onto scheduled flights operated by our airline partners. Once it lands at Lagos Murtala Muhammed International Airport (LOS) or Abuja Nnamdi Azikiwe Airport (ABV), our Lagos team clears it through customs and arranges last-mile delivery.\n\nAir freight starts from £5 per kg. For heavier shipments over 250kg, the rate drops to £5.00/kg. Smaller parcels of 1–10kg are charged at £7.50/kg. The rate is always applied to the greater of actual weight or volumetric weight (length × width × height ÷ 6,000 for air).\n\nBest for: time-sensitive shipments, documents, electronics, clothing, smaller parcels, and anything that needs to arrive within two weeks." },
      { h: "Sea Freight to Nigeria: What You Need to Know", body: "Sea freight is the most cost-effective way to ship large, heavy, or bulky cargo from the UK to Nigeria. R-Zone operates weekly sea freight sailings from UK ports to Apapa and Tin Can Island in Lagos.\n\nTransit time is 4–6 weeks. Your cargo is consolidated into a shared container (LCL — Less than Container Load) alongside other customers' goods, or loaded into a dedicated full container (FCL — Full Container Load) for larger volumes. At the Lagos port, our customs team handles NCS clearance and arranges delivery.\n\nSea freight starts from £3 per kg. For shipments between 1–50kg the rate is £4.50/kg; for 251–500kg it drops to £3.20/kg; and for containers above 1 tonne, we quote a bespoke rate. Volumetric weight for sea is length × width × height ÷ 1,000.\n\nBest for: household goods, furniture, large appliances, clothing in bulk, foodstuffs, commercial merchandise, and anything where cost is more important than speed." },
      { h: "Head-to-Head Comparison", body: "Here is how air and sea freight compare across the most important factors:\n\nSpeed — Air: 5–10 working days. Sea: 4–6 weeks.\nCost — Air: from £5/kg. Sea: from £3/kg.\nMinimum weight — Air: no minimum. Sea: 5kg minimum charge.\nVolumetric formula — Air: ÷ 6,000. Sea: ÷ 1,000.\nBest cargo size — Air: smaller, lighter shipments. Sea: large, heavy, or bulky.\nVehicles — Air: not possible. Sea: yes, via RoRo.\nFoodstuffs — Air: yes, 20kg minimum. Sea: yes, 2 bags minimum.\nTracking — Both: real-time tracking included.\nCustoms clearance — Both: included in R-Zone pricing." },
      { h: "When to Choose Air Freight", body: "Choose air freight when time matters more than money. If your recipient in Nigeria needs the goods within two weeks, air is your only realistic option.\n\nAir freight is also the better choice for high-value items where the cost of delay outweighs the premium of flying. If you are sending electronics, medicine, documents, or business-critical components, the extra cost per kg is usually justified by the speed and reliability.\n\nFor smaller shipments — anything under 50kg — air freight often works out similarly priced to sea freight once you factor in the time value of the goods sitting in transit for 4–6 weeks." },
      { h: "When to Choose Sea Freight", body: "Choose sea freight when volume is high and you can plan ahead. Sea freight is dramatically cheaper for large shipments — if you are sending 200kg or more, the cost saving over air freight can be substantial.\n\nSea freight is also the standard choice for household moves, vehicle shipping (via RoRo), and commercial merchandise. If you are importing goods to sell in Nigeria, the margins on sea freight make commercial sense in a way that air freight often does not.\n\nThe key requirement for sea freight is lead time. With 4–6 weeks in transit, you need to plan your shipments at least 6–8 weeks before your goods are needed in Nigeria." },
      { h: "Get a Quote from R-Zone", body: "Not sure which service suits your shipment? Contact our UK team on +44 (0) 800 772 0864 or WhatsApp +44 7915 647 119. We will assess your cargo — weight, dimensions, type of goods, and delivery deadline — and recommend the most cost-effective option. Free quote, same-day response, no obligation." },
    ],
  },

  // ── UK TO LAGOS — NEW SEO ARTICLE ──────────────────────────────────────────
  {
    id: 11,
    slug: "uk-to-lagos-cargo-complete-guide",
    category: "guides",
    featured: false,
    title: "UK to Lagos Cargo: The Complete 2026 Guide to Shipping from the UK to Lagos, Nigeria",
    excerpt: "Everything you need to know about shipping cargo from the United Kingdom to Lagos. Transit times, prices, customs, what to send, and how R-Zone makes it fast, affordable and completely stress-free.",
    author: "R-Zone Operations Team",
    date: "15 April 2026",
    readTime: "12 min read",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "UK to Lagos cargo shipping — R-Zone weekly air and sea freight service",
    tags: ["UK to Lagos", "Lagos Cargo", "Nigeria Shipping"],
    content: [
      { h: "Why Thousands of People Ship from the UK to Lagos Every Week", body: "Lagos is Nigeria's commercial capital and Africa's largest city — a metropolis of over 15 million people that serves as the economic engine of the entire continent. For the more than one million Nigerians living in the United Kingdom, Lagos is home: where family lives, where businesses operate, and where cultural ties run deepest.\n\nEvery week, thousands of people in the UK search for ways to ship cargo to Lagos. Some are sending household goods, clothing and gifts to family. Others are running cross-border businesses, importing goods for sale or supply chains. Many are returning residents relocating their belongings. Whatever the reason, the core questions are always the same: how do I ship to Lagos, how long will it take, and how much will it cost?\n\nR-Zone Enterprises has been answering those questions since 2012. We are the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — 107+ five-star reviews earned organically, over 50,000 shipments delivered, and a dedicated team managing both ends of the UK–Lagos corridor." },
      { h: "Air Freight from the UK to Lagos", body: "Air freight is the fastest way to send cargo from the UK to Lagos. At R-Zone, we operate weekly air freight departures three times per week — Monday, Wednesday and Friday — from London Heathrow (LHR), Gatwick (LGW) and Manchester (MAN).\n\nYour cargo arrives at Lagos Murtala Muhammed International Airport (LOS) within 5–10 working days of us receiving it at our Upminster, Essex warehouse. Once it lands, our Lagos team handles all Nigeria Customs Service (NCS) clearance and arranges door delivery to your Lagos address or any of Nigeria's 36 states.\n\nAir freight from the UK to Lagos starts from £5 per kg. Rates are calculated on actual weight or volumetric weight (L × W × H in cm ÷ 6,000), whichever is greater. There are no hidden fees — the price you are quoted includes UK export documentation, airline consolidation, Lagos airport handling, customs clearance and standard delivery." },
      { h: "Sea Freight from the UK to Lagos", body: "Sea freight is the most affordable way to ship larger or heavier cargo from the UK to Lagos. R-Zone operates weekly sea freight sailings from UK ports to Apapa Port and Tin Can Island, Lagos — the two major container terminals serving the city.\n\nTransit time is 4–6 weeks. Your cargo is consolidated into a shared container (LCL — Less than Container Load) alongside other shipments, or shipped in a full dedicated container (FCL) for larger volumes. At the Lagos port, our customs team manages all NCS clearance, port handling, and onward delivery.\n\nSea freight from the UK to Lagos starts from £3 per kg — making it the cheapest way to ship bulky or heavy goods. For vehicle shipping (cars, trucks, motorcycles), we operate a specialist RoRo (roll-on/roll-off) service with monthly sailings." },
      { h: "Door-to-Door Cargo: UK to Lagos", body: "Our most popular service is door-to-door cargo — we collect from your UK address (anywhere in the country) and deliver directly to the recipient's door in Lagos or anywhere in Nigeria.\n\nDoor-to-door cargo combines UK collection, transit (by air or sea, your choice), both customs clearances, and final-mile delivery — all managed by our own teams at both ends. There are no handoffs, no third parties, no confusion.\n\nDoor-to-door cargo from the UK to Lagos starts from £6 per kg including collection. If you prefer to drop off at our Upminster, Essex warehouse, the cost is lower — from £5 per kg for sea freight and from £7 per kg for air freight depending on weight." },
      { h: "How Long Does Shipping from the UK to Lagos Take?", body: "The transit time from the UK to Lagos depends entirely on which service you choose:\n\nAir freight UK to Lagos: 5–10 working days. This includes the flight itself (typically 6–8 hours direct), customs clearance at Lagos airport (1–3 days), and last-mile delivery to your Lagos address (1–3 days). R-Zone's air freight is the fastest option for UK–Lagos cargo.\n\nSea freight UK to Lagos: 4–6 weeks. This includes the sailing time from UK ports to Apapa or Tin Can Island (approximately 21–28 days), port handling, customs clearance (2–5 days), and delivery to your Lagos address.\n\nAll transit times start from the date we receive your cargo at our Upminster warehouse or collect it from your UK door." },
      { h: "What Can I Send from the UK to Lagos?", body: "R-Zone accepts a wide range of cargo for shipment to Lagos, including:\n\nClothing, shoes and accessories — one of the most commonly shipped categories. No restrictions on quantity.\n\nElectronics — laptops, phones, televisions, kitchen appliances. NAFDAC registration may be required for some items in Nigeria.\n\nFoodstuffs — we accept a wide range of UK and African food products including tinned goods, dry foods, spices, and snacks. Some items require NAFDAC compliance on arrival.\n\nHousehold goods — furniture, bedding, kitchen items, personal effects.\n\nBusinesses goods — commercial merchandise, retail stock, raw materials.\n\nVehicles — cars, motorcycles, vans via our specialist RoRo sea freight service.\n\nDocuments — urgent documents can be sent via our air freight service with a 1–2 day premium option.\n\nWe do not accept: firearms, controlled drugs, live animals, bleaching creams, or any item on the UK or Nigerian import prohibition list." },
      { h: "Customs Clearance at Lagos: What to Expect", body: "All cargo arriving in Lagos — whether by air or sea — must clear the Nigeria Customs Service (NCS). R-Zone handles all NCS clearance on your behalf as part of our standard service. You do not need to deal with Nigerian customs separately.\n\nFor standard personal and household goods, customs clearance at Lagos takes 2–5 working days. For commercial goods or high-value items, clearance may take longer and import duties will apply. Duties are calculated by the NCS based on the HS (harmonised) tariff code of your goods.\n\nR-Zone's Lagos customs team prepares all documentation — commercial invoice, packing list, air waybill or bill of lading — and files all NCS declarations on your behalf. We have been NCS compliant since 2012 and our team knows the Lagos customs process inside-out.\n\nFor air freight, cargo clears customs at Lagos Murtala Muhammed Airport. For sea freight, cargo clears at Apapa or Tin Can Island port." },
      { h: "How to Ship from the UK to Lagos with R-Zone", body: "Booking a shipment with R-Zone is straightforward:\n\n1. Get a free quote — call +44 (0) 800 772 0864, WhatsApp +44 7915 647 119, or use our online quote form. Tell us the weight, dimensions, type of goods, and delivery address in Lagos. We respond the same day.\n\n2. Confirm your booking — once you are happy with the quote, we confirm your booking in writing with a unique reference number and tell you exactly when your cargo needs to be at our warehouse.\n\n3. Drop off or arrange collection — bring your cargo to our Upminster, Essex warehouse (Mon–Fri 10am–6pm, Sat 11am–2pm) or we collect from your UK door for an additional fee.\n\n4. We handle everything else — customs documentation, transit, Lagos clearance, and delivery to your Lagos address. You receive SMS and email updates at every key milestone." },
      { h: "Why R-Zone is the Best Choice for UK to Lagos Cargo", body: "R-Zone Enterprises is the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google. Here is what makes us different:\n\nOver 12 years of experience: we have been managing UK–Lagos cargo since 2012. We know the routes, the regulations, and the challenges inside-out.\n\n107+ five-star Google reviews: our reputation is built on genuinely delivered customer service — not marketing claims.\n\nOwn teams at both ends: we have our own warehouse and customer service team in Upminster, Essex, and our own operations team in Lagos. No third parties, no handoffs.\n\nFull transparency: the price you are quoted is the price you pay. No hidden fees, no surprise charges.\n\nReal-time tracking: every shipment comes with a tracking number and regular updates via SMS and email.\n\nCustoms expertise: we handle all UK HMRC export documentation and Lagos NCS customs clearance in-house.\n\nCall us on +44 (0) 800 772 0864 or WhatsApp +44 7915 647 119 to book your UK to Lagos cargo today." },
    ],
  },

  // ── ARTICLE 2 ────────────────────────────────────────────────────────────────
  {
    id: 2,
    slug: "nigeria-customs-duty-complete-guide-2026",
    category: "customs",
    featured: false,
    title: "Nigeria Customs Duty 2026: What You'll Pay and How to Prepare",
    excerpt: "Import duties in Nigeria can catch shippers off guard. This complete guide covers current NCS tariff rates, NAFDAC requirements, prohibited items, and how to minimise delays at Apapa and Tin Can Island.",
    author: "R-Zone Compliance Team",
    date: "7 April 2026",
    readTime: "11 min read",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Customs documentation review for Nigeria import",
    tags: ["NCS", "Duty Rates", "NAFDAC"],
    content: [
      { h: "Understanding Nigerian Import Duties", body: "Import duties in Nigeria are levied by the Nigeria Customs Service (NCS) under the ECOWAS Common External Tariff (CET). The tariff rates range from 0% to 70% depending on the category of goods — and getting caught with an incorrect declaration can result in seizure, fines, or significant delays at Apapa or Tin Can Island ports.\n\nFor most personal and household goods shipped by individuals in the UK to family in Nigeria, duties are either exempt or calculated at a low rate. Commercial goods imported for sale attract standard tariff rates based on HS (Harmonised System) codes." },
      { h: "Key NAFDAC Requirements", body: "NAFDAC (National Agency for Food and Drug Administration and Control) regulates food, beverages, cosmetics, drugs, and medical devices entering Nigeria. Any regulated product must carry a valid NAFDAC registration number on its packaging.\n\nFor personal-use quantities of food items — e.g., a consignment of Nigerian foodstuffs sent home — NAFDAC clearance is typically handled at the port by our customs team. For commercial quantities or regulated pharmaceutical products, NAFDAC pre-registration is required before shipping.\n\nR-Zone's compliance team advises every customer on NAFDAC requirements at the point of booking. If your shipment contains regulated products, we will tell you exactly what documentation you need before your cargo departs the UK." },
      { h: "Most Commonly Dutiable Items", body: "Electronics (laptops, phones, televisions): typically 5–20% import duty depending on category. Mobile phones attract a specific tariff under the ECOWAS CET.\n\nVehicles: import duty on vehicles entering Nigeria ranges from 20–70% depending on the vehicle's age, engine size and type. R-Zone advises all vehicle shippers to confirm duty estimates before booking.\n\nTextiles and clothing: 35% import duty applies to most imported clothing. Personal-use quantities are generally treated more leniently than commercial consignments.\n\nFoodstuffs: most basic food items attract 0–5% duty when imported in personal-use quantities. Processed foods may attract higher rates.\n\nHighly dutiable items: second-hand clothing (35%), alcoholic beverages (20–150%), tobacco products (150%), and most luxury goods (20–35%)." },
      { h: "How to Minimise Customs Delays", body: "The single biggest cause of customs delays in Nigeria is inaccurate or incomplete documentation. R-Zone's customs team prevents delays by preparing every document correctly before your cargo arrives at the port.\n\nThe documents we prepare for every shipment include: commercial invoice listing every item and its declared value, detailed packing list with descriptions, weights and quantities, air waybill (air) or bill of lading (sea), and NCS Single Goods Declaration (SGD).\n\nWe file all documents electronically through the NCS NICIS II system before your cargo arrives at the port — which significantly reduces physical inspection rates and clearance times. Standard clearance for a correctly documented personal shipment takes 2–5 working days at Apapa and 3–7 at Tin Can Island." },
      { h: "R-Zone Handles Everything", body: "As your authorised customs agent, R-Zone Enterprises handles all NCS clearance at Lagos on your behalf. You do not need to be present, engage a separate customs broker, or deal with port authorities. Our Lagos team manages the entire process from port arrival to delivery to your door. Call us on +44 (0) 800 772 0864 or WhatsApp us to discuss your shipment." },
    ],
  },

  // ── ARTICLE 3 ────────────────────────────────────────────────────────────────
  {
    id: 3,
    slug: "how-to-pack-cargo-nigeria-professionally",
    category: "guides",
    featured: false,
    title: "How to Pack Your Cargo for Nigeria Like a Professional",
    excerpt: "Poor packaging is the single biggest cause of damaged cargo. Learn the professional techniques our warehouse team uses daily — from double-walling boxes to protecting fragile items for 4,000-mile journeys.",
    author: "R-Zone Warehouse Team",
    date: "1 April 2026",
    readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Professional cargo packing at R-Zone Essex warehouse",
    tags: ["Packing", "Fragile Cargo", "Warehouse"],
    content: [
      { h: "Why Packing Is the Most Important Step", body: "Your cargo will travel over 4,000 miles from the UK to Nigeria — loaded, consolidated, palletised, loaded onto aircraft or container vessels, transported to port, cleared through customs and delivered to a door. At each stage, boxes are moved by hand or forklift, stacked under other cargo, and subjected to pressure, vibration and temperature changes.\n\nThe right packaging is not a nice-to-have. It is what stands between your goods arriving in perfect condition and arriving damaged or destroyed. Our Upminster warehouse team repacks dozens of customer shipments every week — here is what we do differently." },
      { h: "Use the Right Box Size", body: "One of the most common mistakes is using a box that is too large for the contents. A half-empty box collapses under the weight of cargo stacked above it — crushing your items inside. Use a box that leaves no more than 5–7cm of space around your items when filled with padding.\n\nAlways use new, double-walled cardboard boxes for cargo to Nigeria. Used boxes from supermarkets or removal companies have weakened walls and compromised corners that will not survive a 4–6 week sea freight journey or even a 7-day air freight transit. New double-walled boxes cost around £1–3 each and are worth every penny." },
      { h: "Filling and Cushioning", body: "Every item in your box must be individually wrapped and cushioned. Use bubble wrap for fragile items, crumpled newspaper or packing paper for void fill, and foam sheets for electronics and screens.\n\nFor electronics specifically: remove batteries where possible (batteries are restricted on air freight), wrap in anti-static bubble wrap, and place in the centre of the box surrounded by at least 5cm of foam or dense packaging on all sides.\n\nFor clothing and soft goods: compress them using vacuum packing bags to maximise space and protect against moisture, especially for sea freight shipments." },
      { h: "Sealing and Labelling", body: "Seal every seam and join on your box with strong parcel tape — at least three strips along the top, bottom and both side seams. Do not use masking tape, sellotape, or thin packing tape — they will not survive the journey.\n\nLabel your box on at least two sides with the recipient's full name, complete Lagos address including state and LGA, and phone number. Include a label inside the box as well in case the external label becomes detached.\n\nAt R-Zone, every box that comes through our Upminster warehouse is assessed for packing quality before it is accepted for shipping. If we believe your packaging is inadequate, we will offer a repacking service to protect your goods. We would rather tell you at our warehouse than see your cargo arrive damaged in Lagos." },
      { h: "Packing for Sea Freight Specifically", body: "Sea freight journeys are longer — 4–6 weeks in a container that will be exposed to sea air, temperature changes and humidity. For sea freight to Lagos, we strongly recommend:\n\nWrapping all items in cling film or plastic wrap before boxing — this provides a moisture barrier. Using silica gel packets inside boxes containing electronics or clothing. Lining the interior of your box with a plastic bin bag as an additional moisture barrier. Sealing all food items in airtight containers or vacuum seal bags." },
    ],
  },

  // ── ARTICLE 4 ────────────────────────────────────────────────────────────────
  {
    id: 4,
    slug: "rzone-expanded-air-schedule-2026",
    category: "updates",
    featured: false,
    title: "R-Zone Now Operates Three Weekly Air Departures to Nigeria — What This Means for You",
    excerpt: "We now operate three weekly air departures from London to Lagos and Abuja. Here's everything you need to know about the new schedule, cut-off times, and how to take advantage of faster delivery.",
    author: "R-Zone Management",
    date: "20 March 2026",
    readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Cargo loading operations at UK airport — R-Zone expanded air schedule",
    tags: ["Schedule", "Air Freight", "Announcement"],
    content: [
      { h: "Three Departures Weekly: Monday, Wednesday and Friday", body: "We are pleased to confirm that R-Zone Enterprises now operates air freight departures to Nigeria three times every week — every Monday, Wednesday and Friday — from London Heathrow (LHR), London Gatwick (LGW) and Manchester (MAN).\n\nThis expanded schedule significantly reduces the maximum waiting time for your cargo. Previously, if you missed a departure day, you could wait up to a week for the next flight. Now the maximum wait between departures is just two days — meaning your cargo reaches Lagos or Abuja faster than ever." },
      { h: "New Cut-Off Times", body: "To make a specific departure, your cargo must be received at our Upminster, Essex warehouse by 12:00pm (midday) on the departure day. For UK-wide door collections, your cargo must be scheduled at least 24 hours before the departure day.\n\nMonday departure: cargo cut-off Sunday 5pm (door collection) or Monday 12pm (warehouse drop-off).\nWednesday departure: cargo cut-off Tuesday 5pm (door collection) or Wednesday 12pm (warehouse drop-off).\nFriday departure: cargo cut-off Thursday 5pm (door collection) or Friday 12pm (warehouse drop-off).\n\nIf you are unsure which departure day to target, call our team on +44 (0) 800 772 0864 and we will advise based on your specific cargo and destination." },
      { h: "What This Means for Transit Times", body: "With three departures weekly, the average transit time from booking to delivery in Lagos has reduced significantly. Customers who book early in the week and drop off by Wednesday midday can now expect delivery to their Lagos address within 7–9 working days in most cases — compared to 8–12 previously.\n\nFor urgent shipments, our Friday departure with express customs handling can achieve delivery in as few as 5–7 working days in Lagos and 7–10 working days for other Nigerian states." },
      { h: "Pricing Remains Unchanged", body: "The expanded schedule does not affect our pricing. Air freight from the UK to Nigeria continues from £5 per kg, with the same transparent, all-inclusive pricing structure. No fuel surcharge surprises, no hidden handling fees — the quote you receive is the price you pay.\n\nTo book a shipment on any of our three weekly departures, contact us on +44 (0) 800 772 0864, WhatsApp +44 7915 647 119, or use our online quote form. Same-day response guaranteed." },
    ],
  },

  // ── ARTICLE 5 ────────────────────────────────────────────────────────────────
  {
    id: 5,
    slug: "nigerian-diaspora-shipping-guide-uk",
    category: "guides",
    featured: false,
    title: "The Nigerian Diaspora's Complete UK Shipping Guide 2026",
    excerpt: "Whether you're sending Easter gifts, food to family, or goods to a business partner in Lagos — this guide covers everything the Nigerian community in the UK needs to know about shipping home.",
    author: "R-Zone Customer Team",
    date: "10 March 2026",
    readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Boxes being prepared for Nigeria shipping from UK diaspora customer",
    tags: ["Diaspora", "Family Shipping", "Guide"],
    content: [
      { h: "The Nigerian Community in the UK and Their Shipping Needs", body: "There are over one million Nigerians living in the United Kingdom — in London, Manchester, Birmingham, Leeds, Bristol, and across every county. For many, the connection to Nigeria is not just emotional. It is practical: family members who need support, businesses that require supplies, aging parents who need items unavailable locally, children in Nigeria who need their parents to send school materials.\n\nR-Zone Enterprises was built specifically for this community. Founded in Essex in 2012 by people who understood these needs first-hand, we have spent over twelve years making UK–Nigeria shipping as simple and affordable as possible." },
      { h: "What You Can and Cannot Send", body: "Most everyday items are perfectly fine to send from the UK to Nigeria. Clothing, shoes, electronics, food items, household goods, books, children's toys and personal effects can all be shipped without restriction (subject to quantity and value thresholds for commercial shipments).\n\nItems that cannot be shipped include: firearms and ammunition, controlled drugs, bleaching creams and products with banned chemicals, live animals and biological material, counterfeit goods, and items on the UK or Nigerian prohibited import list. If you are unsure about a specific item, call our team before you pack — we can advise instantly.\n\nFor foodstuffs specifically, R-Zone accepts a comprehensive list of approved Nigerian and African food items. Garri, fufu, egusi, dried fish, crayfish, palm oil, ogi, elubo, beans and most dry goods are accepted. Items must be well-sealed and properly packed." },
      { h: "Sending Gifts: How to Pack for Personal Shipments", body: "For gift shipments — Christmas, Eid, Easter, birthdays — the most important thing is appropriate packaging. Our advice:\n\nPack clothing in airtight vacuum bags to save space and protect against moisture (especially for sea freight). Wrap electronics individually in bubble wrap and pad all sides. Put food items in sealed airtight containers or zip-lock bags and pack separately from non-food items. Label every box clearly with the recipient's full name, address in Nigeria (including state and LGA), and phone number.\n\nDo not pack loose items in bin bags — they will be rejected at our warehouse and will not protect your goods. Use proper cardboard boxes, well-sealed with parcel tape." },
      { h: "How Much to Budget for Sending to Nigeria", body: "For a typical individual shipment:\n\nA 20kg box of clothing and household goods sent by sea freight to Lagos will cost approximately £60–90 depending on the destination state.\n\nThe same 20kg box sent by air freight will cost approximately £100–160.\n\nA 50kg consolidation of foodstuffs, clothing and electronics sent by sea to Lagos or nearby states will cost approximately £150–230.\n\nAll R-Zone prices include UK export documentation and Nigeria customs clearance. There are no hidden extras. Contact us for a free quote specific to your shipment." },
      { h: "How to Book Your Shipment", body: "Call +44 (0) 800 772 0864 or WhatsApp +44 7915 647 119. Our team will take your details, give you a quote, and confirm your booking with a reference number. You can drop off at our Upminster, Essex warehouse (Monday–Friday 10am–6pm, Saturday 11am–2pm) or we will collect from your door across the UK." },
    ],
  },

  // ── ARTICLE 6 ────────────────────────────────────────────────────────────────
  {
    id: 6,
    slug: "apapa-port-what-shippers-need-to-know",
    category: "news",
    featured: false,
    title: "Apapa Port 2026: Current Situation and What UK Shippers to Lagos Need to Know",
    excerpt: "Port congestion at Apapa remains a challenge for sea freight shipments. We break down the current situation, expected clearance times, and practical steps to protect your supply chain from delays.",
    author: "R-Zone Operations Team",
    date: "28 February 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Container ships at Lagos Apapa port Nigeria",
    tags: ["Apapa", "Port Delays", "Sea Freight"],
    content: [
      { h: "Current State of Apapa Port (April 2026)", body: "Apapa Port in Lagos remains Nigeria's busiest container terminal and the primary entry point for sea freight from the UK. Congestion at Apapa has been an ongoing challenge since 2020, driven by a combination of berth limitations, container dwell time issues, and access road infrastructure.\n\nAs of April 2026, average customs clearance time at Apapa for a correctly documented LCL (Less than Container Load) shipment is 3–6 working days. FCL (Full Container Load) clearance averages 4–8 working days. These times can extend by 2–4 days during peak periods, Nigerian public holidays, or when NCS introduces new inspection protocols.\n\nTin Can Island port — Apapa's neighbouring terminal — is generally less congested. R-Zone routes a significant portion of sea freight shipments through Tin Can Island specifically to avoid Apapa backlogs where possible." },
      { h: "How Congestion Affects Your Delivery Timeline", body: "The published 4–6 week transit time for sea freight from the UK to Lagos assumes standard customs clearance. During peak congestion periods, the total time from UK departure to Lagos delivery can stretch to 7–8 weeks.\n\nR-Zone's Lagos team monitors port conditions daily and proactively communicates with customers whose cargo is affected by delays. We file all documents electronically through the NCS NICIS II pre-clearance system — which significantly reduces the time your cargo spends waiting at the port gate.\n\nIf you have time-critical cargo and cannot accept potential delays, we recommend air freight to Lagos as the reliable alternative. R-Zone's air freight service bypasses all port congestion and delivers to your Lagos address within 5–10 working days from the UK." },
      { h: "What R-Zone Does to Minimise Port Delays", body: "Our Lagos customs team are accredited NCS agents with over a decade of Apapa and Tin Can Island clearance experience. Every sea freight shipment processed by R-Zone benefits from:\n\nElectronic pre-lodgement of all customs documents before the vessel arrives at port — reducing gate processing time. Dedicated NCS relationships that facilitate faster inspection scheduling. Proactive monitoring of vessel arrival and port slot allocation. Real-time customer updates on clearance status via SMS and email.\n\nFor customers with commercial shipments requiring priority clearance, we offer an expedited customs service. Contact our Lagos team for details." },
      { h: "Our Advice for UK Shippers in 2026", body: "Plan for a 6–8 week total timeline when shipping by sea to Lagos, especially for commercial shipments where delivery deadlines matter. For personal shipments where exact timing is less critical, standard sea freight remains the most cost-effective option.\n\nConsider air freight for anything time-sensitive — the premium over sea freight is modest for smaller shipments, and the certainty of delivery within 5–10 working days is often worth the extra cost.\n\nAlways ensure your documentation is 100% accurate before shipping. Incorrect or missing documentation is the primary cause of preventable customs delays at Apapa. R-Zone's compliance team checks every document before your cargo departs the UK — at no extra charge." },
    ],
  },

  // ── ARTICLE 7 ────────────────────────────────────────────────────────────────
  {
    id: 7,
    slug: "volumetric-weight-explained",
    category: "tips",
    featured: false,
    title: "Volumetric Weight Explained: Why Your 10 kg Box Might Cost Like 18 kg",
    excerpt: "One of the most common surprises in freight billing is volumetric weight. We explain exactly how it's calculated, why carriers use it, and how to pack smarter to avoid unexpected charges.",
    author: "R-Zone Pricing Team",
    date: "14 February 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Cargo being measured and weighed at freight warehouse",
    tags: ["Pricing", "Volumetric Weight", "Cost Saving"],
    content: [
      { h: "What Is Volumetric Weight?", body: "Volumetric weight (also called dimensional weight or DIM weight) is a pricing method used by freight carriers that accounts for the physical space a shipment occupies — not just how much it weighs.\n\nThe logic is straightforward: a large, lightweight box takes up the same amount of space on an aircraft or in a container as a small, heavy box. Carriers charge based on whichever is greater — the actual weight or the volumetric weight — so that large, light shipments pay their fair share of capacity." },
      { h: "How Is Volumetric Weight Calculated?", body: "For air freight, volumetric weight = Length (cm) × Width (cm) × Height (cm) ÷ 6,000.\n\nFor sea freight, volumetric weight = Length (cm) × Width (cm) × Height (cm) ÷ 1,000.\n\nExample: you have a box measuring 60cm × 50cm × 40cm. It weighs 10kg.\n\nFor air freight: 60 × 50 × 40 = 120,000 ÷ 6,000 = 20kg volumetric weight. Your shipment would be charged at 20kg — not 10kg — because the volumetric weight is greater.\n\nFor sea freight: 60 × 50 × 40 = 120,000 ÷ 1,000 = 120kg volumetric weight. If your box weighs 10kg actual but 120kg volumetric — you pay for 120kg.\n\nThis is why large, light boxes — particularly for sea freight — can generate very high charges relative to their actual weight." },
      { h: "How to Pack Smarter and Reduce Volumetric Weight", body: "The most effective way to reduce volumetric weight charges is to pack as compactly as possible:\n\nUse appropriately sized boxes — do not use a large box for a small amount of goods. A box half-full of packaging filler will be charged on its volumetric weight.\n\nUse vacuum packing bags for clothing and soft goods — these dramatically reduce the volume of large, light items like duvets, clothes and cushions.\n\nConsolidate multiple small boxes into fewer large, fully packed boxes — the total volumetric weight of one dense box is almost always lower than multiple sparse boxes.\n\nFor sea freight in particular, think cubic. Dense packing is always rewarded. If you are sending bulky items, speak to our team — we can advise on the optimal box configuration for your specific goods." },
      { h: "How R-Zone Calculates Your Charge", body: "R-Zone calculates your shipment charge based on the actual weight and volumetric weight of your cargo, measured at our Upminster warehouse when your goods arrive. We use calibrated digital scales and measurement tools for accuracy.\n\nYour final charge is based on whichever is greater — actual or volumetric weight — at the published per-kg rate for your chosen service. We always communicate the calculated weight to you before processing payment and give you the opportunity to re-pack if needed.\n\nTo avoid surprises, you can estimate your volumetric weight before dropping off using the formulas above. If you have any questions about how your specific shipment will be calculated, call our team on +44 (0) 800 772 0864." },
    ],
  },

  // ── ARTICLE 8 ────────────────────────────────────────────────────────────────
  {
    id: 8,
    slug: "nafdac-requirements-food-exports-nigeria",
    category: "customs",
    featured: false,
    title: "Sending Food from the UK to Nigeria? Here's What NAFDAC Requires in 2026",
    excerpt: "NAFDAC regulates all food imports into Nigeria. Before you ship that consignment of groceries or African foodstuffs, read this to avoid seizure at the port and know exactly what is allowed.",
    author: "R-Zone Compliance Team",
    date: "31 January 2026",
    readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Food items packaged for export to Nigeria from UK",
    tags: ["NAFDAC", "Food Export", "Compliance"],
    content: [
      { h: "What Is NAFDAC and Why Does It Matter for Your Shipment?", body: "NAFDAC — the National Agency for Food and Drug Administration and Control — is Nigeria's regulatory body for food, drinks, cosmetics, drugs, medical devices, and chemicals entering the country. Any regulated product imported into Nigeria, whether commercially or personally, is subject to NAFDAC oversight.\n\nFor UK–Nigeria shippers, NAFDAC is most relevant when sending food products, drinks, supplements, herbal remedies, cosmetics and medicines. Products that are NAFDAC-regulated must either carry a valid NAFDAC registration number (for commercial imports) or be cleared as personal-use quantities at the port of entry." },
      { h: "Personal-Use vs Commercial Quantities", body: "The distinction NAFDAC makes between personal-use and commercial quantities is important.\n\nPersonal-use quantities — typically a reasonable amount that a single person or household would consume — are generally cleared at the port without requiring pre-registration, as long as the items are on the approved list and properly declared.\n\nCommercial quantities — larger volumes clearly intended for sale or distribution — require NAFDAC pre-registration of the product before it can be imported. Sending commercial quantities of unregistered food products risks seizure and significant fines.\n\nR-Zone advises all customers sending food shipments to Nigeria to declare quantities accurately and honestly. Misdeclaration is a serious offence under Nigerian law and can result in seizure of the entire consignment." },
      { h: "Approved Food Items for UK–Nigeria Shipments", body: "R-Zone accepts the following food categories for both air freight and sea freight to Nigeria:\n\nDry goods: garri, fufu, eba, semolina, rice (including Ofada rice), beans (without kokoro), groundnuts, plantain chips, puff puff powder, chin chin.\n\nCondiments and seasoning: palm oil (sealed bottles only), crayfish (must be in sealed bottle), dried pepper (ground), ogbono, egusi (ground melon), curry powder, thyme, dried ginger.\n\nProcessed foods: Golden Morn, Cerelac, Indomie noodles (not chicken flavour), Maggi cubes (not chicken flavour), tin tomatoes.\n\nOther permitted items: kuli kuli, elubo (yam flour), pupuru, power ogi, ogi/akamu, orogbo, obi/kola nut.\n\nItems NOT permitted: bleaching creams, chicken-flavoured Indomie and Maggi (due to specific restriction), liquid herbal medicines, fresh meat or produce, alcohol.\n\nAll food items must be commercially packaged, sealed, and properly labelled. Loose or unsealed items will not be accepted." },
      { h: "R-Zone's Process for Food Shipments", body: "When you book a food shipment with R-Zone, our team reviews your item list at the point of booking and confirms which items are accepted, flagging any that require special handling or documentation.\n\nAt our Upminster warehouse, our team inspects all food items before acceptance, ensuring they are properly sealed, labelled, and packed. Items that do not meet our packing standards are repacked by our team (a small packing fee applies).\n\nAt the Lagos end, our customs team handles all NAFDAC clearance for personal-use food shipments as standard. No separate NAFDAC fee is charged for standard personal-use quantities. Call us on +44 (0) 800 772 0864 to discuss your specific food shipment." },
    ],
  },

  // ── ARTICLE 9 ────────────────────────────────────────────────────────────────
  {
    id: 9,
    slug: "rzone-107-five-star-reviews-milestone",
    category: "updates",
    featured: false,
    title: "107 Five-Star Reviews: What Our Customers Are Saying in 2026",
    excerpt: "We've hit 107 five-star Google reviews and we couldn't be more grateful. We share some of our favourite customer stories and what drives us to keep raising the bar every single week.",
    author: "R-Zone Management",
    date: "15 January 2026",
    readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop",
    imgAlt: "R-Zone customer celebration — 107 five-star Google reviews milestone",
    tags: ["Reviews", "Customer Success", "Milestone"],
    content: [
      { h: "107 Reviews. Organically Earned. Every Single One.", body: "When R-Zone Enterprises launched in 2012, our founder made a commitment: we would never ask for a review unless we had genuinely delivered for the customer. No incentivised reviews, no review-swapping, no inflated ratings. Every star on our Google profile would represent a real person's real experience.\n\nToday, we have 107 five-star Google reviews. That makes us the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google — a position earned entirely through the quality of our service, not marketing spend.\n\nWe are grateful beyond words. Here is what some of our customers have said." },
      { h: "Customer Voices", body: "Vincent A. (London to Lagos, 7 years): \"I have been shipping with R-Zone for 7 years and they have never once let me down. Every shipment arrives in perfect condition. They are genuinely the most reliable cargo company I have ever used.\"\n\nOludotun O. (Essex to Abeokuta): \"Professional, caring, and they actually answer the phone. My cargo arrived ahead of schedule and I received updates every step of the way. Cannot recommend highly enough.\"\n\nGrace S. (Manchester to Lagos): \"I was nervous about shipping expensive electronics but R-Zone explained the whole process, packed everything securely, and delivered safely. The whole team made me feel like a priority customer.\"\n\nAdeola E. (Birmingham to Port Harcourt): \"Competitive pricing, no hidden fees, and a customer service team that genuinely cares. I have tried other companies and always came back to R-Zone.\"\n\nIjeoma N. (London to Enugu): \"From first phone call to delivery confirmation, the service was excellent. The tracking updates were accurate and the cargo arrived in 8 days. Brilliant.\"" },
      { h: "What These Reviews Mean to Us", body: "Each of these reviews represents a decision someone made to trust us with their cargo — and a promise we delivered on. Behind every five-star review is a box of family gifts that arrived safely for Christmas. A consignment of goods that kept a business running. A suitcase of belongings for someone starting a new chapter.\n\nWe do not take that trust lightly. Every shipment, regardless of size, is handled with the same care and attention. Whether you are sending a 5kg parcel of foodstuffs or a 500kg commercial consignment, our commitment to you is identical: your cargo will arrive safely, on time, and without surprises." },
      { h: "Our Promise for 2026 and Beyond", body: "As we grow — adding new routes, new services, and new team members — our founding commitment does not change. We will always prioritise genuine service over marketing metrics. We will always answer the phone. We will always tell you the truth about your cargo.\n\nIf you have shipped with R-Zone before, thank you. If you are new to us, we look forward to earning your trust.\n\nCall us on +44 (0) 800 772 0864, WhatsApp +44 7915 647 119, or get a free quote online. Same-day response, always." },
    ],
  },
];

const TRENDING = ARTICLES.slice(0, 4);

// ─── Animation helpers ────────────────────────────────────────────────────────
const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }),
};

function useReveal(margin = "-60px") {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}

// ─── Tag Pill ─────────────────────────────────────────────────────────────────
function TagPill({ label, dark = false }) {
  return (
    <div className={`inline-flex items-center gap-2.5 border px-4 py-1.5 rounded-full mb-5 ${dark ? "border-[#1F51FF]/30 bg-[#0818A8]/14" : "border-[#0818A8]/20 bg-[#0818A8]/6"}`}>
      <motion.span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dark ? "bg-[#1F51FF]" : "bg-[#0818A8]"}`}
        animate={{ scale: [1, 1.7, 1], opacity: [1, 0.3, 1] }} transition={{ duration: 2, repeat: Infinity }} aria-hidden="true" />
      <span className={`text-[10px] font-bold tracking-[0.3em] uppercase ${dark ? "text-[#1F51FF]" : "text-[#0818A8]"}`}>{label}</span>
    </div>
  );
}

function CategoryBadge({ cat }) {
  const found = CATEGORIES.find(c => c.id === cat) || CATEGORIES[1];
  return (
    <span className="inline-flex items-center gap-1.5 text-[9.5px] font-black tracking-[0.2em] uppercase px-2.5 py-1.5 border"
      style={{ color: found.color, borderColor: `${found.color}30`, backgroundColor: `${found.color}10` }}>
      {found.label}
    </span>
  );
}

function ArticleMeta({ article, light = false }) {
  const cls = light ? "text-white/55" : "text-gray-500";
  return (
    <div className={`flex items-center flex-wrap gap-3 text-[11px] font-medium ${cls}`}>
      <span className="flex items-center gap-1.5"><User size={10} aria-hidden="true" />{article.author}</span>
      <span className="opacity-30" aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5"><Calendar size={10} aria-hidden="true" />{article.date}</span>
      <span className="opacity-30" aria-hidden="true">·</span>
      <span className="flex items-center gap-1.5"><Clock size={10} aria-hidden="true" />{article.readTime}</span>
    </div>
  );
}

// ─── Share button ─────────────────────────────────────────────────────────────
function ShareButton({ article }) {
  const [copied, setCopied] = useState(false);
  const [open,   setOpen]   = useState(false);
  const shareText = `${article.title} — R-Zone Cargo Insights`;

  const copy = () => {
    navigator.clipboard?.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tweet = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  const fb = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank");
  };

  return (
    <div className="relative">
      <button onClick={() => setOpen(o => !o)}
        className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#0818A8] hover:text-[#0818A8] text-gray-800 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-200"
        aria-label="Share this article">
        <Share2 size={12} aria-hidden="true" /> Share
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 shadow-2xl shadow-gray-200/80 p-3 min-w-[180px]"
          >
            <button onClick={copy} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left">
              {copied ? <Check size={13} className="text-emerald-500" /> : <Link2 size={13} />}
              {copied ? "Copied!" : "Copy link"}
            </button>
            <button onClick={tweet} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left">
              <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Post on X
            </button>
            <button onClick={fb} className="w-full flex items-center gap-2.5 px-3 py-2.5 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left">
              <svg width={13} height={13} viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Share on Facebook
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARTICLE READER — Full article inline, no routing
// ═══════════════════════════════════════════════════════════════════════════════
function ArticleReader({ article, onBack }) {
  const topRef = useRef(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [article]);

  const related = ARTICLES.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
  if (!related.length) {
    ARTICLES.filter(a => a.id !== article.id).slice(0, 3).forEach(a => related.push(a));
  }

  return (
    <div ref={topRef} className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>

      {/* ── Article Hero ───────────────────────────────────────────────────── */}
      <div className="relative bg-[#00061a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px]" />
        </div>

        {/* Image */}
        <div className="relative h-[380px] md:h-[480px] overflow-hidden">
          <Image src={article.img} alt={article.imgAlt} fill priority sizes="100vw"
            className="object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/60 to-[#00061a]/30" aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8 -mt-64 pb-12 md:pb-16">
          {/* Back button */}
          <motion.button onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase mb-8 transition-colors"
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            aria-label="Back to all articles">
            <ArrowLeft size={14} aria-hidden="true" /> Back to Insights
          </motion.button>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-5">
              <CategoryBadge cat={article.category} />
              <span className="text-white/40 text-[11px] font-medium">{article.readTime}</span>
            </div>

            <h1 className="font-black text-[clamp(24px,4.5vw,52px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-6">
              {article.title}
            </h1>

            <p className="text-white/65 text-[15px] font-light leading-relaxed mb-7 max-w-2xl">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
              <ArticleMeta article={article} light />
              <ShareButton article={article} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Article Body ───────────────────────────────────────────────────── */}
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-12 md:py-16">

        {/* Table of Contents */}
        {article.content.length > 2 && (
          <motion.div className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-6 mb-10"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-4">In This Article</p>
            <ol className="space-y-2">
              {article.content.map((sec, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="font-black text-[#0818A8]/40 text-[12px] flex-shrink-0 w-4">{i + 1}.</span>
                  <span className="text-[13px] font-semibold text-gray-800 leading-snug">{sec.h}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}

        {/* Content sections */}
        <div className="space-y-10">
          {article.content.map((sec, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}>
              <h2 className="font-black text-[clamp(17px,2.5vw,24px)] text-[#0b0f1a] leading-tight tracking-[-0.02em] uppercase mb-4 border-l-[3px] border-[#0818A8] pl-4">
                {sec.h}
              </h2>
              <div className="pl-0 space-y-4">
                {sec.body.split("\n\n").map((para, pi) => (
                  <p key={pi} className="text-gray-700 text-[15px] font-normal leading-[1.8]">
                    {para.split(/\*\*(.*?)\*\*/g).map((part, idx) =>
                      idx % 2 === 1
                        ? <strong key={idx} className="font-bold text-gray-900">{part}</strong>
                        : part
                    )}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-100">
          {article.tags.map(t => (
            <span key={t} className="text-[10px] font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 hover:border-[#0818A8] hover:text-[#0818A8] transition-colors cursor-default">
              #{t}
            </span>
          ))}
        </div>

        {/* Share row */}
        <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t border-gray-100">
          <div>
            <p className="text-[13px] font-bold text-gray-800 mb-0.5">Found this useful?</p>
            <p className="text-gray-500 text-[12px] font-normal">Share it with someone who ships to Nigeria.</p>
          </div>
          <ShareButton article={article} />
        </div>

        {/* CTA */}
        <div className="mt-10 bg-[#0818A8] p-7 md:p-9 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase mb-2">Ready to Ship?</p>
            <h3 className="text-white font-black text-[22px] tracking-[-0.015em] mb-3">
              Get a free UK–Nigeria cargo quote from R-Zone.
            </h3>
            <p className="text-white/70 text-[13px] font-normal mb-6 max-w-lg">
              Air from £5/kg · Sea from £3/kg · Weekly departures · Same-day response · 107+ five-star reviews.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote"
                className="group inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                aria-label="Get a free shipping quote from R-Zone">
                Get a Free Quote
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="tel:+448007720864"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                aria-label="Call R-Zone UK">
                Call +44 800 772 0864
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Articles ───────────────────────────────────────────────── */}
      {related.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-14 md:py-16">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">
            <div className="flex items-center gap-4 mb-8">
              <p className="text-[10px] font-black tracking-[0.35em] uppercase text-gray-400">More to Read</p>
              <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a, i) => (
                <motion.button key={a.id} onClick={() => onBack(a)}
                  className="group flex flex-col border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden text-left relative"
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.08 }}
                  aria-label={`Read: ${a.title}`}>
                  <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
                  <div className="relative h-[160px] overflow-hidden flex-shrink-0">
                    <Image src={a.img} alt={a.imgAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <CategoryBadge cat={a.category} />
                    <p className="font-black text-[13.5px] text-gray-900 leading-snug tracking-[-0.01em] mt-2 mb-2 group-hover:text-[#0818A8] transition-colors line-clamp-2">
                      {a.title}
                    </p>
                    <ArticleMeta article={a} />
                  </div>
                </motion.button>
              ))}
            </div>

            <div className="text-center mt-10">
              <button onClick={() => onBack(null)}
                className="group inline-flex items-center gap-2 border-2 border-[#0818A8]/20 hover:border-[#0818A8] text-[#0818A8] text-[12px] font-black tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[#0818A8] hover:text-white transition-all duration-200"
                aria-label="Back to all articles">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                Back to All Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Featured card ────────────────────────────────────────────────────────────
function FeaturedCard({ article, onOpen }) {
  const { ref, inView } = useReveal("-40px");
  return (
    <motion.article ref={ref}
      className="group relative overflow-hidden bg-[#00061a] border border-white/[0.07] hover:border-[#0818A8]/50 transition-all duration-500 cursor-pointer"
      onClick={() => onOpen(article)}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      itemScope itemType="https://schema.org/BlogPosting"
      role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onOpen(article)}
      aria-label={`Read article: ${article.title}`}>
      <div className="relative h-[340px] lg:h-[480px] overflow-hidden">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.7 }}>
          <Image src={article.img} alt={article.imgAlt} fill priority className="object-cover" sizes="(max-width:1024px) 100vw, 60vw" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/50 to-transparent" aria-hidden="true" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#00061a]/60 to-transparent" aria-hidden="true" />
        <div className="absolute top-5 left-5">
          <span className="inline-flex items-center gap-2 bg-[#0818A8] text-white text-[9px] font-black tracking-[0.22em] uppercase px-3.5 py-2">
            <TrendingUp size={9} aria-hidden="true" /> Featured Article
          </span>
        </div>
      </div>
      <div className="relative p-7 md:p-9 -mt-24 lg:-mt-36 z-10">
        <div className="flex items-center gap-3 mb-4"><CategoryBadge cat={article.category} /></div>
        <h2 className="font-black text-[clamp(22px,3.5vw,38px)] text-white leading-[0.92] tracking-[-0.025em] uppercase mb-4 group-hover:text-white transition-colors" itemProp="headline">
          {article.title}
        </h2>
        <p className="text-white/65 text-[14px] font-light leading-relaxed max-w-2xl mb-6" itemProp="description">{article.excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <ArticleMeta article={article} light />
          <span className="group/btn inline-flex items-center gap-2 bg-[#0818A8] group-hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.1em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25">
            Read Article <ArrowRight size={11} className="group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </div>
        <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.07]">
          {article.tags.map(t => (
            <span key={t} className="text-[10px] font-semibold text-white/40 border border-white/[0.08] px-2.5 py-1">#{t}</span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ─── Grid card ────────────────────────────────────────────────────────────────
function ArticleCard({ article, index, onOpen }) {
  const { ref, inView } = useReveal("-40px");
  return (
    <motion.article ref={ref}
      className="group flex flex-col border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative cursor-pointer"
      onClick={() => onOpen(article)}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      itemScope itemType="https://schema.org/BlogPosting"
      role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onOpen(article)}
      aria-label={`Read article: ${article.title}`}>
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className="relative h-[200px] overflow-hidden bg-gray-100 flex-shrink-0">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
          <Image src={article.img} alt={article.imgAlt} fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" aria-hidden="true" />
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3"><CategoryBadge cat={article.category} /></div>
        <h3 className="font-black text-[15.5px] text-gray-900 leading-snug tracking-[-0.015em] mb-3 group-hover:text-[#0818A8] transition-colors duration-200 line-clamp-3" itemProp="headline">
          {article.title}
        </h3>
        <p className="text-gray-600 text-[13px] font-light leading-relaxed mb-5 line-clamp-3 flex-1" itemProp="description">{article.excerpt}</p>
        <div className="mt-auto space-y-3">
          <ArticleMeta article={article} />
          <span className="inline-flex items-center gap-1.5 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase group-hover:text-[#0437F2] transition-colors">
            Read More <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Row card ─────────────────────────────────────────────────────────────────
function ArticleRow({ article, index, onOpen }) {
  const { ref, inView } = useReveal("-40px");
  const isEven = index % 2 === 0;
  return (
    <motion.article ref={ref}
      className="group grid grid-cols-1 md:grid-cols-2 gap-0 border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative cursor-pointer"
      onClick={() => onOpen(article)}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      itemScope itemType="https://schema.org/BlogPosting"
      role="button" tabIndex={0}
      onKeyDown={e => e.key === "Enter" && onOpen(article)}
      aria-label={`Read article: ${article.title}`}>
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className={`relative h-[260px] md:h-full overflow-hidden bg-gray-100 ${!isEven ? "md:order-2" : ""}`}>
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
          <Image src={article.img} alt={article.imgAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" loading="lazy" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" aria-hidden="true" />
        <div className="absolute top-5 left-5"><CategoryBadge cat={article.category} /></div>
      </div>
      <div className={`flex flex-col justify-center p-7 md:p-9 ${!isEven ? "md:order-1" : ""}`}>
        <h3 className="font-black text-[clamp(17px,2vw,22px)] text-gray-900 leading-[0.92] tracking-[-0.02em] uppercase mb-4 group-hover:text-[#0818A8] transition-colors duration-200" itemProp="headline">
          {article.title}
        </h3>
        <p className="text-gray-600 text-[13.5px] font-light leading-relaxed mb-6" itemProp="description">{article.excerpt}</p>
        <ArticleMeta article={article} />
        <div className="mt-5 pt-5 border-t border-gray-100 flex items-center justify-between">
          <div className="flex flex-wrap gap-1.5">
            {article.tags.slice(0, 2).map(t => (
              <span key={t} className="text-[10px] font-semibold text-gray-500 border border-gray-200 px-2 py-1">#{t}</span>
            ))}
          </div>
          <span className="inline-flex items-center gap-1.5 text-[#0818A8] group-hover:text-[#0437F2] text-[11.5px] font-black tracking-[0.08em] uppercase transition-colors">
            Read <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

// ─── Trending sidebar ─────────────────────────────────────────────────────────
function TrendingList({ onOpen }) {
  const { ref, inView } = useReveal("-40px");
  return (
    <aside ref={ref} className="border border-gray-200 bg-white overflow-hidden sticky top-[80px]" aria-label="Trending articles">
      <div className="h-[3px] bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className="p-6">
        <div className="flex items-center gap-2.5 mb-5">
          <TrendingUp size={14} className="text-[#0818A8]" aria-hidden="true" />
          <p className="text-[9.5px] font-black tracking-[0.28em] uppercase text-gray-500">Trending Now</p>
        </div>
        <div className="space-y-5">
          {TRENDING.map((a, i) => (
            <motion.button key={a.id}
              className="group flex items-start gap-3 w-full text-left"
              onClick={() => onOpen(a)}
              initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
              aria-label={`Read trending: ${a.title}`}>
              <span className="font-black text-[28px] leading-none text-[#0818A8]/12 flex-shrink-0 w-8 text-right">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="inline-block text-[9px] font-bold tracking-[0.18em] uppercase text-[#0818A8] mb-1">
                  {CATEGORIES.find(c => c.id === a.category)?.label}
                </span>
                <p className="text-[12.5px] font-semibold text-gray-800 group-hover:text-[#0818A8] transition-colors leading-snug">
                  {a.title}
                </p>
                <span className="text-gray-400 text-[11px] font-light">{a.readTime}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
}

// ─── Category filter ──────────────────────────────────────────────────────────
function CategoryFilter({ active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {CATEGORIES.map(cat => {
        const Icon     = cat.icon;
        const isActive = active === cat.id;
        return (
          <button key={cat.id} onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-semibold border transition-all duration-200 ${isActive ? "text-white border-[#0818A8] bg-[#0818A8] shadow-md shadow-[#0818A8]/20" : "text-gray-600 border-gray-200 bg-white hover:border-[#0818A8]/40 hover:text-[#0818A8]"}`}
            aria-pressed={isActive} aria-label={`Filter by ${cat.label}`}>
            <Icon size={12} aria-hidden="true" />
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function NewsletterSection() {
  const { ref, inView } = useReveal("-40px");
  const [email,  setEmail]  = useState("");
  const [status, setStatus] = useState("idle");
  const [error,  setError]  = useState("");

  const handleSubmit = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email address."); return; }
    setError(""); setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  };

  return (
    <section ref={ref} className="relative bg-[#0818A8] overflow-hidden" aria-labelledby="newsletter-heading">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="absolute top-0 right-0 w-[600px] h-[500px] pointer-events-none" aria-hidden="true"
        style={{ background: "radial-gradient(circle, rgba(31,81,255,0.35) 0%, transparent 65%)", transform: "translate(20%,-20%)" }} />
      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2.5 mb-5">
              <Mail size={16} className="text-white/60" aria-hidden="true" />
              <span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Newsletter</span>
            </div>
            <h2 id="newsletter-heading" className="font-black text-[clamp(24px,4vw,42px)] text-white leading-[0.92] tracking-[-0.025em] uppercase mb-4">
              Get Freight Insights<br /><span className="text-white/40">Delivered Weekly.</span>
            </h2>
            <p className="text-white/65 text-[14px] font-light leading-relaxed">
              Join 2,000+ UK–Nigeria shippers who get our weekly logistics briefing — no spam, unsubscribe any time.
            </p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="s" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-4 border border-white/20 bg-white/10 px-6 py-5">
                  <CheckCircle size={24} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <div>
                    <p className="text-white font-black text-[15px]">You&apos;re subscribed!</p>
                    <p className="text-white/65 text-[13px] font-light">First briefing arrives next Friday.</p>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex gap-0">
                    <div className="relative flex-1">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" aria-hidden="true" />
                      <input type="email" placeholder="your@email.com" value={email}
                        onChange={e => { setEmail(e.target.value); setError(""); }}
                        onKeyDown={e => e.key === "Enter" && handleSubmit()}
                        className="w-full bg-white/[0.1] border border-white/20 border-r-0 text-white text-[13.5px] font-light placeholder-white/30 pl-11 pr-4 py-4 outline-none focus:border-white/50 focus:bg-white/[0.15] transition-all duration-200"
                        aria-label="Email address for newsletter" aria-invalid={!!error} />
                    </div>
                    <button onClick={handleSubmit} disabled={status === "loading"}
                      className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-4 transition-all duration-200 flex-shrink-0 disabled:opacity-60"
                      aria-label="Subscribe to newsletter">
                      {status === "loading" ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <><Send size={12} aria-hidden="true" /> Subscribe</>}
                    </button>
                  </div>
                  {error && <p role="alert" className="flex items-center gap-1.5 text-red-300 text-[11.5px] mt-2"><AlertCircle size={11} />{error}</p>}
                  <p className="text-white/38 text-[10.5px] font-light mt-3">
                    By subscribing you agree to our <Link href="/privacy" className="underline underline-offset-2 hover:text-white/60 transition-colors">Privacy Policy</Link>. Unsubscribe any time.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BLOG LIST VIEW
// ═══════════════════════════════════════════════════════════════════════════════
function BlogList({ onOpen }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery,    setSearchQuery]    = useState("");
  const heroRef    = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { ref: topicRef, inView: topicInView } = useReveal("-40px");

  const featuredArticle   = ARTICLES.find(a => a.featured);
  const secondaryArticles = ARTICLES.filter(a => !a.featured);

  const filtered = useMemo(() => {
    let list = activeCategory === "all"
      ? secondaryArticles
      : secondaryArticles.filter(a => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [activeCategory, searchQuery]);

  const rowArticles  = filtered.slice(0, 2);
  const gridArticles = filtered.slice(2);
  const { ref: hdrRef, inView: hdrInView } = useReveal("-40px");

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-[#00061a] overflow-hidden" aria-labelledby="blog-hero-heading">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[600px] bg-[#0818A8]/18 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[130px]" />
        </div>
        {[10, 30].map((p, i) => (
          <motion.div key={p} className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: `${p}%`, background: "linear-gradient(to bottom, transparent 5%, rgba(31,81,255,0.3) 45%, transparent 95%)" }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, delay: 0.8 + i * 0.15 }}
            aria-hidden="true" />
        ))}

        <div ref={heroRef} className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pt-[100px] pb-14 md:pb-16">
          <motion.nav aria-label="Breadcrumb" className="flex items-center gap-2 mb-10"
            initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.4 }}>
            <Link href="/" className="text-white/60 text-[11.5px] font-medium hover:text-white transition-colors">Home</Link>
            <ChevronRight size={11} className="text-white/25" aria-hidden="true" />
            <span className="text-white/80 text-[11.5px] font-medium" aria-current="page">Insights &amp; News</span>
          </motion.nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <motion.div initial={{ opacity: 0 }} animate={heroInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                <TagPill label="R-Zone Cargo Blog" dark />
              </motion.div>
              <motion.h1 id="blog-hero-heading"
                className="font-black text-[clamp(36px,7vw,82px)] text-white leading-[0.87] tracking-[-0.038em] uppercase mb-5"
                initial={{ opacity: 0, y: 20 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}>
                Insights &amp;<br />
                <span className="relative inline-block">
                  <span className="text-[#1F51FF]">News.</span>
                  <motion.span className="absolute -bottom-2 left-0 h-[4px] rounded-full"
                    style={{ background: "linear-gradient(to right, #0818A8, #1F51FF)" }}
                    aria-hidden="true" initial={{ width: 0 }} animate={heroInView ? { width: "100%" } : {}} transition={{ duration: 0.65, delay: 0.9 }} />
                </span>
              </motion.h1>
              <motion.p className="text-white/65 text-[15px] font-light leading-relaxed max-w-xl"
                initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.25 }}>
                Shipping guides, customs tips, industry news and logistics insights from R-Zone — keeping UK–Nigeria shippers informed in 2026.
              </motion.p>
            </div>
            <motion.div className="lg:col-span-4 grid grid-cols-3 gap-3"
              initial={{ opacity: 0, x: 16 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.35 }}>
              {[
                { val: `${ARTICLES.length}+`, label: "Articles" },
                { val: "6", label: "Topics"  },
                { val: "Weekly", label: "Updates" },
              ].map(s => (
                <div key={s.label} className="border border-white/[0.07] bg-white/[0.05] p-4 text-center">
                  <p className="text-white font-black text-[20px] leading-none tracking-[-0.02em]">{s.val}</p>
                  <p className="text-white/50 text-[10px] font-semibold tracking-[0.1em] uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="relative z-10">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pb-6">
            <motion.div className="flex items-center gap-3 flex-wrap"
              initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.45 }}>
              <div className="relative flex-1 min-w-[240px] max-w-sm">
                <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" aria-hidden="true" />
                <input type="search" placeholder="Search articles…" value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-white/[0.08] border border-white/15 text-white text-[13px] font-light placeholder-white/25 pl-11 pr-4 py-3 outline-none focus:border-[#1F51FF]/50 focus:bg-white/[0.12] transition-all duration-200"
                  aria-label="Search blog articles" />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors" aria-label="Clear search">
                    <X size={13} aria-hidden="true" />
                  </button>
                )}
              </div>
              <span className="text-white/25 text-[11px] font-light hidden sm:block">{ARTICLES.length} articles published</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Featured + Trending ───────────────────────────────────────────── */}
      <section className="relative bg-[#00061a] pb-0" aria-labelledby="featured-heading">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-4 py-7 border-b border-white/[0.06]">
            <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
            <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/28">Editor&apos;s Pick</span>
            <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8">
            <div className="lg:col-span-8">
              <h2 id="featured-heading" className="sr-only">Featured Article</h2>
              {featuredArticle && <FeaturedCard article={featuredArticle} onOpen={onOpen} />}
            </div>
            <div className="lg:col-span-4">
              <TrendingList onOpen={onOpen} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Articles ─────────────────────────────────────────────────────── */}
      <section className="relative bg-white overflow-hidden" aria-labelledby="articles-heading">
        <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-18">

          <div ref={hdrRef} className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-7">
              <div>
                <motion.div initial={{ opacity: 0 }} animate={hdrInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
                  <TagPill label="All Articles" />
                </motion.div>
                <motion.h2 id="articles-heading"
                  className="font-black text-[clamp(24px,4vw,44px)] text-gray-900 leading-[0.92] tracking-[-0.025em] uppercase"
                  initial={{ opacity: 0, y: 14 }} animate={hdrInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                  Latest{" "}
                  <span className="relative inline-block text-[#0818A8]">
                    Insights.
                    <motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0818A8]" aria-hidden="true"
                      initial={{ width: 0 }} animate={hdrInView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.6 }} />
                  </span>
                </motion.h2>
              </div>
              <motion.p className="text-gray-500 text-[13px] font-light max-w-xs text-right hidden sm:block"
                initial={{ opacity: 0 }} animate={hdrInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "all" ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ""}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={hdrInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }}>
              <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
            </motion.div>
          </div>

          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="border border-gray-200 bg-gray-50 p-14 text-center">
                <Search size={32} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-800 font-bold text-[16px] mb-2">No articles found</p>
                <p className="text-gray-500 text-[13.5px] font-light mb-5">
                  {searchQuery ? `No results for "${searchQuery}".` : "No articles in this category yet."}
                </p>
                <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                  className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200"
                  aria-label="Show all articles">
                  Show All Articles
                </button>
              </motion.div>
            ) : (
              <motion.div key={`${activeCategory}-${searchQuery}`}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {rowArticles.length > 0 && (
                  <div className="space-y-5 mb-5">
                    {rowArticles.map((a, i) => <ArticleRow key={a.id} article={a} index={i} onOpen={onOpen} />)}
                  </div>
                )}
                {rowArticles.length > 0 && gridArticles.length > 0 && (
                  <div className="flex items-center gap-4 my-10">
                    <div className="h-px flex-1 bg-gray-100" aria-hidden="true" />
                    <span className="text-[9px] font-black tracking-[0.3em] uppercase text-gray-400">More Articles</span>
                    <div className="h-px flex-1 bg-gray-100" aria-hidden="true" />
                  </div>
                )}
                {gridArticles.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {gridArticles.map((a, i) => <ArticleCard key={a.id} article={a} index={i} onOpen={onOpen} />)}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────────────────────────────── */}
      <NewsletterSection />

      {/* ── Topics grid ──────────────────────────────────────────────────── */}
      <section ref={topicRef} className="relative bg-[#00061a] overflow-hidden" aria-labelledby="topics-heading">
        <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-18">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0 }} animate={topicInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}>
              <TagPill label="Browse by Topic" dark />
            </motion.div>
            <motion.h2 id="topics-heading" className="font-black text-[clamp(22px,3.5vw,40px)] text-white leading-[0.92] tracking-[-0.025em] uppercase"
              initial={{ opacity: 0, y: 14 }} animate={topicInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              Explore Our{" "}<span className="text-[#1F51FF]">Topics.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.filter(c => c.id !== "all").map((cat, i) => {
              const Icon  = cat.icon;
              const count = ARTICLES.filter(a => a.category === cat.id).length;
              return (
                <motion.button key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document.getElementById("articles-heading")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group flex flex-col items-center gap-3 border border-white/[0.07] bg-white/[0.04] p-6 hover:border-white/[0.2] hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden text-center"
                  initial={{ opacity: 0, y: 18 }} animate={topicInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}
                  aria-label={`Browse ${cat.label} articles`}>
                  <div className="absolute top-0 left-0 right-0 h-[2px] w-0 group-hover:w-full transition-all duration-400" style={{ backgroundColor: cat.color }} aria-hidden="true" />
                  <div className="w-11 h-11 flex items-center justify-center" style={{ backgroundColor: `${cat.color}20` }} aria-hidden="true">
                    <Icon size={18} style={{ color: cat.color }} />
                  </div>
                  <div>
                    <p className="text-white/85 font-bold text-[12.5px] leading-tight">{cat.label}</p>
                    <p className="text-white/35 text-[10.5px] font-light mt-0.5">{count} article{count !== 1 ? "s" : ""}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT — Switches between list and reader, no routing
// ═══════════════════════════════════════════════════════════════════════════════
export default function BlogClient() {
  const [openArticle, setOpenArticle] = useState(null);

  const handleOpen = (article) => {
    if (article) {
      setOpenArticle(article);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setOpenArticle(null);
    }
  };

  const handleBack = (articleOrNull) => {
    if (articleOrNull && typeof articleOrNull === "object") {
      setOpenArticle(articleOrNull);
      window.scrollTo({ top: 0, behavior: "instant" });
    } else {
      setOpenArticle(null);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://r-zoneenterprises.com/blog" },
          ]},
          { "@type": "Blog",
            "name": "R-Zone Cargo Insights & News",
            "url": "https://r-zoneenterprises.com/blog",
            "description": "UK to Nigeria shipping guides, customs tips, industry news and logistics insights from R-Zone Enterprises — the highest-rated UK–Nigeria cargo company on Google.",
            "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "@id": "https://r-zoneenterprises.com/#organization" },
            "blogPost": ARTICLES.map(a => ({
              "@type": "BlogPosting",
              "headline": a.title,
              "description": a.excerpt,
              "url": `https://r-zoneenterprises.com/blog`,
              "datePublished": a.date,
              "image": a.img,
              "author": { "@type": "Organization", "name": a.author },
              "publisher": { "@type": "Organization", "name": "R-Zone Enterprises" },
              "keywords": a.tags.join(", "),
            })),
          },
        ],
      })}} />

      <div className={`${montserrat.variable} font-[family-name:var(--font-montserrat)] bg-white min-h-screen`}>
        <AnimatePresence mode="wait">
          {openArticle ? (
            <motion.div key={openArticle.id}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <ArticleReader article={openArticle} onBack={handleBack} />
            </motion.div>
          ) : (
            <motion.div key="list"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}>
              <BlogList onOpen={handleOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}