// ══════════════════════════════════════════════════
// BUNPOU N5 DATA + LOGIC
// ══════════════════════════════════════════════════

const BP_DATA = [
  // PARTICLES
  {cat:"particle", jp:"は", romaji:"wa", meaning:"Topic marker — marks what the sentence is about", ex:"私は学生です。 (I am a student.)"},
  {cat:"particle", jp:"が", romaji:"ga", meaning:"Subject marker — marks the grammatical subject", ex:"猫がいます。 (There is a cat.)"},
  {cat:"particle", jp:"を", romaji:"wo/o", meaning:"Object marker — marks the direct object", ex:"水を飲みます。 (I drink water.)"},
  {cat:"particle", jp:"に", romaji:"ni", meaning:"Direction, location of existence, time, indirect object", ex:"学校に行きます。 (I go to school.)"},
  {cat:"particle", jp:"へ", romaji:"e", meaning:"Direction toward — similar to に but emphasizes direction", ex:"東京へ行く。 (Go toward Tokyo.)"},
  {cat:"particle", jp:"で", romaji:"de", meaning:"Location of action, means/method, material, scope", ex:"図書館で勉強します。 (I study at the library.)"},
  {cat:"particle", jp:"の", romaji:"no", meaning:"Possession / noun modification", ex:"私の本。 (My book.)"},
  {cat:"particle", jp:"と", romaji:"to", meaning:"And (listing nouns); with (together with someone)", ex:"犬と猫。 (Dog and cat.)"},
  {cat:"particle", jp:"も", romaji:"mo", meaning:"Also / too / either", ex:"私も行きます。 (I'll go too.)"},
  {cat:"particle", jp:"か", romaji:"ka", meaning:"Question marker (sentence-final); or (between nouns)", ex:"これはペンですか。 (Is this a pen?)"},
  {cat:"particle", jp:"ね", romaji:"ne", meaning:"Seeking agreement / confirmation — 'right?', 'isn't it?'", ex:"いい天気ですね。 (Nice weather, isn't it?)"},
  {cat:"particle", jp:"よ", romaji:"yo", meaning:"Asserting information — 'you know', 'I tell you'", ex:"これは辛いですよ。 (This is spicy, you know.)"},
  {cat:"particle", jp:"から", romaji:"kara", meaning:"From (starting point); because / so (reason)", ex:"9時から始まります。 (It starts from 9 o'clock.)"},
  {cat:"particle", jp:"まで", romaji:"made", meaning:"Until / up to (time or place)", ex:"5時まで働きます。 (I work until 5.)"},
  {cat:"particle", jp:"より", romaji:"yori", meaning:"Than — used in comparisons", ex:"犬より猫が好きです。 (I like cats more than dogs.)"},
  {cat:"particle", jp:"だけ", romaji:"dake", meaning:"Only / just", ex:"一つだけください。 (Just one, please.)"},
  {cat:"particle", jp:"しか〜ない", romaji:"shika~nai", meaning:"Only (with negative) — nothing but", ex:"百円しかない。 (I only have 100 yen.)"},
  {cat:"particle", jp:"や", romaji:"ya", meaning:"And (non-exhaustive list) — listing some of many", ex:"りんごやみかんを買った。 (Bought apples and oranges, etc.)"},
  {cat:"particle", jp:"に (frequency)", romaji:"ni (frequency)", meaning:"Per — used with frequency expressions", ex:"週に三回。 (Three times a week.)"},
  {cat:"particle", jp:"ごろ", romaji:"goro", meaning:"Around / approximately (time)", ex:"3時ごろ来てください。 (Please come around 3.)"},
  {cat:"particle", jp:"くらい/ぐらい", romaji:"kurai/gurai", meaning:"About / approximately (quantity or extent)", ex:"1時間くらいかかります。 (It takes about an hour.)"},
  // COPULA
  {cat:"copula", jp:"です", romaji:"desu", meaning:"Polite copula — is/am/are (present positive)", ex:"これは本です。 (This is a book.)"},
  {cat:"copula", jp:"ではありません / じゃありません", romaji:"dewa arimasen", meaning:"Is not / am not (polite negative)", ex:"これは本ではありません。 (This is not a book.)"},
  {cat:"copula", jp:"でした", romaji:"deshita", meaning:"Was/were (polite past positive)", ex:"昨日は休みでした。 (Yesterday was a day off.)"},
  {cat:"copula", jp:"ではありませんでした", romaji:"dewa arimasen deshita", meaning:"Was not (polite past negative)", ex:"彼は先生ではありませんでした。"},
  {cat:"copula", jp:"だ", romaji:"da", meaning:"Plain copula — is/am/are (casual)", ex:"これは猫だ。 (This is a cat.)"},
  {cat:"copula", jp:"Noun + も + Noun + も", romaji:"mo~mo", meaning:"Both...and... / neither...nor...", ex:"犬も猫も好きです。 (I like both dogs and cats.)"},
  {cat:"copula", jp:"Noun の Noun", romaji:"no", meaning:"Noun modifying noun", ex:"日本語の本。 (Japanese language book.)"},
  {cat:"copula", jp:"〜は〜が好きです", romaji:"~wa~ga sukidesu", meaning:"[Subject] likes [object]", ex:"私は音楽が好きです。 (I like music.)"},
  {cat:"copula", jp:"〜は〜が上手です/下手です", romaji:"~wa~ga jouzu/heta", meaning:"Good at / bad at something", ex:"彼は料理が上手です。 (He is good at cooking.)"},
  {cat:"copula", jp:"〜は〜がわかります", romaji:"~wa~ga wakarimasu", meaning:"Understand — [person] understands [thing]", ex:"私は日本語がわかります。"},
  // VERB
  {cat:"verb", jp:"〜ます", romaji:"~masu", meaning:"Polite present / future positive", ex:"食べます。 (I eat / I will eat.)"},
  {cat:"verb", jp:"〜ません", romaji:"~masen", meaning:"Polite present / future negative", ex:"食べません。 (I don't eat.)"},
  {cat:"verb", jp:"〜ました", romaji:"~mashita", meaning:"Polite past positive", ex:"食べました。 (I ate.)"},
  {cat:"verb", jp:"〜ませんでした", romaji:"~masen deshita", meaning:"Polite past negative", ex:"食べませんでした。 (I didn't eat.)"},
  {cat:"verb", jp:"〜ませんか", romaji:"~masen ka", meaning:"Invitation — won't you...? / shall we...?", ex:"一緒に行きませんか。 (Won't you go with me?)"},
  {cat:"verb", jp:"〜ましょう", romaji:"~mashou", meaning:"Let's do... / shall we...?", ex:"行きましょう。 (Let's go.)"},
  {cat:"verb", jp:"〜ましょうか", romaji:"~mashou ka", meaning:"Shall I...? (offering to do something)", ex:"荷物を持ちましょうか。 (Shall I carry your bags?)"},
  {cat:"verb", jp:"〜たい", romaji:"~tai", meaning:"Want to do... (speaker's desire)", ex:"寿司を食べたい。 (I want to eat sushi.)"},
  {cat:"verb", jp:"〜たいです", romaji:"~tai desu", meaning:"Want to do... (polite)", ex:"日本に行きたいです。 (I want to go to Japan.)"},
  {cat:"verb", jp:"〜ている", romaji:"~te iru", meaning:"Currently doing / ongoing state (te-form + iru)", ex:"今、食べています。 (I am eating now.)"},
  {cat:"verb", jp:"〜てください", romaji:"~te kudasai", meaning:"Please do... (polite request)", ex:"ここに座ってください。 (Please sit here.)"},
  {cat:"verb", jp:"〜てもいいですか", romaji:"~te mo ii desu ka", meaning:"May I...? / Is it okay if I...?", ex:"写真を撮ってもいいですか。 (May I take a photo?)"},
  {cat:"verb", jp:"〜てはいけません", romaji:"~te wa ikemasen", meaning:"Must not / not allowed to", ex:"ここで泳いではいけません。 (You must not swim here.)"},
  {cat:"verb", jp:"〜なければなりません", romaji:"~nakereba narimasen", meaning:"Must do / have to do", ex:"宿題をしなければなりません。 (I have to do my homework.)"},
  {cat:"verb", jp:"〜なくてもいいです", romaji:"~nakute mo ii desu", meaning:"Don't have to / it's okay not to", ex:"来なくてもいいです。 (You don't have to come.)"},
  {cat:"verb", jp:"〜ないでください", romaji:"~naide kudasai", meaning:"Please don't do...", ex:"ここに入らないでください。 (Please don't enter here.)"},
  {cat:"verb", jp:"〜に行く/来る/帰る", romaji:"~ni iku/kuru/kaeru", meaning:"Go/come/return to do something (purpose)", ex:"映画を見に行きます。 (I'm going to watch a movie.)"},
  {cat:"verb", jp:"あります / います", romaji:"arimasu / imasu", meaning:"There is/are — arimasu (things), imasu (people/animals)", ex:"机の上に本があります。 (There is a book on the desk.)"},
  {cat:"verb", jp:"〜ことができます", romaji:"~koto ga dekimasu", meaning:"Can do / be able to do", ex:"日本語を話すことができます。 (I can speak Japanese.)"},
  {cat:"verb", jp:"〜から〜まで", romaji:"kara~made (verb)", meaning:"From...to... (time/place range with verbs)", ex:"9時から5時まで働きます。 (I work from 9 to 5.)"},
  {cat:"verb", jp:"〜てから", romaji:"~te kara", meaning:"After doing... / once you do...", ex:"ご飯を食べてから勉強します。 (After eating, I'll study.)"},
  {cat:"verb", jp:"〜前に", romaji:"~mae ni", meaning:"Before doing...", ex:"寝る前に歯を磨きます。 (I brush my teeth before sleeping.)"},
  // ADJECTIVES
  {cat:"adj", jp:"い-adjective (present)", romaji:"~i desu", meaning:"I-adjective polite present positive", ex:"この本は面白いです。 (This book is interesting.)"},
  {cat:"adj", jp:"い-adjective (negative)", romaji:"~ku nai desu", meaning:"I-adjective polite present negative", ex:"この本は面白くないです。 (Not interesting.)"},
  {cat:"adj", jp:"い-adjective (past)", romaji:"~katta desu", meaning:"I-adjective polite past positive", ex:"昨日は暑かったです。 (Yesterday was hot.)"},
  {cat:"adj", jp:"い-adjective (past neg)", romaji:"~ku nakatta desu", meaning:"I-adjective polite past negative", ex:"昨日は寒くなかったです。 (Yesterday was not cold.)"},
  {cat:"adj", jp:"な-adjective (present)", romaji:"~na desu", meaning:"Na-adjective polite present positive", ex:"彼女はきれいです。 (She is pretty.)"},
  {cat:"adj", jp:"な-adjective (negative)", romaji:"~ja arimasen", meaning:"Na-adjective polite present negative", ex:"彼女はきれいじゃありません。"},
  {cat:"adj", jp:"な-adjective (past)", romaji:"~deshita", meaning:"Na-adjective polite past positive", ex:"部屋はきれいでした。 (The room was clean.)"},
  {cat:"adj", jp:"〜くて (い-adj)", romaji:"~kute", meaning:"I-adjective te-form — connecting adjectives / and", ex:"安くておいしい。 (Cheap and delicious.)"},
  {cat:"adj", jp:"〜で (な-adj)", romaji:"~de", meaning:"Na-adjective te-form — connecting adjectives", ex:"親切で面白い人。 (A kind and interesting person.)"},
  {cat:"adj", jp:"〜い → 〜く + verb", romaji:"~ku + verb", meaning:"I-adjective adverb form", ex:"早く起きます。 (Wake up early.)"},
  {cat:"adj", jp:"〜な → 〜に + verb", romaji:"~ni + verb", meaning:"Na-adjective adverb form", ex:"静かに話してください。 (Please speak quietly.)"},
  {cat:"adj", jp:"どんな〜", romaji:"donna~", meaning:"What kind of...?", ex:"どんな映画が好きですか。 (What kind of movies do you like?)"},
  // SENTENCE PATTERNS
  {cat:"sentence", jp:"〜は〜です", romaji:"~wa~desu", meaning:"Basic copula sentence — A is B", ex:"私は田中です。 (I am Tanaka.)"},
  {cat:"sentence", jp:"これ / それ / あれ", romaji:"kore/sore/are", meaning:"This / that / that over there (thing)", ex:"これは何ですか。 (What is this?)"},
  {cat:"sentence", jp:"ここ / そこ / あそこ", romaji:"koko/soko/asoko", meaning:"Here / there / over there (place)", ex:"トイレはどこですか。 (Where is the toilet?)"},
  {cat:"sentence", jp:"この / その / あの", romaji:"kono/sono/ano", meaning:"This ~ / that ~ / that ~ over there (adj form)", ex:"この本は面白いです。 (This book is interesting.)"},
  {cat:"sentence", jp:"〜がほしい", romaji:"~ga hoshii", meaning:"Want (something) — noun desire", ex:"新しい車がほしい。 (I want a new car.)"},
  {cat:"sentence", jp:"〜はどうですか", romaji:"~wa dou desu ka", meaning:"How about...? / How is...?", ex:"お茶はどうですか。 (How about some tea?)"},
  {cat:"sentence", jp:"〜はどんなですか", romaji:"~wa donna desu ka", meaning:"What is ~ like? / What kind of ~ is it?", ex:"日本の冬はどんなですか。"},
  {cat:"sentence", jp:"〜ている (state)", romaji:"~te iru (state)", meaning:"Ongoing state resulting from change", ex:"結婚しています。 (I am married.)"},
  {cat:"sentence", jp:"〜しか〜ない", romaji:"shika~nai", meaning:"Nothing but / only (with negative predicate)", ex:"これしかない。 (There is only this.)"},
  {cat:"sentence", jp:"〜でしょう", romaji:"~deshou", meaning:"Probably / I think... (conjecture)", ex:"明日は晴れるでしょう。 (It will probably be sunny tomorrow.)"},
  {cat:"sentence", jp:"Verb dictionary form + つもりです", romaji:"~tsumori desu", meaning:"Intend to / plan to do", ex:"来年、日本に行くつもりです。 (I plan to go to Japan next year.)"},
  {cat:"sentence", jp:"〜と思います", romaji:"~to omoimasu", meaning:"I think that...", ex:"彼は来ると思います。 (I think he will come.)"},
  // QUESTIONS
  {cat:"question", jp:"何 (なに/なん)", romaji:"nani/nan", meaning:"What?", ex:"これは何ですか。 (What is this?)"},
  {cat:"question", jp:"誰 (だれ)", romaji:"dare", meaning:"Who?", ex:"あの人は誰ですか。 (Who is that person?)"},
  {cat:"question", jp:"どこ", romaji:"doko", meaning:"Where?", ex:"駅はどこですか。 (Where is the station?)"},
  {cat:"question", jp:"いつ", romaji:"itsu", meaning:"When?", ex:"誕生日はいつですか。 (When is your birthday?)"},
  {cat:"question", jp:"どれ", romaji:"dore", meaning:"Which one? (from 3 or more)", ex:"どれがあなたのかばんですか。"},
  {cat:"question", jp:"どちら/どっち", romaji:"dochira/docchi", meaning:"Which? (of two); which direction; polite 'where'", ex:"どちらが好きですか。 (Which do you like?)"},
  {cat:"question", jp:"どう", romaji:"dou", meaning:"How? / In what way?", ex:"これはどう使いますか。 (How do you use this?)"},
  {cat:"question", jp:"どのくらい/どのぐらい", romaji:"dono kurai", meaning:"How much? / How long? / How far?", ex:"どのくらいかかりますか。 (How long does it take?)"},
  {cat:"question", jp:"いくら", romaji:"ikura", meaning:"How much? (price)", ex:"これはいくらですか。 (How much is this?)"},
  {cat:"question", jp:"いくつ", romaji:"ikutsu", meaning:"How many? / How old?", ex:"りんごはいくつありますか。 (How many apples are there?)"},
  {cat:"question", jp:"何人 (なんにん)", romaji:"nannin", meaning:"How many people?", ex:"何人家族ですか。 (How many people in your family?)"},
  {cat:"question", jp:"何時 (なんじ)", romaji:"nanji", meaning:"What time?", ex:"今何時ですか。 (What time is it now?)"},
  {cat:"question", jp:"なぜ/どうして", romaji:"naze/doushite", meaning:"Why?", ex:"なぜ遅れましたか。 (Why were you late?)"},
  // TIME
  {cat:"time", jp:"今 (いま)", romaji:"ima", meaning:"Now", ex:"今、何をしていますか。 (What are you doing now?)"},
  {cat:"time", jp:"〜時に", romaji:"~ji ni", meaning:"At [time]", ex:"7時に起きます。 (I wake up at 7.)"},
  {cat:"time", jp:"〜曜日に", romaji:"~youbi ni", meaning:"On [day of the week]", ex:"月曜日に学校があります。"},
  {cat:"time", jp:"〜月に", romaji:"~gatsu ni", meaning:"In [month]", ex:"4月に日本に来ました。 (I came to Japan in April.)"},
  {cat:"time", jp:"毎〜", romaji:"mai~", meaning:"Every ~ (maiasa=every morning, mainichi=every day)", ex:"毎日運動します。 (I exercise every day.)"},
  {cat:"time", jp:"〜前 / 〜後", romaji:"~mae / ~go", meaning:"Before ~ / After ~ (time noun)", ex:"食事の前。 (Before the meal.)"},
  {cat:"time", jp:"もう", romaji:"mou", meaning:"Already / anymore", ex:"もう食べました。 (I already ate.)"},
  {cat:"time", jp:"まだ", romaji:"mada", meaning:"Still / not yet", ex:"まだ終わっていません。 (It's not done yet.)"},
  {cat:"time", jp:"よく", romaji:"yoku", meaning:"Often / frequently", ex:"よく映画を見ます。 (I often watch movies.)"},
  {cat:"time", jp:"たまに", romaji:"tama ni", meaning:"Occasionally / sometimes", ex:"たまにケーキを食べます。"},
  {cat:"time", jp:"あまり〜ない", romaji:"amari~nai", meaning:"Not very often / not much", ex:"あまり肉を食べません。 (I don't eat much meat.)"},
  {cat:"time", jp:"全然〜ない", romaji:"zenzen~nai", meaning:"Not at all / never", ex:"全然わかりません。 (I don't understand at all.)"},
  {cat:"time", jp:"いつも", romaji:"itsumo", meaning:"Always / usually", ex:"いつもここで昼を食べます。"},
  {cat:"time", jp:"時々 (ときどき)", romaji:"tokidoki", meaning:"Sometimes", ex:"時々図書館に行きます。 (I sometimes go to the library.)"},
  // CONNECT
  {cat:"connect", jp:"〜て (te-form)", romaji:"~te", meaning:"Te-form — connects actions sequentially or as reason", ex:"起きて、顔を洗って、朝ごはんを食べました。"},
  {cat:"connect", jp:"〜が (conjunction)", romaji:"~ga (conjunction)", meaning:"But / however (soft contrast between clauses)", ex:"行きたいですが、時間がありません。 (I want to go, but I have no time.)"},
  {cat:"connect", jp:"〜けど / 〜けれど", romaji:"~kedo/keredo", meaning:"But / although (casual contrast)", ex:"高いけど、買います。 (It's expensive, but I'll buy it.)"},
  {cat:"connect", jp:"〜から (reason)", romaji:"~kara (reason)", meaning:"Because / so — reason clause", ex:"雨が降っているから、傘を持って行きます。"},
  {cat:"connect", jp:"〜ので", romaji:"~node", meaning:"Because / since (objective/softer reason)", ex:"体が悪いので、休みます。 (Since I'm not well, I'll rest.)"},
  {cat:"connect", jp:"そして", romaji:"soshite", meaning:"And then / and also (connector between sentences)", ex:"起きました。そして朝ごはんを食べました。"},
  {cat:"connect", jp:"でも", romaji:"demo", meaning:"But / however (sentence-initial)", ex:"行きたい。でも、時間がない。 (I want to go. But I have no time.)"},
  {cat:"connect", jp:"それから", romaji:"sorekara", meaning:"And then / after that", ex:"昼ごはんを食べて、それから映画を見ました。"},
  {cat:"connect", jp:"〜や〜など", romaji:"~ya~nado", meaning:"Things like ~ and ~ etc.", ex:"果物やパンなどを買いました。 (Bought fruits, bread, etc.)"},
  {cat:"connect", jp:"〜し、〜し", romaji:"~shi, ~shi", meaning:"Not only...but also... (listing reasons)", ex:"安いし、おいしいし、また来たいです。"},
  // COUNTER
  {cat:"counter", jp:"〜枚 (まい)", romaji:"~mai", meaning:"Counter for flat things (paper, tickets, plates)", ex:"紙を3枚ください。 (3 sheets of paper, please.)"},
  {cat:"counter", jp:"〜本 (ほん)", romaji:"~hon", meaning:"Counter for long thin things (bottles, pens, rivers)", ex:"ペンを2本買いました。 (I bought 2 pens.)"},
  {cat:"counter", jp:"〜冊 (さつ)", romaji:"~satsu", meaning:"Counter for bound books / notebooks", ex:"本を5冊読みました。 (I read 5 books.)"},
  {cat:"counter", jp:"〜台 (だい)", romaji:"~dai", meaning:"Counter for machines, vehicles", ex:"車を1台持っています。 (I have 1 car.)"},
  {cat:"counter", jp:"〜匹 (ひき)", romaji:"~hiki", meaning:"Counter for small animals (cats, dogs, fish)", ex:"猫が3匹います。 (There are 3 cats.)"},
  {cat:"counter", jp:"〜頭 (とう)", romaji:"~tou", meaning:"Counter for large animals (horses, cows, elephants)", ex:"馬が2頭います。 (There are 2 horses.)"},
  {cat:"counter", jp:"〜羽 (わ)", romaji:"~wa", meaning:"Counter for birds and rabbits", ex:"鳥が5羽います。 (There are 5 birds.)"},
  {cat:"counter", jp:"〜個 (こ)", romaji:"~ko", meaning:"Counter for small round/compact objects", ex:"みかんを4個買いました。 (I bought 4 oranges.)"},
  {cat:"counter", jp:"〜杯 (はい)", romaji:"~hai", meaning:"Counter for cups/glasses of liquid", ex:"コーヒーを1杯飲みました。"},
  {cat:"counter", jp:"〜人 (にん/り)", romaji:"~nin/ri", meaning:"Counter for people (ひとり=1, ふたり=2, then にん)", ex:"5人で行きました。 (We went as a group of 5.)"},
  {cat:"counter", jp:"〜階 (かい)", romaji:"~kai", meaning:"Counter for floors of a building", ex:"3階に住んでいます。 (I live on the 3rd floor.)"},
  {cat:"counter", jp:"〜番 (ばん)", romaji:"~ban", meaning:"Number ~ (for rankings, bus lines, etc.)", ex:"3番のバスに乗ります。 (Take bus number 3.)"},
  {cat:"counter", jp:"〜時間 (じかん)", romaji:"~jikan", meaning:"~ hours (duration)", ex:"2時間待ちました。 (I waited 2 hours.)"},
  {cat:"counter", jp:"〜分 (ふん/ぷん)", romaji:"~fun/pun", meaning:"~ minutes", ex:"10分かかります。 (It takes 10 minutes.)"},
  {cat:"counter", jp:"〜週間 (しゅうかん)", romaji:"~shuukan", meaning:"~ weeks", ex:"2週間日本にいました。 (I was in Japan for 2 weeks.)"},
  {cat:"counter", jp:"〜ヶ月 (かげつ)", romaji:"~kagetsu", meaning:"~ months (duration)", ex:"6ヶ月勉強しました。 (I studied for 6 months.)"},
  {cat:"counter", jp:"〜年 (ねん)", romaji:"~nen", meaning:"~ years (duration or year number)", ex:"3年間日本語を勉強しました。"},
  {cat:"counter", jp:"ひとつ/ふたつ... (和語)", romaji:"hitotsu/futatsu...", meaning:"Native Japanese counting (1–10 general objects)", ex:"りんごをふたつ食べました。 (I ate 2 apples.)"},
];

