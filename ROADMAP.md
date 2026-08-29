# ROADMAP.md

This roadmap is an implementation order, not a new set of TFA rules. Any phase must follow the Constitution and approved requirements.

## Phase 0 — Documentation and specification

**Current phase.**

- Establish project source-of-truth documents.
- Record current repository state.
- Resolve contradictions and open domain questions.
- Define route/permission and data ownership boundaries.

## Phase 1 — Technical foundation

- Validate local development setup.
- Introduce proper Prisma migration history.
- Establish backend module/domain conventions.
- Establish frontend API client and environment configuration.
- Establish error handling, logging and testing conventions.
- Harden authentication/session handling.

## Phase 2 — Identity, roles and administration foundation

- Complete login/account UX.
- Implement authorization/permission model.
- Manager application/approval workflow.
- Administrative audit foundations.
- Club and manager master-data administration.

## Phase 3 — Player Pool and squads

- Finalize Player Card requirements from Constitution/TFA decisions.
- Build persistent Player Pool.
- Implement player history.
- Build squad registration and eligibility enforcement.
- Connect existing Player Pool UI to real APIs.

## Phase 4 — Contracts and player market

- Implement contracts and renewal rules.
- Implement transfer windows.
- Implement approved transfers.
- Implement auction/waiver mechanisms if required by the rules.
- Implement release/termination and historical records.
- Integrate TCP transactions atomically with market operations.

## Phase 5 — TCP economy

- Finalize exact economic rules from authoritative sources.
- Implement Club/Treasury accounts.
- Implement immutable/controlled ledger operations.
- Implement rewards, fines, adjustments and reversals.
- Build manager/admin finance views.
- Add reconciliation and audit tools.

## Phase 6 — TCL competition engine

- Season lifecycle.
- TCL registration/participation.
- Competition structure and fixture generation.
- Match scheduling/submission/verification.
- Standings and tie-breakers.
- Knockout stages and progression where applicable.
- Competition statistics and history.

## Phase 7 — TFC and additional competition workflows

- Implement TFC using its approved rules.
- Support its participant and match structure.
- Preserve separation between TCL and TFC where rules require it.

## Phase 8 — Public records and communications

- Replace mock public data with authoritative APIs.
- Announcements.
- Public clubs/players.
- Historical records and honours.
- Public competition statistics.
- Notifications.

## Phase 9 — Production readiness

- Security review.
- Automated tests and CI.
- Database backup/recovery.
- Monitoring/error reporting.
- Deployment configuration.
- Performance/accessibility review.
- Operational runbook.

## Implementation order principle

Build the **rules and data integrity first**, then workflows, then UI polish. Do not build a large frontend feature on top of an undefined domain model simply because the screen can be mocked quickly.
