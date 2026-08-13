# QA Automation Portfolio - Nicholas Baccus

I built this project to show how I approach software testing when the goal is dependable feedback, not simply a large test count. It is a small, deterministic Playwright and TypeScript project covering browser automation, REST API validation, regression testing, cross-browser execution, CI integration, and useful failure evidence.

My professional automation background includes Python, Katalon Studio, Eggplant, SQL, GitLab CI/CD, PowerShell, Bash, Java, and testing in secure government and defense environments. Playwright and TypeScript are newer additions to my toolkit, so this repository is intentionally honest: it demonstrates what I can build and explain today without claiming years of production Playwright experience.

## What this demonstrates

- UI smoke, search, filtering, and empty-state tests
- REST API health, filtering, schema, and error-contract tests
- Stable accessible locators and user-visible assertions
- Chromium, Firefox, and WebKit coverage
- Parallel execution, retries in CI, traces, screenshots, and retained failure video
- GitHub Actions quality gate and downloadable HTML report
- A deterministic local test application with no third-party test dependency

## Run locally

```bash
npm install
npx playwright install
npm test
```

Useful focused commands:

```bash
npm run test:smoke
npm run test:api
npm run test:ui
npm run report
```

## Test strategy

The suite follows a small test pyramid:

1. API tests validate service availability, business filters, response shape, and error behavior quickly.
2. UI tests cover critical user journeys and accessibility-oriented state changes.
3. Cross-browser projects identify compatibility issues without duplicating test logic.

The local demo application intentionally keeps its implementation small so reviewers can understand the product behavior, test design, and automation decisions in a few minutes.

## How I made the testing decisions

- I test the API contract directly because those checks are fast and make failures easier to isolate.
- I keep UI tests focused on behavior a user would notice instead of repeating every API assertion through a browser.
- I use accessible locators because they are generally more stable and encourage testable interfaces.
- I collect screenshots, video, and traces on failure so a failed CI run provides evidence instead of only a red status.
- I use a local deterministic application because a public third-party site could change and make the portfolio flaky for reasons unrelated to the test code.

See [TEST_STRATEGY.md](TEST_STRATEGY.md) for the risks, coverage boundaries, and next improvements I would make on a production system.

## Repository map

```text
src/server.js                 deterministic demo UI and REST API
tests/api/jobs-api.spec.ts    service and contract coverage
tests/ui/job-search.spec.ts   user-journey and regression coverage
playwright.config.ts          projects, artifacts, retries, and web server
.github/workflows/            CI quality gate
```

## Author

Nicholas E. Baccus - Software Test Automation Engineer

- Python, SQL, Katalon Studio, GitLab CI/CD, Java, Eggplant, PowerShell
- Automated testing, IV&V, requirements verification, defect analysis, and technical documentation
- Active U.S. Secret Security Clearance

I am currently pursuing fully remote software test automation and quality-engineering opportunities in the United States.
