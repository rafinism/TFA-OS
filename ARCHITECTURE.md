# ARCHITECTURE.md

## 1. Architectural intent

TFA-OS should evolve into a modular web application in which the frontend presents and collects information, the NestJS backend enforces business rules, and PostgreSQL stores authoritative state. TFA-specific rules belong in domain services and database invariants rather than being trusted to the browser.

## 2. Current stack

### Frontend
- Next.js 16.3.0
- React 19.2.8
- TypeScript 5
- Tailwind CSS 4
- Lucide React
- React Image Crop
- country-flag-icons

### Backend
- NestJS 11
- TypeScript
- Prisma 6.19
- PostgreSQL
- Passport/JWT
- Argon2
- Nodemailer
- class-validator/class-transformer

### Development infrastructure
- PostgreSQL 17 Alpine through Docker Compose.

## 3. Current repository architecture

```text
TFA-OS
├── frontend
│   ├── app              Next.js routes
│   ├── components       Shared UI components
│   ├── lib              Frontend domain/helper data
│   └── public            Static assets and Constitution documents
├── backend
│   ├── src/auth         Authentication implementation
│   ├── src/prisma       Prisma service/module
│   └── prisma            Database schema
├── docs                  Project/domain documentation
└── docker-compose.yml    Local PostgreSQL
```

## 4. Current backend boundary

`AppModule` currently loads global configuration, Prisma and Auth only. The backend therefore has a real application/authentication foundation but does not yet expose modules for clubs, players, squads, competitions, matches, contracts, transfers, finance, announcements or audit operations beyond the schema. fileciteturn83file0L2-L6

The API uses the `/api` global prefix, CORS is currently broadly enabled, and a global validation pipe uses whitelist, forbid-non-whitelisted and transform settings. fileciteturn70file0L2-L6

## 5. Intended domain architecture

The target architecture should be organized around domains rather than pages:

```text
API / Controllers
      │
Application services / use cases
      │
Domain services + rule enforcement
      │
Prisma repositories / data access
      │
PostgreSQL
```

Candidate domains (to be implemented only after requirements are confirmed):

- Identity & Access
- TFA Administration
- Clubs & Managers
- Player Pool / Player Cards
- Squads
- Contracts
- Player Market / Transfers / Auction / Waiver
- Seasons & Competitions
- Matches & Results
- Standings & Statistics
- TCP Finance & Treasury
- Notifications
- Audit / History
- Constitution & official documents

These are architectural boundaries, not permission to invent business rules.

## 6. Current frontend state

The frontend already contains public, manager and admin route families and reusable layout components. Several pages are UI prototypes using hardcoded/local state rather than backend data. The admin player page is a comparatively substantial client-side prototype with player editing, filtering, country flags, image handling and crop tooling.

The public home page currently renders hardcoded example results, fixtures, announcements, standings and Season 01/TCL summary information rather than live API data. fileciteturn73file0L2-L6

## 7. Integration direction

The future integration should be:

```text
Next.js UI
   │
   │ authenticated/anonymous HTTP API
   ▼
NestJS controllers
   │
   ▼
Domain/application services
   │
   ├── validation
   ├── authorization
   ├── TFA rule enforcement
   ├── audit events
   └── transactional operations
   │
   ▼
Prisma
   │
   ▼
PostgreSQL
```

No browser component should be the authoritative source for balances, roles, contracts, competition status, official results or other regulated state.

## 8. Important current architectural gaps

- Only Auth is wired into `AppModule`.
- No frontend API client/service layer is present in the current tree.
- Most UI pages are not backed by API persistence.
- The database schema is preliminary and lacks several domain entities needed for complete TFA operation.
- No committed Prisma migration history is currently present.
- The Constitution exists both as a TypeScript representation and as PDF/DOCX assets, creating a potential source-of-truth synchronization problem.
- The admin and legacy/general layout systems coexist and should not be consolidated until the intended route/auth architecture is confirmed.

## 9. Architectural principles

1. Constitution first.
2. Backend enforces authoritative rules.
3. Database protects invariants where practical.
4. Financial and official-record operations are transactional.
5. Historical records are preserved.
6. UI is a client of the system, not the system of record.
7. Manual administrative override is controlled and auditable.
8. Avoid unnecessary infrastructure for the project's small scale.
