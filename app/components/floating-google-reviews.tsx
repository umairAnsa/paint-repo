"use client";

import { useEffect, useRef, useState } from "react";

const RATING = 4.9;
const TOTAL_REVIEWS = 166;

const REVIEWS = [
  {
    name: "James Wilson",
    initials: "JW",
    color: "#4F46E5",
    rating: 5,
    time: "2 weeks ago",
    text: "Absolutely fantastic interior painting job! The team was professional and the finish is flawless.",
  },
  {
    name: "Priya Sharma",
    initials: "PS",
    color: "#0891B2",
    rating: 5,
    time: "3 weeks ago",
    text: "Very impressed with the quality of work. They transformed our living room beautifully.",
  },
  {
    name: "Sarah Mitchell",
    initials: "SM",
    color: "#059669",
    rating: 5,
    time: "1 month ago",
    text: "Highly recommend Norm Painting! They painted our whole house exterior on time and within budget.",
  },
  {
    name: "Tom Reynolds",
    initials: "TR",
    color: "#D97706",
    rating: 5,
    time: "1 month ago",
    text: "Great communication from start to finish. The results exceeded our expectations.",
  },
  {
    name: "Linda Chen",
    initials: "LC",
    color: "#B64A2A",
    rating: 5,
    time: "2 months ago",
    text: "Professional, tidy, and fast. Our home looks brand new. Will definitely use again.",
  },
];

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 20 20"
      fill={filled ? "#FBBF24" : "#E5E7EB"}
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <StarIcon key={i} filled={i <= count} />
      ))}
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 48 48" className="h-7 w-7 shrink-0" aria-hidden="true">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );
}

export default function FloatingGoogleReviews() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleOutside(e: MouseEvent | TouchEvent) {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
    };
  }, [open]);

  return (
    <div ref={panelRef} className="fixed bottom-28 left-4 z-50">
      {/* Reviews panel */}
      {open && (
        <div className="mb-3 w-80 overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-black/10">
          {/* Header */}
          <div className="flex items-start justify-between border-b border-gray-100 p-4">
            <div className="flex items-center gap-3">
              <GoogleIcon />
              <div>
                <p className="text-sm font-bold text-gray-900">
                  Google Reviews
                </p>
                <p className="text-xs text-gray-500">Norm Painting</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close reviews"
              className="rounded-full p-1 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
            >
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Overall rating */}
          <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-100">
            <span className="text-4xl font-black text-gray-900">{RATING}</span>
            <div>
              <Stars count={5} />
              <p className="mt-1 text-xs text-gray-500">
                Based on{" "}
                <span className="font-semibold text-gray-700">
                  {TOTAL_REVIEWS} reviews
                </span>
              </p>
            </div>
          </div>

          {/* Review list */}
          <div className="max-h-72 overflow-y-auto divide-y divide-gray-100">
            {REVIEWS.map((review) => (
              <div key={review.name} className="px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                      style={{ backgroundColor: review.color }}
                    >
                      {review.initials}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">
                        {review.name}
                      </p>
                      <Stars count={review.rating} />
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">{review.time}</span>
                </div>
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  {review.text}
                </p>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-3 text-center">
            <a
              href="https://www.google.com/maps/search/Norm+Painting+Melbourne"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              See all reviews on Google →
            </a>
          </div>
        </div>
      )}

      {/* Trigger badge */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="View Google Reviews"
        aria-expanded={open}
        className="flex items-center gap-2.5 rounded-full bg-white py-2 pl-2.5 pr-4 shadow-lg ring-1 ring-black/10 transition hover:shadow-xl hover:scale-105 active:scale-95"
      >
        <GoogleIcon />
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-gray-900">{RATING}</span>
            <Stars count={5} />
          </div>
          <p className="text-[11px] text-gray-500">{TOTAL_REVIEWS} reviews</p>
        </div>
        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          className="ml-1 h-4 w-4 text-gray-400"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
}
