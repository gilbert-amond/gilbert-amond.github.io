// ============ I18N ============
const T = {
  ko: {
    nav_explore: "탐색", nav_trending: "인기", nav_genre: "장르", nav_library: "내 라이브러리",
    btn_login: "로그인", btn_signup: "회원가입", btn_watch: "▶ 지금 보기",
    btn_trailer: "🎬 예고편 보기", btn_fav: "＋ 찜", btn_share: "🔗 공유",
    badge_hot: "🔥 글로벌 인기 1위", badge_meta: "2024 · 드라마 · 8부작",
    age_15: "15세 이상", lang_subs: "한국어 / 자막 12개 언어",
    reviews_n: "리뷰", reviews_total: "개의 리뷰",
    price_single: "단건 결제 ₩2,900부터", price_or: "또는 구독 멤버십에 포함",
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
    trailer_title: "예고편 · 달빛 아래 그대",
    hero_desc: "평범한 일상에 어느 날 찾아온 비밀스러운 만남. 서로 다른 시간을 살아가는 두 사람이 달빛 아래에서 마주칠 때, 운명은 어디로 향할까.",
    synopsis: "조용한 골목길의 작은 책방 주인 유진은 어느 날 낡은 일기장을 발견한다. 일기장에 적힌 인물 도윤은 100년 전을 살았던 사람이지만, 어느 보름달 밤, 두 사람은 같은 거리에서 마주친다. 서로의 시간이 잠시 겹치는 보름달의 밤, 그들의 짧은 만남은 점차 운명을 흔들기 시작하는데…"
  },
  en: {
    nav_explore: "Explore", nav_trending: "Trending", nav_genre: "Genre", nav_library: "My Library",
    btn_login: "Sign in", btn_signup: "Sign up", btn_watch: "▶ Watch Now",
    btn_trailer: "🎬 Watch Trailer", btn_fav: "＋ Save", btn_share: "🔗 Share",
    badge_hot: "🔥 #1 Global Hit", badge_meta: "2024 · Drama · 8 Episodes",
    age_15: "Age 15+", lang_subs: "Korean / Subtitles in 12 languages",
    reviews_n: "Reviews", reviews_total: "reviews",
    price_single: "From $3.99", price_or: "or included in membership",
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
    trailer_title: "Trailer · Moonlight With You",
    hero_desc: "An ordinary day. A mysterious meeting. When two people from different times meet under the moonlight, where does fate lead them?",
    synopsis: "Yujin, the owner of a small bookstore in a quiet alley, finds an old diary. Doyun, the person written in it, lived a hundred years ago — yet on a full moon night, the two meet on the same street. Their brief encounters slowly begin to shake destiny itself…"
  }
};

// ============ CONTENT DATA ============
const CONTENT = {
  id: "moonlight-with-you",
  title: { ko: "달빛 아래 그대", en: "Moonlight With You" },
  heroImage: "linear-gradient(135deg, #1a0f2e 0%, #4a1a5e 40%, #8b3a8a 100%)"
};

const SCENES = [
  { title: { ko: "운명적인 첫 만남", en: "A Fated First Encounter" }, time: "EP1 · 12:30", color: "linear-gradient(135deg,#3a1c5e,#8b3a8a)" },
  { title: { ko: "보름달의 약속", en: "Promise of the Full Moon" }, time: "EP3 · 24:18", color: "linear-gradient(135deg,#0f3a5e,#3a8aa8)" },
  { title: { ko: "사라지는 시간", en: "Time Slipping Away" }, time: "EP5 · 31:44", color: "linear-gradient(135deg,#5e1c3a,#a83a5e)" },
  { title: { ko: "마지막 편지", en: "The Last Letter" }, time: "EP7 · 40:02", color: "linear-gradient(135deg,#1c5e3a,#3aa85e)" }
];

const QUOTES = [
  { text: { ko: "달빛이 우리를 비추는 그 짧은 순간만큼은, 너와 같은 시간을 살고 있어.", en: "While moonlight shines on us, I live in the same time as you." }, who: { ko: "도윤", en: "Doyun" } },
  { text: { ko: "어떤 만남은 짧아서 더 오래 남아요.", en: "Some meetings last longer because they were short." }, who: { ko: "유진", en: "Yujin" } },
  { text: { ko: "잊는 게 아니라, 다시 만날 준비를 하는 거야.", en: "It's not forgetting — it's getting ready to meet again." }, who: { ko: "도윤", en: "Doyun" } }
];

const CAST = [
  { name: { ko: "한지우", en: "Han Jiwoo" }, role: { ko: "유진 役", en: "as Yujin" }, emoji: "👩" },
  { name: { ko: "이도현", en: "Lee Dohyun" }, role: { ko: "도윤 役", en: "as Doyun" }, emoji: "👨" },
  { name: { ko: "정수민", en: "Jung Sumin" }, role: { ko: "수민 役", en: "as Sumin" }, emoji: "👩‍🦰" },
  { name: { ko: "박재현", en: "Park Jaehyun" }, role: { ko: "재현 役", en: "as Jaehyun" }, emoji: "🧑" },
  { name: { ko: "김아름", en: "Kim Areum" }, role: { ko: "각본", en: "Screenplay" }, emoji: "✍️" },
  { name: { ko: "최민수", en: "Choi Minsu" }, role: { ko: "연출", en: "Director" }, emoji: "🎬" }
];

