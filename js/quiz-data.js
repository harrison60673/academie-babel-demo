/* =============================================================
   quiz-data.js — ACADÉMIE BABEL 分級測驗題庫
   -------------------------------------------------------------
   題庫與頁面邏輯完全分離。要增刪題目，只改這個檔案。

   每題的資料結構：
     { id, level, skill, type, question, options[], k, explanation, audio? }
       id          唯一代號，格式 <等級>-<兩位數>，例如 "B1-07"
       level       A1 / A2 / B1 / B2 / C1 / C2
       skill       grammaire / vocabulaire / comprehension / ecoute
       type        single（單選）/ cloze（克漏字）/ listening（聽力）
       options     四個選項，順序即顯示順序
       k           編碼後的正解（見下方說明）
       explanation 繁體中文解析
       audio       僅 listening 題需要，相對路徑

   ⚠ 關於 k 欄位的誠實說明：
     正解沒有用明文寫出來，而是「正解索引 + 由 id 算出的偏移量」後
     取字母再做 base64。任何人打開 devtools 花三分鐘都能還原。
     這只是提高隨手偷看的門檻，不是安全機制。
     真正需要防作弊的正式測驗，必須把計分放在後端。

   新增題目步驟：
     1. 複製任一題，改 id（不可重複）、level、skill、question、options、explanation
     2. 用下面的 encodeAnswer(索引, id) 算出新的 k，貼回去
        （在瀏覽器 console 執行：BABEL_QUIZ.encodeAnswer(2, 'B1-11')）
     3. 存檔重整即可，不需要 build
   ============================================================= */
