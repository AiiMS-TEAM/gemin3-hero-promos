# Gemin3 Homepage Hero: Coded Promo Slides (Oct 2026)

**Brief for Claude Code**
Client: Gemin3 Air Conditioning (gemin3airconditioning.com.au), Sydney
Request from: Kynan (AIIMS account team)
Prepared by: Abby, Head of AI, AIIMS
Date: 9 October 2026

---

## 1. The job

The homepage hero has a two-slide promo carousel. Today each slide is a flat 1080 x 1080 PNG exported from design. Replace both images with **coded HTML/CSS slides** and update them to the current promotions:

1. **Slide 1, Mitsubishi Heavy Industries (MHI):** remove "Winter Offer", add "Up to $500 Cashback". All other offer details stay the same. Refresh the design.
2. **Slide 2, General Airstage (formerly Fujitsu):** switch to the new GENERAL logo, add "Up to $500 Cashback", change "60 Months" to "36 Months" interest free payments, remove "Winter Offer". Refresh the design.

Why coded instead of images:
- The slide box changes shape at every breakpoint (see section 3). Square images get cropped, and coded slides can reflow to fit.
- Real text can be crawled, read by screen readers and stays sharp at any size.
- Kynan's team can update the next promo without a designer exporting a new PNG.
- Promotions can switch off automatically on their end date.
- The slides are lighter than two PNGs of about 600 KB each.

---

## 2. Working rules (read first)

1. **Plan before you build.** Your first output is a short plan: what you found in the theme, how you will build it, which files you will touch, and any questions. Wait for an explicit "yes" before writing code.
2. **Two phases.** Phase A is a standalone static prototype for design approval, deployed to a Vercel preview. Phase B is theme integration on a git branch. Phase B starts only after Phase A is approved.
3. **The copy is locked.** Use the text in section 5 word for word. If a line does not fit a layout, raise it. Do not reword it.
4. **No em dashes or en dashes** anywhere: copy, alt text, comments or commit messages. Use hyphens, commas or "to".
5. **Never draw, trace or rebuild a brand logo** (Gemin3, Mitsubishi Heavy Industries, GENERAL) in SVG or CSS. Use only the official files you are given. Until a file arrives, use a labelled placeholder box at the correct size.
6. **Never generate images with any AI tool or paid API.** Product cut-outs and logos are supplied (see section 8).
7. **Stay inside the slider.** Do not change the left blue hero panel, the header or any other section. Anything you notice outside scope goes in your report, not into a commit.

---

## 3. Current setup (checked on the live site, 9 Oct 2026)

**Stack**
- WordPress with a custom theme in the folder `aiims`. Tailwind is precompiled, so only classes that already exist in the built CSS work. LiteSpeed Cache with CSS optimisation is on. The WebP Converter plugin serves files from `/wp-content/uploads-webpc/`.
- The carousel is **slick**, initialised on `.banner-v3-deal-slider`.

**Hero markup**
- `section.section-home-banner-v3` holds a 12-column grid (`max-w-[1920px] px-[20px]`, gap 16px, or 24px from `lg`).
  - Left, `lg:col-span-7`: the blue panel with the H1 "Sydney's Leading Air Conditioning Experts", the Call and Book buttons, the rebate badge and the "$750 Cashback" tile. **Out of scope.**
  - Right, `lg:col-span-5`: `.banner-v3-deal-slider` contains two `.banner-v3-slide` elements. Each one holds a `<picture><img class="lazy w-full h-full object-cover">`, and the alt attribute is empty.
    - Slide 1: `/wp-content/uploads/2026/07/Static-Fujitsu-Ducted-13.png` (the MHI offer)
    - Slide 2: `/wp-content/uploads/2026/07/Static-Fujitsu-Ducted-11.png` (the Fujitsu offer)
- An inline `<style>` straight after the section sets `min-height: 400px` on the slider (`609px` from 1200px), makes the slick track flex, and places the dots at `bottom: 6rem`.

**Why the slide shape matters.** The slide stretches to the height of the left panel, so its width-to-height ratio swings widely. These are estimates; measure the real values in Phase A and report them.

