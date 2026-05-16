# Basin Forms API Integration Guide

## Overview
**Basin** (usebasin.com) is a free, unlimited form submission service with comprehensive API support. It provides email notifications, file attachment handling, and webhooks for dynamic form processing.

**Key Features**:
- ✅ Unlimited free form submissions
- ✅ File attachment support (up to 25MB per file)
- ✅ Email notifications with attachments
- ✅ Webhooks for real-time notifications
- ✅ Form data storage
- ✅ API-based submissions
- ✅ CORS-friendly
- ✅ No rate limiting on free tier

---

## 1. Basin Setup & Configuration

### Step 1: Create Basin Account
1. Go to **https://usebasin.com**
2. Sign up with email address
3. Create a form via dashboard
4. You'll receive a **Basket ID** (e.g., `abc123def456`)

### Step 2: Get Your Basket ID
Each form you create gets a unique Basket ID. You need:
- **Ticket Form Basket ID**: For gala dinner ticket registration
- **Contact Form Basket ID**: For general inquiries

### Step 3: Configure Email Notifications
In Basin Dashboard:
1. Go to **Form Settings**
2. Enable **Email Notifications**
3. Set recipient email: `rubcosizweni.office@gmail.com`
4. Customize email templates (optional)
5. Enable webhooks if using dynamic processing

### Step 4: Test Form
Submit a test submission through Basin's web form to verify it works.

---

## 2. API Endpoints & Documentation

### Base Endpoints
```
Main API: https://usebasin.com/api/v1/
Form Submission: https://basin.glitch.me/{BASKET_ID}
Alternative: https://usebasin.com/api/v1/basins/{BASKET_ID}/submissions
```

### Creating Forms via API
```bash
POST https://usebasin.com/api/v1/basins
Content-Type: application/json

{
  "name": "Gala Dinner Ticket Registration",
  "email_notification_address": "rubcosizweni.office@gmail.com"
}

# Response includes:
# {
#   "id": "your-basket-id",
#   "name": "Gala Dinner Ticket Registration",
#   "submission_count": 0,
#   "created_at": "2024-01-01T00:00:00Z"
# }
```

### Submitting Forms via API
```bash
POST https://basin.glitch.me/{BASKET_ID}
Content-Type: application/x-www-form-urlencoded

full_name=John+Doe&email=john@example.com&ticket_type=VIP&message=Test
```

### Alternative API Endpoint (JSON)
```bash
POST https://usebasin.com/api/v1/basins/{BASKET_ID}/submissions
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "ticket_type": "VIP"
}
```

---

## 3. Form Submission with Attachments

