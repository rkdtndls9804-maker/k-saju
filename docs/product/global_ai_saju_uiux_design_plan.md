# 글로벌 AI 사주 서비스 UI/UX 디자인 기획서

### K-Fortune --- Korean Astrology for a Global Generation

*Design Planning Document / Working Title*

------------------------------------------------------------------------

## 1. 디자인 목표

K-Fortune의 디자인 목표는 **"사주를 처음 보는 외국인도 설명 없이
직관적으로 즐길 수 있는 Korean Astrology 경험"**을 만드는 것이다.

사주를 전통적인 동양 점술 서비스처럼 표현하지 않는다.

Western Astrology 서비스에서 익숙한 **Cosmic / Mystical / Personal**
무드를 기반으로 하되, 한국의 오행·사주 구조를 현대적으로 재해석한다.

### 핵심 디자인 문장

> **Mystical enough to feel magical.\
> Modern enough to feel trustworthy.\
> Korean enough to feel new.**

사용자가 서비스를 처음 봤을 때 느껴야 하는 감정은 다음 순서다.

**"예쁘다." → "이게 뭐지?" → "나도 해보고 싶다." → "헐 이거 나 같은데?"
→ "친구한테 보내야겠다."**

------------------------------------------------------------------------

## 2. 디자인 핵심 키워드

### Core Mood

**Cosmic × Modern Korean × Dreamy × Personal × Social**

### 보조 키워드

-   Celestial
-   Mysterious
-   Soft
-   Premium
-   Emotional
-   Gen Z
-   Editorial
-   Shareable
-   Korean-inspired

### 피해야 할 이미지

#### Traditional Fortune Teller

-   점집
-   무속
-   부적
-   붓글씨
-   과도한 한자
-   전통 한옥 이미지

#### Generic Horoscope App

-   별자리 아이콘만 반복
-   과도한 우주 배경
-   보라색 그라데이션 남용
-   흔한 AI 생성 우주 이미지

#### K-pop Fan App

-   아이돌 팬페이지처럼 보이는 디자인
-   과도한 핑크
-   포토카드 수집 앱 같은 구조
-   특정 그룹의 공식 앱처럼 보이는 디자인

서비스의 본체는 **K-pop이 아니라 Korean Astrology**다.

------------------------------------------------------------------------

## 3. Visual Identity

### 3-1. 기본 컬러 방향

전체 UI는 **Dark Mode First**를 기본으로 한다.

밤에 별자리를 보는 듯한 신비로운 분위기를 만들고, 공유 카드에서 컬러
대비를 강하게 가져가기 좋다.

### Base --- Midnight Black

`#0C0C14`

완전한 Black 대신 아주 약한 Navy/Purple가 포함된 Black을 사용한다.

### Surface

`#161622`

카드 및 Bottom Sheet 배경.

### Text

Primary: `#F8F7FC`

Secondary: `#A8A5B5`

### Accent

하나의 브랜드 컬러만 강하게 고정하기보다는 **오행에 따라 Accent Color가
변하는 구조**를 추천한다.

------------------------------------------------------------------------

## 4. Five Elements Color System

사주의 핵심인 五行을 서비스 전체의 Visual System으로 활용한다.

단, 전통적인 오방색을 그대로 가져오지 않고 현대적으로 재해석한다.

  Element    Theme              Visual Mood
  ---------- ------------------ -------------
  Wood 🌿    Sage / Emerald     Growth
  Fire 🔥    Coral / Red        Passion
  Earth 🪨   Sand / Amber       Stability
  Metal 💎   Silver / Pearl     Precision
  Water 💧   Deep Blue / Aqua   Intuition

사용자의 Day Master에 따라 앱 곳곳의 포인트 컬러가 달라진다.

예:

**Yin Metal User**\
기본 Dark UI + Silver / Pearl Glow

**Yang Fire User**\
기본 Dark UI + Warm Red / Coral Glow

