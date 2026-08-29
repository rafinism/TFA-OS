# TFA-OS

TFA-OS is the digital management, competition, records, and public-information platform for the TESL Football Association (TFA).

## Core purpose

The system will provide:

- public TFA information and permanent historical records;
- registered-user community participation and TCL participation;
- Manager Club operations and TFC participation;
- Player Pool and Player Rights management;
- contracts, transfers, waivers, auctions, free agents, and Player Right loans;
- TCP accounting and a public financial ledger;
- fixtures, match-result submission/verification/correction, and statistics;
- governance, discipline, notifications, and auditable administrative actions;
- constitutional documents and their historical editions.

## Current state

The repository is an early implementation. The existing Player Pool UI is an important existing system to preserve and integrate. The Constitution presentation is also considered an established part of the current frontend. Other existing application areas are not assumed final.

## Stack currently present

- Frontend: Next.js, React, TypeScript
- Backend: NestJS, TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Local orchestration: Docker Compose
- Authentication foundation: password authentication, JWT strategy, password reset/email-token support

## Development data

Development must use real database-backed entities rather than hard-coded business mock data.

Controlled development population:

- 1 President/Admin account
- 16 registered-user accounts
- 12 of those 16 users are Managers
- 12 test Clubs

Visitors must also be tested without authentication. Development data is disposable. Production must begin with a clean database and separate official data initialization.

## Source-of-truth hierarchy

1. TFA Constitution
2. Valid TFA supplementary/official documents
3. Approved TFA administrative decisions
4. TFA-OS technical documentation
5. Code

Software must implement authoritative TFA rules; AI agents must not reinterpret or casually change them.

## Documentation

Read `PROJECT.md`, `AI_RULES.md`, and `REQUIREMENTS.md` before changing code. Then consult `ARCHITECTURE.md`, `DATABASE.md`, `ROUTES.md`, `FEATURES.md`, `ROADMAP.md`, and `SECURITY.md` as applicable.

Detailed domain material belongs under `docs/`.

## Local development

### Frontend

```bash
cd frontend
npm install
npm run dev
```

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Configure the backend using `backend/.env.example` and provide a PostgreSQL database.
