# Database Connection Guide

This guide explains how to connect to your Supabase database locally.

## Option 1: Connect to Cloud Supabase Database (Recommended)

Your app is already configured to connect to your cloud Supabase database via `.env.local`.

### Step 1: Run the Database Migration

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **SQL Editor** in the left sidebar
4. Click **New Query**
5. Copy the entire contents of `supabase/migrations/001_create_registrations_table.sql`
6. Paste it into the SQL Editor
7. Click **Run** (or press `Ctrl+Enter`)
8. You should see "Success. No rows returned"

### Step 2: Verify the Connection

Run the test script to verify your database connection:

```bash
npm run test:db
```

This will:
- ✅ Check if your credentials are configured
- ✅ Verify connection to Supabase
- ✅ Check if the registrations table exists
- ✅ Test query permissions

### Step 3: View Your Database

You can view and manage your database in several ways:

#### Using Supabase Dashboard (Easiest)
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Navigate to **Table Editor** to view/edit data
3. Use **SQL Editor** to run queries

#### Using Cursor's Database Connection (Recommended)
See `.cursor/database-connection.md` for detailed instructions on connecting to your Supabase database directly in Cursor.

**Quick Steps:**
1. Go to Supabase Dashboard → **Settings** → **Database**
2. Copy the **URI** connection string
3. In Cursor, open the Database panel (`Ctrl+Shift+P` → "Database: Connect")
4. Select PostgreSQL and enter your connection details
5. Use port `6543` for connection pooling (recommended)

#### Using Other Database Clients
1. In Supabase Dashboard, go to **Settings** → **Database**
2. Find the **Connection string** section
3. Copy the connection string (use the `URI` format)
4. Connect using a PostgreSQL client like:
   - **pgAdmin**
   - **DBeaver**
   - **TablePlus**
   - **VS Code PostgreSQL extension**

## Option 2: Run Supabase Locally (Advanced)

If you want a fully local Supabase instance for development:

### Prerequisites
- Docker Desktop installed and running
- Supabase CLI installed

### Setup Local Supabase

1. **Install Supabase CLI:**
   ```bash
   # Using npm
   npm install -g supabase

   # Or using Scoop (Windows)
   scoop bucket add supabase https://github.com/supabase/scoop-bucket.git
   scoop install supabase
   ```

2. **Initialize Supabase in your project:**
   ```bash
   supabase init
   ```

3. **Start local Supabase:**
   ```bash
   supabase start
   ```
   
   This will start:
   - PostgreSQL database on `localhost:54322`
   - Supabase API on `localhost:54321`
   - Supabase Studio on `localhost:54323`

4. **Link to your project (optional):**
   ```bash
   supabase link --project-ref your-project-ref
   ```

5. **Create a local `.env.local`:**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0
   ```
   
   (The anon key above is the default local development key)

6. **Run migrations locally:**
   ```bash
   supabase db reset
   ```
   
   Or manually:
   ```bash
   psql postgresql://postgres:postgres@localhost:54322/postgres < supabase/migrations/001_create_registrations_table.sql
   ```

## Troubleshooting

### Connection Issues

1. **Check `.env.local` exists and has correct values:**
   ```bash
   cat .env.local
   ```

2. **Verify credentials in Supabase Dashboard:**
   - Settings → API → Project URL
   - Settings → API → anon public key

3. **Test connection:**
   ```bash
   npm run test:db
   ```

### Migration Issues

- If the table already exists, the migration will skip creation (safe to run again)
- Check the SQL Editor in Supabase Dashboard for any error messages
- Ensure you have the correct database permissions

### RLS (Row Level Security) Issues

If queries are blocked:
1. Go to **Authentication** → **Policies** in Supabase Dashboard
2. Set up appropriate RLS policies for the `registrations` table
3. For development, you can temporarily disable RLS (not recommended for production)

## Next Steps

Once connected:
- ✅ Test the registration form in your app
- ✅ Check the Table Editor in Supabase Dashboard to see new registrations
- ✅ Set up proper RLS policies for production
- ✅ Consider setting up database backups

