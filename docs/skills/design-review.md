---
title: /gstack-design-review
category: 디자인
version: 2.0.0
generated: manual
---

# /gstack-design-review

> 디자이너 시각으로 시각적 일관성, 간격, 계층 구조, AI 슬롭 패턴을 찾아서 수정하는 비주얼 QA.

## 무엇을 하는 스킬인가

기능은 동작하는데 왠지 "대충 만든 것처럼 보인다"는 느낌이 들 때 있습니다. `/gstack-design-review`는 스크린샷을 찍고 디자이너 눈으로 봅니다.

찾는 것들: 간격 불일관성(버튼 padding이 페이지마다 다름), 타이포그래피 계층 문제(h2가 h3보다 작게 보임), 색상 대비 부족, "AI 슬롭 패턴"(아무 의미 없는 3-column 카드 그리드, 채워 넣기용 아이콘들), 느린 인터랙션(hover 피드백 없음). 이슈를 발견하면 소스 코드를 직접 수정하고 before/after 스크린샷으로 검증합니다.

구현 전 디자인 리뷰는 `/gstack-plan-design-review`를 쓰세요.

## 언제 쓰나

- 기능이 다 만들어졌는데 배포 전에 시각적으로 다듬고 싶을 때
- "폰트/색/간격이 뭔가 이상한 것 같은데"라는 느낌이 들 때
- AI 코드 생성 후 자동 생성된 UI가 generic하게 보일 때
- 다크모드와 라이트모드 간 일관성을 확인할 때
- 반응형 레이아웃에서 모바일 뷰가 깨지는지 확인할 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-design-review
```

로컬 서버 URL 또는 배포된 URL을 제공하면 됩니다.

## 실제 사용 예시

랜딩 페이지를 만들고 배포 전에 `/gstack-design-review`를 돌렸다. "Hero 섹션의 CTA 버튼 padding이 상하 12px, 좌우 16px인데 다른 버튼들은 모두 12px/24px입니다"라는 이슈가 나왔다. 그리고 "기능 소개 섹션의 아이콘 3개가 각각 다른 스타일(outline, filled, duotone)을 쓰고 있습니다"도 나왔다. 두 이슈 모두 자동으로 수정됐다. Before/after 스크린샷을 보니 차이가 작지만 분명히 더 좋아 보였다.

## 관련 스킬

- [/gstack-qa](/skills/qa) — 디자인 리뷰 전에 기능적 버그를 먼저 잡을 때
- [/gstack-ship](/skills/ship) — 디자인 폴리싱 후 배포할 때
