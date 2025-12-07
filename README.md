# AI Crypto Advisor

AI Crypto Advisor is an Angular standalone application that streamlines onboarding for crypto investors and delivers personalized AI insights, curated news, and real-time market data in a single dashboard. It talks to a set of backend microservices for authentication, user preferences, Socket.IO price streams, and AI-powered content.

## Highlights
- Personalized onboarding flow that captures preferred assets, investor profile, and content types before unlocking the dashboard.
- Email/password authentication with JWT storage plus refresh token handling and automatic local caching of user preferences.
- Real-time market board powered by Socket.IO subscriptions so the dashboard keeps updating without reloads.
- AI insight cards, sentiment-driven meme generator, and crypto news feed fetched from the dashboard microservice.
- Angular Material-driven UI with standalone components, reactive forms, and responsive layouts tailored for desktop.

## Tech Stack
- Angular CLI 21 / Angular 17+ standalone APIs
- Angular Material and CDK for UI components
- RxJS for reactive flows and state streams
- Socket.IO client for live pricing updates
- Auth0 Angular JWT + jwt-decode for token management
- Vitest + jsdom for unit testing

## Getting Started
1. **Prerequisites**
   - Node.js 20+ (matches Angular CLI 21 requirements)
   - npm 11 (the repo’s `packageManager` field)
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Configure environments**
   - Base config: `src/environments/environment.ts`
   - Dev override: `src/environments/environment.development.ts`
   - Required URLs:
     - `dashboardUrl` – REST endpoints for news, AI insights, and meme generation (default `http://localhost:5002/api`)
     - `webSocketServerUrl` – Socket.IO server for price updates (default `http://localhost:5002`)
     - `userManagerServiceUrl` – CRUD service for user preference documents (default `http://localhost:5001/api`)
     - `authServiceUrl` – Auth service for register/login/refresh (default `http://localhost:5000/api`)
   Make sure the matching backend services are running or update the URLs before starting the app.
4. **Run the development server**
   ```bash
   npm start
   ```
   Visit `http://localhost:4200`. Hot reload applies to templates, styles, and TypeScript.
5. **Build for production**
   ```bash
   npm run build
   ```
   Optimized assets land in `dist/`.

## npm Scripts
- `npm start` – Run `ng serve` with live reload.
- `npm run build` – Production build via `ng build`.
- `npm run watch` – Continuous build targeting the development configuration.
- `npm test` – Launch unit tests (Vitest + jsdom) through `ng test`.

## Application Flow
1. **Register (`RegisterPage`)** – Captures credentials, calls `Auth.register`, and seeds an empty user document via `UserManagerService`.
2. **Onboard (`OnboardingPage`)** – Stepper-driven form lets users pick assets, investor type, and content preferences; these are persisted via `UserManagerService.updateUserData`.
3. **Login (`WelcomePage`)** – Authenticates against the auth service, caches the JWT pair, fetches user data by email, and routes to `/dashboards`.
4. **Dashboard (`DashboardPage`)** – Subscribes to Socket.IO price streams, fetches AI insights/news/memes from the dashboard service, and renders the `LivePrices`, `NewsFeed`, `AiInsights`, and `MemeGif` components. Users can refresh content or log out (clearing cached tokens/data).

## Project Structure
```
src/
├── app/
│   ├── dashboard-page/      # Dashboard shell + AI insights/news/prices/meme components
│   ├── onboarding-page/     # Stepper-based onboarding flow and subcomponents
│   ├── register-page/       # Registration form and user bootstrap logic
│   ├── welcome-page/        # Login screen
│   ├── services/            # Auth, AI, news, meme, socket, and user-manager services
│   └── models/              # Shared interfaces and option enums
├── environments/            # Environment-specific endpoint config
└── styles.scss              # Global theming (Angular Material base)
```

## Development Notes
- **Formatting** – Prettier is configured in `package.json` (100-column limit, single quotes, Angular HTML parser); run it before committing if your editor does not auto-format.
- **State persistence** – Auth tokens and `currentUserData` are stored in `localStorage`. Clear it when switching accounts during development.
- **Sockets** – `SocketService` immediately connects using `environment.webSocketServerUrl`. If the backend is offline, guard against connection errors or point it to a mock server.
- **API shape** – Most services accept/return the DTOs under `src/app/models`; keep them in sync with backend contracts before deploying.

## Testing
Run Vitest through Angular CLI:
```bash
npm test
```
Tests live under the same folders as their subjects (e.g., `dashboard-page.spec.ts`, `auth.spec.ts`). Add coverage when touching logic-heavy services or components.

## Deployment Checklist
- Set the production endpoints in `src/environments/environment.ts` (or add another environment file + Angular configuration).
- Run `npm run build` and deploy the contents of `dist/ai-crypto-advisor/`.
- Ensure the underlying auth, user-manager, dashboard, and websocket services are reachable over HTTPS and support the origins you deploy from.
