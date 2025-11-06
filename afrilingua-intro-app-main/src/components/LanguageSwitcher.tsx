'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const t = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬' },
  ];

  const handleLanguageChange = (newLocale: string) => {
    // Debug: log current values
    console.log('Current locale:', locale);
    console.log('Current pathname:', pathname);
    console.log('Window location:', window.location.pathname);
    
    // Get the actual pathname from window (more reliable)
    const currentWindowPath = window.location.pathname;
    // Remove locale prefix from window pathname
    const cleanWindowPath = currentWindowPath.replace(/^\/(en|fr|sw|yo|ig|ha)(\/|$)/, '/') || '/';
    // Build new path with target locale
    const newPath = cleanWindowPath === '/' ? `/${newLocale}` : `/${newLocale}${cleanWindowPath}`;
    
    console.log('Navigating to:', newPath);
    // Use window.location for reliable navigation
    window.location.href = newPath;
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <span className="text-lg">{languages.find(l => l.code === locale)?.flag}</span>
        <span className="hidden md:inline text-sm font-medium">{t('language')}</span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className={`w-full text-left px-4 py-2 hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors flex items-center gap-2 ${
              locale === lang.code ? 'bg-primary-green bg-opacity-10 font-semibold' : ''
            }`}
          >
            <span className="text-lg">{lang.flag}</span>
            <span>{lang.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

