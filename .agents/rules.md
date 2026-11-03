# CATENAR.AI — SUPREME SYSTEM DIRECTIVES, SKILL ARSENAL & OPERATING RULES

## 0. SUPREME PRIME DIRECTIVE: PAYPAL AI HACKATHON BENCHMARK & STRICT AUDIT GATE
> **HIGHEST PRIORITY (OVERRULING ALL ELSE):** More than anything, follow the official PayPal AI Hackathon (`https://paypalaihackathon.devpost.com/`) first. Deeply inspect, audit, and observe all rules, features, terms, micro-to-macro details, instructions, and official partner tools. Cross-verify strictly each time to catch anything missed or messed up (by either user or AI), and carefully verify and implement every requirement with zero compromises.

### 0.1 Continuous Deep Inspection, Audit & Observation
- **Inspect & Audit Devpost Continuously:** Deeply inspect, audit, and observe `https://paypalaihackathon.devpost.com/` for all rules, terms, features, instructions, FAQs, updates, and judging criteria.
- **Scrutinize Micro-to-Macro Details:**
  - **Micro details:** API request/response structures, `PayPal-Request-Id` SHA-256 idempotency headers, sandbox credentials, error handling/status codes, root open-source `LICENSE` file (MIT, visible in GitHub's top-right About section), submission metadata, and the strict `< 3-minute` (target `2:45`) video duration limit.
  - **Macro details:** Real-world problem solving, end-to-end agentic commerce flow, multi-agent escrow and reconciliation, ecosystem synergy, and autonomous execution.
- **Strict "Did We Miss or Mess Anything?" Verification Gate:**
  - Before, during, and after implementing any feature, code, or documentation, rigorously cross-verify: *Did I or the user miss anything? Did anything get messed up, skipped, or loosely assumed?*
  - Carefully verify, test, and implement each time. Never mark a task done without cross-checking against official hackathon instructions and running live terminal verification.

### 0.2 Official Partners & Sponsor Tools Ecosystem Alignment
Deeply inspect, follow instructions for, and integrate official hackathon partner tools to maximize technological depth, ecosystem completeness, and sponsor award eligibility ($36,500+ combined prize stack):
- **PayPal Developer Platform (`@paypal/agent-toolkit`):** Central core — Live Sandbox integration (`SANDBOX` mode), Orders API (`create_order`, `pay_order`, `get_order`), Invoicing API (`create_invoice`, `send_invoice`, `generate_invoice_qr_code`, `send_invoice_reminder`), Catalog API (`create_product`, `list_products`), Shipment Tracking (`create_shipment_tracking`, `get_shipment_tracking`), Refunds & Ledger (`create_refund`, `list_transactions`, `get_merchant_insights`), Webhooks, and Agentic commerce workflows.
- **AG Grid / AG Studio 3 (`ag-grid-react`):** Institutional financial ledgers, transactional grids, real-time calculation footers, and the custom **Friendly Nudge-Bot Scoreboard** widget (directly fulfilling AG Grid's official hackathon prompt).
- **Bryntum (`@bryntum/schedulerpro-react` / `@bryntum/gantt-react`):** High-performance timeline, Gantt, and milestone scheduler components with payment-reactive status (directly fulfilling Bryntum's official hackathon prompt: shifting dependent tasks `+48h` on late payments and unlocking in emerald `#10B981` when paid).
- **Channel3 (`PAYPAL-HACKATHON-2026`):** Live e-commerce/retail product data API (100M+ clean items) for dynamic Bill of Materials (BOM) ingestion and real-time price-drift guardrail verification.
- **APIMatic (`context-matic` MCP Plugin):** SDK generation, API documentation, and MCP context tools (`fetch_api`, `model_search`, `ask`) to guarantee hallucination-free PayPal request/response schemas, documented in `docs/APIMATIC_VALIDATION.md`.
- **Render (`render.yaml`):** Cloud deployment, full-stack web services, and durable **Render Workflows** background jobs for PayPal invoice/order state polling and webhook reconciliation.
- **Astropods, Kernel, Elastic, Postman & Zapier (Optional/Supporting Ecosystem):** Use Postman collections for API contract testing and reference supporting ecosystem patterns where applicable without bloating core runtime latency.

### 0.3 Submission & Judging Rubric Compliance
Every implementation and deliverable must strictly satisfy the 5 core judging criteria:
1. **Technological Implementation:** Flawless code quality, robust Clean Architecture, real non-trivial PayPal Sandbox integration (zero fake/mocked shortcuts when keys are present, paired with a resilient circuit-breaker snapshot fallback so live judge demos never crash).
2. **Design & UX:** Staff-level craftsmanship, locked `100vh` responsive cockpit layout, purposeful micro-interactions, zero UI or numeric jitter.
3. **Potential Impact:** High real-world business utility solving critical B2B agency/studio quoting, milestone escrow, friendly collection, and schedule-slip bottlenecks.
4. **Innovation & Idea:** Novel, deterministic synthesis of agentic AI financial guardrails with payment-reactive project timelines.
5. **Presentation & Deliverables:** Complete public GitHub repo with top-level MIT `LICENSE`, crystal-clear `README.md` with Sandbox test credentials, explicit "Built With" references, and an end-to-end working demo video under 3 minutes.

---

## 1. SUPERPOWERS EXECUTION ENGINE & CURATED SKILL ARSENAL

You must operate under the **`using-superpowers`** meta-protocol: always activate and apply the appropriate specialized skill from this arsenal **before** designing, coding, debugging, or verifying.

### 1.1 Mandatory 5-Phase Agentic Engineering Loop
1. **Phase 1 — Inception & Adversarial Stress-Testing (`brainstorming` + `grilling` + `context7-auto-research`):**
   - Pull live library docs via `context7-mcp` (React 19, Drizzle ORM, Hono/Express, AG Grid, Bryntum, Vercel AI SDK) and APIMatic `context-matic` MCP before writing code.
   - Use `grilling` to poke holes in state transitions, race conditions, and PayPal Sandbox edge cases before committing to implementation.
2. **Phase 2 — Isolation & Atomic Planning (`using-git-worktrees` + `writing-plans` + `loki-mode`):**
   - Draft atomic, file-by-file execution plans with explicit pass/fail verification criteria before touching production files.
3. **Phase 3 — Disciplined Implementation & Concurrency (`executing-plans` + `subagent-driven-development` + `dispatching-parallel-agents`):**
   - Delegate independent modules (e.g., Backend Drizzle Services vs. Frontend Cockpit Zones) to isolated subagents without shared-state collisions.
4. **Phase 4 — Test-Driven Integrity & Root-Cause Repair (`tdd` + `migrate-to-shoehorn` + `systematic-debugging` + `diagnosing-bugs`):**
   - Follow Red-Green-Refactor. Never use unsafe `as any` casts in tests (`migrate-to-shoehorn`).
   - If a bug occurs, use `systematic-debugging` (hypothesis -> minimal reproduction -> root-cause isolation). Never apply speculative "shotgun" fixes.
5. **Phase 5 — Evidence-Before-Assertion Gate (`verification-before-completion` + `verification` + `webapp-testing / playwright-skill` + `finishing-a-development-branch`):**
   - **IRON LAW:** Never claim a feature, API integration, or UI component is "complete" until terminal test runs, TypeScript compilation (`tsc --noEmit`), and Playwright browser checks prove it works end-to-end.

### 1.2 Active Domain Skills Mapped to Catenar.ai
- **AI & Agent Orchestration:** `build-agents`, `ai-sdk` (structured outputs & tool calling), `workflow` (durable Render Workflow retries), `is-agentic` (MCP & tool schema clarity).
- **Software Architecture & Code Craft:** `software-architecture`, `codebase-design` (deep modules, simple interfaces), `domain-modeling` (ubiquitous fintech language), `clean-code`, `clean-code-guard` (SOLID/DRY/KISS/YAGNI), `code-formatting-taste`, `strict-javascript-linter`.
- **UI/UX, Design System & Motion Craft:** `genjutsu` (anti-AI-slop bespoke interfaces), `frontend-design`, `polished-ui-design` (complete interaction state matrices), `taste-design`, `design-md`, `shadcn-ui`, `vanilla-css-mastery`, `react-vite-dashboard`, `gsap-react` (`useGSAP` with automatic cleanup), `gsap-timeline` ("The Causal Pulse" cross-panel sequence), `gsap-performance` (compositor-only 60fps/120fps animations).
- **Backend, Queues & Security:** `create-a-backend`, `queues` (webhook/polling backoff), `vulnerability-scanner` (OWASP 2025, secret protection, SQLi/SSRF prevention), `setup-pre-commit`, `git-guardrails-claude-code`, `deployments-cicd`, `bootstrap`.

### 1.3 Strictly Blacklisted / Out-of-Scope Skills (DO NOT USE IN THIS PROJECT)
- **NO Mobile-Only Native Frameworks:** Do not invoke `expo-router`, `expo-native-ui`, `expo-data-fetching`, `vercel-react-native-skills`, or `compose-preview`. Catenar.ai is a web-first `100vh` institutional desktop/web cockpit.
- **NO FPS-Killing Canvas/Shader Gimmicks in the Cockpit:** Do not invoke `webgl-fluid-shaders`, `canvas-particle-physics`, or `gsap-scrolltrigger` inside the workspace. The cockpit is a zero-scroll (`100vh`) financial instrument where 60fps/120fps responsiveness for Bryntum and AG Studio is paramount.

---

## 2. ARCHITECTURE, NEON + DRIZZLE ACID CONTRACT & DETERMINISTIC BACKEND LAWS

### 2.1 Neon Serverless PostgreSQL + Drizzle ORM (`server/src/db/`)
- **Zero-Friction Cloud Postgres:** Use `@neondatabase/serverless` with `drizzle-orm`, `drizzle-kit`, and `drizzle-zod` connected via `DATABASE_URL`.
- **Zero-Drift Integer-Cents Law:** Every monetary value in `projects`, `milestones`, and `bom_items` MUST be stored in integer cents (`amount_cents`, `quoted_unit_cents`, `live_verified_unit_cents`, `total_budget_cents`, `cleared_escrow_cents`, `refunded_cents`) alongside a `numeric(12, 2)` display column. Never perform floating-point arithmetic (`0.1 + 0.2`) on currency.
- **Atomic ACID Transactions:** Every state transition (`Scope -> Invoice`, `Late Slip -> Reschedule + Nudge`, `Payment Cleared -> Auto-Order Gear + Tracking`, `Partial Refund -> Reclaim Schedule`) MUST execute inside `await db.transaction(async (tx) => { ... })`.
- **Cryptographic Idempotency (`PayPal-Request-Id`):** Generate a deterministic SHA-256 `idempotencyKey` for every PayPal mutation, store it in a `UNIQUE` indexed column on `milestones`, and pass it in the `PayPal-Request-Id` header so retries or judge double-clicks never duplicate invoices or orders.
- **1-Click `<80ms` Judge Time-Machine Reset (`POST /api/scenarios/reset`):** Implement an atomic Neon transaction that resets active project/milestone states to the clean baseline in `<80ms` (bound to hotkey `[R]`) so multiple judges testing the live Render URL consecutively always experience a clean run.

### 2.2 Autonomous Spend Guardrail Policy Engine (`SpendGuardrailEngine.ts`)
Before `ProcurementDispatcher.ts` automatically executes `create_order` and `pay_order` for Channel3 BOM items, it must deterministically verify three hard invariants:
1. `milestone.paymentStatus === 'PAID'` (verified via PayPal Sandbox capture/invoice status).
2. `sum(bomItems.liveVerifiedUnitCents * quantity) <= milestone.amountCents` (total procurement cost fits inside cleared milestone escrow).
3. `(liveVerifiedUnitCents - quotedUnitCents) / quotedUnitCents <= 0.05` (live Channel3 price drift does not exceed `5%`).

### 2.3 Real-Time Server-Sent Events (SSE) Wire Telemetry (`GET /api/telemetry/stream`)
Every external call to `@paypal/agent-toolkit`, Channel3 REST API, Bryntum Schedule Reconciler, AG Studio Nudge Engine, and Neon Postgres must emit a structured telemetry event persisted to `telemetry_logs` and streamed via SSE to the Left Rail **Stripe-Style Wire Inspector**:
`{ id, source, operation, httpStatus, latencyMs, requestPayload, responsePayload, createdAt }`.

### 2.4 Clean Code, File Topography & Static Analysis Laws (`clean-code-guard` + `code-formatting-taste`)
- **Early Return Pattern:** Flatten nested conditions using guard clauses at the top of functions. Maximum `if` nesting depth is `2`.
- **Strict Size Limits:** No file may exceed `200 lines` of code; no function may exceed `50 lines` of code. Decompose large components into focused sub-modules.
- **Domain-Specific Naming (Zero `utils.ts`):** Never create `utils.ts`, `helpers.ts`, or `common.ts`. Name every module after its exact domain role: `PayPalToolkitGateway.ts`, `Channel3CatalogClient.ts`, `ScheduleReconciler.ts`, `FriendlyNudgeComposer.ts`, `SpendGuardrailEngine.ts`, `ProcurementDispatcher.ts`, `RefundReclaimer.ts`.
- **Strict TypeScript (`strict-javascript-linter`):** Enable `strict: true`, `noUncheckedIndexedAccess: true`, and zero unhandled floating promises. Validate all external API inputs and `.env` variables at startup with `zod`.

---

## 3. AUTONOMOUS STAFF UI/UX & COMPONENT INTEGRATION PROTOCOL — CATENAR.AI

Before generating or styling any frontend component in `/client`, you must operate as a Staff Design Engineer from Linear, Stripe, and Ramp. Follow this strict visual research and component integration workflow:

### 3.1 Mandatory Visual Benchmarking (Inspect via Browser / Fetch Tools)
Carefully inspect and internalize the layout density, `1px` hairline architecture, and micro-interaction timing from each of these reference platforms:
- **Real Shipped Product Flows & Mobile/Web Ergonomics:** `https://mobbin.com/`, `https://appllama.io/`, `https://60fps.design/`, `https://lookup.design/`
- **High-Craft Web Showcases:** `https://godly.website/`, `https://www.siteinspire.com/`, `https://www.awwwards.com/`, `https://land-book.com/`, `https://www.lapa.ninja/`, `https://uimovement.com/`, `https://collectui.com/`
- **Production Component & Kinetic Libraries:** `https://ui.shadcn.com/`, `https://www.radix-ui.com/`, `https://www.untitledui.com/`, `https://reactbits.dev/`, `https://animata.design/`, `https://ui.aceternity.com/`, `https://uiverse.io/`, `https://gsap.com/`
- **Atmospheric Grain, Typography & SVGs:** `https://grainient.supply/`, `https://fontjoy.com/`, `https://fonts.google.com/`, `https://heroicons.com/`, `https://www.svgrepo.com/`

### 3.2 Exact Component Mapping by Cockpit Zone (`100vh x 100vw` Zero-Scroll Split Cockpit)
1. **Zone 1 — Top Judge Command Bar (`48px` fixed height):**
   - Use **Radix UI / shadcn/ui** `Popover` for the 1-Click PayPal Sandbox Credentials drawer (with instant copy buttons for Buyer & Merchant test accounts) and `Tooltip` for keyboard shortcut hints.
   - Style the 5 hardware hotkey triggers (`[1] Scope & QR Invoice`, `[2] Late Slip + Friendly Nudge`, `[3] Settle Escrow + Order Gear`, `[4] Partial Refund Reclaim`, `[R] <80ms Neon Reset`) using tactile dark industrial keycap CSS inspired by **Uiverse.io** and **Raycast** (`#171B24` fill, `1px solid #2A3140`, `0 1px 0 #0A0C10` inset shadow, `80ms` active press).
2. **Zone 2 — Left Autonomous Copilot & Stripe-Style Wire Inspector (`360px` fixed width):**
   - Use **Animata (`animata.design`)** causal step indicators to show the 4-stage pipeline (`Channel3 BOM` -> `PayPal Product/Invoice` -> `Spend Guardrail` -> `Bryntum Lock`).
   - Use **shadcn/ui** `Tabs` + `ScrollArea` for the live SSE Wire Inspector (`Request JSON`, `Response JSON`, `APIMatic Schema Match`), paired with a **React Bits (`reactbits.dev`)** subtle `DecryptedText` effect (`160ms` max) when a new `PayPal-Request-Id` SHA-256 hash or `INV2-XXXX` ID arrives.
3. **Zone 3 — Upper-Right Bryntum Payment-Reactive Timeline (`46%` remaining height):**
   - Override default Bryntum CSS variables to match `#0A0C10` (canvas) and `#11141B` (row surface) with `1px solid #1F242D` grid lines.
   - Render custom milestone task pills styled after **Untitled UI** status badges (`4px` radius, tabular monospace amount, emerald `#10B981` when `PAID`, amber `#F59E0B` when `PENDING`, orange `#F97316` with `+48h SLIP` badge when overdue, crimson `#EF4444` when `REFUNDED`).
   - Animate task rescheduling ("The Causal Slide") using `320ms cubic-bezier(0.22, 1, 0.36, 1)` (inspired by `60fps.design`) and orchestrate the 3-zone cross-panel highlight ("The Causal Pulse") using **GSAP (`useGSAP`)**.
4. **Zone 4 — Lower-Right AG Studio 3 Ledger & Friendly Nudge-Bot Scoreboard (`54%` remaining height):**
   - Build the 4-cell Top Scoreboard Ribbon (`Total Escrowed`, `Cleared & Dispatched`, `At-Risk Slip Exposure`, `Friendly Nudges Sent`) using **React Bits** `SpotlightCard` (subtle `rgba(0, 112, 186, 0.06)` hover illumination) and `CountUp` with mandatory `font-variant-numeric: tabular-nums`.
   - Include an inline **Friendly Nudge Preview Drawer** (inspired by Ramp) showing the AI-drafted polite reminder referencing the exact downstream Bryntum task at risk, wired to `send_invoice_reminder`.
   - Build the **PayPal QR Checkout Modal** using **Radix `Dialog`** with a subtle `3%` film-grain noise / radial navy header texture inspired by **Grainient (`grainient.supply`)**, displaying the live Base64 QR code from `generate_invoice_qr_code` and a 1-click `[Simulate Buyer Sandbox Scan]` button.

### 3.3 Hard Visual QA Gate & Anti-AI-Slop Kill-List (Reject Immediately If Violated)
- **NO Marketing Landing Page:** Root `/` boots directly into the live `100vh` Catenar.ai Cockpit.
- **NO Full-Screen WebGL/Particle Slop:** Never use full-screen WebGL/canvas backgrounds (`Hyperspeed`, `LiquidChrome`, `Ballpit`, `WavyBackground`, `SparklesCore`) from React Bits or Aceternity UI inside the workspace.
- **NO Card-in-Card Bloat:** Never use `16px+` rounded cards inside cards; use `0px` panel radius separated by `1px solid #1F242D` structural hairlines, `6px` control radius, and `4px` badge radius.
- **NO Cartoon Illustrations or Emoji Chrome:** Never use cartoon flat-art (`Undraw`, `Humaans`) or emoji icons (`🚀`, `✨`, `💰`) in the UI; use only `1px` geometric wireframe diagrams, clean brand SVGs from `svgrepo.com`, and `lucide-react` / `heroicons` (`16px`, `1.75px` stroke).
- **NO Numeric Jitter:** Enforce `'JetBrains Mono'` + `font-variant-numeric: tabular-nums` on every dollar figure, invoice ID, countdown, slip delta (`+48h`), and latency badge (`142ms`).
- **Complete State Matrix (`polished-ui-design`):** Every interactive control must implement explicit `idle`, `hover`, `active/pressed (80ms)`, `focus-visible (1px #0070BA ring)`, `loading (tactile spinner + disabled duplicate click)`, `empty`, `error (with 1-click retry)`, and `prefers-reduced-motion` states.

---

## 4. PRE-SUBMISSION DEFINITION OF DONE (DOD) CHECKLIST

No sprint or release is complete until all 8 gates pass with terminal/browser evidence:
1. [ ] Top-level `LICENSE` (MIT) file exists and displays in GitHub's "About" section.
2. [ ] `npx tsc --noEmit` and all unit/integration tests pass with zero errors.
3. [ ] All 9 `@paypal/agent-toolkit` tools and Channel3 API calls execute against Sandbox and log to Neon Postgres (`telemetry_logs`).
4. [ ] Pressing keys `1`, `2`, `3`, `4`, and `R` triggers all 4 deterministic scenarios and the `<80ms` Neon DB reset cleanly in a real Playwright browser check.
5. [ ] `docs/APIMATIC_VALIDATION.md` documents the exact `context-matic` MCP queries used to validate PayPal schemas.
6. [ ] `render.yaml` deploys both the web service and Render Workflow worker cleanly.
7. [ ] Zero console errors, zero horizontal/vertical page overflow on `100vh`, and `tabular-nums` verified across all numeric nodes.
8. [ ] `README.md` includes the architecture diagram, 1-click Sandbox Buyer/Merchant test credentials, and explicit mapping to all main and sponsor prize tracks.