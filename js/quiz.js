// ══════════════════════════════════════════════════
// SHARED UTILITIES
// ══════════════════════════════════════════════════

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function esc(s) {
  if (!s) return '';
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

// ══════════════════════════════════════════════════
// VOCAB MODE
// ══════════════════════════════════════════════════
let cards = [], idx = 0, results = [], quizDir = 'forward';

function switchMode(mode) {
  ['vocab','sent','bunpo','kread','conj'].forEach(m => {
    document.getElementById('tab-' + m).classList.toggle('active', m === mode);
  });
  document.getElementById('vocab-home').style.display    = mode === 'vocab' ? 'block' : 'none';
  document.getElementById('sent-home').style.display     = mode === 'sent'  ? 'block' : 'none';
  document.getElementById('bunpo-home').style.display    = mode === 'bunpo' ? 'block' : 'none';
  document.getElementById('kread-home').style.display    = mode === 'kread' ? 'block' : 'none';
  document.getElementById('conj-home').style.display     = mode === 'conj'  ? 'block' : 'none';
}

function setDir(dir) {
  quizDir = dir;
  document.getElementById('dir-forward').classList.toggle('active', dir === 'forward');
  document.getElementById('dir-reverse').classList.toggle('active', dir === 'reverse');
}

function parseDeck() {
  return document.getElementById('deck-input').value.trim()
    .split('\n').filter(l => l.trim()).map(l => {
      const p = l.split(';').map(s => s.trim());
      if (p.length >= 3) {
        if (quizDir === 'reverse')
          return { front: p[2], reading: p[1], kanji: p[0], meaning: null, mode: 3, dir: 'reverse' };
        return { front: p[0], reading: p[1], meaning: p[2], kanji: null, mode: 3, dir: 'forward' };
      }
      if (p.length === 2) {
        if (quizDir === 'reverse')
          return { front: p[1], reading: p[0], meaning: null, kanji: null, mode: 2, dir: 'reverse' };
        return { front: p[0], reading: p[1], meaning: null, kanji: null, mode: 2, dir: 'forward' };
      }
      return null;
    }).filter(Boolean);
}

function hideDeckError() {
  const el = document.getElementById('deck-error');
  if (el) el.style.display = 'none';
}

function startQuiz() {
  const parsed = parseDeck();
  if (!parsed.length) {
    const el = document.getElementById('deck-error');
    if (el) { el.style.display = 'block'; el.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }
    return;
  }
  hideDeckError();
  cards = shuffle(parsed); idx = 0; results = [];
  showV('quiz-view');
  showCard();
}

function showV(id) {
  ['setup-view','quiz-view','results-view'].forEach(v =>
    document.getElementById(v).style.display = v === id ? 'block' : 'none'
  );
}

function updateProgressBar() {
  document.getElementById('prog-bar').style.width = (idx / cards.length * 100) + '%';
}

function showCard() {
  if (idx >= cards.length) { showResults(); return; }
  const card = cards[idx];
  updateProgressBar();
  document.getElementById('card-front').textContent = card.front;
  document.getElementById('card-prog').textContent = (idx + 1) + ' of ' + cards.length;
  document.getElementById('card-box').className = 'quiz-card';

  const fields = document.getElementById('card-fields');
  fields.innerHTML = '';

  if (card.mode === 3) {
    const lbl1 = card.dir === 'reverse' ? 'Kanji' : 'Meaning';
    const ph1  = card.dir === 'reverse' ? '漢字…' : 'meaning…';
    fields.innerHTML = `
      <div class="field-row"><span class="field-lbl">Reading</span><input class="field-inp" id="inp-0" placeholder="読み方…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></div>
      <div class="field-row"><span class="field-lbl">${lbl1}</span><input class="field-inp" id="inp-1" placeholder="${ph1}" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></div>`;
    document.getElementById('inp-0').addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); checkField(0); document.getElementById('inp-1').focus(); }});
    document.getElementById('inp-1').addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); checkField(1); commitCard(); }});
    ['inp-0','inp-1'].forEach(id => document.getElementById(id).addEventListener('input', () => document.getElementById(id).classList.remove('right','wrong')));
  } else {
    fields.innerHTML = `
      <div class="field-row"><span class="field-lbl">Answer</span><input class="field-inp" id="inp-0" placeholder="answer…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/></div>`;
    document.getElementById('inp-0').addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); checkField(0); commitCard(); }});
    document.getElementById('inp-0').addEventListener('input', () => document.getElementById('inp-0').classList.remove('right','wrong'));
  }
  setTimeout(() => { const f = document.getElementById('inp-0'); if (f) f.focus(); }, 30);
}

function checkField(f) {
  const card = cards[idx];
  const inp = document.getElementById('inp-' + f);
  if (!inp) return;
  const val = inp.value.trim();
  if (!val) return;
  const correct = f === 0 ? card.reading : (card.dir === 'reverse' ? card.kanji : card.meaning);
  const ok = val.toLowerCase() === correct.toLowerCase();
  inp.classList.toggle('right', ok);
  inp.classList.toggle('wrong', !ok);
}

function commitCard() {
  const card = cards[idx];
  const inp0 = document.getElementById('inp-0');
  const inp1 = document.getElementById('inp-1');
  const r0 = inp0 ? inp0.value.trim() : '';
  const r1 = inp1 ? inp1.value.trim() : '';
  const box = document.getElementById('card-box');
  let cardResult;

  if (card.mode === 3) {
    const ok0 = r0.toLowerCase() === card.reading.toLowerCase();
    const ans1correct = card.dir === 'reverse' ? card.kanji : card.meaning;
    const lbl1 = card.dir === 'reverse' ? 'Kanji' : 'Meaning';
    const ok1 = r1.toLowerCase() === ans1correct.toLowerCase();
    cardResult = { front: card.front, mode: 3, dir: card.dir, fields: [
      { label: 'Reading', correct: card.reading, answer: r0, ok: ok0 },
      { label: lbl1, correct: ans1correct, answer: r1, ok: ok1 }
    ]};
    box.classList.add((ok0 && ok1) ? 'card-ok' : 'card-fail');
  } else {
    const ok = r0.toLowerCase() === card.reading.toLowerCase();
    cardResult = { front: card.front, mode: 2, fields: [{ label: 'Answer', correct: card.reading, answer: r0, ok }]};
    box.classList.add(ok ? 'card-ok' : 'card-fail');
  }
  results.push(cardResult);
  setTimeout(() => { idx++; showCard(); }, 500);
}

function skipCard() {
  const card = cards[idx];
  if (card.mode === 3) {
    const ans1correct = card.dir === 'reverse' ? card.kanji : card.meaning;
    const lbl1 = card.dir === 'reverse' ? 'Kanji' : 'Meaning';
    results.push({ front: card.front, mode: 3, dir: card.dir, fields: [
      { label: 'Reading', correct: card.reading, answer: '', ok: false },
      { label: lbl1, correct: ans1correct, answer: '', ok: false }
    ]});
  } else {
    results.push({ front: card.front, mode: 2, fields: [{ label: 'Answer', correct: card.reading, answer: '', ok: false }]});
  }
  idx++; showCard();
}

function ansVal(f) {
  if (f.ok)     return `<span class="ans-ok">✓</span>`;
  if (f.answer) return `<span class="ans-bad">${esc(f.answer)}</span>`;
  return `<span class="ans-skip">—</span>`;
}

function showResults() {
  showV('results-view');
  const rv = document.getElementById('results-view');
  let totalFields = 0, correctFields = 0;
  results.forEach(r => r.fields.forEach(f => { totalFields++; if (f.ok) correctFields++; }));
  const pct  = Math.round((correctFields / totalFields) * 100);
  const wrong = totalFields - correctFields;
  const tier      = pct >= 80 ? 'great' : pct >= 50 ? 'ok' : 'bad';
  const tierLabel = pct >= 80 ? '🎉 Great job!' : pct >= 50 ? '👍 Not bad' : '📚 Keep studying';
  const is3 = results.some(r => r.mode === 3);
  const isReverse = results.some(r => r.dir === 'reverse');
  const col2lbl = isReverse ? 'Kanji' : 'Meaning';

  let thead = `<colgroup><col class="c-num"><col class="c-kanji">`;
  if (is3) thead += `<col class="c-reading"><col class="c-meaning">`;
  else     thead += `<col class="c-reading">`;
  thead += `<col class="c-ans"><col class="c-badge"></colgroup>
  <thead><tr><th>#</th><th>${isReverse ? 'Meaning' : 'Word'}</th>`;
  if (is3) thead += `<th>Reading</th><th>${col2lbl}</th>`;
  else     thead += `<th>Answer</th>`;
  thead += `<th>Your answer</th><th class="th-center">Result</th></tr></thead>`;

  const rows = results.map((r, i) => {
    const allOk = r.fields.every(f => f.ok);
    const badge = allOk ? `<span class="rt-badge rt-badge-ok">✓</span>` : `<span class="rt-badge rt-badge-fail">✗</span>`;
    if (r.mode === 3) {
      const rf = r.fields[0], mf = r.fields[1];
      return `<tr>
        <td><div class="td-pad td-num">${i+1}</div></td>
        <td><div class="td-pad td-kanji">${esc(r.front)}</div></td>
        <td><div class="color-cell ${rf.ok?'cc-ok':'cc-fail'}"><span class="color-cell-inner">${esc(rf.correct)}</span></div></td>
        <td><div class="color-cell ${mf.ok?'cc-ok':'cc-fail'}"><span class="color-cell-inner">${esc(mf.correct)}</span></div></td>
        <td><div class="ans-wrap">
          <div class="ans-row"><span class="ans-lbl">Reading</span><span class="ans-val">${ansVal(rf)}</span></div>
          <div class="ans-row"><span class="ans-lbl">Meaning</span><span class="ans-val">${ansVal(mf)}</span></div>
        </div></td>
        <td class="td-center"><div class="td-badge-cell">${badge}</div></td></tr>`;
    } else {
      const af = r.fields[0];
      return `<tr>
        <td><div class="td-pad td-num">${i+1}</div></td>
        <td><div class="td-pad td-kanji">${esc(r.front)}</div></td>
        <td><div class="color-cell ${af.ok?'cc-ok':'cc-fail'}"><span class="color-cell-inner">${esc(af.correct)}</span></div></td>
        <td><div class="ans-wrap">
          <div class="ans-row"><span class="ans-lbl">Answer</span><span class="ans-val">${ansVal(af)}</span></div>
        </div></td>
        <td class="td-center"><div class="td-badge-cell">${badge}</div></td></tr>`;
    }
  }).join('');

  rv.innerHTML = `
    <div class="res-header">
      <p class="res-title">Results</p>
      <div><span class="score-pill score-${tier}">${tierLabel}</span></div>
      <div class="score-bar-wrap"><div class="score-bar-track"><div class="score-bar-fill score-bar-${tier}" id="score-bar-fill" style="width:0%"></div></div></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-num" style="color:var(--success)">${correctFields}</div><div class="stat-lbl">Correct</div></div>
        <div class="stat"><div class="stat-num" style="color:var(--danger)">${wrong}</div><div class="stat-lbl">Wrong</div></div>
        <div class="stat"><div class="stat-num">${pct}%</div><div class="stat-lbl">Score</div></div>
      </div>
      <button class="res-study-again" onclick="startQuiz()">↩ Study again</button>
    </div>
    <div class="tbl-wrap"><table class="rt">${thead}<tbody>${rows}</tbody></table></div>
    <div class="res-btns">
      <button class="res-btn secondary" onclick="backToSetup()">← Home</button>
      <button class="res-btn" onclick="startQuiz()">Quiz again →</button>
    </div>`;
  setTimeout(() => { const bar = document.getElementById('score-bar-fill'); if (bar) bar.style.width = pct + '%'; }, 100);
}

function backToSetup() { hideDeckError(); showV('setup-view'); }

// ══════════════════════════════════════════════════
// SENTENCE MODE
// ══════════════════════════════════════════════════
let sentCards = [], sentIdx = 0, sentResults = [], sentMode = 'jp2id';

function toggleSentHint(btn) {
  const body = document.getElementById('sent-hint-body');
  const arrow = document.getElementById('sent-hint-arrow');
  const open = body.style.display === 'block';
  body.style.display = open ? 'none' : 'block';
  arrow.textContent = open ? '▸' : '▾';
}

function setSentMode(mode) {
  sentMode = mode;
  ['jp2id','id2jp','both'].forEach(m => {
    const el = document.getElementById('smode-' + m);
    if (el) el.classList.toggle('active', m === mode);
  });
}

function parseSentDeck() {
  return document.getElementById('sent-deck-input').value.trim()
    .split('\n').filter(l => l.trim()).map(l => {
      const p = l.split(';').map(s => s.trim());
      if (p.length < 3) return null;
      // Parse word breakdown: fields after index 2 like "毎朝-まいあさ=setiap pagi"
      const words = [];
      for (let i = 3; i < p.length; i++) {
        const field = p[i].trim();
        if (!field) continue;
        // format: kanji-reading=meaning  OR  kanji-reading (no meaning)
        const eqIdx = field.indexOf('=');
        const dashIdx = field.indexOf('-');
        if (dashIdx > 0) {
          const kanji   = field.slice(0, dashIdx).trim();
          const rest    = field.slice(dashIdx + 1).trim();
          const reading = eqIdx > 0 ? field.slice(dashIdx + 1, eqIdx).trim() : rest;
          const meaning = eqIdx > 0 ? field.slice(eqIdx + 1).trim() : '';
          words.push({ kanji, reading, meaning });
        }
      }
      return { kanji: p[0], reading: p[1], meaning: p[2], words };
    }).filter(Boolean);
}

function startSentQuiz() {
  const parsed = parseSentDeck();
  if (!parsed.length) { alert('No valid sentences found.'); return; }

  // Build cards based on mode
  let raw = [];
  parsed.forEach(s => {
    if (sentMode === 'jp2id')  raw.push({ ...s, dir: 'jp2id' });
    else if (sentMode === 'id2jp') raw.push({ ...s, dir: 'id2jp' });
    else { raw.push({ ...s, dir: 'jp2id' }); raw.push({ ...s, dir: 'id2jp' }); }
  });
  sentCards = shuffle(raw);
  sentIdx = 0; sentResults = [];
  showSentV('sent-quiz-view');
  showSentCard();
}

function showSentV(id) {
  ['sent-setup-view','sent-quiz-view','sent-results-view'].forEach(v =>
    document.getElementById(v).style.display = v === id ? 'block' : 'none'
  );
}

function showKreadV(id) {
  ['kread-setup-view','kread-quiz-view','kread-results-view'].forEach(v =>
    document.getElementById(v).style.display = v === id ? 'block' : 'none'
  );
}

function parseKreadDeck() {
  return document.getElementById('kread-deck-input').value.trim()
    .split('\n').filter(l => l.trim()).map(l => {
      const p = l.split(';').map(s => s.trim());
      if (p.length < 3) return null;
      const words = [];
      for (let i = 3; i < p.length; i++) {
        const field = p[i].trim();
        if (!field) continue;
        const eqIdx = field.indexOf('=');
        const dashIdx = field.indexOf('-');
        if (dashIdx > 0) {
          const kanji   = field.slice(0, dashIdx).trim();
          const reading = eqIdx > 0 ? field.slice(dashIdx + 1, eqIdx).trim() : field.slice(dashIdx + 1).trim();
          const meaning = eqIdx > 0 ? field.slice(eqIdx + 1).trim() : '';
          words.push({ kanji, reading, meaning });
        }
      }
      return { kanji: p[0], reading: p[1], meaning: p[2], words };
    }).filter(Boolean);
}

function startKreadFromHome() {
  const parsed = parseKreadDeck();
  if (!parsed.length) { alert('No valid sentences found.'); return; }
  startKreadQuiz(parsed);
}

function backToKreadSetup()    { stopTimer('kread'); showKreadV('kread-setup-view'); }

function showSentCard() {
  if (sentIdx >= sentCards.length) { showSentResults(); return; }
  const card = sentCards[sentIdx];
  const isJP = card.dir === 'jp2id';

  document.getElementById('sent-prog-bar').style.width = (sentIdx / sentCards.length * 100) + '%';
  document.getElementById('sent-card-prog').textContent = (sentIdx + 1) + ' of ' + sentCards.length;
  document.getElementById('sent-card-box').className = 'quiz-card';

  // Direction badge
  const badge = document.getElementById('sent-dir-badge');
  badge.className = 'sent-direction-badge ' + (isJP ? 'sent-badge-jp' : 'sent-badge-id');
  badge.textContent = isJP ? '🇯🇵 JP → Meaning' : '🇮🇩 Meaning → JP';

  // Prompt
  const prompt = document.getElementById('sent-prompt');
  if (isJP) {
    prompt.className = 'sent-prompt';
    prompt.innerHTML = esc(card.kanji);
  } else {
    prompt.className = 'sent-prompt is-id';
    prompt.innerHTML = esc(card.meaning);
  }

  // Answer field
  const fields = document.getElementById('sent-fields');
  if (isJP) {
    // JP → ID: single text area for meaning
    fields.innerHTML = `
      <div class="field-row">
        <span class="field-lbl">Meaning</span>
        <input class="field-inp" id="sent-inp-0" placeholder="Indonesian translation…" autocomplete="off" autocorrect="off" spellcheck="false"/>
      </div>`;
    const inp = document.getElementById('sent-inp-0');
    inp.addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); commitSentCard(); } });
    inp.addEventListener('input', () => inp.classList.remove('right','wrong'));
    setTimeout(() => inp.focus(), 30);
  } else {
    // ID → JP: single field — accept kanji, hiragana, or katakana
    fields.innerHTML = `
      <div class="field-row">
        <span class="field-lbl">JP</span>
        <input class="field-inp" id="sent-inp-0" placeholder="Write in kanji or hiragana…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="font-family:var(--font-jp)"/>
      </div>`;

    const inp0 = document.getElementById('sent-inp-0');
    inp0.addEventListener('keydown', e => { if (e.key==='Enter') { e.preventDefault(); commitSentCard(); } });
    inp0.addEventListener('input', () => inp0.classList.remove('right','wrong'));
    setTimeout(() => inp0.focus(), 30);
  }

  // Start timer
  startTimer('sent', () => {
    // Time's up — auto-skip with empty answer marked wrong
    stopTimer('sent');
    const card = sentCards[sentIdx];
    sentResults.push({ card, dir: card.dir, userAnswer: '', userReading: '', ok: false, timedOut: true });
    const box = document.getElementById('sent-card-box');
    box.classList.add('card-fail');
    setTimeout(() => { sentIdx++; showSentCard(); }, 600);
  });
}

function normalize(s) { return s.trim().replace(/[。、！？\.\!\?]/g, '').toLowerCase(); }

function commitSentCard() {
  stopTimer('sent');
  const card = sentCards[sentIdx];
  const isJP = card.dir === 'jp2id';
  const box = document.getElementById('sent-card-box');

  let ok, userAnswer, userReading = '';

  if (isJP) {
    const inp = document.getElementById('sent-inp-0');
    userAnswer = inp.value.trim();
    if (!userAnswer) return;
    ok = normalize(userAnswer) === normalize(card.meaning);
    inp.classList.toggle('right', ok);
    inp.classList.toggle('wrong', !ok);
  } else {
    const inp0 = document.getElementById('sent-inp-0');
    userAnswer = inp0.value.trim();
    if (!userAnswer) return;
    // Accept either kanji match or reading match
    const matchKanji   = normalize(userAnswer) === normalize(card.kanji);
    const matchReading = normalize(userAnswer) === normalize(card.reading);
    ok = matchKanji || matchReading;
    inp0.classList.toggle('right', ok);
    inp0.classList.toggle('wrong', !ok);
  }

  sentResults.push({ card, dir: card.dir, userAnswer, userReading, ok });
  box.classList.add(ok ? 'card-ok' : 'card-fail');

  // Show the correct answer briefly before advancing
  setTimeout(() => { sentIdx++; showSentCard(); }, 700);
}

function skipSentCard() {
  stopTimer('sent');
  const card = sentCards[sentIdx];
  sentResults.push({ card, dir: card.dir, userAnswer: '', userReading: '', ok: false });
  sentIdx++; showSentCard();
}

