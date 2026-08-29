# Website Sitemap and Routes

This is the target route map. A route being listed does not mean its implementation is complete.

## Public / Visitor

- `/` — public TFA home
- `/login` — authentication
- `/register` — account registration
- `/announcements` — published announcements/news
- `/constitution` — Constitution index
- `/constitution/article` — Constitution article view
- `/constitution/[articleNumber]` — individual article
- `/constitution/document/[documentId]` — constitutional document/version
- `/seasons` — public seasons
- `/tcl` — TCL overview
- `/tcl/clubs` — TCL Clubs
- `/tcl/fixtures` — TCL fixtures
- `/tcl/results` — TCL results
- `/tcl/standings` — TCL standings
- `/tcl/statistics` — TCL statistics
- `/tcl/players` — TCL Player Pool/player information
- `/tcl/seasons` — TCL season archive
- `/tfc` — TFC overview
- `/tfc/fixtures` — TFC fixtures
- `/tfc/results` — TFC results
- `/tfc/participants` — TFC participants
- `/clubs/[clubId]` — public Club profile/history (target)
- `/players/[playerId]` — public Player profile (target)
- `/transfers` — public transfer/news view (target)
- `/finance` — public financial information/ledger view where applicable (target)

## Authenticated Registered User

- `/dashboard` — authenticated user dashboard
- `/comments` or contextual comment interfaces — community interaction (target)
- `/tcl/...` — TCL participation actions where the specific route/action requires authentication
- `/manager/apply` — Manager/Club application (target)

## Manager

- `/manager` — Manager area
- `/manager/dashboard` — Manager dashboard
- `/manager/club` — managed Club
- `/manager/squad` — squad
- `/manager/contracts` — contracts
- `/manager/transfers` — transfers/market
- `/manager/finance` — Club TCP
- `/manager/matches` — Manager fixtures/result submissions
- additional Manager routes may be added when required by approved features

## President/Admin

- `/admin` — administration dashboard
- `/admin/dashboard` — administrative overview
- `/admin/managers` — Manager applications/appointments
- `/admin/clubs` — Club administration
- `/admin/players` — Player Pool administration
- `/admin/contracts` — contract administration
- `/admin/transfers` — market administration
- `/admin/finance` — Treasury/Club financial administration
- `/admin/matches` — match administration and result conflicts
- `/admin/seasons` — season administration
- `/admin/tfc` — TFC administration
- `/admin/audit` — audit records
- `/admin/settings` — system settings that are legitimately administrative

## Route rules

- Public routes must not require authentication merely to read public information.
- Protected actions require backend authorization regardless of route visibility.
- Manager routes require an active Manager/Club relationship.
- TFC participation actions require Manager status.
- President/Admin routes require administrative authorization.
- Route structure must not be used as the only security boundary.
