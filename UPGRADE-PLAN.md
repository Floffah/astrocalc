# Astrocalc API Upgrade Plan

Created: 2026-07-06

This plan records the dependency and `neverthrow` modernization investigation, plus the implementation notes as each phase lands.

## Original Baseline

The codebase passed the existing quality gates before upgrade work began:

```sh
bun run typecheck
bun test
bun run lint
```

Observed result:

- Typecheck passes.
- Lint passes.
- Test suite passes: 8 tests, 15 snapshots, 22 expectations.

Known workspace state before this plan was written:

- `bun.lock` already had local modifications.

## Dependency Snapshot

Package metadata checked on 2026-07-06.

| Package | Current | Latest / target | Notes |
|---|---:|---:|---|
| `neverthrow` | `8.2.0` | `8.2.0` | Already current. Syntax/style is the issue, not package age. |
| `hono` | `4.7.7` | `4.12.28` | Runtime framework bump. |
| `@hono/zod-validator` | `0.4.3` | `0.8.0` | Latest supports Zod 3 and Zod 4. |
| `hono-openapi` | `0.4.6` | `1.3.1` | Breaking: no `hono-openapi/zod` export in `1.x`. |
| `@scalar/hono-api-reference` | `0.8.2` | `0.11.8` | API docs UI bump. |
| `zod` | `3.24.2` | `4.4.3` | Major migration. |
| `zod-openapi` | `4.2.4` | `6.0.0` | Major migration; `6.x` expects Zod 4 and native `.meta()`. |
| `date-fns` | `4.1.0` | `4.4.0` | Likely low-risk. |
| `astronomia` | `4.1.1` | `4.2.0` | Verify calculation snapshots. |
| `sweph` | `2.10.3-4` | `2.10.3-7` | Native module; verify Docker/build path carefully. |
| `typescript` | `5.8.3` | `5.9.3` safe / `6.0.3` latest | `typescript-eslint@8.62.1` supports `<6.1.0`. |
| `eslint` | `9.24.0` | `10.6.0` | Tooling major. |
| `typescript-eslint` | `8.30.1` | `8.62.1` | Latest supports ESLint 10 and TS `<6.1.0`. |
| `prettier` | `3.5.3` | `3.9.4` | Tooling bump. |
| `@trivago/prettier-plugin-sort-imports` | `5.2.2` | `6.0.2` | Prettier 3-compatible. |

## Neverthrow Decision

`neverthrow` was already up to date, so the modernization question was whether the project still benefited from explicit `Result` values.

Observed usage was mostly synchronous early-return control flow:

- Route handlers call `.isErr()` and unwrap `.value` / `.error`.
- Calculation functions repeatedly do `if (x.isErr()) return x`.
- Several infallible helpers return `ok(...)`, which adds ceremony without meaningful failure information.
- There is no `ResultAsync` usage.

Decision:

- Remove `neverthrow` entirely.
- Return plain values from successful calculation paths.
- Throw standard errors for exceptional calculation failures.
- Format errors once at the Hono boundary.
- Return successful API payloads directly instead of wrapping them in `{ success, data }`.

## Upgrade Phases

### Phase 1: Low-Risk Runtime and Tooling Bumps

Goal: update packages that should not require architecture changes.

Status: completed 2026-07-06 for tooling and `date-fns`. The remaining astronomy/native packages are still intentionally separate because they affect calculation snapshots and native build behavior.

Candidates:

- `hono`
- `@scalar/hono-api-reference`
- `date-fns`
- `astronomia`
- `sweph`
- `typescript` to `5.9.3`
- `@types/bun`
- `openapi-types`
- `eslint`, `@eslint/js`
- `typescript-eslint`
- `prettier`
- `eslint-plugin-prettier`
- `eslint-config-prettier`
- `@trivago/prettier-plugin-sort-imports`

Validation after this phase:

```sh
bun install
bun run typecheck
bun run lint
bun test
bun run build
```

Additional checks:

- Confirm native `sweph` still builds locally.
- Confirm Docker build still copies the native `sweph/build` artifact as expected.
- Compare calculation snapshots for `astronomia` and `sweph` changes.

### Phase 2: OpenAPI and Zod Migration

Goal: update the OpenAPI stack intentionally, not as a blind dependency bump.

Status: started 2026-07-06. Chosen route is `@hono/zod-openapi` with `OpenAPIHono`, `createRoute`, and `app.doc31("/openapi.json", ...)`.

