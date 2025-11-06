'use client';

import { useTranslations } from 'next-intl';

export default function RoadmapPage() {
  const t = useTranslations('roadmap');

  const phases = [
    {
      key: 'phase1',
      color: 'from-blue-500 to-blue-600',
      borderColor: 'border-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      key: 'phase2',
      color: 'from-green-500 to-green-600',
      borderColor: 'border-green-500',
      bgColor: 'bg-green-50',
    },
    {
      key: 'phase3',
      color: 'from-purple-500 to-purple-600',
      borderColor: 'border-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      key: 'phase4',
      color: 'from-orange-500 to-orange-600',
      borderColor: 'border-orange-500',
      bgColor: 'bg-orange-50',
    },
  ];

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
        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          {phases.map((phase, index) => (
            <div key={phase.key} className="relative mb-16">
              {/* Timeline Line */}
              {index < phases.length - 1 && (
                <div className="absolute left-8 top-20 w-1 h-full bg-gradient-to-b from-gray-300 to-gray-200" />
              )}
              
              {/* Phase Card */}
              <div className="relative flex gap-8">
                {/* Timeline Dot */}
                <div className={`relative z-10 flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-r ${phase.color} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                  {index + 1}
                </div>

                {/* Content Card */}
                <div className={`flex-1 ${phase.bgColor} rounded-xl p-8 border-2 ${phase.borderColor} shadow-lg`}>
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className={`text-3xl font-bold bg-gradient-to-r ${phase.color} bg-clip-text text-transparent`}>
                      {t(`${phase.key}.title`)}
                    </h2>
                    <span className={`px-4 py-1 rounded-full text-sm font-semibold bg-gradient-to-r ${phase.color} text-white`}>
                      {t(`${phase.key}.timeline`)}
                    </span>
                  </div>
                  
                  <p className="text-lg text-gray-700 mb-6">{t(`${phase.key}.description`)}</p>
                  
                  {/* Milestones */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((milestone) => {
                      const milestoneKey = `${phase.key}.milestones.m${milestone}`;
                      const milestoneExists = t.raw(milestoneKey) !== milestoneKey;
                      if (!milestoneExists) return null;
                      
                      return (
                        <div key={milestone} className="bg-white rounded-lg p-4 border-l-4 border-primary-green">
                          <div className="flex items-start gap-3">
                            <span className="text-primary-green text-xl">✓</span>
                            <p className="text-gray-800">{t(`${milestoneKey}`)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Outcomes */}
                  {t.raw(`${phase.key}.outcomes`) && (
                    <div className="mt-6 pt-6 border-t-2 border-gray-300">
                      <h3 className="font-semibold text-gray-900 mb-3">{t(`${phase.key}.outcomesTitle`)}</h3>
                      <ul className="list-disc list-inside space-y-2 text-gray-700">
                        {[1, 2, 3].map((outcome) => {
                          const outcomeKey = `${phase.key}.outcomes.o${outcome}`;
                          const outcomeExists = t.raw(outcomeKey) !== outcomeKey;
                          if (!outcomeExists) return null;
                          
                          return (
                            <li key={outcome}>{t(outcomeKey)}</li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Future Vision */}
        <section className="mt-20 bg-gradient-to-r from-primary-green to-[#2d8659] text-white rounded-xl p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">{t('future.title')}</h2>
            <p className="text-xl text-green-100 leading-relaxed mb-8">{t('future.description')}</p>
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-4xl mb-3">🌐</div>
                <h3 className="text-xl font-semibold mb-2">{t('future.goal1.title')}</h3>
                <p className="text-green-100">{t('future.goal1.description')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-4xl mb-3">📚</div>
                <h3 className="text-xl font-semibold mb-2">{t('future.goal2.title')}</h3>
                <p className="text-green-100">{t('future.goal2.description')}</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <div className="text-4xl mb-3">🚀</div>
                <h3 className="text-xl font-semibold mb-2">{t('future.goal3.title')}</h3>
                <p className="text-green-100">{t('future.goal3.description')}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

