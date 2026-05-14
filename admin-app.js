let LANG = "ko";
let isLoggedIn = false;
let currentPage = "dashboard";
let liveTimer = null;

document.addEventListener("DOMContentLoaded", () => {
  applyI18n();
});

function t(k){ return T[LANG][k] ?? k; }
function tx(o){ return o[LANG] ?? o.ko ?? o.en; }
function applyI18n(){
  document.documentElement.lang = LANG;
  document.querySelectorAll("[data-i18n]").forEach(el=>{
    const k = el.getAttribute("data-i18n");
    if(T[LANG][k]) el.textContent = T[LANG][k];
  });
  if(isLoggedIn) renderPage(currentPage);
}

function enterAdmin(){
  isLoggedIn = true;
  document.getElementById("loginOverlay").classList.add("hidden");
  document.getElementById("console").classList.remove("hidden");
  bindConsole();
  renderPage("dashboard");
  renderNotifs();
}

function bindConsole(){
  document.getElementById("langSelect").addEventListener("change", e=>{ LANG=e.target.value; applyI18n(); });
  document.querySelectorAll("[data-page]").forEach(a=>{
    a.addEventListener("click", e=>{ e.preventDefault(); renderPage(a.dataset.page); });
  });
  document.getElementById("avatarBtn").addEventListener("click", e=>{
    e.stopPropagation();
    document.getElementById("profileMenu").classList.toggle("hidden");
  });
  document.getElementById("bellBtn").addEventListener("click", e=>{
    e.stopPropagation();
    document.getElementById("notifDrawer").classList.toggle("hidden");
  });
  document.addEventListener("click", e=>{
    if(!e.target.closest(".profile-wrap")) document.getElementById("profileMenu")?.classList.add("hidden");
    if(!e.target.closest("#bellBtn") && !e.target.closest("#notifDrawer")) document.getElementById("notifDrawer")?.classList.add("hidden");
  });
  document.getElementById("btnLogout").addEventListener("click", e=>{ e.preventDefault(); logout(); });
  document.getElementById("pmLogout").addEventListener("click", e=>{ e.preventDefault(); logout(); });
  document.querySelectorAll(".modal-backdrop").forEach(b=>
    b.addEventListener("click", e=>{ if(e.target===b) b.classList.add("hidden"); }));
}

function logout(){
  isLoggedIn = false;
  if(liveTimer){ clearInterval(liveTimer); liveTimer = null; }
  document.getElementById("loginOverlay").classList.remove("hidden");
  document.getElementById("console").classList.add("hidden");
}

function renderPage(name){
  currentPage = name;
  document.querySelectorAll("#sbNav a").forEach(a=>a.classList.toggle("active", a.dataset.page===name));
  if(liveTimer && name !== "dashboard"){ clearInterval(liveTimer); liveTimer = null; }
  const page = document.getElementById("page");
  if(name==="dashboard") { page.innerHTML = renderDashboard(); startLiveFeed(); }
  else if(name==="review") page.innerHTML = renderReview();
  else if(name==="content") page.innerHTML = renderContent();
  else if(name==="partners") page.innerHTML = renderPartners();
  else if(name==="users") page.innerHTML = renderUsers();
  else if(name==="reports") page.innerHTML = renderReports();
  else if(name==="subtitle") page.innerHTML = renderSubtitleReview();
  else if(name==="settlements") page.innerHTML = renderSettlements();
  else if(name==="featured") page.innerHTML = renderFeatured();
  else if(name==="promotions") page.innerHTML = renderPromotions();
  else if(name==="analytics") page.innerHTML = renderAnalytics();
  else if(name==="system") page.innerHTML = renderSystem();
  bindPageEvents(name);
  page.scrollTop = 0;
}

