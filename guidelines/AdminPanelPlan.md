# Admin Panel — UI Implementation Plan
**Project:** Dolphin Japan  
**Phase:** 1 — UI with Mock Data (current)  
**Phase 2:** REST API Integration (future)

---

## Architecture

```
/admin                    → AdminLayout (standalone — no public navbar/footer)
/admin                    → Dashboard
/admin/permissions        → Role Permissions Management
/admin/users/admin        → Admin Users CRUD
/admin/users/editor       → Editor Users CRUD
/admin/users/customer     → Customer Users CRUD
/admin/cars/brand         → Car Brand CRUD
/admin/cars/model         → Car Model CRUD
/admin/cars/body-style    → Car Body Style CRUD
/admin/cars/color         → Car Color CRUD
/admin/cars/list          → Car CRUD (complex form)
/admin/faq                → FAQ CRUD
/admin/price-calculator   → Car Price Calculator CRUD
/admin/gallery            → Gallery Image CRUD
/admin/contact-list       → Contact Us List (from end users)
/admin/inquiry            → Inquiry List (from end users)
/admin/orders             → Order List
/admin/payments           → Payment List
```

---

## Admin Panel Color Scheme

| Element              | Value       |
|----------------------|-------------|
| Sidebar background   | `#1a2535`   |
| Header background    | `#2a7fa6`   |
| Active nav item      | `#263545`   |
| Content background   | `#eef0f3`   |
| Edit button          | `#2a7fa6`   |
| Delete button        | `#c0392b`   |
| Table alt row        | `#f7f9fb`   |
| White cards          | `#ffffff`   |

---

## Sidebar Navigation Structure

```
Dashboard
Role Permissions
▸ User
    Admin Users
    Editor Users
    Customer Users
▸ Car
    Brand
    Model
    Body Style
    Car Color
    Car
    FAQ
    Price Calculator
    Gallery
Contact Us List
Inquiry List
Order List
Payment List
```

---

## Module Specifications

---

### 1. Dashboard
**Stats Cards (4-column grid):**
- Total Cars in Inventory
- Total Registered Users
- Pending Inquiries
- Monthly Revenue

**Sections:**
- Popular Brands — horizontal bar chart
- Sales Overview — week / month / year bar chart tabs
- Recent Inquiries — mini table with status badges

---

### 2. Role Permissions Management
**Roles:** Super Admin · Admin · Editor · Customer  
*(Super Admin row is always all-checked and disabled)*

**Permission Matrix (module × role checkboxes):**

| Module | Super Admin | Admin | Editor | Customer |
|--------|-------------|-------|--------|----------|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| User Management | ✓ | ✓ | ✗ | ✗ |
| Car Management | ✓ | ✓ | ✓ | ✗ |
| Brand / Model / Body Style / Color | ✓ | ✓ | ✓ | ✗ |
| FAQ | ✓ | ✓ | ✓ | ✗ |
| Price Calculator | ✓ | ✓ | ✗ | ✗ |
| Gallery | ✓ | ✓ | ✓ | ✗ |
| Contact Us List | ✓ | ✓ | ✓ | ✗ |
| Inquiry List | ✓ | ✓ | ✓ | ✗ |
| Order List | ✓ | ✓ | ✗ | ✗ |
| Payment List | ✓ | ✓ | ✗ | ✗ |

---

### 3. User Management
**Sub-sections:** Admin · Editor · Customer

**Table Columns:** S/N · Name · Email · Phone · Phone Country Name · Phone Country Code · Address · Gender · Is Active? · Action

**Add / Edit Modal Fields:**
- Name *(text)*
- Email *(email)*
- Phone *(text)*
- Phone Country Code *(text)*
- Phone Country Name *(text)*
- Address *(text)*
- Gender *(select: Male / Female / Other)*
- Is Active *(checkbox)*
- Password *(password — only shown on Add)*
- Module Permissions *(checklist — only for Admin / Editor)*

---

### 4. Car Brand (CRUD)
**Fields:** Name  
**Table Columns:** S/N · Name · Action (Edit | Delete)

---

### 5. Car Model (CRUD)
**Fields:** Name · Brand *(select)*  
**Table Columns:** S/N · Name · Brand · Action

---

### 6. Car Body Style (CRUD)
**Fields:** Name · Image *(file upload)*  
**Table Columns:** S/N · Name · Action

---

### 7. Car Color (CRUD)
**Fields:** Name  
**Table Columns:** S/N · Name · Action

---

### 8. Car (CRUD) — Complex Form
**Table Columns:** S/N · Title · Brand · Model · Year · Price · Mileage · Action

**Basic Info (3-column grid):**
| Field | Type |
|-------|------|
| Brand | select |
| Model | select (filtered by brand) |
| Body Style | select |
| Color | select |
| Title | text |
| Price | number |
| Model Year | date picker |
| Stock Number | text |
| Update Date | date picker |
| Location | text |
| Mileage | number |
| Mileage Unit | select: KM / MI |
| Repaired | select: NONE / MINOR / MAJOR |
| Steering | select: LEFT / RIGHT |
| Transmission | select: AT / MT / CVT |
| Fuel | select: GASOLINE / DIESEL / HYBRID / ELECTRIC |
| Drive System | select: 2WD / 4WD / AWD |
| Doors | select: 2D / 3D / 4D / 5D |
| Displacement | text |
| Chassis No | text |
| Model Code | text |
| Description | textarea |
| Seating Capacity | select: 1–9 |
| Is Featured? | checkbox |
| Cubic Meter | text |

