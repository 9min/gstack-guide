---
title: /gstack-plan-devex-review
category: 기획
version: 2.0.0
generated: manual
---

# /gstack-plan-devex-review

> 코딩 전, 개발자 페르소나를 탐구하고 경쟁사 TTHW를 벤치마크해서 최고의 개발자 경험을 설계하는 대화형 리뷰 스킬.

## 무엇을 하는 스킬인가

"개발자 친화적"은 막연한 목표입니다. `/gstack-plan-devex-review`는 코드를 짜기 전에, 개발자 경험을 수치로 설계합니다.

세 가지 모드로 작동합니다.

**DX EXPANSION** — 경쟁 우위를 확보할 때. 어떤 개발자 페르소나가 이 제품을 쓸지 탐구하고, 경쟁 제품의 TTHW(Time to Hello World)를 벤치마크해서 어떻게 하면 더 빠르고 매끄럽게 만들 수 있는지 설계합니다.

**DX POLISH** — 모든 접점을 완벽하게 다듬을 때. 온보딩 흐름의 각 단계를 하나씩 추적하며 마찰 지점을 찾고, "마법의 순간"(개발자가 처음 성공을 맛보는 순간)을 어디서 만들지 정합니다.

**DX TRIAGE** — 빠르게 결정적 문제만 잡을 때. 가장 심각한 DX 병목을 우선순위로 찾아내 빠르게 수정합니다.

8개 평가 패스는 빠짐없이 진행됩니다. "API 제품이 아니라서 해당 없음" 같은 이유로 패스를 건너뛸 수 없고, 해당 사항이 없는 경우에도 명시적으로 확인합니다.

20~45개의 포싱 질문이 포함된 대화형 리뷰입니다. 각 항목에 대해 수용/거부를 결정하면 기획안에 반영됩니다. 완성된 DX 계획은 나중에 `/gstack-devex-review`(라이브 감사)의 비교 기준으로 자동 사용됩니다 — 계획과 현실의 간극을 측정하는 부메랑 리포트.

## 언제 쓰나

- API, CLI, SDK, 라이브러리 등 개발자 대상 제품의 기획안이 있을 때
- TTHW 목표를 수치로 잡고 그걸 달성할 설계가 필요할 때
- `/gstack-plan-eng-review`와 함께 기술 설계를 마무리할 때
- 경쟁 제품 대비 온보딩 경험에서 차별화가 필요할 때
- 개발자 문서, 가이드, 예제 코드의 품질 기준을 세우고 싶을 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-plan-devex-review
```

제품 유형과 타겟 개발자 페르소나를 입력하면 모드를 선택하고 DX 리뷰를 시작합니다.

## 실제 사용 예시

REST API를 위한 Python SDK를 만들 계획입니다. `/gstack-plan-devex-review`를 DX EXPANSION 모드로 실행합니다. 경쟁 제품인 Stripe SDK, Twilio SDK의 TTHW를 분석해서 각각 2분 30초, 4분이라는 벤치마크가 제시됩니다. "우리 SDK의 TTHW 목표를 2분으로 잡겠습니다"라고 결정하면, 그 목표를 달성하기 위해 인증 흐름을 어떻게 단순화할지, 첫 번째 API 호출 예시를 어떻게 구성할지 구체적인 설계가 나옵니다. 기획안이 업데이트되고, 나중에 `/gstack-devex-review`로 실제 TTHW를 측정해 목표 달성 여부를 확인합니다.

## 음성 입력

AquaVoice, Whisper 등 음성 입력 도구에서 다음 표현으로 실행할 수 있습니다:

- "dx review"
- "developer experience review"
- "devex review" / "devex audit"
- "API design review"
- "onboarding review"

## 관련 스킬

- [/gstack-devex-review](/skills/devex-review) — 배포 후 실제 TTHW를 측정하는 라이브 감사
- [/gstack-plan-eng-review](/skills/plan-eng-review) — 아키텍처, 테스트, 성능 관점의 기획 리뷰
- [/gstack-plan-ceo-review](/skills/plan-ceo-review) — 전략적 범위와 우선순위 결정
- [/gstack-autoplan](/skills/autoplan) — CEO + 디자인 + 엔지니어링 + DX 리뷰를 한 번에 실행
