'use client';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('common.footer');

  return (
    <footer className="bg-primary-dark text-white mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="text-2xl font-bold mb-4">
              <span className="text-primary-green">AFRI</span>
              <span className="text-primary-gold">Lingua</span>
            </div>
            <p className="text-gray-300 text-sm">{t('description')}</p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-primary-gold transition-colors">About</a></li>
              <li><a href="#" className="hover:text-primary-gold transition-colors">Register</a></li>
              <li><a href="#" className="hover:text-primary-gold transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4">Connect</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-primary-gold transition-colors">Twitter</a></li>
              <li><a href="#" className="hover:text-primary-gold transition-colors">Discord</a></li>
              <li><a href="#" className="hover:text-primary-gold transition-colors">GitHub</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}

