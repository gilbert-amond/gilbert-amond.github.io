// ============ STATE ============
let LANG = "ko";
let isLoggedIn = false;
let myPoints = 84200;
let currentView = "detail";
let activeDetailKey = "main";

function getDetailBundle() {
  return DETAIL_BUNDLES[activeDetailKey] || DETAIL_BUNDLES.main;
}

function selectExploreDetail(key) {
  activeDetailKey = key in DETAIL_BUNDLES ? key : "main";
  applyI18n();
  showView("detail");
}
let watchStep = 1;
let selectedProduct = null;
let selectedPay = null;
let rtInterval = null;
let activeProfileTab = "profile";
const TEST_ACCOUNT = {
  email: "reviewer@mypick.app",
  password: "MyPick!2026",
  name: "PG Tester"
};
const HEAVENLY_RAW = [
  {
    id: 1111,
    title: "여군동 : 되돌린 운명",
    openAt: "2026-05-07T05:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/ko/15016056177310822577-20260511003641.jpg",
    description: "흥조의 5 황자 은기는 절친한 벗이었던 탑이한의 왕자 배연지의 배신으로 죽음을 맞이하지만, 3년 전 변방으로 떠나기 전으로 회귀한다. 은기는 전생의 비극을 되풀이하지 않기 위해 배연지를 경계하지만, 자신에게 다정한 그에게 자꾸만 흔들리는데….",
  },
  {
    id: 1112,
    title: "시선 : 내가 너를 바라볼 때",
    openAt: "2026-05-07T05:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/ko/9289376324815718378-20260511003627.jpg",
    description: "재활치료사 리유언은 아픈 동생 리유쓰의 치료비를 마련하기 위해 고군분투하던 중, 테니스 클럽팀 주치의 면접을 계기로 테니스 선수 자이추위와 만나게 된다. 자이추위는 리유언에게 거액의 조건을 내걸며 은밀한 전담 재활치료사 계약을 제안하고 리유언은 현실과 원칙 사이에서 갈등하는데….",
  },
  {
    id: 1104,
    title: "Flower Boy : 향기에 홀린 소년",
    openAt: "2026-04-22T03:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/ko/3127675377108175193-20260427030106.jpg",
    description: "냉혹하면서도 자유로운 CEO가 무너져가는 회사를 구하기 위해, 희귀한 ‘꽃 부족’ 출신의 아름다운 청년을 붙잡아 혁신적인 향수를 만들려 한다. 하지만 그가 풍기는 향기는 진정한 사랑의 순간에만 가장 강렬하게 피어난다. 이 비밀을 이용하기로 결심한 CEO는 그 청년의 마음을 훔치기 위해 음모를 꾸미지만, 그 뒤에는 한 가지의 진실이 숨겨져 있는데...",
  },
  {
    id: 1099,
    title: "페이크 팩트 립스",
    openAt: "2026-04-15T03:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/en/4565530415751369304-20260424053637.jpg",
    description: "이날 우리가 살아오면서 가장 멍청한 승부가 시작됐다. 고등학교 시절부터 라이벌로서 경쟁해 온 료와 젠. 직장인이 되어 같은 회사에서 재회해도, 승부욕을 계속해서 발휘한 그들은 어떠한 일을 계기로 「먼저 반하게 한 쪽이 승리」라는 물러설 수 없는 새로운 승부를 겨루게 되는데……?",
  },
  {
    id: 1096,
    title: "Fourever You Part 2",
    openAt: "2026-04-06T03:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/ko/1774050815668496237-20260414030344.jpg",
    description: "4년 만에 우연히 다시 마주한 푼과 파. 차마 밝힐 수 없는 비밀 때문에, 푼은 파를 밀어내기 위해 모진 말만 내뱉는다. 하지만 같은 학교에서 계속 마주치는 두 사람— 자신을 숨긴 채 ‘다른 사람’이 된 것처럼 선물로 진심을 전하기 시작한다. 그 사실을 전혀 모르는 파, 두 사람의 감정은 어디로 향하게 될까?",
  },
  {
    id: 1095,
    title: "스모키 블루의 비 내린 뒤 맑음",
    openAt: "2026-04-06T03:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/en/13312822614641726346-20260406082736.jpg",
    description: "일에 지쳐 현재는 무직인 사쿠타로와, 현재는 의료 번역가인 쿠지. 8년 전에는, 제약회사의 동기로서 MR의 영업 실적 1위를 두고 다투던 라이벌 사이로, 쿠지의 퇴사일에 단 한 번 함께 밤을 보낸 두 사람. 8년 전에 덮어둔 한 번의 관계가 갑작스러운 재회로 인해 두 사람의 인생을 움직이기 시작한다. 부모의 노화나 죽음, 일의 보람, 누군가와 살아갈 것인지, 혼자 살아갈 것인지, 나이를 먹어가기에 보이기 시작하는 세계나 감정도 있는 그대로 공유해 가는, 38세인 두 명의 삶의 방식.",
  },
  {
    id: 1084,
    title: "니적심사영재아적미간 : 나의 눈빛에 비친 너의 마음",
    openAt: "2026-03-27T03:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/en/15562135549383364530-20260511004039.jpg",
    description: "법대 신입생인 위레이는 차갑고 까칠한 동기 천커가 영 마음에 들지 않는다. 게다가 우상인 사촌 누나 장한이 천커에게 호감을 보이자 그를 라이벌로 여기며 두 사람 사이를 방해하기 시작한다. 그러나 함께 시간을 보내며 천커를 오해했다는 걸 깨달은 위레이는 어느새 그에게 설렘을 느끼는데...",
  },
  {
    id: 1081,
    title: "Wishing Upon the Shooting Stars",
    openAt: "2026-03-23T09:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/en/15867651056823171029-20260410075819.jpg",
    description: "도시에서 실패를 겪고 좌절한 허상융은 고향으로 돌아온 그날 밤, 유성을 보며 더는 허상융으로 살고 싶지 않다고 소원을 빈다. 그리고 다음 날, 소원이 이루어져 아무도 그를 알아보지 못하게 된다. 허상융은 친구인 리완저의 도움으로 '중샤오유'라는 새로운 신분으로 생활한다. 한편, 과거 허상융과 친구였던 천하오웨이는 중샤오유에게서 왠지 모를 낯설지만 익숙한 느낌을 받는데…",
  },
  {
    id: 1073,
    title: "네 원수를 잊지 마라",
    openAt: "2026-03-11T03:00:00Z",
    ratingSystem: "PG18",
    image: "https://image.heavenly.tv/content/ko/9042791802891554916-20260504042825.jpg",
    description: "어젯밤까지 평범한 19살이었는데, 눈 떠보니 나는 스물아홉이 되어 있었다. 게다가 평생의 원수 여새벽이 7년 동안 내 연인이었다고? 기억은 10년째 비어 있고, 정체 모를 협박 편지, 단순한 사고가 아닌 교통사고의 진실까지 드러난다. 사라진 기억과 숨겨진 집착 속에서, 잊어버린 과거를 믿을 것인가, 아니면 지금의 심장을 믿을 것인가. 철천지원수에서 연인이 된 두 남자의 달콤하고 위험한 기억상실 BL 로맨틱 코미디.",
  }
];

