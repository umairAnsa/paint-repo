import type { Metadata } from 'next';
import { locationsData } from '../lib/locationsData';
import LocationPageTemplate, { generateLocationMetadata } from '../components/LocationPageTemplate';

const location = locationsData['painters-in-werribee'];

export const metadata: Metadata = generateLocationMetadata(location);

export default function Page() {
  return <LocationPageTemplate location={location} />;
}