function showSentResults() {
  stopTimer('sent');
  showSentV('sent-results-view');
  const rv = document.getElementById('sent-results-view');
  const total   = sentResults.length;
  const correct = sentResults.filter(r => r.ok).length;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);
  const tier      = pct >= 80 ? 'great' : pct >= 50 ? 'ok' : 'bad';
  const tierLabel = pct >= 80 ? '🎉 Sugoi!' : pct >= 50 ? '👍 Gambatte!' : '📚 Mada mada!';

  const cards = sentResults.map((r, i) => {
    const isJP = r.dir === 'jp2id';
    const okClass = r.ok ? 'sent-rc-ok' : 'sent-rc-fail';
    const dirLabel = isJP ? 'JP → Meaning' : 'Meaning → JP';
    const dirClass = isJP ? 'sent-badge-jp' : 'sent-badge-id';

    // Question text
    const questionText = isJP ? r.card.kanji : r.card.meaning;
    const questionFont = isJP ? 'var(--font-jp)' : 'var(--font)';

    // Correct answer
    let correctHTML;
    if (isJP) {
      correctHTML = `<span style="font-family:var(--font)">${esc(r.card.meaning)}</span>`;
    } else {
      correctHTML = `<span style="font-family:var(--font-jp)">${esc(r.card.kanji)}</span>`;
      if (r.card.reading && r.card.reading !== r.card.kanji) {
        correctHTML += `<span style="font-size:11px;color:var(--text3);font-family:var(--font-jp);margin-left:6px">(${esc(r.card.reading)})</span>`;
      }
    }

    // Your answer
    let yourHTML;
    if (r.ok) {
      yourHTML = `<span class="ans-ok" style="font-family:${r.dir==='jp2id'?'var(--font)':'var(--font-jp)'}">${esc(r.userAnswer)}</span>`;
    } else if (r.userAnswer) {
      yourHTML = `<span class="ans-bad" style="font-family:${r.dir==='jp2id'?'var(--font)':'var(--font-jp)'}">${esc(r.userAnswer)}</span>`;
    } else {
      yourHTML = `<span class="ans-skip">—</span>`;
    }

    return `<div class="sent-rc ${okClass}">
      <div class="sent-rc-top">
        <span class="sent-rc-num">${i+1}</span>
        <span class="sent-direction-badge ${dirClass}" style="font-size:10px;padding:2px 9px;margin-bottom:0">${dirLabel}</span>
        <span class="sent-rc-verdict">${r.ok ? '✓' : '✗'}</span>
      </div>
      <div class="sent-rc-question" style="font-family:${questionFont};${isJP && r.card.reading ? 'padding-bottom:2px' : ''}">${esc(questionText)}</div>
      ${isJP && r.card.reading ? `<div style="font-family:var(--font-jp);font-size:12px;color:var(--teal);padding:0 14px 8px;line-height:1.5">${esc(r.card.reading)}</div>` : ''}
      <div class="sent-rc-answers">
        <div class="sent-rc-ans-row">
          <span class="sent-rc-ans-lbl">Correct answer</span>
          <span class="sent-rc-ans-val">${correctHTML}</span>
        </div>
        <div class="sent-rc-ans-row">
          <span class="sent-rc-ans-lbl">Your answer</span>
          <span class="sent-rc-ans-val">${yourHTML}</span>
        </div>
      </div>
    </div>`;
  }).join('');

  rv.innerHTML = `
    <div class="res-header">
      <p class="res-title">Sentence Results</p>
      <div><span class="score-pill score-${tier}">${tierLabel}</span></div>
      <div class="score-bar-wrap"><div class="score-bar-track"><div class="score-bar-fill score-bar-${tier}" id="sent-score-bar" style="width:0%"></div></div></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-num" style="color:var(--success)">${correct}</div><div class="stat-lbl">Correct</div></div>
        <div class="stat"><div class="stat-num" style="color:var(--danger)">${wrong}</div><div class="stat-lbl">Wrong</div></div>
        <div class="stat"><div class="stat-num">${pct}%</div><div class="stat-lbl">Score</div></div>
      </div>
    </div>
    <div class="sent-rc-list">${cards}</div>
    <div class="res-btns" style="margin-top:1.5rem">
      <button class="res-btn secondary" onclick="backToSentSetup()">← Edit</button>
      <button class="res-btn" onclick="startSentQuiz()">Quiz again →</button>
    </div>`;

  setTimeout(() => {
    const bar = document.getElementById('sent-score-bar');
    if (bar) bar.style.width = pct + '%';
  }, 100);
}

function backToSentSetup() { stopTimer('sent'); showSentV('sent-setup-view'); }

// ══════════════════════════════════════════════════
// FILL BUNPO — Unified Particle + Grammar JLPT Engine
// ══════════════════════════════════════════════════

// ══════════════════════════════════════════════════
// FILL BUNPO — particle + grammar detection engine
// ══════════════════════════════════════════════════

const ALL_PARTICLES = ['は','が','を','に','へ','で','と','から','まで','より','か','も','の','や','ね','よ'];

function detectParticles(hira) {
  const particles = ['には','では','へは','とは','からは','でも','とも','かも','から','まで','より','は','が','を','に','へ','で','と','も','の'];
  const found = [];
  const used = new Set();
  let i = 0;
  while (i < hira.length) {
    let matched = false;
    for (const p of particles) {
      if (hira.slice(i, i + p.length) === p) {
        const prev = hira[i - 1];
        if (prev && prev !== '、' && prev !== '。' && prev !== ' ') {
          if (!used.has(i)) {
            found.push({ particle: p, pos: i, beforeCtx: hira.slice(Math.max(0,i-4),i), afterCtx: hira.slice(i+p.length,i+p.length+4) });
            for (let k = 0; k < p.length; k++) used.add(i+k);
            i += p.length; matched = true; break;
          }
        }
        break;
      }
    }
    if (!matched) i++;
  }
  return found;
}

function generateParticleChoices(correct) {
  // Contextually similar particles — curated for JLPT-level difficulty
  const similar = {
    'は':['が','も','では','の'],'が':['は','も','を','に'],'を':['に','が','で','は'],
    'に':['を','で','へ','と'],'へ':['に','で','から','まで'],'で':['に','を','から','に'],
    'と':['に','で','や','も'],'から':['まで','で','に','より'],'まで':['から','に','で','より'],
    'より':['から','ほど','まで','に'],'も':['は','が','と','しか'],'の':['が','は','に','を'],
    'や':['と','も','か','で'],'か':['ね','よ','な','も'],'ね':['よ','か','な','わ'],'よ':['ね','か','な','わ'],
    'ので':['から','が','のに','て'],'から':['ので','が','のに','て'],'のに':['ので','から','が','て'],
    'ながら':['てから','あとで','ために','まま'],'まま':['ながら','てから','あとで','のに'],
    'ために':['ので','から','のに','ながら'],
    'には':['では','とは','からは','まで'],'では':['には','とは','からは','まで'],
  };
  const pool = (similar[correct] || ALL_PARTICLES.filter(p=>p!==correct)).slice(0,6);
  const distractors = [];
  for (const p of shuffle(pool)) {
    if (p !== correct && !distractors.includes(p) && distractors.length < 3) distractors.push(p);
  }
  while (distractors.length < 3) {
    const fb = ALL_PARTICLES.find(p=>p!==correct&&!distractors.includes(p));
    if (fb) distractors.push(fb); else break;
  }
  return shuffle([correct, ...distractors]);
}

// ── Full N5 Grammar Patterns (for auto-detect) ──
const GRAMMAR_PATTERNS = [
  // ── N5: Verb forms ──
  { level:'N5', pattern:'〜ています', match:/ています/, correct:'ています', distractors:['ておきます','てみます','てあります'], explanation:'〜ています: ongoing action or resultant state.' },
  { level:'N5', pattern:'〜ました', match:/ました(?![がけど])/, correct:'ました', distractors:['ます','ません','ませんでした'], explanation:'〜ました: polite past tense.' },
  { level:'N5', pattern:'〜ません', match:/ません(?!でした)/, correct:'ません', distractors:['ます','ました','ませんでした'], explanation:'〜ません: polite negative form.' },
  { level:'N5', pattern:'〜ませんでした', match:/ませんでした/, correct:'ませんでした', distractors:['ました','ません','ます'], explanation:'〜ませんでした: polite past negative.' },
  { level:'N5', pattern:'〜ましょう', match:/ましょう(?!か)/, correct:'ましょう', distractors:['ます','ません','ませんか'], explanation:'〜ましょう: active invitation "Let’s do it!". ませんか = polite invitation "Would you like to?".' },
  { level:'N5', pattern:'〜ましょうか', match:/ましょうか/, correct:'ましょうか', distractors:['ましょう','ますか','ませんか'], explanation:'〜ましょうか: offer "Shall I help?" / "Shall we...?"' },
  { level:'N5', pattern:'〜ませんか', match:/ませんか/, correct:'ませんか', distractors:['ましょう','ますか','ましょうか'], explanation:'〜ませんか: polite invitation "Would you like to...?"' },
  { level:'N5', pattern:'〜たいです', match:/たいです/, correct:'たいです', distractors:['ます','たくないです','てほしいです'], explanation:'〜たいです: want to do something (speaker’s own desire).' },
  { level:'N5', pattern:'〜たくないです', match:/たくないです/, correct:'たくないです', distractors:['たいです','ません','ないでください'], explanation:'〜たくないです: don’t want to do. Opposite of たいです.' },
  { level:'N5', pattern:'〜てもいいです', match:/てもいいです/, correct:'てもいいです', distractors:['てはいけません','てください','てしまいます'], explanation:'〜てもいいです: granting or requesting permission.' },
  { level:'N5', pattern:'〜てもいいですか', match:/てもいいですか/, correct:'てもいいですか', distractors:['てください','てはいけませんか','てもよろしいですか'], explanation:'〜てもいいですか: requesting permission "May I...?"' },
  { level:'N5', pattern:'〜がほしい', match:/がほしい/, correct:'がほしい', distractors:['がすきです','があります','がいます'], explanation:'ほしい: want to have something (object). Different from たい (want to do).' },
  { level:'N5', pattern:'〜ないでください', match:/ないでください/, correct:'ないでください', distractors:['てください','なくてください','ないください'], explanation:'〜ないでください: please don’t do. Plain negative + でください.' },
  { level:'N5', pattern:'〜てください', match:/てください/, correct:'てください', distractors:['でください','にください','をください'], explanation:'〜てください: politely asking someone to do something.' },
  { level:'N5', pattern:'〜ないです', match:/ないです(?!か)/, correct:'ないです', distractors:['ません','なかったです','ないでしょう'], explanation:'〜ないです: casual negative (informal). Equivalent to ません (polite).' },
  { level:'N5', pattern:'〜なかったです', match:/なかったです/, correct:'なかったです', distractors:['ませんでした','ないです','なかっただ'], explanation:'〜なかったです: informal past negative. Equivalent to ませんでした.' },
  // ── N5: Copula & adjective ──
  { level:'N5', pattern:'〜です (kopula)', match:/[^ないまし]です(?![か。])/, correct:'です', distractors:['ます','でした','ですね'], explanation:'〜です: polite copula for nouns/na-adj. Different from ます (verbs).' },
  { level:'N5', pattern:'〜でした', match:/でした(?![が])/, correct:'でした', distractors:['です','でしょう','でもありました'], explanation:'〜でした: polite past copula. Negative: ではありませんでした.' },
  { level:'N5', pattern:'〜ではありません', match:/ではありません/, correct:'ではありません', distractors:['じゃないです','ではないです','ありません'], explanation:'〜ではありません: formal copula negative. じゃないです = informal.' },
  { level:'N5', pattern:'〜じゃないです', match:/じゃないです/, correct:'じゃないです', distractors:['ではありません','じゃない','じゃありません'], explanation:'〜じゃないです: casual negative. ではありません = formal.' },
  { level:'N5', pattern:'〜くないです (i-adj neg)', match:/くないです/, correct:'くないです', distractors:['くありません','じゃないです','でないです'], explanation:'い-adjective negative: い → くないです. Example: おいしい → おいしくないです.' },
  { level:'N5', pattern:'〜かったです (i-adj past)', match:/かったです/, correct:'かったです', distractors:['かったました','いかったです','だったです'], explanation:'い-adjective past: い → かったです. Example: たかい → たかかったです.' },
  { level:'N5', pattern:'〜くなかったです', match:/くなかったです/, correct:'くなかったです', distractors:['くありませんでした','くないでした','じゃなかったです'], explanation:'い-adjective past negative: い → くなかったです.' },
  // ── N5: Grammar patterns ──
  { level:'N5', pattern:'〜から (alasan)', match:/から[、。]/, correct:'から', distractors:['ので','が','けど'], explanation:'〜から: subjective reason. ので = objective/gentle reason.' },
  { level:'N5', pattern:'〜ほうがいいです', match:/ほうがいい/, correct:'ほうがいい', distractors:['つもりです','はずです','ために'], explanation:'〜たほうがいい: advice "it’s better to do X".' },
  { level:'N5', pattern:'〜しか〜ない', match:/しか/, correct:'しか', distractors:['だけ','ぐらい','ほど'], explanation:'しか + negative = "only" (sense of insufficiency). だけ = positive.' },
  { level:'N5', pattern:'〜だけ', match:/だけ(?![では])/, correct:'だけ', distractors:['しか','ぐらい','ほど'], explanation:'だけ = "only" in positive sentences. しか must be used with negative.' },
  { level:'N5', pattern:'〜ぐらい/くらい', match:/ぐらい|くらい/, correct:'ぐらい', distractors:['だけ','しか','まで'], explanation:'ぐらい/くらい = approximate quantity "about/around". だけ = exact/precise.' },
  { level:'N5', pattern:'〜と (kutipan)', match:/「[^」]+」と/, correct:'と', distractors:['に','が','を'], explanation:'"と" marks direct/indirect quotation: 「...」と言いました.' },
  { level:'N5', pattern:'〜まえに', match:/まえに/, correct:'まえに', distractors:['あとで','てから','ために'], explanation:'〜まえに: "before" doing. Dict-form + まえに. Opposite: 〜てから.' },
  { level:'N5', pattern:'〜あとで', match:/あとで/, correct:'あとで', distractors:['まえに','てから','ながら'], explanation:'〜あとで: "after" (can be time gap). 〜てから = immediate sequence.' },
  { level:'N5', pattern:'〜より', match:/より/, correct:'より', distractors:['から','まで','で'], explanation:'"より" = "than" in comparisons. Pattern: AよりBのほうが〜.' },
  { level:'N5', pattern:'〜のほうが', match:/のほうが/, correct:'のほうが', distractors:['のほうに','のほうで','のほうを'], explanation:'〜のほうが: expresses preference/comparison. Its pair is より.' },
  { level:'N5', pattern:'〜が好きです', match:/が(すき|好き)/, correct:'が', distractors:['を','は','に'], explanation:'好き・嫌い・上手・下手 always use "が", not "を".' },
  { level:'N5', pattern:'〜がわかります', match:/が(わかり|分かり)/, correct:'が', distractors:['を','は','に'], explanation:'わかる uses "が" for what is understood. 知る uses "を".' },
  { level:'N5', pattern:'〜の (nominaliser)', match:/のが(すき|好き|じょうず|上手|へた|下手)/, correct:'の', distractors:['こと','が','を'], explanation:'〜のが好き: nominalizer の here. の/こと both work, のが is more natural.' },
  { level:'N5', pattern:'〜や〜など', match:/や[^、。]*など/, correct:'や', distractors:['と','も','か'], explanation:'"や" for incomplete list + など. "と" for complete/exhaustive list.' },
  { level:'N5', pattern:'〜ています (hasil)', match:/ています(?!か)/, correct:'ています', distractors:['てあります','ておきます','てしまいます'], explanation:'〜ています: can mean "currently" OR "resultant state". Example: 結婚しています.' },
  { level:'N5', pattern:'〜てあります', match:/てあります/, correct:'てあります', distractors:['ています','ておきます','てしまいます'], explanation:'〜てあります: resultant state from someone’s preparation. Different from ています (pure state).' },
  { level:'N5', pattern:'〜に行きます', match:/に(いき|行き)ます/, correct:'に', distractors:['で','へ','を'], explanation:'〜に行く: purpose of going. Verb ます-stem + に + 行く/来る/帰る.' },
  // ── N4: Connective & reason ──
  { level:'N4', pattern:'〜てから', match:/てから/, correct:'てから', distractors:['ながら','てしまって','てみて'], explanation:'〜てから: after doing A, then B. Strict sequence.' },
  { level:'N4', pattern:'〜ながら', match:/ながら/, correct:'ながら', distractors:['てから','てしまって','ために'], explanation:'〜ながら: two simultaneous actions by the same person. Different from てから (sequence).' },
  { level:'N4', pattern:'〜ので', match:/ので[、。]/, correct:'ので', distractors:['から','が','けど'], explanation:'〜ので: sebab objektif/halus. から = subjektif/langsung.' },
  { level:'N4', pattern:'〜のに (disappointment)', match:/のに[、。]/, correct:'のに', distractors:['から','ので','が'], explanation:'〜のに: "even though/despite" — expresses disappointment/contrast.' },
  { level:'N4', pattern:'〜が (kontras)', match:/ですが[、。]|ますが[、。]/, correct:'が', distractors:['けど','のに','でも'], explanation:'〜が: soft contrast. けど = informal. のに = disappointment.' },
  { level:'N4', pattern:'〜けれど/けど', match:/けれど|けど/, correct:'けど', distractors:['が','のに','ので'], explanation:'〜けど: informal contrast. が = polite. のに = disappointment.' },
  // ── N4: Te-form combinations ──
  { level:'N4', pattern:'〜てしまいました', match:/てしまいました/, correct:'てしまいました', distractors:['てしまいます','ておきました','てみました'], explanation:'〜てしまう: terlanjur/menyesal. Past: てしまいました. Kasual: ちゃった.' },
  { level:'N4', pattern:'〜てしまいます', match:/てしまいます/, correct:'てしまいます', distractors:['てしまいました','ておきます','てみます'], explanation:'〜てしまいます: accidentally done/completely finished (negative nuance or sense of completion).' },
  { level:'N4', pattern:'〜てみます', match:/てみ(ます|ました)(?!か)/, correct:'てみます', distractors:['ておきます','てしまいます','てあげます'], explanation:'〜てみる: trying to do something.' },
  { level:'N4', pattern:'〜ておきます', match:/ておき(ます|ました)/, correct:'ておきます', distractors:['てしまいます','てみます','てあげます'], explanation:'〜ておく: prepare in advance for future needs.' },
  { level:'N4', pattern:'〜てくれます', match:/てくれ(ます|ました|て)/, correct:'てくれます', distractors:['てもらいます','てあげます','てしまいます'], explanation:'〜てくれる: someone else does something for me/the speaker’s side.' },
  { level:'N4', pattern:'〜てもらいます', match:/てもらい(ます|ました)/, correct:'てもらいます', distractors:['てくれます','てあげます','てしまいます'], explanation:'〜てもらう: menerima perbuatan baik. Subjek = penerima.' },
  { level:'N4', pattern:'〜てあげます', match:/てあげ(ます|ました)/, correct:'てあげます', distractors:['てくれます','てもらいます','てしまいます'], explanation:'〜てあげる: doing something for someone else. Be careful — can sound condescending.' },
  { level:'N4', pattern:'〜てほしいです', match:/てほしい/, correct:'てほしい', distractors:['てください','てもらいたい','てくれます'], explanation:'〜てほしい: want someone else to do. Different from たい (oneself).' },
  { level:'N4', pattern:'〜てはいけません', match:/てはいけません/, correct:'てはいけません', distractors:['てもいいです','てください','てしまいます'], explanation:'〜てはいけません: strong prohibition. Opposite: てもいいです.' },
  { level:'N4', pattern:'〜なければなりません', match:/なければなりません/, correct:'なければなりません', distractors:['てもいいです','なくてもいいです','ないでください'], explanation:'〜なければなりません: absolute obligation "must". なくてもいい = don’t need to.' },
  { level:'N4', pattern:'〜なくてもいいです', match:/なくてもいいです/, correct:'なくてもいいです', distractors:['なければなりません','ないでください','てはいけません'], explanation:'〜なくてもいい: don’t need to/not required. Opposite of なければならない.' },
  { level:'N4', pattern:'〜ないといけません', match:/ないといけません/, correct:'ないといけません', distractors:['なければなりません','なくてもいいです','ないでください'], explanation:'〜ないといけない: harus (informal). Setara なければならない.' },
  // ── N4: Modality & conjecture ──
  { level:'N4', pattern:'〜そうです (lihat)', match:/そうです(?!ね)/, correct:'そうです', distractors:['らしいです','ようです','みたいです'], explanation:'〜そうです: based on direct visual observation. Different from らしい (external info).' },
  { level:'N4', pattern:'〜らしいです', match:/らしいです/, correct:'らしいです', distractors:['そうです','ようです','みたいです'], explanation:'〜らしい: information from an outside source. Not direct observation.' },
  { level:'N4', pattern:'〜ようです', match:/ようです/, correct:'ようです', distractors:['らしいです','そうです','みたいです'], explanation:'〜ようです: dugaan berdasarkan observasi pembicara.' },
  { level:'N4', pattern:'〜みたいです', match:/みたいです/, correct:'みたいです', distractors:['ようです','らしいです','そうです'], explanation:'〜みたいです: informal ようです. Dugaan berdasarkan observasi.' },
  { level:'N4', pattern:'〜つもりです', match:/つもりです/, correct:'つもりです', distractors:['はずです','でしょう','ために'], explanation:'〜つもりです: personal intention/plan. はず = expectation from outside.' },
  { level:'N4', pattern:'〜はずです', match:/はずです/, correct:'はずです', distractors:['つもりです','でしょう','らしいです'], explanation:'〜はずです: ekspektasi logis "seharusnya". はずがない = mustahil.' },
  { level:'N4', pattern:'〜でしょう', match:/でしょう/, correct:'でしょう', distractors:['ですね','ですよ','でした'], explanation:'〜でしょう: perkiraan/prediksi sopan. Kasual: だろう.' },
  { level:'N4', pattern:'〜かもしれません', match:/かもしれません/, correct:'かもしれません', distractors:['でしょう','はずです','らしいです'], explanation:'〜かもしれません: "mungkin saja" (ketidakpastian 50%). でしょう = lebih yakin.' },
  // ── N4: Purpose & reason ──
  { level:'N4', pattern:'〜ために (tujuan)', match:/ために/, correct:'ために', distractors:['から','ので','のに'], explanation:'〜ために: "demi/untuk" tujuan. Noun/dict形+ために. のに = kontras.' },
  { level:'N4', pattern:'〜ように (tujuan/harapan)', match:/ように(して|なる|する)/, correct:'ように', distractors:['ために','ほどに','くらいに'], explanation:'〜ように: agar/supaya. ように+する = berusaha. ように+なる = menjadi.' },
  { level:'N4', pattern:'〜ようにします', match:/ようにして(います|いました)/, correct:'ようにしています', distractors:['ことにしています','つもりです','はずです'], explanation:'〜ようにしています: membiasakan diri/berusaha secara rutin.' },
  { level:'N4', pattern:'〜ようになります', match:/ようになり(ます|ました)/, correct:'ようになります', distractors:['ことになります','できます','ためになります'], explanation:'〜ようになる: gradual change — "comes to be able to". Different from できる (sudden ability).' },
  { level:'N4', pattern:'〜ことにします', match:/ことにし(ます|ました)/, correct:'ことにします', distractors:['ようにします','はずです','つもりです'], explanation:'〜ことにする: decide to do (one’s own decision).' },
  { level:'N4', pattern:'〜ことになります', match:/ことになり(ます|ました)/, correct:'ことになります', distractors:['ことにします','はずです','つもりです'], explanation:'〜ことになる: decided by circumstance/others. Different from ことにする.' },
  { level:'N4', pattern:'〜ことができます', match:/ことができ(ます|ました)/, correct:'ことができます', distractors:['ことにします','ようになります','はずです'], explanation:'〜ことができる: mampu/bisa melakukan. Setara potential form.' },
  { level:'N4', pattern:'〜ことがあります', match:/ことがあり(ます|ました)/, correct:'ことがあります', distractors:['ことができます','ことにします','ことになります'], explanation:'〜ことがある: have done before (experience). た-form + ことがある.' },
  // ── N4: Conditional ──
  { level:'N4', pattern:'〜たら (kondisi)', match:/たら[、。]/, correct:'たら', distractors:['と','ば','なら'], explanation:'〜たら: condition "if/when/once". Most versatile conditional.' },
  { level:'N4', pattern:'〜ば (kondisi)', match:/[えけせてねべめれ]ば|[^っ]れば/, correct:'ば', distractors:['たら','と','なら'], explanation:'〜ば: logical condition/advice. Godan: え-row + ば. Ichidan: + れば.' },
  { level:'N4', pattern:'〜なら (kondisi)', match:/なら[、。]/, correct:'なら', distractors:['たら','と','ば'], explanation:'〜なら: condition based on received information. "In that case..."' },
  { level:'N4', pattern:'〜と (kondisi otomatis)', match:/と[、。]/, correct:'と', distractors:['たら','ば','なら'], explanation:'〜と: automatic/natural condition (turn right → see the station). Dict-form + と.' },
  { level:'N4', pattern:'〜ばよかった', match:/ばよかった/, correct:'ば', distractors:['たら','と','なら'], explanation:'〜ばよかった: menyesal "seharusnya melakukan". Past unreal.' },
  // ── N4: Other patterns ──
  { level:'N4', pattern:'〜すぎます', match:/すぎます/, correct:'すぎます', distractors:['ます','すぎません','すぎました'], explanation:'〜すぎます: terlalu berlebihan. Stem+すぎる.' },
  { level:'N4', pattern:'〜まま', match:/まま[、。]/, correct:'まま', distractors:['ながら','てから','のに'], explanation:'〜まま: remain in that state without changing.' },
  { level:'N4', pattern:'〜によって', match:/によって/, correct:'によって', distractors:['のために','から','において'], explanation:'〜によって: depends on / varies according to.' },
  { level:'N4', pattern:'〜について', match:/について/, correct:'について', distractors:['に関して','にとって','において'], explanation:'〜について: about/regarding. More specific than に関して.' },
  { level:'N4', pattern:'〜にとって', match:/にとって/, correct:'にとって', distractors:['について','によって','において'], explanation:'〜にとって: "for/from the perspective of". Watashi ni totte = for me.' },
  { level:'N4', pattern:'〜という', match:/という/, correct:'という', distractors:['とは','といって','として'], explanation:'〜という: called/named. 「...」という = called/named "...".' },
  { level:'N4', pattern:'〜として', match:/として/, correct:'として', distractors:['について','にとって','という'], explanation:'〜として: in the capacity/role of. 先生として = as a teacher.' },
  { level:'N4', pattern:'〜ばかり', match:/ばかり(?!では)/, correct:'ばかり', distractors:['だけ','しか','ほど'], explanation:'〜ばかり: "only/always" (nuance of excess). 食べてばかりいる.' },
  { level:'N4', pattern:'〜ところです', match:/ところです/, correct:'ところ', distractors:['はず','つもり','まま'], explanation:'〜ところ: indicates stage of time. するところ=about to, しているところ=in the middle of, したところ=just finished.' },
  { level:'N4', pattern:'〜てしまった (kasual)', match:/てしまった|ちゃった/, correct:'てしまった', distractors:['てみた','ておいた','てあった'], explanation:'〜てしまった/ちゃった: terlanjur (kasual). ちゃった = kontraksi informal.' },
  { level:'N4', pattern:'〜らしい (sifat khas)', match:/らしい(?!です)/, correct:'らしい', distractors:['みたい','よう','そう'], explanation:'〜らしい after noun = "typical of/befitting". 男らしい = manly/like a real man.' },
  { level:'N4', pattern:'〜はずがない', match:/はずがない/, correct:'はずがない', distractors:['はずです','つもりない','わけがない'], explanation:'〜はずがない: "mustahil/tidak mungkin". Kebalikan はずです.' },
  { level:'N4', pattern:'〜わけではない', match:/わけではない/, correct:'わけではない', distractors:['はずではない','ためではない','のではない'], explanation:'〜わけではない: "bukan berarti". Partial negation.' },
  { level:'N4', pattern:'〜ほど', match:/ほど/, correct:'ほど', distractors:['ぐらい','だけ','より'], explanation:'〜ほど: "about/as much as" (scale/degree). AほどBではない = not as much as A.' },
];

