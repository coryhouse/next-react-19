This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## New features

- [x] React Server Components - Components that render at build time, or for each request.
- [ ] Actions - Functions that use async transitions and automatically submit data for you. Actions support error handling, optimistic updates, and pending state.
- [x] Full custom element support
- [x] Document metadata support - Render title, link, and meta tags and they automatically hoist. (See Vite, since Next has its own metadata API)
- [ ] Stylesheet precedence settings
- [ ] Render async scripts in any component - They're automatically deduplicated
- [ ] Preload resources via prefetchDNS, preconnect, preload, preinit
- [ ] Unexpected tags in <head> and <body> are skipped - improves third-party script compatibility and avoids mismatch errors
- [ ] Better error reporting - Automatically removes duplicate errors. Added onCaughtError and onUncaughtError root options.

## New directives

- [x] 'use client' - marks code that runs only on the client.
- [ ] 'use server' - marks server-side functions that can be called from client-side code.

## New APIs

- [x] use - Read resources (like promises and context) in render.
- [ ] ref prop - refs are finally just a plain prop!
- [ ] ref callback cleanup – ref callbacks can return an optional cleanup function.
- [ ] Streamlined Context - Use <Context> instead of <Context.Provider>
- [ ] useDeferredValue - Now accepts an initial value too.

## New hooks

- [ ] useActionState - Declare form state and degrade gracefully if JS hasn't executed yet.
- [ ] useFormStatus - Get a form's status.
- [ ] useOptimistic - Show the final state optimistically while an async request is underway.
