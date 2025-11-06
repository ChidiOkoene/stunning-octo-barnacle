# Email Verification Setup Guide

## Current Status

The registration form currently saves data to the database but **does not send email verification**. This guide shows how to add email notifications.

## Option 1: Using Resend (Recommended - Easy Setup)

Resend is a modern email API perfect for Next.js applications.

### Setup Steps:

1. **Create a Resend account:**
   - Go to https://resend.com
   - Sign up for a free account (100 emails/day free)

2. **Get your API key:**
   - Go to API Keys section
   - Create a new API key
   - Copy the key

3. **Add to environment variables:**
   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```

4. **Install Resend:**
   ```bash
   npm install resend
   ```

5. **The email service will be implemented in the code**

## Option 2: Using Supabase Email (Auth only)

Supabase Auth has built-in email templates, but they're only for authentication, not custom notifications.

## Option 3: Using Nodemailer with SMTP

If you have your own SMTP server, you can use Nodemailer.

## Next Steps

After choosing an option, the email service will:
- ✅ Send welcome/confirmation email after registration
- ✅ Include registration details
- ✅ Provide next steps information