// ============ I18N ============
function t(key) { return T[LANG][key] ?? key; }
function tx(obj) { return obj[LANG] ?? obj.ko ?? obj.en; }

function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (T[LANG][key]) el.textContent = T[LANG][key];
  });
  // Re-render dynamic content
  renderHero();
  renderScenes();
  renderSafeLatest();
  renderQuotes();
  renderCast();
  renderReviewsPreview();
  renderExplore();
  renderTrending("today");
  renderGenres();
  renderLibrary("watching");
  renderRatingBars();
  renderReviewsFeed();
  renderPointsTab("earn");
  if (currentView === "profile") renderProfileTab(activeProfileTab);
}

// ============ INIT ============
document.addEventListener("DOMContentLoaded", () => {
  bindGlobal();
  applyI18n();
  startRealtime();
  // Default view
  showView("detail");
});

// ============ ROUTING ============
const LOGIN_REQUIRED_VIEWS = new Set(["library", "share"]);

function showView(name) {
  if (LOGIN_REQUIRED_VIEWS.has(name) && !isLoggedIn) {
    window._pendingRoute = name;
    openAuth("login");
    toast(LANG === "ko" ? "로그인 후 이용할 수 있습니다." : "Please sign in to continue.");
    return;
  }

  currentView = name;
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const target = document.getElementById("view-" + name);
  if (target) target.classList.add("active");
  window.scrollTo({ top: 0, behavior: "instant" });

  if (name === "explore") renderExplore();
  if (name === "trending") renderTrending("today");
  if (name === "genre") renderGenres();
  if (name === "library") renderLibrary("watching");
  if (name === "reviews") renderReviewsFeed();
  if (name === "share") { animateBalance(); renderPointsTab("earn"); }
  if (name === "profile") renderProfileTab(activeProfileTab);
}

// ============ HERO / DETAIL ============
function renderHero() {
  const b = getDetailBundle();
  document.getElementById("heroBg").style.background = b.content.heroImage;
  document.getElementById("heroTitle").textContent = tx(b.content.title);
  const metaEl = document.getElementById("heroMeta");
  if (b.useI18nHero) {
    document.getElementById("heroDesc").textContent = t("hero_desc");
    document.getElementById("synopsis").textContent = t("synopsis");
    if (metaEl) {
      metaEl.innerHTML = `<span class="rating">★ 4.9</span><span>·</span><span><span data-i18n="reviews_n">${t("reviews_n")}</span> 164</span><span>·</span><span data-i18n="age_15">${t("age_15")}</span><span>·</span><span data-i18n="lang_subs">${t("lang_subs")}</span>`;
    }
    const badge2 = document.querySelector(".hero-tags .badge:not(.badge-hot)");
    if (badge2) {
      badge2.setAttribute("data-i18n", "badge_meta");
      badge2.textContent = t("badge_meta");
    }
  } else {
    document.getElementById("heroDesc").textContent = tx(b.heroDesc);
    document.getElementById("synopsis").textContent = tx(b.synopsis);
    if (metaEl) {
      metaEl.innerHTML = `<span class="rating">★ ${b.heroMeta.rating}</span><span>·</span><span>${t("reviews_n")} ${b.heroMeta.reviewCount}</span><span>·</span><span>${tx(b.heroMeta.ageLabel)}</span><span>·</span><span>${tx(b.heroMeta.subsLabel)}</span>`;
    }
    const badge2 = document.querySelector(".hero-tags .badge:not(.badge-hot)");
    if (badge2) {
      badge2.removeAttribute("data-i18n");
      badge2.textContent = tx(b.badgeMeta);
    }
  }
}

function renderScenes() {
  const scenes = getDetailBundle().scenes;
  document.getElementById("scenesGrid").innerHTML = scenes.map((s, i) => `
    <div class="scene-card" style="background:${s.color}" data-idx="${i}">
      <div class="scene-play">▶</div>
      <div class="scene-info">
        <div class="scene-title">${tx(s.title)}</div>
        <div class="scene-time">${s.time}</div>
      </div>
    </div>`).join("");
  document.querySelectorAll("#scenesGrid .scene-card").forEach(c =>
    c.addEventListener("click", () => openTrailer()));
}

function renderSafeLatest() {
  const grid = document.getElementById("safeGrid");
  if (!grid) return;
  const list = HEAVENLY_RAW
    .filter(item => (item.ratingSystem || "").toUpperCase() !== "PG18")
    .sort((a, b) => new Date(b.openAt) - new Date(a.openAt));

  if (!list.length) {
    grid.innerHTML = `<div class="safe-empty">${
      LANG === "ko"
        ? "최신 카탈로그 항목은 모두 19세 이상(PG18)으로 확인되어 현재 표시 가능한 항목이 없습니다."
        : "All latest catalog items are rated PG18, so no eligible items are currently available."
    }</div>`;
    return;
  }

  grid.innerHTML = list.map(item => `
    <article class="safe-card">
      <img class="safe-thumb" src="${item.image}" alt="${item.title}" loading="lazy">
      <div class="safe-body">
        <h3 class="safe-title">${item.title}</h3>
        <div class="safe-meta">OPEN ${new Date(item.openAt).toISOString().slice(0, 10)} · ${item.ratingSystem}</div>
        <p class="safe-desc">${item.description}</p>
      </div>
    </article>
  `).join("");
}

function renderQuotes() {
  const QUOTES = getDetailBundle().quotes;
  document.getElementById("quotes").innerHTML = QUOTES.map(q => `
    <blockquote class="quote">
      <p>"${tx(q.text)}"</p>
      <cite>— ${tx(q.who)}</cite>
    </blockquote>`).join("");
}

function renderCast() {
  const CAST = getDetailBundle().cast;
  document.getElementById("castRow").innerHTML = CAST.map(c => `
    <div class="cast-item">
      <div class="cast-avatar">${c.emoji}</div>
      <div class="cast-name">${tx(c.name)}</div>
      <div class="cast-role">${tx(c.role)}</div>
    </div>`).join("");
}

function renderReviewsPreview() {
  const REVIEWS = getDetailBundle().reviews;
  if (!REVIEWS.length) {
    document.getElementById("reviewsPreview").innerHTML = `<div class="empty">${
      LANG === "ko"
        ? "이 작품의 리뷰는 앱에서 확인하시거나 고객센터(cs@hellolive.tv)로 문의해 주세요."
        : "View reviews in the app or contact cs@hellolive.tv."
    }</div>`;
    return;
  }
  document.getElementById("reviewsPreview").innerHTML = REVIEWS.slice(0, 4).map(r => reviewCardHTML(r)).join("");
  bindReviewClicks("#reviewsPreview");
}

function reviewCardHTML(r) {
  return `
    <div class="review-card" data-user="${r.user}">
      <div class="review-head">
        <div class="reviewer">
          <div class="r-avatar">${r.country}</div>
          <div>
            <div class="r-name">${r.user} ${r.verified ? '<span class="vrf">✅</span>' : ''}</div>
            <div class="r-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)} <span class="r-date">${r.date}</span></div>
          </div>
        </div>
      </div>
      <div class="review-title">${tx(r.title)}</div>
      <div class="review-body">${tx(r.body)}</div>
      ${r.photo ? `<div class="review-photo" style="background:linear-gradient(135deg,#3a1c5e,#8b3a8a)"></div>` : ''}
      <div class="review-foot">
        <button class="like-btn">👍 ${r.likes}</button>
        <button class="like-btn">💬</button>
        <button class="like-btn">🚩</button>
      </div>
    </div>`;
}

