---
title: /gstack-ship
category: 배포
version: 1.0.0
generated: manual
---

# /gstack-ship

> 베이스 브랜치 머지, 테스트, 버전 범프, CHANGELOG 업데이트, PR 생성까지 배포 워크플로우 전체를 자동화.

## 무엇을 하는 스킬인가

"배포"는 코드를 push하는 것 이상입니다. 베이스 브랜치와 충돌 없는지 확인하고, 테스트가 통과하는지 보고, 버전을 올리고, 변경 사항을 CHANGELOG에 기록하고, PR을 만들어야 합니다. 이걸 수동으로 하다 보면 빠뜨리는 단계가 생깁니다.

`/gstack-ship`은 이 전체 과정을 순서대로 실행합니다. 각 단계에서 이슈가 발견되면 멈추고 물어봅니다 — 블라인드로 진행하지 않습니다. 테스트 실패, 머지 충돌, 열려 있는 TODO 같은 것들이 PR 만들기 전에 걸립니다.

PR 생성 직전에는 `/gstack-review`와 동일한 전문가 스페셜리스트 군단(testing, maintainability, security, performance, data-migration, api-contract, design, red-team)이 full 리뷰를 수행합니다.

**재실행 동작** — `/gstack-ship`을 다시 실행하면 테스트, 커버리지 감사, 리뷰, 적대적 검토, TODO 확인, document-release 등 모든 검증 단계를 처음부터 다시 실행합니다. push, PR 생성, VERSION 범프 같은 동작(action)만 멱등성이 보장됩니다. "다시 실행 = 체크리스트 전체 재실행"으로 이해하면 됩니다.

이전 `/gstack-review`나 `/gstack-ship`에서 이미 스킵한 이슈는 관련 코드가 변경되지 않은 한 재실행 시에도 자동 억제됩니다.

## 언제 쓰나

- 기능 개발이 끝나고 PR을 만들어야 할 때
- "배포 준비가 됐는지" 체크리스트가 필요할 때
- 베이스 브랜치가 앞서 있어서 머지가 필요할 때
- VERSION 파일이나 package.json 버전을 올려야 할 때
- CHANGELOG를 자동으로 업데이트하고 싶을 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-ship
```

현재 브랜치 상태를 확인하고 배포 준비 여부를 단계별로 검토합니다. main이나 master 브랜치에서 직접 실행하면 경고가 나옵니다.

## 실제 사용 예시

로그인 기능을 추가하고 `/gstack-ship`을 실행했다. 자동으로 main을 머지하고, 테스트를 돌리고, VERSION을 1.2.0에서 1.3.0으로 올리고, CHANGELOG에 "feat: add login functionality"를 추가했다. 마지막으로 PR을 만들었는데 — 타이틀, description, 리뷰어 요청까지 자동으로 채워졌다. 수동으로 했으면 15분 걸릴 작업이 3분 안에 끝났다.

## 관련 스킬

- [/gstack-qa](/skills/qa) — ship 전에 버그가 없는지 확인할 때
- [/gstack-review](/skills/review) — PR 만들기 전 마지막 코드 리뷰
- [/gstack-investigate](/skills/investigate) — 배포 중 예상치 못한 에러가 발생했을 때
