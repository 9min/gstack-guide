# Changelog

gstack-guide 프로젝트의 모든 주목할 만한 변경사항을 기록합니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.0.0/)를 따릅니다.

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
