const EPOCH = new Date(2026,3,20); // April 20 2026 = Day 1
const verbs = [
  ["します","します","! To do","irr"],
["あります","あります","! There is (inanimate)","u"],
["います","います","! There is (animate)","ru"],
["行きます","いきます","! To go","u"],
["来ます","きます","! To come","irr"],
["見ます","みます","! To see / look","ru"],
["食べます","たべます","! To eat","ru"],
["飲みます","のみます","! To drink","u"],
["話します","はなします","! To speak / talk","u"],
];

const words = [
  ["そして", "そして", "! And then / After that", "conj", "N5"],
  ["だから", "だから", "! So / Therefore", "conj", "N5"],
  ["それで", "それで", "! Because of that / Then", "conj", "N5"],
  ["ね", "ね", "! Yeah / Right (seeking agreement)", "conj", "N5"],
  ["よ", "よ", "! Hey / You know (assertion)", "conj", "N5"],
  ["でも", "でも", "! But / However", "cont", "N5"],
  ["でも", "でも", "! But / However (formal)", "cont", "N5"],
  ["だけど", "だけど", "! But / However (casual)", "cont", "N5"],
  ["けど", "けど", "! But (casual)", "cont", "N5"],
  ["が", "が", "! But / However (formal)", "cont", "N5"],
];

const advs = [
  ["とても","とても","! Very / Extremely","deg","N5"],
["すごく","すごく","! Very / Super (casual)","deg","N5"],
["あまり〜ない","あまり〜ない","! Not very ~ / Rarely ~","deg","N5"],
["全然〜ない","ぜんぜん〜ない","! Not at all ~","deg","N5"],
["少し","すこし","! A little / Somewhat","deg","N5"],
["ちょっと","ちょっと","! A bit / Just a little (casual)","deg","N5"],
["もっと","もっと","! More / Even more","deg","N5"],
["一番","いちばん","! Most / Number one","deg","N5"],
];

const adjs = [
  ["新しい", "あたらしい", "! New", "i", "N5"],
  ["古い", "ふるい", "! Old (thing)", "i", "N5"],
  ["大きい", "おおきい", "! Big / Large", "i", "N5"],
  ["小さい", "ちいさい", "! Small / Little", "i", "N5"],
  ["高い", "たかい", "! Tall / High / Expensive", "i", "N5"],
  ["低い", "ひくい", "! Short / Low", "i", "N5"],
  ["安い", "やすい", "! Cheap / Inexpensive", "i", "N5"],
  ["長い", "ながい", "! Long", "i", "N5"],
  ["短い", "みじかい", "! Short", "i", "N5"],
  ["広い", "ひろい", "! Wide / Spacious", "i", "N5"],
];

const nouns = [
  ["人","ひと","! Person","c1"],
["方","かた","! Person (polite)","c1"],
["名前","なまえ","! Name","c1"],
["友達","ともだち","! Friend","c1"],
["家族","かぞく","! Family","c1"],
["父","ちち","! Father (own)","c1"],
["母","はは","! Mother (own)","c1"],
["お父さん","おとうさん","! Father (someone else's)","c1"],
];

const particles=[
  ["は","は","! Topic marker","topic","N5"],
["が","が","! Subject marker","case","N5"],
["を","を","! Direct object marker","case","N5"],
["に","に","! To / At / On (time, place, destination)","case","N5"],
["へ","へ","! Toward / In the direction of","case","N5"],
["で","で","! At / By (place of action / tool)","case","N5"],
["と","と","! And / With (together)","case","N5"],
["の","の","! Possession / Of (noun connector)","case","N5"],
["も","も","! Also / Too","topic","N5"],
];

const expressions=[
  ["おはようございます","おはようございます","! Good morning (formal)","greet","N5"],
["おはよう","おはよう","! Good morning (casual)","greet","N5"],
["こんにちは","こんにちは","! Good afternoon / Hello","greet","N5"],
["こんばんは","こんばんは","! Good evening","greet","N5"],
["はじめまして","はじめまして","! Nice to meet you (first time)","greet","N5"],
["よろしくお願いします","よろしくおねがいします","! Please treat me well / Nice to meet you","greet","N5"],
];

const questions=[
  ["何","なに／なん","! What","what","N5"],
["誰","だれ","! Who","who","N5"],
["どこ","どこ","! Where / Where to","where","N5"],
["いつ","いつ","! When","when","N5"],
["どれ","どれ","! Which one (from 3+)","which","N5"],
["どの","どの","! Which ~ (before noun)","which","N5"],
["どちら","どちら","! Which (of 2) / Which direction (polite)","which","N5"],
["どう","どう","! How (method / impression)","how","N5"],
];

const pronouns=[
  ["私","わたし","! I / Me (neutral)","1st","N5"],
["わたくし","わたくし","! I / Me (very formal)","1st","N5"],
["ぼく","ぼく","! I / Me (masculine casual)","1st","N5"],
["おれ","おれ","! I / Me (masculine, rough)","1st","N5"],
["あたし","あたし","! I / Me (feminine casual)","1st","N5"],
["私たち","わたしたち","! We / Us","1st","N5"],
["あなた","あなた","! You (formal)","2nd","N5"],
["あなたたち","あなたたち","! You (plural)","2nd","N5"],
];