Current code depends on:

- `zod` v3
- `zod-openapi/extend`
- `.openapi(...)` schema annotations
- `hono-openapi/zod` imports

Breaking constraints:

- `hono-openapi@1.3.1` no longer exports `hono-openapi/zod`.
- `zod-openapi@6.0.0` expects Zod 4 and uses native `.meta(...)` instead of the old extension-based `.openapi(...)` style.

Possible routes:

1. Stay with `hono-openapi`, migrate to its `1.x` root exports and standard-schema style validator/resolver.
2. Switch to `@hono/zod-openapi`, using `OpenAPIHono`, `createRoute`, and `z` from `@hono/zod-openapi`.

Initial preference:

- Prefer `@hono/zod-openapi` if the project wants stronger route-level typing and a Hono-native OpenAPI style.
- Prefer `hono-openapi@1.x` if minimizing route structure changes matters more.

Implemented package direction:

- Added direct `@hono/zod-openapi`.
- Updated Hono and Scalar.
- Updated Zod to v4.
- Removed direct `hono-openapi`, `zod-openapi`, and `@hono/zod-validator`.

Validation after this phase:

```sh
bun run typecheck
bun run lint
bun test
bun run build
```

OpenAPI-specific checks:

- Fetch `/openapi.json` locally.
- Confirm all existing paths still exist:
  - `/healthz`
  - `/birth-chart`
  - `/daily-transits`
  - `/generic-chart`
  - `/openapi.json`
  - `/`
- Confirm response component refs are still generated.
- Confirm Scalar renders the API reference.
- Confirm validation errors still match the documented `errorResponse` shape or update tests/docs deliberately.

### Phase 3: Neverthrow Refactor

Goal: reduce error-handling ceremony after dependency churn has settled.

Status: completed 2026-07-06.

Migration notes:

- Removed `neverthrow` and deleted `src/types/neverthrow.ts`.
- Calculation helpers now return plain values and throw standard `Error` or `RangeError` instances for exceptional failures.
- Hono validation errors return `{ error: { issues } }`.
- Uncaught calculation errors are caught at the Hono boundary and returned as `{ error: string }`.
- Successful API responses now return their payload directly instead of `{ success, data }`.
- Error responses no longer include a `success` property.
- Route declarations now live inline with their `app.openapi(...)` registrations.
- Removed unnecessary response helpers such as `jsonContent`.

Validation after this phase:

```sh
bun run typecheck
bun run lint
bun test
bun run build
```

Behavior checks:

- Invalid input tests still fail predictably.
- Swiss Ephemeris calculation failures still surface as API errors.
- No route returns a raw thrown exception or inconsistent JSON shape.

### Phase 4: Optional TypeScript 6 / ESLint 10 Hardening

Goal: adopt latest major tooling once the runtime migration is stable.

Status: completed 2026-07-06.

Notes:

- `typescript-eslint@8.62.1` advertises support for TypeScript `<6.1.0`, so TypeScript `6.0.3` should be allowed by peer range.
- Treat this as a separate phase because compiler/linter output can change even when runtime behavior does not.

Migration notes:

- `typescript` moved to `devDependencies`.
- `tsconfig.json` now declares Bun runtime types explicitly with `"types": ["bun"]`.
- The path alias target changed from `src/*` to `./src/*` so TypeScript 6 can resolve it without deprecated `baseUrl`.
- ESLint 10 surfaced one redundant assignment in `calculateTransitsForDay`; the variable is now scoped directly where it is used.

Validation:

```sh
bun run typecheck
bun run lint
bun test
```

## Suggested Test Additions

Before or during the OpenAPI migration, add tests around surfaces most likely to regress:

- Snapshot `/openapi.json` or targeted pieces of it.
- Test invalid query validation responses for each route.
- Test Scalar docs route returns HTML.
- Test build output boots, at least with a smoke request to `/healthz`.
- Add calculation regression tests for representative dates/locations before updating `astronomia` and `sweph`.

## Completion Criteria

The upgrade should be considered complete when:

- All direct dependencies are intentionally pinned to current target versions.
- `bun install` produces a clean lockfile update.
- Typecheck, lint, tests, and build pass.
- Docker build succeeds.
- `/openapi.json` and Scalar docs work locally.
- Existing API response shapes are preserved or documented as intentional breaking changes.
- The `neverthrow` decision is implemented consistently across calculation code and route boundaries.