// ── Comprehensive N5 Grammar Bank (85+ patterns, JLPT-hard distractors) ──
const GRAMMAR_N5 = [
  // ── PARTICLES ──
  {level:'N5',pattern:'〜は (topik)',sentence:'わたし＿がくせいです。',correct:'は',distractors:['が','も','の'],explanation:'"は" topic marker. "が" subject marker — both look similar but have different functions.'},
  {level:'N5',pattern:'〜が (subjek)',sentence:'つくえのうえに ほん＿あります。',correct:'が',distractors:['は','も','に'],explanation:'"が" marks subject/focus. Don’t swap with "は" (topic).'},
  {level:'N5',pattern:'〜を (objek)',sentence:'まいにち にほんご＿べんきょうします。',correct:'を',distractors:['は','が','に'],explanation:'"を" marks direct object of transitive verb — cannot be replaced with "が" here.'},
  {level:'N5',pattern:'〜に (tujuan)',sentence:'がっこう＿いきます。',correct:'に',distractors:['へ','で','を'],explanation:'"に" vs "へ": both can indicate direction, but "に" is more specific/final destination.'},
  {level:'N5',pattern:'〜へ (arah)',sentence:'とうきょう＿いきたいです。',correct:'へ',distractors:['に','で','から'],explanation:'"へ" emphasizes direction of travel. "に" emphasizes the final destination.'},
  {level:'N5',pattern:'〜で (tempat aksi)',sentence:'としょかん＿べんきょうします。',correct:'で',distractors:['に','を','は'],explanation:'"で" is where an action takes place. "に" is where something exists — distinguish the context!'},
  {level:'N5',pattern:'〜の (kepemilikan)',sentence:'これは わたし＿ほんです。',correct:'の',distractors:['は','が','を'],explanation:'"の" connects nouns. の + noun = possession/qualification.'},
  {level:'N5',pattern:'〜と (dan/bersama)',sentence:'りんご＿みかんをかいました。',correct:'と',distractors:['や','か','も'],explanation:'"と" = "and" (complete, exhaustive). "や" = "and so on" (incomplete list).'},
  {level:'N5',pattern:'〜や (dll)',sentence:'りんご＿みかんなどを かいました。',correct:'や',distractors:['と','か','も'],explanation:'"や" for incomplete lists, always followed by "など". Different from "と".'},
  {level:'N5',pattern:'〜も (juga)',sentence:'わたし＿にほんごがすきです。',correct:'も',distractors:['は','が','を'],explanation:'"も" = "also/too", replaces は・が・を in context.'},
  {level:'N5',pattern:'〜から (dari/asal)',sentence:'わたしは インドネシア＿きました。',correct:'から',distractors:['に','で','へ'],explanation:'"から" starting point/origin. Don’t swap with "に" (destination).'},
  {level:'N5',pattern:'〜まで (sampai)',sentence:'えき＿あるいていきます。',correct:'まで',distractors:['から','に','へ'],explanation:'"まで" end point/final limit. Its pair is "から".'},
  {level:'N5',pattern:'〜より (than)',sentence:'でんしゃ＿バスのほうが やすいです。',correct:'より',distractors:['から','まで','で'],explanation:'"より" = "than" in comparison sentences. Always follow pattern: AよりBのほうが〜.'},
  {level:'N5',pattern:'〜に (waktu spesifik)',sentence:'しちじ＿おきます。',correct:'に',distractors:['で','は','を'],explanation:'"に" for specific times (hour, day, month). Don’t use "に" for まいにち・いつも・よく.'},
  {level:'N5',pattern:'〜に (lokasi ada)',sentence:'へや＿テレビが あります。',correct:'に',distractors:['で','を','は'],explanation:'"に" location of existence (あります/います). "で" location of action — distinguish!'},
  {level:'N5',pattern:'〜で (alat/sarana)',sentence:'バス＿がっこうに いきます。',correct:'で',distractors:['に','を','が'],explanation:'"で" shows tool/means: バスで、えんぴつで、にほんごで.'},
  {level:'N5',pattern:'〜と いっしょに',sentence:'ともだち＿いっしょに えいがを みました。',correct:'と',distractors:['に','で','が'],explanation:'"と" + いっしょに = together with someone. "と" here is not "and".'},
  {level:'N5',pattern:'〜ね (konfirmasi)',sentence:'きょうは いいてんきです＿。',correct:'ね',distractors:['よ','か','な'],explanation:'"ね" seeks confirmation. "よ" asserts new information — their nuances differ!'},
  {level:'N5',pattern:'〜よ (penegasan)',sentence:'あそこに ほんやが あります＿。',correct:'よ',distractors:['ね','か','わ'],explanation:'"よ" new info/assertion. "ね" seeks agreement. "わ" feminine.'},
  {level:'N5',pattern:'〜か (question)',sentence:'これは なんですか＿。',correct:'か',distractors:['ね','よ','な'],explanation:'"か" question marker. No question mark needed when using "か".'},
  // ── VERB FORMS ──
  {level:'N5',pattern:'〜ます (polite)',sentence:'まいにち にほんごを べんきょうし＿。',correct:'ます',distractors:['ました','ません','ましょう'],explanation:'〜ます: polite present/future form. Don’t confuse with ました (past).'},
  {level:'N5',pattern:'〜ました (past)',sentence:'きのう ほんを よみ＿。',correct:'ました',distractors:['ます','ません','ませんでした'],explanation:'〜ました: polite past positive. ませんでした = polite past negative.'},
  {level:'N5',pattern:'〜ません (negative)',sentence:'わたしは さかなを たべ＿。',correct:'ません',distractors:['ます','ました','ませんでした'],explanation:'〜ません: polite present negative. ませんでした = polite past negative.'},
  {level:'N5',pattern:'〜ませんでした',sentence:'きのうは べんきょう＿。',correct:'しませんでした',distractors:['しました','します','していました'],explanation:'〜ませんでした = polite past negative. Different from ませんでした vs していませんでした.'},
  {level:'N5',pattern:'〜ましょう (invitation)',sentence:'いっしょに たべ＿。',correct:'ましょう',distractors:['ます','ません','ませんか'],explanation:'〜ましょう = active invitation "Let’s!". ませんか = polite invitation "Would you like to?".'},
  {level:'N5',pattern:'〜ませんか (gentle invitation)',sentence:'いっしょに いき＿か。',correct:'ません',distractors:['ます','ましょう','たい'],explanation:'〜ませんか = polite/gentle invitation. ましょうか = offer "Shall I...?".'},
  {level:'N5',pattern:'〜てください (permintaan)',sentence:'ここに なまえを かい＿ください。',correct:'て',distractors:['に','で','を'],explanation:'〜てください: polite request. Verb te-form + ください.'},
  {level:'N5',pattern:'〜ています (ongoing)',sentence:'いま あめが ふっ＿います。',correct:'て',distractors:['に','で','が'],explanation:'〜ています: ongoing action OR resultant state. Always te-form + います.'},
  {level:'N5',pattern:'〜ないでください',sentence:'ここで たばこを すわ＿ください。',correct:'ないで',distractors:['なくて','ません','て'],explanation:'〜ないでください = please don’t. "なくて" is not for requests.'},
  {level:'N5',pattern:'〜てもいいですか (izin)',sentence:'ここに すわっ＿もいいですか。',correct:'て',distractors:['に','で','が'],explanation:'〜てもいいですか = bolehkah? Te-form + もいいですか.'},
  {level:'N5',pattern:'〜てはいけません (prohibition)',sentence:'ここで しゃしんを とっ＿はいけません。',correct:'て',distractors:['に','が','で'],explanation:'〜てはいけません = must not. Te-form + はいけません. Distinguish from 〜てもいいです.'},
  // ── ADJECTIVE FORMS ──
  {level:'N5',pattern:'な-adjective + な',sentence:'しずか＿へやですね。',correct:'な',distractors:['い','の','が'],explanation:'な-adjectives (静か、有名、きれい) use "な" before nouns. い-adjectives go directly without な.'},
  {level:'N5',pattern:'い形容詞＋くない',sentence:'このえいがは おもしろ＿ないです。',correct:'く',distractors:['い','に','が'],explanation:'い-adjective negative: drop い, add くない. おもしろい→おもしろくない.'},
  {level:'N5',pattern:'い-adjective + かった (past)',sentence:'きのうは とても さむ＿です。',correct:'かった',distractors:['い','くない','だった'],explanation:'い形容詞 lampau: buang い, tambah かった. さむい→さむかった.'},
  {level:'N5',pattern:'な形容詞＋じゃない',sentence:'このへやは きれい＿ないです。',correct:'じゃ',distractors:['く','が','で'],explanation:'な形容詞 negatif: きれいじゃないです / きれいではありません.'},
  {level:'N5',pattern:'〜い形容詞＋て-form',sentence:'この かばんは おおき＿、べんりです。',correct:'くて',distractors:['くない','いて','かって'],explanation:'い形容詞 て-form: い → くて. おおきい→おおきくて (menghubungkan klausa).'},
  {level:'N5',pattern:'な-adjective + で',sentence:'このみせは しずか＿、すきです。',correct:'で',distractors:['な','に','の'],explanation:'な-adjective て-form = で. しずかで (connecting clauses). Different from しずかな (before noun).'},
  // ── DESIRE & WANT ──
  {level:'N5',pattern:'〜たいです (ingin)',sentence:'にほんに いき＿です。',correct:'たい',distractors:['ます','てほしい','たがる'],explanation:'〜たいです = want to do (oneself). ます-stem + たい. Different from てほしい (want someone else to do).'},
  {level:'N5',pattern:'〜がほしい (want to have)',sentence:'あたらしい かばん＿ほしいです。',correct:'が',distractors:['を','は','に'],explanation:'ほしい always uses "が". Different from 〜たい which uses "を" for its object.'},
  {level:'N5',pattern:'〜たくないです (tidak ingin)',sentence:'きょうは べんきょうし＿です。',correct:'たくない',distractors:['たい','ません','なくて'],explanation:'〜たくない = don’t want to. たい → たくない (like い-adjective negative).'},
  // ── EXISTENCE & LOCATION ──
  {level:'N5',pattern:'〜があります (benda mati)',sentence:'つくえのうえに ほん＿あります。',correct:'が',distractors:['は','を','に'],explanation:'あります: inanimate/non-moving things. います: living things. Always use "が" for the subject.'},
  {level:'N5',pattern:'〜がいます (makhluk hidup)',sentence:'にわに ねこ＿います。',correct:'が',distractors:['は','を','に'],explanation:'います: living things (people, animals). あります: objects. Subject uses "が".'},
  {level:'N5',pattern:'〜にあります vs います',sentence:'いもうとは へや＿います。',correct:'に',distractors:['で','は','を'],explanation:'"に" for location of existence (あります/います). "で" for location of action.'},
  // ── COMPARISON ──
  {level:'N5',pattern:'AよりBのほうが',sentence:'バスより でんしゃ＿ほうが はやいです。',correct:'の',distractors:['が','は','で'],explanation:'AよりBのほうが〜: B is more 〜 than A. "の" after B is required.'},
  {level:'N5',pattern:'〜いちばん〜です (superlative)',sentence:'このみせが いちばん やす＿です。',correct:'い',distractors:['く','な','の'],explanation:'いちばん + い形容詞 (bentuk biasa). いちばん + な形容詞 + です.'},
  // ── TIME EXPRESSIONS ──
  {level:'N5',pattern:'〜から〜まで',sentence:'くじ＿ごごさんじまで はたらきます。',correct:'から',distractors:['まで','に','で'],explanation:'から〜まで: dari〜sampai. から = awal, まで = akhir.'},
  {level:'N5',pattern:'〜まえに (before)',sentence:'ねる＿まえに はを みがきます。',correct:'まえ',distractors:['あと','から','ため'],explanation:'動詞 dict-form + まえに = before doing. Different from あとで = after.'},
  {level:'N5',pattern:'〜あとで (setelah)',sentence:'しゅくだいをした＿、あそびます。',correct:'あとで',distractors:['まえに','てから','ながら'],explanation:'〜あとで: after doing. た-form + あとで. Different from てから (stricter sequence).'},
  // ── SPECIAL PATTERNS ──
  {level:'N5',pattern:'〜はどうですか',sentence:'このりょうり＿どうですか。',correct:'は',distractors:['が','を','で'],explanation:'〜はどうですか = "How about ~?" Use は as topic.'},
  {level:'N5',pattern:'〜ほうがいいです (saran)',sentence:'はやく ねた＿ほうが いいですよ。',correct:'ほう',distractors:['つもり','はず','ため'],explanation:'〜たほうがいい = advice. た-form + ほうがいい. Don’t confuse with つもり (intention) or はず (expectation).'},
  {level:'N5',pattern:'〜しか〜ない',sentence:'さいふに ひゃくえん＿ありません。',correct:'しか',distractors:['だけ','ぐらい','ほど'],explanation:'"しか" always pairs with negative. "だけ" uses positive. Nuance: しか = insufficiency.'},
  {level:'N5',pattern:'〜だけ (only, positive)',sentence:'ひとり＿いけます。',correct:'だけ',distractors:['しか','ぐらい','ほど'],explanation:'"だけ" = only (positive sentence). Different from "しか" which is always negative.'},
  {level:'N5',pattern:'〜ぐらい/くらい (kira-kira)',sentence:'にじかん＿かかります。',correct:'ぐらい',distractors:['だけ','しか','ほど'],explanation:'"ぐらい/くらい" = about/approximately. Approximate quantity/time.'},
  {level:'N5',pattern:'〜から (alasan)',sentence:'つかれました＿、もうかえります。',correct:'から',distractors:['ので','が','て'],explanation:'"から" subjective/direct reason. "ので" is more polite/objective. In N5, "から" is more common.'},
  {level:'N5',pattern:'〜が好きです',sentence:'わたしは おんがく＿すきです。',correct:'が',distractors:['を','は','に'],explanation:'好き・嫌い・上手・下手 always use "が", not "を".'},
  {level:'N5',pattern:'〜が上手です',sentence:'かれは えいご＿じょうずです。',correct:'が',distractors:['は','を','に'],explanation:'上手・下手 use "が". Pattern: [person]は[skill]が上手です.'},
  {level:'N5',pattern:'〜がわかります',sentence:'この もんだいの こたえ＿わかりますか。',correct:'が',distractors:['を','は','に'],explanation:'わかります uses "が" for what is understood. Different from 知ります which uses "を".'},
  {level:'N5',pattern:'〜と (kutipan)',sentence:'かれは「わかりました」＿いいました。',correct:'と',distractors:['に','が','を'],explanation:'"と" marks direct or indirect quotation.'},
  {level:'N5',pattern:'〜のほうが (perbandingan)',sentence:'サッカーとやきゅうと、どちら＿すきですか。',correct:'が',distractors:['は','を','の'],explanation:'どちらが〜ですか = which one is more 〜? Use "が" not "は".'},
  {level:'N5',pattern:'〜に (penerima)',sentence:'ともだち＿てがみを かきました。',correct:'に',distractors:['を','が','で'],explanation:'"に" marks the recipient (indirect object): 〜に あげる/おくる/かく.'},
  {level:'N5',pattern:'〜で (alasan/sebab)',sentence:'かぜ＿がっこうを やすみました。',correct:'で',distractors:['に','が','から'],explanation:'"で" for cause/reason (situation). "から" for subjective reason (clause).'},
  {level:'N5',pattern:'〜に (per/each)',sentence:'いっしゅうかん＿さんかい にほんごを べんきょうします。',correct:'に',distractors:['で','が','は'],explanation:'"に" = per (frekuensi): 一週間に三回 = 3 kali per minggu.'},
  // ── ADDITIONAL N5 PATTERNS ──
  {level:'N5',pattern:'〜ている (resultant state)',sentence:'まどが あい＿います。',correct:'て',distractors:['に','で','が'],explanation:'〜ている can mean a resultant state: 窓が開いている = the window is (in a state of being) open.'},
  {level:'N5',pattern:'〜なります (menjadi)',sentence:'さむく＿なりました。',correct:'なり',distractors:['で','に','へ'],explanation:'〜くなる (adj-i) / 〜になる (adj-na/nama): berubah menjadi. さむい→さむくなる.'},
  {level:'N5',pattern:'〜にします (memutuskan)',sentence:'コーヒー＿します。',correct:'に',distractors:['を','で','が'],explanation:'〜にします = memilih/memutuskan. (コーヒーにします = saya pilih kopi).'},
  {level:'N5',pattern:'〜ながら (while)',sentence:'おんがくを きき＿、べんきょうします。',correct:'ながら',distractors:['てから','あとで','ために'],explanation:'〜ながら = while doing two things simultaneously. ます-stem + ながら.'},
  {level:'N5',pattern:'〜のが好きです',sentence:'えいがを みる＿がすきです。',correct:'の',distractors:['が','こと','を'],explanation:'動詞+のが好き: liking an activity. の・こと both work, but の is more natural here.'},
  {level:'N5',pattern:'〜でしょう (perkiraan)',sentence:'あしたは あめが ふる＿。',correct:'でしょう',distractors:['ですよ','ですね','でした'],explanation:'〜でしょう: polite conjecture. Don’t confuse with でした (past).'},
  {level:'N5',pattern:'〜や〜など',sentence:'くだもの＿やさいなどを かいました。',correct:'や',distractors:['と','も','か'],explanation:'"や" incomplete list + など. "と" complete list without など.'},
  {level:'N5',pattern:'〜のです／んです (penjelasan)',sentence:'あたまが いたい＿です。',correct:'ん',distractors:['の','から','ので'],explanation:'〜んです: explaining/clarifying a situation. More natural than "です" in conversation.'},
  {level:'N5',pattern:'〜ほしい vs たい',sentence:'あたらしい くつ＿ほしいです。',correct:'が',distractors:['を','は','に'],explanation:'ほしい uses "が" for the thing wanted. たい uses "を" for the action wanted.'},
  {level:'N5',pattern:'〜てみます (mencoba)',sentence:'このりょうりを たべ＿みてください。',correct:'て',distractors:['に','で','が'],explanation:'〜てみる: mencoba melakukan. Te-form + みる.'},
  {level:'N5',pattern:'〜てから vs まえに',sentence:'はを みがい＿から、ねます。',correct:'て',distractors:['た','に','が'],explanation:'〜てから: after A (te-form+から), B. まえに: before B (dict+まえに), A.'},
  {level:'N5',pattern:'〜ないといけません',sentence:'もっと べんきょうし＿といけません。',correct:'ない',distractors:['て','なく','ません'],explanation:'〜ないといけません = must. ない-form + といけません. Same meaning as なければなりません.'},
  {level:'N5',pattern:'〜のを忘れました',sentence:'かぎを もっていく＿を わすれました。',correct:'の',distractors:['こと','が','を'],explanation:'〜のを忘れた: lupa melakukan. の・こと bisa, tapi のを lebih natural.'},
  {level:'N5',pattern:'〜に乗ります',sentence:'でんしゃ＿のります。',correct:'に',distractors:['を','で','へ'],explanation:'乗る/降りる use "に". を also works but is rare.'},
  {level:'N5',pattern:'〜を出ます',sentence:'うち＿でます。',correct:'を',distractors:['に','から','で'],explanation:'出る uses "を" for the place left: うちを出る = to leave home.'},
  {level:'N5',pattern:'〜に会います',sentence:'ともだち＿あいます。',correct:'に',distractors:['と','を','が'],explanation:'会う uses "に": 〜に会う = to meet someone.'},
  {level:'N5',pattern:'〜に電話します',sentence:'かれ＿でんわします。',correct:'に',distractors:['を','と','で'],explanation:'電話する uses "に": 〜に電話する = to call someone.'},
  {level:'N5',pattern:'〜で作ります',sentence:'これは かみ＿つくりました。',correct:'で',distractors:['に','を','が'],explanation:'"で" indicates the material used to make something.'},
  {level:'N5',pattern:'〜をVます (crossing)',sentence:'このみち＿わたります。',correct:'を',distractors:['に','で','から'],explanation:'"を" for movement verbs passing through a place: 道を渡る・公園を歩く.'},
  {level:'N5',pattern:'〜と思います',sentence:'あしたは あめが ふる＿おもいます。',correct:'と',distractors:['に','が','を'],explanation:'〜と思います: I think 〜. と marks the content of thought/speech.'},
  {level:'N5',pattern:'〜が一番',sentence:'このクラスで たなかさん＿いちばんせが たかいです。',correct:'が',distractors:['は','で','に'],explanation:'〜が一番: the most 〜. Use "が" to emphasize the superlative subject.'},
  {level:'N5',pattern:'Nounをください',sentence:'みず＿ください。',correct:'を',distractors:['が','は','に'],explanation:'〜をください: please give me 〜. を for the thing being requested.'},
  {level:'N5',pattern:'どのくらいかかります',sentence:'えきまで どの＿かかりますか。',correct:'くらい',distractors:['ほど','だけ','しか'],explanation:'どのくらい = about how (long/far). くらい/ぐらい for approximation.'},
]; // 85 patterns

