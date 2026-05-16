# Netlify Deployment Guide - Basin Forms Integration

## Prerequisites

Before deploying to Netlify, ensure you have:

- ✅ Basin account with two forms created (Ticket + Contact)
- ✅ Your Basin basket IDs obtained
- ✅ Git repository set up with changes committed
- ✅ Netlify account (free tier is fine)

---

## Step 1: Add Environment Variables to Netlify

### Via Netlify Dashboard

1. **Go to your site settings**
   - Log in to [Netlify](https://app.netlify.com)
   - Select your RUBC Osizweni site
   - Navigate to: **Build & deploy** → **Environment**

2. **Add the following environment variables:**

| Key | Value |
|-----|-------|
| `VITE_BASIN_ENDPOINT` | `https://basin.glitch.me` |
| `VITE_BASIN_TICKET_ID` | Your ticket basket ID from Basin |
| `VITE_BASIN_CONTACT_ID` | Your contact basket ID from Basin |

3. **Save the variables**

### Via netlify.toml (Recommended)

Create or update `netlify.toml` in your project root:

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[env.production.context]]
variables = { VITE_BASIN_ENDPOINT = "https://basin.glitch.me" }

# Add these via Netlify dashboard:
# VITE_BASIN_TICKET_ID = "your_value"
# VITE_BASIN_CONTACT_ID = "your_value"
```

---

## Step 2: Deploy to Netlify

### Option A: Git Integration (Recommended)

1. **Connect your Git repository** (if not already connected)
   - In Netlify: **Deploys** → **Connect to Git**
   - Select GitHub/GitLab/Bitbucket
   - Select your repository

2. **Deploy**
   ```bash
   git add .
   git commit -m "Integrate Basin Forms API"
   git push origin main
   ```
   Netlify will automatically build and deploy.

### Option B: Manual Deploy (Netlify CLI)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy
netlify deploy --prod

# Or with environment variables
netlify deploy --prod \
  --env VITE_BASIN_ENDPOINT=https://basin.glitch.me \
  --env VITE_BASIN_TICKET_ID=your_ticket_id \
  --env VITE_BASIN_CONTACT_ID=your_contact_id
```

### Option C: Drag & Drop

1. Build locally:
   ```bash
   npm run build
   ```

2. In Netlify Dashboard:
   - Go to **Deploys**
   - Drag the `dist` folder onto the deploy area

---

## Step 3: Verify Deployment

After deployment completes:

### 1. Check Build Logs
- Go to **Deploys** → Latest deploy
- Verify no build errors
- Look for: `✓ Build complete`

### 2. Test Ticket Form
```
1. Open your live site
2. Navigate to /events
3. Click "Register" on Gala Dinner
4. Fill form with test data:
   - Name: "Test User"
   - Email: your@email.com
   - Ticket: General
   - File: Any valid JPG/PNG/PDF
5. Click "Submit Reservation"
6. Check your email for submission
```

### 3. Test Contact Form
```
1. On home page, scroll to "Get in Touch"
2. Fill contact form:
   - First Name: "Test"
   - Last Name: "User"
   - Email: your@email.com
   - Message: "Test message"
3. Click "Send Message"
4. Verify success message appears
5. Check email for submission
```

