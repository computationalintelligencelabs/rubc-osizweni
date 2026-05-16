# Basin Forms - Complete Implementation Examples

## File 1: Basin Service Module

**Location**: `src/lib/basinService.ts`

```typescript
/**
 * Basin Forms API Service
 * Handles form submissions to Basin with file attachments
 * Documentation: https://usebasin.com/docs
 */

const BASIN_TICKET_ID = import.meta.env.VITE_BASIN_TICKET_FORM_ID;
const BASIN_CONTACT_ID = import.meta.env.VITE_BASIN_CONTACT_FORM_ID;

interface SubmissionResult {
  success: boolean;
  message: string;
  redirectUrl?: string;
  error?: string;
}

/**
 * Validates file before submission
 */
function validateFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 25 * 1024 * 1024; // 25MB
  const allowedMimes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  // Check file size
  if (file.size > maxSize) {
    return {
      valid: false,
      error: `File too large. Maximum size is 25MB, you uploaded ${(file.size / 1024 / 1024).toFixed(2)}MB`,
    };
  }

  // Check MIME type
  if (!allowedMimes.includes(file.type)) {
    return {
      valid: false,
      error: `File type not supported. Allowed: JPG, PNG, GIF, PDF, DOC, XLS`,
    };
  }

  return { valid: true };
}

/**
 * Format file size for display
 */
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

export const basinService = {
  /**
   * Submit Gala Dinner Ticket Registration
   * Includes file attachment for proof of payment
   */
  async submitTicketForm(
    fullName: string,
    email: string,
    ticketType: "General" | "VIP" | "VVIP",
    file: File
  ): Promise<SubmissionResult> {
    // Validate inputs
    if (!fullName?.trim()) {
      return { success: false, message: "❌ Full name is required" };
    }

    if (!email?.trim()) {
      return { success: false, message: "❌ Email is required" };
    }

    if (!file) {
      return {
        success: false,
        message: "❌ Proof of payment file is required",
      };
    }

    // Validate file
    const fileValidation = validateFile(file);
    if (!fileValidation.valid) {
      return { success: false, message: `❌ ${fileValidation.error}` };
    }

    if (!BASIN_TICKET_ID) {
      console.error("VITE_BASIN_TICKET_FORM_ID not configured");
      return {
        success: false,
        message: "❌ Form configuration error. Please contact support.",
      };
    }

    try {
      const formData = new FormData();

      // Add form fields (field names are important!)
      formData.append("Full_Name", fullName.trim());
      formData.append("email", email.trim());
      formData.append("Ticket_Type", ticketType);
      formData.append("Proof_of_Payment", file);

      // Add Basin special fields
      formData.append(
        "_subject",
        "New Gala Dinner Ticket Registration - Rise-Up Bible Church"
      );
      formData.append("_redirect", `${window.location.origin}/events?submitted=true`);

      // Submit to Basin
      const response = await fetch(`https://basin.glitch.me/${BASIN_TICKET_ID}`, {
        method: "POST",
        body: formData,
        // Note: Don't set Content-Type header, FormData will set it automatically
      });

      // Check if successful
      if (!response.ok) {
        console.error("Basin API error:", response.status, response.statusText);
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        success: true,
        message: "✅ Ticket registration submitted successfully! Check your email for confirmation.",
        redirectUrl: "/events?submitted=true",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Ticket form submission error:", errorMessage);

      return {
        success: false,
        message: `❌ Submission failed: ${errorMessage}. Please try again.`,
        error: errorMessage,
      };
    }
  },

  /**
   * Submit Contact Form
   * No file attachments required
   */
  async submitContactForm(
    firstName: string,
    lastName: string,
    email: string,
    message: string
  ): Promise<SubmissionResult> {
    // Validate inputs
    if (!firstName?.trim()) {
      return { success: false, message: "❌ First name is required" };
    }

    if (!lastName?.trim()) {
      return { success: false, message: "❌ Last name is required" };
    }

    if (!email?.trim()) {
      return { success: false, message: "❌ Email is required" };
    }

    if (!message?.trim()) {
      return { success: false, message: "❌ Message is required" };
    }

    if (!BASIN_CONTACT_ID) {
      console.error("VITE_BASIN_CONTACT_FORM_ID not configured");
      return {
        success: false,
        message: "❌ Form configuration error. Please contact support.",
      };
    }

    try {
      const formData = new FormData();

      // Add form fields
      formData.append("First_Name", firstName.trim());
      formData.append("Last_Name", lastName.trim());
      formData.append("email", email.trim());
      formData.append("message", message.trim());

      // Add Basin special fields
      formData.append(
        "_subject",
        "New Contact Form Submission - Rise-Up Bible Church"
      );
      formData.append("_redirect", `${window.location.origin}/?message=sent`);

      // Submit to Basin
      const response = await fetch(`https://basin.glitch.me/${BASIN_CONTACT_ID}`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return {
        success: true,
        message: "✅ Message sent successfully! We'll get back to you soon.",
        redirectUrl: "/?message=sent",
      };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";
      console.error("Contact form submission error:", errorMessage);

      return {
        success: false,
        message: `❌ Submission failed: ${errorMessage}. Please try again.`,
        error: errorMessage,
      };
    }
  },

  /**
   * Helper functions exported for component use
   */
  validateFile,
  formatFileSize,
};
```

---

## File 2: Updated Ticket Form Component

**Location**: `src/pages/TicketForm.tsx`

```typescript
import { FormEvent, useState, ChangeEvent } from "react";
import { basinService } from "../lib/basinService";