const BP_CAT_LABEL = {
  particle:"Particles", copula:"Copula / Nouns", verb:"Verb Forms",
  adj:"Adjectives", sentence:"Sentence Patterns", question:"Questions",
  time:"Time & Frequency", connect:"Connecting / Conjunctions", counter:"Numbers & Counters"
};
const BP_CAT_ORDER = ["particle","copula","verb","adj","sentence","question","time","connect","counter"];

// Generate unique IDs
BP_DATA.forEach((d, i) => { d._id = 'bp_' + i; });

const BP_TOTAL = BP_DATA.length;
const BP_STORAGE_KEY = 'bunpou_n5_checked';
let bpChecked = new Set();
let bpUncheckedOnly = false;
let bpCollapsed = {};

function bpLoadState() {
  try {
    const raw = localStorage.getItem(BP_STORAGE_KEY);
    if (raw) bpChecked = new Set(JSON.parse(raw));
  } catch {}
}
function bpSaveState() {
  try {
    localStorage.setItem(BP_STORAGE_KEY, JSON.stringify([...bpChecked]));
  } catch {}
}

function bpToggleCard(id) {
  if (bpChecked.has(id)) bpChecked.delete(id);
  else bpChecked.add(id);
  bpSaveState();
  bpUpdateProgress();
  // Toggle the card class without full re-render for snappiness
  const card = document.querySelector('[data-bp-id="' + id + '"]');
  if (card) {
    card.classList.toggle('checked', bpChecked.has(id));
    const tick = card.querySelector('.bp-check-tick');
    if (tick) tick.style.display = bpChecked.has(id) ? 'block' : 'none';
  }
  // If unchecked-only mode, re-render to hide newly checked
  if (bpUncheckedOnly) bpRender();
  bpUpdateCatProgress();
  bpUpdateNavChip();
}

