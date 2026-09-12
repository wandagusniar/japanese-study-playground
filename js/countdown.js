let cdEvents = [];
let cdIntervalId = null;

function cdLoad() {
  try { cdEvents = JSON.parse(localStorage.getItem('jp_countdown_events') || '[]'); } catch { cdEvents = []; }
}
function cdSave() {
  localStorage.setItem('jp_countdown_events', JSON.stringify(cdEvents));
}

function cdQuickFill(name, type) {
  document.getElementById('cd-input-name').value = name;
  document.getElementById('cd-input-name').dataset.type = type;
}

function cdAddEvent() {
  const nameEl = document.getElementById('cd-input-name');
  const dateEl = document.getElementById('cd-input-date');
  const name = nameEl.value.trim();
  const date = dateEl.value;
  if (!name) { nameEl.focus(); return; }
  if (!date) { dateEl.focus(); return; }
  const type = nameEl.dataset.type || 'custom';
  cdEvents.push({ id: Date.now(), name, date, type });
  cdSave();
  nameEl.value = '';
  dateEl.value = '';
  delete nameEl.dataset.type;
  cdRender();
}

function cdDeleteEvent(id) {
  cdEvents = cdEvents.filter(e => e.id !== id);
  cdSave();
  cdRender();
}

function cdGetDiff(targetDate) {
  const now = new Date();
  const target = new Date(targetDate + 'T00:00:00');
  const diff = target - now;
  return diff;
}

function cdFormatDiff(diff) {
  if (diff <= 0) return null;
  const totalSec = Math.floor(diff / 1000);
  const secs  = totalSec % 60;
  const mins  = Math.floor(totalSec / 60) % 60;
  const hours = Math.floor(totalSec / 3600) % 24;
  const days  = Math.floor(totalSec / 86400);
  const weeks = Math.floor(days / 7);
  return { days, hours, mins, secs, weeks };
}

function cdUrgencyClass(diff) {
  if (diff <= 0) return 'past';
  const days = Math.floor(diff / 86400000);
  if (days <= 7)  return 'urgent';
  if (days <= 30) return 'soon';
  return 'comfy';
}

function cdBadgeClass(type) {
  if (type === 'jlpt') return 'badge-jlpt';
  if (type === 'nat')  return 'badge-nat';
  return 'badge-custom';
}

function cdFormatDateLabel(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}

function cdProgressPct(dateStr) {
  // Progress = how much of the "year before the test" has elapsed
  const target = new Date(dateStr + 'T00:00:00');
  const start  = new Date(target); start.setFullYear(start.getFullYear() - 1);
  const now    = new Date();
  const total  = target - start;
  const elapsed = now - start;
  return Math.min(100, Math.max(0, Math.round((elapsed / total) * 100)));
}

function cdBuildCard(ev) {
  const diff    = cdGetDiff(ev.date);
  const urgency = cdUrgencyClass(diff);
  const fmt     = cdFormatDiff(diff);
  const badge   = cdBadgeClass(ev.type);
  const pct     = cdProgressPct(ev.date);
  const dateLabel = cdFormatDateLabel(ev.date);

  let countdownHTML = '';
  if (!fmt) {
    countdownHTML = `<div style="text-align:center;padding:18px 0;font-size:14px;color:var(--text3);">🎌 Test day has passed!</div>`;
  } else {
    countdownHTML = `
    <div class="cd-countdown-grid">
      <div class="cd-unit">
        <div class="cd-unit-num">${fmt.days}</div>
        <div class="cd-unit-label">Days</div>
      </div>
      <div class="cd-unit">
        <div class="cd-unit-num">${String(fmt.hours).padStart(2,'0')}</div>
        <div class="cd-unit-label">Hours</div>
      </div>
      <div class="cd-unit">
        <div class="cd-unit-num">${String(fmt.mins).padStart(2,'0')}</div>
        <div class="cd-unit-label">Minutes</div>
      </div>
      <div class="cd-unit">
        <div class="cd-unit-num cd-sec-pulse" id="cd-sec-${ev.id}">${String(fmt.secs).padStart(2,'0')}</div>
        <div class="cd-unit-label">Seconds</div>
      </div>
    </div>
    <div style="text-align:center;font-size:11px;color:var(--text3);margin-bottom:10px;">
      ${fmt.weeks > 0 ? `<strong style="color:var(--text2)">${fmt.weeks}</strong> weeks · ` : ''}<strong style="color:var(--text2)">${fmt.days}</strong> days remaining
    </div>`;
  }

  let progressHTML = '';
  if (diff > 0) {
    progressHTML = `
    <div class="cd-progress-wrap">
      <div class="cd-progress-label">
        <span>Preparation progress</span>
        <span>${pct}%</span>
      </div>
      <div class="cd-progress-track">
        <div class="cd-progress-fill" style="width:${pct}%"></div>
      </div>
    </div>`;
  }

  const statusText = diff <= 0
    ? `Completed on ${dateLabel}`
    : `📌 ${dateLabel}`;

  return `
  <div class="cd-event-card ${urgency}" id="cd-card-${ev.id}">
    <div class="cd-event-bar"></div>
    <div class="cd-event-inner">
      <div class="cd-event-top">
        <div class="cd-event-meta">
          <div class="cd-event-name">${ev.name}</div>
          <div class="cd-event-date-line">${dateLabel}</div>
        </div>
        <span class="cd-event-type-badge ${badge}">${ev.type === 'jlpt' ? 'JLPT' : ev.type === 'nat' ? 'NAT' : 'Test'}</span>
      </div>
      ${countdownHTML}
      ${progressHTML}
      <div class="cd-event-footer">
        <span class="cd-status-text">${statusText}</span>
        <button class="cd-delete-btn" onclick="cdDeleteEvent(${ev.id})">✕ Remove</button>
      </div>
    </div>
  </div>`;
}

