# Database Specification

## Principle

PostgreSQL is the authoritative persistent store. Prisma is the current ORM. Business state must not exist only in frontend mock data.

## Current foundational entities

The current Prisma schema already contains:

- `User` — identity, role, status, timestamps.
- `AuthToken` — password reset, email verification, refresh-token foundation.
- `Manager` — Manager identity and appointment history.
- `ManagerApplication` — application workflow.
- `Club` — permanent Club entity and status.
- `ClubManager` — historical Manager-to-Club relationship.
- `Season` — season lifecycle.
- `Competition` / `CompetitionClub` — competition and participation.
- `Player` — Player Pool record.
- `PlayerContract` — Club/Player/Season contract foundation.
- `TCPAccount` / `TCPTransaction` — Club/Treasury accounting foundation.
- `Match` — fixture/result foundation.
- `AuditLog` — critical-action history.
- `Notification` — user notifications.

## Required domain model direction

The final model must distinguish:

1. User identity
2. Manager appointment
3. Permanent Club identity
4. Player identity
5. Eligible Player Card information
6. Club-held Player Right
7. Player Contract
8. Player Right Loan
9. Competition participation
10. Fixture and result submissions/verification
11. TCP accounts and immutable transaction history
12. Administrative/audit records

A Player Right must not be represented merely as a mutable Player ownership flag, because rights can move between Clubs and can be temporarily loaned.

## Club relationships

A Club retains historical identity and records when its Manager changes. Manager-to-Club relationships therefore need history, not a single destructive foreign-key replacement.

## Finance

TCP balance should be derivable from the transaction ledger. Treasury and Club accounts are distinct account types. Financial operations must be atomic and validated against available balance and applicable TFA rules.

Corrections should preserve the original transaction and use an authorised adjustment/reversal mechanism.

## Match result data flow

```text
Fixture
  ↓
Manager A submission ─┐
                     ├─ compare
Manager B submission ─┘
       │
       ├─ match → verify/publish
       └─ conflict → notify President → administrative resolution
```

The database must preserve submission and verification information sufficiently to audit disputes.

## Development database

Development data is disposable and seedable. Production data is separate and starts clean. The eventual seed system should create the controlled 17-account test population without embedding those identities in application code.

## Schema changes

Schema changes require a documented reason, migration, impact review, and appropriate tests. Do not change the schema merely to make a single page easier to build.
