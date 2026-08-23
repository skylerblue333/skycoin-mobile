# skycoin-mobile

Mobile and responsive-frontend component for the SKYCOIN4444 ecosystem.

## Current repository evidence

- Public TypeScript repository on `main`.
- 27 tracked files were observed in the current audit snapshot.
- `package.json`, Docker configuration, Docker Compose configuration, and GitHub Actions CI configuration are present.
- No test-related file was identified by the current filename-based audit.

## Ecosystem role

**Frontend → Mobile / Responsive Experience**

This repository is a candidate source for mobile-oriented UI, responsive layouts, and reusable frontend behavior. It should be compared with the larger SKYCOIN4444 frontend repositories before a separate mobile architecture is maintained.

## Truthful status

- Source/configuration: **present**
- Canonical frontend integration: **pending comparison**
- Automated tests: **not established by the current repository evidence**
- Production deployment: **not verified**
- Native mobile release: **not claimed**

The current `package.json` labels the module production-grade, but its build suppresses TypeScript failure and its test/lint scripts only print success messages. Those scripts are not evidence that validation passes. fileciteturn149file0

## Consolidation approach

Preserve the existing UI/source and configuration. Compare it against `skycoin-home`, the main frontend repositories, and any native/mobile implementations. Promote the strongest verified mobile and responsive patterns into the canonical frontend rather than creating duplicate UI systems.

If native or responsive capabilities are genuinely missing, evaluate established open-source frameworks and components with compatible licenses before building replacements. Preserve required attribution and isolate third-party dependencies behind maintainable interfaces.

## Production requirements

Before production promotion, establish real tests, strict TypeScript/build validation, accessibility and responsive-device checks, dependency/security checks, reproducible CI, environment configuration, backend integration, and a verified mobile/web deployment path.

## License

MIT, subject to the checked-in license and applicable third-party dependency licenses.
