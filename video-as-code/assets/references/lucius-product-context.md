# Lucius Product Context

This document is the reusable product-context source for Lucius work in this repository.

It should be treated as a repo-level reference, not as a per-case frozen input snapshot.
Before a production pass starts, the relevant parts of this context should be copied into:

- `output/<case-slug>/00-input/product-context.md`

## Sources

- `C:\Users\ASUS\Downloads\Lucius Sales PPT.pdf`
- User-provided supplement in the Codex thread on 2026-04-04

## Use Policy

- Treat the positioning, capability, platform, and architecture sections below as the stable product context baseline.
- Treat package names, pricing, booking CTA copy, and sales-cycle claims as commercial material rather than timeless product facts.
- If a case needs offer-centric messaging, explicitly opt into the commercial notes instead of assuming they are always true.

## Canonical One-Liner

Lucius = full-channel AI support + knowledge engine + lead tracking + customer-success operations, designed to work like an AI teammate instead of a passive tool.

## Core Idea

Lucius is an AI-driven customer success and community operations platform.

Its governing idea is:

- make software work like a teammate, not just a tool

That means Lucius is not framed as a chatbot that only waits for prompts.
It is framed as an AI specialist that can independently operate inside user-facing channels, stay embedded in the team workflow, and take over repetitive but business-critical operating work.

## Product Positioning

Lucius should be described as:

- an AI teammate for community operations and customer success
- an always-on specialist embedded into the team's operating flow
- a cross-channel operator rather than a single-window bot
- a system that can answer, guide, identify intent, escalate, and learn

Lucius should not be reduced to:

- a generic chatbot
- an FAQ widget
- a simple autoresponder
- a "nice UI on top of an LLM"

## Problems Lucius Solves

Lucius is designed for teams that face one or more of the following conditions:

- they have an overseas product but no functioning community surface yet
- they already have a Discord or community channel, but no one maintains it well
- user questions arrive across multiple channels and human response coverage is inconsistent
- repetitive support work consumes the team without increasing leverage
- purchase or demo intent appears inside community conversations but gets missed
- the team lacks structured insight into user sentiment, churn risk, and recurring friction

## What Lucius Actually Does

### 1. User issue resolution

- responds to user questions across Discord, Telegram, Slack, Feishu, website widgets, and similar channels
- provides accurate, friendly answers based on product knowledge
- determines when an issue should be escalated to a human

### 2. Knowledge-base construction and maintenance

- ingests product docs, FAQs, PDFs, web content, event materials, and conversation history
- extracts reusable knowledge from those sources
- keeps the knowledge layer updated over time

### 3. Customer-success activation

- guides new users through key actions
- shares best practices
- identifies under-activated users and proactively helps them succeed

### 4. Lead and intent capture

- detects commercial signals such as pricing requests, demo interest, and partnership intent
- collects contact details when appropriate
- creates follow-up tasks and notifies the team so opportunities are not lost

### 5. Relationship intelligence

- remembers user preferences and historical context
- tracks satisfaction and sentiment change
- identifies churn risk and surfaces actionable business insight

### 6. Unified multi-platform operations

- supports multiple community and support surfaces as one operating layer
- lets the team manage channels consistently rather than treating each channel as a separate silo

## Supported Channel Context

The current context baseline includes:

- Discord
- Telegram
- Slack
- Feishu
- website widget

When writing scripts, storyboards, or product explanations, these channels should be framed as native operating surfaces rather than secondary integrations.

## Architecture Highlights

Lucius should be understood as a system with a knowledge and action pipeline, not only a reply model.

The current architecture highlights are:

- source parsing
- structured extraction
- 1536-dimensional embeddings
- deduplication and updates
- unified knowledge table
- hybrid retrieval with vector + keyword search
- reranking
- API delivery layer

Operational traits that matter to storytelling:

- multi-tenant isolation through `company_id`
- real-time learning from new conversations
- continuous improvement of the knowledge layer through actual use

## Ideal Customer Profile

The sales deck indicates that Lucius is especially relevant for teams with the following traits:

- outbound or global-facing products
- AI tools, hardware products, content platforms, and SaaS products
- small teams without a dedicated community operator
- products with fast user growth and limited support bandwidth
- teams with an existing Discord community that lacks high-quality maintenance

These should be treated as strong-fit signals, not as hard eligibility gates.

## Business Context Signals

The sales material repeatedly frames community as a retention and word-of-mouth engine.

For strategy and storytelling, these are the most reusable business-context signals:

- response speed influences retention
- community influences retention and brand word-of-mouth
- repetitive operations are a strong target for AI leverage
- competitive products are starting to use AI in community operations

These are valid strategic context anchors for storytelling.

## Current Product Status

User-provided current status for repository context:

- latest stated version: `Lucius 2.0`
- live customer examples:
  - `Dubbing AI` on Discord
  - `Jarsy` on Telegram and Discord
  - `Lovart` on Discord

These references can be used as proof-of-existence and deployment context.
Do not invent additional customer claims beyond provided material.

## Commercial Notes That Are Not Canonical Product Truth

The sales deck also contains offer-layer information that may change over time.

Do not treat the following as timeless product facts unless a specific campaign or case explicitly needs them:

- package names such as `Community Starter` and `Community Upgrade`
- pricing such as `$5,000` or `$3,000/month`
- activation or deployment promises such as `7 days` or `30 days`
- booking CTA copy, phone numbers, and outreach copy

These are useful for go-to-market context, but they should not silently leak into product-definition work.

## Translation Anchors For Layer 1

When the translation layer turns a case study into core meaning, it should preserve these anchors:

- Lucius is an AI teammate, not a decorative assistant
- Lucius works inside real operating channels, not in an abstract AI space
- Lucius should be associated with accurate help, continuous coverage, and operational follow-through
- Lucius is valuable because it reduces missed questions, missed leads, and missed insight
- Lucius is not only reactive support; it also drives user success and surfaces business intelligence

## Overclaim Guardrails

Do not claim the following unless the source material for a case explicitly supports them:

- exact response-time metrics
- exact resolution-rate metrics
- universal support for every platform
- autonomous action beyond the documented workflow
- specific revenue impact without proof
