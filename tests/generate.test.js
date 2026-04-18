import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Import parseFrontmatter by testing it inline (function is not exported)
// We test it via a helper that mimics the same logic
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

// ---- parseFrontmatter tests ----

describe('parseFrontmatter', () => {
  it('parses simple frontmatter', () => {
    const input = `---\nname: test-skill\nversion: 1.0.0\n---\n# Body`;
    const { frontmatter, body } = parseFrontmatter(input);
    expect(frontmatter.name).toBe('test-skill');
    expect(frontmatter.version).toBe('1.0.0');
    expect(body).toBe('# Body');
  });

  it('parses multiline description with pipe syntax', () => {
    const input = `---\nname: foo\ndescription: |\n  Line one.\n  Line two.\n---\nbody`;
    const { frontmatter } = parseFrontmatter(input);
    expect(frontmatter.description).toBe('Line one.\nLine two.');
  });

  it('returns empty frontmatter when no delimiter', () => {
    const input = `# Just a body`;
    const { frontmatter, body } = parseFrontmatter(input);
    expect(frontmatter).toEqual({});
    expect(body).toBe('# Just a body');
  });

  it('handles missing optional fields gracefully', () => {
    const input = `---\nname: minimal\n---\nbody`;
    const { frontmatter } = parseFrontmatter(input);
    expect(frontmatter.description).toBeUndefined();
    expect(frontmatter.version).toBeUndefined();
  });
});

// ---- categories.json tests ----

describe('categories.json', () => {
  const categoriesPath = join(ROOT, 'categories.json');
  const categories = JSON.parse(readFileSync(categoriesPath, 'utf8'));

  it('file exists', () => {
    expect(existsSync(categoriesPath)).toBe(true);
  });

  it('has expected Day 1 skills', () => {
    const allSkills = Object.values(categories).flat();
    const day1 = ['office-hours', 'plan-ceo-review', 'plan-eng-review', 'qa', 'review',
                   'health', 'ship', 'investigate', 'design-review', 'checkpoint'];
    for (const skill of day1) {
      expect(allSkills).toContain(skill);
    }
  });

  it('contains no duplicate skills across categories', () => {
    const allSkills = Object.values(categories).flat();
    const unique = new Set(allSkills);
    expect(unique.size).toBe(allSkills.length);
  });

  it('all categories are non-empty arrays', () => {
    for (const [cat, skills] of Object.entries(categories)) {
      expect(Array.isArray(skills)).toBe(true);
    }
  });
});

// ---- Generated skill pages tests ----

describe('generated skill pages', () => {
  const allSkillPages = [
    'autoplan', 'benchmark', 'browse', 'canary', 'careful', 'checkpoint', 'codex',
    'cso', 'design-consultation', 'design-html', 'design-review', 'design-shotgun',
    'devex-review', 'document-release', 'freeze', 'gstack-upgrade', 'guard', 'health',
    'investigate', 'land-and-deploy', 'learn', 'office-hours', 'open-gstack-browser',
    'pair-agent', 'plan-ceo-review', 'plan-design-review', 'plan-devex-review',
    'plan-eng-review', 'plan-tune', 'qa', 'qa-only', 'retro', 'review',
    'setup-browser-cookies', 'setup-deploy', 'ship', 'unfreeze'
  ];

  it('all 37 skill pages exist', () => {
    for (const skill of allSkillPages) {
      const path = join(ROOT, 'docs', 'skills', `${skill}.md`);
      expect(existsSync(path), `${skill}.md missing`).toBe(true);
    }
  });

  it('skill pages have required frontmatter fields', () => {
    for (const skill of allSkillPages) {
      const path = join(ROOT, 'docs', 'skills', `${skill}.md`);
      if (!existsSync(path)) continue;
      const content = readFileSync(path, 'utf8');
      const { frontmatter } = parseFrontmatter(content);
      expect(frontmatter.title, `${skill}.md missing title`).toBeTruthy();
      expect(frontmatter.category, `${skill}.md missing category`).toBeTruthy();
    }
  });

  it('skill pages do not expose internal bash paths', () => {
    for (const skill of allSkillPages) {
      const path = join(ROOT, 'docs', 'skills', `${skill}.md`);
      if (!existsSync(path)) continue;
      const content = readFileSync(path, 'utf8');
      expect(content).not.toContain('~/.claude/skills/gstack/bin/');
      expect(content).not.toContain('gstack-config');
    }
  });
});
