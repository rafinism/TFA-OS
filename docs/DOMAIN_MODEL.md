# TFA-OS Domain Model

## Purpose

This is a conceptual model of the TFA football ecosystem. It records domain boundaries visible from the current Constitution/project context and current database. It is not permission to invent missing fields or rules.

## Identity

`User` represents a software account. A user may have a `Manager` profile. Manager applications and Club-manager relationships are separate concepts so that application history and club history can be retained.

## Clubs

A `Club` is a persistent football entity. Its manager relationship has history through `ClubManager`. A Club can participate in Competitions, hold Player Contracts, play Matches and own a TCP Account.

## Players and Player Cards

The Constitution describes Player Cards as the objects used in squads and player-market operations. The current database has a basic `Player` record, but the full Player Card model is not yet implemented. The distinction between a real eFootball player identity and a TFA-managed Player Card must be resolved explicitly before final schema design.

## Squads

A Squad is a Club's registered collection of eligible Player Cards. Matchday selection is a related but distinct concept. The current database does not yet contain explicit Squad or MatchdaySquad models.

## Contracts and market

A Player Contract links a Player, Club and Season with dates, duration, fee and status. Transfers, renewals, releases, auction and waiver are higher-level business events that are not yet represented as complete workflows.

## Competitions

A Season contains Competitions. A Competition has participating Clubs and Matches. TCL and TFC are currently represented by a competition type enum. The full competition-stage model is not yet implemented.

## Matches

A Match belongs to a Competition and has home/away Clubs, schedule, optional scores and a verification timestamp. Submission, dispute, correction, result publication, standings and statistical consequences remain to be designed from authoritative rules.

## TCP

`TCPAccount` represents a Club or TFA Treasury account. `TCPTransaction` is the ledger entry between accounts. The database foundation is appropriate for ledger-based accounting, but the exact TFA economic workflows must be implemented from approved rules.

## Audit and notifications

Audit logs record an optional actor, action, entity and JSON details. Notifications belong to users and track read state. These are foundations for operational transparency but do not yet constitute complete workflows.

## Domain boundary principle

A page is not a domain. For example, a transfer action may involve player eligibility, contracts, Club state, TCP, audit and notifications. Such an operation should be implemented as one controlled backend use case rather than as independent browser mutations.
