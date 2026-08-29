# FEATURES.md

## Status legend

- 🟢 Implemented
- 🟡 Partial
- 🔵 Prototype
- ⚪ Planned
- ❓ Pending specification

## Identity and access

| Feature | Status | Priority | Notes |
|---|---|---|---|
| User registration | 🟢 | P0 | Backend endpoint exists. |
| Login/JWT | 🟢 | P0 | Backend foundation exists. |
| Profile (`auth/me`) | 🟢 | P0 | Backend endpoint exists. |
| Password reset | 🟡 | P0 | Backend flow exists; frontend reset UI is absent. |
| Email verification | ⚪ | P1 | Schema token type exists; workflow not implemented. |
| Refresh tokens/session renewal | ⚪ | P1 | Schema enum exists; complete flow absent. |
| Role/permission matrix | 🟡 | P0 | Coarse roles exist; fine-grained authorization not built. |

## Public platform

| Feature | Status | Priority |
|---|---|---|
| Home page | 🔵 | P1 |
| Constitution browsing | 🟡 | P0 |
| Official Constitution document assets | 🟢 | P0 |
| Announcements | 🔵 | P1 |
| Seasons | 🔵 | P1 |
| TCL public pages | 🔵 | P1 |
| TFC public pages | 🔵 | P1 |
| Clubs public records | ⚪ | P1 |
| Player public records | 🔵 | P1 |
| Official history/honours | ⚪ | P2 |

## Manager platform

| Feature | Status | Priority |
|---|---|---|
| Manager dashboard | 🔵 | P1 |
| Club management | 🔵 | P0 |
| Squad management | 🔵 | P0 |
| Contract management | 🔵 | P0 |
| Transfer management | 🔵 | P0 |
| Finance/TCP | 🔵 | P0 |
| Match management | 🔵 | P0 |
| Notifications | ⚪ | P1 |

## Administration

| Feature | Status | Priority |
|---|---|---|
| Admin shell/navigation | 🟢 | P1 |
| Club administration | 🔵 | P0 |
| Manager administration | 🔵 | P0 |
| Player pool administration | 🔵 | P0 |
| Contract administration | 🔵 | P0 |
| Transfer administration | 🔵 | P0 |
| Finance/TCP administration | 🔵 | P0 |
| Match administration | 🔵 | P0 |
| Season administration | 🔵 | P0 |
| TFC administration | 🔵 | P1 |
| Audit log UI | 🔵 | P1 |
| Settings | 🔵 | P1 |

## Core football systems

| Feature | Status | Priority |
|---|---|---|
| Player Pool persistence | ⚪ | P0 |
| Player Card model/rules | ⚪ | P0 |
| Squad registration | ⚪ | P0 |
| Matchday eligibility | ⚪ | P0 |
| Contracts | 🟡 | P0 |
| Contract renewal | ⚪ | P0 |
| Transfers | ⚪ | P0 |
| Auction | ⚪ | P0 |
| Waiver system | ⚪ | P1 |
| Loan system | ❓ | P1 |
| TCL competition engine | ⚪ | P0 |
| TFC competition engine | ⚪ | P1 |
| Fixture generation | ⚪ | P0 |
| Results verification | ⚪ | P0 |
| Standings calculation | ⚪ | P0 |
| Knockout progression | ⚪ | P0 |
| Statistics | ⚪ | P1 |
| TCP ledger | 🟡 | P0 |
| TCP rewards/fines | ⚪ | P0 |
| TFA treasury | 🟡 | P0 |
| Audit/history | 🟡 | P0 |
| Notifications | 🟡 | P1 |

## Priority interpretation

- **P0:** required for the authoritative operating system/core league operation.
- **P1:** important supporting/public functionality.
- **P2:** later enhancement.

Statuses are intentionally conservative. A route or UI is not called implemented merely because a page exists.
