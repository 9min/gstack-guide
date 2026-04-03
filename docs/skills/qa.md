---
title: /gstack-qa
category: 코드 품질
version: 2.0.0
generated: manual
---

# /gstack-qa

> 웹앱을 체계적으로 테스트하고 발견된 버그를 자동으로 수정하는 QA 스킬.

## 무엇을 하는 스킬인가

"이 기능 동작해?"라고 물어보면 막연한 답이 나옵니다. `/gstack-qa`는 실제로 사이트를 열고, 클릭하고, 입력하고, 에러가 뜨는지 확인합니다.

세 가지 티어로 작동합니다. **Quick**: Critical/High 버그만 잡습니다. **Standard**: Medium 버그까지 포함합니다. **Exhaustive**: 코스메틱 이슈까지 전부 찾습니다. 버그를 발견하면 소스 코드를 직접 수정하고 각 수정마다 커밋합니다. 수정 후 재검증까지 합니다.

결과로 "Before Health Score: 71 → After: 84" 형태의 비교 리포트가 나옵니다. 리포트-온리 모드는 `/gstack-qa-only`를 쓰세요.

## 언제 쓰나

- 기능 구현이 끝나고 배포 전 마지막 점검을 할 때
- "이거 제대로 동작해?"라고 확인이 필요할 때
- 여러 페이지에 걸쳐 회귀 버그가 없는지 확인할 때
- 새 팀원이 코드를 건드린 후 전체 건강 상태를 체크할 때
- 배포 전 ship-readiness 점수가 필요할 때

## 어떻게 시작하나

Claude Code에서 입력:

```
/gstack-qa
```

로컬 서버 URL(예: `http://localhost:3000`) 또는 스테이징 URL을 입력하면 됩니다. Quick/Standard/Exhaustive 중 하나를 선택합니다.

## 실제 사용 예시

로그인 기능을 추가하고 `/gstack-qa`를 실행했다. Standard 티어로 돌리자 3개의 버그가 발견됐다 — 비밀번호 6자 미만 입력 시 에러 메시지 없음(High), 로그인 성공 후 리다이렉트 URL 누락(High), 다크모드에서 버튼 텍스트 보이지 않음(Medium). 3개 모두 자동으로 수정되고 커밋됐다. Health Score가 68에서 89로 올라갔다.

## 음성 입력

AquaVoice, Whisper 등 음성 입력 도구에서 다음 표현으로 실행할 수 있습니다:

- "quality check"
- "test the app"
- "run QA"

## 관련 스킬

- [/gstack-investigate](/skills/investigate) — 특정 버그 하나의 근본 원인을 파고들 때
- [/gstack-review](/skills/review) — QA 후 코드 품질을 코드 리뷰로 한 번 더 검토할 때
- [/gstack-ship](/skills/ship) — QA 통과 후 배포할 때
