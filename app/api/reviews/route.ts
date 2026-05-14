import { NextResponse } from 'next/server';

// Cache response for 1 hour — re-fetches from Google automatically after that
export const revalidate = 3600;

interface GoogleReview {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url: string;
}

interface PlaceDetailsResponse {
  result?: {
    rating: number;
    user_ratings_total: number;
    reviews?: GoogleReview[];
  };
  status: string;
  error_message?: string;
}

export async function GET() {
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return NextResponse.json(
      { error: 'Google Places API not configured.' },
      { status: 503 },
    );
  }

  try {
    const url =
      `https://maps.googleapis.com/maps/api/place/details/json` +
      `?place_id=${placeId}` +
      `&fields=rating,user_ratings_total,reviews` +
      `&reviews_sort=newest` +
      `&key=${apiKey}`;

    const res = await fetch(url, { next: { revalidate: 3600 } });

    if (!res.ok) {
      return NextResponse.json({ error: 'Google API request failed.' }, { status: 502 });
    }

    const data: PlaceDetailsResponse = await res.json();

    if (data.status !== 'OK') {
      return NextResponse.json(
        { error: data.error_message ?? data.status },
        { status: 502 },
      );
    }

    const place = data.result!;

    return NextResponse.json({
      rating:       place.rating,
      totalReviews: place.user_ratings_total,
      reviews: (place.reviews ?? [])
        .filter(r => r.rating >= 4)
        .map((r, i) => ({
          id:     i + 1,
          name:   r.author_name,
          photo:  r.profile_photo_url ?? null,
          rating: r.rating,
          time:   r.relative_time_description,
          text:   r.text,
        })),
    });
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reviews.' }, { status: 500 });
  }
}