### Using FormData (Recommended for Files)
```typescript
async function submitFormWithAttachment(
  basketId: string,
  formData: FormData
): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`https://basin.glitch.me/${basketId}`, {
      method: "POST",
      body: formData, // FormData handles multipart/form-data automatically
    });

    if (!response.ok) {
      throw new Error(`Basin API error: ${response.status}`);
    }

    return {
      success: true,
      message: "Form submitted successfully",
    };
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Submission failed",
    };
  }
}
```

### Example: Ticket Form Submission
```typescript
async function submitTicketForm(
  fullName: string,
  email: string,
  ticketType: "General" | "VIP" | "VVIP",
  attachmentFile: File
): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();
  
  // Text fields
  formData.append("Full_Name", fullName);
  formData.append("email", email);
  formData.append("Ticket_Type", ticketType);
  formData.append("_subject", "New Gala Dinner Ticket Registration");
  formData.append("_redirect", "/events"); // Redirect after submission
  
  // File attachment
  formData.append("Proof_of_Payment", attachmentFile);
  
  return submitFormWithAttachment(
    "YOUR_TICKET_BASKET_ID",
    formData
  );
}
```

### Example: Contact Form Submission
```typescript
async function submitContactForm(
  firstName: string,
  lastName: string,
  email: string,
  message: string
): Promise<{ success: boolean; message: string }> {
  const formData = new FormData();
  
  formData.append("First_Name", firstName);
  formData.append("Last_Name", lastName);
  formData.append("email", email);
  formData.append("message", message);
  formData.append("_subject", "New Contact Form Submission - Rise-Up Bible Church");
  formData.append("_redirect", "/"); // Redirect after submission
  
  return submitFormWithAttachment(
    "YOUR_CONTACT_BASKET_ID",
    formData
  );
}
```

---

## 4. File Attachment Handling

### Supported File Types
```
Images: JPG, JPEG, PNG, GIF, WebP, SVG
Documents: PDF, DOC, DOCX, XLS, XLSX, PPT, PPTX
Archives: ZIP, RAR, 7Z
Size Limit: 25MB per file
```

### File Validation Before Upload
```typescript
function validateFile(file: File): {
  valid: boolean;
  error?: string;
} {
  const maxSize = 25 * 1024 * 1024; // 25MB
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Max: 25MB` };
  }

  if (!allowedMimes.includes(file.type)) {
    return { valid: false, error: "File type not supported" };
  }

  return { valid: true };
}
```

### Multiple Attachments (if needed)
```typescript
formData.append("attachment_1", file1);
formData.append("attachment_2", file2);
formData.append("attachment_3", file3);
```

---

## 5. Required Configuration for React Implementation

### Environment Variables (.env)
```env
# Basin Form IDs
VITE_BASIN_TICKET_FORM_ID=your-ticket-basket-id-here
VITE_BASIN_CONTACT_FORM_ID=your-contact-basket-id-here

# Email settings
VITE_RECIPIENT_EMAIL=rubcosizweni.office@gmail.com
```

### Vite Config (for CORS handling)
```typescript
// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/basin": {
        target: "https://basin.glitch.me",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/basin/, ""),
      },
    },
  },
});
```

---

## 6. React Component Implementation

### Complete Ticket Form with Basin
```typescript
// src/pages/TicketForm.tsx
import { FormEvent, useState, ChangeEvent } from "react";

export const TicketForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    ticketType: "General",
    attachment: null as File | null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const validation = validateFile(file);
      if (!validation.valid) {
        setMessage(`❌ ${validation.error}`);
        return;
      }
    }
    
    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage("");

    try {
      if (!formData.attachment) {
        setMessage("❌ Please upload proof of payment");
        setSubmitting(false);
        return;
      }

      const formDataToSend = new FormData();
      formDataToSend.append("Full_Name", formData.fullName);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("Ticket_Type", formData.ticketType);
      formDataToSend.append("Proof_of_Payment", formData.attachment);
      formDataToSend.append(
        "_subject",
        "New Gala Dinner Ticket Registration"
      );
      formDataToSend.append("_redirect", "/events?submitted=true");

      const response = await fetch(
        `https://basin.glitch.me/${
          import.meta.env.VITE_BASIN_TICKET_FORM_ID
        }`,
        {
          method: "POST",
          body: formDataToSend,
        }
      );

      if (!response.ok) {
        throw new Error("Submission failed");
      }

      setMessage(
        "✅ Ticket registration submitted! Check your email for confirmation."
      );
      setFormData({
        fullName: "",
        email: "",
        ticketType: "General",
        attachment: null,
      });

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = "/events";
      }, 2000);
    } catch (error) {
      setMessage(
        `❌ Error: ${error instanceof Error ? error.message : "Submission failed"}`
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Gala Dinner Ticket Registration</h2>
      
      {message && (
        <div className={`message ${message.includes("✅") ? "success" : "error"}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label>Ticket Type *</label>
          <select
            name="ticketType"
            value={formData.ticketType}
            onChange={handleInputChange}
            required
          >
            <option value="General">General</option>
            <option value="VIP">VIP</option>
            <option value="VVIP">VVIP</option>
          </select>
        </div>

        <div className="form-group">
          <label>Proof of Payment (JPG, PNG, PDF) *</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept=".jpg,.jpeg,.png,.pdf"
            required
          />
          {formData.attachment && (
            <small>✓ {formData.attachment.name} ({formatFileSize(formData.attachment.size)})</small>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="submit-button"
        >
          {submitting ? "Submitting..." : "Submit Reservation"}
        </button>
      </form>
    </div>
  );
};

