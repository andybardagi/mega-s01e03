# mega-s01e03 · what it shows

MEGA.dev Challenge S01E03. The support desk merged 412 reports about dates into one ticket, #4471,
and marked it known. Its reports hold three problems.

## Tickets

One per problem, each with how many reports it covers:

- [#1 `parser`](https://github.com/andybardagi/mega-s01e03/issues/1): the shared parser reads day-first dates month first
- [#2 `hint`](https://github.com/andybardagi/mega-s01e03/issues/2): booking-v3's date hint tells day-first tenants to type the month first
- [#3 `one-day`](https://github.com/andybardagi/mega-s01e03/issues/3): dates move by one day across time zones

## The page

- Source: [`support-kb/src/routes/kb/incidents/4471/problems/+page.svx`](support-kb/src/routes/kb/incidents/4471/problems/+page.svx), signed `andybardagi`
- As the desk sees it: [`rendered/kb-incidents-4471-problems.png`](rendered/kb-incidents-4471-problems.png), and the built site in [`rendered/site/`](rendered/site/) (page: `kb/incidents/4471/problems.html`)

Its counts are not typed: [`ProblemTable.svelte`](support-kb/src/lib/kb/ProblemTable.svelte) and
[`problems.ts`](support-kb/src/lib/kb/problems.ts) compute them from the desk's data when the page renders.

## What's here

- `support-kb/`: the desk's kb export of 2026-10-04, plus the page, the two files above, and the smallest
  build that renders it (`package.json`, `svelte.config.js`, `vite.config.js`, `src/app.html`, `src/routes/+layout.js`).
- `rendered/`: the build output and a screenshot of the page.

Rebuild: `cd support-kb && npm install && npm run build` (writes `rendered/site/`).
