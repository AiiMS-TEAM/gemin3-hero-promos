# Gemin3 hero promo slides: Phase A prototype

Built 9 October 2026 for design approval. Phase B (theme integration) starts only after sign-off.

## What is here

| File | Ships in Phase B? | Purpose |
|---|---|---|
| `g3-promo-slides.css` | Yes | All slide styles, every rule scoped to `g3-promo` |
| `g3-promo-expiry.js` | Yes, inlined after the slider | Removes expired slides before slick starts, stops autoplay for reduced motion, keeps the dots above the terms strip. About 1.6 KB with whitespace stripped |
| `hero.html` | Markup only | Both slides inside a copy of the hero grid, with the theme's slick settings and its inline slider style (changes marked "added" or "changed") |
| `index.html` | No | Width switcher (375, 768, 1024, 1280, 1440, 1920), test dates, size table |
| `replica.css`, `audit.js`, `shot.html` | No | Theme stand-in, layout audit, screenshot frame |
| `assets/` | Logos yes, product images interim | Official MHI and GENERAL logos (SVG, unmodified, from mhiaa.com.au and generalww.com). Product images taken from the live site, as WebP plus PNG |
| `fonts/` | No | Copies of the theme fonts so the preview renders correctly. The theme already loads them |
| `screens/` | No | Both slides at 360, 375, 390, 414, 768, 1024, 1180, 1200, 1280, 1440, 1600 and 1920, plus two contact sheets |

Test switches on `hero.html`: `?slide=2`, `?autoplay=0`, `?g3now=2026-12-12T00:00:00+11:00` (test date), `?focus=slider`, `?debug=1`.

## Slide box sizes

The theme's two-column hero starts at **1200px**, not 1024. Below 1200 the slide box is now set by the slide: 2:3 on phones (400 to 560 tall) and 2:1 from 640 wide (400 minimum). From 1200 it fills the column, whose height comes from the left panel.

| Viewport | Live site today | New slide | Ratio | Layout |
|---|---|---|---|---|
| 360 | 320 x 400 (formula) | 320 x 480 | 0.67 | C compact |
| 375 | 335 x 400 | 335 x 503 | 0.67 | C compact |
| 390 | 350 x 400 (formula) | 350 x 525 | 0.67 | C compact |
| 414 | 374 x 400 (formula) | 374 x 560 | 0.67 | C compact |
| 768 | 728 x 728 (formula) | 728 x 400 | 1.82 | A wide |
| 1024 | 976 x 976 | 984 x 492 | 2.00 | A wide |
| 1180 | 1132 x 1132 | 1140 x 570 | 2.00 | A wide |
| 1200 | 466 x 864 | 464 x 864 | 0.54 | C |
| 1280 | 499 x 769 | 497 x 769 | 0.65 | C |
| 1440 | 566 x 739 | 564 x 739 | 0.76 | C compact |
| 1600 | 633 x 699 | 630 x 699 | 0.90 | B |
| 1920 | 766 x 619 | 770 x 619 | 1.24 | A |

Layouts switch on the slide's own shape with container queries: C portrait under 0.85, B square-ish 0.85 to 1.15, A landscape from 1.15 (card beside the product), A wide from 1.6.

## Changes after the first review (9 Oct)

- Gemin3 logo removed from both slides; the headline now starts at the top.
- Stroke widths inside the slides halved (text outlines, starburst outline, card, tags, price, button, terms rule, white keyline). The slide's outer black frame is unchanged so it still matches the left hero panel.
- The sunburst rays turn slowly, one full turn every two minutes. This is the one looping animation (the brief said nothing loops). It pauses on the hidden slide and stops under reduced motion.
- Real logos and product images in place of the placeholders (see "Assets" below).

## Changes after the second review (9 Oct)

- Headlines restyled to match the current slide artwork: centred, near full width, white Super Corn with a heavier black outline and a stepped 3D shadow. The finance tag is now red lettering with a white keyline and black outline, overlapping the line above (no box).
- The cashback starburst is red on both slides and sits at the lower right of the product on both (slide 1 moved from top right so the headline can run full width).
- Products are larger. The offer card overlaps the product's lower left, and on landscape boxes the card sits beside the product under a full-width headline.
- General product image replaced with the one Gemin3 supplied (see "Assets").

## Changes after the third review (9 Oct)

