/* result-code.js — 結果碼的產生與還原（quiz.html 與 decode.html 共用）
   格式：<等級>-<20 字元左右的酬載>
   例：B1-2643C8ZZ0A3F7C2E1

   ⚠ 這是編碼，不是加密。任何人讀了這支檔案就能還原內容，
     所以結果碼裡只放等級、四技能得分與逐題對錯，不放任何個資。
*/
(function (global) {
  'use strict';

  var LEVELS = ['A1', 'A2', 'B1', 'B2', 'B2+'];
  var SKILLS = ['grammaire', 'vocabulaire', 'comprehension', 'ecoute'];

  function b36(n, len) {
    var s = Math.max(0, Math.round(n)).toString(36).toUpperCase();
    while (s.length < len) s = '0' + s;
    return s.slice(-len);
  }
  function checksum(s) {
    var t = 0;
    for (var i = 0; i < s.length; i++) t += s.charCodeAt(i);
    return (t % 36).toString(36).toUpperCase();
  }

  /* result = { level:'B1', skills:{grammaire:75,...}（-1 表示未測）, marks:[1,0,1,...] } */
  function encode(result) {
    var lv = LEVELS.indexOf(result.level);
    if (lv < 0) lv = 0;
    var body = String(lv);
    SKILLS.forEach(function (s) {
      var v = result.skills[s];
      body += (v === null || v === undefined || v < 0) ? 'ZZ' : b36(v, 2);
    });
    var marks = result.marks || [];
    body += b36(marks.length, 2);
    var bits = marks.map(function (m) { return m ? '1' : '0'; }).join('');
    while (bits.length % 4 !== 0) bits += '0';
    var hex = '';
    for (var i = 0; i < bits.length; i += 4) hex += parseInt(bits.substr(i, 4), 2).toString(16).toUpperCase();
    body += hex;
    return LEVELS[lv].replace('+', 'P') + '-' + body + checksum(body);
  }

  function decode(code) {
    if (!code) return null;
    var raw = String(code).trim().toUpperCase().replace(/\s+/g, '');
    var parts = raw.split('-');
    if (parts.length !== 2) return null;
    var body = parts[1];
    if (body.length < 12) return null;
    var payload = body.slice(0, -1);
    if (checksum(payload) !== body.slice(-1)) return null;

    var lv = parseInt(payload[0], 10);
    if (isNaN(lv) || lv < 0 || lv >= LEVELS.length) return null;
    if (LEVELS[lv].replace('+', 'P') !== parts[0]) return null;

    var skills = {};
    SKILLS.forEach(function (s, i) {
      var chunk = payload.substr(1 + i * 2, 2);
      skills[s] = chunk === 'ZZ' ? -1 : parseInt(chunk, 36);
    });
    var count = parseInt(payload.substr(9, 2), 36);
    var hex = payload.slice(11);
    var bits = '';
    for (var i = 0; i < hex.length; i++) {
      var v = parseInt(hex[i], 16);
      if (isNaN(v)) return null;
      bits += ('000' + v.toString(2)).slice(-4);
    }
    var marks = [];
    for (var j = 0; j < count; j++) marks.push(bits[j] === '1' ? 1 : 0);
    return { level: LEVELS[lv], skills: skills, marks: marks };
  }

  global.BABEL_CODE = { encode: encode, decode: decode, LEVELS: LEVELS, SKILLS: SKILLS };
})(window);
