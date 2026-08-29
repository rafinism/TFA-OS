# TFA-OS

TFA-OS is the software platform intended to operate the football ecosystem of the TESL Football Association (TFA). It is more than a results website: the long-term system is intended to manage public information, clubs, managers, players, squads, contracts, competitions, matches, TCP finances, administration, notifications, records, and auditing.

## Authority

The **TFA Constitution is the authoritative source of TFA rules**. Technical documentation explains how software implements those rules. AI/development instructions govern how agents modify the codebase. Technical convenience must never silently change a constitutional rule.

## Current repository state

This repository is an early implementation/prototype. The frontend contains a substantial Next.js UI and several route shells, while the backend currently contains a NestJS/Prisma foundation with authentication and a preliminary domain schema. Most football-management operations are not yet connected end-to-end.

## Technology

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lucide React, React Image Crop, country-flag-icons.
- Backend: NestJS 11, TypeScript, Prisma 6, PostgreSQL.
- Authentication: JWT, Passport, Argon2 password hashing, Nodemailer password-reset email flow.
- Local database: PostgreSQL 17 via Docker Compose.

## Repository layout

```text
.
├── backend/           NestJS API, Prisma schema and authentication
├── frontend/          Next.js application
├── docs/              Detailed project/domain documentation
├── docker-compose.yml Local PostgreSQL development service
├── AI_RULES.md
├── ARCHITECTURE.md
├── DATABASE.md
├── FEATURES.md
├── PROJECT.md
├── REQUIREMENTS.md
├── ROADMAP.md
├── ROUTES.md
├── SECURITY.md
└── CHANGELOG.md
```

## Local development

### 1. Start PostgreSQL

```bash
docker compose up -d postgres
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env` from `backend/.env.example`. The current code also expects authentication/email configuration such as `JWT_SECRET` and SMTP settings; see `SECURITY.md` and the documented configuration gap in `PROJECT.md`.

Then:

```bash
npm run prisma:generate
npm run prisma:migrate
npm run start:dev
```

The API is configured with the `/api` prefix and defaults to port `3001`.

### 3. Frontend

In another terminal:

```bash
cd frontend
npm install
npm run dev
```

The Next.js development server normally runs on port `3000`.

## Current implementation status

Implemented foundation:

- Next.js public/admin/manager route structure.
- Public Constitution rendering from a TypeScript representation.
- TFA Constitution PDF/DOCX assets.
- Player-pool UI prototype with search/filtering, player editing, country flags, image URL/upload and crop tooling, and local state.
- NestJS application bootstrap.
- Prisma/PostgreSQL schema foundation.
- User registration/login/profile endpoints.
- JWT guard/strategy foundation.
- Password-reset token flow and email service foundation.

Not yet implemented end-to-end:

- Real club/manager administration APIs.
- Real player-pool persistence/API integration.
- Squad management domain and enforcement.
- Full contract/transfer/auction/waiver systems.
- Competition engine, fixture generation, standings and knockout logic.
- Match submission/verification and result processing.
- TCP ledger business rules and treasury operations.
- Full notification, audit and administrative workflows.

See `FEATURES.md` for the controlled inventory and `ROADMAP.md` for implementation order.

## Development rule

Do not begin a feature by inventing requirements. Check the Constitution, this documentation, and the existing implementation first. When information conflicts, stop and document the conflict instead of silently choosing an interpretation.
