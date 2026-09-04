# ACADÉMIE BABEL 法語學院 — 靜態網站

純 HTML + CSS + 原生 JS。沒有後端、沒有框架、沒有 build 步驟。
把整個 `site/` 資料夾內容丟上 GitHub Pages 或 Netlify 就會動。

---

## 檔案結構

```
index.html        首頁（互動巴別塔 hero、特色、等級階梯、考試總覽、開課摘要、評價）
exams.html        法語檢定介紹（比較表、DELF/DALF/TCF/TEF 各區塊、CEFR 表、準備建議、FAQ）
courses.html      課程方案卡 + 每週課表 + 篩選
teachers.html     師資卡片
contact.html      聯絡方式
quiz.html         免費分級測驗（自適應、純前端計分、結果頁）
decode.html       內部用結果碼解碼頁（未列於導覽，靠網址進入）
404.html          找不到頁面
styles.css        全站唯一樣式表，色票在最上方的 :root 變數
favicon.svg       巴別塔簡化版
sitemap.xml       上線前要改網域
robots.txt        上線前要改網域
assets/
  academie-babel-logo.jpg              原始白底品牌圖，供社群分享預覽
  academie-babel-logo-transparent.png  透明底深色字版，供淺色頁首使用
  academie-babel-logo-dark.png         透明底白字版，供暗色背景使用
  og-template.svg 可重複使用的 OG image 版型
  audio/          測驗聽力題音檔（見該資料夾的 README.txt）
js/
  i18n.js        全站語系切換、翻譯詞庫、語言記憶與 RTL 支援
  main.js         導覽開合、捲動淡入、hero 巴別塔互動、課程篩選
  quiz-data.js    題庫（60 題）
  result-code.js  結果碼的產生與還原
  quiz.js         測驗流程、計分、結果頁
```

---

## 多語系（i18n）

全站支援繁體中文（`zh-Hant`）、英文（`en`）、法文（`fr`）與波斯文（`fa-IR`）。
頁首的語言選單會把選擇存入瀏覽器 `localStorage`；也可用網址參數直接指定，
例如 `index.html?lang=fr` 或 `courses.html?lang=fa`。波斯文會自動切換為 RTL 排版。

翻譯集中在 `js/i18n.js` 的 `ENTRIES`，格式如下：

```js
'繁中原文': ['English', 'Français', 'فارسی']
```

HTML 以繁中原文作為 fallback，不需要在每個元素加 `data-i18n`。新增頁面時，請在頁尾、
`main.js` 之前載入 `js/i18n.js`；JS 動態產生的文字則用 `BABEL_I18N.t('繁中原文')`。

---

## 上線前必須自己核對的清單

網站裡所有還沒確認的數字，旁邊都留了 `<!-- TODO: ... -->` 註解。
在編輯器裡搜尋 `TODO:` 就能一次列出。以下是**一定要核對**的：

### 一、考試資訊（`exams.html`、`index.html`）
向 France Éducation international（DELF / DALF / TCF）與
CCI Paris Île-de-France（TEF）官網，以及當地官方考試中心確認：

- [ ] DELF 各等級四科的**考試時間與配分**
- [ ] DELF / DALF 的**及格門檻**（總分 50/100、單科最低分）
- [ ] DALF C1 / C2 的**科目結構與時間**
- [ ] TCF 各版本（SO / Canada / ANF / TP）的**必考模組**
- [ ] TCF 的**分數級距對照表**（現行為 699 分制）
- [ ] TEF 各版本的**適用機構與科目**
- [ ] 所有考試的**效期**（DELF/DALF 終身、TCF/TEF 兩年）
- [ ] **報名費用**（確認後再補上當年度實際金額）
- [ ] 當地的**考點、考程與報名期間**
- [ ] 成績與證書的**發放時程**
- [ ] 法國國籍申請、Campus France、加拿大／魁北克移民**現行要求的等級**

### 二、CEFR 時數（`index.html`、`exams.html`）
- [ ] A1–C2 的累計學習時數是通用估計值，請依你們實際教學進度校正

