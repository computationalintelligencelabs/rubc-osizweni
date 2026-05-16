# Basin Forms - Quick Implementation Reference

## 🚀 Quick Start (5 Minutes)

### 1. Get Your Basin IDs
```bash
# Step 1: Visit https://usebasin.com
# Step 2: Create account (use rubcosizweni.office@gmail.com)
# Step 3: Create 2 forms:
#   - "Gala Dinner Tickets" → Copy Basket ID
#   - "Contact Form" → Copy Basket ID
```

### 2. Add Environment Variables
```env
# .env
VITE_BASIN_TICKET_FORM_ID=paste-ticket-basket-id-here
VITE_BASIN_CONTACT_FORM_ID=paste-contact-basket-id-here
```

### 3. Copy Service Module
Create `src/lib/basinService.ts`:
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

### 4. Update Your Forms

**Ticket Form** (src/pages/TicketForm.tsx):
```typescript
import { basinService } from "../lib/basinService";

// In your submit handler:
const result = await basinService.submitTicketForm(
  formData.fullName,
  formData.email,
  formData.ticketType,
  formData.attachment
);
```

**Contact Form** (src/pages/Home.tsx):
```typescript
import { basinService } from "../lib/basinService";

// In your submit handler:
const result = await basinService.submitContactForm(
  firstName,
  lastName,
  email,
  message
);
```

### 5. Deploy to Netlify
```bash
# Add environment variables in Netlify dashboard:
# VITE_BASIN_TICKET_FORM_ID = your-id
# VITE_BASIN_CONTACT_FORM_ID = your-id

git push origin main
```

---

## 📋 API Endpoints

| Endpoint | Use Case |
|----------|----------|
| `https://basin.glitch.me/{ID}` | ✅ Browser form submissions (CORS enabled) |
| `https://usebasin.com/api/v1/basins/{ID}/submissions` | Server-side submissions |
| `https://usebasin.com/api/v1/basins` | Create form via API |

---

## 📤 File Attachment Syntax

```typescript
// Single file
formData.append("Proof_of_Payment", file);

// Multiple files (if needed)
formData.append("document_1", file1);
formData.append("document_2", file2);
```

**Supported formats**: JPG, PNG, PDF, DOC, DOCX, XLS, ZIP  
**Max size**: 25MB per file  
**Email includes**: All attachments

---

## 🔄 Comparison: Formspree vs Basin

| Feature | Formspree | Basin |
|---------|-----------|-------|
| **Free Submissions** | 50/month | Unlimited ✅ |
| **File Attachments** | ✅ Yes | ✅ Yes |
| **Email Notifications** | ✅ Yes | ✅ Yes |
| **API** | ✅ Yes | ✅ Yes |
| **Webhooks** | ✅ Yes | ✅ Yes |
| **CORS Friendly** | ✅ Yes | ✅ Yes |
| **Form Builder** | ✅ Limited | ✅ Full |
| **Data Storage** | Limited | ✅ Full |
| **Upgrade Cost** | ~$20/month | Free forever |

**Recommendation**: Switch to Basin for unlimited submissions at no cost.

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| File not in email | Check `Content-Type: multipart/form-data` |
| CORS error | Use `https://basin.glitch.me/{ID}` endpoint |
| No email received | Verify recipient email in Basin settings |
| Large file rejected | Keep under 25MB limit |
| Field data missing | Ensure FormData field names match exactly |

---

## 📝 Field Name Reference

```typescript
// Use these exact names in FormData:
formData.append("Full_Name", value);           // Ticket form
formData.append("email", value);               // Both forms
formData.append("Ticket_Type", value);         // Ticket form
formData.append("Proof_of_Payment", file);     // Ticket form
formData.append("First_Name", value);          // Contact form
formData.append("Last_Name", value);           // Contact form
formData.append("message", value);             // Contact form

// Special Basin fields:
formData.append("_subject", "Email subject");  // Email subject line
formData.append("_redirect", "/thank-you");    // Redirect URL
formData.append("_cc", "cc@example.com");      // CC email
formData.append("_bcc", "bcc@example.com");    // BCC email
```

---

## ✅ Verification Checklist

- [ ] Basin account created
- [ ] 2 forms created (Ticket + Contact)
- [ ] Basket IDs copied
- [ ] Environment variables set (.env and Netlify)
- [ ] basinService.ts created
- [ ] Components updated with basinService calls
- [ ] File validation implemented
- [ ] Test submission successful
- [ ] Email received with attachments
- [ ] Deployed to production

---

## 🔗 Links

- **Basin Dashboard**: https://usebasin.com/dashboard
- **Basin Docs**: https://usebasin.com/docs
- **Support**: support@usebasin.com
