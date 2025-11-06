'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { LinguaFranca, RegistrationRole } from '@/lib/supabaseClient';
import { africanCountries } from '@/lib/africanCountries';

export default function RegistrationForm() {
  const t = useTranslations('register.form');
  const tRoles = useTranslations('register.roles');
  const locale = useLocale();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    countryOfOrigin: '',
    ethnicOfOrigin: '',
    motherTongue: '',
    linguaFranca: '' as LinguaFranca | '',
    role: '' as RegistrationRole | '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    // Validate password match
    if (formData.password !== formData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      setIsSubmitting(false);
      return;
    }

    // Validate password strength
    if (formData.password.length < 8) {
      setMessage({ type: 'error', text: 'Password must be at least 8 characters long' });
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          password: formData.password,
          date_of_birth: formData.dateOfBirth,
          country_of_origin: formData.countryOfOrigin,
          ethnic_of_origin: formData.ethnicOfOrigin,
          mother_tongue: formData.motherTongue,
          lingua_franca: formData.linguaFranca,
          role: formData.role,
          locale,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: t('success') });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          dateOfBirth: '',
          countryOfOrigin: '',
          ethnicOfOrigin: '',
          motherTongue: '',
          linguaFranca: '',
          role: '',
        });
      } else {
        setMessage({ type: 'error', text: data.error || t('error') });
      }
    } catch (error) {
      setMessage({ type: 'error', text: t('error') });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate max date (18 years ago)
  const today = new Date();
  const maxDate = new Date(today.getFullYear() - 18, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];
  
  // Calculate min date (120 years ago)
  const minDate = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate())
    .toISOString()
    .split('T')[0];

  const roles: { value: RegistrationRole; label: string }[] = [
    { value: 'coreTeam', label: t('roleOptions.coreTeam') },
    { value: 'ambassador', label: t('roleOptions.ambassador') },
    { value: 'validator', label: t('roleOptions.validator') },
    { value: 'contributor', label: t('roleOptions.contributor') },
    { value: 'technicalPlayer', label: t('roleOptions.technicalPlayer') },
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('firstName')} *
            </label>
            <input
              type="text"
              id="firstName"
              required
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              className="input-field"
              placeholder={t('firstName')}
            />
          </div>

          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
              {t('lastName')} *
            </label>
            <input
              type="text"
              id="lastName"
              required
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              className="input-field"
              placeholder={t('lastName')}
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            {t('email')} *
          </label>
          <input
            type="email"
            id="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="input-field"
            placeholder={t('email')}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password *
            </label>
            <input
              type="password"
              id="password"
              required
              minLength={8}
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="input-field"
              placeholder="Minimum 8 characters"
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password *
            </label>
            <input
              type="password"
              id="confirmPassword"
              required
              minLength={8}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="input-field"
              placeholder="Re-enter password"
            />
          </div>
        </div>

        <div>
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-2">
            {t('dateOfBirth')} *
          </label>
          <input
            type="date"
            id="dateOfBirth"
            required
            min={minDate}
            max={maxDate}
            value={formData.dateOfBirth}
            onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
            className="input-field"
          />
        </div>

        <div>
          <label htmlFor="countryOfOrigin" className="block text-sm font-medium text-gray-700 mb-2">
            {t('countryOfOrigin')} *
          </label>
          <select
            id="countryOfOrigin"
            required
            value={formData.countryOfOrigin}
            onChange={(e) => setFormData({ ...formData, countryOfOrigin: e.target.value })}
            className="input-field"
          >
            <option value="">{t('selectCountry')}</option>
            {africanCountries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="ethnicOfOrigin" className="block text-sm font-medium text-gray-700 mb-2">
            {t('ethnicOfOrigin')} *
          </label>
          <input
            type="text"
            id="ethnicOfOrigin"
            required
            value={formData.ethnicOfOrigin}
            onChange={(e) => setFormData({ ...formData, ethnicOfOrigin: e.target.value })}
            className="input-field"
            placeholder={t('ethnicOfOrigin')}
          />
        </div>

        <div>
          <label htmlFor="motherTongue" className="block text-sm font-medium text-gray-700 mb-2">
            {t('motherTongue')} *
          </label>
          <input
            type="text"
            id="motherTongue"
            required
            value={formData.motherTongue}
            onChange={(e) => setFormData({ ...formData, motherTongue: e.target.value })}
            className="input-field"
            placeholder={t('motherTongue')}
          />
        </div>

        <div>
          <label htmlFor="linguaFranca" className="block text-sm font-medium text-gray-700 mb-2">
            {t('linguaFranca')} *
          </label>
          <select
            id="linguaFranca"
            required
            value={formData.linguaFranca}
            onChange={(e) => setFormData({ ...formData, linguaFranca: e.target.value as LinguaFranca })}
            className="input-field"
          >
            <option value="">{t('linguaFranca')}</option>
            <option value="en">{t('linguaFrancaOptions.en')}</option>
            <option value="fr">{t('linguaFrancaOptions.fr')}</option>
          </select>
        </div>

        <div>
          <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
            {t('role')} *
          </label>
          <select
            id="role"
            required
            value={formData.role}
            onChange={(e) => setFormData({ ...formData, role: e.target.value as RegistrationRole })}
            className="input-field"
          >
            <option value="">{t('role')}</option>
            {roles.map((role) => (
              <option key={role.value} value={role.value}>
                {role.label}
              </option>
            ))}
          </select>
        </div>

        {formData.role && (
          <div className="bg-primary-green bg-opacity-10 border border-primary-green rounded-lg p-4">
            <h4 className="font-semibold text-primary-green mb-2">
              {tRoles(`${formData.role}.title`)}
            </h4>
            <p className="text-gray-700 text-sm">
              {tRoles(`${formData.role}.description`)}
            </p>
          </div>
        )}

        {message && (
          <div
            className={`p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-100 text-green-800 border border-green-300'
                : 'bg-red-100 text-red-800 border border-red-300'
            }`}
          >
            {message.text}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : t('submit')}
        </button>
      </form>
    </div>
  );
}
