# TFA-OS Domain Rules Registry

> **Purpose:** Record the TFA football-domain rules that TFA-OS must implement, while clearly separating confirmed rules from unresolved requirements.
>
> **Authority:** This document is technical documentation. It does not amend, replace, interpret, or override the TFA Constitution.

## 1. Authority and status

Every rule below has one of these statuses:

- **Constitutional** — explicitly established by the TFA Constitution.
- **Approved decision** — established by a prior TFA project decision intended to govern the software.
- **Implementation requirement** — technical behavior needed to faithfully implement an established rule.
- **Pending** — not sufficiently established; AI/developers must not invent the missing rule.

If a rule conflicts with the Constitution, the Constitution wins and the conflict must be recorded before code is changed.

## 2. Constitutional foundation

The Constitution is the supreme governing document of TFA. TFA-OS is an implementation of that governing framework, not an alternative source of rules.

The Constitution establishes TFA as the independent football governing authority of TESL and gives it authority over football-related governance, competitions, clubs, players, player-market systems, finance, discipline and administration. It also establishes the concepts of Seasons, Clubs, Managers, Squads, Player Cards, Contracts, Transfers and the player-market/economic systems used by TFA.

## 3. Governance, users and manager lifecycle

### 3.1 Accounts

- Any person may register a TFA-OS user account.
- A registered user is not automatically a Manager.
- The President is the highest administrative authority in TFA-OS.

### 3.2 Becoming a Manager

A registered user may apply to become a Manager.

There are two application paths:

1. **Creating a new Club:** if the applicant is establishing a new Club, the Manager application also serves as the application to create that Club. The applicant supplies their image, proposed Club name and Club logo.
2. **Taking over an inactive Club:** if a Club exists without a Manager, a registered user may apply to become its Manager.

The President reviews the application. For a new Club, the applicant proposes the identity; TFA/President may reject the proposed name or logo. Approval makes the user a Manager and gives the Manager the appropriate Club-level access. A person may not manage more than one Club at the same time.

### 3.3 Club identity and continuity

- Clubs are permanent TFA records and cannot be deleted merely because a Manager leaves.
- An approved Club identity is not subject to arbitrary later alteration by the President.
- When a Manager leaves, the user account remains as a historical account but loses the Manager role and Club access.
- The Club becomes **Inactive** rather than being deleted.
- The Club retains its historical record and TCP balance.
- Existing player contracts are ended according to the applicable TFA rules and the affected players return to the Free Agent Pool.
- A future Manager taking over the inactive Club inherits the Club's existing TCP and must rebuild its Squad.
- The returning/new Manager is taking over the existing Club, not creating a replacement Club; Club history and identity remain continuous.

The precise contract-termination mechanics must still follow the Constitution wherever this technical summary does not specify them.

## 4. Competition entities

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

## 5. TFC rules already established for implementation

The established TFC rules are:

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

The exact format for non-12-club participation must follow approved TFA competition rules; the software must not silently invent a new format.

## 6. Squad rules

The established TFA project decisions are:

- Each Club Squad has 25 Player Cards.
- An Official Match requires 23 players: 11 starters plus 12 substitutes.

Any additional position/composition requirements and exceptions must come from the Constitution or an approved TFA decision.

## 7. Player Pool

The project intends to maintain an official pool of approximately 500 **unique** football players/player-card records.

- The Player Pool is TFA-controlled data.
- Retired players may be retained in the pool where the approved player-pool rules permit them.
- The browser/client must never be treated as the authoritative Player Pool.
- Eligibility, card-version, rating, valuation and update lifecycle must follow approved TFA rules.

## 8. Player Cards and market concepts

The Constitution defines Player Cards and a Player Market System. The project has discussed these card categories:

- Base Cards
- Trending Cards
- Single Booster Highlight Card

Their exact eligibility/valuation behavior must follow the authoritative TFA rules rather than being invented by UI code.

The Constitution defines MSV (Market Value) in relation to Live Performance Rating. TFA-OS must preserve the distinction between eFootball's rating and TFA's controlled market value.

## 9. Contracts

Established project design:

- Player Cards may have a 1-season or 2-season contract.
- A 2-season contract receives a 10% discount from the applicable contract price.

Exact pricing, renewal timing, release behavior, expiry behavior and exceptions remain governed by the authoritative rules.

## 10. Transfers, waivers, auctions and loans

The intended Player Market includes:

- Transfer Windows
- Transfers
- Contract renewals
- Releases/free agents
- Waivers
- Auctions

The initial implementation decision is **no loan system initially**. Although the Constitution defines a Loan concept, TFA-OS should not enable a loan workflow until the applicable competition/market rules authorize it.

The exact auction, waiver, transfer-fee, eligibility, timing, ownership, rollback and dispute mechanics must not be invented where they are not already settled.

## 11. TCP economy

TCP is TFA's internal football-economy credit.

### Starting allocation

The project previously proposed:

- Each starting Club receives 1,000 TCP.
- TFA retains the remaining starting treasury allocation.
- A previously discussed initial treasury target was 15,000 or 20,000 TCP, with 12,000 distributed to twelve starting Clubs.

