# TFA-OS Project Specification

## 1. Purpose

TFA-OS is the digital operating platform for the TESL Football Association. Its purpose is to turn the rules and recurring operations of TFA into a consistent, auditable software system.

The intended product is a complete football-management ecosystem, not merely a public results site. It should support public information, registered managers, club operations, player management, competitions, matches, contracts, transfers, TCP finance, administration, records and auditability.

## 2. Product vision

The long-term vision established for TFA-OS is a persistent football ecosystem in which managers operate clubs across seasons: clubs build squads, acquire and manage player cards, enter competitions, play matches, manage TCP, accumulate history and compete for honours.

The software should automate normal operations while preserving controlled administrative/manual override for exceptional cases.

## 3. Users and actors

### Public visitor
Can consume public TFA information such as Constitution, announcements, competitions, clubs, players, fixtures, results, standings, statistics and history as those features become available.

### Registered user / member
A TFA-recognised account that may have access to authenticated functions according to its assigned role.

### Manager
The person responsible for managing and representing a Registered Club. Manager functionality is intended to cover club, squad, contracts, transfers, finances, matches and related notifications.

### Administrator / TFA official
Operates the administrative side of TFA-OS, including clubs, managers, players, competitions, seasons, contracts, transfers, finance, matches, announcements, audit and settings, subject to constitutional authority.

## 4. Core terminology

- **TFA** — TESL Football Association.
- **TESL** — Triangle E-Sport League.
- **TCL** — TESL Champions League.
- **TFC** — TESL eFootball Cup.
- **Club** — a football organisation participating or seeking participation in TFA activities.
- **Registered Club** — a Club officially recognised by TFA for Official Competition participation.
- **Manager** — person responsible for a Registered Club.
- **Player Card** — an eFootball player card used by a Club under TFA rules.
- **Squad** — the collection of registered Player Cards assigned to a Club.
- **Matchday Squad** — players selected for an Official Match.
- **Season** — official period covering TFA competition and related football operations.
- **TCP** — TFA's internal/imaginary football economy credit.
- **Transfer Window** — designated period for permitted Player Market activity.
- **Contract** — official agreement recognised by TFA between a Club and Player Card.
- **Auction** — TFA-authorised process using TCP to acquire Player Cards.

The Constitution contains the authoritative legal definitions. This list is a software glossary, not a replacement for the Constitution.

## 5. Scope

### In scope
- Public TFA information and records.
- Authentication and role-based access.
- Manager applications/management.
- Club registration and management.
- Player pool and Player Card records.
- Squad registration and matchday selection.
- Contracts and renewals.
- Transfer windows and authorised player movement.
- Auction/market processes where authorised.
- TCL and TFC competition operations.
- Seasons, fixtures, matches, results, standings and statistics.
- TCP accounts, transactions, rewards, fines, treasury and audit trail.
- Announcements and notifications.
- Administrative controls and audit history.

### Out of scope unless later approved
No unrelated social network, real-money payment system, external eFootball automation, or generic fantasy-football product should be added merely because it is technically possible.

## 6. Known constraints

- TFA rules are governed by the Constitution.
- The Constitution must not be casually reinterpreted by software developers or AI agents.
- The project is intended for a small community and should favour reliability and maintainability over unnecessary infrastructure complexity.
- The eFootball ecosystem does not provide a dependable application API for every TFA data requirement; where live game data is unavailable, TFA-controlled data must be used according to the rules.
- Normal operations should be automated, but authorised manual intervention must remain possible.

## 7. Current maturity

The repository is an early-stage prototype. The frontend is considerably more developed visually than the backend. Authentication and a preliminary data model exist, but most TFA domain workflows are not yet implemented end-to-end.

## 8. Source-of-truth hierarchy

1. **TFA Constitution** — authoritative rules.
2. **Approved TFA decisions/regulations** — only where validly authorised by the Constitution.
3. **TFA-OS technical documentation** — implementation specification; cannot override rules.
4. **Source code and database** — current implementation; if it conflicts with approved requirements, the conflict must be recorded and corrected deliberately.
5. **AI assumptions** — never authoritative.

## 9. Open questions

The following must be resolved from the Constitution or explicit TFA decisions before implementation when not already specified:

- Exact competition-format rules for every possible number of participating Clubs.
- Complete Player Card categories, eligibility and valuation rules.
- Complete squad-registration and matchday enforcement rules.
- Exact transfer, waiver, auction and renewal workflows.
- Full TCP issuance, reward, fine, transfer and treasury rules.
- Match submission, verification, dispute and connection-loss procedures.
- Exact role/permission matrix for every administrative action.
- Canonical machine-readable representation of the Constitution and its publication workflow.

When any of these are uncertain, documentation must mark them as pending instead of inventing an answer.