function bindReviewClicks(scope) {
  document.querySelectorAll(`${scope} .review-card`).forEach(c => {
    c.addEventListener("click", e => {
      if (e.target.tagName === "BUTTON") return;
      openReviewerProfile(c.dataset.user);
    });
  });
}

function renderRelated() {
  document.getElementById("relatedGrid").innerHTML = EXPLORE_CONTENT.slice(1, 7).map((r, i) => `
    <div class="related-card" data-idx="${i}">
      <div class="related-thumb" style="background:${r.color}">
        <div class="related-rating">★ ${r.rating}</div>
      </div>
      <div class="related-info">
        <div class="related-title">${tx(r.title)}</div>
        <div class="related-genre">${tx(r.genre)} · ${r.year}</div>
      </div>
    </div>`).join("");
  document.querySelectorAll("#relatedGrid .related-card").forEach(c =>
    c.addEventListener("click", () => openRelatedDetail(parseInt(c.dataset.idx) + 1)));
}

// ============ EXPLORE ============
function renderExplore() {
  const genres = ["All", ...new Set(EXPLORE_CONTENT.map(c => tx(c.genre)))];
  document.getElementById("exploreGenres").innerHTML = genres.map((g, i) =>
    `<button class="chip ${i===0?'active':''}" data-genre="${g}">${g === "All" ? (LANG==="ko"?"전체":"All") : g}</button>`).join("");
  document.querySelectorAll("#exploreGenres .chip").forEach(c => {
    c.addEventListener("click", () => {
      document.querySelectorAll("#exploreGenres .chip").forEach(x => x.classList.remove("active"));
      c.classList.add("active");
      filterExplore(c.dataset.genre);
    });
  });
  filterExplore("All");
}

function filterExplore(genre) {
  const list = genre === "All" ? EXPLORE_CONTENT : EXPLORE_CONTENT.filter(c => tx(c.genre) === genre);
  document.getElementById("exploreGrid").innerHTML = list.map(c => `
    <div class="grid-card" onclick="selectExploreDetail('${c.detailKey || "main"}')">
      <div class="grid-thumb" style="${c.poster ? `background-image:url('${c.poster}'); background-size:cover; background-position:center;` : `background:${c.color}` }">
        <div class="related-rating">★ ${c.rating}</div>
      </div>
      <div class="grid-title">${tx(c.title)}</div>
      <div class="grid-meta">${tx(c.genre)} · ${c.year}</div>
    </div>`).join("");
}

function goToContent() { selectExploreDetail("main"); }

// ============ TRENDING ============
function renderTrending(period) {
  document.querySelectorAll("[data-trending]").forEach(b =>
    b.classList.toggle("active", b.dataset.trending === period));
  const items = EXPLORE_CONTENT.slice(0, 10);
  document.getElementById("rankList").innerHTML = items.map((c, i) => `
    <div class="rank-item" onclick="selectExploreDetail('main')">
      <div class="rank-num">${i+1}</div>
      <div class="rank-thumb" style="background:${c.color}"></div>
      <div class="rank-info">
        <div class="rank-title">${tx(c.title)}</div>
        <div class="rank-meta">${tx(c.genre)} · ${c.year} · ★ ${c.rating}</div>
        <div class="rank-bar"><div class="rank-bar-fill" style="width:${100 - i*7}%"></div></div>
      </div>
      <div class="rank-trend">${i < 3 ? '🔥' : (i % 2 ? '↑' : '→')}</div>
    </div>`).join("");
}

// ============ GENRE ============
function renderGenres() {
  document.getElementById("genreGrid").innerHTML = GENRES.map(g => `
    <div class="genre-card" style="background:${g.color}" onclick="showView('explore')">
      <div class="genre-emoji">${g.emoji}</div>
      <div class="genre-name">${tx(g.name)}</div>
      <div class="genre-count">${g.count} ${LANG==="ko"?"작품":"titles"}</div>
    </div>`).join("");
}

// ============ LIBRARY ============
function renderLibrary(tab) {
  document.querySelectorAll("[data-lib]").forEach(b => b.classList.toggle("active", b.dataset.lib === tab));
  const body = document.getElementById("libraryBody");
  if (tab === "watching") {
    const items = EXPLORE_CONTENT.slice(0, 4);
    body.innerHTML = `<div class="grid-large">${items.map((c, i) => `
      <div class="grid-card" onclick="goToContent()">
        <div class="grid-thumb" style="background:${c.color}">
          <div class="lib-progress"><div style="width:${[34,72,12,88][i]}%"></div></div>
        </div>
        <div class="grid-title">${tx(c.title)}</div>
        <div class="grid-meta">EP ${[3,6,1,8][i]} · ${[34,72,12,88][i]}% ${LANG==="ko"?"시청":"watched"}</div>
      </div>`).join("")}</div>`;
  } else if (tab === "purchased") {
    const items = EXPLORE_CONTENT.slice(2, 8);
    body.innerHTML = `<div class="grid-large">${items.map(c => `
      <div class="grid-card" onclick="goToContent()">
        <div class="grid-thumb" style="background:${c.color}"><div class="related-rating">${LANG==="ko"?"보유":"OWNED"}</div></div>
        <div class="grid-title">${tx(c.title)}</div>
        <div class="grid-meta">${LANG==="ko"?"구매일":"Purchased"} 2024.12.${10+Math.floor(Math.random()*15)}</div>
      </div>`).join("")}</div>`;
  } else if (tab === "wishlist") {
    const items = EXPLORE_CONTENT.slice(4, 10);
    body.innerHTML = `<div class="grid-large">${items.map(c => `
      <div class="grid-card" onclick="goToContent()">
        <div class="grid-thumb" style="background:${c.color}"><div class="related-rating">★ ${c.rating}</div></div>
        <div class="grid-title">${tx(c.title)}</div>
        <div class="grid-meta">${tx(c.genre)} · ${c.year}</div>
      </div>`).join("")}</div>`;
  } else {
    const items = EXPLORE_CONTENT.slice(0, 6);
    body.innerHTML = `<div class="history-list">${items.map((c, i) => `
      <div class="history-row" onclick="goToContent()">
        <div class="rank-thumb" style="background:${c.color}"></div>
        <div class="rank-info">
          <div class="rank-title">${tx(c.title)}</div>
          <div class="rank-meta">EP ${[1,3,5,2,8,4][i]} · ${LANG==="ko"?"마지막 시청":"Last watched"} 2025.01.${15-i}</div>
        </div>
        <button class="like-btn">▶ ${LANG==="ko"?"이어보기":"Resume"}</button>
      </div>`).join("")}</div>`;
  }
}