// ── Comprehensive N4 Grammar Bank (65+ patterns, JLPT-hard distractors) ──
const GRAMMAR_N4 = [
  // ── CONDITIONAL FORMS (hardest — all look similar!) ──
  {level:'N4',pattern:'〜と (kondisi otomatis)',sentence:'このみちを まっすぐ いく＿、えきに つきます。',correct:'と',distractors:['ば','たら','なら'],explanation:'〜と: natural/automatic/scientific condition. Cannot be used for wishes/advice.'},
  {level:'N4',pattern:'〜たら (kondisi)',sentence:'しごとが おわっ＿ら、いっしょに のみましょう。',correct:'た',distractors:['て','に','が'],explanation:'〜たら: general conditional. た-form + ら. Can be used for wishes, advice, surprise.'},
  {level:'N4',pattern:'〜ば (conditional)',sentence:'もっと れんしゅうすれ＿、うまくなりますよ。',correct:'ば',distractors:['と','たら','なら'],explanation:'〜ば: condition as a prerequisite. More formal nuance. Not for simple everyday sentences.'},
  {level:'N4',pattern:'〜なら (asumsi/kondisi)',sentence:'にほんへいく＿、おみやげを かってきてください。',correct:'なら',distractors:['と','たら','ば'],explanation:'〜なら: based on assumption/info from the listener. "If you’re really going to Japan...".'},
  {level:'N4',pattern:'〜ばよかった (menyesal)',sentence:'もっと はやく おきれ＿よかったです。',correct:'ば',distractors:['たら','と','なら'],explanation:'〜ばよかった: regret for not doing. "Should have woken up earlier..."'},
  // ── INFERENCE / HEARSAY (sangat mudah dikacaukan) ──
  {level:'N4',pattern:'〜そうです (penampilan)',sentence:'このりょうりは おいし＿そうです。',correct:'そう',distractors:['らしい','よう','みたい'],explanation:'〜そう (appearance): inference from direct observation. おいしい→おいしそう (drop い).'},
  {level:'N4',pattern:'〜らしいです (info luar)',sentence:'かれは かいしゃいん だ＿です。',correct:'らしい',distractors:['そう','よう','はず'],explanation:'〜らしい: info from outside source/news. Objective evidence. Different from そう (visual).'},
  {level:'N4',pattern:'〜ようです (observasi)',sentence:'かれは つかれている＿です。',correct:'よう',distractors:['らしい','そう','はず'],explanation:'〜よう: inference from speaker’s direct observation. More subjective than らしい.'},
  {level:'N4',pattern:'〜みたいです (kasual)',sentence:'かれは がくせい＿です。',correct:'みたい',distractors:['そう','らしい','よう'],explanation:'〜みたい: casual, same function as よう. But みたい is more informal.'},
  {level:'N4',pattern:'〜はずです (ekspektasi)',sentence:'かれは もうすぐ くる＿です。',correct:'はず',distractors:['つもり','そう','でしょう'],explanation:'〜はずです: logical expectation based on knowledge. Different from つもり (personal intention).'},
  {level:'N4',pattern:'〜でしょう (prediksi)',sentence:'あしたは あめが ふる＿。',correct:'でしょう',distractors:['ですよ','ですね','はずです'],explanation:'〜でしょう: conjecture/prediction. Less certain than はず. Often used for weather.'},
  // ── INTENTION / PLANNING ──
  {level:'N4',pattern:'〜つもりです (niat)',sentence:'らいねん にほんに いく＿です。',correct:'つもり',distractors:['はず','ため','よう'],explanation:'〜つもりです: strong personal intention. Different from はず (logical expectation about others).'},
  {level:'N4',pattern:'〜ことにします (memutuskan)',sentence:'らいねんから にほんごを べんきょうする＿にしました。',correct:'こと',distractors:['はず','つもり','ため'],explanation:'〜ことにする: decide for oneself. Different from ことになる (decided by outside/situation).'},
  {level:'N4',pattern:'〜ことになります (situasi memutuskan)',sentence:'らいげつ とうきょうに ひっこす＿になりました。',correct:'こと',distractors:['はず','つもり','ため'],explanation:'〜ことになる: diputuskan oleh situasi/orang lain, bukan oleh diri sendiri.'},
  // ── TE-FORM COMPOUNDS (sangat mirip!) ──
  {level:'N4',pattern:'〜てから (urutan ketat)',sentence:'しゅくだいをし＿から、テレビをみます。',correct:'て',distractors:['に','で','が'],explanation:'〜てから: after A then B. Stricter sequence than あとで. Te-form + から.'},
  {level:'N4',pattern:'〜てしまいます (accidentally/completely)',sentence:'ケーキを ぜんぶ たべ＿しまいました。',correct:'て',distractors:['に','で','が'],explanation:'〜てしまう: accidentally/regrettably done/completely finished. Te-form + しまう.'},
  {level:'N4',pattern:'〜てみます (mencoba)',sentence:'このりょうりを たべ＿みてください。',correct:'て',distractors:['に','で','が'],explanation:'〜てみる: try doing. Te-form + みる. Different from てしまう.'},
  {level:'N4',pattern:'〜ておきます (persiapan)',sentence:'パーティーのまえに りょうりを つくっ＿おきます。',correct:'て',distractors:['に','で','が'],explanation:'〜ておく: do in advance as preparation. Te-form + おく.'},
  {level:'N4',pattern:'〜てあります (keadaan dipersiapkan)',sentence:'へやに はなが かざっ＿あります。',correct:'て',distractors:['に','で','が'],explanation:'〜てある: object in a state prepared by someone. Different from ている.'},
  {level:'N4',pattern:'〜てもいいです (izin)',sentence:'ここで しゃしんを とっ＿もいいですか。',correct:'て',distractors:['に','が','で'],explanation:'〜てもいいです: granting or requesting permission. Te-form + もいいです.'},
  {level:'N4',pattern:'〜てはいけません (prohibition)',sentence:'ここで たばこを すっ＿はいけません。',correct:'て',distractors:['に','が','で'],explanation:'〜てはいけません: strong prohibition. Te-form + はいけません. Opposite of てもいいです.'},
  // ── GIVING / RECEIVING (sangat sering di ujian) ──
  {level:'N4',pattern:'〜てくれます (orang lain→saya)',sentence:'ともだちが てつだっ＿くれました。',correct:'て',distractors:['に','で','が'],explanation:'〜てくれる: someone else does something for the benefit of the speaker/their family.'},
  {level:'N4',pattern:'〜てあげます (saya→orang lain)',sentence:'ともだちに ほんを かし＿あげました。',correct:'て',distractors:['に','で','が'],explanation:'〜てあげる: doing something for someone else (from the giver’s perspective).'},
  {level:'N4',pattern:'〜てもらいます (saya minta)',sentence:'せんせいに おしえ＿もらいました。',correct:'て',distractors:['に','で','が'],explanation:'〜てもらう: receive a favor/service. Focus on the recipient.'},
  // ── OBLIGATION & PERMISSION ──
  {level:'N4',pattern:'〜なければなりません',sentence:'まいにち やさいを たべ＿なりません。',correct:'なければ',distractors:['なくても','ないで','ません'],explanation:'〜なければなりません: must/obligatory. なければ = if not. Very formal.'},
  {level:'N4',pattern:'〜なくてもいいです',sentence:'あしたは こなく＿もいいですよ。',correct:'て',distractors:['に','で','が'],explanation:'〜なくてもいいです: don’t need to/not required. Opposite of なければなりません.'},
  {level:'N4',pattern:'〜ないといけません',sentence:'もっと れんしゅうし＿といけません。',correct:'ない',distractors:['て','なく','ません'],explanation:'〜ないといけない: must (casual). Same meaning as なければならない but lighter.'},
  // ── CAUSE & REASON ──
  {level:'N4',pattern:'〜ので (polite reason)',sentence:'あめが ふっている＿、でかけません。',correct:'ので',distractors:['から','が','て'],explanation:'〜ので: objective/polite reason. More formal than から. Not used for commands.'},
  {level:'N4',pattern:'〜から (alasan subjektif)',sentence:'つかれた＿、はやくねます。',correct:'から',distractors:['ので','が','て'],explanation:'〜から: subjective/direct reason. More casual than ので. Can be used for commands/requests.'},
  {level:'N4',pattern:'〜のに (contrast/disappointment)',sentence:'がんばった＿、しけんに おちました。',correct:'のに',distractors:['ので','から','が'],explanation:'〜のに: contrast expressing disappointment. "Even though I tried, but...".'},
  // ── CONCURRENT ACTIONS ──
  {level:'N4',pattern:'〜ながら (dua aksi bersamaan)',sentence:'おんがくをきき＿、べんきょうします。',correct:'ながら',distractors:['てから','ために','あとで'],explanation:'〜ながら: two simultaneous actions. Same subject. Main action in the second clause.'},
  {level:'N4',pattern:'〜まま (keadaan tetap)',sentence:'くつを はいた＿、へやに はいりました。',correct:'まま',distractors:['から','ながら','てから'],explanation:'〜まま: remain in state A when B occurs. た-form + まま (positive) or ない-form + まま (negative).'},
  // ── DEGREE & COMPARISON ──
  {level:'N4',pattern:'〜すぎます (terlalu)',sentence:'このバッグは たか＿すぎます。',correct:'すぎ',distractors:['く','い','そう'],explanation:'〜すぎます: terlalu. い形容詞: い→すぎ; な形容詞+verb: stem+すぎ.'},
  {level:'N4',pattern:'〜ほど〜ない (tidak se-)',sentence:'きのうほど さむく＿です。',correct:'ない',distractors:['ます','は','が'],explanation:'AほどBない: B is not as much as A. 昨日ほど寒くない = not as cold as yesterday.'},
  // ── TIME PATTERNS ──
  {level:'N4',pattern:'〜まえに (before)',sentence:'ねる＿に、はを みがきます。',correct:'まえ',distractors:['あと','から','ため'],explanation:'〜まえに: before doing. Dict-form + まえに. Different from あとで (after).'},
  {level:'N4',pattern:'〜後で (setelah)',sentence:'しょくじした＿、さんぽします。',correct:'あとで',distractors:['まえに','てから','ながら'],explanation:'〜あとで: after doing. た-form + あとで. More flexible than てから.'},
  {level:'N4',pattern:'〜間に (selama)',sentence:'やすみの あいだ＿、ほんを よんでいました。',correct:'に',distractors:['で','を','が'],explanation:'〜間に: during the interval of A, B occurs. に here indicates the time of occurrence.'},
  {level:'N4',pattern:'〜ところです (tepat akan/sedang)',sentence:'いま でかける＿です。',correct:'ところ',distractors:['はず','つもり','ため'],explanation:'〜するところ: just about to; 〜ているところ: in the middle of; 〜たところ: just finished.'},
  // ── PURPOSE & RESULT ──
  {level:'N4',pattern:'〜ために (tujuan)',sentence:'にほんごを おぼえる＿、まいにちれんしゅうします。',correct:'ために',distractors:['ので','から','のに'],explanation:'〜ために: purpose/for the sake of. Dict-form + ために. Different from のに (contrast) and から (reason).'},
  {level:'N4',pattern:'〜ようにします (berusaha)',sentence:'まいにち はやく おきる＿にしています。',correct:'よう',distractors:['はず','つもり','ため'],explanation:'〜ようにする: berusaha/mencoba membiasakan diri. よう+にする.'},
  {level:'N4',pattern:'〜ようになります (perubahan)',sentence:'にほんごが はなせる＿になりました。',correct:'よう',distractors:['はず','そう','ため'],explanation:'〜ようになる: perubahan kemampuan/kebiasaan secara bertahap. よう+になる.'},
  // ── ABILITY & EXPERIENCE ──
  {level:'N4',pattern:'〜ことができます (bisa)',sentence:'わたしは ひらがなを よむ＿ができます。',correct:'こと',distractors:['の','が','ため'],explanation:'〜ことができます: formal ability. Dict-form + ことができます. Different from potential form (〜られる).'},
  {level:'N4',pattern:'〜ことがあります (pernah)',sentence:'にほんに いった＿があります。',correct:'こと',distractors:['の','ため','はず'],explanation:'〜ことがある: have done before. た-form + ことがある. Past experience.'},
  {level:'N4',pattern:'〜かた (cara melakukan)',sentence:'このかんじの かき＿を おしえてください。',correct:'かた',distractors:['ます','ながら','てから'],explanation:'〜かた: cara melakukan. ます-stem + かた = cara/metode.'},
  // ── ADJECTIVE FORMS ──
  {level:'N4',pattern:'〜そうです (adj-i penampilan)',sentence:'そとが くら＿そうです。',correct:'く',distractors:['い','な','に'],explanation:'い形容詞+そう: くらい→くら+そう (buang い). な形容詞: 元気そう (そのまま+そう).'},
  {level:'N4',pattern:'〜さ (nominaliser adj)',sentence:'このやまの たか＿は 3000メートルです。',correct:'さ',distractors:['く','い','な'],explanation:'〜さ: turns adjective into noun. たかい→たかさ. み also works: かなしみ.'},
  {level:'N4',pattern:'〜にする vs なる',sentence:'へやを きれい＿しました。',correct:'に',distractors:['く','で','が'],explanation:'〜にする: make into (transitive). 〜になる: become (intransitive). な-adjective/noun uses に.'},
  // ── PASSIVE FORM ──
  {level:'N4',pattern:'〜られます (passive)',sentence:'せんせいに ほめ＿ました。',correct:'られ',distractors:['て','に','され'],explanation:'〜られる: passive form (ichidan/v2). 褒める→褒められる. Godan: 書く→書かれる.'},
  {level:'N4',pattern:'〜られます (potential)',sentence:'わたしは すしを たべ＿ます。',correct:'られ',distractors:['て','に','さ'],explanation:'〜られる: potential (ichidan). 食べる→食べられる. Different from passive only by context.'},
  // ── REPORTED SPEECH / HEARSAY ──
  {level:'N4',pattern:'〜と言っています',sentence:'かれは「いきたい」＿いっています。',correct:'と',distractors:['に','が','を'],explanation:'〜と言っています: he/she is saying that. と marks the content of speech.'},
  {level:'N4',pattern:'〜と聞きました',sentence:'あめが ふる＿きいています。',correct:'と',distractors:['に','が','を'],explanation:'〜と聞く: to hear that. と + 聞く/言う/思う marks the content of information.'},
  // ── ADDITIONAL N4 PATTERNS ──
  {level:'N4',pattern:'〜によって (tergantung)',sentence:'このルールは ひと＿ちがいます。',correct:'によって',distractors:['から','まで','のに'],explanation:'〜によって: tergantung pada/berbeda berdasarkan. に+よって.'},
  {level:'N4',pattern:'〜によって (by/through)',sentence:'この えは かれ＿かかれました。',correct:'によって',distractors:['で','から','に'],explanation:'〜によって: oleh (dalam pasif formal). この絵は彼によって描かれた.'},
  {level:'N4',pattern:'〜ために (sebab)',sentence:'びょうきの＿、がっこうを やすみました。',correct:'ため',distractors:['ので','から','のに'],explanation:'〜ために (reason): usually noun + のため/ために. More formal than ので.'},
  {level:'N4',pattern:'〜し (alasan ganda)',sentence:'このまちは べんり＿、しずか＿、すきです。',correct:'だし',distractors:['で','てから','のに'],explanation:'〜し: adds multiple reasons. A し、B し = because A, and also B...'},
  {level:'N4',pattern:'〜とき (when/at the time)',sentence:'こまった＿、せんせいに きいてください。',correct:'とき',distractors:['ながら','から','まえ'],explanation:'〜とき: when/at the time of. た-form+とき = when (already) done. Dict-form+とき = when about to do.'},
  {level:'N4',pattern:'〜てしまった (penyesalan kasual)',sentence:'たいせつな もの を なくし＿た。',correct:'てしまっ',distractors:['てみ','ておき','てあげ'],explanation:'〜てしまった: menyesal telah melakukan. Versi kasual: 〜ちゃった.'},
  {level:'N4',pattern:'〜ちゃいけない (larangan kasual)',sentence:'ここで あそん＿いけないよ。',correct:'じゃ',distractors:['で','には','は'],explanation:'〜ちゃいけない/じゃいけない: casual prohibition. Formal version: 〜てはいけない.'},
  {level:'N4',pattern:'〜てほしい (ingin orang lain)',sentence:'もっと れんしゅうし＿ほしいです。',correct:'て',distractors:['に','が','で'],explanation:'〜てほしい: want someone else to do. Different from 〜たい (want to do oneself).'},
  {level:'N4',pattern:'〜てあげる vs くれる',sentence:'ともだちが てつだっ＿くれました。',correct:'て',distractors:['に','で','が'],explanation:'てくれる: others→me. てあげる: me→others. てもらう: I receive from others.'},
  {level:'N4',pattern:'〜ことにしている (kebiasaan)',sentence:'まいにち ランニングする＿にしています。',correct:'こと',distractors:['はず','つもり','ため'],explanation:'〜ことにしている: a habit intentionally formed/decided by oneself.'},
  {level:'N4',pattern:'〜ようになった (gradual change)',sentence:'さいきん はやく おきる＿になりました。',correct:'よう',distractors:['こと','はず','ため'],explanation:'〜ようになった: has come to be able to/gotten used to (change from before).'},
  {level:'N4',pattern:'〜させてください (mohon izin)',sentence:'すこし かんがえ＿てください。',correct:'させ',distractors:['て','せ','に'],explanation:'〜させてください: mohon izinkan saya melakukan. Causative form + てください.'},
  {level:'N4',pattern:'〜ていただけますか (very polite request)',sentence:'もう いちど せつめいし＿いただけますか。',correct:'て',distractors:['に','で','が'],explanation:'〜ていただけますか: very polite request. More formal than てください.'},
]; // 65 patterns

