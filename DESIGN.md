# DESIGN.md — gstack-guide

> 디자인 시스템 레퍼런스. 시각적 변경 시 이 문서를 함께 업데이트하세요.
> 방향성: 깔끔하고 실용적. 정보 밀도 높게, 빠른 스캔. 한국어 개발자 레퍼런스.

---

## 비전

gstack-guide는 AI/바이브 코딩 워크플로우를 쓰는 **한국어 개발자를 위한 스킬 조회 도구**입니다. 독자는 이미 원하는 게 있습니다. 맞는 커맨드, 맞는 워크플로우를 빠르게 찾는 게 전부입니다. 디자인은 그 흐름을 방해하지 않아야 합니다.

참고: Linear docs, Tailwind docs. 마케팅 사이트가 아닙니다. 포트폴리오도 아닙니다. 도구입니다.

---

## 브랜드

### 액센트 컬러

오렌지-앰버 — gstack 브랜드 컬러. VitePress 기본 파란색을 대체합니다.

```
라이트 모드:
  --vp-c-brand-1: #e07b39   (주색 — 링크, 활성 상태)
  --vp-c-brand-2: #c96b29   (호버)
  --vp-c-brand-3: #f09050   (소프트 액센트)
  --vp-c-brand-soft: rgba(224, 123, 57, 0.14)

다크 모드:
  --vp-c-brand-1: #f09050   (어두운 배경 대비를 위해 밝게)
  --vp-c-brand-2: #e07b39
  --vp-c-brand-3: #c96b29
  --vp-c-brand-soft: rgba(240, 144, 80, 0.16)
```

적용 파일: `docs/.vitepress/theme/custom.css`

### 로고 / 파비콘

- 파일: `docs/public/favicon.svg`
- 디자인: 오렌지-앰버(`#e07b39`) 라운드 사각형 + 흰색 "g" 레터마크 (32×32)
- 형식: SVG (모든 해상도에서 선명하게 렌더링)

---

## 타이포그래피

### 폰트 스택

VitePress 기본값:
```
--vp-font-family-base: "Inter var", Inter, ui-sans-serif, system-ui,
  -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue",
  Arial, "Noto Sans", sans-serif
```

한국어 폴백: Apple SD Gothic Neo (macOS), Malgun Gothic (Windows), Noto Sans KR (Linux/Android). 현재로선 충분합니다.

