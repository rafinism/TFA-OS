# TFA-OS Domain Rules Registry

> **Purpose:** Record the TFA football-domain rules that TFA-OS must implement, while clearly separating confirmed rules from unresolved requirements.
>
> **Authority:** This document is technical documentation. It does not amend, replace, interpret, or override the TFA Constitution.

## 1. Authority and status

Every rule below has one of these statuses:

- **Constitutional** — explicitly established by the TFA Constitution.
- **Approved decision** — established by a prior TFA project decision that is intended to govern the software, but should be reconciled with the Constitution before enforcement if necessary.
- **Implementation requirement** — technical behavior needed to faithfully implement an established rule.
- **Pending** — not sufficiently established; AI/developers must not invent the missing rule.

If a rule conflicts with the Constitution, the Constitution wins and the conflict must be recorded before code is changed.

## 2. Constitutional foundation

The Constitution is the supreme governing document of TFA. TFA-OS is an implementation of that governing framework, not an alternative source of rules.

The Constitution establishes TFA as the independent football governing authority of TESL and gives it authority over football-related governance, competitions, clubs, players, player-market systems, finance, discipline and administration.

The Constitution also establishes official competitions, Seasons, Clubs, Managers, Squads, Player Cards, Contracts, Transfers and the player-market/economic concepts used by the system.

## 3. Competition entities

TFA-OS must distinguish at minimum:

- TFA
- Season
- Official Competition
- Competition participant
- Stage, where the approved competition format requires stages
- Fixture
- Official Match
- Result
- Standings
- Competition statistics

**TCL** and **TFC** are distinct official competitions and must not be collapsed into one generic competition in a way that loses their separate rules or records.

## 4. TFC rules already established for implementation

The following TFC rules were established during the TFA project and are recorded here so they are not lost between coding sessions:

### Points

- Win = 3 points
- Draw = 1 point
- Loss = 0 points

### League-stage ranking criteria

The established ordering is:

1. Points
2. Goal Difference
3. Goals For
4. Head-to-Head
5. Played

### Qualification

For the established 12-club TFC format, the top 8 clubs qualify for the quarter-finals.

The exact format for non-12-club participation must follow the approved TFA competition rules; the software must not silently invent a new format.

## 5. Squad rules already established

The current TFA project decisions establish:

- Each Club Squad has 25 Player Cards.
- An Official Match requires 23 available players: 11 starting players plus 12 substitutes.

The detailed composition/position requirements and all exceptional cases must be enforced only where established by the Constitution or an approved TFA decision.

## 6. Player Pool

The project is intended to maintain an official pool of approximately 500 unique football players/player-card records.

The Player Pool is TFA-controlled data. A browser-local list is not an authoritative Player Pool.

The pool may contain retired players where the approved player-pool rules permit them.

The exact eligibility, card-version, rating, valuation and update lifecycle must follow the approved Player Market rules and must not be invented by the UI.

## 7. Player Cards and market concepts

The Constitution defines Player Cards and a Player Market System. The project has also discussed these card categories:

- Base Cards
- Trending Cards
- Single Booster Highlight Card

These categories should not be implemented as binding business rules until their exact eligibility and valuation behavior is confirmed against the authoritative TFA rules.

The Constitution defines MSV (Market Value) in relation to Live Performance Rating. TFA-OS must preserve the distinction between a real eFootball rating and a TFA-controlled market value.

## 8. Contracts

The established project design is:

- Player Cards may have a 1-season or 2-season contract.
- A 2-season contract receives a 10% discount from the applicable contract price.

The exact price calculation, renewal timing, release behavior, expiry behavior and exceptional cases must follow the authoritative rules.

## 9. Transfers, waivers and auction

TFA-OS is intended to support:

- Transfer Windows
- Transfers
- Contract renewals
- Releases/free agents
- Waivers
- Auctions

The project decision for the initial system was **no loan system initially**, even though the Constitution's glossary defines the concept of a loan. This must be treated as an implementation/competition policy decision and reconciled with the Constitution before a loan feature is enabled.

