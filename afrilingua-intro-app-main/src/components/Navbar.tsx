'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useLocale } from 'next-intl';
import { useEffect, useState } from 'react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar() {
  const t = useTranslations('common.nav');
  const locale = useLocale();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (has data in localStorage)
    const checkAuth = () => {
      try {
        const user = localStorage.getItem('afrilingua_user');
        setIsLoggedIn(!!user);
      } catch {
        setIsLoggedIn(false);
      }
    };
    
    checkAuth();
    // Listen for storage changes (login/logout)
    window.addEventListener('storage', checkAuth);
    // Also check on mount
    const interval = setInterval(checkAuth, 1000);
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold">
              <span className="text-primary-green">AFRI</span>
              <span className="text-primary-gold">Lingua</span>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-gray-700 hover:text-primary-green transition-colors font-medium">
              {t('home')}
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-primary-green transition-colors font-medium">
              {t('about')}
            </Link>
            <Link href="/roadmap" className="text-gray-700 hover:text-primary-green transition-colors font-medium">
              {t('roadmap')}
            </Link>
            <Link href="/register" className="text-gray-700 hover:text-primary-green transition-colors font-medium">
              {t('register')}
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-primary-green transition-colors font-medium">
              {t('contact')}
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            {isLoggedIn ? (
              <>
                <Link 
                  href="/profile"
                  className="flex items-center gap-2 text-sm px-4 py-2 text-gray-700 hover:text-primary-green transition-colors"
                  title="Profile"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="hidden sm:inline">Profile</span>
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('afrilingua_user');
                    setIsLoggedIn(false);
                    window.location.href = '/';
                  }}
                  className="flex items-center gap-2 text-sm px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Logout"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  href="/login" 
                  className="text-sm px-4 py-2 text-gray-700 hover:text-primary-green transition-colors"
                >
                  Login
                </Link>
                <Link 
                  href="/register" 
                  className="btn-primary text-sm px-4 py-2"
                >
                  {t('register')}
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

