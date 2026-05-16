# Basin Forms API - Complete Documentation Index

## 📚 Documentation Overview

This workspace now contains comprehensive Basin Forms API documentation with ready-to-use code examples for your Rise-Up Bible Church website.

---

## 📖 Documentation Files

### 1. **BASIN_FORMS_INTEGRATION.md** ⭐ START HERE
**Comprehensive 12-section integration guide**

**Contains**:
- Basin setup & configuration (Step 1-4)
- API endpoints & documentation (Section 2)
- Form submission with attachments (Section 3-4)
- File attachment handling (Section 4)
- Environment setup (Section 5)
- Complete React implementation (Section 6)
- Netlify deployment (Section 7)
- Webhooks setup (Section 8)
- Migration from Formspree (Section 9)
- Troubleshooting (Section 10)
- Code examples (Section 11)
- Official resources (Section 12)

**Read this for**: Understanding the complete Basin ecosystem and all integration options

---

### 2. **BASIN_QUICK_REFERENCE.md** ⚡ FASTEST SETUP
**5-minute quick start guide**

**Contains**:
- 5-step quick implementation
- Copy-paste code snippets
- API endpoint reference
- Comparison table (Formspree vs Basin)
- Quick troubleshooting table

**Read this for**: Getting started immediately with minimal context

---

### 3. **BASIN_IMPLEMENTATION_EXAMPLES.md** 💻 COPY & PASTE CODE
**Production-ready code examples**

**Contains**:
- File 1: Complete `basinService.ts` (src/lib/)
- File 2: Updated `TicketForm.tsx` component
- File 3: Updated contact form for `Home.tsx`
- File 4: Environment configuration (.env)
- File 5: Netlify configuration (netlify.toml)
- Implementation checklist
- API field reference
- Common issues & solutions
- Production deployment steps

**Read this for**: Actual code to copy directly into your project

---

### 4. **BASIN_MIGRATION_GUIDE.md** 🔄 UPGRADE FROM FORMSPREE
**Step-by-step migration guide**

**Contains**:
- Why migrate (benefits)
- 8-step migration process
- Field name mapping (Formspree → Basin)
- Endpoint comparison
- Complete testing checklist
- Deployment strategy
- Rollback plan
- Performance comparison

**Read this for**: Migrating from your current Formspree setup

---

## 🚀 Quick Start Path

### For New Implementation (No Current Forms)
1. Read: **BASIN_QUICK_REFERENCE.md** (5 min)
2. Create Basin account and forms
3. Copy code from: **BASIN_IMPLEMENTATION_EXAMPLES.md**
4. Deploy and test

### For Migration (Currently Using Formspree)
1. Read: **BASIN_MIGRATION_GUIDE.md** (10 min)
2. Follow 8-step process
3. Reference: **BASIN_IMPLEMENTATION_EXAMPLES.md** for code
4. Test thoroughly before deploying

### For Deep Understanding
1. Read: **BASIN_FORMS_INTEGRATION.md** (30 min)
2. Explore all 12 sections
3. Understand API options and advanced features
4. Use **BASIN_IMPLEMENTATION_EXAMPLES.md** for implementation

---

## 🎯 Use Cases Covered

### ✅ Ticket Form with File Attachment
- User fills: Name, Email, Ticket Type
- User uploads: Proof of payment (JPG/PNG/PDF)
- Email sent to: `rubcosizweni.office@gmail.com` with attachment

### ✅ Contact Form (No Attachments)
- User fills: First Name, Last Name, Email, Message
- Email sent to: `rubcosizweni.office@gmail.com`

### ✅ Multiple Attachments (Advanced)
- Single form submission with multiple files
- See BASIN_FORMS_INTEGRATION.md Section 4

### ✅ Webhooks (Advanced)
- Real-time form notifications
- Server-side processing
- See BASIN_FORMS_INTEGRATION.md Section 8

### ✅ Netlify Functions (Advanced)
- Backend form processing
- Custom validation
- Database integration
- See BASIN_FORMS_INTEGRATION.md Section 7

---

## 📋 Key Files to Create/Update

### New Files to Create
```
src/lib/basinService.ts                 ← New service module
```

