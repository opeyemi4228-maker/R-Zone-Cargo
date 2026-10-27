// lib/articles-festive-2026.js
// ─────────────────────────────────────────────────────────────────────────────
// Three festive-season articles added 27 October 2026, spread into ARTICLES in
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
// prices (air from £5.50/kg, £20 air handling fee per shipment), no state
// rates, no ranking claims, no airline fees (they vary and change).
// Every article also needs app/blog/<slug>/page.jsx.
// ─────────────────────────────────────────────────────────────────────────────

const IMG = (id, w) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format&fit=crop`;
const URL = (slug) => `https://r-zoneenterprises.com/blog/${slug}`;

const PUBLISHED = "2026-10-27";
const DATE = "27 October 2026";

const CALL = "Call **+44 (0) 800 772 0864** or WhatsApp **+44 7915 647119** and a member of our UK team will help.";

const DEADLINES =
 "| Christmas 2026 | Cut-off | What it means |\n| --- | --- | --- |\n| Sea, recommended | **Friday 30 October** | Sails 5 November, arrives in early to mid December |\n| Sea, last chance | **Friday 6 November** | Sails 12 November; arrival before Christmas is likely but not guaranteed |\n| Air, last flight | **Friday 11 December, 12pm** | Lands in Lagos 18 December, cleared and delivered before Christmas |";

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
 relatedSlugs: ["how-to-send-cargo-to-nigeria-for-christmas-2026", "sending-food-from-uk-to-nigeria-nafdac", "what-is-volumetric-weight-freight-nigeria"],
 quickAnswer: "Pack shop-bought, sealed, long-life food and gifts (biscuits, tea, chocolate, Christmas cake, toiletries) in a strong double-walled box rather than a wicker basket, and leave out alcohol, fresh food and aerosols. For delivery before Christmas 2026, book sea freight by Friday 30 October or air freight by Friday 11 December at 12pm.",
 keyFacts: [
 { label: "Last air cut-off", value: "Fri 11 Dec, 12pm" },
 { label: "Sea cut-off", value: "Fri 30 Oct (6 Nov latest)" },
 { label: "Not allowed", value: "Alcohol, fresh food, meat" },
 { label: "Air pricing", value: "From £5.50/kg + £20 per shipment" },
 ],
 faqSchema: [
 { question: "Can I send a Christmas hamper to Nigeria from the UK?", answer: "Yes. R-Zone ships hampers you put together yourself, door to door to any Nigerian state, with customs clearance included. Use shop-bought, sealed, long-life food and gifts in personal quantities and leave out alcohol, fresh food and meat." },
 { question: "What should I not put in a hamper for Nigeria?", answer: "Do not include alcohol (wine, spirits or champagne), fresh or homemade food, meat or dairy, chicken-flavoured Maggi or Indomie, or anything on Nigeria's prohibited list. Perfumes and aerosols cannot go by air, so leave them out of an air-freight hamper." },
 { question: "Will chocolate melt on the way to Nigeria?", answer: "It can. Sea containers get hot over 4 to 6 weeks, so chocolate-heavy hampers are safer by air. Wrap chocolate in a sealed bag in the middle of the box, away from the sides." },
 { question: "Should I use a wicker hamper basket?", answer: "Usually not. Air freight is charged on the greater of actual or volumetric weight, and a bulky basket can cost almost twice as much to ship as a compact box holding the same food. Pack the gifts in a double-walled box; a flat-packed or fabric basket can go inside if you want the presentation." },
 { question: "When is the last date to send a Christmas hamper to Nigeria?", answer: "For Christmas 2026 the last R-Zone air cut-off is 12pm on Friday 11 December. By sea, book by Friday 30 October; Friday 6 November is the final sea cut-off, but arrival before Christmas is not guaranteed." },
 ],
 content: [
 { h: "Why a hamper from the UK means so much at Christmas", body: "For many families in Nigeria, the box from the UK is part of Christmas: the tin of shortbread, the tea, the chocolates the children wait for. A well-packed hamper is one of the simplest ways to be part of the celebration when you cannot be there.\n\nR-Zone does not sell hampers. You choose what goes in, and we collect it (or you drop it at our Upminster warehouse), clear it through Nigerian customs and deliver it to the door, anywhere in Nigeria. This guide covers what to pack, what to leave out, and the dates that get it there before Christmas Day." },
 { h: "What to put in a Christmas hamper for Nigeria", body: "Shop-bought, sealed and long-life is the rule. These travel well and clear customs without trouble:\n\n| Item | Good choices | Tip |\n| --- | --- | --- |\n| Biscuits | Shortbread, tins of assorted biscuits | Tins protect the contents and are reused for years |\n| Chocolate and sweets | Selection boxes, wrapped sweets | Heat is the risk: send by air if it is mostly chocolate |\n| Hot drinks | Tea bags, instant coffee, hot chocolate, Milo, Ovaltine | Light and popular |\n| Christmas cake and pudding | Shop-bought, sealed, long-life | Choose versions without added alcohol |\n| Breakfast | Porridge oats, cereal, honey, jam | Keep jars wrapped and upright |\n| Gifts | Toiletry sets (no aerosols), socks, scarves, toys | Non-food gifts fill gaps and protect the food |\n\n> Keep it to personal quantities. A hamper for family is a gift; twenty identical tins look like stock for sale and can attract duty or NAFDAC questions. Our [guide to sending food to Nigeria](/blog/sending-food-from-uk-to-nigeria-nafdac) explains the rules." },
 { h: "What customs will not accept", body: "These are the items that get hampers held or opened most often. Leave them out:\n\n- **Alcohol** of any kind, including wine, champagne, spirits and liqueur chocolates sold as alcohol.\n- **Fresh or homemade food**, including homemade cake, fresh fruit, cheese, meat and anything that needs a fridge.\n- **Chicken-flavoured Maggi and Indomie**, which are not accepted.\n- **Perfumes, aerosols and nail varnish** in an air-freight hamper. They are flammable and restricted on aircraft.\n- **Cash and vouchers.** Send money separately, never inside a box.\n\nThe full list is in our guide to [prohibited and restricted items](/blog/prohibited-items-shipping-to-nigeria-from-uk). If you are unsure about one item, ask us before you pack it." },
 { h: "Box or basket? How to pack a hamper so it arrives intact", body: "A wicker basket looks lovely in a shop but travels badly. It crushes, it does not stack, and its shape costs you money: air freight is charged on the greater of actual weight or **volumetric weight** (length × width × height in cm ÷ 6,000).\n\n| Packaging | Size | Volumetric weight |\n| --- | --- | --- |\n| Compact double-walled box | 40 × 30 × 30 cm | 6 kg |\n| Typical wicker basket, boxed | 50 × 40 × 35 cm | 11.7 kg |\n\nThe same food in the basket can cost almost twice as much to fly. See [how volumetric weight works](/blog/what-is-volumetric-weight-freight-nigeria) for more examples.\n\n### Packing step by step\n1. **Start with a new double-walled box.** Supermarket boxes are not strong enough.\n2. **Heavy and hard items at the bottom**: tins, jars and cake boxes.\n3. **Wrap every jar and bottle** in bubble wrap and put it in a sealed bag in case it leaks.\n4. **Chocolate in the middle**, away from the walls of the box where heat gets in.\n5. **Fill every gap** with soft gifts, socks or paper so nothing moves when you shake the box.\n6. **Tape every seam** with three strips of parcel tape. Do not gift-wrap the outside: customs may open it.\n7. **Label it** with the recipient's full name, address with landmark and LGA, and Nigerian phone number, and put a copy of the label inside." },
 { h: "Air or sea for a Christmas hamper?", body: "**Air** is the better choice for most hampers. It is faster, the box spends less time in heat, and it is the only option for anything booked after early November. Air freight starts from **£5.50/kg plus a £20 handling fee per shipment**, so an 8 kg hamper starts from about £64. Rates vary by state and by drop-off or door to door: see the [price list](/schedulesprices#pricing).\n\n**Sea** suits large or heavy hampers with no chocolate, such as tins, drinks powder, rice and household gifts, if you can book by the end of October.\n\n> Sending hampers to several relatives? If they can all go to one address, one shipment means one handling fee. Label each hamper with the name of the person it is for." },
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
 relatedSlugs: ["how-to-send-cargo-to-nigeria-for-christmas-2026", "air-freight-uk-to-nigeria", "door-to-door-shipping-uk-to-nigeria"],
 quickAnswer: "Carry what you need on arrival (documents, medicines, valuables, a few gifts) in your allowance, and send the rest as cargo. Cargo is priced per kg, from £5.50/kg by air plus £20 per shipment, it can be delivered to any state, and customs clearance is included. To have boxes waiting when you land, book air cargo at least two weeks before your flight.",
 keyFacts: [
 { label: "Air cargo", value: "From £5.50/kg + £20 per shipment" },
 { label: "Book air", value: "2 weeks before you fly" },
 { label: "Last Christmas flight", value: "Fri 11 Dec, 12pm" },
 { label: "Delivery", value: "Door to door, any state" },
 ],
 faqSchema: [
 { question: "Is it cheaper to send luggage to Nigeria as cargo than to pay excess baggage?", answer: "Often, for heavy or multiple extra bags. Airline excess charges are per bag and vary by airline, route and when you pay, while cargo is priced per kg, from £5.50/kg by air plus £20 per shipment, with customs clearance included. Get your airline's price for the extra bags and an R-Zone quote for the same weight and compare." },
 { question: "When should I send my boxes so they are there when I arrive?", answer: "Book air cargo at least two weeks before your flight. Air leaves every Friday and lands in Lagos the following Friday, and customs clearance and delivery take a few more days in December. Sea cargo for Christmas 2026 should be booked by Friday 30 October." },
 { question: "Can my cargo be delivered to my village or another state?", answer: "Yes. R-Zone delivers door to door to all 36 states and the FCT, so boxes for relatives outside Lagos can go straight to them instead of travelling with you." },
 { question: "What should I keep in my suitcase rather than ship?", answer: "Passports and documents, prescription medicines, cash, jewellery, your own phone and laptop, and anything you need in your first days. Ship heavy gifts, foodstuffs, household items and things for relatives in other states." },
 { question: "Can I send things back to the UK after Christmas?", answer: "Yes. R-Zone also ships from Nigeria to the UK, so you can drop items at our Lagos office instead of paying excess baggage on the way back." },
 ],
 content: [
 { h: "The December luggage problem", body: "Every December, flights from the UK to Lagos and Abuja fill with people going home for Christmas, weddings and the parties of Detty December, and almost everyone is carrying more than their allowance. Shoes for cousins, food for aunties, a TV for the house, gifts for half the street.\n\nYou have two ways to take the extra: pay the airline for **excess baggage**, or send it ahead as **cargo**. This guide compares the two honestly, so you can decide what to carry, what to ship and when to book." },
 { h: "How excess baggage is charged", body: "Airlines set their own rules, and they change, so always check yours. In general:\n\n- Your ticket includes a **checked allowance**, often one or two bags of up to 23 kg each, depending on airline and fare.\n- Extra bags and overweight bags are charged **per bag**, and many airlines charge more at the airport than when you prepay online.\n- Most airlines will not accept a single bag over **32 kg**.\n- At the other end, you collect it, carry it through the airport and transport it to wherever it is going.\n\n> Get your airline's exact price for the extra bags before you decide. It is the only fair comparison." },
 { h: "How cargo is charged", body: "Cargo is priced **by weight**, not by the bag. With R-Zone, air cargo starts from **£5.50/kg plus a £20 handling fee per shipment**, and Nigerian customs clearance is included.\n\n**Example:** a 23 kg box by air starts from 23 × £5.50 = £126.50, plus £20, so **from £146.50**. Two boxes in the same shipment pay the handling fee once. Rates vary by state and by drop-off or door to door, so check the [price list](/schedulesprices#pricing) or [get a quote](/quote).\n\nFor heavy, non-urgent loads, sea freight costs less per kg, but for Christmas 2026 it needs booking by the end of October." },
 { h: "Excess baggage vs cargo at a glance", body: "| | Excess baggage | Air cargo | Sea cargo |\n| --- | --- | --- | --- |\n| How it is priced | Per extra bag, set by the airline | Per kg, from £5.50/kg + £20 | Per kg or volume |\n| Arrives | With you | 1 to 2 weeks after booking | 4 to 6 weeks |\n| Customs | You clear it at the airport | Included | Included |\n| Delivery | You carry it home | To any door in Nigeria | To any door in Nigeria |\n| Best for | A few bags you need on arrival | Gifts, electronics, heavy extras | Bulk, household goods, food |\n\nIf you are only one bag over, excess baggage is usually simplest. If you are two or more bags over, or the extras are going to relatives in other states, cargo usually wins on cost and on effort." },
 { h: "What to carry and what to send ahead", body: "### Keep in your suitcase\n- Passports, visas and documents\n- Prescription medicines, in original packaging\n- Cash, jewellery and anything irreplaceable\n- Your own phone, laptop and chargers\n- Clothes and essentials for your first few days\n\n### Send as cargo\n- Heavy gifts: shoes, clothing, toys\n- Foodstuffs in personal quantities\n- Household items and small appliances\n- Anything for relatives in other states, delivered straight to them\n- Electronics for others, declared and well packed (see our [electronics guide](/blog/shipping-electronics-to-nigeria-from-uk))" },
 { h: "When to book so your boxes are waiting", body: "Air cargo leaves Heathrow **every Friday** (cut-off 12pm) and lands in Lagos the **following Friday**. Customs clearance and delivery then take a few working days, longer in the December rush. The simple rule: **book air cargo at least two weeks before your flight.**\n\n| If you fly | Book air cargo by | Or sea by |\n| --- | --- | --- |\n| Week of 7 December | Friday 20 November | Friday 30 October |\n| Week of 14 December | Friday 27 November | Friday 30 October |\n| Week of 21 December | Friday 4 December | Friday 30 October |\n| 28 December or later | Friday 11 December (last Christmas flight) | Too late for Christmas |\n\nIf you are flying in early January, cargo booked after 11 December still travels and will be there for the New Year. Our [Christmas shipping guide](/blog/how-to-send-cargo-to-nigeria-for-christmas-2026) has the full festive schedule." },
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
 quickAnswer: "Ship your main Christmas stock by sea, booked by Friday 30 October 2026, and use weekly air freight for high-value items and top-ups, with the last pre-Christmas air cut-off at 12pm on Friday 11 December. Declare every carton on a commercial invoice, and check that food, cosmetics and regulated electricals have the NAFDAC or SON approval they need before they leave the UK.",
 keyFacts: [
 { label: "Main stock by sea", value: "Book by Fri 30 Oct" },
 { label: "Air top-ups", value: "Every Friday to 11 Dec" },
 { label: "Paperwork", value: "Commercial invoice + packing list" },
 { label: "Regulated goods", value: "NAFDAC or SON approval" },
 ],
 faqSchema: [
 { question: "When should I ship Christmas stock to Nigeria?", answer: "Ship the bulk by sea, booked by Friday 30 October 2026, so it is on sale in early December. Use air freight for top-ups and best sellers; air leaves every Friday and the last pre-Christmas cut-off is 12pm on Friday 11 December." },
 { question: "Do I need NAFDAC registration to sell imported food or cosmetics in Nigeria?", answer: "Generally yes. Food, drinks, cosmetics and toiletries imported for sale are regulated by NAFDAC, and goods without the right registration can be held at customs. Personal gifts are treated differently. Tell us what you are shipping when you ask for a quote." },
 { question: "Is customs duty included in R-Zone's price for business stock?", answer: "Customs clearance is included. Import duty on commercial goods depends on the product and its value under Nigeria's tariff, so tell us the goods and values when you ask for a quote and we will explain what to expect." },
 { question: "Can R-Zone deliver to my shop or market stall?", answer: "Yes. We deliver to business and market addresses, including Balogun and Trade Fair in Lagos and the markets in Onitsha, Aba and Kano. Give the plaza or shop name, line number and a phone number for whoever is receiving." },
 { question: "Should I ship toys and Christmas decorations by sea or air?", answer: "By sea, in most cases. They are bulky and light, so volumetric weight makes them expensive to fly. Book by the end of October so they are in Nigeria before the December rush." },
 ],
 content: [
 { h: "Why December stock needs planning now", body: "In Nigeria, December is when people spend: people returning from abroad for the holidays, end-of-year bonuses, weddings, church events and Christmas gifts for the whole family. Traders who have the right stock on the shelf in the first week of December sell through; those whose containers arrive on Christmas Eve sell in January at a discount.\n\nThe difference is nearly always **timing**. This guide sets out a festive shipping plan for traders sending stock from the UK, built around R-Zone's weekly sea and air schedule." },
 { h: "Your festive shipping calendar", body: "| When | What to ship | How |\n| --- | --- | --- |\n| By Friday 30 October | Main stock: clothing, shoes, toys, decorations, household goods | Sea |\n| Friday 6 November | Final sea cut-off; arrival before Christmas not guaranteed | Sea |\n| November, every Friday | High-value lines: phones, accessories, watches | Air |\n| Late November to early December | Top-ups of whatever is selling fastest | Air |\n| Friday 11 December, 12pm | Last air cut-off for delivery before Christmas | Air |\n| January | Stock for Valentine's Day and Easter | Sea |\n\nAir leaves Heathrow every Friday and lands in Lagos the following Friday. Sea cut-off is every Friday, with sailing the following Thursday and 4 to 6 weeks to Lagos." },
 { h: "What traders ship for the festive season", body: "UK stock that sells well in December tends to fall into a few groups. Each has a best way to travel:\n\n| Category | Best mode | Watch out for |\n| --- | --- | --- |\n| Clothing, shoes and bags | Sea, air for top-ups | Second-hand clothing is restricted; ship new stock |\n| Toys and games | Sea | Bulky; loose lithium batteries cannot fly |\n| Christmas decorations and lights | Sea | Light but large; electricals may need SON approval |\n| Phones, accessories, watches | Air | Declare model and value accurately |\n| Fragrances and gift sets | Sea | Perfume and aerosols are restricted on aircraft |\n| Confectionery and food gifts | Sea or air | NAFDAC registration for resale |\n| Hair and beauty | Sea or air | NAFDAC registration; no skin-lightening creams |\n\nFor product-specific detail, see our guides to [hair and beauty stock](/blog/shipping-hair-and-beauty-products-to-nigeria) and [electronics](/blog/shipping-electronics-to-nigeria-from-uk)." },
 { h: "Sea for volume, air for speed", body: "Most traders get the best result by **splitting** the order:\n\n- **Sea** carries the bulk: anything heavy, bulky or low value per kg. It is the cheapest way to move volume, but it needs booking by the end of October for Christmas.\n- **Air** carries what is valuable, light or urgent. It starts from **£5.50/kg plus a £20 handling fee per shipment**, and weekly Friday flights let you restock what sells out.\n\nBulky, light goods such as toys and decorations are charged by **volumetric weight** by air (length × width × height in cm ÷ 6,000), which is why they almost always belong on the ship. For large loads, see [bulk shipping](/blog/bulk-shipping-uk-to-nigeria) and [air vs sea freight](/blog/air-freight-vs-sea-freight-nigeria)." },
 { h: "Paperwork that keeps stock moving", body: "In December, customs queues are long and incomplete paperwork costs you selling days. Before your stock leaves the UK:\n\n1. **Commercial invoice.** Every product line, quantity and value, matching your purchase receipts.\n2. **Packing list.** Which carton holds what, numbered \"1 of 20\", \"2 of 20\" and so on.\n3. **NAFDAC registration** for food, drinks, cosmetics and toiletries sold to the public.\n4. **SON approval** (SONCAP) for regulated products such as many electricals.\n5. **Genuine brands only.** Counterfeit branded goods are seized, and the busy season is when inspections are tightest.\n\n> Under-declaring values to save duty is the fastest way to get a shipment held. Declare accurately and budget for duty; our [customs duty guide](/blog/nigeria-customs-duty-guide) explains how it is calculated." },
 { h: "Packing retail stock", body: "- **Keep items in retail packaging.** Damaged packaging lowers the sale price.\n- **One product per carton** where you can, labelled on two sides with the product and quantity.\n- **Use new double-walled cartons** and fill empty space so stock does not move.\n- **Seal clothing and fabric in plastic** inside the carton to keep out humidity on the sea voyage.\n- **Insure high-value consignments.** See [marine cargo insurance](/blog/marine-cargo-insurance-uk-to-nigeria)." },
 { h: "Delivery to your shop or market", body: "We deliver to business and market addresses across Nigeria, from **Balogun and Trade Fair** in Lagos to **Onitsha, Aba and Kano**. Give the plaza or shop name, line or stall number and a phone number for whoever is receiving. Every shipment has [live tracking](/track) so you can tell customers when stock lands.\n\nMore on running a UK to Nigeria trading business: [import and export business guide](/blog/uk-to-nigeria-import-export-business-guide)." },
 { h: "Plan your Christmas stock with R-Zone", body: "Tell us what you are shipping, roughly how much and where it is going, and we will build a sea and air plan around the festive cut-offs, with collection anywhere in England or drop-off at our Upminster warehouse.\n\n[Get a business quote](/quote), or: " + CALL },
 ],
 },
];
