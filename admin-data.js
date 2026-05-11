const T = {
  ko: {
    login_title: "관리자 로그인", login_sub: "플랫폼 운영 콘솔",
    btn_login: "로그인", auth_note: "💡 프로토타입입니다. 입력 없이 로그인을 누르세요.",
    nav_dashboard: "대시보드", sec_review: "검수",
    nav_review: "검수 대기", nav_sub: "자막 검수", nav_reports: "신고 처리",
    sec_manage: "관리", nav_content: "콘텐츠", nav_partners: "파트너", nav_users: "사용자",
    sec_revenue: "매출", nav_settle: "정산", nav_feat: "추천 / 배너", nav_promo: "프로모션",
    sec_system: "시스템", nav_analytics: "통계 분석", nav_system: "시스템 설정",
    all_ops: "모든 시스템 정상", logout: "로그아웃",
    all_regions: "전 지역", open_partner: "파트너 콘솔", open_user: "유저 화면",
    pm_account: "계정 / 권한", pm_audit: "감사 로그", notif_title: "알림",

    page_dashboard: "운영 대시보드", page_dashboard_sub: "플랫폼 핵심 지표 · 실시간 현황",
    kpi_gmv: "오늘 GMV", kpi_dau: "DAU", kpi_mau: "MAU",
    kpi_partners: "활성 파트너", kpi_content: "활성 콘텐츠", kpi_pending: "검수 대기",
    sec_quick_actions: "빠른 처리", sec_revenue_chart: "최근 30일 GMV", sec_country_share: "국가별 매출 비중",
    sec_live: "실시간 액티비티", sec_health: "시스템 헬스",

    page_review: "콘텐츠 검수 대기", page_review_sub: "체크리스트에 따라 콘텐츠를 검수하세요",
    review_modal_title: "콘텐츠 검수",
    th_partner: "파트너", th_content: "콘텐츠", th_type: "유형", th_submitted: "제출일", th_priority: "우선순위", th_action: "처리",
    btn_approve: "승인", btn_reject: "반려", btn_review: "검수하기",
    checklist_title: "검수 체크리스트", reject_reason: "반려 사유",

    page_content: "콘텐츠 관리", page_content_sub: "전체 콘텐츠 상태 및 노출 제어",
    page_partners: "파트너 관리", page_partners_sub: "신청 심사 및 활성 파트너",
    pt_apps: "신청 심사", pt_active: "활성 파트너",
    page_users: "사용자 관리",
    page_reports: "신고 처리",
    rep_review: "리뷰 신고", rep_comment: "댓글 신고", rep_content: "콘텐츠 신고", rep_user: "사용자 신고",

    page_subtitle: "자막 검수",
    page_settle: "정산 관리", page_settle_sub: "월별 정산 일괄 계산 및 지급",
    se_pending: "정산 예정 총액", se_partners: "정산 대상 파트너", se_period: "정산 기간",
    btn_calc: "정산 계산", btn_pay: "일괄 지급",

    page_feat: "추천 / 배너", page_feat_sub: "메인 페이지 노출 콘텐츠를 큐레이션하세요",
    feat_hero: "메인 히어로 배너", feat_rows: "추천 행",
    page_promo: "프로모션", page_promo_sub: "쿠폰, 무료 이벤트, 캠페인",
    page_analytics: "통계 분석", page_analytics_sub: "플랫폼 전체 사용 패턴",
    page_system: "시스템 설정",

    status_pending: "대기", status_approved: "승인", status_rejected: "반려",
    status_published: "게시", status_blocked: "차단", status_review: "검수중",
    status_active: "활성", status_suspended: "정지",

    save: "저장", cancel: "취소", confirm: "확인", view: "상세보기"
  },
  en: {
    login_title: "Admin Sign-in", login_sub: "Platform Operations Console",
    btn_login: "Sign in", auth_note: "💡 Prototype — click without input.",
    nav_dashboard: "Dashboard", sec_review: "Review",
    nav_review: "Review Queue", nav_sub: "Subtitles", nav_reports: "Reports",
    sec_manage: "Management", nav_content: "Content", nav_partners: "Partners", nav_users: "Users",
    sec_revenue: "Revenue", nav_settle: "Settlements", nav_feat: "Featured", nav_promo: "Promotions",
    sec_system: "System", nav_analytics: "Analytics", nav_system: "System",
    all_ops: "All systems operational", logout: "Sign out",
    all_regions: "All Regions", open_partner: "Partner Console", open_user: "User View",
    pm_account: "Account / Roles", pm_audit: "Audit Log", notif_title: "Notifications",

    page_dashboard: "Operations Dashboard", page_dashboard_sub: "Live platform metrics",
    kpi_gmv: "Today's GMV", kpi_dau: "DAU", kpi_mau: "MAU",
    kpi_partners: "Active Partners", kpi_content: "Active Content", kpi_pending: "Pending Review",
    sec_quick_actions: "Quick Actions", sec_revenue_chart: "GMV Last 30 days", sec_country_share: "Revenue by Country",
    sec_live: "Live Activity", sec_health: "System Health",

    page_review: "Content Review Queue", page_review_sub: "Apply checklist to review submissions",
    review_modal_title: "Content Review",
    th_partner: "Partner", th_content: "Title", th_type: "Type", th_submitted: "Submitted", th_priority: "Priority", th_action: "Action",
    btn_approve: "Approve", btn_reject: "Reject", btn_review: "Review",
    checklist_title: "Review Checklist", reject_reason: "Rejection reason",

    page_content: "Content Management", page_content_sub: "All content status and visibility",
    page_partners: "Partner Management", page_partners_sub: "Applications and active partners",
    pt_apps: "Applications", pt_active: "Active",
    page_users: "User Management",
    page_reports: "Reports",
    rep_review: "Review Reports", rep_comment: "Comment Reports", rep_content: "Content Reports", rep_user: "User Reports",

    page_subtitle: "Subtitle Review",
    page_settle: "Settlements", page_settle_sub: "Calculate and process monthly payouts",
    se_pending: "Pending Total", se_partners: "Partners", se_period: "Period",
    btn_calc: "Calculate", btn_pay: "Process All",

    page_feat: "Featured / Banners", page_feat_sub: "Curate main page content",
    feat_hero: "Hero Banners", feat_rows: "Featured Rows",
    page_promo: "Promotions", page_promo_sub: "Coupons, events and campaigns",
    page_analytics: "Analytics", page_analytics_sub: "Platform-wide usage",
    page_system: "System Settings",

    status_pending: "Pending", status_approved: "Approved", status_rejected: "Rejected",
    status_published: "Live", status_blocked: "Blocked", status_review: "In Review",
    status_active: "Active", status_suspended: "Suspended",

    save: "Save", cancel: "Cancel", confirm: "Confirm", view: "View"
  }
};

