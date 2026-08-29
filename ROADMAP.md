# Roadmap

## Phase 0 — Specification and audit

- Lock project documentation.
- Reconcile Constitution with technical rules.
- Audit current implementation.
- Identify unresolved decisions.

## Phase 1 — Foundation

- Establish native PostgreSQL development workflow on Windows.
- Docker remains optional and is not a prerequisite.
- Complete authentication and session lifecycle.
- Establish backend module boundaries and authorization.
- Establish repeatable database migrations/reset/seed.
- Create the 17-account test population.

## Phase 2 — Identity, Clubs, and access

- Registration and account lifecycle.
- Manager application and President approval.
- New Club proposal and inactive Club takeover.
- Permanent Club/Manager history.
- Visitor/User/Manager/Admin access enforcement.

## Phase 3 — Player system

- Integrate existing Player Pool UI with database/API.
- Complete Player Pool administration.
- Player eligibility/card information.
- Player Rights.
- Squad and contract lifecycle.

## Phase 4 — TCP and market

- Authoritative TCP ledger.
- Rewards/fines/adjustments.
- Transfers, renewals, releases.
- Waivers, auctions, free agents.
- Player Right loans.

## Phase 5 — TCL

- Seasons and competition configuration.
- Participation.
- Fixtures and standings.
- Manager result submissions.
- Automatic matching/verification.
- Conflict notification and President resolution.
- Knockout and competition records.

## Phase 6 — TFC

- Manager eligibility.
- TFC participation/configuration.
- Fixtures, results, groups, knockout, records.

## Phase 7 — Governance and public records

- President administration.
- Disciplinary workflows.
- Public financial records.
- Audit/history.
- Announcements/comments.
- Constitutional document archive.

## Phase 8 — Verification and production readiness

- Full integration/end-to-end testing.
- Security review.
- Remove/reset development data.
- Production database initialization procedure.
- Deployment and operational documentation.

Implementation order can change only when a documented dependency or requirement justifies it.
