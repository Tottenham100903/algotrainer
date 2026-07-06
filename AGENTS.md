# Repository Guidance

## Frontend Layout Stability

- Preserve the current responsive layout with every UI change.
- Verify changed views at desktop width and at 500px or narrower.
- Check both German and English because translated labels have different lengths.
- Do not use fixed heights or `white-space: nowrap` for user-facing text unless horizontal scrolling is intentional.
- Give grid and flex children `min-width: 0` and allow labels and buttons to wrap naturally.
- Keep controls, text, tree nodes, and array cells inside the visible viewport on narrow screens.
- After CSS or JavaScript UI changes, update the matching cache-busting query in `index.html`.
- Before finishing, run `git diff --check` and check `index.html` for duplicate IDs.
