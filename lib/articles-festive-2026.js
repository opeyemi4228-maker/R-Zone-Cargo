// lib/articles-festive-2026.js
// ─────────────────────────────────────────────────────────────────────────────
// Festive-season articles: 53 to 55 added 27 October 2026, 56 to 58 (Black
// Friday, gift ideas, Nigeria to UK after Christmas) added 11 November 2026, spread into ARTICLES in
// lib/articles.js after the October batch.
//
// Each targets a festive search intent the existing Christmas deadlines post
// (/blog/how-to-send-cargo-to-nigeria-for-christmas-2026) does not: hampers,
// excess baggage for December travellers, and Christmas stock for traders.
// All three link back to that post for the deadlines, so they support it
// instead of competing with it.
//
// Christmas 2026 cut-offs are derived from the schedule on /schedulesprices:
// air leaves Heathrow every Friday (12pm cut-off) and lands in Lagos the
// following Friday; sea cut-off is every Friday, sailing the next Thursday,
// 4 to 6 weeks to Lagos. Christmas Day 2026 is a Friday, so the last safe air
// cut-off is Friday 11 December and the last sea cut-off Friday 6 November
// (Friday 30 October recommended). Keep these in step with the Christmas post.
//
// House rules: UK English, no em or en dashes, only the consistently stated
// prices (air from £5.80/kg, £20 air handling fee per shipment), no state
// rates, no ranking claims, no airline fees (they vary and change).
// Every article also needs app/blog/<slug>/page.jsx.
// ─────────────────────────────────────────────────────────────────────────────

const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const URL = (slug) => `https://r-zoneenterprises.com/blog/${slug}`;

const PUBLISHED = "2026-10-27";
const DATE = "27 October 2026";
const PUBLISHED_NOV = "2026-11-11";
const DATE_NOV = "11 November 2026";

const CALL = "Call **+44 (0) 800 772 0864** or WhatsApp **+44 7915 647119** and a member of our UK team will help.";

const DEADLINES =
 "| Christmas 2026 | Cut-off | Status |\n| --- | --- | --- |\n| Sea, recommended | Friday 30 October | Closed |\n| Sea, final | Friday 6 November | Closed |\n| Air, last Christmas flight | **Friday 11 December, 12pm** | **Open**: lands in Lagos 18 December, delivered before Christmas |";

