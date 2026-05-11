// ============ STATE ============
let LANG = "ko";
let isLoggedIn = false;
let myPoints = 84200;
let currentView = "detail";
let watchStep = 1;
let selectedProduct = null;
let selectedPay = null;
let rtInterval = null;
let activeProfileTab = "profile";

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
  renderQuotes();
  renderCast();
  renderReviewsPreview();
  renderRelated();
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
function showView(name) {
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
  document.getElementById("heroBg").style.background = CONTENT.heroImage;
  document.getElementById("heroTitle").textContent = tx(CONTENT.title);
  document.getElementById("heroDesc").textContent = t("hero_desc");
  document.getElementById("synopsis").textContent = t("synopsis");
}

function renderScenes() {
  document.getElementById("scenesGrid").innerHTML = SCENES.map((s, i) => `
    <div class="scene-card" style="background:${s.color}" data-idx="${i}">
      <div class="scene-play">▶</div>
      <div class="scene-info">
        <div class="scene-title">${tx(s.title)}</div>
        <div class="scene-time">${s.time}</div>
      </div>
    </div>`).join("");
  document.querySelectorAll("#scenesGrid .scene-card").forEach(c =>
    c.addEventListener("click", () => openModal("trailerModal")));
}

function renderQuotes() {
  document.getElementById("quotes").innerHTML = QUOTES.map(q => `
    <blockquote class="quote">
      <p>"${tx(q.text)}"</p>
      <cite>— ${tx(q.who)}</cite>
    </blockquote>`).join("");
}

function renderCast() {
  document.getElementById("castRow").innerHTML = CAST.map(c => `
    <div class="cast-item">
      <div class="cast-avatar">${c.emoji}</div>
      <div class="cast-name">${tx(c.name)}</div>
      <div class="cast-role">${tx(c.role)}</div>
    </div>`).join("");
}

function renderReviewsPreview() {
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
    <div class="grid-card" onclick="goToContent()">
      <div class="grid-thumb" style="background:${c.color}">
        <div class="related-rating">★ ${c.rating}</div>
      </div>
      <div class="grid-title">${tx(c.title)}</div>
      <div class="grid-meta">${tx(c.genre)} · ${c.year}</div>
    </div>`).join("");
}

function goToContent() { showView("detail"); }

// ============ TRENDING ============
function renderTrending(period) {
  document.querySelectorAll("[data-trending]").forEach(b =>
    b.classList.toggle("active", b.dataset.trending === period));
  const items = EXPLORE_CONTENT.slice(0, 10);
  document.getElementById("rankList").innerHTML = items.map((c, i) => `
    <div class="rank-item" onclick="goToContent()">
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
  const total = RATING_DIST.reduce((a,b)=>a+b,0);
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
  let list = REVIEWS.slice();
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
      <input type="email" placeholder="${LANG==="ko"?"이메일":"Email"}">
      <input type="password" placeholder="${LANG==="ko"?"비밀번호":"Password"}">
      <button class="btn-primary full" onclick="doLogin()">${t("btn_login")}</button>
      <div class="social-row">
        <button class="social" onclick="doLogin()">G  Google</button>
        <button class="social" onclick="doLogin()">  Apple</button>
        <button class="social" onclick="doLogin()">K  Kakao</button>
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
  isLoggedIn = true;
  closeModal("authModal");
  document.getElementById("btnLogin").classList.add("hidden");
  document.getElementById("btnSignup").classList.add("hidden");
  document.getElementById("profileWrap").classList.remove("hidden");
  document.getElementById("pmPoints").textContent = myPoints.toLocaleString() + " P";
  toast(LANG==="ko"?"✅ 환영합니다!":"✅ Welcome!");
  // continue watch flow if pending
  if (window._pendingWatch) {
    window._pendingWatch = false;
    setTimeout(openWatchFlow, 500);
  }
}

