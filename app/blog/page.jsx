"use client";

import { Montserrat } from "next/font/google";
import { useRef, useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight, ChevronRight, Clock, BookOpen, Package,
  Globe, FileCheck, Zap, Star, Mail, ChevronDown,
  X, Calendar, User, TrendingUp, Search,
  ArrowLeft, Share2, Check, CheckCircle,
  AlertCircle, Loader2, Send, Link2,
} from "lucide-react";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const CATEGORIES = [
  { id: "all",     label: "All Posts",       icon: BookOpen,  color: "#0818A8" },
  { id: "guides",  label: "Shipping Guides", icon: Package,   color: "#1F51FF" },
  { id: "customs", label: "Customs & Duty",  icon: FileCheck, color: "#0437F2" },
  { id: "news",    label: "Industry News",   icon: Globe,     color: "#0818A8" },
  { id: "updates", label: "R-Zone Updates",  icon: Zap,       color: "#1F51FF" },
  { id: "tips",    label: "Expert Tips",     icon: Star,      color: "#0437F2" },
];

const ARTICLES = [
  {
    id: 1, slug: "air-freight-vs-sea-freight-ultimate-guide",
    category: "guides", featured: true,
    title: "Air Freight vs Sea Freight: The Ultimate UK\u2013Nigeria Decision Guide",
    excerpt: "Not sure whether to fly or sail your cargo to Nigeria? We break down transit times, cost differences, cargo restrictions, and exactly when each method makes financial sense for your situation.",
    author: "R-Zone Operations Team", date: "14 April 2026", readTime: "8 min read",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "Cargo aircraft at London Heathrow for Nigeria air freight",
    tags: ["Air Freight", "Sea Freight", "Cost Comparison"],
    content: [
      { h: "The Core Question: Speed vs Cost", body: "When shipping from the UK to Nigeria, the single most important decision you will make is whether to use air freight or sea freight. This choice affects your delivery timeline, your total cost, what items you can send, and how your cargo is handled from end to end.\n\nR-Zone Enterprises has been facilitating UK\u2013Nigeria cargo since 2012. In that time we have helped over 10,000 customers make this exact decision \u2014 and the right answer always depends on three things: your urgency, your volume, and what you are sending." },
      { h: "Air Freight to Nigeria: What You Need to Know", body: "Air freight is the fastest way to get cargo from the UK to Nigeria. At R-Zone, our air freight service operates three times weekly \u2014 Monday, Wednesday and Friday \u2014 from London Heathrow (LHR), Gatwick (LGW) and Manchester (MAN).\n\nTransit time is **5\u201310 working days**. Your cargo is consolidated, palletised, and loaded onto scheduled flights. Once it lands at Lagos Murtala Muhammed International Airport (LOS) or Abuja Nnamdi Azikiwe Airport (ABV), our Lagos team clears it through customs and arranges delivery.\n\nAir freight starts from **\u00a35 per kg**. Rates are applied on the greater of actual weight or volumetric weight (L \u00d7 W \u00d7 H in cm \u00f7 6,000).\n\n**Best for:** time-sensitive shipments, documents, electronics, clothing, smaller parcels." },
      { h: "Sea Freight to Nigeria: What You Need to Know", body: "Sea freight is the most cost-effective way to ship large, heavy, or bulky cargo from the UK to Nigeria. R-Zone operates weekly sea freight sailings from UK ports to Apapa and Tin Can Island in Lagos.\n\nTransit time is **4\u20136 weeks**. Your cargo is consolidated into a shared container (LCL) or full container (FCL) for larger volumes. Sea freight starts from **\u00a33 per kg**.\n\n**Best for:** household goods, furniture, large appliances, clothing in bulk, commercial merchandise." },
      { h: "Head-to-Head Comparison", body: "**Speed** \u2014 Air: 5\u201310 working days. Sea: 4\u20136 weeks.\n\n**Cost** \u2014 Air: from \u00a35/kg. Sea: from \u00a33/kg.\n\n**Volumetric formula** \u2014 Air: \u00f7 6,000. Sea: \u00f7 1,000.\n\n**Vehicles** \u2014 Air: not possible. Sea: yes, via RoRo.\n\n**Foodstuffs** \u2014 Air: yes, 20kg minimum. Sea: yes, 2 bags minimum.\n\n**Customs clearance** \u2014 Both: included in all R-Zone pricing." },
      { h: "When to Choose Air Freight", body: "Choose air freight when time matters more than money. If your recipient in Nigeria needs the goods within two weeks, air is your only realistic option.\n\nAir freight is also better for high-value items where cost of delay outweighs the premium of flying. For shipments under 50kg, air freight often works out similarly priced to sea freight once you factor in the time value of goods sitting in transit for 4\u20136 weeks." },
      { h: "When to Choose Sea Freight", body: "Choose sea freight when volume is high and you can plan ahead. Sea freight is dramatically cheaper for large shipments \u2014 if you are sending 200kg or more, the cost saving over air freight is substantial.\n\nSea freight is also the standard choice for household moves, vehicle shipping, and commercial merchandise. The key requirement is lead time: with 4\u20136 weeks in transit, plan your shipments at least 6\u20138 weeks before goods are needed in Nigeria." },
      { h: "Get a Free Quote from R-Zone", body: "Not sure which service suits your shipment? Contact our UK team on **+44 (0) 800 772 0864** or WhatsApp **+44 7915 647 119**. We will assess your cargo and recommend the most cost-effective option. Free quote, same-day response, no obligation." },
    ],
  },
  {
    id: 11, slug: "uk-to-lagos-cargo-complete-guide",
    category: "guides", featured: false,
    title: "UK to Lagos Cargo: The Complete 2026 Guide to Shipping from the UK to Lagos, Nigeria",
    excerpt: "Everything you need to know about shipping cargo from the United Kingdom to Lagos. Transit times, prices, customs, what to send \u2014 and how R-Zone makes it fast, affordable and completely stress-free.",
    author: "R-Zone Operations Team", date: "15 April 2026", readTime: "12 min read",
    img: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1400&q=80&auto=format&fit=crop",
    imgAlt: "UK to Lagos cargo shipping \u2014 R-Zone weekly air and sea freight service",
    tags: ["UK to Lagos", "Lagos Cargo", "Nigeria Shipping"],
    content: [
      { h: "Why Thousands of People Ship from the UK to Lagos Every Week", body: "Lagos is Nigeria's commercial capital and Africa's largest city \u2014 a metropolis of over 15 million people. For the more than one million Nigerians living in the United Kingdom, Lagos is home: where family lives, where businesses operate, and where cultural ties run deepest.\n\nEvery week, thousands of people in the UK search for ways to ship cargo to Lagos. R-Zone Enterprises has been answering those questions since 2012. We are the **highest-rated and highest-ranked UK-to-Nigeria cargo company on Google** \u2014 107+ five-star reviews earned organically, over 50,000 shipments delivered." },
      { h: "Air Freight from the UK to Lagos", body: "Air freight is the fastest way to send cargo from the UK to Lagos. R-Zone operates weekly air freight departures **three times per week** \u2014 Monday, Wednesday and Friday \u2014 from London Heathrow (LHR), Gatwick (LGW) and Manchester (MAN).\n\nYour cargo arrives at **Lagos Murtala Muhammed International Airport (LOS)** within **5\u201310 working days**. Once it lands, our Lagos team handles all Nigeria Customs Service (NCS) clearance and arranges door delivery.\n\nAir freight from the UK to Lagos starts from **\u00a35 per kg**. The price includes UK export documentation, airline consolidation, Lagos airport handling, customs clearance and standard delivery \u2014 no hidden fees." },
      { h: "Sea Freight from the UK to Lagos", body: "Sea freight is the most affordable way to ship larger or heavier cargo from the UK to Lagos. R-Zone operates **weekly sea freight sailings** from UK ports to **Apapa Port** and **Tin Can Island**, Lagos.\n\nTransit time is **4\u20136 weeks**. Sea freight from the UK to Lagos starts from **\u00a33 per kg** \u2014 the cheapest way to ship bulky or heavy goods. For vehicle shipping, we operate a specialist **RoRo (roll-on/roll-off)** service with monthly sailings." },
      { h: "Door-to-Door Cargo: UK to Lagos", body: "Our most popular service is door-to-door cargo \u2014 we collect from your UK address and deliver directly to the recipient's door in Lagos or anywhere in Nigeria.\n\nDoor-to-door cargo combines UK collection, transit (air or sea), both customs clearances, and final-mile delivery \u2014 all managed by our own teams at both ends. No handoffs, no third parties, no confusion.\n\nDoor-to-door cargo from the UK to Lagos starts from **\u00a36 per kg** including collection." },
      { h: "How Long Does Shipping from the UK to Lagos Take?", body: "**Air freight UK to Lagos: 5\u201310 working days.** This includes the flight (typically 6\u20138 hours direct), customs clearance at Lagos airport (1\u20133 days), and last-mile delivery (1\u20133 days).\n\n**Sea freight UK to Lagos: 4\u20136 weeks.** This includes sailing from UK ports to Apapa or Tin Can Island (approximately 21\u201328 days), port handling, customs clearance (2\u20135 days), and delivery.\n\nAll transit times start from the date we receive your cargo at our Upminster warehouse or collect it from your UK door." },
      { h: "What Can I Send from the UK to Lagos?", body: "R-Zone accepts a wide range of cargo for shipment to Lagos:\n\n**Clothing, shoes and accessories** \u2014 no quantity restrictions for personal use.\n\n**Electronics** \u2014 laptops, phones, televisions, kitchen appliances.\n\n**Foodstuffs** \u2014 a wide range of UK and African food products including tinned goods, dry foods, spices and snacks.\n\n**Household goods** \u2014 furniture, bedding, kitchen items, personal effects.\n\n**Business goods** \u2014 commercial merchandise, retail stock, raw materials.\n\n**Vehicles** \u2014 cars, motorcycles, vans via our specialist RoRo sea freight service.\n\n**Not accepted:** firearms, controlled drugs, bleaching creams, or any item on the UK or Nigerian import prohibition list." },
      { h: "Customs Clearance at Lagos: What to Expect", body: "All cargo arriving in Lagos must clear the Nigeria Customs Service (NCS). **R-Zone handles all NCS clearance on your behalf** \u2014 you do not need to deal with Nigerian customs separately.\n\nFor standard personal and household goods, clearance at Lagos takes 2\u20135 working days. R-Zone's Lagos customs team prepares all documentation and files all NCS declarations on your behalf. We have been NCS compliant since 2012." },
      { h: "How to Ship from the UK to Lagos with R-Zone", body: "**Step 1: Get a free quote** \u2014 call **+44 (0) 800 772 0864**, WhatsApp **+44 7915 647 119**, or use our online form. We respond the same day.\n\n**Step 2: Confirm your booking** \u2014 we confirm in writing with a unique reference number.\n\n**Step 3: Drop off or arrange collection** \u2014 bring cargo to our Upminster, Essex warehouse (Mon\u2013Fri 10am\u20136pm, Sat 11am\u20132pm) or we collect from your UK door.\n\n**Step 4: We handle everything else** \u2014 customs documentation, transit, Lagos clearance, and delivery. You receive SMS and email updates at every milestone." },
      { h: "Why R-Zone Is the Best Choice for UK to Lagos Cargo", body: "**12+ years of experience** \u2014 managing UK\u2013Lagos cargo since 2012.\n\n**107+ five-star Google reviews** \u2014 the highest-rated UK-to-Nigeria cargo company on Google. Organically earned.\n\n**Own teams at both ends** \u2014 our own warehouse in Upminster, Essex and our own operations team in Lagos. No third-party handoffs.\n\n**Full transparency** \u2014 the price you are quoted is the price you pay. No hidden fees.\n\n**Real-time tracking** \u2014 every shipment includes a tracking number with regular SMS and email updates.\n\nCall us on **+44 (0) 800 772 0864** or WhatsApp **+44 7915 647 119** to book your UK to Lagos cargo today." },
    ],
  },
  {
    id: 2, slug: "nigeria-customs-duty-complete-guide-2026",
    category: "customs", featured: false,
    title: "Nigeria Customs Duty 2026: What You\u2019ll Pay and How to Prepare",
    excerpt: "Import duties in Nigeria can catch shippers off guard. This complete guide covers current NCS tariff rates, NAFDAC requirements, prohibited items, and how to minimise delays at Apapa and Tin Can Island.",
    author: "R-Zone Compliance Team", date: "7 April 2026", readTime: "11 min read",
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Customs documentation review for Nigeria import",
    tags: ["NCS", "Duty Rates", "NAFDAC"],
    content: [
      { h: "Understanding Nigerian Import Duties", body: "Import duties in Nigeria are levied by the Nigeria Customs Service (NCS) under the ECOWAS Common External Tariff (CET). Rates range from 0% to 70% depending on the category of goods \u2014 and incorrect declarations can result in seizure, fines, or significant delays at Apapa or Tin Can Island.\n\nFor most personal and household goods shipped by individuals from the UK to Nigeria, duties are either exempt or at a low rate. Commercial goods imported for sale attract standard tariff rates based on HS (Harmonised System) codes." },
      { h: "Key NAFDAC Requirements", body: "NAFDAC (National Agency for Food and Drug Administration and Control) regulates food, beverages, cosmetics, drugs, and medical devices entering Nigeria. Any regulated product must carry a valid NAFDAC registration number.\n\nFor **personal-use quantities** \u2014 a reasonable amount a single household would consume \u2014 NAFDAC clearance is typically handled at port by our customs team with no extra fee.\n\nFor **commercial quantities** clearly intended for sale, NAFDAC pre-registration is required before shipping." },
      { h: "Most Commonly Dutiable Items", body: "**Electronics** (laptops, phones, TVs): typically 5\u201320% import duty.\n\n**Vehicles**: import duty ranges from 20\u201370% depending on age, engine size and type.\n\n**Textiles and clothing**: 35% import duty applies to most imported clothing.\n\n**Foodstuffs**: most basic food items attract 0\u20135% duty in personal-use quantities.\n\n**Highly dutiable**: second-hand clothing (35%), alcoholic beverages (20\u2013150%), tobacco (150%), luxury goods (20\u201335%)." },
      { h: "How to Minimise Customs Delays", body: "The single biggest cause of customs delays in Nigeria is **inaccurate or incomplete documentation**. R-Zone's customs team prevents delays by preparing every document correctly before your cargo arrives at port.\n\nDocuments prepared for every shipment include: commercial invoice, detailed packing list with weights and quantities, air waybill (air) or bill of lading (sea), and NCS Single Goods Declaration (SGD).\n\nWe file all documents electronically through the **NCS NICIS II system** before your cargo arrives \u2014 significantly reducing physical inspection rates and clearance times." },
      { h: "R-Zone Handles Everything", body: "As your authorised customs agent, R-Zone handles all NCS clearance at Lagos on your behalf. You do not need to be present, engage a separate customs broker, or deal with port authorities. Our Lagos team manages the entire process from port arrival to delivery to your door.\n\nCall us on **+44 (0) 800 772 0864** or WhatsApp us to discuss your specific shipment." },
    ],
  },
  {
    id: 3, slug: "how-to-pack-cargo-nigeria-professionally",
    category: "guides", featured: false,
    title: "How to Pack Your Cargo for Nigeria Like a Professional",
    excerpt: "Poor packaging is the single biggest cause of damaged cargo. Learn the professional techniques our warehouse team uses daily \u2014 from double-walling boxes to protecting fragile items for 4,000-mile journeys.",
    author: "R-Zone Warehouse Team", date: "1 April 2026", readTime: "6 min read",
    img: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Professional cargo packing at R-Zone Essex warehouse",
    tags: ["Packing", "Fragile Cargo", "Warehouse"],
    content: [
      { h: "Why Packing Is the Most Important Step", body: "Your cargo will travel over 4,000 miles from the UK to Nigeria \u2014 loaded, consolidated, palletised, placed onto aircraft or container vessels, transported to port, cleared through customs and delivered to a door. The right packaging is what stands between your goods arriving in perfect condition and arriving damaged.\n\nOur Upminster warehouse team repacks dozens of customer shipments every week \u2014 here is what we do differently." },
      { h: "Use the Right Box Size", body: "One of the most common mistakes is using a box that is too large for the contents. A half-empty box collapses under the weight of cargo stacked above it.\n\nAlways use **new, double-walled cardboard boxes** for cargo to Nigeria. Used boxes from supermarkets have weakened walls that will not survive a 4\u20136 week sea freight journey. New double-walled boxes cost around \u00a31\u20133 each and are worth every penny." },
      { h: "Filling and Cushioning", body: "Every item must be individually wrapped and cushioned. Use bubble wrap for fragile items, crumpled packing paper for void fill, and foam sheets for electronics and screens.\n\nFor **electronics specifically**: remove batteries where possible, wrap in anti-static bubble wrap, and place in the centre of the box surrounded by at least 5cm of foam on all sides.\n\nFor **clothing and soft goods**: compress using vacuum packing bags to maximise space and protect against moisture." },
      { h: "Sealing and Labelling", body: "Seal every seam with strong parcel tape \u2014 at least three strips along the top, bottom and both side seams. Do not use masking tape or thin packing tape \u2014 they will not survive the journey.\n\nLabel your box on at least **two sides** with the recipient's full name, complete Lagos address including state and LGA, and phone number. Include a label inside the box in case the external label becomes detached." },
      { h: "Packing for Sea Freight Specifically", body: "Sea freight journeys are longer \u2014 4\u20136 weeks in a container exposed to sea air, temperature changes and humidity. For sea freight to Lagos we strongly recommend:\n\nWrapping all items in cling film or plastic wrap before boxing \u2014 moisture barrier. Using silica gel packets inside boxes containing electronics or clothing. Lining the interior of your box with a plastic bin bag as an additional barrier. Sealing all food items in airtight containers or vacuum seal bags." },
    ],
  },
  {
    id: 4, slug: "rzone-expanded-air-schedule-2026",
    category: "updates", featured: false,
    title: "R-Zone Now Operates Three Weekly Air Departures to Nigeria",
    excerpt: "We now operate three weekly air departures from London to Lagos and Abuja. Here's everything about the new schedule, cut-off times, and how to take advantage of faster delivery.",
    author: "R-Zone Management", date: "20 March 2026", readTime: "4 min read",
    img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Cargo loading at UK airport \u2014 R-Zone expanded air schedule 2026",
    tags: ["Schedule", "Air Freight", "Announcement"],
    content: [
      { h: "Three Departures Weekly: Monday, Wednesday and Friday", body: "R-Zone Enterprises now operates air freight departures to Nigeria **three times every week** \u2014 every Monday, Wednesday and Friday \u2014 from London Heathrow (LHR), London Gatwick (LGW) and Manchester (MAN).\n\nThis expanded schedule significantly reduces the maximum waiting time for your cargo. Previously, if you missed a departure day, you could wait up to a week. Now the maximum wait between departures is just **two days**." },
      { h: "New Cut-Off Times", body: "To make a specific departure, cargo must be received at our Upminster warehouse by **12:00pm (midday)** on the departure day. For UK-wide door collections, schedule at least 24 hours before the departure day.\n\n**Monday departure:** cargo cut-off Sunday 5pm (door) or Monday 12pm (warehouse).\n**Wednesday departure:** cargo cut-off Tuesday 5pm (door) or Wednesday 12pm (warehouse).\n**Friday departure:** cargo cut-off Thursday 5pm (door) or Friday 12pm (warehouse)." },
      { h: "What This Means for Transit Times", body: "With three departures weekly, the average transit time from booking to delivery in Lagos has reduced significantly. Customers who book early in the week and drop off by Wednesday can now expect delivery within **7\u20139 working days** in most cases.\n\nFor urgent shipments, our Friday departure with express customs handling can achieve delivery in as few as **5\u20137 working days** in Lagos." },
      { h: "Pricing Remains Unchanged", body: "The expanded schedule does not affect our pricing. Air freight from the UK to Nigeria continues from **\u00a35 per kg**, with the same transparent, all-inclusive pricing structure. No fuel surcharge surprises, no hidden fees.\n\nTo book on any of our three weekly departures, contact us on **+44 (0) 800 772 0864**, WhatsApp **+44 7915 647 119**, or use our online quote form. Same-day response guaranteed." },
    ],
  },
  {
    id: 5, slug: "nigerian-diaspora-shipping-guide-uk",
    category: "guides", featured: false,
    title: "The Nigerian Diaspora\u2019s Complete UK Shipping Guide 2026",
    excerpt: "Whether you\u2019re sending Easter gifts, food to family, or goods to a business partner in Lagos \u2014 this guide covers everything the Nigerian community in the UK needs to know about shipping home.",
    author: "R-Zone Customer Team", date: "10 March 2026", readTime: "9 min read",
    img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Boxes being prepared for Nigeria shipping by UK diaspora customer",
    tags: ["Diaspora", "Family Shipping", "Guide"],
    content: [
      { h: "The Nigerian Community in the UK and Their Shipping Needs", body: "There are over one million Nigerians living in the United Kingdom. For many, the connection to Nigeria is not just emotional \u2014 it is practical: family members who need support, businesses that require supplies, aging parents who need items unavailable locally.\n\nR-Zone Enterprises was built specifically for this community. Founded in Essex in 2012, we have spent over twelve years making UK\u2013Nigeria shipping as simple and affordable as possible." },
      { h: "What You Can and Cannot Send", body: "Most everyday items are perfectly fine to ship from the UK to Nigeria: clothing, shoes, electronics, food items, household goods, books, toys and personal effects.\n\nItems that **cannot** be shipped include: firearms and ammunition, controlled drugs, bleaching creams, live animals, counterfeit goods, and items on the UK or Nigerian prohibited import list.\n\nFor foodstuffs: R-Zone accepts garri, fufu, egusi, dried fish, crayfish, palm oil, ogi, elubo, beans and most dry goods. All must be well-sealed and properly packed." },
      { h: "Sending Gifts: How to Pack for Personal Shipments", body: "For gift shipments \u2014 Christmas, Eid, Easter, birthdays \u2014 the most important thing is appropriate packaging:\n\nPack clothing in airtight vacuum bags. Wrap electronics individually in bubble wrap and pad all sides. Put food items in sealed airtight containers and pack separately from non-food items. Label every box clearly with the recipient's full name, address including state and LGA, and phone number." },
      { h: "How Much to Budget for Sending to Nigeria", body: "For a typical individual shipment:\n\nA **20kg box** of clothing and household goods by sea to Lagos: approximately **\u00a360\u201390**.\n\nThe same 20kg box by air: approximately **\u00a3100\u2013160**.\n\nA **50kg consolidation** of foodstuffs, clothing and electronics by sea to Lagos: approximately **\u00a3150\u2013230**.\n\nAll R-Zone prices include UK export documentation and Nigeria customs clearance. No hidden extras." },
      { h: "How to Book Your Shipment", body: "Call **+44 (0) 800 772 0864** or WhatsApp **+44 7915 647 119**. Our team will take your details, give you a quote, and confirm your booking with a reference number.\n\nYou can drop off at our Upminster, Essex warehouse (Monday\u2013Friday 10am\u20136pm, Saturday 11am\u20132pm) or we will collect from your door across the entire UK." },
    ],
  },
  {
    id: 6, slug: "apapa-port-what-shippers-need-to-know",
    category: "news", featured: false,
    title: "Apapa Port 2026: Current Situation and What UK Shippers Need to Know",
    excerpt: "Port congestion at Apapa remains a challenge for sea freight. We break down the current situation, expected clearance times, and practical steps to protect your supply chain from delays.",
    author: "R-Zone Operations Team", date: "28 February 2026", readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1494412685616-a5d310fbb07d?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Container ships at Lagos Apapa port Nigeria",
    tags: ["Apapa", "Port Delays", "Sea Freight"],
    content: [
      { h: "Current State of Apapa Port (April 2026)", body: "Apapa Port in Lagos remains Nigeria's busiest container terminal. As of April 2026, average customs clearance time for a correctly documented LCL shipment is **3\u20136 working days**. FCL clearance averages **4\u20138 working days**.\n\n**Tin Can Island port** \u2014 Apapa's neighbouring terminal \u2014 is generally less congested. R-Zone routes a significant portion of sea freight through Tin Can Island specifically to avoid Apapa backlogs where possible." },
      { h: "How Congestion Affects Your Delivery Timeline", body: "The published 4\u20136 week transit time assumes standard customs clearance. During peak congestion, the total time from UK departure to Lagos delivery can stretch to **7\u20138 weeks**.\n\nR-Zone's Lagos team monitors port conditions daily and proactively communicates with customers whose cargo is affected. We file all documents electronically through the **NCS NICIS II pre-clearance system** \u2014 significantly reducing the time cargo waits at the port gate.\n\nIf you have time-critical cargo, air freight to Lagos bypasses all port congestion and delivers within **5\u201310 working days** from the UK." },
      { h: "What R-Zone Does to Minimise Port Delays", body: "Our Lagos customs team are accredited NCS agents with over a decade of Apapa and Tin Can Island experience. Every sea freight shipment benefits from:\n\nElectronic pre-lodgement of all customs documents before the vessel arrives. Dedicated NCS relationships that facilitate faster inspection scheduling. Proactive monitoring of vessel arrival and port slot allocation. Real-time customer updates on clearance status via SMS and email." },
      { h: "Our Advice for UK Shippers in 2026", body: "Plan for a **6\u20138 week total timeline** when shipping by sea to Lagos, especially for commercial shipments where delivery deadlines matter.\n\nConsider air freight for anything time-sensitive. The premium over sea freight is modest for smaller shipments, and certainty of delivery within 5\u201310 working days is often worth the extra cost.\n\nR-Zone's compliance team checks every document before your cargo departs the UK \u2014 at no extra charge." },
    ],
  },
  {
    id: 7, slug: "volumetric-weight-explained",
    category: "tips", featured: false,
    title: "Volumetric Weight Explained: Why Your 10 kg Box Might Cost Like 18 kg",
    excerpt: "One of the most common surprises in freight billing is volumetric weight. We explain exactly how it's calculated, why carriers use it, and how to pack smarter to avoid unexpected charges.",
    author: "R-Zone Pricing Team", date: "14 February 2026", readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Cargo being measured and weighed at freight warehouse",
    tags: ["Pricing", "Volumetric Weight", "Cost Saving"],
    content: [
      { h: "What Is Volumetric Weight?", body: "Volumetric weight (also called dimensional weight or DIM weight) is a pricing method used by freight carriers that accounts for the physical space a shipment occupies \u2014 not just how much it weighs.\n\nCarriers charge based on whichever is greater \u2014 **actual weight or volumetric weight** \u2014 so that large, light shipments pay their fair share of capacity." },
      { h: "How Is Volumetric Weight Calculated?", body: "**For air freight:** Volumetric weight = L (cm) \u00d7 W (cm) \u00d7 H (cm) \u00f7 **6,000**\n\n**For sea freight:** Volumetric weight = L (cm) \u00d7 W (cm) \u00d7 H (cm) \u00f7 **1,000**\n\n**Example:** A box measuring 60cm \u00d7 50cm \u00d7 40cm weighing 10kg.\n\nAir: 60 \u00d7 50 \u00d7 40 = 120,000 \u00f7 6,000 = **20kg volumetric**. You pay for 20kg, not 10kg.\n\nSea: 60 \u00d7 50 \u00d7 40 = 120,000 \u00f7 1,000 = **120kg volumetric**. You pay for 120kg.\n\nThis is why large, light boxes \u2014 particularly for sea freight \u2014 can generate very high charges relative to their actual weight." },
      { h: "How to Pack Smarter and Reduce Volumetric Weight", body: "**Use appropriately sized boxes** \u2014 do not use a large box for a small amount of goods.\n\n**Use vacuum packing bags** for clothing and soft goods \u2014 dramatically reduce the volume of duvets, clothes and cushions.\n\n**Consolidate** multiple small boxes into fewer large, fully packed boxes \u2014 the total volumetric weight of one dense box is almost always lower than multiple sparse boxes.\n\nFor sea freight in particular, think cubic. Dense packing is always rewarded." },
      { h: "How R-Zone Calculates Your Charge", body: "R-Zone calculates charges based on the actual weight and volumetric weight of your cargo, measured at our Upminster warehouse. We use calibrated digital scales and measurement tools for accuracy.\n\nYour final charge is based on whichever is greater \u2014 at the published per-kg rate for your chosen service. We always communicate the calculated weight to you before processing payment.\n\nCall **+44 (0) 800 772 0864** if you have any questions about how your shipment will be calculated." },
    ],
  },
  {
    id: 8, slug: "nafdac-requirements-food-exports-nigeria",
    category: "customs", featured: false,
    title: "Sending Food from the UK to Nigeria? Here\u2019s What NAFDAC Requires in 2026",
    excerpt: "NAFDAC regulates all food imports into Nigeria. Before you ship groceries or African foodstuffs, read this to know exactly what is allowed and how to avoid seizure at the port.",
    author: "R-Zone Compliance Team", date: "31 January 2026", readTime: "7 min read",
    img: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80&auto=format&fit=crop",
    imgAlt: "Food items packaged for export to Nigeria from UK",
    tags: ["NAFDAC", "Food Export", "Compliance"],
    content: [
      { h: "What Is NAFDAC and Why Does It Matter?", body: "NAFDAC \u2014 the National Agency for Food and Drug Administration and Control \u2014 is Nigeria's regulatory body for food, drinks, cosmetics, drugs, medical devices, and chemicals entering the country.\n\nFor UK\u2013Nigeria shippers, NAFDAC is most relevant when sending food products, drinks, supplements, herbal remedies, cosmetics and medicines. Regulated products must either carry a valid NAFDAC registration number (commercial imports) or be cleared as personal-use quantities at port of entry." },
      { h: "Personal-Use vs Commercial Quantities", body: "**Personal-use quantities** \u2014 a reasonable amount a single person or household would consume \u2014 are generally cleared at port without pre-registration, as long as items are on the approved list and properly declared.\n\n**Commercial quantities** \u2014 larger volumes clearly intended for sale or distribution \u2014 require NAFDAC pre-registration before importing. Sending commercial quantities of unregistered products risks seizure and significant fines.\n\nR-Zone advises all customers sending food to declare quantities accurately. Misdeclaration is a serious offence under Nigerian law." },
      { h: "Approved Food Items for UK\u2013Nigeria Shipments", body: "R-Zone accepts the following food categories for air and sea freight to Nigeria:\n\n**Dry goods:** garri, fufu, eba, semolina, rice (including Ofada), beans (without kokoro), groundnuts, plantain chips, chin chin.\n\n**Condiments:** palm oil (sealed bottles), crayfish (sealed bottle), dried pepper, ogbono, egusi, curry powder, thyme, dried ginger.\n\n**Processed foods:** Golden Morn, Cerelac, Indomie noodles (**not chicken flavour**), Maggi cubes (**not chicken flavour**), tin tomatoes.\n\n**Not permitted:** bleaching creams, chicken-flavoured Indomie/Maggi, liquid herbal medicines, fresh meat or produce, alcohol." },
      { h: "R-Zone\u2019s Process for Food Shipments", body: "When you book a food shipment, our team reviews your item list at the point of booking and confirms which items are accepted.\n\nAt our Upminster warehouse, our team inspects all food items before acceptance \u2014 ensuring they are properly sealed, labelled and packed.\n\nAt the Lagos end, our customs team handles all NAFDAC clearance for personal-use food shipments as standard \u2014 no separate NAFDAC fee for standard personal-use quantities. Call **+44 (0) 800 772 0864** to discuss your specific food shipment." },
    ],
  },
  {
    id: 9, slug: "rzone-107-five-star-reviews-milestone",
    category: "updates", featured: false,
    title: "107 Five-Star Reviews: What Our Customers Are Saying in 2026",
    excerpt: "We\u2019ve hit 107 five-star Google reviews and we couldn\u2019t be more grateful. We share some of our favourite customer stories and what drives us to keep raising the bar every single week.",
    author: "R-Zone Management", date: "15 January 2026", readTime: "5 min read",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop",
    imgAlt: "R-Zone 107 five-star Google reviews milestone 2026",
    tags: ["Reviews", "Customer Success", "Milestone"],
    content: [
      { h: "107 Reviews. Organically Earned. Every Single One.", body: "When R-Zone Enterprises launched in 2012, our founder made a commitment: we would never ask for a review unless we had genuinely delivered for the customer. No incentivised reviews, no inflated ratings. Every star on our Google profile would represent a real person's real experience.\n\nToday, we have **107 five-star Google reviews** \u2014 the highest-rated and highest-ranked UK-to-Nigeria cargo company on Google." },
      { h: "What Our Customers Say", body: "**Vincent A.** (London to Lagos, 7 years): *\"I have been shipping with R-Zone for 7 years and they have never once let me down. Every shipment arrives in perfect condition. Genuinely the most reliable cargo company I have ever used.\"*\n\n**Oludotun O.** (Essex to Abeokuta): *\"Professional, caring, and they actually answer the phone. My cargo arrived ahead of schedule with updates every step of the way.\"*\n\n**Grace S.** (Manchester to Lagos): *\"I was nervous about shipping expensive electronics but R-Zone explained the whole process, packed everything securely, and delivered safely.\"*\n\n**Adeola E.** (Birmingham to Port Harcourt): *\"Competitive pricing, no hidden fees, and a customer service team that genuinely cares.\"*\n\n**Ijeoma N.** (London to Enugu): *\"From first phone call to delivery confirmation, the service was excellent. The cargo arrived in 8 days. Brilliant.\"*" },
      { h: "What These Reviews Mean to Us", body: "Each of these reviews represents a decision someone made to trust us with their cargo \u2014 and a promise we delivered on. Behind every five-star review is a box of family gifts that arrived safely. A consignment of goods that kept a business running. A suitcase of belongings for someone starting a new chapter.\n\nWe do not take that trust lightly. Every shipment, regardless of size, is handled with the same care." },
      { h: "Our Promise for 2026 and Beyond", body: "As we grow \u2014 adding new routes, new services, and new team members \u2014 our founding commitment does not change. We will always prioritise genuine service over marketing metrics. We will always answer the phone. We will always tell you the truth about your cargo.\n\nCall us on **+44 (0) 800 772 0864**, WhatsApp **+44 7915 647 119**, or get a free quote online. Same-day response, always." },
    ],
  },
];

