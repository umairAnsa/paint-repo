'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimationControls } from 'framer-motion';

interface Review {
  id: number;
  name: string;
  photo: string | null;
  rating: number;
  time: string;
  text: string;
}

interface ReviewsData {
  rating: number;
  totalReviews: number;
  reviews: Review[];
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className={i <= rating ? 'text-[#f97316]' : 'text-gray-200'}>★</span>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const initials = review.name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <article className="flex-shrink-0 w-[320px] flex flex-col rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mx-3">
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} />
        <GoogleIcon />
      </div>

      <p className="flex-1 text-sm leading-6 text-gray-600 line-clamp-4">
        &ldquo;{review.text}&rdquo;
      </p>

      <div className="mt-4 flex items-center gap-3 border-t border-gray-100 pt-4">
        {review.photo ? (
          <Image
            src={review.photo}
            alt={review.name}
            width={36}
            height={36}
            className="rounded-full object-cover"
          />
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#1e3a8a] text-xs font-black text-white">
            {initials}
          </span>
        )}
        <div>
          <p className="text-sm font-black text-[#111827]">{review.name}</p>
          <p className="text-xs text-gray-400">{review.time}</p>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="flex-shrink-0 w-[320px] rounded-2xl border border-gray-100 bg-white p-6 shadow-sm mx-3 animate-pulse">
      <div className="h-4 w-24 rounded bg-gray-200 mb-4" />
      <div className="space-y-2">
        <div className="h-3 w-full rounded bg-gray-200" />
        <div className="h-3 w-5/6 rounded bg-gray-200" />
        <div className="h-3 w-4/6 rounded bg-gray-200" />
      </div>
      <div className="mt-6 flex items-center gap-3 border-t border-gray-100 pt-4">
        <div className="h-9 w-9 rounded-full bg-gray-200" />
        <div>
          <div className="h-3 w-24 rounded bg-gray-200 mb-1" />
          <div className="h-2 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  );
}

export default function TestimonialsSection() {
  const [data, setData] = useState<ReviewsData | null>(null);
  const [paused, setPaused] = useState(false);
  const controls = useAnimationControls();
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  const reviews = data?.reviews ?? [];
  const doubled = [...reviews, ...reviews];
  const cardWidth = 320 + 24; // w-[320px] + mx-3*2

  useEffect(() => {
    if (reviews.length === 0) return;
    const totalWidth = cardWidth * reviews.length;

    controls.start({
      x: [-0, -totalWidth],
      transition: {
        duration: reviews.length * 4,
        ease: 'linear',
        repeat: Infinity,
      },
    });
  }, [reviews.length, controls, cardWidth]);

  useEffect(() => {
    if (paused) {
      controls.stop();
    } else if (reviews.length > 0) {
      const totalWidth = cardWidth * reviews.length;
      controls.start({
        x: [0, -totalWidth],
        transition: {
          duration: reviews.length * 4,
          ease: 'linear',
          repeat: Infinity,
        },
      });
    }
  }, [paused, reviews.length, controls, cardWidth]);

  return (
    <section className="bg-[#f8fafc] px-5 py-20 sm:px-8 sm:py-28 overflow-hidden">
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
          <div className="mt-6 inline-flex items-center gap-3 rounded-full bg-white px-5 py-2.5 shadow-sm">
            <div className="flex gap-0.5 text-[#f97316]">
              {[...Array(5)].map((_, i) => <span key={i} className="text-lg">★</span>)}
            </div>
            <span className="text-sm font-bold text-[#111827]">
              {data?.rating?.toFixed(1) ?? '5.0'}
            </span>
            <span className="text-sm text-gray-400">
              from {data?.totalReviews ?? '120'}+ Google reviews
            </span>
          </div>
        </div>

        {/* Carousel */}
        <div
          className="mt-14 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {reviews.length === 0 ? (
            <div className="flex">
              {[...Array(3)].map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : (
            <motion.div
              ref={trackRef}
              className="flex"
              animate={controls}
            >
              {doubled.map((review, i) => (
                <ReviewCard key={`${review.id}-${i}`} review={review} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Google CTA */}
        <div className="mt-10 text-center">
          <a
            href={`https://search.google.com/local/reviews?placeid=${process.env.NEXT_PUBLIC_GOOGLE_PLACE_ID}`}
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
