---
title: /gstack-pair-agent
category: 개발 도구
version: 0.1.0
generated: manual
---

# /gstack-pair-agent

> 원격 AI 에이전트에 내 브라우저를 공유하는 스킬. 명령 하나로 셋업 키를 생성하고 연결합니다.

## 무엇을 하는 스킬인가

`/gstack-pair-agent`는 다른 AI 에이전트(OpenClaw, Hermes, Codex, Cursor 등)가 내 브라우저를 HTTP 요청으로 제어할 수 있도록 연결해줍니다. 실행하면 셋업 키가 생성되고, 상대 에이전트가 따라할 수 있는 연결 지침이 출력됩니다.

연결된 에이전트는 자신만의 별도 탭을 받으며, 기본적으로 read+write 접근 권한을 갖습니다. 관리자 권한은 요청 시 별도로 부여할 수 있습니다.

## 언제 쓰나

- 다른 AI 에이전트가 웹 페이지를 탐색하거나 테스트해야 할 때
- 원격 에이전트에게 브라우저 세션을 공유하고 싶을 때
- 여러 AI 에이전트가 협업해서 웹 작업을 수행해야 할 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-pair-agent
```

셋업 키가 생성되면 상대 에이전트에게 연결 지침을 전달합니다. HTTP 요청이 가능한 모든 에이전트와 연결할 수 있습니다.

## 관련 스킬

- [/gstack-browse](/skills/browse) — 헤드리스 브라우저 QA 테스트
- [/gstack-open-gstack-browser](/skills/open-gstack-browser) — 실제 화면에 브라우저를 띄워서 제어