// 16 reviews for the reviews page
const REVIEWS = [
  { user: "moonlover92", country: "🇰🇷", rating: 5, photo: true, verified: true, spoiler: false, title: { ko: "올해 본 드라마 중 단연 최고", en: "Best drama of the year" }, body: { ko: "초반엔 잔잔했는데 3화부터 멈출 수가 없었어요. 영상미와 음악이 압권입니다. 마지막화는 세 번 봤네요.", en: "Quiet at first, but from EP3 I couldn't stop. Cinematography and score are incredible. Watched the finale 3 times." }, likes: 482, date: "2025.01.12" },
  { user: "tokyo_anna", country: "🇯🇵", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "韓国ドラマで久々の傑作", en: "A masterpiece of Korean drama" }, body: { ko: "字幕で見ましたが、感情がそのまま伝わってきました。主演二人のケミがすごい。", en: "Watched with subs — emotions came through perfectly. Chemistry between the leads is amazing." }, likes: 318, date: "2025.01.10" },
  { user: "carlos_mx", country: "🇲🇽", rating: 4, photo: true, verified: true, spoiler: false, title: { ko: "Visualmente hermoso", en: "Visually stunning" }, body: { ko: "La fotografía es preciosa. La historia te atrapa desde el primer episodio.", en: "Cinematography is gorgeous. Story hooks you from the very first episode." }, likes: 201, date: "2025.01.08" },
  { user: "novel_reader", country: "🇰🇷", rating: 5, photo: false, verified: true, spoiler: true, title: { ko: "원작 팬으로서 만족", en: "As a fan of the novel — satisfied" }, body: { ko: "원작 소설을 좋아했는데, 영상화가 이렇게 잘 될 줄 몰랐습니다. 각색이 훌륭해요.", en: "Loved the original novel — never expected the adaptation to be this good." }, likes: 156, date: "2025.01.05" },
  { user: "paris_juliette", country: "🇫🇷", rating: 5, photo: true, verified: true, spoiler: false, title: { ko: "Magnifique!", en: "Magnifique!" }, body: { ko: "Une histoire poétique. Les images, la musique... tout est parfait.", en: "A poetic story. Images, music... everything is perfect." }, likes: 98, date: "2025.01.04" },
  { user: "berlin_max", country: "🇩🇪", rating: 4, photo: false, verified: true, spoiler: false, title: { ko: "Sehr emotional", en: "Very emotional" }, body: { ko: "Die Charaktere sind lebendig. Episode 6 hat mich zum Weinen gebracht.", en: "Characters feel real. EP6 made me cry." }, likes: 87, date: "2025.01.03" },
  { user: "manila_jen", country: "🇵🇭", rating: 5, photo: true, verified: false, spoiler: false, title: { ko: "Best K-drama 2024!", en: "Best K-drama 2024!" }, body: { ko: "I rewatched the trailer 20 times before watching. Worth every minute.", en: "I rewatched the trailer 20 times before watching. Worth every minute." }, likes: 142, date: "2025.01.02" },
  { user: "delhi_priya", country: "🇮🇳", rating: 5, photo: false, verified: true, spoiler: false, title: { ko: "Unique storytelling", en: "Unique storytelling" }, body: { ko: "The way time is woven into the romance is genius. Loved every moment.", en: "The way time is woven into the romance is genius. Loved every moment." }, likes: 119, date: "2024.12.30" },
  { user: "sao_lucas", country: "🇧🇷", rating: 3, photo: false, verified: true, spoiler: false, title: { ko: "Bom mas previsível", en: "Good but predictable" }, body: { ko: "Boa produção mas algumas cenas demoradas demais.", en: "Solid production but some scenes drag a bit." }, likes: 34, date: "2024.12.28" },
  { user: "sydney_emma", country: "🇦🇺", rating: 5, photo: true, verified: true, spoiler: false, title: { ko: "Couldn't sleep after EP8", en: "Couldn't sleep after EP8" }, body: { ko: "That ending. I have so many feelings. Please give us a season 2.", en: "That ending. I have so many feelings. Please give us a season 2." }, likes: 267, date: "2024.12.27" },
  { user: "hanoi_nam", country: "🇻🇳", rating: 4, photo: false, verified: true, spoiler: false, title: { ko: "Phim hay quá", en: "Such a beautiful drama" }, body: { ko: "Diễn xuất tuyệt vời, kịch bản chặt chẽ.", en: "Wonderful acting, tight script." }, likes: 76, date: "2024.12.26" },
  { user: "bangkok_ploy", country: "🇹🇭", rating: 5, photo: true, verified: true, spoiler: false, title: { ko: "ดูซ้ำได้ทุกวัน", en: "Could watch every day" }, body: { ko: "ดูครบทุกตอนภายในวันเดียว เก็บอารมณ์ไม่อยู่!", en: "Watched all episodes in one day. Couldn't keep my emotions in!" }, likes: 88, date: "2024.12.25" }
];