// ====== KPI ======
const KPI = {
  gmv:      { value: 482300000, delta: 12.4, sub: "₩" },
  dau:      { value: 142800, delta: 8.2 },
  mau:      { value: 1840000, delta: 15.6 },
  partners: { value: 1248, delta: 4.2 },
  content:  { value: 8420, delta: 6.8 },
  pending:  { value: 12, delta: null, sub: "검수" }
};

// 30 days GMV
const GMV_DAILY = Array.from({length:30}, (_,i) => ({
  d: i+1, v: Math.round(380 + Math.sin(i/4)*40 + Math.random()*60) * 1000000
}));

// Country share
const COUNTRY_SHARE = [
  { code: "🇰🇷", name: { ko: "한국", en: "Korea" }, pct: 28.4 },
  { code: "🇯🇵", name: { ko: "일본", en: "Japan" }, pct: 19.2 },
  { code: "🇺🇸", name: { ko: "미국", en: "USA" }, pct: 14.6 },
  { code: "🇹🇼", name: { ko: "대만", en: "Taiwan" }, pct: 8.1 },
  { code: "🇹🇭", name: { ko: "태국", en: "Thailand" }, pct: 6.8 },
  { code: "🇫🇷", name: { ko: "프랑스", en: "France" }, pct: 4.2 },
  { code: "🇲🇽", name: { ko: "멕시코", en: "Mexico" }, pct: 3.9 },
  { code: "🌍", name: { ko: "기타", en: "Others" }, pct: 14.8 }
];