// ── JLPT Real Exam Style Questions Bank (N5+N4, 2014–2024+, hard distractors) ──
const JLPT_EXAM_BANK = [
  // ── 2024 ──
  {level:'N5',year:2024,pattern:'〜を',sentence:'わたしは まいにち ごはん＿たべます。',correct:'を',distractors:['が','は','に'],explanation:'"を" marks the object of "食べます". が = subject, に = destination.'},
  {level:'N5',year:2024,pattern:'〜に (penerima)',sentence:'ともだち＿てがみを かきました。',correct:'に',distractors:['を','が','で'],explanation:'"に" marks the recipient of the letter. を = object (手紙を), not a person.'},
  {level:'N4',year:2024,pattern:'〜てもらいます',sentence:'いしゃに くすりを だし＿もらいました。',correct:'て',distractors:['に','が','で'],explanation:'〜てもらう: receive an action from someone else for one’s own benefit.'},
  {level:'N4',year:2024,pattern:'〜ようになりました',sentence:'まいにち れんしゅうして、じょうずに ひける＿になりました。',correct:'よう',distractors:['はず','そう','つもり'],explanation:'〜ようになる: change in ability — "come to be able to do". はず=expectation, そう=appearance.'},
  {level:'N4',year:2024,pattern:'〜ことにします vs なります',sentence:'らいねんから にほんに いく＿にしました。',correct:'こと',distractors:['はず','つもり','ため'],explanation:'ことにする: memutuskan sendiri. ことになる: diputuskan situasi/luar.'},
  // ── 2023 ──
  {level:'N5',year:2023,pattern:'〜で (sarana)',sentence:'えんぴつ＿もじを かきます。',correct:'で',distractors:['に','を','が'],explanation:'"で" indicates the tool or means used to do something.'},
  {level:'N5',year:2023,pattern:'〜はどこですか',sentence:'トイレ＿どこですか。',correct:'は',distractors:['が','を','で'],explanation:'"は" as topic marker in questions. が also works but は is more natural.'},
  {level:'N4',year:2023,pattern:'〜たら',sentence:'しゅくだいが おわっ＿、あそびに きてください。',correct:'た',distractors:['て','に','が'],explanation:'〜たら: "once finished, please come." た+ら = if/once done.'},
  {level:'N4',year:2023,pattern:'〜ことができます',sentence:'かれは えいご＿はなすことができます。',correct:'を',distractors:['が','は','で'],explanation:'〜ことができます: ability. 英語を話す + ことができます. Object (英語) uses を.'},
  {level:'N4',year:2023,pattern:'〜のに (contrast)',sentence:'たくさん たべた＿、おなかが すきました。',correct:'のに',distractors:['ので','から','が'],explanation:'のに: disappointment — "even though I ate a lot, I’m hungry again."'},
  // ── 2022 ──
  {level:'N5',year:2022,pattern:'〜ぐらい (perkiraan)',sentence:'うちから えきまで あるいて じっぷん＿かかります。',correct:'ぐらい',distractors:['だけ','しか','まで'],explanation:'"ぐらい/くらい" expresses approximate quantity. だけ = only (exact), しか = only (negative).'},
  {level:'N5',year:2022,pattern:'〜ている (sedang)',sentence:'おとうとは いま にわで あそん＿います。',correct:'で',distractors:['に','を','が'],explanation:'あそんでいます: 〜ている ongoing action. で = location of action (にわで).'},
  {level:'N4',year:2022,pattern:'〜のに (disappointment)',sentence:'くすりを のんだ＿、まだ あたまが いたいです。',correct:'のに',distractors:['から','ので','が'],explanation:'〜のに: even though I took medicine, my head still hurts (disappointment). から/ので = reason.'},
  {level:'N4',year:2022,pattern:'〜ばよかった',sentence:'もっと はやく おきれ＿よかったです。',correct:'ば',distractors:['たら','と','なら'],explanation:'〜ばよかった: regret for not doing something. ば + よかった = should have...'},
  {level:'N4',year:2022,pattern:'〜て vs 〜ており (polite)',sentence:'かいぎちゅうで、たなかは でかけ＿おります。',correct:'て',distractors:['に','で','が'],explanation:'〜ております: very polite form of 〜ています. て + おります.'},
  // ── 2021 ──
  {level:'N5',year:2021,pattern:'〜が好きです',sentence:'わたしは おんがく＿すきです。',correct:'が',distractors:['を','は','に'],explanation:'好き・嫌い・上手・下手 use "が". "を" is used for 〜たい.'},
  {level:'N5',year:2021,pattern:'〜ませんか',sentence:'いっしょに こうえんへ いき＿か。',correct:'ません',distractors:['ます','ましょう','たい'],explanation:'〜ませんか: gentle invitation. ましょう = active invitation. ませんか = "would you like to?"'},
  {level:'N4',year:2021,pattern:'〜そうです (adj-i)',sentence:'そとが くら＿そうです。あめが ふるかもしれません。',correct:'く',distractors:['い','な','に'],explanation:'い形容詞 + そう: くらい → くら＋そう (buang い). な形容詞: 元気そう.'},
  {level:'N4',year:2021,pattern:'〜によって',sentence:'けっかは ひと＿よって ちがいます。',correct:'に',distractors:['が','で','を'],explanation:'〜によって: "depending on the person" — に＋よって. で = tool/means.'},
  {level:'N4',year:2021,pattern:'〜てほしい',sentence:'もっと れんしゅうし＿ほしいです。',correct:'て',distractors:['に','が','で'],explanation:'〜てほしい: want someone else to do. Different from たい (want to do oneself).'},
  // ── 2020 ──
  {level:'N5',year:2020,pattern:'〜てください (godan)',sentence:'すみません、もう いちど い＿ください。',correct:'って',distractors:['て','で','いて'],explanation:'言ってください: 言う (godan -u) → 言って (te-form with double t). Not 言いて.'},
  {level:'N5',year:2020,pattern:'〜の (pronoun)',sentence:'あかい＿は わたしのです。',correct:'の',distractors:['が','は','を'],explanation:'"の" as a noun pronoun — "the red one is mine". の replaces the noun.'},
  {level:'N4',year:2020,pattern:'〜まま',sentence:'テレビを つけた＿、ねてしまいました。',correct:'まま',distractors:['から','ながら','あとで'],explanation:'〜まま: TV on, stayed that way and fell asleep. ながら = two simultaneous actions.'},
  {level:'N4',year:2020,pattern:'〜ておきます',sentence:'あとで つかうから、ここに おい＿おきます。',correct:'て',distractors:['に','が','で'],explanation:'〜ておく: put/do in advance as preparation for later. Te-form + おく.'},
  {level:'N4',year:2020,pattern:'〜ようにする vs ことにする',sentence:'まいにち にっきを かく＿にしました。',correct:'こと',distractors:['よう','はず','ため'],explanation:'ことにする: decide to do. ようにする: make an effort/try to do (ongoing process).'},
  // ── 2019 ──
  {level:'N5',year:2019,pattern:'〜に (waktu hari)',sentence:'どようび＿ともだちと あいます。',correct:'に',distractors:['で','は','を'],explanation:'"に" for specific times like a particular day. は is used for topic contrast.'},
  {level:'N5',year:2019,pattern:'〜や〜など',sentence:'くだもの＿やさいなどを かいました。',correct:'や',distractors:['と','も','か'],explanation:'"や" for incomplete list — followed by など. "と" for complete list.'},
  {level:'N4',year:2019,pattern:'〜ために (tujuan)',sentence:'けんこうの＿に、まいにち はしります。',correct:'ため',distractors:['ので','から','のに'],explanation:'〜ために: "demi kesehatan, saya berlari setiap hari." のに = kontras/kecewa.'},
  {level:'N4',year:2019,pattern:'〜ようにしています',sentence:'はやね はやおきを する＿にしています。',correct:'よう',distractors:['はず','そう','つもり'],explanation:'〜ようにしています: getting into the habit of or making an effort to do something regularly.'},
  {level:'N4',year:2019,pattern:'〜ことになった (diputuskan)',sentence:'らいねん かいしゃを やめる＿になりました。',correct:'こと',distractors:['はず','つもり','よう'],explanation:'ことになる: decided by situation. Different from ことにする (deciding oneself).'},
  // ── 2018 ──
  {level:'N5',year:2018,pattern:'〜と (kutipan)',sentence:'かれは「わかりました」＿いいました。',correct:'と',distractors:['に','が','を'],explanation:'"と" is used to mark direct or indirect quotation.'},
  {level:'N5',year:2018,pattern:'〜がわかります',sentence:'この もんだいの こたえ＿わかりますか。',correct:'が',distractors:['を','は','に'],explanation:'わかります uses "が" for what is understood. 知ります uses "を".'},
  {level:'N4',year:2018,pattern:'〜てはいけません',sentence:'ここで しゃしんを とっ＿はいけません。',correct:'て',distractors:['に','が','で'],explanation:'〜てはいけません: strong prohibition. Te-form + はいけません. Opposite of てもいいです.'},
  {level:'N4',year:2018,pattern:'〜なければなりません',sentence:'あしたまでに レポートを ださ＿なりません。',correct:'なければ',distractors:['なくても','ないで','ないと'],explanation:'〜なければなりません: must submit the report. なくてもいい = don’t need to.'},
  {level:'N4',year:2018,pattern:'〜らしい vs そう',sentence:'かれは もう けっこんした＿です。',correct:'らしい',distractors:['そう','よう','みたい'],explanation:'らしい: heard from outside source. そう: seen directly. よう: own inference.'},
  // ── 2017 ──
  {level:'N5',year:2017,pattern:'〜から (asal)',sentence:'わたしは タイ＿きました。',correct:'から',distractors:['に','で','を'],explanation:'"から" shows origin/starting point — "I came from Thailand." に = destination.'},
  {level:'N5',year:2017,pattern:'〜だけ',sentence:'ひとり＿いけます。',correct:'だけ',distractors:['しか','ぐらい','ほど'],explanation:'"だけ" = only (positive sentence). "しか" = only (always negative, sense of insufficiency).'},
  {level:'N4',year:2017,pattern:'〜らしいです',sentence:'かれは かいしゃを やめた＿です。',correct:'らしい',distractors:['よう','そう','みたい'],explanation:'〜らしい: information heard from an outside source objectively. Not direct observation.'},
  {level:'N4',year:2017,pattern:'〜てみます',sentence:'あのみせに いっ＿みましょう。',correct:'て',distractors:['に','で','が'],explanation:'〜てみる: "Let’s try going to that store." Trying something out.'},
  {level:'N4',year:2017,pattern:'〜ば vs たら (saran)',sentence:'もっと やさいを たべれ＿、けんこうになりますよ。',correct:'ば',distractors:['と','たら','なら'],explanation:'〜ばいい: for advice/recommendation. と: automatic condition. たら: more general condition.'},
  // ── 2016 ──
  {level:'N5',year:2016,pattern:'〜ほうがいいです',sentence:'はやく ねた＿ほうが いいですよ。',correct:'ほう',distractors:['つもり','はず','ため'],explanation:'〜たほうがいい: saran — "lebih baik tidur lebih cepat." つもり = niat, はず = ekspektasi.'},
  {level:'N5',year:2016,pattern:'〜しか〜ない',sentence:'さいふに ひゃくえん＿ありません。',correct:'しか',distractors:['だけ','ぐらい','ほど'],explanation:'"しか" + negative: "only 100 yen" (sense of insufficiency). だけ uses positive sentence.'},
  {level:'N4',year:2016,pattern:'〜はずです',sentence:'かれは もう えきに ついている＿です。',correct:'はず',distractors:['つもり','そう','よう'],explanation:'〜はずです: "should have arrived" (logical expectation). つもり = speaker’s intention.'},
  {level:'N4',year:2016,pattern:'〜ことにします',sentence:'らいねんから にほんごを べんきょうする＿にしました。',correct:'こと',distractors:['はず','つもり','ため'],explanation:'〜ことにします: deciding to do something (one’s own decision).'},
  {level:'N4',year:2016,pattern:'〜てしまった vs しまっている',sentence:'さいふを おうちに わすれ＿しまいました。',correct:'て',distractors:['に','で','が'],explanation:'〜てしまった: terlanjur/menyesal. Versi kasual: 〜ちゃった (わすれちゃった).'},
  // ── 2015 ──
  {level:'N5',year:2015,pattern:'〜てから (urutan)',sentence:'て＿あらってから、ごはんを たべます。',correct:'を',distractors:['が','は','に'],explanation:'手を洗ってから: "を" for the object of 洗う. After washing hands, then eat.'},
  {level:'N5',year:2015,pattern:'〜ために (sebab)',sentence:'かぜを ひいた＿、がっこうを やすみました。',correct:'ため',distractors:['ので','から','のに'],explanation:'〜ために (reason): noun + のため or て-form + ために. Formal/written.'},
  {level:'N4',year:2015,pattern:'〜ば (kondisi)',sentence:'もっと れんしゅうすれ＿、じょうずになりますよ。',correct:'ば',distractors:['と','たら','なら'],explanation:'〜ば: "if you practice more, you’ll surely improve." Condition as prerequisite.'},
  {level:'N4',year:2015,pattern:'〜てしまいます',sentence:'さいふを わすれ＿しまいました。',correct:'て',distractors:['に','で','が'],explanation:'〜てしまう: terlanjur lupa membawa dompet (disesali). Te-form + しまう.'},
  {level:'N4',year:2015,pattern:'〜ところ (baru saja)',sentence:'いま しゅくだいを おわった＿です。',correct:'ところ',distractors:['はず','つもり','まま'],explanation:'〜たところ: just finished doing. した+ところ = just finished.'},
  // ── 2014 ──
  {level:'N5',year:2014,pattern:'〜まえに',sentence:'ねる＿まえに、はを みがきます。',correct:'まえ',distractors:['あと','から','ため'],explanation:'〜まえに: "before sleeping, brush teeth." Dict-form + まえに.'},
  {level:'N5',year:2014,pattern:'〜より',sentence:'でんしゃ＿バスのほうが やすいです。',correct:'より',distractors:['から','まで','で'],explanation:'"より" = daripada. "Bus lebih murah daripada kereta." Pola: AよりBのほうが〜.'},
  {level:'N4',year:2014,pattern:'〜ようです (dugaan)',sentence:'かれは にほんに いった＿です。',correct:'よう',distractors:['らしい','そう','はず'],explanation:'〜ようです: inference based on speaker’s direct observation. らしい = info from outside.'},
  {level:'N4',year:2014,pattern:'〜ことがあります',sentence:'にほんに いった＿があります。',correct:'こと',distractors:['の','ため','はず'],explanation:'〜ことがあります: have done something before (experience). た-form + ことがある.'},
  // ── BONUS: Extra Hard (mixed grammar discrimination) ──
  {level:'N4',year:2023,pattern:'〜てみた vs てしまった',sentence:'あたらしい レストランに いっ＿みました。',correct:'て',distractors:['に','が','で'],explanation:'〜てみる = coba pergi. てしまう = terlanjur pergi. Konteks berbeda!'},
  {level:'N4',year:2022,pattern:'〜ようにする vs ことにする',sentence:'もう おそい じかんに たべない＿にした。',correct:'こと',distractors:['よう','はず','ため'],explanation:'ことにした: decided not to eat late. ようにした: made an effort not to (ongoing process).'},
  {level:'N5',year:2023,pattern:'〜が/は (topik vs subjek)',sentence:'きのう、たなかさん＿きました。',correct:'が',distractors:['は','も','を'],explanation:'"が" for new info/focus. "は" for topic/contrast. New information → use が.'},
  {level:'N4',year:2021,pattern:'〜はずがない (mustahil)',sentence:'かれが そんな うそを つく＿が ない。',correct:'はず',distractors:['こと','つもり','よう'],explanation:'〜はずがない: impossible/can’t be. Opposite of はずだ (should be).'},
  {level:'N4',year:2020,pattern:'〜にする (menjadikan)',sentence:'この へやを きれい＿しましょう。',correct:'に',distractors:['で','を','が'],explanation:'〜にする = menjadikan. な形容詞/nomina+にする. い形容詞: くする (yasuくする).'},
  {level:'N5',year:2024,pattern:'〜のが/のを (nominaliser)',sentence:'およぐ＿がすきです。',correct:'の',distractors:['こと','が','を'],explanation:'〜のが好き: liking an activity. の/こと both work, but のが is more natural here.'},
  {level:'N4',year:2019,pattern:'〜ことができる vs られる',sentence:'かれは 5かいごも はなせ＿。',correct:'る',distractors:['られる','ことができる','て'],explanation:'Potential: godan 話す → 話せる. Ichidan 食べる → 食べられる. 話す adalah godan.'},
  {level:'N4',year:2018,pattern:'〜という (disebut)',sentence:'「さくら」＿いう はなは きれいですね。',correct:'と',distractors:['が','に','を'],explanation:'〜という: called/named. 「さくら」という花 = a flower called sakura.'},
]; // 55+ questions

// ── Parse user deck ──────────────────────────────
function parseBunpoDeck() {
  const raw = document.getElementById('bunpo-deck-input').value.trim();
  if (!raw) return [];
  return raw.split('\n').filter(l => l.trim()).map(l => {
    const p = l.split(';').map(s => s.trim());
    if (p.length < 2) return null;
    return { kanji: p[0], reading: p[1] || p[0], meaning: p[2] || '' };
  }).filter(Boolean);
}

// ── Extract particle questions from user sentence ─
function extractParticleQuestions(sent) {
  const slots = detectParticles(sent.reading);
  const questions = [];
  slots.forEach(slot => {
    const withBlankReading = sent.reading.slice(0, slot.pos) + '【＿】' + sent.reading.slice(slot.pos + slot.particle.length);
    // Try to build kanji sentence with blank at same position (approximate: replace particle in kanji too)
    const kanjiSentence = sent.kanji || sent.reading;
    questions.push({
      qtype: 'particle',
      level: 'N5',
      sentence: withBlankReading,        // hiragana with blank (for display reading line)
      kanjiSentence: kanjiSentence,      // original kanji sentence (shown as question)
      reading: sent.reading,
      kanji: sent.kanji,
      meaning: sent.meaning,
      correct: slot.particle,
      choices: generateParticleChoices(slot.particle),
      context: slot.beforeCtx + '[?]' + slot.afterCtx,
      explanation: `Particle "${slot.particle}" in context: …${slot.beforeCtx}【${slot.particle}】${slot.afterCtx}…`,
    });
  });
  return questions;
}

// ── Extract grammar pattern questions from user sentence ─
function extractGrammarQuestions(sent) {
  const questions = [];
  const text = sent.reading + sent.kanji;
  GRAMMAR_PATTERNS.forEach(gp => {
    if (gp.match.test(text)) {
      const matchInReading = sent.reading.match(gp.match);
      if (!matchInReading) return;
      const matchStr = matchInReading[0];
      const pos = sent.reading.indexOf(matchStr);
      const withBlank = sent.reading.slice(0, pos) + '【＿】' + sent.reading.slice(pos + matchStr.length);
      questions.push({
        qtype: 'grammar',
        level: gp.level,
        pattern: gp.pattern,
        patternMeaning: '',
        sentence: withBlank,
        kanjiSentence: sent.kanji || sent.reading,
        reading: sent.reading,
        kanji: sent.kanji,
        meaning: sent.meaning,
        correct: gp.correct,
        choices: shuffle([gp.correct, ...gp.distractors.slice(0,3)]),
        explanation: gp.explanation,
      });
    }
  });
  return questions;
}

// ── Build pool based on source ───────────────────
const JLPT_QUIZ_COUNT = 50;
function buildBunpoPool() {
  const pool = [];
  if (bunpoSource === 'own') {
    const userSents = parseBunpoDeck();
    userSents.forEach(sent => {
      pool.push(...extractParticleQuestions(sent));
      pool.push(...extractGrammarQuestions(sent));
    });
    if (!pool.length) {
      // fallback: add N5+N4 bank if user sentences yield nothing
      [...GRAMMAR_N5, ...GRAMMAR_N4].forEach(g => pool.push(bankToQ(g)));
    }
  } else if (bunpoSource === 'N5') {
    GRAMMAR_N5.forEach(g => pool.push(bankToQ(g)));
  } else if (bunpoSource === 'N4') {
    GRAMMAR_N4.forEach(g => pool.push(bankToQ(g)));
  } else if (bunpoSource === 'N5N4') {
    [...GRAMMAR_N5, ...GRAMMAR_N4].forEach(g => pool.push(bankToQ(g)));
  } else if (bunpoSource === 'jlpt') {
    const all = shuffle([...JLPT_EXAM_BANK]);
    all.slice(0, JLPT_QUIZ_COUNT).forEach(g => pool.push(bankToQ(g)));
  } else if (bunpoSource === 'jlptN5') {
    const n5 = shuffle(JLPT_EXAM_BANK.filter(g => g.level === 'N5'));
    n5.slice(0, JLPT_QUIZ_COUNT).forEach(g => pool.push(bankToQ(g)));
  } else if (bunpoSource === 'jlptN4') {
    const n4 = shuffle(JLPT_EXAM_BANK.filter(g => g.level === 'N4'));
    n4.slice(0, JLPT_QUIZ_COUNT).forEach(g => pool.push(bankToQ(g)));
  }
  return pool;
}

function bankToQ(g) {
  return {
    qtype: 'grammar',
    level: g.level,
    pattern: g.pattern,
    patternMeaning: g.patternMeaning || '',
    year: g.year || null,
    sentence: g.sentence,
    reading: '',
    meaning: '',
    correct: g.correct,
    choices: shuffle([g.correct, ...g.distractors.slice(0,3)]),
    explanation: g.explanation,
  };
}

// ── Bunpo state ─────────────────────────────────
let bunpoSource = 'own';
let bunpoSecsPerQ = 0;
let bunpoQueue = [];
let bunpoLastQueue = [];
let bunpoIdx = 0;
let bunpoResults = [];
let bunpoSkipped = []; // questions skipped, to re-queue
let bunpoTimerInterval = null;

function setBunpoSource(src) {
  bunpoSource = src;
  ['own','N5','N4','N5N4','jlpt','jlptN5','jlptN4'].forEach(k => {
    const el = document.getElementById('bpsrc-' + k.toLowerCase());
    if (el) el.classList.toggle('active', k === src);
  });
  const hints = {
    own:    'Particles & grammar patterns auto-detected from your sentences',
    N5:     'Full N5 grammar questions — all mandatory JLPT N5 patterns',
    N4:     'Full N4 grammar questions — all mandatory JLPT N4 patterns',
    N5N4:   'Combined N5 + N4 question bank',
    jlpt:   'Authentic JLPT questions 2014–2024 (N5 & N4) · 35 random per session',
    jlptN5: 'Authentic JLPT N5 questions 2014–2024 · 35 random per session',
    jlptN4: 'Authentic JLPT N4 questions 2014–2024 · 35 random per session',
  };
  const hintEl = document.getElementById('bpsrc-hint');
  if (hintEl) hintEl.textContent = hints[src] || '';
  const ownArea = document.getElementById('bp-own-area');
  if (ownArea) ownArea.style.display = src === 'own' ? '' : 'none';
}

