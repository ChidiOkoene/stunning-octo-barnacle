import HeroSection from '@/components/HeroSection';

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Join AFRILingua DAO?
            </h2>
            <p className="text-lg text-gray-600">
              Be part of a movement that preserves and promotes African languages through technology and community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🌍</div>
              <h3 className="text-xl font-semibold mb-2">Multilingual</h3>
              <p className="text-gray-600">
                Support for multiple African languages with community-driven translations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">🔗</div>
              <h3 className="text-xl font-semibold mb-2">Decentralized</h3>
              <p className="text-gray-600">
                Community-governed decisions through transparent DAO mechanisms.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-4xl mb-4">💡</div>
              <h3 className="text-xl font-semibold mb-2">Innovative</h3>
              <p className="text-gray-600">
                Leveraging blockchain technology for language preservation and growth.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

