import Image from 'next/image';
import Link from 'next/link';

const PROJECTS = [
  {
    id: 1,
    title: 'Highton Residence — Full Exterior',
    category: 'Residential',
    location: 'Highton, Geelong',
    image: '/projects/project-01.jpg',
  },
  {
    id: 2,
    title: 'Newtown Heritage Home — Repaint',
    category: 'Residential',
    location: 'Newtown, Geelong',
    image: '/projects/project-11.jpg',
  },
  {
    id: 3,
    title: 'Malop Street Office — Interior',
    category: 'Commercial',
    location: 'Geelong CBD',
    image: '/projects/project-27.jpg',
  },
  {
    id: 4,
    title: 'Yarraville Terrace — Feature Walls',
    category: 'Residential',
    location: 'Yarraville, Melbourne',
    image: '/projects/project-28.jpg',
  },
  {
    id: 5,
    title: 'Torquay Beach House — Weatherboard',
    category: 'Residential',
    location: 'Torquay, VIC',
    image: '/projects/project-29.jpg',
  },
  {
    id: 6,
    title: 'Docklands Retail Fit-Out',
    category: 'Commercial',
    location: 'Docklands, Melbourne',
    image: '/projects/project-30.jpg',
  },
];

export default function ProjectsShowcase() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <span className="section-kicker">Our Work</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              Featured Projects
            </h2>
            <p className="mt-4 max-w-xl text-base text-gray-500">
              A selection of residential and commercial painting projects across Geelong, Melbourne, and surrounding areas.
            </p>
          </div>
          <Link
            href="/projects"
            className="shrink-0 inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-[#1e3a8a] px-6 text-sm font-bold text-[#1e3a8a] transition hover:bg-[#1e3a8a] hover:text-white"
          >
            All Projects
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="group relative overflow-hidden rounded-2xl bg-gray-100"
            >
              <div className="relative h-64 overflow-hidden sm:h-72">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-t from-[#061524]/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>

              {/* Info */}
              <div className="absolute inset-x-0 bottom-0 translate-y-full p-5 transition-transform duration-300 group-hover:translate-y-0">
                <span className="inline-flex items-center rounded-full bg-[#f97316]/90 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">
                  {project.category}
                </span>
                <h3 className="mt-2 text-base font-black text-white">{project.title}</h3>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-white/70">
                  <svg className="h-3.5 w-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z" />
                    <circle cx="12" cy="10" fill="white" r="2.5" />
                  </svg>
                  {project.location}
                </p>
              </div>

              {/* Category pill (always visible) */}
              <div className="absolute left-4 top-4 group-hover:opacity-0 transition-opacity">
                <span className="inline-flex items-center rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#0c1f3d] backdrop-blur-sm">
                  {project.category}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
