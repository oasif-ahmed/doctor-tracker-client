# Doctor Tracker — Healthcare Administration Portal

A modern, high-performance administrative web application designed for healthcare facilities to manage credentialed physicians, track patient clinical records, monitor doctor loads, and visualize health intake metrics in real time.

---

## Standardized Project Documentation

| Section | Requirement / Details |
|---|---|
| **Description** | Doctor Tracker is an enterprise-grade administrative portal engineered for clinical practices and hospital networks. It empowers healthcare administrators to securely manage physician credentials, oversee clinical caseloads, assign and update patient medical profiles, and evaluate operational capacity through real-time interactive analytics. |
| **Setup Guide** | **1. Prerequisites:** Node.js (v18+), MongoDB instance.<br><br>**2. Backend Setup:**<br>`cd doctor-tracker-server`<br>`npm install`<br>Copy `.env.example` to `.env` and set `DATABASE_URL`, `PORT=3001`, and JWT secrets.<br>`npm run dev`<br><br>**3. Frontend Setup:**<br>`cd doctor-tracker-client`<br>`npm install`<br>Copy `.env.example` to `.env.local` (`NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001`).<br>`npm run dev`<br><br>**4. Access:** Open [http://localhost:3000](http://localhost:3000) in your browser. |
| **System Architecture** | Built on a decoupled client-server architecture. The frontend utilizes **Next.js 16 App Router** with hybrid Server Components for optimized data prefetching and interactive Client Components for real-time state manipulation. The standalone **Node.js/Express** backend delivers modular RESTful endpoints adhering to strict clean-code controller/service patterns, backed by **MongoDB/Mongoose** with indexed queries for performant filtering, searching, and pagination. Authentication is governed by `httpOnly` JWT tokens with Next.js 16 route proxy enforcement. |
| **Technical Decisions** | **1. Next.js 16 App Router with `proxy.ts` over Legacy Middleware:** Transitioned to Next.js 16's modern `proxy.ts` convention to decouple network-boundary edge routing from the core rendering tree, preventing blocking prerender issues while strictly enforcing session guards on `/dashboard`, `/doctor`, and `/patients`.<br><br>**2. Hybrid Optimistic State & Server Synchronization (`useRef` + `useEffect`):** Client components maintain optimistic UI responses for edit and delete actions while automatically syncing local state against server component prop refreshes triggered by search and filter query parameters. |
| **Visual Evidence** | - **Dashboard:** Overview metrics, physician patient load bar chart, condition distribution pie chart, and intake timeline.<br>- **Physician Directory:** Multi-filter physician cards with pagination, direct patient linking, and "+ Add Doctor" flow.<br>- **Doctor's Patient Panel:** Dedicated physician summary card with assigned patient table, inline delete, and doctor-assigned patient creation modal.<br>- **Patient Directory:** Global patient listing with inline search, condition dropdowns, date filtering, and live editing modal. |

---

## Core Features Checklist

- [x] **Secure Authentication**: Register, Login, Logout with dynamic navbar state and route protection.
- [x] **Doctor Management**:
  - [x] Create doctor (Name, Specialization, Hospital, Phone, Email)
  - [x] Directory view with responsive cards
  - [x] Search, multi-field filter (specialization, hospital, date range)
  - [x] Pagination controls
  - [x] Doctor-specific patient management (`/doctor/[id]/patients`)
  - [x] Add patient assigned to specific doctor
  - [x] Remove patient from doctor's list
- [x] **Patient Management**:
  - [x] Dedicated patient directory (`/patients`)
  - [x] Edit patient modal (Name, Age, Phone, Address, Condition)
  - [x] Delete patient with instant UI update
  - [x] Search by name and phone
  - [x] Filter by clinical condition and date range
  - [x] Pagination controls
- [x] **Analytics Dashboard (`/dashboard`)**:
  - [x] Total doctors and total patients metrics
  - [x] Average patient load per doctor calculation
  - [x] Patient load per doctor bar chart (Recharts)
  - [x] Diagnostic conditions breakdown pie chart
  - [x] Patient intake timeline line chart
- [x] **Design & UX**: Warm editorial aesthetic, accessible typography, loading skeletons, responsive mobile/desktop layouts.
