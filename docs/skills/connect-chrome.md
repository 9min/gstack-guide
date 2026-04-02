---
title: /gstack-connect-chrome
category: 개발 도구
version: v1.0.0
generated: manual
---

# /gstack-connect-chrome

> 한 번의 명령으로 실제 Chrome 브라우저를 gstack에 연결하고, Side Panel에서 모든 동작을 실시간으로 확인하는 스킬.

## 무엇을 하는 스킬인가

connect-chrome은 실제 Chrome 브라우저를 실행하여 gstack이 직접 제어할 수 있게 연결합니다. 헤드리스가 아닌 눈에 보이는 Chrome 창이 열리기 때문에, AI가 수행하는 모든 브라우저 동작을 실시간으로 지켜볼 수 있습니다.

Side Panel 확장 프로그램이 자동으로 로드되어, 현재 실행 중인 동작의 피드를 실시간으로 보여줍니다. 어떤 요소를 클릭했는지, 어떤 페이지로 이동했는지, 무엇을 입력했는지 모든 활동이 Side Panel에 기록됩니다.

헤드리스 브라우저로는 확인하기 어려운 시각적 동작 — 애니메이션, 호버 이펙트, 드래그 앤 드롭 등 — 을 직접 눈으로 보면서 검증할 수 있습니다. 디버깅할 때 "AI가 지금 뭘 하고 있는 거지?"라는 의문을 해소해줍니다.

## 언제 쓰나

- AI의 브라우저 동작을 눈으로 직접 확인하면서 디버깅하고 싶을 때
- 헤드리스 환경에서 재현되지 않는 버그를 실제 Chrome으로 테스트할 때
- 복잡한 사용자 인터랙션(드래그, 호버, 스크롤)을 테스트할 때
- Chrome DevTools를 함께 사용하면서 디버깅할 때
- QA 과정을 녹화하거나 시연해야 할 때

## 어떻게 시작하나

`/gstack-connect-chrome`을 입력하면 Chrome이 실행되고 Side Panel 확장 프로그램이 자동으로 로드됩니다. 연결이 완료되면 바로 URL 탐색, 요소 상호작용 등의 명령을 내릴 수 있습니다. 모든 동작은 Chrome 창과 Side Panel에서 실시간으로 확인됩니다.

## 실제 사용 예시

드래그 앤 드롭 기반의 칸반 보드를 구현했는데, 헤드리스 브라우저 테스트에서는 정상인데 실제로 써보면 카드가 잘못된 컬럼에 놓이는 문제가 있었습니다. `/gstack-connect-chrome`으로 실제 Chrome을 연결하고 드래그 동작을 실행했습니다. Side Panel에서 동작 로그를 보면서 동시에 Chrome 창에서 카드 이동을 지켜보니, 드롭 이벤트의 좌표 계산이 스크롤 오프셋을 고려하지 않는 것이 원인이었습니다. 실제 브라우저에서만 재현되는 문제를 정확히 잡았습니다.

## 관련 스킬

- [/gstack-browse](/skills/browse) — 빠른 헤드리스 브라우저 테스트가 필요할 때
- [/gstack-benchmark](/skills/benchmark) — Chrome 환경에서 성능을 측정할 때
- [/gstack-canary](/skills/canary) — 배포 후 라이브 사이트를 모니터링할 때
