# Quick Deployment Checklist ✅

Use this checklist to deploy your app quickly.

## Before You Start

- [ ] Code is working locally (`npm run dev` works)
- [ ] All changes are committed to git
- [ ] You have accounts ready:
  - [ ] GitHub account
  - [ ] Vercel account (sign up at vercel.com)
  - [ ] Supabase account (sign up at supabase.com)
  - [ ] Resend account (sign up at resend.com)

## Step 1: Push to GitHub (5 minutes)

```bash
# If not already a git repo
git init
git add .
git commit -m "Ready for deployment"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/afrilingua-intro-app.git
git branch -M main
git push -u origin main
```

- [ ] Code pushed to GitHub

## Step 2: Supabase Setup (10 minutes)

1. Create project at https://supabase.com
2. Get credentials from Settings → API:
   - [ ] `NEXT_PUBLIC_SUPABASE_URL` = `https://xxxxx.supabase.co`
   - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` = `eyJ...`
3. Run migrations in SQL Editor:
   - [ ] `001_create_registrations_table.sql`
   - [ ] `002_add_email_verification.sql`
   - [ ] `003_add_password_and_profile.sql`
   - [ ] `004_add_bio_and_intro_media.sql`

## Step 3: Resend Setup (5 minutes)

1. Sign up at https://resend.com
2. Get API key:
   - [ ] `RESEND_API_KEY` = `re_...`

## Step 4: Deploy to Vercel (10 minutes)

1. Go to https://vercel.com and sign in with GitHub
2. Click "Add New Project"
3. Import your GitHub repository
4. Add Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   NEXT_PUBLIC_APP_URL=https://your-project.vercel.app
   RESEND_API_KEY=your_key
   ```
5. Click "Deploy"
6. Wait 2-3 minutes
7. Copy your deployment URL

- [ ] Project deployed
- [ ] Site is live at: `https://________________.vercel.app`

## Step 5: Update App URL (2 minutes)

1. Go to Vercel → Your Project → Settings → Environment Variables
2. Update `NEXT_PUBLIC_APP_URL` with your actual Vercel URL
3. Redeploy (or push a new commit)

- [ ] `NEXT_PUBLIC_APP_URL` updated

## Step 6: Test Everything (5 minutes)

- [ ] Homepage loads
- [ ] Registration form works
- [ ] Email verification works
- [ ] Login works
- [ ] Profile page works

## 🎉 Done!

Your site is now live and free!

**Your live URL:** `https://________________.vercel.app`

---

## Need Help?

See `DEPLOYMENT_GUIDE.md` for detailed instructions.