**Specific Info:**

*Car Condition:*
- Maintenance Record Available
- One Owner
- Non-smoking Car

*Standard Features:*
- Welfare Vehicles
- Cold Weather Specification Car
- Supercharger
- Seating Capacity 2

*Equipment:*
- Electric Retractable Mirror · Center Differential Lock · Clean Diesel · 100V Power Supply · Bluetooth Connection · USB Input Terminal · Drive Recorder · Idling Stop · Anti-theft Device · Power Window · Power Steering · Downhill Assist Control · Lift Up · Double Air-conditioner · Air Conditioner · ABC · Sun / Moon Roof · Manual Sliding Door on Both Sides · Driver Seat Airbag / Passenger Seat Airbag

*Interior / Exterior:*
- Headlight Washer · Air Suspension · Roof Rail · Side Camera · All-around Camera · Seat Air Conditioner · Front Camera · Electric Rear Gate · Walk Through · Seat Heater · Electric Retractable Third Seat · Ottoman · Tip Up Seat · Full Flat Sheet · Bench Seat · 3-row Seat · Power Seats · Run Flat Tire · Lowdown · Smart Key · Aero · ETC · Back Camera · HID (xenon light) · LED Headlamp · Keyless · Half Leather Seat · Leather Seat · Alloy Wheel · DVD Playback · Music Player Connectable / CD or CD Changer / Music Server · TV (full segment) · TV & Navigation / Memory Navi etc.

*Self-driving:*
- Park Assist · Automatic Parking System · Lane Keep Assist · Auto Cruise Control

*Safety Equipment:*
- Active Headrest · Auto Light · Automatic High Beam · Clearance Sonar · Collision Damage Reduction System · Collision Safety Body · ESC (Electronic Stability Control)

---

### 9. FAQ (CRUD)
**Fields:** Question *(textarea)* · Answer *(textarea)* · Position *(number)*  
**Table Columns:** S/N · Question (truncated) · Answer (truncated) · Action

---

### 10. Car Price Calculator (CRUD)
**Fields:**
- Country *(select)*
- Destination Port *(text)*
- Delivery Charge *(number)*
- Marine Insurance *(number)*
- Pre Export Inspection *(number)*

**Table Columns:** S/N · Country · Port · Delivery Charge · Marine Insurance · Pre Export Inspection · Action

---

### 11. Gallery Image (CRUD)
**Fields:** Title · Image *(file upload)* · Category  
**View:** Responsive image card grid with title, category, delete button

---

### 12. Contact Us List *(read from end users)*
**Columns:** S/N · User Name · Company Name · Country · Email · Phone · Comment · Action (View | Delete)

---

### 13. Inquiry List *(read from end users)*
**Columns:** S/N · Name · Car · Country · Email · Phone · Message · Date · Action (View | Delete)

---

### 14. Order List
**Columns:** S/N · User · Car · Country · Status · Date · Amount · Action (View | Update Status)

---

### 15. Payment List
**Columns:** S/N · User · Order ID · Amount · Status · Date · Payment Method · Action (View)

---

## File Structure

```
src/app/admin/
├── AdminLayout.tsx                  ← Sidebar + Header + Outlet
├── components/
│   ├── AdminModal.tsx               ← Reusable modal wrapper
│   └── ConfirmDialog.tsx            ← Delete confirmation dialog
└── pages/
    ├── DashboardPage.tsx
    ├── PermissionsPage.tsx
    ├── users/
    │   ├── AdminUsersPage.tsx
    │   ├── EditorUsersPage.tsx
    │   └── CustomerUsersPage.tsx
    ├── cars/
    │   ├── BrandPage.tsx
    │   ├── ModelPage.tsx
    │   ├── BodyStylePage.tsx
    │   ├── ColorPage.tsx
    │   └── CarPage.tsx              ← Most complex (scrollable sections)
    ├── FaqPage.tsx
    ├── PriceCalculatorPage.tsx
    ├── GalleryPage.tsx
    ├── ContactListPage.tsx
    ├── InquiryListPage.tsx
    ├── OrderListPage.tsx
    └── PaymentListPage.tsx
```

---

## Implementation Phases

### Phase 1 — Current (UI + Mock Data)
- [x] Standalone AdminLayout (sidebar + header, isolated from public site)
- [x] All 15 modules with mock data in local React state
- [x] Full CRUD modals (add / edit / delete confirmation)
- [x] Role Permissions matrix
- [x] Dashboard with stats, charts, recent data

### Phase 2 — REST API Integration
- [ ] Replace mock arrays with React Query / SWR data fetching
- [ ] API base URL in `.env` — `VITE_API_BASE_URL`
- [ ] Add loading skeletons and error toasts
- [ ] JWT auth guard — redirect to `/admin/login` if no token
- [ ] File upload endpoints for images (Gallery, Body Style, Car)
- [ ] Pagination for large lists (Cars, Users, Inquiries)
- [ ] Server-side filtering and search

### Phase 3 — Auth & Role Guards
- [ ] `/admin/login` login page
- [ ] Protected routes based on decoded JWT claims
- [ ] Role-based UI — hide/show buttons based on user permissions
- [ ] Audit log for CRUD actions
- [ ] Session timeout handling
