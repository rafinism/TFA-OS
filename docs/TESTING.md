# Testing Strategy

## Goal

Every major TFA-OS feature must be testable through real database-backed workflows. Hard-coded frontend mock data must not be used to make a feature appear complete.

## Controlled development population

- 1 President/Admin
- 16 Registered Users
- 12 Managers among those Users
- 12 Clubs
- Visitors tested without authentication

The development accounts are credentials supplied locally by the developer. They must never be committed to Git.

## Current development seed

The backend includes a repeatable Prisma seed script at `backend/prisma/seed.js`.

Setup:

1. Copy `backend/prisma/seed-accounts.example.json` to `backend/prisma/seed-accounts.json`.
2. Replace every placeholder with the actual development email/password values.
3. Keep exactly 16 users, exactly 12 of them with `clubName`, and exactly one President/Admin.
4. Ensure `backend/prisma/seed-accounts.json` remains untracked; it is explicitly ignored by Git.
5. After the database schema exists, run `npm run prisma:seed` from `backend`.

The seed creates or updates the development users, 12 manager clubs, Manager records, ClubManager relationships, and the corresponding Club TCP accounts. It does not assign a starting TCP balance because the authoritative financial initialization must come from the agreed TFA rules rather than an invented seed value.

For a completely reproducible development reset, use `npm run prisma:reset` only against the development database, then seed again. Never run the reset command against production.

## Required test layers

### Unit tests
Use for deterministic domain calculations, validation, permissions, and isolated business rules.

### Integration tests
Use for service/database interactions such as contracts, Player Rights, TCP transactions, result verification, and authorization.

### End-to-end tests
Use for critical user journeys across browser → API → database.

## Critical scenarios

- Visitor can read public information but cannot comment or perform protected actions.
- Registered User can comment and participate in TCL but cannot perform Manager-only Club operations or TFC participation.
- Manager can operate only their own Club and can participate in TFC.
- President can approve/reject Manager applications.
- Manager leaving preserves Club/history while removing Manager access.
- Two matching result submissions become official according to the applicable rule.
- Conflicting result submissions remain pending and notify President.
- President correction is authenticated and audited.
- TCP operations are atomic and correctly reflected in the ledger/balance.
- Player Rights cannot be duplicated or silently lost.
- Player Right loans do not transfer Club ownership permanently.
- Public views reflect actual database state.

## Completion standard

A feature is considered complete only when its normal path, authorization boundaries, important failure paths, persistence, and relevant audit/history behavior have been verified.
