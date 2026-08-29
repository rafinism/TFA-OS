# Security Requirements

## Authentication

- Passwords must be stored only as strong one-way hashes.
- Sessions/tokens must be protected against theft and replay.
- Password reset tokens must be short-lived, single-use, and stored safely.
- Email verification, where enabled, must use expiring single-use tokens.
- Secrets belong in environment configuration, never source control.

## Authorization

The backend is authoritative.

- Visitor: public read access only.
- Registered User: authenticated community actions and TCL participation.
- Manager: Club operations and TFC participation in addition to User capabilities.
- President/Admin: authorised administration subject to TFA rules.

Never trust a role supplied by the client. Verify identity and current authorization server-side for every protected operation.

## Club isolation

A Manager may operate only their currently assigned Club. A Manager must never be able to alter another Club's squad, contracts, TCP, transfers, or submissions by manipulating IDs in requests.

## Financial security

TCP operations must be validated server-side and executed transactionally. Prevent negative balances where prohibited. Do not expose an API that allows arbitrary balance replacement. Corrections must preserve the financial audit trail.

## Match security

Manager result submissions must be tied to the authenticated Manager's Club and the correct fixture. Conflicts must not become official automatically. President resolution must be authenticated and audited.

## Input and API security

Validate all external input. Use DTO/schema validation. Protect privileged endpoints. Avoid mass assignment. Return only data appropriate to the requesting role.

## Audit

Critical administrative and financial actions require durable audit records. Manual overrides must identify actor, action, affected entity, previous/new values where practical, timestamp, and reason.

## Public data

Public visibility is intentional for published TFA information. Public does not mean that private credentials, tokens, internal secrets, or sensitive personal data should be exposed.

## Production readiness

Development accounts/data must not be copied into production. Production secrets and database credentials must be independent from development. Before deployment, review authentication, authorization, database access, logging, error exposure, dependencies, and backup/recovery procedures.
