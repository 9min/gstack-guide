## Deploy Configuration (configured by /gstack-setup-deploy)
- Platform: Vercel
- Production URL: https://gstack-guide.vercel.app
- Deploy workflow: auto-deploy on push to main (Vercel GitHub integration)
- Deploy status command: HTTP health check
- Merge method: squash
- Project type: static documentation site (VitePress)
- Post-deploy health check: https://gstack-guide.vercel.app

### Custom deploy hooks
- Pre-merge: none
- Deploy trigger: automatic on push to main
- Deploy status: poll production URL
- Health check: https://gstack-guide.vercel.app
