---
title: /gstack-land-and-deploy
category: 배포
version: 1.0.0
generated: manual
---

# /gstack-land-and-deploy

> PR 머지부터 프로덕션 검증까지, /ship 이후의 모든 배포 과정을 자동으로 처리.

## 무엇을 하는 스킬인가

`/gstack-ship`이 PR을 만들어줬다면, `/gstack-land-and-deploy`는 그 다음 단계를 맡습니다. PR을 머지하고, CI가 끝날 때까지 기다리고, 실제 프로덕션에 배포된 후 건강 상태를 확인합니다.

배포 후 카나리 체크를 자동으로 실행합니다. 콘솔 에러, 성능 저하, 페이지 깨짐을 감지합니다. 문제가 발견되면 즉시 알려줍니다.

## 언제 쓰나

- `/gstack-ship`으로 PR을 만든 후 머지하고 배포할 때
- CI가 끝나길 기다리면서 다른 일을 하고 싶을 때
- 배포 후 프로덕션이 정상인지 자동으로 확인하고 싶을 때
- 수동으로 머지 → 배포 확인 → 모니터링하는 과정이 번거로울 때

## 어떻게 시작하나

```
/gstack-land-and-deploy
```

먼저 `/gstack-setup-deploy`로 배포 설정이 돼 있어야 합니다. 실행하면 PR을 머지하고 배포를 기다립니다.

## 실제 사용 예시

새 기능 PR이 리뷰를 통과했다. `/gstack-land-and-deploy`를 실행하자 PR을 머지하고, GitHub Actions CI가 통과하길 기다린 후, Vercel 배포 완료를 감지했다. 프로덕션 URL에 접속해서 주요 페이지 3개를 확인하고 "배포 완료, 이상 없음" 리포트를 출력했다. 총 4분.

## 관련 스킬

- [/gstack-ship](/skills/ship) — PR 생성 단계 (land-and-deploy 전에 실행)
- [/gstack-canary](/skills/canary) — 배포 후 장기간 모니터링
- [/gstack-setup-deploy](/skills/setup-deploy) — 배포 플랫폼 설정
