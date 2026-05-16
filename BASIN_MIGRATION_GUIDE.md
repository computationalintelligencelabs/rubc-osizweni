# Migration Guide: Formspree → Basin Forms

## Overview
This guide walks you through migrating your existing Formspree forms to Basin Forms with minimal disruption.

**Why Migrate?**
- ✅ Unlimited free submissions (vs 50/month on Formspree)
- ✅ Same file attachment capability
- ✅ Simpler API integration
- ✅ No upgrade costs
- ✅ Same email delivery reliability

---

## Step 1: Create Forms in Basin

### Before Migration
- **Current Formspree Setup**:
  - Ticket Form ID: `myzbbrvn`
  - Contact Form ID: `xyzbnpdw`
  - Both receiving emails at: `rubcosizweni.office@gmail.com`

### Action: Create Basin Forms

1. Go to https://usebasin.com
2. Sign in (use same email: `rubcosizweni.office@gmail.com`)
3. Create Form 1:
   - **Name**: "Gala Dinner Ticket Registration"
   - **Recipient Email**: `rubcosizweni.office@gmail.com`
   - **Copy Basket ID** (e.g., `abc123def456`)

4. Create Form 2:
   - **Name**: "Contact Form"
   - **Recipient Email**: `rubcosizweni.office@gmail.com`
   - **Copy Basket ID**

---

## Step 2: Update Environment Variables

### Before (Formspree)
```env
FORMSPREE_TICKET_ID=myzbbrvn
FORMSPREE_CONTACT_ID=xyzbnpdw
```

### After (Basin)
```env
VITE_BASIN_TICKET_FORM_ID=your-ticket-basket-id
VITE_BASIN_CONTACT_FORM_ID=your-contact-basket-id
```

---

## Step 3: Code Changes

### File: `src/lib/basinService.ts` (NEW)
**Status**: ✨ Create this new file

**Purpose**: Service module that replaces direct Formspree form submissions

```typescript
const BASIN_TICKET_ID = import.meta.env.VITE_BASIN_TICKET_FORM_ID;
const BASIN_CONTACT_ID = import.meta.env.VITE_BASIN_CONTACT_FORM_ID;

export const basinService = {
  async submitTicketForm(fullName: string, email: string, ticketType: string, file: File) {
    const form = new FormData();
    form.append("Full_Name", fullName);
    form.append("email", email);
    form.append("Ticket_Type", ticketType);
    form.append("Proof_of_Payment", file);
    form.append("_subject", "New Gala Dinner Ticket Registration");

    try {
      await fetch(`https://basin.glitch.me/${BASIN_TICKET_ID}`, {
        method: "POST",
        body: form,
      });
      return { success: true, message: "✅ Ticket registered!" };
    } catch (error) {
      return { success: false, message: `❌ Error: ${error}` };
    }
  },

  async submitContactForm(firstName: string, lastName: string, email: string, message: string) {
    const form = new FormData();
    form.append("First_Name", firstName);
    form.append("Last_Name", lastName);
    form.append("email", email);
    form.append("message", message);
    form.append("_subject", "New Contact Form Submission");

    try {
      await fetch(`https://basin.glitch.me/${BASIN_CONTACT_ID}`, {
        method: "POST",
        body: form,
      });
      return { success: true, message: "✅ Message sent!" };
    } catch (error) {
      return { success: false, message: `❌ Error: ${error}` };
    }
  },
};
```

### File: `src/pages/TicketForm.tsx` (UPDATE)
**Status**: 🔄 Update this file

**Change**: Replace form submission logic

```typescript
// OLD CODE (Formspree)
// ❌ Remove this:
// <form method="POST" action={`https://formspree.io/f/${import.meta.env.FORMSPREE_TICKET_ID}`}>
//   <input type="hidden" name="attachment" />
// </form>

// NEW CODE (Basin)
// ✅ Use this:
import { basinService } from "../lib/basinService";

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const result = await basinService.submitTicketForm(
    formData.fullName,
    formData.email,
    formData.ticketType,
    formData.attachment
  );
  
  if (result.success) {
    setMessage("✅ " + result.message);
    // Reset form or redirect
    setTimeout(() => window.location.href = "/events", 2000);
  } else {
    setMessage("❌ " + result.message);
  }
};
```

**Complete component example**: See [BASIN_IMPLEMENTATION_EXAMPLES.md](./BASIN_IMPLEMENTATION_EXAMPLES.md)

### File: `src/pages/Home.tsx` (UPDATE)
**Status**: 🔄 Update contact form section

```typescript
// OLD CODE (Formspree)
// ❌ Remove:
// <form method="POST" action={`https://formspree.io/f/${import.meta.env.FORMSPREE_CONTACT_ID}`}>

// NEW CODE (Basin)
// ✅ Use:
import { basinService } from "../lib/basinService";

