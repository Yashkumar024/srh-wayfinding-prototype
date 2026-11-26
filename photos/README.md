# Step photos

Put your own photos of each route step in this folder. A step with a photo
shows the photo (with a small direction arrow in the corner) above the
instruction. Steps without a photo keep the large orange arrow. On the phone,
a **Photos / Text** switch appears as soon as a route has at least one photo.

## 1. Take the photos

- Walk each route from the kiosk and take **one photo per step**, standing
  where the student would be when they read that step, facing the way they
  should walk.
- Landscape, 4:3. The photo is cropped to 4:3 on the phone.
- Make each photo about **1200 px wide** and keep it under ~300 KB
  (on macOS: `sips -Z 1200 IMG_1234.jpg`).
- Avoid recognisable people, or ask them first.

## 2. Name the files

`<destination>-<step>.jpg`, plus `-lift` or `-stairs` for routes that have both:

| Route | Files |
|---|---|
| The Cube | `cube-1.jpg` … `cube-5.jpg` |
| Library | `lib-1.jpg` … `lib-5.jpg` |
| Event Space, step-free | `event-lift-1.jpg` … `event-lift-6.jpg` |
| Event Space, stairs | `event-stairs-1.jpg` … `event-stairs-5.jpg` |
| Service Hub | already added: `service-1.jpg` … `service-9.jpg`, `service-stairs.jpg` |

Steps that are the same on both versions (for example, step 1 "Walk straight
ahead into the foyer") can point to the same file.

## 3. Link them in `routes.js`

Add `photo` (and optionally a short `photoAlt`) to the step:

```js
{ dir: "lift", text: "Take the lift up to the 5th floor.",
  photo: "photos/event-lift-3.jpg", photoAlt: "Two lift doors next to the stairs" },
```

If a file name is wrong or the file is missing, that step falls back to the
arrow, so nothing breaks.