### 三、機構資訊（全站頁腳與 `contact.html`）
- [ ] Email（目前是 `bonjour@academie-babel.example.com`，全站搜尋取代）
- [ ] Instagram 帳號連結（目前 `https://instagram.com/academie_babel`）
- [ ] 上課地址、交通方式
- [ ] 線上課使用的平台名稱
- [ ] 營業時間

### 四、課程與師資（`courses.html`、`teachers.html`）
- [ ] 班別、開課日期、週數、**學費**
- [ ] 名額狀態（開放／候補／額滿）
- [ ] 師資姓名、學經歷、**閱卷或監考資格的年份與核發單位**
- [ ] 師資照片（目前是字母佔位），並取得肖像使用同意
- [ ] 學生評價（目前是示範文字），使用前須取得當事人同意

### 五、網域相關
- [ ] `sitemap.xml` 裡的網址
- [ ] `robots.txt` 裡的 Sitemap 網址
- [ ] 每頁 `<meta property="og:url">` 與 `og:image` 的絕對網址

---

## 怎麼改課表

課表在 **`courses.html`**，分成兩個地方，**改的時候兩邊都要改**：

1. `<div class="table-scroll schedule-table">` 內的桌機版表格（週一～週日 × 時段）
2. `<div class="schedule-cards">` 內的手機版卡片（一天一張）

每一堂課是一個 `.slot` 區塊，長這樣：

```html
<span class="slot" data-level="B2" data-mode="onsite">
  <span class="slot-lv">B2 高階班</span>
  <span class="slot-meta"><span class="dot dot-open"></span>19:30–21:30 · Sophie Lambert · 全法語 · 尚餘 2 位</span>
</span>
```

- `data-level`：`A1` / `A2` / `B1` / `B2` / `C1`，**篩選按鈕靠這個運作**
- `data-mode`：`onsite`（實體）或 `online`（線上）
- 名額色點：`dot-open`（綠，開放）／`dot-wait`（黃，候補）／`dot-full`（紅，額滿）

課程方案卡在同一頁的 `.course-card`，同樣需要 `data-level` 與 `data-mode`。
每張卡片有 `id`，測驗結果頁會直接 anchor 過去，**請勿隨意更名**：

| id | 對應測驗判定等級 |
| --- | --- |
| `class-a1` | A1 |
| `class-a2` | A2 |
| `class-b1` | B1 |
| `class-b2` | B2 |
| `class-c1` | B2+ / C1 以上 |
| `class-private` | 一對一（結果頁固定連過去） |

如果要改這個對應關係，改 `js/quiz.js` 最上方的 `COURSE` 與 `COURSE_NAME`。

---

## 怎麼新增或修改測驗題目

題庫全部在 **`js/quiz-data.js`**，一題一個物件：

```js
{ "id": "B1-11", "level": "B1", "skill": "grammaire", "type": "single",
  "question": "…", "options": ["…","…","…","…"],
  "k": "RcK3YmJs", "explanation": "繁體中文解析" }
```

- `id`：格式 `<等級>-<兩位數>`，**不可重複**
- `skill`：`grammaire` / `vocabulaire` / `comprehension` / `ecoute`
- `type`：`single` / `cloze` / `listening`
- `options`：固定四個
- `audio`：只有 `listening` 題需要，例如 `"assets/audio/b1-02.mp3"`
- `k`：**編碼後的正解**，不是明文

### 取得 `k` 的值

1. 用瀏覽器打開 `quiz.html`
2. 開啟開發者工具的 Console
3. 輸入 `BABEL_QUIZ.encodeAnswer(正解索引, '題目id')`
   例如正解是第三個選項（索引從 0 算，所以是 2）、題號 `B1-11`：
   `BABEL_QUIZ.encodeAnswer(2, 'B1-11')`
4. 把回傳的字串貼進 `k`

> **關於編碼的誠實說明**：`k` 只是把正解索引加上由 id 算出的偏移量再做 base64。
> 任何人打開 devtools 花三分鐘都能還原。這只是提高隨手偷看的門檻，**不是安全機制**。
> 真的要防作弊，計分必須放在後端。

### 讓新題目真的出現在測驗裡

出題順序寫死在 `quiz-data.js` 底部的 `STAGES` 陣列，只有列在裡面的 id 會被抽到：

