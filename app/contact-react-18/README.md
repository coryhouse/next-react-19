## React 19 with RSC benefits:

1. No need to declare form state.
2. No need to track the form's pending state.
3. Form works without JS.
4. Less client-side JS (action is solely on server)
5. Around 15% less total code.
6. If page requires a fetch, the fetch starts sooner - as soon as the page is requested.
7. Can avoid request waterfall by fetching data in parallel on server and streaming HTML to the client.

## React 18 SPA benefits:

1. The form doesn't lose submitted data when submitted with a validation error.
2. Faster page navigation since no server-round trip.
3. Fewer concepts to learn and master.
4. Simpler mental model.