즉 사용자가 자신의 Element를 **색깔로도 기억하게 만든다.**

------------------------------------------------------------------------

## 5. Graphic Motif

### Four Pillars

사주의 네 기둥을 대표하는 Visual Motif로 **4개의 세로 Column**을
사용한다.

``` text
YEAR     MONTH     DAY     HOUR
 │         │        │       │
WOOD      FIRE     METAL    WATER
🐯         🐇       🐍       🐉
```

이를 단순 표가 아니라 **4개의 빛나는 Pillar Card**처럼 표현한다.

### Eight Characters

8개의 글자는 서비스의 Symbolic Graphic으로 활용 가능하다.

Eight dots / Eight stars / Eight fragments가 모여 하나의 개인 Chart를
형성하는 애니메이션.

#### Loading Example

Birth 정보를 입력하면 화면 중앙에 작은 별 8개가 등장한다.

점들이 움직이며 네 개의 Pillar를 형성한다.

> **Reading your Eight Characters...**

이후 사용자의 Element가 등장한다.

------------------------------------------------------------------------

## 6. Typography

영어 서비스 기준.

### Display Font

감성적이고 신비로운 Serif 계열.

사용 영역:

-   YOUR CORE ELEMENT
-   YIN METAL
-   THE HIDDEN DIAMOND
-   2027 --- THE YEAR YOU MOVE

### UI Font

가독성이 높은 Sans Serif.

사용 영역:

-   Navigation
-   Body
-   Button
-   AI Chat

### Typography Contrast

``` text
YOUR CORE ELEMENT       ← Sans / Small

Yin Metal               ← Serif / Large

The Hidden Diamond      ← Serif / Italic

You appear calm,
but you notice
everything.             ← Sans
```

Editorial Magazine 같은 느낌을 만든다.

------------------------------------------------------------------------

## 7. 홈 화면

홈은 메뉴판이 아니라 **Personal Fortune Dashboard**로 설계한다.

### HOME

상단:

> Good evening, Suin.

> **Your energy today**

중앙:

### 78

**TODAY'S ENERGY**

작은 원형 Orbit Animation.

아래:

**Love** ❤️ 84\
**Career** 💼 91\
**Money** 💰 67

이어서 콘텐츠 카드:

> ✨ Your 2027\
> The Year You Move

> 💘 Love Profile\
> Why you fall slowly but deeply

> 🔥 Celebrity Match\
> Find your K-pop astrology twin

> 💬 Ask Your Chart\
> What do you want to know?

홈 자체가 매일 조금씩 달라져야 한다.

------------------------------------------------------------------------

## 8. 온보딩

온보딩의 목적은 Four Pillars를 가르치는 것이 아니다.

**최대한 빨리 Birth Chart 결과를 보여주는 것**이다.

### Screen 01

검은 배경.

작은 별들이 천천히 움직인다.

중앙:

> **You know your Zodiac.**

1초 후:

> **Now discover your Korean one.**

CTA:

**Discover My Korean Astrology**

### Screen 02

### When were you born?

Date Picker

`APR / 04 / 1998`

하단:

> Your birth date creates three of your Four Pillars.

CTA:

**Continue**

### Screen 03

### What time were you born?

Time Picker

`09 : 26 AM`

아래:

**I don't know my birth time**

시간을 모르는 사용자에게 이탈 압박을 주지 않는다.

### Screen 04

### Where were you born?

Search

`Seoul, South Korea`

설명:

> Your birthplace helps us calculate your birth time more accurately.

------------------------------------------------------------------------

## 9. Calculation Experience

Birth 정보를 입력했다고 바로 결과 페이지로 이동하지 않는다.

약 2\~4초 정도의 **Ritual Moment**를 만든다.

화면 중앙에서 8개의 작은 빛이 등장한다.

↓

8개 → 4개의 Column으로 정렬.

↓

Five Elements 색상이 천천히 나타난다.

텍스트:

