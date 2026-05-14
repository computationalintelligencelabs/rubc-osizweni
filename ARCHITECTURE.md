# Form Submission Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    RUBC OSIZWENI WEBSITE                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐              ┌──────────────────┐        │
│  │  Home Page       │              │  Events Page     │        │
│  │  Contact Form    │              │  Ticket Form     │        │
│  │                  │              │                  │        │
│  │ • First Name     │              │ • Full Name      │        │
│  │ • Last Name      │              │ • Email          │        │
│  │ • Email          │              │ • Ticket Type    │        │
│  │ • Message        │              │ • Attachment ★   │        │
│  └────────┬─────────┘              └────────┬─────────┘        │
│           │                                 │                  │
│           │                                 │                  │
│           └─────────────────┬───────────────┘                  │
│                             │                                  │
│                    HTTP POST Request                           │
│                   (multipart/form-data)                        │
│                             │                                  │
│                             ▼                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     FORM SUBMIT API (formsubmit.co)                            │
│     https://formsubmit.co/rubcosizweni.office@gmail.com        │
│                                                                 │
│     ✓ Receives form data                                       │
│     ✓ Processes attachments                                    │
│     ✓ Validates email format                                   │
│     ✓ Generates email message                                  │
│                                                                 │
│                             │                                  │
│                             ▼                                  │
│     ┌──────────────────────────────┐                           │
│     │  Compose Email Message        │                          │
│     │  • Subject (custom)           │                          │
│     │  • Form fields formatted      │                          │
│     │  • Attachment included ★      │                          │
│     │  • Timestamp                  │                          │
│     └──────────────────────────────┘                           │
│                             │                                  │
│                             ▼                                  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     SMTP Server (Gmail)                                        │
│                                                                 │
│                             │                                  │
│                             ▼                                  │
└─────────────────────────────────────────────────────────────────┘
                             │
                             ▼
                    ┌────────────────────┐
                    │    Email Inbox     │
                    │                    │
                    │ rubcosizweni.      │
                    │ office@gmail.com   │
                    │                    │
                    │ ✓ Contact emails   │
                    │ ✓ Ticket registrations
                    │ ✓ File attachments │
                    └────────────────────┘
```

## Data Flow - Contact Form

```
User Input
    ↓
Form Validation (Browser)
    ↓
HTTP POST to formsubmit.co
{
  "First Name": "John",
  "Last Name": "Doe",
  "email": "test@example.com",
  "message": "Test message",
  "_subject": "New Contact Form Submission - Rise-Up Bible Church",
  "_captcha": "false"
}
    ↓
Form Submit API Processing
    ↓
Email Generated & Sent
    ↓
Success Message Displayed
Success Redirect: /?contact_success=true
    ↓
Email Received: rubcosizweni.office@gmail.com
```

## Data Flow - Ticket Form

```
User Input
    ↓
Form Validation (Browser)
    ↓
File Selected & Validated
    ↓
HTTP POST to formsubmit.co (multipart/form-data)
{
  "Full_Name": "Jane Smith",
  "Email": "jane@example.com",
  "Ticket_Type": "VIP",
  "attachment": <FILE_BINARY_DATA>,
  "_subject": "New Gala Dinner Ticket Registration",
  "_captcha": "false"
}
    ↓
Form Submit API Processing
    ↓
Email Generated with File Attachment
    ↓
Success Message Displayed
Auto-Redirect (2 seconds) → /events
    ↓