// Live activity (templates - rotated)
const LIVE_TEMPLATES = [
  { ko: "🇯🇵 anna_jp 회원가입", en: "🇯🇵 anna_jp signed up", type: "signup" },
  { ko: "💳 carlos_mx · ₩9,900 결제 (Moonlight With You)", en: "💳 carlos_mx · ₩9,900 paid (Moonlight With You)", type: "pay" },
  { ko: "📤 Sunset Studios 콘텐츠 업로드 (검수 필요)", en: "📤 Sunset Studios uploaded (review needed)", type: "upload" },
  { ko: "🚩 리뷰 신고 접수 (review_id: r-8421)", en: "🚩 Review reported (id: r-8421)", type: "report" },
  { ko: "💬 자막 기여 (Vietnamese · Moonlight With You)", en: "💬 Subtitle contribution (VI · Moonlight)", type: "sub" },
  { ko: "🤝 파트너 신청: Aurora Films", en: "🤝 Partner application: Aurora Films", type: "partner" },
  { ko: "👁 ploy_th '별이 머무는 밤' 시청 시작", en: "👁 ploy_th started 'Where Stars Stay'", type: "watch" }
];

// System health
const HEALTH = [
  { name: "API Gateway", uptime: 99.99, status: "ok", latency: "42ms" },
  { name: "CDN (Global)", uptime: 99.97, status: "ok", latency: "18ms" },
  { name: "Video Encoder", uptime: 99.92, status: "ok", latency: "—" },
  { name: "Payment Gateway", uptime: 99.85, status: "warn", latency: "240ms" },
  { name: "Database (RDS)", uptime: 99.99, status: "ok", latency: "8ms" },
  { name: "DRM Service", uptime: 100.0, status: "ok", latency: "65ms" }
];

// Review queue
const REVIEW_QUEUE = [
  { id: "rv1", partner: "Moonlight Studios", content: "A Spring in Paris", type: "Movie · 124min", submitted: "2025.01.18 14:20", priority: "high", thumb: "linear-gradient(135deg,#3a5e1a,#7aa83a)", details: { genre: "Romance", country: "🇰🇷 KR", year: 2024, age: "15+" } },
  { id: "rv2", partner: "Sunset Films", content: "Dawn over Tokyo", type: "Series · 6EP", submitted: "2025.01.18 11:08", priority: "normal", thumb: "linear-gradient(135deg,#5e3a1a,#a87a3a)", details: { genre: "Drama", country: "🇯🇵 JP", year: 2024, age: "12+" } },
  { id: "rv3", partner: "Aurora Films", content: "The Hidden Forest", type: "Movie · 98min", submitted: "2025.01.18 09:45", priority: "normal", thumb: "linear-gradient(135deg,#1a5e3a,#3aa87a)", details: { genre: "Fantasy", country: "🇰🇷 KR", year: 2024, age: "All" } },
  { id: "rv4", partner: "Bluebird Studio", content: "Last Train Home", type: "Movie · 110min", submitted: "2025.01.17 22:14", priority: "low", thumb: "linear-gradient(135deg,#1a1a5e,#3a3aa8)", details: { genre: "Drama", country: "🇰🇷 KR", year: 2023, age: "15+" } },
  { id: "rv5", partner: "Crimson Pictures", content: "Echoes of the Past", type: "Series · 10EP", submitted: "2025.01.17 18:32", priority: "high", thumb: "linear-gradient(135deg,#5e1a1a,#a83a3a)", details: { genre: "Thriller", country: "🇨🇳 CN", year: 2024, age: "18+" } },
  { id: "rv6", partner: "Moonlight Studios", content: "Spring Letter", type: "Movie · 88min", submitted: "2025.01.17 14:11", priority: "normal", thumb: "linear-gradient(135deg,#5e1a4a,#a83a8a)", details: { genre: "Drama", country: "🇰🇷 KR", year: 2024, age: "12+" } }
];

const CHECKLIST = [
  { ko: "영상 화질 (1080p 이상, 인코딩 정상)", en: "Video quality (1080p+, encoded OK)" },
  { ko: "음성 품질 / 동기화", en: "Audio quality / sync" },
  { ko: "메타데이터 정확성 (제목/장르/시놉시스)", en: "Metadata accuracy" },
  { ko: "썸네일 적합성 (16:9, 텍스트 과다 X)", en: "Thumbnail suitability" },
  { ko: "기본 자막 (한국어 또는 원어) 포함", en: "Base subtitle included" },
  { ko: "저작권 및 라이선스 증빙", en: "Copyright & license docs" },
  { ko: "관람연령 등급 적합성", en: "Age rating appropriate" },
  { ko: "음원 라이선스 증빙", en: "Music license proof" },
  { ko: "정치/종교/혐오 콘텐츠 여부", en: "Political/hate content check" }
];

