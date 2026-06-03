# Framer-Components

Custom Framer code components for the Merwulf site, including the Bandsintown events feed.

## Components

| File | Purpose |
|------|---------|
| `BandsInTown_Feed_v3.tsx` | Fetches and lists upcoming shows with pagination |
| `EventButton.tsx` | Optional CTA button for per-event label, link, and loading state |
| `LoadMoreButton.tsx` | Optional load-more button with label, click, and loading state |

## Design buttons (ComponentInstance)

The feed can use your Framer design system instead of built-in styled buttons.

### Load More Button

1. Sync this repo to Framer (Git Sync).
2. Set **Per Page** to a value greater than 0 so pagination and the button appear.
3. Select the **Upcoming Shows** component and connect **Load More Button** to one of:
   - **`LoadMoreButton`** (code) — recommended; label and click come from the feed
   - **Visual / no-code button** — icons and static styling OK; click uses a wrapper `div`

**Behavior**

- If nothing is linked (empty outlet), the feed uses the built-in **Load More** control (styled via Accent, Button Radius, etc.).
- Built-in buttons always show when no component is connected to the outlet—even if Framer exposes an empty slot.
- **`LoadMoreButton`** receives `label`, `onClick`, and `loading` via `cloneElement` (no wrapper `div`).
- **No-code buttons** still use a clickable wrapper; **Load More Label** may not update their text.

### Event CTA Button

For **dynamic label and URL per event** (View Event vs Notify Me, different ticket links), link the **EventButton** code component—not a pure no-code button.

1. Add `EventButton.tsx` to your Framer project (via sync).
2. Place one **EventButton** instance on the canvas (styling preview only; props are overridden per card).
3. Connect it to the feed’s **Event CTA Button** outlet.

If the outlet is empty, each card shows the built-in CTA (`View Event` / `Notify Me`) automatically.

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
| Load More Button | `LoadMoreButton` code component (or visual button + wrapper) |
| Event CTA Button | `EventButton` code component |
| Neither linked | Built-in buttons (property controls for colors/sizes) |

## Workflow

1. Edit locally in this repo.
2. Commit and push to GitHub.
3. Sync from Framer.
4. Avoid editing the same code file in Framer and locally at the same time.

## Bandsintown API

The feed uses **API v3.1**:

```text
https://rest.bandsintown.com/v3.1/artists/{artist}/events/?app_id=...&date=upcoming
```

Set **Artist** to your Bandsintown artist id (recommended, e.g. `id_15536048`) or artist name. Find the id in Bandsintown for Artists or from an API response’s `artist_id` field.

### Event fields (v3.1)

| UI | Source |
|----|--------|
| Headline | `venue.name` + city/region |
| Secondary line | `description` (lineup/price), else `lineup` |
| Date/time | `datetime` or `starts_at` |

`title` may still be empty for “by venue” shows; lineup/billing in `description` is intentional.