function bpToggleUnchecked() {
  bpUncheckedOnly = !bpUncheckedOnly;
  const btn = document.getElementById('bp-unchecked-btn');
  if (btn) btn.classList.toggle('active', bpUncheckedOnly);
  bpRender();
}

function bpResetAll() {
  if (!confirm('Reset all bunpou progress? This cannot be undone.')) return;
  bpChecked.clear();
  bpSaveState();
  bpRender();
  bpUpdateProgress();
  bpUpdateNavChip();
}

function bpToggleSection(cat) {
  bpCollapsed[cat] = !bpCollapsed[cat];
  const header = document.querySelector('[data-bp-cat="' + cat + '"] .bp-cat-header');
  const body = document.querySelector('[data-bp-cat="' + cat + '"] .bp-cat-body');
  if (header) header.classList.toggle('collapsed', bpCollapsed[cat]);
  if (body) body.classList.toggle('collapsed', bpCollapsed[cat]);
}

function bpUpdateProgress() {
  const done = bpChecked.size;
  const pct = BP_TOTAL ? Math.round(done / BP_TOTAL * 100) : 0;
  const el = (id) => document.getElementById(id);
  if (el('bp-done-count')) el('bp-done-count').textContent = done;
  if (el('bp-total-count')) el('bp-total-count').textContent = BP_TOTAL;
  if (el('bp-pct-text')) el('bp-pct-text').textContent = pct + '% mastered';
  if (el('bp-bar-fill')) el('bp-bar-fill').style.width = pct + '%';
  if (el('bp-stat-done')) el('bp-stat-done').textContent = done;
  if (el('bp-stat-left')) el('bp-stat-left').textContent = BP_TOTAL - done;
}

