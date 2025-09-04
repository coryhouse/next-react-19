# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 project showcasing React 19 features. It demonstrates the differences between React 18 and React 19 implementations through parallel examples (e.g., `app/todos/` uses React 19 patterns, `app/todos-react-18/` uses React 18 patterns).

## Commands

### Development
- `npm start` - Starts both Next.js dev server and json-server mock API (primary command for development)
- `npm run dev` - Start Next.js development server only
- `npm run json-server` - Start json-server mock API only (runs on port 3001)

### Testing & Quality
- `npm run pw` - Run Playwright tests with UI
- `npm run lint` - Run ESLint
- `npm run build` - Build the application and start json-server

## Architecture

### Directory Structure
- `app/` - Next.js App Router pages and components
  - React 19 implementations in main directories (e.g., `todos/`, `contact/`)
  - React 18 equivalents in `-react-18` suffixed directories (e.g., `todos-react-18/`, `contact-react-18/`)
- `components/` - Shared UI components (Button, Input, Spinner, etc.)
- `types/` - TypeScript type definitions and Zod schemas
- `tests/` - Playwright e2e tests

### Key Features Demonstrated
- **Server Components vs Client Components**: Compare `app/todos/page.tsx` (React 19 with async server components) vs `app/todos-react-18/page.tsx` (client-side with useEffect)
- **useActionState Hook**: Used in `app/contact/page.tsx` for form state management (React 19 feature)
- **Suspense with Server Components**: Async data fetching patterns in React 19
- **Form Actions**: Server actions for form handling

### Data Layer
- Uses json-server for mock API (port 3001)
- Data structures defined in `db.json`: todos, posts, comments, contacts, profile
- Zod schemas in `types/` directory for runtime validation
- TypeScript types generated from Zod schemas

### Styling
- Tailwind CSS for styling
- Global styles in `app/globals.css`
- Component-specific styling using Tailwind classes

### State Management
- UserContext in `app/user-context.tsx` for global user state
- React 19's useActionState for form state management
- Server state handled through React Query (@tanstack/react-query)

### Testing
- Playwright for e2e testing (configured in `playwright.config.ts`)
- Tests run against development server automatically
- Test files in `tests/` directory