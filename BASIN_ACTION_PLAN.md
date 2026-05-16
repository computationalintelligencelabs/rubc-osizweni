# Basin Forms Integration - Action Plan & Checklist

## 📋 Complete Action Plan

### Phase 1: Setup & Discovery (30 minutes)
**Objective**: Get Basin account and form IDs configured

#### Tasks:
- [ ] **Task 1.1**: Visit https://usebasin.com
  - Sign up with email: `rubcosizweni.office@gmail.com`
  - Note: Use same account/email as Formspree for consistency

- [ ] **Task 1.2**: Create "Gala Dinner Tickets" Form
  - Form name: "Gala Dinner Ticket Registration"
  - Recipient email: `rubcosizweni.office@gmail.com`
  - Enable email notifications: ✅
  - **SAVE**: Basket ID (e.g., `abc123def456`)

- [ ] **Task 1.3**: Create "Contact Form"
  - Form name: "Contact Form"
  - Recipient email: `rubcosizweni.office@gmail.com`
  - Enable email notifications: ✅
  - **SAVE**: Basket ID

- [ ] **Task 1.4**: Test Basic Submission
  - Submit test form directly on Basin website
  - Verify email received at `rubcosizweni.office@gmail.com`
  - Delete test submission

#### Deliverables:
- [ ] Basin account created
- [ ] 2 forms created
- [ ] Both Basket IDs copied
- [ ] Email confirmation received

---

### Phase 2: Local Development (1-2 hours)
**Objective**: Update code locally and test before deployment

#### Tasks:

- [ ] **Task 2.1**: Update `.env` File
  ```bash
  # Open: /workspaces/rubc-osizweni/.env
  # Add these lines:
  VITE_BASIN_TICKET_FORM_ID=<paste-ticket-basket-id>
  VITE_BASIN_CONTACT_FORM_ID=<paste-contact-basket-id>
  ```

- [ ] **Task 2.2**: Create `basinService.ts`
  ```bash
  # Create: src/lib/basinService.ts
  # Copy complete code from: BASIN_IMPLEMENTATION_EXAMPLES.md (File 1)
  ```
  - [ ] Copy service module code
  - [ ] Paste into `src/lib/basinService.ts`
  - [ ] Save file
  - [ ] No modifications needed

- [ ] **Task 2.3**: Update `TicketForm.tsx`
  ```bash
  # Edit: src/pages/TicketForm.tsx
  # Reference: BASIN_IMPLEMENTATION_EXAMPLES.md (File 2)
  ```
  - [ ] Remove old Formspree form action
  - [ ] Add `import { basinService } from "../lib/basinService"`
  - [ ] Update submit handler to use basinService
  - [ ] Keep UI structure, only change submission logic
  - [ ] Test component renders

- [ ] **Task 2.4**: Update Contact Form in `Home.tsx`
  ```bash
  # Edit: src/pages/Home.tsx
  # Reference: BASIN_IMPLEMENTATION_EXAMPLES.md (File 3)
  ```
  - [ ] Find contact form section
  - [ ] Add `import { basinService }` at top
  - [ ] Replace form submission logic
  - [ ] Keep existing form markup
  - [ ] Test component renders

- [ ] **Task 2.5**: Restart Development Server
  ```bash
  # Terminal:
  npm run dev
  
  # Wait for:
  # ✓ compiled successfully
  # VITE v5.x.x ready in X ms
  ```

#### Deliverables:
- [ ] All environment variables set
- [ ] `basinService.ts` created
- [ ] Both components updated
- [ ] Dev server running without errors

---

### Phase 3: Local Testing (30-45 minutes)
**Objective**: Test both forms locally before deployment

#### Test 1: Ticket Form Submission with File
```
1. Go to: http://localhost:5173/events or navigate to Ticket Form
2. Fill out form:
   - Full Name: "Test User"
   - Email: "your-email@gmail.com"
   - Ticket Type: "VIP"
3. Upload file: Any JPG or PNG image
4. Click "Submit Reservation"
5. Verify:
   - ✅ Success message appears
   - ✅ Email received at rubcosizweni.office@gmail.com within 5 seconds
   - ✅ File is attached to email
   - ✅ All form data visible in email
6. Test error handling:
   - Try submitting without file → Error message
   - Try large file (>25MB) → Error message
   - Try invalid file type → Error message
```