const TRENDING = ARTICLES.slice(0, 4);

const fadeUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: (d = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: d } }),
};

function useReveal(margin = "-60px") {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin });
  return { ref, inView };
}

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

function RenderBody({ text }) {
  return (
    <div className="space-y-4">
      {text.split("\n\n").map((para, pi) => (
        <p key={pi} className="text-gray-700 text-[15px] font-normal leading-[1.85]">
          {para.split(/\*\*(.*?)\*\*/g).map((part, idx) =>
            idx % 2 === 1 ? <strong key={idx} className="font-bold text-gray-900">{part}</strong> : part
          )}
        </p>
      ))}
    </div>
  );
}

// ─── Share panel: unique hash URL per article ─────────────────────────────────
function SharePanel({ article }) {
  const [copied, setCopied] = useState(false);
  const [open,   setOpen]   = useState(false);

  const getUrl = useCallback(() => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}${window.location.pathname}#article/${article.slug}`;
  }, [article.slug]);

  const copy = useCallback(() => {
    const url = getUrl();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).catch(() => fallbackCopy(url));
    } else {
      fallbackCopy(url);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  }, [getUrl]);

  const fallbackCopy = (url) => {
    const el = document.createElement("input");
    el.value = url;
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
  };

  const shareX  = useCallback(() => { window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(getUrl())}`, "_blank", "noopener"); }, [article.title, getUrl]);
  const shareFb = useCallback(() => { window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getUrl())}`, "_blank", "noopener"); }, [getUrl]);
  const shareWa = useCallback(() => { window.open(`https://wa.me/?text=${encodeURIComponent(`${article.title}\n${getUrl()}`)}`, "_blank", "noopener"); }, [article.title, getUrl]);

  useEffect(() => {
    if (!open) return;
    const close = (e) => { if (!e.target.closest("[data-sp]")) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div className="relative" data-sp="">
      <button onClick={() => setOpen(o => !o)} aria-expanded={open}
        className="inline-flex items-center gap-2 border border-gray-300 hover:border-[#0818A8] hover:text-[#0818A8] text-gray-700 text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-200 bg-white">
        <Share2 size={12} aria-hidden="true" /> Share Article
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }} transition={{ duration: 0.18 }}
            className="absolute top-full left-0 mt-2 z-50 bg-white border border-gray-200 shadow-2xl min-w-[230px] overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-[9px] font-black tracking-[0.2em] uppercase text-gray-400 mb-1">Direct Article Link</p>
              <p className="text-[10.5px] font-mono text-[#0818A8] truncate max-w-[200px]">
                {typeof window !== "undefined" ? `...${window.location.pathname}#article/${article.slug}` : `#article/${article.slug}`}
              </p>
            </div>
            <button onClick={copy} className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100">
              {copied ? <Check size={14} className="text-emerald-500 flex-shrink-0" /> : <Link2 size={14} className="flex-shrink-0" />}
              {copied ? "Link copied!" : "Copy direct link"}
            </button>
            <button onClick={shareX} className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              Post on X (Twitter)
            </button>
            <button onClick={shareFb} className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-[#0818A8] transition-colors text-left border-b border-gray-100">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              Share on Facebook
            </button>
            <button onClick={shareWa} className="w-full flex items-center gap-3 px-4 py-3 text-[12px] font-semibold text-gray-800 hover:bg-gray-50 hover:text-emerald-600 transition-colors text-left">
              <svg width={14} height={14} viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Share on WhatsApp
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ARTICLE READER
// ═══════════════════════════════════════════════════════════════════════════════
function ArticleReader({ article, onBack }) {
  const topRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `${window.location.pathname}#article/${article.slug}`);
    }
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    return () => {
      if (typeof window !== "undefined") {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
  }, [article.slug]);

  const related = useMemo(() => {
    const same  = ARTICLES.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);
    const extra = ARTICLES.filter(a => a.id !== article.id && a.category !== article.category);
    return same.length >= 3 ? same : [...same, ...extra].slice(0, 3);
  }, [article]);

  return (
    <article ref={topRef} aria-labelledby="article-h1">
      {/* Hero */}
      <div className="relative bg-[#00061a] overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 left-1/3 w-[600px] h-[400px] bg-[#0818A8]/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#1F51FF]/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative h-[360px] md:h-[460px] overflow-hidden">
          <Image src={article.img} alt={article.imgAlt} fill priority sizes="100vw"
            className="object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#00061a] via-[#00061a]/55 to-[#00061a]/20" aria-hidden="true" />
        </div>
        <div className="relative z-10 max-w-[860px] mx-auto px-5 sm:px-8 -mt-60 md:-mt-72 pb-12 md:pb-16">
          <motion.button onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white text-[12px] font-bold tracking-[0.08em] uppercase mb-10 transition-colors"
            initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            aria-label="Back to all articles">
            <ArrowLeft size={14} aria-hidden="true" /> Back to Insights
          </motion.button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            <div className="flex items-center gap-3 mb-5 flex-wrap">
              <CategoryBadge cat={article.category} />
              <span className="text-white/40 text-[11px] font-medium">{article.readTime}</span>
            </div>
            <h1 id="article-h1" className="font-black text-[clamp(22px,4.5vw,50px)] text-white leading-[0.9] tracking-[-0.03em] uppercase mb-6">
              {article.title}
            </h1>
            <p className="text-white/65 text-[15px] font-light leading-relaxed mb-8 max-w-2xl">{article.excerpt}</p>
            <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/[0.08]">
              <ArticleMeta article={article} light />
              <SharePanel article={article} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[860px] mx-auto px-5 sm:px-8 py-12 md:py-16">
        {article.content.length > 2 && (
          <motion.div className="border border-[#0818A8]/15 bg-[#0818A8]/4 p-6 mb-12"
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="text-[11px] font-black tracking-[0.3em] uppercase text-[#0818A8] mb-4">In This Article</p>
            <ol className="space-y-2.5">
              {article.content.map((sec, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="font-black text-[#0818A8]/35 text-[12px] flex-shrink-0 w-5 mt-0.5">{i + 1}.</span>
                  <span className="text-[13px] font-semibold text-gray-800 leading-snug">{sec.h}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        )}

        <div className="space-y-12">
          {article.content.map((sec, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.07 }}>
              <h2 className="font-black text-[clamp(16px,2.5vw,22px)] text-[#0b0f1a] leading-tight tracking-[-0.02em] uppercase mb-5 pl-4 border-l-[3px] border-[#0818A8]">
                {sec.h}
              </h2>
              <RenderBody text={sec.body} />
            </motion.div>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 mt-12 pt-8 border-t border-gray-100">
          {article.tags.map(t => (
            <span key={t} className="text-[10px] font-semibold text-gray-500 border border-gray-200 px-3 py-1.5 hover:border-[#0818A8] hover:text-[#0818A8] transition-colors cursor-default">#{t}</span>
          ))}
        </div>

        <div className="flex items-center justify-between flex-wrap gap-4 mt-8 pt-8 border-t border-gray-100">
          <div>
            <p className="text-[13px] font-bold text-gray-900 mb-0.5">Found this useful?</p>
            <p className="text-gray-500 text-[12px] font-normal">Share this article with someone who ships to Nigeria.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <SharePanel article={article} />
            <button onClick={onBack}
              className="inline-flex items-center gap-2 border border-gray-200 hover:border-[#0818A8] text-gray-600 hover:text-[#0818A8] text-[11px] font-bold tracking-[0.08em] uppercase px-4 py-2.5 transition-all duration-200">
              <ArrowLeft size={11} aria-hidden="true" /> All Articles
            </button>
          </div>
        </div>

        <div className="mt-12 bg-[#0818A8] p-7 md:p-10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
            style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "44px 44px" }} />
          <div className="relative z-10">
            <p className="text-white/60 text-[10px] font-black tracking-[0.3em] uppercase mb-2">Ready to Ship?</p>
            <h3 className="text-white font-black text-[22px] md:text-[26px] tracking-[-0.015em] mb-3 leading-tight">
              Get a free UK\u2013Nigeria cargo quote from R-Zone.
            </h3>
            <p className="text-white/70 text-[13px] font-normal mb-7 max-w-lg leading-relaxed">
              Air from \u00a35/kg \u00b7 Sea from \u00a33/kg \u00b7 Weekly departures \u00b7 Same-day response \u00b7 107+ five-star reviews \u00b7 #1 on Google.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/quote"
                className="group inline-flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200">
                Get a Free Quote <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
              <a href="tel:+448007720864"
                className="inline-flex items-center gap-2 border border-white/30 hover:border-white text-white text-[12px] font-bold tracking-[0.08em] uppercase px-6 py-3.5 transition-all duration-200">
                Call +44 800 772 0864
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-gray-50 border-t border-gray-100 py-14 md:py-16">
          <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">
            <div className="flex items-center gap-4 mb-9">
              <p className="text-[10px] font-black tracking-[0.35em] uppercase text-gray-400">More to Read</p>
              <div className="h-px flex-1 bg-gray-200" aria-hidden="true" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((a, i) => (
                <RelatedCard key={a.id} article={a} index={i} />
              ))}
            </div>
            <div className="text-center mt-10">
              <button onClick={onBack}
                className="group inline-flex items-center gap-2 border-2 border-[#0818A8]/20 hover:border-[#0818A8] text-[#0818A8] text-[12px] font-black tracking-[0.1em] uppercase px-8 py-3.5 hover:bg-[#0818A8] hover:text-white transition-all duration-200">
                <ArrowLeft size={12} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
                Back to All Insights
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function RelatedCard({ article, index }) {
  const { ref, inView } = useReveal("-40px");
  const [, forceUpdate] = useState(0);
  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.location.hash = `#article/${article.slug}`;
    }
  };
  return (
    <motion.div ref={ref}
      className="group flex flex-col border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-lg hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative cursor-pointer"
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.08 }}
      role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && handleClick()}
      aria-label={`Read: ${article.title}`}>
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className="relative h-[160px] overflow-hidden flex-shrink-0">
        <Image src={article.img} alt={article.imgAlt} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
      </div>
      <div className="p-5 flex-1 flex flex-col">
        <CategoryBadge cat={article.category} />
        <p className="font-black text-[13.5px] text-gray-900 leading-snug tracking-[-0.01em] mt-2 mb-3 group-hover:text-[#0818A8] transition-colors line-clamp-2">{article.title}</p>
        <ArticleMeta article={article} />
      </div>
    </motion.div>
  );
}