// ============ DASHBOARD ============
function renderDashboard(){
  const max = Math.max(...GMV_DAILY.map(d=>d.v));
  const points = GMV_DAILY.map((d,i)=>{
    const x = (i/(GMV_DAILY.length-1))*100;
    const y = 100-(d.v/max)*88;
    return (i===0?'M':'L')+x.toFixed(1)+','+y.toFixed(1);
  }).join(' ');
  const area = points + ` L 100,100 L 0,100 Z`;

  return `
    <div class="page-head">
      <h1>${t('page_dashboard')}</h1><p>${t('page_dashboard_sub')}</p>
    </div>

    <div class="kpi-grid k6">
      ${kpi('💴', t('kpi_gmv'), '₩'+KPI.gmv.value.toLocaleString(), KPI.gmv.delta)}
      ${kpi('👥', t('kpi_dau'), KPI.dau.value.toLocaleString(), KPI.dau.delta)}
      ${kpi('🌐', t('kpi_mau'), (KPI.mau.value/1000000).toFixed(2)+'M', KPI.mau.delta)}
      ${kpi('🤝', t('kpi_partners'), KPI.partners.value.toLocaleString(), KPI.partners.delta)}
      ${kpi('🎞', t('kpi_content'), KPI.content.value.toLocaleString(), KPI.content.delta)}
      ${kpi('⏳', t('kpi_pending'), KPI.pending.value, null, '검수')}
    </div>

    <div class="card">
      <div class="card-head"><h3>${t('sec_quick_actions')}</h3></div>
      <div class="quick-grid">
        <button class="qa-card" onclick="renderPage('review')"><span class="qa-icon">📝</span><div><strong>12</strong><span>${LANG==='ko'?'콘텐츠 검수':'Content Review'}</span></div></button>
        <button class="qa-card" onclick="renderPage('subtitle')"><span class="qa-icon">💬</span><div><strong>38</strong><span>${LANG==='ko'?'자막 검수':'Subtitle Review'}</span></div></button>
        <button class="qa-card" onclick="renderPage('reports')"><span class="qa-icon red">🚩</span><div><strong>7</strong><span>${LANG==='ko'?'신고 처리':'Reports'}</span></div></button>
        <button class="qa-card" onclick="renderPage('partners')"><span class="qa-icon">🤝</span><div><strong>4</strong><span>${LANG==='ko'?'파트너 신청':'Partner Apps'}</span></div></button>
        <button class="qa-card" onclick="renderPage('settlements')"><span class="qa-icon green">💰</span><div><strong>5</strong><span>${LANG==='ko'?'정산 대기':'Pending Payouts'}</span></div></button>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head row">
          <h3>${t('sec_revenue_chart')}</h3>
          <select class="select-mini"><option>30d</option><option>7d</option><option>90d</option></select>
        </div>
        <div class="chart-wrap">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="line-chart">
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#00d4d4" stop-opacity="0.45"/><stop offset="100%" stop-color="#00d4d4" stop-opacity="0"/></linearGradient></defs>
            <path d="${area}" fill="url(#g1)"/>
            <path d="${points}" stroke="#00d4d4" stroke-width="0.6" fill="none" vector-effect="non-scaling-stroke"/>
          </svg>
        </div>
        <div class="chart-caption">${LANG==='ko'?'1일 평균':'Daily avg'} <strong>₩412M</strong> · ${LANG==='ko'?'오늘':'Today'} <strong>₩482M</strong> ↑12.4%</div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${t('sec_country_share')}</h3></div>
        <div class="hbar-list">
          ${COUNTRY_SHARE.map(c=>`
            <div class="hbar-row">
              <span class="hbar-label">${c.code} ${tx(c.name)}</span>
              <div class="hbar-track"><div class="hbar-fill" style="width:${c.pct*3}%"></div></div>
              <span class="hbar-val">${c.pct}%</span>
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head row"><h3>${t('sec_live')}</h3><span class="live-dot"><i></i> LIVE</span></div>
        <div class="live-feed" id="liveFeed"></div>
      </div>
      <div class="card">
        <div class="card-head"><h3>${t('sec_health')}</h3></div>
        <div class="health-list">
          ${HEALTH.map(h=>`
            <div class="health-row">
              <span class="hl-name">${h.name}</span>
              <span class="hl-uptime">${h.uptime}%</span>
              <span class="hl-latency">${h.latency}</span>
              <span class="hl-status ${h.status}">${h.status==='ok'?'OK':'WARN'}</span>
            </div>`).join('')}
        </div>
      </div>
    </div>`;
}

function kpi(icon, label, value, delta, sub){
  let d='';
  if(delta!=null){ const cls=delta>=0?'up':'down'; d=`<span class="delta ${cls}">${delta>=0?'↑':'↓'} ${Math.abs(delta)}%</span>`; }
  else if(sub) d=`<span class="delta neutral">${sub}</span>`;
  return `<div class="kpi"><div class="kpi-icon">${icon}</div><div class="kpi-body"><div class="kpi-label">${label}</div><div class="kpi-value">${value}</div>${d}</div></div>`;
}

function startLiveFeed(){
  const feed = document.getElementById("liveFeed");
  if(!feed) return;
  feed.innerHTML = "";
  pushLive(); pushLive(); pushLive();
  if(liveTimer) clearInterval(liveTimer);
  liveTimer = setInterval(pushLive, 3500);
}
function pushLive(){
  const feed = document.getElementById("liveFeed");
  if(!feed) return;
  const tpl = LIVE_TEMPLATES[Math.floor(Math.random()*LIVE_TEMPLATES.length)];
  const row = document.createElement("div");
  row.className = "lf-row";
  const time = new Date().toLocaleTimeString();
  row.innerHTML = `<span class="lf-type ${tpl.type}"></span><span class="lf-text">${tpl[LANG]}</span><span class="lf-time">${time}</span>`;
  feed.prepend(row);
  while(feed.children.length>8) feed.removeChild(feed.lastChild);
}

// ============ REVIEW QUEUE ============
function renderReview(){
  return `
    <div class="page-head row">
      <div><h1>${t('page_review')}</h1><p>${t('page_review_sub')}</p></div>
      <div class="page-actions">
        <button class="btn-outline">${LANG==='ko'?'CSV 내보내기':'Export CSV'}</button>
      </div>
    </div>
    <div class="filter-tabs">
      <button class="ftab active">${LANG==='ko'?'전체':'All'} <em>${REVIEW_QUEUE.length}</em></button>
      <button class="ftab">${LANG==='ko'?'우선처리':'Priority'} <em>${REVIEW_QUEUE.filter(r=>r.priority==='high').length}</em></button>
      <button class="ftab">${LANG==='ko'?'48h 초과':'Over 48h'} <em>2</em></button>
    </div>
    <div class="card no-pad">
      <table class="data-table">
        <thead><tr>
          <th>${t('th_partner')}</th><th>${t('th_content')}</th><th>${t('th_type')}</th>
          <th>${t('th_submitted')}</th><th>${t('th_priority')}</th><th>${t('th_action')}</th>
        </tr></thead>
        <tbody>
          ${REVIEW_QUEUE.map(r=>`
            <tr>
              <td>${r.partner}</td>
              <td><div class="ct-cell"><div class="ct-thumb" style="background:${r.thumb}"></div><strong>${r.content}</strong></div></td>
              <td class="muted">${r.type}</td>
              <td class="muted">${r.submitted}</td>
              <td><span class="prio ${r.priority}">${r.priority.toUpperCase()}</span></td>
              <td><button class="btn-primary small" onclick="openReview('${r.id}')">${t('btn_review')}</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function openReview(id){
  const r = REVIEW_QUEUE.find(x=>x.id===id); if(!r) return;
  document.getElementById("reviewBody").innerHTML = `
    <h2>${t('review_modal_title')}</h2>
    <div class="rv-grid">
      <div class="rv-left">
        <div class="rv-preview" style="background:${r.thumb}">
          <div class="play-icon">▶</div>
          <span class="rv-meta">1080p · 124min · ${LANG==='ko'?'음성':'Audio'} 5.1ch · ${LANG==='ko'?'자막':'Subs'} 3</span>
        </div>
        <div class="rv-info">
          <h3>${r.content}</h3>
          <p class="muted">${r.partner} · ${r.type}</p>
          <div class="rv-meta-grid">
            <div><span>${LANG==='ko'?'장르':'Genre'}</span><strong>${r.details.genre}</strong></div>
            <div><span>${LANG==='ko'?'국가':'Country'}</span><strong>${r.details.country}</strong></div>
            <div><span>${LANG==='ko'?'제작':'Year'}</span><strong>${r.details.year}</strong></div>
            <div><span>${LANG==='ko'?'관람연령':'Age'}</span><strong>${r.details.age}</strong></div>
          </div>
        </div>
        <div class="rv-files">
          <div class="rv-file ok">📹 video.mp4 (4.2GB) · ${LANG==='ko'?'인코딩 완료':'Encoded'}</div>
          <div class="rv-file ok">🖼 thumbnail.jpg · 16:9 · OK</div>
          <div class="rv-file ok">📝 ko.srt, en.srt, ja.srt</div>
          <div class="rv-file ok">📄 license_doc.pdf</div>
        </div>
      </div>
      <div class="rv-right">
        <h4>${t('checklist_title')}</h4>
        <div class="checklist">
          ${CHECKLIST.map((c,i)=>`
            <label class="cl-row"><input type="checkbox" ${i<7?'checked':''}><span>${tx(c)}</span></label>
          `).join('')}
        </div>
        <div class="ai-detect">
          <strong>🤖 ${LANG==='ko'?'AI 자동 검토 결과':'AI Auto-check'}</strong>
          <ul>
            <li class="ok">${LANG==='ko'?'폭력성/선정성 점수: 정상':'Violence/explicit: OK'}</li>
            <li class="ok">${LANG==='ko'?'음원 핑거프린팅: 일치 라이선스 확인됨':'Audio fingerprint: licensed'}</li>
            <li class="warn">${LANG==='ko'?'자막 동기화 1.2초 오차 (자동 보정 권장)':'Subtitle off by 1.2s (auto-fix suggested)'}</li>
          </ul>
        </div>
        <h4 style="margin-top:18px">${t('reject_reason')} <em class="muted">(${LANG==='ko'?'반려 시 필수':'required for reject'})</em></h4>
        <textarea class="rv-reason" rows="3" placeholder="${LANG==='ko'?'반려 사유를 입력하세요':'Enter rejection reason...'}"></textarea>

        <div class="rv-actions">
          <button class="btn-secondary" onclick="closeModal('reviewModal')">${LANG==='ko'?'닫기':'Close'}</button>
          <button class="btn-danger" onclick="actReview('reject')">${t('btn_reject')}</button>
          <button class="btn-success" onclick="actReview('approve')">${t('btn_approve')}</button>
        </div>
      </div>
    </div>`;
  document.getElementById("reviewModal").classList.remove("hidden");
}

function actReview(action){
  closeModal('reviewModal');
  toast(action==='approve' ? (LANG==='ko'?'✅ 승인되었습니다':'✅ Approved') : (LANG==='ko'?'❌ 반려되었습니다':'❌ Rejected'));
}

// ============ CONTENT MGMT ============
function renderContent(){
  return `
    <div class="page-head"><h1>${t('page_content')}</h1><p>${t('page_content_sub')}</p></div>
    <div class="filter-tabs" id="ctFilter">
      <button class="ftab active" data-cf="all">All <em>${ALL_CONTENT.length}</em></button>
      <button class="ftab" data-cf="published">${t('status_published')} <em>${ALL_CONTENT.filter(c=>c.status==='published').length}</em></button>
      <button class="ftab" data-cf="review">${t('status_review')} <em>${ALL_CONTENT.filter(c=>c.status==='review').length}</em></button>
      <button class="ftab" data-cf="rejected">${t('status_rejected')} <em>${ALL_CONTENT.filter(c=>c.status==='rejected').length}</em></button>
      <button class="ftab" data-cf="blocked">${t('status_blocked')} <em>${ALL_CONTENT.filter(c=>c.status==='blocked').length}</em></button>
    </div>
    <div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>${t('th_content')}</th><th>${t('th_partner')}</th><th>${LANG==='ko'?'국가':'Country'}</th><th class="r">${LANG==='ko'?'시청수':'Views'}</th><th class="r">${LANG==='ko'?'매출':'Revenue'}</th><th>${LANG==='ko'?'상태':'Status'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody id="ctBody">${renderContentRows('all')}</tbody>
      </table>
    </div>`;
}

function renderContentRows(filter){
  const list = filter==='all' ? ALL_CONTENT : ALL_CONTENT.filter(c=>c.status===filter);
  return list.map(c=>`
    <tr>
      <td><strong>${c.title}</strong></td>
      <td>${c.partner}</td>
      <td>${c.country}</td>
      <td class="r">${c.views.toLocaleString()}</td>
      <td class="r"><strong>₩${c.rev.toLocaleString()}</strong></td>
      <td><span class="status-badge ${c.status}">${t('status_'+c.status)}</span></td>
      <td>
        <button class="like-btn">${t('view')}</button>
        ${c.status==='published' ? `<button class="like-btn no" onclick="confirmAction('block','${c.title}')">${LANG==='ko'?'차단':'Block'}</button>` : ''}
        ${c.status==='blocked' ? `<button class="like-btn ok" onclick="toast('${LANG==='ko'?'차단 해제됨':'Unblocked'}')">${LANG==='ko'?'해제':'Unblock'}</button>` : ''}
      </td>
    </tr>`).join('');
}

function confirmAction(type, target){
  const titles = {
    block: { ko: "콘텐츠 차단", en: "Block Content" },
    suspend: { ko: "사용자 정지", en: "Suspend User" },
    delete: { ko: "삭제", en: "Delete" }
  };
  document.getElementById("actionBody").innerHTML = `
    <h2>${tx(titles[type])}</h2>
    <p class="muted">${LANG==='ko'?'대상':'Target'}: <strong>${target}</strong></p>
    <div class="form-card" style="margin-top:16px">
      <label class="up-label">${LANG==='ko'?'사유':'Reason'}</label>
      <textarea rows="3" placeholder="${LANG==='ko'?'사유를 입력하세요':'Enter reason...'}"></textarea>
      ${type==='suspend' ? `
        <label class="up-label" style="margin-top:14px">${LANG==='ko'?'기간':'Duration'}</label>
        <select><option>1 ${LANG==='ko'?'일':'day'}</option><option selected>7 ${LANG==='ko'?'일':'days'}</option><option>30 ${LANG==='ko'?'일':'days'}</option><option>${LANG==='ko'?'영구':'Permanent'}</option></select>
      ` : ''}
      <label class="cl-row" style="margin-top:14px"><input type="checkbox" checked><span>${LANG==='ko'?'대상에게 알림 발송':'Notify the target'}</span></label>
    </div>
    <div class="rv-actions">
      <button class="btn-secondary" onclick="closeModal('actionModal')">${LANG==='ko'?'취소':'Cancel'}</button>
      <button class="btn-danger" onclick="closeModal('actionModal'); toast('${LANG==='ko'?'처리되었습니다':'Done'}')">${LANG==='ko'?'실행':'Execute'}</button>
    </div>`;
  document.getElementById("actionModal").classList.remove("hidden");
}

// ============ PARTNERS ============
function renderPartners(){
  return `
    <div class="page-head"><h1>${t('page_partners')}</h1><p>${t('page_partners_sub')}</p></div>

    <div class="card">
      <div class="card-head row"><h3>📥 ${t('pt_apps')} <em class="badge-num">${PARTNER_APPS.length}</em></h3></div>
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'회사명':'Company'}</th><th>${LANG==='ko'?'국가':'Country'}</th><th>${LANG==='ko'?'담당자':'Contact'}</th><th>${LANG==='ko'?'신청일':'Applied'}</th><th>${LANG==='ko'?'샘플':'Samples'}</th><th>${LANG==='ko'?'서류':'Docs'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>
          ${PARTNER_APPS.map(p=>`
            <tr>
              <td><strong>${p.name}</strong></td>
              <td>${p.country}</td>
              <td class="muted">${p.contact}</td>
              <td class="muted">${p.appliedAt}</td>
              <td>${p.samples} ${LANG==='ko'?'편':'titles'}</td>
              <td>${p.doc?'<span class="status-badge published">✓</span>':'<span class="status-badge rejected">미제출</span>'}</td>
              <td>
                <button class="like-btn" onclick="openPartnerApp('${p.id}')">${LANG==='ko'?'심사':'Review'}</button>
                <button class="like-btn ok" onclick="toast('${LANG==='ko'?'승인됨':'Approved'}')">${LANG==='ko'?'승인':'Approve'}</button>
                <button class="like-btn no" onclick="toast('${LANG==='ko'?'반려됨':'Rejected'}')">${LANG==='ko'?'반려':'Reject'}</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>

    <div class="card">
      <div class="card-head row"><h3>✅ ${t('pt_active')} <em class="muted">${PARTNERS_ACTIVE.length}</em></h3></div>
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'파트너':'Partner'}</th><th>${LANG==='ko'?'국가':'Country'}</th><th class="r">${LANG==='ko'?'콘텐츠':'Contents'}</th><th class="r">${LANG==='ko'?'이번달 매출':'MTD Rev'}</th><th class="r">${LANG==='ko'?'누적':'Total'}</th><th>${LANG==='ko'?'가입':'Since'}</th><th>${LANG==='ko'?'등급':'Tier'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>
          ${PARTNERS_ACTIVE.map(p=>`
            <tr>
              <td><strong>${p.name}</strong></td>
              <td>${p.country}</td>
              <td class="r">${p.contents}</td>
              <td class="r">₩${p.mtdRev.toLocaleString()}</td>
              <td class="r"><strong>₩${p.totalRev.toLocaleString()}</strong></td>
              <td class="muted">${p.since}</td>
              <td><span class="status-badge ${p.tier==='Verified'?'published':'review'}">${p.tier==='Verified'?'✅ Verified':'New'}</span></td>
              <td><button class="like-btn">${t('view')}</button> <button class="like-btn no">${LANG==='ko'?'정지':'Suspend'}</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function openPartnerApp(id){
  const p = PARTNER_APPS.find(x=>x.id===id); if(!p) return;
  document.getElementById("detailBody").innerHTML = `
    <h2>${LANG==='ko'?'파트너 신청 심사':'Partner Application Review'}</h2>
    <div class="form-card">
      <div class="rs-row"><span>${LANG==='ko'?'회사명':'Company'}</span><strong>${p.name}</strong></div>
      <div class="rs-row"><span>${LANG==='ko'?'국가':'Country'}</span><strong>${p.country}</strong></div>
      <div class="rs-row"><span>${LANG==='ko'?'담당자 이메일':'Contact'}</span><strong>${p.contact}</strong></div>
      <div class="rs-row"><span>${LANG==='ko'?'신청일':'Applied at'}</span><strong>${p.appliedAt}</strong></div>
      <div class="rs-row"><span>${LANG==='ko'?'샘플 콘텐츠':'Sample contents'}</span><strong>${p.samples} ${LANG==='ko'?'편':'titles'}</strong></div>
      <div class="rs-row"><span>${LANG==='ko'?'사업자등록증':'Business doc'}</span><strong>${p.doc?'✅ '+(LANG==='ko'?'제출됨':'submitted'):'❌ '+(LANG==='ko'?'미제출':'missing')}</strong></div>
    </div>
    <div class="form-card">
      <h4>${LANG==='ko'?'운영 메모':'Internal Note'}</h4>
      <textarea rows="3" placeholder="${LANG==='ko'?'심사 메모...':'Review note...'}"></textarea>
    </div>
    <div class="rv-actions">
      <button class="btn-secondary" onclick="closeModal('detailModal')">${LANG==='ko'?'닫기':'Close'}</button>
      <button class="btn-danger" onclick="closeModal('detailModal'); toast('${LANG==='ko'?'반려됨':'Rejected'}')">${LANG==='ko'?'반려':'Reject'}</button>
      <button class="btn-success" onclick="closeModal('detailModal'); toast('${LANG==='ko'?'승인되었습니다':'Approved'}')">${LANG==='ko'?'승인':'Approve'}</button>
    </div>`;
  document.getElementById("detailModal").classList.remove("hidden");
}

// ============ USERS ============
function renderUsers(){
  return `
    <div class="page-head row">
      <div><h1>${t('page_users')}</h1><p>${LANG==='ko'?'전체 사용자: 1,840,000명':'Total: 1,840,000 users'}</p></div>
      <div class="page-actions">
        <input type="text" class="search" placeholder="${LANG==='ko'?'사용자명, ID, 이메일 검색':'Search...'}" style="width:280px">
      </div>
    </div>
    <div class="filter-tabs">
      <button class="ftab active">${LANG==='ko'?'전체':'All'}</button>
      <button class="ftab">${LANG==='ko'?'활성':'Active'}</button>
      <button class="ftab">${LANG==='ko'?'정지':'Suspended'}</button>
      <button class="ftab">${LANG==='ko'?'영구정지':'Banned'}</button>
      <button class="ftab">${LANG==='ko'?'신규가입(7d)':'New (7d)'}</button>
    </div>
    <div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>ID</th><th>${LANG==='ko'?'사용자':'User'}</th><th>${LANG==='ko'?'국가':'Country'}</th><th>${LANG==='ko'?'가입':'Joined'}</th><th class="r">${LANG==='ko'?'구매':'Purchases'}</th><th class="r">${LANG==='ko'?'포인트':'Points'}</th><th>${LANG==='ko'?'상태':'Status'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>
          ${USERS.map(u=>`
            <tr>
              <td class="muted mono">${u.id}</td>
              <td><strong>${u.name}</strong></td>
              <td>${u.country}</td>
              <td class="muted">${u.joined}</td>
              <td class="r">${u.purchases}</td>
              <td class="r">${u.points.toLocaleString()}P</td>
              <td><span class="status-badge ${u.status==='active'?'published':'rejected'}">${t('status_'+u.status)}</span></td>
              <td>
                <button class="like-btn" onclick="openUserDetail('${u.id}')">${t('view')}</button>
                ${u.status==='active' ? `<button class="like-btn no" onclick="confirmAction('suspend','${u.name}')">${LANG==='ko'?'정지':'Suspend'}</button>` : `<button class="like-btn ok" onclick="toast('${LANG==='ko'?'정지 해제됨':'Unsuspended'}')">${LANG==='ko'?'해제':'Unsuspend'}</button>`}
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

function openUserDetail(id){
  const u = USERS.find(x=>x.id===id); if(!u) return;
  document.getElementById("detailBody").innerHTML = `
    <h2>👤 ${u.name}</h2>
    <p class="muted">${u.id} · ${u.country} · ${LANG==='ko'?'가입':'Joined'} ${u.joined}</p>
    <div class="ct-detail-stats" style="grid-template-columns:repeat(4,1fr)">
      <div><span>${LANG==='ko'?'구매':'Purchases'}</span><strong>${u.purchases}</strong></div>
      <div><span>${LANG==='ko'?'포인트':'Points'}</span><strong>${u.points.toLocaleString()}</strong></div>
      <div><span>${LANG==='ko'?'시청시간':'Watch'}</span><strong>${Math.round(u.purchases*42)}h</strong></div>
      <div><span>${LANG==='ko'?'신고':'Reports'}</span><strong>${u.status==='suspended'?3:0}</strong></div>
    </div>
    <h3 style="margin-top:20px">${LANG==='ko'?'최근 활동':'Recent Activity'}</h3>
    <div class="form-card">
      <div class="rs-row"><span>2025.01.18 14:20</span><strong>Moonlight With You ${LANG==='ko'?'시청':'watched'}</strong></div>
      <div class="rs-row"><span>2025.01.17 22:11</span><strong>${LANG==='ko'?'결제':'Paid'} ₩4,900</strong></div>
      <div class="rs-row"><span>2025.01.15 09:32</span><strong>${LANG==='ko'?'리뷰 작성':'Wrote review'}</strong></div>
      <div class="rs-row"><span>2025.01.12 18:00</span><strong>${LANG==='ko'?'로그인 (서울, iPhone)':'Login (Seoul, iPhone)'}</strong></div>
    </div>
    <div class="rv-actions">
      <button class="btn-secondary" onclick="closeModal('detailModal')">${LANG==='ko'?'닫기':'Close'}</button>
      <button class="btn-outline" onclick="toast('${LANG==='ko'?'알림 발송됨':'Notified'}')">${LANG==='ko'?'알림 발송':'Send notice'}</button>
      <button class="btn-danger" onclick="closeModal('detailModal'); confirmAction('suspend','${u.name}')">${LANG==='ko'?'정지':'Suspend'}</button>
    </div>`;
  document.getElementById("detailModal").classList.remove("hidden");
}

// ============ REPORTS ============
function renderReports(){
  return `
    <div class="page-head"><h1>${t('page_reports')}</h1></div>
    <div class="filter-tabs" id="repFilter">
      <button class="ftab active" data-rf="review">${t('rep_review')} <em>${REPORTS.review.length}</em></button>
      <button class="ftab" data-rf="comment">${t('rep_comment')} <em>${REPORTS.comment.length}</em></button>
      <button class="ftab" data-rf="content">${t('rep_content')} <em>${REPORTS.content.length}</em></button>
      <button class="ftab" data-rf="user">${t('rep_user')} <em>${REPORTS.user.length}</em></button>
    </div>
    <div id="repBody">${renderReportsList('review')}</div>`;
}

function renderReportsList(type){
  const list = REPORTS[type];
  if(!list || !list.length) return `<div class="card"><p class="muted">${LANG==='ko'?'처리할 신고가 없습니다':'No reports'}</p></div>`;
  return `<div class="report-list">
    ${list.map(r=>`
      <div class="report-card">
        <div class="rep-head">
          <span class="rep-id">#${r.id}</span>
          <span class="severity ${r.severity}">${r.severity.toUpperCase()}</span>
          <span class="rep-date">${r.date}</span>
        </div>
        <div class="rep-grid">
          <div><span>${LANG==='ko'?'신고자':'Reporter'}</span><strong>${r.reporter}</strong></div>
          <div><span>${LANG==='ko'?'대상':'Target'}</span><strong>${r.target}</strong></div>
          <div><span>${LANG==='ko'?'사유':'Reason'}</span><strong>${r.reason}</strong></div>
        </div>
        <div class="rep-content">"${r.content}"</div>
        <div class="rep-actions">
          <button class="btn-secondary small" onclick="toast('${LANG==='ko'?'기각됨':'Dismissed'}')">${LANG==='ko'?'기각':'Dismiss'}</button>
          <button class="like-btn no" onclick="toast('${LANG==='ko'?'경고 발송':'Warning sent'}')">${LANG==='ko'?'경고':'Warn'}</button>
          <button class="like-btn no" onclick="toast('${LANG==='ko'?'콘텐츠 삭제':'Content removed'}')">${LANG==='ko'?'삭제':'Remove'}</button>
          <button class="btn-danger small" onclick="confirmAction('suspend','${r.target}')">${LANG==='ko'?'사용자 정지':'Suspend user'}</button>
        </div>
      </div>`).join('')}
  </div>`;
}

// ============ SUBTITLE REVIEW ============
function renderSubtitleReview(){
  return `
    <div class="page-head"><h1>${t('page_subtitle')}</h1><p>${LANG==='ko'?'전 세계 사용자 기여 자막을 검수합니다':'Review community-contributed subtitles globally'}</p></div>
    <div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'콘텐츠':'Content'}</th><th>${LANG==='ko'?'언어':'Language'}</th><th>${LANG==='ko'?'기여자':'Contributor'}</th><th>${LANG==='ko'?'AI 점수':'AI Score'}</th><th>${LANG==='ko'?'줄 수':'Lines'}</th><th>${LANG==='ko'?'제출':'Submitted'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>
          ${SUB_QUEUE.map(s=>`
            <tr>
              <td><strong>${s.content}</strong></td>
              <td>${s.lang}</td>
              <td>${s.contributor}</td>
              <td>${aiScoreBar(s.aiScore)}</td>
              <td class="muted">${s.lines}</td>
              <td class="muted">${s.submitted}</td>
              <td>
                <button class="like-btn">${LANG==='ko'?'미리보기':'Preview'}</button>
                <button class="like-btn ok" onclick="toast('${LANG==='ko'?'승인됨':'Approved'}')">${LANG==='ko'?'승인':'Approve'}</button>
                <button class="like-btn no" onclick="toast('${LANG==='ko'?'반려됨':'Rejected'}')">${LANG==='ko'?'반려':'Reject'}</button>
              </td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}
function aiScoreBar(s){
  const cls = s>=4.5?'high':s>=4?'mid':'low';
  return `<div class="score-cell ${cls}">★ ${s}</div>`;
}

// ============ SETTLEMENTS ============
function renderSettlements(){
  const total = SETTLEMENTS.reduce((a,b)=>a+b.payable,0);
  return `
    <div class="page-head row">
      <div><h1>${t('page_settle')}</h1><p>${t('page_settle_sub')}</p></div>
      <div class="page-actions">
        <select class="select-mini"><option>${LANG==='ko'?'2025년 1월':'Jan 2025'}</option><option>${LANG==='ko'?'2024년 12월':'Dec 2024'}</option></select>
      </div>
    </div>

    <div class="settle-summary">
      <div class="ss-card primary">
        <div class="ss-lbl">${t('se_pending')}</div>
        <div class="ss-val">₩${total.toLocaleString()}</div>
      </div>
      <div class="ss-card">
        <div class="ss-lbl">${t('se_partners')}</div>
        <div class="ss-val">${SETTLEMENTS.length}</div>
      </div>
      <div class="ss-card">
        <div class="ss-lbl">${LANG==='ko'?'플랫폼 수수료':'Platform Fee'}</div>
        <div class="ss-val">₩${SETTLEMENTS.reduce((a,b)=>a+b.platformFee,0).toLocaleString()}</div>
      </div>
      <div class="ss-card">
        <div class="ss-lbl">${LANG==='ko'?'예정 지급일':'Payout Date'}</div>
        <div class="ss-val small">2025.02.15</div>
      </div>
    </div>

    <div class="card">
      <div class="card-head row">
        <h3>${LANG==='ko'?'정산 대상':'Settlement Items'}</h3>
        <div>
          <button class="btn-outline" onclick="toast('${LANG==='ko'?'정산 재계산 완료':'Recalculated'}')">${t('btn_calc')}</button>
          <button class="btn-primary" onclick="toast('${LANG==='ko'?'5건 일괄 지급 처리되었습니다':'5 payouts processed'}')">${t('btn_pay')}</button>
        </div>
      </div>
      <table class="data-table">
        <thead><tr>
          <th>${LANG==='ko'?'파트너':'Partner'}</th><th class="r">${LANG==='ko'?'총매출':'Gross'}</th>
          <th class="r">${LANG==='ko'?'수수료(20%)':'Fee (20%)'}</th><th class="r">${LANG==='ko'?'파트너 분배':'Partner Share'}</th>
          <th class="r">${LANG==='ko'?'이월':'Carry'}</th><th class="r">${LANG==='ko'?'지급액':'Payable'}</th>
          <th>${LANG==='ko'?'상태':'Status'}</th><th>${t('th_action')}</th>
        </tr></thead>
        <tbody>
          ${SETTLEMENTS.map(s=>`
            <tr>
              <td><strong>${s.country} ${s.partner}</strong></td>
              <td class="r">₩${s.grossRev.toLocaleString()}</td>
              <td class="r muted">−₩${s.platformFee.toLocaleString()}</td>
              <td class="r">₩${s.partnerShare.toLocaleString()}</td>
              <td class="r muted">+₩${s.prevPending.toLocaleString()}</td>
              <td class="r"><strong>₩${s.payable.toLocaleString()}</strong></td>
              <td><span class="status-badge ${s.status==='ready'?'published':'review'}">${s.status==='ready'?(LANG==='ko'?'준비':'Ready'):(LANG==='ko'?'보류':'Hold')}</span></td>
              <td><button class="like-btn">${LANG==='ko'?'명세서':'Statement'}</button> <button class="like-btn ok">${LANG==='ko'?'지급':'Pay'}</button></td>
            </tr>`).join('')}
        </tbody>
        <tfoot>
          <tr class="total-row">
            <td><strong>${LANG==='ko'?'합계':'TOTAL'}</strong></td>
            <td class="r"><strong>₩${SETTLEMENTS.reduce((a,b)=>a+b.grossRev,0).toLocaleString()}</strong></td>
            <td class="r"><strong>₩${SETTLEMENTS.reduce((a,b)=>a+b.platformFee,0).toLocaleString()}</strong></td>
            <td class="r"><strong>₩${SETTLEMENTS.reduce((a,b)=>a+b.partnerShare,0).toLocaleString()}</strong></td>
            <td class="r"><strong>₩${SETTLEMENTS.reduce((a,b)=>a+b.prevPending,0).toLocaleString()}</strong></td>
            <td class="r"><strong style="color:var(--accent2)">₩${total.toLocaleString()}</strong></td>
            <td colspan="2"></td>
          </tr>
        </tfoot>
      </table>
    </div>`;
}

// ============ FEATURED ============
function renderFeatured(){
  return `
    <div class="page-head"><h1>${t('page_feat')}</h1><p>${t('page_feat_sub')}</p></div>

    <div class="card">
      <div class="card-head row">
        <h3>🎬 ${t('feat_hero')}</h3>
        <button class="btn-primary small">＋ ${LANG==='ko'?'배너 추가':'Add Banner'}</button>
      </div>
      <div class="banner-grid">
        ${HERO_BANNERS.map((b,i)=>`
          <div class="banner-card">
            <div class="bn-thumb" style="background:${b.color}">
              <span class="bn-pos">SLOT ${i+1}</span>
              <div class="bn-overlay">
                <strong>${b.title}</strong>
                <span>${b.sub}</span>
              </div>
            </div>
            <div class="bn-body">
              <div class="bn-row"><span>${LANG==='ko'?'기간':'Period'}</span><strong>${b.from} ~ ${b.to}</strong></div>
              <div class="bn-row"><span>${LANG==='ko'?'노출 지역':'Regions'}</span><strong>${b.regions.join(' ')}</strong></div>
              <div class="bn-row"><span>${LANG==='ko'?'클릭':'Clicks'}</span><strong>${b.clicks.toLocaleString()}</strong></div>
              <div class="bn-actions">
                <button class="like-btn">${LANG==='ko'?'편집':'Edit'}</button>
                <button class="like-btn no">${LANG==='ko'?'중지':'Stop'}</button>
              </div>
            </div>
          </div>`).join('')}
      </div>
    </div>

    <div class="card">
      <div class="card-head row"><h3>📋 ${t('feat_rows')}</h3><button class="btn-primary small">＋ ${LANG==='ko'?'행 추가':'Add Row'}</button></div>
      <div class="row-list">
        ${FEATURED_ROWS.map((r,i)=>`
          <div class="rl-row">
            <span class="rl-handle">⋮⋮</span>
            <span class="rl-num">${i+1}</span>
            <div class="rl-info">
              <strong>${tx(r.title)}</strong>
              <span class="muted">${r.count} ${LANG==='ko'?'작품':'titles'} · ${r.regions}</span>
            </div>
            <div class="rl-actions">
              <button class="like-btn">${LANG==='ko'?'편집':'Edit'}</button>
              <button class="like-btn">${LANG==='ko'?'복사':'Duplicate'}</button>
              <button class="like-btn no">${LANG==='ko'?'삭제':'Delete'}</button>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

// ============ PROMOTIONS ============
function renderPromotions(){
  return `
    <div class="page-head row">
      <div><h1>${t('page_promo')}</h1><p>${t('page_promo_sub')}</p></div>
      <div class="page-actions"><button class="btn-primary">＋ ${LANG==='ko'?'프로모션 만들기':'Create Promotion'}</button></div>
    </div>

    <div class="kpi-grid k4">
      ${kpi('🎟', LANG==='ko'?'활성 프로모션':'Active', '2', null)}
      ${kpi('💸', LANG==='ko'?'사용 횟수':'Total uses', '53,880', 14.2)}
      ${kpi('💰', LANG==='ko'?'할인 총액':'Discount total', '₩42M', null)}
      ${kpi('📈', LANG==='ko'?'전환 기여':'Conversion lift', '+18%', 18)}
    </div>

    <div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'코드':'Code'}</th><th>${LANG==='ko'?'설명':'Description'}</th><th class="r">${LANG==='ko'?'할인':'Discount'}</th><th class="r">${LANG==='ko'?'사용/한도':'Used / Max'}</th><th>${LANG==='ko'?'기간':'Period'}</th><th>${LANG==='ko'?'상태':'Status'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>
          ${PROMOS.map(p=>`
            <tr>
              <td><code class="link-code">${p.code}</code></td>
              <td>${tx(p.desc)}</td>
              <td class="r"><strong>${p.discount}%</strong></td>
              <td class="r">${p.used.toLocaleString()}${p.max?` / ${p.max.toLocaleString()}`:''}</td>
              <td class="muted">${p.from} ~ ${p.to}</td>
              <td><span class="status-badge ${p.status==='active'?'published':p.status==='scheduled'?'review':'rejected'}">${p.status==='active'?(LANG==='ko'?'진행중':'Active'):p.status==='scheduled'?(LANG==='ko'?'예정':'Scheduled'):(LANG==='ko'?'종료':'Ended')}</span></td>
              <td><button class="like-btn">${LANG==='ko'?'편집':'Edit'}</button> <button class="like-btn no">${LANG==='ko'?'중지':'Stop'}</button></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
}

// ============ ANALYTICS ============
function renderAnalytics(){
  const max = Math.max(...DAU_HISTORY.map(d=>d.dau));
  const dauPath = DAU_HISTORY.map((d,i)=>{
    const x = (i/(DAU_HISTORY.length-1))*100;
    const y = 100-(d.dau/max)*88;
    return (i===0?'M':'L')+x.toFixed(1)+','+y.toFixed(1);
  }).join(' ');

  return `
    <div class="page-head"><h1>${t('page_analytics')}</h1><p>${t('page_analytics_sub')}</p></div>

    <div class="kpi-grid k4">
      ${kpi('👥','DAU', '142,800', 8.2)}
      ${kpi('🌍','MAU', '1.84M', 15.6)}
      ${kpi('🔁','DAU/MAU', '7.8%', 1.2)}
      ${kpi('⏱', LANG==='ko'?'평균 세션':'Avg Session', '38m 24s', 3.4)}
    </div>

    <div class="card">
      <div class="card-head"><h3>${LANG==='ko'?'DAU 추이 (30일)':'DAU Trend (30d)'}</h3></div>
      <div class="chart-wrap big">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="line-chart">
          <defs><linearGradient id="g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#3a8aff" stop-opacity="0.4"/><stop offset="100%" stop-color="#3a8aff" stop-opacity="0"/></linearGradient></defs>
          <path d="${dauPath} L 100,100 L 0,100 Z" fill="url(#g2)"/>
          <path d="${dauPath}" stroke="#3a8aff" stroke-width="0.6" fill="none" vector-effect="non-scaling-stroke"/>
        </svg>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${LANG==='ko'?'전환 퍼널':'Conversion Funnel'}</h3></div>
        <div class="funnel">
          ${FUNNEL.map((f,i)=>`
            <div class="fn-row">
              <div class="fn-bar" style="width:${f.pct}%; background:linear-gradient(90deg, hsl(${200-i*20},70%,55%), hsl(${190-i*20},70%,45%))">
                <span class="fn-label">${tx(f.stage)}</span>
                <span class="fn-val">${f.value.toLocaleString()} <em>${f.pct}%</em></span>
              </div>
            </div>`).join('')}
        </div>
      </div>

      <div class="card">
        <div class="card-head"><h3>${LANG==='ko'?'코호트 잔존율':'Cohort Retention'}</h3></div>
        <div class="cohort">
          <div class="ch-head"><span></span><span>D1</span><span>D7</span><span>D14</span><span>D30</span></div>
          ${['Jan W4','Jan W3','Jan W2','Jan W1','Dec W4'].map((w,i)=>`
            <div class="ch-row">
              <span class="ch-label">${w}</span>
              ${[100, 64-i*3, 42-i*3, 28-i*2, 22-i*2].map((v,j)=>`
                <span class="ch-cell" style="background:rgba(0,212,212,${v/100*0.9+0.05})">${v}%</span>
              `).join('')}
            </div>`).join('')}
        </div>
      </div>
    </div>

    <div class="dash-grid-2">
      <div class="card">
        <div class="card-head"><h3>${LANG==='ko'?'국가별 매출 TOP 10':'Top Countries'}</h3></div>
        <div class="hbar-list">
          ${COUNTRY_SHARE.map(c=>`<div class="hbar-row">
            <span class="hbar-label">${c.code} ${tx(c.name)}</span>
            <div class="hbar-track"><div class="hbar-fill" style="width:${c.pct*3}%; background:linear-gradient(90deg,#00d4d4,#3a8aff)"></div></div>
            <span class="hbar-val">${c.pct}%</span>
          </div>`).join('')}
        </div>
      </div>
      <div class="card">
        <div class="card-head"><h3>${LANG==='ko'?'상위 콘텐츠':'Top Content'}</h3></div>
        <div class="hbar-list">
          ${ALL_CONTENT.filter(c=>c.status==='published').sort((a,b)=>b.rev-a.rev).map(c=>{
            const max2 = Math.max(...ALL_CONTENT.map(x=>x.rev));
            return `<div class="hbar-row">
              <span class="hbar-label">${c.title}</span>
              <div class="hbar-track"><div class="hbar-fill" style="width:${(c.rev/max2)*100}%;background:linear-gradient(90deg,#ffb84d,#ff7a3a)"></div></div>
              <span class="hbar-val">₩${(c.rev/1000000).toFixed(1)}M</span>
            </div>`;
          }).join('')}
        </div>
      </div>
    </div>`;
}

// ============ SYSTEM ============
function renderSystem(){
  return `
    <div class="page-head"><h1>${t('page_system')}</h1></div>
    <div class="filter-tabs" id="sysTabs">
      <button class="ftab active" data-sys="categories">${LANG==='ko'?'카테고리':'Categories'}</button>
      <button class="ftab" data-sys="admins">${LANG==='ko'?'운영자':'Admins'}</button>
      <button class="ftab" data-sys="audit">${LANG==='ko'?'감사 로그':'Audit Log'}</button>
      <button class="ftab" data-sys="region">${LANG==='ko'?'지역/통화':'Regions'}</button>
      <button class="ftab" data-sys="terms">${LANG==='ko'?'약관':'Terms'}</button>
    </div>
    <div id="sysBody">${renderSysTab('categories')}</div>`;
}

function renderSysTab(tab){
  if(tab==='categories'){
    return `<div class="dash-grid-2">
      <div class="card">
        <div class="card-head row"><h3>${LANG==='ko'?'장르':'Genres'}</h3><button class="btn-primary small">＋</button></div>
        <div class="chip-grid">${SYS_GENRES.map(g=>`<span class="chip-item">${g} <em>×</em></span>`).join('')}</div>
      </div>
      <div class="card">
        <div class="card-head row"><h3>${LANG==='ko'?'관람연령':'Age Ratings'}</h3><button class="btn-primary small">＋</button></div>
        <div class="chip-grid">${SYS_AGES.map(g=>`<span class="chip-item">${g} <em>×</em></span>`).join('')}</div>
      </div>
    </div>`;
  }
  if(tab==='admins'){
    const admins = LANG==='ko'
      ? [["Park Jaehyun","admin@mypick.app","Super Admin","활성"],["Kim Soyeon","kim@mypick.app","검수 매니저","활성"],["Lee Hyunwoo","lee@mypick.app","정산 매니저","활성"],["Choi Jiwon","jiwon@mypick.app","CS 매니저","비활성"]]
      : [["Park Jaehyun","admin@mypick.app","Super Admin","Active"],["Kim Soyeon","kim@mypick.app","Review Mgr","Active"],["Lee Hyunwoo","lee@mypick.app","Settle Mgr","Active"],["Choi Jiwon","jiwon@mypick.app","CS Mgr","Inactive"]];
    return `<div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'이름':'Name'}</th><th>${LANG==='ko'?'이메일':'Email'}</th><th>${LANG==='ko'?'권한':'Role'}</th><th>${LANG==='ko'?'상태':'Status'}</th><th>${t('th_action')}</th></tr></thead>
        <tbody>${admins.map(a=>`<tr><td><strong>${a[0]}</strong></td><td class="muted">${a[1]}</td><td>${a[2]}</td><td><span class="status-badge ${a[3].includes('비')||a[3]==='Inactive'?'rejected':'published'}">${a[3]}</span></td><td><button class="like-btn">${LANG==='ko'?'편집':'Edit'}</button></td></tr>`).join('')}</tbody>
      </table>
      <div style="padding:16px"><button class="btn-primary">＋ ${LANG==='ko'?'운영자 추가':'Add Admin'}</button></div>
    </div>`;
  }
  if(tab==='audit'){
    return `<div class="card no-pad">
      <table class="data-table">
        <thead><tr><th>${LANG==='ko'?'시각':'Time'}</th><th>${LANG==='ko'?'운영자':'Admin'}</th><th>${LANG==='ko'?'행위':'Action'}</th><th>${LANG==='ko'?'대상':'Target'}</th><th>IP</th></tr></thead>
        <tbody>${AUDIT_LOG.map(a=>`<tr><td class="muted mono">${a.time}</td><td><strong>${a.admin}</strong></td><td>${a.action}</td><td class="mono muted">${a.target}</td><td class="mono muted">${a.ip}</td></tr>`).join('')}</tbody>
      </table>
    </div>`;
  }
  if(tab==='region'){
    return `<div class="card"><div class="form-card">
      <div class="form-row"><label>${LANG==='ko'?'기본 통화':'Base Currency'}</label><select><option>KRW (₩)</option><option>USD ($)</option></select></div>
      <div class="form-row"><label>${LANG==='ko'?'환율 갱신':'FX Update'}</label><select><option>${LANG==='ko'?'매일':'Daily'}</option><option>${LANG==='ko'?'매시간':'Hourly'}</option></select></div>
      <div class="form-row"><label>${LANG==='ko'?'플랫폼 수수료':'Platform Fee'}</label><input type="text" value="20%"></div>
      <div class="form-row"><label>${LANG==='ko'?'정산 주기':'Payout Cycle'}</label><select><option>${LANG==='ko'?'매월 15일':'Monthly · 15th'}</option></select></div>
      <div class="form-row"><label>${LANG==='ko'?'최소 정산금':'Minimum Payout'}</label><input type="text" value="₩100,000"></div>
      <button class="btn-primary">${t('save')}</button>
    </div></div>`;
  }
  return `<div class="card"><div class="form-card">
    <h3>${LANG==='ko'?'이용약관':'Terms of Service'}</h3>
    <textarea rows="8">${LANG==='ko'?'본 약관은 MyPick 서비스 이용에 관한 사항을 정합니다...':'These Terms govern your use of MyPick...'}</textarea>
    <h3 style="margin-top:18px">${LANG==='ko'?'개인정보처리방침':'Privacy Policy'}</h3>
    <textarea rows="8">${LANG==='ko'?'MyPick은 개인정보 보호법에 따라...':'MyPick follows applicable privacy regulations...'}</textarea>
    <button class="btn-primary" style="margin-top:14px">${t('save')}</button>
  </div></div>`;
}

// ============ NOTIFICATIONS ============
function renderNotifs(){
  const list = document.getElementById("notifList");
  if(!list) return;
  list.innerHTML = NOTIFICATIONS.map(n=>`
    <div class="notif-row"><span class="notif-dot ${n.type}"></span><div><p>${tx(n.text)}</p><span>${n.time} ago</span></div></div>
  `).join('');
}

// ============ PAGE EVENTS ============
function bindPageEvents(name){
  if(name==='content'){
    document.querySelectorAll("#ctFilter .ftab").forEach(b=>{
      b.addEventListener("click", ()=>{
        document.querySelectorAll("#ctFilter .ftab").forEach(x=>x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("ctBody").innerHTML = renderContentRows(b.dataset.cf);
      });
    });
  }
  if(name==='reports'){
    document.querySelectorAll("#repFilter .ftab").forEach(b=>{
      b.addEventListener("click", ()=>{
        document.querySelectorAll("#repFilter .ftab").forEach(x=>x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("repBody").innerHTML = renderReportsList(b.dataset.rf);
      });
    });
  }
  if(name==='system'){
    document.querySelectorAll("#sysTabs .ftab").forEach(b=>{
      b.addEventListener("click", ()=>{
        document.querySelectorAll("#sysTabs .ftab").forEach(x=>x.classList.remove("active"));
        b.classList.add("active");
        document.getElementById("sysBody").innerHTML = renderSysTab(b.dataset.sys);
      });
    });
  }
}

// ============ COMMON ============
function closeModal(id){ document.getElementById(id).classList.add("hidden"); }
function toast(msg){
  const el = document.getElementById("toast");
  el.textContent = msg;
  el.classList.remove("hidden");
  clearTimeout(window._t);
  window._t = setTimeout(()=>el.classList.add("hidden"), 2200);
}