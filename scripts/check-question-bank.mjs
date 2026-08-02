import { readFile } from 'node:fs/promises';

const domains = [
  ['domain-1-iac-concepts.md', 20],
  ['domain-2-terraform-fundamentals.md', 20],
  ['domain-3-core-workflow.md', 25],
  ['domain-4-configuration.md', 35],
  ['domain-5-modules.md', 25],
  ['domain-6-state.md', 30],
  ['domain-7-maintain.md', 25],
  ['domain-8-hcp-terraform.md', 20],
];

const root = new URL('../src/content/docs/archive/practice-exams/', import.meta.url);
let total = 0;

for (const [file, expected] of domains) {
  const source = await readFile(new URL(file, root), 'utf8');
  const count = source.match(/^### 문제 \d+/gm)?.length ?? 0;
  if (count !== expected) {
    throw new Error(`${file}: expected ${expected} questions, found ${count}`);
  }
  total += count;
}

if (total !== 200) throw new Error(`Expected 200 canonical questions, found ${total}`);
console.log(`Verified ${total} canonical questions across ${domains.length} domains.`);