**향후 업그레이드:** 모든 OS에서 일관된 한국어 렌더링을 원할 때 [Pretendard](https://github.com/orioncactus/pretendard)를 추가하세요. CSS `@font-face` 또는 CDN으로 로드하고 `--vp-font-family-base` 맨 앞에 추가합니다.

### 한국어 텍스트 규칙

두 가지 CSS 규칙이 전역 적용되어 있습니다 (`docs/.vitepress/theme/custom.css`):

```css
word-break: keep-all;      /* 한국어 음절 중간에서 줄바꿈 금지 */
overflow-wrap: break-word; /* 단, 긴 URL/문자열은 줄바꿈 허용 */
```

적용 범위: `.vp-doc p`, `.vp-doc li`, `.vp-doc h1-h3`, `.VPHero` 요소들, `.name.clip`, `span.text`

**규칙:** 사용자에게 노출되는 모든 문구는 한국어 우선. 스킬 이름은 `/gstack-name` 형식으로 코드 인라인 처리. PR, QA, deploy 같은 기술 용어는 영문 그대로 사용 가능.

### 타입 스케일

VitePress 기본값을 따릅니다. 실제 가독성 문제가 없으면 폰트 크기를 오버라이드하지 마세요.

```
사이드바 레이블:  14px, font-weight: 500
본문:            16px, line-height: 1.7 (한국어는 행간이 넓을수록 가독성 ↑)
H2 섹션 제목:    24px, font-weight: 600
H3 소제목:       20px, font-weight: 600
인라인 코드:      14px, monospace
```

---

## 레이아웃 & 내비게이션

### 사이드바 구조

7개 카테고리. 펼침/접힘 동작:

```
시작하기          → 항상 표시 (2개 항목)
기획              → collapsed: false (4개)
코드 품질         → collapsed: false (7개)
배포              → collapsed: false (4개)
디버깅            → collapsed: false (1개)
디자인            → collapsed: false (5개)
개발 도구         → collapsed: true  (9개 — 보조 도구)
문서/학습         → collapsed: true  (3개 — 보조)
```

**규칙:** 주요 워크플로우 5개 카테고리는 항상 열어두세요. 유틸리티 카테고리는 접어두세요. 스킬이 더 늘어나면 사이드바를 더 늘리는 것보다 `/all-skills` 같은 빠른 검색 페이지를 만드는 게 낫습니다.

### 상단 내비게이션

최대 3개. 현재: `홈 / Quick Start / 워크플로우`.

개별 스킬이 아닌 섹션 수준의 진입점에만 새 항목을 추가하세요.

### 검색

VitePress 로컬 검색 활성화. 한국어 동작 확인됨. 외부 의존성 없음.

---

## 스킬 페이지 구조

모든 스킬 페이지는 이 순서를 따릅니다:

```markdown
# /gstack-[name]

> 한 줄 설명: 이 스킬이 무엇을 하는지 평범한 말로.

## 언제 쓰나

이 스킬이 필요한 상황 목록.

## 주요 기능

무엇을 하는지. 번호 또는 bullet.

## 사용 예시

구체적인 시나리오 하나. 커맨드나 출력 결과를 보여주세요.

## 관련 스킬

관련 스킬 1-3개 링크.
```

**규칙:** 스킬 페이지는 ~150줄을 넘지 마세요. 넘는다면 스크롤을 늘리는 게 아니라 내용을 줄여야 합니다.

---

## 홈페이지 (index.md)

### Hero 섹션

- 이름: "gstack guide"
- 텍스트: 한 줄 설명
- 태그라인: 부가 설명
- 액션 버튼: Quick Start + 워크플로우 (최대 2개)

### 피처 카드

현재 3개 카드 (기획, 코드 품질, 배포). 최대 3열을 유지하세요.

### 스킬 목록 (보류 — FINDING-004)

현재 스킬 인덱스 섹션에 설명 없이 링크 33개만 나열되어 있습니다. 가장 큰 스캔 가능성 문제입니다. 개선 시:
- 스킬마다 한 줄 한국어 설명 추가
- 시각적 구분선이나 테이블 레이아웃 검토
- 참고: Tailwind docs의 유틸리티 목록 방식 — 이름 + 한 줄 설명

---

## 컬러 사용 규칙

| 상황 | 토큰 | 사용 여부 |
|------|------|----------|
| 링크, 활성 사이드바 항목 | `--vp-c-brand-1` | 사용 |
| 호버 상태 | `--vp-c-brand-2` | 사용 |
| 팁/정보 콜아웃 배경 | `--vp-c-brand-soft` | 사용 |
| 경고, 위험 콜아웃 | VitePress 기본값 | 오버라이드 금지 |
| 본문 텍스트 | VitePress 기본값 | 오버라이드 금지 |

**규칙:** 오렌지는 액센트 컬러입니다. 배경이나 넓은 면에 채우지 마세요.

---

## 다크 모드

VitePress가 자동으로 처리합니다. 커스텀 CSS 다크 블록:

```css
.dark {
  --vp-c-brand-1: #f09050;
  --vp-c-brand-2: #e07b39;
  --vp-c-brand-3: #c96b29;
  --vp-c-brand-soft: rgba(240, 144, 80, 0.16);
}
```

다크 모드에서는 어두운 배경 대비를 위해 밝은 값(`#f09050`)을 씁니다. 컬러 변경 시 두 모드 모두 확인하세요.

---

## 코드 블록 & 인라인 코드

- 스킬 이름은 항상 인라인 코드로: `` `/gstack-ship` ``
- CLI 커맨드는 항상 `bash` 코드 블록으로
- 설정 예시: 상황에 맞게 `json` 또는 `ts`
- 코드 예시는 짧게 유지하세요. 독자는 커맨드를 찾는 것이지 튜토리얼을 읽는 게 아닙니다.

---

## 보류 중인 디자인 작업

`/gstack-design-review` 감사 결과 추적:

| Finding | 내용 | 우선순위 |
|---------|------|---------|
| ~~FINDING-003~~ | ~~Inter 라틴 폰트 프리로드 제거~~ | ✅ 완료 |
| ~~FINDING-004~~ | ~~홈페이지 스킬 목록 가독성: 스킬 33개에 설명 추가~~ | ✅ 완료 |
| ~~FINDING-005~~ | ~~커스텀 파비콘: gstack 브랜드 마크~~ | ✅ 완료 |
| — | 모든 OS에서 일관된 한국어 렌더링을 위한 Pretendard 폰트 도입 | 향후 |

---

## 하지 말 것

- 장식용 일러스트나 히어로 이미지 추가 금지. 레퍼런스 도구입니다.
- 커스텀 자바스크립트 애니메이션 추가 금지. 속도가 중요합니다.
- 넓은 배경 면에 오렌지 채우기 금지.
- 실제 가독성 문제가 없으면 VitePress 폰트 크기 오버라이드 금지.
- 불필요한 상단 내비게이션 항목 추가 금지. 사이드바가 내비게이션입니다.
- 스킬 페이지를 ~150줄 이상 늘리지 마세요.
