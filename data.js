// ============ I18N ============
const T = {
  ko: {
    nav_explore: "탐색", nav_trending: "인기", nav_genre: "장르", nav_library: "내 라이브러리",
    btn_login: "로그인", btn_signup: "회원가입", btn_watch: "▶ 지금 보기",
    btn_trailer: "🎬 예고편 보기", btn_fav: "＋ 찜", btn_share: "🔗 공유",
    badge_hot: "🔥 화제의 BL 청춘물", badge_meta: "2025 · BL 드라마 · 10부작",
    age_15: "15세 이상", lang_subs: "한국어 / 자막 12개 언어",
    reviews_n: "리뷰", reviews_total: "개의 리뷰",
    price_single: "단건 결제 ₩4,900부터", price_or: "또는 구독 멤버십에 포함",
    earn_title: "이 작품을 친구에게 공유하면 포인트가 쌓여요",
    earn_desc: "당신이 공유한 링크로 누군가 시청하면, 그 결제의 일부가 당신의 수익이 됩니다.",
    earn_btn: "공유 링크 만들기",
    sec_synopsis: "줄거리", sec_scenes: "명장면 모아보기",
    sec_scenes_sub: "스포일러 없이 작품의 분위기를 미리 확인해보세요",
    sec_quotes: "이 작품의 명대사", sec_cast: "출연 / 제작",
    sec_reviews: "시청자 리뷰", btn_more_reviews: "리뷰 더 보기",
    sec_related: "이 작품을 본 사람들이 좋아한 콘텐츠",
    cta_title: "지금, 이야기 속으로 들어가 보세요",
    cta_desc: "로그인 한 번이면, 어디서든 이어볼 수 있어요.",
    auth_note: "💡 프로토타입입니다. 입력 없이 버튼을 눌러도 바로 진입됩니다.",
    step_product: "상품 선택", step_pay: "결제수단", step_done: "결제완료",
    page_explore_title: "탐색", page_explore_desc: "당신의 다음 스토리를 찾아보세요",
    page_trending_title: "지금 가장 인기 있는 콘텐츠",
    page_trending_desc: "전 세계 시청자가 지금 보고 있는 작품",
    page_genre_title: "장르별 둘러보기", page_genre_desc: "취향에 맞는 장르를 골라보세요",
    page_library_title: "내 라이브러리",
    tab_today: "오늘의 TOP 10", tab_week: "주간 랭킹", tab_month: "월간 랭킹",
    lib_watching: "시청 중", lib_purchased: "구매한 콘텐츠", lib_wishlist: "찜한 작품", lib_history: "시청 기록",
    sort_popular: "인기순", sort_latest: "최신순", sort_rating: "평점순",
    sort_like: "추천순", sort_high: "평점 높은순", sort_low: "평점 낮은순",
    rv_all: "전체", rv_photo: "📸 사진리뷰", rv_spoiler: "⚠ 스포일러 없음", rv_verified: "✅ 시청 인증",
    sh_balance: "내 포인트 잔액", sh_balance_sub: "P · 1P = ₩1 상당",
    sh_today: "오늘", sh_week: "이번 주", sh_month: "이번 달",
    sh_my_link: "내 공유 링크", sh_copy: "복사",
    sh_rate: "결제금액의 10%가 포인트로 자동 적립됩니다",
    sh_realtime: "실시간 적립", sh_realtime_sub: "방금 전 활동",
    sh_tab_earn: "적립 내역", sh_tab_use: "사용 내역", sh_tab_rank: "친구 랭킹", sh_tab_how: "적립 방법",
    pm_profile: "내 프로필", pm_history: "시청 기록", pm_favorites: "찜한 콘텐츠",
    pm_purchases: "구매 내역", pm_points: "보유 포인트", pm_points_menu: "포인트",
    pm_notifications: "알림 설정", pm_account: "계정 설정", pm_devices: "기기 관리",
    pm_help: "고객센터", pm_logout: "로그아웃",
    back: "돌아가기",
    footer_about: "전 세계 창작자와 시청자가 만나는 콘텐츠 오픈 플랫폼",
    footer_terms: "이용약관", footer_privacy: "개인정보처리방침",
    footer_help: "고객센터", footer_partner: "파트너 신청",
    trailer_title: "예고편 · 2반 이희수",
    hero_desc: "평범한 고등학생 희수는 연애 상담은 잘하지만 자신의 마음만은 숨긴 채 살아간다. 십년지기 찬영을 향한 비밀스러운 짝사랑이 흔들리기 시작한다.",
    synopsis: "열여덟 희수는 자칭 타칭 연애 1타 강사지만 사실 연애 경험은 없는 모태솔로다. 남몰래 베프 찬영을 좋아해왔지만, 찬영이 동급생 지유에게 호감을 보이기 시작하면서 희수의 평온한 일상은 흔들린다. 반장 승원까지 얽히며 네 사람의 감정선은 예측할 수 없는 방향으로 흐르기 시작한다."
  },
  en: {
    nav_explore: "Explore", nav_trending: "Trending", nav_genre: "Genre", nav_library: "My Library",
    btn_login: "Sign in", btn_signup: "Sign up", btn_watch: "▶ Watch Now",
    btn_trailer: "🎬 Watch Trailer", btn_fav: "＋ Save", btn_share: "🔗 Share",
    badge_hot: "🔥 Trending BL Youth Drama", badge_meta: "2025 · BL Drama · 10 Episodes",
    age_15: "Age 15+", lang_subs: "Korean / Subtitles in 12 languages",
    reviews_n: "Reviews", reviews_total: "reviews",
    price_single: "From $4.99", price_or: "or included in membership",
    earn_title: "Share this title with friends and earn points",
    earn_desc: "When someone watches via your shared link, you earn a part of their payment.",
    earn_btn: "Create share link",
    sec_synopsis: "Synopsis", sec_scenes: "Iconic Scenes",
    sec_scenes_sub: "A taste of the mood — no spoilers",
    sec_quotes: "Memorable Quotes", sec_cast: "Cast & Crew",
    sec_reviews: "User Reviews", btn_more_reviews: "See all reviews",
    sec_related: "Viewers also loved",
    cta_title: "Step into the story.",
    cta_desc: "One sign-in, watch anywhere.",
    auth_note: "💡 Prototype: just click the button — no input needed.",
    step_product: "Choose Plan", step_pay: "Payment", step_done: "Done",
    page_explore_title: "Explore", page_explore_desc: "Find your next story",
    page_trending_title: "Trending Now", page_trending_desc: "What the world is watching right now",
    page_genre_title: "Browse by Genre", page_genre_desc: "Pick your mood",
    page_library_title: "My Library",
    tab_today: "Today's Top 10", tab_week: "Weekly", tab_month: "Monthly",
    lib_watching: "Continue Watching", lib_purchased: "Purchased", lib_wishlist: "Wishlist", lib_history: "History",
    sort_popular: "Most Popular", sort_latest: "Latest", sort_rating: "Top Rated",
    sort_like: "Most Helpful", sort_high: "Highest Rating", sort_low: "Lowest Rating",
    rv_all: "All", rv_photo: "📸 With Photos", rv_spoiler: "⚠ No Spoilers", rv_verified: "✅ Verified Watch",
    sh_balance: "My Points Balance", sh_balance_sub: "P · 1P ≈ $0.001",
    sh_today: "Today", sh_week: "This Week", sh_month: "This Month",
    sh_my_link: "Your Share Link", sh_copy: "Copy",
    sh_rate: "10% of every payment is auto-credited to your points",
    sh_realtime: "Live Earnings", sh_realtime_sub: "Just now",
    sh_tab_earn: "Earnings", sh_tab_use: "Spent", sh_tab_rank: "Friends Leaderboard", sh_tab_how: "How it works",
    pm_profile: "My Profile", pm_history: "Watch History", pm_favorites: "Favorites",
    pm_purchases: "Purchases", pm_points: "Points Balance", pm_points_menu: "Points",
    pm_notifications: "Notifications", pm_account: "Account Settings", pm_devices: "Device Manager",
    pm_help: "Help Center", pm_logout: "Sign out",
    back: "Back",
    footer_about: "A global open platform connecting creators and viewers",
    footer_terms: "Terms", footer_privacy: "Privacy",
    footer_help: "Help", footer_partner: "Become a Partner",
    trailer_title: "Trailer · Lee Hee-su in Class 2",
    hero_desc: "Hee-su is great at giving dating advice, but hides his own feelings. His long-time crush on his best friend Chan-young starts to unravel.",
    synopsis: "At eighteen, Hee-su is known as the best love counselor despite having zero dating experience. He has secretly loved his best friend Chan-young for years, but things change when Chan-young gets interested in Ji-yu. With class president Seung-won entering the mix, their emotions collide in unexpected ways."
  }
};

