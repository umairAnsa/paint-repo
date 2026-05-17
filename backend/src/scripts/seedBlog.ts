import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import BlogPost from '../models/BlogPost';

const PUBLIC_BLOG_DIR = path.join(__dirname, '..', '..', '..', 'public', 'blog');

async function downloadImage(url: string): Promise<string> {
  if (!url) return '';
  const filename = url.split('/').pop()!;
  const dest = path.join(PUBLIC_BLOG_DIR, filename);

  if (fs.existsSync(dest)) {
    console.log(`  ↩  Already exists: ${filename}`);
    return `/blog/${filename}`;
  }

  console.log(`  ↓  Downloading: ${filename}`);
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; NormPainting/1.0)' },
    });
    if (!res.ok) { console.warn(`  ✗  HTTP ${res.status} — keeping original URL`); return url; }
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(dest, buf);
    console.log(`  ✓  Saved: ${filename}`);
    return `/blog/${filename}`;
  } catch {
    console.warn(`  ✗  Download failed — keeping original URL`);
    return url;
  }
}

const SEED_POSTS = [
  {
    slug: 'painters-surrey-hills-you-can-rely-on-for-lasting-results',
    title: 'Painters Surrey Hills You Can Rely On for Lasting Results',
    date: 'January 2026',
    excerpt: 'Finding reliable painters in Surrey Hills can feel overwhelming. Learn how to identify quality painters and what to expect from a professional job.',
    image: 'https://normpainting.com/wp-content/uploads/2026/01/Painters-Surrey-Hills.webp',
    content: [
      { type: 'p', text: 'Finding reliable painters Surrey Hills can feel overwhelming. Many local homeowners and business owners worry about uneven finishes, unclear pricing, delays, or paint that starts peeling after a few seasons. Norm Painting addresses these concerns with a transparent process, premium materials, and durable results.' },
      { type: 'h2', text: 'Why Surrey Hills Homes Need a Different Painting Approach' },
      { type: 'p', text: 'Surrey Hills contains diverse architectural styles — Californian bungalows, weatherboard cottages, brick veneer homes, and contemporary townhouses. Each material responds differently to environmental factors.' },
      { type: 'ul', items: ['Paint blistering on weatherboard surfaces from trapped moisture', 'Cracking and flaking on older plaster walls', 'Colour fading from UV exposure', 'Inconsistent finishes from rushed workmanship'] },
      { type: 'h2', text: 'Interior and Exterior Painting That Fits Your Schedule' },
      { type: 'p', text: 'Our interior services include wall repainting, ceilings, trims, feature walls, and low-VOC coatings. Exterior work covers fascia boards, fences, and full façade repainting using UV-stable and moisture-resistant products suited to Surrey Hills conditions.' },
      { type: 'h2', text: 'Clear Pricing and Online Estimates' },
      { type: 'p', text: 'Norm Painting provides transparent online estimates detailing labour, materials, preparation, and cleanup — no hidden extras.' },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'How much do painters charge per hour in Australia?', answer: 'Most painters charge between $35 and $60 per hour, depending on skill level and job complexity.' },
      { type: 'faq', question: 'How much does it cost to paint a four-room home?', answer: 'Interior painting for four rooms typically ranges from $2,500 to $5,000.' },
    ],
  },
  {
    slug: 'exterior-wood-painting-for-stronger-longer-lasting-timber',
    title: 'Exterior Wood Painting for Stronger, Longer-Lasting Timber',
    date: 'November 2025',
    excerpt: 'Exterior wood painting is critical for durability and weather resistance. Discover professional techniques that keep Melbourne timber looking great for years.',
    image: 'https://normpainting.com/wp-content/uploads/2025/10/painting-company-in-melbourne.jpg',
    content: [
      { type: 'p', text: "Exterior wood painting plays a crucial role in durability, weather resistance, and the overall appearance of your home. For Melbourne's variable climate, the right preparation and product selection make the difference between paint that lasts a decade and paint that peels within months." },
      { type: 'h2', text: 'How Exterior Wood Gets a Hard-Wearing Finish' },
      { type: 'ul', items: ['Protecting surrounding areas with drop sheets and masking tape', 'Removing flaking paint using scrapers and sanders', 'Sanding with 120 grit timber sandpaper for smoothness', 'Power washing and cleaning all surfaces', 'Treating mould and rot before coating', 'Repairing cracks with exterior wood-filler or caulk', 'Applying primer before topcoats'] },
      { type: 'h2', text: 'Common Problems With Exterior Timber Painting' },
      { type: 'ul', items: ['Peeling or cracking paint — results from skipped preparation', 'Moisture absorption — untreated timber warps without proper sealing', 'UV and salt exposure — coastal homes need UV-resistant coatings', 'Incorrect product selection — using indoor paints outdoors fails quickly'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'How long does exterior wood painting last?', answer: 'A well-prepared and properly coated timber surface typically lasts 5–10 years, depending on weather exposure, maintenance, and paint quality.' },
      { type: 'faq', question: 'Do I need to sand wood before painting?', answer: 'Yes — sanding ensures proper paint adhesion and removes old coatings. Skipping this step is the most common cause of early paint failure.' },
    ],
  },
  {
    slug: 'professional-painters-in-eastern-suburbs-for-every-project',
    title: 'Professional Painters in Eastern Suburbs for Every Project',
    date: 'November 2025',
    excerpt: "Melbourne's eastern suburbs homes need painters who understand local architecture and materials. Here's what consistent, reliable service looks like.",
    image: 'https://normpainting.com/wp-content/uploads/2025/09/exterior-painting-melbourne.jpg',
    content: [
      { type: 'p', text: "Property owners in Melbourne's eastern suburbs are looking for painting contractors who deliver consistent workmanship, stick to timelines, and communicate clearly throughout the project." },
      { type: 'h2', text: 'Services for Homes, Businesses, and Industrial Sites' },
      { type: 'ul', items: ['Full interior repaints — walls, ceilings, trims, doors, and feature walls', 'Exterior repaints — weatherboards, brick, render, fascia boards, and fences', 'Commercial painting — offices, retail spaces, warehouses, and medical facilities'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'How long does a typical painting project take?', answer: 'Most residential repaints take several days to one week depending on property size and preparation scope.' },
      { type: 'faq', question: 'How often should I repaint my home exterior?', answer: 'Every 7–10 years is the general recommendation, though weatherboard homes may need attention every 5–7 years.' },
    ],
  },
  {
    slug: 'trusted-painter-yarraville-for-homes-and-commercial-property',
    title: 'Trusted Painter Yarraville for Homes and Commercial Property',
    date: 'November 2025',
    excerpt: "Yarraville's mix of heritage homes and modern properties demands painters who understand both. Find out what makes a trustworthy local painting company.",
    image: 'https://normpainting.com/wp-content/uploads/2025/11/painter-yarraville.jpg',
    content: [
      { type: 'p', text: "Finding a reliable painter in Yarraville who delivers consistent workmanship can feel challenging. Norm Painting takes a methodical approach — proper preparation, quality materials, and clear communication at every stage." },
      { type: 'h2', text: 'A Complete Painting Service for Every Yarraville Property' },
      { type: 'ul', items: ['Interior painting — walls, ceilings, trims, doors, and feature walls', 'Exterior painting — full façades, weatherboards, rendered surfaces', 'Commercial projects — shops, offices, warehouses, and schools', 'Heritage colour matching for period properties'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'How much does interior painting cost in Yarraville?', answer: 'Typical projects range from $3,000–$8,000 for a standard 3–4 bedroom home.' },
      { type: 'faq', question: 'Do you provide weather-resistant coatings?', answer: "All exterior products we use are rated for Melbourne's climate, with UV resistance and moisture protection built in." },
    ],
  },
  {
    slug: 'budget-vs-premium-paint-jobs-what-impacts-the-cost-what-you-get',
    title: 'Budget vs Premium Paint Jobs: What Impacts the Cost and What You Get',
    date: 'October 2025',
    excerpt: 'Choosing between budget and premium painting services? Understand the real differences in materials, preparation, and long-term value before you decide.',
    image: 'https://normpainting.com/wp-content/uploads/2025/10/painting-company-in-melbourne.jpg',
    content: [
      { type: 'p', text: "When planning a painting project, cost is usually the first consideration. But the gap between budget and premium painting services isn't just about price — it's about what you get for your money and how long that finish will last." },
      { type: 'h2', text: 'What Budget Paint Jobs Typically Include' },
      { type: 'ul', items: ['Lower-grade paints with reduced coverage and durability', 'Minimal surface preparation — skipping sanding, priming, or filling', 'Faster turnaround at the expense of finish quality', 'Limited or no workmanship warranty'] },
      { type: 'h2', text: 'Why Premium Paint Jobs Deliver Quality and Longevity' },
      { type: 'ul', items: ['Top-grade paints with superior coverage, fade resistance, and adhesion', 'Thorough surface preparation — cleaning, sanding, filling, and priming', 'Multi-year workmanship warranties', 'Detailed colour consultation and transparent, itemised pricing'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'Is premium paint always worth the extra cost?', answer: 'For long-term owner-occupiers, yes. The additional cost is typically recovered within 5–7 years through reduced maintenance.' },
    ],
  },
  {
    slug: 'weatherproofing-exterior-paint-in-victoria',
    title: "Weatherproofing Exterior Paint in Victoria: What Paints Survive Melbourne's Climate Best",
    date: 'September 2025',
    excerpt: "Melbourne's unpredictable climate demands specialised exterior paint. Learn which products and techniques provide the best protection for Victorian homes.",
    image: 'https://normpainting.com/wp-content/uploads/2025/09/exterior-painting-melbourne.jpg',
    content: [
      { type: 'p', text: "Melbourne's weather is notoriously unpredictable — intense UV in summer, cold wet winters, and temperature swings of 20°C+ within a single day. Exterior paint must flex with temperature changes, resist moisture, and maintain colour stability under prolonged UV exposure." },
      { type: 'h2', text: 'For Melbourne Conditions, You Need Paint With:' },
      { type: 'ul', items: ['High UV resistance to prevent colour fading and chalking', 'Moisture resistance and waterproofing properties', 'Flexibility to expand and contract with temperature changes', 'Anti-fungal and mould-resistant formulations'] },
      { type: 'h2', text: 'Extending the Life of Your Exterior Paintwork' },
      { type: 'ul', items: ['Clean exterior walls annually to remove dirt and mould spores', 'Address any cracks or peeling immediately before moisture penetrates', 'Repaint when you first notice chalking or colour fading'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: "What's the best waterproofing paint for exterior walls?", answer: 'Dulux Weathershield and Taubmans Allweather are both excellent options rated for Australian conditions.' },
      { type: 'faq', question: 'How much does exterior painting cost in Melbourne?', answer: 'Most Melbourne homes cost between $4,000–$12,000 for a full exterior repaint, depending on size and preparation required.' },
    ],
  },
  {
    slug: 'how-to-choose-the-right-paint-colour-for-your-melbourne-home',
    title: 'How to Choose the Right Paint Colour for Your Melbourne Home',
    date: 'September 2025',
    excerpt: "Choosing paint colours for your Melbourne home is about more than aesthetics. Light, climate, and architecture all play a role. Here's how to get it right.",
    image: 'https://normpainting.com/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-05-at-19.05.18_e6fd22a5.jpg',
    content: [
      { type: 'p', text: "Choosing paint colours for your Melbourne home is one of the most impactful decisions in any renovation project. The right colour scheme improves comfort, enhances architectural character, and adds real value at sale." },
      { type: 'h2', text: 'Colour Choices That Work Inside Your Home' },
      { type: 'ul', items: ['Living areas — neutral tones (warm whites, soft greys, pale taupes)', 'Bedrooms — cooler shades like soft blues and sage greens promote relaxation', 'Kitchens — lighter yellows, whites, and warm creams feel fresh and welcoming', 'Bathrooms — pale blues and soft greens; avoid very dark tones in small spaces'] },
      { type: 'h2', text: 'Selecting Colours That Last Outdoors' },
      { type: 'ul', items: ['Consider the roof colour — your exterior palette must harmonise with it', 'Lighter colours reflect heat and reduce UV fading', 'Classic whites, greys, and earthy neutrals have proven longevity'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'What are the most popular exterior colours in Melbourne?', answer: "Warm whites, charcoal greys, and earthy tones (sage, terracotta, warm beige) are consistently popular." },
    ],
  },
  {
    slug: 'how-much-does-it-cost-to-paint-interior-of-house',
    title: 'How Much Does It Cost to Paint the Interior of a House?',
    date: 'September 2025',
    excerpt: 'Interior painting costs vary widely. Get accurate Melbourne price ranges, understand what drives the cost, and know what to ask before getting a quote.',
    image: 'https://normpainting.com/wp-content/uploads/2025/08/How-Much-Does-It-Cost-to-Paint-Interior-of-House.jpg',
    content: [
      { type: 'p', text: 'Interior painting is one of the most effective ways to refresh and add value to your home. Melbourne professional painters typically charge $15–$45 per square metre for standard interior painting including preparation and two paint coats.' },
      { type: 'h2', text: 'Average Interior Painting Costs in Melbourne' },
      { type: 'ul', items: ['3-bedroom house: $4,500–$7,500', '4-bedroom house: $6,000–$10,000', '1,500 sq ft home: $5,000–$8,000', 'Single room refresh: $600–$1,500'] },
      { type: 'h2', text: 'What Affects the Cost?' },
      { type: 'ul', items: ['Preparation work — filling holes, repairing cracks, sanding, and priming', 'Square metre coverage — room size and ceiling height', 'Paint quality — premium paints cost more but provide better longevity', 'Number of colours — multiple colours require more setup time'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'How long does interior painting take?', answer: 'A standard 3–4 bedroom home typically takes 3–5 days with a professional team of two painters.' },
      { type: 'faq', question: 'What paint sheen should I use for different rooms?', answer: 'Low sheen or flat for ceilings and bedrooms; satin for living areas; semi-gloss or gloss for bathrooms, kitchens, and trims.' },
    ],
  },
  {
    slug: 'interior-exterior-house-painters-melbourne',
    title: 'Interior & Exterior House Painters Melbourne',
    date: 'August 2025',
    excerpt: "From weatherboard restorations to full exterior repaints, Melbourne homeowners trust Norm Painting for quality results inside and out.",
    image: 'https://normpainting.com/wp-content/uploads/2025/09/exterior-painting-melbourne.jpg',
    content: [
      { type: 'p', text: "Norm Painting has been one of Melbourne's trusted painting companies for over a decade, delivering premium interior and exterior results for homes and businesses across the city. With more than 500 completed projects and a 7-year workmanship warranty, our reputation is built on quality that lasts." },
      { type: 'h2', text: 'Exterior Painting Melbourne' },
      { type: 'ul', items: ['Full exterior repaints — all surfaces from eaves to foundation', 'Weatherboard restoration — surface preparation, timber repairs, and fresh finish', 'Brick and render painting — masonry primers and topcoats', 'Wood rot repairs — carpentry team handles rot removal and replacement', 'Deck and pergola restoration'] },
      { type: 'h2', text: 'Interior Painting Melbourne' },
      { type: 'ul', items: ['Full interior repaints — walls, ceilings, doors, and trims', 'Feature walls — custom colours, textures, and two-tone treatments', 'Timber staining — doors, floors, and architectural joinery', 'Plaster repairs — cracks, holes, and water damage'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'What paint brands do you use?', answer: 'We exclusively use Dulux and Taubmans professional-grade products — the two leading paint brands in Australia.' },
      { type: 'faq', question: 'Do you offer a warranty?', answer: 'Yes — all Norm Painting work is backed by a 7-year workmanship warranty.' },
    ],
  },
  {
    slug: 'bathroom-renovations-south-melbourne',
    title: 'Bathroom Renovations South Melbourne — Designed by Experts, Built to Last',
    date: 'July 2025',
    excerpt: 'Bathroom renovations in South Melbourne done right — mould-resistant paints, waterproofing, and expert craftsmanship for spaces built to last.',
    image: 'https://normpainting.com/wp-content/uploads/2025/10/painting-company-in-melbourne.jpg',
    content: [
      { type: 'p', text: 'Bathroom renovations in South Melbourne require a specialist approach. The combination of moisture, temperature fluctuations, and continuous cleaning demands materials and techniques specifically designed for wet environments.' },
      { type: 'h2', text: 'What Sets Norm Painting Apart for Bathroom Renovations' },
      { type: 'ul', items: ['Free initial consultation', 'Low-VOC, mould-resistant paint — essential for bathroom longevity', 'Seamless project management', 'After-hours availability'] },
      { type: 'h2', text: 'Transparent Pricing' },
      { type: 'ul', items: ['Refresh (paint only, new fixtures): $4,000–$5,000', 'Mid-range renovation: $10,000–$12,000', 'Luxury full-scale renovation: $14,000–$20,000+'] },
      { type: 'h2', text: 'Frequently Asked Questions' },
      { type: 'faq', question: 'How long does a bathroom renovation take?', answer: 'Most bathroom renovations take 3–6 weeks. A paint-only refresh can be completed in 2–3 days.' },
      { type: 'faq', question: 'What paint do you recommend for bathrooms?', answer: 'Dulux Aquanamel is our preferred bathroom product for its hardness and moisture resistance.' },
    ],
  },
];

async function main() {
  const uri = process.env.MONGO_URI;
  if (!uri) { console.error('MONGO_URI not set in .env'); process.exit(1); }

  console.log('Connecting to MongoDB…');
  await mongoose.connect(uri);
  console.log('Connected.\n');

  if (!fs.existsSync(PUBLIC_BLOG_DIR)) {
    fs.mkdirSync(PUBLIC_BLOG_DIR, { recursive: true });
  }

  for (const post of SEED_POSTS) {
    const exists = await BlogPost.exists({ slug: post.slug });
    if (exists) {
      console.log(`⏭  Skip (already in DB): ${post.slug}`);
      continue;
    }

    console.log(`\n📝 Seeding: ${post.title}`);
    const localImage = await downloadImage(post.image);

    await BlogPost.create({ ...post, image: localImage, published: true });
    console.log(`  ✅ Inserted to DB with image: ${localImage}`);
  }

  console.log('\n✅ Seed complete.');
  await mongoose.disconnect();
}

main().catch(err => { console.error(err); process.exit(1); });