> **Finding your Four Pillars**

↓

> Reading your elements...

↓

> Finding your core energy...

↓

화면 Flash.

------------------------------------------------------------------------

## 10. 결과 Reveal

서비스에서 가장 중요한 화면.

전체 정보를 바로 보여주지 않는다.

먼저 **Identity 하나만 Reveal**한다.

화면 중앙:

### YOUR CORE ELEMENT

# YIN METAL

💎

### THE HIDDEN DIAMOND

아래 작은 문장:

> Calm on the outside.\
> Sharper than people realize.

CTA:

**Meet Your Real Self ↓**

이 화면은 사용자가 바로 캡처하고 싶어야 한다.

------------------------------------------------------------------------

## 11. Personality 화면

스크롤 기반 Storytelling.

### YIN METAL

**You don't give everyone access to you.**

설명 2\~3문장.

↓

### YOUR NATURAL STRENGTHS

카드 3개.

**Selective**\
You rarely choose randomly.

**Observant**\
You notice subtle changes in people.

**Independent**\
You need space to remain yourself.

↓

### YOUR SHADOW SIDE

**Overthinking**

Sometimes your standards become walls.

↓

CTA:

**Ask AI why →**

------------------------------------------------------------------------

## 12. Four Pillars Chart

전문적인 정보를 보고 싶은 사용자를 위한 화면.

### YOUR FOUR PILLARS

4개의 세로 카드.

``` text
YEAR       MONTH       DAY        HOUR

Yang       Yin         Yin        Yang
Earth      Wood        Metal      Water

🐯          🐇          🐍          🐉

戊寅        乙卯        辛巳        壬辰
```

처음에는 한자를 작게 처리한다.

각 Pillar 터치 시 Bottom Sheet.

### DAY PILLAR

**This represents your core self and relationship energy.**

전문 용어를 사용자가 원할 때만 보여준다.

------------------------------------------------------------------------

## 13. Five Elements Visualization

일반적인 Bar Chart 대신 **Element Orbit** 형태를 추천한다.

중앙:

**YOU**

주변에 다섯 Element.

🌿 Wood\
🔥 Fire\
🪨 Earth\
💎 Metal\
💧 Water

비중에 따라 Circle 크기가 달라진다.

아래:

> **Your strongest energy**

WOOD

> Growth, ambition and movement strongly influence your chart.

------------------------------------------------------------------------

## 14. Love Profile

연애 콘텐츠는 감성적인 Editorial Layout.

상단:

💘

### YOUR LOVE ENERGY

# Slow Burn

> You rarely fall immediately.\
> But when you choose someone, you go deep.

스크롤:

### HOW YOU FALL IN LOVE

...

### WHAT ATTRACTS YOU

...

### WHAT MAKES YOU LOSE INTEREST

...

### YOUR RELATIONSHIP RED FLAG

...

### YOUR IDEAL ENERGY

...

하단:

**Check Compatibility**

------------------------------------------------------------------------

## 15. Celebrity Match

이 화면은 기존 Astrology 화면보다 조금 더 Pop하게 만든다.

### YOUR K-POP ASTROLOGY TWIN

사용자 Element 표시.

💎

**YIN METAL**

↓

Celebrity Cards

이미지\
이름\
Element

> **Same Core Element**

공통 특성:

**Independent\
Precise\
Unexpectedly Competitive**

CTA:

**Find More Celebrity Twins**

------------------------------------------------------------------------

## 16. K-pop Compatibility

가장 바이럴하게 디자인한다.

### YOU × IDOL

두 사람의 이미지를 양쪽에 배치.

중앙:

# 87%

### CHEMISTRY

아래:

🔥 Attraction --- 92\
💬 Communication --- 76\
🌙 Emotional Rhythm --- 89\
⚡ Chaos Potential --- 71

하단:

> **"Dangerously compatible."**

CTA:

**Share Result**

------------------------------------------------------------------------