// ============ CONTENT DATA ============
const CONTENT = {
  id: "lee-heesu-class-2",
  title: { ko: "2반 이희수 (구매 전용)", en: "Lee Hee-su in Class 2 (Purchase Only)" },
  heroImage: "url('https://image.heavenly.tv/content/10391675862903814763-20260122024007.jpg') center/cover no-repeat"
};

const SCENES = [
  { title: { ko: "희수의 비밀 상담소", en: "Hee-su's Secret Advice Booth" }, time: "EP1 · 11:42", color: "linear-gradient(135deg,#3a1c5e,#8b3a8a)" },
  { title: { ko: "찬영의 새로운 관심", en: "Chan-young's New Crush" }, time: "EP3 · 23:11", color: "linear-gradient(135deg,#0f3a5e,#3a8aa8)" },
  { title: { ko: "승원의 예기치 못한 직진", en: "Seung-won's Unexpected Move" }, time: "EP6 · 29:38", color: "linear-gradient(135deg,#5e1c3a,#a83a5e)" },
  { title: { ko: "네 사람의 감정 교차점", en: "Crossroads of Four Hearts" }, time: "EP10 · 41:06", color: "linear-gradient(135deg,#1c5e3a,#3aa85e)" }
];

const QUOTES = [
  { text: { ko: "달빛이 우리를 비추는 그 짧은 순간만큼은, 너와 같은 시간을 살고 있어.", en: "While moonlight shines on us, I live in the same time as you." }, who: { ko: "도윤", en: "Doyun" } },
  { text: { ko: "어떤 만남은 짧아서 더 오래 남아요.", en: "Some meetings last longer because they were short." }, who: { ko: "유진", en: "Yujin" } },
  { text: { ko: "잊는 게 아니라, 다시 만날 준비를 하는 거야.", en: "It's not forgetting — it's getting ready to meet again." }, who: { ko: "도윤", en: "Doyun" } }
];

