import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchPosts } from '../lib/blog';

export const metadata: Metadata = {
  title: 'Painting Blog | Tips, Costs & Advice — Norm Painting',
  description: 'Expert painting advice, cost guides, and tips for Melbourne homeowners. Interior, exterior, and commercial painting insights from Norm Painting.',
};

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await fetchPosts();

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
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            Painting Tips & Advice
          </span>
          <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
            The Norm Painting
            <br />
            <span className="text-[#f97316]">Blog</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/65 sm:text-lg">
            Expert painting advice, cost guides, colour tips, and industry insights from Melbourne&apos;s trusted painting team.
          </p>
        </div>
      </section>

      {/* Posts Grid */}
      <section className="px-5 py-16 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          {posts.length === 0 ? (
            <p className="text-center text-gray-400">No posts yet.</p>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="h-52 overflow-hidden bg-gray-100">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#0c1f3d]/10">
                        <svg className="h-12 w-12 text-gray-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">
                      {post.date}
                    </span>
                    <h2 className="mt-2 text-lg font-black leading-snug text-[#111827] transition group-hover:text-[#1e3a8a]">
                      {post.title}
                    </h2>
                    <p className="mt-3 flex-1 text-sm leading-6 text-gray-500">
                      {post.excerpt}
                    </p>
                    <div className="mt-5 flex items-center gap-1.5 text-sm font-bold text-[#1e3a8a]">
                      Read article
                      <svg className="h-4 w-4 transition group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#f8fafc] px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black tracking-tight text-[#111827] sm:text-4xl">
            Ready to Start Your Project?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-gray-500">
            Get a free, no-obligation quote from Melbourne&apos;s trusted painting team.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]">
              Get Free Quote
            </Link>
            <Link href="/contact-us" className="inline-flex min-h-11 items-center justify-center rounded-full border-2 border-gray-200 px-8 text-sm font-bold text-gray-700 transition hover:border-[#1e3a8a] hover:text-[#1e3a8a]">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
