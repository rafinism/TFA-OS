# TFA-OS Implementation Matrix

This matrix connects the TFA domain to the software that must eventually implement it. It is deliberately conservative: a route or database table does not count as an implemented feature unless the end-to-end authoritative workflow exists.

| Domain | Intended system capability | Current repository state | Target implementation layer | Priority |
|---|---|---|---|---|
| Identity | Registration/login/profile | Foundation exists | Backend + frontend | P0 |
| Authorization | Role/permission enforcement | Incomplete | Backend guards/policies + UI | P0 |
| Constitution | Publish/read official Constitution | UI/data representation exists | Controlled content/versioning | P0 |
| Clubs | Registration, lifecycle, manager assignment | Preliminary schema/UI | Backend domain + admin UI | P0 |
| Managers | Identity, club relationship, status/history | Preliminary schema/UI | Backend domain + manager/admin UI | P0 |
| Player Pool | Authoritative Player Cards | Rich local UI prototype | Persistent backend + admin UI | P0 |
| Squads | Registered squad and eligibility | UI foundation only | Backend domain + manager UI | P0 |
| Contracts | Create/renew/release/expire | Preliminary schema/UI | Backend rules + transactions | P0 |
| Transfers | Controlled player movement | Placeholder | Backend workflow + UI | P0 |
| TCP | Ledger, balance, rewards, fines, treasury | Preliminary schema | Authoritative ledger/service | P0 |
| Seasons | Create/activate/close/history | Preliminary schema/UI | Backend domain + admin UI | P0 |
| Competitions | TCL/TFC definitions and lifecycle | Preliminary schema/UI | Backend domain + admin UI | P0 |
| Fixtures | Schedule and manage fixtures | Mostly prototype | Backend domain + UI | P0 |
| Matches | Submission, verification, official result | Preliminary schema | Backend workflow + UI | P0 |
| Standings | Deterministic ranking | Prototype/local data | Competition service | P0 |
| Statistics | Official derived statistics | Prototype/local data | Derived-query/reporting layer | P1 |
| Auction | Authorised TCP acquisition process | Not implemented | Backend workflow + admin/manager UI | P1 |
| Waiver | Authorised acquisition process | Not implemented | Backend workflow + UI | P1 |
| Notifications | Official/system notifications | Preliminary schema | Backend events + UI | P1 |
| Audit | Material action history | Preliminary schema | Backend audit service + admin UI | P0 |
| Announcements | Publish/display official notices | Prototype | Backend content workflow + UI | P1 |
| History | Persistent honours/records across seasons | Not implemented end-to-end | Backend reporting/history | P1 |

## Status interpretation

- **Foundation exists:** technical groundwork exists but does not constitute a complete business workflow.
- **Prototype/local data:** UI demonstrates intended behavior but is not authoritative.
- **Preliminary schema:** database structures exist but business rules/services are incomplete.
- **Not implemented:** no meaningful end-to-end implementation exists yet.

## Implementation rule

The target implementation layer must enforce authoritative rules on the server. Frontend validation may improve usability but must never be the sole enforcement mechanism for TFA rules, permissions, TCP, contracts, squad eligibility, competition progression or official results.