const fillers=[
  ["あの〜","あの〜","! Uhm... / Uh... (hesitating to start)","filler","N5"],
["えっと","えっと","! Hmm... / Uh... (thinking)","filler","N5"],
["うーん","うーん","! Hmm... (considering)","filler","N5"],
["なんか","なんか","! Like / Somehow (casual)","filler","N5"],
["まあ","まあ","Well / I suppose (half-agreeing)","filler","N4"],
["実は","じつは","! Actually... / To be honest...","filler","N4"],
["それで","それで","! And then? / So? (asking to continue)","filler","N5"],
["ところで","ところで","! By the way...","filler","N4"],
];

const TABS={
  verbs:{data:()=>verbs,cols:['#','','Kanji','Kana','Meaning','Type'],types:{u:'U-verb',ru:'RU-verb',irr:'Irregular'},hasLevel:false,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{u:'U-verb',ru:'RU-verb',irr:'Irregular'}[v[3]]||v[3]}</span></td>`;}},
  adjs:{data:()=>adjs,cols:['#','','Kanji','Kana','Meaning','Type','Level'],types:{i:'い-adj',na:'な-adj'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{i:'い-adj',na:'な-adj'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  advs:{data:()=>advs,cols:['#','','Kanji','Kana','Meaning','Type','Level'],types:{deg:'Degree',freq:'Frequency',time:'Time',mann:'Manner',quant:'Quantity',affirm:'Affirmation'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{deg:'Degree',freq:'Frequency',time:'Time',mann:'Manner',quant:'Quantity',affirm:'Affirmation'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  nouns:{data:()=>nouns.filter(v=>v[3]!=='c9'),cols:['#','','Kanji','Kana','Meaning','Kategori'],types:{c1:'People',c2:'Body',c3:'Time',c4:'Places',c5:'Food',c6:'Daily life',c7:'Transport',c8:'Nature',c10:'School',c11:'Shopping',c12:'Health',c13:'Clothing',c14:'Hobbies',c15:'General'},hasLevel:false,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${TABS.nouns.types[v[3]]||v[3]}</span></td>`;}},
  words:{data:()=>words,cols:['#','','Kata','Kana','Meaning','Type','Level'],types:{conj:'Conjunction',trans:'Transition',cond:'Conditional',add:'Additive',cont:'Contrast'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{conj:'Conjunction',trans:'Transition',cond:'Conditional',add:'Additive',cont:'Contrast'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  counters:{data:()=>nouns.filter(v=>v[3]==='c9'),cols:['#','','Kanji','Kana','Meaning'],types:{},hasLevel:false,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td>`;}},
  particles:{data:()=>particles,cols:['#','','Particle','Reading','Meaning','Type','Level'],types:{topic:'Topic',case:'Case',conj:'Conjunctive',end:'Sentence-end',adv:'Adverbial'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{topic:'Topic',case:'Case',conj:'Conjunctive',end:'Sentence-end',adv:'Adverbial'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  expressions:{data:()=>expressions,cols:['#','','Ekspresi','Reading','Meaning','Type','Level'],types:{greet:'Greeting',thanks:'Thanks',apol:'Apology',req:'Request',resp:'Response',other:'Other'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{greet:'Greeting',thanks:'Thanks',apol:'Apology',req:'Request',resp:'Response',other:'Other'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  questions:{data:()=>questions,cols:['#','','Kata tanya','Reading','Meaning','Jenis','Level'],types:{what:'What',who:'Who',where:'Where',when:'When',which:'Which',how:'How',why:'Why',howmany:'How many',howmuch:'How much'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{what:'What',who:'Who',where:'Where',when:'When',which:'Which',how:'How',why:'Why',howmany:'How many',howmuch:'How much'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  pronouns:{data:()=>pronouns,cols:['#','','Kata','Reading','Meaning','Jenis','Level'],types:{'1st':'1st person','2nd':'2nd person','3rd':'3rd person',demo:'Demonstrative',other:'Other'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{'1st':'1st person','2nd':'2nd person','3rd':'3rd person',demo:'Demonstrative',other:'Other'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}},
  fillers:{data:()=>fillers,cols:['#','','Kata/Frasa','Reading','Meaning','Type','Level'],types:{filler:'Filler',phrase:'Set phrase',ono:'Onomatopoeia'},hasLevel:true,
    row(v,i,t){return`<td class="n">${i+1}</td>${sc(t,v._i)}<td><div class="kj">${v[0]}</div></td><td class="kn">${v[1]}</td><td class="mn">${vocabMeaning(v)}</td><td><span class="badge b${v[3]}">${{filler:'Filler',phrase:'Set phrase',ono:'Onomatopoeia'}[v[3]]||v[3]}</span></td><td><span class="lv ${v[4]}">${v[4]}</span></td>`;}}
};

let cur='verbs',starFilter=false,starred={},starredDates={},masteryData={};
try{starred=JSON.parse(localStorage.getItem('jp_stars')||'{}');}catch{}
try{starredDates=JSON.parse(localStorage.getItem('jp_star_dates')||'{}');}catch{}
try{masteryData=JSON.parse(localStorage.getItem('jp_mastery')||'{}');}catch{}
function save(){
  try{localStorage.setItem('jp_stars',JSON.stringify(starred));}catch{}
  try{localStorage.setItem('jp_star_dates',JSON.stringify(starredDates));}catch{}
  try{localStorage.setItem('jp_mastery',JSON.stringify(masteryData));}catch{}
}
function mIcon(m){return m==='red'?'🔴':m==='yellow'?'🟡':m==='green'?'🟢':'';}
function setMastery(tab,i,level){
  const k=sk(tab,i);
  if(!starred[k])return;
  masteryData[k]=level||'';
  if(!level)delete masteryData[k];
  save();render();
  document.querySelectorAll('.mc-dropdown.open').forEach(d=>d.classList.remove('open'));
}
function sk(t,i){return t+':'+i;}
function sc(tab,i){
  const k=sk(tab,i);
  const on=starred[k]?'on':'';
  const m=masteryData[k]||'';
  const bubbleCls='mc-bubble'+(m?' has-'+m:'');
  const bubbleIcon=m?mIcon(m):'·';
  const mcHtml=starred[k]?`<div class="mc-wrap">
    <button class="${bubbleCls}" onclick="event.stopPropagation();toggleMcDropdown('${tab}',${i})" title="Mastery level">${bubbleIcon}</button>
    <div class="mc-dropdown" id="mc-dd-${tab}-${i}">
      <button class="mc-opt${m==='red'?' active':''}" onclick="event.stopPropagation();setMastery('${tab}',${i},'red')">🔴 New / Hard</button>
      <button class="mc-opt${m==='yellow'?' active':''}" onclick="event.stopPropagation();setMastery('${tab}',${i},'yellow')">🟡 So-so</button>
      <button class="mc-opt${m==='green'?' active':''}" onclick="event.stopPropagation();setMastery('${tab}',${i},'green')">🟢 Mastered</button>
      ${m?`<button class="mc-opt mc-opt-clear" onclick="event.stopPropagation();setMastery('${tab}',${i},'')">✕ Remove tag</button>`:''}
    </div>
  </div>`:'<div style="width:22px;flex-shrink:0"></div>';
  return`<td class="sc"><button class="sbtn ${on}" onclick="toggleStar('${tab}',${i})">${starred[k]?'★':'☆'}</button></td><td style="width:30px;padding:4px 6px;">${mcHtml}</td>`;
}
function toggleMcDropdown(tab,i){
  const dd=document.getElementById('mc-dd-'+tab+'-'+i);
  if(!dd)return;
  const wasOpen=dd.classList.contains('open');
  document.querySelectorAll('.mc-dropdown.open').forEach(d=>d.classList.remove('open'));
  if(!wasOpen)dd.classList.add('open');
}
document.addEventListener('click',function(){
  document.querySelectorAll('.mc-dropdown.open').forEach(d=>d.classList.remove('open'));
});
function toggleStar(tab,i){
  const k=sk(tab,i);
  const wasStarred = !!starred[k];
  if(starred[k]){ delete starred[k]; delete starredDates[k]; }
  else { starred[k]=1; starredDates[k]=todayKey(); }
  save();render();updateGlobalProgress();
  if(!wasStarred){
    if(typeof touchStreak==='function') touchStreak();
    if(typeof renderStreakNav==='function') renderStreakNav();
  }
  if(typeof renderGoalBar==='function') renderGoalBar();
}
function toggleStarFilter(){
  starFilter=!starFilter;
  if(starFilter){ masteryFilter=''; ['mfRed','mfYellow','mfGreen'].forEach(id=>document.getElementById(id).classList.remove('on')); document.getElementById('sfCombo').classList.remove('color-active'); }
  document.getElementById('sfBtn').classList.toggle('on',starFilter);
  render();
}
function toggleColorDropdown(e){
  e.stopPropagation();
  document.getElementById('sfDropdown').classList.toggle('open');
}
function closeColorDropdown(){
  document.getElementById('sfDropdown').classList.remove('open');
}
document.addEventListener('click',function(e){
  const dd=document.getElementById('sfDropdown');
  if(dd&&!document.getElementById('sfCombo').contains(e.target)) dd.classList.remove('open');
});

let masteryFilter='';
function toggleMasteryFilter(level){
  if(masteryFilter===level){ masteryFilter=''; }
  else { masteryFilter=level; starFilter=false; document.getElementById('sfBtn').classList.remove('on'); }
  document.getElementById('mfRed').classList.toggle('on', masteryFilter==='red');
  document.getElementById('mfYellow').classList.toggle('on', masteryFilter==='yellow');
  document.getElementById('mfGreen').classList.toggle('on', masteryFilter==='green');
  document.getElementById('sfCombo').classList.toggle('color-active', !!masteryFilter);
  render();
}

// ── GACHA ──────────────────────────────────────────────────────────────

// Check if a word object is starred by finding its true index in the source array.
// Stars are stored as sk(tab, originalIndex) by the render/toggleStar system.
function gachaIsStarred(tab, wordObj, sourceArr){
  const idx = sourceArr.indexOf(wordObj);
  if(idx === -1) return false;
  return !!starred[sk(tab, idx)];
}

// Priority pick: ALWAYS pick important words (smallest index) not yet starred.
// 80% guaranteed = top unstarred words, 20% = lightly shuffled from next batch.
function pickNPriority(pool, n, tab, sourceArr){
  const avail = pool.filter(v => !gachaIsStarred(tab, v, sourceArr));
  if(avail.length === 0) return [];
  if(avail.length <= n) return avail;

  const sorted = [...avail].sort((a, b) => sourceArr.indexOf(a) - sourceArr.indexOf(b));

  const guaranteedCount = Math.max(1, Math.floor(n * 0.8));
  const guaranteed = sorted.slice(0, guaranteedCount);
  const remainder = sorted.slice(guaranteedCount).sort(() => Math.random() - 0.5);
  const extra = remainder.slice(0, n - guaranteedCount);

  return [...guaranteed, ...extra];
}

// Untuk "other" pool — same logic, priority by source index.
function pickNOther(pools, n){
  let all = [];
  pools.forEach(({tab, data, sourceArr}) => {
    data.forEach(v => {
      if(!gachaIsStarred(tab, v, sourceArr)) all.push({v, tab, sourceArr});
    });
  });
  if(!all.length) return [];
  if(all.length <= n) return all;

  all.sort((a, b) => a.sourceArr.indexOf(a.v) - b.sourceArr.indexOf(b.v));

  const guaranteedCount = Math.max(1, Math.floor(n * 0.8));
  const guaranteed = all.slice(0, guaranteedCount);
  const remainder = all.slice(guaranteedCount).sort(() => Math.random() - 0.5);
  const extra = remainder.slice(0, n - guaranteedCount);

  return [...guaranteed, ...extra];
}

function rollGacha(){
  const verbPool   = [...verbs];
  const naPool     = adjs.filter(a => a[3] === 'na');
  const iPool      = adjs.filter(a => a[3] === 'i');
  const nounPool   = nouns.filter(n => n[3] !== 'c9');  // same as TABS.nouns.data()

  // ── Distribusi 45 kata ──
  // Verb:      15–18  → ambil 16
  // な-adj:    10–12  → ambil 11
  // い-adj:     5–7   → ambil  6
  // Noun:       3–5   → ambil  4
  // Other:      sisa  → ambil  8  (adv/expression/dll)
  const picked16v  = pickNPriority(verbPool,  16, 'verbs', verbs);
  const picked11na = pickNPriority(naPool,    11, 'adjs',  adjs);
  const picked6i   = pickNPriority(iPool,      6, 'adjs',  adjs);
  const picked4n   = pickNPriority(nounPool,   4, 'nouns', nounPool);  // sourceArr = filtered, matches _i

  // "other" = advs, words, particles, expressions, questions, pronouns, fillers, counters
  const countersArr = nouns.filter(n => n[3] === 'c9');
  const otherPools = [
    {tab:'advs',       data: advs,         sourceArr: advs},
    {tab:'words',      data: words,        sourceArr: words},
    {tab:'particles',  data: particles,    sourceArr: particles},
    {tab:'expressions',data: expressions,  sourceArr: expressions},
    {tab:'questions',  data: questions,    sourceArr: questions},
    {tab:'pronouns',   data: pronouns,     sourceArr: pronouns},
    {tab:'fillers',    data: fillers,      sourceArr: fillers},
    {tab:'counters',   data: countersArr,  sourceArr: countersArr},
  ];

  // Sisa ke 45
  const mainCount = picked16v.length + picked11na.length + picked6i.length + picked4n.length;
  const otherTarget = Math.max(0, 45 - mainCount);
  const picked8o = pickNOther(otherPools, otherTarget);

  const wordRow = (v) =>
    `<div class="gm-word"><span class="gw-k">${v[0]}</span><span class="gw-r">${v[1]}</span><span class="gw-m">${v[2]}</span></div>`;

  const section = (label, emoji, words, rangeHint) => {
    if(!words.length) return `<div class="gm-section"><div class="gm-sec-title">${emoji} ${label} <span style="color:var(--text3);font-size:10px">(not enough new words)</span></div></div>`;
    return `<div class="gm-section">
      <div class="gm-sec-title">${emoji} ${label} — <strong>${words.length}</strong> words <span style="color:var(--text3);font-size:10px;font-weight:400">${rangeHint}</span></div>
      <div class="gm-words">${words.map(v => wordRow(v)).join('')}</div>
    </div>`;
  };

  const otherRows = picked8o.map(({v}) =>
    `<div class="gm-word"><span class="gw-k">${v[0]}</span><span class="gw-r">${v[1]}</span><span class="gw-m">${v[2]}</span></div>`
  ).join('');

  const total = picked16v.length + picked11na.length + picked6i.length + picked4n.length + picked8o.length;

  document.getElementById('gachaBody').innerHTML =
    section('Verb', '🔵', picked16v, '(target 15–18)') +
    section('な-Adjective', '🟣', picked11na, '(target 10–12)') +
    section('い-Adjective', '🟢', picked6i, '(target 5–7)') +
    section('Noun', '🟡', picked4n, '(target 3–5)') +
    (picked8o.length ? `<div class="gm-section">
      <div class="gm-sec-title">🎲 Other Random — <strong>${picked8o.length}</strong> words <span style="color:var(--text3);font-size:10px;font-weight:400">(adv / expression / misc)</span></div>
      <div class="gm-words">${otherRows}</div>
    </div>` : '');

  const todayStarred = Object.values(starredDates).filter(d => d === todayKey()).length;
  document.getElementById('gachaInfo').textContent = `${total} words · today ⭐ ${todayStarred} words`;

  // Store current gacha result with category for rendering
  currentGachaWords = [
    ...picked16v.map(v=>({k:v[0],r:v[1],m:v[2],cat:'verb'})),
    ...picked11na.map(v=>({k:v[0],r:v[1],m:v[2],cat:'na'})),
    ...picked6i.map(v=>({k:v[0],r:v[1],m:v[2],cat:'i'})),
    ...picked4n.map(v=>({k:v[0],r:v[1],m:v[2],cat:'noun'})),
    ...picked8o.map(({v})=>({k:v[0],r:v[1],m:v[2],cat:'other'})),
  ];
}

function hasRolledToday(){
  let lastRoll = '';
  try{ lastRoll = localStorage.getItem('jp_gacha_lastroll') || ''; }catch{}
  return lastRoll === todayKey();
}

function markRolledToday(){
  try{ localStorage.setItem('jp_gacha_lastroll', todayKey()); }catch{}
}

function updateGachaBtn(){
  const btn = document.querySelector('.gachabtn');
  if(!btn) return;
  // Never disable the button — user can always open to view the list
  // Just update the title to indicate roll already done
  if(hasRolledToday()){
    btn.disabled = false;
    btn.style.opacity = '0.7';
    btn.style.cursor = '';
    btn.title = 'View today\'s gacha result';
  } else {
    btn.disabled = false;
    btn.style.opacity = '';
    btn.style.cursor = '';
    btn.title = '';
  }
}

function saveGachaResult(){
  try{ localStorage.setItem('jp_gacha_result_' + todayKey(), JSON.stringify(currentGachaWords)); }catch{}
}

function loadGachaResult(){
  try{
    const raw = localStorage.getItem('jp_gacha_result_' + todayKey());
    return raw ? JSON.parse(raw) : null;
  }catch{ return null; }
}

function renderSavedGacha(words){
  const wordRow = (v) =>
    `<div class="gm-word"><span class="gw-k">${v.k}</span><span class="gw-r">${v.r}</span><span class="gw-m">${v.m}</span></div>`;
  const section = (label, emoji, ws, hint) => {
    if(!ws.length) return '';
    return `<div class="gm-section">
      <div class="gm-sec-title">${emoji} ${label} — <strong>${ws.length}</strong> words <span style="color:var(--text3);font-size:10px;font-weight:400">${hint}</span></div>
      <div class="gm-words">${ws.map(wordRow).join('')}</div>
    </div>`;
  };
  const verbs  = words.filter(w => w.cat === 'verb');
  const na     = words.filter(w => w.cat === 'na');
  const i      = words.filter(w => w.cat === 'i');
  const nouns  = words.filter(w => w.cat === 'noun');
  const others = words.filter(w => w.cat === 'other');
  // fallback: if no cat info (old save), re-roll silently with proper categories
  if(!verbs.length && !na.length && !i.length && !nouns.length){
    rollGacha();
    saveGachaResult();
    return;
  } else {
    document.getElementById('gachaBody').innerHTML =
      section('Verb', '🔵', verbs, '(target 15–18)') +
      section('な-Adjective', '🟣', na, '(target 10–12)') +
      section('い-Adjective', '🟢', i, '(target 5–7)') +
      section('Noun', '🟡', nouns, '(target 3–5)') +
      (others.length ? section('Other Random', '🎲', others, '(adv / expression / misc)') : '');
  }
  const todayStarredS = Object.values(starredDates).filter(d => d === todayKey()).length;
  document.getElementById('gachaInfo').textContent = `${words.length} words · today ⭐ ${todayStarredS} words`;
}

function openGacha(){
  const rollBtn = document.getElementById('gachaRollBtn');
  if(hasRolledToday()){
    // Already rolled — re-run fresh so current stars are always respected
    rollGacha();
    document.getElementById('gmSub').textContent = '🔒 Already rolled today — star the words you\'ve memorized!';
    if(rollBtn){ rollBtn.disabled = true; rollBtn.style.opacity = '0.4'; rollBtn.style.cursor = 'not-allowed'; rollBtn.title = 'Kembali besok!'; }
  } else {
    // New day — show empty state with Roll button
    document.getElementById('gachaBody').innerHTML = `<div style="padding:48px 32px;text-align:center;color:var(--text3);font-size:14px;">
      <div style="font-size:36px;margin-bottom:12px;">🎲</div>
      <div style="font-size:15px;color:var(--text2);margin-bottom:6px;">Gacha not used today</div>
      <div style="font-size:12px;">Click Roll! to get 45 new words</div>
    </div>`;
    document.getElementById('gmSub').textContent = '45 top words not yet starred — star them once you\'ve memorized them!';
    document.getElementById('gachaInfo').textContent = '';
    if(rollBtn){ rollBtn.disabled = false; rollBtn.style.opacity = ''; rollBtn.style.cursor = ''; rollBtn.title = ''; }
  }
  document.getElementById('gachaModal').classList.add('show');
}

function doRoll(){
  rollGacha();
  markRolledToday();
  saveGachaResult();
  updateGachaBtn();
  document.getElementById('gmSub').textContent = '🔒 Already rolled today — star the words you\'ve memorized!';
  const rollBtn = document.getElementById('gachaRollBtn');
  if(rollBtn){ rollBtn.disabled = true; rollBtn.style.opacity = '0.4'; rollBtn.style.cursor = 'not-allowed'; rollBtn.title = 'Kembali besok!'; }
}

function closeGacha(){
  document.getElementById('gachaModal').classList.remove('show');
}
function resetAllStars(){
  if(!confirm("Reset all stars? All words will be marked as unmemorized.")) return;
  starred = {};
  starredDates = {};
  try{ localStorage.removeItem('jp_stars'); }catch{}
  try{ localStorage.removeItem('jp_star_dates'); }catch{}
  updateGlobalProgress();
  render();
  alert("All stars have been reset!");
}



// ── END GACHA ───────────────────────────────────────────────────────────

// ── STUDY PLAN ──────────────────────────────────────────────────────────
let currentGachaWords = [];
let viewWeekOffset = 0;  // 0 = current week, -1 = last week, etc.
let selectedDayKey = null;

function localDateStr(d){
  const y = d.getFullYear();
  const m = String(d.getMonth()+1).padStart(2,'0');
  const dd = String(d.getDate()).padStart(2,'0');
  return `${y}-${m}-${dd}`;
}

function todayKey(){
  return localDateStr(new Date());
}

function dateToKey(d){
  return localDateStr(d);
}

function keyToDate(k){
  const [y,m,dd] = k.split('-').map(Number);
  return new Date(y, m-1, dd);
}

function loadPlan(){
  try{ return JSON.parse(localStorage.getItem('jp_study_plan')||'{}'); }catch{ return {}; }
}

function savePlan(plan){
  try{ localStorage.setItem('jp_study_plan', JSON.stringify(plan)); }catch{}
}

function getWeekStart(offset){
  const today = new Date();
  today.setHours(0,0,0,0);
  const day = today.getDay(); // 0=Sun
  const monday = new Date(today);
  monday.setDate(today.getDate() - (day===0?6:day-1) + offset*7);
  return monday;
}

function countAllStarred(){
  return Object.keys(starred).length;
}

function countAllWords(){
  return verbs.length + adjs.length + nouns.length + advs.length + words.length +
    particles.length + expressions.length + questions.length + pronouns.length + fillers.length;
}

function updateGlobalProgress(){
  const s = countAllStarred();
  const t = countAllWords();
  const pct = t>0?Math.round(s/t*100):0;
  document.getElementById('gpStarCount').textContent = s;
  document.getElementById('gpTotal').textContent = t;
}

function openPlan(){
  viewWeekOffset = 0;
  selectedDayKey = todayKey();
  renderPlan();
  renderReview();
  document.getElementById('planModal').classList.add('show');
}
function closePlan(){
  document.getElementById('planModal').classList.remove('show');
}

function changeWeek(dir){
  if(dir===0){ viewWeekOffset=0; selectedDayKey=todayKey(); }
  else viewWeekOffset += dir;
  renderPlan();
}

function renderPlan(){
  const plan = loadPlan();
  const todayStr = todayKey();
  const s = countAllStarred();
  const t = countAllWords();
  const pct = t>0?Math.round(s/t*100):0;

  // 3-day drill notification
  const todayDate = keyToDate(todayStr);
  const todayDayNum = Math.round((todayDate - EPOCH)/(1000*60*60*24)) + 1;
  const notifEl = document.getElementById('drillNotif');
  if(notifEl && todayDayNum > 0 && todayDayNum % 3 === 0){
    // Count starred from last 3 days
    let count3 = 0;
    for(let i=1;i<=3;i++){
      const pd=new Date(todayDate); pd.setDate(todayDate.getDate()-i);
      const pk=dateToKey(pd);
      count3 += Object.values(starredDates).filter(v=>v===pk).length;
    }
    if(count3>0){
      notifEl.style.display='flex';
      document.getElementById('drillNotifTitle').textContent = `Time for 3-Day Review! (Day ${todayDayNum})`;
      document.getElementById('drillNotifDesc').textContent = `${count3} words from the past 3 days ready to drill.`;
    } else { notifEl.style.display='none'; }
  } else if(notifEl){ notifEl.style.display='none'; }

  document.getElementById('planGpStar').textContent = s;
  document.getElementById('planGpStarred').textContent = s;
  document.getElementById('planGpTotal').textContent = t;
  document.getElementById('planGpPct').textContent = pct;
  document.getElementById('planGpBar').style.width = pct+'%';

  const weekStart = getWeekStart(viewWeekOffset);
  const weekEnd = new Date(weekStart); weekEnd.setDate(weekStart.getDate()+6);

  const fmt = (d) => d.toLocaleDateString('en-US',{day:'numeric',month:'short'});
  document.getElementById('weekLabel').textContent =
    viewWeekOffset===0 ? 'This Week' : viewWeekOffset===-1 ? 'Last Week' : `Week ${viewWeekOffset>0?'+':''}${viewWeekOffset}`;
  document.getElementById('weekRange').textContent = `${fmt(weekStart)} – ${fmt(weekEnd)}`;

  document.getElementById('prevWeekBtn').disabled = false;
  document.getElementById('nextWeekBtn').disabled = false;

  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  let gridHtml = '';

  for(let i=0;i<7;i++){
    const d = new Date(weekStart); d.setDate(weekStart.getDate()+i);
    const dk = dateToKey(d);
    const dayData = plan[dk];
    const isToday = dk===todayStr;
    const isSelected = dk===selectedDayKey;
    // Count starred words for this day
    const wordCount = Object.values(starredDates).filter(v=>v===dk).length;
    const dayNum = Math.round((d - EPOCH)/(1000*60*60*24)) + 1;
    const is3dayReview = dayNum > 0 && (dayNum % 3 === 0);

    let cardClass = 'day-card';
    if(isSelected) cardClass += ' active';
    if(isToday) cardClass += ' today';
    if(is3dayReview && dayNum>0) cardClass += ' drill-day';
    if(wordCount>0) cardClass += ' has-words';

    const badge = is3dayReview && dayNum>0 ? `<span class="dc-badge drill">Review</span>` : '';

    gridHtml += `<div class="${cardClass}" onclick="selectDay('${dk}')">
      ${badge}
      <div class="dc-label">${days[i]}</div>
      <div class="dc-day">${d.getDate()}</div>
      <div class="dc-count">${dayNum>0?'Day '+dayNum:'?'}${wordCount>0?' · '+wordCount+'★':''}</div>
    </div>`;
  }
  document.getElementById('daysGrid').innerHTML = gridHtml;
  renderDayDetail(selectedDayKey);
}

function selectDay(dk){
  selectedDayKey = dk;
  renderPlan();
}

function renderDayDetail(dk){
  const todayStr = todayKey();
  const d = keyToDate(dk);
  const thisDayNum = Math.round((d - EPOCH)/(1000*60*60*24)) + 1;
  const isToday = dk===todayStr;
  const dateLabel = d.toLocaleDateString('en-US',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

  // Get starred words for this specific day from starredDates
  const TABS_DATA = {verbs, adjs, advs, nouns, words, particles, expressions, questions, pronouns, fillers};
  const dayWords = [];
  Object.entries(starred).forEach(([key]) => {
    if(starredDates[key] === dk){
      const [tab, idxStr] = key.split(':');
      const idx = parseInt(idxStr);
      const arr = TABS_DATA[tab];
      if(arr && arr[idx]) dayWords.push({k:arr[idx][0], r:arr[idx][1], m:arr[idx][2], mstry:masteryData[key]||''});
    }
  });

  // Is this a 3-day review point?
  const is3dayReview = thisDayNum > 0 && (thisDayNum % 3 === 0);

  // Collect starred words from the 3 days before this
  let reviewGroups = [];
  if(is3dayReview){
    for(let back=thisDayNum-1; back>=Math.max(1,thisDayNum-3); back--){
      const pastDate = new Date(EPOCH); pastDate.setDate(EPOCH.getDate()+(back-1));
      const pastKey = dateToKey(pastDate);
      const wds = [];
      Object.entries(starred).forEach(([key]) => {
        if(starredDates[key]===pastKey){
          const [tab,idxStr]=key.split(':'); const idx=parseInt(idxStr);
          const arr=TABS_DATA[tab];
          if(arr&&arr[idx]) wds.push({k:arr[idx][0],r:arr[idx][1],m:arr[idx][2],mstry:masteryData[key]||''});
        }
      });
      if(wds.length) reviewGroups.push({dayNum:back, dayKey:pastKey, words:wds});
    }
    reviewGroups.reverse();
  }

  let html = `<div class="day-detail">
    <div class="dd-head">
      <div class="dd-title">${dateLabel}${isToday?' <span style="color:var(--accent);font-size:11px">· Today</span>':''} <span style="font-size:10px;color:var(--text3);margin-left:4px;">Day ${thisDayNum>0?thisDayNum:'?'}</span></div>
    </div>`;

  // 3-day review alert
  if(is3dayReview && reviewGroups.length){
    const total3 = reviewGroups.reduce((a,g)=>a+g.words.length,0);
    let rNum=1;
    html += `<div style="border-bottom:1px solid var(--border);padding:10px 16px;background:rgba(245,184,66,.04);">
      <div style="font-size:11px;font-weight:600;color:#f5c842;letter-spacing:.05em;text-transform:uppercase;margin-bottom:8px;">⚡ 3-Day Review · ${total3} words (Day ${thisDayNum-3} – Day ${thisDayNum-1})</div>`;
    reviewGroups.forEach(group=>{
      const gd=keyToDate(group.dayKey);
      const gLabel=gd.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short'});
      html+=`<div style="margin-bottom:6px;"><div style="font-size:10px;color:var(--text3);margin-bottom:3px;">Day ${group.dayNum} · ${gLabel}</div>`;
      group.words.forEach(w=>{
        html+=`<div class="dd-word-row" style="grid-template-columns:24px 18px 1fr 1fr 1fr;">
          <span class="dd-wnum">${rNum++}</span><span style="font-size:12px">${mIcon(w.mstry)}</span><span class="dd-wk">${w.k}</span>
          <span class="dd-wr">${w.r}</span><span class="dd-wm">${w.m}</span></div>`;
      });
      html+=`</div>`;
    });
    html+=`</div>`;
  }

  // This day's starred words
  if(!dayWords.length){
    html += `<div style="padding:24px;text-align:center;color:var(--text3);font-size:13px;">
      ${isToday?'No words starred today. Star words from the main table!':'No words starred on this day.'}
    </div>`;
  } else {
    html += `<div style="padding:7px 16px 5px;font-size:11px;color:var(--text2);"><strong style="color:var(--text)">${dayWords.length}</strong> words starred today</div>
    <div class="dd-words">`;
    dayWords.forEach((w,i)=>{
      html+=`<div class="dd-word-row" style="grid-template-columns:24px 18px 1fr 1fr 1fr;">
        <span class="dd-wnum">${i+1}</span><span style="font-size:12px">${mIcon(w.mstry)}</span><span class="dd-wk">${w.k}</span>
        <span class="dd-wr">${w.r}</span><span class="dd-wm">${w.m}</span></div>`;
    });
    html+=`</div>`;
  }
  html += `</div>`;
  document.getElementById('dayDetail').innerHTML = html;
}

// ── REVIEW HISTORY ──────────────────────────────────────────────────────
let reviewMode = 'all';

function setReview(mode, btn){
  reviewMode = mode;
  document.querySelectorAll('.rv-pick').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderReview();
}

// Build grouped history from starredDates
// starredDates: { 'tab:idx': 'YYYY-MM-DD' }
// starred: { 'tab:idx': 1 }
function getStarredWordsByDate(){
  // Map: dateKey -> [{k,r,m}]
  const byDate = {};
  const TABS_DATA = {
    verbs, adjs, advs, nouns, words, particles, expressions, questions, pronouns, fillers
  };
  Object.entries(starred).forEach(([key]) => {
    const [tab, idxStr] = key.split(':');
    const idx = parseInt(idxStr);
    const dateKey = starredDates[key] || 'unknown';
    const arr = TABS_DATA[tab];
    if(!arr || !arr[idx]) return;
    const v = arr[idx];
    if(!byDate[dateKey]) byDate[dateKey] = [];
    byDate[dateKey].push({k:v[0], r:v[1], m:v[2], mstry:masteryData[key]||''});
  });
  return byDate;
}

function renderReview(){
  const today = new Date(); today.setHours(0,0,0,0);

  let cutoff = null;
  if(reviewMode === 'month'){
    cutoff = new Date(today); cutoff.setDate(today.getDate()-30);
  } else if(reviewMode === 'week'){
    cutoff = new Date(today); cutoff.setDate(today.getDate()-7);
  } else if(reviewMode === '3days'){
    cutoff = new Date(today); cutoff.setDate(today.getDate()-3);
  }

  const byDate = getStarredWordsByDate();
  const allKeys = Object.keys(byDate).filter(k=>k!=='unknown').sort();
  const filtered = allKeys.filter(k => {
    if(!cutoff) return true;
    return keyToDate(k) >= cutoff;
  });

  // Also include 'unknown' starred (starred before date tracking) in 'all' mode
  const unknownWords = (reviewMode==='all' && byDate['unknown']) ? byDate['unknown'] : [];

  const totalWords = filtered.reduce((a,k)=>a+byDate[k].length,0) + unknownWords.length;
  const totalDays = filtered.length;

  const rangeLabel = {all:'All time',month:'Last 30 days',week:'Last 7 days','3days':'Last 3 days'}[reviewMode]||'';
  document.getElementById('rvSummary').innerHTML = totalWords
    ? `<strong>${totalWords}</strong> words starred · ${rangeLabel}`
    : `No data yet · ${rangeLabel}`;

  if(!totalWords){
    document.getElementById('rvBody').innerHTML = `<div class="rv-empty">No words starred in this range.</div>`;
    return;
  }
  let globalNum = 1;
  let html = '';

  // Unknown date group (legacy stars)
  if(unknownWords.length){
    const id = 'rvg-unknown';
    html += `<div class="rv-group open" id="${id}">
      <div class="rv-group-head" onclick="toggleRvGroup('${id}')">
        <span class="rv-group-label">⭐ Starred previously</span>
        <span class="rv-group-count">${unknownWords.length} words</span>
      </div>
      <div class="rv-group-words">`;
    unknownWords.forEach(w=>{
      html += `<div class="rv-word">
        <span class="rv-wnum">${globalNum++}</span>
        <span style="font-size:12px;width:18px;flex-shrink:0">${mIcon(w.mstry)}</span>
        <span class="rv-wk">${w.k}</span>
        <span class="rv-wr">${w.r}</span>
        <span class="rv-wm">${w.m}</span>
      </div>`;
    });
    html += `</div></div>`;
  }

  filtered.forEach(dk => {
    const d = keyToDate(dk);
    const dayNum = Math.round((d - EPOCH)/(1000*60*60*24)) + 1;
    const label = d.toLocaleDateString('en-US',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    const wds = byDate[dk];
    const id = 'rvg-'+dk;
    html += `<div class="rv-group open" id="${id}">
      <div class="rv-group-head" onclick="toggleRvGroup('${id}')">
        <span class="rv-group-label">${dayNum>0?'Day '+dayNum+' · ':''}${label}</span>
        <span class="rv-group-count">${wds.length} words</span>
      </div>
      <div class="rv-group-words">`;
    wds.forEach(w=>{
      html += `<div class="rv-word">
        <span class="rv-wnum">${globalNum++}</span>
        <span style="font-size:12px;width:18px;flex-shrink:0">${mIcon(w.mstry)}</span>
        <span class="rv-wk">${w.k}</span>
        <span class="rv-wr">${w.r}</span>
        <span class="rv-wm">${w.m}</span>
      </div>`;
    });
    html += `</div></div>`;
  });

  document.getElementById('rvBody').innerHTML = html;
}

function toggleRvGroup(id){
  document.getElementById(id).classList.toggle('open');
}
// ══════════════════════════════════════════════════
// COUNTDOWN SYSTEM
// ══════════════════════════════════════════════════

