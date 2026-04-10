# EduCore: The Modern University Operating System

**EduCore** is a production-ready University Management System (TAMS) designed for the modern academic ecosystem. It bridges the gap between students, parents, mentors, and administrators through real-time data transparency, automated notifications, and decentralized oversight.

---

## 🚀 Vision
Built for a rapid hackathon deployment, EduCore replaces legacy paper-based and siloed digital systems with a unified, Supabase-backed neural grid that ensures institutional data integrity and real-time communication.

## 🛠 Tech Stack
- **Frontend**: Next.js 16 (Turbopack), React 19, Tailwind CSS 4
- **Backend**: Supabase (PostgreSQL, Auth, RLS)
- **State & Sync**: SWR (Stale-While-Revalidate) for background revalidation
- **Communication**: NodeMailer (SMTP) for automated academic alerts
- **Infrastructure**: Vercel (Cron Jobs, Serverless)

## 💎 Key Features
- **Multi-Role Dashboards**: Specific hubs for Admin, Teacher, Mentor, Student, and Parent.
- **Bulk Operations**: CSV import engine for rapid institutional scaling.
- **Neural Notifications**: Real-time polling and email alerts for low attendance, fee pings, and progress notes.
- **Financial Automation**: Automated status calculation (Paid/Partial/Overdue) via DB triggers.
- **Academic Oversight**: Heatmaps for attendance and performance tracking.

## 📦 Setup & Installation

### 1. Repository Initialization
```bash
git clone <repo-url>
npm install
```

### 2. Database Synchronization
Apply the migration scripts in chronological order from `/supabase/migrations/`:
- `001_core_tables.sql`: Foundation and profiles.
- `002_transactional_tables.sql`: Attendance, Marks, Fees.
- `003_rls_policies.sql`: Security and Role-Based Access Control.
- `004_notifications_schema.sql`: Automation triggers and comms ledger.

### 3. Environment Configuration
Create a `.env.local` based on `docs/DEPLOYMENT.md`:
```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
SMTP_HOST=...
# ... (see DEPLOYMENT.md)
```

### 4. Run Development
```bash
npm run dev
```

## 🛡 Security Architecture
- **RLS (Row Level Security)**: Every query is scoped to the user's role and identity.
- **Activation Gate**: Students are locked out of dashboards until verified by an Admin.
- **Proxy Interception**: Next.js middleware manages secure session routing and role guards.

## 📝 License
Proprietary software developed for institutional excellence.
