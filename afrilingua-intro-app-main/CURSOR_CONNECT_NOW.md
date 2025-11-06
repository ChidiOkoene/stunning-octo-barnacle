# ✅ Connect to Your Database in Cursor - Ready to Use!

## Your Connection is Configured

I've created a connection configuration file with your database credentials at `.cursor/db-connection.json`

## How to Connect in Cursor

### Method 1: Using SQLTools Extension (Recommended)

1. **Install SQLTools Extension**:
   - Press `Ctrl+Shift+X` to open Extensions
   - Search for "SQLTools"
   - Install "SQLTools" by Matheus Teixeira
   - Install "SQLTools PostgreSQL/Redshift" driver

2. **Add Connection**:
   - Click the SQLTools icon in the sidebar (or `Ctrl+Shift+P` → "SQLTools: Add New Connection")
   - Select "PostgreSQL"
   - Or use the connection file I created:
     - Open `.cursor/db-connection.json`
     - Copy the connection details
     - Paste them into SQLTools connection form

3. **Connection Settings**:
   - **Name**: `Supabase - AFRILingua`
   - **Server**: `db.cakplxevmeeycaewxfpq.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: `uP2aBE*RN=cv!sy`
   - **SSL**: Enable/Required

4. **Test & Connect**:
   - Click "Test Connection"
   - If successful, click "Save Connection"
   - Your connection should now appear in the SQLTools sidebar

### Method 2: Using Connection String Directly

Some extensions support direct connection strings:
```
postgresql://postgres:uP2aBE*RN=cv!sy@db.cakplxevmeeycaewxfpq.supabase.co:5432/postgres
```

### Method 3: Manual Configuration

If Cursor has a built-in database panel:
1. Open Database panel (`Ctrl+Shift+P` → "Database: Connect")
2. Add new PostgreSQL connection with these details:
   - **Host**: `db.cakplxevmeeycaewxfpq.supabase.co`
   - **Port**: `5432`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: `uP2aBE*RN=cv!sy`
   - **SSL**: Required

## After Connecting

Once connected, you can:
- ✅ Browse the `registrations` table
- ✅ Run SQL queries directly in Cursor
- ✅ View and edit data
- ✅ See table structure and indexes

## Try This Query

After connecting, try running this to see your registrations table:

```sql
SELECT * FROM registrations LIMIT 10;
```

Or check if the table exists:

```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name = 'registrations';
```

## ⚠️ Security Reminder

- ✅ The connection file `.cursor/db-connection.json` is already added to `.gitignore`
- ✅ Never commit your database password to git
- ✅ Keep this file secure on your local machine

## Troubleshooting

**Extension not found?**
- Make sure you're using Cursor (which supports VS Code extensions)
- Try searching for "PostgreSQL" instead
- Alternative: Use "Database Client" extension

**Connection fails?**
- Verify SSL is enabled
- Check your internet connection
- Ensure Supabase project is active (not paused)

**Need to change password?**
- Update the password in `.cursor/db-connection.json`
- Or change it in Supabase Dashboard → Settings → Database