// ============ REVIEWS PAGE ============
function renderRatingBars() {
  const RATING_DIST = getDetailBundle().ratingDist;
  const total = RATING_DIST.reduce((a,b)=>a+b,0);
  if (!total) {
    document.getElementById("ratingBars").innerHTML = `<div class="empty">${LANG === "ko" ? "표시할 평점 분포가 없습니다." : "No rating distribution to show."}</div>`;
    return;
  }
  document.getElementById("ratingBars").innerHTML = RATING_DIST.map((n, i) => {
    const star = 5 - i;
    const pct = (n / total * 100).toFixed(1);
    return `<div class="bar-row">
      <span class="bar-label">${star}★</span>
      <div class="bar-track"><div class="bar-fill" style="width:${pct}%"></div></div>
      <span class="bar-pct">${pct}%</span>
    </div>`;
  }).join("");
}

function renderReviewsFeed() {
  const tab = document.querySelector(".rv-tab.active")?.dataset.rvTab || "all";
  const sort = document.getElementById("rvSort")?.value || "like";
  const search = (document.getElementById("rvSearch")?.value || "").toLowerCase();
  let list = getDetailBundle().reviews.slice();
  if (tab === "photo") list = list.filter(r => r.photo);
  if (tab === "spoiler") list = list.filter(r => !r.spoiler);
  if (tab === "verified") list = list.filter(r => r.verified);
  if (search) list = list.filter(r => (tx(r.title)+tx(r.body)+r.user).toLowerCase().includes(search));
  if (sort === "like") list.sort((a,b)=>b.likes-a.likes);
  if (sort === "latest") list.sort((a,b)=>b.date.localeCompare(a.date));
  if (sort === "high") list.sort((a,b)=>b.rating-a.rating);
  if (sort === "low") list.sort((a,b)=>a.rating-b.rating);

  document.getElementById("reviewsFeed").innerHTML = list.length
    ? list.map(reviewCardHTML).join("")
    : `<div class="empty">${LANG==="ko"?"검색 결과가 없습니다":"No results"}</div>`;
  bindReviewClicks("#reviewsFeed");
}

// ============ POINTS PAGE ============
function animateBalance() {
  const el = document.getElementById("balanceNum");
  let cur = 0;
  const target = myPoints;
  const step = Math.ceil(target / 60);
  clearInterval(window._balAnim);
  window._balAnim = setInterval(() => {
    cur += step;
    if (cur >= target) { cur = target; clearInterval(window._balAnim); }
    el.textContent = cur.toLocaleString();
  }, 16);
}

function renderPointsTab(tab) {
  document.querySelectorAll("[data-pts-tab]").forEach(b => b.classList.toggle("active", b.dataset.ptsTab === tab));
  const body = document.getElementById("ptsBody");
  if (tab === "earn") {
    body.innerHTML = `<div class="pts-list">${POINTS_EARN.map(p => `
      <div class="pts-row earn">
        <div class="pts-icon">📈</div>
        <div class="pts-info">
          <div class="pts-source">${tx(p.source)}</div>
          <div class="pts-detail">${tx(p.detail)}</div>
          <div class="pts-date">${p.date}</div>
        </div>
        <div class="pts-amt earn">+${p.amount.toLocaleString()}P</div>
      </div>`).join("")}</div>`;
  } else if (tab === "use") {
    body.innerHTML = `<div class="pts-list">${POINTS_USE.map(p => `
      <div class="pts-row use">
        <div class="pts-icon">📉</div>
        <div class="pts-info">
          <div class="pts-source">${tx(p.source)}</div>
          <div class="pts-detail">${tx(p.detail)}</div>
          <div class="pts-date">${p.date}</div>
        </div>
        <div class="pts-amt use">${p.amount.toLocaleString()}P</div>
      </div>`).join("")}</div>`;
  } else if (tab === "rank") {
    body.innerHTML = `<div class="rank-list">${FRIEND_RANK.map(f => `
      <div class="rank-item ${f.you?'me':''}">
        <div class="rank-num ${f.rank<=3?'gold':''}">${f.rank}</div>
        <div class="rank-thumb small" style="background:linear-gradient(135deg,#3a3a5e,#6a6aa8);display:flex;align-items:center;justify-content:center;font-size:24px">${f.country}</div>
        <div class="rank-info">
          <div class="rank-title">${f.name}</div>
          <div class="rank-meta">${f.points.toLocaleString()} P</div>
        </div>
        ${f.rank===1?'<div class="rank-trend">👑</div>':''}
      </div>`).join("")}</div>`;
  } else {
    body.innerHTML = `<div class="how-grid">
      <div class="how-card"><div class="how-icon">🔗</div><h4>${LANG==="ko"?"링크 클릭":"Link Click"}</h4><p>${LANG==="ko"?"내 링크 클릭당 5P 적립":"Earn 5P per click on your link"}</p><strong>+5P</strong></div>
      <div class="how-card"><div class="how-icon">💳</div><h4>${LANG==="ko"?"결제 발생":"Purchase"}</h4><p>${LANG==="ko"?"결제 금액의 10% 적립":"10% of payment amount"}</p><strong>+10%</strong></div>
      <div class="how-card"><div class="how-icon">👥</div><h4>${LANG==="ko"?"친구 가입":"Friend Signup"}</h4><p>${LANG==="ko"?"내 링크로 친구가 가입 시":"When friend signs up via your link"}</p><strong>+1,000P</strong></div>
      <div class="how-card"><div class="how-icon">📝</div><h4>${LANG==="ko"?"리뷰 작성":"Write Review"}</h4><p>${LANG==="ko"?"승인된 리뷰 1건당":"Per approved review"}</p><strong>+100P</strong></div>
      <div class="how-card"><div class="how-icon">🌐</div><h4>${LANG==="ko"?"자막 기여":"Subtitle Contribution"}</h4><p>${LANG==="ko"?"승인된 자막 1편당":"Per approved subtitle"}</p><strong>+5,000P</strong></div>
      <div class="how-card"><div class="how-icon">🗓️</div><h4>${LANG==="ko"?"출석 보너스":"Daily Check-in"}</h4><p>${LANG==="ko"?"7일 연속 시":"7-day streak"}</p><strong>+500P</strong></div>
    </div>`;
  }
}

// Realtime feed (every 4-9s)
function startRealtime() {
  if (rtInterval) clearInterval(rtInterval);
  pushRealtime();
  rtInterval = setInterval(pushRealtime, 6000);
}

function pushRealtime() {
  const tpl = RT_TEMPLATES[Math.floor(Math.random() * RT_TEMPLATES.length)];
  const msg = tpl[LANG];
  const feed = document.getElementById("rtFeed");
  if (feed) {
    const row = document.createElement("div");
    row.className = "rt-row";
    row.innerHTML = `<span>${msg}</span><span class="rt-time">${LANG==="ko"?"방금 전":"just now"}</span>`;
    feed.prepend(row);
    while (feed.children.length > 6) feed.removeChild(feed.lastChild);
  }
  // Bonus point trickle
  const bonus = [5, 5, 100, 290, 490, 790, 990][Math.floor(Math.random()*7)];
  myPoints += bonus;
  document.getElementById("pmPoints").textContent = myPoints.toLocaleString() + " P";
  if (currentView === "share") {
    const el = document.getElementById("balanceNum");
    if (el) el.textContent = myPoints.toLocaleString();
  }
  // popup notification only on share view
  if (currentView === "share") showRtNotify(msg);
}

