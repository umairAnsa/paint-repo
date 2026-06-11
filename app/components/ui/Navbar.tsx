'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about-us' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Blog', href: '/blog' },
  { label: 'Cost Estimation', href: '/estimate' },
  { label: 'Contact', href: '/contact-us' },
];

const SERVICE_LINKS = [
  { label: 'Domestic Painting', href: '/domestic-painting' },
  { label: 'Exterior Painting', href: '/exterior-painting' },
  { label: 'Commercial Painting', href: '/commercial-painting' },
  { label: 'Roof Painting', href: '/roof-painting' },
  { label: 'Fence Painting', href: '/fence-painting' },
  { label: 'Garage Epoxy', href: '/garage-epoxy' },
  { label: 'Wallpaper Removal', href: '/wallpaper-removal' },
  { label: 'Heritage Work', href: '/heritage-work' },
  { label: 'Repairs', href: '/repairs' },
  { label: 'Maintenance', href: '/maintenance' },
  { label: 'Roller Application', href: '/roller-application' },
  { label: 'Colour Consultation', href: '/colour-consultation' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);
  const isServicesActive =
    isActive('/services') || SERVICE_LINKS.some((service) => isActive(service.href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#0c1f3d] shadow-2xl shadow-black/40'
          : 'bg-[#0c1f3d]/95 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        {/* Logo */}
        <Link href="/" className="shrink-0 flex items-center" aria-label="Norm Painting - Home">
          <Image
            src="/logo.png"
            alt="Norm Painting"
            width={150}
            height={44}
            className="h-11 w-auto object-contain brightness-200"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => {
            const active = link.href === '/services' ? isServicesActive : isActive(link.href);

            if (link.href === '/services') {
              return (
                <div key={link.href} className="relative">
                  <button
                    type="button"
                    onClick={() => setServicesOpen((v) => !v)}
                    onBlur={(e) => {
                      if (!e.currentTarget.parentElement?.contains(e.relatedTarget)) {
                        setServicesOpen(false);
                      }
                    }}
                    className={`relative flex items-center gap-1 rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                      active
                        ? 'text-[#f97316]'
                        : 'text-white/70 hover:text-white'
                    }`}
                    aria-expanded={servicesOpen}
                    aria-haspopup="menu"
                  >
                    {link.label}
                    <svg
                      className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                    {active && (
                      <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-[#f97316]" />
                    )}
                  </button>
                  {servicesOpen && (
                    <div
                      className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-white/10 bg-[#0c1f3d] py-2 shadow-2xl shadow-black/40"
                      role="menu"
                    >
                      <Link
                        href="/services"
                        onClick={() => setServicesOpen(false)}
                        className="block border-b border-white/10 px-4 py-3 text-sm font-bold text-white/80 transition hover:bg-white/5 hover:text-white"
                        role="menuitem"
                      >
                        All Services
                      </Link>
                      <div className="grid max-h-[12.5rem] overflow-y-auto py-1">
                        {SERVICE_LINKS.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => setServicesOpen(false)}
                            className={`px-4 py-2.5 text-sm font-semibold transition ${
                              isActive(service.href)
                                ? 'bg-white/10 text-[#f97316]'
                                : 'text-white/65 hover:bg-white/5 hover:text-white'
                            }`}
                            role="menuitem"
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setServicesOpen(false)}
                className={`relative rounded-lg px-3.5 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  active
                    ? 'text-[#f97316]'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full bg-[#f97316]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Right */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">
          <a
            href="tel:+61406342731"
            className="flex items-center gap-2 text-sm font-semibold text-white/60 transition hover:text-white"
          >
            <PhoneIcon />
            +61 406 342 731
          </a>
          <Link
            href="/contact-us"
            className="inline-flex min-h-10 items-center justify-center rounded-full bg-[#f97316] px-5 text-sm font-bold text-white shadow-lg shadow-orange-500/20 transition hover:-translate-y-0.5 hover:bg-[#ea6c07] hover:shadow-orange-500/35"
          >
            Free Quote
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-white md:hidden"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-[#0c1f3d] px-5 pb-7 md:hidden">
          <nav className="flex flex-col gap-1 pt-4" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => {
              const active = link.href === '/services' ? isServicesActive : isActive(link.href);

              if (link.href === '/services') {
                return (
                  <div key={link.href}>
                    <button
                      type="button"
                      onClick={() => setServicesOpen((v) => !v)}
                      className={`flex w-full items-center rounded-xl px-4 py-3.5 text-left text-sm font-semibold transition ${
                        active
                          ? 'bg-white/10 text-[#f97316]'
                          : 'text-white/70 hover:bg-white/5 hover:text-white'
                      }`}
                      aria-expanded={servicesOpen}
                    >
                      {link.label}
                      <svg
                        className={`ml-auto h-4 w-4 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {servicesOpen && (
                      <div className="mt-1 grid max-h-[15rem] gap-1 overflow-y-auto rounded-xl bg-white/[0.03] p-2">
                        <Link
                          href="/services"
                          onClick={() => {
                            setMenuOpen(false);
                            setServicesOpen(false);
                          }}
                          className="rounded-lg px-4 py-2.5 text-sm font-bold text-white/75 transition hover:bg-white/5 hover:text-white"
                        >
                          All Services
                        </Link>
                        {SERVICE_LINKS.map((service) => (
                          <Link
                            key={service.href}
                            href={service.href}
                            onClick={() => {
                              setMenuOpen(false);
                              setServicesOpen(false);
                            }}
                            className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                              isActive(service.href)
                                ? 'bg-white/10 text-[#f97316]'
                                : 'text-white/60 hover:bg-white/5 hover:text-white'
                            }`}
                          >
                            {service.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    setMenuOpen(false);
                    setServicesOpen(false);
                  }}
                  className={`flex items-center rounded-xl px-4 py-3.5 text-sm font-semibold transition ${
                    active
                      ? 'bg-white/10 text-[#f97316]'
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#f97316]" />
                  )}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4">
            <a
              href="tel:+61406342731"
              className="flex items-center justify-center gap-2 rounded-xl border border-white/15 py-3.5 text-sm font-semibold text-white/80 transition hover:border-white/30 hover:text-white"
            >
              <PhoneIcon />
              +61 406 342 731
            </a>
            <Link
              href="/contact-us"
              onClick={() => setMenuOpen(false)}
              className="flex min-h-11 items-center justify-center rounded-full bg-[#f97316] text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:bg-[#ea6c07]"
            >
              Get Free Quote
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

function PhoneIcon() {
  return (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.84a16 16 0 0 0 6 6l1.27-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}