| Viewport | Approx. slide box | Shape |
|---|---|---|
| 360 to 430 (mobile, stacked) | ~330 to 390 wide x 400+ tall | portrait / square |
| 768 to 1023 (tablet, stacked) | ~730 to 980 wide x 400 tall | very wide (about 2:1) |
| 1024 to 1199 | ~395 to 465 wide x row height | tall portrait |
| 1440 | ~570 wide x 609+ tall | about square |
| 1920 | ~770 wide x 609+ tall | landscape (about 1.25:1) |

**Brand tokens (from the theme CSS)**

| Token | Value | Use |
|---|---|---|
| `primary` | `#24B3E8` | sky blue |
| `secondary` | `#EA211A` | Gemin3 red |
| `yellow` | `#F9ED43` | offer yellow |
| `dark` | `#0A509F` | deep blue (hero gradient runs `#0B3462` to `#0A509F`) |
| `light` (used as black) | `#040707` | outlines, ink |
| Red tile gradient | `linear-gradient(115deg, #EA211A 42%, #84130F 79%)` | cashback tile on the left panel |

**Fonts (already loaded by the theme, so do not load new ones)**
- `Super Corn`: the display face for all headings and buttons (`.font-super-corn`)
- `Marker Attack`: the handwritten tag face (`.font-marker-attack`)
- `Inter Tight`: body and small print (`.font-inter`)
- `Inter`: body fallback

**House style to match**
- White Super Corn with a black outline (`-webkit-text-stroke` 2 to 3px) and a hard offset shadow (`text-shadow: -6px 3px 0 #000`, scaled down for small text).
- A slight rotation on headline blocks and tags (-0.8 to -2.5 degrees).
- Thick, uneven black borders that read like a comic panel (left 2px, right 4px, top and bottom 5px).
- Red or blue tag labels set in Marker Attack.

**Existing hooks to reuse**
- Any element with the class `open-book-popup` opens the site's booking popup.
- Phone: `tel:0240894647` (02 4089 4647).

---

## 4. Design direction: same offers, fresher design

Keep it unmistakably Gemin3 (bold comic sticker style) but cleaner and more premium than the current exports, which are crowded and give every element the same weight.

- **One clear reading order per slide:**
  1. Finance headline ("12 Months Interest Free Finance" or "36 Months Interest Free Payments")
  2. Cashback starburst
  3. Product photo
  4. Offer card: brand logo, kW size, outlets and zones, price
  5. Terms strip
