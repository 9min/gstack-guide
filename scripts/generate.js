#!/usr/bin/env node
// generate.js — reads ~/.claude/skills/gstack/{skill}/SKILL.md,
// calls Claude Sonnet 4 API to generate human-readable guides,
// writes to docs/skills/*.md with fallback chain:
//   1. AI full generation
//   2. description-only page
//   3. dirname-only stub

import Anthropic from '@anthropic-ai/sdk';
import { readFileSync, writeFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { homedir } from 'os';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SKILLS_BASE = join(homedir(), '.claude', 'skills', 'gstack');
const OUTPUT_DIR = join(ROOT, 'docs', 'skills');
const CATEGORIES_PATH = join(ROOT, 'categories.json');

const categories = JSON.parse(readFileSync(CATEGORIES_PATH, 'utf8'));
const day1Skills = Object.values(categories).flat();

// Model per CEO plan
const MODEL = 'claude-sonnet-4-5';

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
      if (value === '|') {
        multilineValue = [];
      } else {
        frontmatter[currentKey] = value;
        currentKey = null;
        multilineValue = [];
      }
    } else if (currentKey && line.startsWith('  ')) {
      multilineValue.push(line.trim());
    }
  }

  if (currentKey && multilineValue.length > 0) {
    frontmatter[currentKey] = multilineValue.join('\n').trim();
  }

  return { frontmatter, body: content.slice(match[0].length).trim() };
}

function getCategoryForSkill(skillName) {
  for (const [cat, skills] of Object.entries(categories)) {
    if (skills.includes(skillName)) return cat;
  }
  return '기타';
}

async function generateGuide(client, skillName, description, body) {
  const prompt = `You are writing a human-readable guide page for a CLI tool called "/${skillName}" that is part of the gstack framework for Claude Code.

SKILL NAME: ${skillName}
DESCRIPTION: ${description}

RAW SKILL FILE (this contains Claude Code instructions — bash scripts, internal logic, prompts):
${body.slice(0, 6000)}

Write a clean, practical guide for developers. Structure it exactly as:

# /${skillName}

> [One-sentence tagline — what it does, concrete, no fluff]

## 무엇을 하는 스킬인가

[2-3 paragraphs. What this skill does, why it exists, what problem it solves. Write for a developer who's never heard of gstack.]

## 언제 쓰나

[Bullet list of 4-6 concrete situations where you'd reach for this skill. Use real scenarios: "auth 버그가 발생했는데 어디서 터지는지 모를 때" not "when debugging".]

## 어떻게 시작하나

[Show the exact slash command to type. E.g., \`/gstack-${skillName}\` or \`/${skillName}\`]

[1-2 sentences on what happens after you type it — what does the skill ask or do first?]

## 실제 사용 예시

[One concrete scenario, told as a short narrative. Like: "PR 직전에 코드 리뷰가 필요했다. /review를 실행했더니..." Show what the output or result looks like.]

## 관련 스킬

[List 2-3 related skill names with \`/skillname\` format and one line each on when to use that instead]

---
RULES:
- Write in Korean
- Be concrete, not abstract. Name the file, the output, the result.
- Don't expose bash internals, script paths, or implementation details from the skill file
- Don't hallucinate commands that don't exist
- Keep total length under 600 words
- The slash command prefix is /gstack-${skillName} (with gstack- prefix)`;

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 1500,
    messages: [{ role: 'user', content: prompt }],
  });

  return message.content[0].type === 'text' ? message.content[0].text : null;
}

function descriptionOnlyPage(skillName, description, version) {
  const category = getCategoryForSkill(skillName);
  return `---
title: /${skillName}
category: ${category}
version: ${version || 'unknown'}
generated: fallback
---

# /${skillName}

> ${description?.split('\n')[0] || skillName}

${description || ''}

---

*가이드 페이지가 아직 준비되지 않았습니다. \`npm run generate\`로 재생성할 수 있습니다.*
`;
}

function stubPage(skillName) {
  return `---
title: /${skillName}
generated: stub
---

# /${skillName}

*스킬 정보를 불러올 수 없습니다.*
`;
}

async function processSkill(client, skillName) {
  const skillDir = join(SKILLS_BASE, skillName);
  const skillPath = join(skillDir, 'SKILL.md');

  if (!existsSync(skillPath)) {
    console.warn(`  [SKIP] ${skillName}: SKILL.md not found`);
    return { skill: skillName, status: 'skipped' };
  }

  const raw = readFileSync(skillPath, 'utf8');
  const { frontmatter, body } = parseFrontmatter(raw);
  const description = frontmatter['description'] || '';
  const version = frontmatter['version'] || '';
  const category = getCategoryForSkill(skillName);

  console.log(`  [GEN]  ${skillName} (${category})...`);

  let content;
  let status;

  if (client && description) {
    try {
      const guide = await generateGuide(client, skillName, description, body);
      if (guide) {
        content = `---
title: /${skillName}
category: ${category}
version: ${version}
generated: ai
---

${guide}
`;
        status = 'ai';
      } else {
        throw new Error('Empty AI response');
      }
    } catch (err) {
      console.warn(`    [FALLBACK] AI failed for ${skillName}: ${err.message}`);
      content = descriptionOnlyPage(skillName, description, version);
      status = 'description';
    }
  } else if (description) {
    content = descriptionOnlyPage(skillName, description, version);
    status = 'description';
  } else {
    content = stubPage(skillName);
    status = 'stub';
  }

  const outPath = join(OUTPUT_DIR, `${skillName}.md`);
  writeFileSync(outPath, content);
  console.log(`    -> ${outPath} [${status}]`);

  return { skill: skillName, status };
}

async function main() {
  mkdirSync(OUTPUT_DIR, { recursive: true });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  let client = null;

  if (apiKey) {
    client = new Anthropic({ apiKey });
    console.log(`Using Claude API (${MODEL})`);
  } else {
    console.warn('ANTHROPIC_API_KEY not set — falling back to description-only pages');
  }

  const targetSkills = process.argv.slice(2);
  const skillsToProcess = targetSkills.length > 0 ? targetSkills : day1Skills;

  console.log(`\nGenerating guides for ${skillsToProcess.length} skills...\n`);

  const results = [];
  for (const skillName of skillsToProcess) {
    const result = await processSkill(client, skillName);
    results.push(result);
  }

  // Summary report
  const counts = results.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1;
    return acc;
  }, {});

  console.log('\n=== Generation Report ===');
  for (const [status, count] of Object.entries(counts)) {
    console.log(`  ${status}: ${count}`);
  }

  const failed = results.filter(r => r.status === 'stub');
  if (failed.length > 0) {
    console.warn(`\nWARNING: ${failed.length} skills fell back to stub:`, failed.map(r => r.skill).join(', '));
  }

  console.log('\nDone. Review docs/skills/ before committing.');
}

// Export for sync.js reuse
export { parseFrontmatter, processSkill, generateGuide, getCategoryForSkill };

main().catch(err => {
  console.error('Fatal:', err);
  process.exit(1);
});
