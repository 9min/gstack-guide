---
title: /gstack-devex-review
category: 코드 품질
version: 1.0.0
generated: manual
---

# /gstack-devex-review

> 헤드리스 브라우저로 개발자 경험을 직접 테스트하고, TTHW(Time to Hello World)를 측정해 DX 스코어카드를 만드는 라이브 감사 스킬.

## 무엇을 하는 스킬인가

"문서가 명확해요"는 직접 해보지 않으면 알 수 없습니다. `/gstack-devex-review`는 실제로 브라우저를 열고, 시작 가이드를 따라가고, 오류 메시지를 스크린샷으로 찍으며 개발자 경험을 테스트합니다.

핵심 지표는 **TTHW — Time to Hello World**입니다. 문서를 처음 읽는 신규 개발자가 첫 번째 결과물을 얻기까지 걸리는 시간입니다. "3분 만에 시작"이라고 홍보하는데 실제로 8분이 걸린다면, 그게 문제입니다.

`/gstack-plan-devex-review`로 세운 DX 계획이 있다면 비교 분석이 자동으로 이루어집니다. 계획에서 목표했던 TTHW와 실제 측정값을 나란히 보여주는 **부메랑 리포트**가 나옵니다. 계획은 3분이었는데 실측은 8분이면, 어느 단계에서 막혔는지 구체적으로 짚어줍니다.

점수는 DX 스코어카드 형태로 정리됩니다. 문서 명확성, 오류 메시지 품질, CLI 도움말 텍스트, 온보딩 흐름 등 각 항목을 증거(스크린샷, 실제 오류 메시지)와 함께 평가합니다.

## 언제 쓰나

- 개발자 대상 제품(API, CLI, SDK, 라이브러리)을 배포한 뒤 실제 온보딩 경험을 확인할 때
- 문서나 시작 가이드를 업데이트한 뒤 TTHW가 개선되었는지 검증할 때
- `/gstack-plan-devex-review`로 세운 DX 계획과 현실을 비교하고 싶을 때
- "우리 문서가 충분히 좋은가?"를 데이터로 답하고 싶을 때
- 경쟁 제품 대비 온보딩 경험을 벤치마크할 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-devex-review
```

제품 유형(API, CLI, SDK, 라이브러리)과 테스트할 URL 또는 문서 경로를 알려주면 됩니다. 신규 개발자 페르소나로 온보딩 흐름을 직접 실행하고, TTHW와 DX 스코어카드를 생성합니다.

## 실제 사용 예시

Node.js SDK를 새로 출시했습니다. `/gstack-devex-review`를 실행하니 공식 문서를 열고 Quick Start를 따라가기 시작합니다. npm install 단계는 6초, 초기 설정 단계는 2분 12초, 첫 API 호출은 4분 51초에 성공했습니다. 총 TTHW: 7분 3초. 계획에서 목표했던 3분과 4분 이상 차이가 납니다.

어느 단계에서 막혔는지 확인하니 설정 파일 예시에 환경 변수 이름이 실제 코드와 달랐습니다. 수정 후 재측정: TTHW 2분 47초. 목표 달성.

## 음성 입력

AquaVoice, Whisper 등 음성 입력 도구에서 다음 표현으로 실행할 수 있습니다:

- "dx audit"
- "test the developer experience"
- "try the onboarding"
- "developer experience test"

## 관련 스킬

- [/gstack-plan-devex-review](/skills/plan-devex-review) — 코드 짜기 전, 개발자 경험을 계획 단계에서 설계할 때
- [/gstack-browse](/skills/browse) — 헤드리스 브라우저로 개별 페이지를 직접 테스트할 때
- [/gstack-qa](/skills/qa) — 사용자 대상 QA 테스트가 필요할 때