- **Replace the winter look.** Winter Offer is gone, and these promos run from October to January, which is the Australian summer. Swap the flat yellow field for a warm yellow sunburst (a CSS `repeating-conic-gradient` radiating from behind the product) or similar. This is visual only, so add no "Summer" wording.
- **The cashback starburst is the only sticker.** It sits in the old Winter Offer spot (top right on slide 1, lower right on slide 2). Do not add other badges.
- **Both slides share one layout** so they read as a set. Only the accent changes: slide 1 leads with red (it sits next to MHI's red brand), slide 2 leads with blue.
- **The price tag must jump out:** "only" in Marker Attack, the dollar figure in large Super Corn, on a blue tag with a black border, rotated slightly.
- **Ground the product.** Use a soft elliptical contact shadow under the outdoor unit so the cluster doesn't float. The indoor unit, outdoor unit and controller overlap the way they do in the current slides.
- **Motion:** when a slide becomes active, the starburst pops in (scale 0.85 to 1 with a small rotation, about 400ms) and the price tag nudges up. Nothing loops. If `prefers-reduced-motion` is set, show everything static.
- References are in `./reference/`:
  - `01-current-mhi-slide.png`: current slide 1 (the source for its offer details)
  - `02-current-fujitsu-slide.png`: current slide 2 (the source for its offer details)
  - `03-mhi-official-cashback-creative.png`: MHI's official "Nonna Knows Best" cashback creative (the source of the MHI cashback wording and dates). Use it as a fact reference only. Do not copy its layout or photo.

---

## 5. Slide content (locked)

### Slide 1: Mitsubishi Heavy Industries

| Element | Copy |
|---|---|
| Brand mark (top left, small) | Gemin3 Air Conditioning logo |
| Cashback starburst (replaces "Winter Offer") | UP TO **$500** CASHBACK* |
| Finance headline, line 1 | INTEREST FREE FINANCE |
| Finance headline, line 2 (biggest) | 12 MONTHS |
| Finance tag | NO HIDDEN FEES |
| Offer card tab | +FREE SUPPLY & INSTALL |
| Brand logo | Mitsubishi Heavy Industries (official file) |
| System | 10 kW DUCTED SYSTEM |
| Spec | 6 OUTLETS 2 ZONES |
| Price | only **$6,999** |
| Terms strip | **PROPOSED, confirm before go-live:** *Cashback with the purchase of eligible MHI air conditioners between 1 October 2026 and 31 January 2027. T&Cs apply. |
| CTA button (new) | ENQUIRE NOW (class `open-book-popup`) |
| Product image | MHI 10 kW ducted: indoor unit, outdoor unit, wall controller |
| Show from / until | Live now / hide after **31 Jan 2027, 23:59 AEDT** |

> Note: the current slide 1 terms strip reads "Offer valid on any General Airstage ducted system", which is wrong on an MHI offer. It must not be carried over. The proposed line above follows MHI's own disclaimer and is waiting on sign-off from Kynan.

### Slide 2: General Airstage (formerly Fujitsu)

| Element | Copy |
|---|---|
| Brand mark (top left, small) | Gemin3 Air Conditioning logo |
| Cashback starburst (replaces "Winter Offer") | UP TO **$500** CASHBACK* |
| Finance headline, line 1 (biggest) | 36 MONTHS |
| Finance headline, line 2 | INTEREST FREE PAYMENTS |
| Finance tag | NO UPFRONT FEES |
| Offer card tab | +FREE SUPPLY & INSTALL |
| Brand logo | **New GENERAL logo** (official file, replaces the FUJITSU logo) |
| System | 14 kW DUCTED SYSTEM |
| Spec | 8 OUTLETS 2 ZONES |
| Price | only **$9,499** |
| Terms strip | OFFER VALID ON ANY GENERAL AIRSTAGE DUCTED SYSTEM |
| Small print (under or inside the strip) | *Cashback on eligible General Airstage ducted systems purchased 1 October to 11 December 2026. T&Cs apply. |
| CTA button (new) | ENQUIRE NOW (class `open-book-popup`) |
| Product image | General Airstage 14 kW ducted: indoor unit, outdoor unit, wall controller |
| Show from / until | Live now / hide after **11 Dec 2026, 23:59 AEDT** (the General cashback purchase window closes then) |

**Copy rules**
- Write "CASHBACK" as one word on both slides, to match the site's existing "$750 Cashback" tile.
- Write "kW" with a lowercase k and a space before it: "10 kW", "14 kW".
- The "$500" in each starburst is the largest text inside that starburst.

---

## 6. Layout spec

Make each slide a **size container** (`container-type: size`) and lay it out with **container queries**, not viewport media queries, because the slide's own shape is what changes. Size type with `cqw`, `cqh` or `cqmin` inside `clamp()`, so nothing falls below the minimums in section 10.

Build three layouts and switch between them by the slide's aspect ratio (`@container (min-aspect-ratio: ...)` or width and height thresholds):

**A. Landscape (aspect 1.15 or wider; desktop at 1440+ and tablet)**
```
┌──────────────────────────────────────────────┐
│ [Gemin3 logo]                     (STARBURST) │
│ FINANCE HEADLINE (2 lines)                     │
│ [finance tag]                                  │
│ ┌────────────────┐        [ PRODUCT CLUSTER ] │
│ │ +FREE SUPPLY…  │        [  on sunburst    ] │
│ │ [Brand logo]   │                             │
│ │ 10 kW DUCTED   │                             │
│ │ 6 OUTLETS…     │                             │
│ └[only $6,999]───┘ [ENQUIRE NOW]               │
├──────────────────────────────────────────────┤
│ TERMS STRIP                                    │
└──────────────────────────────────────────────┘
```
On very wide tablet boxes (about 2:1), move the product cluster to the right half at full height, with headline and offer card stacked in the left half.

**B. Square-ish (aspect 0.85 to 1.15)**
Like A, but the product cluster shrinks and tucks behind the right edge of the offer card, and the headline sets tighter.

**C. Portrait (aspect under 0.85; mobile and 1024 to 1199)**
```
┌─────────────────────────┐
│ [logo]      (STARBURST) │
│ FINANCE HEADLINE        │
│ [finance tag]           │
│   [ PRODUCT CLUSTER ]   │
│ ┌─────────────────────┐ │
│ │ tab / logo / kW /   │ │
│ │ spec / [price]      │ │
│ └─────────────────────┘ │
│ [ENQUIRE NOW full width]│
├─────────────────────────┤
│ TERMS STRIP             │
└─────────────────────────┘
```

**Frame:** keep the blue outer frame and black comic border so the slide sits naturally next to the blue left panel. The terms strip runs along the bottom in red (`#EA211A`) with white Super Corn text.

**Slick dots:** they currently sit at `bottom: 6rem`, which will cover content. Move them so they sit just above the terms strip, inside the frame, without overlapping the offer card. Measure this in every layout.

---

## 7. Build spec

**Markup**
- Each slide is an `<article class="g3-promo g3-promo--mhi">` (or `--general`) with `aria-roledescription="slide"` and an `aria-label` that sums up the offer, for example "Mitsubishi Heavy Industries 10 kW ducted system, $6,999, 12 months interest free, up to $500 cashback".
- The finance headline is an `<h2>`. Everything else is `<p>`, `<span>` or `<strong>`. Do not add another `<h1>`.
- The price is real text, not an image. Mark the dollar figure up as `<data value="6999">$6,999</data>`.
- Product image: `<picture>` with WebP and a PNG fallback, explicit `width` and `height`, and a meaningful `alt` (for example "Mitsubishi Heavy Industries ducted indoor unit, outdoor unit and controller").
- Logos: inline or `<img>` SVG with alt text naming the brand.
- The starburst is an inline SVG or a CSS `clip-path` polygon with the text on top. The asterisk links to the terms text with `aria-describedby`.

**CSS**
- Put all styles in one scoped stylesheet, `g3-promo-slides.css`, with every selector prefixed `.g3-promo`. Enqueue it only on the front page, or inline it the way the existing `banner-v3` styles are inlined.
- Do not depend on Tailwind classes that may not exist in the compiled build. If you do use theme utility classes, check that each one exists in the built CSS first.
- Use custom properties for the accent (`--g3-accent`, `--g3-accent-dark`) so the two variants differ only by a modifier class.
- No layout shift: the slider and slides keep the current min-heights, and images reserve their space.

**Performance**
- The first slide's product image loads eagerly with `fetchpriority="high"`, since it is likely the LCP element on mobile. Slide 2 loads lazily.
- Product cut-outs: WebP, longest side 1200px or less, about 120 KB or less each.
- No new JS libraries. Slick stays. Write any extra JS in plain JavaScript, under 2 KB.

**Auto-expiry (cache safe)**
- Each slide has `data-start` and `data-end` ISO timestamps with the Sydney offset (for example `2026-12-11T23:59:00+11:00`).
- Server side: PHP skips any slide whose end date has passed.
- Client side, because LiteSpeed may serve cached HTML: before slick initialises, a small script removes expired slides. If only one slide is left, slick runs with dots and arrows off, or the slide shows statically.
- If both slides have expired, fall back to the current static image slides or hide the right column without breaking the grid. Pick one, raise it in the plan and wait for my decision.

**Editability**
- First check how the theme supplies hero content: an ACF repeater or options page, or hard-coded in a template part. Report what you find in the plan.
- Recommended: an ACF repeater "Hero promo slides" with these fields: variant (mhi/general/other), brand logo, headline line 1, headline line 2, finance tag, starburst text, cashback amount, offer tab, system, spec, price, product image (plus alt), terms strip, small print, CTA label, start date, end date. This lets Kynan's team run the next promo without a developer.
- If ACF is not available, use a single PHP array in the template part, documented at the top of the file.

**Accessibility**
- Text contrast is WCAG AA or better, judged on the solid fill behind the text and not on the outline.
- The ENQUIRE NOW button can be reached by keyboard and has a visible focus ring.
- Autoplay, if it is on, pauses on hover and focus and does not run when `prefers-reduced-motion` is set.
- The slide `aria-label` text must exactly match the offer text shown on the slide.

---

## 8. Assets

| Asset | Status | Source |
|---|---|---|
| Gemin3 logo (SVG, full colour and white) | Available | In the theme, or `../Ducted Landing Page/Logo.svg` and `Logo-white.svg` in this project folder |
| Mitsubishi Heavy Industries logo (SVG) | **Needed** | Client or MHI dealer resources. Do not redraw it. |
| New GENERAL logo (SVG) | **Needed** | Client or the General Authorised Partner Portal. Do not redraw it. Placeholder until supplied. |
| MHI 10 kW ducted product cut-outs (indoor, outdoor, controller; transparent PNG or WebP) | **Needed** | The designer's source file for the current slide, or MHI product images |
| General Airstage 14 kW ducted product cut-outs (indoor, outdoor, controller) | **Needed** | The designer's source file for the current slide, or General product images |
| Fonts | Available | Already loaded by the theme |

In Phase A, build with labelled placeholder boxes wherever an asset is missing, sized to the real proportions.

---

## 9. Deliverables

**Phase A: prototype (for design approval)**
1. `prototype/index.html`: both slides built to this spec inside a faithful copy of the hero grid (the left panel can be a flat blue block at the real proportions).
2. A width switcher on the page that previews 375, 768, 1024, 1280, 1440 and 1920 side by side or one at a time.
3. A table of the real slide box sizes at each width (this replaces the estimates in section 3).
4. Deploy to a Vercel preview. Vercel is for previews only, and the live site stays on its current hosting.
5. Screenshots of both slides at each width, saved to `prototype/screens/`.

**Phase B: theme integration (after approval)**
1. Work on a git branch named `feature/hero-coded-promos`.
2. Add a template part (for example `template-parts/home/promo-slide.php`), the stylesheet, the small expiry script and the ACF field group (exported as JSON if ACF is used).
3. Replace only the two `.banner-v3-slide` contents in the hero template.
4. Open a PR describing the change, how to edit promos, and how to roll back to the old image slides.
5. Purge the LiteSpeed cache and the CSS optimisation cache on staging, then retest.

---

## 10. Acceptance checklist

- [ ] All copy matches section 5 exactly. No em or en dashes anywhere.
- [ ] "Winter Offer" appears on neither slide.
- [ ] Slide 2 shows 36 MONTHS (not 60) and the GENERAL logo (not FUJITSU).
- [ ] The slide 1 terms strip no longer mentions General Airstage.
- [ ] No text overflows, clips or gets covered by the product image or dots at 360, 375, 390, 414, 768, 1024, 1180, 1280, 1440 and 1920 wide.
- [ ] Minimum rendered sizes: terms and small print 11px or more, spec line 13px or more, price 32px or more on mobile.
- [ ] The starburst, price and headline stay readable in all three layouts.
- [ ] Hero CLS is 0. The LCP image is not lazy-loaded.
- [ ] ENQUIRE NOW opens the existing booking popup.
- [ ] The expiry logic works: setting a test date past `data-end` removes that slide, both with the cache and without it.
- [ ] Reduced motion turns off all animation.
- [ ] Keyboard focus is visible, and screen readers announce each slide's summary.
- [ ] The left hero panel and the rest of the page are unchanged.
- [ ] Tested in Chrome, Safari (iOS and macOS), Firefox and Edge.

---

## 11. Open items (for Abby and Kynan, not for Claude Code to decide)

1. **Slide 1 terms strip:** approve the proposed MHI cashback line, or supply the client's wording.
2. **Cashback amounts per model:** both brands say "up to $500", and the actual amount depends on the model. Check that the MHI 10 kW and General 14 kW systems on these slides are on each brand's eligible list. "Up to" covers us either way, but the client should know.
3. **End dates:** the General cashback purchase window closes 11 Dec 2026 and the MHI cashback runs to 31 Jan 2027. General's 36 months interest free (humm90) runs to 15 Jan 2027. Decide what replaces slide 2 after 11 December.
4. **Finance claims:** "No hidden fees" and "No upfront fees" are carried over from the current slides. Check them against the current humm terms and add a finance disclaimer if humm requires one.
5. **Left hero tile:** it still says "$750 Cashback* on selected systems". That figure doesn't match the "up to $500" on both new slides. Should it change too?
6. **Assets:** the official GENERAL and MHI logo files, and the product cut-outs from the designer's source files.
