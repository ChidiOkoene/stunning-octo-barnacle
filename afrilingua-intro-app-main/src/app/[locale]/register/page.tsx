import { getTranslations } from 'next-intl/server';
import RegistrationForm from '@/components/RegistrationForm';

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  await params; // Ensure params are awaited (required in Next.js 15)
  const t = await getTranslations('register');

  return (
    <div className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600">
            {t('subtitle')}
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
          <RegistrationForm />
        </div>
      </div>
    </div>
  );
}

