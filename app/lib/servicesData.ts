export interface ServiceData {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  accent: string;
  metaDescription: string;
}

export const servicesData: Record<string, ServiceData> = {
  'garage-epoxy': {
    slug: 'garage-epoxy',
    title: 'Garage Epoxy Coating',
    tagline: 'Turn your garage floor into a showroom finish.',
    description:
      'Epoxy coating transforms dull, stained concrete garage floors into hard-wearing, high-gloss surfaces that are easy to clean and built to last. Our team prepares the surface by diamond grinding, filling cracks, and applying a professional-grade epoxy system that bonds permanently to the concrete.',
    features: [
      'Diamond grinding surface preparation',
      'Crack and spall repair before coating',
      'High-gloss or satin finish options',
      'Slip-resistant aggregate available',
      'Chemical, oil, and stain resistant',
      'Available in custom colours and flake finishes',
    ],
    image: '/projects/project-11.jpg',
    accent: '#1e3a8a',
    metaDescription:
      'Professional garage epoxy coating in Geelong & Melbourne. Durable, high-gloss floor coatings with full surface prep — by Norm Painting.',
  },
  'roller-application': {
    slug: 'roller-application',
    title: 'Roller Application',
    tagline: 'Smooth, even coats. Every time.',
    description:
      'Roller application is the preferred method for large wall and ceiling areas, delivering a consistent, even finish that brush marks cannot match. Our painters use premium roller covers and top-quality paints to achieve flawless results on interior and exterior surfaces.',
    features: [
      'Premium lint-free roller covers',
      'Uniform coverage on large surfaces',
      'Suitable for walls, ceilings, and facades',
      'Minimal overspray — ideal for occupied spaces',
      'Fast application with excellent results',
      'Available with multiple coats for lasting finish',
    ],
    image: '/projects/project-05.jpg',
    accent: '#0f766e',
    metaDescription:
      'Professional roller application painting in Geelong & Melbourne. Smooth, even coats for interiors and exteriors — by Norm Painting.',
  },
  'repairs': {
    slug: 'repairs',
    title: 'Surface Repairs',
    tagline: 'Flawless walls start with proper preparation.',
    description:
      'Cracks, holes, water damage, and uneven surfaces ruin an otherwise perfect paint job. We assess and repair all surface defects before a brush touches the wall — filling, sanding, and priming until every surface is paint-ready. The result is a finish that looks truly professional.',
    features: [
      'Crack filling and patching on plaster & render',
      'Water damage and mould remediation',
      'Cornice and ceiling crack repairs',
      'Sanding and feathering for seamless results',
      'Skim coating for heavily damaged walls',
      'Priming after repairs for colour consistency',
    ],
    image: '/projects/project-16.jpg',
    accent: '#b45309',
    metaDescription:
      'Professional surface repair and preparation in Geelong & Melbourne. Crack filling, patching, and skim coating before painting — by Norm Painting.',
  },
  'maintenance': {
    slug: 'maintenance',
    title: 'Maintenance Painting',
    tagline: 'Keep your property protected year after year.',
    description:
      'Regular maintenance painting protects your property from weathering, moisture damage, and wear. We offer scheduled maintenance programmes for residential and commercial clients — keeping your paintwork fresh, your surfaces protected, and your property value high without the cost of a full repaint.',
    features: [
      'Scheduled annual or biannual maintenance visits',
      'Touch-up and spot repainting of worn areas',
      'Gutter, fascia, and eave maintenance',
      'Preventative treatment for mould and rust',
      'Detailed condition reports with each visit',
      'Priority booking for existing clients',
    ],
    image: '/projects/project-20.jpg',
    accent: '#059669',
    metaDescription:
      'Maintenance painting programmes in Geelong & Melbourne. Protect your property value with scheduled painting upkeep — by Norm Painting.',
  },
  'fence-painting': {
    slug: 'fence-painting',
    title: 'Fence Painting',
    tagline: 'Restore, protect, and refresh your fences.',
    description:
      'Fences take a beating from the Australian sun, rain, and humidity. We strip old coatings, treat timber for mould and rot, and apply specially formulated outdoor paints and stains that bond to the surface and resist UV degradation. Whether it\'s a timber picket fence or a large colorbond boundary, we have you covered.',
    features: [
      'Timber, colorbond, and metal fences',
      'Stripping and sanding old coatings',
      'Anti-mould and rot treatment',
      'UV-stabilised outdoor paints and stains',
      'Pool fences and boundary fences',
      'Colour matching to existing property palette',
    ],
    image: '/projects/project-03.jpg',
    accent: '#7c3aed',
    metaDescription:
      'Professional fence painting in Geelong & Melbourne. Timber, colorbond, and metal fences stripped, treated, and coated — by Norm Painting.',
  },
  'roof-painting': {
    slug: 'roof-painting',
    title: 'Roof Painting',
    tagline: 'Restore your roof. Extend its life.',
    description:
      'A freshly painted roof dramatically improves curb appeal and adds years to the life of your tiles or metal sheeting. We clean, treat, and coat roofs with specialist roof paint systems — removing lichen, mould, and chalking before applying two coats of high-performance coating.',
    features: [
      'High-pressure cleaning and degreasing',
      'Lichen, moss, and mould treatment',
      'Tile sealer and primer application',
      'Two coats of roof-grade coating',
      'Terracotta, concrete tile, and metal roofs',
      'Heat-reflective coating options available',
    ],
    image: '/projects/project-08.jpg',
    accent: '#dc2626',
    metaDescription:
      'Professional roof painting in Geelong & Melbourne. Full clean, treatment, and two-coat application on tile and metal roofs — by Norm Painting.',
  },
  'wallpaper-removal': {
    slug: 'wallpaper-removal',
    title: 'Wallpaper Removal',
    tagline: 'Clean walls. Ready to paint.',
    description:
      'Old wallpaper can be difficult to remove without damaging the underlying plaster. Our team uses professional steam equipment and scoring tools to safely strip wallpaper — then repairs any surface damage before priming and painting, leaving your walls perfectly smooth and ready for a fresh finish.',
    features: [
      'Steam and chemical stripping methods',
      'Safe removal without wall damage',
      'Plaster repair after removal',
      'Skim coating for damaged surfaces',
      'Full clean-up and dust protection',
      'Ready-to-paint preparation included',
    ],
    image: '/projects/project-17.jpg',
    accent: '#d97706',
    metaDescription:
      'Professional wallpaper removal in Geelong & Melbourne. Steam stripping, surface repair, and paint preparation — by Norm Painting.',
  },
  'exterior-painting': {
    slug: 'exterior-painting',
    title: 'Exterior Painting',
    tagline: 'Built to outlast the Australian climate.',
    description:
      'Your home\'s exterior faces sun, wind, rain, and everything the Australian climate throws at it. We use weather-resistant, UV-stabilised coatings and thorough preparation — pressure washing, crack-filling, caulking, and spot-priming — to ensure a finish that protects your home and looks outstanding for years.',
    features: [
      'Weatherboard, brick, render, and Hardie plank',
      'Full pressure wash and surface preparation',
      'Caulking and crack repairs before painting',
      'UV and moisture-resistant premium coatings',
      'Fascias, soffits, eaves, and window trims',
      'Colour consultation service included',
    ],
    image: '/projects/project-06.jpg',
    accent: '#0f766e',
    metaDescription:
      'Professional exterior painting in Geelong & Melbourne. Weather-resistant coatings with full surface preparation — by Norm Painting.',
  },
  'commercial-painting': {
    slug: 'commercial-painting',
    title: 'Commercial Painting',
    tagline: 'Professional results with minimal disruption.',
    description:
      'We work with businesses, strata managers, and property developers to deliver high-quality commercial painting on schedule and within budget. Our team is experienced in painting offices, retail spaces, warehouses, and multi-storey buildings — working after hours or on weekends to minimise disruption to your operations.',
    features: [
      'Offices, retail, warehouses, and strata',
      'After-hours and weekend scheduling available',
      'Project management and detailed scope of works',
      'Compliant with OH&S requirements',
      'Line marking and epoxy flooring available',
      'Ongoing maintenance contracts for businesses',
    ],
    image: '/projects/project-34.jpg',
    accent: '#1e3a8a',
    metaDescription:
      'Commercial painting contractors in Geelong & Melbourne. Offices, retail, and strata painting with after-hours scheduling — by Norm Painting.',
  },
  'domestic-painting': {
    slug: 'domestic-painting',
    title: 'Domestic Painting',
    tagline: 'Your home. Our craftsmanship.',
    description:
      'We specialise in residential painting for homeowners across Geelong and Melbourne. Whether you\'re refreshing a single room, painting before a sale, or transforming your entire home inside and out, our team delivers premium results with careful preparation, clean work practices, and a finish you\'ll love.',
    features: [
      'Full interior and exterior house painting',
      'Pre-sale and new build painting',
      'Walls, ceilings, trims, and doors',
      'Furniture and floor protection included',
      'Low-VOC paints available for families',
      '7-year workmanship warranty on all work',
    ],
    image: '/projects/project-47.jpg',
    accent: '#f97316',
    metaDescription:
      'Domestic painting services in Geelong & Melbourne. Interior and exterior residential painting with a 7-year warranty — by Norm Painting.',
  },
  'heritage-work': {
    slug: 'heritage-work',
    title: 'Heritage Work',
    tagline: 'Preserving the character of period homes.',
    description:
      'Heritage and period properties require specialist knowledge, appropriate materials, and a careful approach that respects the original character of the building. We have extensive experience working on Victorian, Edwardian, and Californian Bungalow homes — using traditionally appropriate techniques and paints.',
    features: [
      'Victorian, Edwardian, and Bungalow homes',
      'Historically appropriate colour palettes',
      'Lead paint assessment and safe removal',
      'Detailed timber restoration and repainting',
      'Decorative feature work and lining',
      'Compliant with heritage overlay requirements',
    ],
    image: '/projects/project-30.jpg',
    accent: '#92400e',
    metaDescription:
      'Heritage painting specialists in Geelong & Melbourne. Period-appropriate techniques for Victorian, Edwardian, and heritage homes — by Norm Painting.',
  },
  'colour-consultation': {
    slug: 'colour-consultation',
    title: 'Colour Consultation',
    tagline: 'The right colours make all the difference.',
    description:
      'Choosing colours is one of the most important — and most daunting — parts of any painting project. Our experienced consultants visit your property, assess the light, architecture, and existing elements, and provide personalised colour recommendations that tie your space together beautifully.',
    features: [
      'On-site consultation at your property',
      'Interior and exterior colour schemes',
      'Consideration of light, architecture, and surrounds',
      'Colour board and sample provision',
      'Coordination with existing furniture and finishes',
      'Included free with all full painting projects',
    ],
    image: '/projects/project-24.jpg',
    accent: '#7c3aed',
    metaDescription:
      'Colour consultation service in Geelong & Melbourne. Expert colour selection for interior and exterior painting projects — by Norm Painting.',
  },
};
