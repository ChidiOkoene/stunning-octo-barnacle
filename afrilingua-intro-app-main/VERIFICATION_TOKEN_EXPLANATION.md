# Why Verification Token is Null for Verified Rows

## Current Behavior

When an email is verified, the `verification_token` is set to `null`. This is **by design** for security reasons.

## Why We Remove the Token

1. **Security**: Once verified, the token is no longer needed and should be removed
2. **Prevent Reuse**: Prevents the same verification link from being used multiple times
3. **Best Practice**: Standard practice in email verification systems

## Current Code

In `src/app/api/verify-email/route.ts`:
```typescript
verification_token: null, // Remove token after verification
```

## If You Want to Keep the Token

If you need to track or audit verification tokens, you have options:

### Option 1: Keep Token but Mark as Used
```sql
-- Add a column to track if token was used
ALTER TABLE registrations 
ADD COLUMN token_used_at TIMESTAMP WITH TIME ZONE;
```

Then update verification:
```typescript
verification_token: verificationToken, // Keep token
token_used_at: new Date().toISOString(), // Mark as used
```

### Option 2: Don't Remove Token
Simply remove the line that sets it to null:
```typescript
// Remove this line:
// verification_token: null,
```

**⚠️ Security Note**: Keeping tokens increases risk if tokens are leaked. Only do this if you have a specific audit requirement.

## Recommendation

**Keep the current behavior** - removing tokens after verification is the secure approach. If you need to track verification history, add a separate `verified_at` timestamp (which we already have).

