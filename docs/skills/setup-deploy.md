---
title: /gstack-setup-deploy
category: 배포
version: v1.0.0
generated: manual
---

# /gstack-setup-deploy

> 배포 플랫폼을 자동 감지하고 배포 설정을 CLAUDE.md에 기록하는 원클릭 배포 설정 스킬

## 무엇을 하는 스킬인가

`/gstack-setup-deploy`는 `/gstack-land-and-deploy` 스킬이 사용할 배포 설정을 구성하는 스킬입니다. 프로젝트의 배포 환경을 자동으로 감지하고, 필요한 설정을 CLAUDE.md에 기록합니다.

Fly.io, Render, Vercel, Netlify, Heroku 등 주요 배포 플랫폼을 자동으로 인식합니다. 설정 파일(fly.toml, vercel.json, render.yaml 등)이나 프로젝트 구조를 분석해서 어떤 플랫폼을 사용하는지 판별하고, 프로덕션 URL, 헬스 체크 엔드포인트, 배포 상태 확인 명령어를 자동으로 설정합니다.

한 번 설정하면 이후 `/gstack-ship`이나 `/gstack-land-and-deploy`를 실행할 때 별도 설정 없이 바로 배포가 진행됩니다. 프로젝트 초기에 한 번만 실행하면 됩니다.

## 언제 쓰나

- 새 프로젝트에서 처음 배포 파이프라인을 구성할 때
- `/gstack-ship` 또는 `/gstack-land-and-deploy` 실행 전 배포 설정이 필요할 때
- 배포 플랫폼을 변경한 후 설정을 업데이트해야 할 때
- 프로덕션 URL이나 헬스 체크 엔드포인트가 바뀌었을 때
- 팀원이 클론한 프로젝트에서 배포 환경을 빠르게 설정하고 싶을 때

## 어떻게 시작하나

`/gstack-setup-deploy`를 입력하면 프로젝트 구조와 설정 파일을 분석해 배포 플랫폼을 자동 감지합니다. 감지된 정보를 확인한 뒤, 필요시 수정하면 CLAUDE.md에 배포 설정이 기록됩니다.

## 실제 사용 예시

Next.js 프로젝트를 Vercel에 배포하고 있습니다. `/gstack-setup-deploy`를 실행하니 vercel.json과 package.json을 분석해서 Vercel 플랫폼을 자동 감지합니다. 프로덕션 URL `https://myapp.vercel.app`, 헬스 체크 엔드포인트 `/api/health`가 설정되고 CLAUDE.md에 기록됩니다. 이제 `/gstack-ship`을 실행하면 PR 생성부터 배포, 헬스 체크까지 한 번에 진행됩니다.

## 관련 스킬

- [/gstack-land-and-deploy](/skills/land-and-deploy) -- 설정된 배포 환경으로 PR 머지 및 배포
- [/gstack-ship](/skills/ship) -- PR 생성부터 배포까지 전체 출시 워크플로우
