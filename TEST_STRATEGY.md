# Test Strategy Notes

## Purpose

This portfolio uses a deliberately small job-search application so the testing choices are easy to review. My goal is to demonstrate how I break a feature into risks, choose the right test layer, and leave enough evidence to troubleshoot a failure.

## Risks covered

| Risk | Coverage |
| --- | --- |
| The service is unavailable | API health smoke test |
| Remote filtering includes an onsite position | API business-rule test and UI user-journey test |
| The API response changes unexpectedly | Response-contract assertions |
| An unsupported endpoint returns an unclear response | Structured 404 test |
| A user cannot search by a skill | UI keyword-filter test |
| A search with no matches leaves stale results | UI empty-state regression test |
| Behavior differs between major browser engines | Chromium, Firefox, and WebKit projects |

## Why I did not automate everything

A useful automation suite should provide confidence without becoming its own maintenance problem. I would not duplicate every API case through the UI. The API layer handles detailed filtering and contract coverage, while the browser layer checks the critical user-visible workflows.

I would still use exploratory testing before a release for usability, accessibility, unexpected input combinations, and behavior that is difficult to express as a stable automated assertion.

## Failure investigation approach

When a test fails, I first determine whether the failure is in the product, the test, the environment, or the test data. I use the assertion message, network behavior, screenshot, video, and Playwright trace to narrow that down before changing code. I do not want to hide a real defect by automatically rerunning everything until it turns green.

## What I would add for a production system

1. Authentication and authorization coverage using isolated test accounts.
2. Schema validation with a shared typed contract.
3. Test-data builders and cleanup hooks.
4. Accessibility checks for critical pages.
5. Performance thresholds for important API routes.
6. Risk-based tags for smoke, regression, and release-gate execution.
7. Flaky-test tracking with an owner and a time limit for remediation.

## A note about my experience

My strongest professional experience is in software test automation, requirements verification, defect analysis, CI/CD, and testing in secure environments. I am actively expanding my Playwright and TypeScript experience through work I can demonstrate and discuss. Everything in this repository is intended to be understandable, reproducible, and defensible in an interview.
