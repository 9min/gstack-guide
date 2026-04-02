## 배포 설정 (/gstack-setup-deploy 구성)
- 플랫폼: Vercel
- 프로덕션 URL: https://gstack-guide.vercel.app
- 배포 방식: main 브랜치 push 시 자동 배포 (Vercel GitHub 연동)
- 배포 상태 확인: HTTP health check
- 머지 방식: squash
- 프로젝트 유형: 정적 문서 사이트 (VitePress)
- 배포 후 상태 확인: https://gstack-guide.vercel.app

### 커스텀 배포 훅
- 머지 전: 없음
- 배포 트리거: main 브랜치 push 시 자동
- 배포 상태: 프로덕션 URL 폴링
- 헬스 체크: https://gstack-guide.vercel.app
