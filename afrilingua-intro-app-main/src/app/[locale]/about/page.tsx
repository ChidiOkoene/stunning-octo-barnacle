'use client';

import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-green to-[#2d8659] text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl">{t('hero.subtitle')}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center">
                <span className="text-3xl">🎯</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">{t('mission.title')}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{t('mission.description')}</p>
            <div className="bg-green-50 border-l-4 border-primary-green p-6 rounded-r-lg">
              <p className="text-gray-800 italic text-lg">{t('mission.statement')}</p>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-primary-gold rounded-full flex items-center justify-center">
                <span className="text-3xl">👁️</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">{t('vision.title')}</h2>
            </div>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">{t('vision.description')}</p>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="bg-white border-2 border-primary-green rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-green mb-3">{t('vision.pillar1.title')}</h3>
                <p className="text-gray-700">{t('vision.pillar1.description')}</p>
              </div>
              <div className="bg-white border-2 border-primary-green rounded-lg p-6">
                <h3 className="text-xl font-semibold text-primary-green mb-3">{t('vision.pillar2.title')}</h3>
                <p className="text-gray-700">{t('vision.pillar2.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="mb-20 bg-red-50 py-12 px-6 rounded-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">{t('problem.title')}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4">📉</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('problem.stat1.title')}</h3>
                <p className="text-gray-700">{t('problem.stat1.description')}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4">💔</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('problem.stat2.title')}</h3>
                <p className="text-gray-700">{t('problem.stat2.description')}</p>
              </div>
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <div className="text-4xl mb-4">🔌</div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{t('problem.stat3.title')}</h3>
                <p className="text-gray-700">{t('problem.stat3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Solution */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">{t('solution.title')}</h2>
            <div className="bg-gradient-to-r from-primary-green to-[#2d8659] text-white rounded-xl p-8 mb-8">
              <p className="text-xl leading-relaxed">{t('solution.description')}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white border-2 border-primary-gold rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-primary-green mb-4 flex items-center gap-2">
                  <span>🔗</span> {t('solution.feature1.title')}
                </h3>
                <p className="text-gray-700">{t('solution.feature1.description')}</p>
              </div>
              <div className="bg-white border-2 border-primary-gold rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-primary-green mb-4 flex items-center gap-2">
                  <span>🌐</span> {t('solution.feature2.title')}
                </h3>
                <p className="text-gray-700">{t('solution.feature2.description')}</p>
              </div>
              <div className="bg-white border-2 border-primary-gold rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-primary-green mb-4 flex items-center gap-2">
                  <span>🤝</span> {t('solution.feature3.title')}
                </h3>
                <p className="text-gray-700">{t('solution.feature3.description')}</p>
              </div>
              <div className="bg-white border-2 border-primary-gold rounded-lg p-6">
                <h3 className="text-2xl font-semibold text-primary-green mb-4 flex items-center gap-2">
                  <span>💰</span> {t('solution.feature4.title')}
                </h3>
                <p className="text-gray-700">{t('solution.feature4.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">{t('values.title')}</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🌍</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('values.value1.title')}</h3>
                <p className="text-gray-700">{t('values.value1.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">🤲</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('values.value2.title')}</h3>
                <p className="text-gray-700">{t('values.value2.description')}</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">✨</span>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{t('values.value3.title')}</h3>
                <p className="text-gray-700">{t('values.value3.description')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-primary-green to-[#2d8659] text-white rounded-xl p-12 text-center">
          <h2 className="text-4xl font-bold mb-4">{t('cta.title')}</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
          <a href="/register" className="bg-primary-gold text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-yellow-400 transition-colors inline-block">
            {t('cta.button')}
          </a>
        </section>
      </div>
    </div>
  );
}

