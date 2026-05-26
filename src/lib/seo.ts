import { Metadata } from 'next';

interface SeoProps {
  title: string;
  description: string;
  slug?: string;
}

export function generateSeoMetadata({ title, description, slug = '' }: SeoProps): Metadata {
  const siteUrl = 'https://theninthpath.com'; // Placeholder base URL
  const pageUrl = `${siteUrl}/${slug}`;
  const fullTitle = `${title} | The Ninth Path - Skyrim Modlist Guide`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: pageUrl,
      siteName: 'The Ninth Path',
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: '/images/og-image.png', // Fallback social image
          width: 1200,
          height: 630,
          alt: 'The Ninth Path - Skyrim Modlist Guide',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/images/og-image.png'],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}
