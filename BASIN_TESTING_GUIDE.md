# Basin Forms Integration - Quick Testing Guide

## Local Testing (Development)

### Prerequisites
```bash
# Clone and setup
git clone https://github.com/computationalintelligencelabs/rubc-osizweni.git
cd rubc-osizweni
npm install

# Create .env.local with test Basin IDs
echo "VITE_BASIN_ENDPOINT=https://basin.glitch.me" > .env.local
echo "VITE_BASIN_TICKET_ID=test_ticket_id" >> .env.local
echo "VITE_BASIN_CONTACT_ID=test_contact_id" >> .env.local
```

### Start Dev Server
```bash
npm run dev
# Opens at http://localhost:5173
```

---

## Test 1: Ticket Form with File Upload

### Steps:
1. Navigate to `/events`
2. Click "Register" on Gala Dinner event
3. Fill form:
   - **Name**: "Test User"
   - **Email**: test@example.com
   - **Ticket Type**: "VIP"
   - **File**: Upload any JPG/PNG/PDF
4. Click "Submit Reservation"

### Expected Results:
- ✅ Loading state shows "Submitting..."
- ✅ Success message appears after 1-2 seconds
- ✅ Form auto-resets
- ✅ Page redirects to /events after 2 seconds

### Verification:
- Check Basin dashboard for submission
- Verify file attachment included
- Check email receipt (if configured)

---

## Test 2: Contact Form

### Steps:
1. Go to Home page
2. Scroll to "Get in Touch" section
3. Fill form:
   - **First Name**: "John"
   - **Last Name**: "Doe"
   - **Email**: john@example.com
   - **Message**: "This is a test message"
4. Click "Send Message"

### Expected Results:
- ✅ Form submits
- ✅ Success message shows
- ✅ Message displays: "Message Sent!"
- ✅ Form clears after 3 seconds

### Verification:
- Check Basin dashboard for submission
- No file attachment (contact form has no file field)

---

## Test 3: Error Handling

### Test 3a: Invalid File Type
1. Open Ticket Form
2. Try uploading `.txt` or `.doc` file
3. Click "Submit Reservation"

**Expected**: ❌ Error message: "Only JPG, PNG, GIF, and PDF files are accepted"

### Test 3b: Oversized File
1. Open Ticket Form
2. Try uploading file > 25MB
3. Click "Submit Reservation"

**Expected**: ❌ Error message about file size limit

### Test 3c: Missing Fields
1. Open Contact Form
2. Leave email field empty
3. Click "Send Message"

**Expected**: ❌ Browser validation error (required field)

### Test 3d: Invalid Email
1. Open Contact Form
2. Enter email: "notanemail"
3. Fill other fields
4. Click "Send Message"

**Expected**: ❌ Error message: "Invalid email address"

---

## Test 4: File Attachment Verification

### Steps:
1. Submit Ticket Form with JPG image
2. Check Basin dashboard
3. Look for submission with attachment

### Expected:
- ✅ Submission appears in Basin dashboard
- ✅ File size shown correctly
- ✅ File can be downloaded
- ✅ Email includes attachment

---

## Test 5: Validation Edge Cases

### Valid Files:
- ✅ JPG images
- ✅ PNG images
- ✅ GIF images
- ✅ PDF documents

### Invalid Files:
- ❌ .txt files
- ❌ .docx files
- ❌ .zip files
- ❌ Files > 25MB

### Test Command:
```bash
# Create test file
dd if=/dev/zero of=test.jpg bs=1M count=10  # 10MB JPG
dd if=/dev/zero of=large.jpg bs=1M count=26  # 26MB (too large)
```

---

## Production Testing (Netlify)

### After Deployment:
1. Visit live site: https://your-domain.netlify.app
2. Repeat all tests above
3. Verify emails received at rubcosizweni.office@gmail.com

### Monitor in Basin Dashboard:
- Watch for new submissions
- Check timestamps
- Verify all fields captured