function bpUpdateCatProgress() {
  BP_CAT_ORDER.forEach(cat => {
    const items = BP_DATA.filter(d => d.cat === cat);
    const done = items.filter(d => bpChecked.has(d._id)).length;
    const pct = items.length ? Math.round(done / items.length * 100) : 0;
    const fillEl = document.querySelector('[data-bp-cat="' + cat + '"] .bp-cat-prog-fill');
    const txtEl = document.querySelector('[data-bp-cat="' + cat + '"] .bp-cat-prog-txt');
    if (fillEl) fillEl.style.width = pct + '%';
    if (txtEl) txtEl.textContent = done + '/' + items.length;
  });
}

function bpUpdateNavChip() {
  const done = bpChecked.size;
  const pct = BP_TOTAL ? Math.round(done / BP_TOTAL * 100) : 0;
  const numsEl = document.getElementById('bp-chip-nums');
  const pctEl = document.getElementById('bp-chip-pct');
  const fillEl = document.getElementById('bp-chip-fill');
  const subEl = document.getElementById('bp-chip-sub');
  if (numsEl) numsEl.innerHTML = '<strong>' + done + '</strong><span style="color:var(--text3);margin:0 1px">/</span>' + BP_TOTAL;
  if (pctEl) pctEl.textContent = pct + '%';
  if (fillEl) fillEl.style.width = pct + '%';
  if (subEl) subEl.textContent = (BP_TOTAL - done) + ' bunpou left';
}

