# Lendsqr Core Dashboard Application

A high-fidelity, pixel-perfect, and fully functional fintech platform dashboard designed with absolute precision. This application is built utilizing **Next.js (App Router)**, **TypeScript**, **Supabase**, and a robust modular **Sass (SCSS) 7-1 Architecture**. It delivers a highly fluid user experience with complete data persistence and optimized asset delivery.

---

## 🎨 High-Fidelity Styling & Design System

The layout, spacing, colors, and typography match the official Figma design specifications down to sub-pixel coordinates. The design system features:
* **Primary Color**: `#39CDCC` (Teal)
* **Secondary Color**: `#213F7D` (Deep Indigo Blue)
* **Text Slate Color**: `#545F7D` (Slate Grayish Blue)
* **Background Canvas**: `#FBFBFB` (Off-white canvas)
* **Typography**: Integrated **Work Sans** as the primary typeface paired with **Roboto** for responsive data metrics.

### 🖼️ Core Asset Alignment Specifications

#### 1. Login Page Logo Alignment
* **Asset Source**: `https://jrwptnalqevxqenwipvn.supabase.co/storage/v1/object/public/lendsqr-assesement/logo/logo.png`
* **Layout Paradigm**: Absolute containment within the login page branding header.
* **Sass Specifications**:
  ```scss
  position: absolute;
  top: 106px;
  left: 97px;
  width: 173.76px;
  height: 36px;
  ```

#### 2. Navigation Header Logo Alignment
* **Asset Source**: `https://jrwptnalqevxqenwipvn.supabase.co/storage/v1/object/public/lendsqr-assesement/logo/logo.png`
* **Layout Paradigm**: Left-contained within the top dashboard header for high-resolution desktop viewports, with adaptive media-query support for smaller touch screens.
* **Sass Specifications**:
  ```scss
  position: absolute;
  top: 35px;
  left: 30px;
  width: 144.80px;
  height: 30px;
  ```

#### 3. Hero Authentication Illustration
* **Asset Source**: `https://jrwptnalqevxqenwipvn.supabase.co/storage/v1/object/public/lendsqr-assesement/illustration/pablo-sign-in%201.png`
* **Layout Paradigm**: Centered inside the left-hand branding side-panel with optimized flex-box alignment and custom aspect ratio boundaries.

---

## ⚡ Architectural Decisions & Engineering Excellence

### 1. Robust Server-Side API Handlers
Following the highest security standards, API credentials are kept safe behind Next.js server-side route proxies:
* **GET `/api/users`**: Multi-parametric advanced search and filtration supporting paginated SQL cursors.
* **GET `/api/users/[id]`**: Retrieves complete nested profile attributes with optimized local caching mechanisms.
* **PATCH `/api/users/[id]`**: Fully integrated with Supabase to execute real database updates for user states (e.g. `Active`, `Blacklisted`, `Pending`, `Inactive`).

### 2. SCSS 7-1 Architecture Integration
All UI components leverage Sass sheets rather than inline utility clutter, preserving the separation of concerns:
* `src/styles/abstracts/_variables.scss`: Global palette codes, responsive view breakpoints, and typeface rules.
* `src/styles/pages/_user-detail.scss`: Complete layout styling for the dynamic user profiles matching the high-fidelity guidelines.
* `src/styles/components/_table.scss`: Reusable grid lists supporting dynamic status badges and fly-out action dropdowns.

### 3. Smart User Caching Engine
To ensure high responsiveness and zero unnecessary database hits, the user details section implements an hybrid cache architecture:
1. **Immediate Hydration**: Retreives the most recent user state from `localStorage` immediately upon route mount.
2. **Background Sync**: Requests fresh attributes from the server-side API endpoints in the background, updating the view and refreshing the browser cache seamlessly.

---

## 🛠️ Technical Stack

* **Framework**: React 19 / Next.js 15 (App Router with type-safe routing)
* **Database**: Supabase / PostgreSQL Client Wrapper
* **Styling**: SCSS 7-1 Architecture with custom mixins and utility classes
* **Forms & Validation**: React Hook Form with Zod runtime schemas
* **Test Engine**: Vitest for reliable, blazing-fast assertion test suites

---

## 📂 Project Directory Structure

```text
src/
├── app/                  # Next.js App Router dynamic paths, API endpoints, and main layouts
├── assets/               # Local UI icons, fonts, and brand assets
├── components/           # Atomic, reusable components (Button, Input, Layout shells)
├── features/             # Feature-scoped logic (Auth flow, user directories, filters)
├── lib/                  # Central API client wrappers, utilities, and Supabase client
├── styles/               # Standardized SCSS 7-1 Sass stylesheet system
└── types/                # Strict TypeScript declaration interfaces
```

---

## 🚀 Local Development Workflow

### 1. Prerequisites
Ensure you have **Node.js 18+** or **Bun** installed.

### 2. Setup Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
The server will boot on `http://localhost:3000`.

### 4. Compiling & Building for Production
```bash
npm run build
```

### 5. Running Tests
Verify schema validation and system logic assertions:
```bash
npm run test
```

---

## 🌟 Quality Standards Checklist
- [x] **Strict Visual Accuracy**: Implemented styling dimensions matching Figma mockups.
- [x] **Full Interactive Functionality**: Dynamic "Blacklist" and "Activate" buttons execute real write-operations.
- [x] **Zero-HMR Bundle Safety**: Excluded large binaries from compiler load-chains to ensure extremely light memory usage during builds.
- [x] **TypeScript Integrity**: Type-safe properties across all profiles, lists, and form inputs.
