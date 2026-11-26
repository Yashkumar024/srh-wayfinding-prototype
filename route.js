/* Phone route page — opened by the kiosk QR code (route.html#<destination>).
   Hash states: ""            → destination list
                "#cube"       → route overview
                "#cube/1".."5"→ step n
                "#cube/arrived" → arrival
   Routes with stairs (event, service) first ask for step-free or stairs:
                "#event"      → choice screen
                "#event/lift" or "#event/stairs" → overview, then
                "#event/lift/1".., "#event/lift/arrived"
   The student moves forward manually; there is no GPS or location tracking. */
(function () {
  const W = window.WFS;
  W.setReal(true);
  const app = document.getElementById('app');

  function parse() {
    const parts = decodeURIComponent(location.hash.replace(/^#/, '')).split('/');
    const id = parts[0];
    if (!id || !W.R[id] || !W.byId(id)) return { view: 'list' };
    let mode = null, part = parts[1];
    if (W.needsChoice(id)) {
      if (parts[1] !== 'lift' && parts[1] !== 'stairs') return { view: 'choice', id };
      mode = parts[1]; part = parts[2];
    }
    const route = W.routeOf(id, mode);
    const base = mode ? `#${id}/${mode}` : `#${id}`;
    if (part === 'arrived') return { view: 'arrived', id, mode, base };
    const n = parseInt(part, 10);
    if (n >= 1 && n <= route.steps.length) return { view: 'step', id, mode, base, i: n - 1 };
    return { view: 'overview', id, mode, base };
  }

  function listScreen() {
    const body = `
      <h1>Where would you like to go?</h1>
      <p class="start-row"><span class="dot"></span>You are at the university entrance</p>
      <div class="phone-dest-list">
        ${W.D.map((d) => `<a class="dest-btn" href="#${d.id}"><span class="ic">${W.icon[d.icon]}</span><span class="lbl">${d.name}</span><span class="go">${W.icon.arrowR}</span></a>`).join('')}
      </div>
      <div class="building-card">
        ${W.floorsSVG(null, { note: true })}
        <p><b>Our building</b>The university uses the ground floor, floor 1 and floors 4–5. Floors 2 and 3 (grey) belong to other tenants.</p>
      </div>
      <p class="placeholder-note real-note">Student design prototype. Routes are illustrative placeholders, not verified SRH campus directions.</p>`;
    return W.phoneChrome(null, body);
  }

  function render() {
    const s = parse();
    let html, title;
    if (s.view === 'list') { html = listScreen(); title = 'Choose a destination'; }
    else if (s.view === 'choice') { html = W.phoneAccessChoice(s.id); title = `Step-free or stairs? · ${W.byId(s.id).name}`; }
    else if (s.view === 'overview') { html = W.phoneOverview(s.id, s.mode); title = `Route to ${W.byId(s.id).name}`; }
    else if (s.view === 'step') { html = W.phoneStep(s.id, s.i, s.mode); title = `Step ${s.i + 1} · ${W.byId(s.id).name}`; }
    else { html = W.phoneArrival(s.id, s.mode); title = `Arrived · ${W.byId(s.id).name}`; }
    app.innerHTML = html;
    document.title = `${title} · Campus Berlin Wayfinding`;
    window.scrollTo(0, 0);
    const focusEl = app.querySelector('.instruction, h1');
    if (focusEl) { focusEl.setAttribute('tabindex', '-1'); focusEl.focus({ preventScroll: true }); }
  }

  app.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    if (!b) return;
    const s = parse();
    const n = s.base ? W.routeOf(s.id, s.mode).steps.length : 0;
    const a = b.dataset.act;
    if (a === 'view') { W.setStepView(b.dataset.v); render(); return; }
    else if (a === 'mode') location.hash = `#${s.id}/${b.dataset.v}`;
    else if (a === 'choose') location.hash = `#${s.id}`;
    else if (a === 'start') location.hash = `${s.base}/1`;
    else if (a === 'next') location.hash = s.i + 1 < n ? `${s.base}/${s.i + 2}` : `${s.base}/arrived`;
    else if (a === 'prev') location.hash = s.i > 0 ? `${s.base}/${s.i}` : s.base;
    else if (a === 'done') location.hash = '';
  });

  window.addEventListener('hashchange', render);
  render();
})();
