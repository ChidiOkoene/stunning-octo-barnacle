# Quick Guide: Connect Supabase Database in Cursor

## Your Supabase Project Details
- **Project URL**: `https://cakplxevmeeycaewxfpq.supabase.co`
- **Project Reference**: `cakplxevmeeycaewxfpq`

## Steps to Connect

### 1. Get Your Database Password
1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq)
2. Navigate to **Settings** → **Database**
3. If you need to reset/retrieve your password:
   - Click **Reset database password** if needed
   - Save this password securely (you'll need it)

### 2. Get Connection String
1. In **Settings** → **Database**, scroll to **Connection string**
2. Select **URI** tab
3. Copy the connection string - it will look like:
   ```
   postgresql://postgres.cakplxevmeeycaewxfpq:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
   ```

### 3. Connect in Cursor

**Method 1: Using Cursor's Database Panel**
1. Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
2. Type "database" or look for database icon in sidebar
3. Click "Add Connection" or "+" button
4. Select **PostgreSQL**
5. Fill in:
   - **Connection Name**: `AFRILingua Supabase`
   - **Host**: Extract from connection string (the domain part)
   - **Port**: `6543` (or `5432` for direct connection)
   - **Database**: `postgres`
   - **Username**: `postgres.cakplxevmeeycaewxfpq`
   - **Password**: Your database password
   - **SSL**: Enable/Check this

**Method 2: Using Connection String Directly**
1. Some Cursor database extensions accept direct connection strings
2. Paste the full URI from Supabase
3. Replace `[PASSWORD]` with your actual password

### 4. Find Your Region
To get the exact host address:
1. In Supabase Dashboard → **Settings** → **General**
2. Check the **Region** field
3. The host will be: `aws-0-[region].pooler.supabase.com`
   - Example: `aws-0-us-east-1.pooler.supabase.com`

## Connection Details Summary

**For Connection Pooling (Recommended)**:
- Host: `aws-0-[YOUR-REGION].pooler.supabase.com`
- Port: `6543`
- Database: `postgres`
- Username: `postgres.cakplxevmeeycaewxfpq`
- Password: [Your database password]
- SSL: Required

**For Direct Connection**:
- Host: `db.cakplxevmeeycaewxfpq.supabase.co`
- Port: `5432`
- Database: `postgres`
- Username: `postgres.cakplxevmeeycaewxfpq`
- Password: [Your database password]
- SSL: Required

## After Connecting

Once connected, you should be able to:
- ✅ Browse the `registrations` table
- ✅ Run SQL queries
- ✅ View table structure
- ✅ See data in your database

## Troubleshooting

**Can't find Database Panel in Cursor?**
- Try installing a PostgreSQL extension:
  - Press `Ctrl+Shift+X` to open Extensions
  - Search for "PostgreSQL" or "SQLTools"
  - Install a popular extension like "SQLTools" with PostgreSQL driver

**Connection fails?**
- Double-check your password
- Ensure SSL is enabled
- Try port `5432` (direct) instead of `6543` (pooling)
- Verify your region is correct

**Need help finding settings?**
- Your Supabase Dashboard: https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq/settings/database