// Helper functions
function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 25 * 1024 * 1024;
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
  ];

  if (file.size > maxSize) {
    return { valid: false, error: `File too large. Max: 25MB` };
  }

  if (!allowedMimes.includes(file.type)) {
    return { valid: false, error: "File type not supported" };
  }

  return { valid: true };
}

function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
}
```

---

## 7. Netlify Deployment Integration

### Environment Variables on Netlify
1. Go to **Netlify Dashboard** → **Site Settings** → **Build & Deploy** → **Environment**
2. Add:
```
VITE_BASIN_TICKET_FORM_ID = your-ticket-basket-id
VITE_BASIN_CONTACT_FORM_ID = your-contact-basket-id
VITE_RECIPIENT_EMAIL = rubcosizweni.office@gmail.com
```

### Netlify Functions for Backend Processing (Optional)
If you want to process submissions server-side:

```typescript
// netlify/functions/submit-basin-ticket.ts
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  // Only allow POST
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  try {
    const formData = event.body;
    
    // Forward to Basin
    const response = await fetch(
      `https://basin.glitch.me/${process.env.VITE_BASIN_TICKET_FORM_ID}`,
      {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    if (!response.ok) {
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: "Basin submission failed" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: "Submitted to Basin" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: error instanceof Error ? error.message : "Server error",
      }),
    };
  }
};

export { handler };
```

### Build Configuration (netlify.toml)
```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

[env]
  [env.production]
    VITE_BASIN_TICKET_FORM_ID = "prod-ticket-id"
    VITE_BASIN_CONTACT_FORM_ID = "prod-contact-id"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"
```

---

## 8. Advanced: Webhooks Setup

Basin supports webhooks for real-time notifications. Set up in the Basin Dashboard:

### Webhook Endpoint (Netlify Function)
```typescript
// netlify/functions/basin-webhook.ts
import { Handler } from "@netlify/functions";

const handler: Handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const submission = JSON.parse(event.body || "{}");
    
    // Log submission
    console.log("New Basin submission:", submission);
    
    // Process submission data
    const { data, submitted_at } = submission;
    
    // Example: Save to database, trigger notifications, etc.
    console.log(`Form submitted at ${submitted_at}`);
    console.log("Data:", data);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    console.error("Webhook error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Processing failed" }),
    };
  }
};

export { handler };
```

### Configure Webhook in Basin
1. Go to **Form Settings** → **Webhooks**
2. Add webhook URL: `https://your-site.netlify.app/.netlify/functions/basin-webhook`
3. Basin will POST form submissions to this endpoint

---

## 9. Migration from Formspree to Basin

### Step 1: Update Component Props
Replace:
```typescript
// Old Formspree
action="https://formspree.io/f/myzbbrvn"
method="POST"
```

With:
```typescript
// New Basin
action={`https://basin.glitch.me/${import.meta.env.VITE_BASIN_TICKET_FORM_ID}`}
method="POST"
encType="multipart/form-data"
```

### Step 2: Update Hidden Fields
Formspree custom fields → Basin equivalents:
```typescript
// Add to FormData
formData.append("_subject", "Email Subject");      // Both support
formData.append("_redirect", "/success");          // Basin supports
formData.append("_cc", "cc@example.com");          // Basin supports
formData.append("_replyto", "reply@example.com");  // Basin supports
```

### Step 3: Environment Variables
```env
# Replace Formspree IDs
- FORMSPREE_TICKET_ID
- FORMSPREE_CONTACT_ID

