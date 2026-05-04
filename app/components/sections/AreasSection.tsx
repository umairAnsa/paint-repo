const AREAS = [
  'Geelong', 'Melbourne', 'Highton', 'Newtown', 'Belmont', 'Grovedale',
  'Torquay', 'Ocean Grove', 'Lara', 'Corio', 'Norlane', 'North Geelong',
  'Geelong West', 'Manifold Heights', 'Armstrong Creek', 'Drysdale',
  'Queenscliff', 'Yarraville', 'Seddon', 'Williamstown', 'Newport',
  'Docklands', 'Braybrook', 'Kingsville', 'West Footscray',
];

export default function AreasSection() {
  return (
    <section className="bg-white px-5 py-20 sm:px-8 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-14 lg:grid-cols-[1fr_1.6fr]">

          {/* Left: Text */}
          <div>
            <span className="section-kicker">Service Regions</span>
            <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-[#111827] sm:text-5xl">
              We Serve Geelong &amp; Melbourne
            </h2>
            <p className="mt-5 text-base leading-7 text-gray-500">
              We provide premium residential and commercial painting across
              Geelong, Melbourne, and all surrounding suburbs within a 60km
              radius — with the same high standard and friendly service
              wherever you are.
            </p>
            <div className="mt-8 flex flex-col gap-4">
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#1e3a8a]/8 text-[#1e3a8a]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-black text-[#111827]">Geelong Region</p>
                  <p className="text-xs text-gray-500">All Geelong suburbs, Surf Coast, and Bellarine Peninsula</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-xl border border-gray-100 p-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f97316]/8 text-[#f97316]">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </span>
                <div>
                  <p className="text-sm font-black text-[#111827]">Melbourne Inner West & CBD</p>
                  <p className="text-xs text-gray-500">Yarraville, Williamstown, Docklands, Newport, Seddon and more</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Tag cloud */}
          <div>
            <div className="flex flex-wrap gap-2.5">
              {AREAS.map((area) => (
                <span
                  key={area}
                  className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#f8fafc] px-4 py-2 text-sm font-semibold text-gray-700 transition hover:border-[#f97316]/30 hover:text-[#f97316]"
                >
                  <svg className="h-3.5 w-3.5 text-[#f97316]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 22s7-5.8 7-12a7 7 0 1 0-14 0c0 6.2 7 12 7 12Z" />
                    <circle cx="12" cy="10" fill="white" r="2.5" />
                  </svg>
                  {area}
                </span>
              ))}
            </div>
            <p className="mt-6 text-sm text-gray-400">
              Don&apos;t see your suburb? Call us — we likely cover it within our service area.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
