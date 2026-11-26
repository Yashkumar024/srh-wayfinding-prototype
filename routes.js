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
 *   - map.path      schematic map points in a 300 × 200 grid
 *                   (entrance is at 150,192; corridors at x=150, y=55, y=110)
 *   - steps[].photo optional photo of that step, e.g. "photos/b102-lift-3.jpg"
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
  { id: "c102",  name: "Room C 1.02",             de: "Raum C 1.02",                 icon: "room"  },
  { id: "b102",  name: "Room B 1.02",             de: "Raum B 1.02",                 icon: "room"  },
  { id: "lib",   name: "Library",                 de: "Bibliothek",                  icon: "book"  },
  { id: "event", name: "Event Space · 5th floor", de: "Veranstaltungsraum · 5. OG", icon: "event" },
  { id: "service", name: "Service Hub · 1st floor", de: "Service Hub · 1. OG",     icon: "service" },
];

window.ROUTES = {
  c102: {
    time: "~4 min", dist: "~180 m",
    map: { path: [[150, 192], [150, 110], [245, 110]], floor: "1" },
    steps: [
      { dir: "straight", text: "Walk 100 metres straight ahead." },
      { dir: "right",    text: "Turn right at the door marked “C”." },
      { dir: "straight", text: "Continue through the corridor." },
      { dir: "left",     text: "Turn left at the next junction." },
      { dir: "door",     text: "Go through the door to Room C 1.02." },
    ],
  },
  b102: {
    time: "~3 min", dist: "~140 m",
    map: { path: [[150, 192], [150, 55], [55, 55]], floor: "1" },
    steps: [
      { dir: "straight", text: "Walk straight ahead into the foyer." },
      { dir: "up",       text: "Take the stairs up one floor to level 1." },
      { dir: "left",     text: "Turn left at the corridor." },
      { dir: "right",    text: "Turn right at the door marked “B”." },
      { dir: "door",     text: "Go through the door to Room B 1.02." },
    ],
    stepFree: {
      time: "~4 min", dist: "~160 m",
      steps: [
        { dir: "straight", text: "Walk straight ahead into the foyer." },
        { dir: "right",    text: "Turn right to the lifts." },
        { dir: "lift",     text: "Take the lift up to level 1." },
        { dir: "left",     text: "Leave the lift and turn left at the corridor." },
        { dir: "right",    text: "Turn right at the door marked “B”." },
        { dir: "door",     text: "Go through the door to Room B 1.02." },
      ],
    },
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
