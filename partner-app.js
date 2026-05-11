let LANG = "ko";
let isLoggedIn = false;
let currentPage = "dashboard";
let upStep = 1;
const upState = { title: "", desc: "", genre: "", year: "", country: "", cast: "", director: "", age: "15", videoFile: null, thumbFile: null, subFiles: [], baseFrom: 4900, baseTo: 9900, sales: { tvod: true, svod: false, free: false }, regions: {} };

// ============ INIT ============
document.addEventListener("DOMContentLoaded", () => {
  bindLogin();
  applyI18n();
});

// ============ I18N ============
function t(key) { return T[LANG][key] ?? key; }
function tx(o) { return o[LANG] ?? o.ko ?? o.en; }
function applyI18n() {
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const k = el.getAttribute("data-i18n");
    if (T[LANG][k]) el.textContent = T[LANG][k];
  });
  if (isLoggedIn) {
    renderNotifs();
    renderPage(currentPage);
  } else {
    renderLoginBody();
  }
}

// ============ LOGIN ============
function bindLogin() {
  document.querySelectorAll(".ltab").forEach(b => {
    b.addEventListener("click", () => {
      document.querySelectorAll(".ltab").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
      renderLoginBody(b.dataset.ltab);
    });
  });
  renderLoginBody("login");
}

function renderLoginBody(tab = "login") {
  const body = document.getElementById("loginBody");
  if (tab === "login") {
    body.innerHTML = `
      <input type="email" placeholder="${LANG==='ko'?'이메일':'Email'}">
      <input type="password" placeholder="${LANG==='ko'?'비밀번호':'Password'}">
      <button class="btn-primary full" onclick="enterDashboard()">${t('btn_login')}</button>`;
  } else {
    body.innerHTML = `
      <input type="text" placeholder="${LANG==='ko'?'회사명':'Company name'}">
      <input type="email" placeholder="${LANG==='ko'?'이메일':'Email'}">
      <input type="text" placeholder="${LANG==='ko'?'담당자명':'Contact name'}">
      <select><option>${LANG==='ko'?'국가 선택':'Country'}</option><option>🇰🇷 Korea</option><option>🇯🇵 Japan</option><option>🇺🇸 USA</option></select>
      <button class="btn-primary full" onclick="enterDashboard()">${t('btn_signup')}</button>
      <p class="legal">${LANG==='ko'?'심사 후 24시간 내에 결과를 안내드립니다.':'You will hear back within 24h.'}</p>`;
  }
}

function enterDashboard() {
  isLoggedIn = true;
  document.getElementById("loginOverlay").classList.add("hidden");
  document.getElementById("dashboard").classList.remove("hidden");
  bindDashboard();
  renderPage("dashboard");
  renderNotifs();
}

// ============ DASHBOARD BIND ============
function bindDashboard() {
  document.getElementById("langSelect").addEventListener("change", e => { LANG = e.target.value; applyI18n(); });
  document.querySelectorAll("#sbNav a, [data-page]").forEach(a => {
    a.addEventListener("click", e => {
      e.preventDefault();
      const p = a.dataset.page;
      if (!p) return;
      if (p === "upload") openUpload();
      else renderPage(p);
    });
  });
  document.getElementById("avatarBtn").addEventListener("click", e => {
    e.stopPropagation();
    document.getElementById("profileMenu").classList.toggle("hidden");
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".profile-wrap")) document.getElementById("profileMenu")?.classList.add("hidden");
    if (!e.target.closest("#bellBtn") && !e.target.closest("#notifDrawer")) document.getElementById("notifDrawer")?.classList.add("hidden");
  });
  document.getElementById("bellBtn").addEventListener("click", e => {
    e.stopPropagation();
    document.getElementById("notifDrawer").classList.toggle("hidden");
  });
  document.getElementById("btnLogout").addEventListener("click", e => { e.preventDefault(); logout(); });
  document.getElementById("pmLogout").addEventListener("click", e => { e.preventDefault(); logout(); });
  document.querySelectorAll(".modal-backdrop").forEach(b =>
    b.addEventListener("click", e => { if (e.target === b) b.classList.add("hidden"); }));
}

function logout() {
  isLoggedIn = false;
  document.getElementById("loginOverlay").classList.remove("hidden");
  document.getElementById("dashboard").classList.add("hidden");
  renderLoginBody("login");
}

// ============ PAGE ROUTER ============
function renderPage(name) {
  currentPage = name;
  document.querySelectorAll("#sbNav a").forEach(a => a.classList.toggle("active", a.dataset.page === name));
  const page = document.getElementById("page");
  if (name === "dashboard") page.innerHTML = renderDashboard();
  else if (name === "content") page.innerHTML = renderContent();
  else if (name === "subtitles") page.innerHTML = renderSubtitles();
  else if (name === "revenue") page.innerHTML = renderRevenue();
  else if (name === "audience") page.innerHTML = renderAudience();
  else if (name === "marketing") page.innerHTML = renderMarketing();
  else if (name === "payouts") page.innerHTML = renderPayouts();
  else if (name === "brand") page.innerHTML = renderBrand();
  else if (name === "settings") page.innerHTML = renderSettings();
  bindPageEvents(name);
  page.scrollTop = 0;
}

