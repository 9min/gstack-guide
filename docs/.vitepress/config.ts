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
        collapsed: false,
        items: [
          { text: '/gstack-office-hours', link: '/skills/office-hours' },
          { text: '/gstack-plan-ceo-review', link: '/skills/plan-ceo-review' },
          { text: '/gstack-plan-eng-review', link: '/skills/plan-eng-review' },
          { text: '/gstack-autoplan', link: '/skills/autoplan' },
        ],
      },
      {
        text: '코드 품질',
        collapsed: false,
        items: [
          { text: '/gstack-qa', link: '/skills/qa' },
          { text: '/gstack-qa-only', link: '/skills/qa-only' },
          { text: '/gstack-review', link: '/skills/review' },
          { text: '/gstack-health', link: '/skills/health' },
          { text: '/gstack-benchmark', link: '/skills/benchmark' },
          { text: '/gstack-codex', link: '/skills/codex' },
          { text: '/gstack-cso', link: '/skills/cso' },
        ],
      },
      {
        text: '배포',
        collapsed: false,
        items: [
          { text: '/gstack-ship', link: '/skills/ship' },
          { text: '/gstack-land-and-deploy', link: '/skills/land-and-deploy' },
          { text: '/gstack-canary', link: '/skills/canary' },
          { text: '/gstack-setup-deploy', link: '/skills/setup-deploy' },
        ],
      },
      {
        text: '디버깅',
        collapsed: false,
        items: [
          { text: '/gstack-investigate', link: '/skills/investigate' },
        ],
      },
      {
        text: '디자인',
        collapsed: false,
        items: [
          { text: '/gstack-design-consultation', link: '/skills/design-consultation' },
          { text: '/gstack-design-review', link: '/skills/design-review' },
          { text: '/gstack-design-shotgun', link: '/skills/design-shotgun' },
          { text: '/gstack-design-html', link: '/skills/design-html' },
          { text: '/gstack-plan-design-review', link: '/skills/plan-design-review' },
        ],
      },
      {
        text: '개발 도구',
        collapsed: true,
        items: [
          { text: '/gstack-checkpoint', link: '/skills/checkpoint' },
          { text: '/gstack-freeze', link: '/skills/freeze' },
          { text: '/gstack-unfreeze', link: '/skills/unfreeze' },
          { text: '/gstack-guard', link: '/skills/guard' },
          { text: '/gstack-careful', link: '/skills/careful' },
          { text: '/gstack-browse', link: '/skills/browse' },
          { text: '/gstack-connect-chrome', link: '/skills/connect-chrome' },
          { text: '/gstack-setup-browser-cookies', link: '/skills/setup-browser-cookies' },
          { text: '/gstack-gstack-upgrade', link: '/skills/gstack-upgrade' },
        ],
      },
      {
        text: '문서/학습',
        collapsed: true,
        items: [
          { text: '/gstack-document-release', link: '/skills/document-release' },
          { text: '/gstack-learn', link: '/skills/learn' },
          { text: '/gstack-retro', link: '/skills/retro' },
        ],
      },
    ],

    search: {
      provider: 'local',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/9min/gstack-guide' },
    ],

    footer: {
      message: 'gstack v0.15.1 — AI 빌더 프레임워크',
    },
  },
}))
