# TitanOS Test Suite

Automated test suite for TitanOS using Playwright (UI) and Jest (API).

## Project structure

```
ui-tests/
  playwright.config.ts
  pages/           # Page Object Models
  helpers/         # Utilities (e.g., RemoteControl)
  integration/     # Playwright test specs
  fixtures/        # Testing data

api-tests/
  jest.config.ts
  specs/           # Jest API test specs

package.json
.env.example
README.md
```

## Setup

1. **Install dependencies**

```bash
npm install
npx playwright install
```

2. **Create `.env` file** in the repository root (copy from `.env.example`):

```bash
cp .env.example .env
```

Add the provided credentials:

API_AUTH_TOKEN=Bearer <your_token>
BASE_URL=`<url>`

## Run tests

**Run all tests:**

```bash
npm test
```

**Run only UI tests:**

```bash
npm run test:ui
```

**Run only API tests:**

```bash
npm run test:api
```

## Test requirements

✅ **Test 1:** Delete apps from home page favourites row (long press to delete, watch-tv cannot be deleted)
✅ **Test 2:** Add app to favourites from Apps page
✅ **Test 3:** Open category from search page
✅ **Test 4:** Verify channels page availability

## Notes

- Each test suite (`ui-tests` and `api-tests`) has its own config file
- Keep `.env` with secrets out of version control
- Reports are generated in `ui-tests/report-*` and `api-tests/report-*` directories
- Every test is related to specific component
