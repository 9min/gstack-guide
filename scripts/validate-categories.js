#!/usr/bin/env node
/**
 * Build-time validation for categories.json.
 * Fails with exit 1 if:
 * - Any mapped skill directory doesn't exist in ~/.claude/skills/gstack/
 * - Any skill in docs/skills/ is missing from categories.json
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join } from 'path';
import { homedir } from 'os';

const categoriesPath = new URL('../categories.json', import.meta.url).pathname;
const categories = JSON.parse(readFileSync(categoriesPath, 'utf8'));
const skillsBase = join(homedir(), '.claude', 'skills', 'gstack');
const docsSkillsDir = new URL('../docs/skills', import.meta.url).pathname;

let hasError = false;

// 1. Check all mapped skills exist on disk (local-only: skip in CI environments)
const isCI = process.env.CI || process.env.VERCEL || process.env.NETLIFY;
if (!isCI && existsSync(skillsBase)) {
  for (const [category, skills] of Object.entries(categories)) {
    for (const skill of skills) {
      const skillDir = join(skillsBase, skill);
      if (!existsSync(skillDir)) {
        console.error(`[categories] ERROR: Mapped skill "${skill}" (category: ${category}) not found at ${skillDir}`);
        hasError = true;
      }
    }
  }
}

// 2. Check all generated skill pages are in categories.json
if (existsSync(docsSkillsDir)) {
  const allMapped = new Set(Object.values(categories).flat());
  const pages = readdirSync(docsSkillsDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''));

  for (const page of pages) {
    if (!allMapped.has(page)) {
      console.error(`[categories] ERROR: docs/skills/${page}.md exists but "${page}" is not in categories.json`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log('[categories] Validation passed.');
