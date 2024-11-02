This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## New features

- [x] React Server Components - Components that render at build time, or for each request.
- [x] Actions - Functions that use async transitions and automatically submit data for you. Actions support error handling, optimistic updates, and pending state.
- [x] Full custom element support
- [x] Document metadata support - Render title, link, and meta tags and they automatically hoist. (See Vite, since Next has its own metadata API)
- [ ] Stylesheet precedence settings
- [ ] Render async scripts in any component - They're automatically deduplicated
- [ ] Preload resources via prefetchDNS, preconnect, preload, preinit
- [ ] Unexpected tags in <head> and <body> are skipped - improves third-party script compatibility and avoids mismatch errors
- [ ] Better error reporting - Automatically removes duplicate errors. Added onCaughtError and onUncaughtError root options.

## New directives

- [x] 'use client' - marks code that runs only on the client.
- [x] 'use server' - marks server-side functions that can be called from client-side code.

## New APIs

- [x] use - Read resources (like promises and context) in render.
- [x] ref prop - refs are finally just a plain prop!
- [ ] ref callback cleanup – ref callbacks can return an optional cleanup function.
- [ ] Streamlined Context - Use <Context> instead of <Context.Provider>
- [ ] useDeferredValue - Now accepts an initial value too.

## New hooks

- [x] useActionState - Declare form state and degrade gracefully if JS hasn't executed yet.
- [x] useFormStatus - Get a form's status.
- [x] useOptimistic - Show the final state optimistically while an async request is underway.

## Not in React 19, but new

- [x] useTransition / startTransition - Update state without blocking the UI. Only the former provides `isPending`.
- [ ] React compiler
- [ ] 'server-only' directive package - Specify that a file can only be run on the server.

## New features Problem, Solution quiz

Problem: Slow UI feedback. Lack of rollback in case of error. Want to show new value before it’s actually saved on backend. 
Solution: useOptimistic

Problem: Want multiple form actionsSolution: put form action on button https://react.dev/reference/react-dom/components/form#handling-multiple-submission-types

Problem: the form needs to submit to a different url and should work before hydration 
Solution: provide a permalink to useActionState. This arg only applies before hydration.

Problem: I want to immediately hide error state on a form upon submission.
Solution: Hide validation errors when `isPending` from useActionState is true.

Problem: Want to display an error if the forms action fails
Solution: wrap form in error boundary.

Problem: Want to show pending state while form submit is processing
Solution: useFormStatus

Problem: Want to avoid declaring form state. Want to track server action status without separate state. 
Solution: useActionState

Problem: Want to expose a server function to the client.
Solution: use server.

Problem: Want to validate form input when using useActionState
Solution: Declare validation logic with form's action

Problem: Want to support submitting a form before JS has executed (helps if slow connection, device, or JS disabled) And automatically reset the form when submitted. 
Solution: Pass form a server action

Problem: Want to submit data on form that isn’t visible. 
Solution: Hidden form field is submitted with form.

Problem: Want to render a component client side only and use client only features like hooks
Solution: 'use client'.

Problem: Want to consume a context or promise.
Solution: use

Problem: Want to declare meta tags
Solution: Just render.

Problem: css priority.
Solution: render link anywhere and declare priority

Problem: Heavy dependency that’s only needed on server, want to start fetch sooner, want a streamlined syntax for fetching data without having to declare state or useEffect or use a third party lib. Want to handle loading UI via Suspense.
Solution: RSC