(function (global) {
  'use strict';

  var QUESTIONS = [
  {"id":"A1-01","level":"A1","skill":"grammaire","type":"single","question":"Je ___ étudiant à l'université.","options":["es","suis","est","sont"],"k":"QrdiYmw=","explanation":"être 動詞第一人稱單數為 suis。je suis / tu es / il est / ils sont。"},
  {"id":"A1-02","level":"A1","skill":"grammaire","type":"cloze","question":"Nous ___ le français depuis septembre.","options":["parlons","parlez","parle","parlent"],"k":"QrdiYmw=","explanation":"主詞 nous，第一類動詞 parler 變化為 parlons。"},
  {"id":"A1-03","level":"A1","skill":"grammaire","type":"single","question":"___ livre est très intéressant.","options":["Cette","Ces","Ce","Cet"],"k":"QbdiYmw=","explanation":"livre 是子音開頭的陽性單數名詞，用 ce。母音開頭才用 cet（cet ami）。"},
  {"id":"A1-04","level":"A1","skill":"grammaire","type":"cloze","question":"Elle a ___ chien et deux chats.","options":["une","des","le","un"],"k":"Q7diYmw=","explanation":"chien 為陽性單數，不定冠詞用 un。"},
  {"id":"A1-05","level":"A1","skill":"vocabulaire","type":"single","question":"Bonjour madame, comment ___-vous ?","options":["faites","allez","venez","prenez"],"k":"QrdiYmw=","explanation":"固定問候語 Comment allez-vous ?（您好嗎？）"},
  {"id":"A1-06","level":"A1","skill":"vocabulaire","type":"single","question":"Quel est le contraire de « grand » ?","options":["long","petit","haut","gros"],"k":"Q7diYmw=","explanation":"grand（大／高）的反義詞是 petit（小）。gros 是「胖、粗」。"},
  {"id":"A1-07","level":"A1","skill":"vocabulaire","type":"single","question":"Quel nombre vient après « dix-neuf » ?","options":["vingt","dix-dix","onze","trente"],"k":"Q7diYmw=","explanation":"19 dix-neuf 之後是 20 vingt。"},
  {"id":"A1-08","level":"A1","skill":"comprehension","type":"single","question":"« Salut ! Je m'appelle Léa, j'ai 22 ans et j'habite à Lyon avec ma sœur. » — Où habite Léa ?","options":["À Paris","À Nice","À Lyon","À Lille"],"k":"QrdiYmw=","explanation":"文中明確寫 j'habite à Lyon。"},
  {"id":"A1-09","level":"A1","skill":"comprehension","type":"single","question":"« Le magasin est ouvert du lundi au samedi, de 9h à 18h. » — Quand le magasin est-il fermé ?","options":["Le samedi","Le dimanche","Le matin","À 17h"],"k":"QrdiYmw=","explanation":"營業時間是週一到週六，因此週日 dimanche 公休。"},
  {"id":"A1-10","level":"A1","skill":"ecoute","type":"listening","question":"Écoutez le dialogue au café. Que commande la cliente ?","options":["Un thé","Une bière","Un café","Un jus d'orange"],"k":"Q7diYmw=","explanation":"客人說 « Un café, s'il vous plaît. »","audio":"assets/audio/a1-01.mp3"},
  {"id":"A2-01","level":"A2","skill":"grammaire","type":"cloze","question":"Hier, je ___ au cinéma avec mes amis.","options":["suis allé","ai allé","vais","irai"],"k":"QrdiYmw=","explanation":"aller 的複合過去式用助動詞 être：je suis allé(e)。"},
  {"id":"A2-02","level":"A2","skill":"grammaire","type":"single","question":"Quand j'étais petit, j'___ souvent chez ma grand-mère.","options":["suis allé","irai","allais","aille"],"k":"QbdiYmw=","explanation":"描述過去習慣用未完成過去式 imparfait：j'allais。"},
  {"id":"A2-03","level":"A2","skill":"grammaire","type":"single","question":"Tu as vu Marie ? — Oui, je ___ ai vue hier.","options":["lui","le","l'","la"],"k":"QrdiYmw=","explanation":"直接受詞代名詞 la 在母音前縮寫成 l'：je l'ai vue。"},
  {"id":"A2-04","level":"A2","skill":"grammaire","type":"cloze","question":"Demain, nous ___ partir très tôt.","options":["allez","allons","irons","sommes"],"k":"QrdiYmw=","explanation":"最近未來式 futur proche：aller + 原形動詞，nous allons partir。"},
  {"id":"A2-05","level":"A2","skill":"vocabulaire","type":"single","question":"Pour envoyer une lettre, on va ___.","options":["à la gare","à la poste","à la banque","à la mairie"],"k":"Q7diYmw=","explanation":"寄信要去郵局 la poste。"},
  {"id":"A2-06","level":"A2","skill":"vocabulaire","type":"single","question":"Il pleut beaucoup, n'oublie pas ton ___.","options":["chapeau","parapluie","manteau","sac"],"k":"RLdiYmw=","explanation":"下雨要帶雨傘 parapluie。"},
  {"id":"A2-07","level":"A2","skill":"vocabulaire","type":"cloze","question":"Bonsoir, je voudrais réserver une ___ pour deux personnes.","options":["table","chaise","porte","place"],"k":"RLdiYmw=","explanation":"餐廳訂位說 réserver une table。"},
  {"id":"A2-08","level":"A2","skill":"comprehension","type":"single","question":"« Le train de 8h12 pour Marseille partira du quai 4. Il est annoncé avec dix minutes de retard. » — À quelle heure le train partira-t-il ?","options":["À 8h02","À 8h12","À 8h22","À 8h40"],"k":"Q7diYmw=","explanation":"原定 8h12，誤點十分鐘，因此 8h22 出發。"},
  {"id":"A2-09","level":"A2","skill":"comprehension","type":"single","question":"« Chère Sophie, je t'invite à mon anniversaire samedi prochain à 19h chez moi. Réponds-moi avant jeudi ! » — Que demande l'auteur ?","options":["De venir plus tôt","D'apporter un cadeau","De répondre avant jeudi","De réserver un restaurant"],"k":"RLdiYmw=","explanation":"信末要求 Réponds-moi avant jeudi（週四前回覆）。"},
  {"id":"A2-10","level":"A2","skill":"ecoute","type":"listening","question":"Écoutez le message. Quel jour le rendez-vous est-il reporté ?","options":["Mardi","Mercredi","Jeudi","Vendredi"],"k":"Q7diYmw=","explanation":"錄音中說 « on décale à mercredi »。","audio":"assets/audio/a2-01.mp3"},
  {"id":"B1-01","level":"B1","skill":"grammaire","type":"cloze","question":"Il faut que tu ___ plus tôt si tu veux avoir une place.","options":["pars","partes","partiras","partais"],"k":"Q7diYmw=","explanation":"il faut que 後接虛擬式 subjonctif：que tu partes。"},
  {"id":"B1-02","level":"B1","skill":"grammaire","type":"single","question":"C'est exactement le livre ___ je t'avais parlé.","options":["que","qui","dont","où"],"k":"QbdiYmw=","explanation":"parler de quelque chose，關係代名詞需帶 de，故用 dont。"},
  {"id":"B1-03","level":"B1","skill":"grammaire","type":"single","question":"Il s'est blessé ___ courant dans l'escalier.","options":["à","en","de","pour"],"k":"QbdiYmw=","explanation":"副動詞 gérondif 的形式是 en + 現在分詞：en courant。"},
  {"id":"B1-04","level":"B1","skill":"grammaire","type":"cloze","question":"Quand je suis arrivé à la gare, le train ___ déjà parti.","options":["était","est","avait","a"],"k":"QbdiYmw=","explanation":"愈過去式 plus-que-parfait，partir 用助動詞 être：il était parti。"},
  {"id":"B1-05","level":"B1","skill":"vocabulaire","type":"single","question":"Après ses études, elle a décroché un ___ de six mois dans une entreprise lyonnaise.","options":["étage","stage","stade","salaire"],"k":"Q7diYmw=","explanation":"stage 指實習。étage 是樓層，stade 是體育場。"},
  {"id":"B1-06","level":"B1","skill":"vocabulaire","type":"single","question":"Que signifie l'expression « ça vaut le coup » ?","options":["Cela coûte cher","Cela en vaut la peine","C'est dangereux","C'est un échec"],"k":"RLdiYmw=","explanation":"ça vaut le coup 意為「值得一試、划算」。"},
  {"id":"B1-07","level":"B1","skill":"vocabulaire","type":"cloze","question":"___ la pluie, le match a été annulé.","options":["Grâce à","Malgré","En raison de","Pourtant"],"k":"QrdiYmw=","explanation":"表示負面原因用 en raison de。grâce à 用於正面原因，malgré 是「儘管」。"},
  {"id":"B1-08","level":"B1","skill":"comprehension","type":"single","question":"« Depuis la crise sanitaire, le télétravail s'est banalisé dans les grandes entreprises, mais les PME peinent encore à s'équiper. » — Que dit le texte des PME ?","options":["Elles ont déjà adopté le télétravail","Elles refusent le télétravail","Elles ont encore des difficultés à s'équiper","Elles n'ont pas été touchées par la crise"],"k":"Q7diYmw=","explanation":"peinent à s'équiper 意為「仍難以完成設備配置」。"},
  {"id":"B1-09","level":"B1","skill":"comprehension","type":"single","question":"« Studio meublé, 28 m², 5e étage sans ascenseur, charges comprises, libre au 1er octobre. » — Quel est l'inconvénient mentionné ?","options":["Le logement n'est pas meublé","Il n'y a pas d'ascenseur","Les charges ne sont pas comprises","Il est libre trop tard"],"k":"Q7diYmw=","explanation":"sans ascenseur 表示沒有電梯，是唯一提到的缺點。"},
  {"id":"B1-10","level":"B1","skill":"ecoute","type":"listening","question":"Écoutez le bulletin. Quelle est l'attitude du journaliste envers la mesure annoncée ?","options":["Enthousiaste","Neutre et informative","Ouvertement critique","Ironique"],"k":"Q7diYmw=","explanation":"播報僅陳述事實，未加入評價，屬中性報導語氣。","audio":"assets/audio/b1-01.mp3"},
  {"id":"B2-01","level":"B2","skill":"grammaire","type":"cloze","question":"Bien qu'il ___ épuisé, il a tenu à finir la réunion.","options":["était","soit","est","sera"],"k":"RLdiYmw=","explanation":"bien que 後必接虛擬式：bien qu'il soit。"},
  {"id":"B2-02","level":"B2","skill":"grammaire","type":"single","question":"Si j'avais su, je ne ___ pas venu.","options":["serai","serais","suis","étais"],"k":"QbdiYmw=","explanation":"第三類條件句：si + plus-que-parfait，主句用條件式過去 je ne serais pas venu。"},
  {"id":"B2-03","level":"B2","skill":"grammaire","type":"single","question":"Les résultats seront ___ sur le site du ministère dès lundi.","options":["publier","publiant","publiés","publie"],"k":"Q7diYmw=","explanation":"被動語態需用過去分詞並與主詞配合：seront publiés。"},
  {"id":"B2-04","level":"B2","skill":"grammaire","type":"cloze","question":"Il ne cesse de se plaindre, ___ plus personne ne l'écoute.","options":["pour que","si bien que","à moins que","afin que"],"k":"Q7diYmw=","explanation":"表達結果用 si bien que（以致於）。其餘三個表目的或條件，且接虛擬式。"},
  {"id":"B2-05","level":"B2","skill":"vocabulaire","type":"single","question":"Un projet « pérenne » est un projet…","options":["coûteux","durable","récent","risqué"],"k":"RLdiYmw=","explanation":"pérenne 意為持久、可長期存續的。"},
  {"id":"B2-06","level":"B2","skill":"vocabulaire","type":"single","question":"« Mettre au point » un dispositif, c'est le ___.","options":["finaliser","annuler","vendre","copier"],"k":"RLdiYmw=","explanation":"mettre au point 指把某物調整到位、最終定案。"},
  {"id":"B2-07","level":"B2","skill":"vocabulaire","type":"single","question":"Dans « les enjeux de la réforme », le mot « enjeu » désigne…","options":["un délai","une règle","ce que l'on risque de gagner ou de perdre","un obstacle matériel"],"k":"Q7diYmw=","explanation":"enjeu 指在某件事中可能得失的東西，中文常譯為「關鍵、利害所在」。"},
  {"id":"B2-08","level":"B2","skill":"comprehension","type":"single","question":"« L'auteur, qui se garde bien de condamner la réforme, en souligne néanmoins les angles morts. » — Quelle est la position de l'auteur ?","options":["Il approuve pleinement la réforme","Il la condamne fermement","Il ne la rejette pas mais en montre les failles","Il n'exprime aucune opinion"],"k":"RLdiYmw=","explanation":"se garde bien de condamner + néanmoins 表示保留態度但指出盲點。"},
  {"id":"B2-09","level":"B2","skill":"comprehension","type":"single","question":"« Les inscriptions ont progressé de 3 % en un an, une hausse toutefois inférieure à celle observée chez nos voisins européens. » — Que peut-on conclure ?","options":["La hausse est exceptionnelle","La hausse existe mais reste modeste en comparaison","Les inscriptions ont baissé","Les voisins européens ont connu une baisse"],"k":"RLdiYmw=","explanation":"toutefois inférieure 表示雖有成長但相對他國偏低。"},
  {"id":"B2-10","level":"B2","skill":"vocabulaire","type":"cloze","question":"La direction a ___ ses engagements après la mobilisation des salariés.","options":["revu à la baisse","mis en avant","pris acte","fait fi de"],"k":"Q7diYmw=","explanation":"revoir à la baisse 指下修。faire fi de 是「無視」，語意相反。"},
  {"id":"C1-01","level":"C1","skill":"grammaire","type":"cloze","question":"Quoi qu'il en ___, la décision a été entérinée.","options":["est","soit","sera","était"],"k":"RLdiYmw=","explanation":"固定用法 quoi qu'il en soit（無論如何），恆用虛擬式。"},
  {"id":"C1-02","level":"C1","skill":"grammaire","type":"single","question":"Je regrette qu'il n'___ pas pu se joindre à nous.","options":["a","avait","ait","aurait"],"k":"QrdiYmw=","explanation":"regretter que 後用虛擬式過去：qu'il n'ait pas pu。"},
  {"id":"C1-03","level":"C1","skill":"grammaire","type":"single","question":"Il s'en est fallu de peu que le projet ne ___.","options":["échoue","échouer","échouait","échouerait"],"k":"QbdiYmw=","explanation":"il s'en faut de peu que 後接虛擬式，並常帶贅詞 ne explétif。"},
  {"id":"C1-04","level":"C1","skill":"vocabulaire","type":"single","question":"« Éluder une question », c'est…","options":["y répondre longuement","l'esquiver","la reformuler","la poser à nouveau"],"k":"Q7diYmw=","explanation":"éluder 意為迴避、閃躲問題。"},
  {"id":"C1-05","level":"C1","skill":"vocabulaire","type":"single","question":"Un « revirement » désigne…","options":["une répétition","un changement brusque de position","une lente évolution","un compromis"],"k":"RLdiYmw=","explanation":"revirement 指立場的急遽轉變。"},
  {"id":"C1-06","level":"C1","skill":"vocabulaire","type":"single","question":"« Battre en brèche une théorie », c'est…","options":["la vulgariser","la confirmer","la réfuter","l'ignorer"],"k":"QrdiYmw=","explanation":"battre en brèche 意為攻破、駁倒某個論點。"},
  {"id":"C1-07","level":"C1","skill":"grammaire","type":"cloze","question":"Encore faut-il qu'il ___ disposé à négocier.","options":["est","sera","soit","serait"],"k":"Q7diYmw=","explanation":"encore faut-il que 屬非人稱結構，後接虛擬式。"},
  {"id":"C1-08","level":"C1","skill":"comprehension","type":"single","question":"« Ce rapport, aussi documenté soit-il, ne saurait tenir lieu de politique publique. » — Que veut dire l'auteur ?","options":["Le rapport est mal documenté","Le rapport est solide mais ne remplace pas une politique","Le rapport constitue une politique publique","Le rapport doit être réécrit"],"k":"Q7diYmw=","explanation":"aussi… soit-il 是讓步結構；ne saurait 是委婉否定：不能取代政策。"},
  {"id":"C1-09","level":"C1","skill":"comprehension","type":"single","question":"« On saluera l'audace de l'auteur — à défaut d'en approuver toutes les conclusions. » — Quel est le ton ?","options":["Élogieux sans réserve","Nuancé, avec une réserve explicite","Hostile","Indifférent"],"k":"RLdiYmw=","explanation":"à défaut de 明確標示保留，屬有分寸的褒中帶貶。"},
  {"id":"C1-10","level":"C1","skill":"vocabulaire","type":"cloze","question":"Le ministre a ___ toute responsabilité dans cette affaire.","options":["décliné","déclamé","déclenché","déclaré"],"k":"Q7diYmw=","explanation":"décliner toute responsabilité 為固定搭配，意為撇清責任。"},
  {"id":"C2-01","level":"C2","skill":"grammaire","type":"cloze","question":"N'eût été son intervention, la négociation ___ échoué.","options":["a","avait","aurait","eût"],"k":"QrdiYmw=","explanation":"虛擬式愈過去 n'eût été（若非）為文雅假設句，主句用條件式過去 aurait échoué。"},
  {"id":"C2-02","level":"C2","skill":"grammaire","type":"single","question":"« Fût-il unanimement salué, ce texte n'en demeure pas moins perfectible. » — Que marque « fût-il » ?","options":["Une condition réalisée","Une concession hypothétique","Une conséquence","Une temporalité passée"],"k":"QrdiYmw=","explanation":"倒裝的虛擬式未完成過去表讓步假設，相當於 même s'il était。"},
  {"id":"C2-03","level":"C2","skill":"vocabulaire","type":"single","question":"Un « aréopage » désigne…","options":["une assemblée de personnes qualifiées","un lieu de culte","un désaccord public","un discours creux"],"k":"QrdiYmw=","explanation":"aréopage 源自雅典的最高法庭，引申為由權威人士組成的集會。"},
  {"id":"C2-04","level":"C2","skill":"vocabulaire","type":"single","question":"Les « atermoiements » d'un gouvernement sont…","options":["ses décisions brutales","ses tergiversations et délais répétés","ses réformes structurelles","ses déclarations solennelles"],"k":"RLdiYmw=","explanation":"atermoiement 指一再拖延、猶豫不決。"},
  {"id":"C2-05","level":"C2","skill":"comprehension","type":"single","question":"« Le résultat n'est pas sans mérite. » — Cette formulation est…","options":["une litote élogieuse","une critique franche","une question rhétorique","une hyperbole"],"k":"RLdiYmw=","explanation":"雙重否定的低調表述 litote，實際意思是「相當出色」。"},
  {"id":"C2-06","level":"C2","skill":"vocabulaire","type":"single","question":"« Faire florès », c'est…","options":["échouer discrètement","connaître le succès","fleurir au printemps","se disperser"],"k":"QrdiYmw=","explanation":"faire florès 為書面語，意為大獲成功、蔚為風尚。"},
  {"id":"C2-07","level":"C2","skill":"vocabulaire","type":"single","question":"Une « gageure » est…","options":["une garantie financière","un pari difficile à tenir","une plaisanterie","une clause juridique"],"k":"Q7diYmw=","explanation":"gageure 指幾乎難以達成的挑戰。"},
  {"id":"C2-08","level":"C2","skill":"comprehension","type":"single","question":"« L'auteur convoque Rousseau moins pour l'éclairer que pour s'en réclamer. » — Que reproche-t-on à l'auteur ?","options":["De mal citer Rousseau","D'utiliser Rousseau comme caution plutôt que comme objet d'analyse","De ne pas connaître Rousseau","De critiquer Rousseau"],"k":"RLdiYmw=","explanation":"moins… que… 的比較結構指出：引用是為了替自己背書，而非闡明。"},
  {"id":"C2-09","level":"C2","skill":"grammaire","type":"single","question":"« Il n'est pas jusqu'aux plus sceptiques qui ne se soient ralliés. » — Cela signifie que…","options":["les sceptiques ont résisté","même les sceptiques se sont ralliés","personne ne s'est rallié","les sceptiques ont disparu"],"k":"QbdiYmw=","explanation":"il n'est pas jusqu'à… qui ne… 是文言強調結構，意為「甚至連…也…」。"},
  {"id":"C2-10","level":"C2","skill":"comprehension","type":"single","question":"« Une prose d'une clarté toute administrative. » — Comment interpréter cette remarque ?","options":["Un compliment sur la précision","Une critique ironique de la lourdeur du style","Une remarque neutre sur le genre","Un éloge de la concision"],"k":"QbdiYmw=","explanation":"toute administrative 在文學評論語境中為反諷，暗指冗贅生硬。"}
  ];

  function salt(id) { var s = 0; for (var i = 0; i < id.length; i++) s += id.charCodeAt(i); return s % 8; }

  // 解碼正解索引
  function decodeAnswer(q) {
    var ch = atob(q.k).charCodeAt(0) - 65;
    return (ch - salt(q.id) + 40) % 4;
  }

  // 產生新題目的 k 值用
  function encodeAnswer(index, id) {
    return btoa(String.fromCharCode(65 + ((index + salt(id)) % 4)) + '\u00b7bbl');
  }

  /* 出題順序（固定，不打亂）。
     結果碼的逐題對錯就是照這個順序壓成位元，所以 decode.html 才還原得回來。
     若日後要改每階段題數，這裡與 README 都要一起改。 */
  var STAGES = [
    { key: 'A1A2', label: '定位階段 A1–A2', ids: ['A1-01','A1-03','A1-06','A1-08','A1-10','A2-01','A2-03','A2-06','A2-08','A2-10'] },
    { key: 'B1',   label: 'B1 階段', ids: ['B1-01','B1-02','B1-03','B1-04','B1-05','B1-06','B1-07','B1-08','B1-09','B1-10'] },
    { key: 'B2',   label: 'B2 階段', ids: ['B2-01','B2-02','B2-03','B2-04','B2-05','B2-06','B2-07','B2-08','B2-09','B2-10'] },
    { key: 'C1',   label: 'C1 階段', ids: ['C1-01','C1-02','C1-03','C1-04','C1-05','C1-06','C1-07','C1-08','C1-09','C1-10'] }
  ];

  function get(id) {
    for (var i = 0; i < QUESTIONS.length; i++) if (QUESTIONS[i].id === id) return QUESTIONS[i];
    return null;
  }
  function sequence() {
    var out = [];
    STAGES.forEach(function (s) { s.ids.forEach(function (id) { var q = get(id); if (q) out.push(q); }); });
    return out;
  }

  global.BABEL_QUIZ = {
    questions: QUESTIONS,
    stages: STAGES,
    get: get,
    sequence: sequence,
    decodeAnswer: decodeAnswer,
    encodeAnswer: encodeAnswer,
    byLevel: function (lv) { return QUESTIONS.filter(function (q) { return q.level === lv; }); }
  };
})(window);
