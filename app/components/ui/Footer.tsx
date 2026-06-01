import Link from 'next/link';
import Image from 'next/image';

const SERVICES = [
  { label: 'Interior Painting', href: '/services#interior' },
  { label: 'Exterior Painting', href: '/services#exterior' },
  { label: 'Roof Painting', href: '/services#roof' },
  { label: 'Commercial Painting', href: '/services#commercial' },
  { label: 'Fence & Deck Painting', href: '/services#fence' },
  { label: 'Colour Consultation', href: '/services#consultation' },
];

const COMPANY = [
  { label: 'About Us', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact Us', href: '/contact-us' },
  { label: 'Get a Quote', href: '/estimate' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#061524] text-white">
      {/* Main content */}
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Image
              src="/logo.png"
              alt="Norm Painting"
              width={150}
              height={44}
              className="h-11 w-auto brightness-200"
            />
            <p className="mt-5 max-w-xs text-sm leading-7 text-white/50">
              Trusted house painters serving Geelong and Melbourne with
              premium finishes, genuine care, and lasting results since 2014.
            </p>
            <div className="mt-6 flex gap-3">
              <SocialLink href="https://www.facebook.com/people/Norm-Painting/61575177341430/" label="Facebook">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/paintersmelbourne/" label="Instagram">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect height="20" rx="5" ry="5" width="20" x="2" y="2" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </SocialLink>
              <SocialLink href="https://www.tiktok.com/@norm.painting" label="TikTok">
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z" />
                </svg>
              </SocialLink>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-[#f97316]">Services</h3>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <Link href={s.href} className="text-sm text-white/50 transition hover:text-white">
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-[#f97316]">Company</h3>
            <ul className="flex flex-col gap-3">
              {COMPANY.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/50 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-5 text-xs font-black uppercase tracking-widest text-[#f97316]">Get In Touch</h3>
            <ul className="flex flex-col gap-5">
              <li>
                <a href="tel:+61406342731" className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f97316]/10">
                    <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/40">Phone</span>
                    <span className="mt-1 block text-sm text-white/60 transition group-hover:text-white">+61 406 342 731</span>
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:info@normpainting.com" className="group flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f97316]/10">
                    <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/40">Email</span>
                    <span className="mt-1 block text-sm text-white/60 transition group-hover:text-white">info@normpainting.com</span>
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f97316]/10">
                    <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/40">Location</span>
                    <span className="mt-1 block text-sm text-white/60">Melbourne VIC, Australia</span>
                  </span>
                </div>
              </li>
              <li>
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#f97316]/10">
                    <svg className="h-4 w-4 text-[#f97316]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-wider text-white/40">Hours</span>
                    <span className="mt-1 block text-sm text-white/60">Mon–Fri: 7am – 5pm<br />Sat: 8am – 2pm</span>
                  </span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row sm:px-8">
          <p className="text-sm text-white/30">
            © {year} Norm Painting. All rights reserved. ABN: 84 673 345 054
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-white/30 transition hover:text-white/60">Privacy Policy</a>
            <a href="#" className="text-sm text-white/30 transition hover:text-white/60">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/45 transition hover:border-[#f97316] hover:text-[#f97316]"
    >
      {children}
    </a>
  );
}
