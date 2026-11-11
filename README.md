# Doctor Tracker Dashboard

A modern, TailAdmin‑styled dashboard for managing doctors and patients. The app is built with **Next.js (React 18)**, **shadcn UI**, **TypeScript**, and **Tailwind CSS**. It communicates with a separate Express/TS backend (`doctor‑tracker‑server`) that provides authentication, CRUD operations, and pagination.

---

## ✨ Overview

- **Responsive UI** – works on desktop, tablet, and mobile.
- **Authentication** – login, register, logout with JWT stored in http‑only cookies.
- **Role‑based navigation** – the navbar updates based on auth state.
- **TailAdmin design language** – custom colour tokens, modern fonts, glass‑style header, and card‑based layouts.
- **Pagination** – doctors and patients are paginated on the server side.
- **Proxy middleware** – protects private routes and redirects logged‑in users away from login/sign‑up pages.
- **Full‑stack** – separate backend (`doctor‑tracker‑server`) on `http://localhost:3001`.

---

## 📸 Screenshots

Below are some key screens of the application.  The images are stored in the project’s **user‑uploaded** assets folder; they are referenced directly with absolute file URLs so they render in the Antigravity UI.

---

### 1. Dashboard (Home)

![Dashboard](/Users/oasif/Desktop/projects/doctor-tracker-client/public/screenshots/dashboard.jpg)

*The main dashboard shows KPI cards, recent activity, and quick navigation shortcuts.*

---

### 2. Doctor Directory

*(Add your own screenshot of the doctor list here – you can replace the placeholder with another uploaded image if you have one.)*

---

### 3. Patient Directory

*(Add your own screenshot of the patient list here.)*

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (>= 18) and **npm** (or **yarn**)
- **MongoDB** instance (local or remote) – the backend expects a `MONGODB_URI` env var.
- **Git** (to clone the repositories)

### Clone the repositories

```bash
# Frontend
git clone <your‑frontend‑repo‑url> doctor-tracker-client
cd doctor-tracker-client

# Backend (in a sibling folder)
git clone <your‑backend‑repo‑url> doctor-tracker-server
cd doctor-tracker-server
```

### Install dependencies

```bash
# Frontend
npm install   # from doctor-tracker-client

# Backend
cd ../doctor-tracker-server
npm install
```

### Environment variables

Create a `.env.local` file in **both** projects.

**Frontend (`doctor-tracker-client/.env.local`):**

```env
NEXT_PUBLIC_BACKEND_API_URL=http://localhost:3001   # point to the backend
```

**Backend (`doctor-tracker-server/.env`):**

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/doctor-tracker
JWT_SECRET=your‑strong‑secret
```

### Run the applications

```bash
# In one terminal – backend
cd doctor-tracker-server
npm run dev   # starts Express on http://localhost:3001

# In another terminal – frontend
cd ../doctor-tracker-client
npm run dev   # starts Next.js on http://localhost:3000
```

Open `http://localhost:3000` in your browser.  You should see the landing page, then be able to register/login and explore the dashboard.

---

## 📚 Features Detail

| Feature | Description |
|---------|-------------|
| **Authentication** | Login & registration forms use the backend `/api/auth/*` routes. The JWT is stored as an http‑only `accessToken` cookie. The navbar reads `/api/auth/me` to toggle between **Login / Sign Up** and **Logout** buttons. |
| **Proxy middleware** (`proxy.ts`) | - Redirects unauthenticated users to a custom 404 page with a login button.<br>- Prevents logged‑in users from accessing `/login` or `/register` by redirecting them to `/dashboard`. |
| **Doctor list** (`/doctor`) | Server‑side pagination (`page`, `limit`). The UI shows Prev/Next buttons, total count, and a clean table without shadows. |
| **Patient list** (`/patients`) | Same pagination UI as doctors, plus filtering by name, age, condition, etc. |
| **Create / Edit forms** | All forms use shadcn `Input`, `Label`, and `Button` components with TailAdmin token classes (`bg-card`, `border-border`, etc.). |
| **Responsive navigation** | Navbar collapses to a hamburger on mobile; the sidebar (if used) collapses to icons‑only. |
| **Theme & Fonts** | Uses `Plus Jakarta Sans` for UI text and `JetBrains Mono` for code‑like fields. Dark mode is built‑in via Tailwind’s `dark:` utilities. |
| **Error handling** | All service calls wrap `fetch` with `try/catch`, display toasts on failure, and return a consistent `{ success, data, meta }` shape. |

---

## 📦 Scripts

| Script | What it does |
|--------|--------------|
| `npm run dev` | Starts the development server (Next.js). |
| `npm run build` | Builds the production bundle. |
| `npm start` | Runs the production build (`next start`). |
| `npm run lint` | Runs ESLint + Prettier. |
| `npm run test` *(if set up)* | Runs Jest/React Testing Library tests. |

---

## 🛠️ Extending the Project

- **Add more seed data** – you can create a seed script in the backend (`src/seed.ts`) that inserts 15 doctors and 30 patients (5 patients per doctor). Run it with `node src/seed.ts` after the DB is connected.
- **Custom themes** – modify `app/globals.css` to change the TailAdmin colour tokens.
- **Deploy** – the backend can be deployed to Railway/Render, and the Next.js frontend to Vercel or Netlify. Make sure to set the `NEXT_PUBLIC_BACKEND_API_URL` to the deployed backend URL.

---

## 📄 License

MIT © 2026 Oasif (or your organization). Feel free to fork, modify, and use it in your own projects.

---

*Built with love using Antigravity, Next.js, and TailAdmin design.*