# SECURITY.md

## Security objectives

TFA-OS will eventually hold authenticated accounts, administrative authority, player/club records, contracts, TCP accounting and official historical records. Security therefore protects both users and the integrity of TFA records.

## Authentication

Current backend foundation:

- Argon2 password hashing.
- JWT access-token authentication.
- Protected `/api/auth/me` endpoint.
- Password-reset tokens are stored as hashes, expire, and are marked used.
- Global request validation is enabled.

Required future controls:

- secure session/token storage strategy;
- refresh-token rotation/revocation if refresh sessions are implemented;
- email verification if required;
- rate limiting/brute-force protection;
- safe password policy and reset UX;
- consistent authentication error handling;
- production secret management.

## Authorization

The current database has `USER`, `MANAGER`, and `ADMIN` roles. This is a starting point, not a complete permission model.

Authorization must be enforced in backend services/controllers. UI visibility is not security.

Permissions must distinguish at minimum between public access, authenticated member access, Manager operations, and TFA administrative operations. Exact permissions for each action must be derived from approved TFA governance requirements.

## Validation

- Validate all external input.
- Reject unexpected fields where appropriate.
- Normalize identifiers such as email addresses consistently.
- Never trust client-provided balances, roles, statuses, official scores or permissions.
- Validate cross-entity invariants inside the backend/database transaction.

The current NestJS bootstrap already enables whitelist, forbid-non-whitelisted and transformation validation globally.

## TCP and financial security

TCP operations must be treated as financial-integrity operations even though TCP is an internal/imaginary currency.

- Never accept an authoritative balance from the client.
- Use atomic database transactions.
- Require authorization for administrative adjustments.
- Preserve transaction history.
- Use controlled reversals instead of silently editing historical ledger entries.
- Audit material economic actions.

## Official records

Matches, standings, contracts, transfers, TCP transactions, competition status and other official records must not be freely editable by arbitrary users. Corrections must be authorized and auditable.

## Audit

The existing `AuditLog` model provides a foundation. The final system should record actor, action, affected entity, timestamp and enough structured detail to reconstruct significant administrative changes without storing secrets.

## Secrets

Never commit `.env` files, passwords, JWT secrets, SMTP credentials, database credentials or tokens. `.env.example` may contain placeholders only.

The current Docker Compose file contains a development database password in configuration. It must not be reused as a production secret.

## CORS and transport

The current backend enables broad CORS (`origin: true`) for development. Production should restrict allowed origins and use HTTPS.

## Email/reset security

Password-reset responses should not reveal whether an account exists. Tokens must be random, hashed at rest, short-lived and single-use. Reset links must point to a trusted configured application URL.

## Database security

- Use least-privilege database credentials in production.
- Restrict database network exposure.
- Back up authoritative data.
- Test restoration.
- Avoid destructive resets.
- Apply migrations deliberately.

## Security review gates

Before production:

1. Complete authorization matrix.
2. Add rate limiting/abuse protection.
3. Review token/session lifecycle.
4. Restrict CORS and production transport.
5. Validate all financial/official-record operations transactionally.
6. Review audit coverage.
7. Review dependency vulnerabilities.
8. Establish backups and recovery testing.
9. Perform an end-to-end permission/security test.
