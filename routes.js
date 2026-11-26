/*
 * PLACEHOLDER ROUTE CONTENT — ILLUSTRATIVE ONLY
 * ------------------------------------------------
 * No verified SRH Campus Berlin floor plan or directions were available when
 * this prototype was made. Every step, distance, time and map path below is
 * invented for layout purposes and must NOT be used as real directions.
 *
 * To update with verified information, edit only this file:
 *   - steps[].dir   one of: straight | right | left | door | up | arrive
 *   - steps[].text  the instruction shown in large type on the phone
 *   - time / dist   estimates shown on the route overview
 *   - map.outside   true when the destination is a separate building
 *   - map.label     name drawn under that separate building
 *   - map.path      schematic map points in a 300 × 200 grid
 *                   (entrance is at 150,192; corridors at x=150, y=55, y=110)
 *   - steps[].photo optional photo of that step, e.g. "photos/event-lift-3.jpg"
 *                   (see photos/README.md). Steps without a photo show the
 *                   large direction arrow instead.
 *   - steps[].photoAlt optional short description of the photo
 *   - stepFree      only for routes whose main version uses stairs. The phone
 *                   asks first whether the student needs a step-free route
 *                   (lift) or is fine with the stairs. Same fields as above.
 *
 * EXCEPTION: the Service Hub route is a real, walked route. Its steps and
 * photos were shared by classmates in the course group chat (originally made
 * for their own wayfinding prototype) and are credited on screen via `credit`.
 *
 * Floors 2 and 3 of the building are not used by the university
 * (see NOT_SRH_FLOORS); they are shown greyed out.
 */
window.NOT_SRH_FLOORS = ["2", "3"];

window.DESTINATIONS = [
  { id: "cube",  name: "The Cube",                de: "The Cube",                    icon: "cube"  },
  { id: "lib",   name: "Library",                 de: "Bibliothek",                  icon: "book"  },
  { id: "event", name: "Event Space · 5th floor", de: "Veranstaltungsraum · 5. OG", icon: "event" },
  { id: "service", name: "Service Hub · 1st floor", de: "Service Hub · 1. OG",     icon: "service" },
];

