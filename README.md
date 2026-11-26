# Campus Berlin Wayfinding

A wayfinding prototype for the SRH University Berlin entrance. A portrait touchscreen kiosk stands outside the main entrance. A student picks one of four destinations, scans the QR code with their phone camera, and follows step-by-step walking directions in their phone's web browser.

> **Student design prototype.** All maps, steps, distances and times are **illustrative placeholders**, except the **Service Hub** route: a real, walked route with a photo for every step, shared by classmates in the course group chat. No verified campus floor plan was available. This is not an official SRH service.

**Live:** https://yashkumar024.github.io/srh-wayfinding-prototype/

| Page | What it is |
|---|---|
| [`kiosk.html`](https://yashkumar024.github.io/srh-wayfinding-prototype/kiosk.html) | Full-screen 9:16 kiosk app. Four destination buttons in the seated-reach zone, EN/DE, help, and a **real QR code** for each destination. Resets to the welcome screen after 60 seconds without a touch. |
| [`route.html`](https://yashkumar024.github.io/srh-wayfinding-prototype/route.html) | Phone route opened by the QR code (`route.html#cube`, `#lib`, `#event`, `#service`). Route overview, one step at a time with a progress bar, then arrival. Routes that use stairs (Event Space, Service Hub) first ask whether you need a **step-free route** with the lift (`#event/lift`) or are fine with stairs (`#event/stairs`). The browser Back button works. |
| [`index.html`](https://yashkumar024.github.io/srh-wayfinding-prototype/) | Design review page: user flow, low-fi wireframes, hi-fi screens, click-through, and accessibility notes. |

## Try it

1. Open the kiosk page on a laptop or tablet.
2. Tap a destination.
3. Scan the QR code with your phone camera. The route opens in your phone's browser.

There is no GPS, camera access, backend or route calculation. The student moves forward through the steps with **Next step**.

## Run locally

```bash
python3 -m http.server 4321
```

Then open http://localhost:4321. The QR codes always point to the live site, because a phone can't reach `localhost` on your computer.

## Files

| File | Purpose |
|---|---|
| `routes.js` | **All route content**: destinations, steps, times, distances, map paths, step-free (lift) alternatives, and the floors not used by the university (`NOT_SRH_FLOORS`, shown greyed out). Placeholders; replace these with verified directions. |
| `qr-codes.js` | Real QR codes for the four route URLs (generated, don't edit by hand) |
| `screens.js` | Shared screen renderers used by all three pages |
| `kiosk.js`, `route.js`, `app.js` | Page logic for the kiosk, the phone route and the review page |
| `styles.css` | Visual tokens (orange `#F26A21`, charcoal, warm white, stone) and layouts |
| `photos/` | Your own step photos (optional). See [`photos/README.md`](photos/README.md) for naming and how to link them. |
| `tools/make-qr.swift` | Regenerates `qr-codes.js` on macOS using the built-in CoreImage QR encoder |

If the site moves to another address, regenerate the QR codes:

```bash
swift tools/make-qr.swift https://NEW-ADDRESS/route.html > qr-codes.js
```

## Before real use

- Replace the placeholder routes in `routes.js` with verified directions, including step-free routes.
- Check the kiosk mounting height and reachable touch area on site with wheelchair users. The seated-reach zone in this design is a design intent, not a measured specification.
- Confirm the Reception location and contact details for the Help screen.