// Explore content
const EXPLORE_CONTENT = [
  { title: { ko: "달빛 아래 그대", en: "Moonlight With You" }, genre: { ko: "로맨스", en: "Romance" }, rating: 4.9, year: 2024, color: "linear-gradient(135deg,#1a0f2e,#8b3a8a)" },
  { title: { ko: "별이 머무는 밤", en: "Where Stars Stay" }, genre: { ko: "로맨스", en: "Romance" }, rating: 4.7, year: 2023, color: "linear-gradient(135deg,#1a3a5e,#3a6aa8)" },
  { title: { ko: "서울의 비밀", en: "Secrets of Seoul" }, genre: { ko: "스릴러", en: "Thriller" }, rating: 4.8, year: 2024, color: "linear-gradient(135deg,#3a1a1a,#8a3a3a)" },
  { title: { ko: "파리의 봄", en: "A Spring in Paris" }, genre: { ko: "로맨스", en: "Romance" }, rating: 4.6, year: 2024, color: "linear-gradient(135deg,#3a5e1a,#7aa83a)" },
  { title: { ko: "시간의 끝에서", en: "At the End of Time" }, genre: { ko: "판타지", en: "Fantasy" }, rating: 4.9, year: 2023, color: "linear-gradient(135deg,#5e3a1a,#a87a3a)" },
  { title: { ko: "조용한 도시", en: "Silent City" }, genre: { ko: "드라마", en: "Drama" }, rating: 4.5, year: 2024, color: "linear-gradient(135deg,#3a3a5e,#6a6aa8)" },
  { title: { ko: "여름의 기억", en: "Summer Memory" }, genre: { ko: "로맨스", en: "Romance" }, rating: 4.7, year: 2022, color: "linear-gradient(135deg,#5e1a4a,#a83a8a)" },
  { title: { ko: "마지막 영웅", en: "The Last Hero" }, genre: { ko: "액션", en: "Action" }, rating: 4.4, year: 2024, color: "linear-gradient(135deg,#5e1a1a,#a83a3a)" },
  { title: { ko: "달의 정원", en: "Moon Garden" }, genre: { ko: "판타지", en: "Fantasy" }, rating: 4.8, year: 2024, color: "linear-gradient(135deg,#1a1a5e,#3a3aa8)" },
  { title: { ko: "검은 강", en: "Black River" }, genre: { ko: "스릴러", en: "Thriller" }, rating: 4.6, year: 2023, color: "linear-gradient(135deg,#1a1a1a,#3a3a3a)" },
  { title: { ko: "웃음의 거리", en: "Laughing Street" }, genre: { ko: "코미디", en: "Comedy" }, rating: 4.3, year: 2024, color: "linear-gradient(135deg,#5e5a1a,#a89a3a)" },
  { title: { ko: "첫눈처럼", en: "Like First Snow" }, genre: { ko: "로맨스", en: "Romance" }, rating: 4.5, year: 2023, color: "linear-gradient(135deg,#3a5a7a,#7aa8c8)" }
];

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
  { id: "p1", quality: "HD", res: "720p", days: 2, price: 2900, badge: null },
  { id: "p2", quality: "HD", res: "720p", days: 7, price: 4900, badge: { ko: "추천", en: "POPULAR" } },
  { id: "p3", quality: "FHD", res: "1080p", days: 30, price: 7900, badge: null },
  { id: "p4", quality: "4K UHD", res: "2160p HDR", days: 30, price: 9900, badge: { ko: "최고화질", en: "BEST" } },
  { id: "p5", quality: "4K UHD", res: "2160p HDR", days: -1, price: 14900, badge: { ko: "영구소장", en: "OWN" } }
];

const PAY_METHODS = [
  { id: "card", name: { ko: "신용/체크카드", en: "Credit/Debit Card" }, icon: "💳", desc: { ko: "Visa, Master, JCB 등", en: "Visa, MasterCard, JCB & more" } },
  { id: "paypal", name: { ko: "PayPal", en: "PayPal" }, icon: "🅿️", desc: { ko: "전 세계 200+개국 지원", en: "200+ countries supported" } },
  { id: "applepay", name: { ko: "Apple Pay", en: "Apple Pay" }, icon: "", desc: { ko: "Touch ID / Face ID", en: "Touch ID / Face ID" } },
  { id: "googlepay", name: { ko: "Google Pay", en: "Google Pay" }, icon: "G", desc: { ko: "원클릭 결제", en: "One-click checkout" } },
  { id: "kakaopay", name: { ko: "카카오페이", en: "KakaoPay" }, icon: "K", desc: { ko: "국내 간편결제", en: "Korea fast pay" } },
  { id: "tosspay", name: { ko: "토스페이", en: "TossPay" }, icon: "T", desc: { ko: "국내 간편결제", en: "Korea fast pay" } }
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

// Rating distribution (5,4,3,2,1)
const RATING_DIST = [9420, 2310, 540, 110, 58];