import type { Metadata } from 'next';
import { servicesData } from '../lib/servicesData';
import ServicePageTemplate, { generateServiceMetadata } from '../components/ServicePageTemplate';

const service = servicesData['garage-epoxy'];

export const metadata: Metadata = generateServiceMetadata(service);

export default function Page() {
  return <ServicePageTemplate service={service} />;
}