interface FormState {
  fullName: string;
  email: string;
  ticketType: "General" | "VIP" | "VVIP";
  attachment: File | null;
}

export const TicketForm = () => {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    email: "",
    ticketType: "General",
    attachment: null,
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

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
      const validation = basinService.validateFile(file);
      if (!validation.valid) {
        setMessage({
          type: "error",
          text: `❌ ${validation.error}`,
        });
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      attachment: file,
    }));

    if (file) {
      setMessage({
        type: "success",
        text: `✅ File selected: ${file.name} (${basinService.formatFileSize(file.size)})`,
      });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      if (!formData.attachment) {
        setMessage({
          type: "error",
          text: "❌ Please upload proof of payment",
        });
        setSubmitting(false);
        return;
      }

      const result = await basinService.submitTicketForm(
        formData.fullName,
        formData.email,
        formData.ticketType,
        formData.attachment
      );

      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });

      if (result.success) {
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          ticketType: "General",
          attachment: null,
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
          }
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Unexpected error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ticket-form-container">
      <div className="form-wrapper">
        <h2 className="form-title">Gala Dinner Ticket Registration</h2>
        <p className="form-subtitle">
          Register for our upcoming Gala Dinner event
        </p>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="form">
          {/* Full Name Field */}
          <div className="form-group">
            <label htmlFor="fullName" className="label">
              Full Name <span className="required">*</span>
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              required
              placeholder="John Doe"
              className="input"
              disabled={submitting}
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="label">
              Email Address <span className="required">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="john@example.com"
              className="input"
              disabled={submitting}
            />
          </div>

          {/* Ticket Type Field */}
          <div className="form-group">
            <label htmlFor="ticketType" className="label">
              Ticket Type <span className="required">*</span>
            </label>
            <select
              id="ticketType"
              name="ticketType"
              value={formData.ticketType}
              onChange={handleInputChange}
              required
              className="input select"
              disabled={submitting}
            >
              <option value="General">General - R500</option>
              <option value="VIP">VIP - R750</option>
              <option value="VVIP">VVIP - R1000</option>
            </select>
          </div>

          {/* File Upload Field */}
          <div className="form-group">
            <label htmlFor="attachment" className="label">
              Proof of Payment (JPG, PNG, PDF) <span className="required">*</span>
            </label>
            <div className="file-input-wrapper">
              <input
                type="file"
                id="attachment"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.pdf"
                required
                className="file-input"
                disabled={submitting}
              />
              <span className="file-input-label">
                {formData.attachment
                  ? `✓ ${formData.attachment.name}`
                  : "Choose file..."}
              </span>
            </div>
            <small className="helper-text">
              Max file size: 25MB. Supported: JPG, PNG, PDF
            </small>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={submitting}
            className="submit-button"
          >
            {submitting ? (
              <>
                <span className="spinner"></span>
                Submitting...
              </>
            ) : (
              "Submit Reservation"
            )}
          </button>

          <p className="form-note">
            A confirmation email will be sent to {formData.email || "your email"}
          </p>
        </form>
      </div>
    </div>
  );
};
```

---

## File 3: Updated Contact Form (in Home.tsx)

```typescript
import { FormEvent, useState, ChangeEvent } from "react";
import { basinService } from "../lib/basinService";

