# 🧪 Rent Control Manager – Comprehensive Test Plan

## 1. Authentication
- [ ] Login flow for landlords and residents
- [ ] Google OAuth login
- [ ] Signup with verification
- [ ] Password reset and recovery
- [ ] Session persistence across refresh

## 2. Dashboard (Landlord)
- [ ] Add property flow
- [ ] Invite residents
- [ ] Upload documents per resident
- [ ] See payment history & activity logs

## 3. Dashboard (Resident)
- [ ] View assigned property and rent details
- [ ] Pay rent (test payment gateway, 2% fee)
- [ ] View/download shared documents
- [ ] Post items in community marketplace

## 4. Marketplace
- [ ] Post item for sale (resident)
- [ ] Buy item flow (test fee deduction)
- [ ] Moderation or approval (if applicable)

## 5. Multi-Property Logic
- [ ] One landlord → multiple properties
- [ ] Each property → multiple residents
- [ ] Proper dashboard separation

## 6. Subscriptions & Billing
- [ ] Test tier switching (Free → $49 → $99)
- [ ] Ensure limits per tier are respected
- [ ] Handle cancellation / downgrade

## 7. Accessibility / Performance
- [ ] Lighthouse audits (run via `.lighthouserc`)
- [ ] Mobile + tablet responsiveness
- [ ] Keyboard navigation

## 8. Deployment
- [ ] Production and Preview work via Vercel
- [ ] All APIs function properly from frontend
- [ ] Error boundaries and fallback UI

---

✅ All tests should pass manually or via automation (`/tests`).
