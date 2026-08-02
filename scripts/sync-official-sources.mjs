import { mkdir, writeFile } from 'node:fs/promises';

const repository = 'hashicorp/web-unified-docs';
const versionRoot = 'content/terraform/v1.12.x';
const paths = [
  'docs/intro/index.mdx',
  'docs/intro/core-workflow.mdx',
  'docs/cli/commands/init.mdx',
  'docs/cli/commands/plan.mdx',
  'docs/cli/commands/apply.mdx',
  'docs/cli/commands/destroy.mdx',
  'docs/cli/commands/fmt.mdx',
  'docs/cli/commands/validate.mdx',
  'docs/cli/commands/import.mdx',
  'docs/cli/commands/state/index.mdx',
  'docs/internals/graph.mdx',
  'docs/internals/debugging.mdx',
  'docs/language/providers/index.mdx',
  'docs/language/files/dependency-lock.mdx',
  'docs/language/backend/s3.mdx',
  'docs/language/state/index.mdx',
  'docs/language/state/locking.mdx',
  'docs/language/block/moved.mdx',
  'docs/language/block/removed.mdx',
  'docs/language/import/index.mdx',
  'docs/language/manage-sensitive-data/index.mdx',
  'docs/language/manage-sensitive-data/ephemeral.mdx',
  'docs/language/manage-sensitive-data/write-only.mdx',
];

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': 'terraform-associate-004-study-guide',
  'X-GitHub-Api-Version': '2022-11-28',
};

const branchResponse = await fetch(`https://api.github.com/repos/${repository}/commits/main`, { headers });
if (!branchResponse.ok) throw new Error(`Unable to resolve web-unified-docs main: ${branchResponse.status}`);
const branch = await branchResponse.json();

const sources = [];
for (const relativePath of paths) {
  const path = `${versionRoot}/${relativePath}`;
  const response = await fetch(`https://api.github.com/repos/${repository}/contents/${path}?ref=${branch.sha}`, { headers });
  const route = relativePath
    .replace(/^docs\//, '')
    .replace(/\/index\.mdx$/, '')
    .replace(/\.mdx$/, '')
    .replace(/^language\//, 'language/v1.12.x/')
    .replace(/^cli\//, 'cli/v1.12.x/')
    .replace(/^intro\//, 'intro/v1.12.x/')
    .replace(/^internals\//, 'internals/v1.12.x/');
  sources.push({
    path,
    available: response.ok,
    repositoryUrl: `https://github.com/${repository}/blob/${branch.sha}/${path}`,
    developerUrl: `https://developer.hashicorp.com/terraform/${route === 'intro' ? 'intro/v1.12.x' : route}`,
  });
}

const output = {
  repository,
  license: 'BUSL-1.1 with the repository Additional Use Grant; verify LICENSE before redistribution',
  examBaseline: 'Terraform 1.12',
  resolvedCommit: branch.sha,
  generatedAt: new Date().toISOString(),
  sources,
};

await mkdir('src/data', { recursive: true });
await writeFile('src/data/official-source-index.json', `${JSON.stringify(output, null, 2)}\n`);
console.log(`Indexed ${sources.length} official paths at ${branch.sha.slice(0, 12)}.`);
