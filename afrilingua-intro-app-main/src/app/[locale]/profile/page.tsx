'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface UserProfile {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  profile_picture_url: string | null;
  role: string;
  email_verified: boolean;
  country_of_origin: string;
  ethnic_of_origin: string;
  mother_tongue: string;
  lingua_franca: string;
  date_of_birth: string;
  created_at: string;
  bio?: string | null;
  intro_audio_url?: string | null;
  intro_video_url?: string | null;
}

export default function ProfilePage() {
  const t = useTranslations('register');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [bioDraft, setBioDraft] = useState('');

  useEffect(() => {
    // 1) Try to load from client storage (set at login)
    try {
      const stored = localStorage.getItem('afrilingua_user');
      if (stored) {
        const user = JSON.parse(stored) as UserProfile;
        setProfile(user);
        setBioDraft(user.bio || '');
        setLoading(false);
        return; // Use local session; avoid 404 from anon API
      }
    } catch {}

    // 2) Fallback: call API for latest profile (may 404 if none or RLS)
    fetch('/api/profile')
      .then(async (res) => {
        if (res.ok) {
          const data = await res.json();
          setProfile(data.user);
          setBioDraft(data.user.bio || '');
        } else {
          setError('Profile not found. Please register or log in again.');
        }
      })
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    // In production, upload to Supabase Storage or cloud storage
    // For now, using a placeholder
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload-profile-picture', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        if (profile) {
          setProfile({ ...profile, profile_picture_url: data.url });
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload-intro-audio', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        if (profile) setProfile({ ...profile, intro_audio_url: data.url });
      }
    } finally {
      setUploading(false);
    }
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload-intro-video', { method: 'POST', body: formData });
      if (res.ok) {
        const data = await res.json();
        if (profile) setProfile({ ...profile, intro_video_url: data.url });
      }
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-green"></div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Profile not found'}</p>
          <a href="/register" className="text-primary-green hover:underline">
            Register to create a profile
          </a>
        </div>
      </div>
    );
  }

  const fullName = `${profile.first_name} ${profile.last_name}`;
  const roleLabels: Record<string, string> = {
    coreTeam: 'Core Team Member',
    ambassador: 'Ambassador',
    validator: 'Validator',
    contributor: 'Contributor',
    technicalPlayer: 'Technical Player',
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-green to-green-700 px-8 py-12">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Profile Picture */}
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  {profile.profile_picture_url ? (
                    <img
                      src={profile.profile_picture_url}
                      alt={fullName}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full rounded-full bg-gradient-to-br from-primary-green to-primary-gold flex items-center justify-center text-4xl font-bold text-white">
                      {profile.first_name[0]}{profile.last_name[0]}
                    </div>
                  )}
                </div>
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary-green text-white rounded-full p-2 cursor-pointer hover:bg-green-700 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </label>
                )}
              </div>

              {/* User Info */}
              <div className="text-white flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold mb-2">{fullName}</h1>
                <p className="text-green-100 mb-2">{profile.email}</p>
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
                    {roleLabels[profile.role] || profile.role}
                  </span>
                  {profile.email_verified && (
                    <span className="bg-green-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                      <span>✓</span> Verified
                    </span>
                  )}
                </div>
              </div>

              {/* Edit Button */}
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="bg-white text-primary-green px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                {isEditing ? 'Save' : 'Edit Profile'}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                {isEditing ? (
                  <textarea
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primary-green"
                    rows={5}
                    value={bioDraft}
                    onChange={(e) => setBioDraft(e.target.value)}
                    placeholder="Tell us about yourself, your background and your passion for your native language."
                  />
                ) : (
                  <p className="text-gray-900 whitespace-pre-wrap">{profile.bio || 'No bio yet.'}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country of Origin</label>
                <p className="text-gray-900">{profile.country_of_origin || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ethnic Group</label>
                <p className="text-gray-900">{profile.ethnic_of_origin || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mother Tongue</label>
                <p className="text-gray-900">{profile.mother_tongue || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lingua Franca</label>
                <p className="text-gray-900">{(profile.lingua_franca || '').toUpperCase() || 'N/A'}</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <p className="text-gray-900">{
                  (() => { const d = new Date(profile.date_of_birth); return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString(); })()
                }</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Member Since</label>
                <p className="text-gray-900">{
                  (() => { const d = new Date(profile.created_at); return isNaN(d.getTime()) ? 'N/A' : d.toLocaleDateString(); })()
                }</p>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mt-10 mb-4">Introductory Media (Native Language)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intro Audio</label>
                {profile.intro_audio_url ? (
                  <audio controls className="w-full">
                    <source src={profile.intro_audio_url} />
                    Your browser does not support the audio element.
                  </audio>
                ) : (
                  <p className="text-gray-500">No audio uploaded.</p>
                )}
                {isEditing && (
                  <input type="file" accept="audio/*" onChange={handleAudioUpload} className="mt-3" disabled={uploading} />
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Intro Video</label>
                {profile.intro_video_url ? (
                  <video controls className="w-full rounded-lg border">
                    <source src={profile.intro_video_url} />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <p className="text-gray-500">No video uploaded.</p>
                )}
                {isEditing && (
                  <input type="file" accept="video/*" onChange={handleVideoUpload} className="mt-3" disabled={uploading} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

