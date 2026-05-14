# Form Submission Integration with Form Submit API

## Overview
This document describes the Form Submission setup using **Form Submit API** (formsubmit.co) - a free service for receiving form submissions via email with file attachment support.

## Features
- ✅ **Free Tier**: Up to 50 submissions per month per email
- ✅ **File Attachments**: Support for images and PDF files
- ✅ **No Backend Required**: Submissions sent directly to email
- ✅ **Easy Setup**: No API keys or complex configuration
- ✅ **Automatic Spam Protection**: Optional CAPTCHA
- ✅ **Custom Redirects**: Redirect to success pages after submission

## Form Endpoints

### 1. Contact Form (Home Page)
**Location**: `/src/pages/Home.tsx`
**Email Recipient**: `rubcosizweni.office@gmail.com`
**API Endpoint**: `https://formsubmit.co/rubcosizweni.office@gmail.com`

**Fields**:
- First Name (required)
- Last Name (required)
- Email (required)
- Message (required)

**On Submission**:
- Email sent to: `rubcosizweni.office@gmail.com`
- Subject: "New Contact Form Submission - Rise-Up Bible Church"
- User redirected to: Home page with `contact_success=true` query param

### 2. Ticket Registration Form (Events Page)
**Location**: `/src/pages/TicketForm.tsx`
**Email Recipient**: `rubcosizweni.office@gmail.com`
**API Endpoint**: `https://formsubmit.co/rubcosizweni.office@gmail.com`

**Fields**:
- Full Name (required)
- Email (required)
- Ticket Type: General (R250) / VIP (R500) / VVIP (R750) (required)
- Proof of Payment File (required) - Image or PDF

**On Submission**:
- Email sent to: `rubcosizweni.office@gmail.com`
- Subject: "New Gala Dinner Ticket Registration"
- Attachment: Proof of payment file
- User redirected to: Events page after 2 seconds

## Environment Variables

Add to `.env.local`:
```env
# Form Submit API Configuration
VITE_FORM_SUBMIT_EMAIL="rubcosizweni.office@gmail.com"
VITE_FORM_SUBMIT_ENDPOINT="https://formsubmit.co/rubcosizweni.office@gmail.com"
```

## Email Details

### From Address
Form Submit API sends emails from the email address associated with your Form Submit API account.

### To Address
All submissions are routed to: **rubcosizweni.office@gmail.com**

### Email Format
Emails include:
- All form fields with labels
- File attachments
- Submission timestamp
- Sender's email address for easy reply

## Important Notes

### Form Submit API Limitations (Free Tier)
- Maximum 50 submissions per month per email
- No CAPTCHA by default (can be enabled)
- Limited custom styling/templates
- Submissions stored only in your email inbox

### Upgrading Beyond Free Tier
If you exceed 50 submissions/month, consider:
1. Premium Form Submit API subscription
2. Alternative services like:
   - Formspree (Free tier: 50/month)
   - Basin (Free tier: unlimited)
   - Netlify Forms (included with Netlify hosting)
   - Custom backend solution with nodemailer

## Troubleshooting

### Forms not receiving emails?
1. Check email address is correct in `.env.local`
2. Check spam/junk folder
3. Verify network connection when testing locally
4. Form Submit API may have rate limiting - wait and retry

### File uploads not working?
1. Ensure file size is reasonable (< 25MB recommended)
2. Check file format is supported (images, PDF)
3. Verify browser allows form file uploads
4. Check network connection during upload

### Success redirect not working?
1. Ensure browser JavaScript is enabled
2. Check browser console for errors
3. Verify redirect URL is valid

## Migration from Previous Setup

### Previous Setup
- Netlify Functions: `/netlify/functions/submit-contact.ts` and `submit-ticket.ts`
- Email: Sent via nodemailer (Gmail SMTP)
- Database: Netlify Blobs & Drizzle ORM

### New Setup
- Forms: Direct submission to Form Submit API
- Email: Automatic via formsubmit.co
- Database: Optional (use Netlify functions separately if needed)

### Netlify Functions Status
The existing Netlify functions are **no longer used** for primary form submission:
- `/netlify/functions/submit-contact.ts` - Deprecated (can be archived)
- `/netlify/functions/submit-ticket.ts` - Deprecated (can be archived)

If you need to preserve database storage functionality, you can:
1. Keep the functions and create additional client-side calls
2. Use Form Submit API's alternative endpoints if available
3. Implement a separate data collection layer

## Testing the Integration

### Test Contact Form
1. Go to Home page
2. Scroll to "Get in Touch" section
3. Fill in all required fields
4. Click "Send Message"
5. You should be redirected to confirmation page
6. Check `rubcosizweni.office@gmail.com` for the email

### Test Ticket Form
1. Go to Events page
2. Click "Register" for Gala Dinner event
3. Fill in all required fields including ticket type
4. Upload proof of payment (use any image/PDF)
5. Click "Submit Reservation"
6. You should be redirected after 2 seconds
7. Check `rubcosizweni.office@gmail.com` for email with attachment

## Support & Documentation

- **Form Submit API Docs**: https://formsubmit.co/
- **formsubmit.co Features**: https://formsubmit.co/
- **Free Tier Limits**: 50 submissions/month

## Next Steps

1. ✅ Environment variables configured
2. ✅ Contact form integrated
3. ✅ Ticket form integrated
4. ⬜ Test forms in production
5. ⬜ Monitor email submissions
6. ⬜ Consider upgrading if submission volume exceeds 50/month

---

**Last Updated**: May 14, 2026
**Status**: Active - Form Submit API integration complete
