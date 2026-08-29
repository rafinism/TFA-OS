# TFA-OS Documentation

This directory contains detailed domain and implementation documentation. Root-level documents define the project-wide baseline; domain documents provide deeper explanations without overriding the Constitution.

## Structure

- `DOMAIN_MODEL.md` — conceptual domain model and boundaries.
- `CONSTITUTION-INTEGRATION.md` — how constitutional rules map into software without changing their authority.
- `CURRENT-STATE.md` — repository inventory and implementation assessment at the documentation baseline.

## Documentation hierarchy

```text
TFA Constitution
      │ authoritative rules
      ▼
Root technical specification
      │ implementation requirements
      ▼
Domain documentation
      │ detailed design
      ▼
Source code
      │ implementation
      ▼
Database / runtime state
```

If documentation conflicts with the Constitution, the Constitution wins. If technical documentation conflicts with code, the discrepancy should be investigated and documented rather than silently ignored.
