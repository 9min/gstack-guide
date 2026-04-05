# Changelog

gstack-guide 프로젝트의 모든 주목할 만한 변경사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 따릅니다.

## [1.0.4] - 2026-04-05

### Added

- gstack v0.15.9.0 동기화 — 3개 신규 스킬 가이드 추가: `/gstack-devex-review`, `/gstack-open-gstack-browser`, `/gstack-plan-devex-review`
- `favicon.ico` 추가 — 브라우저가 자동 요청하는 `/favicon.ico` 404 해결 (모든 페이지 콘솔 에러 제거)

### Changed

- `/gstack-cso` v2.0.0 — daily/comprehensive 두 가지 모드, 스킬 공급망 스캔, 감사 이력 트렌드 추적 추가
- `/gstack-retro` v2.0.0 — `/retro global` 명령어 추가 (Claude Code, Codex, Gemini 등 전체 AI 도구 통합 집계)
- `/gstack-browse` v1.1.0 — 관련 스킬 링크 `/gstack-connect-chrome` → `/gstack-open-gstack-browser`로 수정
- `/gstack-plan-design-review` v2.0.0 버전 업데이트
- `quick-start.md` — QA 리포트 출력 예시 한글화, 설치 프롬프트 공식 README와 동기화

### Fixed

- `config.ts` 사이드바 중복 섹션 제거 — sync 스크립트가 기존 섹션을 유지한 채 AUTO-GENERATED 섹션을 추가해 이중 렌더링 발생하던 문제 수정
- `endsWith` 오타 수정 (`endendsWith`)
- `/skills/connect-chrome` 삭제 후 재배포로 404 정상 반환

### Removed

- `/gstack-connect-chrome` 가이드 삭제 — `/gstack-open-gstack-browser`로 대체됨

## [1.0.3] - 2026-04-03

### Changed

- 10개 스킬에서 음성 입력 지원 — AquaVoice/Whisper로 "quality check", "tech review", "build the design" 등으로 바로 스킬 실행 가능 (autoplan, benchmark, codex, connect-chrome, cso, design-html, gstack-upgrade, plan-eng-review, qa, qa-only)
- design-html: 이제 목업 없이 텍스트 설명만으로도 시작 가능 — 3가지 진입 경로(목업/리뷰 컨텍스트/설명) 지원
- gstack-upgrade: 자동 업그레이드를 켜두면 다음부터는 묻지 않고 바로 최신 버전으로 (스누즈 백오프도 지원)

### Fixed

- footer 버전 표시 `v0.15.1` → `v0.15.2.1` 수정
- `pnpm run sync` 실행 시 `~/.claude/skills/gstack/VERSION`에서 읽어 footer 버전 자동 동기화 (스킬 변경 없이 gstack만 업그레이드해도 반영됨)
- `sync.js` footer 업데이트 로직 안전성 개선: 빈 VERSION 파일 및 비정상 버전 문자열 방어 처리 추가
- `quick-start.md` 버전 예시 `v0.15.1` → `v0.15.2.1`

## [1.0.2] - 2026-04-03

### Fixed

- Inter 라틴 폰트 프리로드 제거 — 한국어 사이트에서 불필요한 woff2 다운로드 없앰 (`buildEnd` 후처리로 모든 HTML에서 제거)
- 한국어 우선 시스템 폰트 스택 적용 (`--vp-font-family-base` 오버라이드)

### Added

- gstack 브랜드 파비콘 추가 (`docs/public/favicon.svg`) — 오렌지-앰버 배경 + 흰색 "g" 레터마크

## [1.0.1] - 2026-04-03

### Added

- 한국어 디자인 시스템 문서 (`DESIGN.md`) 추가 — 브랜드 컬러, 타이포그래피, 레이아웃 규칙, 스킬 페이지 구조, 컬러 사용 가이드라인, 보류 중인 디자인 작업 목록 포함

## [1.0.0] - 2026-03-01

### Added

- 최초 릴리스 — 23개 gstack 스킬 페이지, VitePress 기반 문서 사이트
- 오렌지-앰버 브랜드 컬러 적용 (`custom.css`)
- 한국어 word-break 처리 (`word-break: keep-all`)
- Mermaid 다이어그램 지원 (워크플로우 페이지)
- Vercel 배포 설정
