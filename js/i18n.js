/* ── Wanda Lang Toggle ── */
(function(){
var EN = {
  /* mode tabs */
  "🗣️ Kalimat": "🗣️ Sentence",
  /* sent setup */
  "Daftar Kalimat": "Sentence List",
  "satu kalimat per baris": "one sentence per line",
  "Arah Terjemahan": "Translation Direction",
  "JP → Arti": "JP → Meaning",
  "Arti → JP": "Meaning → JP",
  "Acak": "Random",
  "Timer per soal": "Timer per question",
  "Mulai Quiz →": "Start Quiz →",
  /* bunpo */
  "Kalimat Kamu": "Your Sentences",
  "satu kalimat per baris": "one sentence per line",
  "Sumber Soal": "Question Source",
  "✏️ Kalimatku": "✏️ My Sentences",
  "Waktu per Soal": "Time per Question",
  "Detik per kalimat": "Seconds per sentence",
  "🎲 Mulai Quiz Baru →": "🎲 Start New Quiz →",
  "🔁 Ulangi Soal Sama": "🔁 Repeat Same Questions",
  "Lanjut →": "Next →",
  "Selesai ✓": "Done ✓",
  /* conj */
  "Daftar Kata — satu kata per baris": "Word List — one word per line",
  "Pilih Bentuk Perubahan": "Choose Conjugation Forms",
  "Filter Jenis Kata": "Filter Word Type",
  "Pilih Semua": "Select All",
  "Hapus Semua": "Clear All",
  "Ubah ke bentuk": "Change to form",
  "📖 Lihat Rumus": "📖 View Formulas",
  /* vocab */
  "Cari kanji, kana, atau arti...": "Search kanji, kana, or meaning...",
  "Semua tipe": "All types",
  "Semua level": "All levels",
  "Baru / Susah": "New / Hard",
  "Lumayan": "So-so",
  "Hafal Kuat": "Mastered",
  "Tidak ada hasil.": "No results found.",
  /* study plan */
  "Lacak hafalan harian · 45 kata/hari · Drill setiap minggu & 3 hari":
    "Track daily memorization · 45 words/day · Drill every week & 3 days",
  "Hari Ini": "Today",
  "Semua": "All",
  "Bulan ini": "This Month",
  "Minggu ini": "This Week",
  "3 Hari": "3 Days",
  "Minggu Ini": "This Week",
  "Minggu Lalu": "Last Week",
  "kata dibintangi": "words starred",
  /* roadmap */
  "Siap dipelajari": "Ready to study",
  "Terkunci": "Locked",
  "Selesai ✓": "Completed ✓",
  "Tandai selesai ✓": "Mark as done ✓",
  "Tandai belum selesai": "Mark as incomplete",
  "💡 Strategi": "💡 Strategy",
  "Fondasi": "Foundation",
  "Berkembang": "Growing",
  "Menengah": "Intermediate",
  "Mahir": "Proficient",
  "Hadiah terbuka!": "Reward unlocked!",
  "Selesaikan 5 sesi!": "Complete 5 sessions!",
};
var ID = {};
for(var k in EN){ ID[EN[k]]=k; }

var lang = localStorage.getItem('wandaLang') || 'en';

function wandaSwapText(node, map){
  if(node.nodeType === 3){
    var t = node.textContent.trim();
    if(map[t]) node.textContent = node.textContent.replace(t, map[t]);
    return;
  }
  if(node.tagName === 'SCRIPT' || node.tagName === 'STYLE') return;
  for(var i=0;i<node.childNodes.length;i++) wandaSwapText(node.childNodes[i], map);
}

function wandaSwapPlaceholders(map){
  document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(function(el){
    var p = el.getAttribute('placeholder');
    if(map[p]) el.setAttribute('placeholder', map[p]);
  });
}

function wandaApply(){
  var map = lang === 'en' ? EN : ID;
  wandaSwapText(document.body, map);
  wandaSwapPlaceholders(map);
  var btn = document.getElementById('wanda-lang-btn');
  if(btn) btn.textContent = lang === 'en' ? '🌐 EN' : '🌐 ID';
}

window.wandaToggleLang = function(){
  lang = lang === 'en' ? 'id' : 'en';
  localStorage.setItem('wandaLang', lang);
  wandaApply();
  // Re-render Kotoba Master table so meanings update immediately
  if(typeof render === 'function') render();
};

// Expose current lang for use by render()
window.wandaGetLang = function(){ return lang; };

document.addEventListener('DOMContentLoaded', function(){ wandaApply(); });
setTimeout(function(){ wandaApply(); }, 300);
})();