interface ContactFormState {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

export const ContactFormSection = () => {
  const [formData, setFormData] = useState<ContactFormState>({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error" | "";
    text: string;
  }>({ type: "", text: "" });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage({ type: "", text: "" });

    try {
      const result = await basinService.submitContactForm(
        formData.firstName,
        formData.lastName,
        formData.email,
        formData.message
      );

      setMessage({
        type: result.success ? "success" : "error",
        text: result.message,
      });

      if (result.success) {
        // Reset form
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          message: "",
        });

        // Redirect after 2 seconds
        setTimeout(() => {
          if (result.redirectUrl) {
            window.location.href = result.redirectUrl;
          }
        }, 2000);
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: `❌ Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="contact-form-section">
      <div className="container">
        <h2>Get in Touch</h2>
        <p className="section-description">
          Have questions? We'd love to hear from you. Send us a message and
          we'll respond as soon as possible.
        </p>

        {message.text && (
          <div className={`message message-${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                placeholder="John"
                disabled={submitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                placeholder="Doe"
                disabled={submitting}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              placeholder="john@example.com"
              disabled={submitting}
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message *</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              required
              placeholder="Your message here..."
              rows={5}
              disabled={submitting}
            />
          </div>

          <button type="submit" disabled={submitting} className="submit-button">
            {submitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      </div>
    </section>
  );
};
```

---

## File 4: Environment Configuration

**Location**: `.env`

```env
# Basin Form IDs (get these from https://usebasin.com/dashboard)
VITE_BASIN_TICKET_FORM_ID=your-ticket-basket-id-here
VITE_BASIN_CONTACT_FORM_ID=your-contact-basket-id-here

# Optional: Email settings
VITE_RECIPIENT_EMAIL=rubcosizweni.office@gmail.com
```

**Location**: `.env.production`

```env
# Production Basin Form IDs
VITE_BASIN_TICKET_FORM_ID=your-prod-ticket-id
VITE_BASIN_CONTACT_FORM_ID=your-prod-contact-id
VITE_RECIPIENT_EMAIL=rubcosizweni.office@gmail.com
```

---

## File 5: Netlify Configuration

**Location**: `netlify.toml`

```toml
[build]
  command = "npm run build"
  functions = "netlify/functions"
  publish = "dist"

# Environment variables
[env]
  [env.production]
    VITE_BASIN_TICKET_FORM_ID = "your-prod-ticket-id"
    VITE_BASIN_CONTACT_FORM_ID = "your-prod-contact-id"

  [env.development]
    VITE_BASIN_TICKET_FORM_ID = "your-dev-ticket-id"
    VITE_BASIN_CONTACT_FORM_ID = "your-dev-contact-id"

[functions]
  directory = "netlify/functions"
  node_bundler = "esbuild"

# Redirect for SPA
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

## Implementation Checklist

- [ ] **Basin Setup**
  - [ ] Create Basin account at https://usebasin.com
  - [ ] Create "Gala Dinner Tickets" form
  - [ ] Create "Contact Form" form
  - [ ] Copy Basket IDs

- [ ] **Code Updates**
  - [ ] Create `src/lib/basinService.ts`
  - [ ] Update `src/pages/TicketForm.tsx`
  - [ ] Update contact form in `src/pages/Home.tsx`
  - [ ] Add environment variables to `.env`

- [ ] **Testing**
  - [ ] Test ticket form submission with file
  - [ ] Test contact form submission
  - [ ] Verify emails received
  - [ ] Check file attachments in email

- [ ] **Deployment**
  - [ ] Add environment variables to Netlify
  - [ ] Deploy to production
  - [ ] Test on live site
  - [ ] Verify forms work in production

---

## API Field Reference

### Ticket Form Fields
```typescript
// Standard fields
"Full_Name"        // string: Required
"email"            // string: Required, valid email
"Ticket_Type"      // string: "General" | "VIP" | "VVIP"
"Proof_of_Payment" // File: JPG, PNG, or PDF

// Special Basin fields
"_subject"         // string: Email subject line
"_redirect"        // string: URL to redirect after submit
```

### Contact Form Fields
```typescript
// Standard fields
"First_Name"  // string: Required
"Last_Name"   // string: Required
"email"       // string: Required, valid email
"message"     // string: Required

// Special Basin fields
"_subject"    // string: Email subject line
"_redirect"   // string: URL to redirect after submit
```

---

## Common Issues & Solutions

| Issue | Cause | Solution |
|-------|-------|----------|
| `undefined VITE_BASIN_TICKET_FORM_ID` | Env var not set | Add to `.env` and restart dev server |
| File not attached | Wrong field name | Use exact names: `Proof_of_Payment`, `attachment` |
| CORS error | Wrong endpoint | Use `https://basin.glitch.me/{ID}` for browser |
| Email not received | Wrong recipient email | Check Basin Dashboard settings |
| Form submission timeout | Network issue | Add error handling and retry logic |

---

## Production Deployment Steps

1. **Set environment variables in Netlify:**
   ```bash
   Netlify Dashboard → Site Settings → Build & Deploy → Environment
   VITE_BASIN_TICKET_FORM_ID = your-ticket-id
   VITE_BASIN_CONTACT_FORM_ID = your-contact-id
   ```

2. **Push code to main branch:**
   ```bash
   git add .
   git commit -m "Integrate Basin Forms API"
   git push origin main
   ```

3. **Netlify auto-deploys** - No additional action needed

4. **Test on production:**
   - Submit test ticket form
   - Submit test contact form
   - Verify emails received

---

## Support

- **Basin Docs**: https://usebasin.com/docs
- **Basin Support**: support@usebasin.com
- **Status Page**: https://status.usebasin.com
