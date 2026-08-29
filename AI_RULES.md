# AI_RULES.md — TFA-OS AI Development Rules

## 1. Prime directive

**Do not invent TFA rules.** The TFA Constitution is authoritative. Software must implement approved TFA rules; AI agents must not casually change, simplify, reinterpret or replace them.

## 2. Before changing code

1. Inspect the relevant existing files.
2. Read the relevant section of the Constitution.
3. Read `PROJECT.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, `DATABASE.md`, `ROUTES.md`, `FEATURES.md`, and relevant domain docs.
4. Check whether the feature already exists partially.
5. Identify dependencies and callers before modifying shared code.
6. Check for contradictions. If a requirement is unclear or contradictory, stop and document the issue rather than guessing.

## 3. Preserve existing work

- Do not delete, overwrite, or replace existing files simply because another approach seems cleaner.
- Treat existing UI as potentially valuable product/design work even when it is currently mock data.
- Refactoring requires a stated reason and should be separated from feature implementation when practical.
- Preserve behaviour unless the approved requirement explicitly changes it.

## 4. Rules versus implementation

Never encode a rule only in the UI when the rule affects data integrity, permissions, money, contracts, competition eligibility, or official records. Such rules must be enforced by the backend/database as appropriate, with the frontend providing user feedback.

## 5. Data integrity

- Never trust client-supplied balances, roles, permissions, contract status, competition points, or other authoritative values.
- Use database transactions for multi-record operations that must be atomic.
- Keep an auditable record for material administrative/economic actions.
- Do not silently mutate historical official records.

## 6. Financial/TCP safety

TCP is an internal TFA accounting system. Money-like operations require server-side validation, atomic ledger operations, sufficient-balance checks where applicable, and an audit trail. Never allow the browser to directly choose an authoritative balance.

## 7. Authentication and authorization

Authentication proves identity; authorization determines what that identity may do. Do not rely on hidden UI controls as authorization. Every protected backend operation must enforce the appropriate permission.

## 8. API and frontend rules

- Keep API contracts explicit and typed.
- Do not leave production features permanently dependent on hardcoded mock arrays.
- Clearly label prototypes/mocks in documentation.
- Prefer reusable domain/API services over duplicated page-specific logic.

## 9. Database changes

- Document schema changes.
- Do not remove data-bearing fields without a migration strategy.
- Preserve historical records required by TFA.
- Add constraints/indexes when they represent real domain invariants.
- Never use destructive database operations against production without explicit authorization.

## 10. Testing and verification

Before declaring a feature complete, verify:

- normal success path;
- invalid input;
- unauthorized access;
- conflicting state;
- boundary cases defined by the Constitution;
- database integrity;
- audit/history effects;
- relevant frontend states.

## 11. Documentation discipline

When implementation changes the behaviour or architecture:

- update the relevant documentation;
- update `FEATURES.md` status;
- update `CHANGELOG.md` for significant changes;
- record unresolved questions rather than hiding them in code comments.

## 12. No speculative dependencies

Do not install a package merely because it might be useful. Prefer existing dependencies and platform capabilities. Every new dependency must have a concrete project need.

## 13. Git discipline

Use focused commits. Do not rewrite `main` history. For substantial work, use a feature branch and review the diff before merging.

## 14. Communication rule

When reporting work, distinguish clearly between:

- **implemented**;
- **partially implemented**;
- **prototype/mock**;
- **planned**;
- **unknown/pending decision**.

Never describe a placeholder as a working TFA feature.
