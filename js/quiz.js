/* quiz.js — 分級測驗的作答流程、計分、結果頁。
   相依：quiz-data.js（題庫）、result-code.js（結果碼）。純前端，無 API。 */
(function () {
  'use strict';

  var DATA = window.BABEL_QUIZ;
  var CODE = window.BABEL_CODE;
  if (!DATA || !CODE) return;

  var tr = function (source, vars) {
    return window.BABEL_I18N ? window.BABEL_I18N.t(source, vars) : source.replace(/\{(\w+)\}/g, function (_, key) { return vars && vars[key] != null ? vars[key] : _; });
  };

  var STORAGE = 'babel-quiz-v1';
  var PASS = 0.6;                       // 每階段答對率門檻
  var FALLBACK = ['A1', 'A2', 'B1', 'B2'];   // 某階段未達門檻時判定的等級
  var TIERS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
  var SKILL_ZH = { grammaire: '文法 Grammaire', vocabulaire: '字彙 Vocabulaire',
                   comprehension: '閱讀 Compréhension', ecoute: '聽力 Écoute' };
  var COURSE = { 'A1': 'courses.html#class-a1', 'A2': 'courses.html#class-a2',
                 'B1': 'courses.html#class-b1', 'B2': 'courses.html#class-b2',
                 'B2+': 'courses.html#class-c1' };
  var COURSE_NAME = { 'A1': 'A1 入門班', 'A2': 'A2 初階班', 'B1': 'B1 進階班',
                      'B2': 'B2 高階班', 'B2+': 'C1 精通班' };

  var $ = function (id) { return document.getElementById(id); };
  var state = null, timerId = null, playCounts = {};

  /* ---------- 狀態 ---------- */
  function fresh() {
    return { asked: [], answers: [], stage: 0, pos: 0, elapsed: 0, done: false, level: null };
  }
  function save() {
    try { localStorage.setItem(STORAGE, JSON.stringify(state)); } catch (e) {}
  }
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE);
      if (!raw) return null;
      var s = JSON.parse(raw);
      return (s && Array.isArray(s.asked)) ? s : null;
    } catch (e) { return null; }
  }
  function clear() { try { localStorage.removeItem(STORAGE); } catch (e) {} }

  /* ---------- 畫面切換 ---------- */
  function show(which) {
    ['quiz-intro', 'quiz-run', 'quiz-result'].forEach(function (id) {
      var el = $(id); if (el) el.hidden = (id !== which);
    });
  }

  /* ---------- 巴別塔點燈 ---------- */
  function lightTower(count) {
    var tower = $('quiz-tower');
    if (!tower) return;
    tower.querySelectorAll('.tier').forEach(function (t, i) {
      t.classList.toggle('lit', i < count);
    });
    var label = $('tier-count');
    if (label) label.textContent = count === 0 ? tr('尚未點亮任何一層') : tr('已點亮 {count} 層：{levels}', { count: count, levels: TIERS.slice(0, count).join(' · ') });
  }
  function litFor(level) {
    return { 'A1': 1, 'A2': 2, 'B1': 3, 'B2': 4, 'B2+': 5 }[level] || 0;
  }

  /* ---------- 計時 ---------- */
  function fmt(sec) {
    var m = Math.floor(sec / 60), s = sec % 60;
    return (m < 10 ? '0' : '') + m + ':' + (s < 10 ? '0' : '') + s;
  }
  function startTimer() {
    stopTimer();
    timerId = setInterval(function () {
      state.elapsed++;
      var t = $('timer'); if (t) t.textContent = fmt(state.elapsed);
      if (state.elapsed % 10 === 0) save();
    }, 1000);
  }
  function stopTimer() { if (timerId) { clearInterval(timerId); timerId = null; } }

  /* ---------- 出題 ---------- */
  function currentQuestion() {
    var stage = DATA.stages[state.stage];
    if (!stage) return null;
    return DATA.get(stage.ids[state.pos]);
  }

  function renderQuestion() {
    var q = currentQuestion();
    if (!q) { finish(FALLBACK[Math.max(0, state.stage - 1)] || 'A1'); return; }

    $('q-index').textContent = String(state.asked.length + 1);
    $('q-stage').textContent = tr(DATA.stages[state.stage].label);
    var pct = Math.round(((state.asked.length) / 40) * 100);
    $('progress-bar').style.width = pct + '%';
    $('progress-track').setAttribute('aria-valuenow', String(state.asked.length));

    $('q-skill').textContent = tr(SKILL_ZH[q.skill] || q.skill);
    $('q-stem').textContent = q.question;

    /* 聽力題：原生 <audio>，最多播放兩次 */
    var box = $('q-audio');
    box.innerHTML = '';
    if (q.type === 'listening' && q.audio) {
      box.hidden = false;
      var wrap = document.createElement('div');
      wrap.className = 'audio-box';
      var note = document.createElement('p');
      note.className = 'muted';
      note.style.cssText = 'font-size:var(--fs-micro);margin:0 0 .5rem';
      note.textContent = tr('本題音檔最多播放兩次。');
      var audio = document.createElement('audio');
      audio.controls = true;
      audio.preload = 'none';
      audio.src = q.audio;
      var left = document.createElement('p');
      left.className = 'muted';
      left.style.cssText = 'font-size:var(--fs-micro);margin:.5rem 0 0';
      var remaining = function () {
        var used = playCounts[q.id] || 0;
        left.textContent = tr('剩餘播放次數：{count}', { count: Math.max(0, 2 - used) });
      };
      audio.addEventListener('play', function () {
        playCounts[q.id] = (playCounts[q.id] || 0) + 1;
        if (playCounts[q.id] > 2) { audio.pause(); audio.currentTime = 0; }
        remaining();
        if (playCounts[q.id] >= 2) {
          audio.addEventListener('ended', function () { audio.controls = false; left.textContent = tr('已用完播放次數。'); }, { once: true });
        }
      });
      remaining();
      wrap.appendChild(note); wrap.appendChild(audio); wrap.appendChild(left);
      box.appendChild(wrap);
    } else {
      box.hidden = true;
    }

    var opts = $('opts');
    opts.innerHTML = '';
    q.options.forEach(function (text, i) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'opt';
      b.setAttribute('aria-pressed', 'false');
      b.dataset.index = String(i);
      b.innerHTML = '<span class="mark">' + 'ABCD'[i] + '</span><span></span>';
      b.lastChild.textContent = text;
      b.addEventListener('click', function () {
        opts.querySelectorAll('.opt').forEach(function (o) { o.setAttribute('aria-pressed', 'false'); });
        b.setAttribute('aria-pressed', 'true');
        $('btn-next').disabled = false;
      });
      opts.appendChild(b);
    });
    $('btn-next').disabled = true;
    $('btn-next').textContent = tr('下一題');
    $('q-stem').focus();
  }

  function submitAnswer() {
    var chosen = $('opts').querySelector('.opt[aria-pressed="true"]');
    if (!chosen) return;
    var q = currentQuestion();
    state.asked.push(q.id);
    state.answers.push(parseInt(chosen.dataset.index, 10));
    state.pos++;

    var stage = DATA.stages[state.stage];
    if (state.pos >= stage.ids.length) {
      /* 階段結束，判斷是否續往上一層 */
      var start = state.asked.length - stage.ids.length;
      var correct = 0;
      for (var i = start; i < state.asked.length; i++) {
        if (isCorrect(state.asked[i], state.answers[i])) correct++;
      }
      var acc = correct / stage.ids.length;
      if (acc < PASS) { finish(FALLBACK[state.stage]); return; }
      if (state.stage >= DATA.stages.length - 1) { finish('B2+'); return; }
      state.stage++;
      state.pos = 0;
      lightTower(litFor(FALLBACK[state.stage]));
    }
    save();
    renderQuestion();
  }

  function isCorrect(id, chosen) {
    var q = DATA.get(id);
    return q ? DATA.decodeAnswer(q) === chosen : false;
  }

  /* ---------- 結果 ---------- */
  function finish(level) {
    state.done = true;
    state.level = level;
    stopTimer();
    save();
    renderResult();
  }

  function computeSkills() {
    var acc = {};
    CODE.SKILLS.forEach(function (s) { acc[s] = { n: 0, ok: 0 }; });
    state.asked.forEach(function (id, i) {
      var q = DATA.get(id);
      if (!q || !acc[q.skill]) return;
      acc[q.skill].n++;
      if (isCorrect(id, state.answers[i])) acc[q.skill].ok++;
    });
    var out = {};
    CODE.SKILLS.forEach(function (s) {
      out[s] = acc[s].n ? Math.round((acc[s].ok / acc[s].n) * 100) : -1;
    });
    return out;
  }

  function renderBars(skills, mount) {
    mount.innerHTML = '';
    CODE.SKILLS.forEach(function (s) {
      var v = skills[s];
      var row = document.createElement('div');
      row.className = 'bar-row';
      var label = document.createElement('span');
      label.textContent = tr(SKILL_ZH[s]);
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.setAttribute('viewBox', '0 0 100 8');
      svg.setAttribute('role', 'img');
      svg.setAttribute('aria-label', tr(SKILL_ZH[s]) + ': ' + (v < 0 ? tr('未測') : v));
      svg.style.width = '100%'; svg.style.height = '8px';
      var bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bg.setAttribute('x', '0'); bg.setAttribute('y', '3'); bg.setAttribute('width', '100');
      bg.setAttribute('height', '2'); bg.setAttribute('fill', 'var(--gold-hair)');
      svg.appendChild(bg);
      if (v >= 0) {
        var fg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
        fg.setAttribute('x', '0'); fg.setAttribute('y', '2'); fg.setAttribute('width', String(v));
        fg.setAttribute('height', '4'); fg.setAttribute('fill', 'var(--gold)');
        svg.appendChild(fg);
      }
      var num = document.createElement('span');
      num.style.textAlign = 'right';
      num.textContent = v < 0 ? '—' : v;
      row.appendChild(label); row.appendChild(svg); row.appendChild(num);
      mount.appendChild(row);
    });
  }

  function weakness(skills) {
    var pairs = CODE.SKILLS.filter(function (s) { return skills[s] >= 0; })
      .map(function (s) { return [s, skills[s]]; })
      .sort(function (a, b) { return a[1] - b[1]; });
    if (!pairs.length) return tr('題數不足，無法診斷弱項。');
    var low = pairs[0], high = pairs[pairs.length - 1];
    if (high[1] - low[1] < 15) {
      return tr('四項能力發展相當平均（{low}–{high} 分）。這種情況通常適合直接進入等級班，按進度整體往上推。', { low: low[1], high: high[1] });
    }
    var advice = {
      grammaire: '文法是目前最拖後腿的一項。建議先把時態與句型系統化整理一遍，再回頭做題；文法不穩會同時壓低寫作與口說的分數。',
      vocabulaire: '字彙量是主要瓶頸。建議改用主題式擴充（工作、教育、環境、社會），並記搭配詞而不是單字本身。',
      comprehension: '閱讀理解偏弱。多數失分來自沒抓到連接詞與語氣詞的轉折；建議練習先掃描結構再讀細節。',
      ecoute: '聽力明顯落後其他項。建議每天二十分鐘的短新聞聽寫，重點在習慣連音與語速，而不是聽懂每個字。'
    };
    return tr(advice[low[0]]) + ' ' + tr('（{weak} {weakScore} 分，最強的是 {strong} {strongScore} 分。）', {
      weak: tr(SKILL_ZH[low[0]]), weakScore: low[1], strong: tr(SKILL_ZH[high[0]]), strongScore: high[1]
    });
  }

  function renderResult() {
    show('quiz-result');
    var skills = computeSkills();
    var marks = state.asked.map(function (id, i) { return isCorrect(id, state.answers[i]) ? 1 : 0; });
    var level = state.level;

    $('res-level').textContent = level === 'B2+' ? 'B2+' : level;
    $('res-note').textContent = level === 'B2+'
      ? tr('你的表現已達 B2 以上。實際落點可能是 C1，需另安排口試才能確認。')
      : tr('判定等級 {level}（{name}）。', { level: level, name: ({A1:'Découverte',A2:'Survie',B1:'Seuil',B2:'Avancé'}[level] || '') });
    $('res-count').textContent = state.asked.length;
    $('res-correct').textContent = marks.filter(Boolean).length;
    $('res-time').textContent = fmt(state.elapsed);

    lightTower(litFor(level));
    var climb = $('res-climb');
    if (climb) climb.textContent = tr('你爬到了第 {count} 層。', { count: litFor(level) });

    renderBars(skills, $('res-bars'));
    $('res-weak').textContent = weakness(skills);

    var link = $('res-course');
    link.href = COURSE[level] || 'courses.html';
    link.textContent = tr('看看 {course} →', { course: tr(COURSE_NAME[level] || '課程') });

    /* 逐題檢討 */
    var review = $('res-review');
    review.innerHTML = '';
    state.asked.forEach(function (id, i) {
      var q = DATA.get(id);
      if (!q) return;
      var ok = marks[i] === 1;
      var d = document.createElement('details');
      d.className = 'review-item';
      var sum = document.createElement('summary');
      sum.innerHTML = '<span class="' + (ok ? 'badge-ok' : 'badge-no') + '">' + (ok ? tr('答對') : tr('答錯')) + '</span>';
      var stem = document.createElement('span');
      stem.textContent = (i + 1) + '. ' + q.question;
      sum.appendChild(stem);
      d.appendChild(sum);
      var body = document.createElement('div');
      body.style.cssText = 'font-size:var(--fs-small);padding:.5rem 0 .25rem';
      var correctIdx = DATA.decodeAnswer(q);
      body.innerHTML = '<p style="margin:.25rem 0"><strong>' + escapeHtml(tr('你的答案：')) + '</strong>' +
        escapeHtml(q.options[state.answers[i]] || tr('（未作答）')) + '</p>' +
        '<p style="margin:.25rem 0"><strong>' + escapeHtml(tr('正解：')) + '</strong>' + escapeHtml(q.options[correctIdx]) + '</p>' +
        '<p class="muted" style="margin:.25rem 0">' + escapeHtml(tr(q.explanation)) + '</p>';
      d.appendChild(body);
      review.appendChild(d);
    });

    var code = CODE.encode({ level: level, skills: skills, marks: marks });
    $('res-code').textContent = code;
    save();
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  /* ---------- 啟動 ---------- */
  function begin(resume) {
    if (!resume) { state = fresh(); clear(); }
    playCounts = {};
    show('quiz-run');
    lightTower(state.done ? litFor(state.level) : (state.stage === 0 ? 0 : litFor(FALLBACK[state.stage])));
    startTimer();
    renderQuestion();
    save();
  }

  function init() {
    var saved = load();
    state = saved || fresh();
    lightTower(0);

    if (saved && saved.done) {
      $('resume-note').hidden = false;
      $('resume-note').textContent = tr('偵測到上次已完成的測驗結果，可直接查看，或重新開始。');
      $('btn-resume').hidden = false;
      $('btn-resume').textContent = tr('查看上次結果');
      $('btn-resume').addEventListener('click', function () { renderResult(); });
    } else if (saved && saved.asked.length) {
      $('resume-note').hidden = false;
      $('resume-note').textContent = tr('偵測到未完成的作答進度（已答 {count} 題），可以接著做。', { count: saved.asked.length });
      $('btn-resume').hidden = false;
      $('btn-resume').addEventListener('click', function () { begin(true); });
    }

    $('btn-start').addEventListener('click', function () { begin(false); });
    $('btn-next').addEventListener('click', submitAnswer);

    document.querySelectorAll('[data-restart]').forEach(function (b) {
      b.addEventListener('click', function () {
        if (!confirm(tr('確定要清除目前的作答紀錄，重新開始嗎？'))) return;
        stopTimer();
        state = fresh();
        clear();
        lightTower(0);
        show('quiz-intro');
        $('resume-note').hidden = true;
        $('btn-resume').hidden = true;
        window.scrollTo(0, 0);
      });
    });

    var copy = $('btn-copy');
    if (copy) copy.addEventListener('click', function () {
      var text = $('res-code').textContent;
      var done = function () { copy.textContent = tr('已複製 ✓'); setTimeout(function () { copy.textContent = tr('複製結果碼'); }, 2000); };
      if (navigator.clipboard) { navigator.clipboard.writeText(text).then(done, done); }
      else {
        var ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); done();
      }
    });

    var print = $('btn-print');
    if (print) print.addEventListener('click', function () { window.print(); });

    document.addEventListener('babel:languagechange', function () {
      if (state && state.done) renderResult();
      else if ($('quiz-run') && !$('quiz-run').hidden) renderQuestion();
      else lightTower(0);
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
