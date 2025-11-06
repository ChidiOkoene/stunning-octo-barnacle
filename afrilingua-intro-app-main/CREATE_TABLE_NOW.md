# 🔧 Create Registration Table in Supabase - Step by Step

## Quick Fix: Run the Migration SQL

The `registrations` table doesn't exist yet because the migration hasn't been run. Here's how to create it:

## Method 1: Using Supabase Dashboard SQL Editor (Easiest)

### Step-by-Step Instructions:

1. **Open Supabase Dashboard**
   - Go to: https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq
   - Make sure you're logged in

2. **Navigate to SQL Editor**
   - In the left sidebar, click **"SQL Editor"** (or find it under Database section)
   - Click **"New Query"** button (top right)

3. **Copy the Migration SQL**
   - Open the file: `supabase/migrations/001_create_registrations_table.sql` in this project
   - Select ALL the contents (Ctrl+A)
   - Copy it (Ctrl+C)

4. **Paste into SQL Editor**
   - Click in the SQL Editor text area
   - Paste the SQL code (Ctrl+V)

5. **Run the SQL**
   - Click the **"RUN"** button (or press `Ctrl+Enter`)
   - Wait a few seconds for it to execute

6. **Verify Success**
   - You should see: **"Success. No rows returned"** or similar success message
   - If you see errors, check the error message

7. **Check the Table**
   - Go to **Table Editor** in the left sidebar
   - You should now see the **`registrations`** table listed
   - Click on it to view the table structure

## Method 2: Using Cursor Database Connection (If Connected)

If you've successfully connected to your database in Cursor:

1. Open a new SQL query in your database connection
2. Copy the entire contents of `supabase/migrations/001_create_registrations_table.sql`
3. Paste and execute the query

## What the Migration Creates

This SQL will create:
- ✅ `registrations` table with all required columns
- ✅ Indexes for better performance (email, country, role, created_at)
- ✅ Automatic `updated_at` timestamp trigger
- ✅ Data validation constraints (country list, role options, etc.)

## Verification Checklist

After running the migration:

- [ ] No errors in SQL Editor
- [ ] "Success" message appears
- [ ] `registrations` table appears in Table Editor
- [ ] Table has columns: id, first_name, last_name, email, date_of_birth, etc.
- [ ] Can see the table structure in Cursor (if connected)

## Troubleshooting

### Error: "relation already exists"
- The table might already exist. This is safe to ignore.
- Or check Table Editor to see if it's already there.

### Error: "permission denied"
- Make sure you're logged in as the project owner/admin
- Or check your database user permissions

### Can't find SQL Editor?
- Look in the left sidebar under "SQL Editor" or "Database"
- Or search for "SQL" in the dashboard

## Direct Link

Quick access to your project SQL Editor:
**https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq/sql/new**

## After Creating the Table

Once the table is created, you can:
1. ✅ Test your registration form - it should work now!
2. ✅ View registrations in Supabase Table Editor
3. ✅ Query data using SQL Editor or Cursor

---

**Need help?** The migration SQL is safe to run multiple times - it uses `IF NOT EXISTS` so it won't cause errors if run again.