window.ROUTES = {
  cube: {
    // The Cube is a separate building, so this route leaves the main building. No stairs.
    time: "~4 min", dist: "~200 m",
    map: { path: [[150, 192], [205, 192], [205, 69], [222, 69]], floor: "Cube", label: "The Cube", outside: true },
    steps: [
      { dir: "straight", text: "From the kiosk, walk straight ahead across the forecourt." },
      { dir: "right",    text: "Turn right onto the footpath along the main building." },
      { dir: "straight", text: "Follow the footpath to the separate building, The Cube." },
      { dir: "left",     text: "Turn left at the corner towards the entrance of The Cube." },
      { dir: "door",     text: "Go through the main door into The Cube." },
    ],
  },
  lib: {
    time: "~2 min", dist: "~90 m",
    map: { path: [[150, 192], [150, 110], [45, 110]], floor: "G" },
    steps: [
      { dir: "straight", text: "Walk straight ahead through the entrance." },
      { dir: "right",    text: "Turn right at the corridor." },
      { dir: "straight", text: "Continue straight past the doors." },
      { dir: "left",     text: "Turn left at the next junction." },
      { dir: "door",     text: "Go through the door to the Library." },
    ],
  },
  event: {
    time: "~6 min", dist: "~120 m",
    map: { path: [[150, 192], [150, 55], [255, 55]], floor: "5" },
    steps: [
      { dir: "straight", text: "Walk straight ahead into the foyer." },
      { dir: "up",       text: "Take the stairs up to the 5th floor." },
      { dir: "left",     text: "Turn left at the corridor." },
      { dir: "straight", text: "Continue to the end of the corridor." },
      { dir: "door",     text: "Go through the door to the Event Space." },
    ],
    stepFree: {
      time: "~5 min", dist: "~140 m",
      steps: [
        { dir: "straight", text: "Walk straight ahead into the foyer." },
        { dir: "right",    text: "Turn right to the lifts." },
        { dir: "lift",     text: "Take the lift up to the 5th floor." },
        { dir: "left",     text: "Leave the lift and turn left at the corridor." },
        { dir: "straight", text: "Continue to the end of the corridor." },
        { dir: "door",     text: "Go through the door to the Event Space." },
      ],
    },
  },
  service: {
    // Real route with photos, shared by classmates (see the note at the top of this file).
    real: true,
    credit: "Route and photos shared by classmates in the course group chat.",
    time: "~3 min", dist: "1 floor up",
    map: { path: [[150, 192], [150, 110], [150, 55], [45, 55]], floor: "1" },
    steps: [
      { dir: "straight", text: "Walk through the main entrance to the Welcome Desk." },
      { dir: "straight", text: "From the Welcome Desk, walk past the café towards the “Service Hub” sign.", photo: "photos/service-1.jpg", photoAlt: "Café with long tables; an orange “Service Hub” sign hangs at the far end" },
      { dir: "door",     text: "Go through the door under the “Service Hub” sign into the corridor.", photo: "photos/service-2.jpg", photoAlt: "Orange “Service Hub” sign above an open door" },
      { dir: "left",     text: "Turn left at the big “B”.", photo: "photos/service-3.jpg", photoAlt: "Concrete wall with a large letter B and a “Service Hub” sign pointing left" },
      { dir: "straight", text: "Follow the “Service Hub” sign through the glass door to the stairs.", photo: "photos/service-4.jpg", photoAlt: "Corridor with a “Service Hub” sign and a glass door at the end" },
      { dir: "up",       text: "Take the stairs next to the lifts up to the 1st floor.", photo: "photos/service-stairs.jpg", photoAlt: "Stairwell door marked EG with a floor plan of building B" },
      { dir: "left",     text: "At the top, turn left towards the “Service Hub” sign.", photo: "photos/service-7.jpg", photoAlt: "1st floor landing marked OG 1 with a “Service Hub” sign on the left" },
      { dir: "door",     text: "Go through the glass door.", photo: "photos/service-8.jpg", photoAlt: "Glass double door next to a large “Service Hub” sign" },
      { dir: "arrive",   text: "The open area with the “Service Hub” sign is your destination.", photo: "photos/service-9.jpg", photoAlt: "Open office area with desks and a “Service Hub” sign" },
    ],
    stepFree: {
      time: "~3 min", dist: "lift to 1st floor",
      steps: [
        { dir: "straight", text: "Walk through the main entrance to the Welcome Desk." },
        { dir: "straight", text: "From the Welcome Desk, walk past the café towards the “Service Hub” sign.", photo: "photos/service-1.jpg", photoAlt: "Café with long tables; an orange “Service Hub” sign hangs at the far end" },
        { dir: "door",     text: "Go through the door under the “Service Hub” sign into the corridor.", photo: "photos/service-2.jpg", photoAlt: "Orange “Service Hub” sign above an open door" },
        { dir: "left",     text: "Turn left at the big “B”.", photo: "photos/service-3.jpg", photoAlt: "Concrete wall with a large letter B and a “Service Hub” sign pointing left" },
        { dir: "straight", text: "Follow the “Service Hub” sign through the glass door to the lifts.", photo: "photos/service-4.jpg", photoAlt: "Corridor with a “Service Hub” sign and a glass door at the end" },
        { dir: "lift",     text: "Call one of the two lifts.", photo: "photos/service-5.jpg", photoAlt: "Two steel lift doors" },
        { dir: "lift",     text: "Press 1 and ride up to the 1st floor.", photo: "photos/service-6.jpg", photoAlt: "Lift button panel with floors −1 to 5" },
        { dir: "left",     text: "Leave the lift and turn left towards the “Service Hub” sign.", photo: "photos/service-7.jpg", photoAlt: "1st floor landing marked OG 1 with a “Service Hub” sign on the left" },
        { dir: "door",     text: "Go through the glass door.", photo: "photos/service-8.jpg", photoAlt: "Glass double door next to a large “Service Hub” sign" },
        { dir: "arrive",   text: "The open area with the “Service Hub” sign is your destination.", photo: "photos/service-9.jpg", photoAlt: "Open office area with desks and a “Service Hub” sign" },
      ],
    },
  },
};
