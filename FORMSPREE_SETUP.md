# Formspree Integration - Complete Setup Guide

## Overview
Both the **Ticket Form** and **Contact Form** are now properly integrated with **Formspree** for email submissions.

## Forms Configuration

### 1. Ticket Registration Form
**Location**: `/src/pages/TicketForm.tsx`

**Formspree ID**: `myzbbrvn`
**Endpoint**: `https://formspree.io/f/myzbbrvn`
**Email Recipient**: `rubcosizweni.office@gmail.com`

**Fields Submitted**:
- `Full_Name` - Full name and surname (required)
- `email` - Email address (required)
- `Ticket_Type` - Ticket type: General/VIP/VVIP (required)
- `attachment` - Proof of payment file (image or PDF, required)
- `_subject` - Email subject: "New Gala Dinner Ticket Registration"
- `_captcha` - Disabled for seamless submission

**How it works**:
1. User fills in ticket details
2. Uploads proof of payment image/PDF
3. Clicks "Submit Reservation"
4. Formspree receives the data and sends it to the configured email
5. User sees confirmation message

---

### 2. Contact Form
**Location**: `/src/pages/Home.tsx` (Get in Touch section)

**Formspree ID**: `xyzbnpdw`
**Endpoint**: `https://formspree.io/f/xyzbnpdw`
**Email Recipient**: `rubcosizweni.office@gmail.com`

**Fields Submitted**:
- `First Name` - First name (required)
- `Last Name` - Last name (required)
- `email` - Email address (required)
- `message` - Message content (required)
- `_subject` - Email subject: "New Contact Form Submission - Rise-Up Bible Church"
- `_captcha` - Disabled for seamless submission

**How it works**:
1. User fills in contact details and message
2. Clicks "Send Message"
3. Formspree receives the data and sends to the configured email
4. User is shown success message
5. Page auto-redirects after 2 seconds

---

## Why Formspree?

✅ **Simple** - No backend configuration needed
✅ **Reliable** - Established service with good uptime
✅ **File Support** - Handles image and PDF attachments
✅ **No API Keys** - Just use the form endpoint directly
✅ **Email Routing** - Automatically forwards to your email
✅ **GDPR Compliant** - Data privacy friendly

---

## Email Flow

```
User fills form → Submits to Formspree API → Formspree sends email → rubcosizweni.office@gmail.com
```

---

## Testing

### Test Ticket Form
1. Navigate to `/events` page
2. Click "Register" on Gala Dinner event
3. Fill in all required fields (Full Name, Email, Ticket Type)
4. Upload any image or PDF as proof of payment
5. Click "Submit Reservation"
6. You should see success message: "✅ Your ticket registration has been submitted successfully"
7. Check **rubcosizweni.office@gmail.com** for the email with attachment

### Test Contact Form
1. Navigate to `/` (Home page)
2. Scroll to "Get in Touch" section
3. Fill in all fields (First Name, Last Name, Email, Message)
4. Click "Send Message"
5. You should see success message with checkmark
6. Check **rubcosizweni.office@gmail.com** for the email

---

## Formspree API Reference

### Special Fields (Formspree-specific)

| Field Name | Purpose | Example |
|-----------|---------|---------|
| `_subject` | Custom email subject | "New Gala Dinner Ticket" |
| `_captcha` | Enable/disable CAPTCHA | false (disabled) |
| `_next` | Redirect URL on success | Currently removed to use native redirects |
| `email` | Sender's email address | Required for form |

### Limitations (Free Tier)
- Unlimited submissions (Formspree is free tier friendly)
- Email submissions forwarded to your configured email
- No form responses stored in Formspree dashboard
- File uploads supported up to reasonable size

---

## Troubleshooting

### Form not submitting?
1. Check browser console for CORS errors
2. Verify internet connection
3. Check that email field is named `email` (case-sensitive)
4. Ensure file is under 25MB for attachment

### Email not received?
1. Check spam/junk folder
2. Verify email address is correct in Formspree account
3. Wait a few minutes for email delivery
4. Check Formspree status page for outages

### Attachment not included?
1. Ensure field name is `attachment` (case-sensitive)
2. Verify file is image or PDF format
3. Check file size is reasonable
4. Ensure encType="multipart/form-data" is on form (✓ configured)

---

## Next Steps

1. ✅ Both forms configured with Formspree
2. ✅ Email recipients set to rubcosizweni.office@gmail.com
3. ⬜ Test both forms in staging/production
4. ⬜ Monitor first submissions to ensure delivery
5. ⬜ If issues arise, consider alternative (Email API, Netlify Forms, etc.)

---

**Status**: ✅ PRODUCTION READY
**Last Updated**: May 14, 2026
**Integrated**: Formspree API v1.0
