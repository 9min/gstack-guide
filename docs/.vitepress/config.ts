import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'gstack guide',
  description: 'gstack 스킬 가이드 — 상황별로 어떤 스킬을 쓸지 빠르게 찾는 곳',
  lang: 'ko-KR',

  themeConfig: {
    nav: [
      { text: '홈', link: '/' },
      { text: 'Quick Start', link: '/quick-start' },
      { text: '워크플로우', link: '/workflows' },
    ],

    sidebar: [
      {
        text: '시작하기',
        items: [
          { text: 'Quick Start', link: '/quick-start' },
          { text: '워크플로우', link: '/workflows' },
        ],
      },
      {
        text: '기획',
        items: [
          { text: '/gstack-office-hours', link: '/skills/office-hours' },
          { text: '/gstack-plan-ceo-review', link: '/skills/plan-ceo-review' },
          { text: '/gstack-plan-eng-review', link: '/skills/plan-eng-review' },
        ],
      },
      {
        text: '코드 품질',
        items: [
          { text: '/gstack-qa', link: '/skills/qa' },
          { text: '/gstack-review', link: '/skills/review' },
          { text: '/gstack-health', link: '/skills/health' },
        ],
      },
      {
        text: '배포',
        items: [
          { text: '/gstack-ship', link: '/skills/ship' },
        ],
      },
      {
        text: '디버깅',
        items: [
          { text: '/gstack-investigate', link: '/skills/investigate' },
        ],
      },
      {
        text: '디자인',
        items: [
          { text: '/gstack-design-review', link: '/skills/design-review' },
        ],
      },
      {
        text: '개발 도구',
        items: [
          { text: '/gstack-checkpoint', link: '/skills/checkpoint' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/garrynewman/gstack' },
    ],

    footer: {
      message: 'gstack v0.15.1 — AI 빌더 프레임워크',
    },
  },
}))
