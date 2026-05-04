const TESTIMONIALS = [
  {
    id: 1,
    name: 'Sarah Mitchell',
    location: 'Highton, Geelong',
    rating: 5,
    text: 'Norm Painting did a stunning job on our full exterior repaint. The team was punctual, tidy, and the finish exceeded our expectations. Will absolutely use them again.',
    project: 'Full Exterior Repaint',
    avatar: 'SM',
    color: 'bg-[#1e3a8a]',
  },
  {
    id: 2,
    name: 'James Kowalski',
    location: 'Yarraville, Melbourne',
    rating: 5,
    text: 'We had our entire home interior painted — walls, ceilings, trims, the lot. Exceptional preparation and the colours came out exactly right. Truly professional.',
    project: 'Full Interior Painting',
    avatar: 'JK',
    color: 'bg-[#0c1f3d]',
  },
  {
    id: 3,
    name: 'Linda Okafor',
    location: 'Newtown, Geelong',
    rating: 5,
    text: 'Colour consultation made choosing so easy. The team listened, gave great advice, and the finished result transformed our lounge completely. Highly recommend!',
    project: 'Interior & Colour Consultation',
    avatar: 'LO',
    color: 'bg-[#0f766e]',
  },
  {
    id: 4,
    name: 'Tom Buchanan',
    location: 'Docklands, Melbourne',
    rating: 5,
    text: 'We needed our retail space painted over a weekend to minimise disruption. They delivered impeccable commercial results on time and on budget. Outstanding service.',
    project: 'Commercial Retail Fit-Out',
    avatar: 'TB',
    color: 'bg-[#7c3aed]',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center">
          <span className="section-kicker mx-auto">Client Reviews</span>
          <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
            What Our Clients Say
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-gray-500">
            We&apos;re proud of the relationships we build and the results we deliver on every project.
          </p>
          {/* Star rating summary */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm">
            <div className="flex gap-0.5 text-[#f97316]">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-lg">★</span>
              ))}
            </div>
            <span className="text-sm font-bold text-[#111827]">5.0</span>
            <span className="text-sm text-gray-400">from 120+ reviews</span>
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TESTIMONIALS.map((t) => (
            <article
              key={t.id}
              className="flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5 text-[#f97316]">
                {[...Array(t.rating)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p className="mt-4 flex-1 text-sm leading-6 text-gray-600">
                &ldquo;{t.text}&rdquo;
              </p>

              {/* Project tag */}
              <span className="mt-4 inline-flex self-start rounded-full bg-[#f8fafc] px-3 py-1 text-xs font-semibold text-[#1e3a8a]">
                {t.project}
              </span>

              {/* Client */}
              <div className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-5">
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-black text-white ${t.color}`}>
                  {t.avatar}
                </span>
                <div>
                  <p className="text-sm font-black text-[#111827]">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.location}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Google CTA */}
        <div className="mt-10 text-center">
          <a
            href="https://g.page/r/normpainting/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#1e3a8a] transition hover:text-[#1d4ed8]"
          >
            See all reviews on Google
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
