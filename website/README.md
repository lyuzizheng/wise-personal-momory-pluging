# Personal Work Trace Website

Static visualization for the local `personal-work-trace/` store.

## Refresh Data

After running the daily work-memory workflow, refresh the website data:

```sh
node website/scripts/generate-data.mjs
```

The command reads the trace store structure and updates only generated data in
`website/data/work-trace.js`. The app source stays unchanged.

The generated dataset omits profile identifiers such as names, emails, Slack
IDs, manager names, and connector credentials. It keeps only non-sensitive work
context needed for the local dashboard, such as department category, team/role
labels, timezone, source coverage, event summaries, and project involvement
buckets.

## Open

Open `website/index.html` in a browser. The app uses the generated local data
script, so it works without a development server.

## No-Init Support

If `personal-work-trace/` is missing or empty, the generator still writes an
empty dataset and the website shows an empty state.

## Project Roles

The generator normalizes project involvement into simple buckets:
`owner`, `core_contributor`, `reviewer`, `side_helper`, `observer`, and
`unknown`. The UI uses these buckets for filtering while still showing any
original free-form role label captured in the trace.
