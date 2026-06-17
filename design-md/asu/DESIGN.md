---
name: Academic Excellence System
colors:
  surface: '#f9f9f9'
  surface-dim: '#dadada'
  surface-bright: '#f9f9f9'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3f3'
  surface-container: '#eeeeee'
  surface-container-high: '#e8e8e8'
  surface-container-highest: '#e2e2e2'
  on-surface: '#1a1c1c'
  on-surface-variant: '#564145'
  inverse-surface: '#2f3131'
  inverse-on-surface: '#f1f1f1'
  outline: '#897174'
  outline-variant: '#ddbfc3'
  surface-tint: '#a73354'
  primary: '#6c002a'
  on-primary: '#ffffff'
  primary-container: '#8c1d40'
  on-primary-container: '#ff9eb1'
  inverse-primary: '#ffb2bf'
  secondary: '#775a00'
  on-secondary: '#ffffff'
  secondary-container: '#fdc424'
  on-secondary-container: '#6d5200'
  tertiary: '#343333'
  on-tertiary: '#ffffff'
  tertiary-container: '#4b4a4a'
  on-tertiary-container: '#bcb9b9'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9de'
  primary-fixed-dim: '#ffb2bf'
  on-primary-fixed: '#3f0016'
  on-primary-fixed-variant: '#88193d'
  secondary-fixed: '#ffdf9a'
  secondary-fixed-dim: '#f6be1d'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4300'
  tertiary-fixed: '#e5e2e1'
  tertiary-fixed-dim: '#c8c6c5'
  on-tertiary-fixed: '#1c1b1b'
  on-tertiary-fixed-variant: '#474746'
  background: '#f9f9f9'
  on-background: '#1a1c1c'
  surface-variant: '#e2e2e2'
  heritage-maroon: '#8C1D40'
  gold-standard: '#FFC627'
  deep-onyx: '#191919'
  canvas-white: '#FFFFFF'
  fog-gray: '#F0F0F0'
typography:
  display:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 48px
  margin-mobile: 16px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style

This design system translates a prestigious academic heritage into a modern, digital-first experience. The brand personality is **authoritative, innovative, and accessible**. It is designed to serve a diverse university ecosystem—students, faculty, and alumni—evoking a sense of belonging and intellectual rigor.

The chosen design style is **Modern Minimalism**. By leveraging generous whitespace and a disciplined color application, the system moves away from legacy institutional clutter toward a streamlined, functional aesthetic. High-contrast typography and a structured grid ensure information density remains readable, while subtle tonal layering replaces heavy shadows to maintain a clean, contemporary profile.

## Colors

The palette is anchored by the iconic heritage maroon and gold. To modernize the application, the **heritage-maroon** is used primarily for brand signaling, primary actions, and structural accents. The **gold-standard** is used sparingly as a high-visibility accent color for alerts, highlights, or secondary interactive states, ensuring it doesn't overwhelm the visual field.

The background architecture relies on **canvas-white** and **fog-gray** to create a tiered surface system. **Deep-onyx** is reserved for primary typography and high-contrast UI elements to ensure WCAG AA accessibility standards are met across all interfaces. The color logic favors "less is more," using color to guide the user's eye to critical paths rather than for decoration.

## Typography

The system replaces legacy websafe fonts with a sophisticated pair of modern sans-serifs. **Hanken Grotesk** serves as the display typeface, providing a sharp, contemporary edge to headlines with its geometric clarity. **Inter** is utilized for all body copy and UI labels, chosen for its exceptional legibility and systematic performance in dense data environments.

Hierarchy is established through significant weight shifts rather than just size changes. Large displays and headlines utilize bold and extra-bold weights to command attention, while body text maintains a comfortable regular weight for long-form reading. Labels and button text utilize semi-bold weights and slight tracking adjustments to ensure clarity at smaller scales.

## Layout & Spacing

This design system employs a **12-column fluid grid** for desktop and a **4-column grid** for mobile. The layout philosophy is centered on "Information Density Control," using a strictly defined 8px spatial scale to create rhythm and predictability.

- **Desktop:** 12 columns with 24px gutters. Content is centered in a 1280px max-width container.
- **Tablet:** 8 columns with 20px gutters and 32px side margins.
- **Mobile:** 4 columns with 16px gutters and 16px side margins.

Horizontal spacing (gutters/margins) remains consistent to maintain the vertical "aisles" of the design, while vertical spacing (stacks) is used to group related content. Larger gaps (stack-lg) are used to separate distinct sections, while smaller gaps (stack-sm) define relationships between headlines and their respective body text.

## Elevation & Depth

This design system utilizes **Tonal Layers** rather than heavy shadows to signify depth, aligning with the minimalist aesthetic. Depth is communicated through subtle shifts in background color and low-contrast "ghost" borders.

- **Level 0 (Base):** The primary background color (`#FFFFFF`).
- **Level 1 (Surface):** Used for cards or sectioned content, utilizing a 1px border of `fog-gray` or a background fill of `fog-gray`.
- **Level 2 (Overlay):** For menus and modals, a very soft, highly diffused ambient shadow is used (0px 4px 20px, 5% opacity deep-onyx) to lift the element without creating visual noise.
- **Interaction:** Hover states on interactive cards should transition from a flat state to a subtle lift using a 1px maroon border rather than an increased shadow.

## Shapes

The shape language is **Soft (Level 1)**, reflecting a professional and structured environment. UI elements such as buttons, input fields, and cards utilize a 0.25rem (4px) corner radius. This slight rounding softens the "brutalist" edge of a strict grid while maintaining a crisp, architectural feel.

Large containers and feature sections can use `rounded-lg` (8px) to create a clear distinction between the page structure and smaller interactive components. Circular shapes are strictly reserved for avatars and icon backgrounds to provide a distinct contrast against the predominantly rectangular UI.

## Components

- **Buttons:** Primary buttons are solid **heritage-maroon** with white text, utilizing uppercase labels for an authoritative feel. Secondary buttons use a maroon outline with a white background. All buttons have a 4px corner radius.
- **Input Fields:** Use a 1px border of **fog-gray**. On focus, the border transitions to maroon with a subtle 2px inset ring. Labels are always positioned above the field using `label-md`.
- **Cards:** White background with a 1px `fog-gray` border. No shadow by default. High-level "Action Cards" may use a gold top-border (3px) to denote importance or status.
- **Chips/Badges:** Small, pill-shaped elements with a light `fog-gray` fill and `body-sm` text. Status-specific chips (e.g., "Open", "Closed") may use a light tint of maroon or gold.
- **Lists:** Clean, border-bottom separated rows with 16px vertical padding. Use `body-md` for primary list items and `body-sm` (in deep-onyx at 60% opacity) for metadata.
- **Global Header:** A high-contrast bar using a white background, featuring the university logo aligned left and navigation links using `button` typography. A maroon top-accent bar (4px) provides brand continuity.