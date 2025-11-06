# AFRILingua Intro App 🌍

A fast, multilingual web application for introducing the AFRILingua DAO project and enabling role-based user registration.

## 🚀 Features

- **Multilingual Support**: Built-in support for 6 languages:
  - English 🇬🇧
  - French 🇫🇷
  - Swahili 🇰🇪
  - Yoruba 🇳🇬
  - Igbo 🇳🇬
  - Hausa 🇳🇬

- **Role-Based Registration**: Users can register as:
  - Core Team Members
  - Ambassadors
  - Validators
  - Contributors
  - Technical Players

- **Modern Tech Stack**:
  - Next.js 15 (React framework)
  - next-intl for internationalization
  - TailwindCSS for styling
  - Supabase for backend and database
  - TypeScript for type safety

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd afrilingua-intro-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Then edit `.env.local` and add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase Database**

   Run the migration SQL file in your Supabase SQL Editor:
   - Open your Supabase project dashboard
   - Go to SQL Editor
   - Copy and paste the contents of `supabase/migrations/001_create_registrations_table.sql`
   - Execute the SQL to create the registrations table and indexes

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) to see the app.

## 🌐 Localized Routing

The app supports localized URLs:
- `/en` - English
- `/fr` - French
- `/sw` - Swahili
- `/yo` - Yoruba
- `/ig` - Igbo
- `/ha` - Hausa

Routes automatically detect the user's preferred language and redirect accordingly.

## 📁 Project Structure

```
afrilingua-intro-app/
├── src/
│   ├── app/
│   │   ├── [locale]/          # Localized routes
│   │   │   ├── layout.tsx     # Root layout with i18n
│   │   │   ├── page.tsx       # Home page
│   │   │   └── register/
│   │   │       └── page.tsx   # Registration page
│   │   ├── api/
│   │   │   └── register/
│   │   │       └── route.ts   # Registration API endpoint
│   │   └── layout.tsx         # Root layout
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── LanguageSwitcher.tsx
│   │   ├── HeroSection.tsx
│   │   └── RegistrationForm.tsx
│   ├── i18n/
│   │   ├── routing.ts         # i18n routing configuration
│   │   └── request.ts         # i18n request configuration
│   ├── lib/
│   │   └── supabaseClient.ts  # Supabase client setup
│   ├── styles/
│   │   └── globals.css        # Global styles with Tailwind
│   └── middleware.ts          # Next.js middleware for locale detection
├── messages/                  # Translation files
│   ├── en.json
│   ├── fr.json
│   ├── sw.json
│   ├── yo.json
│   ├── ig.json
│   └── ha.json
├── public/                    # Static assets
└── package.json
```

## 🎨 Styling

The app uses TailwindCSS with custom colors:
- Primary Green: `#1B5E20`
- Primary Gold: `#FFD700`
- Dark: `#0D2818`

## 🔧 Configuration

### Adding a New Language

1. Add the locale to `src/i18n/routing.ts`:
   ```typescript
   locales: ['en', 'fr', 'sw', 'yo', 'ig', 'ha', 'newLocale']
   ```

2. Create a new translation file: `messages/newLocale.json`

3. Update the LanguageSwitcher component to include the new language

### Modifying Registration Roles

Edit the `RegistrationRole` type in `src/lib/supabaseClient.ts` and update the corresponding translations in all language files under `register.form.roleOptions`.

## 🚢 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

The app will be automatically deployed with edge functions for optimal global performance.

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ for the AFRILingua DAO community
