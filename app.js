/* Visual prototype renderer. No GPS, no QR scanning, no routing — screens only. */
(function () {
  const { D, R, byId, icon, dirSVG, mapSVG, kioskWelcome, kioskQR, phoneWaiting, phoneOverview, phoneStep, phoneArrival, reachOverlay, qrSVG, needsChoice, routeOf, phoneAccessChoice } = window.WFS;
  const $ = (s, el = document) => el.querySelector(s);

  /* ---------- Wireframes ---------- */
  const pin = (n, x, y) => `<span class="pin" style="left:${x}px;top:${y}px">${n}</span>`;
  const wfBottom = `<div style="display:flex;gap:10px;height:52px;margin-top:auto">
      <div class="wfbtn" style="flex:1;font-size:16px">(?) Need help? Reception</div>
      <div class="wfbtn" style="width:110px;justify-content:center;font-size:16px"><b>EN</b>&nbsp;|&nbsp;DE</div></div>`;

  function wfKioskWelcome() {
    return `<div class="kiosk" style="padding:0">
      <div style="height:410px;padding:18px 24px;display:flex;flex-direction:column;gap:14px;position:relative">
        <div style="display:flex;justify-content:space-between"><div class="wfbox" style="width:180px;height:30px">Logo · Campus Berlin</div><div class="wfbox" style="width:120px;height:30px">You are here</div></div>
        <div class="wftext" style="font-size:38px;line-height:1.05">Welcome to<br>Campus Berlin</div>
        <div class="wfbox x" style="flex:1"><span>Campus illustration (non-interactive)</span></div>
        ${pin(1, 6, 70)}${pin(2, 6, 210)}
      </div>
      <div style="height:390px;padding:14px 22px 16px;display:flex;flex-direction:column;position:relative">
        <div class="wftext" style="font-size:22px;margin-bottom:10px">Where would you like to go?</div>
        <div style="display:flex;flex-direction:column;gap:10px">
          ${D.map((d) => `<div class="wfbtn fill" style="height:48px">${d.name}<span style="margin-left:auto">→</span></div>`).join("")}
        </div>
        ${wfBottom}
        ${pin(3, 2, 58)}${pin(4, 2, 334)}
      </div>
      ${reachOverlay}
    </div>`;
  }

  function wfKioskQR() {
    return `<div class="kiosk" style="padding:0">
      <div style="height:410px;padding:18px 24px;display:flex;flex-direction:column;gap:12px;position:relative">
        <div style="display:flex;justify-content:space-between"><div class="wfbox" style="width:180px;height:30px">Logo · Campus Berlin</div><div class="wfbox" style="width:120px;height:30px">You are here</div></div>
        <div><div style="font-size:13px;font-weight:700;color:#666">ROUTE TO</div><div class="wftext" style="font-size:36px">Room C 1.02</div></div>
        <div style="position:relative;border:1.5px solid #9a9a9a;border-radius:6px;overflow:hidden">${mapSVG("c102", { wf: true })}<span class="wfbox" style="position:absolute;left:8px;top:8px;height:22px;font-size:10px;background:#fff">ILLUSTRATIVE ROUTE · NOT TO SCALE</span></div>
        ${pin(5, 6, 82)}${pin(6, 6, 200)}
      </div>
      <div style="height:390px;padding:14px 22px 16px;display:flex;flex-direction:column;position:relative">
        <div style="display:flex;gap:14px;border:2px solid #222;border-radius:8px;padding:12px;height:196px;align-items:center">
          <div class="wfbox x" style="width:168px;height:168px;flex:none"><span>QR code (large)</span></div>
          <div><div class="wfbox" style="width:36px;height:36px;margin-bottom:8px">📱</div><div class="wftext" style="font-size:17px;line-height:1.25">Scan with your phone camera to open this route.</div><div class="wfline" style="margin-top:10px;width:90%"></div><div class="wfline" style="margin-top:6px;width:70%"></div></div>
        </div>
        <div style="font-size:12px;text-align:center;margin:6px 0 0;color:#555">Step-by-step directions will appear on your phone.</div>
        <div class="wfbtn" style="height:56px;justify-content:center;margin-top:12px">← Back to destinations</div>
        ${wfBottom}
        ${pin(7, 2, 30)}${pin(8, 2, 268)}
      </div>
      ${reachOverlay}
    </div>`;
  }

  function wfPhone(content, foot) {
    return `<div class="phone" style="border-radius:38px">
      <div style="height:44px;display:flex;align-items:center;justify-content:space-between;padding:6px 28px 0;font-size:13px;font-weight:700">9:41<span>▮▮ ◔ ▭</span></div>
      <div class="wfbox" style="margin:0 14px;height:36px;border-radius:10px">Browser address bar · route link</div>
      <div style="display:flex;justify-content:space-between;padding:12px 18px 10px"><div class="wfbox" style="width:110px;height:26px">Logo</div><div class="wfbtn fill" style="height:28px;font-size:12px;border-radius:999px;padding:0 10px">📍 Room C 1.02</div></div>
      <div style="flex:1;padding:6px 18px 0;display:flex;flex-direction:column;gap:12px;position:relative">${content}</div>
      <div style="padding:12px 18px 26px;display:flex;gap:10px">${foot}</div>
    </div>`;
  }
  const wfProgress = (i, n) => `<div><div style="display:flex;justify-content:space-between;margin-bottom:8px"><b style="font-size:18px">Step ${i} of ${n}</b><span class="wfbox" style="height:20px;font-size:10px">PLACEHOLDER ROUTE</span></div>
    <div class="wf-bar">${Array.from({ length: n }, (_, k) => `<i class="${k < i ? "on" : ""}"></i>`).join("")}</div></div>`;

  function wfOverview() {
    return wfPhone(`<div class="wftext" style="font-size:28px;line-height:1.05">Route to Room C 1.02</div>
      <div style="font-size:15px">● You are at the university entrance</div>
      <div style="position:relative;border:1.5px solid #9a9a9a;border-radius:6px;overflow:hidden">${mapSVG("c102", { wf: true })}</div>
      <div style="display:flex;gap:8px">${["~4 min*", "~180 m*", "5 steps"].map((x) => `<div class="wfbox" style="flex:1;height:52px">${x}</div>`).join("")}</div>
      <div style="font-size:11px;color:#555">* placeholder estimates</div>
      ${pin(9, 4, 0)}${pin(10, 4, 100)}`,
      `<div class="wfbtn fill" style="flex:1;height:56px;justify-content:center">Start directions →</div>`);
  }
  function wfStep(i, dir, text) {
    return wfPhone(`${wfProgress(i, 5)}
      <div class="wfbox" style="height:250px;background:#d4d4d4;color:#222">${dirSVG(dir, "wfarrow").replace("<svg", '<svg style="width:150px;height:150px"')}</div>
      <div class="wftext" style="font-size:26px;line-height:1.15">${text}</div>
      <div class="wfline" style="width:80%"></div>
      ${i === 1 ? pin(11, 4, 0) + pin(12, 4, 70) + pin(13, 4, 330) : ""}`,
      `<div class="wfbtn" style="width:90px;height:56px;justify-content:center">←</div><div class="wfbtn fill" style="flex:1;height:56px;justify-content:center">${i === 5 ? "I’ve arrived" : "Next step"} →</div>`);
  }
  function wfArrival() {
    return wfPhone(`${wfProgress(5, 5)}
      <div class="wfbox" style="height:300px;flex-direction:column;gap:12px;background:#d4d4d4;color:#222"><div style="width:64px;height:64px;border:3px solid #222;border-radius:50%;display:grid;place-items:center;font-size:30px">✓</div><div class="wftext" style="font-size:32px">You’ve arrived</div><div style="font-size:22px;font-weight:700">Room C 1.02</div></div>
      ${pin(14, 4, 70)}`,
      `<div class="wfbtn" style="flex:1;height:56px;justify-content:center;font-size:15px">Back to destinations</div><div class="wfbtn fill" style="flex:1;height:56px;justify-content:center">Done</div>`);
  }

  /* ---------- Helpers to frame screens ---------- */
  const kioskFrame = (inner, wf) => `<div class="kiosk-device ${wf ? "wf-frame" : ""}">${inner}</div>`;
  const phoneFrame = (inner, wf) => `<div class="phone-device ${wf ? "wf-frame" : ""}">${inner}</div>`;
  const col = (frame, cap) => `<div class="screen-col">${frame}<div class="caption">${cap}</div></div>`;
  const conn = (label, handoff) => `<div class="connector ${handoff ? "handoff" : ""}"><svg viewBox="0 0 64 24"><path d="M2 12h56M48 4l10 8-10 8" fill="none" stroke="currentColor" stroke-width="3" ${handoff ? 'stroke-dasharray="5 4"' : ""}/></svg>${label}</div>`;
  const notes = (items) => `<ol class="notes">${items.map(([n, t]) => `<li><span class="pin">${n}</span><span>${t}</span></li>`).join("")}</ol>`;

  /* ---------- Build: flow ---------- */
  function facadeSVG() {
    return `<svg viewBox="0 0 220 160" width="190" aria-label="Kiosk standing outside the university entrance">
      <rect x="0" y="140" width="220" height="20" fill="#E2DCD3"/>
      <rect x="18" y="30" width="140" height="110" fill="#fff" stroke="#1F1D1B" stroke-width="2"/>
      ${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => `<rect x="${28 + c * 32}" y="${40 + r * 22}" width="22" height="14" fill="#E2DCD3"/>`).join("")).join("")}
      <rect x="72" y="104" width="34" height="36" fill="#1F1D1B"/>
      <text x="89" y="100" text-anchor="middle" font-size="7" font-weight="800" font-family="Inter,Arial" fill="#1F1D1B">ENTRANCE</text>
      <rect x="176" y="72" width="22" height="68" rx="3" fill="#1F1D1B"/>
      <rect x="179" y="76" width="16" height="40" fill="#F26A21"/>
      <path d="M187 44 v14 M180 50 l7 8 7-8" stroke="#F26A21" stroke-width="3" fill="none"/>
      <text x="187" y="38" text-anchor="middle" font-size="8" font-weight="800" font-family="Inter,Arial" fill="#D9531A">KIOSK</text>
    </svg>`;
  }
  function mini(html, w, scale) {
    return `<div class="mini" style="transform:scale(${scale});width:${w}px;left:50%;margin-left:${-(w * scale) / 2}px;top:8px">${html}</div>`;
  }
  function buildFlow() {
    const steps = [
      ["01", "Arrive at the entrance", "A portrait kiosk stands just outside the main university entrance.", `<div style="display:grid;place-items:center;height:100%">${facadeSVG().replace('width="190"', 'width="150"')}</div>`],
      ["02", "Choose a destination", "Five large text buttons, all in the seated-reach zone.", mini(kioskWelcome(), 450, 0.19)],
      ["03", "Scan the QR code", "The kiosk shows the route preview and a QR code for the phone.", mini(kioskQR("c102"), 450, 0.19)],
      ["04", "Route opens in the browser", "No app download. The overview shows the illustrative route.", mini(phoneOverview("c102"), 375, 0.21)],
      ["05", "Follow one step at a time", "A big arrow, large text and a progress bar that fills step by step.", mini(phoneStep("c102", 1), 375, 0.21)],
      ["06", "Arrive", "Confirmation with the destination name, then Done.", mini(phoneArrival("c102"), 375, 0.21)],
    ];
    $("#flow").innerHTML = steps.map(([n, t, p, th], i) =>
      `${i ? '<div class="flow-arrow">→</div>' : ""}<div class="flow-card"><div class="thumb">${th}</div><span class="n">STEP ${n}${i === 2 ? " · QR HANDOFF" : ""}</span><b>${t}</b><p>${p}</p></div>`).join("");
  }

  /* ---------- Build: wireframes ---------- */
  function buildWireframes() {
    $("#wf-kiosk").innerHTML =
      `<div class="wf-pair">${col(kioskFrame(wfKioskWelcome(), true), "<b>K1 · Welcome & destination choice</b>")}
        ${notes([[1, "Title and campus name sit high on the screen: read-only, no touch needed."], [2, "Illustration area is decorative and non-interactive."], [3, "Every button is in the blue seated-reach zone: full-width, 56 px tall, text labels, 10 px gaps."], [4, "Help (Reception) and EN / DE are also in the reach zone."]])}</div>
       ${conn("Tap destination")}
       <div class="wf-pair">${col(kioskFrame(wfKioskQR(), true), "<b>K2 · Destination selected & QR handoff</b><br>One template, repeated for all 5 destinations")}
        ${notes([[5, "The selected destination is the largest text on screen."], [6, "Schematic map preview, labelled as illustrative and placed high."], [7, "Large QR code with a plain instruction that it opens the route on the phone."], [8, "Back to destinations, Help and language controls stay in the reach zone."]])}</div>`;
    $("#wf-phone").innerHTML =
      `${conn("Scan QR with phone camera", true)}
       ${col(phoneFrame(wfOverview(), true), "<b>M1 · Route overview</b>")}
       ${conn("Start directions")}
       ${col(phoneFrame(wfStep(1, "straight", "Walk 100 metres straight ahead."), true), "<b>M2 · Step 1 of 5</b>")}
       ${conn("Next")}
       ${col(phoneFrame(wfStep(2, "right", "Turn right at the door marked “C”."), true), "<b>M2 · Step 2 of 5</b>")}
       ${conn("Next ×2")}
       ${col(phoneFrame(wfStep(4, "left", "Turn left at the next junction."), true), "<b>M2 · Step 4 of 5</b>")}
       ${conn("I’ve arrived")}
       ${col(phoneFrame(wfArrival(), true), "<b>M3 · Arrival</b>")}`;
    $("#wf-phone-notes").innerHTML = notes([[9, "The destination stays visible in the header pill on every phone screen."], [10, "Map and estimates are clearly marked as placeholders."], [11, "Progress (‘Step 1 of 5’) plus a segmented bar that fills forward."], [12, "One large direction symbol per step."], [13, "One instruction at a time, in large type. Back and Next are in thumb reach."], [14, "Arrival confirms the destination name and offers Done or Back to destinations."]]);
  }

  /* ---------- Build: hi-fi gallery ---------- */
  let hfDest = "c102", hfMode = "lift";
  function buildHifi() {
    $("#hf-kiosk").innerHTML =
      col(kioskFrame(kioskWelcome({ pressed: null })), "<b>K1 · Welcome & destination choice</b>") +
      D.map((d) => col(kioskFrame(kioskQR(d.id)), `<b>K2 · QR handoff: ${d.name}</b>`)).join("");
    renderHifiPhone();
  }
  function renderHifiPhone() {
    const choice = needsChoice(hfDest);
    const mode = choice ? hfMode : null;
    const r = routeOf(hfDest, mode);
    const modeBar = $("#hf-mode");
    if (modeBar) {
      modeBar.hidden = !choice;
      modeBar.querySelectorAll("[data-hfmode]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.hfmode === hfMode));
    }
    $("#hf-phone").innerHTML =
      (choice ? col(phoneFrame(phoneAccessChoice(hfDest)), "<b>M0 · Step-free or stairs?</b><br>Only for routes with stairs") : "") +
      col(phoneFrame(phoneOverview(hfDest, mode)), "<b>M1 · Route overview</b>") +
      r.steps.map((_, i) => col(phoneFrame(phoneStep(hfDest, i, mode)), `<b>M2 · Step ${i + 1} of ${r.steps.length}</b>`)).join("") +
      col(phoneFrame(phoneArrival(hfDest, mode)), "<b>M3 · Arrival</b>");
    fitScreens();
    document.querySelectorAll("[data-hfdest]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.hfdest === hfDest));
  }



  /* Scale design screens down (not crop) when the section is narrower than the screen */
  function fitScreens() {
    document.querySelectorAll("section.block .kiosk-device, section.block .phone-device").forEach((el) => {
      el.style.zoom = "";
      const host = el.closest("section.block");
      const cs = getComputedStyle(host);
      const avail = host.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const z = Math.min(1, avail / el.offsetWidth);
      if (z < 1) el.style.zoom = z.toFixed(3);
    });
  }

  /* ---------- Home: hero visual + "try it" QR ---------- */
  const HERO_W = 600, HERO_H = 660;
  function buildHero() {
    const stage = $("#heroStage");
    if (!stage) return;
    stage.innerHTML =
      `<div class="hero-kiosk">${kioskFrame(kioskQR("c102"))}</div>` +
      `<div class="hero-phone">${phoneFrame(phoneStep("c102", 1))}</div>`;
    fitHero();
    const qr = $("#homeQR");
    if (qr) qr.innerHTML = qrSVG("home");
  }
  function fitHero() {
    const stage = $("#heroStage");
    if (!stage) return;
    const box = stage.parentElement;
    const s = Math.min(1, box.clientWidth / HERO_W);
    stage.style.transform = `scale(${s})`;
    box.style.height = `${HERO_H * s}px`;
  }

  /* ---------- Click-through demo (mock state only) ---------- */
  const st = { k: "welcome", dest: null, lang: "en", help: false, p: "waiting", step: 0, mode: null };
  function renderDemo() {
    $("#demo-kiosk").innerHTML = kioskFrame(st.k === "welcome" ? kioskWelcome({ lang: st.lang, help: st.help }) : kioskQR(st.dest, { lang: st.lang, help: st.help }));
    let ph;
    if (st.p === "waiting") ph = phoneWaiting();
    else if (st.p === "choice") ph = phoneAccessChoice(st.dest);
    else if (st.p === "overview") ph = phoneOverview(st.dest, st.mode);
    else if (st.p === "step") ph = phoneStep(st.dest, st.step, st.mode);
    else ph = phoneArrival(st.dest, st.mode);
    $("#demo-phone").innerHTML = phoneFrame(ph);
    $("#sim-scan").disabled = st.k !== "qr";
    fitScreens();
  }
  function onDemo(e) {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const a = b.dataset.act, v = b.dataset.v;
    if (a === "select") { st.k = "qr"; st.dest = v; st.p = "waiting"; }
    else if (a === "back") { st.k = "welcome"; }
    else if (a === "lang") { st.lang = v; }
    else if (a === "help") { st.help = true; }
    else if (a === "closehelp") { st.help = false; }
    else if (a === "view") { window.WFS.setStepView(v); }
    else if (a === "mode") { st.mode = v; st.p = "overview"; }
    else if (a === "choose") { st.p = "choice"; }
    else if (a === "start") { st.p = "step"; st.step = 0; }
    else if (a === "next") { const n = routeOf(st.dest, st.mode).steps.length; if (st.step < n - 1) st.step++; else st.p = "arrived"; }
    else if (a === "prev") { if (st.step > 0) st.step--; else st.p = "overview"; }
    else if (a === "done") { st.p = "waiting"; st.k = "welcome"; st.dest = null; }
    renderDemo();
  }

  document.addEventListener("DOMContentLoaded", () => {
    buildHero();
    window.addEventListener("resize", fitHero);
    buildFlow();
    buildWireframes();
    buildHifi();
    renderDemo();
    $("#demo").addEventListener("click", onDemo);
    $("#sim-scan").addEventListener("click", () => { if (st.k === "qr") { st.mode = null; st.p = needsChoice(st.dest) ? "choice" : "overview"; renderDemo(); } });
    $("#demo-reset").addEventListener("click", () => { Object.assign(st, { k: "welcome", dest: null, help: false, p: "waiting", step: 0, mode: null }); renderDemo(); });
    document.querySelectorAll("[data-hfdest]").forEach((b) => b.addEventListener("click", () => { hfDest = b.dataset.hfdest; renderHifiPhone(); }));
    document.querySelectorAll("[data-hfmode]").forEach((b) => b.addEventListener("click", () => { hfMode = b.dataset.hfmode; renderHifiPhone(); }));
    $("#reach-toggle").addEventListener("change", (e) => $("#hifi").classList.toggle("show-reach", e.target.checked));
    fitScreens();
    window.addEventListener("resize", fitScreens);
  });
})();
