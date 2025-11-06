# 🚀 Testing Your AFRILingua App

## Development Server Status

Your Next.js development server is starting up. It should be available at:
- **URL**: http://localhost:3000

## ⚠️ Important: Database Migration First!

Before testing the registration form, make sure you've run the database migration:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq)
2. Navigate to **SQL Editor** → **New Query**
3. Copy and paste the contents of `supabase/migrations/001_create_registrations_table.sql`
4. Click **Run** to create the `registrations` table

## 🧪 Testing Steps

### 1. Open the App

Once the server is running, open your browser and go to:
```
http://localhost:3000
```

The app will automatically detect your language preference and redirect you to the appropriate locale (e.g., `/en`, `/fr`, `/sw`, etc.)

### 2. Test Language Switching

- Navigate through different language routes:
  - English: http://localhost:3000/en
  - French: http://localhost:3000/fr
  - Swahili: http://localhost:3000/sw
  - Yoruba: http://localhost:3000/yo
  - Igbo: http://localhost:3000/ig
  - Hausa: http://localhost:3000/ha

- Use the language switcher in the navigation to test language switching

### 3. Test Registration Form

1. Go to the registration page:
   ```
   http://localhost:3000/en/register
   ```
   (or any other locale)

2. Fill out the registration form:
   - **First Name**: Test
   - **Last Name**: User
   - **Email**: test@example.com
   - **Date of Birth**: 1990-01-15
   - **Country of Origin**: Select any African country
   - **Ethnic Origin**: Enter an ethnic group
   - **Mother Tongue**: Enter a language
   - **Lingua Franca**: Select English or French
   - **Role**: Select one of the roles:
     - Core Team Member
     - Ambassador
     - Validator
     - Contributor
     - Technical Player

3. Submit the form

4. Check the results:
   - ✅ Success: You should see a success message
   - ✅ Database: Check Supabase Dashboard → Table Editor → `registrations` table to see the new entry

### 4. Test Form Validation

Try submitting the form with:
- ❌ Empty fields (should show validation errors)
- ❌ Invalid email format
- ❌ Future date of birth
- ❌ Invalid date format

### 5. Check Browser Console

Open browser DevTools (F12) and check:
- **Console tab**: Look for any errors
- **Network tab**: Check API requests to `/api/register`
  - Should see POST request with status 201 (success) or 400/500 (errors)

### 6. Verify Database

After successful registration:
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq)
2. Navigate to **Table Editor**
3. Click on `registrations` table
4. You should see your test registration entry

## 🔍 Troubleshooting

### Server Not Starting?

If you see npm/node errors:
1. Make sure Node.js is installed and in your PATH
2. Try restarting your terminal
3. Run: `npm install` to ensure dependencies are installed

### Database Connection Errors?

- Check `.env.local` has correct Supabase credentials
- Verify the `registrations` table exists in Supabase
- Check browser console for specific error messages

### Form Submission Fails?

- Check browser console for errors
- Verify Supabase credentials in `.env.local`
- Ensure database migration has been run
- Check Network tab for API response details

### Port Already in Use?

If port 3000 is already in use:
- Stop other servers using port 3000
- Or run on a different port: `npm run dev -- -p 3001`

## 📝 Test Checklist

- [ ] Server starts successfully
- [ ] Homepage loads at http://localhost:3000
- [ ] Language switcher works
- [ ] Registration form displays correctly
- [ ] Form validation works
- [ ] Successful registration submission
- [ ] Data appears in Supabase database
- [ ] No console errors

## 🎉 Success Indicators

You'll know everything is working when:
- ✅ Server runs without errors
- ✅ Pages load correctly
- ✅ Registration form submits successfully
- ✅ Data appears in Supabase `registrations` table
- ✅ Success message appears after registration

Happy testing! 🚀