## 17. AI Chat

일반 ChatGPT UI처럼 만들지 않는다.

사용자가 **자신의 Chart와 대화한다**는 느낌을 준다.

상단:

✨

### ASK YOUR CHART

입력창:

> Ask about love, career, money...

추천 질문 Chip:

-   **When will I meet someone?**
-   **Should I move abroad?**
-   **What career fits me?**
-   **Tell me about 2027**

AI 답변 상단에는 작은 Label:

**Based on your Four Pillars**

을 표시한다.

계산 데이터에 기반한 답변임을 사용자에게 계속 인식시킨다.

------------------------------------------------------------------------

## 18. Year Ahead

연간 운세는 **Magazine Cover** 같은 화면으로 디자인한다.

### YOUR 2027

# THE YEAR

# YOU MOVE

작은 설명:

> Movement, independence and new environments define your year.

아래:

LOVE ★★★★☆\
CAREER ★★★★☆\
MONEY ★★★☆☆\
TRAVEL ★★★★★\
FRIENDSHIP ★★★★☆

↓

### YOUR TIMELINE

``` text
JAN ─── MAR ─── MAY ─── JUL ─── SEP ─── NOV
```

특정 달에 Glow 표시.

예:

**JUL** --- ✈️ Movement\
**SEP** --- 💘 Relationship\
**NOV** --- 💼 Career

사용자가 Timeline을 눌러 월별 운세를 확인한다.

------------------------------------------------------------------------

## 19. Share Card

이 서비스에서 가장 중요한 디자인 자산 중 하나.

Share Card 자체가 광고 역할을 해야 한다.

### TYPE A --- Element

``` text
MY KOREAN ASTROLOGY

       💎

   YIN METAL

THE HIDDEN DIAMOND

Selective
Independent
Observant
Slow to Trust

K-FORTUNE
```

### TYPE B --- Year

``` text
MY 2027

THE YEAR
I MOVE

LOVE        ★★★★☆
CAREER      ★★★★★
MONEY       ★★★☆☆
TRAVEL      ★★★★★

K-FORTUNE
```

### TYPE C --- Compatibility

``` text
OUR KOREAN
ASTROLOGY

YOU × ___

87%

DANGEROUSLY
COMPATIBLE

🔥 92
💬 76
🌙 89
```

하단에 작은 서비스 로고 및 URL/QR.

------------------------------------------------------------------------

## 20. Social First Design

모든 핵심 화면을 만들 때 다음 질문을 한다.

> **"이 화면을 사용자가 Instagram Story에 올리고 싶은가?"**

따라서 결과 화면은 기본적으로 **9:16 Capture Safe Area**를 고려한다.

공유 시 UI Navigation / CTA를 제거하고 콘텐츠만 Export한다.

------------------------------------------------------------------------

## 21. Navigation

MVP에서는 복잡한 메뉴를 만들지 않는다.

Bottom Navigation:

-   **HOME** --- 오늘의 운세 / 개인 콘텐츠
-   **CHART** --- Four Pillars / Elements
-   **MATCH** --- Friend / Celebrity Compatibility
-   **ASK** --- AI Fortune Chat
-   **ME** --- Birth Info / Settings / Premium

5개 이하 유지.

------------------------------------------------------------------------

## 22. Micro Interaction

서비스가 신비롭게 느껴지는 핵심 요소.

과하게 화려한 Animation보다 **작고 느린 움직임**을 사용한다.

예:

-   Element 주변 Glow
-   별이 천천히 움직임
-   Card를 누르면 Light Ripple
-   AI 답변 생성 시 별 하나가 움직임
-   Compatibility 계산 시 두 Orbit가 합쳐짐
-   Four Pillars 계산 시 8개 Star → 4 Pillars

전체 Animation 속도는 일반 앱보다 약간 느리게 한다.

단, 결과를 기다리게 만드는 수준은 피한다.

------------------------------------------------------------------------