function FeaturedCard({ article, onOpen }) {
  const { ref, inView } = useReveal("-40px");
  return (
    <motion.article ref={ref}
      className="group relative overflow-hidden bg-[#00061a] border border-white/[0.07] hover:border-[#0818A8]/50 transition-all duration-500 cursor-pointer"
      onClick={() => onOpen(article)}
      initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}
      role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && onOpen(article)}
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
        <h2 className="font-black text-[clamp(22px,3.5vw,38px)] text-white leading-[0.92] tracking-[-0.025em] uppercase mb-4">{article.title}</h2>
        <p className="text-white/65 text-[14px] font-light leading-relaxed max-w-2xl mb-6">{article.excerpt}</p>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <ArticleMeta article={article} light />
          <span className="inline-flex items-center gap-2 bg-[#0818A8] group-hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.1em] uppercase px-6 py-3 transition-all duration-200 shadow-lg shadow-[#0818A8]/25">
            Read Article <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
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

function ArticleCard({ article, index, onOpen }) {
  const { ref, inView } = useReveal("-40px");
  return (
    <motion.article ref={ref}
      className="group flex flex-col border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative cursor-pointer"
      onClick={() => onOpen(article)}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: index * 0.07 }}
      role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && onOpen(article)}
      aria-label={`Read article: ${article.title}`}>
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className="relative h-[200px] overflow-hidden bg-gray-100 flex-shrink-0">
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.6 }}>
          <Image src={article.img} alt={article.imgAlt} fill className="object-cover" sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw" loading="lazy" />
        </motion.div>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-center gap-2 mb-3"><CategoryBadge cat={article.category} /></div>
        <h3 className="font-black text-[15px] text-gray-900 leading-snug tracking-[-0.015em] mb-3 group-hover:text-[#0818A8] transition-colors line-clamp-3">{article.title}</h3>
        <p className="text-gray-600 text-[13px] font-light leading-relaxed mb-4 line-clamp-3 flex-1">{article.excerpt}</p>
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

