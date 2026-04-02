#!/usr/bin/env node
// sync.js — detect gstack skill changes and sync guide pages.
// API 불필요. 변경 감지 + stub 생성 + categories/config 업데이트.
// 가이드 내용은 사용자가 Claude Code로 직접 작성.
// Usage: pnpm run sync

import { createHash } from 'crypto';
import { readFileSync, writeFileSync, existsSync, readdirSync, unlinkSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SKILLS_BASE = join(homedir(), '.claude', 'skills', 'gstack');
const OUTPUT_DIR = join(ROOT, 'docs', 'skills');
const CATEGORIES_PATH = join(ROOT, 'categories.json');
const SIDEBAR_META_PATH = join(ROOT, 'sidebar-meta.json');
const CONFIG_PATH = join(ROOT, 'docs', '.vitepress', 'config.ts');
const STATE_PATH = join(ROOT, '.sync-state.json');

// ---- Frontmatter parser (same as generate.js) ----

function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };
  const frontmatter = {};
  const lines = match[1].split('\n');
  let currentKey = null;
  let multilineValue = [];
  for (const line of lines) {
    const keyMatch = line.match(/^(\w[\w-]*)\s*:\s*(.*)/);
    if (keyMatch) {
      if (currentKey && multilineValue.length > 0) {
        frontmatter[currentKey] = multilineValue.join('\n').trim();
      }
      currentKey = keyMatch[1];
      const value = keyMatch[2].trim();
      if (value === '|') { multilineValue = []; }
      else { frontmatter[currentKey] = value; currentKey = null; multilineValue = []; }
    } else if (currentKey && line.startsWith('  ')) {
      multilineValue.push(line.trim());
    }
  }
  if (currentKey && multilineValue.length > 0) {
    frontmatter[currentKey] = multilineValue.join('\n').trim();
  }
  return { frontmatter, body: content.slice(match[0].length).trim() };
}

// ---- Hash utilities ----

function hashFile(filePath) {
  return createHash('sha256').update(readFileSync(filePath, 'utf8')).digest('hex');
}

function loadState() {
  if (!existsSync(STATE_PATH)) return {};
  return JSON.parse(readFileSync(STATE_PATH, 'utf8'));
}

function saveState(state) {
  writeFileSync(STATE_PATH, JSON.stringify(state, null, 2));
}

// ---- Delta detection ----

function detectChanges() {
  const state = loadState();
  const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));

  const gstackSkills = readdirSync(SKILLS_BASE, { withFileTypes: true })
    .filter(d => d.isDirectory() && existsSync(join(SKILLS_BASE, d.name, 'SKILL.md')))
    .map(d => d.name);

  const docSkills = existsSync(OUTPUT_DIR)
    ? readdirSync(OUTPUT_DIR).filter(f => f.endsWith('.md')).map(f => f.replace('.md', ''))
    : [];

  const docSet = new Set(docSkills);
  const gstackSet = new Set(gstackSkills);

  const added = [];
  const changed = [];
  const removed = [];
  const unchanged = [];

  for (const skill of gstackSkills) {
    const skillPath = join(SKILLS_BASE, skill, 'SKILL.md');
    const currentHash = hashFile(skillPath);
    if (!docSet.has(skill)) added.push(skill);
    else if (state[skill] !== currentHash) changed.push(skill);
    else unchanged.push(skill);
  }

  for (const skill of docSkills) {
    if (!gstackSet.has(skill)) removed.push(skill);
  }

  return { added, changed, removed, unchanged, gstackSkills };
}

// ---- Stub page (no API needed) ----

function createStubPage(skillName) {
  const skillPath = join(SKILLS_BASE, skillName, 'SKILL.md');
  const raw = readFileSync(skillPath, 'utf8');
  const { frontmatter } = parseFrontmatter(raw);
  const description = frontmatter['description'] || '';
  const version = frontmatter['version'] || 'unknown';
  const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));
  let category = '기타';
  for (const [cat, skills] of Object.entries(categories)) {
    if (skills.includes(skillName)) { category = cat; break; }
  }

  return `---
title: /${skillName}
category: ${category}
version: ${version}
generated: stub
---

# /gstack-${skillName}

> ${description?.split('\n')[0] || skillName}

${description || ''}

---

*이 페이지는 자동 생성된 stub입니다. 내용을 작성해주세요.*
`;
}

// ---- Categories update ----

function addToCategories(skillName, category) {
  const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));
  if (!categories[category]) categories[category] = [];
  if (!categories[category].includes(skillName)) {
    categories[category].push(skillName);
  }
  writeFileSync(CATEGORIES_PATH, JSON.stringify(categories, null, 2) + '\n');
}

function removeFromCategories(skillName) {
  const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));
  for (const [, skills] of Object.entries(categories)) {
    const idx = skills.indexOf(skillName);
    if (idx !== -1) skills.splice(idx, 1);
  }
  // 빈 카테고리 제거
  for (const [cat, skills] of Object.entries(categories)) {
    if (skills.length === 0) delete categories[cat];
  }
  writeFileSync(CATEGORIES_PATH, JSON.stringify(categories, null, 2) + '\n');
}

function isInCategories(skillName) {
  const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));
  return Object.values(categories).flat().includes(skillName);
}

// ---- Config.ts sidebar update ----

const SIDEBAR_START = '      // --- AUTO-GENERATED SIDEBAR START ---';
const SIDEBAR_END = '      // --- AUTO-GENERATED SIDEBAR END ---';