The exact treasury target remains a **pending implementation decision** unless established elsewhere in the authoritative TFA rules.

### Match rewards

The established project reward schedule is:

- Participation = +100 TCP
- Win = +25 TCP
- Draw = +15 TCP
- Loss = +0 TCP

### End-of-season rewards

The established project schedule is:

- Top 8 = +50 TCP
- Semi-finalist = +75 TCP
- Third place = +100 TCP
- Runner-up = +125 TCP
- Champion = +175 TCP

These schedules must be reconciled with the Constitution/approved regulations before they are treated as constitutional invariants.

### Accounting

- Normal TFA transactions should be generated automatically by the relevant business operation.
- TCP balances must be derived from an authoritative ledger, not trusted from client input.
- The President/Admin has the administrative override capability.
- A correction should use a controlled adjustment/reversal/redo mechanism rather than silently rewriting the historical transaction.
- Manual administrative changes must record the changed value/context and a clarification/reason in the public audit/override log as required by TFA policy.

## 12. Seasons and variable Club counts

The project intentionally needs to support different numbers of active Clubs across Seasons.

The previously established planning rule was:

- 8 or fewer Clubs: single round-robin championship format.
- More than 8 Clubs: group-stage plus knockout format.

This remains a project competition-design rule and must be reconciled with the Constitution/official competition regulations before enforcement.

Historical Seasons must not be rewritten when later Seasons have different Club counts.

## 13. Match result lifecycle

Each official Match has two Manager submissions associated with the same Match record.

### Matching submissions

When both participating Managers submit the same result:

1. The submissions are linked to the same Match.
2. The system automatically verifies the result.
3. The verified result becomes the official result.
4. The result becomes publicly visible.

### Conflicting submissions

If the Managers submit different results:

1. The conflicting result is **not automatically published as the official public result**.
2. The President/Admin receives a notification requiring intervention.
3. The President reviews available evidence, including the relevant Discord screenshot/evidence.
4. The President enters/corrects the official result.
5. The official result is then published.

The submitted values and the administrative resolution must remain auditable.

### Official result correction

After a result becomes official, only the President/Admin may edit it. Any such correction must be auditable.

### Connection-loss rule

The established TFA rule is that the participant who loses connection loses the Match. Evidence, timing and dispute procedures must follow the authoritative TFA rules and must not be invented from this summary alone.

## 14. Automation and administrative override

Automation is the default for calculations and routine operations, including where applicable:

- standings
- competition points
- goal difference/goals-for calculations
- player statistics
- TCP transactions and balances
- rewards
- contract lifecycle calculations
- competition qualification
- other deterministic TFA calculations

The President/Admin must have a controlled override capability for authoritative data and automated outcomes where administrative intervention is permitted.

An override must not silently erase the automatically generated state. It should preserve the original event/value and record the administrative action, new value and clarification/reason in the audit/public log as required.

Managers do **not** have the unrestricted override capability described above.

## 15. Historical records

TFA-OS must preserve official historical records, including where applicable:

- Seasons
- Clubs and their identities
- former Managers
- Squads and player assignments
- Contracts
- Transfers and market activity
- Match submissions and official results
- Competition statistics
- TCP transactions
- administrative/audit records
- honours and achievements

A person leaving TFA should not cause the destruction of the historical record of their participation.

## 16. Governance and permissions

At minimum, the system distinguishes:

- Public visitor
- Registered user/member
- Manager
- President/Admin

The President/Admin is the highest TFA-OS administrative authority. Detailed permissions must be derived from the Constitution and approved governance rules rather than inferred from page ownership.

## 17. Explicitly pending domain decisions

The following remain unresolved in the current consolidated record and must not be invented during coding:

1. Final TCL format and all edge cases.
2. Exact competition formats for every possible Club count.
3. Complete Player Card category/eligibility matrix.
4. Exact MSV/rating calculation and update schedule.
5. Full Squad composition rules and exceptions.
6. Exact auction mechanics.
7. Exact waiver mechanics.
8. Complete transfer fee/pricing/eligibility rules.
9. Complete contract price formula and all renewal/release edge cases.
10. Whether and when loans become available after the initial no-loan implementation.
11. Complete TCP treasury funding/issuance rules and the final starting treasury amount.
12. Any remaining details of the match dispute/evidence workflow beyond the confirmed two-submission model.
13. Complete administrative permission matrix beyond President supremacy.
14. Complete disciplinary/fine rules and their TCP effects.
15. Canonical machine-readable Constitution publication/versioning workflow.

## 18. Rule-change protocol

When a coding request requires a rule that is not established:

1. Identify the relevant constitutional provision or approved TFA decision.
2. If none exists, mark the requirement **Pending**.
3. Do not invent a business rule to make the feature work.
4. Obtain/record the authoritative TFA decision.
5. Update this registry and affected technical documentation.
6. Only then implement the rule.

This protocol exists specifically to prevent AI coding agents from turning guesses into permanent TFA rules.