const CAST = [
  { name: { ko: "안지호", en: "Ahn Ji-ho" }, role: { ko: "희수 役", en: "as Hee-su" }, emoji: "👦" },
  { name: { ko: "조준영", en: "Cho Jun-young" }, role: { ko: "찬영 役", en: "as Chan-young" }, emoji: "🧑" },
  { name: { ko: "김도연", en: "Kim Do-yeon" }, role: { ko: "지유 役", en: "as Ji-yu" }, emoji: "👧" },
  { name: { ko: "이상준", en: "Lee Sang-jun" }, role: { ko: "승원 役", en: "as Seung-won" }, emoji: "👨" },
  { name: { ko: "박경민", en: "Park Kyung-min" }, role: { ko: "원작", en: "Creator" }, emoji: "✍️" },
  { name: { ko: "StoryHub", en: "StoryHub" }, role: { ko: "배급", en: "Distribution" }, emoji: "🎬" }
];

// Reviews from heavenly detail/891 API
const REVIEWS = [
  { user: "Sm0K5HbK85qH", country: "🇰🇷", rating: 5, photo: false, verified: false, spoiler: false, title: { ko: "재밌어요!", en: "재밌어요!" }, body: { ko: "재밌어요!", en: "재밌어요!" }, likes: 0, date: "2025.05.03" },
  { user: "f0qX9L9Hqnvy", country: "🇯🇵", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "아 진짜 못 헤어나오겠어 희수도 귀여운데 우리 …", en: "아 진짜 못 헤어나오겠어 희수도 귀여운데 우리 …" }, body: { ko: "아 진짜 못 헤어나오겠어 희수도 귀여운데 우리 햇살공 쩔쩔매는거 나 미칠거 같아. 하트스토퍼를 5번 넘게 재탕 했는데 여기는 벌써 7~10화만 세번째 돌리고 있어....내가 어쩌자고 이걸 미리 사서 봤을까....그리고 아무도 말 안하는데 당근친구야 너도 좋은 사람만날거야...", en: "아 진짜 못 헤어나오겠어 희수도 귀여운데 우리 햇살공 쩔쩔매는거 나 미칠거 같아. 하트스토퍼를 5번 넘게 재탕 했는데 여기는 벌써 7~10화만 세번째 돌리고 있어....내가 어쩌자고 이걸 미리 사서 봤을까....그리고 아무도 말 안하는데 당근친구야 너도 좋은 사람만날거야..." }, likes: 5, date: "2025.05.02" },
  { user: "eXm1jnzDHbCj", country: "🇹🇭", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "진짜 왠만해선 벨드 중간에보다가 끄는데 이유가 …", en: "진짜 왠만해선 벨드 중간에보다가 끄는데 이유가 …" }, body: { ko: "진짜 왠만해선 벨드 중간에보다가 끄는데 이유가 (태국 BL 잘 못봄 억양과 표정 목소리가 뭐든지 아직까진 과함..어느정도냐면 일기예보적연애 우연시 연애지상주의구역도 잘못봄..) 뭐든지 어색하거나 이해안되는 어색한 연기들도있고한데 OST는 너무 찰떡인데다 유년시절 제가 했었던 고민, 방황들..이 너무 잘 묘사되어있고 무엇보다 한 화마다 몰입이 더 심해져서 과몰입.... 끝내 앓는중이라 이렇게 앓아보고싶어 여기저기 다 찾아봤는데 헤븐리 설치하고 정말 잘본것같아요. 큐브 안아까워요. 전개도 자연스럽고 조연하나하나마다 각자의 기승전결이 있으며 뭐하나 부자연스럽지 않음. 감독님 배우님들 이 드라마에 참여해주신 모든 분들께 감사합니다.", en: "진짜 왠만해선 벨드 중간에보다가 끄는데 이유가 (태국 BL 잘 못봄 억양과 표정 목소리가 뭐든지 아직까진 과함..어느정도냐면 일기예보적연애 우연시 연애지상주의구역도 잘못봄..) 뭐든지 어색하거나 이해안되는 어색한 연기들도있고한데 OST는 너무 찰떡인데다 유년시절 제가 했었던 고민, 방황들..이 너무 잘 묘사되어있고 무엇보다 한 화마다 몰입이 더 심해져서 과몰입.... 끝내 앓는중이라 이렇게 앓아보고싶어 여기저기 다 찾아봤는데 헤븐리 설치하고 정말 잘본것같아요. 큐브 안아까워요. 전개도 자연스럽고 조연하나하나마다 각자의 기승전결이 있으며 뭐하나 부자연스럽지 않음. 감독님 배우님들 이 드라마에 참여해주신 모든 분들께 감사합니다." }, likes: 5, date: "2025.05.01" },
  { user: "user_4529", country: "🇺🇸", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "다 좋은데 커플을 메인 서브가 아니라 메인 메인…", en: "다 좋은데 커플을 메인 서브가 아니라 메인 메인…" }, body: { ko: "다 좋은데 커플을 메인 서브가 아니라 메인 메인 느낌이라 좀 아쉽 마지막화 정도는 오로지 희수 커플한테 할당해 주는게 더 나았을듯. 희수랑 꽁냥거리는거만 10화정도 더 보여줬으면....", en: "다 좋은데 커플을 메인 서브가 아니라 메인 메인 느낌이라 좀 아쉽 마지막화 정도는 오로지 희수 커플한테 할당해 주는게 더 나았을듯. 희수랑 꽁냥거리는거만 10화정도 더 보여줬으면...." }, likes: 8, date: "2025.05.01" },
  { user: "user_4528", country: "🇲🇽", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "자극적이지 않아도 키갈이 없어도 탄탄스토리와 연…", en: "자극적이지 않아도 키갈이 없어도 탄탄스토리와 연…" }, body: { ko: "자극적이지 않아도 키갈이 없어도 탄탄스토리와 연기력이 상급 bl을 만듦...추천함..씹덕들이여 꼭 보시오", en: "자극적이지 않아도 키갈이 없어도 탄탄스토리와 연기력이 상급 bl을 만듦...추천함..씹덕들이여 꼭 보시오" }, likes: 6, date: "2025.05.01" },
  { user: "user_4527", country: "🇫🇷", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "제발 즌2 주세요ㅜㅜ 10편만 몇번을 돌려보는지", en: "제발 즌2 주세요ㅜㅜ 10편만 몇번을 돌려보는지" }, body: { ko: "제발 즌2 주세요ㅜㅜ 10편만 몇번을 돌려보는지", en: "제발 즌2 주세요ㅜㅜ 10편만 몇번을 돌려보는지" }, likes: 10, date: "2025.05.01" },
  { user: "김곤약", country: "🇩🇪", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "이게 2반 이희수인지 2반 주찬영인지 모를 분량…", en: "이게 2반 이희수인지 2반 주찬영인지 모를 분량…" }, body: { ko: "이게 2반 이희수인지 2반 주찬영인지 모를 분량.. 화나기전에 시즌 2 주세요.", en: "이게 2반 이희수인지 2반 주찬영인지 모를 분량.. 화나기전에 시즌 2 주세요." }, likes: 4, date: "2025.05.01" },
  { user: "KuCGavWKW0mv", country: "🇵🇭", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "인생벨드,, 다른 bl드라마보다 느린 전개가 훨…", en: "인생벨드,, 다른 bl드라마보다 느린 전개가 훨…" }, body: { ko: "인생벨드,, 다른 bl드라마보다 느린 전개가 훨씬 매력적이다. 감정선이 너무 급변하지 않아 몰입도 잘되고 좋았다.. 시즌2 나왔으면", en: "인생벨드,, 다른 bl드라마보다 느린 전개가 훨씬 매력적이다. 감정선이 너무 급변하지 않아 몰입도 잘되고 좋았다.. 시즌2 나왔으면" }, likes: 4, date: "2025.04.29" },
  { user: "연개소문 (예뜨 Yette)", country: "🇮🇳", rating: 4, photo: false, verified: true, spoiler: false, title: { ko: "어휴 이 답답이들아..... 밀당만 3편이다", en: "어휴 이 답답이들아..... 밀당만 3편이다" }, body: { ko: "어휴 이 답답이들아..... 밀당만 3편이다", en: "어휴 이 답답이들아..... 밀당만 3편이다" }, likes: 1, date: "2025.04.29" },
  { user: "user_4505", country: "🇻🇳", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "엔딩이 너무 빠른거 아니오…", en: "엔딩이 너무 빠른거 아니오…" }, body: { ko: "엔딩이 너무 빠른거 아니오…", en: "엔딩이 너무 빠른거 아니오…" }, likes: 1, date: "2025.04.29" },
  { user: ".구름", country: "🇧🇷", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "귀여우면 끝났다고 하죠 전 이 작품 보고 진짜 …", en: "귀여우면 끝났다고 하죠 전 이 작품 보고 진짜 …" }, body: { ko: "귀여우면 끝났다고 하죠 전 이 작품 보고 진짜 그걸 느껴요.... 연기도 내용도 연출도 너무 좋아서 곱씹어서 계속 보게 되는 드라마 2반이희수를 만나 너무 행복합니다", en: "귀여우면 끝났다고 하죠 전 이 작품 보고 진짜 그걸 느껴요.... 연기도 내용도 연출도 너무 좋아서 곱씹어서 계속 보게 되는 드라마 2반이희수를 만나 너무 행복합니다" }, likes: 4, date: "2025.04.29" },
  { user: "ㅇㅎㅇ", country: "🇨🇦", rating: 5, photo: false, verified: false, spoiler: false, title: { ko: "배우들 비주얼,케미 다 좋고 진짜 이렇게 완성도…", en: "배우들 비주얼,케미 다 좋고 진짜 이렇게 완성도…" }, body: { ko: "배우들 비주얼,케미 다 좋고 진짜 이렇게 완성도 높은 벨드는 처음 봐서 너무 좋았습니다.. 고백을 조금 늦게하긴 했지만 사귀기 전까지의 둘의 관계 속에서 간질간질하고 애타는 풋풋한 느낌이 너무 좋아서 내용적인 면에서도 정말 좋았습니다... 엔딩이 너무 완벽하게 끝나서 시즌2가 나올지는 모르겠지만 외전으로라도 승원희수를 주로 다루는,꽁냥거리는 모습들 볼 수 있었으면 좋겠습니다!", en: "배우들 비주얼,케미 다 좋고 진짜 이렇게 완성도 높은 벨드는 처음 봐서 너무 좋았습니다.. 고백을 조금 늦게하긴 했지만 사귀기 전까지의 둘의 관계 속에서 간질간질하고 애타는 풋풋한 느낌이 너무 좋아서 내용적인 면에서도 정말 좋았습니다... 엔딩이 너무 완벽하게 끝나서 시즌2가 나올지는 모르겠지만 외전으로라도 승원희수를 주로 다루는,꽁냥거리는 모습들 볼 수 있었으면 좋겠습니다!" }, likes: 6, date: "2025.04.29" }
];