// ── Bunpou Level Switcher ──
let bpCurrentLevel = localStorage.getItem('bp_active_level') || 'N5';

// Per-level data placeholders — N5 is real data, others are stubs
const BP_LEVEL_DATA = {
  N5: null, // uses main BP_DATA
  N4: null,
  N3: null,
  N2: null,
  N1: null,
};

// Storage keys per level
const BP_LEVEL_STORAGE = {
  N5: 'bunpou_n5_checked',
  N4: 'bunpou_n4_checked',
  N3: 'bunpou_n3_checked',
  N2: 'bunpou_n2_checked',
  N1: 'bunpou_n1_checked',
};

// Totals per level (N5 = real BP_DATA.length, others = approximate for display)
const BP_LEVEL_TOTALS = {
  N5: BP_TOTAL,
  N4: 0, N3: 0, N2: 0, N1: 0,
};

function bpSwitchLevel(level) {
  bpCurrentLevel = level;
  try { localStorage.setItem('bp_active_level', level); } catch {}

  // Update button states
  document.querySelectorAll('.bp-lvl-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === level);
  });

  // Update chip icon label
  const iconEl = document.getElementById('bp-chip-icon');
  if (iconEl) iconEl.textContent = level;

  // Update chip numbers based on level
  bpUpdateNavChipForLevel(level);

  // If bunpou panel is open, update the hero display and sub-label
  const heroEl = document.querySelector('.bp-logo-text');
  if (heroEl) heroEl.textContent = 'Bunpou ' + level;

  // If level is N5, use real data; others show "coming soon" overlay
  if (level === 'N5') {
    bpUpdateNavChip();
    const bpOut = document.getElementById('bp-output');
    if (bpOut && document.getElementById('bp-coming-soon')) {
      document.getElementById('bp-coming-soon').style.display = 'none';
      bpOut.style.display = '';
      document.querySelector('.bp-controls') && (document.querySelector('.bp-controls').style.display = '');
      document.querySelector('.bp-hero') && (document.querySelector('.bp-hero').style.display = '');
    }
    bpRender();
  } else {
    bpUpdateNavChipForLevel(level);
    // Show coming soon state in panel
    const bpOut = document.getElementById('bp-output');
    if (bpOut) {
      bpOut.style.display = 'none';
      document.querySelector('.bp-controls') && (document.querySelector('.bp-controls').style.display = 'none');
      document.querySelector('.bp-hero') && (document.querySelector('.bp-hero').style.display = 'none');
      let cs = document.getElementById('bp-coming-soon');
      if (!cs) {
        cs = document.createElement('div');
        cs.id = 'bp-coming-soon';
        cs.style.cssText = 'text-align:center;padding:80px 20px;color:var(--text3);';
        cs.innerHTML = '<div style="font-size:48px;margin-bottom:16px;">🚧</div><div style="font-size:18px;font-weight:600;color:var(--text2);margin-bottom:8px;">Bunpou ' + level + ' Coming Soon</div><div style="font-size:13px;">Grammar data for ' + level + ' is being prepared.</div>';
        bpOut.parentNode.insertBefore(cs, bpOut);
      } else {
        cs.style.display = '';
        cs.innerHTML = '<div style="font-size:48px;margin-bottom:16px;">🚧</div><div style="font-size:18px;font-weight:600;color:var(--text2);margin-bottom:8px;">Bunpou ' + level + ' Coming Soon</div><div style="font-size:13px;">Grammar data for ' + level + ' is being prepared.</div>';
      }
    }
  }
}

