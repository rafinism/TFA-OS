# ROUTES.md

This document records the current website route structure found in the repository. A route existing in the tree does **not** mean its feature is fully implemented.

## Public routes

```text
/                         Home
/login                    Login
/dashboard                General authenticated dashboard shell
/announcements            Announcements
/seasons                  Seasons
/constitution             Constitution index
/constitution/article     Constitution article view
/constitution/[articleNumber] Article by article number
/constitution/document/[documentId] Constitution document view
```

## TCL routes

```text
/tcl                      TCL overview
/tcl/clubs                TCL clubs
/tcl/fixtures             TCL fixtures
/tcl/players              TCL players
/tcl/results              TCL results
/tcl/seasons              TCL seasons
/tcl/standings            TCL standings
/tcl/statistics           TCL statistics
```

## TFC routes

```text
/tfc                      TFC overview
/tfc/fixtures             TFC fixtures
/tfc/participants         TFC participants
/tfc/results              TFC results
```

## Manager routes

```text
/manager                  Manager landing
/manager/dashboard        Manager dashboard
/manager/club             Club management
/manager/squad            Squad management
/manager/contracts        Contracts
/manager/transfers        Transfers
/manager/finance          Finance/TCP
/manager/matches          Matches
```

## Admin routes

```text
/admin                    Admin landing
/admin/dashboard          Admin dashboard
/admin/clubs              Clubs
/admin/managers           Managers
/admin/players            Player pool
/admin/contracts          Contracts
/admin/transfers          Transfers
/admin/finance            Finance/TCP
/admin/matches            Matches
/admin/seasons            Seasons
/admin/tfc                TFC administration
/admin/audit              Audit
/admin/settings           Settings
```

## Route status notes

- `/login` currently renders only a minimal Login heading; no complete authentication UI is implemented.
- `/dashboard`, `/manager/*`, and many `/admin/*` pages are route/UI shells or placeholders.
- The admin Player Pool page is a substantial client-side prototype, but it is not yet connected to the backend.
- Public competition pages currently include hardcoded/mock data in at least the home/overview experience.
- The route tree does not itself establish the final sitemap. Any new route must be justified by the approved product/domain model.

## Intended navigation domains

The long-term navigation is organized into four experiences:

1. Public TFA information and football records.
2. Authenticated Manager operations.
3. TFA administrative operations.
4. Authentication/account flows.

Exact permissions and visibility for every route remain a security/requirements concern and must be defined before sensitive features are implemented.