## 23. Paywall Design

공포심을 이용하지 않는다.

### 피해야 할 예

> Something BIG is coming to your love life.\
> Unlock now.

### 권장 예

### THERE'S MORE IN YOUR CHART

You've discovered your core energy.

Unlock:

💘 Full Love Profile\
💼 Career Pattern\
📅 Monthly Fortune\
✨ 10-Year Luck Cycle\
💬 Unlimited AI Reading

CTA:

**Unlock My Full Chart**

Secondary:

**Maybe Later**

------------------------------------------------------------------------

## 24. 디자인 시스템

Figma Component 기준 최소 구성.

### Foundations

-   Colors
-   Typography
-   Spacing
-   Radius
-   Shadow
-   Glow
-   Icons

### Components

-   Button
-   Input
-   Date Picker
-   Time Picker
-   Chip
-   Fortune Card
-   Element Card
-   Celebrity Card
-   Compatibility Score
-   Bottom Sheet
-   Modal
-   Navigation
-   AI Message
-   Paywall Card
-   Share Card

### States

-   Default
-   Pressed
-   Selected
-   Loading
-   Locked
-   Premium
-   Error

------------------------------------------------------------------------

## 25. 접근성

신비로운 분위기를 위해 가독성을 희생하지 않는다.

본문 Font Size 최소 16px 권장.

Dark Background 대비 WCAG 기준 고려.

Element를 색깔만으로 구분하지 않는다.

색상 + Symbol을 함께 사용한다.

예:

🔥 Fire\
💧 Water\
🌿 Wood

Animation Reduce 옵션을 지원한다.

------------------------------------------------------------------------

## 26. MVP 디자인 화면

초기 Figma에서는 다음 화면부터 제작한다.

  Priority   Screen
  ---------- ----------------
  P0         Landing
  P0         Birth Date
  P0         Birth Time
  P0         Birth Place
  P0         Calculating
  P0         Element Reveal
  P0         Personality
  P0         Four Pillars
  P0         Year Ahead
  P0         AI Chat
  P0         K-pop Match
  P0         Share Card
  P1         Home
  P1         Love Profile
  P1         Paywall
  P2         Compatibility
  P2         Daily Fortune

MVP 디자인은 약 **12개 핵심 화면**을 먼저 완성한다.

------------------------------------------------------------------------

## 27. Figma Prototype 핵심 Flow

### Flow A --- First User

Landing\
→ Birth Info\
→ Calculation\
→ Element Reveal\
→ Personality\
→ Year Ahead\
→ Ask AI

### Flow B --- Viral

TikTok / Shared Link\
→ Celebrity Match\
→ "Find Yours"\
→ Birth Info\
→ Result\
→ Share

### Flow C --- Monetization

Free Result\
→ Love Profile Preview\
→ Locked Insight\
→ Paywall\
→ Premium Result

이 세 Flow가 디자인 검증의 핵심이다.

------------------------------------------------------------------------

## 28. 최종 디자인 방향

K-Fortune은 **"한국 점술 앱을 영어로 번역한 서비스"처럼 보여서는 안
된다.**

사용자가 처음 접했을 때는 새로운 Astrology App처럼 보여야 한다.

사용하다 보면:

> "Wait... this is Korean?"

이라는 발견이 생기고,

결과를 본 뒤에는:

> "I'm Yin Metal."

이라는 새로운 Identity를 얻게 한다.

최종적으로 디자인이 만들어야 하는 경험은 다음과 같다.

**Curiosity**

"What is Korean Astrology?"

↓

**Discovery**

"I'm Yin Metal."

↓

**Recognition**

"This is weirdly accurate."

↓

**Exploration**

"What does it say about my love life?"

↓

**Connection**

"Which idol has the same Element?"

↓

**Sharing**

"You need to try this."

------------------------------------------------------------------------

# Design Principle

> **Don't design a fortune-telling app.\
> Design a new identity people want to share.**