function cdRender() {
  const active = cdEvents.filter(e => cdGetDiff(e.date) > 0);
  const past   = cdEvents.filter(e => cdGetDiff(e.date) <= 0);

  // Sort active by soonest
  active.sort((a, b) => new Date(a.date) - new Date(b.date));
  past.sort((a, b) => new Date(b.date) - new Date(a.date));

  const activeEl = document.getElementById('cd-active-grid');
  const pastSect = document.getElementById('cd-past-section');
  const pastEl   = document.getElementById('cd-past-grid');

  if (active.length === 0 && past.length === 0) {
    activeEl.innerHTML = `
    <div class="cd-events-empty" style="grid-column:1/-1">
      <div class="cd-empty-icon">⏳</div>
      <div>No tests added yet.</div>
      <div style="font-size:12px;margin-top:6px;color:var(--text3)">Use the quick tags above to add your JLPT or NAT test date!</div>
    </div>`;
  } else {
    activeEl.innerHTML = active.map(cdBuildCard).join('');
  }

  if (past.length > 0) {
    pastSect.style.display = '';
    pastEl.innerHTML = past.map(cdBuildCard).join('');
  } else {
    pastSect.style.display = 'none';
  }

  cdRenderTopbar();
}

// ── Topbar render ──
function cdRenderTopbar() {
  const navArea = document.getElementById('cd-nav-area');

  const active = cdEvents.filter(e => cdGetDiff(e.date) > 0)
                         .sort((a,b) => new Date(a.date) - new Date(b.date));

  if (active.length === 0) { navArea.style.display = 'none'; return; }
  navArea.style.display = 'flex';

  // Pick the most urgent urgency class among all events for the chip accent
  const urgencyOrder = ['urgent', 'soon', 'comfy'];
  let topUrgency = 'comfy';
  active.forEach(ev => {
    const u = cdUrgencyClass(cdGetDiff(ev.date));
    if (urgencyOrder.indexOf(u) < urgencyOrder.indexOf(topUrgency)) topUrgency = u;
  });

  const rows = active.map(ev => {
    const diff = cdGetDiff(ev.date);
    const fmt  = cdFormatDiff(diff);
    if (!fmt) return '';
    return `<div class="cd-nav-row">
      <span class="cd-nav-name">${ev.name}</span>
      <span class="cd-nav-time urgency-${cdUrgencyClass(diff)}" id="cd-tb-${ev.id}">${fmt.days}d ${String(fmt.hours).padStart(2,'0')}h ${String(fmt.mins).padStart(2,'0')}m ${String(fmt.secs).padStart(2,'0')}s</span>
    </div>`;
  }).join('');

  navArea.innerHTML = `
  <div class="cd-nav-chip ${topUrgency}" onclick="switchApp('countdown')">
    <div class="cd-nav-accent"></div>
    <div class="cd-nav-rows">${rows}</div>
  </div>`;
}

// Live tick — updates seconds every second efficiently
function cdTick() {
  let needFullRender = false;

  cdEvents.forEach(ev => {
    const diff = cdGetDiff(ev.date);
    const fmt  = cdFormatDiff(diff);
    if (!fmt) return;

    // Update countdown panel elements if visible
    const secEl = document.getElementById('cd-sec-' + ev.id);
    if (secEl) secEl.textContent = String(fmt.secs).padStart(2, '0');

    // Update topbar element
    const tbEl = document.getElementById('cd-tb-' + ev.id);
    if (tbEl) tbEl.textContent = `${fmt.days}d ${String(fmt.hours).padStart(2,'0')}h ${String(fmt.mins).padStart(2,'0')}m ${String(fmt.secs).padStart(2,'0')}s`;

    // Full re-render every minute
    if (fmt.secs === 59) needFullRender = true;
  });

  if (needFullRender) { cdRender(); cdRenderTopbar(); }
}

// Start the countdown system
function cdInit() {
  cdLoad();
  cdRender();
  cdRenderTopbar();
  // Set min date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('cd-input-date').min = today;
  // Tick every second
  if (cdIntervalId) clearInterval(cdIntervalId);
  cdIntervalId = setInterval(cdTick, 1000);
}

// Initialize when countdown tab is opened
const _origSwitchApp = window.switchApp;
window.switchApp = function(app) {
  _origSwitchApp(app);
  if (app === 'countdown') cdInit();
  if (app === 'bunpou') {
    // Apply current level state when panel opens
    setTimeout(function() {
      bpSwitchLevel(bpCurrentLevel || 'N5');
    }, 0);
  }
};

// Always start topbar on page load (works on any tab)
(function cdBootstrap() {
  cdLoad();
  cdRenderTopbar();
  if (cdIntervalId) clearInterval(cdIntervalId);
  cdIntervalId = setInterval(cdTick, 1000);
  // If countdown tab is active, also render the full panel
  if (document.getElementById('countdown-panel').classList.contains('visible')) {
    cdRender();
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('cd-input-date').min = today;
  }
})();



function switchTab(tab){
  cur=tab;starFilter=false;masteryFilter='';
  document.getElementById('sfBtn').classList.remove('on');
  ['mfRed','mfYellow','mfGreen'].forEach(id=>document.getElementById(id).classList.remove('on'));
  document.getElementById('sfCombo').classList.remove('color-active');
  document.getElementById('search').value='';
  document.getElementById('catSelect').value=tab;
  const cfg=TABS[tab];
  const tf=document.getElementById('typeFilter');
  tf.innerHTML='<option value="">All types</option>';
  for(const[k,v]of Object.entries(cfg.types)) tf.innerHTML+=`<option value="${k}">${v}</option>`;
  document.getElementById('levelFilter').style.display=cfg.hasLevel?'':'none';
  document.getElementById('levelFilter').value='';
  render();
}

