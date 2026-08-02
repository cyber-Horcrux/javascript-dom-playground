/**
 * JavaScript DOM Playground
 * ---------------------------------------------------------------
 * Four small, self-contained demos that practice core DOM skills:
 *   1. Color Switcher   -> querySelector, event listeners, setInterval/clearInterval
 *   2. Click Counter    -> state variables, innerHTML updates, alert()
 *   3. Greeting Form    -> form submission, input values, basic validation
 *   4. Activity Log     -> a shared helper (logActivity) used by everything above
 *
 * Everything waits for DOMContentLoaded so we know the HTML exists
 * before we try to grab elements from it.
 * ------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initColorSwitcher();
  initCounter();
  initGreetingForm();
  initConsoleFeed();
});

/* ================================================================
   Shared activity log
   Every module below calls logActivity() so the visitor can see
   which event fired, in real time, without opening devtools.
   ================================================================ */

function initConsoleFeed() {
  const clearBtn = document.querySelector('#clear-log');

  clearBtn.addEventListener('click', () => {
    const feed = document.querySelector('#console-feed');
    feed.innerHTML = '<p class="console-line console-boot">&gt; log cleared.</p>';
  });
}

function logActivity(message) {
  const feed = document.querySelector('#console-feed');
  if (!feed) return;

  const line = document.createElement('p');
  line.className = 'console-line';
  line.textContent = `> ${message}`;

  feed.appendChild(line);
  feed.scrollTop = feed.scrollHeight; // auto-scroll to the newest line
}

/* ================================================================
   Module: Dark mode toggle
   Stores the preference on <html data-theme="..."> so CSS variables
   in style.css can react to it.
   ================================================================ */

function initThemeToggle() {
  const toggleBtn = document.querySelector('#theme-toggle');
  const icon = document.querySelector('#theme-icon');
  const label = document.querySelector('#theme-label');

  let isDark = true; // the page starts in dark mode by default

  toggleBtn.addEventListener('click', () => {
    isDark = !isDark;
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    icon.textContent = isDark ? '🌙' : '☀️';
    label.textContent = isDark ? 'Dark mode' : 'Light mode';
    toggleBtn.setAttribute('aria-pressed', String(!isDark));

    logActivity(`Theme switched to ${isDark ? 'dark' : 'light'} mode.`);
  });
}

/* ================================================================
   Module 01: Color Switcher
   - Manual swatches set the heading color directly.
   - "Random color" picks one from the palette at random.
   - "Auto-cycle" uses setInterval to step through the palette on
     its own, and clearInterval to stop it (classic play/pause pattern).
   ================================================================ */

function initColorSwitcher() {
  const palette = [
    { name: 'red', hex: '#ef4444' },
    { name: 'green', hex: '#22c55e' },
    { name: 'blue', hex: '#3b82f6' },
    { name: 'purple', hex: '#a855f7' },
    { name: 'orange', hex: '#f97316' },
  ];

  const target = document.querySelector('#color-target');
  const currentLabel = document.querySelector('#current-color-label');
  const historyLabel = document.querySelector('#color-history');
  const autoCycleBtn = document.querySelector('#auto-cycle');
  const randomBtn = document.querySelector('#random-color');

  const history = []; // keeps the last few colors used, most recent first
  let cycleIndex = 0;
  let intervalId = null; // null means "not currently cycling"

  function applyColor(name, hex) {
    target.style.color = hex;
    currentLabel.textContent = name;

    history.unshift(name);
    history.length = Math.min(history.length, 5); // keep only the last 5
    historyLabel.textContent = history.join(' → ');
  }

  // Manual swatch buttons (Red / Green / Blue / Purple / Orange)
  document.querySelectorAll('#color-buttons .swatch').forEach((button) => {
    button.addEventListener('click', () => {
      const hex = button.dataset.color;
      const name = button.textContent.trim().toLowerCase();
      applyColor(name, hex);
      logActivity(`Color set to ${name} manually.`);
    });
  });

  // Random color button
  randomBtn.addEventListener('click', () => {
    const choice = palette[Math.floor(Math.random() * palette.length)];
    applyColor(choice.name, choice.hex);
    logActivity(`Random color chosen: ${choice.name}.`);
  });

  // Auto-cycle toggle (play/pause using setInterval + clearInterval)
  autoCycleBtn.addEventListener('click', () => {
    const isRunning = intervalId !== null;

    if (isRunning) {
      clearInterval(intervalId);
      intervalId = null;
      autoCycleBtn.textContent = '▶ Start auto-cycle';
      logActivity('Auto-cycle stopped.');
      return;
    }

    autoCycleBtn.textContent = '⏸ Stop auto-cycle';
    logActivity('Auto-cycle started.');

    intervalId = setInterval(() => {
      const step = palette[cycleIndex];
      applyColor(step.name, step.hex);
      cycleIndex = (cycleIndex + 1) % palette.length;
    }, 600);
  });
}

/* ================================================================
   Module 02: Click Counter
   Plain state variable + innerHTML update, with a reset button and
   a global "C" keyboard shortcut for extra practice with keydown.
   ================================================================ */

function initCounter() {
  const valueDisplay = document.querySelector('#counter-value');
  const incrementBtn = document.querySelector('#counter-increment');
  const resetBtn = document.querySelector('#counter-reset');

  let count = 0;

  function increment() {
    count++;
    valueDisplay.textContent = count;
    logActivity(`Counter incremented to ${count}.`);

    if (count % 10 === 0) {
      alert(`Count is now ${count}!`);
    }
  }

  function reset() {
    count = 0;
    valueDisplay.textContent = count;
    logActivity('Counter reset to 0.');
  }

  incrementBtn.addEventListener('click', increment);
  resetBtn.addEventListener('click', reset);

  // Keyboard shortcut: press "C" anywhere to add a count.
  document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'c' && document.activeElement.tagName !== 'INPUT') {
      increment();
    }
  });
}

/* ================================================================
   Module 03: Greeting Form
   Reads the name input on submit, prevents the default page
   reload, and shows a friendly message (with basic validation).
   ================================================================ */

function initGreetingForm() {
  const form = document.querySelector('#greeting-form');
  const nameInput = document.querySelector('#name-input');
  const errorText = document.querySelector('#form-error');
  const output = document.querySelector('#greeting-output');

  form.addEventListener('submit', (event) => {
    event.preventDefault(); // stop the form from reloading the page

    const name = nameInput.value.trim();

    if (name === '') {
      errorText.hidden = false;
      logActivity('Greeting form submitted with no name — blocked.');
      return;
    }

    errorText.hidden = true;
    output.innerHTML = `<p>👋 Hello, <strong>${escapeHtml(name)}</strong>! Great to see you.</p>`;
    logActivity(`Greeted "${name}".`);

    form.reset();
    nameInput.focus();
  });
}

/**
 * Escapes basic HTML special characters before inserting user input
 * into the page, so typed text is always shown as plain text.
 */
function escapeHtml(value) {
  const div = document.createElement('div');
  div.textContent = value;
  return div.innerHTML;
}
