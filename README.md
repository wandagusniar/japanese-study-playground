<p align="center">
  <img src="assets/Japanese%20Study%20Playground-%20Logo.png" width="300" alt="Japanese Study Playground Logo">
</p>

# Japanese Study Playground

A personal Japanese study tool — built because existing apps didn't fit how I actually study for N5/N4.

Still Improving

## Features

- **Quiz Practice** — vocab, sentence, grammar pattern, kanji reading, and conjugation quizzes with optional timers
- **Kotoba Master (Vocab)** — daily vocabulary schedule with a spaced-review style tracker
- **Bunpou** — N5 grammar reference and practice (particles, verb forms, patterns)
- **Roadmap** — maps N4 and N5 grammar points against each other so I can review both syllabuses together
- **Countdown** — tracks days remaining to study deadlines/exams
- **Streak + goal tracking** — daily streak counter and a starred-word goal bar
- **EN/ID language toggle** — since I study partly in Indonesian

## Project structure

```
index.html          — page structure, all panel markup
css/style.css        — all styling
js/
  app.js             — panel navigation (switchApp)
  timer.js           — per-question timer used across quiz modes
  quiz.js            — Quiz Practice panel: vocab/sentence/grammar/kanji/conjugation modes
  vocab.js           — Kotoba Master vocab panel + word/verb data + daily schedule
  countdown.js       — countdown panel (add/delete events, live countdown)
  streak.js          — streak counter + goal bar (shown in nav)
  bunpou.js          — Bunpou grammar reference panel
  roadmap.js         — N4/N5 roadmap panel
  i18n.js            — EN/ID text toggle
```

Originally built as a single HTML file; split into these modules for readability and version control.

## Running it

No build step — just open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000
```

## What I'd improve next

- Move vocab/verb data out of JS into JSON files
- Add proper spaced-repetition scheduling instead of a fixed daily plan
- Clean up countdown.js (currently the messiest file)
