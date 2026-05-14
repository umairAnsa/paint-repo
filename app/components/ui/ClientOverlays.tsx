'use client';

import dynamic from 'next/dynamic';

const GoogleReviews         = dynamic(() => import('./GoogleReviews'),         { ssr: false });
const FloatingContactButton = dynamic(() => import('./FloatingContactButton'), { ssr: false });

export default function ClientOverlays() {
  return (
    <>
      <GoogleReviews />
      <FloatingContactButton />
    </>
  );
}