// Content master list (across all partners)
const ALL_CONTENT = [
  { id: "c1", title: "Moonlight With You", partner: "Moonlight Studios", country: "🇰🇷", views: 142800, rev: 8240000, status: "published" },
  { id: "c2", title: "Where Stars Stay", partner: "Moonlight Studios", country: "🇰🇷", views: 78200, rev: 3120000, status: "published" },
  { id: "c3", title: "Dawn over Tokyo", partner: "Sunset Films", country: "🇯🇵", views: 0, rev: 0, status: "review" },
  { id: "c4", title: "Silent City", partner: "Moonlight Studios", country: "🇰🇷", views: 0, rev: 0, status: "rejected" },
  { id: "c5", title: "Black River", partner: "Crimson Pictures", country: "🇨🇳", views: 12300, rev: 540000, status: "blocked" },
  { id: "c6", title: "Summer Memory", partner: "Moonlight Studios", country: "🇰🇷", views: 27300, rev: 1120000, status: "published" },
  { id: "c7", title: "Last Hero", partner: "Bluebird Studio", country: "🇰🇷", views: 38400, rev: 1820000, status: "published" }
];

// Partners
const PARTNER_APPS = [
  { id: "pa1", name: "Aurora Films", country: "🇰🇷 Korea", contact: "ceo@aurora.kr", appliedAt: "2025.01.18", samples: 3, doc: true },
  { id: "pa2", name: "Tokyo Lights Studio", country: "🇯🇵 Japan", contact: "info@tokyolights.jp", appliedAt: "2025.01.17", samples: 5, doc: true },
  { id: "pa3", name: "Sunny Entertainment", country: "🇮🇩 Indonesia", contact: "hello@sunny.id", appliedAt: "2025.01.16", samples: 1, doc: false },
  { id: "pa4", name: "Pacific Wave", country: "🇺🇸 USA", contact: "biz@pacific.com", appliedAt: "2025.01.16", samples: 8, doc: true }
];

const PARTNERS_ACTIVE = [
  { name: "Moonlight Studios", country: "🇰🇷", contents: 5, mtdRev: 12480000, totalRev: 84200000, since: "2024.07", tier: "Verified" },
  { name: "Sunset Films", country: "🇯🇵", contents: 8, mtdRev: 8420000, totalRev: 52400000, since: "2024.05", tier: "Verified" },
  { name: "Crimson Pictures", country: "🇨🇳", contents: 3, mtdRev: 4200000, totalRev: 18200000, since: "2024.09", tier: "New" },
  { name: "Bluebird Studio", country: "🇰🇷", contents: 4, mtdRev: 3800000, totalRev: 22400000, since: "2024.06", tier: "Verified" },
  { name: "Aurora Films", country: "🇰🇷", contents: 2, mtdRev: 1240000, totalRev: 4200000, since: "2024.11", tier: "New" }
];

// Users
const USERS = [
  { id: "u-12345", name: "moonlover92", country: "🇰🇷", joined: "2024.05.12", purchases: 24, points: 84200, status: "active" },
  { id: "u-12346", name: "anna_jp", country: "🇯🇵", joined: "2024.07.20", purchases: 18, points: 42300, status: "active" },
  { id: "u-12347", name: "carlos_mx", country: "🇲🇽", joined: "2024.09.04", purchases: 11, points: 18400, status: "active" },
  { id: "u-12348", name: "spammer_x", country: "🇷🇺", joined: "2025.01.10", purchases: 0, points: 0, status: "suspended" },
  { id: "u-12349", name: "ploy_th", country: "🇹🇭", joined: "2024.11.18", purchases: 6, points: 7800, status: "active" }
];

