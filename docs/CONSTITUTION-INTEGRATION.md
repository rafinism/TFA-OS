# Constitution and TFA-OS Integration

## 1. Authority boundary

The TFA Constitution is the supreme governing document of TFA. TFA-OS is an implementation of that governance, not a source of governance.

The Constitution establishes TFA as an independent football governing authority with autonomous authority over football-related governance, competitions, clubs, players, player-market systems, finance, discipline and administration. It also requires preservation of official records and continuity of the Association.

The current repository contains both a TypeScript representation of the Constitution and official PDF/DOCX assets. These are representations of the same authoritative constitutional document; technical documentation must never be treated as a replacement for the Constitution.

## 2. Three layers

### Layer A — Constitution
Defines TFA rules, rights, obligations, powers, competitions, player/club systems, economic rules and governance.

### Layer B — Technical specification
Defines data models, APIs, validation, state transitions, permissions, audit mechanisms and implementation details used to enforce Layer A.

### Layer C — AI/development instructions
Defines how agents inspect, modify, test and document the software.

Layer C cannot override Layer B, and Layer B cannot override Layer A.

## 3. Confirmed implementation consequences

The Constitution and established TFA project decisions require the software to preserve several important distinctions:

- A registered User and a Manager are different states/roles.
- Manager approval is a President-controlled administrative action.
- A new-manager application can include creation of a new Club, while an inactive existing Club can instead receive an application from a new Manager.
- Clubs are permanent historical entities; a Manager leaving does not delete the Club.
- An inactive Club retains its identity, history and TCP. Its player contracts end according to the applicable rules and its players return to the Free Agent Pool; a successor Manager takes over that same Club and its retained TCP and rebuilds the Squad.
- Official Match results can be automatically verified when the two participating Managers submit the same result.
- Conflicting Manager submissions require administrative intervention rather than automatic publicisation.
- Once an official result exists, modification is President/Admin-controlled and auditable.
- Deterministic calculations should be automated, while the President/Admin retains controlled override capability where permitted.

These implementation consequences do not create rules independently of the Constitution; they record the approved TFA operating decisions that the software must respect.

## 4. Rule implementation principle

For every authoritative rule that affects software behaviour, identify:

1. the constitutional source or approved TFA decision;
2. the software concept it affects;
3. the state/data required;
4. the validation/enforcement point;
5. the audit/history consequence;
6. the relevant user interface.

## 5. No silent interpretation

If a constitutional provision is ambiguous, incomplete, internally inconsistent or technically difficult to implement, do not silently invent a rule. Record the question and obtain an approved TFA interpretation or amendment where required.

A technical implementation may choose a mechanism, but it must not use a technical mechanism to change the substantive TFA rule.

## 6. Amendment safety

The Constitution controls its own amendment process. Software must not expose a generic "edit rule" operation that bypasses that process. Constitutional versioning/publication should be treated as an official-record workflow.

A constitutional amendment should be represented as a new approved constitutional state/version according to the constitutional amendment process, rather than silently overwriting the historical record.

## 7. Audit and administrative override

Where the President/Admin corrects an automatically generated or previously official value, TFA-OS should preserve the original event/state and record the administrative intervention, affected entity, resulting value and clarification/reason. The implementation must not make administrative correction equivalent to deleting history.

This is particularly important for TCP accounting, official match results, contracts, transfers and other material TFA records.

## 8. Recommended future machine-readable workflow

A future canonical content pipeline may be introduced so that the public Constitution, PDF/DOCX publication and website rendering derive from one controlled source. This is a future architecture decision, not an instruction to modify the current implementation immediately.