// ── Kotoba Master English Meanings ──
// Each entry: "kanji\x00kana" → "English meaning"
const VOCAB_EN_MAP = (function(){
  const m = {};
  function add(arr){ arr.forEach(v=>{ m[v[0]+'\x00'+v[1]] = v[2]; }); }

  // Verbs — English meanings
  const verbsEN = [
    ["します","します","To do"],["あります","あります","There is (inanimate)"],["います","います","There is (animate)"],
    ["行きます","いきます","To go"],["来ます","きます","To come"],["見ます","みます","To see / look"],
    ["食べます","たべます","To eat"],["飲みます","のみます","To drink"],["話します","はなします","To speak / talk"],
    ["聞きます","ききます","To listen / ask"],["書きます","かきます","To write"],["読みます","よみます","To read"],
    ["買います","かいます","To buy"],["帰ります","かえります","To return home"],["起きます","おきます","To wake up"],
    ["寝ます","ねます","To sleep"],["わかります","わかります","To understand"],["使います","つかいます","To use"],
    ["思います","おもいます","To think / feel"],["言います","いいます","To say"],["知ります","しります","To know"],
    ["会います","あいます","To meet"],["待ちます","まちます","To wait"],["乗ります","のります","To ride / board"],
    ["降ります","おります","To get off / descend"],["出ます","でます","To leave / go out"],["入ります","はいります","To enter"],
    ["開けます","あけます","To open"],["閉めます","しめます","To close / shut"],["始めます","はじめます","To begin / start"],
    ["終わります","おわります","To end / finish"],["作ります","つくります","To make / create"],["売ります","うります","To sell"],
    ["もらいます","もらいます","To receive"],["あげます","あげます","To give"],["くれます","くれます","To give (to me)"],
    ["借ります","かります","To borrow"],["貸します","かします","To lend"],["持ちます","もちます","To hold / have"],
    ["持って行きます","もっていきます","To take (somewhere)"],["持って来ます","もってきます","To bring"],
    ["教えます","おしえます","To teach / tell"],["習います","ならいます","To learn"],["勉強します","べんきょうします","To study"],
    ["練習します","れんしゅうします","To practice"],["働きます","はたらきます","To work"],["休みます","やすみます","To rest / take a break"],
    ["遊びます","あそびます","To play / hang out"],["泳ぎます","およぎます","To swim"],["走ります","はしります","To run"],
    ["歩きます","あるきます","To walk"],["立ちます","たちます","To stand"],["座ります","すわります","To sit"],
    ["急ぎます","いそぎます","To hurry"],["困ります","こまります","To be troubled / in trouble"],
    ["笑います","わらいます","To laugh / smile"],["泣きます","なきます","To cry"],
    ["怒ります","おこります","To get angry"],["驚きます","おどろきます","To be surprised"],
    ["忘れます","わすれます","To forget"],["覚えます","おぼえます","To memorize / remember"],
    ["起こします","おこします","To wake (someone) up"],["洗います","あらいます","To wash"],
    ["掃除します","そうじします","To clean / tidy"],["料理します","りょうりします","To cook"],
    ["運転します","うんてんします","To drive"],["旅行します","りょこうします","To travel"],
    ["結婚します","けっこんします","To get married"],["離婚します","りこんします","To divorce"],
    ["卒業します","そつぎょうします","To graduate"],["引っ越します","ひっこします","To move (house)"],
    ["電話します","でんわします","To call (phone)"],["説明します","せつめいします","To explain"],
    ["注意します","ちゅういします","To be careful / warn"],["用意します","ようします","To prepare"],
    ["準備します","じゅんびします","To prepare"],["確認します","かくにんします","To confirm / check"],
    ["紹介します","しょうかいします","To introduce"],["招待します","しょうたいします","To invite"],
    ["心配します","しんぱいします","To worry"],["失敗します","しっぱいします","To fail"],
    ["成功します","せいこうします","To succeed"],["連絡します","れんらくします","To contact"],
    ["相談します","そうだんします","To consult / discuss"],["手伝います","てつだいます","To help / assist"],
    ["比べます","くらべます","To compare"],["調べます","しらべます","To investigate / look up"],
    ["決めます","きめます","To decide"],["選びます","えらびます","To choose / select"],
    ["集めます","あつめます","To collect / gather"],["並べます","ならべます","To line up / arrange"],
    ["片付けます","かたづけます","To tidy up / put away"],["壊れます","こわれます","To break (intrans.)"],
    ["壊します","こわします","To break (trans.)"],["直します","なおします","To fix / correct"],
    ["変えます","かえます","To change (trans.)"],["変わります","かわります","To change (intrans.)"],
    ["増えます","ふえます","To increase (intrans.)"],["増やします","ふやします","To increase (trans.)"],
    ["減ります","へります","To decrease (intrans.)"],["負けます","まけます","To lose"],
    ["勝ちます","かちます","To win"],["参加します","さんかします","To participate"],
    ["開始します","かいしします","To start / commence"],["終了します","しゅうりょうします","To end / conclude"],
    ["送ります","おくります","To send / see off"],["受け取ります","うけとります","To receive / accept"],
    ["捨てます","すてます","To throw away / discard"],["拾います","ひろいます","To pick up"],
    ["引きます","ひきます","To pull / play (string instrument)"],["押します","おします","To push / press"],
    ["引っ張ります","ひっぱります","To pull / drag"],["動きます","うごきます","To move (intrans.)"],
    ["動かします","うごかします","To move (trans.)"],["止まります","とまります","To stop (intrans.)"],
    ["止めます","とめます","To stop (trans.)"],["始まります","はじまります","To begin (intrans.)"],
    ["建てます","たてます","To build / construct"],["壊します","こわします","To demolish / break"],
    ["生まれます","うまれます","To be born"],["死にます","しにます","To die"],
    ["生きます","いきます","To live / be alive"],["育ちます","そだちます","To grow up"],
    ["育てます","そだてます","To raise / bring up"],["見せます","みせます","To show"],
    ["見つけます","みつけます","To find"],["見つかります","みつかります","To be found"],
    ["聞こえます","きこえます","To be audible / can hear"],["見えます","みえます","To be visible / can see"],
    ["感じます","かんじます","To feel / sense"],["考えます","かんがえます","To think / consider"],
    ["信じます","しんじます","To believe / trust"],["疑います","うたがいます","To doubt"],
    ["愛します","あいします","To love"],["好きになります","すきになります","To come to like"],
    ["嫌いになります","きらいになります","To come to dislike"],["なります","なります","To become"],
    ["見学します","けんがくします","To observe / visit for learning"],["見物します","けんぶつします","To sightsee"],
    ["散歩します","さんぽします","To take a walk"],["買い物します","かいものします","To go shopping"],
    ["食事します","しょくじします","To have a meal"],["出発します","しゅっぱつします","To depart"],
    ["到着します","とうちゃくします","To arrive"],["予約します","よやくします","To reserve / book"],
    ["キャンセルします","キャンセルします","To cancel"],["申し込みます","もうしこみます","To apply"],
    ["登録します","とうろくします","To register"],["検索します","けんさくします","To search"],
    ["ダウンロードします","ダウンロードします","To download"],["送信します","そうしんします","To send (message)"],
    ["返信します","へんしんします","To reply"],["報告します","ほうこくします","To report"],
    ["発表します","はっぴょうします","To announce / present"],["計画します","けいかくします","To plan"],
    ["実現します","じつげんします","To realize / achieve"],["完成します","かんせいします","To complete"],
    ["失います","うしないます","To lose (something)"],["得ます","えます","To get / obtain"],
    ["利用します","りようします","To use / make use of"],["提供します","ていきょうします","To provide / offer"],
    ["受けます","うけます","To receive / take (exam)"],["落ちます","おちます","To fall / fail (exam)"],
    ["合格します","ごうかくします","To pass (exam)"],["続けます","つづけます","To continue"],
    ["続きます","つづきます","To continue (intrans.)"],["始めます","はじめます","To start / begin"],
    ["やめます","やめます","To quit / stop"],["断ります","ことわります","To refuse / decline"],
    ["許します","ゆるします","To forgive / permit"],["謝ります","あやまります","To apologize"],
    ["感謝します","かんしゃします","To thank / be grateful"],["挨拶します","あいさつします","To greet"],
    ["頼みます","たのみます","To ask / request"],["誘います","さそいます","To invite / ask out"],
    ["断ります","ことわります","To turn down / refuse"],["約束します","やくそくします","To promise"],
    ["嘘をつきます","うそをつきます","To lie / tell a lie"],["本当のことを言います","ほんとうのことをいいます","To tell the truth"],
    ["意見を言います","いけんをいいます","To express an opinion"],["質問します","しつもんします","To ask a question"],
    ["答えます","こたえます","To answer / respond"],["確かめます","たしかめます","To make sure / confirm"],
    ["気をつけます","きをつけます","To be careful"],["注意します","ちゅういします","To pay attention / caution"],
    ["楽しみます","たのしみます","To enjoy"],["楽しみにします","たのしみにします","To look forward to"],
    ["悩みます","なやみます","To worry / agonize"],["迷います","まよいます","To be lost / hesitate"],
    ["急ぎます","いそぎます","To rush / hurry"],["遅れます","おくれます","To be late"],
    ["間に合います","まにあいます","To be in time / make it"],["離れます","はなれます","To separate / move away"],
    ["近づきます","ちかづきます","To approach / get closer"],["逃げます","にげます","To run away / escape"],
    ["追います","おいます","To chase / follow"],["助けます","たすけます","To help / rescue"],
    ["守ります","まもります","To protect / keep (a promise)"],["戦います","たたかいます","To fight / battle"],
    ["負けます","まけます","To lose / be defeated"],["勝ちます","かちます","To win"],
    ["参ります","まいります","To go / come (humble)"],["いらっしゃいます","いらっしゃいます","To be / go / come (honorific)"],
    ["おっしゃいます","おっしゃいます","To say (honorific)"],["くださいます","くださいます","To give (honorific)"],
    ["いただきます","いただきます","To receive / eat (humble)"],["申します","もうします","To say (humble)"],
    ["拝見します","はいけんします","To look / see (humble)"],["伺います","うかがいます","To visit / ask (humble)"],
  ];
  add(verbsEN);

  // Adjectives
  const adjsEN = [
    ["大きい","おおきい","Big / Large"],["小さい","ちいさい","Small / Little"],
    ["高い","たかい","Tall / High / Expensive"],["低い","ひくい","Short / Low"],
    ["長い","ながい","Long"],["短い","みじかい","Short"],["広い","ひろい","Wide / Spacious"],
    ["狭い","せまい","Narrow / Small (space)"],["多い","おおい","Many / Much / A lot"],
    ["少ない","すくない","Few / Little"],["新しい","あたらしい","New"],["古い","ふるい","Old"],
    ["若い","わかい","Young"],["早い","はやい","Early / Fast"],["遅い","おそい","Late / Slow"],
    ["速い","はやい","Fast / Quick"],["暑い","あつい","Hot (weather)"],["寒い","さむい","Cold (weather)"],
    ["熱い","あつい","Hot (to the touch)"],["冷たい","つめたい","Cold (to the touch)"],
    ["暖かい","あたたかい","Warm"],["涼しい","すずしい","Cool / Refreshing"],
    ["難しい","むずかしい","Difficult"],["易しい","やさしい","Easy"],["強い","つよい","Strong"],
    ["弱い","よわい","Weak"],["重い","おもい","Heavy"],["軽い","かるい","Light (weight)"],
    ["硬い","かたい","Hard / Tough"],["柔らかい","やわらかい","Soft"],["深い","ふかい","Deep"],
    ["浅い","あさい","Shallow"],["近い","ちかい","Near / Close"],["遠い","とおい","Far / Distant"],
    ["明るい","あかるい","Bright / Cheerful"],["暗い","くらい","Dark"],["白い","しろい","White"],
    ["黒い","くろい","Black"],["赤い","あかい","Red"],["青い","あおい","Blue / Green"],
    ["黄色い","きいろい","Yellow"],["うるさい","うるさい","Noisy / Annoying"],
    ["静か","しずか","Quiet / Calm"],["きれい","きれい","Beautiful / Clean"],
    ["便利","べんり","Convenient"],["不便","ふべん","Inconvenient"],["有名","ゆうめい","Famous"],
    ["大切","たいせつ","Important / Precious"],["大丈夫","だいじょうぶ","Alright / OK"],
    ["上手","じょうず","Good at / Skilled"],["下手","へた","Bad at / Unskilled"],
    ["好き","すき","Liked / Favorite"],["嫌い","きらい","Disliked / Hated"],
    ["暇","ひま","Free (time) / Bored"],["忙しい","いそがしい","Busy"],
    ["危ない","あぶない","Dangerous"],["安全","あんぜん","Safe"],["大変","たいへん","Tough / Serious"],
    ["大事","だいじ","Important / Serious"],["親切","しんせつ","Kind"],["素敵","すてき","Wonderful / Lovely"],
    ["素晴らしい","すばらしい","Wonderful / Splendid"],["かわいい","かわいい","Cute / Adorable"],
    ["かっこいい","かっこいい","Cool / Stylish"],["おいしい","おいしい","Delicious / Tasty"],
    ["まずい","まずい","Bad tasting"],["甘い","あまい","Sweet"],["辛い","からい","Spicy / Hot"],
    ["しょっぱい","しょっぱい","Salty"],["苦い","にがい","Bitter"],["すっぱい","すっぱい","Sour"],
    ["太い","ふとい","Thick / Fat"],["細い","ほそい","Thin / Slim"],["丸い","まるい","Round"],
    ["四角い","しかくい","Square"],["正しい","ただしい","Correct / Right"],["悪い","わるい","Bad / Wrong"],
    ["良い","よい","Good"],["いい","いい","Good / Fine"],["楽しい","たのしい","Fun / Enjoyable"],
    ["悲しい","かなしい","Sad"],["嬉しい","うれしい","Happy / Glad"],["怖い","こわい","Scary"],
    ["痛い","いたい","Painful / Hurts"],["眠い","ねむい","Sleepy"],["恥ずかしい","はずかしい","Embarrassing / Shy"],
    ["寂しい","さびしい","Lonely"],["懐かしい","なつかしい","Nostalgic / Fondly remembered"],
    ["珍しい","めずらしい","Rare / Unusual"],["普通","ふつう","Normal / Ordinary"],
    ["特別","とくべつ","Special"],["自由","じゆう","Free / Freedom"],["必要","ひつよう","Necessary"],
    ["十分","じゅうぶん","Sufficient / Enough"],["簡単","かんたん","Simple / Easy"],
    ["複雑","ふくざつ","Complex / Complicated"],["真面目","まじめ","Serious / Sincere"],
    ["元気","げんき","Energetic / Healthy"],["丁寧","ていねい","Polite / Careful"],
    ["立派","りっぱ","Splendid / Fine / Admirable"],["厳しい","きびしい","Strict / Harsh"],
    ["優しい","やさしい","Kind / Gentle"],["賢い","かしこい","Clever / Smart"],
    ["ばか","ばか","Stupid / Foolish"],["おかしい","おかしい","Strange / Funny"],
    ["変","へん","Strange / Weird"],["急","きゅう","Sudden / Urgent"],
    ["同じ","おなじ","Same"],["違う","ちがう","Different"],["適当","てきとう","Appropriate / Random"],
    ["丁度","ちょうど","Just right / Exactly"],["かなり","かなり","Quite / Considerably"],
    ["もったいない","もったいない","Wasteful / What a waste"],["めんどくさい","めんどくさい","Troublesome / Annoying"],
    ["たくさん","たくさん","Many / A lot"],
  ];
  add(adjsEN);

  // Adverbs
  const advsEN = [
    ["とても","とても","Very / Extremely"],["すごく","すごく","Very / Terribly (casual)"],
    ["かなり","かなり","Quite / Fairly"],["少し","すこし","A little / Slightly"],
    ["ちょっと","ちょっと","A little / Just a moment"],["もっと","もっと","More"],
    ["もう","もう","Already / Not anymore"],["まだ","まだ","Still / Not yet"],
    ["また","また","Again / Also"],["いつも","いつも","Always / Usually"],
    ["よく","よく","Often / Well"],["たいてい","たいてい","Usually / Generally"],
    ["時々","ときどき","Sometimes / Occasionally"],["あまり〜ない","あまり〜ない","Not very / Not much"],
    ["ぜんぜん〜ない","ぜんぜん〜ない","Not at all"],["決して〜ない","けっして〜ない","Never / By no means"],
    ["絶対に","ぜったいに","Absolutely / Definitely"],["きっと","きっと","Surely / Certainly"],
    ["多分","たぶん","Probably / Perhaps"],["おそらく","おそらく","Probably / Presumably"],
    ["確かに","たしかに","Certainly / Indeed"],["本当に","ほんとうに","Really / Truly"],
    ["実は","じつは","Actually / In fact"],["特に","とくに","Especially / Particularly"],
    ["だいたい","だいたい","Generally / Approximately"],["大体","だいたい","About / Roughly"],
    ["急に","きゅうに","Suddenly"],["ゆっくり","ゆっくり","Slowly / Leisurely"],
    ["早く","はやく","Quickly / Early"],["遅く","おそく","Late / Slowly"],
    ["一緒に","いっしょに","Together"],["別々に","べつべつに","Separately"],
    ["初めて","はじめて","For the first time"],["最後に","さいごに","Finally / Lastly"],
    ["ずっと","ずっと","All along / The whole time"],["もうすぐ","もうすぐ","Soon / Shortly"],
    ["さっき","さっき","A while ago / Just now"],["あとで","あとで","Later / Afterwards"],
    ["これから","これから","From now on"],["なかなか〜ない","なかなか〜ない","Not easily / Hardly"],
    ["ちゃんと","ちゃんと","Properly / Correctly"],["はっきり","はっきり","Clearly / Distinctly"],
    ["すっかり","すっかり","Completely / Entirely"],["ほとんど","ほとんど","Almost / Mostly"],
    ["全部","ぜんぶ","All / Everything"],["少なくとも","すくなくとも","At least"],
    ["せめて","せめて","At least / At the minimum"],["わざわざ","わざわざ","Deliberately / Going out of the way"],
    ["やっと","やっと","Finally / At last"],["ついに","ついに","Finally / At long last"],
    ["いきなり","いきなり","Suddenly / Abruptly"],["そのまま","そのまま","As it is / Just as"],
    ["まず","まず","First of all / To begin with"],["次に","つぎに","Next"],
    ["それから","それから","After that / Then"],["また","また","Again / Moreover"],
    ["ところが","ところが","However / But (unexpected)"],["それに","それに","Moreover / In addition"],
  ];
  add(advsEN);

  // Connecting words / conjunctions
  const wordsEN = [
    ["でも","でも","But / However (casual)"],["しかし","しかし","However / But (formal)"],
    ["だから","だから","So / Therefore (casual)"],["ですから","ですから","Therefore (polite)"],
    ["そして","そして","And then / And also"],["それから","それから","And then / After that"],
    ["また","また","Also / In addition"],["さらに","さらに","Furthermore / Additionally"],
    ["けれども","けれども","However / Although"],["ところが","ところが","However / But (unexpected)"],
    ["だけど","だけど","But / However (casual)"],["それでも","それでも","Even so / Nevertheless"],
    ["それなのに","それなのに","And yet / Despite that"],["もし","もし","If (hypothetical)"],
    ["たとえ","たとえ","Even if / Even though"],["〜ば","〜ば","If (conditional)"],
    ["〜たら","〜たら","If / When (conditional past)"],["〜と","〜と","When / If (natural consequence)"],
    ["〜ても","〜ても","Even if / Even though"],["〜のに","〜のに","Although / Even though (regret)"],
    ["〜から","〜から","Because / Since"],["〜ので","〜ので","Because / Since (polite)"],
    ["なぜなら","なぜなら","Because / The reason is"],["つまり","つまり","In other words / That is"],
    ["たとえば","たとえば","For example"],["ただし","ただし","However / Provided that"],
    ["一方","いっぽう","On the other hand / Meanwhile"],["あるいは","あるいは","Or / Alternatively"],
    ["または","または","Or (formal)"],["かつ","かつ","And / Also (formal)"],
    ["しかも","しかも","Moreover / What's more"],["それとも","それとも","Or (asking)"],
    ["すなわち","すなわち","Namely / That is to say"],["したがって","したがって","Therefore / Consequently"],
    ["ゆえに","ゆえに","Therefore / Hence (formal)"],["それゆえ","それゆえ","For that reason"],
    ["以上","いじょう","That's all / In conclusion"],["以下","いか","Below / The following"],
    ["まず","まず","First of all"],["次に","つぎに","Next / Secondly"],
    ["最後に","さいごに","Finally / Lastly"],["最初に","さいしょに","First of all / To start"],
  ];
  add(wordsEN);

  // Question words — already has English type but we add meaning EN
  const questionsEN = [
    ["何","なに／なん","What"],["誰","だれ","Who"],["どこ","どこ","Where / Which way"],
    ["いつ","いつ","When"],["どれ","どれ","Which one (3+)"],["どの","どの","Which ~ (before noun)"],
    ["どちら","どちら","Which (of 2) / Which direction (polite)"],["どう","どう","How (manner / impression)"],
    ["どんな","どんな","What kind of"],["いくつ","いくつ","How many / How old"],
    ["いくら","いくら","How much (price)"],["なぜ","なぜ","Why (formal)"],
    ["どうして","どうして","Why (casual)"],["なんで","なんで","Why / How come (very casual)"],
    ["何時","なんじ","What time"],["何曜日","なんようび","What day of the week"],
    ["何月","なんがつ","What month"],["何日","なんにち","What date"],
    ["何年","なんねん","What year"],["何番","なんばん","What number"],
    ["何枚","なんまい","How many sheets"],["何人","なんにん","How many people"],
    ["どのくらい","どのくらい","About how long / far / much"],["どれくらい","どれくらい","About how much"],
    ["どうやって","どうやって","How (by what means)"],["どのように","どのように","In what way (formal)"],
    ["いつから","いつから","Since when"],["いつまで","いつまで","Until when"],
    ["どこへ","どこへ","To where"],["どこから","どこから","From where"],
    ["何のために","なんのために","What for / For what purpose"],["どちらのほうが","どちらのほうが","Which is more ~"],
  ];
  add(questionsEN);

  // Pronouns & demonstratives
  const pronounsEN = [
    ["私","わたし","I / Me (neutral)"],["わたくし","わたくし","I / Me (very formal)"],
    ["ぼく","ぼく","I (masculine casual)"],["おれ","おれ","I / Me (masculine, rough)"],
    ["あたし","あたし","I (feminine casual)"],["私たち","わたしたち","We / Us"],
    ["あなた","あなた","You (formal)"],["あなたたち","あなたたち","You (plural)"],
    ["彼","かれ","He / Boyfriend"],["彼女","かのじょ","She / Girlfriend"],
    ["彼ら","かれら","They (male / mixed)"],["彼女たち","かのじょたち","They (female)"],
    ["これ","これ","This (near speaker)"],["それ","それ","That (near listener)"],
    ["あれ","あれ","That (far from both)"],["この","この","This ~ (before noun)"],
    ["その","その","That ~ (before noun)"],["あの","あの","That ~ over there"],
    ["ここ","ここ","Here / This place"],["そこ","そこ","There / That place"],
    ["あそこ","あそこ","Over there / That place (far)"],["こちら","こちら","Here / This way (polite)"],
    ["そちら","そちら","There / That way (polite)"],["あちら","あちら","Over there (polite)"],
    ["こんな","こんな","This kind of / Like this"],["そんな","そんな","That kind of / Like that"],
    ["あんな","あんな","That kind of (far)"],["みんな","みんな","Everyone / All"],
    ["自分","じぶん","Oneself / Myself"],["お互い","おたがい","Each other / One another"],
  ];
  add(pronounsEN);

  // Particles
  const particlesEN = [
    ["は","は","Topic marker"],["が","が","Subject marker"],["を","を","Direct object marker"],
    ["に","に","To / At / On (place, time, destination)"],["へ","へ","To / Toward (direction)"],
    ["で","で","At / By / With (location of action / means)"],["と","と","And / With (together)"],
    ["の","の","Possessive / connector (noun + noun)"],["も","も","Also / Too / Even"],
    ["か","か","Question marker"],["ね","ね","Right? / Isn't it? (confirmation)"],
    ["よ","よ","I'm telling you / You know (assertion)"],["よね","よね","Right? (assertion + confirmation)"],
    ["から","から","From / Because (source / reason)"],["まで","まで","Until / As far as"],
    ["より","より","Than / From (comparison)"],["しか〜ない","しか〜ない","Only ~ (exclusive, always negative)"],
    ["だけ","だけ","Only / Just"],["でも","でも","Even / Any (+ も)"],
    ["ばかり","ばかり","Only / Just / Just finished"],["など","など","And so on / Such as"],
    ["とか","とか","Like / And stuff (casual)"],["くらい／ぐらい","くらい／ぐらい","About / Approximately"],
    ["ほど","ほど","About / As ~ as / The more...the more"],["ずつ","ずつ","Each / Per (distribution)"],
    ["さえ","さえ","Even / As long as"],["こそ","こそ","Indeed / It is precisely (emphasis)"],
    ["ながら","ながら","While / Although"],["て／で","て／で","And then / By doing (te-form)"],
    ["けど／けれど","けど／けれど","But / Although (casual)"],["のに","のに","Although / In spite of (regret)"],
    ["ので","ので","Because / Since (formal)"],["し","し","And also / What's more (multiple reasons)"],
    ["わ","わ","You know (feminine, assertion)"],["な","な","Yeah / Huh (masculine casual)"],
    ["かな","かな","I wonder / Maybe (self-doubt)"],["じゃないか","じゃないか","Isn't it? / Surely"],
    ["さ","さ","You see / Like (casual, neutral)"],["もん／もの","もん／もの","Because / After all (reason, feminine)"],
  ];
  add(particlesEN);

  // Expressions
  const expressionsEN = [
    ["おはようございます","おはようございます","Good morning (formal)"],
    ["おはよう","おはよう","Good morning (casual)"],
    ["こんにちは","こんにちは","Good afternoon / Hello"],
    ["こんばんは","こんばんは","Good evening"],
    ["はじめまして","はじめまして","Nice to meet you (first time)"],
    ["よろしくお願いします","よろしくおねがいします","Please treat me well / Nice to meet you"],
    ["おやすみなさい","おやすみなさい","Good night (formal)"],
    ["おやすみ","おやすみ","Good night (casual)"],
    ["さようなら","さようなら","Goodbye (formal)"],
    ["じゃあね","じゃあね","Bye / See ya (casual)"],
    ["またね","またね","See you again"],
    ["いってきます","いってきます","I'm heading out"],
    ["いってらっしゃい","いってらっしゃい","Take care / Have a good trip"],
    ["ただいま","ただいま","I'm home"],
    ["おかえりなさい","おかえりなさい","Welcome home"],
    ["いただきます","いただきます","Let's eat / Before eating"],
    ["ごちそうさまでした","ごちそうさまでした","Thank you for the meal"],
    ["お久しぶりです","おひさしぶりです","It's been a while (formal)"],
    ["久しぶり","ひさしぶり","Long time no see (casual)"],
    ["お元気ですか","おげんきですか","How are you? (formal)"],
    ["元気？","げんき？","How are you? (casual)"],
    ["いらっしゃいませ","いらっしゃいませ","Welcome (to a store / restaurant)"],
    ["ありがとうございます","ありがとうございます","Thank you (formal)"],
    ["ありがとう","ありがとう","Thank you (casual)"],
    ["どうもありがとうございます","どうもありがとうございます","Thank you very much (formal)"],
    ["どういたしまして","どういたしまして","You're welcome"],
    ["はい","はい","Yes / That's right (formal)"],
    ["いいえ","いいえ","No (formal)"],
    ["そうです","そうです","That's right / Yes"],
    ["そうですね","そうですね","Yes, indeed / That's true"],
    ["そうですか","そうですか","Is that so? / I see"],
    ["わかりました","わかりました","I understand / Got it"],
    ["わかりません","わかりません","I don't understand"],
    ["知りません","しりません","I don't know"],
    ["大丈夫です","だいじょうぶです","It's fine / I'm OK"],
    ["すみません","すみません","Excuse me / I'm sorry (general)"],
    ["ごめんなさい","ごめんなさい","I'm sorry (sincere)"],
    ["ごめん","ごめん","Sorry (casual)"],
    ["申し訳ありません","もうしわけありません","I'm deeply sorry (very formal)"],
    ["〜をください","〜をください","Please give me ~"],
    ["〜てください","〜てください","Please do ~"],
    ["〜てもいいですか","〜てもいいですか","May I ~ ?"],
    ["〜てはいけません","〜てはいけません","You must not ~ / Not allowed to ~"],
    ["お願いします","おねがいします","Please / I'm counting on you"],
    ["少々お待ちください","しょうしょうおまちください","Please wait a moment"],
    ["お疲れ様でした","おつかれさまでした","Good work / Thanks for your effort"],
    ["頑張ってください","がんばってください","Please do your best / Good luck"],
    ["頑張ります","がんばります","I'll do my best"],
    ["気をつけて","きをつけて","Take care / Be careful"],
    ["よかった","よかった","That's great / I'm relieved"],
    ["残念です","ざんねんです","That's too bad / What a shame"],
    ["本当ですか","ほんとうですか","Really? / Is that true?"],
    ["おめでとうございます","おめでとうございます","Congratulations! (formal)"],
    ["お大事に","おだいじに","Get well soon / Take care of yourself"],
    ["失礼します","しつれいします","Excuse me / I'll take my leave (formal)"],
    ["お先に失礼します","おさきにしつれいします","I'll leave ahead of you"],
  ];
  add(expressionsEN);

  // Fillers / Onomatopoeia
  const fillersEN = [
    ["あの〜","あの〜","Umm... / Well... (hesitating to start)"],
    ["えっと","えっと","Hmm... / Let me see... (thinking)"],
    ["うーん","うーん","Hmm... (considering)"],
    ["なんか","なんか","Like / Somehow (casual filler)"],
    ["まあ","まあ","Well / I guess so (half-agreement)"],
    ["ちょっと","ちょっと","Hmm, a bit... (soft refusal)"],
    ["やっぱり","やっぱり","After all / Just as I thought (casual)"],
    ["実は","じつは","Actually... / To be honest..."],
    ["それで","それで","And then? / So? (prompting continuation)"],
    ["ところで","ところで","By the way..."],
    ["とにかく","とにかく","Anyway / In any case"],
    ["ちなみに","ちなみに","By the way / For your information"],
    ["つまり","つまり","In other words / So what I mean is"],
    ["お久しぶりです","おひさしぶりです","It's been a while (formal)"],
    ["お元気ですか","おげんきですか","How are you? (formal)"],
    ["おめでとうございます","おめでとうございます","Congratulations! (formal)"],
    ["おめでとう","おめでとう","Congratulations! (casual)"],
    ["よいお年を","よいおとしを","Happy New Year (before the new year)"],
    ["あけましておめでとう","あけましておめでとう","Happy New Year (after midnight)"],
    ["お大事に","おだいじに","Get well soon / Take care"],
    ["お疲れ様でした","おつかれさまでした","Good work / Thanks for your hard work"],
    ["ご苦労様","ごくろうさま","Thank you for your hard work (superior to subordinate)"],
    ["頑張って","がんばって","Do your best / Good luck!"],
    ["気をつけて","きをつけて","Take care / Be careful"],
    ["どきどき","どきどき","Heart pounding (nervous / excited)"],
    ["わくわく","わくわく","Excited / Can't wait"],
    ["にこにこ","にこにこ","Smiling / Cheerful"],
    ["ぐるぐる","ぐるぐる","Spinning / Dizzy"],
    ["ぴかぴか","ぴかぴか","Sparkling / Gleaming"],
    ["ふわふわ","ふわふわ","Fluffy / Floating / Soft"],
    ["ざわざわ","ざわざわ","Noisy / Bustling / Uneasy"],
    ["さらさら","さらさら","Flowing smoothly / Silky (hair)"],
    ["ぬるぬる","ぬるぬる","Slippery / Slimy"],
    ["つるつる","つるつる","Smooth / Slippery (surface)"],
    ["ぐっすり","ぐっすり","Sound asleep / Sleeping deeply"],
    ["いらいら","いらいら","Irritated / Annoyed / Frustrated"],
    ["はらはら","はらはら","On edge / Anxious / In suspense"],
    ["もじもじ","もじもじ","Fidgety / Shy / Hesitant (in movement)"],
    ["きらきら","きらきら","Sparkling / Twinkling"],
    ["ぺらぺら","ぺらぺら","Fluent / Speaking smoothly"],
    ["うとうと","うとうと","Dozing / Half asleep"],
    ["もふもふ","もふもふ","Fluffy / Soft and plush"],
  ];
  add(fillersEN);

  return m;
})();