function stepBunpoSecs(d) {
  bunpoSecsPerQ = Math.max(0, bunpoSecsPerQ + d);
  const val = document.getElementById('bp-secs-val');
  const info = document.getElementById('bp-secs-info');
  if (bunpoSecsPerQ === 0) {
    if (val) { val.textContent = 'OFF'; val.className = 'timer-off-label'; }
    if (info) info.textContent = 'Off';
  } else {
    if (val) { val.textContent = bunpoSecsPerQ; val.className = 'timer-stepper-val'; }
    if (info) info.textContent = bunpoSecsPerQ + ' sec';
  }
}

function showBunpoV(id) {
  ['bunpo-setup-view','bunpo-quiz-view','bunpo-results-view'].forEach(v => {
    document.getElementById(v).style.display = v===id ? 'block' : 'none';
  });
}

function startBunpoQuiz(repeat) {
  let pool;
  if (repeat && bunpoLastQueue.length) {
    pool = bunpoLastQueue;
  } else {
    pool = shuffle(buildBunpoPool());
    if (!pool.length) {
      alert('No questions could be generated. Check your sentences or pick a different source.');
      return;
    }
    bunpoLastQueue = pool;
  }
  bunpoQueue = pool.map(q => ({
    ...q,
    choices: shuffle([q.correct, ...q.choices.filter(c => c !== q.correct).slice(0, 3)])
  }));
  bunpoIdx = 0; bunpoResults = []; bunpoSkipped = [];
  showBunpoV('bunpo-quiz-view');
  renderBunpoCard();
}

function renderBunpoCard() {
  if (bunpoIdx >= bunpoQueue.length) {
    // Check if there are skipped questions to re-queue
    if (bunpoSkipped.length > 0) {
      const reshuffled = shuffle([...bunpoSkipped]);
      bunpoSkipped = [];
      bunpoQueue = [...bunpoQueue, ...reshuffled];
    } else {
      showBunpoResults(); return;
    }
  }
  const q = bunpoQueue[bunpoIdx];

  document.getElementById('bunpo-prog-bar').style.width = (bunpoIdx / bunpoQueue.length * 100) + '%';
  document.getElementById('bunpo-card-prog').textContent = (bunpoIdx+1) + ' / ' + bunpoQueue.length;
  document.getElementById('bunpo-card-box').className = 'quiz-card';
  document.getElementById('bunpo-next-btn').style.display = 'none';
  document.getElementById('bunpo-skip-btn').style.display = '';
  document.getElementById('bunpo-finish-btn').style.display = '';
  document.getElementById('bunpo-explanation').style.display = 'none';

  // Level badge
  const lvlBadge = document.getElementById('bunpo-level-badge');
  let lvlText = q.level || 'N?';
  if (q.year) lvlText += ' · ' + q.year;
  lvlBadge.textContent = lvlText;
  lvlBadge.style.cssText = (q.level==='N5')
    ? 'font-size:10px;font-weight:700;letter-spacing:0.1em;padding:3px 10px;border-radius:99px;background:rgba(56,189,248,0.12);color:#38BDF8;border:1px solid rgba(56,189,248,0.25)'
    : 'font-size:10px;font-weight:700;letter-spacing:0.1em;padding:3px 10px;border-radius:99px;background:rgba(124,110,250,0.15);color:#9D92FB;border:1px solid rgba(124,110,250,0.25)';

  // Type badge
  const typeBadge = document.getElementById('bunpo-type-badge');
  if (q.qtype==='grammar') {
    typeBadge.textContent = '文法 Grammar';
    typeBadge.style.cssText = 'font-size:10px;font-weight:600;padding:3px 10px;border-radius:99px;background:rgba(240,160,75,0.12);color:#F0A04B;border:1px solid rgba(240,160,75,0.25)';
  } else {
    typeBadge.textContent = '助詞 Particle';
    typeBadge.style.cssText = 'font-size:10px;font-weight:600;padding:3px 10px;border-radius:99px;background:rgba(62,207,142,0.12);color:#3ECF8E;border:1px solid rgba(62,207,142,0.25)';
  }

  // Sentence display — show kanji sentence as the question (main display)
  // For JLPT bank, kanjiSentence is undefined, fall back to sentence (hiragana with blank)
  const sentEl = document.getElementById('bunpo-sentence');
  const blankHtml = '<span style="display:inline-block;min-width:64px;border-bottom:2.5px solid var(--accent);color:var(--accent);font-weight:700;text-align:center;margin:0 4px;padding:0 6px;vertical-align:middle" id="bunpo-blank-span">　　</span>';

  // Show kanji sentence (no blank shown in kanji — it's the context)
  // Show hiragana sentence with blank as the actual fill-in prompt
  const hasKanji = q.kanjiSentence && q.kanjiSentence !== q.sentence;
  if (hasKanji) {
    // Show kanji as context header
    sentEl.innerHTML = `<div style="font-size:13px;color:var(--text3);font-family:var(--font-jp);margin-bottom:8px;word-break:break-all">${esc(q.kanjiSentence)}</div>` +
      esc(q.sentence).replace('【＿】', blankHtml).replace('＿', blankHtml);
  } else {
    sentEl.innerHTML = esc(q.sentence)
      .replace('【＿】', blankHtml)
      .replace('＿', blankHtml);
  }

  // Choices — 2×2 grid
  const labels = ['１','２','３','４'];
  const choicesEl = document.getElementById('bunpo-choices');
  let choices = [...q.choices];
  while (choices.length < 4) choices.push('―');
  choices = choices.slice(0,4);

  choicesEl.innerHTML = choices.map((ch, i) => `
    <button onclick="chooseBunpo(this,'${esc(ch)}')" data-val="${esc(ch)}"
      style="padding:16px 10px;border-radius:var(--q-r-sm);border:1.5px solid var(--border-strong);background:var(--surface2);
             font-family:var(--font-jp);font-size:20px;font-weight:700;color:var(--text);cursor:pointer;
             text-align:center;transition:all 0.15s;position:relative;user-select:none;min-height:60px;">
      <span style="position:absolute;top:5px;left:8px;font-size:10px;font-weight:700;font-family:var(--font-jp);color:var(--text3)">${labels[i]}</span>
      ${esc(ch)}
    </button>`).join('');

  choicesEl.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('mouseover', () => { if (!btn.disabled) { btn.style.background='var(--surface3)'; btn.style.borderColor='var(--accent)'; btn.style.color='var(--accent)'; }});
    btn.addEventListener('mouseout',  () => { if (!btn.disabled) { btn.style.background='var(--surface2)'; btn.style.borderColor='var(--border-strong)'; btn.style.color='var(--text)'; }});
  });

  // Start per-question timer if set
  startBunpoTimer();
}

function startBunpoTimer() {
  if (bunpoTimerInterval) clearInterval(bunpoTimerInterval);
  if (!bunpoSecsPerQ) return;
  bunpoSecsLeft = bunpoSecsPerQ;
  updateBunpoTimerDisplay();
  bunpoTimerInterval = setInterval(() => {
    bunpoSecsLeft--;
    updateBunpoTimerDisplay();
    if (bunpoSecsLeft <= 0) {
      clearInterval(bunpoTimerInterval);
      bunpoTimerInterval = null;
      // Auto-skip: count as wrong (no answer)
      const q = bunpoQueue[bunpoIdx];
      bunpoResults.push({ q, chosen: '—', isCorrect: false });
      bunpoIdx++;
      renderBunpoCard();
    }
  }, 1000);
}

function updateBunpoTimerDisplay() {
  const el = document.getElementById('bunpo-timer-num');
  const fill = document.getElementById('bunpo-timer-fill');
  const display = document.getElementById('bunpo-timer-display');
  if (!display) return;
  if (!bunpoSecsPerQ) { display.style.display = 'none'; return; }
  display.style.display = '';
  if (el) {
    el.textContent = bunpoSecsLeft;
    el.className = 'quiz-timer-num' + (bunpoSecsLeft <= 5 ? ' danger' : bunpoSecsLeft <= 10 ? ' warn' : '');
  }
  if (fill) {
    const pct = bunpoSecsLeft / bunpoSecsPerQ;
    const circ = 113.1;
    fill.style.strokeDashoffset = circ * (1 - pct);
    fill.className = 'timer-fill' + (bunpoSecsLeft <= 5 ? ' danger' : bunpoSecsLeft <= 10 ? ' warn' : '');
  }
}

function chooseBunpo(btn, chosen) {
  if (bunpoTimerInterval) { clearInterval(bunpoTimerInterval); bunpoTimerInterval = null; }
  const q = bunpoQueue[bunpoIdx];
  const isCorrect = chosen === q.correct;
  // Briefly highlight chosen button then advance
  btn.style.background = 'var(--accent-dim)';
  btn.style.borderColor = 'var(--accent)';
  document.querySelectorAll('#bunpo-choices button').forEach(b => b.disabled = true);
  bunpoResults.push({ q, chosen, isCorrect });
  setTimeout(() => { bunpoIdx++; renderBunpoCard(); }, 350);
}

function nextBunpoCard() {
  if (bunpoTimerInterval) { clearInterval(bunpoTimerInterval); bunpoTimerInterval = null; }
  bunpoIdx++;
  renderBunpoCard();
}

function skipBunpoCard() {
  if (bunpoTimerInterval) { clearInterval(bunpoTimerInterval); bunpoTimerInterval = null; }
  const q = bunpoQueue[bunpoIdx];
  // Put skipped question back into the skipped pool (re-appears at end, shuffled)
  bunpoSkipped.push({...q, choices: shuffle([q.correct, ...q.choices.filter(c=>c!==q.correct).slice(0,3)])});
  bunpoIdx++;
  renderBunpoCard();
}

function finishBunpoEarly() {
  if (bunpoTimerInterval) { clearInterval(bunpoTimerInterval); bunpoTimerInterval = null; }
  // Questions not yet answered (from bunpoIdx onward) go back as skipped, reshuffled
  const remaining = bunpoQueue.slice(bunpoIdx);
  if (remaining.length > 0) {
    const reshuffled = shuffle(remaining.map(q => ({...q, choices: shuffle([q.correct, ...q.choices.filter(c=>c!==q.correct).slice(0,3)])})));
    // Add skipped to remaining and requeue
    const allPending = [...reshuffled, ...bunpoSkipped];
    bunpoSkipped = [];
    if (allPending.length > 0 && bunpoResults.length > 0) {
      // If there are already some results, show results now and remaining will not be counted
      showBunpoResults();
    } else if (bunpoResults.length === 0) {
      alert('No questions answered yet!');
    } else {
      showBunpoResults();
    }
  } else {
    showBunpoResults();
  }
}

function backToBunpoSetup() { if(bunpoTimerInterval){clearInterval(bunpoTimerInterval);bunpoTimerInterval=null;} showBunpoV('bunpo-setup-view'); }

function showBunpoResults() {
  showBunpoV('bunpo-results-view');
  const rv = document.getElementById('bunpo-results-view');
  const total = bunpoResults.length;
  const correct = bunpoResults.filter(r=>r.isCorrect).length;
  const wrong = total - correct;
  const pct = total > 0 ? Math.round(correct/total*100) : 0;
  const tier = pct>=80?'great':pct>=50?'ok':'bad';
  const tierLabel = pct>=80?'🎉 Sugoi! Great!':pct>=50?'👍 Not bad, keep practicing!':'📚 Keep studying!';

  const grammarCorrect = bunpoResults.filter(r=>r.q.qtype==='grammar'&&r.isCorrect).length;
  const grammarTotal   = bunpoResults.filter(r=>r.q.qtype==='grammar').length;
  const ptclCorrect    = bunpoResults.filter(r=>r.q.qtype==='particle'&&r.isCorrect).length;
  const ptclTotal      = bunpoResults.filter(r=>r.q.qtype==='particle').length;

  // Group results by source sentence (kanji or sentence string)
  // Each unique sentence = one result block, may contain multiple sub-questions
  const sentenceMap = new Map();
  bunpoResults.forEach((r, i) => {
    const q = r.q;
    // Key: use kanjiSentence if present, else sentence (with blank removed for grouping)
    const rawKey = (q.kanjiSentence || q.kanji || q.sentence || '').replace(/【＿】|＿/g, '?');
    const key = rawKey || ('_idx_' + i);
    if (!sentenceMap.has(key)) {
      sentenceMap.set(key, {
        kanji: q.kanjiSentence || q.kanji || '',
        reading: q.reading || '',
        meaning: q.meaning || '',
        sentence: q.sentence,
        results: [],
        level: q.level,
        year: q.year,
      });
    }
    sentenceMap.get(key).results.push(r);
  });

  let lineNum = 0;
  const cards = Array.from(sentenceMap.values()).map(group => {
    lineNum++;
    const groupCorrect = group.results.filter(r=>r.isCorrect).length;
    const groupTotal   = group.results.length;
    const allOk = groupCorrect === groupTotal;
    const isGrammar = group.results[0]?.q.qtype === 'grammar';

    const badgeStyle = isGrammar
      ? 'background:rgba(240,160,75,0.12);color:#F0A04B;border:1px solid rgba(240,160,75,0.25)'
      : 'background:rgba(62,207,142,0.12);color:#3ECF8E;border:1px solid rgba(62,207,142,0.25)';

    // Build sentence display with answer filled in
    const subQLines = group.results.map((r, ri) => {
      const q = r.q;
      const ok = r.isCorrect;
      const timedOut = r.chosen === '—';
      const sentFull = esc(q.sentence)
        .replace('【＿】', `<span style="font-weight:800;color:${ok?'var(--success)':'var(--danger)'}">${esc(q.correct)}</span>`)
        .replace('＿', `<span style="font-weight:800;color:${ok?'var(--success)':'var(--danger)'}">${esc(q.correct)}</span>`);

      const pattern = (q.qtype==='grammar' && q.pattern) ? `<span style="font-size:10px;color:var(--text3);margin-left:6px">${esc(q.pattern)}</span>` : '';
      const wrongNote = !ok ? `<span style="color:var(--danger-text);font-size:12px"> → you answered: <strong>${timedOut ? '⏰ timed out' : esc(r.chosen)}</strong>, correct: <strong>${esc(q.correct)}</strong></span>` : '';
      const explNote = q.explanation ? `<div style="font-size:11.5px;color:var(--text2);margin-top:3px;line-height:1.6">${esc(q.explanation)}</div>` : '';

      return `<div style="padding:6px 0;${ri>0?'border-top:1px solid var(--border);margin-top:6px':''}">
        <div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:3px">
          <span style="font-size:11px;padding:1px 7px;border-radius:99px;${badgeStyle}">${q.qtype==='grammar'?'文法':'助詞'} · ${q.level||''}</span>
          ${pattern}
          <span style="margin-left:auto;font-weight:700;font-size:13px;color:${ok?'var(--success)':'var(--danger)'}">${ok?'✓':'✗'}</span>
        </div>
        <div style="font-family:var(--font-jp);font-size:15px;font-weight:600;line-height:1.8;word-break:break-all">${sentFull}</div>
        ${wrongNote}
        ${explNote}
      </div>`;
    }).join('');

    // Kanji / hiragana / arti display at top of each result card
    const kanjiLine  = group.kanji    ? `<div style="font-family:var(--font-jp);font-size:17px;font-weight:700;color:var(--text);word-break:break-all">${esc(group.kanji)}</div>` : '';
    const hiraLine   = group.reading  ? `<div style="font-family:var(--font-jp);font-size:12px;color:var(--text3);margin-top:1px;word-break:break-all">${esc(group.reading)}</div>` : '';
    const artiLine   = group.meaning  ? `<div style="font-size:12px;color:var(--text2);margin-top:1px">${esc(group.meaning)}</div>` : '';
    const hasContext = kanjiLine || hiraLine || artiLine;

    let lvlText = group.level || '';
    if (group.year) lvlText += ' · ' + group.year;

    return `<div style="border-radius:var(--q-r-sm);border:1px solid var(--border);border-left:3px solid ${allOk?'var(--success)':'var(--danger)'};background:var(--surface);overflow:hidden;margin-bottom:10px;">
      <div style="display:flex;align-items:center;gap:8px;padding:8px 14px;background:var(--surface2);border-bottom:1px solid var(--border);flex-wrap:wrap">
        <span style="font-size:10px;font-weight:700;color:var(--text3)">${lineNum}</span>
        ${lvlText ? `<span style="font-size:9px;padding:2px 8px;border-radius:99px;background:rgba(56,189,248,0.1);color:#38BDF8;border:1px solid rgba(56,189,248,0.2)">${esc(lvlText)}</span>` : ''}
        <span style="margin-left:auto;font-size:11px;color:var(--text3)">${groupCorrect}/${groupTotal} correct</span>
        <span style="font-size:14px;font-weight:700;color:${allOk?'var(--success)':'var(--danger)'}">${allOk?'✓':'✗'}</span>
      </div>
      ${hasContext ? `<div style="padding:8px 14px 4px;border-bottom:1px solid var(--border)">${kanjiLine}${hiraLine}${artiLine}</div>` : ''}
      <div style="padding:10px 14px">${subQLines}</div>
    </div>`;
  }).join('');

  rv.innerHTML = `
    <div class="res-header">
      <p class="res-title">Bunpo Fill Results</p>
      <div><span class="score-pill score-${tier}">${tierLabel}</span></div>
      <div class="score-bar-wrap"><div class="score-bar-track"><div class="score-bar-fill score-bar-${tier}" id="bunpo-score-bar" style="width:0%"></div></div></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-num" style="color:var(--success)">${correct}</div><div class="stat-lbl">Correct</div></div>
        <div class="stat"><div class="stat-num" style="color:var(--danger)">${wrong}</div><div class="stat-lbl">Wrong</div></div>
        <div class="stat"><div class="stat-num">${pct}%</div><div class="stat-lbl">Score</div></div>
      </div>
      ${grammarTotal?`<div style="font-size:11px;color:var(--text2);margin-top:4px">文法 ${grammarCorrect}/${grammarTotal} · 助詞 ${ptclCorrect}/${ptclTotal}</div>`:''}
    </div>
    <div style="margin-bottom:1.5rem">${cards}</div>
    <div class="res-btns">
      <button class="res-btn secondary" onclick="backToBunpoSetup()">← Setup</button>
      <button class="res-btn" onclick="startBunpoQuiz(false)">🎲 New Questions</button>
      <button class="res-btn secondary" onclick="startBunpoQuiz(true)">🔁 Repeat Same</button>
    </div>`;
  setTimeout(() => { const b=document.getElementById('bunpo-score-bar'); if(b) b.style.width=pct+'%'; }, 100);
}

// ══════════════════════════════════════════════════
// KANJI READING QUIZ ENGINE
// ══════════════════════════════════════════════════

let kreadCards = [], kreadIdx = 0, kreadResults = [];

function startKreadQuiz(parsed) {
  // Build one card per word per sentence (only sentences that have words defined)
  const cards = [];
  parsed.forEach(sent => {
    if (!sent.words || !sent.words.length) return;
    sent.words.forEach(word => {
      cards.push({ sentence: sent, targetWord: word });
    });
  });

  if (!cards.length) {
    alert('No Kanji Reading data. Add words after the 3rd column.\nExample: 毎朝-まいあさ=every morning');
    return;
  }

  kreadCards = shuffle(cards);
  kreadIdx = 0;
  kreadResults = [];
  showKreadV('kread-quiz-view');
  renderKreadCard();
}

function buildKreadSentenceHTML(sent, targetWord, revealed, userAnswer) {
  // Highlight the target word in the kanji sentence
  const kanji = sent.kanji;
  const target = targetWord.kanji;
  const idx = kanji.indexOf(target);
  if (idx < 0) {
    // fallback: show full sentence with note
    return `<span>${esc(kanji)}</span>`;
  }
  let cls = 'kread-underline';
  let inner = esc(target);
  if (revealed) {
    const ok = normalize(userAnswer) === normalize(targetWord.reading);
    cls += ok ? ' reveal-ok' : ' reveal-fail';
  }
  return esc(kanji.slice(0, idx)) +
    `<span class="${cls}">${inner}</span>` +
    esc(kanji.slice(idx + target.length));
}

function renderKreadCard() {
  if (kreadIdx >= kreadCards.length) { showKreadResults(); return; }
  const card = kreadCards[kreadIdx];
  const sent = card.sentence;
  const word = card.targetWord;

  document.getElementById('kread-prog-bar').style.width = (kreadIdx / kreadCards.length * 100) + '%';
  document.getElementById('kread-card-prog').textContent = (kreadIdx + 1) + ' of ' + kreadCards.length;
  document.getElementById('kread-card-box').className = 'quiz-card';

  document.getElementById('kread-sentence-display').innerHTML = buildKreadSentenceHTML(sent, word, false, '');
  document.getElementById('kread-prompt-label').textContent = 'Type the hiragana reading for the underlined word';
  document.getElementById('kread-meaning').textContent = '';

  const fields = document.getElementById('kread-fields');
  fields.innerHTML = `
    <div class="field-row">
      <span class="field-lbl">Bacaan</span>
      <input class="field-inp" id="kread-inp" placeholder="hiragana…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" style="font-family:var(--font-jp)"/>
    </div>`;
  const inp = document.getElementById('kread-inp');
  inp.addEventListener('keydown', e => { if (e.key === 'Enter') { e.preventDefault(); commitKreadCard(); } });
  inp.addEventListener('input', () => inp.classList.remove('right', 'wrong'));
  setTimeout(() => inp.focus(), 30);

  // Start timer — auto-skip on timeout
  startTimer('kread', () => {
    const card2 = kreadCards[kreadIdx];
    const sent2 = card2.sentence;
    const word2 = card2.targetWord;
    const inp2 = document.getElementById('kread-inp');
    if (inp2) inp2.disabled = true;
    document.getElementById('kread-sentence-display').innerHTML = buildKreadSentenceHTML(sent2, word2, true, '');
    document.getElementById('kread-card-box').classList.add('card-fail');
    kreadResults.push({ card: card2, userAnswer: '', ok: false, timedOut: true });
    setTimeout(() => { kreadIdx++; renderKreadCard(); }, 750);
  });
}

