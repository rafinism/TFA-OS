# AI Development Rules

## 1. Authority

The TFA Constitution is authoritative for TFA rules. Do not invent, reinterpret, weaken, or silently change a constitutional rule. Supplementary official documents may be used only within the authority given to them. Technical documentation explains implementation and does not override TFA law.

## 2. Before coding

- Inspect the existing repository and relevant files first.
- Read the applicable project documentation.
- Preserve existing working systems unless a change is explicitly required.
- Identify whether a requirement is constitutional, an approved TFA decision, technical, or unresolved.
- Do not ask the user to re-specify information already documented.

## 3. No speculative requirements

If a behavior is not established, do not invent it simply to complete a UI or schema. Mark it as unresolved and ask for a decision when implementation depends on it.

## 4. No unnecessary rewrites

Do not delete, overwrite, refactor, replace, or redesign existing code merely because another approach seems cleaner. Make the smallest safe change that satisfies the approved requirement.

## 5. Database-first business logic

Business data must come from the database/API. Do not create hard-coded Clubs, users, balances, contracts, fixtures, transfers, results, or other business records in frontend code as fake production data. Development seed data is allowed only as controlled database data.

## 6. Authorization

Never rely on hidden UI controls as security. Every protected operation must be authorized on the backend. Visitor, Registered User, Manager, and President/Admin permissions must be enforced independently of frontend presentation.

## 7. Financial integrity

TCP changes must be represented by the official ledger and validated transactionally. Never directly mutate a displayed balance as a substitute for a ledger transaction. Corrections should use the documented reversal/adjustment mechanism rather than erasing history.

## 8. Official records

Official results, transactions, transfers, contracts, disciplinary decisions, and other regulated records must be auditable. Administrative corrections must preserve relevant history.

## 9. Automation

Automate deterministic rules. Preserve a President/Admin override for authorised exceptions and corrections. Every manual override must record who acted, what changed, when, and why.

## 10. Competition separation

Do not mix TCL and TFC rules. TCL allows Registered Users to participate; TFC participation requires Manager status. Competition-specific rules belong to their respective domain services.

## 11. Player terminology

Do not confuse a Player, a Player Card, and a Player Right. A Player Right is the Club-held TFA concept. A Player Right Loan is a temporary transfer of that right between Clubs, not a Treasury loan.

## 12. Testing

Test complete workflows using real database entities and the controlled development population. Prefer integration and end-to-end tests for financial, authorization, competition, and record-critical operations.

## 13. Change discipline

Before a significant implementation change, state the affected requirement and expected behavior. After the change, verify related routes, APIs, database constraints, and authorization. Update documentation when the technical design changes.

## 14. Never hide uncertainty

If the Constitution, requirements, current code, or database model contradict one another, stop at the decision boundary and report the contradiction. Do not silently choose a rule.
