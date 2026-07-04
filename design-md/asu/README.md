# ASU — Academic Excellence System Design

Custom design system for a university platform. Full spec: [DESIGN.md](./DESIGN.md)

---

## Personality & Style

**Authoritative · Innovative · Accessible** — Modern Minimalism. Generous whitespace, disciplined color, high-contrast typography. Tonal layers instead of heavy shadows.

---

## Brand Colors

| Token | Hex | Usage |
|---|---|---|
| `heritage-maroon` | `#8C1D40` | Primary brand, CTA buttons, accents |
| `gold-standard` | `#FFC627` | Highlights, alerts, secondary interactive |
| `deep-onyx` | `#191919` | Primary text, high-contrast elements |
| `canvas-white` | `#FFFFFF` | Level 0 background |
| `fog-gray` | `#F0F0F0` | Level 1 surface, card borders, input borders |

| Semantic | Hex | Usage |
|---|---|---|
| `primary` | `#6c002a` | Primary actions |
| `primary-container` | `#8c1d40` | Containers / nav |
| `secondary` | `#775a00` | Secondary actions |
| `secondary-container` | `#fdc424` | Secondary containers |
| `on-surface` | `#1a1c1c` | Body text |
| `outline` | `#897174` | Borders, dividers |
| `error` | `#ba1a1a` | Error states |

---

## Typography

| Scale | Font | Size | Weight | Line Height |
|---|---|---|---|---|
| `display` | Hanken Grotesk | 48px | 800 | 56px |
| `headline-lg` | Hanken Grotesk | 32px | 700 | 40px |
| `headline-lg-mobile` | Hanken Grotesk | 28px | 700 | 36px |
| `headline-md` | Hanken Grotesk | 24px | 600 | 32px |
| `body-lg` | Inter | 18px | 400 | 28px |
| `body-md` | Inter | 16px | 400 | 24px |
| `body-sm` | Inter | 14px | 400 | 20px |
| `label-lg` | Inter | 14px | 600 | 20px |
| `label-md` | Inter | 12px | 600 | 16px |
| `button` | Inter | 14px | 700 | 20px |

Google Fonts import: `Hanken+Grotesk:wght@600;700;800` + `Inter:wght@400;600;700`

---

## Spacing (8px base scale)

| Token | Value | Usage |
|---|---|---|
| `stack-sm` | 8px | Headline → body gap |
| `stack-md` | 16px | Related content grouping |
| `stack-lg` | 32px | Section separators |
| `gutter` | 24px | Column gutters |
| `margin-desktop` | 48px | Desktop side margins |
| `margin-mobile` | 16px | Mobile side margins |
| `container-max` | 1280px | Max content width |

---

## Grid

- **Desktop:** 12 columns, 24px gutters, 1280px max-width, 48px side margins
- **Tablet:** 8 columns, 20px gutters, 32px side margins
- **Mobile:** 4 columns, 16px gutters, 16px side margins

---

## Border Radius

| Token | Value | Usage |
|---|---|---|
| `rounded-sm` | 2px | Subtle rounding |
| `rounded` (default) | 4px | Buttons, inputs, cards |
| `rounded-md` | 6px | – |
| `rounded-lg` | 8px | Large containers, feature sections |
| `rounded-full` | 9999px | Avatars, icon backgrounds only |

---

## Elevation (Tonal, no heavy shadows)

| Level | Surface | Usage |
|---|---|---|
| 0 | `#FFFFFF` | Page background |
| 1 | `fog-gray` fill or 1px `fog-gray` border | Cards, sections |
| 2 | `0px 4px 20px rgba(25,25,25,0.05)` | Modals, menus |
| Hover | 1px maroon border transition | Interactive cards |

---

## Components

- **Button primary:** `heritage-maroon` fill, white text, uppercase, 4px radius
- **Button secondary:** maroon outline, white background
- **Input:** 1px `fog-gray` border → maroon border + 2px inset ring on focus. Label above field.
- **Card:** white bg, 1px `fog-gray` border, no shadow. High-priority cards: 3px `gold-standard` top border.
- **Chip/Badge:** `fog-gray` fill, `body-sm`. Status variants: maroon or gold tint.
- **List row:** border-bottom separated, 16px vertical padding. Primary `body-md`, metadata `body-sm` at 60% opacity.
- **Global header:** white bg, 4px maroon top-accent bar, logo left, `button` typography for nav.
