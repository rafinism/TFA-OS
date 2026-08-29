# Constitution and TFA-OS Integration

## 1. Authority boundary

The TFA Constitution is the supreme governing document of TFA. TFA-OS is an implementation of that governance, not a source of governance.

The current website includes a TypeScript representation of the Constitution and official PDF/DOCX assets. The Constitution's content must remain consistent across published representations.

## 2. Three layers

### Layer A — Constitution
Defines TFA rules, rights, obligations, powers, competitions, player/club systems, economic rules and governance.

### Layer B — Technical specification
Defines data models, APIs, validation, state transitions, permissions and implementation mechanisms used to enforce Layer A.

### Layer C — AI/development instructions
Defines how agents inspect, modify, test and document the software.

Layer C cannot override Layer B, and Layer B cannot override Layer A.

## 3. Rule implementation principle

For every authoritative rule that affects software behaviour, identify:

1. the constitutional source;
2. the software concept it affects;
3. the state/data required;
4. the validation/enforcement point;
5. the audit/history consequence;
6. the relevant user interface.

## 4. No silent interpretation

If a constitutional provision is ambiguous, incomplete, internally inconsistent or technically difficult to implement, do not silently invent a rule. Record the question and obtain an approved TFA interpretation or amendment where required.

## 5. Amendment safety

The Constitution controls its own amendment process. Software must not expose a generic "edit rule" operation that bypasses that process. Constitutional versioning/publication should be treated as an official-record workflow.

## 6. Recommended future machine-readable workflow

A future canonical content pipeline may be introduced so that the public Constitution, PDF/DOCX publication and website rendering derive from one controlled source. This is a future architecture decision, not an instruction to modify the current implementation immediately.
