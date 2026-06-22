# TitanOS Test Suite

Automated test suite for TitanOS using Playwright (UI) and Jest (API).

## Project structure

```
ui-tests/
  playwright.config.ts
  pages/               # Page Object Models
  helpers/             # Utilities (e.g., RemoteControl)
  integration/         # Playwright test specs
  fixtures/            # Test data

api-tests/
  jest.config.js
  fixtures/
    appData.ts         # Base URL, shared params, page IDs
  controllers/         # Request wrappers, one class per resource
  interfaces/          # TypeScript interfaces for response types
  helpers/
    apiClient.ts       # Axios instance
  specs/               # Jest test specs

package.json
README.md
```

## Setup

1. **Install dependencies**

Install root dependencies:

```bash
npm install
```

Install UI test dependencies and Playwright browsers:

```bash
cd ui-tests && npm install && npx playwright install && cd ..
```

Install API test dependencies:

```bash
cd api-tests && npm install && cd ..
```

2. **Create `.env` files**

For UI tests, create `ui-tests/.env` (copy from `ui-tests/.env.example`):

```bash
cp ui-tests/.env.example ui-tests/.env
```

The UI `.env` supports the following variables:

```
BASE_URL=
TEST_CATEGORY=     # category used in search tests, defaults to Action
```

For API tests, create `api-tests/.env` (copy from `api-tests/.env.example`):

```bash
cp api-tests/.env.example api-tests/.env
```

The API `.env` supports the following variables:

```
BASE_URL=          # TitanOS API base URL
MARKET=            # market to test against, defaults to gb
DEVICE=            # device type, defaults to tv
LOCALE=            # locale for responses, defaults to en
```

To run against a different market or device, update these values or pass them inline:

```bash
MARKET=us npm run test:api
```

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

**Run a single UI spec:**

```bash
cd ui-tests && npm test -- apps
```

**Run a single API spec:**

```bash
cd api-tests && npm test -- collections
```

## UI test specs

| Test               | Description                                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------------------------- |
| apps.spec.ts       | Add app to favourites from the Applications page                                                                  |
| favourites.spec.ts | Remove app from the favorites at the Home page<br /><br />Not allowed to remove "watch-tv" app from the favorites |
| channels.spec.ts   | Channels page is displayed correctly<br /><br />Channels page shows placeholder when unavailable at the region    |
| search.spec.ts     | Open category from the search page                                                                                |

## API test specs

| Spec                | Endpoint                    | Description                                                        |
| ------------------- | --------------------------- | ------------------------------------------------------------------ |
| collections.test.ts | `GET /v1/pages/:id/items` | Home page collections — shape, pagination, 400, 404               |
| genres.test.ts      | `GET /v1/genres`          | Genre list — required fields, contents URLs, dominant colour, 400 |
| menu-items.test.ts  | `GET /v1/menu_items`      | Navigation menu — ordering, core items, home item contract, 400   |

## Notes

- UI tests run with `workers: 1` and `fullyParallel: false`. Tests share device state so parallel execution would cause conflicts
- API tests use Backend for Frontend endpoints that return shaped UI data. Tests validate response contracts, not specific content values
- Reports are generated in `ui-tests/report` and `api-tests/jest-report` after each run
- It was the issue with channels page, so I checked instead that there is placeholder there
- I couldn't add the app to favorites, so the last step in this spec "Add app to the favourites from the Applications page" will fail
-