function commitKreadCard() {
  stopTimer('kread');
  const card = kreadCards[kreadIdx];
  const sent = card.sentence;
  const word = card.targetWord;
  const inp = document.getElementById('kread-inp');
  const userAnswer = inp.value.trim();
  if (!userAnswer) return;

  const ok = normalize(userAnswer) === normalize(word.reading);
  inp.classList.toggle('right', ok);
  inp.classList.toggle('wrong', !ok);

  // Update sentence display with reveal
  document.getElementById('kread-sentence-display').innerHTML = buildKreadSentenceHTML(sent, word, true, userAnswer);
  document.getElementById('kread-card-box').classList.add(ok ? 'card-ok' : 'card-fail');

  kreadResults.push({ card, userAnswer, ok });
  setTimeout(() => { kreadIdx++; renderKreadCard(); }, 750);
}

function skipKreadCard() {
  stopTimer('kread');
  const card = kreadCards[kreadIdx];
  kreadResults.push({ card, userAnswer: '', ok: false });
  kreadIdx++; renderKreadCard();
}

function showKreadResults() {
  stopTimer('kread');
  showKreadV('kread-results-view');
  const rv = document.getElementById('kread-results-view');
  const total   = kreadResults.length;
  const correct = kreadResults.filter(r => r.ok).length;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);
  const tier      = pct >= 80 ? 'great' : pct >= 50 ? 'ok' : 'bad';
  const tierLabel = pct >= 80 ? '🎉 Sugoi!' : pct >= 50 ? '👍 Gambatte!' : '📚 Mada mada!';

  // Group results by sentence (using kanji string as key, preserve order)
  const sentenceMap = new Map();
  kreadResults.forEach(r => {
    const key = r.card.sentence.kanji;
    if (!sentenceMap.has(key)) {
      sentenceMap.set(key, { sentence: r.card.sentence, wordResults: [] });
    }
    sentenceMap.get(key).wordResults.push(r);
  });

  let sentNum = 0;
  const cards = Array.from(sentenceMap.values()).map(({ sentence, wordResults }) => {
    sentNum++;
    const sentCorrect = wordResults.filter(r => r.ok).length;
    const sentTotal   = wordResults.length;
    const allOk = sentCorrect === sentTotal;
    const anyFail = sentCorrect < sentTotal;
    const sentTier = allOk ? 'great' : sentCorrect > 0 ? 'ok' : 'bad';
    const okCls = allOk ? 'kread-res-ok' : 'kread-res-fail';

    // Chips for each word in this sentence
    const chips = wordResults.map(r => {
      const word = r.card.targetWord;
      const chipOk = r.ok;
      const yourAnswer = r.userAnswer ? esc(r.userAnswer) : '—';
      return `<div class="kread-res-chip ${chipOk ? 'ok' : 'fail'}">
        <div class="kread-res-chip-kanji">${esc(word.kanji)}</div>
        <div class="kread-res-chip-hira">${esc(word.reading)}</div>
        <div class="kread-res-chip-lbl">${chipOk ? '✓ Benar' : '✗ ' + yourAnswer}</div>
      </div>`;
    }).join('');

    return `<div class="kread-res-card ${okCls}">
      <div class="kread-res-header">
        <span class="kread-res-num">Sentence ${sentNum}</span>
        <span style="font-size:11px;color:var(--text3);margin-left:4px">${sentCorrect}/${sentTotal} correct</span>
        <span class="kread-res-verdict">${allOk ? '✓' : '✗'}</span>
      </div>
      <div class="kread-res-body">
        <div class="kread-res-full">${esc(sentence.kanji)}</div>
        <div class="kread-res-hira">${esc(sentence.reading)}</div>
        <div class="kread-res-meaning-line">${esc(sentence.meaning)}</div>
        <div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:8px">${chips}</div>
      </div>
    </div>`;
  }).join('');

  rv.innerHTML = `
    <div class="res-header">
      <p class="res-title">Kanji Reading Results</p>
      <div><span class="score-pill score-${tier}">${tierLabel}</span></div>
      <div class="score-bar-wrap"><div class="score-bar-track"><div class="score-bar-fill score-bar-${tier}" id="kread-score-bar" style="width:0%"></div></div></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-num" style="color:var(--success)">${correct}</div><div class="stat-lbl">Correct</div></div>
        <div class="stat"><div class="stat-num" style="color:var(--danger)">${wrong}</div><div class="stat-lbl">Wrong</div></div>
        <div class="stat"><div class="stat-num">${pct}%</div><div class="stat-lbl">Score</div></div>
      </div>
    </div>
    <div>${cards}</div>
    <div class="res-btns" style="margin-top:1.5rem">
      <button class="res-btn secondary" onclick="backToKreadSetup()">← Edit</button>
      <button class="res-btn" onclick="startKreadFromHome()">Quiz again →</button>
    </div>`;

  setTimeout(() => {
    const bar = document.getElementById('kread-score-bar');
    if (bar) bar.style.width = pct + '%';
  }, 100);
}

// ══════════════════════════════════════════════════
// CONJUGATION ENGINE — ported from conjugation_engine.py

// ══════════════════════════════════════════════════════════════════

// ── Godan tables (mirrors Python GODAN_ROWS / TE_TA_MAP) ──
const GODAN_A = { 'う':'わ','く':'か','ぐ':'が','す':'さ','つ':'た','ぬ':'な','ぶ':'ば','む':'ま','る':'ら' };
const GODAN_I = { 'う':'い','く':'き','ぐ':'ぎ','す':'し','つ':'ち','ぬ':'に','ぶ':'び','む':'み','る':'り' };
const GODAN_E = { 'う':'え','く':'け','ぐ':'げ','す':'せ','つ':'て','ぬ':'ね','ぶ':'べ','む':'め','る':'れ' };
const GODAN_O = { 'う':'おう','く':'こう','ぐ':'ごう','す':'そう','つ':'とう','ぬ':'のう','ぶ':'ぼう','む':'もう','る':'ろう' };
const TE_MAP  = { 'う':'って','く':'いて','ぐ':'いで','す':'して','つ':'って','ぬ':'んで','ぶ':'んで','む':'んで','る':'って' };
const TA_MAP  = { 'う':'った','く':'いた','ぐ':'いだ','す':'した','つ':'った','ぬ':'んだ','ぶ':'んだ','む':'んだ','る':'った' };

function godanMasuStem(word) {
  const last = word.slice(-1);
  return word.slice(0,-1) + (GODAN_I[last] || '?');
}
function godanAStem(word) {
  const last = word.slice(-1);
  if (word === 'ある') return '—';
  return word.slice(0,-1) + (GODAN_A[last] || '?');
}
function godanTe(word) {
  if (word === '行く' || word === 'いく') return word.slice(0,-1) + 'って';
  return word.slice(0,-1) + (TE_MAP[word.slice(-1)] || '?');
}
function godanTa(word) {
  if (word === '行く' || word === 'いく') return word.slice(0,-1) + 'った';
  return word.slice(0,-1) + (TA_MAP[word.slice(-1)] || '?');
}
function godanNai(word) {
  if (word === 'ある') return 'ない';
  return word.slice(0,-1) + (GODAN_A[word.slice(-1)] || '?') + 'ない';
}
function godanBa(word) {
  return word.slice(0,-1) + (GODAN_E[word.slice(-1)] || '?') + 'ば';
}
function godanVolitionalPlain(word) {
  return word.slice(0,-1) + (GODAN_O[word.slice(-1)] || '?');
}

// ── Irregular verb table (mirrors Python IRREGULAR dict) ──
// style: 'casual'|'polite', tense: 'present'|'past', polarity: 'positive'|'negative'
const IRREGULAR_TABLE = {
  'する': {
    casual_present_positive: 'する',    casual_present_negative: 'しない',
    casual_past_positive: 'した',       casual_past_negative: 'しなかった',
    polite_present_positive: 'します',  polite_present_negative: 'しません',
    polite_past_positive: 'しました',   polite_past_negative: 'しませんでした',
  },
  'くる': {
    casual_present_positive: 'くる',    casual_present_negative: 'こない',
    casual_past_positive: 'きた',       casual_past_negative: 'こなかった',
    polite_present_positive: 'きます',  polite_present_negative: 'きません',
    polite_past_positive: 'きました',   polite_past_negative: 'きませんでした',
  },
  '来る': {
    casual_present_positive: '来る',    casual_present_negative: '来ない',
    casual_past_positive: '来た',       casual_past_negative: '来なかった',
    polite_present_positive: '来ます',  polite_present_negative: '来ません',
    polite_past_positive: '来ました',   polite_past_negative: '来ませんでした',
  },
};

// ── Master conjugation function: conjugateWord(word, type, style, tense, polarity) ──
// type: 'v1'|'v2'|'v3'   style: 'casual'|'polite'   tense: 'present'|'past'   polarity: 'positive'|'negative'
// Returns string or null (not applicable)
function conjugateWord(word, type, style, tense, polarity) {
  const isSuru = (word === 'する' || word.endsWith('する'));
  const isKuru = (word === 'くる' || word === '来る');

  // ── VERB ──
  if (type === 'v3') {
    // Irregular
    const lookupWord = isSuru ? 'する' : (isKuru ? (word === '来る' ? '来る' : 'くる') : word);
    // For compound suru verbs like 勉強する
    if (isSuru && word !== 'する') {
      const prefix = word.slice(0, -2); // remove する
      const base = IRREGULAR_TABLE['する'][`${style}_${tense}_${polarity}`];
      return prefix + base;
    }
    const tbl = IRREGULAR_TABLE[lookupWord];
    if (!tbl) return null;
    return tbl[`${style}_${tense}_${polarity}`] || null;
  }

  if (type === 'v1') {
    const ms = godanMasuStem(word);
    const ta = godanTa(word);
    const nai = godanNai(word);
    const naiStem = nai.slice(0, -2); // remove ない → stem for なかった
    const grid = {
      casual_present_positive: word,
      casual_present_negative: nai,
      casual_past_positive:    ta,
      casual_past_negative:    naiStem + 'なかった',
      polite_present_positive: ms + 'ます',
      polite_present_negative: ms + 'ません',
      polite_past_positive:    ms + 'ました',
      polite_past_negative:    ms + 'ませんでした',
    };
    return grid[`${style}_${tense}_${polarity}`] || null;
  }

  if (type === 'v2') {
    const stem = word.slice(0, -1); // drop る
    const grid = {
      casual_present_positive: word,
      casual_present_negative: stem + 'ない',
      casual_past_positive:    stem + 'た',
      casual_past_negative:    stem + 'なかった',
      polite_present_positive: stem + 'ます',
      polite_present_negative: stem + 'ません',
      polite_past_positive:    stem + 'ました',
      polite_past_negative:    stem + 'ませんでした',
    };
    return grid[`${style}_${tense}_${polarity}`] || null;
  }

  // ── I-ADJECTIVE ──
  if (type === 'adj-i') {
    const isIi = (word === 'いい' || word === 'よい');
    const stem = isIi ? 'よ' : word.slice(0, -1);
    // casual plain forms, polite appends です
    const plain = {
      present_positive: word,
      present_negative: stem + 'くない',
      past_positive:    stem + 'かった',
      past_negative:    stem + 'くなかった',
    }[`${tense}_${polarity}`];
    if (plain === undefined) return null;
    return style === 'casual' ? plain : plain + 'です';
  }

  // ── NA-ADJECTIVE & NOUN (identical copula pattern) ──
  if (type === 'adj-na' || type === 'noun') {
    const grid = {
      casual_present_positive: word + 'だ',
      casual_present_negative: word + 'じゃない',
      casual_past_positive:    word + 'だった',
      casual_past_negative:    word + 'じゃなかった',
      polite_present_positive: word + 'です',
      polite_present_negative: word + 'じゃないです',
      polite_past_positive:    word + 'でした',
      polite_past_negative:    word + 'じゃなかったです',
    };
    return grid[`${style}_${tense}_${polarity}`] || null;
  }

  return null;
}

// ── Derived stem for tenseVariant forms (potential/passive/causative/caus-pass) ──
// Returns the masu-stem of the derived ichidan verb
function derivedMasuStem(word, type, fid) {
  const isSuru = (word === 'する' || word.endsWith('する'));
  const isKuru = (word === 'くる' || word === '来る');
  const suruPrefix = (isSuru && word !== 'する') ? word.slice(0, -2) : '';

  if (fid === 'potential') {
    if (type === 'v1') return word.slice(0,-1) + (GODAN_E[word.slice(-1)] || '?');
    if (type === 'v2') return word.slice(0,-1) + 'られ';
    if (isSuru) return suruPrefix + 'でき';
    if (isKuru) return 'こられ';
  }
  if (fid === 'passive') {
    if (type === 'v1') return word.slice(0,-1) + (GODAN_A[word.slice(-1)] || '?') + 'れ';
    if (type === 'v2') return word.slice(0,-1) + 'られ';
    if (isSuru) return suruPrefix + 'され';
    if (isKuru) return 'こられ';
  }
  if (fid === 'causative') {
    if (type === 'v1') return word.slice(0,-1) + (GODAN_A[word.slice(-1)] || '?') + 'せ';
    if (type === 'v2') return word.slice(0,-1) + 'させ';
    if (isSuru) return suruPrefix + 'させ';
    if (isKuru) return 'こさせ';
  }
  if (fid === 'caus-pass') {
    if (type === 'v1') return word.slice(0,-1) + (GODAN_A[word.slice(-1)] || '?') + 'させられ';
    if (type === 'v2') return word.slice(0,-1) + 'させられ';
    if (isSuru) return suruPrefix + 'させられ';
    if (isKuru) return 'こさせられ';
  }
  return null;
}

// Apply tense to an ichidan-style masu-stem
function applyV2Tense(stem, style, tense, polarity) {
  if (style === 'casual') {
    const plain = {
      present_positive: stem + 'る',
      present_negative: stem + 'ない',
      past_positive:    stem + 'た',
      past_negative:    stem + 'なかった',
    }[`${tense}_${polarity}`];
    return plain || null;
  } else {
    return {
      present_positive: stem + 'ます',
      present_negative: stem + 'ません',
      past_positive:    stem + 'ました',
      past_negative:    stem + 'ませんでした',
    }[`${tense}_${polarity}`] || null;
  }
}

// ── Fixed/special forms (non-tense-variant) ──
function conjugateFixed(word, type, fid) {
  const isSuru = (word === 'する' || word.endsWith('する'));
  const isKuru = (word === 'くる' || word === '来る');
  const suruPrefix = (isSuru && word !== 'する') ? word.slice(0, -2) : '';

  // SURU (v3)
  if (type === 'v3' && isSuru) {
    const s = suruPrefix;
    const m = {
      'dict': s+'する', 'a-stem': s+'し', 'masu-stem': s+'し',
      'te': s+'して', 'ta': s+'した', 'nai': s+'しない', 'nakatta': s+'しなかった',
      'volitional': s+'しましょう', 'vol-plain': s+'しよう',
      'imperative': s+'しなさい', 'imp-plain': s+'しろ',
      'prohibitive': s+'するな', 'ba': s+'すれば', 'tara': s+'したら', 'to': s+'すると',
    };
    return m[fid] != null ? m[fid] : null;
  }

  // KURU (v3)
  if (type === 'v3' && isKuru) {
    const k = (word === '来る');
    const m = {
      'dict': 'くる', 'a-stem': 'こ', 'masu-stem': 'き',
      'te': 'きて', 'ta': 'きた', 'nai': 'こない', 'nakatta': 'こなかった',
      'volitional': 'きましょう', 'vol-plain': 'こよう',
      'imperative': 'きなさい', 'imp-plain': 'こい',
      'prohibitive': 'くるな', 'ba': 'くれば', 'tara': 'きたら', 'to': 'くると',
    };
    const ans = m[fid];
    if (ans == null) return null;
    if (k) return ans.replace(/^き/, '来').replace(/^こ/, '来').replace(/^くる/, '来る');
    return ans;
  }

  // GODAN (v1)
  if (type === 'v1') {
    const ms = godanMasuStem(word);
    const ta = godanTa(word);
    const nai = godanNai(word);
    const m = {
      'dict':       word,
      'a-stem':     godanAStem(word),
      'masu-stem':  ms,
      'te':         godanTe(word),
      'ta':         ta,
      'nai':        nai,
      'nakatta':    nai.slice(0,-2) + 'なかった',
      'volitional': ms + 'ましょう',
      'vol-plain':  godanVolitionalPlain(word),
      'imperative': ms + 'なさい',
      'imp-plain':  word.slice(0,-1) + (GODAN_E[word.slice(-1)] || '?'),
      'prohibitive':word + 'な',
      'ba':         godanBa(word),
      'tara':       ta + 'ら',
      'to':         word + 'と',
    };
    return m[fid] != null ? m[fid] : null;
  }

  // ICHIDAN (v2)
  if (type === 'v2') {
    const s = word.slice(0,-1);
    const m = {
      'dict':       word,
      'a-stem':     s,
      'masu-stem':  s,
      'te':         s + 'て',
      'ta':         s + 'た',
      'nai':        s + 'ない',
      'nakatta':    s + 'なかった',
      'volitional': s + 'ましょう',
      'vol-plain':  s + 'よう',
      'imperative': s + 'なさい',
      'imp-plain':  s + 'ろ',
      'prohibitive':word + 'な',
      'ba':         s + 'れば',
      'tara':       s + 'たら',
      'to':         word + 'と',
    };
    return m[fid] != null ? m[fid] : null;
  }

  // ADJ-I
  if (type === 'adj-i') {
    const isIi = (word === 'いい' || word === 'よい');
    const s = isIi ? 'よ' : word.slice(0,-1);
    const m = {
      'te':       s + 'くて',
      'ta':       s + 'かった',
      'nai':      s + 'くない',
      'nakatta':  s + 'くなかった',
      'ba':       s + 'ければ',
      'tara':     s + 'かったら',
    };
    return m[fid] != null ? m[fid] : null;
  }

  // ADJ-NA / NOUN
  if (type === 'adj-na' || type === 'noun') {
    const m = {
      'te':      word + 'で',
      'ta':      word + 'だった',
      'nai':     word + 'じゃない',
      'nakatta': word + 'じゃなかった',
      'tara':    word + 'だったら',
    };
    return m[fid] != null ? m[fid] : null;
  }

  return null;
}

// ══════════════════════════════════════════════════
// FORM DEFINITIONS
// ══════════════════════════════════════════════════
// Each form entry:
//   id, group, label, sub, applies
//   kind: 'tense'    → uses conjugateWord(word, type, style, tense, polarity) for one specific (style, tense, polarity)
//         'tense4'   → asks for all 4 tenses (pres/past × pos/neg) in chosen style
//         'derived4' → derived stem (potential/passive etc) + 4 tenses in chosen style
//         'fixed'    → uses conjugateFixed(), single answer
//   fixedKey: for kind==='tense', the key string 'style_tense_polarity'

const TENSE_LABELS = {
  casual_present_positive:  'Casual Present +',
  casual_present_negative:  'Casual Present −',
  casual_past_positive:     'Casual Past +',
  casual_past_negative:     'Casual Past −',
  polite_present_positive:  'Polite Present +',
  polite_present_negative:  'Polite Present −',
  polite_past_positive:     'Polite Past +',
  polite_past_negative:     'Polite Past −',
};

const FORMS = [
  // ── Polite: 4 tenses (semua jenis kata) ──
  { id: 'polite-pres-pos', group: 'Polite', label: 'Present +', sub: '〜ます / 〜です / 〜いです / 〜です', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'polite_present_positive' },
  { id: 'polite-pres-neg', group: 'Polite', label: 'Present −', sub: '〜ません / 〜じゃないです / 〜くないです', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'polite_present_negative' },
  { id: 'polite-past-pos', group: 'Polite', label: 'Past +',     sub: '〜ました / 〜でした / 〜かったです', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'polite_past_positive' },
  { id: 'polite-past-neg', group: 'Polite', label: 'Past −',     sub: '〜ませんでした / 〜じゃなかったです / 〜くなかったです', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'polite_past_negative' },

  // ── Casual: 4 tenses (semua jenis kata) ──
  { id: 'casual-pres-pos', group: 'Casual', label: 'Present +', sub: '辞書形 / 〜だ / 〜い', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'casual_present_positive' },
  { id: 'casual-pres-neg', group: 'Casual', label: 'Present −', sub: '〜ない / 〜くない / 〜じゃない', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'casual_present_negative' },
  { id: 'casual-past-pos', group: 'Casual', label: 'Past +',     sub: '〜た / 〜だった / 〜かった', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'casual_past_positive' },
  { id: 'casual-past-neg', group: 'Casual', label: 'Past −',     sub: '〜なかった / 〜くなかった / 〜じゃなかった', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'tense', fixedKey: 'casual_past_negative' },

  // ── て-form (semua jenis kata) ──
  { id: 'te', group: 'て-form', label: 'て Form', sub: '〜て / 〜で / 〜くて / 〜で (na/noun)', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'fixed' },

  // ── た-form (semua jenis kata) ──
  { id: 'ta', group: 'た-form', label: 'た Form', sub: '〜た / 〜だった / 〜かった', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'fixed' },

  // ── ない-form (all word types) ──
  { id: 'nai',     group: 'ない-form', label: 'ない Form (Neg. Plain)',      sub: '〜ない / 〜くない / 〜じゃない', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'fixed' },
  { id: 'nakatta', group: 'ない-form', label: 'なかった Form (Past Neg.)', sub: '〜なかった / 〜くなかった / 〜じゃなかった', applies: ['v1','v2','v3','adj-i','adj-na','noun'], kind: 'fixed' },

  // ── ます-stem (verb only — pure stem, not a tense) ──
  { id: 'masu-stem', group: 'ます-stem (Verb)', label: 'ます-stem (い-form)', sub: '連用形 — base untuk たい・ながら・すぎる・やすい…', applies: ['v1','v2','v3'], kind: 'fixed' },

  // ── あ-stem (verb only) ──
  { id: 'a-stem', group: 'あ-stem (Verb)', label: 'あ-stem (未然形)', sub: 'Base for ない・れる・せる — before passive/causative', applies: ['v1','v2','v3'], kind: 'fixed' },

  // ── え-stem / Potential (verb only) ──
  { id: 'potential', group: 'え-stem / Potential (Verb)', label: 'Potential (Can 〜)', sub: '〜える / 〜られる / できる — え-stem + 4 tenses', applies: ['v1','v2','v3'], kind: 'derived4' },
];