The exact transaction sequence, fees, eligibility, timing, ownership changes and rollback/dispute rules remain pending wherever they are not explicitly settled.

## 10. TCP economy

TCP is TFA's internal/imaginary football economy credit.

The established initial design discussed for TFA-OS includes:

- Each starting Club receives 1,000 TCP.
- TFA retains the remaining starting treasury allocation rather than distributing all treasury funds to Clubs.
- A previously discussed starting treasury target was 15,000 or 20,000 TCP, with 12,000 TCP distributed to twelve starting Clubs. This remains a design decision to confirm before implementation.

### Match rewards

The established reward proposal is:

- Participation = +100 TCP
- Win = +25 TCP
- Draw = +15 TCP
- Loss = +0 TCP

### End-of-season rewards

The established proposal is:

- Top 8 = +50 TCP
- Semi-finalist = +75 TCP
- Third place = +100 TCP
- Runner-up = +125 TCP
- Champion = +175 TCP

These amounts are recorded as project decisions/proposals and must not be treated as constitutional rules unless the Constitution or an approved regulation establishes them.

### Ledger principle

TCP balances must be derived from an authoritative transaction ledger. Administrative corrections should be represented as controlled transactions/reversals, not silent balance edits.

## 11. Seasons and club-count variability

The TFA project intentionally needs to tolerate different numbers of active Clubs across Seasons.

The previously established planning rule was:

- 8 or fewer Clubs: single round-robin championship format.
- More than 8 Clubs: group-stage plus knockout format.

This is a project-level competition design rule and must be reconciled with the Constitution/official competition regulations before being enforced as an invariant.

TFA-OS must preserve historical Seasons rather than rewriting historical competition records when the number of active Clubs changes in a later Season.

## 12. Match administration

The system must treat an Official Match as an auditable record with, at minimum, participating Clubs, competition/Season context, scheduling information and an official result.

Result changes after officialisation must be controlled and auditable.

The established TFA network/load-shedding rule is that the participant who loses connection loses the Match. The exact evidence, timing, dispute and administrator-verification process remains a separate requirement and must not be inferred from this single principle.

## 13. Governance and administration

TFA-OS must support administrative authority without giving ordinary Managers unrestricted access to TFA-wide records.

The application must distinguish at minimum:

- Public visitor
- Registered user/member
- Manager
- TFA administrator/official

The exact permission matrix for constitutional offices and exceptional administrative powers remains pending until the authoritative governance rules are mapped completely.

## 14. Auditability

The following classes of records should be reconstructable:

- TCP transactions
- Contract changes
- Player ownership/assignment changes
- Competition result changes
- Administrative actions
- Material Club/Manager status changes

An audit record should identify the actor, action, affected entity, time and relevant before/after or contextual data where appropriate.

## 15. Explicitly pending domain decisions

Do not invent these during implementation:

1. Final TCL format and all edge cases.
2. Exact formats for every possible Club count.
3. Complete Player Card category and eligibility matrix.
4. Exact MSV/rating calculation and update schedule.
5. Full Squad composition rules and exception handling.
6. Exact auction mechanics.
7. Exact waiver mechanics.
8. Complete transfer fee/pricing/eligibility rules.
9. Contract price formula and all renewal/release edge cases.
10. Whether and when loans become available.
11. Complete TCP treasury funding and issuance rules.
12. Exact match submission, verification and dispute workflow.
13. Complete administrative permission matrix.
14. Complete disciplinary/fine rules and their TCP effects.
15. Canonical machine-readable Constitution publication/versioning workflow.

## 16. Rule-change protocol

When a future coding request requires a rule that is not established:

1. Stop before implementing the business rule.
2. Identify the relevant constitutional provision or approved TFA decision.
3. If none exists, mark the requirement **Pending**.
4. Ask for or record the authoritative TFA decision.
5. Update this registry and the relevant technical documentation.
6. Only then implement the rule.

This protocol exists specifically to prevent AI coding agents from turning guesses into permanent TFA rules.