export const FESTIVE_2026_ARTICLES = [
 // ═══════════════════════════════════════════════════════════════════════════
 // 53 · Christmas hampers
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 53,
 slug: "sending-christmas-hampers-to-nigeria-from-uk",
 category: "tips",
 featured: true,
 priority: 0.85,
 wordCount: 1350,
 lastReviewed: PUBLISHED,
 metaTitle: "Send a Christmas Hamper to Nigeria from the UK",
 metaDesc: "How to build and ship a Christmas hamper from the UK to Nigeria: what to put in it, what customs will not accept, how to pack it and when to book.",
 keywords: [
 "send Christmas hamper to Nigeria",
 "Christmas hamper to Nigeria from UK",
 "food hamper delivery Nigeria",
 "festive hamper Nigeria",
 "Christmas food parcel to Nigeria",
 "what to put in a Christmas hamper for Nigeria",
 ],
 ogImage: IMG("1542838132-92c53300491e", 1200),
 canonicalUrl: URL("sending-christmas-hampers-to-nigeria-from-uk"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Sending a Christmas Hamper to Nigeria from the UK: What to Pack and When to Book",
 excerpt: "A hamper from the UK is one of the most welcome Christmas gifts in Nigeria. Here is what to put in it, what customs will turn back, how to pack it so it arrives intact, and the dates that get it there before Christmas.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "7 min read",
 img: IMG("1542838132-92c53300491e", 1400),
 imgAlt: "Biscuits, tea, chocolates and other groceries being packed into a Christmas hamper for Nigeria",
 tags: ["Christmas", "Hampers", "Food Gifts", "Festive Shipping"],
 relatedSlugs: ["christmas-gift-ideas-to-send-to-nigeria", "how-to-send-cargo-to-nigeria-for-christmas-2026", "sending-food-from-uk-to-nigeria-nafdac"],
 quickAnswer: "Pack shop-bought, sealed, long-life food and gifts (biscuits, tea, chocolate, Christmas cake, toiletries) in a strong double-walled box rather than a wicker basket, and leave out alcohol, fresh food and aerosols. The Christmas sea cut-offs have passed, so send hampers by air: the last flight that delivers before Christmas 2026 leaves at 12pm on Friday 11 December.",
 keyFacts: [
 { label: "Last air cut-off", value: "Fri 11 Dec, 12pm" },
 { label: "Sea for Christmas", value: "Closed (cut-off was 6 Nov)" },
 { label: "Not allowed", value: "Alcohol, fresh food, meat" },
 { label: "Air pricing", value: "From £5.80/kg + £20 per shipment" },
 ],
 faqSchema: [
 { question: "Can I send a Christmas hamper to Nigeria from the UK?", answer: "Yes. R-Zone ships hampers you put together yourself, door to door to any Nigerian state, with customs clearance included. Use shop-bought, sealed, long-life food and gifts in personal quantities and leave out alcohol, fresh food and meat." },
 { question: "What should I not put in a hamper for Nigeria?", answer: "Do not include alcohol (wine, spirits or champagne), fresh or homemade food, meat or dairy, chicken-flavoured Maggi or Indomie, or anything on Nigeria's prohibited list. Perfumes and aerosols cannot go by air, so leave them out of an air-freight hamper." },
 { question: "Will chocolate melt on the way to Nigeria?", answer: "It can. Sea containers get hot over 4 to 6 weeks, so chocolate-heavy hampers are safer by air. Wrap chocolate in a sealed bag in the middle of the box, away from the sides." },
 { question: "Should I use a wicker hamper basket?", answer: "Usually not. Air freight is charged on the greater of actual or volumetric weight, and a bulky basket can cost almost twice as much to ship as a compact box holding the same food. Pack the gifts in a double-walled box; a flat-packed or fabric basket can go inside if you want the presentation." },
 { question: "When is the last date to send a Christmas hamper to Nigeria?", answer: "For Christmas 2026 the last R-Zone air cut-off is 12pm on Friday 11 December. The sea cut-offs (30 October and 6 November) have passed, so Christmas hampers now need to go by air." },
 ],
 content: [
 { h: "Why a hamper from the UK means so much at Christmas", body: "For many families in Nigeria, the box from the UK is part of Christmas: the tin of shortbread, the tea, the chocolates the children wait for. A well-packed hamper is one of the simplest ways to be part of the celebration when you cannot be there.\n\nR-Zone does not sell hampers. You choose what goes in, and we collect it (or you drop it at our Upminster warehouse), clear it through Nigerian customs and deliver it to the door, anywhere in Nigeria. This guide covers what to pack, what to leave out, and the dates that get it there before Christmas Day." },
 { h: "What to put in a Christmas hamper for Nigeria", body: "Shop-bought, sealed and long-life is the rule. These travel well and clear customs without trouble:\n\n| Item | Good choices | Tip |\n| --- | --- | --- |\n| Biscuits | Shortbread, tins of assorted biscuits | Tins protect the contents and are reused for years |\n| Chocolate and sweets | Selection boxes, wrapped sweets | Heat is the risk: send by air if it is mostly chocolate |\n| Hot drinks | Tea bags, instant coffee, hot chocolate, Milo, Ovaltine | Light and popular |\n| Christmas cake and pudding | Shop-bought, sealed, long-life | Choose versions without added alcohol |\n| Breakfast | Porridge oats, cereal, honey, jam | Keep jars wrapped and upright |\n| Gifts | Toiletry sets (no aerosols), socks, scarves, toys | Non-food gifts fill gaps and protect the food |\n\n> Keep it to personal quantities. A hamper for family is a gift; twenty identical tins look like stock for sale and can attract duty or NAFDAC questions. Our [guide to sending food to Nigeria](/blog/sending-food-from-uk-to-nigeria-nafdac) explains the rules." },
 { h: "What customs will not accept", body: "These are the items that get hampers held or opened most often. Leave them out:\n\n- **Alcohol** of any kind, including wine, champagne, spirits and liqueur chocolates sold as alcohol.\n- **Fresh or homemade food**, including homemade cake, fresh fruit, cheese, meat and anything that needs a fridge.\n- **Chicken-flavoured Maggi and Indomie**, which are not accepted.\n- **Perfumes, aerosols and nail varnish** in an air-freight hamper. They are flammable and restricted on aircraft.\n- **Cash and vouchers.** Send money separately, never inside a box.\n\nThe full list is in our guide to [prohibited and restricted items](/blog/prohibited-items-shipping-to-nigeria-from-uk). If you are unsure about one item, ask us before you pack it." },
 { h: "Box or basket? How to pack a hamper so it arrives intact", body: "A wicker basket looks lovely in a shop but travels badly. It crushes, it does not stack, and its shape costs you money: air freight is charged on the greater of actual weight or **volumetric weight** (length × width × height in cm ÷ 6,000).\n\n| Packaging | Size | Volumetric weight |\n| --- | --- | --- |\n| Compact double-walled box | 40 × 30 × 30 cm | 6 kg |\n| Typical wicker basket, boxed | 50 × 40 × 35 cm | 11.7 kg |\n\nThe same food in the basket can cost almost twice as much to fly. See [how volumetric weight works](/blog/what-is-volumetric-weight-freight-nigeria) for more examples.\n\n### Packing step by step\n1. **Start with a new double-walled box.** Supermarket boxes are not strong enough.\n2. **Heavy and hard items at the bottom**: tins, jars and cake boxes.\n3. **Wrap every jar and bottle** in bubble wrap and put it in a sealed bag in case it leaks.\n4. **Chocolate in the middle**, away from the walls of the box where heat gets in.\n5. **Fill every gap** with soft gifts, socks or paper so nothing moves when you shake the box.\n6. **Tape every seam** with three strips of parcel tape. Do not gift-wrap the outside: customs may open it.\n7. **Label it** with the recipient's full name, address with landmark and LGA, and Nigerian phone number, and put a copy of the label inside." },
 { h: "Air or sea for a Christmas hamper?", body: "**Air** is the better choice for most hampers. It is faster, the box spends less time in heat, and it is the only option for anything booked after early November. Air freight starts from **£5.80/kg plus a £20 handling fee per shipment**, so a 10 kg hamper (the minimum for Lagos office collection) starts from about £78. Rates vary by state and by office collection or door to door: see the [price list](/schedulesprices#pricing).\n\n**Sea** suits large or heavy hampers with no chocolate, such as tins, drinks powder, rice and household gifts, but the Christmas sea cut-offs have now passed, so for Christmas choose air.\n\n> Sending hampers to several relatives? If they can all go to one address, one shipment means one handling fee. Label each hamper with the name of the person it is for." },
 { h: "Christmas 2026 dates for hampers", body: DEADLINES + "\n\nHampers booked after 11 December will still travel, but they will arrive after Christmas, in time for the New Year. The full schedule, including what happens if you miss a cut-off, is in our [Christmas shipping guide](/blog/how-to-send-cargo-to-nigeria-for-christmas-2026)." },
 { h: "Send your hamper with R-Zone", body: "Pack it, label it, and book a collection anywhere in England or drop it at our Upminster warehouse. We clear Nigerian customs and deliver to the door, and you can follow it with [live tracking](/track).\n\n[Get a quote for your hamper](/quote), or: " + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 54 · Excess baggage vs cargo for December travellers
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 54,
 slug: "excess-baggage-to-nigeria-vs-cargo",
 category: "tips",
 featured: true,
 priority: 0.85,
 wordCount: 1400,
 lastReviewed: PUBLISHED,
 metaTitle: "Excess Baggage to Nigeria for December? Ship It as Cargo",
 metaDesc: "Flying home to Nigeria for Christmas? Compare excess baggage with sending extra bags as cargo: how each is priced, timing, and what to carry or ship.",
 keywords: [
 "excess baggage to Nigeria",
 "excess baggage vs cargo Nigeria",
 "send luggage to Nigeria from UK",
 "ship suitcase to Nigeria",
 "travelling to Nigeria for Christmas luggage",
 "Detty December luggage",
 ],
 ogImage: IMG("1436491865332-7a61a109cc05", 1200),
 canonicalUrl: URL("excess-baggage-to-nigeria-vs-cargo"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Excess Baggage or Cargo? Getting Your Extra Bags to Nigeria This December",
 excerpt: "Going home for Christmas with more than your allowance? Here is how airline excess baggage and cargo compare, what to carry and what to send ahead, and when to book so your boxes are waiting when you land.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "7 min read",
 img: IMG("1436491865332-7a61a109cc05", 1400),
 imgAlt: "Aircraft on the runway at a UK airport ahead of the December travel season to Nigeria",
 tags: ["Christmas", "Travel", "Excess Baggage", "Detty December"],
 relatedSlugs: ["send-foodstuff-from-nigeria-to-uk-after-christmas", "how-to-send-cargo-to-nigeria-for-christmas-2026", "relocating-to-nigeria-from-uk-shipping-guide"],
 quickAnswer: "Carry what you need on arrival (documents, medicines, valuables, a few gifts) in your allowance, and send the rest as cargo. Cargo is priced per kg, from £5.80/kg by air plus £20 per shipment, it can be delivered to any state, and customs clearance is included. To have boxes waiting when you land, book air cargo at least two weeks before your flight.",
 keyFacts: [
 { label: "Air cargo", value: "From £5.80/kg + £20 per shipment" },
 { label: "Book air", value: "2 weeks before you fly" },
 { label: "Last Christmas flight", value: "Fri 11 Dec, 12pm" },
 { label: "Delivery", value: "Door to door, any state" },
 ],
 faqSchema: [
 { question: "Is it cheaper to send luggage to Nigeria as cargo than to pay excess baggage?", answer: "Often, for heavy or multiple extra bags. Airline excess charges are per bag and vary by airline, route and when you pay, while cargo is priced per kg, from £5.80/kg by air plus £20 per shipment, with customs clearance included. Get your airline's price for the extra bags and an R-Zone quote for the same weight and compare." },
 { question: "When should I send my boxes so they are there when I arrive?", answer: "Book air cargo at least two weeks before your flight. Air leaves every Friday and lands in Lagos the following Friday, and customs clearance and delivery take a few more days in December. Sea cargo for Christmas 2026 closed on Friday 6 November, so use air." },
 { question: "Can my cargo be delivered to my village or another state?", answer: "Yes. R-Zone delivers door to door to all 36 states and the FCT, so boxes for relatives outside Lagos can go straight to them instead of travelling with you." },
 { question: "What should I keep in my suitcase rather than ship?", answer: "Passports and documents, prescription medicines, cash, jewellery, your own phone and laptop, and anything you need in your first days. Ship heavy gifts, foodstuffs, household items and things for relatives in other states." },
 { question: "Can I send things back to the UK after Christmas?", answer: "Yes. R-Zone also ships from Nigeria to the UK, so you can drop items at our Lagos office instead of paying excess baggage on the way back." },
 ],
 content: [
 { h: "The December luggage problem", body: "Every December, flights from the UK to Lagos and Abuja fill with people going home for Christmas, weddings and the parties of Detty December, and almost everyone is carrying more than their allowance. Shoes for cousins, food for aunties, a TV for the house, gifts for half the street.\n\nYou have two ways to take the extra: pay the airline for **excess baggage**, or send it ahead as **cargo**. This guide compares the two honestly, so you can decide what to carry, what to ship and when to book." },
 { h: "How excess baggage is charged", body: "Airlines set their own rules, and they change, so always check yours. In general:\n\n- Your ticket includes a **checked allowance**, often one or two bags of up to 23 kg each, depending on airline and fare.\n- Extra bags and overweight bags are charged **per bag**, and many airlines charge more at the airport than when you prepay online.\n- Most airlines will not accept a single bag over **32 kg**.\n- At the other end, you collect it, carry it through the airport and transport it to wherever it is going.\n\n> Get your airline's exact price for the extra bags before you decide. It is the only fair comparison." },
 { h: "How cargo is charged", body: "Cargo is priced **by weight**, not by the bag. With R-Zone, air cargo starts from **£5.80/kg plus a £20 handling fee per shipment**, and Nigerian customs clearance is included.\n\n**Example:** a 23 kg box by air starts from 23 × £5.80 = £133.40, plus £20, so **from £153.40**. Two boxes in the same shipment pay the handling fee once. Rates vary by state and by office collection or door to door, so check the [price list](/schedulesprices#pricing) or [get a quote](/quote).\n\nFor heavy, non-urgent loads, sea freight costs less per kg, but its Christmas 2026 cut-off has passed; use it for January and beyond." },
 { h: "Excess baggage vs cargo at a glance", body: "| | Excess baggage | Air cargo | Sea cargo |\n| --- | --- | --- | --- |\n| How it is priced | Per extra bag, set by the airline | Per kg, from £5.80/kg + £20 | Per kg or volume |\n| Arrives | With you | 1 to 2 weeks after booking | 4 to 6 weeks |\n| Customs | You clear it at the airport | Included | Included |\n| Delivery | You carry it home | To any door in Nigeria | To any door in Nigeria |\n| Best for | A few bags you need on arrival | Gifts, electronics, heavy extras | Bulk, household goods, food |\n\nIf you are only one bag over, excess baggage is usually simplest. If you are two or more bags over, or the extras are going to relatives in other states, cargo usually wins on cost and on effort." },
 { h: "What to carry and what to send ahead", body: "### Keep in your suitcase\n- Passports, visas and documents\n- Prescription medicines, in original packaging\n- Cash, jewellery and anything irreplaceable\n- Your own phone, laptop and chargers\n- Clothes and essentials for your first few days\n\n### Send as cargo\n- Heavy gifts: shoes, clothing, toys\n- Foodstuffs in personal quantities\n- Household items and small appliances\n- Anything for relatives in other states, delivered straight to them\n- Electronics for others, declared and well packed (see our [electronics guide](/blog/shipping-electronics-to-nigeria-from-uk))" },
 { h: "When to book so your boxes are waiting", body: "Air cargo leaves Heathrow **every Friday** (cut-off 12pm) and lands in Lagos the **following Friday**. Customs clearance and delivery then take a few working days, longer in the December rush. The simple rule: **book air cargo at least two weeks before your flight.**\n\n| If you fly | Book air cargo by |\n| --- | --- |\n| Week of 7 December | Friday 20 November |\n| Week of 14 December | Friday 27 November |\n| Week of 21 December | Friday 4 December |\n| 28 December or later | Friday 11 December (last Christmas flight) |\n\nSea freight for Christmas closed on 6 November.\n\nIf you are flying in early January, cargo booked after 11 December still travels and will be there for the New Year. Our [Christmas shipping guide](/blog/how-to-send-cargo-to-nigeria-for-christmas-2026) has the full festive schedule." },
 { h: "Coming back to the UK in January", body: "The return trip has the same problem: foodstuffs, fabrics and gifts from family. R-Zone also ships **from Nigeria to the UK**. Drop your boxes at our Lagos office and fly back light. See [importation from Nigeria](/importation) for how it works." },
 { h: "Send your extra bags with R-Zone", body: "Book a collection anywhere in England or drop off at our Upminster warehouse. We clear customs and deliver to any address in Nigeria, and you can follow every box with [live tracking](/track).\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 55 · Christmas stock for traders
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 55,
 slug: "shipping-christmas-stock-to-nigeria-for-resale",
 category: "guides",
 featured: true,
 priority: 0.85,
 wordCount: 1450,
 lastReviewed: PUBLISHED,
 metaTitle: "Shipping Christmas Stock to Nigeria for Resale",
 metaDesc: "A festive planning guide for traders shipping stock from the UK to Nigeria: what to send, sea or air, NAFDAC and SON paperwork, and the cut-off dates.",
 keywords: [
 "shipping Christmas stock to Nigeria",
 "festive season stock Nigeria",
 "import goods for Christmas sales Nigeria",
 "December stock UK to Nigeria",
 "shipping goods for resale to Nigeria",
 "Christmas business cargo Nigeria",
 ],
 ogImage: IMG("1586528116311-ad8dd3c8310d", 1200),
 canonicalUrl: URL("shipping-christmas-stock-to-nigeria-for-resale"),
 datePublished: PUBLISHED,
 dateModified: PUBLISHED,
 title: "Shipping Christmas Stock to Nigeria for Resale: A Trader's Festive Planning Guide",
 excerpt: "December is the busiest selling season of the year in Nigeria. This guide helps traders get UK stock onto the shelves in time: what to ship by sea and by air, the paperwork that keeps goods moving, and the cut-offs to plan around.",
 author: "R-Zone Cargo Team",
 date: DATE,
 readTime: "8 min read",
 img: IMG("1586528116311-ad8dd3c8310d", 1400),
 imgAlt: "Cartons of retail stock being prepared at the R-Zone warehouse for the Christmas season in Nigeria",
 tags: ["Christmas", "Business", "Stock", "Importing"],
 relatedSlugs: ["uk-to-nigeria-import-export-business-guide", "nigeria-customs-duty-guide", "bulk-shipping-uk-to-nigeria"],
 quickAnswer: "The Christmas 2026 sea cut-offs have passed, so remaining Christmas stock must go by air: weekly Friday flights from Heathrow, with the last pre-Christmas cut-off at 12pm on Friday 11 December. Put light, high-value and fast-selling lines on air now, and book sea in January for Valentine's Day and Easter stock. Declare every carton on a commercial invoice, and check that food, cosmetics and regulated electricals have the NAFDAC or SON approval they need before they leave the UK.",
 keyFacts: [
 { label: "Sea for Christmas", value: "Closed (6 Nov)" },
 { label: "Air top-ups", value: "Every Friday to 11 Dec" },
 { label: "Paperwork", value: "Commercial invoice + packing list" },
 { label: "Regulated goods", value: "NAFDAC or SON approval" },
 ],
 faqSchema: [
 { question: "When should I ship Christmas stock to Nigeria?", answer: "The sea cut-offs for Christmas 2026 (30 October and 6 November) have passed. Send remaining Christmas stock by air: it leaves every Friday and the last pre-Christmas cut-off is 12pm on Friday 11 December. For next year, book the bulk by sea by the end of October." },
 { question: "Do I need NAFDAC registration to sell imported food or cosmetics in Nigeria?", answer: "Generally yes. Food, drinks, cosmetics and toiletries imported for sale are regulated by NAFDAC, and goods without the right registration can be held at customs. Personal gifts are treated differently. Tell us what you are shipping when you ask for a quote." },
 { question: "Is customs duty included in R-Zone's price for business stock?", answer: "Customs clearance is included. Import duty on commercial goods depends on the product and its value under Nigeria's tariff, so tell us the goods and values when you ask for a quote and we will explain what to expect." },
 { question: "Can R-Zone deliver to my shop or market stall?", answer: "Yes. We deliver to business and market addresses, including Balogun and Trade Fair in Lagos and the markets in Onitsha, Aba and Kano. Give the plaza or shop name, line number and a phone number for whoever is receiving." },
 { question: "Should I ship toys and Christmas decorations by sea or air?", answer: "By sea, in most cases. They are bulky and light, so volumetric weight makes them expensive to fly. For Christmas 2026 the sea cut-off has passed, so send only small, fast-selling lines by air now, and book sea by the end of October next year." },
 ],
 content: [
 { h: "Why December stock needs planning now", body: "In Nigeria, December is when people spend: people returning from abroad for the holidays, end-of-year bonuses, weddings, church events and Christmas gifts for the whole family. Traders who have the right stock on the shelf in the first week of December sell through; those whose containers arrive on Christmas Eve sell in January at a discount.\n\nThe difference is nearly always **timing**. This guide sets out a festive shipping plan for traders sending stock from the UK, built around R-Zone's weekly sea and air schedule." },
 { h: "Your festive shipping calendar", body: "| When | What to ship | How |\n| --- | --- | --- |\n| Friday 30 October (closed) | Main stock: clothing, shoes, toys, decorations, household goods | Sea |\n| Friday 6 November (closed) | Final sea cut-off | Sea |\n| November, every Friday | High-value lines: phones, accessories, watches | Air |\n| Late November to early December | Top-ups of whatever is selling fastest | Air |\n| Friday 11 December, 12pm | Last air cut-off for delivery before Christmas | Air |\n| January | Stock for Valentine's Day and Easter | Sea |\n\nAir leaves Heathrow every Friday and lands in Lagos the following Friday. Sea cut-off is every Friday, with sailing the following Thursday and 4 to 6 weeks to Lagos." },
 { h: "What traders ship for the festive season", body: "UK stock that sells well in December tends to fall into a few groups. Each has a best way to travel:\n\n| Category | Best mode | Watch out for |\n| --- | --- | --- |\n| Clothing, shoes and bags | Sea, air for top-ups | Second-hand clothing is restricted; ship new stock |\n| Toys and games | Sea | Bulky; loose lithium batteries cannot fly |\n| Christmas decorations and lights | Sea | Light but large; electricals may need SON approval |\n| Phones, accessories, watches | Air | Declare model and value accurately |\n| Fragrances and gift sets | Sea | Perfume and aerosols are restricted on aircraft |\n| Confectionery and food gifts | Sea or air | NAFDAC registration for resale |\n| Hair and beauty | Sea or air | NAFDAC registration; no skin-lightening creams |\n\nFor product-specific detail, see our guides to [hair and beauty stock](/blog/shipping-hair-and-beauty-products-to-nigeria) and [electronics](/blog/shipping-electronics-to-nigeria-from-uk)." },
 { h: "Sea for volume, air for speed", body: "Most traders get the best result by **splitting** the order:\n\n- **Sea** carries the bulk: anything heavy, bulky or low value per kg. It is the cheapest way to move volume, but its Christmas 2026 cut-off has passed, so plan it for January and next year's festive season.\n- **Air** carries what is valuable, light or urgent. It starts from **£5.80/kg plus a £20 handling fee per shipment**, and weekly Friday flights let you restock what sells out.\n\nBulky, light goods such as toys and decorations are charged by **volumetric weight** by air (length × width × height in cm ÷ 6,000), which is why they almost always belong on the ship. For large loads, see [bulk shipping](/blog/bulk-shipping-uk-to-nigeria) and [air vs sea freight](/blog/air-freight-vs-sea-freight-nigeria)." },
 { h: "Paperwork that keeps stock moving", body: "In December, customs queues are long and incomplete paperwork costs you selling days. Before your stock leaves the UK:\n\n1. **Commercial invoice.** Every product line, quantity and value, matching your purchase receipts.\n2. **Packing list.** Which carton holds what, numbered \"1 of 20\", \"2 of 20\" and so on.\n3. **NAFDAC registration** for food, drinks, cosmetics and toiletries sold to the public.\n4. **SON approval** (SONCAP) for regulated products such as many electricals.\n5. **Genuine brands only.** Counterfeit branded goods are seized, and the busy season is when inspections are tightest.\n\n> Under-declaring values to save duty is the fastest way to get a shipment held. Declare accurately and budget for duty; our [customs duty guide](/blog/nigeria-customs-duty-guide) explains how it is calculated." },
 { h: "Packing retail stock", body: "- **Keep items in retail packaging.** Damaged packaging lowers the sale price.\n- **One product per carton** where you can, labelled on two sides with the product and quantity.\n- **Use new double-walled cartons** and fill empty space so stock does not move.\n- **Seal clothing and fabric in plastic** inside the carton to keep out humidity on the sea voyage.\n- **Insure high-value consignments.** See [marine cargo insurance](/blog/marine-cargo-insurance-uk-to-nigeria)." },
 { h: "Delivery to your shop or market", body: "We deliver to business and market addresses across Nigeria, from **Balogun and Trade Fair** in Lagos to **Onitsha, Aba and Kano**. Give the plaza or shop name, line or stall number and a phone number for whoever is receiving. Every shipment has [live tracking](/track) so you can tell customers when stock lands.\n\nMore on running a UK to Nigeria trading business: [import and export business guide](/blog/uk-to-nigeria-import-export-business-guide)." },
 { h: "Plan your Christmas stock with R-Zone", body: "Tell us what you are shipping, roughly how much and where it is going, and we will build a sea and air plan around the festive cut-offs, with collection anywhere in England or drop-off at our Upminster warehouse.\n\n[Get a business quote](/quote), or: " + CALL },
 ],
 },
 // ═══════════════════════════════════════════════════════════════════════════
 // 56 · Black Friday: buy in the UK, ship to Nigeria (added 11 November 2026)
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 56,
 slug: "black-friday-uk-deals-ship-to-nigeria",
 category: "tips",
 featured: true,
 priority: 0.85,
 wordCount: 1300,
 lastReviewed: PUBLISHED_NOV,
 metaTitle: "Black Friday 2026: Ship UK Deals to Nigeria for Christmas",
 metaDesc: "Buy on Black Friday in the UK and get it to Nigeria before Christmas: deliver to our warehouse, which flight to catch, returns, customs and costs.",
 keywords: [
 "Black Friday UK ship to Nigeria",
 "buy in UK ship to Nigeria",
 "Black Friday deals Nigeria",
 "ship online orders to Nigeria from UK",
 "UK address for Nigeria shipping",
 "Cyber Monday ship to Nigeria",
 ],
 ogImage: IMG("1556742049-0cfed4f6a45d", 1200),
 canonicalUrl: URL("black-friday-uk-deals-ship-to-nigeria"),
 datePublished: PUBLISHED_NOV,
 dateModified: PUBLISHED_NOV,
 title: "Black Friday 2026: How to Buy UK Deals and Ship Them to Nigeria Before Christmas",
 excerpt: "Black Friday falls on 27 November 2026. Here is how to send your UK deals straight to our warehouse, which Friday flight gets them to Nigeria before Christmas, and how to avoid problems with returns and customs.",
 author: "R-Zone Cargo Team",
 date: DATE_NOV,
 readTime: "6 min read",
 img: IMG("1556742049-0cfed4f6a45d", 1400),
 imgAlt: "Online Black Friday orders being paid for and prepared for shipping to Nigeria",
 tags: ["Black Friday", "Christmas", "Online Shopping", "Festive Shipping"],
 relatedSlugs: ["how-to-send-cargo-to-nigeria-for-christmas-2026", "shipping-electronics-to-nigeria-from-uk", "christmas-gift-ideas-to-send-to-nigeria"],
 quickAnswer: "Black Friday is Friday 27 November 2026 and Cyber Monday is 30 November. Have your orders delivered to R-Zone's Upminster warehouse with your account reference (call us first to set one up), and we combine them into one shipment. Orders that reach us by 12pm on Friday 4 December fly that day and are delivered before Christmas; 12pm Friday 11 December is the last flight that still makes Christmas.",
 keyFacts: [
 { label: "Black Friday", value: "Fri 27 November 2026" },
 { label: "Best flight", value: "Fri 4 December, 12pm" },
 { label: "Last Christmas flight", value: "Fri 11 December, 12pm" },
 { label: "Air price", value: "From £5.80/kg + £20" },
 ],
 faqSchema: [
 { question: "Can I have Black Friday orders delivered to R-Zone and shipped to Nigeria?", answer: "Yes. Call or WhatsApp us first to set up an account reference, then use our Upminster warehouse as the delivery address with that reference. We receive and check your orders, combine them into one shipment and send it to Nigeria." },
 { question: "Will Black Friday orders reach Nigeria before Christmas?", answer: "Yes, if they reach our warehouse in time. Orders that arrive by 12pm on Friday 4 December fly that day and land in Lagos on 11 December. The last flight that still delivers before Christmas leaves at 12pm on Friday 11 December." },
 { question: "Do I pay customs duty on Black Friday purchases?", answer: "Gifts and personal items in reasonable quantities are normally cleared as personal goods. Several identical items bought to sell are treated as commercial goods and pay duty. Declare the price you actually paid." },
 { question: "What if I need to return something?", answer: "Check every item at our warehouse before it ships. UK returns are simple while the item is still in the UK, but very hard once it has gone to Nigeria. Ask us to open and check a parcel if you are unsure." },
 { question: "Can you ship phones and laptops bought on Black Friday?", answer: "Yes, by air, with the batteries installed in the device. Loose power banks and spare lithium batteries cannot be shipped as cargo." },
 ],
 content: [
 { h: "Black Friday deals, Christmas in Nigeria", body: "Black Friday is one of the best times of year to buy phones, laptops, trainers, clothes and gifts in the UK, and for many families those deals end up under a Christmas tree in Lagos, Abuja or Enugu.\n\nThe trick is timing. **Black Friday is Friday 27 November 2026** and **Cyber Monday is 30 November**, which leaves two Friday flights to get your purchases to Nigeria before Christmas. This guide shows how to make them." },
 { h: "Step 1: Use our warehouse as your delivery address", body: "Instead of having parcels delivered to your home and then sending them on, have them delivered **straight to our Upminster warehouse**.\n\n1. **Call or WhatsApp us first** to set up your account reference.\n2. **Enter our warehouse as the delivery address** with your name and reference on every order.\n3. **Send us your order list** so we know what to expect.\n4. **We receive, check and combine** everything into one shipment, so you pay the £20 handling fee once.\n\n> Do this before you shop. Parcels that arrive without a reference take longer to match to you." },
 { h: "Step 2: Catch the right Friday flight", body: "Air cargo leaves Heathrow **every Friday at 12pm** and lands in Lagos **the following Friday**.\n\n| Orders reach our warehouse by | Flight | Lands in Lagos | Christmas? |\n| --- | --- | --- | --- |\n| 12pm Friday 4 December | 4 December | 11 December | Yes, with time to spare |\n| 12pm Friday 11 December | 11 December | 18 December | Yes, the last one that makes it |\n| After 11 December | 18 December or later | From 25 December | No, arrives for the New Year |\n\nUK retailers usually deliver within two to five working days, but Black Friday week is busy. Choose the fastest delivery option at checkout, or buy early in the week." },
 { h: "Check before it leaves the UK", body: "- **Open and check** anything you are not sure about. A faulty item is easy to return in the UK and very hard to return from Nigeria.\n- **Keep receipts and order confirmations.** We use them for the customs declaration.\n- **Watch for fake deals.** Counterfeit branded goods are seized by Nigerian customs.\n- **Remove loose power banks and spare batteries.** They cannot fly as cargo; batteries inside devices are fine." },
 { h: "Customs: personal or for resale?", body: "Christmas gifts and personal purchases in reasonable quantities are normally cleared as personal goods. **Five identical phones** or a box of the same trainers in every size looks like stock for sale and is assessed as commercial goods. Declare what you paid. Our [customs duty guide](/blog/nigeria-customs-duty-guide) explains how duty works." },
 { h: "What it costs", body: "Air freight starts from **£5.80/kg** (Lagos, office collection) plus a **£20 handling fee per shipment**, and you pay on the greater of actual or volumetric weight. Retail boxes are often bigger than they need to be, so tell us if we may repack to save volume.\n\n| Typical Black Friday buy | Packed weight | Freight at £5.80/kg |\n| --- | --- | --- |\n| Smartphone | about 0.5kg | about £3 |\n| Laptop | 2 to 3kg | £12 to £18 |\n| Pair of trainers | 1.5kg | about £9 |\n| Games console | 5 to 7kg | £29 to £41 |\n\nLagos office collection has a 10kg minimum, so combining several purchases into one shipment is much cheaper per item. Rates for every state: [price list](/schedulesprices#pricing)." },
 { h: "Ship your Black Friday deals with R-Zone", body: "Set up your reference before Black Friday, send your orders to our warehouse, and we will get them on the Friday flight. Need gift ideas? See [Christmas gifts to send to Nigeria](/blog/christmas-gift-ideas-to-send-to-nigeria). For all the festive dates: [Christmas shipping guide](/blog/how-to-send-cargo-to-nigeria-for-christmas-2026).\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 57 · Christmas gift ideas to send to Nigeria
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 57,
 slug: "christmas-gift-ideas-to-send-to-nigeria",
 category: "tips",
 featured: true,
 priority: 0.85,
 wordCount: 1400,
 lastReviewed: PUBLISHED_NOV,
 metaTitle: "Christmas Gifts to Send to Nigeria from the UK (2026)",
 metaDesc: "The best Christmas gifts to send to family in Nigeria from the UK: ideas for parents, children and the home, what travels well, what to avoid and dates.",
 keywords: [
 "Christmas gifts to send to Nigeria",
 "gift ideas for family in Nigeria",
 "what to send to Nigeria for Christmas",
 "send Christmas presents to Nigeria from UK",
 "gifts for parents in Nigeria",
 "UK gifts Nigerians love",
 ],
 ogImage: IMG("1512389142860-9c449e58a543", 1200),
 canonicalUrl: URL("christmas-gift-ideas-to-send-to-nigeria"),
 datePublished: PUBLISHED_NOV,
 dateModified: PUBLISHED_NOV,
 title: "Christmas Gifts to Send to Nigeria from the UK: Ideas That Travel Well",
 excerpt: "Gift ideas for parents, children, teenagers and the home that family in Nigeria will love, chosen because they travel well, clear customs easily and cost little to ship.",
 author: "R-Zone Cargo Team",
 date: DATE_NOV,
 readTime: "7 min read",
 img: IMG("1512389142860-9c449e58a543", 1400),
 imgAlt: "Wrapped Christmas presents ready to be packed and sent to family in Nigeria",
 tags: ["Christmas", "Gift Ideas", "Family", "Festive Shipping"],
 relatedSlugs: ["sending-christmas-hampers-to-nigeria-from-uk", "black-friday-uk-deals-ship-to-nigeria", "shipping-wedding-items-and-aso-ebi-to-nigeria"],
 quickAnswer: "The best Christmas gifts to send to Nigeria are light, durable and hard to find locally: quality clothing and shoes, children's toys and books, phones and accessories, skincare and toiletry sets (no aerosols by air), kitchen gadgets and bedding. Avoid alcohol, fresh food, aerosols and loose batteries. Send by air before 12pm on Friday 11 December for delivery before Christmas.",
 keyFacts: [
 { label: "Best gifts", value: "Light, durable, hard to find locally" },
 { label: "Avoid", value: "Alcohol, fresh food, aerosols" },
 { label: "Last Christmas flight", value: "Fri 11 December, 12pm" },
 { label: "Air price", value: "From £5.80/kg + £20" },
 ],
 faqSchema: [
 { question: "What are good Christmas gifts to send to Nigeria from the UK?", answer: "Quality clothing and shoes, children's toys, books and school supplies, phones and accessories, skincare and toiletry gift sets, kitchen gadgets, bedding and towels, and shop-bought biscuits, tea and chocolate. They are light, durable and valued in Nigeria." },
 { question: "What gifts should I not send to Nigeria?", answer: "Alcohol, fresh or homemade food, meat, chicken-flavoured Maggi or Indomie, skin-lightening creams, loose power banks and spare batteries, and anything on Nigeria's prohibited list. Perfumes and aerosols cannot go by air." },
 { question: "Can I send toys with batteries to Nigeria?", answer: "Yes, if the batteries are installed in the toy or it is sold with ordinary sealed batteries. Loose lithium batteries and power banks cannot be shipped as air cargo." },
 { question: "Should I wrap Christmas presents before shipping them?", answer: "Wrap gifts inside the box if you like, but leave the outer box plain. Customs may open it, and festive paper on the outside invites attention. A gift tag inside each present tells the family who it is for." },
 { question: "When is the last date to send Christmas gifts to Nigeria?", answer: "For Christmas 2026 the last R-Zone air flight that delivers before Christmas Day leaves Heathrow at 12pm on Friday 11 December. Sea freight for Christmas has closed." },
 ],
 content: [
 { h: "Gifts that make Christmas in Nigeria", body: "A box from the UK at Christmas is about more than what is inside: it is a sign that the family abroad remembered. The best gifts are things that are **hard to find or expensive in Nigeria**, **light enough to ship cheaply** and **durable enough to arrive perfect**.\n\nHere are ideas for everyone on your list, plus what to leave out and how to get it there in time." },
 { h: "For parents and grandparents", body: "- **Warm-weather clothing** in good fabrics: shirts, kaftans, wrappers, quality underwear\n- **Comfortable shoes and slippers**\n- **Reading glasses, pill organisers and a good torch**\n- **Skincare and toiletry sets**: shea and cocoa butter, quality soap (no bleaching products)\n- **A tablet or simple smartphone** loaded with family photos\n- **Tea, coffee, biscuits and Christmas cake**: see our [hamper guide](/blog/sending-christmas-hampers-to-nigeria-from-uk)" },
 { h: "For children and teenagers", body: "- **Toys and games**: building sets, dolls, remote-control cars (batteries installed), board games\n- **Books**: storybooks, revision guides and the series they are into\n- **School supplies**: bags, calculators, stationery sets, lunch boxes\n- **Football kits and trainers**\n- **Headphones, game vouchers and phone accessories** for teenagers\n\n> Children's clothes and shoes in the next size up get used all year." },
 { h: "For the home", body: "- **Bedding, duvet covers and towels**\n- **Kitchen gadgets**: blenders, air fryers and pressure cookers (check the voltage is 220 to 240V; UK appliances are)\n- **Non-stick pans and storage containers**\n- **Rechargeable fans and lamps** with built-in batteries, useful during power cuts\n- **Christmas decorations**: lights, ornaments, table linen" },
 { h: "What to leave out", body: "| Do not send | Why |\n| --- | --- |\n| Alcohol | Not accepted |\n| Fresh or homemade food, meat, dairy | Perishable, not accepted |\n| Chicken-flavoured Maggi or Indomie | Not accepted |\n| Skin-lightening creams | Banned in Nigeria |\n| Perfume and aerosols | Restricted on aircraft |\n| Loose power banks and spare batteries | Not accepted as air cargo |\n| Cash | Send money separately |\n\nFull list: [prohibited and restricted items](/blog/prohibited-items-shipping-to-nigeria-from-uk)." },
 { h: "Packing presents to arrive perfect", body: "1. **New double-walled box**, heavy items at the bottom.\n2. **Wrap presents inside**, plain outer box: customs may open it.\n3. **A gift tag on every present** so the family knows who it is for.\n4. **Fill every gap** with soft gifts or paper.\n5. **Label the box** with the recipient's full name, address with a landmark, and phone number.\n\nMore advice: [how to pack cargo for Nigeria](/blog/how-to-pack-cargo-for-shipping-to-nigeria)." },
 { h: "Dates and costs for Christmas 2026", body: "Sea freight for Christmas has closed. **Air** leaves Heathrow every Friday; the **last flight that delivers before Christmas is 12pm Friday 11 December**, and 4 December gives more margin.\n\nAir starts from **£5.80/kg plus £20 per shipment**. A 15kg box of gifts to Lagos office collection is about £107 (15 × £5.80 + £20). Rates for every state: [price list](/schedulesprices#pricing).\n\nShopping on Black Friday? See [how to ship Black Friday deals to Nigeria](/blog/black-friday-uk-deals-ship-to-nigeria).\n\n" + CALL },
 ],
 },

 // ═══════════════════════════════════════════════════════════════════════════
 // 58 · Nigeria to UK after the holidays
 // ═══════════════════════════════════════════════════════════════════════════
 {
 id: 58,
 slug: "send-foodstuff-from-nigeria-to-uk-after-christmas",
 category: "tips",
 featured: true,
 priority: 0.85,
 wordCount: 1250,
 lastReviewed: PUBLISHED_NOV,
 metaTitle: "Send Foodstuff from Nigeria to the UK After Christmas",
 metaDesc: "Coming back from Nigeria in January? Send foodstuff, fabrics and gifts to the UK as cargo instead of excess baggage: what is allowed, prices and timings.",
 keywords: [
 "send foodstuff from Nigeria to UK",
 "cargo from Nigeria to UK",
 "ship from Lagos to London",
 "Nigeria to UK shipping January",
 "send food from Nigeria to UK",
 "Nigeria to UK cargo price",
 ],
 ogImage: IMG("1607082348824-0a96f2a4b9da", 1200),
 canonicalUrl: URL("send-foodstuff-from-nigeria-to-uk-after-christmas"),
 datePublished: PUBLISHED_NOV,
 dateModified: PUBLISHED_NOV,
 title: "Sending Foodstuff and Gifts from Nigeria to the UK After the Holidays",
 excerpt: "Flying back to the UK in January with more than your allowance? Drop your foodstuff, fabrics and gifts at our Lagos office and we fly them to the UK, cleared through UK customs and delivered to your door.",
 author: "R-Zone Cargo Team",
 date: DATE_NOV,
 readTime: "6 min read",
 img: IMG("1607082348824-0a96f2a4b9da", 1400),
 imgAlt: "Nigerian foodstuff and gifts packed for shipping from Lagos to the UK",
 tags: ["Nigeria to UK", "Foodstuff", "January", "Importation"],
 relatedSlugs: ["excess-baggage-to-nigeria-vs-cargo", "sending-food-from-uk-to-nigeria-nafdac", "how-to-send-cargo-to-nigeria-for-christmas-2026"],
 quickAnswer: "R-Zone ships from Nigeria to the UK every week by air, typically in 5 to 8 working days, from £4.80/kg from Lagos (minimum 20kg; 30kg from most other states), with UK customs clearance included and delivery to your UK door available. Drop your boxes at our Egbeda, Lagos office. Dried foodstuffs, spices, fabrics and gifts are fine; meat and dairy products cannot enter the UK.",
 keyFacts: [
 { label: "Air from Lagos", value: "From £4.80/kg" },
 { label: "Transit", value: "5 to 8 working days" },
 { label: "Minimum", value: "20kg Lagos, 30kg most states" },
 { label: "Drop-off", value: "Egbeda, Lagos" },
 ],
 faqSchema: [
 { question: "How do I send foodstuff from Nigeria to the UK?", answer: "Pack it well, drop it at R-Zone's office in Egbeda, Lagos (or ask about collection), and we fly it to the UK on our weekly air service. UK customs clearance is included, and we can deliver to your UK door." },
 { question: "How much does it cost to ship from Nigeria to the UK?", answer: "Air freight from Lagos starts from £4.80/kg, or £5.20/kg with delivery to your UK door, with a 20kg minimum. Rates from other states are higher and most have a 30kg minimum. Prices can move with the naira exchange rate, so confirm your quote before you ship." },
 { question: "Which Nigerian foods can I send to the UK?", answer: "Dried and packaged foodstuffs such as garri, elubo, beans, egusi, ogbono, crayfish, dried pepper, spices, plantain chips and chin chin are commonly shipped. Meat and dairy products cannot be imported into the UK from Nigeria, and some other foods have limits, so check with us first." },
 { question: "How long does cargo take from Nigeria to the UK?", answer: "Air cargo typically takes 5 to 8 working days. Sea freight takes 4 to 6 weeks and sails monthly." },
 { question: "What cannot be sent from Nigeria to the UK?", answer: "Meat and dairy products, bleaching creams, chicken-flavoured Indomie or Maggi, liquid herbs, live animals, firearms, controlled drugs and anything on the UK prohibited list." },
 ],
 content: [
 { h: "Going back to the UK with more than you came with", body: "January flights from Lagos and Abuja to London are full of people carrying garri, egusi, fabrics and gifts from family. Airline allowances rarely stretch that far, and excess baggage at the airport is expensive.\n\nThe alternative is to **send it as cargo**. R-Zone ships from Nigeria to the UK every week, clears UK customs for you and can deliver to your door." },
 { h: "How it works", body: "1. **Get a quote** from our Lagos team or UK office with the weight and what you are sending.\n2. **Drop off at our office in Egbeda, Lagos**, or ask about collection.\n3. **We fly it to the UK** on our weekly air service.\n4. **UK customs clearance** is handled by our Upminster team.\n5. **Delivery to your door** anywhere in the UK, or collection from our warehouse.\n\nFull details: [importation from Nigeria](/importation)." },
 { h: "Prices and timings", body: "| | Air |\n| --- | --- |\n| From Lagos | From £4.80/kg, or £5.20/kg delivered to your UK door |\n| From Ibadan and Akure | From £5.00/kg |\n| From most other states | Higher rates, 30kg minimum |\n| Minimum | 20kg from Lagos, Ibadan and Akure |\n| Transit | 5 to 8 working days |\n\nSea freight sails monthly and takes 4 to 6 weeks. Rates can move with the naira exchange rate, so confirm your quote before you ship." },
 { h: "Foodstuffs you can send", body: "Dried and packaged Nigerian foods travel well and are what most people send:\n\n- **Grains and flours:** garri, elubo, semovita, beans, rice\n- **Soup ingredients:** egusi, ogbono, crayfish, dried pepper, locust beans, bitter leaf (dried)\n- **Spices and seasonings** in sealed packs\n- **Snacks:** chin chin, plantain chips, kuli kuli, groundnuts\n- **Palm oil** in strong sealed containers, wrapped against leaks\n\n> **Not allowed into the UK:** meat and meat products, milk and dairy products. Some fish and plant products have limits. Ask us before you pack anything you are unsure about." },
 { h: "Also not accepted", body: "- Bleaching and skin-lightening creams\n- Chicken-flavoured Indomie or Maggi\n- Liquid herbs\n- Live animals and fresh produce with soil\n- Firearms, controlled drugs and anything on the UK prohibited list" },
 { h: "Packing for the journey", body: "- **Double-bag dry foods** and seal them; flour and garri leak through single bags.\n- **Palm oil and liquids** in screw-top containers, taped, bagged and packed upright.\n- **Fabrics and clothes** in plastic bags to keep them clean.\n- **Label every box** with your UK name, address, postcode and phone number." },
 { h: "Book your return shipment", body: "Flying back in January? Arrange it before you leave the UK, or call our Lagos team while you are there. Travelling out for Christmas? See [excess baggage or cargo](/blog/excess-baggage-to-nigeria-vs-cargo) for the trip there.\n\n" + CALL },
 ],
 },
];
