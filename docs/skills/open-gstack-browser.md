---
title: /gstack-open-gstack-browser
category: 개발 도구
version: 0.2.0
generated: manual
---

# /gstack-open-gstack-browser

> 사이드바 익스텐션이 내장된 AI 제어 Chromium 브라우저를 실제로 화면에 띄우는 스킬.

## 무엇을 하는 스킬인가

`/gstack-browse`가 헤드리스(보이지 않는) 브라우저라면, `/gstack-open-gstack-browser`는 화면에 실제로 창이 뜨는 브라우저입니다.

GStack Browser는 AI가 제어하는 Chromium 인스턴스입니다. 브라우저 창이 열리면 모든 동작을 실시간으로 볼 수 있습니다. 클릭 위치, 스크롤, 폼 입력, 페이지 이동 — 사람이 직접 쓰는 것처럼 화면에 표시됩니다.

사이드바에는 라이브 액티비티 피드와 채팅이 있어서 AI가 무엇을 하고 있는지, 왜 그 동작을 선택했는지 실시간으로 확인할 수 있습니다.

봇 탐지 차단(Anti-bot stealth)이 내장되어 있어서 Cloudflare, reCAPTCHA 등 봇 방지 시스템이 있는 사이트도 테스트할 수 있습니다. 로그인이 필요한 페이지 테스트에는 `/gstack-setup-browser-cookies`로 실제 브라우저 쿠키를 가져와 쓸 수 있습니다.

## 언제 쓰나

- AI가 브라우저를 제어하는 과정을 직접 눈으로 보고 싶을 때
- 헤드리스 브라우저로는 우회하기 어려운 봇 방지 시스템이 있는 사이트를 테스트할 때
- 실시간 피드백을 보면서 테스트 흐름을 조정하고 싶을 때
- 복잡한 인터랙션(드래그앤드롭, 멀티스텝 플로우)을 시각적으로 확인하면서 진행할 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-open-gstack-browser
```

브라우저 창이 열리고, AI가 지시에 따라 사이트를 탐색합니다. 사이드바에서 모든 동작과 AI의 판단 근거를 실시간으로 확인할 수 있습니다.

## 실제 사용 예시

소셜 로그인 플로우를 테스트해야 했는데, 헤드리스 브라우저에서 Google OAuth가 봇 탐지에 걸렸습니다. `/gstack-open-gstack-browser`를 실행하니 실제 Chromium 창이 뜨고 봇 탐지를 우회해 OAuth 플로우 전체를 완주했습니다. 사이드바에서 각 단계의 AI 판단 근거를 확인하면서 어떤 요소가 클릭되고 어떤 응답이 왔는지 실시간으로 볼 수 있었습니다.

## 음성 입력

AquaVoice, Whisper 등 음성 입력 도구에서 다음 표현으로 실행할 수 있습니다:

- "show me the browser"
- "open gstack browser"
- "launch browser"
- "connect chrome"

## 관련 스킬

- [/gstack-browse](/skills/browse) — 빠른 헤드리스 테스트가 필요할 때 (화면 없이 ~100ms)
- [/gstack-setup-browser-cookies](/skills/setup-browser-cookies) — 로그인 상태가 필요한 페이지 테스트 전 쿠키 가져오기
- [/gstack-qa](/skills/qa) — 웹앱 전체 QA 테스트 + 자동 버그 수정
