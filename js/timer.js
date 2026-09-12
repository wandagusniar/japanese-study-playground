// ══════════════════════════════════════════════════
// TIMER SYSTEM — stepper-based (user picks seconds)
// ══════════════════════════════════════════════════

// Chosen seconds per mode: 0 = OFF
const timerChosen = { sent: 0, ptcl: 0, kread: 0 };
const TIMER_MIN = 5;
const TIMER_MAX = 120;
const TIMER_STEP = 5;

// Interval handles
const timerState = {
  sent:  { interval: null, seconds: 0, max: 0 },
  ptcl:  { interval: null, seconds: 0, max: 0 },
  kread: { interval: null, seconds: 0, max: 0 },
};

function stepTimer(prefix, delta) {
  const cur = timerChosen[prefix];
  let next;
  if (cur === 0 && delta > 0) {
    next = TIMER_MIN; // first + press: turn on at minimum
  } else if (cur + delta < TIMER_MIN) {
    next = 0; // below min: turn off
  } else {
    next = Math.min(TIMER_MAX, cur + delta);
  }
  timerChosen[prefix] = next;
  _renderTimerStepper(prefix);
}

function _renderTimerStepper(prefix) {
  const val = timerChosen[prefix];
  const valEl = document.getElementById(prefix + '-timer-val');
  const infoEl = document.getElementById(prefix + '-timer-info');
  if (!valEl || !infoEl) return;
  if (val === 0) {
    valEl.textContent = 'OFF';
    valEl.className = 'timer-off-label';
    infoEl.textContent = 'Off';
    infoEl.style.color = 'var(--text3)';
  } else {
    valEl.textContent = val + 's';
    valEl.className = 'timer-stepper-val';
    infoEl.textContent = val + ' sec / question';
    infoEl.style.color = 'var(--accent)';
  }
}

function timerEnabled(prefix) {
  return timerChosen[prefix] > 0;
}

function randomTimerSeconds(prefix) {
  // No longer random — returns the exact chosen value
  return timerChosen[prefix];
}

// Legacy stub — no longer used but kept so old HTML references don't crash
function updateTimerInfo(prefix, min, max) {}

function stopTimer(prefix) {
  const st = timerState[prefix];
  if (st.interval) { clearInterval(st.interval); st.interval = null; }
  const disp = document.getElementById(prefix + '-timer-display');
  if (disp) disp.style.display = 'none';
}

function startTimer(prefix, onExpire) {
  stopTimer(prefix);
  if (!timerEnabled(prefix)) return;

  const secs = timerChosen[prefix];
  const st = timerState[prefix];
  st.seconds = secs;
  st.max = secs;

  const disp = document.getElementById(prefix + '-timer-display');
  if (disp) disp.style.display = 'flex';

  updateTimerUI(prefix, secs, secs);

  st.interval = setInterval(() => {
    st.seconds--;
    updateTimerUI(prefix, st.seconds, st.max);
    if (st.seconds <= 0) {
      stopTimer(prefix);
      onExpire();
    }
  }, 1000);
}

function updateTimerUI(prefix, remaining, max) {
  const numEl  = document.getElementById(prefix + '-timer-num');
  const fillEl = document.getElementById(prefix + '-timer-fill');
  if (!numEl || !fillEl) return;

  const circumference = 113.1;
  const pct = Math.max(0, remaining / max);
  const offset = circumference * (1 - pct);

  numEl.textContent = remaining;
  fillEl.style.strokeDashoffset = offset;

  const warn   = remaining <= Math.ceil(max * 0.4);
  const danger = remaining <= Math.ceil(max * 0.2);

  fillEl.className = 'timer-fill' + (danger ? ' danger' : warn ? ' warn' : '');
  numEl.className  = 'quiz-timer-num' + (danger ? ' danger' : warn ? ' warn' : '');
}

