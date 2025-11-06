# Connecting to Supabase Database in Cursor

## Step 1: Get Your Database Connection String

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings** → **Database**
4. Scroll down to **Connection string** section
5. Select **URI** format (not JDBC or other formats)
6. You'll see something like:
   ```
   postgresql://postgres.[PROJECT-REF]:[YOUR-PASSWORD]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```
7. **Important**: You'll need to replace `[YOUR-PASSWORD]` with your actual database password
   - This is the password you set when creating the project
   - If you forgot it, go to **Settings** → **Database** → **Database password** to reset it

## Step 2: Connect in Cursor

Cursor supports database connections through the built-in database explorer. Here's how:

### Option A: Using Cursor's Database Panel

1. **Open Database Panel**:
   - Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
   - Type "Database: Connect" or look for the database icon in the sidebar

2. **Add New Connection**:
   - Click the "+" icon or "Add Connection"
   - Select **PostgreSQL** as the database type

3. **Enter Connection Details**:
   - **Host**: Extract from connection string (e.g., `aws-0-[region].pooler.supabase.com`)
   - **Port**: `6543` (for connection pooling) or `5432` (direct)
   - **Database**: `postgres`
   - **Username**: `postgres.[PROJECT-REF]` (from your connection string)
   - **Password**: Your database password
   - **Connection Name**: `Supabase - AFRILingua` (or any name you prefer)

4. **Test Connection**:
   - Click "Test Connection" to verify
   - If successful, click "Connect"

### Option B: Using VS Code Database Extensions (if available)

If Cursor supports VS Code extensions, you can use:
- **PostgreSQL** extension by Chris Kolkman
- **SQLTools** extension by Matheus Teixeira

### Option C: Direct Connection String

Some database extensions support direct connection strings. Use the URI format from Supabase.

## Alternative: Connection Pooling

For better performance, Supabase recommends using connection pooling:

**Connection Pooling (recommended)**:
- Port: `6543`
- Use `?pgbouncer=true` in connection string

**Direct Connection**:
- Port: `5432` 
- No pooling, direct to database

## Security Note

⚠️ **Never commit your database password to git!**
- Use Cursor's secure credential storage
- Or store it in `.env.local` (already gitignored)

## Finding Your Connection Details

Your Supabase connection details:
- **Project URL**: `https://cakplxevmeeycaewxfpq.supabase.co`
- **Project Ref**: `cakplxevmeeycaewxfpq` (from your URL)
- **Region**: Check in Supabase Dashboard → Settings → General

The connection string format will be:
```
postgresql://postgres.cakplxevmeeycaewxfpq:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

## What You'll Need

- ✅ Database password (set when creating the project)
- ✅ Region (check in Supabase Dashboard)
- ✅ Project reference: `cakplxevmeeycaewxfpq`

Once connected, you'll be able to:
- Browse tables and schemas
- Run SQL queries directly in Cursor
- View and edit data
- See the `registrations` table structure