// Helper: get EN meaning for a vocab word, fallback to ID meaning
// Note: when lang='en', the UI already shows English labels and button reads '🌐 ID'.
// The vocab data (v[2]) is in Indonesian, so we swap to English when lang === 'en'.
function vocabMeaning(v){
  const isImportant = v[2] && v[2].startsWith('! ');
  const currentLang = (window.wandaGetLang && window.wandaGetLang()) || localStorage.getItem('wandaLang') || 'en';
  let meaning;
  if(currentLang === 'en'){
    const key = v[0]+'\x00'+v[1];
    meaning = VOCAB_EN_MAP[key] || v[2].replace(/^! /, '');
  } else {
    meaning = v[2].replace(/^! /, '');
  }
  return isImportant ? '<span style="color:#f5c842;font-weight:700">⚡</span> ' + meaning : meaning;
}

function render(){
  const cfg=TABS[cur];
  const q=document.getElementById('search').value.toLowerCase().trim();
  const tf=document.getElementById('typeFilter').value;
  const lf=document.getElementById('levelFilter').value;
  let data=cfg.data().map((v,i)=>{v._i=i;return v;});
  let filtered=data.filter(v=>{
    if(q&&!(v[0]||'').includes(q)&&!(v[1]||'').includes(q)&&!(v[2]||'').toLowerCase().includes(q)&&!(vocabMeaning(v)||'').toLowerCase().includes(q))return false;
    if(tf&&v[3]!==tf)return false;
    if(lf&&v[4]!==lf)return false;
    if(starFilter&&!starred[sk(cur,v._i)])return false;
    if(masteryFilter){
      const k=sk(cur,v._i);
      if(!starred[k]||masteryData[k]!==masteryFilter)return false;
    }
    return true;
  });
  const total=data.length;
  const nS=data.filter(v=>starred[sk(cur,v._i)]).length;
  const pct=total>0?Math.round(nS/total*100):0;
  document.getElementById('progFill').style.width=pct+'%';
  document.getElementById('progTxt').innerHTML=`<strong>${nS}</strong> / ${total} diingat`;
  document.getElementById('catCount').innerHTML=`<strong>${filtered.length}</strong> / ${total}`;
  document.getElementById('wcount').innerHTML=`<strong>${filtered.length}</strong> words`;
  // cols: insert extra empty th after position 1 (the star col) for mastery bubble col
  const colsHtml=cfg.cols.map((c,ci)=>`<th>${c}</th>${ci===1?'<th style="width:30px"></th>':''}`).join('');
  document.getElementById('thead').innerHTML='<tr>'+colsHtml+'</tr>';
  const empty=document.getElementById('empty');
  if(filtered.length===0){document.getElementById('tbody').innerHTML='';empty.style.display='';return;}
  empty.style.display='none';
  document.getElementById('tbody').innerHTML=filtered.map((v,i)=>`<tr class="${starred[sk(cur,v._i)]?'starred':''}">${cfg.row(v,i,cur)}</tr>`).join('');
}