function bpUpdateNavChipForLevel(level) {
  if (level === 'N5') {
    bpUpdateNavChip();
    return;
  }
  // For other levels, load their checked set from localStorage
  let checkedSet = new Set();
  try {
    const raw = localStorage.getItem(BP_LEVEL_STORAGE[level]);
    if (raw) checkedSet = new Set(JSON.parse(raw));
  } catch {}
  const total = BP_LEVEL_TOTALS[level]; // 0 for unimplemented
  const done = checkedSet.size;
  const pct = total > 0 ? Math.round(done / total * 100) : 0;
  const numsEl = document.getElementById('bp-chip-nums');
  const pctEl = document.getElementById('bp-chip-pct');
  const fillEl = document.getElementById('bp-chip-fill');
  const subEl = document.getElementById('bp-chip-sub');
  if (numsEl) numsEl.innerHTML = '<strong>' + done + '</strong><span style="color:var(--text3);margin:0 1px">/</span>' + (total || '?');
  if (pctEl) pctEl.textContent = total > 0 ? pct + '%' : '--';
  if (fillEl) fillEl.style.width = total > 0 ? pct + '%' : '0%';
  if (subEl) subEl.textContent = level + ' coming soon';
}

// Init level on load
// ── Dropdown toggle ──
function bpToggleLevelDropdown(e) {
  e.stopPropagation();
  const trigger = document.getElementById('bp-lvl-trigger');
  trigger.classList.toggle('open');
}
function bpSelectLevel(e, level) {
  e.stopPropagation();
  document.getElementById('bp-lvl-trigger').classList.remove('open');
  bpSwitchLevel(level);
}
// Close dropdown on outside click
document.addEventListener('click', function() {
  const trigger = document.getElementById('bp-lvl-trigger');
  if (trigger) trigger.classList.remove('open');
});

