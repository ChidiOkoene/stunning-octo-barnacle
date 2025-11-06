import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for registration
export type LinguaFranca = 'en' | 'fr';

export type RegistrationRole = 
  | 'coreTeam'
  | 'ambassador'
  | 'validator'
  | 'contributor'
  | 'technicalPlayer';

export interface RegistrationData {
  first_name: string;
  last_name: string;
  email: string;
  password?: string; // Optional - for new registrations with password
  date_of_birth: string; // ISO date string (YYYY-MM-DD)
  locale?: string;
  country_of_origin: string;
  ethnic_of_origin: string;
  mother_tongue: string;
  lingua_franca: LinguaFranca;
  role: RegistrationRole;
}

