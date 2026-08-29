# REQUIREMENTS.md

## Status vocabulary

- **Implemented** — present in the repository and materially functional.
- **Partial** — some supporting code/UI exists, but the complete workflow is absent.
- **Prototype** — UI/design or local-state demonstration; not authoritative/persistent.
- **Planned** — intended system capability not yet implemented.
- **Pending** — cannot be specified safely until the Constitution or TFA decision resolves it.

## Functional requirements

### Identity and access
- Users must be able to authenticate securely.
- The system must support role-aware access.
- Passwords must be stored using secure password hashing.
- Password-reset tokens must be single-use and time-limited.
- Protected API endpoints must validate authentication and authorization server-side.

### TFA information
- Public users should be able to access official TFA information.
- The Constitution must be available through the website.
- Official announcements should be publishable and viewable.
- Official historical records should be preserved.

### Clubs and managers
- TFA administrators must be able to register, activate, suspend and manage Clubs according to the Constitution.
- The system must support Manager identity and Club assignment/history.
- Manager applications should be reviewable where the approved TFA process requires them.

### Player pool
- Administrators must be able to maintain the official Player Pool.
- Player records must support identity, nationality, positions, image and status information required by the approved Player Card system.
- Player history must be retained when required by TFA rules.
- Player acquisition and assignment must be governed by contracts/market rules rather than arbitrary client state.

### Squads
- Clubs must be able to maintain their registered Squad.
- Matchday eligibility must be enforced according to the Constitution.
- Squad history must remain recoverable where official records require it.

### Contracts and player market
- The system must support official contracts, renewals, releases and other approved market actions.
- Transfer windows and eligibility must be enforced by the backend.
- Auction/waiver/transfer functionality must use the exact TFA rules once confirmed from authoritative sources.

### Competitions
- The system must support Seasons and Official Competitions.
- TCL and TFC must be represented as distinct competitions according to their approved rules.
- Competition participation, fixtures, results, standings and progression must be persisted.
- Variable competition formats must be supported where the Constitution permits them.
- Standings calculations must be deterministic and based on approved ranking criteria.

### Matches
- Official matches must have controlled scheduling and participants.
- Results must be submitted through an authenticated process.
- Verification/approval must be supported where required.
- Once official, match results must feed standings/statistics consistently.
- Disputed or corrected results must preserve an audit trail.

### TCP economy
- Clubs and TFA treasury must have authoritative TCP accounts.
- TCP transactions must be immutable ledger entries or controlled reversals rather than arbitrary balance edits.
- Rewards, fines, transfers, auctions and adjustments must follow approved rules.
- The system must be able to explain a club's balance from its transaction history.

### Notifications and audit
- Important system/TFA events should generate notifications where specified.
- Material administrative actions must be auditable.
- Audit records should identify actor, action, entity and relevant details.

## Non-functional requirements

### Correctness
Authoritative business rules must be deterministic, testable and enforced server-side.

### Security
Passwords, tokens, secrets and sensitive data must not be exposed through source control or client-side code. See `SECURITY.md`.

### Auditability
Official economic, competition, contract and administrative changes should be reconstructable.

### Maintainability
The codebase should favour clear domain boundaries, typed APIs, reusable services and documentation over clever abstractions.

### Performance
The system is intended for a small community. Optimize for responsive normal use and reliable queries before introducing unnecessary distributed infrastructure.

### Availability and recoverability
Production deployment must provide reliable database backups and a documented recovery procedure before the system becomes the authoritative record system.

### Accessibility and usability
Public and authenticated interfaces should be keyboard usable, readable, responsive and provide clear loading/error/empty states.

### Observability
Production errors and important operational events should be diagnosable without exposing secrets or sensitive user data.

## Requirements deliberately not invented

Exact business rules for squad limits, competition formats, TCP amounts, transfer/auction mechanics, match disputes and exceptional cases must come from the Constitution and approved TFA decisions. This document does not create new rules where authoritative information is not yet available.