# With Basin IDs
+ VITE_BASIN_TICKET_FORM_ID
+ VITE_BASIN_CONTACT_FORM_ID
```

---

## 10. Troubleshooting

### Issue: File not attached to email
**Solution**: Ensure:
- File field name is correct: `Proof_of_Payment`
- File encoding is `multipart/form-data`
- File size is under 25MB
- File MIME type is supported

### Issue: Form redirects not working
**Solution**: 
- Add `_redirect` parameter with valid URL
- Check redirect target exists
- Ensure CORS headers allow redirect

### Issue: Special characters in field names
**Solution**: 
- Use underscores instead of spaces: `Full_Name`
- Avoid special characters: `!@#$%^&*()`
- Keep field names under 50 characters

### Issue: CORS errors on submission
**Solution**:
- Use: `https://basin.glitch.me/{BASKET_ID}` endpoint
- This endpoint has CORS enabled for browser submissions
- Alternative: submit from Netlify Function to avoid CORS

---

## 11. Code Example: Complete Integration

### Service Module (src/lib/basinService.ts)
```typescript
const BASIN_TICKET_ID = import.meta.env.VITE_BASIN_TICKET_FORM_ID;
const BASIN_CONTACT_ID = import.meta.env.VITE_BASIN_CONTACT_FORM_ID;

interface SubmissionResult {
  success: boolean;
  message: string;
  redirectUrl?: string;
}

export const basinService = {
  async submitTicketForm(
    fullName: string,
    email: string,
    ticketType: string,
    file: File
  ): Promise<SubmissionResult> {
    const formData = new FormData();
    formData.append("Full_Name", fullName);
    formData.append("email", email);
    formData.append("Ticket_Type", ticketType);
    formData.append("Proof_of_Payment", file);
    formData.append("_subject", "New Gala Dinner Ticket Registration");

    try {
      const response = await fetch(
        `https://basin.glitch.me/${BASIN_TICKET_ID}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Basin submission failed");
      }

      return {
        success: true,
        message: "✅ Ticket registered successfully!",
        redirectUrl: "/events?submitted=true",
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Error: ${
          error instanceof Error ? error.message : "Submission failed"
        }`,
      };
    }
  },

  async submitContactForm(
    firstName: string,
    lastName: string,
    email: string,
    message: string
  ): Promise<SubmissionResult> {
    const formData = new FormData();
    formData.append("First_Name", firstName);
    formData.append("Last_Name", lastName);
    formData.append("email", email);
    formData.append("message", message);
    formData.append("_subject", "New Contact Form Submission");

    try {
      const response = await fetch(
        `https://basin.glitch.me/${BASIN_CONTACT_ID}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Basin submission failed");
      }

      return {
        success: true,
        message: "✅ Message sent successfully!",
        redirectUrl: "/?message=sent",
      };
    } catch (error) {
      return {
        success: false,
        message: `❌ Error: ${
          error instanceof Error ? error.message : "Submission failed"
        }`,
      };
    }
  },
};
```

---

## 12. Official Resources

- **Basin Website**: https://usebasin.com
- **Basin Docs**: https://usebasin.com/docs
- **Basin API**: https://usebasin.com/api/v1/
- **Status Page**: https://status.usebasin.com
- **Support Email**: support@usebasin.com

---

## Summary

| Feature | Support | Details |
|---------|---------|---------|
| Free Tier | ✅ Yes | Unlimited submissions |
| File Attachments | ✅ Yes | Up to 25MB per file |
| Email Notifications | ✅ Yes | To configured email |
| Webhooks | ✅ Yes | Real-time notifications |
| CORS | ✅ Yes | Browser-based submissions supported |
| API | ✅ Yes | JSON and form-encoded |
| Rate Limiting | ✅ None | Unlimited on free tier |
| Data Retention | ✅ Yes | Dashboard access |
| Custom Domain | ✅ Optional | Enterprise feature |
| Form Templates | ✅ Yes | UI form builder |

Basin is an excellent choice for your needs with unlimited free submissions, strong file attachment support, and easy integration with your React/Netlify stack.
