/* Full-screen kiosk app. Choose a destination → real QR code that opens route.html#<destination>.
   Resets to the welcome screen (English) after 60 seconds without a touch. */
(function () {
  const W = window.WFS;
  const stage = document.getElementById('stage');
  const IDLE_MS = 60000;
  const st = { screen: 'welcome', dest: null, lang: 'en', help: false };
  let idle;

  function render() {
    stage.innerHTML = st.screen === 'welcome'
      ? W.kioskWelcome({ lang: st.lang, help: st.help })
      : W.kioskQR(st.dest, { lang: st.lang, help: st.help });
    document.documentElement.lang = st.lang;
    fit();
  }

  // Keep the 9:16 design (450 × 800) and scale it to fill the screen height.
  function fit() {
    const k = stage.querySelector('.kiosk');
    if (!k) return;
    const s = Math.min(window.innerWidth / 450, (window.innerHeight - 28) / 800);
    k.style.transform = `scale(${s})`;
    stage.style.width = `${450 * s}px`;
    stage.style.height = `${800 * s}px`;
  }

  function resetIdle() {
    clearTimeout(idle);
    idle = setTimeout(() => { Object.assign(st, { screen: 'welcome', dest: null, lang: 'en', help: false }); render(); }, IDLE_MS);
  }

  stage.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]');
    resetIdle();
    if (!b) return;
    const a = b.dataset.act, v = b.dataset.v;
    if (a === 'select') { st.screen = 'qr'; st.dest = v; st.help = false; }
    else if (a === 'back') { st.screen = 'welcome'; st.dest = null; st.help = false; }
    else if (a === 'lang') st.lang = v;
    else if (a === 'help') st.help = true;
    else if (a === 'closehelp') st.help = false;
    render();
  });

  window.addEventListener('resize', fit);
  render();
  resetIdle();
})();
