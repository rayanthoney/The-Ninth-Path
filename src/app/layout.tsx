import type { Metadata } from 'next';
import { Cinzel, Inter } from 'next/font/google';
import './globals.css';
import Header from '../components/docs/Header';
import { getGuides, getMods, getTools } from '../lib/content';

const cinzel = Cinzel({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
});

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'The Ninth Path - Skyrim Modlist Guide',
  description: 'A lore-heavy, spiritually charged Skyrim Special Edition modlist and installation guide.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Load data for search indexing
  const guides = await getGuides();
  const mods = await getMods();
  const tools = await getTools();

  return (
    <html
      lang="en"
      className={`${cinzel.variable} ${inter.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-bg-primary text-text-primary">
        <Header guides={guides} mods={mods} tools={tools} />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        <footer className="bg-bg-secondary border-t border-border-primary/80 py-8 text-center text-xs text-text-muted mt-auto">
          <div className="max-w-7xl mx-auto px-4 space-y-2">
            <p className="font-serif tracking-wider font-semibold text-text-secondary">
              THE NINTH PATH
            </p>
            <p>
              Skyrim is a registered trademark of Bethesda Softworks LLC. This guide is an independent fan creation.
            </p>
            <div className="flex justify-center gap-4 pt-2">
              <a href="https://loadorderlibrary.com/lists/the-ninth-path" target="_blank" rel="noopener noreferrer" className="hover:text-accent-gold transition-colors">
                Load Order Library
              </a>
              <span>•</span>
              <a href="/docs/faq" className="hover:text-accent-gold transition-colors">
                Support FAQ
              </a>
              <span>•</span>
              <a href="/docs/changelog" className="hover:text-accent-gold transition-colors">
                Changelog
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
