## React 19 with RSC benefits:

1. No need to declare form state.
2. No need to track the form's pending state.
3. Form works without JS, and before JS has parsed.
4. Less client-side JS (action is solely on server)
5. Around 15% less total code.
6. If page requires a fetch, the fetch starts sooner - as soon as the page is requested.
7. Can avoid request waterfall by fetching data in parallel on server and streaming HTML to the client.
8. Can create reusable SubmitButton that monitors form submission status.
9. Encourages small, focused files. Requires separating server and client code. Requires separating the server action from the client form.
10. More opinion should make moving between projects easier. Other people's code will feel more familiar.
11. Less decision fatigue. Stronger opinions for how to do things. (yes, this seems to contradict point 6 below)

## React 18 SPA benefits:

1. The form doesn't lose submitted data when submitted with a validation error (solvable - must return state from server call, and use defaultValue, but caveat - see next point).
2. React 19's formAction automatically resets forms upon submit. This leads to extra work when doing validation. https://github.com/facebook/react/issues/29034. And any select currently resets even with defaultValue due to this bug: https://github.com/facebook/react/issues/30580
3. Faster page navigation since no server-round trip.
4. Fewer concepts to learn and master.
5. Simpler mental model.
6. More flexible composition. Can do a single file, or many.
7. Less decision fatigue. Fewer options for how to do things.