```js
{ key: 'B1', label: 'B1 階段', ids: ['B1-01', …, 'B1-10'] }
```

所以新增題目後，要把 id 加進對應階段的 `ids`（或替換掉現有的某一題）。

**重要**：結果碼裡的逐題對錯是照 `STAGES` 的順序壓成位元的。
一旦改動順序或題數，`decode.html` 解舊結果碼時，題目對應會跑掉
（等級與四技能得分仍然正確）。若要保留歷史，建議改動時同步把舊的 `STAGES` 註解存檔。

### 目前的題庫狀況

- 六個等級各 10 題，共 60 題，全部有繁中解析。
- 實際出題只用到 40 題：`STAGES` 定義的 A1×5＋A2×5、B1×10、B2×10、C1×10。
- 未被 `STAGES` 使用的題目（A1、A2 剩下的各 5 題，以及 C2 全部 10 題）是備用題庫，
  可以隨時換進 `ids` 裡輪替，避免同一批學生記住題目。

### 判定邏輯

- 第一階段 A1–A2 共 10 題定位。
- 每階段答對率 **低於 60%** 就停止，判定為前一層。
- 通過就往上一層，每層最多 10 題，全程最多 40 題。
- 四個階段全部通過 → 判定 `B2+`（顯示為「B2+ / C1 以上，需口試確認」）。
- 門檻與階段設定在 `js/quiz.js` 最上方的 `PASS`、`FALLBACK`。

---

## 聽力音檔

見 `assets/audio/README.txt`。目前需要錄三段：`a1-01.mp3`、`a2-01.mp3`、`b1-01.mp3`。
沒放音檔時測驗仍可正常進行，只是播放器會顯示載入失敗。

**不使用** Web Speech API 合成語音——各裝置的法語語音品質差異太大。

---

## 結果碼

格式：`等級-酬載`，例如 `B1-2643C8ZZ0A3F7C2E1`。
裡面壓了判定等級、四技能得分、逐題對錯，**不含任何個資**。

- 學生端：`quiz.html` 結果頁有「複製結果碼」按鈕
- 你這端：開 `decode.html` 貼上，或用網址 `decode.html?code=B1-xxxx` 直接帶入
- `decode.html` 沒有列在導覽列，且 `robots.txt` 已 Disallow，但它**不是受保護的頁面**，
  只是不容易被找到。不要在上面放任何敏感資訊。

---

## OG image

`assets/og-template.svg` 是可重複使用的版型。要做個別頁面的圖：

1. 複製一份，改 `#og-title` 與 `#og-sub` 的文字
2. 存成 `assets/og-exams.svg` 之類
3. 在該頁的 `<meta property="og:image">` 指過去

注意 Facebook 不吃 SVG 的 OG image。若在意分享預覽，
請用瀏覽器開啟 SVG 後截圖成 1200×630 的 PNG，改指 PNG 檔。

---

## 部署

**GitHub Pages**
1. 把 `site/` 裡的檔案放到 repo 根目錄（或 `docs/`）
2. Settings → Pages → Source 選該分支與資料夾
3. 404 頁面會自動套用根目錄的 `404.html`

**Netlify**
1. 直接把資料夾拖進 Netlify 的 Deploy 區
2. 或連 repo，build command 留空，publish directory 填資料夾路徑
3. `404.html` 會自動成為找不到頁面的回應

沒有任何相依套件需要安裝。唯一的外連是 Google Fonts。
若要完全離線／自架字型，把 `<link href="https://fonts.googleapis.com/...">` 換成
自行下載的 woff2 與 `@font-face`（六個頁面都要改）。

---

## 無障礙與相容性

- 深色模式：`prefers-color-scheme`，金色在深底自動調亮（`styles.css` 的第 2 區塊）
- 動畫：捲動淡入使用 IntersectionObserver，並尊重 `prefers-reduced-motion`
- 鍵盤：所有互動元素可 Tab 到達，focus 樣式為 2px 金色外框
- 斷點：640 / 1024，手機優先

改色票只要動 `styles.css` 最上方 `:root` 與 `@media (prefers-color-scheme: dark)` 兩區。
