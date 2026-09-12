// ══════════════════════════════════════
// ROADMAP — N4 + N5 pairing skill map
// ══════════════════════════════════════

// prio: 1=do first (NAT+JLPT), 2=weeks 5-7, 3=before JLPT
// tag: "both"=NAT+JLPT, "nat"=NAT only, "jlpt"=JLPT only
const RM_PAIRS = [
  { n4b:"BAB 26", n4t:"〜んです／〜たらいいです",            n5b:"BAB 1",  n5t:"Basic sentence は〜です",               note:"Sentence foundation — both about conveying the core of a statement", icon:"📝", prio:2, tag:"both" },
  { n4b:"BAB 27", n4t:"Kata Kerja Potensial",                n5b:"BAB 18", n5t:"Bentuk Kamus & ことができます",         note:"N4 potential = direct evolution of ことができます N5", icon:"💪", prio:1, tag:"both" },
  { n4b:"BAB 28", n4t:"〜ながら · 〜ています · 〜し",        n5b:"BAB 15", n5t:"〜ています · 〜てもいいですか",          note:"Expansion of 〜ています from N5 to N4", icon:"🔄", prio:2, tag:"both" },
  { n4b:"BAB 29", n4t:"〜ています (hasil) · KB + に/で",      n5b:"BAB 16", n5t:"Menyambung kalimat dengan て",          note:"Both use て form for result/sequence of actions", icon:"🔗", prio:2, tag:"both" },
  { n4b:"BAB 30", n4t:"〜てあります",                        n5b:"BAB 14", n5t:"KK Bentuk て (konjugasi dasar)",        note:"〜てあります is an advanced application of て form", icon:"✅", prio:3, tag:"jlpt" },
  { n4b:"BAB 31", n4t:"Bentuk Maksud (意向形)",              n5b:"BAB 13", n5t:"〜がほしい · 〜たい · 〜にいきます",    note:"Both express the speaker's intention/desire", icon:"🎯", prio:1, tag:"nat" },
  { n4b:"BAB 32", n4t:"〜たほうがいいです · Bentuk Biasa",   n5b:"BAB 20", n5t:"Bentuk Halus vs Bentuk Biasa",          note:"〜たほうがいい uses plain form — review feels immediate", icon:"⚖️", prio:2, tag:"both" },
  { n4b:"BAB 33", n4t:"Bentuk Imperatif & Larangan",         n5b:"BAB 17", n5t:"KK Bentuk ない",                        note:"N4 prohibition = extension of ない form N5", icon:"🚫", prio:1, tag:"nat" },
  { n4b:"BAB 34", n4t:"〜とおりに · 〜ように言います",        n5b:"BAB 21", n5t:"〜とおもいます · 〜といいます",          note:"Quotation pattern と言う used in both", icon:"💬", prio:2, tag:"both" },
  { n4b:"BAB 35", n4t:"Bentuk Syarat 〜ば",                  n5b:"BAB 23", n5t:"〜とき · 〜と (kondisi pasti)",         note:"Three conditionals: と (N5) → ば (N4) — learn the difference", icon:"🌿", prio:1, tag:"both" },
  { n4b:"BAB 36", n4t:"〜ように (tujuan) · 〜ようになります", n5b:"BAB 25", n5t:"〜たら · 〜ても · もし",               note:"N5 hypothetical vs N4 purpose/change — contrast deepens understanding", icon:"🌱", prio:1, tag:"both" },
  { n4b:"BAB 37", n4t:"Kata Kerja Pasif (受身)",             n5b:"BAB 19", n5t:"Bentuk た · 〜たことがある · 〜たり〜たり", note:"Passive requires strong control of た form", icon:"🔃", prio:1, tag:"both" },
  { n4b:"BAB 38", n4t:"の sebagai Kata Benda · 〜のは〜です", n5b:"BAB 22", n5t:"Anak Kalimat (修飾節)",                note:"Both about making a clause a subject/object", icon:"📐", prio:2, tag:"both" },
  { n4b:"BAB 39", n4t:"〜て(で)〜 sebagai alasan",           n5b:"BAB 8",  n5t:"Kata Sifat い dan な",                  note:"Reason with adj+で in N4 — need strong adjective base first", icon:"🎨", prio:3, tag:"jlpt" },
  { n4b:"BAB 40", n4t:"Kalimat tanya tertanam · 〜かどうか", n5b:"BAB 9",  n5t:"が · すきです · Kata Keterangan",       note:"Embedded questions involve the が particle from N5", icon:"❓", prio:2, tag:"jlpt" },
  { n4b:"BAB 41", n4t:"Pemberian & Penerimaan (lanjutan)",   n5b:"BAB 24", n5t:"くれます · 〜てあげます／もらいます",    note:"N4 directly follows N5 — side-by-side review is effective", icon:"🎁", prio:3, tag:"jlpt" },
  { n4b:"BAB 42", n4t:"〜ために (tujuan)",                   n5b:"BAB 5",  n5t:"Partikel へ · で · と · から",           note:"Movement goal (へ, N5) vs abstract goal (ために, N4)", icon:"🧭", prio:3, tag:"jlpt" },
  { n4b:"BAB 43", n4t:"〜そうです (inferensi penampilan)",   n5b:"BAB 12", n5t:"Perbandingan より · いちばん",            note:"Both about making a judgment about something", icon:"👁️", prio:3, tag:"jlpt" },
  { n4b:"BAB 44", n4t:"〜すぎます · 〜やすい／にくい",       n5b:"BAB 11", n5t:"Menghitung Benda (Kata Bantu Bilangan)", note:"Review N5 quantity/degree to support 〜すぎ context", icon:"📊", prio:3, tag:"jlpt" },
  { n4b:"BAB 45", n4t:"〜場合は (pengandaian kondisi)",       n5b:"BAB 10", n5t:"あります／います (keberadaan)",           note:"〜場合は often describes situational conditions", icon:"🗺️", prio:1, tag:"both" },
  { n4b:"BAB 46", n4t:"〜ところです (kondisi suatu aksi)",    n5b:"BAB 6",  n5t:"Partikel を · KK Transitif",            note:"〜ところ requires strong verb control — review を+verb", icon:"⏱️", prio:3, tag:"jlpt" },
  { n4b:"BAB 47", n4t:"〜そうです (info dari orang lain)",   n5b:"BAB 7",  n5t:"で (alat) · あげます／もらいます",       note:"Both about conveying received/relayed information", icon:"📡", prio:3, tag:"jlpt" },
  { n4b:"BAB 48", n4t:"Kata Kerja Kausatif (使役)",          n5b:"BAB 2",  n5t:"これ/それ/あれ · の · か〜か",           note:"Review basic N5 structures before the final session", icon:"⚙️", prio:1, tag:"both" },
  { n4b:"BAB 49", n4t:"敬語 — 尊敬語",                       n5b:"BAB 3",  n5t:"Posisi · こ/そ/あ/ど · どこ/どちら",    note:"Keigo requires strong verb base — strengthen N5 foundation", icon:"🎎", prio:2, tag:"both" },
  { n4b:"BAB 50", n4t:"敬語 — 謙譲語 I",                     n5b:"BAB 4",  n5t:"Menyatakan Waktu · KK ます (Bentuk Dasar)", note:"Close with the most basic foundation — ensure no gaps", icon:"🏆", prio:2, tag:"both" },
];

