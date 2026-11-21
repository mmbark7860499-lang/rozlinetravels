# Rozline & Sky Way Travels

Modern web portal and booking platform for **Rozline & Sky Way Travels**, Tirur, Kerala. Built with Next.js 15 (App Router), React 19, Tailwind CSS, and Supabase.

---

## 🚀 Features

- **Flight Bookings**: Search, browse, and book domestic and international flights.
- **Visa Services**: Complete visa requirements, documentation guidance, and application inquiry desk for UAE, Saudi Arabia, Qatar, Oman, UK, Schengen, and more.
- **Umrah & Holiday Packages**: Curated packages with itinerary breakdowns and inquiry forms.
- **Admin Dashboard**: Manage flight bookings, customer leads, promotional offers, and inquiries.
- **Responsive & Modern UI**: Built with Tailwind CSS, Framer Motion animations, and mobile-friendly layouts.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) & PostCSS
- **Animations & Icons**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

---

## 📦 Getting Started

### 1. Prerequisites

Ensure you have installed:
- [Node.js](https://nodejs.org/) (v18.18.0 or later recommended)
- `npm`, `pnpm`, or `yarn`
- [Git](https://git-scm.com/)

### 2. Installation

Clone the repository and install dependencies:

```bash
git clone git@mohdshuhaib:mmbark7860499-lang/rozlinetravels.git
cd rozlinetravels
npm install
```

### 3. Environment Variables

Create a `.env.local` file by copying `.env.example`:

```bash
cp .env.example .env.local
```

Fill in the required values:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Admin Credentials
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your-secure-password
ADMIN_PASSCODE=your-passcode
```

### 4. Database Setup

Set up your Supabase database schema by running the SQL definitions found in:
```
supabase/schema.sql
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Production Build

To build the application for production:

```bash
npm run build
npm run start
```

---

## 📁 Project Structure

```
├── app/                  # Next.js App Router (pages, layouts, API routes)
│   ├── admin/            # Admin control panel
│   ├── api/              # Backend endpoints (bookings, leads, offers, admin)
│   ├── book-flights/     # Flight booking interface
│   └── visa-services/    # Visa requirements & booking desk
├── components/           # Reusable UI components & layouts
├── lib/                  # Utilities, Supabase client & helper functions
├── public/               # Static assets (images, logos, favicon, manifest)
├── supabase/             # Database migration and schema scripts (schema.sql)
├── .env.example          # Sample environment configuration
├── .gitattributes        # Git line ending normalization
├── .gitignore            # Git exclusion rules
├── package.json          # Project manifest and scripts
├── tailwind.config.ts    # Tailwind CSS styling configuration
└── tsconfig.json         # TypeScript configuration
```

---

## 📄 License

Private & Proprietary — Rozline & Sky Way Travels Tirur.