- MHI product image replaced with the real MHI units, cut out of the current live MHI slide.
- Both products made as large as the slide allows. The product now runs down behind the offer card (the card overlaps its lower left, as on the print slides). Squarish images (`g3-promo--product-tall`, the MHI slide) sit full height beside the card on square and landscape boxes.
- A true 2x was not possible at most widths: the General image already filled about 85% of the slide width on phones and narrow desktop columns. Growth versus the previous version: MHI 1.1x to 1.85x (largest on phones and tablets), General 1.1x to 1.4x.
- Tradeoff: on phones and at 1440 the card now covers most of the MHI outdoor unit and the controller.

## Design calls made during the build (please review)

1. **Contrast.** White text on the brand red `#EA211A` is 4.44:1, just under AA. Fills behind white text use `#DE1F19` (4.87:1). White on sky blue `#24B3E8` is 2.42:1, so the price tag uses `#0E6FB8` (5.27:1) and slide 2's accent uses the theme's deep blue `#0A509F`.
2. **Starburst position.** Lower right of the product on both slides, matching the current General artwork, so the headline can run full width. The brief had slide 1 at top right.
3. **C compact.** On phones, squarer portrait boxes (1440 is 0.76) and landscape boxes, ENQUIRE NOW sits beside the price instead of full width, so the product stays large. At 1200 and 1280 it is full width, as specified.
4. **Terms.** Sentence-case terms and small print are set in Inter Tight semibold for legibility at 11px. The General line "OFFER VALID ON..." is in Super Corn.
6. **Product image.** One composite per brand (transparent WebP plus PNG, 1200px wide at most). Its proportions are set on the element (`--g3-cluster-r`), so any composite fits.
7. **A single remaining slide** hides its lone dot and stops autoplay.

## Phase A checks

| Check | Result |
|---|---|
| Copy matches section 5 word for word, both slides | Pass (scripted comparison) |
| No en or em dashes in any prototype file | Pass |
| No "Winter Offer", no FUJITSU, no 60 MONTHS | Pass |
| No overlap, clipping or covered text at all 12 widths, both slides, dots included | Pass (`audit.js`) |
| Minimum sizes: terms 11px, spec 13px, price 32px on mobile | Pass (smallest: terms 11, spec 13, price 34) |
| CLS | 0 at 375 and 1440 (headless Edge) |
| LCP image eager with high priority | Slide 1 product image, `fetchpriority="high"`; slide 2 lazy |
| Reduced motion | Autoplay off; starburst, price and ray animations off |
| Expiry | Both live to 11 Dec 23:59; slide 2 removed from 12 Dec; both gone from 1 Feb 2027 and the left panel spans the row |
| Keyboard | Only the visible slide's asterisk link and ENQUIRE NOW are in the tab order; focus ring is white inside black |
| Cross-browser (Safari iOS and macOS, Firefox) | Not tested yet. Chrome and Edge engines only |

## Assets

| Asset | Source | Status |
|---|---|---|
| MHI logo | `mhiaa.com.au` header logo, SVG | Official file, used unmodified. Includes the red AIR CONDITIONING bar |
| GENERAL logo | `generalww.com` header logo, SVG | Official file, used unmodified |
| MHI product cluster | Cut out of the current live MHI slide (`2026/07/Static-Fujitsu-Ducted-11.png`, 1080 x 1080 lossless), 603 x 562 | The flat yellow was keyed out and the card, headline, dots and panel border masked. The indoor unit's top corner is trimmed by a few pixels where the old headline overlapped it |
| General product cluster | Supplied by Gemin3 (`images/mitsubishi ducted.png`, 2093 x 1034), resized to 1200 x 593 | A strip of leftover background (orange) between the indoor and outdoor units was made transparent. The outdoor unit and controller still carry the FUJITSU badge |

The supplied file named `mitsubishi ducted.png` actually shows the General Airstage units, so it is used on slide 2 only. A 1200px MHI cut-out from the designer's source file would still be better than the one cut from the slide.

## Found during the build

- `../Ducted Landing Page/Logo.svg`, which the brief lists as the Gemin3 logo, is the **Canberra Air** logo. It is not used anywhere.
- The live site has no Gemin3 SVG. The header uses `wp-content/uploads/2025/11/logo.png` (3.3 KB, shown at 167 x 48), which will look soft at slide sizes. An SVG is needed.
- The product images in the Ducted Landing Page assets are generic stock and a Daikin controller, so they are not usable.
- The live site has no GENERAL logo yet; its brand pages still use FUJITSU.

## Before Phase B

- Access to the `aiims` theme repo and a staging site. The front page uses `page-templates/front-page.php`; ACF is installed, but whether the hero slides come from ACF can only be confirmed in the theme.
- Check how LiteSpeed's JS settings order inline scripts, so the expiry script still runs before slick starts.
- High-resolution product cut-outs for both systems.