// Milestones after which index (0-based) a chest appears
const RM_MILESTONES = [4, 9, 14, 19, 24];

// zigzag positions: left / center / right
const RM_ZIG = ['center','left','center','right','center'];

// ── Persistence ──
function rmLoadDone() {
  try { return new Set(JSON.parse(localStorage.getItem('rm_done') || '[]')); } catch { return new Set(); }
}
function rmSaveDone(set) {
  try { localStorage.setItem('rm_done', JSON.stringify([...set])); } catch {}
}
let rmDone = rmLoadDone();

// ── Tooltip logic ──
let rmActiveTooltip = null;
const rmTooltip = document.getElementById('rm-tooltip');

function rmShowTooltip(idx, nodeEl) {
  const p = RM_PAIRS[idx];
  const isDone = rmDone.has(idx);
  const isUnlocked = idx === 0 || rmDone.has(idx - 1);

  let statusHtml;
  if (isDone) {
    statusHtml = `<div class="rm-tt-status"><div class="rm-tt-dot done"></div>Completed ✓</div>`;
  } else if (isUnlocked) {
    statusHtml = `<div class="rm-tt-status"><div class="rm-tt-dot unlocked"></div>Ready to study</div>`;
  } else {
    statusHtml = `<div class="rm-tt-status"><div class="rm-tt-dot locked"></div>Locked — complete previous sessions</div>`;
  }

  let btnHtml;
  if (isDone) {
    btnHtml = `<button class="rm-tt-btn" onclick="rmToggleDone(${idx})">Mark as incomplete</button>`;
  } else if (isUnlocked) {
    btnHtml = `<button class="rm-tt-btn" onclick="rmToggleDone(${idx})">Mark as done ✓</button>`;
  } else {
    btnHtml = `<button class="rm-tt-btn locked-btn" disabled>🔒 Locked</button>`;
  }

  const prioCls  = ['','p1','p2','p3'][p.prio];
  const prioLabel = ['','Priority 1 — do first','Priority 2 — weeks 5–7','Priority 3 — JLPT'][p.prio];
  const examLabel = p.tag === 'both' ? 'NAT + JLPT' : p.tag === 'nat' ? 'NAT-Test' : 'JLPT';
  const examCls   = p.tag;
  const strategyNote = p.prio === 1
    ? 'NAT-Test tests <em>active production</em> — this pattern often appears as fill-in questions. Master it before the exam.'
    : p.prio === 2
    ? 'Important for both exams. Aim to finish by weeks 5–7 after completing Priority 1.'
    : 'Lower weight — JLPT multiple choice makes it easier. Can be caught up after NAT-Test is done.';

  rmTooltip.innerHTML = `
    <div class="rm-tt-header">
      <div class="rm-tt-icon">${p.icon}</div>
      <div>
        <div class="rm-tt-num">Session ${idx + 1}</div>
        <div class="rm-tt-title">${p.n4t}</div>
      </div>
    </div>
    <div class="rm-tt-meta">
      <span class="rm-tt-prio ${prioCls}">${prioLabel}</span>
      <span class="rm-tt-exam ${examCls}">${examLabel}</span>
    </div>
    <div class="rm-tt-divider"></div>
    <div class="rm-tt-pair">
      <span class="rm-tt-badge n4">N4</span>
      <div class="rm-tt-topic">${p.n4b} — ${p.n4t}</div>
    </div>
    <div class="rm-tt-pair">
      <span class="rm-tt-badge n5">N5 ↺</span>
      <div class="rm-tt-topic">${p.n5b} — ${p.n5t}</div>
    </div>
    <div class="rm-tt-link">↳ ${p.note}</div>
    <div class="rm-strategy-note"><strong>💡 Strategy</strong>${strategyNote}</div>
    ${statusHtml}
    ${btnHtml}
  `;

  // Position near the node
  const rect = nodeEl.getBoundingClientRect();
  const ttW = 260;
  const ttH = 340;
  let left = rect.right + 12;
  let top  = rect.top + rect.height / 2 - ttH / 2;

  if (left + ttW > window.innerWidth - 10) {
    left = rect.left - ttW - 12;
  }
  if (left < 8) left = 8;
  if (top < 60) top = 60;
  if (top + ttH > window.innerHeight - 10) top = window.innerHeight - ttH - 10;

  rmTooltip.style.left = left + 'px';
  rmTooltip.style.top  = top + 'px';
  rmTooltip.classList.add('show');
  rmActiveTooltip = idx;
}