// Explore content
const EXPLORE_CONTENT = [
  { title: { ko: "여군동 : 되돌린 운명", en: "Reversed Fate" }, genre: { ko: "BL 드라마", en: "BL Drama" }, rating: 4.9, year: 2026, color: "linear-gradient(135deg,#1a0f2e,#8b3a8a)", poster: "https://image.heavenly.tv/content/ko/15016056177310822577-20260511003641.jpg" },
  { title: { ko: "시선 : 내가 너를 바라볼 때", en: "When I Look at You" }, genre: { ko: "BL 드라마", en: "BL Drama" }, rating: 4.8, year: 2026, color: "linear-gradient(135deg,#1a3a5e,#3a6aa8)", poster: "https://image.heavenly.tv/content/ko/9289376324815718378-20260511003627.jpg" },
  { title: { ko: "Flower Boy : 향기에 홀린 소년", en: "Flower Boy" }, genre: { ko: "BL 로맨스", en: "BL Romance" }, rating: 4.7, year: 2026, color: "linear-gradient(135deg,#3a1a1a,#8a3a3a)", poster: "https://image.heavenly.tv/content/ko/3127675377108175193-20260427030106.jpg" },
  { title: { ko: "페이크 팩트 립스", en: "Fake Fact Lips" }, genre: { ko: "BL 로맨스", en: "BL Romance" }, rating: 4.7, year: 2026, color: "linear-gradient(135deg,#3a5e1a,#7aa83a)", poster: "https://image.heavenly.tv/content/en/4565530415751369304-20260424053637.jpg" },
  { title: { ko: "Fourever You Part 2", en: "Fourever You Part 2" }, genre: { ko: "BL 드라마", en: "BL Drama" }, rating: 4.6, year: 2026, color: "linear-gradient(135deg,#5e3a1a,#a87a3a)", poster: "https://image.heavenly.tv/content/ko/1774050815668496237-20260414030344.jpg" },
  { title: { ko: "스모키 블루의 비 내린 뒤 맑음", en: "Smoky Blue" }, genre: { ko: "BL 드라마", en: "BL Drama" }, rating: 4.6, year: 2026, color: "linear-gradient(135deg,#3a3a5e,#6a6aa8)", poster: "https://image.heavenly.tv/content/en/13312822614641726346-20260406082736.jpg" },
  { title: { ko: "나의 눈빛에 비친 너의 마음", en: "Your Heart in My Eyes" }, genre: { ko: "BL 드라마", en: "BL Drama" }, rating: 4.5, year: 2026, color: "linear-gradient(135deg,#5e1a4a,#a83a8a)", poster: "https://image.heavenly.tv/content/en/15562135549383364530-20260511004039.jpg" },
  { title: { ko: "Wishing Upon the Shooting Stars", en: "Wishing Upon the Shooting Stars" }, genre: { ko: "BL 판타지", en: "BL Fantasy" }, rating: 4.5, year: 2026, color: "linear-gradient(135deg,#5e1a1a,#a83a3a)", poster: "https://image.heavenly.tv/content/en/15867651056823171029-20260410075819.jpg" },
  { title: { ko: "네 원수를 잊지 마라", en: "Don't Forget Your Enemy" }, genre: { ko: "BL 코미디", en: "BL Comedy" }, rating: 4.4, year: 2026, color: "linear-gradient(135deg,#1a1a5e,#3a3aa8)", poster: "https://image.heavenly.tv/content/ko/9042791802891554916-20260504042825.jpg" },
  { title: { ko: "가장 실패 없는 작품만 모았다!", en: "Can't-miss Collection" }, genre: { ko: "큐레이션", en: "Curation" }, rating: 4.3, year: 2026, color: "linear-gradient(135deg,#1a1a1a,#3a3a3a)", poster: "https://image.heavenly.tv/featured/12823202599141364070-20260105064043.jpg" },
  { title: { ko: "5월 멤버십 라인업", en: "May Membership Lineup" }, genre: { ko: "멤버십", en: "Membership" }, rating: 4.2, year: 2026, color: "linear-gradient(135deg,#5e5a1a,#a89a3a)", poster: "https://image.heavenly.tv/featured/4139756345323049580-20260506004607.jpg" },
  { title: { ko: "다시 얽히기 시작한 네 사람의 운명", en: "Entwined Fates" }, genre: { ko: "BL 드라마", en: "BL Drama" }, rating: 4.4, year: 2023, color: "linear-gradient(135deg,#2a4a6a,#5a8ab8)", poster: "https://image.heavenly.tv/content/15265885584634743693-20231124070959.png", detailKey: "heavenly-492" }
];

