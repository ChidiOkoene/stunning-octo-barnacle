# Quick Email Setup - Get Registration Emails Working! 📧

## The Problem
Registration works, but no email is sent because email service isn't configured yet.

## Solution: Set up Resend (5 minutes)

### Step 1: Get Resend API Key

1. **Go to https://resend.com**
2. **Sign up** (it's free - 100 emails/day)
3. **Go to API Keys** section
4. **Create a new API key**
5. **Copy the key** (starts with `re_`)

### Step 2: Add to Your Environment

1. **Open `.env.local`** file (in your project root)
2. **Add this line:**
   ```env
   RESEND_API_KEY=re_your_actual_key_here
   ```
3. **Save the file**

### Step 3: Install the Package

Run this in your terminal:
```bash
npm install
```

### Step 4: Restart Your Dev Server

Stop your current server (Ctrl+C) and restart:
```bash
npm run dev
```

## ✅ That's It!

Now when someone registers:
- ✅ Registration saves to database
- ✅ Confirmation email is automatically sent
- ✅ Email includes welcome message and registration details

## Test It

1. Fill out the registration form
2. Submit it
3. Check the email inbox you used
4. You should receive a welcome email!

## Important Notes

- **Free tier**: 100 emails/day (perfect for testing)
- **From address**: Currently set to `onboarding@resend.dev` (works for testing)
- **Production**: Later you can verify your own domain for custom "from" address
- **If email fails**: Registration still succeeds (emails are non-blocking)

## Troubleshooting

**Email not received?**
- Check spam folder
- Verify `RESEND_API_KEY` is in `.env.local` (not `.env`)
- Check server console for error messages
- Verify email address is correct

**Need help?** Check `EMAIL_SETUP.md` for more details.

