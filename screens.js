/* Shared screen renderers for the review page, the kiosk app and the phone route.
   No GPS, no camera, no backend: routes are illustrative placeholders from routes.js. */
window.WFS = (function () {
  const D = window.DESTINATIONS;
  const R = window.ROUTES;
  const byId = (id) => D.find((d) => d.id === id);
  const $ = (s, el = document) => el.querySelector(s);

  const T = {
    en: {
      welcome: 'Welcome to <span>Campus Berlin</span>',
      where: "Where would you like to go?",
      help: "Need help?", reception: "Reception",
      routeTo: "Route to",
      scan: "Scan with your phone camera to open this route.",
      noApp: "No app needed. The route opens in your phone’s web browser.",
      phoneNote: "Step-by-step directions will appear on your phone.",
      back: "Back to destinations",
      here: "You are here: outside the main entrance",
      entrance: "Main entrance",
      helpTitle: "Need help?",
      helpBody: "Please ask at Reception. Staff can guide you to your destination.",
      helpNote: "Reception location and contact details to be confirmed.",
      close: "Close",
    },
    de: {
      welcome: 'Willkommen am <span>Campus Berlin</span>',
      where: "Wohin möchten Sie?",
      help: "Hilfe?", reception: "Empfang",
      routeTo: "Route zu",
      scan: "Mit der Handykamera scannen, um diese Route zu öffnen.",
      noApp: "Keine App nötig. Die Route öffnet sich im Browser Ihres Handys.",
      phoneNote: "Die Wegbeschreibung erscheint Schritt für Schritt auf Ihrem Handy.",
      back: "Zurück zur Zielauswahl",
      here: "Sie sind hier: vor dem Haupteingang",
      entrance: "Haupteingang",
      helpTitle: "Brauchen Sie Hilfe?",
      helpBody: "Bitte fragen Sie am Empfang. Das Team hilft Ihnen gern weiter.",
      helpNote: "Ort und Kontakt des Empfangs werden noch bestätigt.",
      close: "Schließen",
    },
  };

  /* ---------- Icons ---------- */
  const icon = {
    room: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M5 21V3h11v18"/><path d="M16 5h3v16"/><circle cx="12.5" cy="12" r="1.2" fill="currentColor"/><path d="M3 21h18"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M4 4h6a2 2 0 0 1 2 2v15a2 2 0 0 0-2-2H4z"/><path d="M20 4h-6a2 2 0 0 0-2 2v15a2 2 0 0 1 2-2h6z"/></svg>',
    event: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"><path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/></svg>',
    arrowR: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"><path d="M4 12h15M13 5l7 7-7 7"/></svg>',
    arrowL: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="square"><path d="M20 12H5M11 5l-7 7 7 7"/></svg>',
    phone: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="6" y="2" width="12" height="20" rx="2.5"/><path d="M10 18.5h4"/></svg>',
    pin: '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s-7-7.4-7-12.5a7 7 0 0 1 14 0C19 14.6 12 22 12 22z"/><circle cx="12" cy="9.5" r="2.6" fill="#1F1D1B"/></svg>',
    check: '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="square"><path d="M4 12.5l5 5L20 6.5"/></svg>',
    lock: '<svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M7 10V7a5 5 0 0 1 10 0v3h1v12H6V10zm2 0h6V7a3 3 0 0 0-6 0z"/></svg>',
    camera: '<svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 7h4l2-3h6l2 3h4v13H3z"/><circle cx="12" cy="13" r="4"/></svg>',
  };

  /* Large direction symbols for the phone steps */
  function dirSVG(dir, cls = "big") {
    const s = 'fill="none" stroke="currentColor" stroke-width="13" stroke-linecap="square" stroke-linejoin="miter"';
    const p = {
      straight: `<path ${s} d="M50 92 V22"/><path ${s} d="M24 46 L50 20 L76 46"/>`,
      right: `<path ${s} d="M30 92 V50 H76"/><path ${s} d="M56 26 L80 50 L56 74"/>`,
      left: `<path ${s} d="M70 92 V50 H24"/><path ${s} d="M44 26 L20 50 L44 74"/>`,
      door: `<path fill="none" stroke="currentColor" stroke-width="7" d="M22 94 V8 H78 V94"/><path ${s} stroke-width="11" d="M50 84 V36"/><path ${s} stroke-width="11" d="M32 54 L50 34 L68 54"/>`,
      up: `<path ${s} stroke-width="9" d="M8 92 H28 V72 H48 V52 H68 V32 H92"/><path ${s} stroke-width="10" d="M30 40 V8"/><path ${s} stroke-width="10" d="M16 22 L30 8 L44 22"/>`,
      arrive: `<path fill="currentColor" d="M50 96 S20 62 20 40 a30 30 0 0 1 60 0 c0 22-30 56-30 56z"/><circle cx="50" cy="40" r="11" fill="#F26A21"/>`,
    }[dir];
    return `<svg class="${cls}" viewBox="0 0 100 100" aria-hidden="true">${p}</svg>`;
  }

  /* Schematic map — illustrative only */
  function mapSVG(destId, { wf = false } = {}) {
    const r = R[destId];
    const blocks = [[15, 12, 125, 32], [160, 12, 125, 32], [15, 68, 125, 32], [160, 68, 125, 32], [15, 122, 125, 52], [160, 122, 125, 52]];
    const blockFill = wf ? "#fff" : "#FBF8F4";
    const blockStroke = wf ? "#9a9a9a" : "#E2DCD3";
    const route = wf ? "#444" : "#F26A21";
    const pts = r.map.path.map((p) => p.join(",")).join(" ");
    const end = r.map.path[r.map.path.length - 1];
    const d = byId(destId);
    return `<svg viewBox="0 0 300 205" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Illustrative schematic map, not to scale">
      <rect width="300" height="205" fill="${wf ? "#f3f3f3" : "#EFEBE5"}"/>
      ${blocks.map((b) => `<rect x="${b[0]}" y="${b[1]}" width="${b[2]}" height="${b[3]}" rx="5" fill="${blockFill}" stroke="${blockStroke}" stroke-width="1.5"/>`).join("")}
      <polyline points="${pts}" fill="none" stroke="${route}" stroke-width="6" stroke-dasharray="${wf ? "6 5" : "0"}" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="150" cy="192" r="8" fill="${wf ? "#fff" : "#1F1D1B"}" stroke="${wf ? "#222" : "#fff"}" stroke-width="3"/>
      <text x="164" y="197" font-size="11" font-weight="700" font-family="Inter, Arial" fill="#1F1D1B">Entrance</text>
      <g transform="translate(${end[0] - 12},${end[1] - 30})">
        <path d="M12 30 S0 17 0 11 a12 12 0 0 1 24 0 c0 6-12 19-12 19z" fill="${wf ? "#444" : "#1F1D1B"}"/>
        <circle cx="12" cy="11" r="4.5" fill="${wf ? "#fff" : "#F26A21"}"/>
      </g>
      <g transform="translate(232,176)">
        <rect width="58" height="22" rx="6" fill="${wf ? "#444" : "#1F1D1B"}"/>
        <text x="29" y="15" text-anchor="middle" font-size="11" font-weight="800" font-family="Inter, Arial" fill="#fff">Floor ${r.map.floor}</text>
      </g>
    </svg>`;
  }

  /* Stacked floors illustration (inspired by the mood board kiosk) */
  function floorsSVG(highlight) {
    const labels = ["G", "1", "2", "3", "4", "5"];
    let g = "";
    labels.forEach((lab, i) => {
      const y = 200 - i * 30;
      const hl = highlight === lab;
      const top = hl ? "#1F1D1B" : i % 2 ? "#F58A4F" : "#F26A21";
      const side = hl ? "#000" : "#C9501A";
      const side2 = hl ? "#2b2b2b" : "#E0601E";
      g += `<polygon points="10,${y} 120,${y - 42} 230,${y} 120,${y + 42}" fill="${top}"/>
            <polygon points="10,${y} 120,${y + 42} 120,${y + 50} 10,${y + 8}" fill="${side}"/>
            <polygon points="230,${y} 120,${y + 42} 120,${y + 50} 230,${y + 8}" fill="${side2}"/>
            <text x="244" y="${y + 6}" font-size="13" font-weight="800" font-family="Inter, Arial" fill="#1F1D1B">${lab}</text>`;
    });
    return `<svg class="floors" viewBox="0 0 260 260" aria-hidden="true">${g}</svg>`;
  }

  /* Real QR code (from qr-codes.js, generated by tools/make-qr.swift) with a 4-module quiet zone */
  function qrSVG(destId) {
    const q = (window.QR_CODES || {})[destId];
    if (!q) return '<svg viewBox="0 0 10 10" role="img" aria-label="QR code missing"><rect width="10" height="10" fill="#fff"/></svg>';
    const n = q.rows.length, pad = 4;
    let path = "";
    q.rows.forEach((row, y) => { for (let x = 0; x < n; x++) if (row[x] === "1") path += `M${x + pad} ${y + pad}h1v1h-1z`; });
    return `<svg viewBox="0 0 ${n + pad * 2} ${n + pad * 2}" shape-rendering="crispEdges" role="img" aria-label="QR code that opens the route on your phone"><rect width="${n + pad * 2}" height="${n + pad * 2}" fill="#fff"/><path fill="#1F1D1B" d="${path}"/></svg>`;
  }
  const routeUrl = (destId) => ((window.QR_CODES || {})[destId] || {}).url || `route.html#${destId}`;

  const wordmark = '<div class="wordmark"><span class="mark">SRH</span>University · Campus Berlin</div>';
  const reachOverlay = '<div class="reach-overlay"><span>Seated-reach interaction zone (to be validated on site)</span></div>';

  /* ---------- Kiosk: hi-fi ---------- */
  function kioskBottom(lang) {
    const t = T[lang];
    return `<div class="k-bottom">
      <button class="help-btn" data-act="help"><span class="q">?</span>${t.help} <small>${t.reception}</small></button>
      <div class="lang" role="group" aria-label="Language">
        <button data-act="lang" data-v="en" aria-pressed="${lang === "en"}">EN</button>
        <button data-act="lang" data-v="de" aria-pressed="${lang === "de"}">DE</button>
      </div>
    </div>`;
  }
  function helpSheet(lang) {
    const t = T[lang];
    return `<div class="help-sheet"><h2>${t.helpTitle}</h2><p>${t.helpBody}</p><p style="font-size:14px;color:#a9a39c">${t.helpNote}</p>
      <button class="back-btn" data-act="closehelp">${t.close}</button></div>`;
  }

  function kioskWelcome({ lang = "en", pressed = null, help = false } = {}) {
    const t = T[lang];
    return `<div class="kiosk">
      <div class="k-top k-hero">
        <div class="k-bar">${wordmark}<div class="loc"><span class="dot"></span>${t.entrance}</div></div>
        <h1>${t.welcome}</h1>
        ${floorsSVG()}
        <span class="illus-tag">Illustrative</span>
        <div class="here"><span class="dot"></span>${t.here}</div>
      </div>
      <div class="k-reach">
        <p class="k-prompt">${t.where}</p>
        <div class="dest-list">
          ${D.map((d) => `<button class="dest-btn ${pressed === d.id ? "pressed" : ""}" data-act="select" data-v="${d.id}">
            <span class="ic">${icon[d.icon]}</span><span class="lbl">${lang === "de" ? d.de : d.name}</span><span class="go">${icon.arrowR}</span></button>`).join("")}
        </div>
        ${kioskBottom(lang)}
        ${help ? helpSheet(lang) : ""}
      </div>
      ${reachOverlay}
    </div>`;
  }

  function kioskQR(destId, { lang = "en", help = false } = {}) {
    const t = T[lang];
    const d = byId(destId);
    const name = lang === "de" ? d.de : d.name;
    return `<div class="kiosk">
      <div class="k-top k-route">
        <div class="k-bar" style="margin-top:-16px">${wordmark}<div class="loc"><span class="dot"></span>${t.entrance}</div></div>
        <div style="margin-top:14px" class="eyebrow">${t.routeTo}</div>
        <h1 class="${name.length > 16 ? "long" : ""}"><span class="accent">${name}</span></h1>
        <div class="map-wrap">${mapSVG(destId)}<span class="illus-tag">Illustrative route · not to scale</span></div>
      </div>
      <div class="k-reach">
        <div class="qr-card">
          <div class="qr-box">${qrSVG(destId)}</div>
          <div class="qr-text"><div class="scan-ic">${icon.phone}</div><b>${t.scan}</b><p>${t.noApp}</p></div>
        </div>
        <p class="phone-note">${t.phoneNote}</p>
        <button class="back-btn" data-act="back">${icon.arrowL}${t.back}</button>
        ${kioskBottom(lang)}
        ${help ? helpSheet(lang) : ""}
      </div>
      ${reachOverlay}
    </div>`;
  }

  /* ---------- Phone: hi-fi ---------- */
  // real = true renders for an actual phone browser (no mock status bar or address bar)
  let real = false;
  const setReal = (v) => { real = !!v; };
  function phoneChrome(destId, body, foot = "") {
    const d = destId ? byId(destId) : null;
    return `<div class="phone${real ? " real" : ""}">
      ${real ? "" : `<div class="p-status"><span>9:41</span><span class="icons"><i style="width:17px;height:10px"></i><i style="width:15px;height:10px;border-radius:50%"></i><i style="width:24px;height:11px;border-radius:3px"></i></span></div>
      <div class="p-url">${icon.lock} campus-route.example${d ? "/" + d.id : ""}</div>`}
      <div class="p-head"><div class="wordmark"><span class="mark">SRH</span>Wayfinding</div>
        ${d ? `<span class="dest-pill" title="${d.name}">${icon.pin}<span class="pill-txt">${d.name}</span></span>` : ""}</div>
      <div class="p-body">${body}</div>
      ${foot ? `<div class="p-foot">${foot}</div>` : ""}
    </div>`;
  }

  function phoneWaiting() {
    return phoneChrome(null, `<div class="waiting"><div class="cam">${icon.camera}</div>
      <b>Scan the kiosk QR code</b><span>Open your phone camera and point it at the QR code on the kiosk screen.</span></div>`);
  }

  function phoneOverview(destId) {
    const d = byId(destId), r = R[destId];
    return phoneChrome(destId, `
      <h1>Route to <span class="accent">${d.name}</span></h1>
      <div class="start-row"><span class="dot"></span>You are at the university entrance</div>
      <div class="map-wrap">${mapSVG(destId)}<span class="illus-tag">Illustrative route · not to scale</span></div>
      <div class="stats">
        <div class="stat"><b>${r.time}</b><span>walk</span></div>
        <div class="stat"><b>${r.dist}</b><span>distance</span></div>
        <div class="stat"><b>${r.steps.length}</b><span>steps</span></div>
      </div>
      <div class="placeholder-note">Time and distance are placeholder estimates.</div>`,
      `<button class="p-btn primary" data-act="start">Start directions ${icon.arrowR}</button>`);
  }

  function progressHTML(i, n) {
    return `<div class="progress" role="progressbar" aria-valuemin="1" aria-valuemax="${n}" aria-valuenow="${i + 1}">
      <div class="top"><span class="count">Step ${i + 1} <small>of ${n}</small></span><span class="illus-tag">Placeholder route</span></div>
      <div class="bar">${Array.from({ length: n }, (_, k) => `<i class="${k < i ? "done" : k === i ? "now" : ""}"></i>`).join("")}</div>
    </div>`;
  }

  function phoneStep(destId, i) {
    const r = R[destId], s = r.steps[i], n = r.steps.length;
    const next = r.steps[i + 1];
    return phoneChrome(destId, `
      ${progressHTML(i, n)}
      <div class="arrow-card"><span class="stepno">0${i + 1}</span>${dirSVG(s.dir)}</div>
      <p class="instruction">${s.text}</p>
      <div class="next-hint">${next ? `Next: <b>${next.text}</b>` : "This is the last step."}</div>`,
      `<button class="p-btn ghost" data-act="prev" aria-label="Previous step">${icon.arrowL}</button>
       <button class="p-btn primary" data-act="next">${i === n - 1 ? "I’ve arrived" : "Next step"} ${icon.arrowR}</button>`);
  }

  function phoneArrival(destId) {
    const d = byId(destId), n = R[destId].steps.length;
    return phoneChrome(destId, `
      <div class="progress"><div class="top"><span class="count">Step ${n} <small>of ${n} · complete</small></span></div>
        <div class="bar">${Array.from({ length: n }, () => '<i class="done"></i>').join("")}</div></div>
      <div class="arrive-hero"><div class="check">${icon.check}</div>
        <h1>You’ve arrived</h1><div class="dname">${d.name}</div>
        <p>This route is an illustrative placeholder. Final wording will use verified campus directions.</p></div>`,
      `<button class="p-btn ghost wide" data-act="done">Back to destinations</button>
       <button class="p-btn primary" data-act="done">Done</button>`);
  }

  return { setReal, routeUrl, D, R, T, byId, icon, dirSVG, mapSVG, floorsSVG, qrSVG, wordmark, reachOverlay,
    kioskWelcome, kioskQR, phoneChrome, phoneWaiting, phoneOverview, phoneStep, phoneArrival, progressHTML };
})();
