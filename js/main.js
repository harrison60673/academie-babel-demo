/* main.js — 全站共用的少量原生 JS。無相依、無 build。 */
(function () {
  'use strict';

  var tr = function (source, vars) {
    return window.BABEL_I18N ? window.BABEL_I18N.t(source, vars) : source.replace(/\{(\w+)\}/g, function (_, key) { return vars && vars[key] != null ? vars[key] : _; });
  };

  /* 1. 手機導覽開合 */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* 2. 捲動淡入，尊重 prefers-reduced-motion */
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var targets = document.querySelectorAll('.reveal');
  if (reduce || !('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    targets.forEach(function (el) { io.observe(el); });
  }

  /* 3. 首頁 hero 巴別塔：滑鼠/鍵盤移到某層顯示該 CEFR 等級說明 */
  var tower = document.querySelector('.tower.interactive, .tower-plate.interactive');
  var readout = document.getElementById('tier-readout');
  if (tower && readout) {
    var nameEl = readout.querySelector('strong');
    var descEl = readout.querySelector('p');
    var tiers = tower.querySelectorAll('.tier');
    var show = function (t) {
      tiers.forEach(function (x) { x.classList.remove('active'); });
      t.classList.add('active');
      nameEl.textContent = t.dataset.level + ' — ' + t.dataset.title;
      descEl.textContent = t.dataset.desc;
    };
    tiers.forEach(function (t) {
      t.addEventListener('mouseenter', function () { show(t); });
      t.addEventListener('focus', function () { show(t); });
      t.addEventListener('click', function () { show(t); });
      t.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(t); }
      });
    });
  }

  /* 4. 課表／課程篩選：純粹對既有 DOM 做顯示隱藏，不打 API */
  var filterBar = document.querySelector('[data-filters]');
  if (filterBar) {
    var state = { level: 'all', mode: 'all' };
    var apply = function () {
      document.querySelectorAll('[data-level][data-mode]').forEach(function (el) {
        var okL = state.level === 'all' || el.dataset.level === state.level;
        var okM = state.mode === 'all' || el.dataset.mode === state.mode;
        el.hidden = !(okL && okM);
      });
      // 課表中整欄／整天若無可見課程，標示為空
      document.querySelectorAll('[data-daycell]').forEach(function (cell) {
        var any = cell.querySelector('.slot:not([hidden])');
        var empty = cell.querySelector('.cell-empty');
        if (empty) empty.hidden = !!any;
      });
      var visible = document.querySelectorAll('.course-card:not([hidden])').length;
      var note = document.getElementById('filter-count');
      if (note) note.textContent = tr('目前顯示 {count} 個課程方案', { count: visible });
    };
    filterBar.addEventListener('click', function (e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      var group = chip.dataset.group;
      filterBar.querySelectorAll('.chip[data-group="' + group + '"]').forEach(function (c) {
        c.setAttribute('aria-pressed', String(c === chip));
      });
      state[group] = chip.dataset.value;
      apply();
    });
    apply();
    document.addEventListener('babel:languagechange', apply);
  }

  /* 5. 年份 */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
})();
