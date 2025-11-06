# Email Verification Setup ✅

## ✅ What's Been Added

Your registration system now includes **full email verification**:

1. **Database Migration** (`002_add_email_verification.sql`):
   - Adds `email_verified` (boolean)
   - Adds `verification_token` (unique token)
   - Adds `verified_at` (timestamp)

2. **Email Template Updated**:
   - Includes verification button/link
   - Shows verification link in plain text too
   - Includes expiration notice

3. **Verification API** (`/api/verify-email`):
   - Validates tokens
   - Marks emails as verified
   - Removes token after verification

4. **Verification Page** (`/[locale]/verify-email`):
   - User-friendly verification UI
   - Shows success/error states
   - Redirects to homepage

## 📋 Setup Steps

### Step 1: Run Database Migration

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq)
2. Navigate to **SQL Editor** → **New Query**
3. Copy contents of `supabase/migrations/002_add_email_verification.sql`
4. Paste and run the SQL

### Step 2: Update Environment Variables

Add to your `.env.local`:
```env
# Your app URL (for verification links)
NEXT_PUBLIC_APP_URL=http://localhost:3000
# Or for production: https://yourdomain.com
```

### Step 3: Install Dependencies (if not done)

```bash
npm install
```

## 🔄 How It Works

1. **Registration**: 
   - User submits form
   - System generates unique verification token
   - Token saved to database
   - Email sent with verification link

2. **Email Verification**:
   - User clicks link in email
   - Link goes to `/verify-email?token=xxxxx`
   - System validates token
   - Marks email as verified
   - Shows success page

## 📧 Email Contents

The email now includes:
- ✅ Welcome message
- ✅ **Large "Verify Email Address" button**
- ✅ Verification link (clickable)
- ✅ Plain text link (for copy/paste)
- ✅ Registration details
- ✅ Expiration notice (7 days)

## 🧪 Testing

1. Register with a test email
2. Check your email inbox
3. Click the verification link
4. You should see "Email Verified!" page
5. Check database - `email_verified` should be `true`

## 🔍 Database Check

After running the migration, verify the new columns exist:
```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'registrations';
```

You should see:
- `email_verified` (boolean)
- `verification_token` (text)
- `verified_at` (timestamp)

## 📝 Next Steps

After verification is set up, you can:
- Query verified users: `WHERE email_verified = true`
- Show verification status in admin panel
- Send reminder emails to unverified users (optional)

