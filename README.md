# Framer-Components

Custom Framer code components for the Merwulf site, including the Bandsintown events feed.

## Components

| File | Purpose |
|------|---------|
| `BandsInTown_Feed_v3.tsx` | Fetches and lists upcoming shows with pagination |
| `EventButton.tsx` | Optional CTA button for per-event label, link, and loading state |

## Design buttons (ComponentInstance)

The feed can use your Framer design system instead of built-in styled buttons.

### Load More Button

1. Sync this repo to Framer (Git Sync).
2. Select the **Upcoming Shows** component on the canvas.
3. In the properties panel, use **Load More Button** (or the canvas outlet) to link your visual button.
4. Set **Per Page** to a value greater than 0 so pagination and the button appear.

**Behavior**

- If nothing is linked, the feed uses the built-in **Load More** control (styled via Accent, Button Radius, etc.).
- If a no-code/visual button is linked, clicks are handled by a wrapper around your component (your button does not need its own click handler).
- **Load More Label** may not update a no-code button’s text; set the label on the design component or accept static copy.

### Event CTA Button

For **dynamic label and URL per event** (View Event vs Notify Me, different ticket links), link the **EventButton** code component—not a pure no-code button.

1. Add `EventButton.tsx` to your Framer project (via sync).
2. Place one **EventButton** instance on the canvas (styling preview only; props are overridden per card).
3. Connect it to the feed’s **Event CTA Button** outlet.

The feed passes these props on each card via `cloneElement`:

| Prop | Type | Purpose |
|------|------|---------|
| `label` | string | Button text |
| `link` | string | Ticket / notify URL |
| `loading` | boolean | Shows loading state |
| `text` | string | Alias for label (some components) |
| `title` | string | Alias for label (some components) |

**No-code buttons**

- Cloning a visual button once per card usually repeats the **same** label and link.
- Icons and variants configured on the canvas still apply visually.
- Loading variants on no-code components generally **cannot** be toggled from the feed without a code wrapper.

### Recommended setup

| Control | Suggested component |
|---------|---------------------|
| Load More Button | Your Framer visual button (icons/static label OK) |
| Event CTA Button | `EventButton` code component |
| Neither linked | Built-in buttons (property controls for colors/sizes) |

## Workflow

1. Edit locally in this repo.
2. Commit and push to GitHub.
3. Sync from Framer.
4. Avoid editing the same code file in Framer and locally at the same time.

## Bandsintown note

Event titles come from the `description` field when events are configured “by venue” in Bandsintown. See inline helpers `getBilling` and `getEventMeta` in the feed component.
