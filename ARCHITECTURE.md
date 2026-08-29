# Architecture

## Current repository architecture

TFA-OS currently has a Next.js frontend, a NestJS backend, Prisma, PostgreSQL configuration, and Docker Compose configuration. The current Prisma schema contains foundational identity, Clubs, Managers, competitions, Players, contracts, TCP accounts/transactions, matches, audit logs, and notifications.

## Target architectural model

```text
Browser
  │
  ├── Public pages
  ├── Registered-user pages
  ├── Manager pages
  └── President/Admin pages
          │
          ▼
     Next.js frontend
          │
          ▼
       NestJS API
          │
   ┌──────┼─────────┐
   │      │         │
 Auth  Domain    Records/Audit
       services
          │
          ▼
        Prisma
          │
          ▼
      PostgreSQL
```

## Domain boundaries

- Identity & Access
- Governance & Administration
- Clubs & Managers
- Player Pool & Player Rights
- Contracts
- Transfers/market
- Player Right Loans
- TCP Economy
- TCL
- TFC
- Matches & Results
- Community/Content
- Notifications
- Audit & Historical Records
- Constitutional Documents

Domain services should own business rules rather than duplicating rules across page components.

## Authorization model

Visitor: read public information only.

Registered User: public access plus authenticated community actions and TCL participation.

Manager: Registered User plus Club operations and TFC participation.

President/Admin: administrative authority subject to TFA governance.

Authorization is enforced server-side. Frontend route guards are supplementary UX, not security.

## Automation model

Deterministic operations are performed by backend domain services. Critical multi-step operations use database transactions. President/Admin override is an explicit administrative path and produces an audit record.

## Data model principle

Database records are authoritative for business state. Frontend state is a representation/cache of server state, not an independent source of truth.

## Existing implementation principle

The existing Player Pool UI and Constitution presentation must be preserved and integrated unless a concrete requirement requires modification. Existing code is inspected before replacement or refactoring.

## Architectural constraints

- Do not introduce microservices without a demonstrated need.
- Do not duplicate business rules in frontend and backend.
- Do not encode constitutional rules only as UI behavior.
- Do not use hard-coded mock business data in normal application paths.
- Keep TCL and TFC domain logic separate.
- Keep financial mutations ledger-based and transactional.
