# Constitution Integration

## Authority

The TFA Constitution is the authoritative source of league/governance rules. TFA-OS implements those rules. This document explains the software relationship and must not be treated as a replacement for the Constitution.

## Rule hierarchy

1. Constitution
2. Valid supplementary/official TFA documents within delegated authority
3. Approved TFA administrative decisions
4. Technical implementation

## Implementation principle

A constitutional rule should be traceable from the relevant Article/Section to the software requirement and then to the implementing service/test where practical.

## Three distinct document types

### Constitution
Defines what TFA legally/rule-wise requires.

### Technical documentation
Defines how TFA-OS represents and enforces those requirements in software.

### AI/development instructions
Defines how coding agents modify the software safely.

## Known decision boundary

If the Constitution does not establish a required behavior, the implementation must not manufacture a constitutional rule. The unresolved item must be documented and decided by the appropriate TFA authority before it becomes permanent application behavior.

## Existing constitutional presentation

The repository contains an established Constitution presentation. It should remain a presentation layer over authoritative constitutional content, not become a second editable source of constitutional law.