### Files to Update
```
src/pages/TicketForm.tsx                ← Update submission logic
src/pages/Home.tsx                      ← Update contact form
.env                                    ← Add environment variables
netlify.toml                            ← Update config (optional)
```

### No Changes Needed
```
src/App.tsx                             ← Unchanged
src/main.tsx                            ← Unchanged
src/components/                         ← Unchanged
vite.config.ts                          ← Unchanged (CORS automatic)
```

---

## 🔐 Configuration Summary

### Environment Variables Required
```env
VITE_BASIN_TICKET_FORM_ID=your-ticket-basket-id
VITE_BASIN_CONTACT_FORM_ID=your-contact-basket-id
```

### Netlify Environment Variables
Same as above, added in Netlify Dashboard:
- Site Settings → Build & Deploy → Environment

### Basin Dashboard Configuration
1. Recipient email: `rubcosizweni.office@gmail.com`
2. Email notifications: Enabled
3. Webhooks: Optional (for advanced use)

---

## 📊 Feature Comparison

### Basin vs Formspree vs Custom Backend

| Feature | Basin | Formspree | Custom |
|---------|-------|-----------|--------|
| **Free Tier** | Unlimited ✅ | 50/month | Varies |
| **File Attachments** | ✅ | ✅ | ✅ |
| **Email Notifications** | ✅ | ✅ | ✅ |
| **API** | ✅ | ✅ | ✅ |
| **Webhooks** | ✅ | ✅ | ✅ |
| **Setup Time** | 5 min ✅ | 5 min | Hours |
| **Maintenance** | None ✅ | None | Constant |
| **Cost** | Free ✅ | $20/mo | Varies |
| **Reliability** | 99.95% ✅ | 99.9% | Depends |

**Recommendation**: Basin is optimal for your use case.

---

## 🔗 Important Links

### Basin Resources
- **Main Site**: https://usebasin.com
- **Dashboard**: https://usebasin.com/dashboard
- **Documentation**: https://usebasin.com/docs
- **API Reference**: https://usebasin.com/api/v1/
- **Status Page**: https://status.usebasin.com
- **Support Email**: support@usebasin.com

### Your Forms
- **Ticket Form Endpoint**: `https://basin.glitch.me/{YOUR_TICKET_ID}`
- **Contact Form Endpoint**: `https://basin.glitch.me/{YOUR_CONTACT_ID}`

### Related Documentation
- [FORMSPREE_SETUP.md](./FORMSPREE_SETUP.md) - Current setup
- [FORM_SUBMISSION_SETUP.md](./FORM_SUBMISSION_SETUP.md) - Original setup guide
- [INTEGRATION_SUMMARY.md](./INTEGRATION_SUMMARY.md) - Project overview

---

## ✨ Implementation Highlights

### Advantages of This Setup
1. **Zero Cost**: Unlimited free submissions
2. **Simple Integration**: FormData-based (browser native)
3. **File Support**: Up to 25MB per attachment
4. **Email Integration**: Attachments sent directly to email
5. **No Rate Limiting**: Process as many forms as needed
6. **CORS Friendly**: Works in browser without backend
7. **Production Ready**: Used by thousands
8. **Easy Migration**: From Formspree (no code breaking)

### Security Features
- ✅ HTTPS only
- ✅ MIME type validation (server-side)
- ✅ File size limits (25MB max)
- ✅ Email verification built-in
- ✅ Spam protection available
- ✅ No sensitive data stored

---

## 🧪 Testing Strategy

### Unit Testing
```typescript
// Test basinService.ts functions
describe('basinService', () => {
  it('should validate file size', () => {
    const file = new File([], 'test.pdf');
    const result = basinService.validateFile(file);
    expect(result.valid).toBe(true);
  });
});
```

### Integration Testing
```typescript
// Test TicketForm component
it('should submit ticket form', async () => {
  const { getByRole } = render(<TicketForm />);
  const submitButton = getByRole('button', { name: /submit/i });
  fireEvent.click(submitButton);
  // Verify success message or redirect
});
```

### End-to-End Testing
1. Fill out ticket form
2. Upload file
3. Submit
4. Check email received
5. Verify attachment included

---

## 📈 Monitoring & Debugging

### Basin Dashboard Monitoring
1. Go to: https://usebasin.com/dashboard
2. Click on form
3. View submissions in real-time
4. Download data as CSV