Email Received: rubcosizweni.office@gmail.com
With Attachment: Proof of Payment File
```

## Email Generation Process

```
┌─────────────────────────────────────────┐
│   Form Submit API Email Engine          │
├─────────────────────────────────────────┤
│                                         │
│  1. Extract Form Data                   │
│     └─ Field names and values           │
│                                         │
│  2. Format Email Body                   │
│     ├─ Text version of form fields      │
│     └─ HTML formatted (if applicable)   │
│                                         │
│  3. Process Attachments                 │
│     ├─ Read file from form              │
│     ├─ Encode as MIME attachment        │
│     └─ Add to email                     │
│                                         │
│  4. Add Headers                         │
│     ├─ From: form-reply@formsubmit.co   │
│     ├─ To: rubcosizweni.office@...      │
│     ├─ Subject: (from _subject field)   │
│     └─ Reply-To: (from email field)     │
│                                         │
│  5. Send via SMTP                       │
│     └─ Gmail SMTP server                │
│                                         │
│  6. Return Response                     │
│     └─ 200 OK (success)                 │
│     └─ Redirect to _next URL (if set)   │
│                                         │
└─────────────────────────────────────────┘
```

## Form Field Mapping

### Contact Form Fields
```
Frontend Name    →    Email Label
────────────────────────────────────
First Name       →    First Name
Last Name        →    Last Name
email            →    Email / Reply-To
message          →    Message
```

### Ticket Form Fields
```
Frontend Name    →    Email Label
────────────────────────────────────
Full_Name        →    Full Name
Email            →    Email / Reply-To
Ticket_Type      →    Ticket Type
attachment       →    [File Attachment]
```

## Hidden Configuration Fields

Both forms include these invisible fields processed by Form Submit API:

```
_subject    = Custom email subject line
              • Contact: "New Contact Form Submission - Rise-Up Bible Church"
              • Ticket: "New Gala Dinner Ticket Registration"

_captcha    = Spam protection (false = disabled for user experience)

_next       = Redirect URL after successful submission
              • Contact: "/?contact_success=true"
              • Ticket: "/events" (via JavaScript redirect)
```

## Error Handling & Validation

```
┌─────────────────────────┐
│   Form Submission       │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Client-side Validation  │
│ (HTML5 validation)      │
│                         │
│ ✓ Required fields       │
│ ✓ Email format          │
│ ✓ File selected         │
└────────┬────────────────┘
         │ PASS
         ▼
┌─────────────────────────┐
│ Send to Form Submit API │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Form Submit API Check   │
│                         │
│ ✓ Email format          │
│ ✓ File size             │
│ ✓ Rate limit            │
└────────┬────────────────┘
         │ PASS
         ▼
┌─────────────────────────┐
│ Generate Email          │
│ Send to SMTP Server     │
│ Return 200 OK           │
└────────┬────────────────┘
         │
         ▼
┌─────────────────────────┐
│ Display Success Message │
│ Auto-Redirect (optional)│
└─────────────────────────┘
```

## Security & Reliability

```
┌──────────────────────────────────────────┐
│         SECURITY MEASURES                │
├──────────────────────────────────────────┤
│                                          │
│ 🔒 HTTPS Encryption                      │
│    └─ All data encrypted in transit      │
│                                          │
│ 🛡️  SPAM Protection                      │
│    ├─ CAPTCHA available (currently off)  │
│    └─ Rate limiting per IP               │
│                                          │
│ 📧 Email Verification                    │
│    └─ Reply-To set to sender's email     │
│                                          │
│ 📁 File Validation                       │
│    ├─ MIME type checking                 │
│    └─ File size limits                   │
│                                          │
│ 🔐 No Password Storage                   │
│    └─ Form data not stored on API        │
│                                          │
│ ✅ Reliable Delivery                     │
│    └─ Gmail SMTP with retry logic        │
│                                          │
└──────────────────────────────────────────┘
```

## Scalability Path

```
Current Setup (0-50 submissions/month)
           ↓
    Form Submit API Free
    • 50 submissions/month
    • No cost
    ↓
Growing (50-100+ submissions/month)
           ↓
    Option 1: Form Submit API Premium
    Option 2: Formspree Premium
    Option 3: Basin.io (Unlimited)
    Option 4: Netlify Forms
    Option 5: Custom Backend
```

---

**Architecture Version**: 1.0  
**Last Updated**: May 14, 2026  
**Status**: ✅ Active & Operational
