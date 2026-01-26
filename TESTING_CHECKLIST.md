# Testing Checklist - E-Commerce Product System

## Pre-Deployment Testing

### Backend Testing

#### 1. Seed Endpoint Test
```bash
# Test the seed endpoint
curl -X POST https://amazon-clone-project-kv7m.onrender.com/api/products/seed

# Expected Response:
# {
#   "success": true,
#   "message": "Successfully seeded X products",
#   "count": 50,
#   "total": 50
# }
```

**Status**: [ ] Pass / [ ] Fail

---

#### 2. Get Products Endpoint Test
```bash
# Test getting all products
curl https://amazon-clone-project-kv7m.onrender.com/api/products

# Expected Response:
# {
#   "success": true,
#   "data": [...array of products...],
#   "count": 50
# }
```

**Status**: [ ] Pass / [ ] Fail

---

#### 3. Get Products by Category Test
```bash
# Test category filtering
curl "https://amazon-clone-project-kv7m.onrender.com/api/products?category=electronics"

# Expected: Only electronics products returned
```

**Status**: [ ] Pass / [ ] Fail

---

#### 4. Search Products Test
```bash
# Test search functionality
curl "https://amazon-clone-project-kv7m.onrender.com/api/products?search=laptop"

# Expected: Products with "laptop" in title or description
```

**Status**: [ ] Pass / [ ] Fail

---

#### 5. Get Categories Test
```bash
# Test categories endpoint
curl https://amazon-clone-project-kv7m.onrender.com/api/products/categories

# Expected Response:
# {
#   "success": true,
#   "data": ["electronics", "fashion", "home", "books", "sports", "toys"]
# }
```

**Status**: [ ] Pass / [ ] Fail

---

### Frontend Testing (Local)

Before deploying to Vercel, test locally:

```bash
cd Frontend/my-app
npm run dev
```

#### 1. Home Page Load
- [ ] Page loads without errors
- [ ] Loading spinner appears initially
- [ ] Products load and display

**Status**: [ ] Pass / [ ] Fail

---

#### 2. Grid Layout Balance
- [ ] Desktop: 4 columns visible
- [ ] Tablet: 3 columns visible
- [ ] Mobile: 2 or 1 column visible
- [ ] No empty columns while others are full
- [ ] All products distributed evenly

**Status**: [ ] Pass / [ ] Fail

---

#### 3. Category Sections
- [ ] "Featured Products" section displays
- [ ] "Electronics & Gadgets" section displays
- [ ] "Fashion & Apparel" section displays
- [ ] "Home & Kitchen" section displays
- [ ] "Books & Reading" section displays
- [ ] "Sports & Fitness" section displays
- [ ] "Toys & Games" section displays
- [ ] Each section shows up to 8 products
- [ ] "See all" links are present

**Status**: [ ] Pass / [ ] Fail

---

#### 4. Product Cards
- [ ] Product title displays correctly
- [ ] Product price displays in $XX.XX format
- [ ] Star rating displays (5 stars)
- [ ] Product image loads or shows fallback
- [ ] "Add to Cart" button is visible
- [ ] Product card is clickable

**Status**: [ ] Pass / [ ] Fail

---

#### 5. Error Handling
Test by temporarily changing API URL to invalid:

- [ ] Error message displays
- [ ] Retry button appears
- [ ] Retry button works when clicked
- [ ] No console errors

**Status**: [ ] Pass / [ ] Fail

---

#### 6. Image Fallback
Test by using invalid image URL:

- [ ] Placeholder image displays
- [ ] Layout remains consistent
- [ ] No broken image icons

**Status**: [ ] Pass / [ ] Fail

---

#### 7. Loading States
- [ ] Loading spinner shows on initial load
- [ ] Loading text displays
- [ ] Spinner animates smoothly
- [ ] Products appear after loading

**Status**: [ ] Pass / [ ] Fail

---

#### 8. Responsive Design
Test on different screen sizes:

**Desktop (1920x1080)**:
- [ ] 4 columns display
- [ ] Products are evenly distributed
- [ ] No horizontal scroll

**Tablet (768x1024)**:
- [ ] 3 columns display
- [ ] Layout adjusts smoothly
- [ ] No horizontal scroll

**Mobile (375x667)**:
- [ ] 2 or 1 column displays
- [ ] Products stack vertically
- [ ] Touch targets are adequate
- [ ] No horizontal scroll

**Status**: [ ] Pass / [ ] Fail

---

### Post-Deployment Testing (Vercel)

After deploying to Vercel:

#### 1. Production URL Access
- [ ] Site loads at Vercel URL
- [ ] No 404 errors
- [ ] HTTPS is working

**Status**: [ ] Pass / [ ] Fail

---

#### 2. API Connection
- [ ] Frontend connects to backend
- [ ] Products load from API
- [ ] No CORS errors in console

**Status**: [ ] Pass / [ ] Fail

---

#### 3. Environment Variables
- [ ] VITE_API_BASE_URL is set correctly
- [ ] Firebase config is working
- [ ] Stripe key is configured

**Status**: [ ] Pass / [ ] Fail

---

#### 4. Performance
- [ ] Page loads in < 3 seconds
- [ ] Images load progressively
- [ ] No layout shifts
- [ ] Smooth scrolling

**Status**: [ ] Pass / [ ] Fail

---

#### 5. Cross-Browser Testing
Test on multiple browsers:

**Chrome**:
- [ ] Layout correct
- [ ] All features work

**Firefox**:
- [ ] Layout correct
- [ ] All features work

**Safari**:
- [ ] Layout correct
- [ ] All features work

**Edge**:
- [ ] Layout correct
- [ ] All features work

**Status**: [ ] Pass / [ ] Fail

---

## Critical Issues Checklist

If any of these fail, DO NOT deploy:

- [ ] Backend API is accessible
- [ ] Products load from database
- [ ] Grid layout is balanced
- [ ] No console errors on page load
- [ ] Images load or show fallback
- [ ] Mobile layout works correctly

---

## Known Issues / Limitations

Document any known issues here:

1. **Image Paths**: Product images use placeholder paths. Real images need to be uploaded.
2. **Category Pages**: Category detail pages may need additional work.
3. **Search**: Search functionality exists but may need UI improvements.

---

## Testing Notes

Add any additional notes or observations here:

---

## Sign-Off

**Tested By**: ___________________
**Date**: ___________________
**Environment**: [ ] Local [ ] Staging [ ] Production
**Overall Status**: [ ] Pass [ ] Fail [ ] Pass with Issues

---

## Next Steps After Testing

If all tests pass:
1. ✅ Deploy to Vercel production
2. ✅ Monitor for errors in first 24 hours
3. ✅ Gather user feedback
4. ✅ Plan next iteration

If tests fail:
1. ❌ Document failures
2. ❌ Fix issues
3. ❌ Re-test
4. ❌ Deploy when all tests pass
