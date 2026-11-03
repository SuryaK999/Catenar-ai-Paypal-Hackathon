# CATENAR // AI
### Autonomous Payment-Reactive Operations Infrastructure
**Official Entry for PayPal AI Hackathon 2026**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Monorepo](https://img.shields.io/badge/monorepo-catenar--ai-emerald)](package.json)
[![PayPal](https://img.shields.io/badge/PayPal-Agent%20Toolkit%20Sandbox-0070BA)](https://developer.paypal.com/)
[![Neon](https://img.shields.io/badge/Neon-Serverless%20PostgreSQL-00E599)](https://neon.tech/)
[![Render](https://img.shields.io/badge/Render-catenar--web%20%26%20worker-46E3B7)](https://render.com/)

---

## 1. Executive Summary

**Catenar.ai** is an autonomous payment-reactive operations cockpit engineered for high-stakes creative production studios, hardware engineering labs, and enterprise systems integrators.

Traditional agency operations suffer from a fatal disconnect between finance and execution: quotes drift against live market supply chains, invoices sit in overdue limbo, and delivery milestones slip silently without automated schedule or procurement adjustments.

Catenar.ai bridges this divide by binding the **PayPal Developer Platform (`@paypal/agent-toolkit`)**, **Neon Serverless PostgreSQL (Drizzle ORM)**, **Bryntum Timeline & Scheduling Engine**, **AG Studio Financial Grids**, and **Channel3 Live Product Catalog (100M+ Items)** into an autonomous, event-driven settlement loop.

```
+-----------------------------------------------------------------------------------+
|                                  CATENAR.AI                                       |
|               Autonomous Payment-Reactive Operations Infrastructure               |
+-----------------------------------------------------------------------------------+
                                          |
                +-------------------------+-------------------------+
                |                                                   |
      [Autonomous Scoper]                                 [Autonomous Billing]
   Channel3 Catalog Ingestion                         PayPal Invoicing & Orders
   100M+ Items Live Verified                          Idempotent SHA-256 Hashes
                |                                                   |
                +-------------------------+-------------------------+
                                          |
                        [Spend Guardrail Policy Engine]
                          1. Milestone Status == PAID
                          2. Live BOM Sum <= Escrow
                          3. Market Price Drift <= 5%
                                          |
                +-------------------------+-------------------------+
                |                                                   |
    [Payment-Reactive Timeline]                           [AG Studio Scoreboard]
     Bryntum Gantt / Schedule Pro                         Milestone Escrow Ledger
     Payment-Driven +48h Shifts                           AI Friendly Nudge-Bot
                |                                                   |
                +-------------------------+-------------------------+
                                          |
                              [Neon Serverless DB]
                            ACID Integer-Cents Ledger
                            SSE Real-Time Wire Stream
```

---

## 2. Core Capabilities & Architectural Pillars

### A. Autonomous Payment-Reactive Scheduling
Milestones on the critical path react directly to PayPal transaction states. When an escrow payment falls overdue, downstream milestones automatically shift `+48h` ("The Causal Slide"), preventing unfunded resource commitments. When payment is verified via PayPal Sandbox, tasks instantly unlock in emerald (`#10B981`).

### B. Autonomous Spend Guardrail Policy Engine (`SpendGuardrailEngine.ts`)
Before procurement orders and gear dispatches are cleared, Catenar.ai deterministically verifies three invariants:
1. `milestone.paymentStatus === 'PAID'` (verified via PayPal Sandbox invoice/order status).
2. `sum(bomItems.liveVerifiedUnitCents * quantity) <= milestone.amountCents` (procurement fits within cleared escrow).
3. `(liveVerifiedUnitCents - quotedUnitCents) / quotedUnitCents <= 0.05` (market drift <= 5%).

### C. Live PayPal Developer Sandbox Integration
- **Orders API:** `create_order`, `pay_order`, `get_order`
- **Invoicing API:** `create_invoice`, `send_invoice`, `generate_invoice_qr_code`, `send_invoice_reminder`
- **Catalog API:** `create_product`, `list_products`
- **Shipment Tracking API:** `create_shipment_tracking`, `get_shipment_tracking`
- **Disputes & Ledger API:** `create_refund`, `list_transactions`
- **Cryptographic Idempotency:** Deterministic SHA-256 `PayPal-Request-Id` headers prevent duplicate charges.

### D. Friendly Nudge-Bot Engine (`FriendlyNudgeComposer.ts`)
When critical paths slip, Catenar.ai synthesizes context-aware polite reminders linking the exact downstream production delay to the pending invoice:
```
Automated via Catenar.ai Autonomous Critical Path & Billing Engine
```

---

## 3. Monorepo Structure

```
catenar-ai/
├── client/                     # @catenar/client (React 19 + Vite + Tailwind)
│   ├── src/
│   │   ├── components/         # Zone 1-4 Cockpit Panels
│   │   │   ├── JudgeCommandBar.tsx       # Zone 1 Top Industrial Bar (CATENAR // AI)
│   │   │   ├── WireInspectorPanel.tsx    # Zone 2 Left Rail Catenar Telemetry Stream
│   │   │   ├── TimelinePlaceholderPanel.tsx # Zone 3 Bryntum Payment-Reactive Gantt
│   │   │   ├── ScoreboardPlaceholderPanel.tsx # Zone 4 AG Studio Ledger & Nudge-Bot
│   │   │   ├── SandboxCredentialsModal.tsx  # 1-Click Judge Credentials Drawer
│   │   │   └── PayPalQrModal.tsx         # Catenar.ai Settlement QR Modal
│   │   └── App.tsx             # 100vh Institutional Cockpit Root
├── server/                     # @catenar/server (Express + Drizzle + Neon)
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.ts       # Drizzle Neon PostgreSQL Schema (Integer Cents)
│   │   │   └── connection.ts   # Neon Connection Pooler
│   │   ├── engines/            # SpendGuardrailEngine.ts
│   │   ├── integrations/
│   │   │   ├── paypal/         # PayPalToolkitGateway & Idempotency Key Gen
│   │   │   └── channel3/       # Channel3CatalogClient (100M+ Products)
│   │   ├── routes/             # Scenarios & SSE Telemetry Stream
│   │   └── services/           # JudgeResetService & TelemetryBroadcaster
├── docs/
│   └── APIMATIC_VALIDATION.md  # APIMatic MCP Schema Certification
├── render.yaml                 # catenar-web & catenar-workflow-worker
└── package.json                # Root Workspace Manifest (catenar-ai)
```

---

## 4. Quickstart & Local Execution

### Prerequisites
- Node.js `>= 20.0.0`
- npm `>= 10.0.0`

### Installation & Build
```bash
git clone https://github.com/catenar-ai/catenar-ai.git
cd catenar-ai
npm install
npm run build
```

### Environment Configuration
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### Launch Development Cockpit
```bash
# Concurrently boots backend (port 4000) and frontend (port 5173)
npm run dev
```

### Run Sandbox Telemetry Verification
```bash
npm run verify:sandbox
```

---

## 5. Judge Testing Guide & Hotkey Scenarios

Judges can execute the full end-to-end autonomous flow using tactical keyboard hotkeys:

| Key | Trigger | Operational Effect |
|:---:|:---|:---|
| `[1]` | **Scope & QR Invoice** | Queries Channel3 for BOM gear, creates PayPal Product, issues PayPal Sandbox Invoice & generates dynamic Base64 QR code. |
| `[2]` | **Late Slip + Friendly Nudge** | Simulates overdue milestone: shifts downstream Bryntum timeline `+48h` and dispatches AI friendly nudge email with signature. |
| `[3]` | **Settle Escrow + Order Gear** | Captures payment in PayPal Sandbox, passes 3-point Spend Guardrail invariants, and auto-dispatches carrier shipment tracking. |
| `[4]` | **Partial Refund Reclaim** | Executes partial refund via PayPal Disputes/Refund API, reclaiming unused budget and compressing critical path hours. |
| `[R]` | **<80ms Neon Reset** | Atomically resets Neon DB tables to the baseline state in `<80ms` for seamless repeat evaluation. |

### Sandbox Test Credentials
- **Merchant Facilitator:** `merchant-facilitator@catenar.ai`
- **Buyer Client:** `buyer-client@catenar.ai`
- **Sandbox Password:** `Catenar2026!Sandbox`
- **Environment:** `SANDBOX`

---

## 6. Official Hackathon Partner Alignments

- **PayPal Developer Platform (`@paypal/agent-toolkit`):** Live Sandbox orders, invoices, QR checkout, and dispute management with cryptographic idempotency.
- **AG Studio / AG Grid:** Real-time financial ledger tables and Friendly Nudge-Bot scoreboard.
- **Bryntum:** High-performance timeline and schedule reconciler with `+48h` causal slide.
- **Channel3:** Live e-commerce product catalog integration for BOM quoting and verification.
- **APIMatic:** MCP schema validation and SDK verification (`docs/APIMATIC_VALIDATION.md`).
- **Render:** Monorepo deployment with `catenar-web` and `catenar-workflow-worker`.
- **Neon:** Serverless PostgreSQL with zero-drift integer-cents ACID transactions.

---

## 7. License

MIT License — Copyright (c) 2026 Catenar.ai Contributors (PayPal AI Hackathon 2026).
