# DATABASE.md

## Current database technology

The backend uses Prisma with PostgreSQL. The current schema is `backend/prisma/schema.prisma` and is the database design currently present in the repository.

## Current entities

| Entity | Current purpose |
|---|---|
| `User` | Account identity, role, status and profile data. |
| `AuthToken` | Hashed, expiring authentication-related tokens. |
| `Manager` | Manager profile linked one-to-one with a User. |
| `ManagerApplication` | Manager application/review state. |
| `Club` | Club identity/status and relations to managers, contracts, competitions, matches and TCP account. |
| `ClubManager` | Historical/active manager-to-club relationship. |
| `Season` | Season identity, number, lifecycle and dates. |
| `Competition` | Competition within a Season, with TCL/TFC type. |
| `CompetitionClub` | Club participation in a Competition. |
| `Player` | Current basic player-pool record. |
| `PlayerContract` | Player-to-club contract for a Season, dates, fee and status. |
| `TCPAccount` | Club or treasury accounting account. |
| `TCPTransaction` | Ledger transaction between TCP accounts, including type/reference/reversal linkage. |
| `Match` | Competition match, clubs, schedule, scores and verification timestamp. |
| `AuditLog` | Actor/action/entity/details history. |
| `Notification` | User notifications and read state. |

## Current enums

The schema currently defines enums for user role/status, manager application status, club/season/competition status, competition type, TCP account/transaction type, player status, contract status, manager-club status and authentication token type.

## Current relationships

```text
User
 ├── Manager (optional 1:1)
 ├── ManagerApplication[]
 ├── AuthToken[]
 ├── AuditLog[]
 └── Notification[]

Manager ── ClubManager[] ── Club

Season ── Competition[] ── CompetitionClub[] ── Club
              │
              └── Match[]

Player ── PlayerContract[] ── Club
                         │
                         └── Season

TCPAccount ── TCPTransaction[] (from/to)

Club ── TCPAccount (optional 1:1)
```

## Current strengths

- Primary keys and unique constraints exist for important identities.
- Foreign keys are explicit.
- Several useful indexes already exist.
- TCP uses decimal database values rather than floating-point application money.
- Audit logs and notification storage are already represented.
- Contract, competition and match records have lifecycle/status concepts.

## Current gaps

The current schema is not yet sufficient to represent the complete TFA operating model. Areas requiring requirements-driven design include:

- detailed Player Card attributes and card eligibility;
- registered squad membership and matchday squad selection;
- competition stages/groups/rounds/brackets and format-specific rules;
- standings/statistics materialization or deterministic calculation structures;
- transfer, auction, waiver and market events as first-class records;
- contract rules and non-overlap/integrity enforcement;
- match submissions, verification, disputes and corrections;
- detailed TCP reward/fine/auction/treasury business events;
- official announcements/content;
- richer notification/event linkage;
- constitutional versions/amendments if the web system is to manage them;
- explicit administrative permissions beyond the current coarse UserRole.

## Data-flow requirements

### Authoritative state
The database is the system of record for official Clubs, Players, contracts, competitions, matches, TCP and audit data.

### Transactions
Operations that change multiple related records must be atomic. Examples include a transfer plus contract changes plus TCP movement, or official result publication plus standings/statistics updates.

### History
Do not destroy official historical information merely to represent current state. Where TFA needs historical state, model it explicitly.

### TCP
A Club/Treasury balance should be derivable from the ledger. Direct arbitrary client-supplied balance updates are not acceptable.

### Referential integrity
Use foreign keys, uniqueness constraints and appropriate status rules to prevent impossible relationships. Cross-row business invariants that PostgreSQL cannot express directly should be enforced transactionally by the backend.

## Migration policy

The repository currently contains the Prisma schema but no committed migration directory. Before production use, migrations must be introduced and treated as versioned database history. Do not use destructive resets against authoritative data.

## Schema decision rule

Do not add a table or field simply because a generic football application normally has one. Add it when required by the Constitution, an approved TFA requirement, an identified implementation invariant, or a concrete technical need.
