# Quick Start

gstack을 처음 쓰는 경우 이 가이드를 따라 5분 안에 첫 스킬을 실행할 수 있습니다.

## 1. gstack 설치

```bash
# Homebrew (권장)
brew install gstack

# 또는 수동 설치
curl -fsSL https://raw.githubusercontent.com/garrynewman/gstack/main/install.sh | bash
```

설치 후 버전 확인:

```bash
gstack --version
# gstack v0.15.1
```

## 2. 프로젝트에서 첫 스킬 실행

Claude Code를 열고 프로젝트 디렉토리에서:

```
/gstack-qa
```

입력하면 QA 스킬이 실행됩니다. 사이트 URL 또는 로컬 서버 주소를 묻고, 자동으로 버그를 찾아 수정합니다.

## 3. 결과 해석하기

QA 완료 후 출력 예시:

```
=== QA Report ===
Health Score: 84/100 (Before: 71)

Critical: 0 (was 2) ✓
High:     1 (was 3) ✓
Medium:   4 (was 6) ✓

Fixed: 4 bugs committed
Remaining: 1 high-priority (image alt text — deferred)
```

- **Health Score**: 0~100, 80+ 이면 ship 준비 완료
- **Critical/High**: 배포 전 반드시 수정
- **Fixed**: gstack이 자동 수정 + 커밋한 버그 수

## 4. 다음 단계

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
