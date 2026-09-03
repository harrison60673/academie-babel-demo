/* ACADÉMIE BABEL i18n — zero-dependency, static-site translations. */
(function (global) {
  'use strict';

  var STORAGE_KEY = 'babel-language';
  var DEFAULT_LOCALE = 'zh-Hant';
  var LOCALES = {
    'zh-Hant': { label: '繁體中文', dir: 'ltr' },
    en: { label: 'English', dir: 'ltr' },
    fr: { label: 'Français', dir: 'ltr' },
    'fa-IR': { label: 'فارسی', dir: 'rtl' }
  };

  /* Each entry is: Traditional Chinese source: [English, French, Persian].
     Keeping the Chinese source as the key lets existing HTML stay readable and
     makes new translations easy to add without scattering data-i18n ids. */
  var ENTRIES = {
    '跳到主要內容': ['Skip to main content', 'Aller au contenu principal', 'رفتن به محتوای اصلی'],
    '選單': ['Menu', 'Menu', 'منو'],
    '主要導覽': ['Main navigation', 'Navigation principale', 'پیمایش اصلی'],
    '本頁目錄': ['On this page', 'Sur cette page', 'در این صفحه'],
    '首頁': ['Home', 'Accueil', 'خانه'],
    '法語檢定': ['French exams', 'Certifications de français', 'آزمون‌های زبان فرانسه'],
    '課程與課表': ['Courses & timetable', 'Cours et horaires', 'دوره‌ها و برنامهٔ هفتگی'],
    '師資': ['Teachers', 'Enseignants', 'مدرسان'],
    '聯絡': ['Contact', 'Contact', 'تماس'],
    '免費分級測驗': ['Free placement test', 'Test de niveau gratuit', 'آزمون تعیین سطح رایگان'],
    '網站': ['Website', 'Site', 'وب‌سایت'],
    '法語檢定介紹': ['French exam guide', 'Guide des certifications', 'راهنمای آزمون‌های فرانسه'],
    '上課地點與時間': ['Class locations & hours', 'Lieux et horaires', 'محل و زمان کلاس‌ها'],
    '法語學院 · DELF · DALF · TCF · TEF 檢定準備': ['French institute · DELF · DALF · TCF · TEF preparation', 'Institut de français · Préparation DELF · DALF · TCF · TEF', 'آموزشگاه فرانسه · آمادگی DELF · DALF · TCF · TEF'],
    '本站考試資訊僅供參考，正式規定以 France Éducation international 及各主辦單位公告為準。': ['Exam information on this site is for reference. Official rules published by France Éducation international and each organizer take precedence.', 'Les informations de ce site sont indicatives. Seuls les règlements de France Éducation international et des organismes officiels font foi.', 'اطلاعات آزمون در این وب‌سایت صرفاً راهنماست؛ مقررات رسمی France Éducation international و برگزارکنندگان ملاک است.'],
    '語言': ['Language', 'Langue', 'زبان'],
    '。': ['.', '.', '.'],
    '，': [',', ',', '،'],
    'ACADÉMIE BABEL 法語學院｜DELF · DALF · TCF 檢定準備': ['ACADÉMIE BABEL French Institute | DELF · DALF · TCF Preparation', 'ACADÉMIE BABEL | Préparation DELF · DALF · TCF', 'آکادمی بابل | آمادگی DELF · DALF · TCF'],
    '法語檢定完全指南｜DELF · DALF · TCF · TEF — ACADÉMIE BABEL': ['Complete Guide to French Exams | DELF · DALF · TCF · TEF — ACADÉMIE BABEL', 'Guide complet des certifications | DELF · DALF · TCF · TEF — ACADÉMIE BABEL', 'راهنمای کامل آزمون‌های فرانسه | DELF · DALF · TCF · TEF — آکادمی بابل'],
    '課程與每週課表｜等級班 · 考前衝刺 · 一對一 — ACADÉMIE BABEL': ['Courses & Weekly Timetable | Level · Intensive · Private — ACADÉMIE BABEL', 'Cours et emploi du temps | Niveaux · Intensif · Particulier — ACADÉMIE BABEL', 'دوره‌ها و برنامهٔ هفتگی | سطح‌بندی · فشرده · خصوصی — آکادمی بابل'],
    '師資｜母語法語教師團隊 — ACADÉMIE BABEL': ['Teachers | Native French Teaching Team — ACADÉMIE BABEL', 'Enseignants | Équipe francophone native — ACADÉMIE BABEL', 'مدرسان | تیم بومی زبان فرانسه — آکادمی بابل'],
    '聯絡我們｜上課方式與營業時間 — ACADÉMIE BABEL': ['Contact | Class Formats & Opening Hours — ACADÉMIE BABEL', 'Contact | Formats de cours et horaires — ACADÉMIE BABEL', 'تماس | شیوهٔ کلاس و ساعات کاری — آکادمی بابل'],
    '免費法語分級測驗｜自適應 CEFR 程度檢測 — ACADÉMIE BABEL': ['Free French Placement Test | Adaptive CEFR Assessment — ACADÉMIE BABEL', 'Test de niveau gratuit | Évaluation CECR adaptative — ACADÉMIE BABEL', 'آزمون رایگان تعیین سطح فرانسه | ارزیابی تطبیقی CEFR — آکادمی بابل'],
    '結果碼解碼（內部用） — ACADÉMIE BABEL': ['Result-code Decoder (Internal) — ACADÉMIE BABEL', 'Décodeur de résultats (interne) — ACADÉMIE BABEL', 'رمزگشای کد نتیجه (داخلی) — آکادمی بابل'],
    '找不到這一頁 — ACADÉMIE BABEL': ['Page Not Found — ACADÉMIE BABEL', 'Page introuvable — ACADÉMIE BABEL', 'صفحه پیدا نشد — آکادمی بابل'],
    'ACADÉMIE BABEL 法語學院：小班、母語師資、應考導向。專攻 DELF、DALF、TCF、TEF 法語檢定，從 A1 到 C2 一層一層帶你往上蓋。': ['ACADÉMIE BABEL offers small-group, native-taught, exam-focused French courses for DELF, DALF, TCF and TEF, from A1 to C2.', 'ACADÉMIE BABEL propose des cours de français en petits groupes avec enseignants natifs, orientés DELF, DALF, TCF et TEF, du A1 au C2.', 'آکادمی بابل دوره‌های کم‌جمعیت و آزمون‌محور با مدرسان بومی برای DELF، DALF، TCF و TEF از A1 تا C2 ارائه می‌دهد.'],
    '這一層塔還沒蓋好。回到首頁，或看看法語檢定介紹與課程。': ['This tower level is not built yet. Return home or explore exams and courses.', 'Cet étage n’est pas encore construit. Retournez à l’accueil ou découvrez les examens et les cours.', 'این طبقهٔ برج هنوز ساخته نشده است. به خانه برگردید یا آزمون‌ها و دوره‌ها را ببینید.'],
    'ACADÉMIE BABEL 法語學院': ['ACADÉMIE BABEL French Institute', 'ACADÉMIE BABEL', 'آکادمی بابل'],
    'DELF · DALF · TCF 檢定準備。小班、母語師資、應考導向。': ['DELF · DALF · TCF preparation in small classes with native teachers.', 'Préparation DELF · DALF · TCF en petits groupes avec enseignants natifs.', 'آمادگی DELF · DALF · TCF در کلاس‌های کم‌جمعیت با مدرسان بومی.'],
    '一座逐層退縮的巴別塔線刻圖：由下而上六層拱廊，對應 A1 至 C2 六個 CEFR 等級，坡道繞塔而上，塔頂尚未砌完，仍架著鷹架。': ['An engraved Tower of Babel with six receding arcaded levels corresponding to CEFR A1–C2, a rising ramp and an unfinished scaffolded summit.', 'Une tour de Babel gravée à six étages d’arcades correspondant aux niveaux CECR A1 à C2, avec rampe ascendante et sommet inachevé.', 'تصویر خطی برج بابل با شش طبقهٔ پلکانی مطابق سطح‌های A1 تا C2، رمپ رو به بالا و قلهٔ ناتمام داربست‌دار.'],

    '語言是一層一層': ['Language is built', 'Une langue se construit', 'زبان ساخته می‌شود'],
    '蓋起來的': ['one level at a time', 'étage par étage', 'طبقه‌به‌طبقه'],
    '巴別塔沒有蓋完，但法語可以。從 A1 的第一塊磚到 C2 的塔頂，我們用小班、母語師資與應考導向的教法，陪你把每一層砌穩。': ['The Tower of Babel was never finished, but your French can be. From the first A1 brick to the C2 summit, our small classes, native-speaking teachers and exam-focused method help you build every level on solid ground.', 'La tour de Babel est restée inachevée, mais votre français peut aller jusqu’au bout. De la première brique A1 au sommet C2, nos petits groupes, nos enseignants natifs et notre méthode orientée examens consolident chaque niveau.', 'برج بابل هرگز کامل نشد، اما زبان فرانسهٔ شما می‌تواند کامل شود. از نخستین آجر A1 تا قلهٔ C2، کلاس‌های کم‌جمعیت، مدرسان بومی و روش آزمون‌محور ما هر سطح را محکم می‌سازند.'],
    '了解考試': ['Explore exams', 'Découvrir les examens', 'آشنایی با آزمون‌ها'],
    '查看課程': ['View courses', 'Voir les cours', 'مشاهدهٔ دوره‌ها'],
    '把游標移到塔的任一層，看看那一層要求什麼。': ['Move over any tower level to see what it requires.', 'Survolez un étage de la tour pour découvrir ses objectifs.', 'روی هر طبقهٔ برج بروید تا هدف‌های آن را ببینید.'],
    'A1 — Découverte 入門': ['A1 — Découverte · Beginner', 'A1 — Découverte', 'A1 — آشنایی · مقدماتی'],
    'Découverte 入門': ['Découverte · Beginner', 'Découverte', 'آشنایی · مقدماتی'],
    'Survie 初階': ['Survie · Elementary', 'Survie', 'بقا · پایه'],
    'Seuil 中階': ['Seuil · Intermediate', 'Seuil', 'آستانه · متوسط'],
    'Avancé 高階': ['Avancé · Advanced', 'Avancé', 'پیشرفته'],
    'Autonome 自主': ['Autonome · Proficient', 'Autonome', 'مستقل · ماهر'],
    'Maîtrise 通曉': ['Maîtrise · Mastery', 'Maîtrise', 'تسلط'],
    '能理解並使用日常生活的基本用語，做簡單的自我介紹與問答。約需 80–100 小時。': ['Understand and use basic everyday expressions, with simple introductions and exchanges. About 80–100 hours.', 'Comprendre et utiliser des expressions quotidiennes, se présenter et échanger simplement. Environ 80 à 100 heures.', 'درک و کاربرد عبارت‌های روزمره و معرفی و گفت‌وگوی ساده؛ حدود ۸۰ تا ۱۰۰ ساعت.'],
    '能處理購物、交通、工作等例行溝通，描述自身背景與周遭環境。約需 180–200 小時。': ['Handle routine shopping, transport and work exchanges and describe your background and surroundings. About 180–200 hours.', 'Gérer les échanges courants, les achats, les transports et le travail, et décrire son parcours. Environ 180 à 200 heures.', 'مدیریت ارتباط روزمره در خرید، حمل‌ونقل و کار و توصیف پیشینه و محیط؛ حدود ۱۸۰ تا ۲۰۰ ساعت.'],
    '能應付旅行大部分情況、表達觀點，並寫出連貫短文。約需 350–400 小時。': ['Handle most travel situations, express opinions and write connected texts. About 350–400 hours.', 'Faire face à la plupart des situations de voyage, exprimer un avis et écrire un texte cohérent. Environ 350 à 400 heures.', 'مدیریت بیشتر موقعیت‌های سفر، بیان نظر و نوشتن متن پیوسته؛ حدود ۳۵۰ تا ۴۰۰ ساعت.'],
    '能理解複雜文本、流暢互動，並就議題清楚論證。約需 550–650 小時。': ['Understand complex texts, interact fluently and argue clearly. About 550–650 hours.', 'Comprendre des textes complexes, interagir avec aisance et argumenter clairement. Environ 550 à 650 heures.', 'درک متن پیچیده، تعامل روان و استدلال روشن؛ حدود ۵۵۰ تا ۶۵۰ ساعت.'],
    '能理解長篇難文、掌握隱含意義，在學術與專業場合自如運用。約需 800–900 小時。': ['Understand long demanding texts and implicit meaning, using French confidently in academic and professional settings. About 800–900 hours.', 'Comprendre des textes longs et exigeants et l’implicite, et utiliser le français avec aisance à l’université et au travail. Environ 800 à 900 heures.', 'درک متن بلند و دشوار و معنای ضمنی و کاربرد روان در محیط دانشگاهی و حرفه‌ای؛ حدود ۸۰۰ تا ۹۰۰ ساعت.'],
    '幾乎能理解一切所讀所聞，表達精確細膩，能區辨細微的語意差別。約需 1000 小時以上。': ['Understand almost everything heard or read and express fine shades of meaning precisely. About 1,000+ hours.', 'Comprendre presque tout ce qui est lu ou entendu et exprimer avec précision les nuances. Environ 1 000 heures ou plus.', 'درک تقریباً همهٔ مطالب شنیداری و خواندنی و بیان دقیق ظرافت‌های معنا؛ بیش از ۱۰۰۰ ساعت.'],
    '等級階梯': ['The level ladder', 'L’échelle des niveaux', 'نردبان سطح‌ها'],
    'CEFR 六個等級對應塔的六層。每一層都有它自己的考試、時數與目標；跳層很少成功，砌穩比較快。': ['The six CEFR levels match the tower’s six floors. Each has its own exams, study time and goals; a solid foundation is faster than skipping floors.', 'Les six niveaux du CECR correspondent aux six étages de la tour. Chacun a ses examens, son volume horaire et ses objectifs : mieux vaut consolider que sauter un niveau.', 'شش سطح CEFR با شش طبقهٔ برج هماهنگ‌اند. هر طبقه آزمون، زمان مطالعه و هدف‌های خود را دارد؛ پایهٔ محکم از جهش میان سطح‌ها سریع‌تر است.'],
    '看完整等級說明': ['See all level descriptions', 'Voir tous les niveaux', 'مشاهدهٔ توضیح همهٔ سطح‌ها'],
    '三件我們不妥協的事': ['Three things we never compromise on', 'Trois principes non négociables', 'سه اصل غیرقابل‌مذاکرهٔ ما'],
    '小班，最多六人': ['Small classes, six students max', 'Petits groupes de six personnes maximum', 'کلاس کم‌جمعیت، حداکثر شش نفر'],
    '母語師資': ['Native-speaking teachers', 'Enseignants natifs', 'مدرسان بومی'],
    '應考導向': ['Exam-focused learning', 'Préparation orientée examens', 'آموزش آزمون‌محور'],
    '四種法語檢定': ['Four French qualifications', 'Quatre certifications de français', 'چهار مدرک زبان فرانسه'],
    '先決定用途，再決定考試': ['Choose your goal before your exam', 'Choisissez d’abord votre objectif, puis l’examen', 'اول هدفتان را انتخاب کنید، بعد آزمون را'],
    '要一張永久文憑，考 DELF': ['For a lifelong diploma, choose DELF', 'Pour un diplôme à vie, choisissez le DELF', 'برای مدرک دائمی، DELF را انتخاب کنید'],
    '要念法國研究所，考 DALF': ['For graduate study in France, choose DALF', 'Pour des études supérieures en France, choisissez le DALF', 'برای تحصیلات تکمیلی در فرانسه، DALF را انتخاب کنید'],
    '要辦留學或國籍手續，考 TCF': ['For study or citizenship procedures, choose TCF', 'Pour les démarches d’études ou de nationalité, choisissez le TCF', 'برای امور تحصیلی یا تابعیت، TCF را انتخاب کنید'],
    '要移民加拿大，考 TEF': ['For Canadian immigration, choose TEF', 'Pour immigrer au Canada, choisissez le TEF', 'برای مهاجرت به کانادا، TEF را انتخاب کنید'],
    '近期開課': ['Upcoming classes', 'Prochaines sessions', 'کلاس‌های پیشِ رو'],
    '看完整課表': ['View the full timetable', 'Voir l’emploi du temps complet', 'مشاهدهٔ برنامهٔ کامل'],
    '學生成果': ['Student outcomes', 'Résultats de nos étudiants', 'نتایج زبان‌آموزان'],
    '他們爬到了哪一層': ['How high they climbed', 'Jusqu’où sont-ils montés ?', 'آن‌ها تا کدام طبقه بالا رفتند؟'],
    '不確定從哪一層開始？': ['Not sure where to begin?', 'Vous ne savez pas par où commencer ?', 'نمی‌دانید از کدام سطح شروع کنید؟'],
    '十五分鐘的免費線上分級測驗，自動判定你的 CEFR 等級，並推薦對應班級。': ['Take our free 15-minute online test to estimate your CEFR level and get a class recommendation.', 'Notre test de niveau en ligne gratuit de 15 minutes estime votre niveau CECR et vous recommande un cours.', 'آزمون آنلاین رایگان ۱۵ دقیقه‌ای ما سطح CEFR شما را برآورد و کلاس مناسب را پیشنهاد می‌کند.'],
    '開始測驗': ['Start the test', 'Commencer le test', 'شروع آزمون'],
    'Instagram 私訊詢問': ['Message us on Instagram', 'Nous écrire sur Instagram', 'پیام در اینستاگرام'],
    '為什麼是我們': ['Why choose us', 'Pourquoi nous choisir', 'چرا ما'],
    '每堂課你一定要開口。人數上限六人，老師記得住每個人的弱點，也點得完每一個人。': ['You will speak in every lesson. With no more than six students, your teacher knows everyone’s weak points and has time to coach each person.', 'Vous parlerez à chaque cours. Avec six personnes maximum, l’enseignant connaît les points faibles de chacun et peut accompagner tout le monde.', 'در هر جلسه صحبت می‌کنید. با حداکثر شش نفر، مدرس نقاط ضعف همه را می‌شناسد و برای هر فرد وقت دارد.'],
    '全體法語母語教師，具 FLE（法語作為外語教學）資格與檢定閱卷／口試經驗。': ['All teachers are native French speakers with FLE qualifications and experience assessing written and oral exams.', 'Tous nos enseignants sont francophones natifs, diplômés en FLE et expérimentés dans l’évaluation des épreuves écrites et orales.', 'همهٔ مدرسان بومی فرانسه، دارای صلاحیت FLE و تجربهٔ ارزیابی آزمون‌های کتبی و شفاهی‌اند.'],
    '四科分開練：聽、讀、寫、說。用真題節奏上課，考前衝刺班全程仿真計時。': ['Train listening, reading, writing and speaking separately, at real-exam pace. Intensive classes use full timed simulations.', 'Travail distinct de l’oral, de l’écrit, de la compréhension et de la production, au rythme de l’examen. Les stages intensifs sont entièrement chronométrés.', 'شنیدار، خواندن، نوشتن و گفتار جداگانه و با ریتم آزمون واقعی تمرین می‌شوند؛ دوره‌های فشرده کاملاً زمان‌دارند.'],
    '文法練到最後都會遇到同一個問題：這句話在什麼場合說。我們把兩個最能代表法國的場景寫進教材，讓語言帶著它的空氣一起進來。': ['Grammar eventually raises the same question: when would someone actually say this? We bring two distinctly French settings into the material so the language arrives with its atmosphere.', 'La grammaire finit toujours par poser la même question : dans quelle situation dit-on cela ? Nous intégrons deux décors emblématiques de la France pour apprendre la langue avec son atmosphère.', 'دستور زبان سرانجام یک پرسش دارد: این جمله کجا گفته می‌شود؟ دو فضای نمادین فرانسه را وارد درس کرده‌ایم تا زبان همراه با حال‌وهوایش آموخته شود.'],
    '巴黎是時尚之都，也因此養出一整套外面學不到的語彙。': ['Paris is a fashion capital, with an entire vocabulary rarely found in textbooks.', 'Paris, capitale de la mode, possède tout un vocabulaire absent des manuels.', 'پاریس پایتخت مد است و واژگانی دارد که کمتر در کتاب‌ها پیدا می‌شود.'],
    '奢侈品產業的商務法語也在其中：訂單、材質、品質描述，這些字在面試與實習裡出現的頻率遠比課本高。': ['The unit also covers business French for luxury goods—orders, materials and quality descriptions—terms far more common in interviews and internships than in textbooks.', 'Le module aborde aussi le français professionnel du luxe : commandes, matières et qualité, un vocabulaire très présent en entretien et en stage.', 'فرانسهٔ تجاری صنعت لوکس—سفارش، مواد و توصیف کیفیت—نیز پوشش داده می‌شود؛ واژگانی مهم در مصاحبه و کارآموزی.'],
    '我們的口說課從 A2 開始就用咖啡館的節奏跑：不糾正每一個字，先讓句子接得起來。到了 B2，同樣的對話會變成有立場的辯論。': ['From A2, speaking classes follow the rhythm of café conversation: first keep sentences flowing instead of correcting every word. By B2, the same exchange becomes a reasoned debate.', 'Dès le A2, l’oral suit le rythme du café : faire circuler les phrases avant de corriger chaque mot. Au B2, le même échange devient un débat argumenté.', 'از A2، کلاس گفتار ریتم گفت‌وگوی کافه‌ای دارد: نخست پیوستگی جمله‌ها، نه اصلاح هر واژه. در B2 همان گفت‌وگو به مناظره‌ای استدلالی تبدیل می‌شود.'],
    '法國人在咖啡館裡練的不是點餐，是': ['In French cafés, people practise more than ordering—they practise', 'Au café, les Français ne s’entraînent pas à commander, mais à', 'در کافه‌های فرانسه مردم فقط سفارش‌دادن تمرین نمی‌کنند؛ بلکه'],
    '高級訂製服': ['Haute couture', 'Haute couture', 'دوخت سفارشی سطح بالا'],
    '露天座與塞納河': ['Terraces and the Seine', 'Terrasses et Seine', 'تراس‌ها و رود سن'],
    '等級': ['Level', 'Niveau', 'سطح'],
    '法文名稱': ['French name', 'Nom français', 'نام فرانسوی'],
    '能做到什麼': ['What you can do', 'Ce que vous savez faire', 'توانایی‌ها'],
    '對應檢定': ['Matching exams', 'Examens correspondants', 'آزمون‌های مرتبط'],
    '累計時數': ['Cumulative hours', 'Heures cumulées', 'ساعت تجمعی'],
    '基本問候、自我介紹、填寫簡單表格': ['Basic greetings, introductions and simple forms', 'Saluer, se présenter et remplir un formulaire simple', 'احوال‌پرسی، معرفی خود و تکمیل فرم ساده'],
    '日常例行溝通、描述環境與過去經驗': ['Routine communication; describe surroundings and past experiences', 'Communiquer au quotidien, décrire son environnement et son passé', 'ارتباط روزمره و توصیف محیط و تجربه‌های گذشته'],
    '旅行應對、表達觀點、寫連貫短文': ['Handle travel, express opinions and write connected texts', 'Voyager, exprimer un avis et rédiger un texte cohérent', 'مدیریت سفر، بیان نظر و نوشتن متن پیوسته'],
    '流暢互動、論證、理解專業領域文章': ['Interact fluently, argue a position and understand specialist texts', 'Interagir avec aisance, argumenter et comprendre des textes spécialisés', 'تعامل روان، استدلال و درک متن‌های تخصصی'],
    '學術與專業場合自如運用': ['Use French confidently in academic and professional settings', 'Utiliser le français avec aisance dans les contextes universitaires et professionnels', 'کاربرد روان فرانسه در محیط دانشگاهی و حرفه‌ای'],
    '近乎母語的精確與細膩': ['Near-native precision and nuance', 'Précision et nuance proches d’un locuteur natif', 'دقت و ظرافت نزدیک به زبان مادری'],
    'CEFR 等級、對應檢定與大致所需累計學習時數': ['CEFR levels, matching exams and estimated cumulative study time', 'Niveaux CECR, examens correspondants et volume horaire cumulé estimé', 'سطح‌های CEFR، آزمون‌های مرتبط و زمان تقریبی مطالعه'],
    '做免費分級測驗': ['Take the free placement test', 'Faire le test gratuit', 'انجام آزمون رایگان'],
    'DELF／DALF 終身有效、分等級報考；TCF／TEF 是分數型測驗、有效期兩年，多用於移民與行政申請。': ['DELF and DALF are lifelong diplomas taken one level at a time. TCF and TEF are score-based tests valid for two years, often used for immigration and administration.', 'Le DELF et le DALF sont des diplômes à vie passés par niveau. Le TCF et le TEF sont des tests à score valables deux ans, souvent destinés aux démarches administratives et migratoires.', 'DELF و DALF مدارک دائمی و سطح‌به‌سطح‌اند؛ TCF و TEF آزمون‌های امتیازی دوساله برای مهاجرت و امور اداری‌اند.'],
    'Diplôme d’études en langue française。法國教育部核發的官方文憑，一次考一個等級，四科各有配分。': ['Diplôme d’études en langue française. An official French Ministry of Education diploma: one level per sitting, with four scored skills.', 'Diplôme d’études en langue française. Diplôme officiel du ministère français : un niveau par session et quatre compétences notées.', 'مدرک رسمی وزارت آموزش فرانسه؛ هر بار یک سطح با چهار مهارت امتیازدار.'],
    'Diplôme approfondi de langue française。DELF 的高階版本，法國大學可據此免語言測驗。': ['Diplôme approfondi de langue française. The advanced diploma, often accepted by French universities in place of a language test.', 'Diplôme approfondi de langue française. Le diplôme avancé, souvent accepté par les universités françaises comme dispense de test.', 'مدرک پیشرفتهٔ فرانسه که بسیاری از دانشگاه‌های فرانسه آن را جایگزین آزمون زبان می‌پذیرند.'],
    'Test de connaissance du français。分數型測驗，依用途分 TCF SO、TCF Canada、TCF ANF 等版本。': ['Test de connaissance du français. A score-based test with versions including TCF SO, Canada and ANF.', 'Test de connaissance du français. Test à score décliné notamment en TCF SO, Canada et ANF.', 'آزمون امتیازی با نسخه‌های TCF SO، کانادا و ANF.'],
    'Test d’évaluation de français。巴黎工商會主辦，加拿大移民與魁北克申請常用。': ['Test d’évaluation de français. Run by the Paris Chamber of Commerce and widely used for Canadian and Quebec immigration.', 'Test d’évaluation de français. Organisé par la CCI de Paris et très utilisé pour l’immigration au Canada et au Québec.', 'آزمون اتاق بازرگانی پاریس که برای مهاجرت کانادا و کبک رایج است.'],
    '下一梯次': ['Next sessions', 'Prochaines sessions', 'دوره‌های بعدی'],
    "Diplôme d'études en langue française。法國教育部核發的官方文憑，一次考一個等級，四科各有配分。": ['Diplôme d’études en langue française. An official French Ministry of Education diploma: one level per sitting, with four scored skills.', 'Diplôme d’études en langue française. Diplôme officiel du ministère français : un niveau par session et quatre compétences notées.', 'مدرک رسمی وزارت آموزش فرانسه؛ هر بار یک سطح با چهار مهارت امتیازدار.'],
    "Test d'évaluation de français。巴黎工商會主辦，加拿大移民與魁北克申請常用。": ['Test d’évaluation de français. Run by the Paris Chamber of Commerce and widely used for Canadian and Quebec immigration.', 'Test d’évaluation de français. Organisé par la CCI de Paris et très utilisé pour l’immigration au Canada et au Québec.', 'آزمون اتاق بازرگانی پاریس که برای مهاجرت کانادا و کبک رایج است.'],
    'DELF B2 考前衝刺': ['DELF B2 exam intensive', 'Stage intensif DELF B2', 'دورهٔ فشردهٔ DELF B2'],
    '「從 A2 到 B2 花了十四個月。最有用的是每堂課最後二十分鐘的口試模擬，考場上幾乎沒有陌生感。」': ['“It took me fourteen months to go from A2 to B2. The final twenty-minute speaking mock in every class made the real exam feel familiar.”', '« Il m’a fallu quatorze mois pour passer du A2 au B2. Les vingt dernières minutes de simulation orale à chaque cours ont rendu l’examen très familier. »', '«چهارده ماه طول کشید از A2 به B2 برسم. شبیه‌سازی ۲۰ دقیقه‌ای گفتار در پایان هر جلسه باعث شد آزمون واقعی آشنا باشد.»'],
    '「TCF Canada 需要 NCLC 7，老師直接按分數區間幫我排練習順序，第一次就過了。」': ['“I needed NCLC 7 for TCF Canada. My teacher organized practice by score band, and I passed on my first attempt.”', '« Il me fallait le NCLC 7 au TCF Canada. Le professeur a organisé les exercices par tranche de score et j’ai réussi du premier coup. »', '«برای TCF Canada به NCLC 7 نیاز داشتم. مدرس تمرین‌ها را بر اساس بازهٔ امتیاز چید و بار اول قبول شدم.»'],
    '「衝刺班的作文批改很兇，但那正是我需要的。DALF C1 生產寫作拿到 21／25。」': ['“The intensive writing feedback was demanding, which was exactly what I needed. I scored 21/25 in DALF C1 writing.”', '« Les corrections du stage étaient exigeantes, exactement ce qu’il me fallait. J’ai obtenu 21/25 à l’écrit du DALF C1. »', '«بازخورد نوشتاری دورهٔ فشرده سخت‌گیرانه بود و دقیقاً همان چیزی بود که لازم داشتم؛ در نوشتار DALF C1 نمرهٔ ۲۱ از ۲۵ گرفتم.»'],

    '我該考哪一個？': ['Which exam should I take?', 'Quel examen choisir ?', 'کدام آزمون را انتخاب کنم؟'],
    '四種法語檢定，四種用途。先看下面這張比較表決定方向，再往下讀各考試的科目與配分。': ['Four French exams for four different goals. Start with the comparison table, then explore each exam’s sections and scoring.', 'Quatre examens pour quatre objectifs. Commencez par le tableau comparatif, puis découvrez les épreuves et la notation de chacun.', 'چهار آزمون برای چهار هدف متفاوت. ابتدا جدول مقایسه را ببینید، سپس بخش‌ها و شیوهٔ امتیازدهی هر آزمون را بررسی کنید.'],
    '比較表': ['Comparison', 'Comparatif', 'مقایسه'],
    'CEFR 等級表': ['CEFR levels', 'Niveaux du CECR', 'سطح‌های CEFR'],
    '準備建議': ['Preparation tips', 'Conseils de préparation', 'نکات آمادگی'],
    '常見問題': ['Frequently asked questions', 'Questions fréquentes', 'پرسش‌های متداول'],
    '四種檢定一次看懂': ['Four exams at a glance', 'Les quatre examens en un coup d’œil', 'چهار آزمون در یک نگاه'],
    '資料為通用整理，實際規定以主辦單位公告為準。': ['This is a general overview; always check the organizer’s current rules.', 'Vue d’ensemble : vérifiez toujours le règlement en vigueur auprès de l’organisme.', 'این یک مرور کلی است؛ همیشه مقررات جاری برگزارکننده را بررسی کنید.'],
    '項目': ['Item', 'Critère', 'مورد'],
    '主辦單位': ['Organizer', 'Organisme', 'برگزارکننده'],
    '性質': ['Type', 'Nature', 'نوع'],
    '對應等級': ['Levels', 'Niveaux', 'سطح‌ها'],
    '效期': ['Validity', 'Validité', 'اعتبار'],
    '考試形式': ['Format', 'Format', 'ساختار آزمون'],
    '常見用途': ['Common uses', 'Usages courants', 'کاربردهای رایج'],
    '大致費用': ['Approximate fee', 'Tarif indicatif', 'هزینهٔ تقریبی'],
    '文憑 Diplôme，分等級報考': ['Diploma; register for one level', 'Diplôme ; inscription par niveau', 'مدرک؛ ثبت‌نام برای یک سطح'],
    '測驗 Test，一次測出等級': ['Test; one sitting determines your level', 'Test ; une session détermine votre niveau', 'آزمون؛ یک‌باره سطح شما را تعیین می‌کند'],
    '終身有效': ['Valid for life', 'Valable à vie', 'اعتبار مادام‌العمر'],
    '兩年': ['Two years', 'Deux ans', 'دو سال'],
    '科目': ['Sections', 'Épreuves', 'بخش‌ها'],
    '配分': ['Scoring', 'Notation', 'امتیازدهی'],
    '及格門檻': ['Passing score', 'Seuil de réussite', 'حد نصاب قبولی'],
    '適合誰': ['Who is it for?', 'Pour qui ?', 'مناسب چه کسی است؟'],
    '怎麼準備比較不浪費時間': ['How to prepare efficiently', 'Comment se préparer efficacement', 'چگونه مؤثر آماده شویم'],
    '先搞清楚你要考哪一個': ['First, identify the right exam', 'D’abord, identifiez le bon examen', 'ابتدا آزمون درست را مشخص کنید'],
    '提前六到九個月開始': ['Start six to nine months ahead', 'Commencez six à neuf mois à l’avance', 'شش تا نه ماه زودتر شروع کنید'],
    '四科分開練': ['Train each skill separately', 'Travaillez chaque compétence séparément', 'هر مهارت را جداگانه تمرین کنید'],
    '口說要練，不能只讀': ['Speaking must be practised, not just studied', 'L’oral se pratique, il ne suffit pas de lire', 'گفتار باید تمرین شود؛ خواندن کافی نیست'],
    '寫作要有人批改': ['Get feedback on your writing', 'Faites corriger vos écrits', 'برای نوشته‌ها بازخورد بگیرید'],
    '考前兩週做完整模擬': ['Take full mock exams in the final two weeks', 'Faites des examens blancs complets les deux dernières semaines', 'در دو هفتهٔ آخر آزمون کامل آزمایشی بدهید'],
    'DELF 和 TCF 我可以都考嗎？': ['Can I take both DELF and TCF?', 'Puis-je passer le DELF et le TCF ?', 'می‌توانم هم DELF و هم TCF بدهم؟'],
    'DELF 沒過，成績可以保留嗎？': ['If I fail DELF, can I keep individual scores?', 'En cas d’échec au DELF, puis-je conserver mes notes ?', 'اگر DELF را قبول نشوم، امتیاز بخش‌ها حفظ می‌شود؟'],
    '可以跳級直接考 B2 嗎？': ['Can I skip levels and take B2 directly?', 'Puis-je passer directement le B2 ?', 'می‌توانم مستقیماً در B2 شرکت کنم؟'],
    '幾歲可以考？有沒有兒童版？': ['Is there an age limit or a version for children?', 'Y a-t-il un âge minimum ou une version pour enfants ?', 'محدودیت سنی یا نسخهٔ کودکان وجود دارد؟'],
    '台灣在哪裡考？一年幾次？': ['Where and how often are exams held in Taiwan?', 'Où et combien de fois par an passer l’examen à Taïwan ?', 'آزمون‌ها در تایوان کجا و چند بار در سال برگزار می‌شوند؟'],
    '成績多久出來？': ['How long do results take?', 'Quand reçoit-on les résultats ?', 'نتایج چه زمانی اعلام می‌شود؟'],
    'Diplôme d’études en langue française 法語學習文憑': ['Diplôme d’études en langue française', 'Diplôme d’études en langue française', 'دیپلم مطالعات زبان فرانسه'],
    "Diplôme d'études en langue française 法語學習文憑": ['Diplôme d’études en langue française', 'Diplôme d’études en langue française', 'دیپلم مطالعات زبان فرانسه'],
    'Diplôme approfondi de langue française 法語深入文憑': ['Diplôme approfondi de langue française', 'Diplôme approfondi de langue française', 'دیپلم پیشرفتهٔ زبان فرانسه'],
    'Test de connaissance du français 法語知識測驗': ['Test de connaissance du français', 'Test de connaissance du français', 'آزمون دانش زبان فرانسه'],
    'Test d’évaluation de français 法語評量測驗': ['Test d’évaluation de français', 'Test d’évaluation de français', 'آزمون ارزیابی زبان فرانسه'],
    "Test d'évaluation de français 法語評量測驗": ['Test d’évaluation de français', 'Test d’évaluation de français', 'آزمون ارزیابی زبان فرانسه'],
    'TCF 常見版本與用途': ['Common TCF versions and uses', 'Versions et usages courants du TCF', 'نسخه‌ها و کاربردهای رایج TCF'],
    'TEF 常見版本': ['Common TEF versions', 'Versions courantes du TEF', 'نسخه‌های رایج TEF'],
    'DALF 科目結構（通用整理）': ['DALF exam structure (overview)', 'Structure du DALF (vue d’ensemble)', 'ساختار آزمون DALF (مرور کلی)'],
    '各等級考試時間與配分（通用整理）': ['Exam duration and scoring by level (overview)', 'Durée et notation par niveau (vue d’ensemble)', 'زمان و امتیازدهی هر سطح (مرور کلی)'],
    '能力描述與大約所需累計學習時數（含課堂與自習，個人差異大）': ['Ability descriptions and estimated cumulative study time, including class and self-study; individual results vary.', 'Compétences et volume horaire cumulé estimé, cours et travail personnel compris ; les résultats varient.', 'شرح توانایی و زمان تقریبی تجمعی شامل کلاس و خودآموزی؛ تفاوت فردی زیاد است.'],
    'B2 是分水嶺。多數法國大學部與部分碩士課程接受 DELF B2 作為語言門檻，也是免修語言先修課的常見標準。': ['B2 is a key threshold. Many French undergraduate and some master’s programs accept DELF B2 as their language requirement.', 'Le B2 est un seuil décisif. De nombreuses licences et certains masters français acceptent le DELF B2 comme exigence linguistique.', 'B2 آستانه‌ای مهم است؛ بسیاری دوره‌های کارشناسی و برخی کارشناسی ارشد فرانسه DELF B2 را شرط زبان می‌پذیرند.'],
    '各模組以分數呈現（通常為 699 分制），再對照 CEFR 等級區間。沒有「不及格」，只有落在哪個等級。': ['Each module receives a score, generally out of 699, then maps to a CEFR band. There is no pass/fail—only the level reached.', 'Chaque module reçoit un score, généralement sur 699, puis correspond à un niveau CECR. Il n’y a pas d’échec, seulement un niveau atteint.', 'هر بخش معمولاً از ۶۹۹ امتیاز می‌گیرد و به بازهٔ CEFR تبدیل می‌شود؛ قبولی یا رد وجود ندارد، فقط سطح کسب‌شده.'],
    '想要一張不會過期的能力證明；申請法國中學、語言學校或當地實習；履歷上需要具體語言等級；或單純想給自己一個階段性目標的學習者。': ['Learners who want lifelong proof of ability, are applying to French schools or internships, need a clear résumé level, or want a lasting milestone.', 'Pour ceux qui veulent une preuve à vie, postulent dans une école ou un stage en France, souhaitent préciser leur niveau sur le CV ou fixer un objectif durable.', 'برای کسانی که مدرک دائمی، درخواست مدرسه یا کارآموزی فرانسه، سطح مشخص در رزومه یا هدفی ماندگار می‌خواهند.'],
    '申請法國碩博士班、需要以法語撰寫學術文章、在法語環境中從事專業工作，或準備報考法語教學相關資格的人。DALF C1 常可作為法國大學免除語言測驗的依據。': ['For graduate study, academic writing in French, professional work in French or teaching qualifications. DALF C1 often qualifies for university language-test exemption.', 'Pour les études supérieures, l’écriture universitaire, le travail professionnel en français ou les qualifications d’enseignement. Le DALF C1 dispense souvent de test universitaire.', 'برای تحصیلات تکمیلی، نگارش دانشگاهی، کار حرفه‌ای به فرانسه یا صلاحیت تدریس؛ DALF C1 اغلب موجب معافیت آزمون دانشگاهی می‌شود.'],
    '手續有明確時程壓力、需要在短期內取得一份可用的官方成績；或是不確定自己的等級、想一次測出落點的人。缺點是兩年後失效。': ['For time-sensitive procedures requiring an official score quickly, or anyone wanting one test to identify their level. The drawback is two-year validity.', 'Pour une démarche urgente nécessitant rapidement un score officiel, ou pour situer son niveau en une fois. Inconvénient : validité de deux ans.', 'برای امور فوری که سریع به امتیاز رسمی نیاز دارد یا تعیین سطح با یک آزمون؛ عیب آن اعتبار دوساله است.'],
    '目標明確是加拿大或魁北克移民的人。報名前務必先確認你要遞交的機構接受 TEF 還是 TCF，兩者不一定互通。': ['For Canadian or Quebec immigration. Confirm whether your receiving body accepts TEF or TCF before registering; they are not always interchangeable.', 'Pour l’immigration au Canada ou au Québec. Vérifiez avant l’inscription si l’organisme accepte le TEF ou le TCF ; ils ne sont pas toujours interchangeables.', 'برای مهاجرت کانادا یا کبک؛ پیش از ثبت‌نام بررسی کنید نهاد مقصد TEF یا TCF را می‌پذیرد، زیرا همیشه جایگزین هم نیستند.'],
    '法國國籍申請': ['French citizenship application', 'Demande de nationalité française', 'درخواست تابعیت فرانسه'],
    'Campus France 留學申請': ['Campus France study application', 'Candidature Campus France', 'درخواست تحصیل Campus France'],
    '加拿大聯邦移民、魁北克 CSQ 申請': ['Canadian federal immigration and Quebec CSQ', 'Immigration fédérale canadienne et CSQ Québec', 'مهاجرت فدرال کانادا و CSQ کبک'],
    '加拿大聯邦經濟類移民、公民申請': ['Canadian economic immigration and citizenship', 'Immigration économique et citoyenneté canadiennes', 'مهاجرت اقتصادی و تابعیت کانادا'],
    '聽、讀、寫、說四科，紙筆＋面試': ['Listening, reading, writing and speaking; paper test plus interview', 'Compréhension et production écrites et orales ; écrit sur papier et entretien', 'شنیدار، خواندن، نوشتار و گفتار؛ آزمون کاغذی و مصاحبه'],
    '聽、讀、寫、說四科，題型更長更學術': ['All four skills, with longer and more academic tasks', 'Les quatre compétences, avec des tâches plus longues et universitaires', 'چهار مهارت با پرسش‌های طولانی‌تر و دانشگاهی‌تر'],
    '聽力、語言結構、閱讀＋寫作＋口說': ['Listening, language structures and reading, plus writing and speaking', 'Compréhension orale, structures et lecture, plus écrit et oral', 'شنیدار، ساختار زبان و خواندن، به‌علاوه نوشتار و گفتار'],
    '聽力、閱讀、語言結構、寫作、口說': ['Listening, reading, language structures, writing and speaking', 'Compréhension orale, lecture, structures, écrit et oral', 'شنیدار، خواندن، ساختار زبان، نوشتار و گفتار'],
    '聽力與口說': ['Listening and speaking', 'Compréhension et production orales', 'شنیدار و گفتار'],
    '聽說合併（聽錄音後口頭報告與討論）／讀寫合併（讀長文後撰寫指定文體）': ['Combined listening-speaking (presentation and discussion after audio) and reading-writing (write a specified form after a long text)', 'Oral combiné (exposé et discussion après écoute) et écrit combiné (production imposée après un texte long)', 'شنیدار-گفتار ترکیبی و خواندن-نوشتار ترکیبی پس از متن یا فایل بلند'],
    'CEFR 等級說明': ['CEFR level descriptions', 'Description des niveaux CECR', 'توضیح سطح‌های CEFR'],
    '全名': ['Full name', 'Nom complet', 'نام کامل'],
    '一句話總結': ['In one sentence', 'En une phrase', 'در یک جمله'],
    '考幾個科目': ['Number of sections', 'Nombre d’épreuves', 'تعداد بخش‌ها'],
    '計分方式': ['Scoring', 'Notation', 'امتیازدهی'],
    '用途': ['Uses', 'Usages', 'کاربردها'],
    '版本': ['Version', 'Version', 'نسخه'],
    '必考模組': ['Required modules', 'Modules obligatoires', 'بخش‌های اجباری'],
    '大致時間': ['Approximate duration', 'Durée indicative', 'زمان تقریبی'],
    '能力描述': ['Ability description', 'Description des compétences', 'شرح توانایی'],
    '科目結構': ['Exam structure', 'Structure des épreuves', 'ساختار آزمون'],
    '聽力': ['Listening', 'Compréhension orale', 'شنیدار'],
    '閱讀': ['Reading', 'Compréhension écrite', 'خواندن'],
    '寫作': ['Writing', 'Production écrite', 'نوشتار'],
    '口說': ['Speaking', 'Production orale', 'گفتار'],
    'France Éducation international（法國教育部）': ['France Éducation international (French Ministry of Education)', 'France Éducation international (ministère français de l’Éducation)', 'France Éducation international (وزارت آموزش فرانسه)'],
    '巴黎法蘭西島工商會 CCI Paris Île-de-France': ['Paris Île-de-France Chamber of Commerce (CCI)', 'CCI Paris Île-de-France', 'اتاق بازرگانی پاریس ایل-دو-فرانس'],
    '四項全考：聽力、閱讀、寫作、口說': ['All four: listening, reading, writing and speaking', 'Les quatre : compréhension et production, écrites et orales', 'هر چهار مهارت: شنیدار، خواندن، نوشتار و گفتار'],
    '聽力、閱讀、寫作、口說': ['Listening, reading, writing and speaking', 'Compréhension et production, écrites et orales', 'شنیدار، خواندن، نوشتار و گفتار'],
    '三個必考模組，寫作口說可選': ['Three required modules; writing and speaking optional', 'Trois modules obligatoires ; écrit et oral facultatifs', 'سه بخش اجباری؛ نوشتار و گفتار اختیاری'],
    '四科各 25 分，共 100 分': ['25 points per skill, 100 total', '25 points par compétence, 100 au total', '۲۵ امتیاز برای هر مهارت، مجموع ۱۰۰'],
    '兩科各 50 分，共 100 分': ['50 points per section, 100 total', '50 points par épreuve, 100 au total', '۵۰ امتیاز برای هر بخش، مجموع ۱۰۰'],
    '總分 50／100，單科不得低於 5': ['50/100 overall, minimum 5 in each skill', '50/100 au total, minimum 5 par compétence', 'مجموع ۵۰ از ۱۰۰، حداقل ۵ در هر مهارت'],
    '總分 50／100，單科不得低於 10': ['50/100 overall, minimum 10 in each section', '50/100 au total, minimum 10 par épreuve', 'مجموع ۵۰ از ۱۰۰، حداقل ۱۰ در هر بخش'],
    '語言能力證明、法國中學／語言學校、履歷': ['Language certification, French schools and résumés', 'Certification linguistique, établissements français et CV', 'مدرک زبان، مدارس فرانسه و رزومه'],
    '法國大學免語言測驗、學術與專業用途': ['University language-test exemption; academic and professional use', 'Dispense de test universitaire ; usages universitaires et professionnels', 'معافیت آزمون دانشگاهی؛ کاربرد دانشگاهی و حرفه‌ای'],
    '一般用途、學校分班、個人能力盤點': ['General use, school placement and personal assessment', 'Usage général, placement scolaire et bilan personnel', 'کاربرد عمومی، تعیین سطح مدرسه و ارزیابی شخصی'],
    '法國教育部核發的官方語言文憑，一次報考一個等級，通過即終身有效。四科分開計分，題型從 A1 的填表問答一路到 B2 的論說寫作與辯論。': ['An official French Ministry diploma taken one level at a time and valid for life once passed. Four skills are scored separately, from A1 forms and interviews to B2 essays and debate.', 'Diplôme officiel du ministère français, passé niveau par niveau et valable à vie. Les quatre compétences sont notées séparément, du formulaire A1 à l’essai et au débat B2.', 'مدرک رسمی وزارت آموزش فرانسه، سطح‌به‌سطح و پس از قبولی دائمی؛ چهار مهارت جداگانه از فرم A1 تا مقاله و مناظرهٔ B2.'],
    'DELF 的高階延伸，同樣終身有效。C1 開始出現長篇綜合寫作與正式口頭報告，C2 則不再分四科，改為聽說、讀寫兩大合併科目。': ['The advanced continuation of DELF, also valid for life. C1 adds long synthesis writing and formal presentations; C2 combines listening-speaking and reading-writing.', 'Prolongement avancé du DELF, lui aussi valable à vie. Le C1 introduit la synthèse longue et l’exposé formel ; le C2 regroupe oral et écrit en deux épreuves.', 'ادامهٔ پیشرفتهٔ DELF با اعتبار دائمی؛ C1 نگارش تلفیقی و ارائهٔ رسمی دارد و C2 مهارت‌ها را در دو بخش شنیدار-گفتار و خواندن-نوشتار ترکیب می‌کند.'],
    '不分等級報考，一次考完依總分落在 A1 到 C2 的某個區間。必考三個模組（聽力、語言結構、閱讀），寫作與口說依用途加考。因應不同申請目的，有多個版本。': ['One test places you from A1 to C2 by score. Listening, language structures and reading are required; writing and speaking depend on purpose, with several application-specific versions.', 'Un seul test vous situe du A1 au C2. Compréhension orale, structures de la langue et lecture sont obligatoires ; écrit et oral dépendent de l’objectif.', 'یک آزمون شما را بر اساس امتیاز از A1 تا C2 قرار می‌دهد. شنیدار، ساختار زبان و خواندن اجباری و نوشتار و گفتار وابسته به هدف‌اند.'],
    '由巴黎法蘭西島工商會主辦，同樣是分數型測驗。與 TCF 的最大差別在承認機構不同，加拿大移民與魁北克申請多採用 TEF Canada 與 TEF Québec。': ['A score-based test run by the Paris Chamber of Commerce. Recognition differs from TCF; Canadian and Quebec applications commonly use TEF Canada and TEF Québec.', 'Test à score organisé par la CCI de Paris. Il se distingue du TCF par les organismes qui le reconnaissent ; le Canada et le Québec utilisent souvent le TEF Canada et Québec.', 'آزمون امتیازی اتاق بازرگانی پاریس؛ تفاوت اصلی با TCF در نهادهای پذیرنده است و کانادا و کبک معمولاً TEF Canada و Québec را می‌پذیرند.'],
    '先問清楚要遞交的機構接受哪一種、要求幾級、成績效期夠不夠用。考錯考試比考不好更麻煩。': ['Confirm which test the receiving institution accepts, the required level and whether the validity window is long enough. Taking the wrong exam is worse than a low score.', 'Vérifiez l’examen accepté, le niveau exigé et la durée de validité. Passer le mauvais examen est plus problématique qu’un mauvais résultat.', 'ابتدا آزمون مورد پذیرش، سطح لازم و مدت اعتبار را بررسی کنید؛ انتخاب آزمون اشتباه بدتر از امتیاز پایین است.'],
    '歐洲共同語言參考架構把語言能力分成六級。所有法語檢定的成績最終都會對回這六個字母。': ['The CEFR divides language ability into six levels. Every French exam result ultimately maps back to these six labels.', 'Le CECR répartit les compétences en six niveaux. Tous les résultats des examens de français y sont finalement rattachés.', 'CEFR توانایی زبان را به شش سطح تقسیم می‌کند و نتیجهٔ همهٔ آزمون‌های فرانسه به این شش سطح برمی‌گردد.'],
    '從一個等級升到下一個等級，一般需要 150 到 250 小時。考前三個月再開始通常只夠熟悉題型，不夠提升能力。': ['Moving up one level usually takes 150–250 hours. Starting three months before an exam generally teaches the format, not enough new ability.', 'Passer au niveau suivant demande généralement 150 à 250 heures. Trois mois suffisent souvent à connaître le format, pas à élever le niveau.', 'ارتقا به سطح بعد معمولاً ۱۵۰ تا ۲۵۰ ساعت زمان می‌برد؛ سه ماه پیش از آزمون اغلب فقط برای آشنایی با قالب کافی است.'],
    '四科的能力不會一起長。找出最低的那一科，把時間偏過去；及格門檻通常設有單科最低分。': ['Skills do not develop evenly. Find the weakest one and give it more time; many exams impose a minimum score per skill.', 'Les compétences ne progressent pas ensemble. Consacrez plus de temps à la plus faible ; de nombreux examens imposent un minimum par épreuve.', 'مهارت‌ها هم‌زمان رشد نمی‌کنند؛ ضعیف‌ترین را پیدا و زمان بیشتری صرف کنید، زیرا بسیاری آزمون‌ها حداقل امتیاز هر مهارت دارند.'],
    '口說是最容易被拖到最後才練的一科，也是最需要外部回饋的一科。每週至少一次計時模擬。': ['Speaking is most often postponed and most needs outside feedback. Do at least one timed mock every week.', 'L’oral est souvent repoussé alors qu’il exige le plus de retour extérieur. Faites au moins une simulation chronométrée par semaine.', 'گفتار بیشتر به تعویق می‌افتد و بیشترین نیاز را به بازخورد دارد؛ هفته‌ای یک شبیه‌سازی زمان‌دار انجام دهید.'],
    '自己寫十篇不如被改三篇。批改重點在結構與連接詞，不只是文法對錯。': ['Three corrected texts teach more than ten written alone. Feedback should cover structure and connectors, not only grammar.', 'Trois textes corrigés valent mieux que dix écrits seul. La correction porte sur la structure et les connecteurs, pas seulement la grammaire.', 'سه متن اصلاح‌شده بهتر از ده متن بدون بازخورد است؛ اصلاح باید ساختار و پیوندها را هم پوشش دهد.'],
    '按實際順序與時間跑完整份，包括中間的休息。體力與節奏本身就是考點。': ['Run the complete exam in the real order and timing, including breaks. Stamina and pacing are part of the test.', 'Faites l’examen complet dans l’ordre et le temps réels, pauses comprises. Endurance et rythme font partie de l’épreuve.', 'آزمون کامل را با ترتیب، زمان و استراحت واقعی اجرا کنید؛ استقامت و ریتم بخشی از آزمون‌اند.'],
    '可以，而且不少人這麼做：用 TCF 應付有時程壓力的行政手續，同時準備 DELF 拿一張永久文憑。兩者的準備方向重疊度高，主要差別在題型與計分。': ['Yes. Many use TCF for time-sensitive procedures while preparing DELF for a lifelong diploma. Preparation overlaps; format and scoring differ.', 'Oui. Beaucoup utilisent le TCF pour une démarche urgente tout en préparant le DELF, diplôme à vie. La préparation se recoupe ; format et notation diffèrent.', 'بله؛ بسیاری TCF را برای امور فوری و DELF را برای مدرک دائمی می‌گیرند. آمادگی مشابه است اما قالب و امتیازدهی فرق دارد.'],
    'DELF／DALF 是整份通過或不通過，不保留單科成績，下次需重考整個等級。': ['DELF/DALF is passed or failed as a whole. Individual section scores are not retained; the full level must be retaken.', 'Le DELF/DALF se réussit ou s’échoue dans son ensemble. Les notes par épreuve ne sont pas conservées et il faut repasser tout le niveau.', 'DELF/DALF یک‌جا قبول یا رد می‌شود؛ امتیاز بخش‌ها حفظ نمی‌شود و باید کل سطح دوباره داده شود.'],
    '可以，報考不需要出示前一級的證書。但沒有相應能力就報名，通常只是把報名費當成一次昂貴的模擬考。建議先做分級測驗確認落點。': ['Yes; no lower-level certificate is required. Without the ability, however, the fee becomes an expensive mock exam. Take a placement test first.', 'Oui, aucun certificat du niveau précédent n’est requis. Sans le niveau réel, les frais deviennent un examen blanc coûteux. Faites d’abord un test.', 'بله؛ مدرک سطح پایین‌تر لازم نیست. اما بدون توانایی لازم، هزینه فقط یک آزمون آزمایشی گران می‌شود؛ ابتدا تعیین سطح کنید.'],
    'DELF 另有 DELF Prim（兒童）與 DELF Junior／Scolaire（青少年）版本，等級與成人版相同，只是題材貼近該年齡層，證書效力一致。': ['DELF Prim is for children and DELF Junior/Scolaire for teenagers. Levels and certificate validity match the adult version; only topics are age-appropriate.', 'Le DELF Prim s’adresse aux enfants et le Junior/Scolaire aux adolescents. Niveaux et validité sont identiques ; seuls les sujets sont adaptés.', 'DELF Prim برای کودکان و Junior/Scolaire برای نوجوانان است؛ سطح و اعتبار همان نسخهٔ بزرگسالان و فقط موضوع‌ها متناسب سن‌اند.'],
    'DELF／DALF 與 TCF 在台灣由法國在台協會與其指定考點辦理，一年數個梯次，報名期間通常在考前兩到三個月。': ['In Taiwan, DELF/DALF and TCF are administered by the French Office and designated centers several times a year; registration is usually two to three months ahead.', 'À Taïwan, le Bureau français et ses centres organisent plusieurs sessions par an ; l’inscription ouvre généralement deux à trois mois avant.', 'در تایوان این آزمون‌ها چند بار در سال توسط دفتر فرانسه و مراکز تعیین‌شده برگزار می‌شوند و ثبت‌نام معمولاً دو تا سه ماه پیش است.'],
    'TCF 的電腦版成績通常在數個工作天內取得，紙筆版與 DELF／DALF 則需數週；正式證書寄發還要更久，申請文件請預留時間。': ['Computer-based TCF results often take a few working days; paper tests and DELF/DALF take weeks, with certificates longer. Allow enough time for applications.', 'Les résultats du TCF sur ordinateur arrivent souvent en quelques jours ouvrés ; le papier et le DELF/DALF prennent plusieurs semaines, les certificats davantage.', 'نتیجهٔ TCF رایانه‌ای چند روز کاری و آزمون کاغذی و DELF/DALF چند هفته زمان می‌برد؛ برای گواهی رسمی بیشتر زمان در نظر بگیرید.'],
    '理解並使用日常基本用語；能自我介紹、詢問與回答個人資訊。對方說得慢且願意協助時能溝通。': ['Understand basic everyday expressions, introduce yourself and exchange personal information when the other person speaks slowly and helps.', 'Comprendre des expressions quotidiennes, se présenter et échanger des informations si l’interlocuteur parle lentement et aide.', 'درک عبارت‌های روزمره، معرفی خود و تبادل اطلاعات شخصی وقتی طرف مقابل آهسته و همراهانه صحبت کند.'],
    '理解與切身相關的常用句；能在購物、交通、工作等例行情境交換簡單資訊；能描述自己的背景與環境。': ['Understand common phrases, exchange simple information in shopping, transport and work, and describe your background and surroundings.', 'Comprendre des phrases courantes, échanger des informations simples dans les situations quotidiennes et décrire son parcours et son environnement.', 'درک جمله‌های رایج، تبادل اطلاعات ساده در خرید، حمل‌ونقل و کار و توصیف پیشینه و محیط.'],
    '理解工作、學校、休閒中的清楚標準用語；在法語區旅行時能應付大多數狀況；能寫連貫短文、說明計畫與理由。': ['Understand clear standard language at work, school and leisure; handle most travel situations; write connected text and explain plans and reasons.', 'Comprendre une langue standard claire au travail, à l’école et dans les loisirs ; voyager ; écrire un texte cohérent et expliquer projets et raisons.', 'درک زبان معیار روشن در کار، مدرسه و فراغت؛ مدیریت سفر، نوشتن متن پیوسته و توضیح برنامه و دلیل.'],
    '理解具體與抽象主題的複雜文本；能與母語者自然流暢互動而不費力；能就議題寫出清楚詳盡的論述。': ['Understand complex concrete and abstract texts, interact fluently with native speakers and write clear, detailed arguments.', 'Comprendre des textes complexes concrets et abstraits, interagir avec aisance et rédiger une argumentation claire et détaillée.', 'درک متن‌های پیچیدهٔ عینی و انتزاعی، تعامل روان با بومیان و نوشتن استدلال روشن و مفصل.'],
    '理解長篇且要求較高的文本，掌握隱含意義；能流暢自然地表達，於學術與專業場合有效運用語言。': ['Understand long, demanding texts and implicit meaning; express yourself naturally and use French effectively in academic and professional settings.', 'Comprendre des textes longs et exigeants et l’implicite ; s’exprimer naturellement et utiliser efficacement le français dans les contextes universitaires et professionnels.', 'درک متن‌های بلند و دشوار و معنای ضمنی؛ بیان طبیعی و کاربرد مؤثر زبان در محیط دانشگاهی و حرفه‌ای.'],
    '幾乎能毫不費力地理解所讀所聞；能重組資訊並連貫呈現；表達精確，能區辨細微語意差別。': ['Understand almost everything heard or read with ease, synthesize information coherently and express fine shades of meaning precisely.', 'Comprendre presque sans effort tout ce qui est lu ou entendu, synthétiser avec cohérence et exprimer précisément les nuances.', 'درک تقریباً بی‌زحمت هرچه خوانده یا شنیده می‌شود، تلفیق منسجم اطلاعات و بیان دقیق تفاوت‌های ظریف معنا.'],
    '決定好考哪一個了嗎？': ['Chosen your exam?', 'Vous avez choisi votre examen ?', 'آزمونتان را انتخاب کرده‌اید؟'],
    '先做免費分級測驗，我們再依結果建議適合的班別與報考時程。': ['Take the free placement test and we’ll recommend a class and exam timeline based on your result.', 'Passez le test gratuit : nous vous conseillerons un cours et un calendrier d’examen adaptés.', 'آزمون تعیین سطح رایگان را بدهید تا بر اساس نتیجه، کلاس و زمان‌بندی آزمون را پیشنهاد کنیم.'],
    '看課程方案': ['See course options', 'Voir les formules', 'مشاهدهٔ دوره‌ها'],

    '課程與每週課表': ['Courses and weekly timetable', 'Cours et emploi du temps hebdomadaire', 'دوره‌ها و برنامهٔ هفتگی'],
    '等級班、考前衝刺、一對一': ['Level classes, exam prep and private lessons', 'Cours par niveau, préparation intensive et cours particuliers', 'کلاس سطح‌بندی، آمادگی فشرده و خصوصی'],
    '等級班每期 12 至 16 週，最多六人。考前衝刺班依考程開班，一對一時間自訂。所有課程皆有線上與實體選項。': ['Level classes run 12–16 weeks with no more than six students. Exam intensives follow exam dates; private lessons are scheduled to suit you. All courses are available online and in person.', 'Les cours par niveau durent 12 à 16 semaines, avec six personnes maximum. Les stages intensifs suivent le calendrier des examens et les cours particuliers sont flexibles. Tous les cours existent en ligne et en présentiel.', 'کلاس‌های سطح‌بندی ۱۲ تا ۱۶ هفته و حداکثر شش‌نفره‌اند. دوره‌های فشرده بر اساس تقویم آزمون و کلاس‌های خصوصی با زمان دلخواه برگزار می‌شوند؛ همهٔ دوره‌ها آنلاین و حضوری‌اند.'],
    '篩選課程': ['Filter courses', 'Filtrer les cours', 'فیلتر دوره‌ها'],
    '全部': ['All', 'Tous', 'همه'],
    '實體': ['In person', 'Présentiel', 'حضوری'],
    '線上': ['Online', 'En ligne', 'آنلاین'],
    '等級班': ['Level classes', 'Cours par niveau', 'کلاس‌های سطح‌بندی'],
    '衝刺班與一對一': ['Intensives and private lessons', 'Stages intensifs et cours particuliers', 'دوره‌های فشرده و خصوصی'],
    '課程方案': ['Course options', 'Formules de cours', 'گزینه‌های دوره'],
    '一對一客製課': ['Tailored private lessons', 'Cours particuliers sur mesure', 'کلاس خصوصی متناسب'],
    '私訊報名': ['Register by message', 'S’inscrire par message', 'ثبت‌نام با پیام'],
    '加入候補': ['Join the waitlist', 'Rejoindre la liste d’attente', 'پیوستن به فهرست انتظار'],
    '預約下期': ['Reserve the next session', 'Réserver la prochaine session', 'رزرو دورهٔ بعد'],
    '預約訪談': ['Book a consultation', 'Réserver un entretien', 'رزرو جلسهٔ مشاوره'],
    '每週課表': ['Weekly timetable', 'Emploi du temps hebdomadaire', 'برنامهٔ هفتگی'],
    '上午': ['Morning', 'Matin', 'صبح'],
    '下午': ['Afternoon', 'Après-midi', 'بعدازظهر'],
    '晚間': ['Evening', 'Soir', 'عصر'],
    '週一': ['Monday', 'Lundi', 'دوشنبه'],
    '週二': ['Tuesday', 'Mardi', 'سه‌شنبه'],
    '週三': ['Wednesday', 'Mercredi', 'چهارشنبه'],
    '週四': ['Thursday', 'Jeudi', 'پنج‌شنبه'],
    '週五': ['Friday', 'Vendredi', 'جمعه'],
    '週六': ['Saturday', 'Samedi', 'شنبه'],
    '週日': ['Sunday', 'Dimanche', 'یکشنبه'],
    '報名方式': ['How to register', 'Comment s’inscrire', 'روش ثبت‌نام'],
    '直接聯絡': ['Contact us directly', 'Contactez-nous directement', 'مستقیم با ما تماس بگیرید'],
    '目前顯示 {count} 個課程方案': ['Showing {count} course options', '{count} formules affichées', '{count} گزینهٔ دوره نمایش داده می‌شود'],
    '形式': ['Format', 'Format', 'شیوه'],
    '時段': ['Time', 'Horaire', 'زمان'],
    '以下為常態班時段，實際開課依當期梯次調整。上方篩選同時作用於課表。': ['These are regular class times; actual sessions vary by term. The filters above also apply to the timetable.', 'Voici les créneaux habituels ; les sessions réelles varient selon la période. Les filtres ci-dessus s’appliquent aussi au planning.', 'این‌ها زمان‌های معمول کلاس‌اند؛ دوره‌های واقعی ممکن است تغییر کنند. فیلترهای بالا روی برنامه نیز اعمال می‌شوند.'],
    '從發音與 alphabet 開始。學完能自我介紹、點餐、問路、填寫基本表格，對應 DELF A1。': ['Start with pronunciation and the alphabet. Learn to introduce yourself, order, ask directions and complete basic forms for DELF A1.', 'Commencez par la prononciation et l’alphabet. Présentez-vous, commandez, demandez votre chemin et remplissez des formulaires pour le DELF A1.', 'با تلفظ و الفبا شروع کنید؛ معرفی خود، سفارش، آدرس‌پرسیدن و تکمیل فرم برای DELF A1.'],
    '補完過去時態與日常情境語彙，能描述經驗與環境，對應 DELF A2 的四科題型。': ['Complete the past tenses and everyday vocabulary to describe experience and surroundings across all four DELF A2 skills.', 'Consolidez les temps du passé et le vocabulaire quotidien pour décrire expériences et environnement dans les quatre épreuves du DELF A2.', 'زمان‌های گذشته و واژگان روزمره را تکمیل کنید تا تجربه و محیط را در چهار مهارت DELF A2 توصیف کنید.'],
    '從句子走向段落。虛擬式入門、觀點表達與連接詞訓練，對應 DELF B1 的寫作與口說。': ['Move from sentences to paragraphs with an introduction to the subjunctive, opinions and connectors for DELF B1 writing and speaking.', 'Passez de la phrase au paragraphe : subjonctif, expression de l’opinion et connecteurs pour l’écrit et l’oral du DELF B1.', 'از جمله به بند برسید؛ آشنایی با وجه التزامی، بیان نظر و پیوندها برای نوشتار و گفتار DELF B1.'],
    '論證結構、時事閱讀與辯論。留學申請最常需要的一級，寫作每兩週一篇全批改。': ['Argument structure, current-affairs reading and debate. A common study-abroad requirement, with one fully corrected essay every two weeks.', 'Structure de l’argumentation, actualités et débat. Niveau souvent exigé pour les études, avec une rédaction entièrement corrigée toutes les deux semaines.', 'ساختار استدلال، اخبار و مناظره؛ سطح رایج برای تحصیل با یک مقالهٔ کاملاً اصلاح‌شده هر دو هفته.'],
    '學術法語：synthèse 綜合寫作、口頭報告與答辯、長篇聽力筆記，對應 DALF C1。': ['Academic French: synthesis writing, oral presentation and defence, plus note-taking from long audio, aligned with DALF C1.', 'Français universitaire : synthèse, exposé et soutenance, prise de notes sur documents longs, conforme au DALF C1.', 'فرانسهٔ دانشگاهی: نگارش تلفیقی، ارائه و دفاع شفاهی و یادداشت‌برداری شنیداری برای DALF C1.'],
    '全程仿真計時，四科輪練，每週一份完整模擬與逐份講評。建議已有 B1 後段程度再報名。': ['Fully timed practice across all four skills, with one complete mock and individual review each week. Recommended from upper B1.', 'Entraînement intégralement chronométré des quatre compétences, avec un examen blanc et une correction chaque semaine. Niveau B1 avancé recommandé.', 'تمرین کاملاً زمان‌دار چهار مهارت با یک آزمون کامل و بررسی هفتگی؛ سطح B1 بالا توصیه می‌شود.'],
    '針對 TCF SO 與 TCF Canada 的題型與計分方式設計，含電腦作答節奏與時間分配訓練。': ['Designed around TCF SO and TCF Canada formats and scoring, including computer-test pacing and time management.', 'Conçu selon les formats et barèmes du TCF SO et Canada, avec rythme sur ordinateur et gestion du temps.', 'بر اساس قالب و امتیازدهی TCF SO و کانادا، شامل ریتم آزمون رایانه‌ای و مدیریت زمان.'],
    '先做需求訪談與程度診斷，再排課綱。適合有明確時程壓力、或需要單科補強的學員。': ['We begin with a needs interview and level diagnosis, then build the syllabus. Ideal for firm deadlines or one-skill support.', 'Un entretien et un diagnostic précèdent la création du programme. Idéal en cas d’échéance ou de besoin ciblé.', 'ابتدا نیازسنجی و تشخیص سطح، سپس برنامهٔ درسی؛ مناسب مهلت مشخص یا تقویت یک مهارت.'],
    '本站沒有線上報名系統。請用 Instagram 私訊或 Email 告訴我們想上的班別與程度，我們會回覆確認名額與繳費方式。': ['There is no online registration system. Tell us your preferred class and level by Instagram or email; we will confirm availability and payment.', 'Il n’y a pas d’inscription en ligne. Indiquez-nous le cours et le niveau souhaités par Instagram ou e-mail ; nous confirmerons la place et le paiement.', 'ثبت‌نام آنلاین نداریم. کلاس و سطح دلخواه را با اینستاگرام یا ایمیل بگویید تا ظرفیت و پرداخت را تأیید کنیم.'],
    '每週課表：橫向為星期一至星期日，縱向為時段': ['Weekly timetable: Monday–Sunday across, time slots down', 'Emploi du temps : du lundi au dimanche horizontalement, créneaux verticalement', 'برنامهٔ هفتگی: روزها افقی و بازه‌های زمانی عمودی'],
    '課程': ['Course', 'Cours', 'دوره'],
    'A1 入門班': ['A1 Beginner class', 'Cours débutant A1', 'کلاس مقدماتی A1'],
    'A2 初階班': ['A2 Elementary class', 'Cours élémentaire A2', 'کلاس پایه A2'],
    'B1 進階班': ['B1 Intermediate class', 'Cours intermédiaire B1', 'کلاس متوسط B1'],
    'B2 高階班': ['B2 Advanced class', 'Cours avancé B2', 'کلاس پیشرفته B2'],
    'C1 精通班': ['C1 Proficiency class', 'Cours de maîtrise C1', 'کلاس تسلط C1'],
    '一對一': ['Private', 'Cours particulier', 'خصوصی'],
    '中法雙語': ['Chinese–French bilingual', 'Bilingue chinois–français', 'دوزبانهٔ چینی–فرانسه'],
    '全法語': ['French only', 'Tout en français', 'کاملاً به زبان فرانسه'],
    '開放': ['Open', 'Ouvert', 'باز'],
    '候補': ['Waitlist', 'Liste d’attente', 'فهرست انتظار'],
    '額滿': ['Full', 'Complet', 'تکمیل ظرفیت'],
    '常態開放': ['Open year-round', 'Ouvert toute l’année', 'ثبت‌نام همیشگی'],
    '開放報名 · 尚餘 2 位': ['Registration open · 2 places left', 'Inscriptions ouvertes · 2 places', 'ثبت‌نام باز · ۲ جای خالی'],
    '開放報名 · 尚餘 3 位': ['Registration open · 3 places left', 'Inscriptions ouvertes · 3 places', 'ثبت‌نام باز · ۳ جای خالی'],
    '開放報名 · 尚餘 4 位': ['Registration open · 4 places left', 'Inscriptions ouvertes · 4 places', 'ثبت‌نام باز · ۴ جای خالی'],
    '開放報名 · 尚餘 5 位': ['Registration open · 5 places left', 'Inscriptions ouvertes · 5 places', 'ثبت‌نام باز · ۵ جای خالی'],
    '已額滿': ['Full', 'Complet', 'تکمیل ظرفیت'],
    '候補中': ['Waitlist', 'Liste d’attente', 'در فهرست انتظار'],
    '月': ['/', '/', '/'],
    '日開課': [' starts', ' : début', ' شروع'],
    '週': ['weeks', 'semaines', 'هفته'],
    '小時': ['hours', 'heures', 'ساعت'],
    '以上': ['or more', 'ou plus', 'یا بیشتر'],
    '兩年效期': ['valid for two years', 'valable deux ans', 'اعتبار دو سال'],
    '終身有效': ['valid for life', 'valable à vie', 'اعتبار دائمی'],
    '線上或實體': ['online or in person', 'en ligne ou en présentiel', 'آنلاین یا حضوری'],
    '時間自訂': ['flexible time', 'horaire flexible', 'زمان منعطف'],
    '各師資': ['any teacher', 'enseignant au choix', 'مدرس دلخواه'],
    '法語授課': ['taught in French', 'cours en français', 'تدریس به فرانسه'],
    '尚餘 2 位': ['2 places left', '2 places', '۲ جای خالی'],
    '尚餘 3 位': ['3 places left', '3 places', '۳ جای خالی'],

    '母語法語教師團隊': ['Our native French teaching team', 'Notre équipe d’enseignants francophones natifs', 'تیم مدرسان بومی زبان فرانسه'],
    '可授課時段': ['Availability', 'Disponibilités', 'زمان‌های تدریس'],
    '授課語言': ['Teaching language', 'Langue d’enseignement', 'زبان تدریس'],
    '專長考試': ['Exam expertise', 'Examens de spécialité', 'تخصص آزمون'],
    '母語': ['Native language', 'Langue maternelle', 'زبان مادری'],
    '具 DELF／DALF 監考與閱卷資格': ['Qualified DELF/DALF examiner and marker', 'Habilité examinateur-correcteur DELF/DALF', 'دارای صلاحیت ممتحن و ارزیاب DELF/DALF'],
    '法語為主，必要時輔以英文': ['French, with English support when needed', 'Français, avec soutien en anglais si nécessaire', 'فرانسه، با پشتیبانی انگلیسی در صورت نیاز'],
    '中法雙語（初階班會用中文解釋文法）': ['Chinese–French bilingual (grammar explained in Chinese for beginners)', 'Bilingue chinois–français (grammaire expliquée en chinois aux débutants)', 'دوزبانهٔ چینی–فرانسه (توضیح دستور به چینی برای مبتدیان)'],
    '法語（法國 里昂）': ['French (Lyon, France)', 'Français (Lyon, France)', 'فرانسه (لیون، فرانسه)'],
    '法語（法國 波爾多）': ['French (Bordeaux, France)', 'Français (Bordeaux, France)', 'فرانسه (بوردو، فرانسه)'],
    '法語（比利時 列日）': ['French (Liège, Belgium)', 'Français (Liège, Belgique)', 'فرانسه (لیژ، بلژیک)'],
    '看課表': ['View timetable', 'Voir l’emploi du temps', 'مشاهدهٔ برنامه'],
    '學語言，也學它長在什麼地方': ['Learn the language in its cultural context', 'Apprendre la langue, là où elle prend vie', 'زبان را در بستر فرهنگی‌اش بیاموزید'],
    '想知道哪位老師適合你？': ['Wondering which teacher suits you?', 'Quel enseignant vous conviendrait ?', 'کدام مدرس برای شما مناسب‌تر است؟'],
    '做完分級測驗，把結果碼私訊給我們，我們會依你的弱項建議師資與班別。': ['Complete the placement test and send us your result code; we’ll suggest a teacher and class based on your weaker skills.', 'Terminez le test et envoyez-nous votre code : nous vous conseillerons un enseignant et un cours selon vos points à renforcer.', 'آزمون تعیین سطح را کامل و کد نتیجه را برای ما ارسال کنید تا بر اساس نقاط قابل‌تقویت، مدرس و کلاس مناسب پیشنهاد کنیم.'],
    '做分級測驗': ['Take the placement test', 'Faire le test de niveau', 'انجام آزمون تعیین سطح'],

    '聯絡我們': ['Contact us', 'Nous contacter', 'تماس با ما'],
    '課程諮詢、試聽、報名，Instagram 私訊回覆最快。本站沒有後端，所以沒有線上表單，也不會蒐集你的個人資料。': ['For course advice, trial lessons or registration, Instagram is fastest. This static site has no backend or online form and does not collect personal data.', 'Pour un conseil, un cours d’essai ou une inscription, Instagram est le plus rapide. Ce site statique n’a ni serveur ni formulaire et ne collecte aucune donnée personnelle.', 'برای مشاورهٔ دوره، جلسهٔ آزمایشی یا ثبت‌نام، اینستاگرام سریع‌ترین راه است. این وب‌سایت ایستا فرم یا سرور ندارد و اطلاعات شخصی جمع‌آوری نمی‌کند.'],
    'Instagram 私訊': ['Instagram message', 'Message Instagram', 'پیام اینستاگرام'],
    '寄 Email': ['Send an email', 'Envoyer un e-mail', 'ارسال ایمیل'],
    '開啟 Instagram 私訊': ['Open Instagram messages', 'Ouvrir Instagram', 'باز کردن پیام اینستاگرام'],
    '寄 Email 詢問': ['Send an email enquiry', 'Nous écrire par e-mail', 'ارسال پرسش با ایمیل'],
    '營業時間': ['Opening hours', 'Horaires d’ouverture', 'ساعات کاری'],
    '上課方式與地點': ['Class format and location', 'Format et lieu des cours', 'شیوه و محل برگزاری کلاس'],
    '實體課': ['In-person classes', 'Cours en présentiel', 'کلاس حضوری'],
    '線上課': ['Online classes', 'Cours en ligne', 'کلاس آنلاین'],
    '寫信前，先做這件事': ['Before you write, do this first', 'Avant de nous écrire', 'پیش از نوشتن، این کار را انجام دهید'],
    '如果你不確定自己的程度，先花十五分鐘做完免費分級測驗，把結果碼一起附在訊息裡。我們就能直接談班別與時程，省掉來回問答。': ['If you are unsure of your level, take the free 15-minute placement test and include the result code in your message. We can then discuss the right class and timeline straight away.', 'Si vous hésitez sur votre niveau, faites le test gratuit de 15 minutes et joignez le code obtenu à votre message. Nous pourrons vous conseiller directement sur le cours et le calendrier.', 'اگر از سطح خود مطمئن نیستید، آزمون رایگان ۱۵ دقیقه‌ای را انجام دهید و کد نتیجه را همراه پیام بفرستید تا مستقیم دربارهٔ کلاس و زمان‌بندی مناسب صحبت کنیم.'],
    '測一下我在哪一級': ['Check my level', 'Évaluer mon niveau', 'تعیین سطح من'],

    '免費法語分級測驗': ['Free French placement test', 'Test de niveau de français gratuit', 'آزمون رایگان تعیین سطح فرانسه'],
    '你現在在第幾層？': ['Which level are you on?', 'À quel étage êtes-vous ?', 'در کدام سطح هستید؟'],
    '自適應出題：先做十題定位，答得好就往上一層，答不動就停。最多四十題，約十五分鐘。': ['Adaptive testing starts with ten placement questions. Strong performance takes you higher; the test stops when the level becomes too difficult. Up to 40 questions, about 15 minutes.', 'Le test adaptatif commence par dix questions. Si vous réussissez, vous montez ; sinon, le test s’arrête. Jusqu’à 40 questions, environ 15 minutes.', 'آزمون تطبیقی با ده پرسش آغاز می‌شود؛ پاسخ‌های خوب شما را بالاتر می‌برد و وقتی سطح دشوار شود متوقف می‌شود. حداکثر ۴۰ پرسش، حدود ۱۵ دقیقه.'],
    '請先了解：': ['Before you begin:', 'Avant de commencer :', 'پیش از شروع:'],
    '作答期間不顯示對錯，避免用猜的往上推。': ['Answers are not marked until the end, so guessing cannot guide later responses.', 'Les réponses ne sont corrigées qu’à la fin afin d’éviter que le hasard n’influence la suite.', 'درستی پاسخ‌ها تا پایان نمایش داده نمی‌شود تا حدس‌زدن بر ادامهٔ آزمون اثر نگذارد.'],
    '每層最多十題，答對率低於六成就停止，不會讓你硬撐到底。': ['Each level has up to ten questions; the test stops below 60% accuracy.', 'Chaque niveau compte jusqu’à dix questions ; le test s’arrête sous 60 % de réussite.', 'هر سطح حداکثر ده پرسش دارد و با دقت کمتر از ۶۰٪ آزمون متوقف می‌شود.'],
    '聽力題的音檔每題最多播放兩次。': ['Audio for each listening question can be played twice.', 'Chaque enregistrement de compréhension orale peut être écouté deux fois.', 'صدای هر پرسش شنیداری حداکثر دو بار پخش می‌شود.'],
    '所有計分都在你的瀏覽器裡完成，我們沒有後端，也收不到你的答案。': ['All scoring happens in your browser. We have no backend and cannot access your answers.', 'Tout le calcul se fait dans votre navigateur. Nous n’avons aucun serveur et ne recevons pas vos réponses.', 'تمام امتیازدهی در مرورگر شما انجام می‌شود؛ ما سرور نداریم و به پاسخ‌ها دسترسی نداریم.'],
    '最多四十題': ['Up to 40 questions', 'Jusqu’à 40 questions', 'حداکثر ۴۰ پرسش'],
    '四技能分析': ['Four-skill analysis', 'Analyse des quatre compétences', 'تحلیل چهار مهارت'],
    '可以續答': ['Resume anytime', 'Reprise possible', 'امکان ادامه'],
    '進度存在你自己的瀏覽器裡，關掉分頁再回來可以接著做。': ['Progress is stored in your browser, so you can close the tab and return later.', 'Votre progression est enregistrée dans votre navigateur : vous pourrez reprendre plus tard.', 'پیشرفت در مرورگر شما ذخیره می‌شود و می‌توانید بعداً ادامه دهید.'],
    '本測驗為分級參考，不等同 DELF / DALF / TCF 正式成績。正式分班將另安排口試。': ['This placement test is indicative and is not an official DELF, DALF or TCF result. Final placement includes a separate speaking assessment.', 'Ce test est indicatif et ne remplace pas un résultat officiel DELF, DALF ou TCF. Le classement final comprend un entretien oral.', 'این آزمون فقط برای تعیین سطح است و نتیجهٔ رسمی DELF، DALF یا TCF محسوب نمی‌شود. تعیین سطح نهایی شامل ارزیابی گفتاری جداگانه است.'],
    '開始測驗': ['Start test', 'Commencer le test', 'شروع آزمون'],
    '接著上次繼續': ['Continue previous attempt', 'Reprendre le test', 'ادامهٔ آزمون قبلی'],
    '重新開始': ['Start over', 'Recommencer', 'شروع دوباره'],
    '作答': ['Question', 'Question', 'پرسش'],
    '題 · 最多 40 題': ['of up to 40', 'sur 40 au maximum', 'از حداکثر ۴۰'],
    '計時': ['Time', 'Temps', 'زمان'],
    '單題不限時，但全程會顯示總計時。': ['There is no per-question limit; total time remains visible.', 'Aucune limite par question ; le temps total reste affiché.', 'برای هر پرسش محدودیت زمانی نیست؛ زمان کل نمایش داده می‌شود.'],
    '下一題': ['Next question', 'Question suivante', 'پرسش بعدی'],
    '你的判定等級': ['Your estimated level', 'Votre niveau estimé', 'سطح برآوردشدهٔ شما'],
    '這一層塔': ['This tower level', 'Cet étage de la tour', 'این طبقهٔ برج'],
    '共作答': ['Answered', 'Total:', 'در مجموع'],
    '共作答 {count} 題，答對 {correct} 題，用時 {time}。': ['Answered {count} questions, with {correct} correct, in {time}.', '{count} questions traitées, dont {correct} correctes, en {time}.', 'در مجموع به {count} پرسش پاسخ دادید؛ {correct} پاسخ درست در {time}.'],
    '作答 {count} 題，答對 {correct} 題（{rate}%）。': ['Answered {count} questions, with {correct} correct ({rate}%).', '{count} questions traitées, dont {correct} correctes ({rate} %).', 'تعداد پاسخ‌ها: {count}؛ پاسخ‌های درست: {correct} ({rate}٪).'],
    '題，用時': ['questions in', 'questions en', 'پرسش در'],
    '題，答對': ['questions, correct', 'questions, bonnes réponses', 'پرسش، پاسخ درست'],
    '你的弱項': ['Skills to strengthen', 'Points à renforcer', 'مهارت‌های قابل‌تقویت'],
    '建議課程': ['Recommended course', 'Cours recommandé', 'دورهٔ پیشنهادی'],
    '依判定等級，我們建議從下面這個班開始。若你的四技能落差很大，一對一課會更有效率。': ['Based on your estimated level, start with the class below. If your skills vary widely, private lessons may be more efficient.', 'D’après votre niveau estimé, commencez par le cours ci-dessous. Si vos compétences sont très inégales, des cours particuliers seront plus efficaces.', 'بر اساس سطح برآوردشده، از کلاس زیر آغاز کنید. اگر تفاوت مهارت‌ها زیاد است، کلاس خصوصی مؤثرتر خواهد بود.'],
    '看課程': ['View course', 'Voir le cours', 'مشاهدهٔ دوره'],
    '你的結果碼': ['Your result code', 'Votre code de résultat', 'کد نتیجهٔ شما'],
    '這組代碼記錄了你的等級、四技能得分與逐題對錯，不含任何個人資料。': ['This code stores your level, four skill scores and answer results. It contains no personal data.', 'Ce code contient votre niveau, vos quatre scores et le détail des réponses, sans aucune donnée personnelle.', 'این کد سطح، امتیاز چهار مهارت و نتیجهٔ پاسخ‌ها را ذخیره می‌کند و هیچ دادهٔ شخصی ندارد.'],
    '複製結果碼': ['Copy result code', 'Copier le code', 'کپی کد نتیجه'],
    '把結果碼私訊給我們，免費取得學習規劃建議': ['Send us the code for a free study-plan recommendation', 'Envoyez-nous le code pour un conseil gratuit', 'کد را برای دریافت برنامهٔ مطالعاتی رایگان بفرستید'],
    '逐題檢討': ['Answer review', 'Correction détaillée', 'مرور پاسخ‌ها'],
    '下載成績單（列印為 PDF）': ['Download report (print to PDF)', 'Télécharger le bilan (imprimer en PDF)', 'دانلود گزارش (چاپ به PDF)'],
    '重新測一次': ['Take the test again', 'Refaire le test', 'آزمون دوباره'],
    '文法 Grammaire': ['Grammar', 'Grammaire', 'دستور زبان'],
    '字彙 Vocabulaire': ['Vocabulary', 'Vocabulaire', 'واژگان'],
    '閱讀 Compréhension': ['Reading', 'Compréhension écrite', 'درک مطلب'],
    '聽力 Écoute': ['Listening', 'Compréhension orale', 'شنیداری'],
    '定位階段 A1–A2': ['A1–A2 placement stage', 'Étape de positionnement A1–A2', 'مرحلهٔ تعیین سطح A1–A2'],
    '尚未點亮任何一層': ['No levels lit yet', 'Aucun étage éclairé', 'هنوز هیچ سطحی روشن نشده است'],
    '本題音檔最多播放兩次。': ['This audio can be played twice.', 'Cet audio peut être écouté deux fois.', 'این صدا حداکثر دو بار پخش می‌شود.'],
    '剩餘播放次數：{count}': ['Plays remaining: {count}', 'Écoutes restantes : {count}', 'تعداد پخش باقی‌مانده: {count}'],
    '已用完播放次數。': ['No plays remaining.', 'Nombre d’écoutes épuisé.', 'تعداد پخش به پایان رسیده است.'],
    '已點亮 {count} 層：{levels}': ['{count} levels lit: {levels}', '{count} étages éclairés : {levels}', '{count} سطح روشن: {levels}'],
    '題數不足，無法診斷弱項。': ['Not enough answers to identify a weaker skill.', 'Pas assez de réponses pour identifier un point faible.', 'پاسخ کافی برای تشخیص مهارت ضعیف‌تر وجود ندارد.'],
    '四項能力發展相當平均（{low}–{high} 分）。這種情況通常適合直接進入等級班，按進度整體往上推。': ['Your four skills are well balanced ({low}–{high}). A level class should help you progress evenly.', 'Vos quatre compétences sont équilibrées ({low}–{high}). Un cours par niveau vous permettra de progresser de façon homogène.', 'چهار مهارت شما متعادل‌اند ({low} تا {high}). کلاس سطح‌بندی به پیشرفت هماهنگ کمک می‌کند.'],
    '文法是目前最拖後腿的一項。建議先把時態與句型系統化整理一遍，再回頭做題；文法不穩會同時壓低寫作與口說的分數。': ['Grammar is currently holding you back. Review tenses and sentence patterns systematically before returning to exercises; weak grammar also affects writing and speaking.', 'La grammaire vous freine actuellement. Revoyez systématiquement les temps et les structures avant de reprendre les exercices ; elle influence aussi l’écrit et l’oral.', 'دستور زبان اکنون مانع اصلی است. زمان‌ها و ساختار جمله را منظم مرور کنید؛ ضعف دستور بر نوشتار و گفتار نیز اثر می‌گذارد.'],
    '字彙量是主要瓶頸。建議改用主題式擴充（工作、教育、環境、社會），並記搭配詞而不是單字本身。': ['Vocabulary is the main bottleneck. Expand it by topic—work, education, environment and society—and learn collocations, not isolated words.', 'Le vocabulaire est le principal frein. Enrichissez-le par thèmes — travail, éducation, environnement, société — et apprenez les collocations plutôt que des mots isolés.', 'واژگان مانع اصلی است. آن را موضوعی—کار، آموزش، محیط‌زیست و جامعه—گسترش دهید و همایندها را به‌جای واژه‌های جدا یاد بگیرید.'],
    '閱讀理解偏弱。多數失分來自沒抓到連接詞與語氣詞的轉折；建議練習先掃描結構再讀細節。': ['Reading is weaker. Most missed points come from overlooking connectors and shifts in tone; scan the structure before reading the details.', 'La compréhension écrite est plus faible. Repérez d’abord la structure, les connecteurs et les changements de ton avant de lire les détails.', 'درک مطلب ضعیف‌تر است. ابتدا ساختار، پیوندها و تغییر لحن را پیدا کنید و سپس جزئیات را بخوانید.'],
    '聽力明顯落後其他項。建議每天二十分鐘的短新聞聽寫，重點在習慣連音與語速，而不是聽懂每個字。': ['Listening trails the other skills. Try 20 minutes of short-news dictation daily, focusing on connected speech and speed rather than every word.', 'La compréhension orale est en retrait. Faites vingt minutes de dictée d’actualités par jour, en privilégiant les enchaînements et le débit plutôt que chaque mot.', 'شنیدار از مهارت‌های دیگر عقب‌تر است. روزانه ۲۰ دقیقه خبر کوتاه را املا کنید و بر پیوستگی گفتار و سرعت تمرکز کنید، نه تک‌تک واژه‌ها.'],
    '（{weak} {weakScore} 分，最強的是 {strong} {strongScore} 分。）': ['({weak}: {weakScore}; strongest: {strong}, {strongScore}.)', '({weak} : {weakScore} ; point fort : {strong}, {strongScore}.)', '({weak}: {weakScore}؛ قوی‌ترین: {strong}، {strongScore}.)'],
    '你的表現已達 B2 以上。實際落點可能是 C1，需另安排口試才能確認。': ['Your performance is above B2 and may be at C1. A separate speaking assessment is needed to confirm it.', 'Votre performance dépasse le B2 et pourrait correspondre au C1. Un entretien oral est nécessaire pour le confirmer.', 'عملکرد شما بالاتر از B2 و شاید در سطح C1 است؛ برای تأیید به ارزیابی گفتاری جداگانه نیاز است.'],
    '判定等級 {level}（{name}）。': ['Estimated level: {level} ({name}).', 'Niveau estimé : {level} ({name}).', 'سطح برآوردشده: {level} ({name}).'],
    '你爬到了第 {count} 層。': ['You reached level {count}.', 'Vous avez atteint le {count}e étage.', 'شما به طبقهٔ {count} رسیدید.'],
    '看看 {course} →': ['View {course} →', 'Voir {course} →', 'مشاهدهٔ {course} ←'],
    '偵測到上次已完成的測驗結果，可直接查看，或重新開始。': ['A completed result was found. View it or start again.', 'Un résultat terminé a été trouvé. Consultez-le ou recommencez.', 'نتیجهٔ کامل قبلی پیدا شد؛ آن را ببینید یا دوباره شروع کنید.'],
    '查看上次結果': ['View previous result', 'Voir le résultat précédent', 'مشاهدهٔ نتیجهٔ قبلی'],
    '偵測到未完成的作答進度（已答 {count} 題），可以接著做。': ['An unfinished attempt was found ({count} answered). You can continue.', 'Une tentative inachevée a été trouvée ({count} réponses). Vous pouvez reprendre.', 'آزمون ناتمام پیدا شد ({count} پاسخ)؛ می‌توانید ادامه دهید.'],
    '已複製 ✓': ['Copied ✓', 'Copié ✓', 'کپی شد ✓'],
    '答對': ['Correct', 'Correct', 'درست'],
    '答錯': ['Incorrect', 'Incorrect', 'نادرست'],
    '你的答案：': ['Your answer:', 'Votre réponse :', 'پاسخ شما:'],
    '正解：': ['Correct answer:', 'Bonne réponse :', 'پاسخ درست:'],
    '未測': ['Not tested', 'Non évalué', 'ارزیابی نشده'],
    '（未作答）': ['(No answer)', '(Sans réponse)', '(بدون پاسخ)'],
    '確定要清除目前的作答紀錄，重新開始嗎？': ['Clear your current answers and start again?', 'Effacer vos réponses et recommencer ?', 'پاسخ‌های فعلی پاک و آزمون از نو شروع شود؟'],

    '結果碼解碼': ['Result-code decoder', 'Décodeur de résultats', 'رمزگشای کد نتیجه'],
    '內部工具 · 未列於導覽': ['Internal tool · Not listed in navigation', 'Outil interne · Hors navigation', 'ابزار داخلی · خارج از منو'],
    '貼入學生給的結果碼，還原判定等級、四技能得分與逐題對錯。': ['Paste a student result code to recover the estimated level, four skill scores and answer results.', 'Collez le code d’un étudiant pour retrouver son niveau, ses quatre scores et le détail des réponses.', 'کد نتیجهٔ زبان‌آموز را وارد کنید تا سطح، امتیاز چهار مهارت و نتیجهٔ پاسخ‌ها بازیابی شود.'],
    '這只是編碼，不是加密。': ['This is encoding, not encryption.', 'Il s’agit d’un encodage, pas d’un chiffrement.', 'این فقط کدگذاری است، نه رمزنگاری.'],
    '結果碼': ['Result code', 'Code de résultat', 'کد نتیجه'],
    '解碼': ['Decode', 'Décoder', 'رمزگشایی'],
    '清除': ['Clear', 'Effacer', 'پاک کردن'],
    '判定等級': ['Estimated level', 'Niveau estimé', 'سطح برآوردشده'],
    '四技能得分': ['Four skill scores', 'Scores par compétence', 'امتیاز چهار مهارت'],
    '逐題對錯': ['Answers by question', 'Résultats par question', 'نتیجهٔ هر پرسش'],
    '題號': ['Question ID', 'Nº de question', 'شناسهٔ پرسش'],
    '技能': ['Skill', 'Compétence', 'مهارت'],
    '題目': ['Question', 'Question', 'پرسش'],
    '結果': ['Result', 'Résultat', 'نتیجه'],
    '回首頁': ['Back home', 'Retour à l’accueil', 'بازگشت به خانه'],
    '無法解讀這組結果碼。請確認有沒有漏字或多空格（格式為 等級-代碼）。': ['This result code could not be read. Check for missing characters or spaces (format: level-code).', 'Impossible de lire ce code. Vérifiez les caractères manquants ou les espaces (format : niveau-code).', 'این کد قابل خواندن نیست. نویسه‌های جاافتاده یا فاصله‌ها را بررسی کنید (قالب: سطح-کد).'],

    '這一層塔': ['This tower level', 'Cet étage de la tour', 'این طبقهٔ برج'],
    '還沒蓋好。': ['is not built yet.', 'n’est pas encore construit.', 'هنوز ساخته نشده است.'],
    '你要找的頁面不存在，或是已經搬走了。回到地面，從下面任何一個入口重新開始。': ['The page you are looking for does not exist or has moved. Return to the ground floor and choose a new way in below.', 'La page recherchée n’existe pas ou a été déplacée. Redescendez et choisissez l’une des entrées ci-dessous.', 'صفحه‌ای که می‌خواهید وجود ندارد یا جابه‌جا شده است. به طبقهٔ همکف برگردید و یکی از مسیرهای زیر را انتخاب کنید.'],
    '如果是我們的連結壞了，請告訴我們': ['Tell us if one of our links is broken', 'Signalez-nous tout lien défectueux', 'اگر پیوندی خراب است به ما بگویید'],
    '尚未蓋完的巴別塔，上方三層以虛線表示': ['An unfinished Tower of Babel with its top three floors outlined by dashed lines', 'Une tour de Babel inachevée dont les trois étages supérieurs sont en pointillés', 'برج بابل ناتمام که سه طبقهٔ بالایی آن با خط‌چین نمایش داده شده است']
  };

  /* Translation coverage completed after the full-page and dynamic-content audit. */
  var EXTRA_ENTRIES = {
    'ACADÉMIE BABEL 首頁': ['ACADÉMIE BABEL home', 'Accueil ACADÉMIE BABEL', 'صفحهٔ اصلی آکادمی بابل'],
    '——不趕時間的閒聊、有分寸的異議、恰到好處的抱怨。這正是口說考試最難模仿的部分：語氣。': ['—unhurried small talk, tactful disagreement and complaints expressed with just the right restraint. Tone is the hardest part of an oral exam to imitate.', '—la conversation sans hâte, le désaccord mesuré et la plainte au ton juste. C’est précisément ce qui est le plus difficile à reproduire à l’oral : le ton.', '—گپ‌وگفت بی‌عجله، مخالفت سنجیده و گلایه به‌اندازه؛ همان چیزی که تقلیدش در آزمون شفاهی دشوارتر است: لحن.'],
    '林小姐 · TCF Canada · 魁北克技術移民': ['Ms Lin · TCF Canada · Quebec skilled immigration', 'Mme Lin · TCF Canada · Immigration qualifiée au Québec', 'خانم لین · TCF Canada · مهاجرت نیروی متخصص کبک'],
    '陳同學 · DELF B2 通過 · 里昂二大交換': ['Chen · Passed DELF B2 · Exchange at Lyon 2 University', 'Chen · DELF B2 réussi · Échange à l’Université Lyon 2', 'چن · قبولی DELF B2 · تبادل دانشجویی دانشگاه لیون ۲'],
    '黃先生 · DALF C1 通過': ['Mr Huang · Passed DALF C1', 'M. Huang · DALF C1 réussi', 'آقای هوانگ · قبولی DALF C1'],
    '週二・四 19:30–21:30／12 週／Camille Béranger': ['Tue & Thu 19:30–21:30 / 12 weeks / Camille Béranger', 'Mar. et jeu. 19 h 30–21 h 30 / 12 semaines / Camille Béranger', 'سه‌شنبه و پنج‌شنبه ۱۹:۳۰ تا ۲۱:۳۰ / ۱۲ هفته / Camille Béranger'],
    '（垂墜得好，也可以是「來得正好」）。B1 之後的閱讀課會讀一輪時尚評論，因為那是法文形容詞用得最精準的文體之一。': ['(hangs well, and can also mean “comes at just the right time”). After B1, reading classes include fashion reviews, one of the genres where French adjectives are used most precisely.', '(tombe bien, mais aussi « arrive au bon moment »). Après le B1, les cours de lecture abordent la critique de mode, l’un des genres où les adjectifs français sont employés avec le plus de précision.', 'یعنی «خوب می‌ایستد» و نیز «درست به‌موقع می‌رسد». پس از B1، درک مطلب شامل نقد مد می‌شود؛ سبکی که صفت‌های فرانسوی در آن بسیار دقیق به‌کار می‌روند.'],
    '（時裝秀）、': ['(fashion show), ', '(défilé de mode), ', '(نمایش مد)، '],
    '（無可挑剔的剪裁）、': ['(impeccable cut), ', '(coupe impeccable), ', '(برش بی‌نقص)، '],
    'A1–C2（依總分落點）': ['A1–C2 (based on total score)', 'A1–C2 (selon le score total)', 'A1 تا C2 (بر پایهٔ امتیاز کل)'],
    'Campus France 留學申請、法國國籍、TCF Canada 用於加拿大移民': ['Campus France applications, French citizenship, and TCF Canada for Canadian immigration', 'Candidatures Campus France, nationalité française et TCF Canada pour l’immigration au Canada', 'درخواست Campus France، تابعیت فرانسه و TCF Canada برای مهاجرت کانادا'],
    '依申請類別選考，多為聽說兩項': ['Modules depend on the application, usually listening and speaking', 'Épreuves selon la démarche, le plus souvent compréhension et expression orales', 'بخش‌ها بسته به پرونده؛ معمولاً شنیدار و گفتار'],
    '加拿大聯邦經濟類移民與公民申請（對應 NCLC 級別）': ['Canadian federal economic immigration and citizenship applications (mapped to NCLC levels)', 'Immigration économique fédérale et citoyenneté canadienne (niveaux NCLC)', 'مهاجرت اقتصادی فدرال و تابعیت کانادا (مطابق سطح‌های NCLC)'],
    '四科：': ['Four skills: ', 'Quatre épreuves : ', 'چهار مهارت: '],
    '必考聽讀與語言結構，寫作與口說為選考模組': ['Compulsory listening, reading and language structures; writing and speaking are optional modules', 'Compréhension orale et écrite et structures de la langue obligatoires ; expression écrite et orale en option', 'شنیدار، خواندن و ساختار زبان اجباری؛ نوشتار و گفتار اختیاری'],
    '申請法國國籍時的語言證明': ['Language proof for French citizenship applications', 'Justificatif linguistique pour une demande de nationalité française', 'مدرک زبان برای درخواست تابعیت فرانسه'],
    '筆試約 4 小時，口試約 30 分（準備 60 分）': ['Written exams about 4 hours; oral about 30 min (60 min preparation)', 'Écrits : environ 4 h ; oral : environ 30 min (60 min de préparation)', 'کتبی حدود ۴ ساعت؛ شفاهی حدود ۳۰ دقیقه (۶۰ دقیقه آمادگی)'],
    '約 15 分（含準備 10 分）／25 分': ['About 15 min (including 10 min preparation) / 25 points', 'Environ 15 min (dont 10 min de préparation) / 25 points', 'حدود ۱۵ دقیقه (با ۱۰ دقیقه آمادگی) / ۲۵ امتیاز'],
    '約 20 分（含準備 30 分）／25 分': ['About 20 min (including 30 min preparation) / 25 points', 'Environ 20 min (avec 30 min de préparation) / 25 points', 'حدود ۲۰ دقیقه (با ۳۰ دقیقه آمادگی) / ۲۵ امتیاز'],
    '約 20 分／25 分': ['About 20 min / 25 points', 'Environ 20 min / 25 points', 'حدود ۲۰ دقیقه / ۲۵ امتیاز'],
    '約 25 分／25 分': ['About 25 min / 25 points', 'Environ 25 min / 25 points', 'حدود ۲۵ دقیقه / ۲۵ امتیاز'],
    '約 30 分／25 分': ['About 30 min / 25 points', 'Environ 30 min / 25 points', 'حدود ۳۰ دقیقه / ۲۵ امتیاز'],
    '約 45 分／25 分': ['About 45 min / 25 points', 'Environ 45 min / 25 points', 'حدود ۴۵ دقیقه / ۲۵ امتیاز'],
    '約 5–7 分（含準備 10 分）／25 分': ['About 5–7 min (including 10 min preparation) / 25 points', 'Environ 5 à 7 min (avec 10 min de préparation) / 25 points', 'حدود ۵ تا ۷ دقیقه (با ۱۰ دقیقه آمادگی) / ۲۵ امتیاز'],
    '約 60 分／25 分': ['About 60 min / 25 points', 'Environ 60 min / 25 points', 'حدود ۶۰ دقیقه / ۲۵ امتیاز'],
    '約 6–8 分（含準備 10 分）／25 分': ['About 6–8 min (including 10 min preparation) / 25 points', 'Environ 6 à 8 min (avec 10 min de préparation) / 25 points', 'حدود ۶ تا ۸ دقیقه (با ۱۰ دقیقه آمادگی) / ۲۵ امتیاز'],
    '約 NT$3,000–6,000（依等級遞增）': ['About NT$3,000–6,000 (increases by level)', 'Environ 3 000 à 6 000 NT$ (selon le niveau)', 'حدود ۳٬۰۰۰ تا ۶٬۰۰۰ دلار تایوان (بسته به سطح)'],
    '約 NT$3,500–7,000（依模組組合）': ['About NT$3,500–7,000 (depending on modules)', 'Environ 3 500 à 7 000 NT$ (selon les modules)', 'حدود ۳٬۵۰۰ تا ۷٬۰۰۰ دلار تایوان (بسته به بخش‌ها)'],
    '約 NT$6,000–9,000（依模組組合）': ['About NT$6,000–9,000 (depending on modules)', 'Environ 6 000 à 9 000 NT$ (selon les modules)', 'حدود ۶٬۰۰۰ تا ۹٬۰۰۰ دلار تایوان (بسته به بخش‌ها)'],
    '約 NT$6,500–8,500': ['About NT$6,500–8,500', 'Environ 6 500 à 8 500 NT$', 'حدود ۶٬۵۰۰ تا ۸٬۵۰۰ دلار تایوان'],
    '聽力與口說（依規定要求之等級）': ['Listening and speaking (required level varies)', 'Compréhension et expression orales (niveau requis selon la règle)', 'شنیدار و گفتار (سطح لازم بسته به مقررات)'],
    '聽力／閱讀／綜合寫作（': ['Listening / reading / integrated writing (', 'Compréhension orale / écrite / expression écrite intégrée (', 'شنیدار / خواندن / نوشتار تلفیقی ('],
    '聽說約 30 分（準備 60 分）；讀寫約 3 小時 30 分': ['Listening and speaking about 30 min (60 min preparation); reading and writing about 3 h 30', 'Oral : environ 30 min (60 min de préparation) ; écrit : environ 3 h 30', 'شنیدار و گفتار حدود ۳۰ دقیقه (۶۰ دقیقه آمادگی)؛ خواندن و نوشتن حدود ۳ ساعت و ۳۰ دقیقه'],
    '透過 Campus France 申請法國大學一年級／學位課程': ['First-year or degree applications to French universities through Campus France', 'Candidature en première année ou en cursus diplômant via Campus France', 'درخواست سال اول یا دورهٔ دانشگاهی فرانسه از طریق Campus France'],
    '魁北克 CSQ 與相關省提名申請': ['Quebec CSQ and related provincial nomination applications', 'CSQ du Québec et demandes de désignation provinciale associées', 'درخواست CSQ کبک و برنامه‌های نامزدی استانی مرتبط'],
    '（口說）。每科 25 分，總分 100 分。': ['(speaking). Each skill is worth 25 points, for 100 total.', '(expression orale). Chaque épreuve vaut 25 points, soit 100 au total.', '(گفتار). هر مهارت ۲۵ امتیاز و مجموع ۱۰۰ امتیاز دارد.'],
    '）／口頭報告與答辯': [') / oral presentation and defence', ') / exposé et entretien', ') / ارائه و دفاع شفاهی'],
    'B2 衝刺': ['B2 intensive', 'Stage intensif B2', 'فشردهٔ B2'],
    'TCF 考前衝刺': ['TCF exam intensive', 'Stage intensif TCF', 'فشردهٔ آمادگی TCF'],
    'TCF 衝刺': ['TCF intensive', 'Stage TCF', 'فشردهٔ TCF'],
    '已額滿 · 下期 1 月開課': ['Full · Next session starts in January', 'Complet · Prochaine session en janvier', 'تکمیل ظرفیت · دورهٔ بعد از ژانویه'],
    '每堂 90 分鐘／NT$2,200 起': ['90 minutes per lesson / from NT$2,200', '90 min par cours / à partir de 2 200 NT$', 'هر جلسه ۹۰ دقیقه / از ۲٬۲۰۰ دلار تایوان'],
    '週一・三 20:00–21:30／Julien Marchand／NT$13,800': ['Mon & Wed 20:00–21:30 / Julien Marchand / NT$13,800', 'Lun. et mer. 20 h–21 h 30 / Julien Marchand / 13 800 NT$', 'دوشنبه و چهارشنبه ۲۰:۰۰ تا ۲۱:۳۰ / Julien Marchand / ۱۳٬۸۰۰ دلار تایوان'],
    '週一・四 19:30–21:30／Sophie Lambert／NT$18,500': ['Mon & Thu 19:30–21:30 / Sophie Lambert / NT$18,500', 'Lun. et jeu. 19 h 30–21 h 30 / Sophie Lambert / 18 500 NT$', 'دوشنبه و پنج‌شنبه ۱۹:۳۰ تا ۲۱:۳۰ / Sophie Lambert / ۱۸٬۵۰۰ دلار تایوان'],
    '週二・四 19:30–21:30／Camille Béranger／NT$12,800': ['Tue & Thu 19:30–21:30 / Camille Béranger / NT$12,800', 'Mar. et jeu. 19 h 30–21 h 30 / Camille Béranger / 12 800 NT$', 'سه‌شنبه و پنج‌شنبه ۱۹:۳۰ تا ۲۱:۳۰ / Camille Béranger / ۱۲٬۸۰۰ دلار تایوان'],
    '週三 19:00–21:00／Julien Marchand／NT$16,500': ['Wed 19:00–21:00 / Julien Marchand / NT$16,500', 'Mer. 19 h–21 h / Julien Marchand / 16 500 NT$', 'چهارشنبه ۱۹:۰۰ تا ۲۱:۰۰ / Julien Marchand / ۱۶٬۵۰۰ دلار تایوان'],
    '週六 14:00–17:00／Sophie Lambert／NT$21,000': ['Sat 14:00–17:00 / Sophie Lambert / NT$21,000', 'Sam. 14 h–17 h / Sophie Lambert / 21 000 NT$', 'شنبه ۱۴:۰۰ تا ۱۷:۰۰ / Sophie Lambert / ۲۱٬۰۰۰ دلار تایوان'],
    '週六 10:00–13:00／Sophie Lambert／NT$14,000': ['Sat 10:00–13:00 / Sophie Lambert / NT$14,000', 'Sam. 10 h–13 h / Sophie Lambert / 14 000 NT$', 'شنبه ۱۰:۰۰ تا ۱۳:۰۰ / Sophie Lambert / ۱۴٬۰۰۰ دلار تایوان'],
    '週日 10:00–12:30／Julien Marchand／NT$11,500': ['Sun 10:00–12:30 / Julien Marchand / NT$11,500', 'Dim. 10 h–12 h 30 / Julien Marchand / 11 500 NT$', 'یکشنبه ۱۰:۰۰ تا ۱۲:۳۰ / Julien Marchand / ۱۱٬۵۰۰ دلار تایوان'],
    '週三 19:00–21:00／16 週／Julien Marchand': ['Wed 19:00–21:00 / 16 weeks / Julien Marchand', 'Mer. 19 h–21 h / 16 semaines / Julien Marchand', 'چهارشنبه ۱۹:۰۰ تا ۲۱:۰۰ / ۱۶ هفته / Julien Marchand'],
    '週六 10:00–13:00／8 週／Sophie Lambert': ['Sat 10:00–13:00 / 8 weeks / Sophie Lambert', 'Sam. 10 h–13 h / 8 semaines / Sophie Lambert', 'شنبه ۱۰:۰۰ تا ۱۳:۰۰ / ۸ هفته / Sophie Lambert'],
    'B2 · C1 · 衝刺班': ['B2 · C1 · Intensive courses', 'B2 · C1 · Stages intensifs', 'B2 · C1 · دوره‌های فشرده'],
    'Camille Béranger 照片（尚未提供）': ['Photo of Camille Béranger (not yet provided)', 'Photo de Camille Béranger (non fournie)', 'عکس Camille Béranger (هنوز ارائه نشده)'],
    'Julien Marchand 照片（尚未提供）': ['Photo of Julien Marchand (not yet provided)', 'Photo de Julien Marchand (non fournie)', 'عکس Julien Marchand (هنوز ارائه نشده)'],
    'Sophie Lambert 照片（尚未提供）': ['Photo of Sophie Lambert (not yet provided)', 'Photo de Sophie Lambert (non fournie)', 'عکس Sophie Lambert (هنوز ارائه نشده)'],
    '全體法語母語教師，皆具 FLE（': ['All native French-speaking teachers hold FLE (', 'Tous les enseignants francophones natifs sont diplômés en FLE (', 'همهٔ مدرسان بومی فرانسه دارای مدرک FLE ('],
    '前移民輔導機構語言顧問，熟悉 TCF Canada 與 NCLC 級距的對應關係。上課節奏快，強調在時間壓力下把答案講完整；線上課的教材與錄音在課後開放兩週複習。': ['A former language adviser at an immigration consultancy, familiar with TCF Canada and NCLC equivalencies. Fast-paced lessons focus on completing answers under time pressure; online materials and recordings remain available for two weeks.', 'Ancienne conseillère linguistique en immigration, elle maîtrise les équivalences entre TCF Canada et NCLC. Ses cours rapides apprennent à formuler une réponse complète sous pression ; supports et enregistrements restent disponibles deux semaines.', 'مشاور پیشین زبان در مؤسسهٔ مهاجرت و آشنا با تطبیق TCF Canada و NCLC. کلاس‌ها سریع‌اند و بر پاسخ کامل زیر فشار زمان تأکید دارند؛ منابع و ضبط‌ها دو هفته در دسترس‌اند.'],
    '週一・三晚間、週日上午': ['Mon & Wed evenings; Sun mornings', 'Lun. et mer. soir ; dim. matin', 'عصر دوشنبه و چهارشنبه؛ صبح یکشنبه'],
    '週一・四晚間、週六全日': ['Mon & Thu evenings; all day Sat', 'Lun. et jeu. soir ; sam. toute la journée', 'عصر دوشنبه و پنج‌شنبه؛ تمام روز شنبه'],
    '週二・四晚間、週五全日': ['Tue & Thu evenings; all day Fri', 'Mar. et jeu. soir ; ven. toute la journée', 'عصر سه‌شنبه و پنج‌شنبه؛ تمام روز جمعه'],
    '里昂第二大學 FLE 碩士，來台第六年。專門帶完全沒有基礎的成人班，把發音與 conjugaison 拆成小步驟，讓學生在第一堂課就能開口說完整的句子。相信初學階段最重要的不是正確，而是不怕。': ['With a master’s in FLE from Lyon 2 University and six years in Taiwan, she specializes in adult beginners, breaking pronunciation and conjugation into small steps so students speak complete sentences from lesson one. At the beginner stage, confidence matters more than perfection.', 'Titulaire d’un master FLE de Lyon 2 et installée à Taïwan depuis six ans, elle accompagne les adultes débutants en décomposant prononciation et conjugaison, afin qu’ils produisent des phrases complètes dès le premier cours. Au début, l’essentiel n’est pas la perfection, mais l’absence de peur.', 'دارای کارشناسی ارشد FLE از دانشگاه لیون ۲ و شش سال ساکن تایوان است. متخصص بزرگسالان مبتدی است و تلفظ و صرف را گام‌به‌گام آموزش می‌دهد تا زبان‌آموز از جلسهٔ اول جملهٔ کامل بگوید. در آغاز، نترسیدن مهم‌تر از بی‌نقص بودن است.'],
    '，帶過八屆 B2 衝刺班。作文批改以評分表逐項對照，指出的不只是錯誤，而是這一句在評分表上失分的位置。': [', and has taught eight B2 intensive cohorts. Writing feedback follows the scoring rubric item by item, showing not only the error but exactly where it costs points.', ' et a dirigé huit stages intensifs B2. Ses corrections suivent chaque critère de la grille et montrent non seulement l’erreur, mais aussi où elle fait perdre des points.', ' و هشت دورهٔ فشردهٔ B2 برگزار کرده است. تصحیح نوشتار بندبه‌بند با معیار نمره‌دهی انجام می‌شود و دقیقاً نشان می‌دهد هر جمله کجا امتیاز از دست می‌دهد.'],
    '，法語作為外語教學）資格。以下資料為示範內容。': [', French as a Foreign Language) qualifications. The profiles below are demo content.', ', français langue étrangère). Les informations ci-dessous sont des exemples.', '، آموزش فرانسه به‌عنوان زبان خارجی) هستند. اطلاعات زیر نمایشی است.'],
    '企業班、學校合作、發票與繳費相關': ['Corporate courses, school partnerships, invoices and payment', 'Cours en entreprise, partenariats scolaires, facturation et paiement', 'دوره‌های شرکتی، همکاری مدارس، صورتحساب و پرداخت'],
    '教室最多容納六人，備有白板與音響設備。': ['The classroom seats up to six and has a whiteboard and audio equipment.', 'La salle accueille six personnes maximum et dispose d’un tableau et d’un équipement audio.', 'کلاس حداکثر شش نفر ظرفیت دارد و مجهز به تخته و سیستم صوتی است.'],
    '訊息': ['Message', 'Message', 'پیام'],
    '課程諮詢、試聽預約、分級測驗結果碼諮詢': ['Course enquiries, trial bookings and placement-test result codes', 'Renseignements sur les cours, cours d’essai et codes de résultat du test', 'پرسش دربارهٔ دوره، رزرو جلسهٔ آزمایشی و کد نتیجهٔ تعیین سطح'],
    '送出': ['Send', 'Envoyer', 'ارسال'],
    '錄影開放兩週複習，缺課可補看。': ['Recordings remain available for two weeks, so missed lessons can be watched later.', 'Les enregistrements restent disponibles deux semaines pour rattraper un cours manqué.', 'ضبط کلاس دو هفته برای مرور و جبران غیبت در دسترس است.'],
    '非上課時段的訊息，通常在一個工作天內回覆。': ['Messages outside class hours are usually answered within one business day.', 'Les messages hors cours reçoivent généralement une réponse sous un jour ouvré.', 'پیام‌های خارج از ساعت کلاس معمولاً ظرف یک روز کاری پاسخ داده می‌شوند.'],
    '作答期間不顯示對錯，全部答完才會一次公布。': ['Answers are not marked during the test; all results appear after completion.', 'Les réponses ne sont pas corrigées pendant le test ; tout est révélé à la fin.', 'درستی پاسخ‌ها حین آزمون نشان داده نمی‌شود و نتیجه در پایان یک‌جا نمایش داده می‌شود.'],
    '文法、字彙、閱讀、聽力分開計分，測完直接看出弱在哪裡。': ['Grammar, vocabulary, reading and listening are scored separately so weaknesses are immediately visible.', 'Grammaire, vocabulaire, lecture et écoute sont notés séparément pour repérer immédiatement les points faibles.', 'دستور، واژگان، خواندن و شنیدار جداگانه امتیاز می‌گیرند تا ضعف‌ها فوراً مشخص شوند.'],
    '法語程度測驗': ['French placement test', 'Test de niveau de français', 'آزمون تعیین سطح فرانسه'],
    '第': ['Question ', 'Question ', 'پرسش '],
    'ACADÉMIE BABEL — 內部工具': ['ACADÉMIE BABEL — Internal tool', 'ACADÉMIE BABEL — Outil interne', 'آکادمی بابل — ابزار داخلی'],
    '任何人只要看過': ['Anyone who has seen ', 'Toute personne ayant vu ', 'هر کسی که دیده باشد '],
    '依測驗固定出題順序還原。若日後調整過題庫或出題順序，舊結果碼對應的題目可能不再一致。': ['Reconstructed from the test’s fixed question order. If the question bank or order changes later, old result codes may no longer match the same questions.', 'Reconstitution selon l’ordre fixe du test. Si la banque ou l’ordre change, les anciens codes peuvent ne plus correspondre aux mêmes questions.', 'بر پایهٔ ترتیب ثابت پرسش‌ها بازسازی می‌شود. اگر بانک یا ترتیب پرسش‌ها تغییر کند، کدهای قدیمی شاید دیگر با همان سؤال‌ها منطبق نباشند.'],
    '題（': ['questions (', 'questions (', 'پرسش ('],
    '（題庫已變動，無法對應）': ['(question bank changed; no match)', '(banque modifiée ; correspondance impossible)', '(بانک پرسش تغییر کرده؛ تطبیق ممکن نیست)'],
    '例如 B1-2643C8ZZ0A3F7C2E1': ['e.g. B1-2643C8ZZ0A3F7C2E1', 'ex. B1-2643C8ZZ0A3F7C2E1', 'مثلاً B1-2643C8ZZ0A3F7C2E1'],
    '塞納河與橋拱的細線圖示': ['Fine-line icon of the Seine and bridge arches', 'Icône en trait fin de la Seine et des arches d’un pont', 'نماد خطی رود سن و طاق‌های پل'],
    '時尚人台的細線圖示，形狀呼應巴別塔的梯形分層': ['Fine-line fashion mannequin echoing the Tower of Babel’s tiered trapezoids', 'Mannequin de mode en trait fin rappelant les étages trapézoïdaux de la tour de Babel', 'نماد خطی مانکن مد با فرم طبقه‌های ذوزنقه‌ای برج بابل'],
    '能應付在法語區旅行時的多數狀況，說明觀點與計畫，寫出連貫的短文。約需 350–400 小時。': ['Handle most situations while travelling in a French-speaking region, explain views and plans, and write connected short texts. About 350–400 hours.', 'Faire face à la plupart des situations de voyage en milieu francophone, expliquer ses opinions et projets et écrire de courts textes cohérents. Environ 350 à 400 heures.', 'مدیریت بیشتر موقعیت‌های سفر در مناطق فرانسوی‌زبان، توضیح دیدگاه و برنامه و نوشتن متن کوتاه پیوسته؛ حدود ۳۵۰ تا ۴۰۰ ساعت.'],
    '能與母語者流暢互動、針對議題論證。法國大學入學與多數留學申請的門檻。約需 550–650 小時。': ['Interact fluently with native speakers and argue a position. The threshold for French university admission and many study applications. About 550–650 hours.', 'Interagir avec aisance avec des francophones et argumenter. C’est le seuil d’admission à l’université et de nombreux dossiers d’études. Environ 550 à 650 heures.', 'تعامل روان با بومی‌زبانان و استدلال دربارهٔ موضوعات؛ آستانهٔ پذیرش دانشگاه‌های فرانسه و بسیاری پرونده‌های تحصیلی؛ حدود ۵۵۰ تا ۶۵۰ ساعت.'],
    '能靈活有效地在學術與專業場合使用法語，理解長篇且隱含意義的文本。約需 800–900 小時。': ['Use French flexibly and effectively in academic and professional settings and understand long texts with implicit meaning. About 800–900 hours.', 'Utiliser le français avec souplesse dans les contextes universitaires et professionnels et comprendre des textes longs et implicites. Environ 800 à 900 heures.', 'کاربرد انعطاف‌پذیر فرانسه در محیط دانشگاهی و حرفه‌ای و درک متن‌های بلند با معنای ضمنی؛ حدود ۸۰۰ تا ۹۰۰ ساعت.'],
    'Autonome 精通': ['Autonome · Proficient', 'Autonome', 'مستقل · ماهر'],
    'Seuil 進階門檻': ['Seuil · Advanced threshold', 'Seuil avancé', 'آستانهٔ پیشرفته'],
    'DELF、DALF、TCF、TEF 四種法語檢定的差別：主辦單位、對應等級、效期、考試形式、常見用途與費用比較，以及 CEFR A1–C2 等級說明與準備建議。': ['Compare DELF, DALF, TCF and TEF by organizer, level, validity, format, purpose and cost, with CEFR A1–C2 explanations and preparation advice.', 'Comparez DELF, DALF, TCF et TEF : organisme, niveau, validité, format, usages et tarifs, avec niveaux CECR A1–C2 et conseils de préparation.', 'مقایسهٔ DELF، DALF، TCF و TEF از نظر برگزارکننده، سطح، اعتبار، قالب، کاربرد و هزینه، همراه با توضیح CEFR A1 تا C2 و توصیه‌های آمادگی.'],
    '我該考哪一個？四種法語檢定的完整比較與各科配分說明。': ['Which French exam should you take? A complete comparison of four qualifications and their scoring.', 'Quel examen choisir ? Comparatif complet de quatre certifications et de leur notation.', 'کدام آزمون فرانسه مناسب شماست؟ مقایسهٔ کامل چهار مدرک و امتیازدهی بخش‌ها.'],
    '法語檢定完全指南｜DELF · DALF · TCF · TEF': ['Complete French Exam Guide | DELF · DALF · TCF · TEF', 'Guide complet des certifications | DELF · DALF · TCF · TEF', 'راهنمای کامل آزمون‌های فرانسه | DELF · DALF · TCF · TEF'],
    'ACADÉMIE BABEL 法語課程方案：A1–C1 等級班、DELF／TCF 考前衝刺班、一對一客製課，線上與實體皆有。附每週課表、名額狀態與報名方式。': ['ACADÉMIE BABEL courses include A1–C1 level classes, DELF/TCF intensives and tailored private lessons, online and in person, with timetable, availability and registration details.', 'Cours ACADÉMIE BABEL : niveaux A1–C1, stages DELF/TCF et cours particuliers sur mesure, en ligne ou en présentiel, avec horaires, places et inscription.', 'دوره‌های آکادمی بابل شامل کلاس‌های A1 تا C1، فشردهٔ DELF/TCF و خصوصی سفارشی، آنلاین و حضوری، همراه با برنامه، ظرفیت و ثبت‌نام است.'],
    '等級班、考前衝刺、一對一。線上與實體，每週課表與名額狀態一次看。': ['Level classes, exam intensives and private lessons, online and in person, with weekly timetable and availability.', 'Cours par niveau, stages intensifs et particuliers, en ligne et en présentiel, avec horaires et places.', 'کلاس سطح‌بندی، فشردهٔ آزمون و خصوصی، آنلاین و حضوری، همراه با برنامه و ظرفیت.'],
    'ACADÉMIE BABEL 的法語母語師資：具 FLE 教學資格與 DELF／DALF 考官經驗，專長涵蓋 A1 到 C2 與各類檢定準備。': ['ACADÉMIE BABEL’s native French teachers hold FLE qualifications and DELF/DALF examiner experience, covering A1–C2 and exam preparation.', 'Les enseignants francophones natifs d’ACADÉMIE BABEL sont diplômés en FLE et examinateurs DELF/DALF, du A1 au C2 et en préparation aux examens.', 'مدرسان بومی فرانسهٔ آکادمی بابل دارای مدرک FLE و تجربهٔ ممتحنی DELF/DALF برای A1 تا C2 و آمادگی آزمون‌اند.'],
    '母語法語教師，具 FLE 資格與檢定閱卷經驗。': ['Native French teachers with FLE qualifications and exam-assessment experience.', 'Enseignants francophones natifs, diplômés en FLE et expérimentés dans l’évaluation.', 'مدرسان بومی فرانسه با مدرک FLE و تجربهٔ ارزیابی آزمون.'],
    'ACADÉMIE BABEL 法語學院的聯絡方式：Instagram 私訊、Email、上課地點與線上課程說明、營業時間。': ['Contact ACADÉMIE BABEL by Instagram or email, with class location, online-course details and opening hours.', 'Contactez ACADÉMIE BABEL par Instagram ou e-mail ; lieu des cours, modalités en ligne et horaires.', 'راه‌های تماس با آکادمی بابل از طریق اینستاگرام و ایمیل، همراه با محل کلاس، توضیح آنلاین و ساعات کاری.'],
    'Instagram 私訊或 Email 詢問課程、報名與試聽。': ['Ask about courses, registration and trial lessons by Instagram or email.', 'Renseignez-vous sur les cours, l’inscription et les essais par Instagram ou e-mail.', 'برای دوره، ثبت‌نام و جلسهٔ آزمایشی در اینستاگرام یا ایمیل پیام دهید.'],
    '作答進度': ['Answering progress', 'Progression du test', 'پیشرفت پاسخ‌گویی'],
    '巴別塔，由下而上分為 A1 至 C2 六個 CEFR 等級，每層有拱廊與可攀爬的坡道': ['Tower of Babel divided bottom to top into six CEFR levels from A1 to C2, each with arcades and a climbable ramp', 'Tour de Babel divisée de bas en haut en six niveaux CECR, de A1 à C2, avec arcades et rampe ascendante', 'برج بابل با شش سطح CEFR از A1 تا C2، از پایین به بالا، با طاق‌ها و رمپ صعودی'],
    '選項': ['Options', 'Choix de réponse', 'گزینه‌ها'],
    '免費線上法語分級測驗：自適應出題，最多 40 題，約 15 分鐘。測完給你 CEFR 判定等級、四技能得分、弱項診斷與推薦班級。純前端計分，不蒐集個資。': ['Free adaptive online French placement test: up to 40 questions in about 15 minutes, with CEFR level, four-skill scores, weakness analysis and a recommended class. Scored entirely in your browser; no personal data collected.', 'Test de niveau de français gratuit et adaptatif : jusqu’à 40 questions en 15 minutes, niveau CECR, scores par compétence, diagnostic et cours conseillé. Calcul dans le navigateur, sans collecte de données personnelles.', 'آزمون تطبیقی رایگان فرانسه با حداکثر ۴۰ پرسش در حدود ۱۵ دقیقه؛ سطح CEFR، امتیاز چهار مهارت، تحلیل ضعف و کلاس پیشنهادی. محاسبه فقط در مرورگر و بدون جمع‌آوری اطلاعات شخصی.'],
    '十五分鐘測出你的 CEFR 等級，附四技能分析與課程建議。': ['Find your CEFR level in 15 minutes, with four-skill analysis and course advice.', 'Évaluez votre niveau CECR en 15 minutes avec analyse des compétences et conseil de cours.', 'سطح CEFR خود را در ۱۵ دقیقه با تحلیل چهار مهارت و پیشنهاد دوره بسنجید.'],
    'B1 階段': ['B1 stage', 'Niveau B1', 'مرحلهٔ B1'],
    'B2 階段': ['B2 stage', 'Niveau B2', 'مرحلهٔ B2'],
    'C1 階段': ['C1 stage', 'Niveau C1', 'مرحلهٔ C1'],
    'être 動詞第一人稱單數為 suis。je suis / tu es / il est / ils sont。': ['The first-person singular of être is suis: je suis / tu es / il est / ils sont.', 'La première personne du singulier de être est suis : je suis / tu es / il est / ils sont.', 'صرف اول‌شخص مفرد être برابر suis است: je suis / tu es / il est / ils sont.'],
    '主詞 nous，第一類動詞 parler 變化為 parlons。': ['With nous, the regular -er verb parler becomes parlons.', 'Avec nous, le verbe du premier groupe parler se conjugue parlons.', 'با فاعل nous، فعل باقاعدهٔ parler به صورت parlons صرف می‌شود.'],
    'livre 是子音開頭的陽性單數名詞，用 ce。母音開頭才用 cet（cet ami）。': ['Livre is a masculine singular noun beginning with a consonant, so use ce. Use cet before a vowel, as in cet ami.', 'Livre est masculin singulier et commence par une consonne : on emploie ce. Cet s’emploie devant une voyelle, comme dans cet ami.', 'livre اسم مذکر مفرد با آغاز همخوان است، پس ce می‌گیرد؛ پیش از واکه cet می‌آید، مانند cet ami.'],
    'chien 為陽性單數，不定冠詞用 un。': ['Chien is masculine singular, so its indefinite article is un.', 'Chien est masculin singulier : l’article indéfini est un.', 'chien مذکر مفرد است، پس حرف تعریف نامعین آن un است.'],
    '固定問候語 Comment allez-vous ?（您好嗎？）': ['The standard greeting is Comment allez-vous? (“How are you?”)', 'La formule de salutation est Comment allez-vous ?', 'عبارت رایج احوال‌پرسی Comment allez-vous ? یعنی «حال شما چطور است؟»'],
    'grand（大／高）的反義詞是 petit（小）。gros 是「胖、粗」。': ['The opposite of grand (big/tall) is petit (small). Gros means fat or thick.', 'Le contraire de grand est petit. Gros signifie épais ou corpulent.', 'متضاد grand به معنای بزرگ/بلند، petit یعنی کوچک است؛ gros یعنی چاق یا ضخیم.'],
    '19 dix-neuf 之後是 20 vingt。': ['After 19, dix-neuf, comes 20, vingt.', 'Après 19, dix-neuf, vient 20, vingt.', 'پس از ۱۹، dix-neuf، عدد ۲۰ یعنی vingt می‌آید.'],
    "文中明確寫 j'habite à Lyon。": ["The text explicitly says j'habite à Lyon.", "Le texte dit clairement j'habite à Lyon.", "متن به‌صراحت می‌گوید j'habite à Lyon."],
    '營業時間是週一到週六，因此週日 dimanche 公休。': ['Opening days are Monday through Saturday, so Sunday, dimanche, is closed.', 'L’établissement ouvre du lundi au samedi ; il est donc fermé le dimanche.', 'ساعات کاری از دوشنبه تا شنبه است، پس یکشنبه، dimanche، تعطیل است.'],
    "客人說 « Un café, s'il vous plaît. »": ["The customer says: « Un café, s'il vous plaît. »", "Le client dit : « Un café, s'il vous plaît. »", "مشتری می‌گوید: « Un café, s'il vous plaît. »"],
    'aller 的複合過去式用助動詞 être：je suis allé(e)。': ['The passé composé of aller uses the auxiliary être: je suis allé(e).', 'Le passé composé de aller se forme avec être : je suis allé(e).', 'گذشتهٔ مرکب aller با فعل کمکی être ساخته می‌شود: je suis allé(e).'],
    "描述過去習慣用未完成過去式 imparfait：j'allais。": ['Use the imparfait for a past habit: j’allais.', 'On emploie l’imparfait pour une habitude passée : j’allais.', 'برای عادت در گذشته از imparfait استفاده می‌شود: j’allais.'],
    "直接受詞代名詞 la 在母音前縮寫成 l'：je l'ai vue。": ["The direct-object pronoun la contracts to l' before a vowel: je l'ai vue.", "Le pronom complément direct la s’élide devant une voyelle : je l'ai vue.", "ضمیر مفعولی مستقیم la پیش از واکه به l' کوتاه می‌شود: je l'ai vue."],
    '最近未來式 futur proche：aller + 原形動詞，nous allons partir。': ['The futur proche is aller plus an infinitive: nous allons partir.', 'Le futur proche se forme avec aller + infinitif : nous allons partir.', 'آیندهٔ نزدیک با aller + مصدر ساخته می‌شود: nous allons partir.'],
    '寄信要去郵局 la poste。': ['To mail a letter, go to the post office, la poste.', 'Pour envoyer une lettre, on va à la poste.', 'برای فرستادن نامه باید به ادارهٔ پست، la poste، رفت.'],
    '下雨要帶雨傘 parapluie。': ['When it rains, take an umbrella, parapluie.', 'Quand il pleut, il faut prendre un parapluie.', 'هنگام باران باید چتر، parapluie، همراه داشت.'],
    '餐廳訂位說 réserver une table。': ['To book at a restaurant, say réserver une table.', 'Pour réserver au restaurant, on dit réserver une table.', 'برای رزرو رستوران می‌گویند réserver une table.'],
    '原定 8h12，誤點十分鐘，因此 8h22 出發。': ['The scheduled time was 8:12; a ten-minute delay means departure at 8:22.', 'Le départ était prévu à 8 h 12 ; avec dix minutes de retard, il part à 8 h 22.', 'زمان مقرر ۸:۱۲ بوده و با ده دقیقه تأخیر، حرکت در ۸:۲۲ است.'],
    "信末要求 Réponds-moi avant jeudi（週四前回覆）。": ["The message ends with Réponds-moi avant jeudi: reply before Thursday.", "Le message se termine par Réponds-moi avant jeudi.", "در پایان پیام آمده Réponds-moi avant jeudi، یعنی پیش از پنج‌شنبه پاسخ بده."],
    '錄音中說 « on décale à mercredi »。': ['The recording says « on décale à mercredi » (we are moving it to Wednesday).', 'L’enregistrement dit : « on décale à mercredi ».', 'در فایل صوتی گفته می‌شود « on décale à mercredi»، یعنی به چهارشنبه موکول می‌کنیم.'],
    'il faut que 後接虛擬式 subjonctif：que tu partes。': ['Il faut que is followed by the subjunctive: que tu partes.', 'Il faut que est suivi du subjonctif : que tu partes.', 'پس از il faut que وجه التزامی می‌آید: que tu partes.'],
    'parler de quelque chose，關係代名詞需帶 de，故用 dont。': ['Because the construction is parler de quelque chose, the relative pronoun must carry de, so use dont.', 'On dit parler de quelque chose ; le pronom relatif doit reprendre de, donc on emploie dont.', 'ساختار parler de quelque chose حرف de دارد، پس ضمیر موصولی مناسب dont است.'],
    '副動詞 gérondif 的形式是 en + 現在分詞：en courant。': ['The gérondif is en plus the present participle: en courant.', 'Le gérondif se forme avec en + participe présent : en courant.', 'ساخت gérondif برابر en + اسم فاعل حال است: en courant.'],
    '愈過去式 plus-que-parfait，partir 用助動詞 être：il était parti。': ['In the plus-que-parfait, partir takes être: il était parti.', 'Au plus-que-parfait, partir se conjugue avec être : il était parti.', 'در plus-que-parfait، فعل partir با être می‌آید: il était parti.'],
    'stage 指實習。étage 是樓層，stade 是體育場。': ['Stage means an internship. Étage is a floor, and stade is a stadium.', 'Stage signifie un stage professionnel. Étage désigne un niveau d’immeuble et stade un terrain de sport.', 'stage یعنی کارآموزی؛ étage یعنی طبقه و stade یعنی ورزشگاه.'],
    'ça vaut le coup 意為「值得一試、划算」。': ['Ça vaut le coup means “it is worth it” or “worth a try.”', 'Ça vaut le coup signifie que quelque chose mérite l’effort ou vaut la peine.', 'ça vaut le coup یعنی «ارزشش را دارد» یا «ارزش امتحان کردن دارد».'],
    '表示負面原因用 en raison de。grâce à 用於正面原因，malgré 是「儘管」。': ['Use en raison de for a negative cause. Grâce à introduces a positive cause; malgré means “despite.”', 'En raison de introduit ici une cause négative. Grâce à marque une cause positive et malgré signifie « en dépit de ».', 'برای علت منفی en raison de می‌آید؛ grâce à علت مثبت و malgré به معنای «با وجود» است.'],
    "peinent à s'équiper 意為「仍難以完成設備配置」。": ["Peinent à s'équiper means they are still struggling to obtain the necessary equipment.", "Peinent à s'équiper signifie qu’ils ont encore du mal à acquérir l’équipement nécessaire.", "peinent à s'équiper یعنی هنوز برای تهیه و تکمیل تجهیزات مشکل دارند."],
    'sans ascenseur 表示沒有電梯，是唯一提到的缺點。': ['Sans ascenseur means there is no lift; it is the only drawback mentioned.', 'Sans ascenseur indique l’absence d’ascenseur, seul inconvénient mentionné.', 'sans ascenseur یعنی بدون آسانسور و تنها عیب ذکرشده است.'],
    '播報僅陳述事實，未加入評價，屬中性報導語氣。': ['The report states facts without evaluation, so its tone is neutral.', 'Le reportage expose les faits sans jugement : le ton est neutre.', 'گزارش فقط واقعیت‌ها را بدون ارزیابی بیان می‌کند، پس لحن خنثی است.'],
    "bien que 後必接虛擬式：bien qu'il soit。": ["Bien que must be followed by the subjunctive: bien qu'il soit.", "Bien que est toujours suivi du subjonctif : bien qu'il soit.", "پس از bien que حتماً وجه التزامی می‌آید: bien qu'il soit."],
    '第三類條件句：si + plus-que-parfait，主句用條件式過去 je ne serais pas venu。': ['In a third conditional, si takes the plus-que-parfait and the main clause takes the past conditional: je ne serais pas venu.', 'Dans l’irréel du passé, si est suivi du plus-que-parfait et la principale du conditionnel passé : je ne serais pas venu.', 'در شرط نوع سوم، پس از si ماضی بعید و در جملهٔ اصلی شرطی گذشته می‌آید: je ne serais pas venu.'],
    '被動語態需用過去分詞並與主詞配合：seront publiés。': ['The passive uses a past participle agreeing with the subject: seront publiés.', 'La voix passive emploie un participe passé accordé avec le sujet : seront publiés.', 'مجهول به اسم مفعولی هماهنگ با فاعل نیاز دارد: seront publiés.'],
    '表達結果用 si bien que（以致於）。其餘三個表目的或條件，且接虛擬式。': ['Si bien que expresses a result (“so that”). The other three express purpose or condition and take the subjunctive.', 'Si bien que exprime la conséquence. Les trois autres marquent le but ou la condition et se construisent avec le subjonctif.', 'si bien que نتیجه را می‌رساند؛ سه گزینهٔ دیگر هدف یا شرط‌اند و وجه التزامی می‌گیرند.'],
    'pérenne 意為持久、可長期存續的。': ['Pérenne means lasting or sustainable over the long term.', 'Pérenne signifie durable, capable de se maintenir longtemps.', 'pérenne یعنی پایدار و ماندگار در بلندمدت.'],
    'mettre au point 指把某物調整到位、最終定案。': ['Mettre au point means to refine or finalize something.', 'Mettre au point signifie régler, élaborer ou finaliser quelque chose.', 'mettre au point یعنی چیزی را دقیق تنظیم یا نهایی کردن.'],
    'enjeu 指在某件事中可能得失的東西，中文常譯為「關鍵、利害所在」。': ['Enjeu is what stands to be gained or lost—the key issue or stakes.', 'Un enjeu est ce que l’on peut gagner ou perdre : l’élément décisif d’une situation.', 'enjeu چیزی است که ممکن است به دست آید یا از دست برود؛ یعنی مسئلهٔ کلیدی یا منافع درگیر.'],
    'se garde bien de condamner + néanmoins 表示保留態度但指出盲點。': ['Se garde bien de condamner plus néanmoins signals a reserved stance while pointing out a blind spot.', 'Se garde bien de condamner associé à néanmoins traduit une position nuancée qui signale toutefois un angle mort.', 'ترکیب se garde bien de condamner و néanmoins موضعی محتاطانه دارد اما نقطهٔ کور را نشان می‌دهد.'],
    'toutefois inférieure 表示雖有成長但相對他國偏低。': ['Toutefois inférieure indicates growth that nevertheless remains lower than in other countries.', 'Toutefois inférieure indique une progression qui reste néanmoins plus faible que dans les autres pays.', 'toutefois inférieure یعنی با وجود رشد، مقدار نسبت به کشورهای دیگر پایین‌تر مانده است.'],
    'revoir à la baisse 指下修。faire fi de 是「無視」，語意相反。': ['Revoir à la baisse means revise downward. Faire fi de means disregard, which is the opposite idea.', 'Revoir à la baisse signifie réviser à la baisse. Faire fi de signifie ignorer et exprime l’idée contraire.', 'revoir à la baisse یعنی کاهش دادن برآورد؛ faire fi de یعنی نادیده گرفتن و معنای مخالف دارد.'],
    "固定用法 quoi qu'il en soit（無論如何），恆用虛擬式。": ["The fixed expression quoi qu'il en soit means “in any case” and always uses the subjunctive.", "La locution figée quoi qu'il en soit signifie « de toute façon » et emploie toujours le subjonctif.", "عبارت ثابت quoi qu'il en soit یعنی «در هر صورت» و همیشه وجه التزامی دارد."],
    "regretter que 後用虛擬式過去：qu'il n'ait pas pu。": ["Regretter que takes the past subjunctive here: qu'il n'ait pas pu.", "Regretter que appelle ici le subjonctif passé : qu'il n'ait pas pu.", "پس از regretter que در اینجا التزامی گذشته می‌آید: qu'il n'ait pas pu."],
    "il s'en faut de peu que 後接虛擬式，並常帶贅詞 ne explétif。": ['Il s’en faut de peu que takes the subjunctive and often the non-negative ne explétif.', 'Il s’en faut de peu que est suivi du subjonctif et souvent du ne explétif.', 'پس از il s’en faut de peu que وجه التزامی می‌آید و اغلب ne زائد نیز استفاده می‌شود.'],
    'éluder 意為迴避、閃躲問題。': ['Éluder means to evade or sidestep a question.', 'Éluder signifie éviter ou esquiver une question.', 'éluder یعنی از پاسخ به پرسش طفره رفتن یا آن را دور زدن.'],
    'revirement 指立場的急遽轉變。': ['Revirement means an abrupt change of position.', 'Un revirement est un changement brusque de position.', 'revirement یعنی تغییر ناگهانی موضع.'],
    'battre en brèche 意為攻破、駁倒某個論點。': ['Battre en brèche means to undermine or refute an argument.', 'Battre en brèche signifie attaquer ou réfuter un argument.', 'battre en brèche یعنی یک استدلال را تضعیف یا رد کردن.'],
    'encore faut-il que 屬非人稱結構，後接虛擬式。': ['Encore faut-il que is an impersonal construction followed by the subjunctive.', 'Encore faut-il que est une tournure impersonnelle suivie du subjonctif.', 'encore faut-il que ساختی غیرشخصی است و پس از آن وجه التزامی می‌آید.'],
    'aussi… soit-il 是讓步結構；ne saurait 是委婉否定：不能取代政策。': ['Aussi… soit-il is a concessive structure; ne saurait is a tactful negative, meaning it cannot replace policy.', 'Aussi… soit-il est une tournure concessive ; ne saurait est une négation atténuée : cela ne peut remplacer une politique.', 'aussi… soit-il ساخت امتیازی است و ne saurait نفی مؤدبانه دارد: نمی‌تواند جای سیاست را بگیرد.'],
    'à défaut de 明確標示保留，屬有分寸的褒中帶貶。': ['À défaut de clearly introduces a reservation, making this measured praise with a qualification.', 'À défaut de marque clairement une réserve : c’est un éloge mesuré, assorti d’une critique.', 'à défaut de آشکارا قید و تحفظ می‌آورد؛ یعنی تحسینی سنجیده همراه با نقد.'],
    'décliner toute responsabilité 為固定搭配，意為撇清責任。': ['Décliner toute responsabilité is a fixed expression meaning to disclaim all responsibility.', 'Décliner toute responsabilité est une expression figée qui signifie refuser d’assumer toute responsabilité.', 'décliner toute responsabilité عبارت ثابت به معنای سلب کامل مسئولیت است.'],
    "虛擬式愈過去 n'eût été（若非）為文雅假設句，主句用條件式過去 aurait échoué。": ['The pluperfect subjunctive n’eût été (“had it not been for”) forms a literary hypothesis; the main clause uses the past conditional aurait échoué.', 'Le plus-que-parfait du subjonctif n’eût été forme une hypothèse littéraire ; la principale emploie le conditionnel passé aurait échoué.', 'التزامی ماضی بعید n’eût été به معنای «اگر نبود» فرض ادبی می‌سازد و جملهٔ اصلی شرطی گذشته aurait échoué دارد.'],
    "倒裝的虛擬式未完成過去表讓步假設，相當於 même s'il était。": ["The inverted imperfect subjunctive expresses a concessive hypothesis, equivalent to même s'il était.", "Le subjonctif imparfait inversé exprime une hypothèse concessive, équivalente à même s'il était.", "التزامی ماضی استمراری وارونه فرض امتیازی می‌سازد و برابر même s'il était است."],
    'aréopage 源自雅典的最高法庭，引申為由權威人士組成的集會。': ['Aréopage comes from Athens’ highest court and now means an assembly of eminent authorities.', 'Aréopage vient du tribunal suprême d’Athènes et désigne par extension une assemblée de personnalités éminentes.', 'aréopage از دادگاه عالی آتن آمده و در معنای گسترش‌یافته به جمعی از افراد صاحب‌اعتبار گفته می‌شود.'],
    'atermoiement 指一再拖延、猶豫不決。': ['Atermoiement means repeated delay or indecision.', 'Atermoiement désigne le fait de repousser sans cesse une décision, par hésitation.', 'atermoiement یعنی تعلل مکرر و دودلی در تصمیم.'],
    '雙重否定的低調表述 litote，實際意思是「相當出色」。': ['The double negative is a litotes—an understatement that actually means “quite remarkable.”', 'La double négation forme une litote ; elle signifie en réalité « tout à fait remarquable ».', 'نفی دوگانه آرایهٔ litote و کم‌گویی است و در واقع یعنی «بسیار برجسته».'],
    'faire florès 為書面語，意為大獲成功、蔚為風尚。': ['Faire florès is literary language meaning to become highly successful or fashionable.', 'Faire florès est une expression soutenue signifiant connaître un grand succès ou faire école.', 'faire florès تعبیری ادبی به معنای موفقیت فراوان یا رایج شدن است.'],
    'gageure 指幾乎難以達成的挑戰。': ['Gageure is a challenge that seems almost impossible to achieve.', 'Une gageure est un défi qui paraît presque impossible à relever.', 'gageure یعنی چالشی که انجامش تقریباً ناممکن به نظر می‌رسد.'],
    'moins… que… 的比較結構指出：引用是為了替自己背書，而非闡明。': ['The moins… que… comparison says the quotation serves more to lend authority than to clarify.', 'La comparaison moins… que… indique que la citation sert davantage à se donner de l’autorité qu’à éclairer.', 'ساخت مقایسه‌ای moins… que… نشان می‌دهد نقل‌قول برای اعتباربخشی است، نه روشن‌سازی.'],
    "il n'est pas jusqu'à… qui ne… 是文言強調結構，意為「甚至連…也…」。": ['Il n’est pas jusqu’à… qui ne… is a literary emphatic structure meaning “even…”.', 'Il n’est pas jusqu’à… qui ne… est une tournure littéraire emphatique qui signifie « même… ».', 'il n’est pas jusqu’à… qui ne… ساختی ادبی و تأکیدی به معنای «حتی… نیز» است.'],
    'toute administrative 在文學評論語境中為反諷，暗指冗贅生硬。': ['Toute administrative is ironic in literary criticism, implying something cumbersome and stiff.', 'Toute administrative est ironique dans une critique littéraire et suggère une lourdeur rigide.', 'toute administrative در نقد ادبی کنایه‌آمیز است و به نثر سنگین و خشک اشاره دارد.'],
    '開放報名': ['Registration open', 'Inscriptions ouvertes', 'ثبت‌نام باز'],
    '台北市（詳細地址與交通方式報名後提供）': ['Taipei City (full address and directions provided after registration)', 'Taipei (adresse complète et accès communiqués après l’inscription)', 'شهر تایپه (نشانی کامل و مسیر دسترسی پس از ثبت‌نام اعلام می‌شود)'],
    '視訊會議軟體，課後提供錄影與教材': ['Video-conferencing platform; recording and materials provided after class', 'Plateforme de visioconférence ; enregistrement et supports fournis après le cours', 'نرم‌افزار جلسهٔ ویدیویی؛ ضبط و منابع پس از کلاس ارائه می‌شود'],
    '週一至週五 13:00–21:30／週六 10:00–17:00／週日僅線上課': ['Mon–Fri 13:00–21:30 / Sat 10:00–17:00 / online classes only on Sun', 'Lun.–ven. 13 h–21 h 30 / sam. 10 h–17 h / cours en ligne uniquement le dim.', 'دوشنبه تا جمعه ۱۳:۰۰ تا ۲۱:۳۰ / شنبه ۱۰:۰۰ تا ۱۷:۰۰ / یکشنبه فقط کلاس آنلاین'],
    '就能自行還原。': ['can reconstruct it. ', 'peut le reconstituer. ', 'می‌تواند آن را بازسازی کند. '],
    '因此結果碼裡不包含姓名、聯絡方式或任何個資，也請不要在本頁輸入敏感資訊。': ['The result code therefore contains no name, contact details or personal data. Do not enter sensitive information on this page.', 'Le code ne contient donc ni nom, ni coordonnées, ni données personnelles. Ne saisissez aucune information sensible sur cette page.', 'بنابراین کد نتیجه شامل نام، اطلاعات تماس یا دادهٔ شخصی نیست. اطلاعات حساس را در این صفحه وارد نکنید.']
  };

  Object.keys(EXTRA_ENTRIES).forEach(function (key) {
    ENTRIES[key] = EXTRA_ENTRIES[key];
  });

  var DICTS = { en: {}, fr: {}, 'fa-IR': {} };
  Object.keys(ENTRIES).forEach(function (key) {
    DICTS.en[key] = ENTRIES[key][0];
    DICTS.fr[key] = ENTRIES[key][1];
    DICTS['fa-IR'][key] = ENTRIES[key][2];
  });

  function normalizeLocale(value) {
    var lang = String(value || '').toLowerCase();
    if (lang === 'zh' || lang.indexOf('zh-') === 0) return 'zh-Hant';
    if (lang === 'fr' || lang.indexOf('fr-') === 0) return 'fr';
    if (lang === 'fa' || lang.indexOf('fa-') === 0 || lang === 'ir') return 'fa-IR';
    if (lang === 'en' || lang.indexOf('en-') === 0) return 'en';
    return null;
  }

  function initialLocale() {
    var query = normalizeLocale(new URLSearchParams(location.search).get('lang'));
    if (query) return query;
    try {
      var stored = normalizeLocale(localStorage.getItem(STORAGE_KEY));
      if (stored) return stored;
    } catch (e) {}
    return normalizeLocale(navigator.language) || DEFAULT_LOCALE;
  }

  var locale = initialLocale();
  var originals = new WeakMap();
  var attrOriginals = new WeakMap();

  function interpolate(value, vars) {
    if (!vars) return value;
    return String(value).replace(/\{(\w+)\}/g, function (_, key) {
      return Object.prototype.hasOwnProperty.call(vars, key) ? vars[key] : _;
    });
  }

  /* Keep Latin course codes, names, times, prices and URLs in their natural
     left-to-right order when they appear inside Persian sentences. */
  function isolateLtrRuns(value) {
    var clean = String(value).replace(/[\u2066\u2069]/g, '');
    var latinRun = /[A-Za-zÀ-ɏ0-9\u0660-\u0669\u06F0-\u06F9][A-Za-zÀ-ɏ0-9\u0660-\u0669\u06F0-\u06F9\u066B\u066C@._:+$%#,\/\\'’–—-]*(?:[ \u00a0][A-Za-zÀ-ɏ0-9\u0660-\u0669\u06F0-\u06F9][A-Za-zÀ-ɏ0-9\u0660-\u0669\u06F0-\u06F9\u066B\u066C@._:+$%#,\/\\'’–—-]*)*/g;
    return clean.replace(latinRun, '\u2066$&\u2069');
  }

  function t(source, vars) {
    var value = source;
    if (locale !== DEFAULT_LOCALE) {
      value = (DICTS[locale] || {})[source] || source;
      if (value === source && source.length <= 72) {
        var compound = source;
        Object.keys(DICTS[locale] || {}).sort(function (a, b) { return b.length - a.length; }).forEach(function (key) {
          if (key.indexOf('{') !== -1) return;
          compound = compound.split(key).join(DICTS[locale][key]);
        });
        if (!/[\u3400-\u9fff]/.test(compound)) value = compound;
      }
    }
    value = interpolate(value, vars);
    return locale === 'fa-IR' ? isolateLtrRuns(value) : value;
  }

  function translateTextNode(node) {
    if (!originals.has(node)) originals.set(node, node.nodeValue);
    var original = originals.get(node);
    var trimmed = original.trim();
    if (!trimmed) return;
    var translated = t(trimmed);
    node.nodeValue = original.replace(trimmed, translated);
  }

  function translateAttributes(root) {
    var selector = '[title],[aria-label],[placeholder],[data-title],[data-desc],meta[name="description"],meta[property="og:title"],meta[property="og:description"]';
    var nodes = [];
    if (root.nodeType === 1 && root.matches && root.matches(selector)) nodes.push(root);
    if (root.querySelectorAll) nodes = nodes.concat(Array.prototype.slice.call(root.querySelectorAll(selector)));
    nodes.forEach(function (el) {
      var saved = attrOriginals.get(el) || {};
      ['title', 'aria-label', 'placeholder', 'data-title', 'data-desc', 'content'].forEach(function (attr) {
        if (!el.hasAttribute(attr)) return;
        if (!Object.prototype.hasOwnProperty.call(saved, attr)) saved[attr] = el.getAttribute(attr);
        el.setAttribute(attr, t(saved[attr]));
      });
      attrOriginals.set(el, saved);
    });
  }

  function translate(root) {
    root = root || document;
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        var parent = node.parentElement;
        if (!parent || /^(SCRIPT|STYLE|CODE|PRE|TEXTAREA)$/.test(parent.tagName)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(translateTextNode);
    translateAttributes(root);
  }

  function updateDocumentLanguage() {
    document.documentElement.lang = locale;
    document.documentElement.dir = LOCALES[locale].dir;
    document.documentElement.classList.toggle('rtl', LOCALES[locale].dir === 'rtl');
  }

  function injectSwitcher() {
    var head = document.querySelector('.head-inner');
    if (!head || document.querySelector('.language-switcher')) return;
    var wrap = document.createElement('div');
    wrap.className = 'language-switcher';
    var label = document.createElement('label');
    label.className = 'sr-only';
    label.htmlFor = 'language-select';
    label.textContent = t('語言');
    var select = document.createElement('select');
    select.id = 'language-select';
    select.setAttribute('aria-label', t('語言'));
    Object.keys(LOCALES).forEach(function (code) {
      var option = document.createElement('option');
      option.value = code;
      option.lang = code;
      option.textContent = LOCALES[code].label;
      option.selected = code === locale;
      select.appendChild(option);
    });
    select.addEventListener('change', function () { setLocale(select.value); });
    wrap.appendChild(label);
    wrap.appendChild(select);
    var nav = head.querySelector('.site-nav');
    head.insertBefore(wrap, nav || null);
  }

  function setLocale(next) {
    next = normalizeLocale(next) || DEFAULT_LOCALE;
    if (!LOCALES[next]) return;
    locale = next;
    try { localStorage.setItem(STORAGE_KEY, locale); } catch (e) {}
    updateDocumentLanguage();
    translate(document);
    var select = document.getElementById('language-select');
    if (select) {
      select.value = locale;
      select.setAttribute('aria-label', t('語言'));
      var label = document.querySelector('label[for="language-select"]');
      if (label) label.textContent = t('語言');
    }
    document.dispatchEvent(new CustomEvent('babel:languagechange', { detail: { locale: locale } }));
  }

  updateDocumentLanguage();
  translate(document);
  injectSwitcher();

  global.BABEL_I18N = {
    locales: LOCALES,
    get locale() { return locale; },
    t: t,
    translate: translate,
    setLocale: setLocale
  };
})(window);
