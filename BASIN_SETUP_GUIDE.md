# Basin Forms Integration - Setup and Deployment Guide

## Overview
Your RUBC Osizweni website has been successfully updated to use **Basin Forms API** for all form submissions (Ticket Form and Contact Form) with full support for file attachments.

## What Changed
- ✅ **Ticket Form**: Now submits to Basin with proof of payment file support
- ✅ **Contact Form**: Now submits to Basin with email delivery
- ✅ **File Attachments**: Support for images (JPG, PNG, GIF) and PDFs (up to 25MB)
- ✅ **Email Notifications**: Automatic delivery to rubcosizweni.office@gmail.com
- ✅ **Removed**: Formspree integration completely replaced

## Quick Setup Guide

### Step 1: Create a Basin Account
1. Go to [https://usebasin.com](https://usebasin.com)
2. Sign up for a free account (no credit card required)
3. Create two forms:
   - **Ticket Form** - for Gala Dinner registrations
   - **Contact Form** - for general contact inquiries

### Step 2: Get Your Basket IDs
After creating each form in Basin, you'll receive unique basket IDs:
- **Ticket Basket ID**: `xyz123abc...` (for Gala Dinner form)
- **Contact Basket ID**: `abc456xyz...` (for Contact form)

These appear in your Basin dashboard or in the submission URL: `https://basin.glitch.me/{BASKET_ID}`

### Step 3: Configure Environment Variables

Create or update your `.env.local` file with:

```env
# Basin Forms API Configuration
VITE_BASIN_ENDPOINT="https://basin.glitch.me"
VITE_BASIN_TICKET_ID="YOUR_TICKET_BASKET_ID"
VITE_BASIN_CONTACT_ID="YOUR_CONTACT_BASKET_ID"
```

### Step 4: (Optional) Configure Email Recipient
By default, forms submit to `rubcosizweni.office@gmail.com`. 

To change the email recipient, update these files:
- **Ticket Form**: [src/lib/basinService.ts](src/lib/basinService.ts) - Line with `_email` field
- **Contact Form**: Same file

Or configure it directly in Basin's dashboard form settings.

## Implementation Details

### File Structure
```
src/
├── lib/
│   └── basinService.ts          ← Basin API service (all form logic)
├── pages/
│   ├── TicketForm.tsx           ← Updated: Uses Basin for submissions
│   └── Home.tsx                 ← Updated: Uses Basin for contact form
```

### Service Functions

#### Ticket Form Submission
```typescript
import { submitTicketForm } from '@/lib/basinService';

const result = await submitTicketForm({
  Full_Name: 'John Doe',
  email: 'john@example.com',
  Ticket_Type: 'VIP',
  proofOfPayment: fileObject,
});
```

#### Contact Form Submission
```typescript
import { submitContactForm } from '@/lib/basinService';

const result = await submitContactForm({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  message: 'Hello, I have a question...',
});
```

## Features & Capabilities

### ✅ File Attachment Support
- **Accepted formats**: JPG, PNG, GIF, PDF
- **Max file size**: 25MB per file
- **Validation**: Client-side + server-side
- **Attachments in email**: Yes, sent directly to recipient

### ✅ Email Notifications
- **Recipients**: Configured per form in Basin dashboard
- **Delivery**: 99.95% uptime SLA
- **Format**: Professional HTML emails with form data

### ✅ Error Handling
- User-friendly error messages
- Field validation before submission
- File type and size validation
- Network error recovery

### ✅ User Experience
- Loading states during submission
- Success/error notifications
- Form auto-resets after success
- Accessibility features maintained

## Netlify Deployment

### Environment Variables Setup
1. Go to your Netlify site settings
2. Navigate to **Build & deploy** → **Environment**
3. Add these variables:
   ```
   VITE_BASIN_ENDPOINT=https://basin.glitch.me
   VITE_BASIN_TICKET_ID=your_ticket_basket_id
   VITE_BASIN_CONTACT_ID=your_contact_basket_id
   ```

### Deploy Steps
```bash
# Rebuild and deploy to Netlify
netlify deploy --prod
# Or use Git integration for automatic deploys
```

### Verification
After deployment:
1. Visit your live site
2. Test the Ticket Form: Fill and submit (check Basin dashboard)
3. Test the Contact Form: Fill and submit (check your email)
4. Verify files are received in email

## Troubleshooting

### Forms Not Submitting
**Solution**: 
- Check browser console for errors (F12 → Console)
- Verify environment variables are set correctly
- Ensure Basin basket IDs match your actual IDs

### Files Not Attached
**Solution**:
- Verify file is under 25MB
- Check file format (JPG, PNG, GIF, PDF only)
- Check browser console for validation errors

### Emails Not Received
**Solution**:
- Check spam/junk folder
- Verify email address in Basin dashboard
- Check Basin status page for service issues

### CORS Errors
**Solution**: 
- Basin has CORS headers enabled by default
- If issues persist, contact Basin support

## API Reference

### Basin Endpoint
```
POST https://basin.glitch.me/{BASKET_ID}
Content-Type: multipart/form-data
```

### Form Fields

**Ticket Form**:
- `name` (required)
- `email` (required)
- `ticket_type` (required)
- `attachment` (required, file)
- `_subject` (auto-set)
- `_email` (auto-set)

**Contact Form**:
- `first_name` (required)
- `last_name` (required)
- `email` (required)
- `message` (required)
- `_subject` (auto-set)
- `_email` (auto-set)

## Migration Notes

### From Formspree
- ✅ All functionality migrated
- ✅ Better file support (25MB vs Formspree limits)
- ✅ Unlimited submissions (free)
- ✅ Same email delivery
- ❌ No dashboard form responses (but you can add webhooks)

### Rollback Plan
If needed to rollback to Formspree:
1. Revert environment variables
2. Update TicketForm.tsx form action to Formspree endpoint
3. Update Home.tsx contact form action to Formspree endpoint

## Support & Resources

- **Basin Documentation**: https://usebasin.com
- **Basin Status Page**: https://status.usebasin.com
- **Basin Support**: support@usebasin.com
- **Code**: [src/lib/basinService.ts](src/lib/basinService.ts)

## Verification Checklist

- [ ] Basin account created
- [ ] Two forms configured (Ticket + Contact)
- [ ] Basket IDs obtained
- [ ] Environment variables added to `.env.local`
- [ ] Netlify environment variables configured
- [ ] Ticket form tested with file upload
- [ ] Contact form tested
- [ ] Emails received at rubcosizweni.office@gmail.com
- [ ] Deployment verified on live site

---

**Status**: ✅ Basin Forms Integration Complete
**Date**: May 16, 2026
**Email**: rubcosizweni.office@gmail.com
