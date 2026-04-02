---
title: /gstack-plan-ceo-review
category: 기획
version: 1.0.0
generated: manual
---

# /gstack-plan-ceo-review

> CEO/파운더 시각으로 계획의 야망과 범위를 검토하는 전략 리뷰.

## 무엇을 하는 스킬인가

계획을 짰는데 "이게 충분히 크게 생각한 건가?" 혹은 반대로 "이거 너무 과한 거 아닌가?"라는 의심이 들 때 쓰는 스킬입니다.

4가지 모드로 작동합니다. **SCOPE EXPANSION**: 10배 버전을 상상하고 범위를 키웁니다. **SELECTIVE EXPANSION**: 현재 범위는 유지하되 가치 있는 기능만 선별해서 추가합니다. **HOLD SCOPE**: 현재 범위를 최대한 엄밀하게 검토합니다. **SCOPE REDUCTION**: MVP로 줄여서 핵심만 남깁니다.

외부 시각(독립적인 Claude 서브에이전트)이 계획을 별도로 검토해서 blind spot을 찾아줍니다. 리뷰 결과는 CEO Plan 문서로 저장됩니다.

## 언제 쓰나

- `/gstack-office-hours` 이후 계획 범위를 확정해야 할 때
- "이 계획 좀 더 크게 생각해볼 여지 있나?" 싶을 때
- MVP로 줄여야 하는데 어디까지 자를지 모를 때
- 기능 목록이 너무 많아서 우선순위를 못 정할 때
- 팀원이나 투자자에게 설명하기 전 논리를 다듬고 싶을 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-plan-ceo-review
```

실행하면 현재 프로젝트의 디자인 문서나 계획을 자동으로 찾습니다. 없으면 직접 설명해달라고 합니다. 이후 4가지 모드 중 하나를 선택합니다.

## 실제 사용 예시

알림 기능을 추가하는 계획을 SELECTIVE EXPANSION 모드로 리뷰했다. "알림 종류 5개를 모두 Day 1에 만들 것인가, 아니면 push만 먼저 출시할 것인가?"라는 선택지가 나왔다. 외부 시각 에이전트가 "SMS 알림은 전화번호 수집 문제가 생긴다"는 blind spot을 짚어줬다. 최종적으로 push 알림만 MVP에 포함하기로 결정했다 — 이 결정이 CEO Plan 문서에 기록됐다.

## 관련 스킬

- [/gstack-office-hours](/skills/office-hours) — plan-ceo-review 전에 아이디어를 검증할 때
- [/gstack-plan-eng-review](/skills/plan-eng-review) — 전략 범위 확정 후 기술 구현을 검토할 때