switchTab('verbs');
updateGlobalProgress();
setBunpoSource('own');
updateGachaBtn();

// If today's saved gacha has no category info, clear it so next open re-rolls with sections
(function(){
  try{
    const raw = localStorage.getItem('jp_gacha_result_' + todayKey());
    if(raw){
      const words = JSON.parse(raw);
      if(words && words.length && !words[0].cat){
        localStorage.removeItem('jp_gacha_result_' + todayKey());
        localStorage.removeItem('jp_gacha_lastroll');
      }
    }
  }catch{}
})();
// v18: Clear cached gacha so new priority logic (always-important-first) takes effect
(function(){
  try{
    const v18Key = 'jp_gacha_v18_migrated';
    if(!localStorage.getItem(v18Key)){
      localStorage.removeItem('jp_gacha_result_' + todayKey());
      localStorage.removeItem('jp_gacha_lastroll');
      localStorage.setItem(v18Key, '1');
    }
  }catch{}
})();
// If saved gacha result has no category info, clear it so next open re-rolls with sections
(function(){
  try{
    const key = 'jp_gacha_result_' + todayKey();
    const raw = localStorage.getItem(key);
    if(raw){
      const words = JSON.parse(raw);
      if(words && words.length && !words[0].cat){
        localStorage.removeItem(key);
        localStorage.removeItem('jp_gacha_lastroll');
      }
    }
  }catch{}
})();

