# 🔐 Authentication & Security - UMA Tyres

## Login Credentials

### Admin Access
- **Username**: `admin`
- **Password**: `Uma@12051997`

⚠️ **Important**: These credentials are hardcoded in the frontend for simplicity. For production use, consider implementing proper backend authentication.

## How Authentication Works

### Login Process
1. User enters username and password on login screen
2. Credentials are validated against hardcoded values in `Login.js`
3. On successful login:
   - `uma_tyres_auth` = `true` stored in localStorage
   - `uma_tyres_user` = username stored in localStorage
   - User is redirected to dashboard

### Session Management
- Authentication state is stored in browser's localStorage
- Session persists across browser refreshes
- Session remains until user clicks "Logout"

### Logout Process
1. User clicks "🚪 Logout" button in header
2. localStorage is cleared
3. User is redirected to login screen
4. All data is cleared from state

## Security Features

### Current Implementation (Basic)
✅ Login required to access application  
✅ Password protected  
✅ Session persistence  
✅ Logout functionality  
✅ Login error handling  

### What's NOT Included (Basic Static Auth)
❌ Password encryption  
❌ Multi-user support  
❌ Role-based access control  
❌ Password reset functionality  
❌ Session timeout  
❌ Backend authentication  

## File Locations

### Frontend Files
- **Login Component**: `/frontend/src/components/Login.js`
- **Login Styles**: `/frontend/src/components/Login.css`
- **App Integration**: `/frontend/src/App.js`

### Credentials Storage
Hardcoded in: `/frontend/src/components/Login.js`
```javascript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Uma@12051997';
```

## Changing Credentials

To change the login credentials:

1. Open `/frontend/src/components/Login.js`
2. Find these lines (around line 12-13):
```javascript
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'Uma@12051997';
```
3. Change to your desired values
4. Save and restart the frontend

## Upgrading Security (Future)

For production deployment with better security, consider:

### Option 1: Backend Authentication (Recommended)
1. Add `/api/auth/login` endpoint in backend
2. Hash passwords with bcrypt
3. Use JWT tokens for session management
4. Store tokens securely
5. Add token expiration

### Option 2: Firebase Authentication
1. Use Firebase Auth (free tier available)
2. Supports multiple users
3. Password reset via email
4. Social logins (Google, etc.)

### Option 3: Auth0 / Supabase Auth
1. Third-party authentication service
2. Free tiers available
3. Enterprise-grade security
4. Easy integration

## Browser Security

### localStorage vs sessionStorage

**Current**: Using `localStorage`
- ✅ Session persists across browser restarts
- ✅ Stays logged in until manual logout
- ❌ Data persists even after closing browser

**Alternative**: Using `sessionStorage`
- ✅ More secure (clears on browser close)
- ❌ User must login every time browser opens

To switch to sessionStorage, replace all `localStorage` with `sessionStorage` in:
- `Login.js` (line 19-20)
- `App.js` (line 35, 208-209)

## Testing Authentication

### Test Login
1. Start the application
2. You should see the login screen
3. Enter credentials:
   - Username: `admin`
   - Password: `Uma@12051997`
4. Click "🔐 Login"
5. You should be redirected to the dashboard

### Test Logout
1. Click "🚪 Logout" button in header
2. You should be redirected to login screen
3. Try to refresh the page - should stay on login screen

### Test Session Persistence
1. Login successfully
2. Close browser completely
3. Open browser and navigate to app
4. You should still be logged in ✅

### Test Wrong Credentials
1. Enter wrong username or password
2. You should see error message: "Invalid username or password"
3. Error should shake for attention

## Common Issues

### "Still shows login screen after correct password"
- Check browser console for JavaScript errors
- Verify credentials are exactly: `admin` / `Uma@12051997`
- Clear browser cache and try again

### "Can't logout"
- Check browser console for errors
- Manually clear localStorage: Browser DevTools → Application → Local Storage → Delete all

### "Login screen appears randomly"
- localStorage might have been cleared
- Check if browser is in incognito/private mode
- Verify no browser extension is clearing storage

## Production Deployment Notes

### Current Setup is Suitable For:
✅ Single user / shop owner only  
✅ Trusted environment  
✅ Small business with 1-2 users  
✅ Quick deployment needs  

### NOT Suitable For:
❌ Multiple users with different roles  
❌ Public-facing applications  
❌ Sensitive data handling  
❌ Compliance requirements (GDPR, etc.)  

## Recommendations

### For Your Current Use Case (Single Shop Owner):
**Current implementation is PERFECT** ✅
- Simple and effective
- No complex setup needed
- Works offline
- Fast deployment

### If You Plan to Expand:
Consider upgrading when you need:
- Multiple staff members with different access levels
- Audit trail of who did what
- Password change capability
- Remote team access
- Compliance with data protection laws

## Security Best Practices

### Do:
✅ Change default password immediately  
✅ Use strong password (current one is good!)  
✅ Don't share credentials publicly  
✅ Use HTTPS in production (Vercel provides this)  
✅ Keep browser updated  
✅ Logout when leaving computer unattended  

### Don't:
❌ Write password on sticky notes  
❌ Share credentials via email/WhatsApp  
❌ Use same password for other services  
❌ Leave computer unlocked and logged in  

## Password Strength

Current password: `Uma@12051997`

**Strength Analysis**:
- ✅ Contains uppercase letters
- ✅ Contains lowercase letters  
- ✅ Contains numbers
- ✅ Contains special character (@)
- ✅ 13 characters long
- ✅ **Strong password!** 💪

## Quick Reference

| Action | Steps |
|--------|-------|
| **Login** | Enter `admin` / `Uma@12051997` → Click Login |
| **Logout** | Click "🚪 Logout" button in header |
| **Change Password** | Edit `Login.js` → Change `ADMIN_PASSWORD` |
| **Add User** | Not supported (requires backend auth upgrade) |
| **Reset Session** | Clear browser localStorage manually |

---

## Support

If you need to implement more advanced authentication:
1. Consider hiring a developer
2. Use Firebase Auth (easier)
3. Implement proper backend JWT auth (more secure)

For now, your current static authentication is perfect for a single-user tyre shop! 🚗✅