// ============ DASHBOARD ============
function renderDashboard() {
  const max = Math.max(...REV_MONTHLY.map(r => r.v));
  const path = REV_MONTHLY.map((r,i) => {
    const x = (i / (REV_MONTHLY.length - 1)) * 100;
    const y = 100 - (r.v / max) * 90;
    return (i===0?'M':'L') + x + ',' + y;
  }).join(' ');
  const area = path + ` L 100,100 L 0,100 Z`;

  return `
    <div class="page-head">
      <h1>${t('page_dashboard')}</h1><p>${t('page_dashboard_sub')}</p>
    </div>

    <div class="kpi-grid">
      ${kpiCard('💰', t('kpi_revenue'), '₩' + KPI.revenue.value.toLocaleString(), KPI.revenue.delta)}
      ${kpiCard('👁', t('kpi_views'), KPI.views.value.toLocaleString(), KPI.views.delta)}
      ${kpiCard('👥', t('kpi_buyers'), KPI.buyers.value.toLocaleString(), KPI.buyers.delta)}
      ${kpiCard('🏦', t('kpi_payout'), '₩' + KPI.payout.value.toLocaleString(), null, '2025.02.15')}
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${t('sec_revenue_trend')}</h3></div>
        <div class="chart-wrap">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="line-chart">
            <defs>
              <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#ff3d6e" stop-opacity="0.5"/>
                <stop offset="100%" stop-color="#ff3d6e" stop-opacity="0"/>
              </linearGradient>
            </defs>
            <path d="${area}" fill="url(#g1)"/>
            <path d="${path}" stroke="#ff3d6e" stroke-width="0.6" fill="none" vector-effect="non-scaling-stroke"/>
          </svg>
          <div class="chart-x">${REV_MONTHLY.map((r,i) => i%2===0 ? `<span>${r.m.slice(5)}</span>`: `<span></span>`).join('')}</div>
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_top_content')}</h3></div>
        <div class="top-list">
          ${CONTENTS.filter(c=>c.status==='published').sort((a,b)=>b.revenue-a.revenue).slice(0,3).map((c,i) => `
            <div class="top-row">
              <div class="rank-num gold">${i+1}</div>
              <div class="top-thumb" style="background:${c.color}"></div>
              <div class="top-info">
                <div class="top-title">${tx(c.title)}</div>
                <div class="top-meta">${c.views.toLocaleString()} views · ₩${c.revenue.toLocaleString()}</div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${t('sec_recent_orders')}</h3></div>
        <table class="data-table compact">
          <thead><tr><th>Time</th><th>User</th><th>Content</th><th>Plan</th><th class="r">₩</th></tr></thead>
          <tbody>
            ${RECENT_ORDERS.map(o => `<tr>
              <td class="muted">${o.time.slice(11)}</td>
              <td>${o.country} ${o.user}</td>
              <td>${o.content}</td>
              <td class="muted">${o.plan}</td>
              <td class="r"><strong>${o.amount.toLocaleString()}</strong></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_announcements')}</h3></div>
        <div class="announce-list">
          <div class="announce-row"><span class="dot blue"></span><div><strong>2025.01.18</strong><p>${LANG==='ko'?'1월 정산은 2/15에 자동 지급됩니다.':'January payout will be processed on Feb 15.'}</p></div></div>
          <div class="announce-row"><span class="dot green"></span><div><strong>2025.01.10</strong><p>${LANG==='ko'?'AI 자동자막 베타 신청을 받습니다.':'AI subtitle beta is now open.'}</p></div></div>
          <div class="announce-row"><span class="dot orange"></span><div><strong>2025.01.05</strong><p>${LANG==='ko'?'12월 글로벌 매출 TOP10에 선정되셨습니다 🎉':'You ranked TOP10 global revenue in Dec 🎉'}</p></div></div>
        </div>
      </div>
    </div>`;
}

function kpiCard(icon, label, value, delta, sub) {
  let deltaHtml = '';
  if (delta != null) {
    const cls = delta >= 0 ? 'up' : 'down';
    const sign = delta >= 0 ? '↑' : '↓';
    deltaHtml = `<span class="delta ${cls}">${sign} ${Math.abs(delta)}% <em>${t('kpi_vs')}</em></span>`;
  } else if (sub) {
    deltaHtml = `<span class="delta neutral">${sub}</span>`;
  }
  return `<div class="kpi"><div class="kpi-icon">${icon}</div><div class="kpi-body"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div>${deltaHtml}</div></div>`;
}

// ============ CONTENT LIST ============
function renderContent() {
  const filterTabs = ["all","published","review","rejected","draft"];
  return `
    <div class="page-head row">
      <div><h1>${t('page_content')}</h1><p>${t('page_content_sub')}</p></div>
      <button class="btn-primary" onclick="openUpload()">${t('btn_new_content')}</button>
    </div>
    <div class="filter-tabs" id="ctFilter">
      ${filterTabs.map((f,i) => `<button class="ftab ${i===0?'active':''}" data-filter="${f}">${f==='all'?(LANG==='ko'?'전체':'All'):t('status_'+f)} <em>${f==='all'?CONTENTS.length:CONTENTS.filter(c=>c.status===f).length}</em></button>`).join('')}
    </div>
    <div class="card no-pad">
      <table class="data-table">
        <thead><tr>
          <th>${t('th_content')}</th><th>${t('th_status')}</th>
          <th class="r">${t('th_views')}</th><th class="r">${t('th_revenue')}</th>
          <th>${t('th_uploaded')}</th><th>${t('th_action')}</th>
        </tr></thead>
        <tbody id="ctBody">${renderContentRows("all")}</tbody>
      </table>
    </div>`;
}

function renderContentRows(filter) {
  const list = filter === "all" ? CONTENTS : CONTENTS.filter(c => c.status === filter);
  if (!list.length) return `<tr><td colspan="6" class="empty-row">${LANG==='ko'?'해당 상태의 콘텐츠가 없습니다':'No content with this status'}</td></tr>`;
  return list.map(c => `
    <tr>
      <td><div class="ct-cell"><div class="ct-thumb" style="background:${c.color}"></div><div><div class="ct-title">${tx(c.title)}</div><div class="ct-sub">${c.type}</div></div></div></td>
      <td><span class="status-badge ${c.status}">${t('status_'+c.status)}</span>${c.reason ? `<div class="reason">${tx(c.reason)}</div>` : ''}</td>
      <td class="r">${c.views.toLocaleString()}</td>
      <td class="r"><strong>₩${c.revenue.toLocaleString()}</strong></td>
      <td class="muted">${c.date}</td>
      <td><button class="like-btn" onclick="openContentDetail('${c.id}')">${t('view')}</button> <button class="like-btn" onclick="toast('${LANG==='ko'?'편집 화면(생략)':'Edit (omitted)'}')">${t('edit')}</button></td>
    </tr>`).join("");
}

function openContentDetail(id) {
  const c = CONTENTS.find(x => x.id === id); if (!c) return;
  document.getElementById("detailBody").innerHTML = `
    <div class="ct-detail-hero" style="background:${c.color}"></div>
    <h2>${tx(c.title)}</h2>
    <p class="muted">${c.type} · ${LANG==='ko'?'업로드':'Uploaded'} ${c.date}</p>
    <div class="ct-detail-stats">
      <div><span>${LANG==='ko'?'시청수':'Views'}</span><strong>${c.views.toLocaleString()}</strong></div>
      <div><span>${LANG==='ko'?'매출':'Revenue'}</span><strong>₩${c.revenue.toLocaleString()}</strong></div>
      <div><span>${LANG==='ko'?'평점':'Rating'}</span><strong>★ ${c.status==='published'?'4.9':'-'}</strong></div>
    </div>
    <div style="margin-top:16px"><span class="status-badge ${c.status}">${t('status_'+c.status)}</span></div>
    ${c.reason ? `<p class="reason" style="margin-top:10px">${tx(c.reason)}</p>` : ''}
    <div class="row-actions" style="margin-top:24px">
      <button class="btn-primary">${t('edit')}</button>
      <button class="btn-outline">${LANG==='ko'?'시청자 분석':'Audience'}</button>
      <button class="btn-outline">${LANG==='ko'?'공유 링크':'Share Link'}</button>
    </div>`;
  document.getElementById("detailModal").classList.remove("hidden");
}

// ============ SUBTITLES ============
function renderSubtitles() {
  return `
    <div class="page-head"><h1>${t('page_subtitles')}</h1></div>
    <div class="filter-tabs" id="subFilter">
      <button class="ftab active" data-sub-tab="official">${t('sub_official')} <em>${SUBS_OFFICIAL.length}</em></button>
      <button class="ftab" data-sub-tab="community">${t('sub_community')} <em>${SUBS_COMMUNITY.length}</em></button>
    </div>
    <div class="card no-pad" id="subBody">${renderSubsTable("official")}</div>`;
}

function renderSubsTable(tab) {
  if (tab === "official") {
    return `<table class="data-table"><thead><tr><th>${t('th_content')}</th><th>${LANG==='ko'?'언어':'Language'}</th><th>${LANG==='ko'?'버전':'Version'}</th><th>${t('th_status')}</th><th>${t('th_action')}</th></tr></thead><tbody>
      ${SUBS_OFFICIAL.map(s => `<tr>
        <td>${s.content}</td><td>${s.lang}</td><td class="muted">v${s.v}</td>
        <td><span class="status-badge ${s.status==='active'?'published':'review'}">${s.status==='active'?(LANG==='ko'?'활성':'Active'):t('status_review')}</span></td>
        <td><button class="like-btn">${LANG==='ko'?'다운로드':'Download'}</button> <button class="like-btn">${t('edit')}</button></td>
      </tr>`).join('')}
      </tbody></table>
      <div style="padding:16px"><button class="btn-primary">＋ ${LANG==='ko'?'자막 업로드':'Upload subtitle'}</button></div>`;
  }
  return `<table class="data-table"><thead><tr><th>${t('th_content')}</th><th>${LANG==='ko'?'언어':'Language'}</th><th>${LANG==='ko'?'기여자':'Contributor'}</th><th>${LANG==='ko'?'품질':'Quality'}</th><th>${t('th_status')}</th><th>${t('th_action')}</th></tr></thead><tbody>
    ${SUBS_COMMUNITY.map(s => `<tr>
      <td>${s.content}</td><td>${s.lang}</td><td>${s.contributor}</td>
      <td>★ ${s.quality}</td>
      <td><span class="status-badge ${s.status==='approved'?'published':s.status==='pending'?'review':'rejected'}">${
        s.status==='approved'?(LANG==='ko'?'승인':'Approved'):s.status==='pending'?(LANG==='ko'?'대기':'Pending'):(LANG==='ko'?'반려':'Rejected')
      }</span></td>
      <td>${s.status==='pending'?`<button class="like-btn ok">${t('approve')}</button> <button class="like-btn no">${t('reject')}</button>`:`<button class="like-btn">${LANG==='ko'?'미리보기':'Preview'}</button>`}</td>
    </tr>`).join('')}
    </tbody></table>`;
}

// ============ REVENUE ============
function renderRevenue() {
  const max = Math.max(...REV_MONTHLY.map(r=>r.v));
  return `
    <div class="page-head"><h1>${t('page_revenue')}</h1><p>${t('page_revenue_sub')}</p></div>
    <div class="kpi-grid">
      ${kpiCard('💵', t('rev_total'), '₩' + 12480000..toLocaleString(), 23.5)}
      ${kpiCard('🛒', t('rev_avg_price'), '₩6,820', 4.2)}
      ${kpiCard('↩️', t('rev_refund'), '0.8%', -0.3)}
      ${kpiCard('🔁', t('rev_repurchase'), '38%', 6.1)}
    </div>

    <div class="card">
      <div class="card-head"><h3>${t('sec_revenue_trend')}</h3>
        <select class="select-mini"><option>${LANG==='ko'?'최근 12개월':'Last 12 months'}</option><option>${LANG==='ko'?'최근 6개월':'Last 6 months'}</option><option>${LANG==='ko'?'최근 30일':'Last 30 days'}</option></select>
      </div>
      <div class="bar-chart">
        ${REV_MONTHLY.map(r => `
          <div class="bc-col">
            <div class="bc-bar" style="height:${(r.v/max)*100}%" title="${r.m}: ₩${r.v.toLocaleString()}"></div>
            <span>${r.m.slice(5)}</span>
          </div>`).join('')}
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${t('sec_country')}</h3></div>
        <div class="hbar-list">
          ${COUNTRY_REV.map(c => `
            <div class="hbar-row">
              <span class="hbar-label">${c.code} ${tx(c.name)}</span>
              <div class="hbar-track"><div class="hbar-fill" style="width:${c.pct*2.5}%"></div></div>
              <span class="hbar-val">₩${c.val.toLocaleString()} <em>${c.pct}%</em></span>
            </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_content_rev')}</h3></div>
        <div class="hbar-list">
          ${CONTENTS.filter(c=>c.status==='published').sort((a,b)=>b.revenue-a.revenue).map(c => {
            const max2 = Math.max(...CONTENTS.map(x=>x.revenue));
            return `<div class="hbar-row">
              <span class="hbar-label">${tx(c.title)}</span>
              <div class="hbar-track"><div class="hbar-fill" style="width:${(c.revenue/max2)*100}%; background:linear-gradient(90deg,#ffb84d,#ff7a3a)"></div></div>
              <span class="hbar-val">₩${c.revenue.toLocaleString()}</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

// ============ AUDIENCE ============
function renderAudience() {
  const maxH = Math.max(...WATCH_HOURS);
  return `
    <div class="page-head"><h1>${t('page_audience')}</h1><p>${t('page_audience_sub')}</p></div>
    <div class="kpi-grid">
      ${kpiCard('👥', t('aud_total'), '142,800', 18.2)}
      ${kpiCard('🆕', t('aud_new'), '12,420', 24.6)}
      ${kpiCard('⏱', t('aud_avg_time'), '38m 24s', 5.1)}
      ${kpiCard('🏁', t('aud_completion'), '78.4%', 2.4)}
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${t('sec_age')}</h3></div>
        <div class="hbar-list">
          ${AGE_DIST.map(a => `<div class="hbar-row">
            <span class="hbar-label small">${a.label}</span>
            <div class="hbar-track"><div class="hbar-fill" style="width:${a.pct*2.5}%"></div></div>
            <span class="hbar-val">${a.pct}%</span>
          </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_gender')}</h3></div>
        <div class="donut-wrap">
          ${donutSVG(GENDER.female, GENDER.male, GENDER.other)}
          <div class="donut-legend">
            <div><span class="dot pink"></span>${LANG==='ko'?'여성':'Female'} <strong>${GENDER.female}%</strong></div>
            <div><span class="dot blue"></span>${LANG==='ko'?'남성':'Male'} <strong>${GENDER.male}%</strong></div>
            <div><span class="dot gray"></span>${LANG==='ko'?'기타':'Other'} <strong>${GENDER.other}%</strong></div>
          </div>
        </div>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${t('sec_geo')}</h3></div>
        <div class="hbar-list">
          ${COUNTRY_REV.slice(0,8).map(c => `<div class="hbar-row">
            <span class="hbar-label">${c.code} ${tx(c.name)}</span>
            <div class="hbar-track"><div class="hbar-fill" style="width:${c.pct*2.5}%; background:linear-gradient(90deg,#3ad17a,#7aff9e)"></div></div>
            <span class="hbar-val">${c.pct}%</span>
          </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_device')}</h3></div>
        <div class="device-grid">
          ${DEVICES.map(d => `<div class="dev-card">
            <div class="dev-icon">${d.icon}</div>
            <div class="dev-pct">${d.pct}%</div>
            <div class="dev-label">${d.label}</div>
            <div class="dev-bar"><div style="width:${d.pct}%"></div></div>
          </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-head"><h3>${t('sec_when')}</h3></div>
      <div class="hour-chart">
        ${WATCH_HOURS.map((v,i) => `<div class="hc-col"><div class="hc-bar" style="height:${(v/maxH)*100}%"></div><span>${i}</span></div>`).join('')}
      </div>
    </div>`;
}

function donutSVG(a, b, c) {
  // a, b, c are percentages summing to 100
  const r = 60, cx = 80, cy = 80;
  const C = 2 * Math.PI * r;
  const sa = (a/100)*C, sb = (b/100)*C, sc = (c/100)*C;
  return `<svg width="160" height="160" viewBox="0 0 160 160" class="donut">
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2a2a38" stroke-width="22"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#ff3d6e" stroke-width="22" stroke-dasharray="${sa} ${C}" transform="rotate(-90 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#3a8aff" stroke-width="22" stroke-dasharray="${sb} ${C}" stroke-dashoffset="${-sa}" transform="rotate(-90 ${cx} ${cy})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#777" stroke-width="22" stroke-dasharray="${sc} ${C}" stroke-dashoffset="${-(sa+sb)}" transform="rotate(-90 ${cx} ${cy})"/>
    <text x="${cx}" y="${cy+5}" text-anchor="middle" fill="#fff" font-size="22" font-weight="800">${a+b+c}%</text>
  </svg>`;
}

// ============ MARKETING ============
function renderMarketing() {
  return `
    <div class="page-head"><h1>${t('page_marketing')}</h1></div>

    <div class="card">
      <div class="card-head"><h3>${t('mk_links')}</h3></div>
      <table class="data-table">
        <thead><tr><th>${t('th_content')}</th><th>${t('th_link')}</th><th class="r">${t('th_clicks')}</th><th class="r">${t('th_conversion')}</th><th class="r">${t('th_orders')}</th><th class="r">${t('th_revenue')}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>
          ${MK_LINKS.map(l => `<tr>
            <td><strong>${l.content}</strong></td>
            <td><code class="link-code">${l.url}</code></td>
            <td class="r">${l.clicks.toLocaleString()}</td>
            <td class="r">${(l.orders/l.clicks*100).toFixed(1)}%</td>
            <td class="r">${l.orders.toLocaleString()}</td>
            <td class="r"><strong>₩${l.rev.toLocaleString()}</strong></td>
            <td>
              <button class="like-btn" onclick="toast('${LANG==='ko'?'링크 복사됨':'Copied'}')">${LANG==='ko'?'복사':'Copy'}</button>
              <button class="like-btn">QR</button>
            </td>
          </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head row"><h3>${t('mk_promo')}</h3><button class="btn-primary small">＋ ${LANG==='ko'?'코드 생성':'Create'}</button></div>
        <table class="data-table">
          <tr><td><code>SUMMER25</code></td><td>${LANG==='ko'?'25% 할인':'25% off'}</td><td>${LANG==='ko'?'사용 142회':'142 uses'}</td><td><span class="status-badge published">${LANG==='ko'?'활성':'Active'}</span></td></tr>
          <tr><td><code>WELCOME</code></td><td>${LANG==='ko'?'첫 구매 50%':'First purchase 50%'}</td><td>${LANG==='ko'?'사용 832회':'832 uses'}</td><td><span class="status-badge published">${LANG==='ko'?'활성':'Active'}</span></td></tr>
          <tr><td><code>NEWYEAR</code></td><td>${LANG==='ko'?'30% 할인':'30% off'}</td><td>${LANG==='ko'?'사용 521회':'521 uses'}</td><td><span class="status-badge rejected">${LANG==='ko'?'종료':'Ended'}</span></td></tr>
        </table>
      </div>

      <div class="card">
        <div class="card-head"><h3>${LANG==='ko'?'SNS 공유 통계':'Social Sharing'}</h3></div>
        <div class="social-stats">
          <div class="ss-row"><span class="ss-icon fb">f</span><div><strong>Facebook</strong><span>${LANG==='ko'?'클릭':'Clicks'} 8,420 · 결제 1,210</span></div></div>
          <div class="ss-row"><span class="ss-icon x">𝕏</span><div><strong>X</strong><span>${LANG==='ko'?'클릭':'Clicks'} 6,210 · 결제 920</span></div></div>
          <div class="ss-row"><span class="ss-icon ig">📷</span><div><strong>Instagram</strong><span>${LANG==='ko'?'클릭':'Clicks'} 12,840 · 결제 1,840</span></div></div>
          <div class="ss-row"><span class="ss-icon kakao">K</span><div><strong>KakaoTalk</strong><span>${LANG==='ko'?'클릭':'Clicks'} 4,210 · 결제 720</span></div></div>
        </div>
      </div>
    </div>`;
}

// ============ PAYOUTS ============
function renderPayouts() {
  return `
    <div class="page-head"><h1>${t('page_payouts')}</h1><p>${t('page_payouts_sub')}</p></div>

    <div class="payout-hero">
      <div class="ph-card main">
        <div class="ph-lbl">${t('po_balance')}</div>
        <div class="ph-val">₩${(8740000).toLocaleString()}</div>
        <button class="btn-primary">${LANG==='ko'?'즉시 인출 신청':'Request payout'}</button>
      </div>
      <div class="ph-card">
        <div class="ph-lbl">${t('po_pending')}</div>
        <div class="ph-val small">₩${(8740000).toLocaleString()}</div>
        <div class="ph-sub">${LANG==='ko'?'2025.02.15 자동 지급':'Auto on 2025.02.15'}</div>
      </div>
      <div class="ph-card">
        <div class="ph-lbl">${t('po_paid')}</div>
        <div class="ph-val small">₩${(33420000).toLocaleString()}</div>
        <div class="ph-sub">${LANG==='ko'?'누적 4회 지급':'4 payouts so far'}</div>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${t('sec_payout_history')}</h3></div>
        <table class="data-table">
          <thead><tr><th>${LANG==='ko'?'지급일':'Date'}</th><th>${LANG==='ko'?'정산기간':'Period'}</th><th class="r">${LANG==='ko'?'금액':'Amount'}</th><th>${t('th_status')}</th><th>${t('th_action')}</th></tr></thead>
          <tbody>
            ${PAYOUTS.map(p => `<tr>
              <td>${p.date}</td><td class="muted">${p.period}</td>
              <td class="r"><strong>₩${p.amount.toLocaleString()}</strong></td>
              <td><span class="status-badge ${p.status==='paid'?'published':'review'}">${p.status==='paid'?(LANG==='ko'?'지급완료':'Paid'):(LANG==='ko'?'예정':'Scheduled')}</span></td>
              <td><button class="like-btn">${LANG==='ko'?'명세서':'Statement'}</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_bank')}</h3></div>
        <div class="bank-info">
          <div class="bank-row"><span>${LANG==='ko'?'은행':'Bank'}</span><strong>KB 국민은행</strong></div>
          <div class="bank-row"><span>${LANG==='ko'?'예금주':'Holder'}</span><strong>(주) Moonlight Studios</strong></div>
          <div class="bank-row"><span>${LANG==='ko'?'계좌번호':'Account'}</span><strong>123-456-****-78</strong></div>
          <div class="bank-row"><span>${LANG==='ko'?'정산 주기':'Cycle'}</span><strong>${LANG==='ko'?'매월 15일':'Monthly · 15th'}</strong></div>
          <div class="bank-row"><span>${LANG==='ko'?'최소 정산금':'Threshold'}</span><strong>₩100,000</strong></div>
        </div>
        <button class="btn-outline" style="margin-top:16px">${LANG==='ko'?'정산 정보 변경':'Edit bank info'}</button>
      </div>
    </div>`;
}

// ============ BRAND PAGE ============
function renderBrand() {
  return `
    <div class="page-head"><h1>${t('page_brand')}</h1><p>${t('page_brand_sub')}</p></div>

    <div class="brand-layout">
      <div class="card">
        <div class="card-head"><h3>${LANG==='ko'?'브랜드 정보':'Brand Info'}</h3></div>
        <div class="form-card">
          <div class="form-row"><label>${LANG==='ko'?'브랜드명':'Brand name'}</label><input type="text" value="Moonlight Studios"></div>
          <div class="form-row"><label>${LANG==='ko'?'슬러그':'Slug'}</label><input type="text" value="moonlight" style="font-family:monospace"></div>
          <div class="form-row"><label>${LANG==='ko'?'한 줄 소개':'Tagline'}</label><input type="text" value="${LANG==='ko'?'시간을 넘는 이야기들':'Stories that transcend time'}"></div>
          <div class="form-row"><label>${LANG==='ko'?'로고':'Logo'}</label><div class="upload-box small">🎬 ${LANG==='ko'?'업로드':'Upload'}</div></div>
          <div class="form-row"><label>${LANG==='ko'?'커버 이미지':'Cover'}</label><div class="upload-box small">🌄 ${LANG==='ko'?'업로드':'Upload'}</div></div>
          <div class="form-row"><label>${LANG==='ko'?'테마 색상':'Theme color'}</label><div class="color-row">
            <span class="color-chip" style="background:#8b3a8a"></span>
            <span class="color-chip selected" style="background:#ff3d6e"></span>
            <span class="color-chip" style="background:#3a8aff"></span>
            <span class="color-chip" style="background:#3ad17a"></span>
            <span class="color-chip" style="background:#ffb84d"></span>
          </div></div>
          <div class="form-row"><label>${LANG==='ko'?'소개글':'About'}</label><textarea rows="4">${LANG==='ko'?'우리는 따뜻하고 깊이 있는 한국 드라마와 영화를 만드는 제작사입니다. 시간과 공간을 넘는 이야기로 전 세계 시청자와 만납니다.':'We craft warm, deep Korean dramas and films — meeting global audiences with stories that cross time and space.'}</textarea></div>
          <button class="btn-primary">${t('save')}</button>
        </div>
      </div>

      <div class="card">
        <div class="card-head row">
          <h3>${LANG==='ko'?'미리보기':'Preview'}</h3>
          <a href="#" class="muted" onclick="event.preventDefault();toast('${LANG==='ko'?'storyhub.app/@moonlight':'storyhub.app/@moonlight'}')">storyhub.app/@moonlight ↗</a>
        </div>
        <div class="brand-preview">
          <div class="bp-cover" style="background:linear-gradient(135deg,#1a0f2e,#8b3a8a)">
            <div class="bp-logo">🎬</div>
            <div class="bp-name">Moonlight Studios</div>
            <div class="bp-tag">${LANG==='ko'?'시간을 넘는 이야기들':'Stories that transcend time'}</div>
          </div>
          <div class="bp-stats">
            <div><strong>5</strong><span>${LANG==='ko'?'작품':'Titles'}</span></div>
            <div><strong>248K</strong><span>${LANG==='ko'?'팔로워':'Followers'}</span></div>
            <div><strong>4.8</strong><span>${LANG==='ko'?'평균 평점':'Avg. rating'}</span></div>
          </div>
          <div class="bp-grid">
            ${CONTENTS.filter(c=>c.status==='published').slice(0,4).map(c => `
              <div class="bp-thumb" style="background:${c.color}"><span>${tx(c.title)}</span></div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>`;
}

// ============ SETTINGS ============
function renderSettings() {
  return `
    <div class="page-head"><h1>${t('page_settings')}</h1></div>
    <div class="set-tabs" id="setTabs">
      <button class="ftab active" data-set="company">${t('set_company')}</button>
      <button class="ftab" data-set="payout">${t('set_payout_info')}</button>
      <button class="ftab" data-set="team">${t('set_team')}</button>
      <button class="ftab" data-set="api">${t('set_api')}</button>
      <button class="ftab" data-set="notif">${t('set_notif')}</button>
    </div>
    <div id="setBody">${renderSetTab("company")}</div>`;
}

function renderSetTab(tab) {
  if (tab === "company") {
    return `<div class="card"><div class="form-card">
      <div class="form-row"><label>${LANG==='ko'?'회사명':'Company'}</label><input type="text" value="Moonlight Studios Inc."></div>
      <div class="form-row"><label>${LANG==='ko'?'사업자등록번호':'Business ID'}</label><input type="text" value="123-45-67890"></div>
      <div class="form-row"><label>${LANG==='ko'?'대표자':'CEO'}</label><input type="text" value="Kim Daehyun"></div>
      <div class="form-row"><label>${LANG==='ko'?'국가':'Country'}</label><select><option>🇰🇷 Korea</option></select></div>
      <div class="form-row"><label>${LANG==='ko'?'주소':'Address'}</label><input type="text" value="${LANG==='ko'?'서울시 강남구 테헤란로 123':'123 Teheran-ro, Gangnam, Seoul'}"></div>
      <div class="form-row"><label>${LANG==='ko'?'담당자':'Contact'}</label><input type="text" value="Lee Sangmin"></div>
      <div class="form-row"><label>${LANG==='ko'?'담당자 이메일':'Contact email'}</label><input type="email" value="partner@moonlight.studio"></div>
      <button class="btn-primary">${t('save')}</button>
    </div></div>`;
  }
  if (tab === "payout") {
    return `<div class="card"><div class="form-card">
      <h3>${LANG==='ko'?'정산 계좌':'Bank Account'}</h3>
      <div class="form-row"><label>${LANG==='ko'?'국가':'Country'}</label><select><option>🇰🇷 Korea</option></select></div>
      <div class="form-row"><label>${LANG==='ko'?'은행':'Bank'}</label><select><option>KB 국민은행</option><option>신한은행</option><option>우리은행</option></select></div>
      <div class="form-row"><label>${LANG==='ko'?'예금주':'Holder'}</label><input type="text" value="(주) Moonlight Studios"></div>
      <div class="form-row"><label>${LANG==='ko'?'계좌번호':'Account #'}</label><input type="text" value="123-456-789-78"></div>
      <h3 style="margin-top:24px">${LANG==='ko'?'세금 정보':'Tax Info'}</h3>
      <div class="form-row"><label>${LANG==='ko'?'세율':'Tax rate'}</label><input type="text" value="10% VAT"></div>
      <div class="form-row"><label>${LANG==='ko'?'사업자증빙':'Tax doc'}</label><div class="upload-box small">📄 ${LANG==='ko'?'업로드 완료':'Uploaded'}</div></div>
      <button class="btn-primary">${t('save')}</button>
    </div></div>`;
  }
  if (tab === "team") {
    const members = LANG==='ko'
      ? [["이상민","대표 / Owner","partner@moonlight.studio"],["박지영","에디터 / Editor","jiyoung@moonlight.studio"],["최민호","마케팅 / Marketing","minho@moonlight.studio"]]
      : [["Lee Sangmin","Owner","partner@moonlight.studio"],["Park Jiyoung","Editor","jiyoung@moonlight.studio"],["Choi Minho","Marketing","minho@moonlight.studio"]];
    return `<div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'이름':'Name'}</th><th>${LANG==='ko'?'권한':'Role'}</th><th>${LANG==='ko'?'이메일':'Email'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>${members.map(m => `<tr><td><strong>${m[0]}</strong></td><td>${m[1]}</td><td class="muted">${m[2]}</td><td><button class="like-btn">${t('edit')}</button></td></tr>`).join('')}</tbody>
      </table>
      <div style="padding:16px"><button class="btn-primary">＋ ${LANG==='ko'?'팀원 초대':'Invite member'}</button></div>
    </div>`;
  }
  if (tab === "api") {
    return `<div class="card"><div class="form-card">
      <h3>${LANG==='ko'?'API 키':'API Keys'}</h3>
      <p class="muted" style="margin-bottom:16px">${LANG==='ko'?'외부 사이트에 콘텐츠를 임베딩하거나 데이터를 가져올 때 사용하세요.':'Use to embed content or fetch data from your own site.'}</p>
      <div class="api-row"><div><strong>Live key</strong><div class="muted">${LANG==='ko'?'프로덕션용':'Production'}</div></div><code class="link-code">sk_live_4f8d2a••••••••••</code><button class="like-btn">${LANG==='ko'?'복사':'Copy'}</button><button class="like-btn no">${LANG==='ko'?'재발급':'Regen'}</button></div>
      <div class="api-row"><div><strong>Test key</strong><div class="muted">${LANG==='ko'?'테스트용':'Test'}</div></div><code class="link-code">sk_test_aa1b3c••••••••</code><button class="like-btn">${LANG==='ko'?'복사':'Copy'}</button><button class="like-btn no">${LANG==='ko'?'재발급':'Regen'}</button></div>
      <h3 style="margin-top:24px">Webhooks</h3>
      <div class="api-row"><div><strong>order.completed</strong><div class="muted">https://api.moonlight.studio/hooks/order</div></div><span class="status-badge published">${LANG==='ko'?'활성':'Active'}</span></div>
    </div></div>`;
  }
  // notif
  const items = LANG==='ko'
    ? [["새 결제 알림","콘텐츠가 결제될 때마다",1],["일일 리포트","매일 오전 9시 매출 요약",1],["검수 결과","승인/반려 시 즉시",1],["주간 리포트","매주 월요일",0],["프로모션 제안","플랫폼 마케팅 제안",0]]
    : [["New order","Each time a purchase happens",1],["Daily report","Revenue summary at 9AM",1],["Review result","On approval/rejection",1],["Weekly report","Mondays",0],["Promotion offers","Platform marketing offers",0]];
  return `<div class="card"><div class="form-card">${items.map(([t,d,c])=>`
    <div class="toggle-row"><div><div class="tr-t">${t}</div><div class="tr-d">${d}</div></div>
    <label class="switch"><input type="checkbox" ${c?'checked':''}><span class="slider"></span></label></div>`).join('')}</div></div>`;
}

// ============ NOTIFICATIONS ============
function renderNotifs() {
  const list = document.getElementById("notifList");
  if (!list) return;
  list.innerHTML = NOTIFICATIONS.map(n => `
    <div class="notif-row"><span class="notif-dot ${n.type}"></span><div><p>${tx(n.text)}</p><span>${n.time} ago</span></div></div>
  `).join('');
}

// ============ UPLOAD WIZARD ============
function openUpload() {
  upStep = 1;
  document.getElementById("uploadModal").classList.remove("hidden");
  renderUpStep();
}

function renderUpStep() {
  const labels = ['up_step1','up_step2','up_step3','up_step4','up_step5','up_step6'];
  document.getElementById("upStepper").innerHTML = labels.map((k,i) =>
    `<div class="up-step ${upStep>i?'done':''} ${upStep===i+1?'active':''}"><i>${upStep>i+1?'✓':i+1}</i><span>${t(k)}</span></div>`
  ).join('');

  const body = document.getElementById("upBody");
  if (upStep === 1) {
    body.innerHTML = `
      <h2>${t('up_step1')}</h2>
      <div class="form-card">
        <div class="form-row"><label>${t('field_title')}</label><input type="text" id="f_title" value="${upState.title}" placeholder="${LANG==='ko'?'예) 달빛 아래 그대':'e.g. Moonlight With You'}"></div>
        <div class="form-row"><label>${t('field_desc')}</label><textarea rows="3" id="f_desc">${upState.desc}</textarea></div>
        <div class="form-row"><label>${t('field_genre')}</label><select id="f_genre"><option value="">${LANG==='ko'?'선택':'Select'}</option>${GENRES.map(g=>`<option ${upState.genre===g?'selected':''}>${g}</option>`).join('')}</select></div>
        <div class="form-row"><label>${t('field_country')}</label><input type="text" id="f_country" value="${upState.country}" placeholder="🇰🇷 Korea"></div>
        <div class="form-row"><label>${t('field_year')}</label><input type="number" id="f_year" value="${upState.year}" placeholder="2024"></div>
        <div class="form-row"><label>${t('field_cast')}</label><input type="text" id="f_cast" value="${upState.cast}" placeholder="${LANG==='ko'?'쉼표로 구분':'Comma separated'}"></div>
        <div class="form-row"><label>${t('field_director')}</label><input type="text" id="f_director" value="${upState.director}"></div>
        <div class="form-row"><label>${t('field_age')}</label><select id="f_age"><option>All</option><option>12+</option><option selected>15+</option><option>18+</option></select></div>
      </div>
      ${upActions(false, true)}`;
  }
  else if (upStep === 2) {
    body.innerHTML = `
      <h2>${t('up_step2')}</h2>
      <div class="form-card">
        <label class="up-label">${t('upload_video')} (MP4, MOV · max 50GB)</label>
        <div class="upload-box ${upState.videoFile?'filled':''}" onclick="fakeFile('video')">${upState.videoFile?'✅ ' + upState.videoFile:'🎬 ' + t('upload_file')}</div>
        <div class="up-progress ${upState.videoFile?'show':''}"><div class="up-progress-fill"></div><span>${LANG==='ko'?'자동 인코딩 진행중...':'Auto-encoding...'}</span></div>

        <label class="up-label" style="margin-top:20px">${t('upload_thumb')} (JPG, PNG · 16:9)</label>
        <div class="upload-box small ${upState.thumbFile?'filled':''}" onclick="fakeFile('thumb')">${upState.thumbFile?'✅ ' + upState.thumbFile:'🖼 ' + t('upload_file')}</div>

        <p class="muted" style="margin-top:12px">${LANG==='ko'?'※ 시리즈인 경우 모든 에피소드를 한꺼번에 업로드할 수 있습니다.':'※ For series, you can batch-upload all episodes.'}</p>
      </div>
      ${upActions(true, true)}`;
  }
  else if (upStep === 3) {
    body.innerHTML = `
      <h2>${t('up_step3')}</h2>
      <p class="muted" style="margin-bottom:16px">${LANG==='ko'?'다국어 자막을 미리 업로드하면 글로벌 노출에 유리합니다.':'Pre-uploading multi-language subtitles helps global discovery.'}</p>
      <div class="form-card">
        <table class="data-table">
          <thead><tr><th>${LANG==='ko'?'언어':'Language'}</th><th>${LANG==='ko'?'파일':'File'}</th><th>${LANG==='ko'?'상태':'Status'}</th></tr></thead>
          <tbody>
            <tr><td>🇰🇷 Korean</td><td><div class="upload-box mini" onclick="fakeFile('sub-ko')">📝 .srt</div></td><td><span class="status-badge published">${LANG==='ko'?'필수':'Required'}</span></td></tr>
            <tr><td>🇺🇸 English</td><td><div class="upload-box mini" onclick="fakeFile('sub-en')">📝 .srt</div></td><td><span class="muted">${LANG==='ko'?'권장':'Recommended'}</span></td></tr>
            <tr><td>🇯🇵 Japanese</td><td><div class="upload-box mini" onclick="fakeFile('sub-ja')">📝 .srt</div></td><td><span class="muted">${LANG==='ko'?'선택':'Optional'}</span></td></tr>
            <tr><td>🇨🇳 Chinese</td><td><div class="upload-box mini" onclick="fakeFile('sub-zh')">📝 .srt</div></td><td><span class="muted">${LANG==='ko'?'선택':'Optional'}</span></td></tr>
            <tr><td>＋ ${LANG==='ko'?'언어 추가':'Add language'}</td><td colspan="2"></td></tr>
          </tbody>
        </table>
        <div class="ai-suggest"><span>✨ ${LANG==='ko'?'AI 자동 자막 생성':'AI Auto-subtitle'}</span><label class="switch"><input type="checkbox"><span class="slider"></span></label></div>
      </div>
      ${upActions(true, true)}`;
  }
  else if (upStep === 4) {
    body.innerHTML = `
      <h2>${t('up_step4')}</h2>
      <div class="form-card">
        <label class="up-label">${LANG==='ko'?'판매 방식':'Sales Type'} <em>${LANG==='ko'?'복수 선택 가능':'Multiple OK'}</em></label>
        <div class="check-row">
          <label class="chk"><input type="checkbox" checked><div><strong>${t('sales_tvod')}</strong><span>${LANG==='ko'?'유저가 화질·기간별로 구매':'Users buy per quality / period'}</span></div></label>
          <label class="chk"><input type="checkbox"><div><strong>${t('sales_svod')}</strong><span>${LANG==='ko'?'멤버십 구독자에게도 노출':'Visible to subscribers too'}</span></div></label>
          <label class="chk"><input type="checkbox"><div><strong>${t('sales_free')}</strong><span>${LANG==='ko'?'기간 한정 무료':'Time-limited free'}</span></div></label>
        </div>

        <label class="up-label" style="margin-top:20px">${t('base_price')} (KRW)</label>
        <div class="price-grid">
          <div class="pp-row"><span>HD · 2 days</span><input type="number" value="2900"></div>
          <div class="pp-row"><span>HD · 7 days</span><input type="number" value="4900"></div>
          <div class="pp-row"><span>FHD · 30 days</span><input type="number" value="7900"></div>
          <div class="pp-row"><span>4K · 30 days</span><input type="number" value="9900"></div>
          <div class="pp-row"><span>4K · Own</span><input type="number" value="14900"></div>
        </div>

        <label class="up-label" style="margin-top:20px">${t('country_diff')}</label>
        <p class="muted">${LANG==='ko'?'미설정 시 기본 가격이 환율로 자동 변환됩니다.':'If not set, base price auto-converts by exchange rate.'}</p>
      </div>
      ${upActions(true, true)}`;
  }
  else if (upStep === 5) {
    body.innerHTML = `
      <h2>${t('up_step5')}</h2>
      <p class="muted" style="margin-bottom:16px">${LANG==='ko'?'서비스할 국가를 선택하세요. 판권이 없는 지역에서는 자동 차단됩니다.':'Pick where to publish. Restricted regions are blocked automatically.'}</p>
      <div class="form-card">
        <div class="region-actions">
          <button class="like-btn" onclick="toast('${LANG==='ko'?'전 세계 선택됨':'All countries selected'}')">${LANG==='ko'?'전 세계':'Worldwide'}</button>
          <button class="like-btn" onclick="toast('${LANG==='ko'?'아시아 선택됨':'Asia selected'}')">${LANG==='ko'?'아시아만':'Asia only'}</button>
          <button class="like-btn">${LANG==='ko'?'직접 선택':'Custom'}</button>
        </div>
        <div class="region-grid">
          ${COUNTRIES_LIST.map(c => `<label class="chk small"><input type="checkbox" ${Math.random()>0.3?'checked':''}><span>${c}</span></label>`).join('')}
        </div>
      </div>
      ${upActions(true, true)}`;
  }
  else if (upStep === 6) {
    body.innerHTML = `
      <h2>${t('up_step6')}</h2>
      <div class="form-card review-summary-card">
        <div class="rs-row"><span>${t('field_title')}</span><strong>${document.getElementById('f_title')?.value || '달빛 아래 그대'}</strong></div>
        <div class="rs-row"><span>${t('field_genre')}</span><strong>Drama / Romance</strong></div>
        <div class="rs-row"><span>${LANG==='ko'?'영상':'Video'}</span><strong>moonlight_ep1.mp4 (4.2GB) ✅</strong></div>
        <div class="rs-row"><span>${LANG==='ko'?'썸네일':'Thumbnail'}</span><strong>moonlight_thumb.jpg ✅</strong></div>
        <div class="rs-row"><span>${LANG==='ko'?'자막':'Subtitles'}</span><strong>KO, EN, JA</strong></div>
        <div class="rs-row"><span>${LANG==='ko'?'판매 방식':'Sales'}</span><strong>TVOD</strong></div>
        <div class="rs-row"><span>${t('base_price')}</span><strong>₩2,900 ~ ₩14,900</strong></div>
        <div class="rs-row"><span>${LANG==='ko'?'서비스 국가':'Regions'}</span><strong>120 ${LANG==='ko'?'개국':'countries'}</strong></div>
      </div>
      <div class="agree-row">
        <label class="chk"><input type="checkbox" checked><span>${LANG==='ko'?'콘텐츠의 모든 권리를 보유하고 있음을 확인합니다':'I confirm I own all rights to this content'}</span></label>
        <label class="chk"><input type="checkbox" checked><span>${LANG==='ko'?'StoryHub 파트너 약관에 동의합니다':'I agree to StoryHub Partner Terms'}</span></label>
      </div>
      ${upActions(true, false, true)}`;
  }
}

function upActions(showBack, showNext, showSubmit) {
  return `<div class="up-actions">
    ${showBack ? `<button class="btn-secondary" onclick="upStep--; renderUpStep();">${t('back')}</button>` : `<button class="btn-secondary" onclick="closeModal('uploadModal')">${t('cancel')}</button>`}
    ${showNext ? `<button class="btn-primary" onclick="upStep++; renderUpStep();">${t('next')} →</button>` : ''}
    ${showSubmit ? `<button class="btn-primary" onclick="upSubmit()">${t('submit')}</button>` : ''}
  </div>`;
}

function fakeFile(type) {
  if (type === "video") upState.videoFile = "moonlight_ep1.mp4 (4.2GB)";
  else if (type === "thumb") upState.thumbFile = "moonlight_thumb.jpg";
  toast(LANG==='ko'?'파일 업로드 완료':'File uploaded');
  renderUpStep();
}

function upSubmit() {
  document.getElementById("upBody").innerHTML = `
    <div class="up-success">
      <div class="success-icon">🎉</div>
      <h2>${t('review_done')}</h2>
      <p>${t('review_done_sub')}</p>
      <button class="btn-primary big" onclick="closeModal('uploadModal'); renderPage('content');">${LANG==='ko'?'콘텐츠 목록으로':'Go to content list'}</button>
    </div>`;
}

// ============ PAGE EVENTS ============
function bindPageEvents(name) {
  if (name === "content") {
    document.querySelectorAll("#ctFilter .ftab").forEach(b => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#ctFilter .ftab").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("ctBody").innerHTML = renderContentRows(b.dataset.filter);
      });
    });
  }
  if (name === "subtitles") {
    document.querySelectorAll("#subFilter .ftab").forEach(b => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#subFilter .ftab").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("subBody").innerHTML = renderSubsTable(b.dataset.subTab);
      });
    });
  }
  if (name === "settings") {
    document.querySelectorAll("#setTabs .ftab").forEach(b => {
      b.addEventListener("click", () => {
        document.querySelectorAll("#setTabs .ftab").forEach(x => x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("setBody").innerHTML = renderSetTab(b.dataset.set);
      });
    });
  }
}

// ============ COMMON ============
function closeModal(id) { document.getElementById(id).classList.add("hidden"); }
function toast(msg) {
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(window._t);
  window._t = setTimeout(() => el.classList.add("hidden"), 2200);
}