**Checklist**:
- [ ] Form renders without errors
- [ ] File upload works
- [ ] Success message displays
- [ ] Email received
- [ ] File attachment present
- [ ] Error handling works
- [ ] Form can be submitted again

#### Test 2: Contact Form Submission
```
1. Go to: http://localhost:5173 (Home page)
2. Scroll to "Get in Touch" section
3. Fill out form:
   - First Name: "Test"
   - Last Name: "User"
   - Email: "your-email@gmail.com"
   - Message: "This is a test message"
4. Click "Send Message"
5. Verify:
   - ✅ Success message appears
   - ✅ Email received at rubcosizweni.office@gmail.com
   - ✅ All data in email
   - ✅ Form clears after submission
```

**Checklist**:
- [ ] Form renders correctly
- [ ] Success message displays
- [ ] Email received
- [ ] All data correct
- [ ] Form resets

#### Test 3: Browser Console Check
```
1. Open browser DevTools: F12 or Right-click → Inspect
2. Go to Console tab
3. Submit forms
4. Verify:
   - ✅ No JavaScript errors
   - ✅ No CORS errors
   - ✅ Network requests successful (200 status)
5. Close DevTools
```

**Checklist**:
- [ ] No console errors
- [ ] No warnings
- [ ] Network requests successful

#### Deliverables:
- [ ] All tests passed
- [ ] Emails received
- [ ] Files attached correctly
- [ ] Error handling verified

---

### Phase 4: Production Deployment (30 minutes)
**Objective**: Deploy to Netlify with production configuration

#### Tasks:

- [ ] **Task 4.1**: Add Environment Variables to Netlify
  ```bash
  1. Go to: https://app.netlify.com
  2. Select your site: rubc-osizweni
  3. Site Settings → Build & Deploy → Environment
  4. Add variables:
     - VITE_BASIN_TICKET_FORM_ID = <your-ticket-id>
     - VITE_BASIN_CONTACT_FORM_ID = <your-contact-id>
  5. Click "Save"
  ```

- [ ] **Task 4.2**: Commit Code Changes
  ```bash
  # Terminal:
  cd /workspaces/rubc-osizweni
  git add src/lib/basinService.ts
  git add src/pages/TicketForm.tsx
  git add src/pages/Home.tsx
  git add .env
  git commit -m "Integrate Basin Forms API for ticket and contact forms"
  ```

- [ ] **Task 4.3**: Push to GitHub
  ```bash
  # Terminal:
  git push origin main
  ```

- [ ] **Task 4.4**: Monitor Netlify Deploy
  ```bash
  1. Go to: https://app.netlify.com
  2. Select: rubc-osizweni
  3. Deployments tab
  4. Wait for build to complete (5-10 minutes)
  5. Look for: "Published" status
  ```

- [ ] **Task 4.5**: Production Verification
  ```bash
  # Do NOT skip this!
  1. Wait 2-3 minutes after "Published"
  2. Go to: https://rubc-osizweni.netlify.app
   OR: https://www.rubc-osizweni.org (if custom domain)
  3. Test ticket form:
     - Fill form
     - Upload file
     - Submit
     - Verify success message
  4. Check email at rubcosizweni.office@gmail.com
     - File attached?
     - Data correct?
  5. Test contact form:
     - Fill form
     - Submit
     - Verify email received
  ```

#### Deliverables:
- [ ] Code committed to Git
- [ ] Environment variables set on Netlify
- [ ] Deployment completed successfully
- [ ] Production forms tested
- [ ] Emails received correctly

---

## 🔄 Rollback Plan (If Issues)

If something goes wrong in production:

```bash
# Step 1: Revert code to previous version
git revert HEAD

# Step 2: Push to main
git push origin main

# Step 3: Wait for Netlify to auto-deploy (5-10 min)

# Step 4: Verify Formspree forms still work
# (Formspree IDs should still work if code reverted)
```

---

## 🧪 Testing Matrix

| Feature | Local | Production | Status |
|---------|-------|-----------|--------|
| Ticket form renders | [ ] | [ ] | |
| Ticket form submits | [ ] | [ ] | |
| File attaches | [ ] | [ ] | |
| Email received | [ ] | [ ] | |
| Contact form renders | [ ] | [ ] | |
| Contact form submits | [ ] | [ ] | |
| Email received | [ ] | [ ] | |
| Error handling | [ ] | [ ] | |
| Browser console clean | [ ] | [ ] | |
| Mobile responsive | [ ] | [ ] | |