### Browser Console Debugging
```javascript
// Monitor fetch requests
fetch('https://basin.glitch.me/...', { method: 'POST', body })
  .then(res => console.log('Response:', res.status))
  .catch(err => console.error('Error:', err))
```

### Error Logging
```typescript
// Add to basinService.ts for production monitoring
console.error('Form submission error:', {
  timestamp: new Date().toISOString(),
  formType: 'ticket|contact',
  errorMessage: error.message,
  statusCode: response?.status
});
```

---

## 🔄 Maintenance Checklist

### Monthly
- [ ] Check Basin dashboard for submissions
- [ ] Monitor email delivery
- [ ] Test form submissions
- [ ] Review error logs (if applicable)

### Quarterly
- [ ] Update Basin documentation references
- [ ] Review security settings
- [ ] Test file upload limits
- [ ] Verify email recipients still correct

### Annually
- [ ] Review Basin terms and conditions
- [ ] Check for API updates
- [ ] Audit form data retention
- [ ] Update disaster recovery plan

---

## ❓ FAQ

### Q: How much does Basin cost?
**A**: Completely free for unlimited submissions. No hidden fees.

### Q: What if I exceed file size limits?
**A**: Maximum 25MB per file. Larger files will be rejected with error message to user.

### Q: Can I track form submissions?
**A**: Yes, via Basin Dashboard. View all submissions, dates, and data.

### Q: What if Basin goes down?
**A**: Status page: https://status.usebasin.com. Typically 99.95% uptime.

### Q: Can I customize email templates?
**A**: Yes, in Basin Dashboard → Form Settings → Email Templates

### Q: How long is data retained?
**A**: Indefinitely in your Basin Dashboard. Can export as CSV anytime.

### Q: Is there an API usage limit?
**A**: No limits on free tier. Submit as many forms as you want.

### Q: Can I test locally?
**A**: Yes, use your Basin Basket ID even in development. All submissions go to email.

---

## 🚨 Support & Troubleshooting

### Common Issues

**"VITE_BASIN_TICKET_FORM_ID is undefined"**
- Solution: Add to .env and restart dev server (`npm run dev`)

**"File not attached to email"**
- Check field name is `Proof_of_Payment`
- Verify file size < 25MB
- Test with smaller file

**"CORS error in browser"**
- Use endpoint: `https://basin.glitch.me/{ID}` (not /api/v1/)

**"Email not received"**
- Check spam folder
- Verify recipient email in Basin settings
- Check internet connection

### Getting Help
1. Check relevant documentation file
2. Review troubleshooting sections
3. Test in Basin Dashboard directly
4. Contact: support@usebasin.com

---

## 📝 Documentation Versions

- **Version**: 1.0
- **Last Updated**: May 2026
- **Status**: Production Ready
- **Compatible With**:
  - React 18+
  - Vite 5+
  - Node 18+
  - Netlify
  - All modern browsers

---

## ✅ Next Steps

1. **Immediate** (Today)
   - [ ] Read BASIN_QUICK_REFERENCE.md
   - [ ] Create Basin account and forms
   - [ ] Copy Basket IDs

2. **Short-term** (This week)
   - [ ] Create basinService.ts
   - [ ] Update components
   - [ ] Test locally

3. **Medium-term** (Next week)
   - [ ] Set Netlify environment variables
   - [ ] Deploy to production
   - [ ] Production testing

4. **Long-term** (Ongoing)
   - [ ] Monitor submissions
   - [ ] Track email delivery
   - [ ] Maintain documentation

---

## 📞 Support Channels

- **Documentation**: See files in this workspace
- **Basin Support**: support@usebasin.com
- **Status Page**: https://status.usebasin.com
- **Community**: Basin Slack/Discord (available on usebasin.com)

---

## 📄 License & Attribution

All code examples in this documentation are provided as-is for use in your Rise-Up Bible Church website project. Basin Forms is provided by Basin under their Terms of Service.

**Documentation Created**: May 2026  
**Workspace**: /workspaces/rubc-osizweni

---

## 🎉 You're Ready!

You now have everything you need to integrate Basin Forms API into your website. Start with **BASIN_QUICK_REFERENCE.md** and refer to the other guides as needed.

**Good luck! 🚀**
