import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Browse Norm Painting\'s portfolio of completed residential and commercial painting projects across Geelong and Melbourne.',
};

const PROJECTS = [
  {
    id: 1,
    title: 'Highton Family Residence',
    category: 'Residential',
    type: 'Full Exterior Repaint',
    location: 'Highton, Geelong',
    year: '2024',
    description: 'Full exterior repaint of a double-storey weatherboard home. Included pressure washing, timber repair, spot priming, and two full coats of Dulux Weathershield.',
    image: '/projects/project-31.jpg',
  },
  {
    id: 2,
    title: 'Newtown Heritage Home',
    category: 'Residential',
    type: 'Interior & Exterior',
    location: 'Newtown, Geelong',
    year: '2024',
    description: 'Heritage-listed property requiring period-appropriate colour schemes and specialised preparation. Full interior and exterior painted over two weeks.',
    image: '/projects/project-33.jpg',
  },
  {
    id: 3,
    title: 'Malop Street Professional Office',
    category: 'Commercial',
    type: 'Interior Fit-Out',
    location: 'Geelong CBD',
    year: '2024',
    description: 'Two-storey commercial office space painted over a single weekend to minimise business disruption. Feature walls, reception, and meeting rooms completed.',
    image: '/projects/project-35.jpg',
  },
  {
    id: 4,
    title: 'Yarraville Terrace Home',
    category: 'Residential',
    type: 'Interior Painting',
    location: 'Yarraville, Melbourne',
    year: '2023',
    description: 'Complete interior transformation of a Victorian terrace. All rooms repainted including feature walls with Dulux designer colours and full trim painting.',
    image: '/projects/project-36.jpg',
  },
  {
    id: 5,
    title: 'Torquay Coastal Beach House',
    category: 'Residential',
    type: 'Exterior Repaint',
    location: 'Torquay, VIC',
    year: '2023',
    description: 'Coastal property exterior repaint using marine-grade coatings to withstand salt air and UV exposure. Weatherboard, eaves, fascias, and deck all completed.',
    image: '/projects/project-37.jpg',
  },
  {
    id: 6,
    title: 'Docklands Retail Tenancy',
    category: 'Commercial',
    type: 'Retail Fit-Out',
    location: 'Docklands, Melbourne',
    year: '2023',
    description: 'New retail tenancy painted to brand guidelines. Feature walls, ceiling, and service areas completed in 48 hours ahead of store opening.',
    image: '/projects/project-39.jpg',
  },
  {
    id: 7,
    title: 'Belmont New Build',
    category: 'Residential',
    type: 'New Build Interior',
    location: 'Belmont, Geelong',
    year: '2023',
    description: 'Full interior painting of a newly constructed four-bedroom home. All walls, ceilings, doors, and trims painted to builder\'s handover standard.',
    image: '/projects/project-41.jpg',
  },
  {
    id: 8,
    title: 'Ocean Grove Holiday Home',
    category: 'Residential',
    type: 'Full Repaint',
    location: 'Ocean Grove, VIC',
    year: '2022',
    description: 'Complete interior and exterior repaint of a holiday property. Refreshed colour scheme, full surface preparation, and fence and deck painting included.',
    image: '/projects/project-42.jpg',
  },
  {
    id: 9,
    title: 'Geelong Industrial Warehouse',
    category: 'Commercial',
    type: 'Industrial Painting',
    location: 'North Geelong',
    year: '2022',
    description: 'Large-scale industrial warehouse painted inside and out using heavy-duty coatings. Included floor marking, safety line painting, and all structural steelwork.',
    image: '/projects/project-45.jpg',
  },
];

const CATEGORIES = ['All', 'Residential', 'Commercial'];

export default function ProjectsPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c1f3d] px-5 pb-20 pt-36 sm:px-8 sm:pt-44 sm:pb-28">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            Our Portfolio
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            Projects That Speak
            <br />
            <span className="text-[#f97316]">for Themselves</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            A selection of our recent residential and commercial painting projects across Geelong, Melbourne, and the Surf Coast.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white px-5 py-10 sm:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-3 divide-x divide-gray-100 rounded-2xl border border-gray-100 shadow-sm">
            {[
              { value: '500+', label: 'Completed Projects' },
              { value: '10+', label: 'Years of Experience' },
              { value: '120+', label: 'Five-Star Reviews' },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-8 text-center">
                <p className="text-3xl font-black text-[#1e3a8a] sm:text-4xl">{s.value}</p>
                <p className="mt-1 text-sm text-gray-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="px-5 py-20 sm:px-8 sm:py-28">
        <div className="mx-auto max-w-7xl">
          {/* Category tabs hint */}
          <div className="mb-10 flex flex-wrap gap-2">
            {CATEGORIES.map((cat, i) => (
              <span
                key={cat}
                className={`inline-flex min-h-9 items-center rounded-full px-5 text-sm font-bold transition ${
                  i === 0
                    ? 'bg-[#1e3a8a] text-white'
                    : 'border border-gray-200 bg-white text-gray-600 hover:border-[#1e3a8a] hover:text-[#1e3a8a]'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECTS.map((project) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-black/8"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                  {/* Category badge */}
                  <div className="absolute left-4 top-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${
                      project.category === 'Commercial'
                        ? 'bg-[#0c1f3d]/85 text-white'
                        : 'bg-white/90 text-[#0c1f3d]'
                    } backdrop-blur-sm`}>
                      {project.category}
                    </span>
                  </div>
                  {/* Year badge */}
                  <div className="absolute right-4 top-4">
                    <span className="inline-flex items-center rounded-full bg-[#f97316]/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#f97316]">{project.type}</span>
                  <h3 className="mt-2 text-lg font-black text-[#111827]">{project.title}</h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                    <svg className="h-3.5 w-3.5 text-[#f97316]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z" />
                      <circle cx="12" cy="10" fill="white" r="2.5" />
                    </svg>
                    {project.location}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-gray-500 line-clamp-2">{project.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8fafc] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
            Want Results Like These?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-500">
            Get in touch for a free written quote and let us transform your property too.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/estimate"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#1e3a8a] px-8 text-sm font-bold text-white shadow-lg shadow-blue-900/20 transition hover:-translate-y-0.5 hover:bg-[#1d4ed8]"
            >
              Get Free Quote
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-gray-200 px-8 text-sm font-bold text-gray-700 transition hover:border-[#1e3a8a] hover:text-[#1e3a8a]"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
