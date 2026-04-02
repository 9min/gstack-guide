---
title: /gstack-office-hours
category: 기획
version: 2.0.0
generated: manual
---

# /gstack-office-hours

> 아이디어를 실제로 만들 가치가 있는지 판단해주는 YC 스타일 오피스아워.

## 무엇을 하는 스킬인가

아이디어가 있을 때 바로 만들기 시작하면 안 됩니다. "이게 진짜 문제인가?", "누가 쓸까?", "왜 지금 이걸 만드나?" — 이 질문에 답하지 못하면 잘못된 것을 아무리 잘 만들어봤자 소용 없습니다.

`/gstack-office-hours`는 두 가지 모드로 작동합니다. **Startup 모드**는 YC 파트너 스타일의 6가지 강제 질문으로 수요 현실, 현재 대안, "절박한 구체성", 가장 좁은 진입점을 파고듭니다. **Builder 모드**는 사이드 프로젝트나 오픈소스를 위한 디자인 씽킹 브레인스토밍입니다.

세션이 끝나면 디자인 문서(`~/.gstack/projects/{프로젝트}/`에 저장)가 자동으로 생성됩니다. 이 문서가 `/gstack-plan-ceo-review`, `/gstack-plan-eng-review`의 입력값이 됩니다.

## 언제 쓰나

- "이 기능 만들까 말까?" 결정이 필요할 때
- 아이디어가 있는데 어디서 시작해야 할지 모를 때
- 새 프로젝트를 시작하기 전 사용자와 문제를 명확히 정의하고 싶을 때
- 기존 계획이 "뭔가 방향이 안 맞는 것 같다"는 느낌이 들 때
- 해커톤이나 사이드 프로젝트에서 빠르게 방향을 잡을 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-office-hours
```

실행하면 먼저 목표(Startup 모드 vs Builder 모드)를 묻고, 이어서 아이디어를 설명해달라고 합니다. 이후 6가지 질문을 하나씩 물어봅니다 — 직접 답하면 됩니다.

## 실제 사용 예시

"AI 코드 리뷰 툴을 만들고 싶다"고 입력했다. `/gstack-office-hours`를 실행하자 "지금 어떻게 코드 리뷰하고 있나요?"라고 물었다. "PR에 댓글 달고 있다"고 답했더니 "그 방법의 가장 느린 부분이 뭔가요?"라고 추가로 팠다. 30분 후 나온 디자인 문서에는 진짜 Pain Point(리뷰어가 컨텍스트 파악하는 데 걸리는 시간)와 MVP 범위(diff만 보여주는 CLI)가 명확히 정리돼 있었다.

## 관련 스킬

- [/gstack-plan-ceo-review](/skills/plan-ceo-review) — office-hours 이후 전략 범위와 우선순위를 결정할 때
- [/gstack-plan-eng-review](/skills/plan-eng-review) — 기술 구현 계획을 확정할 때
- [/gstack-plan-design-review](/skills/design-review) — UI/UX 방향을 검토할 때
