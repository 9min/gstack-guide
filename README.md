# gstack guide

상황별 AI 빌더 스킬 가이드. 무엇을 하고 싶은지 고르면 맞는 gstack 스킬을 안내합니다.

**사이트:** https://gstack-guide.vercel.app

## 시작하기

```bash
pnpm install
pnpm run dev
```

`http://localhost:5173`에서 로컬 미리보기.

## 스크립트

| 명령어 | 설명 |
|--------|------|
| `pnpm run dev` | 로컬 개발 서버 |
| `pnpm run build` | 프로덕션 빌드 |
| `pnpm run preview` | 빌드 결과 미리보기 |
| `pnpm run test` | 테스트 실행 |
| `pnpm run sync` | gstack 스킬 변경 감지 + 가이드 동기화 |
| `pnpm run generate` | 전체 스킬 가이드 재생성 (API 키 필요) |

## gstack 업데이트 시 가이드 동기화

gstack이 새 버전으로 업데이트되면 스킬이 추가/변경/삭제될 수 있습니다. 가이드를 최신 상태로 유지하는 방법:

```bash
# 1. gstack 업그레이드 (gstack 내장 스킬)
/gstack-gstack-upgrade

# 2. 가이드 동기화 (변경 감지 + stub 생성 + 사이드바 업데이트)
pnpm run sync
```

sync가 자동으로 처리하는 것:

| 상황 | 자동 처리 | 수동 작업 |
|------|----------|----------|
| 새 스킬 | stub 페이지 생성, categories.json 추가, config.ts 사이드바 업데이트 | 가이드 내용 작성, 카테고리 확인 |
| 변경된 스킬 | 변경 알림 표시 | 가이드 내용이 아직 맞는지 확인 |
| 삭제된 스킬 | 파일 삭제, categories.json/config.ts 자동 정리 | 없음 |

API 키 불필요. 새 스킬의 가이드 내용은 Claude Code로 직접 작성합니다.

## 프로젝트 구조

```
docs/
  .vitepress/
    config.ts          # VitePress 설정 + 사이드바
    theme/custom.css   # 브랜드 컬러, 폰트
  skills/              # 33개 스킬 가이드 페이지
  public/favicon.svg   # 파비콘
  index.md             # 홈페이지
  quick-start.md       # 퀵스타트
  workflows.md         # 워크플로우
scripts/
  sync.js              # gstack 스킬 변경 감지 + 동기화
  generate.js          # AI 기반 가이드 생성 (API 키 필요)
  validate-categories.js  # 빌드 시 categories.json 검증
categories.json        # 스킬 -> 카테고리 매핑
sidebar-meta.json      # 사이드바 순서 + collapsed 설정
DESIGN.md              # 디자인 시스템 레퍼런스
```

## 기술 스택

- [VitePress](https://vitepress.dev/) 1.6.3
- [Mermaid](https://mermaid.js.org/) (워크플로우 다이어그램)
- pnpm
- Vercel (자동 배포)

## 배포

main 브랜치에 push하면 Vercel이 자동으로 빌드 + 배포합니다.

## 라이선스

MIT
