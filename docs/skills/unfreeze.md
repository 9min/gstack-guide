---
title: /gstack-unfreeze
category: 개발 도구
version: v1.0.0
generated: manual
---

# /gstack-unfreeze

> /freeze로 잠근 편집 범위를 해제해 모든 디렉토리를 다시 편집 가능하게 만드는 스킬

## 무엇을 하는 스킬인가

`/gstack-unfreeze`는 `/gstack-freeze`로 설정한 디렉토리 편집 제한을 해제하는 스킬입니다. freeze 상태에서는 지정된 디렉토리 외부의 파일 편집이 차단되는데, unfreeze를 실행하면 이 제한이 풀려 모든 디렉토리를 다시 자유롭게 편집할 수 있습니다.

`/gstack-freeze`는 디버깅이나 특정 모듈 작업 시 실수로 관련 없는 코드를 수정하는 것을 방지하는 안전장치입니다. 하지만 작업 범위가 넓어지거나, 제한된 디렉토리 밖의 파일도 수정해야 하는 상황이 생깁니다. 이때 세션을 끝내지 않고도 편집 범위를 넓힐 수 있는 것이 unfreeze입니다.

세션을 종료하면 freeze 상태도 자동으로 해제되지만, 작업 중간에 범위를 바꾸고 싶을 때는 unfreeze가 훨씬 효율적입니다. 필요하면 unfreeze 후 다른 디렉토리로 다시 freeze를 걸 수도 있습니다.

## 언제 쓰나

- freeze된 상태에서 다른 디렉토리의 파일도 수정해야 할 때
- 디버깅이 끝나서 편집 제한을 풀고 일반 작업으로 돌아가고 싶을 때
- freeze 범위를 변경하기 위해 기존 freeze를 먼저 해제할 때
- 모듈 단위 작업을 마치고 전체 프로젝트 범위로 복귀할 때

## 어떻게 시작하나

`/gstack-unfreeze`를 입력하면 현재 설정된 freeze 경계가 즉시 해제됩니다. 별도의 확인 과정 없이 바로 모든 디렉토리가 편집 가능한 상태로 돌아갑니다.

## 실제 사용 예시

결제 모듈 버그를 수정하면서 `/gstack-freeze src/payments`로 편집 범위를 결제 디렉토리로 제한했습니다. 버그를 추적하다 보니 원인이 `src/payments`가 아니라 `src/shared/utils`의 금액 포맷팅 함수에 있다는 것을 발견합니다. `/gstack-unfreeze`로 제한을 해제하고, 유틸리티 함수를 수정한 뒤, 다시 결제 모듈에서 버그가 해결되었는지 확인합니다.

## 관련 스킬

- [/gstack-freeze](/skills/freeze) -- 특정 디렉토리로 편집 범위를 제한
- [/gstack-guard](/skills/guard) -- freeze와 destructive command 경고를 결합한 안전 모드
