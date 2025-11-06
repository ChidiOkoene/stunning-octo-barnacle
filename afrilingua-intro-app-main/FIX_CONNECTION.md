# 🔧 Fix Database Connection - Password Authentication Error

## ❌ The Problem

You're getting: **"password authentication failed for user 'postgres'"**

This means either:
1. The username format is incorrect
2. The password is incorrect
3. You need to use connection pooling instead

## ✅ Solution: Use the Correct Username Format

For Supabase, the username must include your **project reference**:

### Current (Wrong):
- Username: `postgres` ❌

### Correct Format:
- Username: `postgres.cakplxevmeeycaewxfpq` ✅

## Update Your Connection Settings

In your Cursor database connection:

**Change the Username from:**
```
postgres
```

**To:**
```
postgres.cakplxevmeeycaewxfpq
```

Keep everything else the same:
- **Host**: `db.cakplxevmeeycaewxfpq.supabase.co`
- **Port**: `5432`
- **Database**: `postgres`
- **Password**: `uP2aBE*RN=cv!sy`
- **SSL**: Enable/Required

## Alternative: Use Connection Pooling (Recommended)

If the direct connection still doesn't work, try using **connection pooling** which is recommended by Supabase:

### Get Your Pooling Connection String:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq)
2. Navigate to **Settings** → **Database**
3. Scroll to **Connection string** section
4. Select the **URI** tab
5. Look for **Connection Pooling** section (or **Session** mode)
6. Copy the connection string

It should look like:
```
postgresql://postgres.cakplxevmeeycaewxfpq:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres
```

### Use Pooling Connection Settings:

- **Host**: `aws-0-[REGION].pooler.supabase.com` (find your region in Supabase Dashboard → Settings → General)
- **Port**: `6543` (connection pooling port)
- **Database**: `postgres`
- **Username**: `postgres.cakplxevmeeycaewxfpq`
- **Password**: `uP2aBE*RN=cv!sy`
- **SSL**: Enable/Required

## Verify Your Password

If you're still having issues:

1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/cakplxevmeeycaewxfpq)
2. Navigate to **Settings** → **Database**
3. Check **Database password** section
4. If needed, click **Reset database password**
5. Update your connection with the new password

## Quick Fix Summary

**Update your connection settings:**

1. **Username**: Change to `postgres.cakplxevmeeycaewxfpq`
2. Keep everything else the same
3. Test connection

**OR**

1. Get the connection pooling string from Supabase Dashboard
2. Use port `6543` instead of `5432`
3. Use the host from the pooling connection string
4. Username: `postgres.cakplxevmeeycaewxfpq`

## Updated Connection Details

I've updated `.cursor/db-connection.json` with the correct username format (`postgres.cakplxevmeeycaewxfpq`). Try connecting again with this username!

