# Changelog

All significant project changes should be recorded here. This file records project milestones, not every small code edit.

## Unreleased

- Established the TFA-OS project specification and source-of-truth hierarchy.
- Defined Visitor, Registered User, Manager, and President/Admin access model.
- Defined database-backed development/testing strategy with 17 test accounts and 12 test Clubs.
- Documented the requirement to eliminate hard-coded business mock data from normal application operation.
- Documented Player Rights separately from Players and Player Cards.
- Clarified that a Player Right Loan is a Club-to-Club temporary right arrangement, not a Treasury financing product.
- Documented current architecture, database direction, sitemap, feature inventory, roadmap, and security requirements.
- Added backend role metadata and hierarchical role authorization infrastructure.
- Updated JWT configuration to require `JWT_SECRET` through application configuration.
- Added a repeatable development seed workflow for 1 President, 16 Registered Users, 12 Managers, 12 Clubs, and Club TCP accounts.
- Added a local-only seed credential template and explicit Git ignore rule for the filled credential file.

## Existing baseline

The repository already contained a Next.js frontend, NestJS backend, Prisma/PostgreSQL foundation, an established Player Pool UI, and a Constitution presentation.
