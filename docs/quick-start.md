# Quick Start

gstack을 처음 쓰는 경우 이 가이드를 따라 5분 안에 첫 스킬을 실행할 수 있습니다.

**필요 사항:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Bun](https://bun.sh/) v1.0+, [Node.js](https://nodejs.org/) (Windows만)

## 1. gstack 설치

Claude Code를 열고 아래 텍스트를 그대로 붙여넣으세요. Claude가 나머지를 처리합니다.

> Install gstack: run **`git clone --single-branch --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`** then add a "gstack" section to CLAUDE.md that says to use the /browse skill from gstack for all web browsing, never use mcp\_\_claude-in-chrome\_\_\* tools, and lists the available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review, /design-consultation, /design-shotgun, /design-html, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse, /open-gstack-browser, /qa, /qa-only, /design-review, /devex-review, /plan-devex-review, /setup-browser-cookies, /setup-deploy, /retro, /investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard, /unfreeze, /gstack-upgrade, /learn. Then ask the user if they also want to add gstack to the current project so teammates get it.

약 30초면 설치가 완료됩니다.

## 2. 팀원과 공유 (선택)

레포에 gstack을 추가하면 팀원이 `git clone`만으로 바로 쓸 수 있습니다.

> Add gstack to this project: run **`cp -Rf ~/.claude/skills/gstack .claude/skills/gstack && rm -rf .claude/skills/gstack/.git && cd .claude/skills/gstack && ./setup`** then add a "gstack" section to this project's CLAUDE.md that says to use the /browse skill from gstack for all web browsing, never use mcp\_\_claude-in-chrome\_\_\* tools, and lists the available skills, and tells Claude that if gstack skills aren't working, run `cd .claude/skills/gstack && ./setup` to build the binary and register skills.

## 3. 첫 스킬 실행

Claude Code를 열고 프로젝트 디렉토리에서:

```
/gstack-qa
```

사이트 URL 또는 로컬 서버 주소를 묻고, 자동으로 버그를 찾아 수정합니다.

## 4. 결과 해석하기

QA 완료 후 출력 예시:

```
=== QA 리포트 ===
Health Score: 84/100 (이전: 71)

Critical: 0 (이전: 2) ✓
High:     1 (이전: 3) ✓
Medium:   4 (이전: 6) ✓

수정 완료: 버그 4개 자동 커밋
미해결: 1개 우선순위 높음 (이미지 alt 텍스트 — 보류)
```

- **Health Score**: 0~100, 80+ 이면 ship 준비 완료
- **Critical/High**: 배포 전 반드시 수정
- **Fixed**: gstack이 자동 수정 + 커밋한 버그 수

## 5. 다음 단계

QA가 끝났다면 바로 배포할 수 있습니다:

```
/gstack-ship
```

브랜치 상태를 확인하고 PR을 만들어줍니다.

---

## 스킬 목록이 궁금하다면

[홈 화면으로 돌아가서 상황별로 찾기 →](/)

## 전체 워크플로우가 궁금하다면

[새 기능 개발 / 버그 수정 플로우 →](/workflows)