function showRtNotify(msg) {
  const n = document.getElementById("rtNotify");
  n.textContent = msg;
  n.classList.remove("hidden");
  clearTimeout(window._rtNotify);
  window._rtNotify = setTimeout(() => n.classList.add("hidden"), 3500);
}

// ============ AUTH ============
function openAuth(tab) {
  openModal("authModal");
  setAuthTab(tab);
  document.querySelectorAll(".auth-tabs .tab").forEach(t => {
    t.onclick = () => setAuthTab(t.dataset.tab);
  });
}

function setAuthTab(tab) {
  document.querySelectorAll(".auth-tabs .tab").forEach(t => t.classList.toggle("active", t.dataset.tab === tab));
  const body = document.getElementById("authBody");
  if (tab === "login") {
    body.innerHTML = `
      <input type="email" id="loginEmail" placeholder="${LANG==="ko"?"이메일":"Email"}" value="${TEST_ACCOUNT.email}">
      <input type="password" id="loginPassword" placeholder="${LANG==="ko"?"비밀번호":"Password"}">
      <button class="btn-primary full" onclick="doLogin()">${t("btn_login")}</button>
      <p class="legal">${LANG==="ko"
        ? `테스트 계정: ${TEST_ACCOUNT.email} / ${TEST_ACCOUNT.password}`
        : `Test account: ${TEST_ACCOUNT.email} / ${TEST_ACCOUNT.password}`}</p>
      <div class="social-row">
        <button class="social" onclick="toast(LANG==='ko' ? '테스트 계정 로그인을 사용해 주세요' : 'Use test account login')">G  Google</button>
        <button class="social" onclick="toast(LANG==='ko' ? '테스트 계정 로그인을 사용해 주세요' : 'Use test account login')">  Apple</button>
        <button class="social" onclick="toast(LANG==='ko' ? '테스트 계정 로그인을 사용해 주세요' : 'Use test account login')">K  Kakao</button>
      </div>`;
  } else {
    body.innerHTML = `
      <input type="email" placeholder="${LANG==="ko"?"이메일":"Email"}">
      <input type="password" placeholder="${LANG==="ko"?"비밀번호":"Password"}">
      <input type="text" placeholder="${LANG==="ko"?"닉네임":"Nickname"}">
      <button class="btn-primary full" onclick="doLogin()">${t("btn_signup")}</button>
      <p class="legal">${LANG==="ko"?"가입 시 이용약관 및 개인정보처리방침에 동의합니다.":"By signing up, you agree to our Terms and Privacy."}</p>`;
  }
}

function doLogin() {
  const emailInput = document.getElementById("loginEmail");
  const pwInput = document.getElementById("loginPassword");
  if (emailInput && pwInput) {
    const email = emailInput.value.trim().toLowerCase();
    const password = pwInput.value;
    const isValid = email === TEST_ACCOUNT.email.toLowerCase() && password === TEST_ACCOUNT.password;
    if (!isValid) {
      toast(LANG==="ko" ? "테스트 계정 정보가 일치하지 않습니다." : "Invalid test account credentials.");
      return;
    }
  }

  isLoggedIn = true;
  closeModal("authModal");
  document.getElementById("btnLogin").classList.add("hidden");
  document.getElementById("btnSignup").classList.add("hidden");
  document.getElementById("profileWrap").classList.remove("hidden");
  document.getElementById("pmName").textContent = TEST_ACCOUNT.name;
  const pmEmail = document.querySelector(".pm-email");
  if (pmEmail) pmEmail.textContent = TEST_ACCOUNT.email;
  const sideName = document.querySelector(".ps-name");
  if (sideName) sideName.textContent = TEST_ACCOUNT.name;
  const sideEmail = document.querySelector(".ps-email");
  if (sideEmail) sideEmail.textContent = TEST_ACCOUNT.email;
  document.getElementById("pmPoints").textContent = myPoints.toLocaleString() + " P";
  toast(LANG==="ko"?"✅ 환영합니다!":"✅ Welcome!");
  // continue watch flow if pending
  if (window._pendingWatch) {
    window._pendingWatch = false;
    setTimeout(openWatchFlow, 500);
  } else if (window._pendingRoute) {
    const next = window._pendingRoute;
    window._pendingRoute = null;
    setTimeout(() => showView(next), 100);
  }
}

function doLogout() {
  window._pendingRoute = null;
  isLoggedIn = false;
  document.getElementById("btnLogin").classList.remove("hidden");
  document.getElementById("btnSignup").classList.remove("hidden");
  document.getElementById("profileWrap").classList.add("hidden");
  document.getElementById("profileMenu").classList.add("hidden");
  document.getElementById("pmName").textContent = "Guest User";
  const pmEmail = document.querySelector(".pm-email");
  if (pmEmail) pmEmail.textContent = "user@mypick.app";
  const sideName = document.querySelector(".ps-name");
  if (sideName) sideName.textContent = "Guest User";
  const sideEmail = document.querySelector(".ps-email");
  if (sideEmail) sideEmail.textContent = "user@mypick.app";
  showView("detail");
  toast(LANG==="ko"?"로그아웃되었습니다":"Signed out");
}

// ============ WATCH FLOW ============
function tryWatch() {
  if (!isLoggedIn) {
    window._pendingWatch = true;
    openAuth("login");
  } else {
    openWatchFlow();
  }
}

function openWatchFlow() {
  watchStep = 1;
  selectedProduct = null;
  selectedPay = null;
  openModal("watchModal");
  setStepper(1);
  renderWatchStep();
}

function setStepper(n) {
  document.querySelectorAll("#stepper .step").forEach((el, i) => {
    el.classList.toggle("active", i+1 <= n);
    el.classList.toggle("done", i+1 < n);
  });
}

