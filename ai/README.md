
# AI-Assisted QA Strategy

## 1. Overview

AI is used as an assistant in the QA automation lifecycle to improve productivity, test coverage, locator analysis, and debugging.

AI-generated suggestions are reviewed and validated by a human QA engineer before being added to the automation framework.

No AI-generated code is executed or merged automatically.

## 2. AI Capabilities

### Capability 1: Test Case Generation

Input:
- User stories
- Acceptance criteria
- Business requirements

AI assistance:
- Generate positive test scenarios.
- Identify negative and boundary scenarios.
- Suggest missing test coverage.
- Convert requirements into structured test cases.

Example prompt:

"Generate positive, negative, and boundary test scenarios for patient registration. Include preconditions, test steps, and expected results."

Human review:
- Validate scenarios against actual requirements.
- Remove duplicate test cases.
- Confirm expected business behavior.

### Capability 2: Locator Recommendations

Input:
- HTML DOM snippets
- Element attributes
- Playwright locator failures

AI assistance:
- Suggest role-based locators.
- Recommend accessible names and labels.
- Identify unstable CSS selectors.
- Suggest alternative locator strategies.

Example prompt:

"Review this HTML and suggest a stable Playwright locator. Prefer getByRole, getByLabel, or getByTestId where appropriate."

Human review:
- Verify locator uniqueness.
- Test locator against the actual application.
- Avoid positional selectors and unnecessary XPath.

### Capability 3: Failure Analysis

Input:
- Playwright execution logs
- Screenshots
- Trace files
- Error messages

AI assistance:
- Identify likely failure causes.
- Distinguish application defects from automation issues.
- Recommend debugging steps.
- Suggest improvements to waits and assertions.

Example prompt:

"Analyze this Playwright failure log and identify whether the issue is caused by an application defect, locator instability, timing, or test data."

Human review:
- Reproduce the failure.
- Inspect the trace and application behavior.
- Confirm the root cause before changing automation code.

## 3. AI Guardrails

1. AI-generated code must undergo human review.
2. Never share passwords, access tokens, session cookies, or production patient data.
3. Do not blindly accept generated locators.
4. Avoid duplicate, unnecessary, and flaky test cases.
5. Validate generated assertions against business requirements.
6. AI must not modify production data or execute destructive actions.
7. Keep generated code under version control and review changes before merging.

## 4. Model and Cost Management

- AI assistance is optional and can use approved tools such as ChatGPT or GitHub Copilot.
- No paid AI API integration is required by this framework.
- No model API calls are made automatically during test execution.
- Use existing AI subscriptions or approved free usage where available.
- Review usage and costs before introducing automated AI integrations.

## 5. Future Improvements

- AI-assisted test generation from requirements.
- Automated failure summarization from Playwright traces.
- Locator healing suggestions with human approval.
- Integration with CI/CD reporting.

## 6. Limitations

AI suggestions may be incomplete or incorrect. All generated test cases, locators, assertions, and debugging recommendations must be validated against the application before use.
