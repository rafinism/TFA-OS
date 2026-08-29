# TFA-OS Project Specification

## 1. Purpose

TFA-OS is the official software platform for administering, participating in, recording, and publicly presenting the activities of the TESL Football Association (TFA).

It is not merely a scoreboard. It is intended to become the operational system and permanent digital archive of TFA.

## 2. Goals

- Implement TFA rules faithfully.
- Remove hard-coded business mock data from normal application operation.
- Provide role-appropriate public, community, Manager, and President capabilities.
- Automate deterministic operations while retaining controlled President override.
- Preserve history and auditability rather than silently overwriting official records.
- Support complete development testing using database-backed test accounts and entities.
- Start production with a clean database.

## 3. Users

### Visitor
No account. Can read public TFA information, fixtures, official results, standings, Clubs, squads/public financial information, transfers/news, Constitution, and other published records. Cannot comment or perform protected actions.

### Registered User
Can do everything a Visitor can do, plus authenticated community actions such as comments and TCL participation. May apply for Manager status or for an available/inactive Club according to TFA rules. Does not receive Club-management or TFC access merely by registering.

### Manager
A President-approved Manager is a Registered User with one Club. Managers participate in TCL and TFC and operate their Club through authorised workflows.

### President/Admin
Highest administrative authority in TFA-OS, subject to the Constitution and applicable TFA governance. Can approve applications, administer Clubs/competitions, resolve conflicts, perform authorised overrides, administer records and discipline, and manage official systems.

## 4. Core terminology

- **TFA**: TESL Football Association.
- **TCL**: TFA's Club competition.
- **TFC**: TFA's competition conducted under its separate constitutional competition rules.
- **Club**: Permanent TFA-recognised Club entity.
- **Manager**: Person appointed to operate one Club.
- **Player Pool**: Official TFA pool of eligible players.
- **Player Right**: TFA-recognised right held by a Club concerning a Player.
- **TCP**: TFA's internal competition credit/economic unit.
- **Player Right Loan**: Temporary loan of a Player Right from one Club to another; this is not a Treasury loan or Club financing facility.

## 5. Club lifecycle

A user may apply to become a Manager. Where the application is for a new Club, the application also proposes the Club identity for President approval. A user may also apply to take over an available/inactive Club. A person may manage only one Club at a time.

Clubs are permanent historical entities and are not deleted merely because a Manager leaves. The Manager account remains as historical record but loses Manager/Club access. An inactive Club retains its history and TCP. Its player rights/contracts are handled under the constitutional lifecycle, and a future approved Manager inherits the Club and its retained TCP and rebuilds its squad.

Club identity changes must follow the Constitution; the software must not provide an arbitrary rename/rebrand operation to Managers or the President where the Constitution prohibits it.

## 6. Competition access

Every Registered User can participate in TCL. TFC participation requires Manager status. Visitors cannot participate.

## 7. Match-result principle

For a match requiring two Manager submissions, both Clubs submit their result against the same fixture. Matching submissions can be automatically verified and published. Conflicting submissions must remain unpublished and generate an administrative notification for President resolution. Once official, later corrections are administrative actions and must preserve an audit trail.

## 8. Automation and overrides

Deterministic transactions should be automatic. A President/Admin override exists for authorised exceptional or corrective action. Overrides must be recorded with actor, time, affected entity, previous state, new state, and reason/clarification. Automation must never bypass constitutional restrictions.

## 9. Development model

The development environment uses a real database and controlled test population: one President/Admin, sixteen registered users, twelve of whom are Managers, and twelve test Clubs. The same accounts are used to test TCL, TFC, Club management, permissions, finance, transfers, records, comments, and other workflows. Visitors are tested separately without authentication.

No production business behavior should depend on hard-coded mock arrays or fake frontend state.

## 10. Scope boundaries

The Constitution is the authoritative source of league rules. Technical documents explain implementation. AI/development rules govern how code is changed. If a rule is missing or ambiguous, document the ambiguity and resolve it before encoding a permanent behavior; do not invent a constitutional rule.

## 11. Long-term vision

TFA-OS should become the single reliable operational and historical record for TFA: public information, participation, Club management, competition administration, Player Rights, contracts, TCP, transfers, match records, governance, discipline, and archives.