function renderWatchStep() {
  const body = document.getElementById("watchBody");
  if (watchStep === 1) {
    body.innerHTML = `
      <h2 class="ws-title">${LANG==="ko"?"화질과 시청 기간을 선택하세요":"Choose quality and rental period"}</h2>
      <p class="ws-sub">${LANG==="ko"?"단건 결제로 부담 없이 시청하세요":"Pay-per-view, no commitment"}</p>
      <div class="product-grid">
        ${PRODUCTS.map(p => `
          <div class="product-card" data-pid="${p.id}">
            ${p.badge ? `<span class="prod-badge">${tx(p.badge)}</span>` : ''}
            <div class="prod-quality">${p.quality}</div>
            <div class="prod-res">${p.res}</div>
            <div class="prod-period">${p.days === -1 ? (LANG==="ko"?"영구 소장":"Own forever") : (p.days + (LANG==="ko"?"일 시청":" days"))}</div>
            <div class="prod-price">₩${p.price.toLocaleString()}</div>
          </div>`).join("")}
      </div>
      <div class="ws-actions">
        <button class="btn-secondary" onclick="closeModal('watchModal')">${LANG==="ko"?"취소":"Cancel"}</button>
        <button class="btn-primary" id="ws1Next" disabled>${LANG==="ko"?"다음":"Next"}</button>
      </div>`;
    document.querySelectorAll(".product-card").forEach(c => {
      c.addEventListener("click", () => {
        document.querySelectorAll(".product-card").forEach(x => x.classList.remove("selected"));
        c.classList.add("selected");
        selectedProduct = PRODUCTS.find(p => p.id === c.dataset.pid);
        document.getElementById("ws1Next").disabled = false;
      });
    });
    document.getElementById("ws1Next").addEventListener("click", () => { watchStep=2; setStepper(2); renderWatchStep(); });
  }
  else if (watchStep === 2) {
    const p = selectedProduct;
    body.innerHTML = `
      <h2 class="ws-title">${LANG==="ko"?"결제수단을 선택하세요":"Select payment method"}</h2>
      <div class="order-summary">
        <div>
          <div class="os-title">${tx(getDetailBundle().content.title)}</div>
          <div class="os-sub">${p.quality} · ${p.days === -1 ? (LANG==="ko"?"영구 소장":"Own") : p.days + (LANG==="ko"?"일":"d")} · ${p.res}</div>
        </div>
        <div class="os-price">₩${p.price.toLocaleString()}</div>
      </div>
      <div class="pay-grid">
        ${PAY_METHODS.map(m => `
          <div class="pay-card" data-pid="${m.id}">
            <div class="pay-icon">${m.icon}</div>
            <div class="pay-info">
              <div class="pay-name">${tx(m.name)}</div>
              <div class="pay-desc">${tx(m.desc)}</div>
            </div>
            <div class="pay-radio"></div>
          </div>`).join("")}
      </div>
      <label class="agree"><input type="checkbox" id="agreeChk"> ${LANG==="ko"?"주문 내용을 확인했으며, 아래 내용에 모두 동의합니다":"I have reviewed my order and agree to all items below."}</label>
      <ul class="agree-detail">
        <li>${LANG==="ko" ? "구매 조건, 결제금액, 결제수단, 주문자 정보를 확인했습니다." : "I have confirmed purchase terms, amount, payment method, and buyer details."}</li>
        <li>${LANG==="ko" ? "디지털 콘텐츠 특성상 시청 시작 후에는 환불이 제한될 수 있음에 동의합니다." : "I understand refunds may be limited once playback starts for digital content."}</li>
        <li>${LANG==="ko" ? "결제 진행을 위해 필요한 개인정보 제공 및 위탁에 동의합니다." : "I agree to required personal data sharing/processing for payment."}</li>
      </ul>
      <div class="ws-actions">
        <button class="btn-secondary" onclick="watchStep=1; setStepper(1); renderWatchStep();">${LANG==="ko"?"이전":"Back"}</button>
        <button class="btn-primary" id="ws2Next" disabled>${LANG==="ko"?"₩":""}${p.price.toLocaleString()} ${LANG==="ko"?"결제하기":"Pay now"}</button>
      </div>`;
    const agreeChk = document.getElementById("agreeChk");
    const ws2Next = document.getElementById("ws2Next");
    const updatePayButtonState = () => {
      ws2Next.disabled = !(selectedPay && agreeChk.checked);
    };
    document.querySelectorAll(".pay-card").forEach(c => {
      c.addEventListener("click", () => {
        document.querySelectorAll(".pay-card").forEach(x => x.classList.remove("selected"));
        c.classList.add("selected");
        selectedPay = PAY_METHODS.find(m => m.id === c.dataset.pid);
        updatePayButtonState();
      });
    });
    agreeChk.addEventListener("change", updatePayButtonState);
    ws2Next.addEventListener("click", processPay);
  }
  else if (watchStep === 3) {
    const p = selectedProduct;
    body.innerHTML = `
      <div class="ws-success">
        <div class="success-icon">✅</div>
        <h2>${LANG==="ko"?"결제가 완료되었습니다!":"Payment complete!"}</h2>
        <p>${LANG==="ko"?"바로 시청을 시작할 수 있습니다.":"Start watching right now."}</p>
        <div class="receipt">
          <div><span>${LANG==="ko"?"콘텐츠":"Title"}</span><span>${tx(getDetailBundle().content.title)}</span></div>
          <div><span>${LANG==="ko"?"상품":"Plan"}</span><span>${p.quality} · ${p.days === -1 ? (LANG==="ko"?"영구 소장":"Own") : p.days + (LANG==="ko"?"일":"d")}</span></div>
          <div><span>${LANG==="ko"?"결제수단":"Method"}</span><span>${tx(selectedPay.name)}</span></div>
          <div><span>${LANG==="ko"?"결제금액":"Amount"}</span><strong>₩${p.price.toLocaleString()}</strong></div>
        </div>
        <button class="btn-play big" id="wsPlay">▶ ${LANG==="ko"?"지금 시청하기":"Start Watching"}</button>
      </div>`;
    document.getElementById("wsPlay").addEventListener("click", () => {
      closeModal("watchModal");
      document.getElementById("playerSub").textContent = `DRM · ${p.res} · ${LANG==="ko"?"자막":"Subs"} ON`;
      openModal("playerModal");
    });
  }
}

function processPay() {
  const btn = document.getElementById("ws2Next");
  btn.disabled = true;
  btn.textContent = LANG==="ko"?"결제 처리 중...":"Processing...";
  setTimeout(() => {
    watchStep = 3;
    setStepper(3);
    renderWatchStep();
  }, 1200);
}

// ============ MODALS / DETAIL ============
function openModal(id) { document.getElementById(id).classList.remove("hidden"); }
function closeModal(id) {
  document.getElementById(id).classList.add("hidden");
  if (id === "authModal" && !isLoggedIn) window._pendingRoute = null;
}

function openTrailer() {
  const b = getDetailBundle();
  if (b.trailerYoutubeId) {
    window.open(`https://www.youtube.com/watch?v=${b.trailerYoutubeId}`, "_blank", "noopener,noreferrer");
    return;
  }
  const titleEl = document.querySelector("#trailerModal .player-title");
  if (titleEl) titleEl.textContent = t("trailer_title");
  openModal("trailerModal");
}

function openReviewerProfile(user) {
  const r = getDetailBundle().reviews.find(x => x.user === user);
  if (!r) return;
  document.getElementById("detailBody").innerHTML = `
    <div class="profile-head">
      <div class="r-avatar big">${r.country}</div>
      <div>
        <h2>${r.user} ${r.verified ? '<span class="vrf">✅</span>' : ''}</h2>
        <p>${LANG==="ko"?"리뷰어 · 누적 작성":"Reviewer · Total reviews"} ${10+Math.floor(Math.random()*100)}</p>
      </div>
    </div>
    <hr>
    <h3>${tx(r.title)}</h3>
    <p class="big-text">${tx(r.body)}</p>
    <div class="r-stars big">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
    <p class="muted">${r.date}</p>
    <p class="muted">👍 ${r.likes} ${LANG==="ko"?"명이 도움됨":"helpful"}</p>`;
  openModal("detailModal");
}

