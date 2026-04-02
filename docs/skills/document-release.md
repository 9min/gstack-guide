---
title: /gstack-document-release
category: 문서/학습
version: v1.0.0
generated: manual
---

# /gstack-document-release

> 배포 후 프로젝트 문서 전체를 diff와 대조해서 최신 상태로 업데이트하는 스킬.

## 무엇을 하는 스킬인가

document-release는 코드를 배포한 직후에 실행하는 문서 업데이트 스킬입니다. 프로젝트의 모든 문서 파일을 읽고, 실제 변경된 코드(diff)와 교차 대조해서 문서가 코드와 일치하도록 갱신합니다.

README, ARCHITECTURE, CONTRIBUTING, CLAUDE.md 같은 주요 문서를 자동으로 찾아서 변경 사항을 반영합니다. CHANGELOG의 문체를 다듬고, 완료된 TODO 항목을 정리하며, 필요하면 VERSION 파일도 갱신합니다.

코드는 바꿨는데 문서는 안 고치는 문제를 구조적으로 해결합니다. 특히 빠르게 반복하는 프로젝트에서 문서가 코드보다 한두 버전 뒤처지는 상황을 방지하는 데 효과적입니다.

## 언제 쓰나

- 기능을 배포한 직후 문서를 최신 상태로 맞추고 싶을 때
- README에 적힌 API 설명이 실제 코드와 다를 수 있다고 느낄 때
- CHANGELOG를 깔끔하게 정리하고 싶을 때
- CONTRIBUTING 가이드가 현재 개발 프로세스와 맞는지 확인하고 싶을 때
- TODO 목록에서 이미 완료된 항목을 정리하고 싶을 때
- 릴리스 사이클의 마지막 단계로 문서 점검을 자동화하고 싶을 때

## 어떻게 시작하나

`/document-release`를 입력하면 스킬이 프로젝트 문서 파일들을 스캔하고, 최근 diff와 비교를 시작합니다. 문서별로 어떤 부분이 업데이트되어야 하는지 보여주며, 확인 후 일괄 반영합니다.

## 실제 사용 예시

API 서버에 인증 방식을 JWT에서 세션 기반으로 전환한 뒤 `/document-release`를 실행했습니다. 스킬이 README의 "인증" 섹션에서 JWT 관련 설명을 발견하고 세션 기반으로 수정했습니다. ARCHITECTURE.md의 인증 플로우 다이어그램 설명도 갱신되었고, CHANGELOG에 변경 내역이 일관된 문체로 추가되었습니다. TODO.md에서 "세션 인증으로 마이그레이션" 항목이 완료 처리되었고, CONTRIBUTING.md의 로컬 개발 환경 설정 안내에서 JWT 시크릿 대신 세션 설정 방법이 반영되었습니다.

## 관련 스킬

- [/gstack-ship](/skills/ship) -- PR 생성과 배포까지의 워크플로우
- [/gstack-land-and-deploy](/skills/land-and-deploy) -- PR 머지 후 배포와 프로덕션 검증
