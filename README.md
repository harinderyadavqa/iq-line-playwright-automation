
## AI Capabilities and Guardrails

This framework follows a human-in-the-loop AI-assisted QA approach.

The following capabilities are documented:

| Capability | Purpose |
|---|---|
| Test Case Generation | Generate scenarios from requirements and acceptance criteria |
| Locator Recommendations | Suggest stable Playwright locators using DOM evidence |
| Failure Analysis | Analyze screenshots, traces, and execution logs |

### Human Review

AI-generated suggestions are never automatically merged or executed. QA engineers validate generated test cases, locators, assertions, and debugging recommendations.

### Security and Privacy

- Never provide credentials, session cookies, access tokens, or production patient data to AI tools.
- Review generated code before committing.
- Do not allow AI to perform destructive operations.

### Cost Management

No paid AI API integration is currently required. AI assistance is optional and uses approved tools. Automated AI calls are not part of normal test execution.

For detailed examples and guardrails, see [AI Strategy](ai/README.md).