function openRelatedDetail(idx) {
  const r = EXPLORE_CONTENT[idx];
  document.getElementById("detailBody").innerHTML = `
    <div class="related-hero" style="background:${r.color}"></div>
    <h2>${tx(r.title)}</h2>
    <p class="muted">${tx(r.genre)} · ${r.year} · ★ ${r.rating}</p>
    <p>${LANG==="ko"?"이 작품도 외부 링크 진입 시 동일한 형태의 상세 페이지가 표시됩니다.":"This title also opens its own detail page when accessed via external link."}</p>
    <p class="note">${LANG==="ko"?"※ 프로토타입에서는 동일 페이지로 통일합니다.":"※ Prototype shows the same template."}</p>
    <button class="btn-play" onclick="closeModal('detailModal'); showView('detail');">${LANG==="ko"?"이 페이지로 이동":"Go to detail"}</button>`;
  openModal("detailModal");
}

// ============ SHARE QUICK / COPY ============
function copyLink() {
  const link = document.getElementById("shareLink");
  link.select();
  try { document.execCommand("copy"); } catch(e) {}
  myPoints += 100;
  document.getElementById("pmPoints").textContent = myPoints.toLocaleString() + " P";
  if (currentView === "share") document.getElementById("balanceNum").textContent = myPoints.toLocaleString();
  toast(LANG==="ko"?"📋 링크 복사 완료! +100P 보너스":"📋 Link copied! +100P bonus");
}

// ============ PROFILE TABS ============
function renderProfileTab(tab) {
  activeProfileTab = tab;
  document.querySelectorAll("#psNav a").forEach(a => a.classList.toggle("active", a.dataset.profile === tab));
  const main = document.getElementById("profileMain");

  const titles = {
    profile: { ko: "내 프로필", en: "My Profile" },
    history: { ko: "시청 기록", en: "Watch History" },
    favorites: { ko: "찜한 콘텐츠", en: "Favorites" },
    purchases: { ko: "구매 내역", en: "Purchases" },
    points: { ko: "포인트", en: "Points" },
    notifications: { ko: "알림 설정", en: "Notifications" },
    account: { ko: "계정 설정", en: "Account Settings" },
    devices: { ko: "기기 관리", en: "Device Manager" },
    help: { ko: "고객센터", en: "Help Center" }
  };

  let html = `<h1 class="pm-title">${tx(titles[tab])}</h1>`;

  if (tab === "profile") {
    html += `
      <div class="form-card">
        <div class="form-row"><label>${LANG==="ko"?"닉네임":"Nickname"}</label><input type="text" value="Guest User"></div>
        <div class="form-row"><label>${LANG==="ko"?"이메일":"Email"}</label><input type="email" value="user@mypick.app" disabled></div>
        <div class="form-row"><label>${LANG==="ko"?"국가":"Country"}</label>
          <select><option>🇰🇷 ${LANG==="ko"?"대한민국":"Korea"}</option><option>🇺🇸 ${LANG==="ko"?"미국":"USA"}</option><option>🇯🇵 ${LANG==="ko"?"일본":"Japan"}</option></select>
        </div>
        <div class="form-row"><label>${LANG==="ko"?"자기소개":"Bio"}</label><textarea rows="3">${LANG==="ko"?"저는 K-드라마와 한국 영화를 사랑합니다.":"I love K-dramas and Korean films."}</textarea></div>
        <button class="btn-primary">${LANG==="ko"?"저장":"Save"}</button>
      </div>`;
  } else if (tab === "history") {
    html += EXPLORE_CONTENT.slice(0, 6).map((c, i) => `
      <div class="history-row" onclick="showView('detail')">
        <div class="rank-thumb" style="background:${c.color}"></div>
        <div class="rank-info">
          <div class="rank-title">${tx(c.title)}</div>
          <div class="rank-meta">EP ${i+1} · ${LANG==="ko"?"마지막 시청":"Last watched"} 2025.01.${15-i}</div>
        </div>
        <button class="like-btn">▶ ${LANG==="ko"?"이어보기":"Resume"}</button>
      </div>`).join("");
  } else if (tab === "favorites") {
    html += `<div class="grid-large">${EXPLORE_CONTENT.slice(2, 8).map(c => `
      <div class="grid-card" onclick="showView('detail')">
        <div class="grid-thumb" style="background:${c.color}"><div class="related-rating">★ ${c.rating}</div></div>
        <div class="grid-title">${tx(c.title)}</div>
        <div class="grid-meta">${tx(c.genre)} · ${c.year}</div>
      </div>`).join("")}</div>`;
  } else if (tab === "purchases") {
    html += `<table class="data-table">
      <tr><th>${LANG==="ko"?"날짜":"Date"}</th><th>${LANG==="ko"?"콘텐츠":"Title"}</th><th>${LANG==="ko"?"상품":"Plan"}</th><th>${LANG==="ko"?"결제수단":"Method"}</th><th>${LANG==="ko"?"금액":"Amount"}</th><th></th></tr>
      <tr><td>2025.01.10</td><td>${tx(EXPLORE_CONTENT[0].title)}</td><td>FHD · 30d</td><td>${LANG==="ko"?"카드":"Card"}</td><td>₩7,900</td><td><button class="like-btn">${LANG==="ko"?"영수증":"Receipt"}</button></td></tr>
      <tr><td>2025.01.05</td><td>${tx(EXPLORE_CONTENT[2].title)}</td><td>HD · 7d</td><td>PayPal</td><td>₩4,900</td><td><button class="like-btn">${LANG==="ko"?"영수증":"Receipt"}</button></td></tr>
      <tr><td>2024.12.28</td><td>${tx(EXPLORE_CONTENT[5].title)}</td><td>4K · ${LANG==="ko"?"영구":"Own"}</td><td>KakaoPay</td><td>₩14,900</td><td><button class="like-btn">${LANG==="ko"?"영수증":"Receipt"}</button></td></tr>
    </table>`;
  } else if (tab === "points") {
    html += `<div class="profile-balance">
      <div>${LANG==="ko"?"보유 포인트":"Balance"}</div>
      <strong>${myPoints.toLocaleString()} P</strong>
      <button class="btn-primary" onclick="showView('share')">${LANG==="ko"?"포인트 대시보드":"Open Dashboard"}</button>
    </div>`;
  } else if (tab === "notifications") {
    const items = LANG==="ko"
      ? [["새로운 콘텐츠 알림","찜한 작품의 신규 에피소드"],["프로모션/할인","멤버십 및 콘텐츠 할인 정보"],["포인트 적립 알림","공유 링크 적립 발생 시"],["이메일 수신","주간 추천 뉴스레터"],["마케팅 푸시","앱 푸시 알림"]]
      : [["New content","New episodes of saved titles"],["Promotions","Discount and event info"],["Points","When you earn from a share link"],["Email","Weekly newsletter"],["Push","App push notifications"]];
    html += `<div class="form-card">${items.map(([t,d],i)=>`
      <div class="toggle-row"><div><div class="tr-t">${t}</div><div class="tr-d">${d}</div></div>
      <label class="switch"><input type="checkbox" ${i<3?'checked':''}><span class="slider"></span></label></div>`).join("")}</div>`;
  } else if (tab === "account") {
    html += `
      <div class="form-card">
        <h3>${LANG==="ko"?"비밀번호 변경":"Change Password"}</h3>
        <div class="form-row"><label>${LANG==="ko"?"현재":"Current"}</label><input type="password"></div>
        <div class="form-row"><label>${LANG==="ko"?"새 비밀번호":"New"}</label><input type="password"></div>
        <button class="btn-primary">${LANG==="ko"?"변경":"Update"}</button>
      </div>
      <div class="form-card">
        <h3>${LANG==="ko"?"2단계 인증":"2-Step Verification"}</h3>
        <div class="toggle-row"><div><div class="tr-t">${LANG==="ko"?"이메일 OTP":"Email OTP"}</div><div class="tr-d">${LANG==="ko"?"로그인 시 인증코드 발송":"Send code on sign-in"}</div></div>
          <label class="switch"><input type="checkbox" checked><span class="slider"></span></label></div>
      </div>
      <div class="form-card danger">
        <h3>${LANG==="ko"?"계정 탈퇴":"Delete Account"}</h3>
        <p>${LANG==="ko"?"탈퇴 후 모든 구매내역 및 포인트는 복구할 수 없습니다.":"All purchases and points will be permanently lost."}</p>
        <button class="btn-danger">${LANG==="ko"?"계정 탈퇴":"Delete account"}</button>
      </div>`;
  } else if (tab === "devices") {
    const devs = LANG==="ko"
      ? [["💻 MacBook Pro","서울, 대한민국","현재 기기"],["📱 iPhone 15","서울, 대한민국","2시간 전"],["📺 Smart TV","서울, 대한민국","어제"],["💻 Windows PC","부산, 대한민국","3일 전"]]
      : [["💻 MacBook Pro","Seoul, KR","Current device"],["📱 iPhone 15","Seoul, KR","2 hours ago"],["📺 Smart TV","Seoul, KR","Yesterday"],["💻 Windows PC","Busan, KR","3 days ago"]];
    html += `<p class="muted">${LANG==="ko"?"동시 시청 가능 기기: 4대":"Concurrent streams: 4"}</p>
      <div class="device-list">${devs.map(([n,l,t],i)=>`
        <div class="device-row"><div class="device-info"><strong>${n}</strong><span>${l} · ${t}</span></div>
        ${i===0?`<span class="badge-current">${LANG==="ko"?"현재":"Current"}</span>`:`<button class="btn-outline">${LANG==="ko"?"로그아웃":"Sign out"}</button>`}</div>`).join("")}</div>`;
  } else if (tab === "help") {
    const fq = HELP_CENTER_FAQ;
    const notion = HELP_FAQ_NOTION_URL;
    html += `
      <div class="form-card">
        <p class="help-faq-intro">${tx(fq.intro)}</p>
        <a class="btn-primary help-faq-notion-btn" href="${notion}" target="_blank" rel="noopener noreferrer">${tx(fq.linkLabel)}</a>
      </div>
      <h2 class="help-faq-h2">${tx(fq.summaryHeading)}</h2>
      <div class="faq-list">
        ${fq.items.map(it => `
          <details><summary>${tx(it.q)}</summary><p>${tx(it.a)}</p></details>`).join("")}
      </div>
      <p class="help-faq-foot muted">${tx(fq.footerNote)} <a href="${notion}" target="_blank" rel="noopener noreferrer">${tx(fq.linkLabel)}</a></p>
      <a class="btn-primary" href="mailto:cs@hellolive.tv">${LANG === "ko" ? "📧 1:1 문의하기 (cs@hellolive.tv)" : "📧 Email support (cs@hellolive.tv)"}</a>`;
  }

  main.innerHTML = html;
}