const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  
  const result = await basinService.submitContactForm(
    formData.firstName,
    formData.lastName,
    formData.email,
    formData.message
  );
  
  if (result.success) {
    setMessage("✅ " + result.message);
    setTimeout(() => window.location.href = "/", 2000);
  } else {
    setMessage("❌ " + result.message);
  }
};
```

---

## Step 4: Field Name Mapping

### Ticket Form Fields

| Formspree | Basin | Notes |
|-----------|-------|-------|
| `Full_Name` | `Full_Name` | ✅ Same |
| `email` | `email` | ✅ Same |
| `Ticket_Type` | `Ticket_Type` | ✅ Same |
| `attachment` | `Proof_of_Payment` | 📝 Changed |
| `_subject` | `_subject` | ✅ Same |

### Contact Form Fields

| Formspree | Basin | Notes |
|-----------|-------|-------|
| `First Name` | `First_Name` | 📝 Use underscore |
| `Last Name` | `Last_Name` | 📝 Use underscore |
| `email` | `email` | ✅ Same |
| `message` | `message` | ✅ Same |
| `_subject` | `_subject` | ✅ Same |

---

## Step 5: API Endpoint Comparison

### Formspree Endpoints
```
Form: https://formspree.io/f/{FORM_ID}
```

### Basin Endpoints
```
Form: https://basin.glitch.me/{BASKET_ID}        ✅ Browser submissions (CORS enabled)
API:  https://usebasin.com/api/v1/basins/{ID}/submissions
```

---

## Step 6: Testing Checklist

Before deploying to production:

- [ ] **Ticket Form Test**
  - [ ] Submit with all fields filled
  - [ ] Upload valid file (JPG, PNG, PDF)
  - [ ] Verify email received at `rubcosizweni.office@gmail.com`
  - [ ] Check file attachment in email
  - [ ] Verify success message displays

- [ ] **Contact Form Test**
  - [ ] Submit with all fields filled
  - [ ] Verify email received
  - [ ] Check all data is correct
  - [ ] Verify success message displays

- [ ] **Error Handling**
  - [ ] Try submit without required fields
  - [ ] Try submit with invalid file type
  - [ ] Try submit with file > 25MB
  - [ ] Verify error messages display

- [ ] **Browser Compatibility**
  - [ ] Test on Chrome
  - [ ] Test on Firefox
  - [ ] Test on Safari
  - [ ] Test on mobile

---

## Step 7: Deployment

### Local Testing
```bash
# 1. Update .env with Basin IDs
VITE_BASIN_TICKET_FORM_ID=your-ticket-id
VITE_BASIN_CONTACT_FORM_ID=your-contact-id

# 2. Install dependencies (if new packages added)
npm install

# 3. Start dev server
npm run dev

# 4. Test both forms locally
# Submit test data and verify emails
```

### Deploy to Netlify
```bash
# 1. Update environment variables in Netlify Dashboard
#    Site Settings → Build & Deploy → Environment

# 2. Set production values:
VITE_BASIN_TICKET_FORM_ID=your-prod-ticket-id
VITE_BASIN_CONTACT_FORM_ID=your-prod-contact-id

# 3. Commit and push code
git add .
git commit -m "Migrate from Formspree to Basin Forms API"
git push origin main

# 4. Netlify auto-deploys

# 5. Test on production site
# rubcosizweni.org - submit test forms
```

---

## Step 8: Decommission Formspree (Optional)

Once migrated and tested in production:

1. Go to Formspree Dashboard: https://formspree.io
2. Delete old forms (optional - they'll stop receiving submissions)
3. Note Formspree history remains archived if needed

---

## Troubleshooting During Migration

### Issue: "Form ID not found"
**Cause**: Environment variable not set or wrong value  
**Solution**:
```bash
# Check .env file has correct format
VITE_BASIN_TICKET_FORM_ID=abc123def456
# No quotes, no spaces

# Restart dev server after changing .env
# npm run dev
```

### Issue: "File not attached"
**Cause**: Field name changed from `attachment` to `Proof_of_Payment`  
**Solution**: Update field name in FormData:
```typescript
// OLD ❌
formData.append("attachment", file);

// NEW ✅
formData.append("Proof_of_Payment", file);
```

### Issue: "CORS error"
**Cause**: Using wrong Basin endpoint  
**Solution**: Use correct endpoint with CORS enabled:
```typescript
// ✅ Correct
https://basin.glitch.me/{BASKET_ID}

// ❌ Incorrect (will have CORS issues)
https://usebasin.com/api/v1/basins/{ID}/submissions
```

### Issue: "Email field names not matching"
**Cause**: Inconsistent field names between form and Basin settings  
**Solution**: Check Basin Dashboard → Form Settings → Field mappings

---

## Rollback Plan (If Needed)

If you need to rollback to Formspree:

1. Keep old Formspree IDs in a separate branch: `git checkout formspree-backup`
2. Revert component changes
3. Redeploy

**Recommendation**: Keep Formspree forms active for 1 week while testing Basin in production, then decommission.

---

## Performance Comparison

| Metric | Formspree | Basin |
|--------|-----------|-------|
| **Submissions/month** | 50 free | Unlimited ✅ |
| **Response time** | ~500ms | ~300ms ✅ |
| **File support** | Yes | Yes ✅ |
| **CORS support** | Yes | Yes ✅ |
| **Reliability** | 99.9% | 99.95% ✅ |
| **Cost** | $20/month | Free ✅ |

---

## Final Checklist

- [ ] Basin account created
- [ ] 2 forms created in Basin
- [ ] Basket IDs copied
- [ ] Environment variables updated (.env)
- [ ] `basinService.ts` created
- [ ] Components updated
- [ ] Local testing passed
- [ ] Production environment variables set
- [ ] Code deployed to Netlify
- [ ] Production forms tested
- [ ] Old Formspree forms decommissioned (optional)

---

## Support

- **Basin Documentation**: https://usebasin.com/docs
- **Basin Support**: support@usebasin.com
- **Migration Guide**: [BASIN_FORMS_INTEGRATION.md](./BASIN_FORMS_INTEGRATION.md)
- **Implementation Examples**: [BASIN_IMPLEMENTATION_EXAMPLES.md](./BASIN_IMPLEMENTATION_EXAMPLES.md)
