# Current Repository State

## Baseline

Reviewed against the `main` codebase before documentation work. The clean TFA-OS repository contains the frontend, backend, configuration, official Constitution assets and initial project documentation/code foundation.

## Technology

Frontend: Next.js 16.3, React 19.2.8, TypeScript 5, Tailwind CSS 4, Lucide React, React Image Crop and country-flag-icons.

Backend: NestJS 11, Prisma 6.19, PostgreSQL, Passport/JWT, Argon2 and Nodemailer.

Infrastructure: PostgreSQL 17 Alpine in Docker Compose for local development.

## Implemented foundations

- Next.js App Router structure.
- Public, Manager and Admin route families.
- Reusable public/layout/admin UI components.
- Constitution web representation and official document assets.
- Substantial Player Pool UI prototype.
- NestJS bootstrap and global configuration.
- Prisma service/module.
- Authentication registration, login and profile endpoint.
- JWT guard/strategy.
- Password reset token generation/verification and email service foundation.
- Preliminary relational schema for users, managers, clubs, seasons, competitions, players, contracts, TCP, matches, audit and notifications.

## Prototype/partial areas

- Most public competition screens use local/mock data.
- Manager pages are mostly shells/placeholders.
- Many admin pages are shells/placeholders.
- Player Pool is rich in UI behaviour but stores state locally in the browser.
- Backend domain modules beyond authentication do not yet exist.
- TCP schema exists but business rules are not implemented.
- Match schema exists but match lifecycle/business logic is absent.

## Current technical gaps

- No complete frontend API client/service layer.
- No complete backend domain module structure beyond Auth/Prisma.
- No committed Prisma migration history.
- `.env.example` currently documents `DATABASE_URL` and `PORT`, while the authentication/email code also requires configuration such as JWT and SMTP values.
- Current CORS configuration is development-friendly but too broad for production.
- No complete permission matrix.
- No automated end-to-end football-domain workflow.

## Route/navigation observations

The repository has route families for public, manager, admin, TCL and TFC. Route existence must not be confused with implementation completeness. Any navigation mismatch should be treated as a defect when the route is intended to be operational.

## Documentation baseline rule

This file describes what was observed at the documentation baseline. It should be updated when the implementation changes materially.