// ============ GLOBAL EVENT BIND ============
function bindGlobal() {
  // Lang
  document.getElementById("langSelect").addEventListener("change", e => {
    LANG = e.target.value;
    applyI18n();
  });

  // GNB
  document.querySelectorAll("[data-route]").forEach(el => {
    el.addEventListener("click", e => {
      e.preventDefault();
      showView(el.dataset.route);
    });
  });

  // Auth buttons
  document.getElementById("btnLogin").addEventListener("click", () => openAuth("login"));
  document.getElementById("btnSignup").addEventListener("click", () => openAuth("signup"));

  // Watch
  document.getElementById("btnWatch").addEventListener("click", tryWatch);
  document.getElementById("btnWatch2").addEventListener("click", tryWatch);
  document.getElementById("btnTrailer").addEventListener("click", () => openTrailer());

  // Share
  document.getElementById("btnSharePage").addEventListener("click", () => showView("share"));
  document.getElementById("btnShareQuick").addEventListener("click", () => showView("share"));
  document.getElementById("copyLinkBtn").addEventListener("click", copyLink);

  // More reviews
  document.getElementById("btnMoreReview").addEventListener("click", () => showView("reviews"));

  // Profile dropdown
  document.getElementById("avatarBtn").addEventListener("click", e => {
    e.stopPropagation();
document.getElementById("profileMenu").classList.toggle("hidden");
  });
  document.addEventListener("click", e => {
    if (!e.target.closest("#profileWrap")) {
      document.getElementById("profileMenu")?.classList.add("hidden");
    }
  });
  document.querySelectorAll("[data-profile]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      activeProfileTab = a.dataset.profile;
      document.getElementById("profileMenu").classList.add("hidden");
      showView("profile");
    });
  });
  document.getElementById("btnLogout").addEventListener("click", e => {
    e.preventDefault();
    document.getElementById("profileMenu").classList.add("hidden");
    doLogout();
  });

  // Trending tabs
  document.querySelectorAll("[data-trending]").forEach(b =>
    b.addEventListener("click", () => renderTrending(b.dataset.trending)));

  // Library tabs
  document.querySelectorAll("[data-lib]").forEach(b =>
    b.addEventListener("click", () => renderLibrary(b.dataset.lib)));

  // Reviews tabs/sort/search
  document.querySelectorAll(".rv-tab").forEach(b =>
    b.addEventListener("click", () => {
      document.querySelectorAll(".rv-tab").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      renderReviewsFeed();
    }));
  document.getElementById("rvSort").addEventListener("change", renderReviewsFeed);
  document.getElementById("rvSearch").addEventListener("input", renderReviewsFeed);

  // Points tabs
  document.querySelectorAll("[data-pts-tab]").forEach(b =>
    b.addEventListener("click", () => renderPointsTab(b.dataset.ptsTab)));

  // Explore sort
  document.getElementById("exploreSort").addEventListener("change", e => {
    const v = e.target.value;
    let list = EXPLORE_CONTENT.slice();
    if (v === "rating") list.sort((a,b)=>b.rating-a.rating);
    if (v === "latest") list.sort((a,b)=>b.year-a.year);
    document.getElementById("exploreGrid").innerHTML = list.map(c => `
      <div class="grid-card" onclick="selectExploreDetail('${c.detailKey || "main"}')">
        <div class="grid-thumb" style="${c.poster ? `background-image:url('${c.poster}'); background-size:cover; background-position:center;` : `background:${c.color}` }"><div class="related-rating">★ ${c.rating}</div></div>
        <div class="grid-title">${tx(c.title)}</div>
        <div class="grid-meta">${tx(c.genre)} · ${c.year}</div>
      </div>`).join("");
  });

  // Modal backdrop close
  document.querySelectorAll(".modal-backdrop").forEach(b =>
    b.addEventListener("click", e => { if (e.target === b) b.classList.add("hidden"); }));
}

// ============ TOAST ============
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(window._toast);
  window._toast = setTimeout(() => t.classList.add("hidden"), 2400);
}