function ArticleRow({ article, index, onOpen }) {
  const { ref, inView } = useReveal("-40px");
  const isEven = index % 2 === 0;
  return (
    <motion.article ref={ref}
      className="group grid grid-cols-1 md:grid-cols-2 border border-gray-200 bg-white hover:border-[#0818A8]/35 hover:shadow-xl hover:shadow-[#0818A8]/8 transition-all duration-300 overflow-hidden relative cursor-pointer"
      onClick={() => onOpen(article)}
      initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.65, delay: index * 0.08 }}
      role="button" tabIndex={0} onKeyDown={e => e.key === "Enter" && onOpen(article)}
      aria-label={`Read article: ${article.title}`}>
      <div className="absolute top-0 left-0 h-[3px] w-0 group-hover:w-full transition-all duration-500 bg-gradient-to-r from-[#0818A8] to-[#1F51FF]" aria-hidden="true" />
      <div className={`relative h-[260px] md:h-full overflow-hidden bg-gray-100 ${!isEven ? "md:order-2" : ""}`}>
        <motion.div className="absolute inset-0" whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
          <Image src={article.img} alt={article.imgAlt} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" loading="lazy" />
        </motion.div>
        <div className="absolute top-5 left-5"><CategoryBadge cat={article.category} /></div>
      </div>
      <div className={`flex flex-col justify-center p-7 md:p-9 ${!isEven ? "md:order-1" : ""}`}>
        <h3 className="font-black text-[clamp(17px,2vw,22px)] text-gray-900 leading-[0.92] tracking-[-0.02em] uppercase mb-4 group-hover:text-[#0818A8] transition-colors">{article.title}</h3>
        <p className="text-gray-600 text-[13.5px] font-light leading-relaxed mb-6">{article.excerpt}</p>
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
            <motion.button key={a.id} className="group flex items-start gap-3 w-full text-left"
              onClick={() => onOpen(a)}
              initial={{ opacity: 0, x: 12 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.45, delay: i * 0.08 }}
              aria-label={`Read: ${a.title}`}>
              <span className="font-black text-[26px] leading-none text-[#0818A8]/12 flex-shrink-0 w-8 text-right">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <span className="inline-block text-[9px] font-bold tracking-[0.18em] uppercase text-[#0818A8] mb-1">
                  {CATEGORIES.find(c => c.id === a.category)?.label}
                </span>
                <p className="text-[12.5px] font-semibold text-gray-800 group-hover:text-[#0818A8] transition-colors leading-snug">{a.title}</p>
                <span className="text-gray-400 text-[11px] font-light">{a.readTime}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </aside>
  );
}