function doLogout() {
  isLoggedIn = false;
  document.getElementById("btnLogin").classList.remove("hidden");
  document.getElementById("btnSignup").classList.remove("hidden");
  document.getElementById("profileWrap").classList.add("hidden");
  document.getElementById("profileMenu").classList.add("hidden");
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
          <div class="os-title">${tx(CONTENT.title)}</div>
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
      <label class="agree"><input type="checkbox" id="agreeChk" checked> ${LANG==="ko"?"이용약관 및 결제대행 약관에 동의합니다":"I agree to terms and payment policies"}</label>
      <div class="ws-actions">
        <button class="btn-secondary" onclick="watchStep=1; setStepper(1); renderWatchStep();">${LANG==="ko"?"이전":"Back"}</button>
        <button class="btn-primary" id="ws2Next" disabled>${LANG==="ko"?"₩":""}${p.price.toLocaleString()} ${LANG==="ko"?"결제하기":"Pay now"}</button>
      </div>`;
    document.querySelectorAll(".pay-card").forEach(c => {
      c.addEventListener("click", () => {
        document.querySelectorAll(".pay-card").forEach(x => x.classList.remove("selected"));
        c.classList.add("selected");
        selectedPay = PAY_METHODS.find(m => m.id === c.dataset.pid);
        document.getElementById("ws2Next").disabled = false;
      });
    });
    document.getElementById("ws2Next").addEventListener("click", processPay);
  }
  else if (watchStep === 3) {
    const p = selectedProduct;
    body.innerHTML = `
      <div class="ws-success">
        <div class="success-icon">✅</div>
        <h2>${LANG==="ko"?"결제가 완료되었습니다!":"Payment complete!"}</h2>
        <p>${LANG==="ko"?"바로 시청을 시작할 수 있습니다.":"Start watching right now."}</p>
        <div class="receipt">
          <div><span>${LANG==="ko"?"콘텐츠":"Title"}</span><span>${tx(CONTENT.title)}</span></div>
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
function closeModal(id) { document.getElementById(id).classList.add("hidden"); }

function openReviewerProfile(user) {
  const r = REVIEWS.find(x => x.user === user);
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
        <div class="form-row"><label>${LANG==="ko"?"이메일":"Email"}</label><input type="email" value="user@storyhub.app" disabled></div>
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
    html += `<div class="faq-list">
      <details><summary>${LANG==="ko"?"환불은 어떻게 받나요?":"How do I get a refund?"}</summary><p>${LANG==="ko"?"콘텐츠를 시청하지 않은 경우 결제 후 7일 이내 환불 가능합니다.":"Within 7 days of purchase if not watched."}</p></details>
      <details><summary>${LANG==="ko"?"포인트 유효기간이 있나요?":"Do points expire?"}</summary><p>${LANG==="ko"?"적립일로부터 12개월 후 만료됩니다.":"Points expire 12 months after earning."}</p></details>
      <details><summary>${LANG==="ko"?"동시에 몇 대까지 시청 가능한가요?":"How many concurrent streams?"}</summary><p>${LANG==="ko"?"기본 멤버십 기준 4대까지 동시 시청 가능합니다.":"Up to 4 concurrent streams."}</p></details>
      <details><summary>${LANG==="ko"?"자막 언어는 몇 개 지원하나요?":"How many subtitle languages?"}</summary><p>${LANG==="ko"?"콘텐츠별로 최대 30개 언어를 지원합니다.":"Up to 30 languages per title."}</p></details>
      <details><summary>${LANG==="ko"?"파트너로 참여하려면?":"How to become a partner?"}</summary><p>${LANG==="ko"?"하단 '파트너 신청' 메뉴에서 신청해주세요.":"Apply via 'Become a Partner' in the footer."}</p></details>
    </div>
    <button class="btn-primary">${LANG==="ko"?"📧 1:1 문의하기":"📧 Contact Support"}</button>`;
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
  document.getElementById("btnTrailer").addEventListener("click", () => openModal("trailerModal"));

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
      <div class="grid-card" onclick="goToContent()">
        <div class="grid-thumb" style="background:${c.color}"><div class="related-rating">★ ${c.rating}</div></div>
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