---

## Browser Console Testing

### Check for Errors:
1. Open DevTools: F12
2. Go to Console tab
3. Look for any errors
4. Red text = JavaScript error
5. Orange text = Warning

### Console Output (Expected):
```
// No errors should appear
// Only normal React dev messages
```

### Common Errors (What to Look For):
```
❌ "Cannot find basin service"
❌ "VITE_BASIN_TICKET_ID is undefined"
❌ "FormData is not defined"
❌ "fetch is not defined"
```

If you see these:
- Check .env.local is set correctly
- Verify browser supports FormData (all modern browsers)
- Check network tab in DevTools

---

## Network Tab Testing

### View Form Submissions:
1. Open DevTools: F12
2. Go to Network tab
3. Submit form
4. Look for request to: `basin.glitch.me`

### Expected Response:
```
Method: POST
URL: https://basin.glitch.me/{BASKET_ID}
Status: 200
Type: fetch
```

### Verify Request:
1. Click the request
2. Go to Request tab
3. Check form fields are present
4. Go to Response tab
5. Should be empty or minimal

---

## Email Testing

### Check Received Email:
1. Submit form via Ticket Form
2. Wait 1-2 minutes
3. Check email inbox
4. Look for email from Basin

### Email Should Contain:
- Form field values
- File attachment (if submitted)
- Timestamp
- Recipient: rubcosizweni.office@gmail.com

### Check Spam/Junk:
- If email not received, check spam
- Whitelist Basin domain: basin@usebasin.com

---

## Automated Test Script

### Create `test-forms.sh`:
```bash
#!/bin/bash

echo "🧪 Testing Basin Forms Integration..."

# Test 1: Check environment variables
echo "✓ Test 1: Environment variables"
grep -q "VITE_BASIN" .env.local && echo "  ✅ Variables found" || echo "  ❌ Variables missing"

# Test 2: Check service file
echo "✓ Test 2: Service file"
test -f "src/lib/basinService.ts" && echo "  ✅ Service file exists" || echo "  ❌ Service file missing"

# Test 3: Check build
echo "✓ Test 3: Build"
npm run build > /dev/null 2>&1 && echo "  ✅ Build successful" || echo "  ❌ Build failed"

# Test 4: Check for Formspree
echo "✓ Test 4: Formspree cleanup"
! grep -r "formspree.io" src/ && echo "  ✅ No Formspree references" || echo "  ⚠️  Formspree references found"

echo ""
echo "🎉 Testing complete!"
```

### Run:
```bash
chmod +x test-forms.sh
./test-forms.sh
```

---

## Troubleshooting

### Issue: Form doesn't submit
- [ ] Check environment variables
- [ ] Check browser console for errors
- [ ] Verify Basin basket IDs
- [ ] Check network tab for failed requests

### Issue: File not attached
- [ ] Check file format (JPG/PNG/GIF/PDF only)
- [ ] Check file size (< 25MB)
- [ ] Check browser console for validation error
- [ ] Try different file

### Issue: Email not received
- [ ] Check spam folder
- [ ] Verify email address in Basin
- [ ] Check Basin dashboard for submission
- [ ] Wait 2-3 minutes (email can be slow)

---

## Success Checklist

After all tests pass:

- [ ] Ticket Form submits successfully
- [ ] Contact Form submits successfully
- [ ] Files attach correctly
- [ ] Emails received
- [ ] Error handling works
- [ ] No console errors
- [ ] No Formspree references
- [ ] Build completes without warnings

---

## Next Steps

1. ✅ Complete all tests above
2. 📋 Review [NETLIFY_DEPLOYMENT_GUIDE.md](NETLIFY_DEPLOYMENT_GUIDE.md)
3. 🚀 Deploy to Netlify
4. 📊 Monitor Basin dashboard
5. ✉️ Verify email delivery

---

**Test Date**: May 16, 2026  
**Status**: Ready for Testing
