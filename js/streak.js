// ══════════════════════════════════════════════════
// STREAK + GOAL BAR SYSTEM
// ══════════════════════════════════════════════════

const GOAL_TARGET = 2500;
const GOAL_PER_DAY = 45;

function streakTodayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function loadStreak() {
  try { return JSON.parse(localStorage.getItem('jp_streak') || '{"count":0,"lastDay":""}'); }
  catch { return {count:0, lastDay:''}; }
}

function saveStreak(data) {
  data._v = 2;
  try { localStorage.setItem('jp_streak', JSON.stringify(data)); } catch {}
}

function daysBetween(k1, k2) {
  if (!k1 || !k2) return 999;
  const d1 = new Date(k1 + 'T00:00:00');
  const d2 = new Date(k2 + 'T00:00:00');
  return Math.round((d2 - d1) / 86400000);
}

function touchStreak() {
  const today = streakTodayKey();
  const data = loadStreak();
  if (data.lastDay === today) return data;
  const gap = daysBetween(data.lastDay, today);
  if (gap === 1) {
    data.count += 1;
  } else {
    data.count = 1;
  }
  data.lastDay = today;
  saveStreak(data);
  return data;
}

function getStreak() {
  const data = loadStreak();
  const today = streakTodayKey();
  if (!data.lastDay) return 0;
  const gap = daysBetween(data.lastDay, today);
  if (gap > 1) return 0;
  return data.count;
}

function renderGoalBar() {
  const s = countAllStarred();
  const pct = Math.min(100, Math.round(s / GOAL_TARGET * 100));

  let daysLeft = null;
  if (typeof cdEvents !== 'undefined' && cdEvents.length > 0) {
    const active = cdEvents.filter(e => (new Date(e.date + 'T00:00:00') - new Date()) > 0)
                           .sort((a, b) => new Date(a.date) - new Date(b.date));
    if (active.length > 0) {
      daysLeft = Math.ceil((new Date(active[0].date + 'T00:00:00') - new Date()) / 86400000);
    }
  }

  const remaining = Math.max(0, GOAL_TARGET - s);
  let subText;
  if (s >= GOAL_TARGET) {
    subText = '🎌 Goal reached!';
  } else if (daysLeft && daysLeft > 0) {
    const needed = Math.ceil(remaining / daysLeft);
    subText = `~${needed} words/day needed`;
  } else {
    const daysNeeded = Math.ceil(remaining / GOAL_PER_DAY);
    subText = `~${daysNeeded} days at 45/day`;
  }

  const ge = document.getElementById('goal-starred');
  const gp = document.getElementById('goal-pct');
  const gf = document.getElementById('goal-fill');
  const gs = document.getElementById('goal-sub');
  if (ge) ge.textContent = s;
  if (gp) gp.textContent = pct + '%';
  if (gf) gf.style.width = pct + '%';
  if (gs) gs.textContent = subText;
}

function renderStreakNav() {
  const count = getStreak();
  const countEl = document.getElementById('streak-count');
  const flameEl = document.getElementById('streak-flame');
  if (!countEl) return;
  countEl.textContent = count;
  if (count === 0) {
    countEl.classList.add('zero');
    if (flameEl) { flameEl.style.opacity = '0.3'; flameEl.style.animation = 'none'; }
  } else {
    countEl.classList.remove('zero');
    if (flameEl) { flameEl.style.opacity = '1'; flameEl.style.animation = ''; }
  }
}

// Patch updateGlobalProgress to also re-render goal bar
(function patchUpdateGlobalProgress() {
  setTimeout(function() {
    const origGP = window.updateGlobalProgress;
    if (typeof origGP === 'function') {
      window.updateGlobalProgress = function() {
        const r = origGP.apply(this, arguments);
        renderGoalBar();
        return r;
      };
    }
  }, 100);
})();

// Bootstrap
(function initStreakGoal() {
  // Clear any corrupted streak data written by old page-load touchStreak bug
  try {
    const data = JSON.parse(localStorage.getItem('jp_streak') || '{}');
    // If lastDay is today but was set by page load (before any starring),
    // we can't know — so we only reset if count seems wrong (e.g. stuck at 1 for days)
    // Best fix: version-gate the streak data
    if (!data._v || data._v < 2) {
      localStorage.removeItem('jp_streak');
    }
  } catch {}
  renderStreakNav();
  renderGoalBar();
})();
