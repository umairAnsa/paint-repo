import type { MetadataRoute } from 'next';

const baseUrl = 'https://normpainting.com';

const routes = [
  '',
  '/about',
  '/about-us',
  '/blog',
  '/colour-consultation',
  '/commercial-painting',
  '/contact',
  '/contact-us',
  '/domestic-painting',
  '/estimate',
  '/exterior-painting',
  '/fence-painting',
  '/gallery',
  '/garage-epoxy',
  '/heritage-work',
  '/house-painters-in-melbourne',
  '/maintenance',
  '/painters-in-bellarine',
  '/painters-in-box-hill',
  '/painters-in-brighton',
  '/painters-in-camberwell',
  '/painters-in-dandenong',
  '/painters-in-doncaster',
  '/painters-in-fitzroy',
  '/painters-in-footscray',
  '/painters-in-frankston',
  '/painters-in-geelong',
  '/painters-in-geelong-west',
  '/painters-in-glen-waverley',
  '/painters-in-hawthorn',
  '/painters-in-point-cook',
  '/painters-in-richmond',
  '/painters-in-south-yarra',
  '/painters-in-st-kilda',
  '/painters-in-werribee',
  '/privacy-policy',
  '/projects',
  '/repairs',
  '/roller-application',
  '/roof-painting',
  '/services',
  '/terms-and-conditions',
  '/wallpaper-removal',
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));
}