// Reports
const REPORTS = {
  review: [
    { id: "r-8421", reporter: "moonlover92", target: "anonymous_42", reason: "스포일러 / Spoilers", content: "주인공이 마지막에 죽는다는 내용", date: "2025.01.18 11:20", severity: "low" },
    { id: "r-8422", reporter: "anna_jp", target: "trolluser", reason: "욕설 / Profanity", content: "심한 욕설이 포함된 리뷰", date: "2025.01.18 09:45", severity: "high" }
  ],
  comment: [
    { id: "c-1240", reporter: "ploy_th", target: "spammer_x", reason: "스팸 / Spam", content: "외부 사이트 도배 링크", date: "2025.01.18 14:01", severity: "high" }
  ],
  content: [
    { id: "ct-92", reporter: "moonlover92", target: "Black River", reason: "저작권 / Copyright", content: "저작권 침해 의심 신고", date: "2025.01.17 22:30", severity: "high" }
  ],
  user: [
    { id: "u-501", reporter: "carlos_mx", target: "spammer_x", reason: "어뷰즈 / Abuse", content: "신규 계정으로 도배 행위", date: "2025.01.18 10:00", severity: "medium" }
  ]
};

// Subtitle queue (community)
const SUB_QUEUE = [
  { id: "s1", content: "Moonlight With You", lang: "Vietnamese", contributor: "@nam_vn", aiScore: 4.6, lines: 842, submitted: "2h ago" },
  { id: "s2", content: "Moonlight With You", lang: "French", contributor: "@juliette_fr", aiScore: 4.8, lines: 832, submitted: "5h ago" },
  { id: "s3", content: "Where Stars Stay", lang: "Indonesian", contributor: "@dian_id", aiScore: 3.2, lines: 1240, submitted: "8h ago" },
  { id: "s4", content: "Summer Memory", lang: "Spanish", contributor: "@maria_es", aiScore: 4.4, lines: 612, submitted: "12h ago" },
  { id: "s5", content: "Where Stars Stay", lang: "Thai", contributor: "@ploy_th", aiScore: 4.7, lines: 1180, submitted: "1d ago" }
];

// Settlements
const SETTLEMENTS = [
  { partner: "Moonlight Studios", country: "🇰🇷", grossRev: 12480000, platformFee: 2496000, partnerShare: 9984000, prevPending: 0, payable: 9984000, status: "ready" },
  { partner: "Sunset Films", country: "🇯🇵", grossRev: 8420000, platformFee: 1684000, partnerShare: 6736000, prevPending: 0, payable: 6736000, status: "ready" },
  { partner: "Crimson Pictures", country: "🇨🇳", grossRev: 4200000, platformFee: 840000, partnerShare: 3360000, prevPending: 80000, payable: 3440000, status: "ready" },
  { partner: "Bluebird Studio", country: "🇰🇷", grossRev: 3800000, platformFee: 760000, partnerShare: 3040000, prevPending: 0, payable: 3040000, status: "ready" },
  { partner: "Aurora Films", country: "🇰🇷", grossRev: 1240000, platformFee: 248000, partnerShare: 992000, prevPending: 0, payable: 992000, status: "hold" }
];

// Featured / banners
const HERO_BANNERS = [
  { id: "b1", title: "Moonlight With You", sub: "글로벌 1위 드라마", from: "2025.01.15", to: "2025.02.15", regions: ["🇰🇷","🇯🇵","🇺🇸","🇲🇽","🇹🇭"], color: "linear-gradient(135deg,#1a0f2e,#8b3a8a)", clicks: 482300 },
  { id: "b2", title: "Dawn over Tokyo", sub: "신작 일본 드라마", from: "2025.01.18", to: "2025.02.18", regions: ["🇯🇵","🇰🇷"], color: "linear-gradient(135deg,#5e3a1a,#a87a3a)", clicks: 142800 },
  { id: "b3", title: "Spring Sale 50% OFF", sub: "봄맞이 프로모션", from: "2025.02.01", to: "2025.02.28", regions: ["🌍"], color: "linear-gradient(135deg,#3a5e1a,#7aa83a)", clicks: 0 }
];

