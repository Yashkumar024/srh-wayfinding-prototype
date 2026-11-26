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
 *   - stepFree      only for routes whose main version uses stairs. The phone
 *                   asks first whether the student needs a step-free route
 *                   (lift) or is fine with the stairs. Same fields as above.
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
};