function CategoryFilter({ active, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
      {CATEGORIES.map(cat => {
        const Icon = cat.icon;
        const isActive = active === cat.id;
        return (
          <button key={cat.id} onClick={() => onSelect(cat.id)}
            className={`inline-flex items-center gap-2 px-4 py-2.5 text-[11.5px] font-semibold border transition-all duration-200 ${isActive ? "text-white border-[#0818A8] bg-[#0818A8] shadow-md shadow-[#0818A8]/20" : "text-gray-600 border-gray-200 bg-white hover:border-[#0818A8]/40 hover:text-[#0818A8]"}`}
            aria-pressed={isActive}>
            <Icon size={12} aria-hidden="true" />{cat.label}
          </button>
        );
      })}
    </div>
  );
}

function NewsletterSection() {
  const { ref, inView } = useReveal("-40px");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const submit = async () => {
    if (!email.trim()) { setError("Please enter your email address."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Please enter a valid email."); return; }
    setError(""); setStatus("loading");
    await new Promise(r => setTimeout(r, 1500));
    setStatus("success");
  };
  return (
    <section ref={ref} className="relative bg-[#0818A8] overflow-hidden">
      <div className="absolute inset-0 opacity-[0.07] pointer-events-none" aria-hidden="true"
        style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "52px 52px" }} />
      <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2.5 mb-5"><Mail size={16} className="text-white/60" aria-hidden="true" /><span className="text-white/60 text-[10px] font-bold tracking-[0.3em] uppercase">Newsletter</span></div>
            <h2 className="font-black text-[clamp(24px,4vw,42px)] text-white leading-[0.92] tracking-[-0.025em] uppercase mb-4">
              Get Freight Insights<br /><span className="text-white/40">Delivered Weekly.</span>
            </h2>
            <p className="text-white/65 text-[14px] font-light leading-relaxed">Join 2,000+ UK\u2013Nigeria shippers who get our weekly logistics briefing.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.2 }}>
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="s" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-4 border border-white/20 bg-white/10 px-6 py-5">
                  <CheckCircle size={24} className="text-emerald-400 flex-shrink-0" aria-hidden="true" />
                  <div><p className="text-white font-black text-[15px]">You\u2019re subscribed!</p><p className="text-white/65 text-[13px] font-light">First briefing arrives next Friday.</p></div>
                </motion.div>
              ) : (
                <motion.div key="f" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <div className="flex gap-0">
                    <div className="relative flex-1">
                      <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" aria-hidden="true" />
                      <input type="email" placeholder="your@email.com" value={email} onChange={e => { setEmail(e.target.value); setError(""); }} onKeyDown={e => e.key === "Enter" && submit()}
                        className="w-full bg-white/[0.1] border border-white/20 border-r-0 text-white text-[13.5px] font-light placeholder-white/30 pl-11 pr-4 py-4 outline-none focus:border-white/50 transition-all duration-200" aria-label="Email address" />
                    </div>
                    <button onClick={submit} disabled={status === "loading"} className="flex items-center gap-2 bg-white hover:bg-gray-100 text-[#0818A8] text-[12px] font-black tracking-[0.08em] uppercase px-6 py-4 transition-all duration-200 flex-shrink-0 disabled:opacity-60">
                      {status === "loading" ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <><Send size={12} aria-hidden="true" /> Subscribe</>}
                    </button>
                  </div>
                  {error && <p role="alert" className="flex items-center gap-1.5 text-red-300 text-[11.5px] mt-2"><AlertCircle size={11} />{error}</p>}
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
// BLOG LIST
// ═══════════════════════════════════════════════════════════════════════════════
function BlogList({ onOpen }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });
  const { ref: topicRef, inView: topicInView } = useReveal("-40px");
  const { ref: hdrRef, inView: hdrInView } = useReveal("-40px");

  const featuredArticle = ARTICLES.find(a => a.featured);
  const secondaryArticles = ARTICLES.filter(a => !a.featured);

  const filtered = useMemo(() => {
    let list = activeCategory === "all" ? secondaryArticles : secondaryArticles.filter(a => a.category === activeCategory);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q) || a.tags.some(t => t.toLowerCase().includes(q)));
    }
    return list;
  }, [activeCategory, searchQuery]);

  const rowArticles = filtered.slice(0, 2);
  const gridArticles = filtered.slice(2);

  return (
    <>
      <section className="relative bg-[#00061a] overflow-hidden" aria-labelledby="blog-hero-h1">
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-[-15%] left-[-5%] w-[700px] h-[600px] bg-[#0818A8]/18 rounded-full blur-[150px]" />
          <div className="absolute bottom-[-20%] right-[-5%] w-[500px] h-[400px] bg-[#1F51FF]/10 rounded-full blur-[130px]" />
        </div>
        {[10, 30].map((p, i) => (
          <motion.div key={p} className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: `${p}%`, background: "linear-gradient(to bottom, transparent 5%, rgba(31,81,255,0.3) 45%, transparent 95%)" }}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ duration: 1.4, delay: 0.8 + i * 0.15 }} aria-hidden="true" />
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
              <motion.h1 id="blog-hero-h1" className="font-black text-[clamp(36px,7vw,82px)] text-white leading-[0.87] tracking-[-0.038em] uppercase mb-5"
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
                Shipping guides, customs tips, industry news and logistics insights from R-Zone \u2014 keeping UK\u2013Nigeria shippers informed in 2026.
              </motion.p>
            </div>
            <motion.div className="lg:col-span-4 grid grid-cols-3 gap-3"
              initial={{ opacity: 0, x: 16 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.65, delay: 0.35 }}>
              {[{ val: `${ARTICLES.length}+`, label: "Articles" }, { val: "6", label: "Topics" }, { val: "Weekly", label: "Updates" }].map(s => (
                <div key={s.label} className="border border-white/[0.07] bg-white/[0.05] p-4 text-center">
                  <p className="text-white font-black text-[20px] leading-none tracking-[-0.02em]">{s.val}</p>
                  <p className="text-white/50 text-[10px] font-semibold tracking-[0.1em] uppercase mt-1">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 pb-6">
          <motion.div className="flex items-center gap-3 flex-wrap"
            initial={{ opacity: 0, y: 12 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.45 }}>
            <div className="relative flex-1 min-w-[240px] max-w-sm">
              <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" aria-hidden="true" />
              <input type="search" placeholder="Search articles\u2026" value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.08] border border-white/15 text-white text-[13px] font-light placeholder-white/25 pl-11 pr-4 py-3 outline-none focus:border-[#1F51FF]/50 transition-all duration-200"
                aria-label="Search blog articles" />
              {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors"><X size={13} aria-hidden="true" /></button>}
            </div>
            <span className="text-white/25 text-[11px] font-light hidden sm:block">{ARTICLES.length} articles published</span>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[#00061a] pb-0">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10">
          <div className="flex items-center gap-4 py-7 border-b border-white/[0.06]">
            <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
            <span className="text-[9px] font-black tracking-[0.35em] uppercase text-white/28">Editor\u2019s Pick</span>
            <div className="h-px flex-1 bg-white/[0.06]" aria-hidden="true" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 py-8">
            <div className="lg:col-span-8">
              {featuredArticle && <FeaturedCard article={featuredArticle} onOpen={onOpen} />}
            </div>
            <div className="lg:col-span-4"><TrendingList onOpen={onOpen} /></div>
          </div>
        </div>
      </section>

      <section className="relative bg-white overflow-hidden" aria-labelledby="articles-h2">
        <div className="absolute inset-0 pointer-events-none opacity-50" aria-hidden="true"
          style={{ backgroundImage: "radial-gradient(circle, rgba(8,24,168,0.04) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-20">
          <div ref={hdrRef} className="mb-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-7">
              <div>
                <motion.div initial={{ opacity: 0 }} animate={hdrInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}><TagPill label="All Articles" /></motion.div>
                <motion.h2 id="articles-h2" className="font-black text-[clamp(24px,4vw,44px)] text-gray-900 leading-[0.92] tracking-[-0.025em] uppercase"
                  initial={{ opacity: 0, y: 14 }} animate={hdrInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
                  Latest{" "}<span className="relative inline-block text-[#0818A8]">Insights.<motion.span className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-[#0818A8]" aria-hidden="true" initial={{ width: 0 }} animate={hdrInView ? { width: "100%" } : {}} transition={{ duration: 0.55, delay: 0.6 }} /></span>
                </motion.h2>
              </div>
              <motion.p className="text-gray-500 text-[13px] font-light max-w-xs text-right hidden sm:block"
                initial={{ opacity: 0 }} animate={hdrInView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.2 }}>
                {filtered.length} article{filtered.length !== 1 ? "s" : ""}{activeCategory !== "all" ? ` in ${CATEGORIES.find(c => c.id === activeCategory)?.label}` : ""}
              </motion.p>
            </div>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={hdrInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.55, delay: 0.2 }}>
              <CategoryFilter active={activeCategory} onSelect={setActiveCategory} />
            </motion.div>
          </div>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border border-gray-200 bg-gray-50 p-14 text-center">
                <Search size={32} className="text-gray-300 mx-auto mb-4" aria-hidden="true" />
                <p className="text-gray-800 font-bold text-[16px] mb-2">No articles found</p>
                <p className="text-gray-500 text-[13.5px] font-light mb-5">{searchQuery ? `No results for "${searchQuery}".` : "No articles in this category yet."}</p>
                <button onClick={() => { setActiveCategory("all"); setSearchQuery(""); }} className="inline-flex items-center gap-2 bg-[#0818A8] hover:bg-[#0437F2] text-white text-[11.5px] font-black tracking-[0.08em] uppercase px-6 py-3 transition-all duration-200">Show All Articles</button>
              </motion.div>
            ) : (
              <motion.div key={`${activeCategory}-${searchQuery}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {rowArticles.length > 0 && <div className="space-y-5 mb-5">{rowArticles.map((a, i) => <ArticleRow key={a.id} article={a} index={i} onOpen={onOpen} />)}</div>}
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

      <NewsletterSection />

      <section ref={topicRef} className="relative bg-[#00061a] overflow-hidden" aria-labelledby="topics-h2">
        <div className="absolute inset-0 opacity-[0.022] pointer-events-none" aria-hidden="true"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,1) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#0818A8]/40 to-transparent pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 max-w-[1380px] mx-auto px-5 sm:px-8 xl:px-10 py-14 md:py-18">
          <div className="text-center mb-10">
            <motion.div initial={{ opacity: 0 }} animate={topicInView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}><TagPill label="Browse by Topic" dark /></motion.div>
            <motion.h2 id="topics-h2" className="font-black text-[clamp(22px,3.5vw,40px)] text-white leading-[0.92] tracking-[-0.025em] uppercase"
              initial={{ opacity: 0, y: 14 }} animate={topicInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
              Explore Our{" "}<span className="text-[#1F51FF]">Topics.</span>
            </motion.h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {CATEGORIES.filter(c => c.id !== "all").map((cat, i) => {
              const Icon = cat.icon;
              const count = ARTICLES.filter(a => a.category === cat.id).length;
              return (
                <motion.button key={cat.id}
                  onClick={() => { setActiveCategory(cat.id); document.getElementById("articles-h2")?.scrollIntoView({ behavior: "smooth" }); }}
                  className="group flex flex-col items-center gap-3 border border-white/[0.07] bg-white/[0.04] p-6 hover:border-white/[0.2] hover:bg-white/[0.08] transition-all duration-300 relative overflow-hidden text-center"
                  initial={{ opacity: 0, y: 18 }} animate={topicInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: i * 0.07 }}>
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
// ROOT
// ═══════════════════════════════════════════════════════════════════════════════
export default function BlogClient() {
  const [openArticle, setOpenArticle] = useState(null);

  useEffect(() => {
    const checkHash = () => {
      const hash = typeof window !== "undefined" ? window.location.hash : "";
      if (hash.startsWith("#article/")) {
        const slug = hash.replace("#article/", "");
        const found = ARTICLES.find(a => a.slug === slug);
        if (found) { setOpenArticle(found); window.scrollTo({ top: 0, behavior: "instant" }); }
      } else {
        setOpenArticle(null);
      }
    };
    checkHash();
    window.addEventListener("hashchange", checkHash);
    return () => window.removeEventListener("hashchange", checkHash);
  }, []);

  const handleOpen = useCallback((article) => {
    setOpenArticle(article);
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const handleBack = useCallback(() => {
    setOpenArticle(null);
    if (typeof window !== "undefined") window.history.replaceState(null, "", window.location.pathname);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
          { "@type": "BreadcrumbList", "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://r-zoneenterprises.com" },
            { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://r-zoneenterprises.com/blog" },
          ]},
          { "@type": "Blog", "name": "R-Zone Cargo Insights & News", "url": "https://r-zoneenterprises.com/blog",
            "description": "UK to Nigeria shipping guides, customs tips, industry news and logistics insights.",
            "publisher": { "@type": "Organization", "name": "R-Zone Enterprises", "@id": "https://r-zoneenterprises.com/#organization" },
            "blogPost": ARTICLES.map(a => ({
              "@type": "BlogPosting", "headline": a.title, "description": a.excerpt,
              "url": `https://r-zoneenterprises.com/blog#article/${a.slug}`,
              "datePublished": a.date, "image": a.img,
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
            <motion.div key={openArticle.slug} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <ArticleReader article={openArticle} onBack={handleBack} />
            </motion.div>
          ) : (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.22 }}>
              <BlogList onOpen={handleOpen} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}