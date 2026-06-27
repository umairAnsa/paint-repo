import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchPost, fetchPosts, type ContentBlock } from '../../lib/blog';

export const revalidate = 60;

export async function generateStaticParams() {
  const posts = await fetchPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> }
): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) return {};
  return { title: `${post.title} | Norm Painting`, description: post.excerpt };
}

function renderBlock(block: ContentBlock, i: number) {
  switch (block.type) {
    case 'h2':
      return <h2 key={i} className="mt-10 text-2xl font-black leading-snug text-[#111827] sm:text-3xl">{block.text}</h2>;
    case 'h3':
      return <h3 key={i} className="mt-7 text-xl font-black text-[#111827]">{block.text}</h3>;
    case 'p':
      return <p key={i} className="mt-5 text-base leading-7 text-gray-600">{block.text}</p>;
    case 'ul':
      return (
        <ul key={i} className="mt-5 flex flex-col gap-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a]/10">
                <svg className="h-3 w-3 text-[#1e3a8a]" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </span>
              {item}
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol key={i} className="mt-5 flex flex-col gap-2.5">
          {block.items.map((item, j) => (
            <li key={j} className="flex items-start gap-3 text-sm leading-6 text-gray-600">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f97316] text-xs font-black text-white">
                {j + 1}
              </span>
              {item}
            </li>
          ))}
        </ol>
      );
    case 'faq':
      return (
        <div key={i} className="mt-4 rounded-xl border border-gray-100 bg-[#f8fafc] p-5">
          <p className="text-sm font-black text-[#111827]">{block.question}</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">{block.answer}</p>
        </div>
      );
  }
}

export default async function BlogPostPage(
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const post = await fetchPost(slug);
  if (!post) notFound();
  const p = post!;

  const isHtml = typeof p.content === 'string';
  const blocksContent: ContentBlock[] = isHtml ? [] : (p.content as ContentBlock[]);
  const bodyBlocks = blocksContent.filter((b: ContentBlock) => b.type !== 'faq');
  const faqBlocks  = blocksContent.filter((b: ContentBlock) => b.type === 'faq');
  const allPosts   = await fetchPosts();
  const related    = allPosts.filter((r) => r.slug !== p.slug).slice(0, 3);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[#0c1f3d] px-5 pb-16 pt-36 sm:px-8 sm:pt-44 sm:pb-20">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-3xl">
          <Link href="/blog" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-white/50 transition hover:text-white">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            All Posts
          </Link>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-white">
            <span className="h-1.5 w-1.5 rounded-full bg-[#f97316]" />
            {p.date}
          </span>
          <h1 className="mt-4 text-3xl font-black leading-tight tracking-tight text-white sm:text-5xl">{p.title}</h1>
          <p className="mt-5 text-base leading-7 text-white/60">{p.excerpt}</p>
        </div>
      </section>

      {/* Featured Image */}
      {p.image && (
        <div className="mx-auto -mt-8 max-w-4xl px-5 sm:px-8">
          <div className="h-64 overflow-hidden rounded-2xl shadow-2xl shadow-black/20 sm:h-96">
            <img src={p.image} alt={p.title} className="h-full w-full object-cover" />
          </div>
        </div>
      )}

      {/* Article Body */}
      <article className="mx-auto max-w-3xl px-5 py-12 sm:px-8 sm:py-16">
        {isHtml ? (
          <div
            className="prose-blog"
            dangerouslySetInnerHTML={{ __html: p.content as string }}
          />
        ) : (
          <>
            {bodyBlocks.map((block, i) => renderBlock(block, i))}
            {faqBlocks.length > 0 && (
              <div className="mt-14">
                <h2 className="text-2xl font-black text-[#111827] sm:text-3xl">Frequently Asked Questions</h2>
                <div className="mt-4 flex flex-col gap-3">
                  {faqBlocks.map((block, i) => renderBlock(block, i))}
                </div>
              </div>
            )}
          </>
        )}
      </article>

      {/* CTA Banner */}
      <section className="relative overflow-hidden bg-[#0c1f3d] px-5 py-14 sm:px-8 sm:py-20">
        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-[#f97316]/8 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-black text-white sm:text-4xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/60">Get a free, no-obligation quote from Melbourne&apos;s trusted painting team.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact-us" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#f97316] px-8 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-0.5 hover:bg-[#ea6c07]">Get Free Quote</Link>
            <Link href="/contact-us" className="inline-flex min-h-11 items-center justify-center rounded-full border border-white/25 px-8 text-sm font-bold text-white transition hover:border-white/50">Contact Us</Link>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="px-5 py-16 sm:px-8 sm:py-24">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-2xl font-black text-[#111827] sm:text-3xl">More Articles</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              {related.map((rp) => (
                <Link key={rp.slug} href={`/blog/${rp.slug}`} className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="h-40 overflow-hidden bg-gray-100">
                    {rp.image ? (
                      <img src={rp.image} alt={rp.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-[#0c1f3d]/10" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#f97316]">{rp.date}</span>
                    <h3 className="mt-2 text-sm font-black leading-snug text-[#111827] group-hover:text-[#1e3a8a]">{rp.title}</h3>
                    <div className="mt-3 flex items-center gap-1 text-xs font-bold text-[#1e3a8a]">
                      Read
                      <svg className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