const WORD_TYPES = [
  { id: 'v1',     label: 'Godan Verb',    sub: 'Group 1 (〜う)', badge: 'wt-v1' },
  { id: 'v2',     label: 'Ichidan Verb',  sub: 'Group 2 (〜る)', badge: 'wt-v2' },
  { id: 'v3',     label: 'Irregular Verb',sub: 'Group 3 (する/くる)', badge: 'wt-v3' },
  { id: 'adj-i',  label: 'い Adjective',       sub: 'い形容詞',       badge: 'wt-adj' },
  { id: 'adj-na', label: 'な Adjective',       sub: 'な形容詞',       badge: 'wt-na' },
  { id: 'noun',   label: 'Noun',           sub: '名詞',           badge: 'wt-n' },
];

const TENSES_4 = [
  { style: 'polite', tense: 'present', polarity: 'positive', label: 'Polite Present +' },
  { style: 'polite', tense: 'present', polarity: 'negative', label: 'Polite Present −' },
  { style: 'polite', tense: 'past',    polarity: 'positive', label: 'Polite Past +'   },
  { style: 'polite', tense: 'past',    polarity: 'negative', label: 'Polite Past −'   },
  { style: 'casual', tense: 'present', polarity: 'positive', label: 'Casual Present +' },
  { style: 'casual', tense: 'present', polarity: 'negative', label: 'Casual Present −' },
  { style: 'casual', tense: 'past',    polarity: 'positive', label: 'Casual Past +'   },
  { style: 'casual', tense: 'past',    polarity: 'negative', label: 'Casual Past −'   },
];

// ── Parse conjugation deck ──
function parseConjDeck() {
  return document.getElementById('conj-deck-input').value.trim()
    .split('\n').filter(l => l.trim()).map(l => {
      const p = l.split(';').map(s => s.trim());
      if (p.length < 2) return null;
      const kanji = p[0], reading = p[1], meaning = p[2] || '', type = (p[3] || 'v1').toLowerCase();
      return { kanji, reading, meaning, type };
    }).filter(Boolean);
}

// ── Conjugation Quiz State ──
let conjCards = [], conjIdx = 0, conjResults = [];

function startConjQuiz() {
  const words = parseConjDeck();
  const checkedForms = getCheckedForms();
  const checkedTypes = getCheckedTypes();

  if (!words.length) { alert('Please add some words first.'); return; }
  if (!checkedForms.length) { alert('Please select at least one conjugation form.'); return; }
  if (!checkedTypes.length) { alert('Please select at least one word type.'); return; }

  const allCards = [];
  words.forEach(word => {
    if (!checkedTypes.includes(word.type)) return;
    checkedForms.forEach(form => {
      if (!form.applies.includes(word.type)) return;

      if (form.kind === 'tense') {
        // Single fixed (style, tense, polarity) combo
        const [style, tense, polarity] = form.fixedKey.split('_');
        const answer = conjugateWord(word.reading, word.type, style, tense, polarity);
        if (answer == null) return;
        allCards.push({ word, form, tenseLabel: null, answer });

      } else if (form.kind === 'derived4') {
        // Derived verb + 8 tenses (polite + casual × pres/past × pos/neg)
        TENSES_4.forEach(t => {
          const ds = derivedMasuStem(word.reading, word.type, form.id);
          if (!ds) return;
          const answer = applyV2Tense(ds, t.style, t.tense, t.polarity);
          if (answer == null) return;
          allCards.push({ word, form, tenseLabel: t.label, answer });
        });

      } else if (form.kind === 'fixed') {
        // Plain/fixed forms (te, ta, nai, etc.)
        const answer = conjugateFixed(word.reading, word.type, form.id);
        if (answer == null) return;
        allCards.push({ word, form, tenseLabel: null, answer });
      }
    });
  });

  if (!allCards.length) { alert('No valid word + form combinations found. Check your selections.'); return; }

  conjCards = shuffle(allCards);
  conjIdx = 0; conjResults = [];
  showConjV('conj-quiz-view');
  showConjCard();
}

function showConjV(id) {
  ['conj-setup-view','conj-quiz-view','conj-results-view'].forEach(v =>
    document.getElementById(v).style.display = v === id ? 'block' : 'none'
  );
}

function getTypeBadgeHTML(type) {
  const t = WORD_TYPES.find(x => x.id === type);
  if (!t) return '';
  return `<span class="conj-type-badge ${t.badge}">${t.label}</span>`;
}

function showConjCard() {
  if (conjIdx >= conjCards.length) { showConjResults(); return; }
  const card = conjCards[conjIdx];
  document.getElementById('conj-prog-bar').style.width = (conjIdx / conjCards.length * 100) + '%';
  document.getElementById('conj-card-prog').textContent = (conjIdx + 1) + ' of ' + conjCards.length;
  document.getElementById('conj-card-box').className = 'quiz-card';

  document.getElementById('conj-word-kanji').textContent = card.word.kanji;
  document.getElementById('conj-word-reading').textContent =
    card.word.reading !== card.word.kanji ? '(' + card.word.reading + ')' : '';
  document.getElementById('conj-word-meaning').textContent = card.word.meaning;
  document.getElementById('conj-word-badges').innerHTML = getTypeBadgeHTML(card.word.type);

  const promptMain = card.tenseLabel
    ? card.form.label + ' → ' + card.tenseLabel
    : card.form.label;
  document.getElementById('conj-prompt-text').textContent = promptMain;
  document.getElementById('conj-prompt-sub').textContent = card.form.sub;

  const fields = document.getElementById('conj-fields');
  fields.innerHTML = `
    <div class="field-row">
      <span class="field-lbl">Jawaban</span>
      <input class="field-inp" id="conj-inp" placeholder="Ketik dalam hiragana/kanji…" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
    </div>`;

  const inp = document.getElementById('conj-inp');
  inp.addEventListener('keydown', e => {
    if (e.key === 'Enter') { e.preventDefault(); commitConjCard(); }
  });
  inp.addEventListener('input', () => inp.classList.remove('right','wrong'));
  setTimeout(() => inp.focus(), 30);
}

function commitConjCard() {
  const card = conjCards[conjIdx];
  const inp = document.getElementById('conj-inp');
  const val = inp.value.trim();
  if (!val) return;

  const ok = val === card.answer;
  inp.classList.toggle('right', ok);
  inp.classList.toggle('wrong', !ok);

  conjResults.push({ word: card.word, form: card.form, tenseLabel: card.tenseLabel, answer: card.answer, userAnswer: val, ok });
  document.getElementById('conj-card-box').classList.add(ok ? 'card-ok' : 'card-fail');
  setTimeout(() => { conjIdx++; showConjCard(); }, 600);
}

function skipConjCard() {
  const card = conjCards[conjIdx];
  conjResults.push({ word: card.word, form: card.form, tenseLabel: card.tenseLabel, answer: card.answer, userAnswer: '', ok: false });
  conjIdx++; showConjCard();
}

function showConjResults() {
  showConjV('conj-results-view');
  const rv = document.getElementById('conj-results-view');

  const total   = conjResults.length;
  const correct = conjResults.filter(r => r.ok).length;
  const wrong   = total - correct;
  const pct     = Math.round((correct / total) * 100);
  const tier      = pct >= 80 ? 'great' : pct >= 50 ? 'ok' : 'bad';
  const tierLabel = pct >= 80 ? '🎉 Sugoi!' : pct >= 50 ? '👍 Gambatte!' : '📚 Mada mada!';

  const rows = conjResults.map((r, i) => {
    const badge = r.ok
      ? `<span class="rt-badge rt-badge-ok">✓</span>`
      : `<span class="rt-badge rt-badge-fail">✗</span>`;
    const t = WORD_TYPES.find(x => x.id === r.word.type);
    const badgeClass = t ? t.badge : '';

    let yourAns;
    if (r.ok) yourAns = `<span class="ans-ok">${esc(r.userAnswer)}</span>`;
    else if (r.userAnswer) yourAns = `<span class="ans-bad">${esc(r.userAnswer)}</span>`;
    else yourAns = `<span class="ans-skip">—</span>`;

    const formLabel = r.tenseLabel
      ? `${esc(r.form.label)}<strong style="color:var(--accent)"> → ${esc(r.tenseLabel)}</strong>`
      : esc(r.form.label);

    return `<tr>
      <td><div class="td-pad td-num">${i+1}</div></td>
      <td><div class="td-pad">
        <div class="td-jp">${esc(r.word.kanji)}</div>
        <div style="font-size:11px;color:var(--text3);font-family:var(--font-jp)">${esc(r.word.reading)}</div>
        <div style="font-size:11px;color:var(--text3)">${esc(r.word.meaning)}</div>
      </div></td>
      <td><div class="td-pad td-form">
        <strong>${formLabel}</strong>
        <span style="font-family:var(--font-jp);color:var(--text3)">${esc(r.form.sub)}</span>
      </div></td>
      <td><div class="color-cell ${r.ok?'cc-ok':'cc-fail'}"><span class="color-cell-inner">${esc(r.answer)}</span></div></td>
      <td><div class="td-pad" style="font-family:var(--font-jp);font-size:15px;min-height:52px;display:flex;align-items:center">${yourAns}</div></td>
      <td class="td-center"><div class="td-badge-cell">${badge}</div></td>
    </tr>`;
  }).join('');

  rv.innerHTML = `
    <div class="res-header">
      <p class="res-title">Conjugation Results</p>
      <div><span class="score-pill score-${tier}">${tierLabel}</span></div>
      <div class="score-bar-wrap"><div class="score-bar-track"><div class="score-bar-fill score-bar-${tier}" id="conj-score-bar" style="width:0%"></div></div></div>
      <div class="stat-row">
        <div class="stat"><div class="stat-num" style="color:var(--success)">${correct}</div><div class="stat-lbl">Correct</div></div>
        <div class="stat"><div class="stat-num" style="color:var(--danger)">${wrong}</div><div class="stat-lbl">Wrong</div></div>
        <div class="stat"><div class="stat-num">${pct}%</div><div class="stat-lbl">Score</div></div>
      </div>
    </div>
    <div class="tbl-wrap" style="overflow-x:auto">
      <table class="rt" style="min-width:640px">
        <colgroup>
          <col style="width:36px"><col style="width:140px"><col style="width:155px">
          <col style="width:170px"><col style="width:auto"><col style="width:64px">
        </colgroup>
        <thead><tr>
          <th>#</th><th>Word</th><th>Form</th>
          <th>Jawaban Benar</th><th>Jawabanmu</th><th class="th-center">✓</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="res-btns">
      <button class="res-btn secondary" onclick="backToConjSetup()">← Edit</button>
      <button class="res-btn" onclick="startConjQuiz()">Quiz again →</button>
    </div>`;

  setTimeout(() => {
    const bar = document.getElementById('conj-score-bar');
    if (bar) bar.style.width = pct + '%';
  }, 100);
}

function backToConjSetup() { showConjV('conj-setup-view'); }

// ══════════════════════════════════════════════════
// CHEAT SHEET
// ══════════════════════════════════════════════════
const CHEATSHEET_DATA = [
  { title: 'Godan (v1) — ます stem / い stem', rules: [
    'う段 → い段', 'く→き、ぐ→ぎ、す→し、つ→ち', 'ぬ→に、ぶ→び、む→み、る→り、う→い',
    '例: 書く→書き、飲む→飲み、話す→話し',
  ]},
  { title: 'Godan (v1) — て形 / た形', rules: [
    'く→いて/いた (書く→書いて)', 'ぐ→いで/いだ (泳ぐ→泳いで)',
    'す→して/した (話す→話して)', 'つ/る/う→って/った (待つ→待って)',
    'ぬ/ぶ/む→んで/んだ (飲む→飲んで)', '⚠ 行く → 行って (例外!)',
  ]},
  { title: 'Godan (v1) — ない形', rules: [
    'う段 → あ段 + ない', 'う→わ (買う→買わ)', 'く→か (書く→書か)',
    'ぐ→が (泳ぐ→泳が)', 'す→さ (話す→話さ)', 'つ→た (待つ→待た)',
    'ぶ→ば、む→ま、る→ら', '⚠ ある → ない (例外)',
  ]},
  { title: 'Ichidan (v2) — すべての形', rules: [
    'る を取って + ます/て/た/ない/etc.',
    '例: 食べる → 食べ + ます = 食べます',
    '食べて / 食べた / 食べない / 食べなかった',
    '食べられる (passive/potential)', '食べさせる (causative)',
  ]},
  { title: 'Irregular (v3) — する', rules: [
    'Polite: します / しません / しました / しませんでした',
    'Casual: する / しない / した / しなかった',
    'て形: して / た形: した', 'Potential: できる',
    'Passive: される / Causative: させる',
  ]},
  { title: 'Irregular (v3) — くる / 来る', rules: [
    'Polite: きます / きません / きました / きませんでした',
    'Casual: くる / こない / きた / こなかった',
    'て形: きて / た形: きた', 'Potential: こられる',
    'Causative: こさせる',
  ]},
  { title: 'い形容詞 (adj-i) — 4 tenses', rules: [
    'Casual+: そのまま (暑い)', 'Casual−: く+ない (暑くない)',
    'Casual過+: かった (暑かった)', 'Casual過−: く+なかった',
    'Polite: casual + です (暑いです / 暑くないです)',
    'て形: く+て (暑くて)', '⚠ いい → よ (よかった、よくない)',
  ]},
  { title: 'な形容詞 / 名詞 — copula', rules: [
    'Casual+: +だ (静かだ / 学生だ)',
    'Casual−: +じゃない',
    'Casual過+: +だった',
    'Casual過−: +じゃなかった',
    'Polite+: +です', 'Polite−: +じゃないです',
    'Polite past+: +でした', 'Polite past−: +じゃなかったです',
  ]},
  { title: 'Potential (can 〜)', rules: [
    'v1: え段+る (書く→書ける)',
    'v2: +られる (食べ→食べられる)',
    'する → できる', 'くる → こられる',
    'Because ichidan: potential + ます/ない/etc.',
  ]},
  { title: 'Passive (〜られる)', rules: [
    'v1: あ段+れる (飲む→飲まれる)',
    'v2: +られる (食べ→食べられる)',
    'する → される', 'くる → こられる',
  ]},
  { title: 'Causative (〜させる)', rules: [
    'v1: あ段+せる (飲む→飲ませる)',
    'v2: +させる (食べさせる)',
    'する → させる', 'くる → こさせる',
  ]},
  { title: 'Causative-Passive (〜させられる)', rules: [
    'v1: あ段+させられる (飲まさせられる)',
    'v2: +させられる (食べさせられる)',
    '"dipaksa melakukan" — sering ekspresi keluhan',
  ]},
  { title: 'Volitional / Command / Prohibition', rules: [
    'ましょう (polite): ます-stem+ましょう', 'よう/おう (casual): v1 お段+う / v2 +よう',
    'Polite command: ます-stem+なさい', 'Casual: v1 え段 / v2 +ろ',
    'Prohibition: 辞書形+な (飲むな)',
  ]},
  { title: 'Kondisional', rules: [
    'ば: v1 え段+ば (書けば) / v2 +れば (食べれば)',
    'adj-i: く+ければ (暑ければ)',
    'たら: た形+ら (飲んだら / 食べたら / 暑かったら)',
    'noun/adj-na たら: だったら (学生だったら)',
    'と: 辞書形+と (飲むと、食べると)',
  ]},
];

function buildCheatsheet() {
  const el = document.getElementById('cheatsheet-content');
  el.innerHTML = CHEATSHEET_DATA.map(block => `
    <div class="cs-block">
      <div class="cs-title">${block.title}</div>
      <div class="cs-rule">${block.rules.map(r => '• ' + r).join('<br>')}</div>
    </div>
  `).join('');
}

let csOpen = false;
function toggleCheatsheet() {
  csOpen = !csOpen;
  document.getElementById('cheatsheet-panel').classList.toggle('open', csOpen);
  document.getElementById('cs-toggle-btn').textContent = csOpen ? '▾ Hide Formulas' : '▸ View Formulas';
}

// ══════════════════════════════════════════════════
// BUILD CHECKBOXES — accordion version
// ══════════════════════════════════════════════════

// Group metadata: icon, description, and which groups are open by default
const GROUP_META = {
  'Polite':              { icon: '🎩', desc: '4 tenses — ます / です',             open: true  },
  'Casual':                      { icon: '💬', desc: '4 tenses — plain / だ',              open: true  },
  'て-form':                     { icon: '🔗', desc: 'Connects to ている、てください、etc.', open: true  },
  'た-form':                     { icon: '⏮',  desc: 'Past plain — base for たら、たり', open: true  },
  'ない-form':                   { icon: '🚫', desc: 'Plain negation + past negation',        open: true  },
  'ます-stem (Verb)':            { icon: '🌱', desc: 'Base for たい、すぎる、ながら…',   open: true  },
  'あ-stem (Verb)':              { icon: '🔩', desc: 'Base untuk passive / causative',      open: true  },
  'え-stem / Potential (Verb)':  { icon: '⚡', desc: 'Can do — える / られる',     open: true  },
};

function updateAccordionState(groupKey) {
  const grpEl = document.querySelector(`.acc-group[data-group="${CSS.escape(groupKey)}"]`);
  if (!grpEl) return;
  const forms = FORMS.filter(f => f.group === groupKey);
  const checkedCount = forms.filter(f => grpEl.querySelector(`#fcheck-${f.id}`)?.classList.contains('checked')).length;
  const pill = grpEl.querySelector('.acc-pill');
  if (pill) pill.textContent = `${checkedCount}/${forms.length}`;
  grpEl.classList.toggle('has-checked', checkedCount > 0);
}

function buildFormCheckboxes() {
  const el = document.getElementById('form-accordion');
  const groups = {};
  FORMS.forEach(f => { if (!groups[f.group]) groups[f.group] = []; groups[f.group].push(f); });

  let html = '';
  Object.entries(groups).forEach(([grp, forms]) => {
    const meta = GROUP_META[grp] || { icon: '•', desc: '', open: false };
    const isOpen = meta.open;
    html += `<div class="acc-group${isOpen ? ' open' : ''} has-checked" data-group="${grp}">
      <div class="acc-header" onclick="toggleAccordion(event, this.parentElement)">
        <span class="acc-icon">▶</span>
        <span style="font-size:15px;line-height:1">${meta.icon}</span>
        <span class="acc-title">${grp}</span>
        <span style="font-size:11px;color:var(--text3);margin-right:8px">${meta.desc}</span>
        <span class="acc-pill">${forms.length}/${forms.length}</span>
      </div>
      <div class="acc-body">
        <div style="display:flex;gap:6px;margin-bottom:8px">
          <button class="tiny-btn" onclick="event.stopPropagation();selectGroupForms('${grp}',true)">Select All</button>
          <button class="tiny-btn" onclick="event.stopPropagation();selectGroupForms('${grp}',false)">Clear</button>
        </div>
        <div class="acc-grid">
          ${forms.map(f => `<div class="check-item checked" id="fcheck-${f.id}" onclick="event.stopPropagation();toggleCheck(this);updateAccordionState('${grp}')">
            <div class="check-box"></div>
            <div><span class="check-label">${f.label}</span><span class="check-sublabel">${f.sub}</span></div>
          </div>`).join('')}
        </div>
      </div>
    </div>`;
  });
  el.innerHTML = html;
}

function toggleAccordion(event, el) {
  el.classList.toggle('open');
}

function selectGroupForms(groupKey, val) {
  FORMS.filter(f => f.group === groupKey).forEach(f => {
    const el = document.getElementById('fcheck-' + f.id);
    if (el) el.classList.toggle('checked', val);
  });
  updateAccordionState(groupKey);
}

function buildTypeCheckboxes() {
  const el = document.getElementById('type-checkboxes');
  el.innerHTML = WORD_TYPES.map(t => `
    <div class="check-item checked" id="tcheck-${t.id}" onclick="toggleCheck(this)">
      <div class="check-box"></div>
      <div><span class="check-label">${t.label}</span><span class="check-sublabel">${t.sub}</span></div>
    </div>
  `).join('');
}

// ── FIX: toggleCheck receives the element directly; no label double-fire ──
function toggleCheck(el) {
  el.classList.toggle('checked');
}

function selectAllForms(val) {
  FORMS.forEach(f => {
    const el = document.getElementById('fcheck-' + f.id);
    if (el) el.classList.toggle('checked', val);
  });
  // Refresh all accordion pills
  const groups = {};
  FORMS.forEach(f => { groups[f.group] = true; });
  Object.keys(groups).forEach(g => updateAccordionState(g));
}

function selectAllTypes(val) {
  WORD_TYPES.forEach(t => {
    const el = document.getElementById('tcheck-' + t.id);
    if (el) el.classList.toggle('checked', val);
  });
}

function getCheckedForms() {
  return FORMS.filter(f => document.getElementById('fcheck-' + f.id)?.classList.contains('checked'));
}
function getCheckedTypes() {
  return WORD_TYPES.filter(t => document.getElementById('tcheck-' + t.id)?.classList.contains('checked')).map(t => t.id);
}

// ── Init ──
buildFormCheckboxes();
buildTypeCheckboxes();
buildCheatsheet();