---

## ⏱️ Time Estimates

| Phase | Tasks | Time | Status |
|-------|-------|------|--------|
| Phase 1 | Setup & Discovery | 30 min | [ ] |
| Phase 2 | Development | 60-120 min | [ ] |
| Phase 3 | Local Testing | 30-45 min | [ ] |
| Phase 4 | Production Deploy | 30 min | [ ] |
| **Total** | **All** | **3-4 hours** | [ ] |

---

## 📞 Troubleshooting Quick Reference

### During Local Development

| Problem | Solution | Status |
|---------|----------|--------|
| `VITE_BASIN_TICKET_FORM_ID undefined` | Restart: `npm run dev` | [ ] |
| `basinService not found` | Check file path: `src/lib/basinService.ts` | [ ] |
| `fetch is not a function` | Use modern Node (18+) | [ ] |
| Import errors | Ensure exact file paths and names | [ ] |

### During Production Deployment

| Problem | Solution | Status |
|---------|----------|--------|
| Build fails | Check Netlify build logs | [ ] |
| Forms not submitting | Check Netlify env vars set | [ ] |
| Email not received | Test in Basin Dashboard directly | [ ] |
| CORS errors | Check using correct endpoint | [ ] |

---

## 📞 Contact Information

### Support Resources
- **Basin Support**: support@usebasin.com
- **Basin Status**: https://status.usebasin.com
- **Netlify Support**: support@netlify.com
- **Documentation**: See workspace README files

### Your Configuration
- **Ticket Form**: `https://basin.glitch.me/{YOUR_TICKET_ID}`
- **Contact Form**: `https://basin.glitch.me/{YOUR_CONTACT_ID}`
- **Email Recipient**: rubcosizweni.office@gmail.com
- **Netlify Site**: rubc-osizweni.netlify.app

---

## ✅ Sign-Off Checklist

When all phases complete, check these items:

- [ ] **Phase 1 Complete**: Basin setup done
- [ ] **Phase 2 Complete**: All code updated
- [ ] **Phase 3 Complete**: All tests passed locally
- [ ] **Phase 4 Complete**: Production deployed & tested

### Deployment Verified ✓
- [ ] Ticket form works in production
- [ ] Contact form works in production
- [ ] Files attach correctly
- [ ] Emails received
- [ ] Error messages display
- [ ] No console errors

### Ready for Production ✓
- [ ] All checklists complete
- [ ] No outstanding issues
- [ ] Documentation reviewed
- [ ] Team informed
- [ ] Monitoring set up

---

## 📅 Recommended Timeline

### Day 1: Setup
- Morning: Complete Phase 1 (Setup & Discovery)
- Afternoon: Complete Phase 2 (Development)

### Day 2: Testing
- Morning: Complete Phase 3 (Local Testing)
- Afternoon: Complete Phase 4 (Production Deploy)

### Day 3: Verification
- Verify production forms working
- Monitor email delivery
- Check for issues

---

## 🎉 Success Criteria

Your implementation is successful when:

1. ✅ Ticket form submits with file attachment
2. ✅ Email received at rubcosizweni.office@gmail.com
3. ✅ File attached to email
4. ✅ Contact form submits
5. ✅ Email received for contact form
6. ✅ No JavaScript errors
7. ✅ Works on desktop & mobile
8. ✅ Works in production environment

---

## 📝 Notes & Observations

Use this space to track progress and issues:

```
Phase 1 Notes:
- Basin IDs: _______________
- Issue: _______________

Phase 2 Notes:
- Environment vars set: Y/N
- Issue: _______________

Phase 3 Notes:
- Test results: _______________
- Issue: _______________

Phase 4 Notes:
- Deploy status: _______________
- Issue: _______________

Final Notes:
- Overall status: _______________
```

---

## 🚀 You're Ready to Begin!

Start with **Phase 1** and follow the checklist step by step. 

If you need clarification on any step:
- Check **BASIN_IMPLEMENTATION_EXAMPLES.md** for code
- Check **BASIN_FORMS_INTEGRATION.md** for detailed info
- Check **BASIN_QUICK_REFERENCE.md** for quick answers

**Good luck! Let's get those forms working! 🎯**
