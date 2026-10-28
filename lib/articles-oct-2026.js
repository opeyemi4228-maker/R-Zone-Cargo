// lib/articles-oct-2026.js
// ─────────────────────────────────────────────────────────────────────────────
// Ten articles added 20 October 2026, spread into ARTICLES in lib/articles.js.
// Kept in their own file so the main list stays easy to edit.
//
// Each one targets a search intent no other page on the site covers (checked
// against every live post and the 2026-10-19 consolidation redirects), so they
// add reach instead of competing with existing pages.
//
// House rules followed: UK English, no em or en dashes, prices only where the
// site states them consistently (air from £5.80/kg, £20 air handling fee),
// state-by-state rates left to the price list, no ranking claims.
// Every article also needs app/blog/<slug>/page.jsx (see blog-add-article note).
// ─────────────────────────────────────────────────────────────────────────────

const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const URL = (slug) => `https://r-zoneenterprises.com/blog/${slug}`;

const PUBLISHED = "2026-10-20";
const DATE = "20 October 2026";

const CALL = "Call **+44 (0) 800 772 0864** or WhatsApp **+44 7915 647119** and a member of our UK team will help.";

export const OCTOBER_2026_ARTICLES = [
 // ═══════════════════════════════════════════════════════════════════════════
 // 43 · Port Harcourt
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 43,
 slug: "cargo-to-port-harcourt-from-uk",
 category: "guides",
 featured: false,
 priority: 0.75,
 wordCount: 1150,
 lastReviewed: PUBLISHED,
 metaTitle: "Cargo to Port Harcourt from the UK: Air, Sea & Door to Door",
 metaDesc: "How to send cargo from the UK to Port Harcourt and Rivers State: air or sea, transit times, door to door delivery and what to prepare before you ship.",
 keywords: ["cargo to Port Harcourt from UK", "shipping to Port Harcourt", "send parcel to Port Harcourt", "UK to Rivers State cargo", "door to door cargo Port Harcourt"],
 ogImage: IMG("1494412685616-a5d310fbb07d", 1200),
 canonicalUrl: URL("cargo-to-port-harcourt-from-uk"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Sending Cargo to Port Harcourt from the UK: A Practical Guide",
 excerpt: "Air or sea, drop-off or collection, and how your boxes get from the UK to an address in Port Harcourt or anywhere in Rivers State.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1494412685616-a5d310fbb07d", 1400),
 imgAlt: "Container ships at a Nigerian port with cargo bound for Port Harcourt",
 tags: ["Port Harcourt", "Rivers State", "Door to Door", "UK Nigeria"],
 relatedSlugs: ["door-to-door-shipping-uk-to-nigeria", "air-freight-vs-sea-freight-nigeria", "how-long-shipping-uk-to-nigeria-takes"],
 quickAnswer: "R-Zone ships from the UK to Port Harcourt by air (typically 5 to 10 working days) or by sea (4 to 6 weeks). Cargo clears Nigerian customs as part of your quote and is delivered to your address in Port Harcourt or anywhere in Rivers State.",
 keyFacts: [
 { label: "Air transit", value: "5 to 10 working days" },
 { label: "Sea transit", value: "4 to 6 weeks" },
 { label: "Customs", value: "Included in your quote" },
 { label: "Delivery", value: "Door to door across Rivers State" },
 ],
 faqSchema: [
 { question: "How long does cargo take from the UK to Port Harcourt?", answer: "Air freight typically takes 5 to 10 working days and sea freight 4 to 6 weeks. Delivery into Port Harcourt can add a little time after customs clearance in Lagos, and your quote gives the expected date for your address." },
 { question: "Do you deliver outside Port Harcourt city?", answer: "Yes. We deliver to addresses across Rivers State, including Obio-Akpor, Eleme, Oyigbo and Bonny, as well as every other Nigerian state." },
 { question: "Is customs clearance included for Port Harcourt deliveries?", answer: "Yes. Nigerian customs clearance is part of every R-Zone quote, so there is no separate clearing agent to find or pay." },
 { question: "Can I drop my boxes off instead of booking a collection?", answer: "Yes. You can drop off at our warehouse in Upminster, Essex, or book a collection from your home or business anywhere in England." },
 ],
 content: [
 { h: "Shipping to Port Harcourt from the UK", body: "Port Harcourt is one of the busiest places our customers send cargo to, from family parcels to tools and workwear for the energy sector. This guide explains how your boxes travel from the UK to a door in Port Harcourt, which option suits what you are sending, and how to avoid the common delays." },
 { h: "Air or sea: which to choose", body: "| | Air freight | Sea freight |\n| --- | --- | --- |\n| Transit | 5 to 10 working days | 4 to 6 weeks |\n| Best for | Urgent items, electronics, smaller loads | Heavy or bulky goods, large volumes |\n| Pricing | Per kg, from £5.80/kg | Per kg or volume |\n\nAir is the choice when time matters or the load is light. Sea is far cheaper for heavy, bulky shipments such as furniture, appliances or a household move. Rates differ by state, so check the [price list](/schedulesprices#pricing) for Rivers State or ask for a quote." },
 { h: "How your cargo reaches Port Harcourt", body: "1. **Drop off or collection.** Bring your boxes to our Upminster warehouse or book a collection anywhere in England.\n2. **Weighing and paperwork.** We weigh, label and prepare the export documents.\n3. **Departure.** Air cargo leaves on our weekly flights; sea cargo on the next sailing.\n4. **Customs clearance.** Your shipment is cleared by our Nigeria team as part of the quote.\n5. **Delivery.** The cargo travels on to Port Harcourt and is delivered to the address you gave us." },
 { h: "Areas we deliver to in Rivers State", body: "We deliver across the city, including **GRA, Trans-Amadi, Rumuola, Rumuokoro, D-Line and Choba**, and to wider Rivers State, including **Obio-Akpor, Eleme, Oyigbo and Bonny**. Give the full street address, a landmark and a phone number for the recipient: clear details are the single biggest factor in a smooth delivery." },
 { h: "What people send to Port Harcourt", body: "- Clothing, shoes and gifts for family\n- Foodstuffs in personal quantities\n- Phones, laptops and other electronics\n- Workwear, safety boots and tools\n- Household goods and small appliances\n\nCheck our list of [prohibited and restricted items](/blog/prohibited-items-shipping-to-nigeria-from-uk) before you pack. Liquids, aerosols and anything flammable need special care or cannot travel by air." },
 { h: "Tips for a smooth delivery", body: "> List every item and its value. An accurate packing list speeds up customs and protects you if anything goes wrong.\n\n- Pack in strong double-walled boxes and fill empty space.\n- Write the recipient's name and phone number on every box.\n- Keep high-value items in your carry-on list for insurance purposes.\n- Ask about [transit insurance](/blog/marine-cargo-insurance-uk-to-nigeria) for anything you could not afford to lose.\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 44 · Enugu and the South-East
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 44,
 slug: "cargo-to-enugu-and-south-east-nigeria-from-uk",
 category: "guides",
 featured: false,
 priority: 0.75,
 wordCount: 1100,
 lastReviewed: PUBLISHED,
 metaTitle: "Cargo to Enugu, Onitsha, Owerri and Aba from the UK",
 metaDesc: "Send cargo from the UK to Enugu and South-East Nigeria, including Onitsha, Owerri, Aba and Awka: air or sea, door to door delivery, timings and tips.",
 keywords: ["cargo to Enugu from UK", "shipping to Onitsha", "cargo to Owerri", "send goods to Aba from UK", "South East Nigeria cargo"],
 ogImage: IMG("1586528116311-ad8dd3c8310d", 1200),
 canonicalUrl: URL("cargo-to-enugu-and-south-east-nigeria-from-uk"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Sending Cargo to Enugu and the South-East from the UK",
 excerpt: "How to ship from the UK to Enugu, Onitsha, Owerri, Aba and Awka, for family and for business, by air or by sea.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1586528116311-ad8dd3c8310d", 1400),
 imgAlt: "Cargo being packed at the R-Zone warehouse for delivery to South-East Nigeria",
 tags: ["Enugu", "Onitsha", "Owerri", "Aba", "South-East"],
 relatedSlugs: ["door-to-door-shipping-uk-to-nigeria", "uk-to-nigeria-import-export-business-guide", "how-to-send-cargo-to-nigeria-for-christmas-2026"],
 quickAnswer: "R-Zone delivers from the UK to every South-East state: Enugu, Anambra, Imo, Abia and Ebonyi. Choose air (typically 5 to 10 working days) or sea (4 to 6 weeks); customs clearance and door to door delivery are included in your quote.",
 keyFacts: [
 { label: "States covered", value: "Enugu, Anambra, Imo, Abia, Ebonyi" },
 { label: "Air transit", value: "5 to 10 working days" },
 { label: "Sea transit", value: "4 to 6 weeks" },
 { label: "Peak season", value: "Book early for December" },
 ],
 faqSchema: [
 { question: "Do you deliver to Onitsha and Aba markets?", answer: "Yes. We deliver to business and market addresses in Onitsha, Aba, Nnewi and across the South-East. Give the shop or plaza name, line number and a contact phone number so the driver can find you." },
 { question: "How long does cargo take to reach Enugu?", answer: "Air freight typically takes 5 to 10 working days and sea freight 4 to 6 weeks, plus delivery time from customs clearance to your address. Your quote shows the expected date." },
 { question: "Can I ship stock for my business in Aba or Onitsha?", answer: "Yes. Commercial shipments are welcome. Some goods need extra paperwork such as NAFDAC or SON approval, so tell us what you are sending when you ask for a quote." },
 { question: "When should I ship for Christmas in the East?", answer: "December is the busiest time of year. Book sea freight by Friday 30 October and air freight by late November to arrive before the holidays. The last Christmas air cut-off is 12pm on Friday 11 December, but deliveries to the East take longer in the December rush." },
 ],
 content: [
 { h: "Shipping to the South-East from the UK", body: "Families in the UK send more to the South-East every year, and traders in Onitsha, Aba and Nnewi rely on steady stock from the UK. This guide covers how to ship to Enugu, Anambra, Imo, Abia and Ebonyi, and how to time it around the busy festive season." },
 { h: "Cities and towns we deliver to", body: "| State | Main delivery areas |\n| --- | --- |\n| Enugu | Enugu city, Nsukka, Agbani |\n| Anambra | Onitsha, Awka, Nnewi, Ekwulobia |\n| Imo | Owerri, Orlu, Okigwe |\n| Abia | Aba, Umuahia |\n| Ebonyi | Abakaliki, Afikpo |\n\nWe also deliver to villages and smaller towns. Give a landmark, the nearest junction and a phone number for the recipient." },
 { h: "Air or sea for the South-East", body: "**Air freight** suits gifts, phones, laptops and anything you need there quickly. **Sea freight** suits heavy loads, building materials, furniture and business stock. Rates are set by state, so see the [price list](/schedulesprices#pricing) or ask for a quote that includes delivery to your town." },
 { h: "Shipping for business: Onitsha, Aba and Nnewi", body: "Many of our South-East customers are traders. A few things make commercial shipments run smoothly:\n\n- **Declare goods accurately** on a commercial invoice with quantities and values.\n- **Check regulated goods.** Food, cosmetics and medicines may need NAFDAC registration; many manufactured goods need SON approval.\n- **Consolidate.** Regular smaller shipments can cost less than one rushed large one.\n\nOur [import and export business guide](/blog/uk-to-nigeria-import-export-business-guide) goes into more detail." },
 { h: "Beat the December rush", body: "> The weeks before Christmas and the New Year are the busiest of the year for cargo to the East.\n\n- Book **sea** freight by Friday 30 October.\n- Book **air** freight by late November.\n- Pack and label early so your boxes are ready when collection is booked.\n\nSee our [Christmas shipping guide](/blog/how-to-send-cargo-to-nigeria-for-christmas-2026) for exact cut-off dates. " + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 45 · Barrels and drums
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 45,
 slug: "shipping-barrels-to-nigeria-from-uk",
 category: "tips",
 featured: false,
 priority: 0.75,
 wordCount: 1150,
 lastReviewed: PUBLISHED,
 metaTitle: "Shipping Barrels to Nigeria from the UK: Packing Guide",
 metaDesc: "How to ship a barrel or drum to Nigeria from the UK: which barrels work, how to pack and seal them, what you must not put inside, and how pricing works.",
 keywords: ["shipping barrels to Nigeria", "send a barrel to Nigeria from UK", "drum shipping Nigeria", "barrel cargo UK to Nigeria", "how to pack a barrel"],
 ogImage: IMG("1607082348824-0a96f2a4b9da", 1200),
 canonicalUrl: URL("shipping-barrels-to-nigeria-from-uk"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Shipping a Barrel to Nigeria from the UK: How to Pack It Right",
 excerpt: "Barrels are a favourite way to send a lot home in one go. Here is how to choose one, fill it, seal it and get it to Nigeria without problems.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1607082348824-0a96f2a4b9da", 1400),
 imgAlt: "Clothing, food and household items being packed for a barrel shipment to Nigeria",
 tags: ["Barrels", "Drums", "Packing", "Sea Freight"],
 relatedSlugs: ["how-to-pack-cargo-for-shipping-to-nigeria", "sea-freight-uk-to-nigeria", "prohibited-items-shipping-to-nigeria-from-uk"],
 quickAnswer: "Use a sturdy plastic or fibre drum with a locking lid, pack heavy items at the bottom, fill every gap, seal the lid with a tamper-evident tie and attach a full inventory. Barrels usually travel by sea, and you are quoted on weight or volume.",
 keyFacts: [
 { label: "Best mode", value: "Sea freight" },
 { label: "Transit", value: "4 to 6 weeks" },
 { label: "Priced by", value: "Weight or volume" },
 { label: "Must include", value: "Itemised inventory" },
 ],
 faqSchema: [
 { question: "Can I send a barrel to Nigeria by air?", answer: "Barrels are usually sent by sea because they are heavy and bulky, and sea freight costs far less per kilo. Ask us if you need part of the contents to arrive sooner and we can split it into an air shipment." },
 { question: "What should I not put in a barrel?", answer: "Do not pack liquids that can leak, aerosols, flammable items such as perfume or nail polish remover, batteries, cash, or anything on Nigeria's prohibited list. Leaks and fire risks can damage your goods and other people's cargo." },
 { question: "How is a barrel priced?", answer: "We price barrels on weight or volume, whichever is greater, like any other cargo. Tell us the barrel size and an estimated weight for a quote." },
 { question: "Do I need to list everything in the barrel?", answer: "Yes. An itemised inventory with values is needed for customs clearance and for any insurance claim. Keep a copy and tape one to the barrel." },
 ],
 content: [
 { h: "Why people ship barrels to Nigeria", body: "A barrel holds a lot, stacks well, resists knocks and keeps out water better than a cardboard box. That makes it a popular way to send clothing, foodstuffs, toiletries and household goods home in one go. Packed well, a barrel arrives exactly as it left." },
 { h: "Choosing the right barrel", body: "- **Plastic drums** with a screw or clamp lid are the toughest and fully waterproof.\n- **Fibre drums** with a metal locking ring are lighter and cheaper but less water resistant.\n- **Avoid** old chemical or fuel drums, even if cleaned. Residue can taint food and raise questions at customs.\n\nMeasure the barrel and tell us its size when you ask for a quote." },
 { h: "How to pack a barrel, step by step", body: "1. **Line the barrel** with a heavy-duty bin bag to keep out moisture.\n2. **Heavy items first.** Tins, rice, shoes and books go at the bottom.\n3. **Fill every gap** with soft items such as towels and clothing so nothing moves.\n4. **Wrap fragile items** in clothing and put them in the middle, never against the sides.\n5. **Leave no air at the top.** Press the contents down and top up until the lid closes firmly.\n6. **Seal it.** Lock the lid and add a tamper-evident cable tie." },
 { h: "What you must not pack", body: "> Liquids, aerosols and anything flammable cause most of the problems we see with barrels.\n\n- Cooking oil or palm oil that is not in sealed, leak-proof containers\n- Aerosols, perfume, nail polish and remover\n- Batteries and power banks\n- Cash, jewellery and important documents\n- Anything on the [prohibited items list](/blog/prohibited-items-shipping-to-nigeria-from-uk)" },
 { h: "Labelling and paperwork", body: "Write the recipient's full name, address and phone number on the barrel and on a label inside the lid. Attach an itemised list with quantities and values: customs clearance is faster, and it is essential if you ever need to make an insurance claim.\n\nBarrels travel by [sea freight](/blog/sea-freight-uk-to-nigeria) in 4 to 6 weeks, and clearance and delivery are part of your quote. " + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 46 · Medicines
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 46,
 slug: "sending-medicines-to-nigeria-from-uk",
 category: "customs",
 featured: false,
 priority: 0.75,
 wordCount: 1100,
 lastReviewed: PUBLISHED,
 metaTitle: "Sending Medicines to Nigeria from the UK: What Is Allowed",
 metaDesc: "Can you send medicines to Nigeria from the UK? What is allowed for personal use, what is banned, the paperwork to include, and when NAFDAC approval is needed.",
 keywords: ["send medicine to Nigeria from UK", "shipping medication to Nigeria", "NAFDAC medicine rules", "personal medicine Nigeria customs", "prescription drugs Nigeria cargo"],
 ogImage: IMG("1554224155-6726b3ff858f", 1200),
 canonicalUrl: URL("sending-medicines-to-nigeria-from-uk"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Sending Medicines to Nigeria from the UK: Rules and Paperwork",
 excerpt: "Family often ask for medicines from the UK. Here is what can travel as cargo, what cannot, and how to keep your shipment out of trouble at customs.",
 author: "R-Zone Compliance Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1554224155-6726b3ff858f", 1400),
 imgAlt: "Customs paperwork being checked for a shipment containing personal medicines",
 tags: ["Medicines", "NAFDAC", "Customs", "Personal Use"],
 relatedSlugs: ["prohibited-items-shipping-to-nigeria-from-uk", "nigeria-customs-duty-guide", "sending-food-from-uk-to-nigeria-nafdac"],
 quickAnswer: "Over-the-counter and prescription medicines can usually be sent in small personal-use quantities, in original packaging, with a copy of the prescription. Controlled drugs are not allowed, codeine cough syrups are banned, and anything for resale needs NAFDAC registration.",
 keyFacts: [
 { label: "Allowed", value: "Personal-use quantities" },
 { label: "Packaging", value: "Original, sealed, labelled" },
 { label: "Include", value: "Prescription copy" },
 { label: "For resale", value: "NAFDAC registration needed" },
 ],
 faqSchema: [
 { question: "Can I send paracetamol and vitamins to Nigeria?", answer: "Yes, in reasonable personal-use quantities and in their original packaging. Large quantities can look commercial and attract questions from NAFDAC and customs." },
 { question: "Can I send prescription medicine to a family member?", answer: "Usually yes, in a personal-use quantity, in the original pharmacy packaging with the dispensing label, and with a copy of the prescription in the recipient's name. Ask us before booking so we can check the specific medicine." },
 { question: "Which medicines cannot be sent to Nigeria?", answer: "Controlled drugs are not allowed, and Nigeria has banned the import of codeine-based cough syrups. Strong painkillers such as tramadol are tightly restricted. Unregistered or counterfeit medicines are prohibited." },
 { question: "Can I ship insulin or other refrigerated medicines?", answer: "Cargo is not temperature controlled, so medicines that must be kept cold are not suitable for standard air or sea freight. Ask the prescriber about alternatives or a specialist cold-chain courier." },
 ],
 content: [
 { h: "Can you send medicines to Nigeria?", body: "Yes, within limits. Nigeria regulates medicines through **NAFDAC** (the National Agency for Food and Drug Administration and Control) and the Nigeria Customs Service. Small quantities for personal use are routinely cleared; anything that looks commercial, controlled or unregistered is not. This guide explains where the line sits." },
 { h: "What you can usually send", body: "- Everyday over-the-counter medicines such as paracetamol and antihistamines\n- Vitamins and supplements in sealed retail packs\n- Prescription medicines for a named person, in personal-use quantities\n- First-aid items such as plasters and bandages\n\nKeep the quantity to what one household would reasonably use. If in doubt, ask us before you pack." },
 { h: "What you cannot send", body: "> Controlled drugs and codeine cough syrups are not allowed, whatever the quantity.\n\n- **Controlled drugs**, including many strong painkillers and sedatives\n- **Codeine-based cough syrups**, which Nigeria banned from import\n- **Tramadol** and similar opioids, which are tightly restricted\n- **Unregistered or counterfeit** medicines\n- Anything on the [prohibited items list](/blog/prohibited-items-shipping-to-nigeria-from-uk)" },
 { h: "Paperwork to include", body: "1. Keep medicines in their **original sealed packaging** with the label visible.\n2. Include a **copy of the prescription** in the recipient's name for prescription items.\n3. List every medicine, its strength and quantity on your **packing list**.\n4. Pack medicines together in one clear bag so they can be checked quickly." },
 { h: "Sending medicines to sell", body: "Medicines for resale must be **registered with NAFDAC** before import, and the importer usually needs a pharmacy or distribution licence. Do not try to send commercial stock as personal goods: seizures and fines are common. Read our [customs duty guide](/blog/nigeria-customs-duty-guide) for more on regulated goods." },
 { h: "Medicines that need to stay cold", body: "Air and sea cargo are not refrigerated, so insulin, some vaccines and other cold-chain medicines are not suitable for standard freight. Speak to the prescriber about alternatives available in Nigeria. " + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 47 · Relocating to Nigeria
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 47,
 slug: "relocating-to-nigeria-from-uk-shipping-guide",
 category: "guides",
 featured: false,
 priority: 0.8,
 wordCount: 1250,
 lastReviewed: PUBLISHED,
 metaTitle: "Relocating to Nigeria from the UK: Shipping Your Belongings",
 metaDesc: "Moving back to Nigeria? How to ship your belongings from the UK: what to take, air versus sea, a moving timeline, packing tips and the paperwork you need.",
 keywords: ["relocating to Nigeria from UK", "moving back to Nigeria shipping", "ship household goods to Nigeria", "personal effects Nigeria", "moving to Lagos from London"],
 ogImage: IMG("1578575437130-527eed3abbec", 1200),
 canonicalUrl: URL("relocating-to-nigeria-from-uk-shipping-guide"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Relocating to Nigeria from the UK: How to Ship Your Belongings",
 excerpt: "Moving home is a big job. Here is a simple plan for deciding what to ship, how to send it, and when to book so everything arrives when you do.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "7 min read",
 img: IMG("1578575437130-527eed3abbec", 1400),
 imgAlt: "Boxes of personal belongings ready to ship from the UK to Nigeria",
 tags: ["Relocation", "Moving", "Household Goods", "Sea Freight"],
 relatedSlugs: ["sea-freight-uk-to-nigeria", "how-to-pack-cargo-for-shipping-to-nigeria", "car-shipping-uk-to-nigeria"],
 quickAnswer: "Ship most of your household by sea (4 to 6 weeks) and send a small air shipment of essentials (typically 5 to 10 working days) so you are not waiting. Book 8 to 10 weeks before you fly, keep a full itemised inventory, and pack valuables and documents in your own luggage.",
 keyFacts: [
 { label: "Bulk of your move", value: "Sea, 4 to 6 weeks" },
 { label: "Essentials", value: "Air, 5 to 10 working days" },
 { label: "Book", value: "8 to 10 weeks before you fly" },
 { label: "Keep with you", value: "Documents and valuables" },
 ],
 faqSchema: [
 { question: "Should I ship my household goods by air or sea?", answer: "Sea is far cheaper for furniture, appliances and large volumes, and takes 4 to 6 weeks. Many people also send a small air shipment of essentials so they have what they need in the first weeks." },
 { question: "Will my UK appliances work in Nigeria?", answer: "Nigeria uses 230V mains like the UK and UK-style three-pin plugs are common, so most UK appliances work. A good voltage stabiliser is worth buying to protect electronics from power fluctuations." },
 { question: "Do I pay duty on my used personal belongings?", answer: "Used personal and household effects belonging to someone who is relocating are treated differently from new goods for sale, and some may qualify for concessions. Tell us you are relocating and we will check what applies to your shipment." },
 { question: "Can I ship my car as well?", answer: "Yes. Cars travel separately by sea. See our car shipping guide for the rules on vehicle age and the documents you need." },
 ],
 content: [
 { h: "Moving back to Nigeria", body: "Whether you are returning after years in the UK or relocating for work, shipping your life across is easier with a plan. This guide covers what to take, how to send it, and a simple timeline so your belongings arrive close to when you do." },
 { h: "Decide what to ship and what to sell", body: "- **Ship:** clothing, bedding, kitchenware, books, small furniture you love, tools, and electronics that are expensive in Nigeria.\n- **Consider selling:** large cheap furniture, old white goods and anything heavy that is easy to replace locally.\n- **Carry yourself:** passports, certificates, jewellery, cash, laptops and anything you cannot replace.\n\nUK appliances generally work in Nigeria, which runs on 230V with UK-style plugs widely used. Budget for a voltage stabiliser." },
 { h: "Air, sea or both", body: "| | Sea freight | Air freight |\n| --- | --- | --- |\n| Use for | Furniture, appliances, most boxes | Essentials for the first weeks |\n| Transit | 4 to 6 weeks | 5 to 10 working days |\n| Cost | Lowest per kg | Higher, from £5.80/kg |\n\nThe usual approach: send the bulk of the move by [sea](/blog/sea-freight-uk-to-nigeria) and a small air shipment of essentials such as bedding, work clothes and kitchen basics." },
 { h: "A simple moving timeline", body: "1. **10 weeks before:** get a quote, decide air and sea split, start sorting.\n2. **8 weeks before:** book your sea shipment and collection date.\n3. **6 weeks before:** pack, label and list every box.\n4. **4 to 6 weeks before:** sea shipment departs.\n5. **2 weeks before:** send your air shipment of essentials.\n6. **After you land:** receive your deliveries at your new address." },
 { h: "Packing a household move", body: "> Number every box and keep a master list of what is in each one. It is the most useful thing you can do for customs, delivery and unpacking.\n\n- Use strong double-walled boxes and wardrobe boxes for clothes.\n- Wrap furniture legs and corners, and remove glass where possible.\n- Drain and dry appliances such as washing machines before they go.\n- Read our full [packing guide](/blog/how-to-pack-cargo-for-shipping-to-nigeria)." },
 { h: "Paperwork for relocation shipments", body: "Have a copy of your passport, your new address in Nigeria and an itemised inventory with approximate values ready. Used personal effects of someone relocating can be treated differently from goods for sale, so tell us you are moving and we will check what applies.\n\nShipping a car too? See our [car shipping guide](/blog/car-shipping-uk-to-nigeria). " + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 48 · Documents and small parcels
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 48,
 slug: "sending-documents-and-small-parcels-to-nigeria",
 category: "tips",
 featured: false,
 priority: 0.7,
 wordCount: 950,
 lastReviewed: PUBLISHED,
 metaTitle: "Sending Documents and Small Parcels to Nigeria from the UK",
 metaDesc: "The best way to send documents and small parcels from the UK to Nigeria: when cargo makes sense, when a courier is better, and how to pack and declare them.",
 keywords: ["send documents to Nigeria from UK", "small parcel to Nigeria", "send a parcel to Nigeria", "cheap parcel to Nigeria", "documents courier Nigeria"],
 ogImage: IMG("1554224155-8d04cb21cd6c", 1200),
 canonicalUrl: URL("sending-documents-and-small-parcels-to-nigeria"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Sending Documents and Small Parcels to Nigeria: Cargo or Courier?",
 excerpt: "A few documents and a small box need a different approach from a full shipment. Here is how to choose, and how to keep costs down.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "5 min read",
 img: IMG("1554224155-8d04cb21cd6c", 1400),
 imgAlt: "A small parcel being weighed for shipping from the UK to Nigeria",
 tags: ["Documents", "Small Parcels", "Air Freight", "Courier"],
 relatedSlugs: ["air-freight-uk-to-nigeria", "how-much-does-cargo-cost-from-uk-to-nigeria", "what-is-volumetric-weight-freight-nigeria"],
 quickAnswer: "For a few kilos or more, air cargo is usually the cheaper way to send parcels to Nigeria (from £5.80/kg plus a £20 handling fee per air shipment). For a single urgent envelope of original documents, an international express courier is often the better choice.",
 keyFacts: [
 { label: "Air cargo", value: "From £5.80/kg" },
 { label: "Handling fee", value: "£20 per air shipment" },
 { label: "Transit", value: "5 to 10 working days" },
 { label: "Urgent originals", value: "Consider an express courier" },
 ],
 faqSchema: [
 { question: "What is the cheapest way to send a small parcel to Nigeria?", answer: "For parcels of a few kilos or more, consolidated air cargo is usually cheaper than an express courier. Combining several small parcels into one shipment saves the most, because the handling fee applies once per shipment." },
 { question: "Can I send original certificates by cargo?", answer: "You can, but for irreplaceable originals such as passports, birth certificates or legal documents, a tracked express courier is often faster and easier. Always keep copies." },
 { question: "Is there a handling fee on small air shipments?", answer: "Yes. Air shipments carry a £20 handling fee per shipment, which is why combining parcels into one shipment is better value." },
 { question: "How long does a small parcel take?", answer: "Air cargo typically takes 5 to 10 working days from the UK to Nigeria, including customs clearance." },
 ],
 content: [
 { h: "Small shipments need a different plan", body: "Not every shipment is a barrel or a pallet. Sometimes it is a birthday present, a phone for a cousin or an envelope of documents. The right method depends on weight, urgency and how replaceable the contents are." },
 { h: "Cargo or courier: how to choose", body: "| | Air cargo with R-Zone | Express courier |\n| --- | --- | --- |\n| Best for | Parcels of a few kilos and up | Single envelopes, urgent originals |\n| Speed | 5 to 10 working days | Usually faster |\n| Cost | From £5.80/kg plus £20 handling | Higher per kilo |\n\nFor anything over a few kilos, cargo is usually better value. For one urgent envelope, a courier often wins." },
 { h: "Save money by combining parcels", body: "The £20 handling fee applies once per air shipment, so the more you combine, the less each item costs. Ask family and friends if they have anything to send, or wait until you have a full box. Our guide to [how cargo is priced](/blog/how-much-does-cargo-cost-from-uk-to-nigeria) explains the rest." },
 { h: "Sending documents safely", body: "> For irreplaceable originals such as passports and certificates, keep copies and consider a tracked express courier.\n\n- Put documents in a waterproof plastic wallet.\n- Place them flat between stiff card so they cannot bend.\n- List them on your packing list, without sensitive numbers." },
 { h: "Packing small parcels", body: "- Use a strong box, not a padded envelope, for anything fragile.\n- Fill empty space so nothing moves.\n- Mind the size: light but bulky parcels are charged on [volumetric weight](/blog/what-is-volumetric-weight-freight-nigeria).\n- Write the recipient's phone number on the box.\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 49 · Hair and beauty products
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 49,
 slug: "shipping-hair-and-beauty-products-to-nigeria",
 category: "customs",
 featured: false,
 priority: 0.75,
 wordCount: 1050,
 lastReviewed: PUBLISHED,
 metaTitle: "Shipping Hair and Beauty Products to Nigeria from the UK",
 metaDesc: "How to ship wigs, hair extensions, cosmetics and skincare from the UK to Nigeria: what is banned, what cannot fly, NAFDAC rules for resale and packing tips.",
 keywords: ["ship cosmetics to Nigeria", "send hair extensions to Nigeria", "beauty products Nigeria customs", "NAFDAC cosmetics", "ship wigs to Nigeria from UK"],
 ogImage: IMG("1556742049-0cfed4f6a45d", 1200),
 canonicalUrl: URL("shipping-hair-and-beauty-products-to-nigeria"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Shipping Hair and Beauty Products to Nigeria: What Is Allowed",
 excerpt: "Wigs, extensions, skincare and make-up are among the most popular things sent from the UK. Here is how to send them, and the products that cause trouble.",
 author: "R-Zone Compliance Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1556742049-0cfed4f6a45d", 1400),
 imgAlt: "Beauty and hair products being packed for resale in Nigeria",
 tags: ["Cosmetics", "Hair", "NAFDAC", "Small Business"],
 relatedSlugs: ["prohibited-items-shipping-to-nigeria-from-uk", "profitable-products-to-import-from-uk-to-nigeria", "how-to-start-uk-to-nigeria-dropshipping-business"],
 quickAnswer: "Wigs, hair extensions, skincare and make-up can be shipped to Nigeria. Skin-lightening creams containing hydroquinone or mercury are banned, aerosols and perfumes are restricted by air, and cosmetics for resale must be registered with NAFDAC.",
 keyFacts: [
 { label: "Fine to ship", value: "Wigs, extensions, skincare, make-up" },
 { label: "Banned", value: "Bleaching and skin-lightening creams" },
 { label: "Not by air", value: "Aerosols, most perfumes" },
 { label: "For resale", value: "NAFDAC registration" },
 ],
 faqSchema: [
 { question: "Can I send wigs and hair extensions to Nigeria?", answer: "Yes. Wigs and hair extensions ship easily by air or sea. For business stock, declare quantities and values accurately on a commercial invoice." },
 { question: "Which beauty products are banned in Nigeria?", answer: "Skin-lightening and bleaching creams, especially those containing hydroquinone or mercury, are prohibited. Counterfeit cosmetics are also prohibited." },
 { question: "Can perfume go by air freight?", answer: "Most perfumes contain alcohol and are classed as flammable, so they are restricted on aircraft. They usually need to travel by sea, packed upright and sealed. Ask us before booking." },
 { question: "Do I need NAFDAC registration to sell cosmetics?", answer: "Yes. Cosmetics imported for sale in Nigeria must be registered with NAFDAC. Personal-use quantities do not need registration." },
 ],
 content: [
 { h: "The UK to Nigeria beauty trade", body: "Hair and beauty products are some of the most popular items our customers send, both as gifts and as stock for salons and online shops. Most products travel without problems; a few are banned or cannot fly. Here is how to tell the difference." },
 { h: "What ships easily", body: "- **Wigs and hair extensions**, including human hair bundles and closures\n- **Skincare** such as cleansers, moisturisers and serums in sealed packs\n- **Make-up**: foundation, powder, lipstick and palettes\n- **Hair care**: shampoo, conditioner and styling products, well sealed\n- **Tools**: straighteners, dryers and clippers (UK plugs are widely used in Nigeria)" },
 { h: "What is banned or restricted", body: "> Skin-lightening creams are the most common reason beauty shipments are held.\n\n| Product | Status |\n| --- | --- |\n| Bleaching or skin-lightening creams (hydroquinone, mercury) | Prohibited |\n| Counterfeit branded cosmetics | Prohibited |\n| Aerosols (hairspray, dry shampoo) | Not by air |\n| Perfume and nail polish | Usually not by air |\n| Nail polish remover (acetone) | Not by air |\n\nSee the full [prohibited items list](/blog/prohibited-items-shipping-to-nigeria-from-uk)." },
 { h: "Shipping beauty products to sell", body: "Cosmetics imported for sale must be **registered with NAFDAC**. Without registration, commercial quantities can be held or seized. Many sellers start with small personal-use quantities to test demand, then register their best-selling lines. Our guides to [profitable products](/blog/profitable-products-to-import-from-uk-to-nigeria) and [starting a UK to Nigeria business](/blog/how-to-start-uk-to-nigeria-dropshipping-business) cover the next steps." },
 { h: "Packing liquids and creams", body: "1. Tape every lid shut and put each bottle in its own sealed bag.\n2. Pack bottles upright in the middle of the box, cushioned on all sides.\n3. Keep liquids away from hair and fabrics in case of a leak.\n4. Mark the box \"This way up\".\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 50 · Solar panels and inverters
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 50,
 slug: "shipping-solar-panels-and-inverters-to-nigeria",
 category: "guides",
 featured: false,
 priority: 0.8,
 wordCount: 1150,
 lastReviewed: PUBLISHED,
 metaTitle: "Shipping Solar Panels and Inverters to Nigeria from the UK",
 metaDesc: "How to ship solar panels, inverters and batteries from the UK to Nigeria: sea or air, lithium battery rules, packing fragile panels and paperwork for business.",
 keywords: ["ship solar panels to Nigeria", "send inverter to Nigeria from UK", "lithium battery shipping Nigeria", "solar equipment cargo Nigeria", "SONCAP solar"],
 ogImage: IMG("1494412685616-a5d310fbb07d", 1200),
 canonicalUrl: URL("shipping-solar-panels-and-inverters-to-nigeria"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Shipping Solar Panels, Inverters and Batteries to Nigeria",
 excerpt: "Solar is one of the fastest-growing things people send from the UK. Here is how to ship panels, inverters and batteries safely and legally.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1494412685616-a5d310fbb07d", 1400),
 imgAlt: "Container ships carrying solar equipment and other cargo to Nigeria",
 tags: ["Solar", "Inverters", "Batteries", "Sea Freight"],
 relatedSlugs: ["sea-freight-uk-to-nigeria", "shipping-electronics-to-nigeria-from-uk", "bulk-shipping-uk-to-nigeria"],
 quickAnswer: "Ship solar panels and lithium batteries by sea: panels are large and fragile, and lithium batteries are dangerous goods with strict limits on aircraft. Inverters and charge controllers can go by air or sea. Batteries must be declared, and commercial imports may need SON (SONCAP) certification.",
 keyFacts: [
 { label: "Panels", value: "Sea, crated, upright" },
 { label: "Lithium batteries", value: "Declare; usually sea" },
 { label: "Inverters", value: "Air or sea" },
 { label: "For resale", value: "SONCAP may apply" },
 ],
 faqSchema: [
 { question: "Can I send a lithium battery to Nigeria by air?", answer: "Large lithium batteries such as solar storage batteries are dangerous goods and are heavily restricted on aircraft. They normally travel by sea and must always be declared. Never pack an undeclared battery in a cargo box." },
 { question: "How should solar panels be packed?", answer: "Keep panels in their original cartons where possible, stand them on edge rather than flat, protect the corners and glass, and ideally crate them. Panels are fragile and must not have heavy items stacked on top." },
 { question: "Do I need SONCAP to import solar equipment?", answer: "Many regulated products imported into Nigeria for sale need a SONCAP certificate from the Standards Organisation of Nigeria. Personal-use items usually do not. Tell us whether your shipment is for sale so we can advise." },
 { question: "Is it cheaper to buy solar in Nigeria?", answer: "It depends on the brand and model. Many customers ship branded panels, inverters or batteries from the UK because they want a specific make or warranty. Compare local prices with the shipping cost before you buy." },
 ],
 content: [
 { h: "Why people ship solar to Nigeria", body: "Reliable power is a priority for every Nigerian household and business, and solar is how many families are getting it. Customers in the UK often buy panels, inverters and batteries here and ship them home. It works well, as long as you follow the rules for batteries and pack the panels properly." },
 { h: "Air or sea for each part of the system", body: "| Item | Best mode | Why |\n| --- | --- | --- |\n| Solar panels | Sea | Large, heavy and fragile |\n| Lithium batteries | Sea, declared | Dangerous goods, restricted on aircraft |\n| Lead-acid batteries | Sea, declared | Heavy and hazardous |\n| Inverters and controllers | Air or sea | Compact electronics |\n| Cables and mounting kits | Sea | Heavy, not urgent |" },
 { h: "The rules for batteries", body: "> Batteries must always be declared. An undeclared battery can delay your whole shipment and other people's cargo.\n\n- Lithium storage batteries are **dangerous goods** under transport rules and are tightly limited on passenger and cargo aircraft.\n- Ship them by **sea**, with terminals protected and the battery secured so it cannot move.\n- Tell us the battery type, capacity (Wh or Ah) and quantity when you ask for a quote." },
 { h: "Packing solar panels", body: "1. Keep panels in their **original cartons** if you have them.\n2. Stand panels **on edge**, never flat, with nothing stacked on top.\n3. Protect corners and the glass face with card or foam.\n4. For several panels, ask us about **crating** for sea freight.\n5. Mark every box \"Fragile\" and \"This way up\"." },
 { h: "Shipping solar to sell", body: "Many regulated products imported for sale into Nigeria need **SONCAP** certification from the Standards Organisation of Nigeria. If you are building a solar business, plan for this before you buy stock. Our [bulk shipping guide](/blog/bulk-shipping-uk-to-nigeria) explains how to move larger volumes for less.\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 51 · Car parts and tyres
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 51,
 slug: "shipping-car-parts-to-nigeria-from-uk",
 category: "guides",
 featured: false,
 priority: 0.75,
 wordCount: 1050,
 lastReviewed: PUBLISHED,
 metaTitle: "Shipping Car Parts and Tyres to Nigeria from the UK",
 metaDesc: "How to ship car parts from the UK to Nigeria: engines, gearboxes, body panels and tyres. What is banned, how to prepare parts, and air versus sea.",
 keywords: ["ship car parts to Nigeria", "send engine to Nigeria from UK", "tyres to Nigeria", "auto parts cargo Nigeria", "gearbox shipping Nigeria"],
 ogImage: IMG("1568605117036-5fe5e7bab0b7", 1200),
 canonicalUrl: URL("shipping-car-parts-to-nigeria-from-uk"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Shipping Car Parts to Nigeria from the UK: Engines, Panels and Tyres",
 excerpt: "UK car parts are in demand in Nigeria. Here is how to ship them, how to prepare engines and gearboxes, and the parts you cannot send.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "6 min read",
 img: IMG("1568605117036-5fe5e7bab0b7", 1400),
 imgAlt: "Car and parts being prepared for shipping from the UK to Nigeria",
 tags: ["Car Parts", "Tyres", "Engines", "Sea Freight"],
 relatedSlugs: ["car-shipping-uk-to-nigeria", "sea-freight-uk-to-nigeria", "prohibited-items-shipping-to-nigeria-from-uk"],
 quickAnswer: "Most car parts can be shipped to Nigeria, usually by sea because they are heavy. Engines and gearboxes must be drained of all fluids, batteries must be declared, and used and retreaded tyres are on Nigeria's import prohibition list. New tyres can be shipped.",
 keyFacts: [
 { label: "Best mode", value: "Sea, for heavy parts" },
 { label: "Engines", value: "Drained of all fluids" },
 { label: "Used tyres", value: "Prohibited" },
 { label: "Batteries", value: "Declare; sea only" },
 ],
 faqSchema: [
 { question: "Can I send used tyres to Nigeria?", answer: "No. Used and retreaded tyres are on Nigeria's import prohibition list. New tyres can be shipped." },
 { question: "How do I prepare an engine for shipping?", answer: "Drain all oil, coolant and fuel, plug the openings, and bolt or strap the engine to a pallet so it cannot move. Undrained engines are a fire and leak risk and will not be accepted." },
 { question: "Can I send a car battery?", answer: "Car batteries are hazardous goods. They must be declared and normally travel by sea with terminals protected. Ask us before you include one." },
 { question: "Can small parts go by air?", answer: "Yes. Small, dry parts such as sensors, filters, brake pads and electronics can travel by air if you need them quickly. Anything with fluids, and heavy parts, should go by sea." },
 ],
 content: [
 { h: "Car parts from the UK to Nigeria", body: "UK-sourced parts are prized in Nigeria for their quality, and many mechanics and car owners rely on them. Whether you are sending a single gearbox or a pallet of spares for a workshop, a little preparation avoids most problems." },
 { h: "What you can send", body: "- **Engines and gearboxes**, fully drained\n- **Body panels**, bumpers, doors and lights\n- **Suspension and brake parts**\n- **Electrical parts**: sensors, ECUs, alternators and starters\n- **New tyres** and alloy wheels\n- **Service parts**: filters, belts, plugs and pads" },
 { h: "What you cannot send", body: "> Used and retreaded tyres are on Nigeria's import prohibition list.\n\n- Used or retreaded tyres\n- Parts still containing oil, fuel or coolant\n- Undeclared batteries\n- Airbag units and pretensioners unless declared and approved (they contain explosive charges)\n- Anything on the [prohibited items list](/blog/prohibited-items-shipping-to-nigeria-from-uk)" },
 { h: "Preparing heavy parts", body: "1. **Drain every fluid** and plug the openings.\n2. **Clean off oil and grease** so it cannot stain other cargo.\n3. **Palletise** engines and gearboxes, strapped or bolted down.\n4. **Wrap panels** at the edges and corners with card or foam.\n5. **Label** each part with the recipient's name and phone number." },
 { h: "Air or sea, and shipping a whole car", body: "Heavy parts go by [sea freight](/blog/sea-freight-uk-to-nigeria) in 4 to 6 weeks at the lowest cost per kilo. Small dry parts can go by air in 5 to 10 working days when a car is off the road waiting.\n\nShipping the whole vehicle? Read our [car shipping guide](/blog/car-shipping-uk-to-nigeria) for vehicle age rules and duty. " + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 52 · Weddings and events
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 52,
 slug: "shipping-wedding-items-and-aso-ebi-to-nigeria",
 category: "tips",
 featured: false,
 priority: 0.75,
 wordCount: 1000,
 lastReviewed: PUBLISHED,
 metaTitle: "Shipping Wedding Items and Aso Ebi to Nigeria from the UK",
 metaDesc: "Planning a wedding or event in Nigeria from the UK? How to ship aso ebi, souvenirs, decor and outfits on time, with booking dates, packing tips and customs.",
 keywords: ["ship wedding items to Nigeria", "send aso ebi to Nigeria", "wedding souvenirs Nigeria", "event decor shipping Nigeria", "ship wedding dress to Nigeria"],
 ogImage: IMG("1512389142860-9c449e58a543", 1200),
 canonicalUrl: URL("shipping-wedding-items-and-aso-ebi-to-nigeria"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Shipping Wedding Items and Aso Ebi to Nigeria: A Planning Guide",
 excerpt: "Planning a wedding, burial or birthday in Nigeria from the UK? Here is when to book, how to pack and what to watch at customs so everything arrives in time.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "5 min read",
 img: IMG("1512389142860-9c449e58a543", 1400),
 imgAlt: "Gift boxes and souvenirs packed for a wedding in Nigeria",
 tags: ["Weddings", "Aso Ebi", "Events", "Planning"],
 relatedSlugs: ["how-long-shipping-uk-to-nigeria-takes", "air-freight-uk-to-nigeria", "how-to-pack-cargo-for-shipping-to-nigeria"],
 quickAnswer: "Book sea freight at least 8 to 10 weeks before the event and air freight at least 3 weeks before. Pack outfits flat in garment bags, label each guest's aso ebi separately, and declare quantities honestly: large amounts of identical fabric can look commercial at customs.",
 keyFacts: [
 { label: "Sea", value: "Book 8 to 10 weeks ahead" },
 { label: "Air", value: "Book 3 weeks ahead" },
 { label: "Outfits", value: "Flat, in garment bags" },
 { label: "Aso ebi", value: "Declare quantities" },
 ],
 faqSchema: [
 { question: "When should I ship wedding items to Nigeria?", answer: "Send sea freight at least 8 to 10 weeks before the event and air freight at least 3 weeks before, to leave room for customs clearance and delivery." },
 { question: "Will I pay duty on aso ebi fabric?", answer: "Reasonable quantities for family and guests are normally treated as personal goods. Very large quantities of identical fabric can be treated as commercial textiles, which attract duty. Declare quantities and values honestly." },
 { question: "Can I send a wedding cake or food for the event?", answer: "Fresh cakes and perishable food are not suitable for cargo. Dry, sealed food in personal quantities is fine, but it is usually best to source fresh items in Nigeria." },
 { question: "How do I make sure my wedding dress arrives safely?", answer: "Pack it in a breathable garment bag, folded as little as possible, in its own sturdy box. Consider air freight and transit insurance for a dress you could not replace." },
 ],
 content: [
 { h: "Planning an event in Nigeria from the UK", body: "Weddings, burials, naming ceremonies and milestone birthdays bring families together, and a lot of what makes the day often comes from the UK: outfits, aso ebi, souvenirs and decor. The secret is timing. Here is how to plan it." },
 { h: "When to book", body: "| What you are sending | Mode | Book at least |\n| --- | --- | --- |\n| Decor, souvenirs, bulk items | Sea | 8 to 10 weeks before |\n| Aso ebi for guests | Air or sea | 3 to 10 weeks before |\n| Outfits and the dress | Air | 3 weeks before |\n| Last-minute extras | Air | 3 weeks before |\n\nDecember and Easter are the busiest periods. See our guide to [how long shipping takes](/blog/how-long-shipping-uk-to-nigeria-takes)." },
 { h: "Packing outfits and fabric", body: "- **Garment bags** for gowns, agbada and suits, folded as little as possible.\n- **Label each guest's aso ebi** in its own bag with their name, so distribution is easy on arrival.\n- **Gele and accessories** go in small boxes so they keep their shape.\n- Keep shoes in their boxes and fill them with socks or tissue." },
 { h: "Souvenirs and decor", body: "> Count and list souvenirs by type and quantity. It speeds up customs and helps you check nothing is missing.\n\nBranded souvenirs, fans, mugs, centrepieces and printed items all ship well by sea. Pack fragile pieces in the middle of boxes with plenty of padding. See our [packing guide](/blog/how-to-pack-cargo-for-shipping-to-nigeria)." },
 { h: "Customs and aso ebi", body: "Reasonable quantities of fabric for family and guests are normally treated as personal goods. Very large amounts of identical fabric can look like stock for sale and attract textile duty, so declare quantities and values honestly. Avoid perishables such as fresh cakes.\n\n" + CALL },
 ],
 },
];