(function initBpLevel() {
  const savedLevel = localStorage.getItem('bp_active_level') || 'N5';
  bpCurrentLevel = savedLevel;
  document.querySelectorAll('.bp-lvl-opt').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.level === savedLevel);
  });
  const iconEl = document.getElementById('bp-chip-icon');
  if (iconEl) iconEl.textContent = savedLevel;
  if (savedLevel !== 'N5') {
    bpUpdateNavChipForLevel(savedLevel);
  }
})();

function bpRender() {
  const q = (document.getElementById('bp-search') || {value:''}).value.toLowerCase();
  const cf = (document.getElementById('bp-cat-filter') || {value:''}).value;

  const filtered = BP_DATA.filter(d => {
    const match = !q || d.jp.includes(q) || d.romaji.toLowerCase().includes(q) || d.meaning.toLowerCase().includes(q) || (d.ex && d.ex.toLowerCase().includes(q));
    const cat = !cf || d.cat === cf;
    const unc = !bpUncheckedOnly || !bpChecked.has(d._id);
    return match && cat && unc;
  });

  const statsEl = document.getElementById('bp-stats-text');
  if (statsEl) statsEl.textContent = 'Showing ' + filtered.length + ' of ' + BP_TOTAL + ' grammar points';

  const out = document.getElementById('bp-output');
  if (!filtered.length) {
    out.innerHTML = '<div class="bp-empty">No grammar points found. Try a different search. 🔍</div>';
    return;
  }

  const grouped = {};
  BP_CAT_ORDER.forEach(c => { grouped[c] = filtered.filter(d => d.cat === c); });

  let html = '';
  BP_CAT_ORDER.forEach(cat => {
    const items = grouped[cat];
    if (!items.length) return;
    const allItems = BP_DATA.filter(d => d.cat === cat);
    const done = allItems.filter(d => bpChecked.has(d._id)).length;
    const pct = allItems.length ? Math.round(done / allItems.length * 100) : 0;
    const isCollapsed = bpCollapsed[cat];
    html += `<div class="bp-cat-section" data-bp-cat="${cat}">
      <div class="bp-cat-header${isCollapsed ? ' collapsed' : ''}" onclick="bpToggleSection('${cat}')">
        <span class="bp-cat-chevron">▼</span>
        <span class="bp-cat-title">${BP_CAT_LABEL[cat]}</span>
        <div class="bp-cat-progress-pill">
          <div class="bp-cat-prog-bar"><div class="bp-cat-prog-fill" style="width:${pct}%"></div></div>
          <span class="bp-cat-prog-txt">${done}/${allItems.length}</span>
        </div>
        <span class="bp-cat-badge">${items.length} shown</span>
      </div>
      <div class="bp-cat-body${isCollapsed ? ' collapsed' : ''}">
        <div class="bp-grid">`;
    items.forEach(d => {
      const isChecked = bpChecked.has(d._id);
      html += `<div class="bp-card${isChecked ? ' checked' : ''}" data-bp-id="${d._id}" onclick="bpToggleCard('${d._id}')">
        <div class="bp-check-wrap">
          <div class="bp-check">
            <span class="bp-check-tick" style="display:${isChecked ? 'block' : 'none'}">✓</span>
          </div>
        </div>
        <div class="bp-card-content">
          <div class="bp-card-top">
            <span class="bp-jp">${d.jp}</span>
            <span class="bp-romaji">${d.romaji}</span>
            <span class="bp-cat-tag bp-t-${d.cat}">${BP_CAT_LABEL[d.cat].split(' ')[0]}</span>
          </div>
          <div class="bp-meaning">${d.meaning}</div>
          ${d.ex ? `<div class="bp-example">${d.ex}</div>` : ''}
        </div>
      </div>`;
    });
    html += '</div></div></div>';
  });

  out.innerHTML = html;
  bpUpdateProgress();
  bpUpdateNavChip();
}

// Init
bpLoadState();
bpRender();
bpUpdateNavChip();