const FEATURED_ROWS = [
  { id: "r1", title: { ko: "이번 주 추천", en: "Editor's Picks" }, count: 12, regions: "Global" },
  { id: "r2", title: { ko: "신작 드라마", en: "New Dramas" }, count: 18, regions: "Global" },
  { id: "r3", title: { ko: "한국 콘텐츠 TOP 10", en: "Korean TOP 10" }, count: 10, regions: "Global" },
  { id: "r4", title: { ko: "주말에 몰아보기", en: "Weekend Binge" }, count: 8, regions: "🇰🇷 🇯🇵" },
  { id: "r5", title: { ko: "글로벌 인기작", en: "Trending Worldwide" }, count: 20, regions: "Global" }
];

// Promotions
const PROMOS = [
  { code: "WELCOME50", desc: { ko: "신규가입 50% 할인", en: "50% off for new users" }, discount: 50, used: 12420, max: null, from: "2024.12.01", to: "2025.12.31", status: "active" },
  { code: "SUMMER25", desc: { ko: "여름 시즌 25%", en: "Summer 25%" }, discount: 25, used: 4820, max: 50000, from: "2025.06.01", to: "2025.08.31", status: "scheduled" },
  { code: "NEWYEAR", desc: { ko: "신년 30%", en: "New Year 30%" }, discount: 30, used: 8240, max: 10000, from: "2024.12.25", to: "2025.01.10", status: "ended" },
  { code: "FREEWEEK", desc: { ko: "특정 작품 무료", en: "Free week event" }, discount: 100, used: 28400, max: null, from: "2025.01.20", to: "2025.01.27", status: "active" }
];

// Notifications (admin)
const NOTIFICATIONS = [
  { type: "warn", text: { ko: "⚠️ 신고 7건 처리 대기 중", en: "⚠️ 7 reports pending" }, time: "5m" },
  { type: "info", text: { ko: "📤 콘텐츠 12건 검수 대기", en: "📤 12 contents awaiting review" }, time: "12m" },
  { type: "ok", text: { ko: "💰 1월 정산 대상 5개 파트너 준비 완료", en: "💰 Jan settlements ready for 5 partners" }, time: "1h" },
  { type: "warn", text: { ko: "💳 Payment Gateway latency 240ms (정상범위 외)", en: "💳 Payment Gateway latency 240ms (high)" }, time: "2h" },
  { type: "ok", text: { ko: "🤝 신규 파트너 신청 4건", en: "🤝 4 new partner applications" }, time: "3h" }
];

// DAU/MAU 30 days
const DAU_HISTORY = Array.from({length:30}, (_,i) => ({
  d: i+1, dau: Math.round(120000 + Math.sin(i/4)*15000 + Math.random()*8000),
  mau: 1700000 + Math.round(i*4500)
}));

// Funnel
const FUNNEL = [
  { stage: { ko: "방문", en: "Visit" }, value: 1284000, pct: 100 },
  { stage: { ko: "콘텐츠 페이지", en: "Content Page" }, value: 642000, pct: 50 },
  { stage: { ko: "회원가입/로그인", en: "Signup/Login" }, value: 245000, pct: 19 },
  { stage: { ko: "결제 시작", en: "Checkout" }, value: 184000, pct: 14.3 },
  { stage: { ko: "결제 완료", en: "Purchase" }, value: 142800, pct: 11.1 }
];

// Genres (system)
const SYS_GENRES = ["Romance","Drama","Thriller","Fantasy","Action","Comedy","Documentary","Animation","Horror","Sci-Fi","Kids","Music"];
const SYS_AGES = ["All","12+","15+","18+"];

// Audit log
const AUDIT_LOG = [
  { time: "2025.01.18 14:32", admin: "Park J.", action: "콘텐츠 승인 (A Spring in Paris)", target: "rv-001", ip: "211.45.x.x" },
  { time: "2025.01.18 13:21", admin: "Kim S.", action: "사용자 정지 7일 (spammer_x)", target: "u-12348", ip: "211.45.x.x" },
  { time: "2025.01.18 11:14", admin: "Park J.", action: "프로모션 활성화 (FREEWEEK)", target: "promo-021", ip: "211.45.x.x" },
  { time: "2025.01.18 09:42", admin: "Lee H.", action: "정산 일괄 처리 (12월)", target: "settle-2024-12", ip: "10.0.x.x" },
  { time: "2025.01.17 22:30", admin: "Park J.", action: "콘텐츠 차단 (Black River)", target: "ct-92", ip: "211.45.x.x" }
];