// Rating distribution (5,4,3,2,1) — DETAIL_BUNDLES보다 먼저 선언해야 함 (TDZ 오류 방지)
const RATING_DIST = [120, 30, 9, 3, 2];

// Detail page presets (탐색 카드의 detailKey와 연결). heavenly-492 = https://heavenly.tv/detail/492 메타 기준
const DETAIL_BUNDLES = {
  main: {
    useI18nHero: true,
    content: CONTENT,
    scenes: SCENES,
    quotes: QUOTES,
    cast: CAST,
    reviews: REVIEWS,
    ratingDist: RATING_DIST,
    trailerYoutubeId: null,
    heavenlyUrl: null
  },
  "heavenly-492": {
    useI18nHero: false,
    heavenlyUrl: "https://heavenly.tv/detail/492",
    trailerYoutubeId: "JUu6oQvnzQY",
    heroDesc: {
      ko: "재혼 가정에서 형제가 된 우비와 쑤위. 엄마가 남긴 조각상을 닮은 소년과 마주치며, 서로의 결핍을 채워 가는 청춘 로맨스.",
      en: "Wubi and Xu Wei become stepbrothers; drawn to the boy who resembles his late mother's sculpture, they slowly fill each other's gaps."
    },
    synopsis: {
      ko: "우비는 아빠가 새엄마의 아들을 자신과 같은 학교로 보낸다는 말을 듣고 아빠 몰래 전학 수속을 밟는다. 전학을 간 학교에서 우비는 세상을 떠난 엄마가 마지막으로 만든 소년 조각상과 닮은 쑤위를 만나고, 엄마가 생전에 좋아했던 노래를 부르는 쑤위에게 자꾸만 눈길이 간다. 재혼 가정의 형제가 된 쑤위와 우비. 둘은 서로의 결핍을 채워주며 조금씩 가까워지는데…",
      en: "Hearing his father plans to send his stepmother's son to the same school, Wubi transfers in secret. At the new school he meets Xu Wei, who resembles the boy sculpture his late mother created last, and keeps noticing Xu Wei singing a song his mother loved. As stepbrothers in a blended family, they slowly grow closer, filling each other's gaps…"
    },
    content: {
      id: "heavenly-492",
      title: { ko: "가가니별포 : 네가 어디 있든", en: "Stay With Me" },
      heroImage: "url('https://image.heavenly.tv/content/6313374596550015593-20230704090626.jpg') center/cover no-repeat"
    },
    badgeMeta: { ko: "2023 · BL 드라마 · 24부작", en: "2023 · BL Drama · 24 eps" },
    heroMeta: {
      rating: "4.4",
      reviewCount: "—",
      ageLabel: { ko: "15세 이상", en: "Age 15+" },
      subsLabel: { ko: "자막 · 헬로라이브 기준", en: "Subtitles · per Hellolive" }
    },
    scenes: [
      { title: { ko: "EP.1 전학과 첫 만남", en: "EP.1 Transfer & first meeting" }, time: "31:34 · PG15", color: "linear-gradient(135deg,#1e3a5c,#4a7ab0)" },
      { title: { ko: "EP.2 티격태격 형제", en: "EP.2 Bickering brothers" }, time: "33:57 · PG15", color: "linear-gradient(135deg,#3a2a4e,#6a4a8e)" },
      { title: { ko: "EP.3 거리 좁히기", en: "EP.3 Closing the distance" }, time: "33:13 · PG15", color: "linear-gradient(135deg,#2a4a3e,#4a8a6e)" },
      { title: { ko: "EP.4 보호와 오해", en: "EP.4 Protection & misunderstanding" }, time: "34:26 · PG15", color: "linear-gradient(135deg,#4a2a2a,#8a4a4a)" }
    ],
    quotes: [
      { text: { ko: "네가 어디에 있든, 시선이 닿는 곳에 네가 있어.", en: "Wherever you are, you're where my eyes land." }, who: { ko: "우비", en: "Wubi" } },
      { text: { ko: "서로의 빈자리를 메우다 보면, 어느새 하나의 이야기가 된다.", en: "Fill each other's gaps long enough, and you become one story." }, who: { ko: "쑤위", en: "Xu Wei" } }
    ],
    cast: [
      { name: { ko: "장형민", en: "Jang Hyung-min" }, role: { ko: "출연", en: "Cast" }, emoji: "🎭" },
      { name: { ko: "서빈", en: "Seo Bin" }, role: { ko: "출연", en: "Cast" }, emoji: "🎭" },
      { name: { ko: "소소신", en: "Soso Shin" }, role: { ko: "크리에이터", en: "Creator" }, emoji: "✍️" }
    ],
    reviews: [],
    ratingDist: [0, 0, 0, 0, 0]
  }
};

