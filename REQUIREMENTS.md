# Requirements

## 1. Access and identity

### R-1 Public access
Visitors can read published TFA information without an account.

### R-2 Registration
Anyone may create a Registered User account, subject to validation and security controls.

### R-3 Roles
The system supports Visitor, Registered User, Manager, and President/Admin access levels.

### R-4 Manager application
A Registered User can apply for Manager status. An application may also propose a new Club or request appointment to an available/inactive Club. President approval is required.

### R-5 One Club per Manager
A person cannot manage more than one Club.

### R-6 Historical manager record
When a Manager leaves, the user account remains as historical record while Manager/Club access ends.

## 2. Public information

Visitors and authenticated users can view published fixtures, official results, standings, Clubs, public squad information, public financial information, transfers/news, Constitution material, and published historical/audit information as permitted by TFA rules.

## 3. Community

Registered Users can comment/interact on supported posts and events. Visitors cannot comment.

## 4. TCL

Every Registered User can participate in TCL. TCL fixtures, standings, results, competition structure, eligibility, and rewards must be database-backed and rule-driven.

## 5. TFC

TFC participation requires Manager status. TFC must remain logically separate from TCL and enforce its own constitutional rules.

## 6. Clubs

Clubs are permanent historical entities. A Club cannot be casually deleted. A Club can become inactive and later receive a new approved Manager. Club identity changes must follow the Constitution.

## 7. Player system

The system manages the official Player Pool, Players, Player Cards/eligibility information, Player Rights, contracts, squad eligibility, and the Player Right market lifecycle.

## 8. Contracts and market

The system must support the constitutional contract lifecycle and, when activated, transfers, renewals, releases, waivers, auctions, free-agent signing, and Player Right loans. A Player Right loan is between Clubs; it is not a TFA/TCP financing product.

## 9. TCP

The system maintains Club and Treasury TCP through a transaction ledger. Balances are derived from authoritative ledger data. Transactions must be validated and auditable.

## 10. Matches

The system creates and manages fixtures, accepts the required Manager result submissions, automatically verifies matching submissions, holds conflicting submissions from public publication, notifies the President, and permits authorised administrative resolution/correction with audit history.

## 11. Administration

President/Admin can approve applications, administer official entities, resolve conflicts, perform authorised overrides, manage official records, and administer disciplinary/governance workflows subject to the Constitution.

## 12. Auditability

Critical actions must record actor, time, action, affected entity, relevant previous/new state, and reason where applicable. Official history must not be silently destroyed by corrections.

## 13. Development environment

The system must support a repeatable development database containing one President/Admin, sixteen Registered Users, twelve Managers, and twelve test Clubs. The development environment must be resettable and seedable.

## 14. Non-functional requirements

- Backend authorization must be authoritative.
- Financial operations must be transactional.
- Data integrity must be enforced at database/service boundaries.
- Public pages should remain usable without authentication.
- The application must be maintainable and documented.
- Production data must be isolated from development data.
- No unnecessary external dependency should be introduced.
- Important operations should have automated tests.
