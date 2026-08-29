# Testing Strategy

## Goal

Every major TFA-OS feature must be testable through real database-backed workflows. Hard-coded frontend mock data must not be used to make a feature appear complete.

## Controlled development population

- 1 President/Admin
- 16 Registered Users
- 12 Managers among those Users
- 12 Clubs
- Visitors tested without authentication

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

## Reset and seed

Development data must be reproducible from a clean database. A future seed command should create only clearly identified development data and must never be used automatically against production.

## Completion standard

A feature is considered complete only when its normal path, authorization boundaries, important failure paths, persistence, and relevant audit/history behavior have been verified.