function generateSidebarCode() {
  const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));
  const meta = JSON.parse(readFileSync(SIDEBAR_META_PATH, 'utf8'));

  return Object.entries(meta)
    .sort((a, b) => a[1].order - b[1].order)
    .map(([name, config]) => {
      if (config.fixed) {
        const items = config.fixed.map(item =>
          `          { text: '${item.text}', link: '${item.link}' },`
        ).join('\n');
        return `      {\n        text: '${name}',\n        items: [\n${items}\n        ],\n      },`;
      }
      const skills = categories[name] || [];
      if (skills.length === 0) return null;
      const items = skills.map(skill =>
        `          { text: '/gstack-${skill}', link: '/skills/${skill}' },`
      ).join('\n');
      const collapsed = config.collapsed !== null ? `\n        collapsed: ${config.collapsed},` : '';
      return `      {\n        text: '${name}',${collapsed}\n        items: [\n${items}\n        ],\n      },`;
    })
    .filter(Boolean)
    .join('\n');
}

function updateConfigSidebar() {
  let content = readFileSync(CONFIG_PATH, 'utf8');
  const sidebarCode = generateSidebarCode();

  if (content.includes(SIDEBAR_START)) {
    const startIdx = content.indexOf(SIDEBAR_START);
    const endIdx = content.indexOf(SIDEBAR_END);
    if (startIdx !== -1 && endIdx !== -1) {
      content = content.slice(0, startIdx) + SIDEBAR_START + '\n' + sidebarCode + '\n' + content.slice(endIdx);
    }
  } else {
    const sidebarMatch = content.match(/(\s*sidebar:\s*\[)\n([\s\S]*?)(\n\s*\],)/);
    if (sidebarMatch) {
      const before = content.slice(0, sidebarMatch.index) + sidebarMatch[1] + '\n';
      const after = sidebarMatch[3] + content.slice(sidebarMatch.index + sidebarMatch[0].length);
      content = before + SIDEBAR_START + '\n' + sidebarCode + '\n' + SIDEBAR_END + '\n' + after;
    }
  }
  writeFileSync(CONFIG_PATH, content);
}

// ---- Main ----

function main() {
  console.log('gstack-guide sync');
  console.log('=================\n');

  if (!existsSync(SKILLS_BASE)) {
    console.error(`gstack not found at ${SKILLS_BASE}`);
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });

  const { added, changed, removed, unchanged, gstackSkills } = detectChanges();

  console.log(`스캔: ${gstackSkills.length}개 스킬`);
  console.log(`  추가: ${added.length}개 ${added.length > 0 ? `(${added.join(', ')})` : ''}`);
  console.log(`  변경: ${changed.length}개 ${changed.length > 0 ? `(${changed.join(', ')})` : ''}`);
  console.log(`  삭제: ${removed.length}개 ${removed.length > 0 ? `(${removed.join(', ')})` : ''}`);
  console.log(`  동일: ${unchanged.length}개\n`);

  if (added.length === 0 && changed.length === 0 && removed.length === 0) {
    console.log('변경 사항 없음. 이미 최신 상태입니다.');
    return;
  }

  const state = loadState();

  // 새 스킬: stub 페이지 생성 + categories 추가
  for (const skill of added) {
    console.log(`  [추가] ${skill}`);
    if (!isInCategories(skill)) {
      addToCategories(skill, '개발 도구');
      console.log(`    카테고리: 개발 도구 (기본값, categories.json에서 수정 가능)`);
    }
    const outPath = join(OUTPUT_DIR, `${skill}.md`);
    writeFileSync(outPath, createStubPage(skill));
    const skillPath = join(SKILLS_BASE, skill, 'SKILL.md');
    state[skill] = hashFile(skillPath);
    console.log(`    -> stub 생성 완료`);
  }

  // 변경 스킬: 알림만 (내용은 사용자가 직접 업데이트)
  for (const skill of changed) {
    console.log(`  [변경] ${skill} — SKILL.md가 변경됨. 가이드 업데이트가 필요할 수 있습니다.`);
    const skillPath = join(SKILLS_BASE, skill, 'SKILL.md');
    state[skill] = hashFile(skillPath);
  }

  // 삭제 스킬: 파일 제거 + categories에서 제거
  for (const skill of removed) {
    console.log(`  [삭제] ${skill}`);
    const docPath = join(OUTPUT_DIR, `${skill}.md`);
    if (existsSync(docPath)) unlinkSync(docPath);
    removeFromCategories(skill);
    delete state[skill];
    console.log(`    -> 제거 완료`);
  }

  // unchanged 스킬의 해시도 기록 (첫 실행 대응)
  for (const skill of unchanged) {
    if (!state[skill]) {
      const skillPath = join(SKILLS_BASE, skill, 'SKILL.md');
      state[skill] = hashFile(skillPath);
    }
  }

  saveState(state);

  // config.ts 사이드바 업데이트
  if (added.length > 0 || removed.length > 0) {
    console.log('\n사이드바 업데이트 중...');
    updateConfigSidebar();
    console.log('  -> config.ts 업데이트 완료');
  }

  // 다음 할 일 안내
  console.log('\n=== 다음 할 일 ===');
  if (added.length > 0) {
    console.log(`\n새 스킬 ${added.length}개의 가이드를 작성해주세요:`);
    for (const skill of added) {
      console.log(`  docs/skills/${skill}.md — stub 상태, 내용 작성 필요`);
    }
    console.log(`\n카테고리 확인: categories.json에서 새 스킬의 분류가 맞는지 확인하세요.`);
  }
  if (changed.length > 0) {
    console.log(`\n변경된 스킬 ${changed.length}개의 가이드 확인이 필요합니다:`);
    for (const skill of changed) {
      console.log(`  docs/skills/${skill}.md — SKILL.md가 변경됨`);
    }
  }
  if (added.length === 0 && changed.length === 0) {
    console.log('삭제 처리 완료. 추가 작업 없음.');
  }
}

main();
