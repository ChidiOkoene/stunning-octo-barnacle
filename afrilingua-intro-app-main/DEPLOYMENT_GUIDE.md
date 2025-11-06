# Free Hosting Guide for AfriLingua Intro App 🚀

This guide will walk you through deploying your Next.js application for free using **Vercel** (recommended) or alternative platforms.

## 🎯 Recommended: Vercel (Best for Next.js)

Vercel is created by the Next.js team and offers the best free tier for Next.js applications.

### Why Vercel?
- ✅ **Free tier includes:**
  - Unlimited personal projects
  - 100GB bandwidth per month
  - Automatic HTTPS
  - Global CDN
  - Automatic deployments from Git
  - Preview deployments for every PR
  - Edge Functions support

### Step-by-Step Deployment to Vercel

#### Prerequisites
1. **GitHub Account** (free)
2. **Vercel Account** (free - sign up at https://vercel.com)
3. **Supabase Project** (free tier available)
4. **Resend Account** (free - 100 emails/day)

#### Step 1: Push Your Code to GitHub

1. **Create a new repository on GitHub:**
   - Go to https://github.com/new
   - Name your repository (e.g., `afrilingua-intro-app`)
   - Make it **public** (required for free Vercel tier) OR **private** (if you have GitHub Pro)
   - Click "Create repository"

2. **Push your code to GitHub:**
   ```bash
   # If you haven't initialized git yet
   git init
   git add .
   git commit -m "Initial commit"
   
   # Add your GitHub repository as remote
   git remote add origin https://github.com/YOUR_USERNAME/afrilingua-intro-app.git
   git branch -M main
   git push -u origin main
   ```

#### Step 2: Set Up Supabase (If Not Already Done)

1. **Create a Supabase project:**
   - Go to https://supabase.com
   - Sign up/login (free tier available)
   - Click "New Project"
   - Choose a name and database password
   - Select a region close to your users
   - Wait for project to be created (~2 minutes)

2. **Get your Supabase credentials:**
   - Go to Project Settings → API
   - Copy your:
     - Project URL (e.g., `https://xxxxx.supabase.co`)
     - `anon` `public` key

3. **Run database migrations:**
   - Go to SQL Editor in Supabase dashboard
   - Run all migration files in order:
     - `supabase/migrations/001_create_registrations_table.sql`
     - `supabase/migrations/002_add_email_verification.sql`
     - `supabase/migrations/003_add_password_and_profile.sql`
     - `supabase/migrations/004_add_bio_and_intro_media.sql`

#### Step 3: Set Up Resend (For Email)

1. **Create Resend account:**
   - Go to https://resend.com
   - Sign up (free tier: 100 emails/day)
   - Verify your email

2. **Get API key:**
   - Go to API Keys section
   - Create a new API key
   - Copy the key (starts with `re_`)

3. **Add sending domain (optional but recommended):**
   - Add your domain or use Resend's test domain for development

#### Step 4: Deploy to Vercel

1. **Sign up/Login to Vercel:**
   - Go to https://vercel.com
   - Click "Sign Up" and use your GitHub account

2. **Import your project:**
   - Click "Add New..." → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure your project:**
   - **Framework Preset:** Next.js (auto-detected)
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build` (default)
   - **Output Directory:** `.next` (default)

4. **Add Environment Variables:**
   Click "Environment Variables" and add:
   
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   NEXT_PUBLIC_APP_URL=https://your-project-name.vercel.app
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
   
   **Important:** 
   - Replace `your-project-name.vercel.app` with your actual Vercel URL (you'll get this after first deployment)
   - You can update `NEXT_PUBLIC_APP_URL` after the first deployment

5. **Deploy:**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project-name.vercel.app`

6. **Update App URL (if needed):**
   - After deployment, go to Project Settings → Environment Variables
   - Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
   - Redeploy (or it will auto-deploy on next push)

#### Step 5: Configure Custom Domain (Optional)

1. **In Vercel Dashboard:**
   - Go to your project → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

2. **Update environment variable:**
   - Update `NEXT_PUBLIC_APP_URL` to your custom domain
   - Redeploy

---

## 🔄 Alternative Free Hosting Options

### Option 2: Netlify

**Free Tier:**
- 100GB bandwidth/month
- 300 build minutes/month
- Automatic HTTPS

**Steps:**
1. Sign up at https://netlify.com
2. Connect GitHub repository
3. Build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
4. Add environment variables
5. Deploy

**Note:** Netlify requires a `netlify.toml` file for Next.js. You may need to add one.

### Option 3: Railway

**Free Tier:**
- $5 credit/month (usually enough for small apps)
- Automatic deployments

**Steps:**
1. Sign up at https://railway.app
2. Create new project from GitHub
3. Add environment variables
4. Deploy

### Option 4: Render

**Free Tier:**
- 750 hours/month
- Automatic HTTPS
- Sleeps after 15 min inactivity (wakes on request)

**Steps:**
1. Sign up at https://render.com
2. Create new Web Service
3. Connect GitHub repository
4. Build command: `npm run build`
5. Start command: `npm start`
6. Add environment variables
7. Deploy

---

## 📋 Pre-Deployment Checklist

Before deploying, make sure:

- [ ] All code is committed and pushed to GitHub
- [ ] `.env.local` is NOT committed (should be in `.gitignore`)
- [ ] Supabase database migrations are run
- [ ] Environment variables are ready:
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `NEXT_PUBLIC_APP_URL` (will be your Vercel URL)
  - [ ] `RESEND_API_KEY`
- [ ] Test the app locally (`npm run build` should work)
- [ ] All API routes are working
- [ ] Database connections are tested

---

## 🔧 Post-Deployment Steps

1. **Test your live site:**
   - Visit your Vercel URL
   - Test registration flow
   - Test email verification
   - Test login functionality

2. **Monitor your deployment:**
   - Check Vercel dashboard for build logs
   - Monitor Supabase dashboard for database usage
   - Check Resend dashboard for email delivery

3. **Set up monitoring (optional):**
   - Add error tracking (Sentry has free tier)
   - Set up uptime monitoring

---

## 🆘 Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 18+ by default)

### Environment Variables Not Working
- Make sure variables are added in Vercel dashboard
- Redeploy after adding variables
- Check variable names match exactly (case-sensitive)

### Database Connection Issues
- Verify Supabase URL and keys are correct
- Check Supabase project is active
- Ensure database migrations are run

### Email Not Sending
- Verify Resend API key is correct
- Check Resend dashboard for delivery status
- Ensure `NEXT_PUBLIC_APP_URL` is set correctly

---

## 💰 Cost Breakdown (All Free)

- **Hosting:** Vercel (Free)
- **Database:** Supabase (Free tier: 500MB database, 2GB bandwidth)
- **Email:** Resend (Free: 100 emails/day)
- **Domain:** Optional (can use Vercel's free subdomain)

**Total Cost: $0/month** 🎉

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Documentation](https://supabase.com/docs)
- [Resend Documentation](https://resend.com/docs)

---

## 🎉 You're All Set!

Once deployed, your site will:
- Automatically deploy on every Git push
- Have HTTPS enabled
- Be served from a global CDN
- Have preview deployments for pull requests

Happy deploying! 🚀

