/* prompt bar - self-typing ghost text, suggestion chips, send feedback.
   Vanilla JS, no dependencies. */
(function () {
  'use strict';

  const PROMPTS = [
    'What would you like to create today?',
    'A 30-second launch teaser in my brand colors…',
    'Turn this script into a storyboard…',
    'A product walkthrough with a warm voiceover…',
    'Resize my campaign for every placement…',
  ];

  const input = document.getElementById('promptInput');
  const ghost = document.getElementById('ghost');
  const chips = document.getElementById('suggestions');
  const bar = document.getElementById('promptBar');
  const send = bar.querySelector('.send');

  /* ── self-typing ghost ── */
  let promptIndex = 0;
  let charIndex = 0;
  let deleting = false;
  let paused = false;

  function tick() {
    if (paused || input.value) { ghost.textContent = ''; schedule(600); return; }
    const full = PROMPTS[promptIndex];
    if (!deleting) {
      charIndex++;
      if (charIndex >= full.length) { deleting = true; schedule(2200); ghost.textContent = full; return; }
    } else {
      charIndex -= 3; // deleting is faster than typing, like a real backspace hold
      if (charIndex <= 0) {
        charIndex = 0;
        deleting = false;
        promptIndex = (promptIndex + 1) % PROMPTS.length;
      }
    }
    ghost.textContent = full.slice(0, Math.max(0, charIndex));
    schedule(deleting ? 26 : 34 + Math.random() * 60); // human-ish jitter
  }
  let timer;
  function schedule(ms) { clearTimeout(timer); timer = setTimeout(tick, ms); }
  tick();

  input.addEventListener('focus', () => { paused = true; ghost.textContent = ''; });
  input.addEventListener('blur', () => { paused = false; });
  input.addEventListener('input', () => { ghost.textContent = ''; });

  /* ── suggestion chips ── */
  PROMPTS.slice(1).forEach((text) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip';
    b.textContent = text;
    b.addEventListener('click', () => {
      input.value = text;
      ghost.textContent = '';
      input.focus();
    });
    chips.appendChild(b);
  });

  /* ── send feedback (demo only - nothing leaves the page) ── */
  bar.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!input.value.trim()) { input.focus(); return; }
    send.classList.add('sent');
    send.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5 5L20 6.5"/></svg>';
    setTimeout(() => {
      send.classList.remove('sent');
      send.innerHTML = '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
      input.value = '';
      input.blur();
    }, 1400);
  });
})();