function rmHideTooltip() {
  rmTooltip.classList.remove('show');
  rmActiveTooltip = null;
}

function rmToggleDone(idx) {
  if (rmDone.has(idx)) {
    rmDone.delete(idx);
    // also un-done everything after
    for (let i = idx + 1; i < RM_PAIRS.length; i++) rmDone.delete(i);
  } else {
    rmDone.add(idx);
  }
  rmSaveDone(rmDone);
  rmRender();
  rmHideTooltip();
}

// ── Render ──
function rmRender() {
  const path = document.getElementById('rm-path');
  const total = RM_PAIRS.length;
  const doneCount = rmDone.size;

  // Update progress
  const progFill = document.getElementById('rm-prog-fill');
  const progText = document.getElementById('rm-prog-text');
  if (progFill) progFill.style.width = (doneCount / total * 100) + '%';
  if (progText) progText.textContent = doneCount + ' / ' + total;

  let html = '';
  let milestoneIdx = 0;

  RM_PAIRS.forEach((p, i) => {
    const isDone = rmDone.has(i);
    const isUnlocked = i === 0 || rmDone.has(i - 1);
    const state = isDone ? 'done' : isUnlocked ? 'unlocked' : 'locked';
    const zigPos = RM_ZIG[i % RM_ZIG.length];

    // Connector above (skip first)
    if (i > 0) {
      const prevDone = rmDone.has(i - 1);
      html += `<div class="rm-connector${prevDone ? ' done' : ''}"></div>`;
    }

    // Section label every 5 nodes (at indices 0, 5, 10, 15, 20)
    if (i % 5 === 0) {
      const sectionNum = Math.floor(i / 5) + 1;
      const sectionNames = ['Foundation', 'Growing', 'Intermediate', 'Advanced', 'Proficient'];
      html += `
        <div class="rm-section-label">
          <div class="rm-section-line"></div>
          <div class="rm-section-text">${sectionNames[sectionNum-1] || 'Section ' + sectionNum}</div>
          <div class="rm-section-line"></div>
        </div>
        <div class="rm-connector${i > 0 && rmDone.has(i-1) ? ' done' : ''}"></div>
      `;
    }

    const lockBadge = state === 'locked' ? '<div class="rm-lock">🔒</div>' : '';
    const checkBadge = state === 'done' ? '<div class="rm-check">✓</div>' : '';
    const prioCls = state !== 'done' ? ` prio-${p.prio}` : '';

    html += `
      <div class="rm-node-wrap ${zigPos}">
        <div class="rm-node-stack">
          <div class="rm-node ${state}${prioCls}" onclick="rmNodeClick(${i}, this)" data-idx="${i}">
            ${lockBadge}${checkBadge}
            <div class="rm-node-icon">${p.icon}</div>
            <div class="rm-node-num">${i + 1}</div>
          </div>
          <div class="rm-node-label">${p.n4b}</div>
        </div>
      </div>
    `;

    // Milestone chest after every 5 (after index 4, 9, 14, 19)
    if ((i + 1) % 5 === 0 && i < total - 1) {
      const mileDone = rmDone.has(i);
      const mileState = mileDone ? 'done' : (isUnlocked && isDone) ? 'unlocked' : (doneCount >= i + 1) ? 'unlocked' : 'locked';
      const actualMileState = doneCount >= i + 1 ? (doneCount > i ? 'done' : 'unlocked') : 'locked';
      html += `
        <div class="rm-connector${mileDone ? ' done' : ''}"></div>
        <div class="rm-node-wrap center">
          <div class="rm-node-stack">
            <div class="rm-node milestone ${actualMileState}">
              <div class="rm-node-icon">${actualMileState === 'done' ? '🎉' : actualMileState === 'unlocked' ? '🎁' : '🔒'}</div>
            </div>
            <div class="rm-milestone-label">${actualMileState === 'done' ? 'Reward unlocked!' : actualMileState === 'unlocked' ? 'Complete 5 sessions!' : 'Locked'}</div>
          </div>
        </div>
        <div class="rm-connector${actualMileState === 'done' ? ' done' : ''}"></div>
      `;
    }
  });

  path.innerHTML = html;
}

function rmNodeClick(idx, el) {
  if (rmActiveTooltip === idx) {
    rmHideTooltip();
    return;
  }
  rmShowTooltip(idx, el);
}

// Close tooltip on outside click
document.addEventListener('click', function(e) {
  if (rmTooltip && !rmTooltip.contains(e.target) && !e.target.closest('.rm-node')) {
    rmHideTooltip();
  }
});

// Init
rmRender();