// 마이페이지 고객센터 FAQ — 전체·상세는 Notion 공식 문서 참조
// https://golden-icecream-4f0.notion.site/FAQ-17bdd33f8dbc80b5a607f57b8644ca97
const HELP_FAQ_NOTION_URL = "https://golden-icecream-4f0.notion.site/FAQ-17bdd33f8dbc80b5a607f57b8644ca97";

const HELP_CENTER_FAQ = {
  linkLabel: { ko: "공식 FAQ 전체 보기 (Notion)", en: "Open full FAQ (Notion)" },
  intro: {
    ko: "자주 묻는 질문의 전체·최신 내용은 아래 공식 FAQ 페이지에서 확인하실 수 있습니다. 아래 항목은 앱·웹에서 빠르게 참고하실 수 있도록 요약한 것이며, 세부 조건·예외는 공식 FAQ를 기준으로 합니다.",
    en: "For the complete, up-to-date FAQ, use the official Notion page below. The collapsible items here are a short on-site summary; details and exceptions follow the official FAQ."
  },
  summaryHeading: { ko: "자주 묻는 질문 (요약)", en: "FAQ (summary)" },
  footerNote: {
    ko: "위 요약에 없는 내용은 공식 FAQ에서 검색하거나 고객센터로 문의해 주세요.",
    en: "If your question is not covered above, check the full FAQ or contact support."
  },
  items: [
    {
      q: { ko: "환불은 어떻게 신청하나요?", en: "How do I request a refund?" },
      a: {
        ko: "디지털 콘텐츠 특성상 시청 여부·이용 시작 시점 등에 따라 환불이 제한될 수 있습니다. 구체적인 기준·절차는 공식 FAQ의 환불 안내를 확인해 주시고, 신청 시에는 주문번호·가입 이메일과 함께 고객센터로 문의해 주세요.",
        en: "Refunds may be limited depending on whether playback has started and other digital-content rules. See the official FAQ for criteria and steps, and email support with your order number and account email."
      }
    },
    {
      q: { ko: "결제 내역은 어디서 확인하나요?", en: "Where can I see my payment history?" },
      a: {
        ko: "로그인 후 마이페이지의 구매 내역·이용내역(또는 계정·결제 메뉴)에서 확인하실 수 있습니다. 자세한 항목명은 공식 FAQ를 참고해 주세요.",
        en: "After signing in, check Purchases or billing history in My Page. Exact menu names may vary—see the official FAQ."
      }
    },
    {
      q: { ko: "정기 결제(멤버십) 해지는 어떻게 하나요?", en: "How do I cancel a subscription?" },
      a: {
        ko: "마이페이지의 멤버십·결제 관련 메뉴에서 해지 신청이 가능합니다. 해지 시점·환불 가능 여부는 이용 중인 상품 및 공식 FAQ 기준을 따릅니다.",
        en: "Cancel from the membership or billing section in My Page. Effective date and refunds depend on your plan and the official FAQ."
      }
    },
    {
      q: { ko: "동시에 몇 대까지 시청할 수 있나요?", en: "How many devices can stream at once?" },
      a: {
        ko: "이용 중인 요금제·멤버십에 따라 동시 시청 가능 기기 수가 다를 수 있습니다. 기본 안내는 공식 FAQ의 시청·기기 관련 항목을 확인해 주세요.",
        en: "Concurrent streams depend on your plan. See the official FAQ for device and streaming limits."
      }
    },
    {
      q: { ko: "자막·화질·지원 환경은 어떻게 되나요?", en: "What about subtitles, quality, and supported devices?" },
      a: {
        ko: "작품별로 제공 자막 언어·화질·지원 플랫폼(웹·앱 등)이 다를 수 있습니다. 지원 OS·브라우저·앱 버전은 공식 FAQ의 이용 환경 안내를 참고해 주세요.",
        en: "Subtitles, quality, and supported platforms vary by title. See the official FAQ for OS, browser, and app requirements."
      }
    },
    {
      q: { ko: "로그인·계정(이메일·소셜) 문제가 있어요.", en: "I have login or account issues." },
      a: {
        ko: "동일 서비스라도 로그인 수단(이메일·소셜)별로 계정이 분리될 수 있습니다. 비밀번호 찾기·이메일 인증 등은 공식 FAQ의 계정 항목을 확인해 주시고, 해결이 어려우면 고객센터로 연락해 주세요.",
        en: "Email and social logins may be separate accounts. Use the official FAQ for password reset and verification; contact support if you are still stuck."
      }
    },
    {
      q: { ko: "제휴·입점·사업 제안은 어디로 보내나요?", en: "Where do I send partnership or business proposals?" },
      a: {
        ko: "제휴·콘텐츠 제안은 안내된 제휴 문의 채널(이메일 등)을 이용해 주세요. 자세한 제출 양식은 공식 FAQ 또는 회사 안내 페이지를 참고해 주세요.",
        en: "Use the partnership or content inquiry email listed in our help materials. The official FAQ may include forms or guidelines."
      }
    }
  ]
};