### 4. Monitor Basin Dashboard
- Log in to [Basin](https://usebasin.com)
- Check recent submissions in both forms
- Verify attachments are included

---

## Step 4: Post-Deployment Configuration

### Configure Email Recipient

If you want to change the email recipient from `rubcosizweni.office@gmail.com`:

**Option 1: Update in code** (recommended for version control)
- Edit [src/lib/basinService.ts](src/lib/basinService.ts)
- Find lines with `_email` field
- Update email address
- Commit and push

**Option 2: Configure in Basin Dashboard**
- Go to Basin form settings
- Set email recipient
- Changes apply to all future submissions

### Enable Email Notifications

In your Netlify site settings, you can enable notifications:
- **Build notifications**: Get alerts on deploy success/failure
- **Form notifications**: (if using Netlify Forms)

---

## Troubleshooting

### Issue: Form submissions fail on production

**Causes & Solutions**:
1. **Environment variables not set**
   - Check Netlify Dashboard → Build & deploy → Environment
   - Verify variables are visible in build logs
   - Solution: Re-add environment variables

2. **Basket IDs incorrect**
   - Verify in Basin dashboard
   - Double-check for typos
   - Solution: Update environment variables

3. **CORS issues**
   - Basin has CORS enabled by default
   - Check browser console for errors
   - Solution: Contact Basin support if persistent

### Issue: Emails not received

**Causes & Solutions**:
1. **Wrong email recipient**
   - Check form configuration
   - Solution: Update `_email` field in basinService.ts

2. **Email filters**
   - Check spam/junk folder
   - Solution: Add Basin to safe senders

3. **Basin service down**
   - Check [Basin status page](https://status.usebasin.com)
   - Solution: Wait for service recovery

### Issue: Files not attached

**Causes & Solutions**:
1. **File validation failed**
   - Check file format (JPG, PNG, GIF, PDF only)
   - Check file size (max 25MB)
   - Solution: Browser console shows specific error

2. **File upload didn't complete**
   - Check network connection
   - Solution: Retry upload

---

## Build Logs Reference

### Successful Build
```
┌─────────────────────┐
│   Build complete    │
└─────────────────────┘

Build output path: dist
VITE_BASIN_ENDPOINT: https://basin.glitch.me
VITE_BASIN_TICKET_ID: ••••••••••••••••
VITE_BASIN_CONTACT_ID: ••••••••••••••••

✓ Successfully deployed
```

### Failed Build (Common Issues)
```
✖ Build failed: Missing environment variables
✖ Environment variable VITE_BASIN_TICKET_ID is not set
```

---

## Rollback Plan

If you need to revert to previous integration:

### 1. Revert Code Changes
```bash
git revert <commit-hash>
git push origin main
```

### 2. Netlify will automatically redeploy
The previous version will be restored.

---

## Performance Monitoring

### Check Site Performance
1. In Netlify Dashboard → **Analytics**
2. Monitor:
   - Deploy frequency
   - Build duration
   - Success rate

### Monitor Form Submissions
1. In Basin Dashboard:
   - View recent submissions
   - Check submission success rate
   - Download submission data

---

## Advanced: Custom Domain & SSL

If using a custom domain:

1. **Set up custom domain**
   - In Netlify: **Domain settings**
   - Add your domain (e.g., rubcosizweni.org)
   - Configure DNS records

2. **SSL Certificate** (automatic)
   - Netlify provides free SSL via Let's Encrypt
   - Certificate renews automatically

---

## Maintenance

### Regular Checks
- [ ] Monitor Netlify build logs weekly
- [ ] Check Basin dashboard for form submissions
- [ ] Verify emails are being received
- [ ] Test forms monthly

### Updates
- When Basin changes API, update environment variables
- Monitor Basin status page for announcements
- Keep dependencies updated: `npm update`

---

## Support & Resources

**Netlify Support**:
- [Netlify Documentation](https://docs.netlify.com)
- [Netlify Community](https://community.netlify.com)
- Email: support@netlify.com

**Basin Support**:
- [Basin Documentation](https://usebasin.com)
- [Basin Status](https://status.usebasin.com)
- Email: support@usebasin.com

**Your Site**:
- Live URL: https://your-domain.netlify.app
- Admin: https://app.netlify.com/sites/your-site

---

## Deployment Checklist

Before going live:

- [ ] Basin account created and verified
- [ ] Two forms configured (Ticket + Contact)
- [ ] Basket IDs obtained and verified
- [ ] Netlify environment variables added
- [ ] Build succeeds without errors
- [ ] Ticket form tested with file upload
- [ ] Contact form tested
- [ ] Emails received at correct address
- [ ] File attachments included in emails
- [ ] Error handling working (try invalid file)
- [ ] Success messages display correctly
- [ ] Mobile responsiveness verified
- [ ] Form validation working

---

**Status**: ✅ Ready for Production  
**Last Updated**: May 16, 2026  
**Contact**: rubcosizweni.office@gmail.com
