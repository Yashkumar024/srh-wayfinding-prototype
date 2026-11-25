/* Phone route page — opened by the kiosk QR code (route.html#<destination>).
   Hash states: ""            → destination list
                "#c102"       → route overview
                "#c102/1".."5"→ step n
                "#c102/arrived" → arrival
   The student moves forward manually; there is no GPS or location tracking. */
(function () {
  const W = window.WFS;
  W.setReal(true);
  const app = document.getElementById('app');

  function parse() {
    const [id, part] = decodeURIComponent(location.hash.replace(/^#/, '')).split('/');
    const route = W.R[id];
    if (!id || !route || !W.byId(id)) return { view: 'list' };
    if (part === 'arrived') return { view: 'arrived', id };
    const n = parseInt(part, 10);
    if (n >= 1 && n <= route.steps.length) return { view: 'step', id, i: n - 1 };
    return { view: 'overview', id };
  }

  function listScreen() {
    const body = `
      <h1>Where would you like to go?</h1>
      <p class="start-row"><span class="dot"></span>You are at the university entrance</p>
      <div class="phone-dest-list">
        ${W.D.map((d) => `<a class="dest-btn" href="#${d.id}"><span class="ic">${W.icon[d.icon]}</span><span class="lbl">${d.name}</span><span class="go">${W.icon.arrowR}</span></a>`).join('')}
      </div>
      <p class="placeholder-note real-note">Student design prototype. Routes are illustrative placeholders, not verified SRH campus directions.</p>`;
    return W.phoneChrome(null, body);
  }

  function render() {
    const s = parse();
    let html, title;
    if (s.view === 'list') { html = listScreen(); title = 'Choose a destination'; }
    else if (s.view === 'overview') { html = W.phoneOverview(s.id); title = `Route to ${W.byId(s.id).name}`; }
    else if (s.view === 'step') { html = W.phoneStep(s.id, s.i); title = `Step ${s.i + 1} · ${W.byId(s.id).name}`; }
    else { html = W.phoneArrival(s.id); title = `Arrived · ${W.byId(s.id).name}`; }
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
    const n = s.id ? W.R[s.id].steps.length : 0;
    const a = b.dataset.act;
    if (a === 'start') location.hash = `#${s.id}/1`;
    else if (a === 'next') location.hash = s.i + 1 < n ? `#${s.id}/${s.i + 2}` : `#${s.id}/arrived`;
    else if (a === 'prev') location.hash = s.i > 0 ? `#${s.id}/${s.i}` : `#${s.id}`;
    else if (a === 'done') location.hash = '';
  });

  window.addEventListener('hashchange', render);
  render();
})();