const GENRES = [
  { name: { ko: "로맨스", en: "Romance" }, count: 124, emoji: "💕", color: "linear-gradient(135deg,#ff3d6e,#ff8aa8)" },
  { name: { ko: "드라마", en: "Drama" }, count: 218, emoji: "🎭", color: "linear-gradient(135deg,#3a5eaa,#6a8aff)" },
  { name: { ko: "스릴러", en: "Thriller" }, count: 89, emoji: "🔪", color: "linear-gradient(135deg,#1a1a1a,#5a3a3a)" },
  { name: { ko: "판타지", en: "Fantasy" }, count: 67, emoji: "✨", color: "linear-gradient(135deg,#7a3aaa,#aa6aff)" },
  { name: { ko: "액션", en: "Action" }, count: 102, emoji: "💥", color: "linear-gradient(135deg,#aa3a3a,#ff7a3a)" },
  { name: { ko: "코미디", en: "Comedy" }, count: 76, emoji: "😄", color: "linear-gradient(135deg,#ffaa3a,#ffe07a)" },
  { name: { ko: "다큐멘터리", en: "Documentary" }, count: 45, emoji: "📷", color: "linear-gradient(135deg,#3a7a5a,#7aaa8a)" },
  { name: { ko: "애니메이션", en: "Animation" }, count: 98, emoji: "🎨", color: "linear-gradient(135deg,#ff6aaa,#ffaadd)" },
  { name: { ko: "공포", en: "Horror" }, count: 34, emoji: "👻", color: "linear-gradient(135deg,#1a0a0a,#3a1a3a)" },
  { name: { ko: "SF", en: "Sci-Fi" }, count: 56, emoji: "🚀", color: "linear-gradient(135deg,#0a3a5a,#3a8aaa)" },
  { name: { ko: "키즈", en: "Kids" }, count: 88, emoji: "🧸", color: "linear-gradient(135deg,#7aaaff,#aaddff)" },
  { name: { ko: "음악", en: "Music" }, count: 42, emoji: "🎵", color: "linear-gradient(135deg,#aa3a7a,#ff7aaa)" }
];

