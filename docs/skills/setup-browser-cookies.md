---
title: /gstack-setup-browser-cookies
category: 개발 도구
version: v1.0.0
generated: manual
---

# /gstack-setup-browser-cookies

> 실제 브라우저의 쿠키를 헤드리스 세션으로 가져와 로그인된 상태로 QA 테스트하는 설정 스킬

## 무엇을 하는 스킬인가

`/gstack-setup-browser-cookies`는 로컬 Chromium 기반 브라우저(Chrome, Edge, Brave 등)에 저장된 쿠키를 gstack의 헤드리스 브라우저 세션으로 가져오는 스킬입니다. 인증이 필요한 페이지를 QA 테스트할 때 필수적입니다.

실행하면 인터랙티브 도메인 선택 화면이 나타납니다. 브라우저에 저장된 쿠키 도메인 목록에서 필요한 것들을 골라 가져올 수 있습니다. 예를 들어 개발 중인 앱의 도메인 쿠키만 선택적으로 가져오면, 헤드리스 브라우저가 로그인된 상태로 동작합니다.

한 번 설정하면 해당 세션 동안 `/gstack-qa`, `/gstack-browse` 등 브라우저를 사용하는 모든 스킬에서 인증 상태가 유지됩니다. 매번 로그인 과정을 자동화하는 것보다 훨씬 안정적이고 빠릅니다.

## 언제 쓰나

- 로그인이 필요한 대시보드나 관리자 페이지를 QA 테스트하기 전에
- OAuth/SSO 인증을 거쳐야 접근 가능한 페이지를 테스트할 때
- 다양한 사용자 역할(admin, user, guest)로 테스트하고 싶을 때
- 2FA가 설정된 서비스를 헤드리스 브라우저로 접근해야 할 때
- `/gstack-qa` 또는 `/gstack-browse` 실행 전 인증 상태를 준비할 때

## 어떻게 시작하나

`/gstack-setup-browser-cookies`를 입력하면 로컬 브라우저에서 쿠키 도메인 목록을 읽어와 인터랙티브 선택 화면을 표시합니다. 필요한 도메인을 선택하면 쿠키가 헤드리스 세션에 주입됩니다.

## 실제 사용 예시

사내 어드민 대시보드의 QA 테스트를 해야 합니다. 이 대시보드는 Google OAuth로 로그인해야 접근 가능합니다. `/gstack-setup-browser-cookies`를 실행하고 도메인 선택 화면에서 `admin.myapp.com`과 `accounts.google.com` 쿠키를 선택합니다. 이제 `/gstack-qa-only`를 실행하면 로그인된 상태로 대시보드의 모든 페이지를 순회하며 테스트할 수 있습니다.

## 관련 스킬

- [/gstack-qa-only](/skills/qa-only) -- 쿠키 설정 후 실행하는 리포트 전용 QA
- [/gstack-qa](/skills/qa) -- 쿠키 설정 후 실행하는 전체 QA 루프
- [/gstack-browse](/skills/browse) -- 헤드리스 브라우저로 직접 사이트 탐색
