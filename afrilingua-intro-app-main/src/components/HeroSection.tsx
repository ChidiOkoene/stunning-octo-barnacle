'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative bg-gradient-to-br from-primary-green via-green-700 to-primary-dark text-white py-20 md:py-32">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {t('title')}
          </h1>
          <h2 className="text-xl md:text-2xl mb-6 text-primary-gold font-semibold">
            {t('subtitle')}
          </h2>
          <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
            {t('description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register" className="btn-secondary">
              {t('cta.primary')}
            </Link>
            <Link href="/about" className="btn-primary bg-white text-primary-green hover:bg-gray-100">
              {t('cta.secondary')}
            </Link>
            <a 
              href="/AfriLinguaDAO.pdf" 
              download="AfriLinguaDAO.pdf"
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary-gold text-gray-900 rounded-lg font-semibold hover:bg-yellow-400 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              {t('cta.whitepaper')}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