// Watch flow products
const PRODUCTS = [
  { id: "p2", quality: "HD", res: "720p", days: 7, price: 4900, badge: { ko: "추천", en: "POPULAR" } },
  { id: "p3", quality: "FHD", res: "1080p", days: 30, price: 7900, badge: null },
  { id: "p4", quality: "4K UHD", res: "2160p HDR", days: 30, price: 9900, badge: { ko: "최고화질", en: "BEST" } },
  { id: "p5", quality: "4K UHD", res: "2160p HDR", days: -1, price: 14900, badge: { ko: "영구소장", en: "OWN" } }
];

const PAY_METHODS = [
  { id: "card", name: { ko: "신용/체크카드", en: "Credit/Debit Card" }, icon: "💳", desc: { ko: "Visa, Master, JCB 등", en: "Visa, MasterCard, JCB & more" } },
  { id: "kakaopay", name: { ko: "카카오페이", en: "KakaoPay" }, icon: "K", desc: { ko: "국내 간편결제", en: "Korea fast pay" } },
];

// Points history
const POINTS_EARN = [
  { date: "2025.01.15 14:32", source: { ko: "공유 링크 결제", en: "Shared link purchase" }, detail: { ko: "달빛 아래 그대 · @anna_jp", en: "Moonlight With You · @anna_jp" }, amount: 490 },
  { date: "2025.01.15 11:08", source: { ko: "공유 링크 결제", en: "Shared link purchase" }, detail: { ko: "별이 머무는 밤 · @max_de", en: "Where Stars Stay · @max_de" }, amount: 290 },
  { date: "2025.01.14 22:14", source: { ko: "친구 가입 보너스", en: "Friend signup bonus" }, detail: { ko: "@jenny_ph 가입", en: "@jenny_ph joined" }, amount: 1000 },
  { date: "2025.01.14 19:45", source: { ko: "공유 링크 결제", en: "Shared link purchase" }, detail: { ko: "시간의 끝에서 · @lucas_br", en: "At the End of Time · @lucas_br" }, amount: 990 },
  { date: "2025.01.13 09:21", source: { ko: "리뷰 작성", en: "Review written" }, detail: { ko: "달빛 아래 그대 리뷰", en: "Moonlight With You review" }, amount: 100 },
  { date: "2025.01.12 17:00", source: { ko: "출석 보너스", en: "Daily check-in" }, detail: { ko: "7일 연속 출석", en: "7 days streak" }, amount: 500 },
  { date: "2025.01.11 13:33", source: { ko: "공유 링크 결제", en: "Shared link purchase" }, detail: { ko: "서울의 비밀 · @priya_in", en: "Secrets of Seoul · @priya_in" }, amount: 790 }
];

const POINTS_USE = [
  { date: "2025.01.10 21:00", source: { ko: "콘텐츠 결제 차감", en: "Content payment" }, detail: { ko: "조용한 도시 · 1,000P 사용", en: "Silent City · 1,000P used" }, amount: -1000 },
  { date: "2025.01.05 15:20", source: { ko: "멤버십 결제", en: "Membership" }, detail: { ko: "월 멤버십 · 2,000P 사용", en: "Monthly membership · 2,000P used" }, amount: -2000 },
  { date: "2024.12.28 11:11", source: { ko: "콘텐츠 결제 차감", en: "Content payment" }, detail: { ko: "여름의 기억 · 500P 사용", en: "Summer Memory · 500P used" }, amount: -500 }
];

const FRIEND_RANK = [
  { rank: 1, name: "moonlover92", country: "🇰🇷", points: 234500, you: false },
  { rank: 2, name: "tokyo_anna", country: "🇯🇵", points: 198200, you: false },
  { rank: 3, name: "carlos_mx", country: "🇲🇽", points: 156800, you: false },
  { rank: 4, name: "Guest User (You)", country: "🇰🇷", points: 84200, you: true },
  { rank: 5, name: "berlin_max", country: "🇩🇪", points: 72100, you: false },
  { rank: 6, name: "paris_juliette", country: "🇫🇷", points: 65300, you: false }
];

// Realtime feed templates (will be cycled)
const RT_TEMPLATES = [
  { ko: "🇯🇵 anna님이 당신의 링크로 결제 → +290P", en: "🇯🇵 anna purchased via your link → +290P" },
  { ko: "🇲🇽 carlos님이 당신의 링크로 결제 → +490P", en: "🇲🇽 carlos purchased via your link → +490P" },
  { ko: "🇩🇪 max님이 당신의 링크 클릭 → +5P", en: "🇩🇪 max clicked your link → +5P" },
  { ko: "🇫🇷 juliette님이 가입 → +1,000P", en: "🇫🇷 juliette joined → +1,000P" },
  { ko: "🇧🇷 lucas님이 당신의 링크로 결제 → +790P", en: "🇧🇷 lucas purchased via your link → +790P" },
  { ko: "🇮🇳 priya님이 당신의 링크 클릭 → +5P", en: "🇮🇳 priya clicked your link → +5P" },
  { ko: "🇹🇭 ploy님이 당신의 링크로 결제 → +990P", en: "🇹🇭 ploy purchased via your link → +990P" }
];