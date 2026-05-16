# ⚠️ DEPRECATED: Formspree Integration - Replaced by Basin Forms

## Status: 🔄 MIGRATION COMPLETE
**Current Integration**: Basin Forms API  
**Previous Integration**: Formspree (NO LONGER IN USE)  
**Migration Date**: May 16, 2026

---

## What Changed?
Formspree has been completely replaced with **Basin Forms API** for better file handling and reliability.

### New Implementation
Both the **Ticket Form** and **Contact Form** now use **Basin Forms API** for email submissions with full file attachment support.

**👉 See**: [BASIN_SETUP_GUIDE.md](BASIN_SETUP_GUIDE.md) for current integration details.

---

## Legacy Formspree Configuration (ARCHIVED)

This section is kept for reference only. **DO NOT USE FORMSPREE ANYMORE**.

### Forms Configuration

#### 1. Ticket Registration Form (DEPRECATED)
**Location**: `/src/pages/TicketForm.tsx` (now uses Basin)

**Previous Formspree ID**: `myzbbrvn` ❌ DEPRECATED
**Previous Endpoint**: `https://formspree.io/f/myzbbrvn` ❌ DEPRECATED
**Email Recipient**: `rubcosizweni.office@gmail.com`

**Status**: ✅ MIGRATED to Basin

#### 2. Contact Form (DEPRECATED)
**Location**: `/src/pages/Home.tsx` (now uses Basin)

**Previous Formspree ID**: `xyzbnpdw` ❌ DEPRECATED
**Previous Endpoint**: `https://formspree.io/f/xyzbnpdw` ❌ DEPRECATED
**Email Recipient**: `rubcosizweni.office@gmail.com`

**Status**: ✅ MIGRATED to Basin

---

## Why We Switched

| Feature | Formspree | Basin |
|---------|-----------|-------|
| **File Attachments** | Limited | ✅ Full support (25MB) |
| **Free Tier** | ✅ Yes | ✅ Yes (unlimited) |
| **Email Delivery** | ✅ Yes | ✅ Yes |
| **Setup Time** | ~5 mins | ~5 mins |
| **API Support** | Basic | ✅ Full REST API |
| **File Formats** | Limited | ✅ JPG, PNG, GIF, PDF |

---

## IMPORTANT: Rollback Instructions

If you need to revert to Formspree (not recommended):

### 1. Revert TicketForm.tsx
```bash
git checkout main -- src/pages/TicketForm.tsx
```

### 2. Revert Home.tsx
```bash
git checkout main -- src/pages/Home.tsx
```

### 3. Remove Basin Service
```bash
rm src/lib/basinService.ts
```

### 4. Update Environment
Remove `VITE_BASIN_*` variables from `.env.local`

**Warning**: Formspree endpoints will still exist but are no longer maintained.

---

## Current Setup Guide

👉 **[See BASIN_SETUP_GUIDE.md](BASIN_SETUP_GUIDE.md)** for current implementation

---

## Historical Notes

### Formspree API Reference (ARCHIVED)
The following is kept for historical reference only.

**Endpoint**: `https://formspree.io/f/{FORM_ID}`  
**Method**: `POST`  
**Content-Type**: `application/x-www-form-urlencoded` or `multipart/form-data`

**Special Fields**:
- `_subject` - Email subject line
- `_captcha` - Enable/disable CAPTCHA
- `_replyto` - Reply-to email address

**Limitations**:
- File support was limited
- Unlimited submissions only on paid plans
- CORS support required special configuration
- No form response storage in free tier

---

## Support

For current Basin Forms integration support, see:
- [BASIN_SETUP_GUIDE.md](BASIN_SETUP_GUIDE.md)
- [src/lib/basinService.ts](src/lib/basinService.ts)
- https://usebasin.com

---

**Last Updated**: May 16, 2026
**Status**: Archived (Reference Only)
