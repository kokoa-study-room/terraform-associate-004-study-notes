const CORE_OBJECTIVES = new Map([
  ['terraform/apply', ['3e']],
  ['terraform/associate-questions-004', ['1a', '8d']],
  ['terraform/associate-review-004', ['1a', '8d']],
  ['terraform/associate-study-004', ['1a', '8d']],
  ['terraform/checks', ['4g']],
  ['terraform/configure-providers', ['2a', '2b', '2c']],
  ['terraform/count', ['4d', '4e', '4f']],
  ['terraform/custom-conditions', ['4g']],
  ['terraform/data-sources', ['4a', '4b']],
  ['terraform/dependencies', ['4b', '4f']],
  ['terraform/expressions', ['4d', '4e']],
  ['terraform/for-each', ['4d', '4e', '4f']],
  ['terraform/functions', ['4e']],
  ['terraform/infrastructure-as-code', ['1a', '1b', '1c']],
  ['terraform/module', ['5a', '5b', '5c']],
  ['terraform/module-create', ['5b', '5c']],
  ['terraform/module-object-attributes', ['4d', '5b', '5c']],
  ['terraform/module-use', ['5a', '5c', '5d']],
  ['terraform/move-config', ['6d']],
  ['terraform/outputs', ['4b', '4c']],
  ['terraform/plan', ['3d']],
  ['terraform/resource', ['4a', '4b']],
  ['terraform/resource-drift', ['6d']],
  ['terraform/resource-lifecycle', ['4f', '6d']],
  ['terraform/sensitive-variables', ['4h']],
  ['terraform/state-cli', ['2d', '6d', '7b']],
  ['terraform/state-import', ['6d', '7a']],
  ['terraform/test', ['3c', '4g']],
  ['terraform/troubleshooting-workflow', ['3c', '7b', '7c']],
  ['terraform/variables', ['4c']],
  ['terraform/versions', ['2a', '5d']],
]);

const CURRENT_EXTENSION = /^terraform\/(actions|query|stacks)(-|$)/;
const PROVIDER_DEVELOPMENT = /^terraform\/providers?-(plugin-framework|function-only)/;

const requireObject = (value, path) => {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    throw new TypeError(`${path} must be an object`);
  }
  return value;
};

const requireArray = (value, path) => {
  if (!Array.isArray(value)) throw new TypeError(`${path} must be an array`);
  return value;
};

const requireString = (value, path) => {
  if (typeof value !== 'string' || value.length === 0) throw new TypeError(`${path} must be a non-empty string`);
  return value;
};

const requireNumber = (value, path) => {
  if (typeof value !== 'number' || !Number.isFinite(value)) throw new TypeError(`${path} must be a finite number`);
  return value;
};

const requireBoolean = (value, path) => {
  if (typeof value !== 'boolean') throw new TypeError(`${path} must be a boolean`);
  return value;
};

const requireStrings = (value, path) =>
  requireArray(value, path).map((item, index) => requireString(item, `${path}[${index}]`));

const tutorialUrl = (slug, contextSlug) => {
  if (slug.startsWith('validated-patterns/')) return `https://developer.hashicorp.com/${slug}`;
  const [product, tutorial] = slug.split('/');
  const [, collection] = contextSlug.split('/');
  if (!product || !tutorial || !collection) throw new TypeError(`cannot construct tutorial URL for ${slug}`);
  return `https://developer.hashicorp.com/${product}/tutorials/${collection}/${tutorial}`;
};

const classifyScope = (slug, products, edition) => {
  if (CORE_OBJECTIVES.has(slug)) return 'exam-core';
  if (PROVIDER_DEVELOPMENT.test(slug)) return 'provider-development';
  if (CURRENT_EXTENSION.test(slug)) return 'current-extension';
  if (products[0] !== 'terraform') return 'cross-product';
  if (products.length > 1) return 'ecosystem-extension';
  if (edition !== 'open_source' || slug.startsWith('terraform/cloud-')) return 'hcp-extension';
  return 'supplemental';
};

const normalizeHit = (value, index) => {
  const hit = requireObject(value, `hits[${index}]`);
  const level = requireObject(hit.level, `hits[${index}].level`);
  const context = requireObject(hit.defaultContext, `hits[${index}].defaultContext`);
  const slug = requireString(hit.slug, `hits[${index}].slug`);
  const products = requireStrings(hit.products, `hits[${index}].products`);
  const edition = requireString(hit.edition, `hits[${index}].edition`);
  const contextSlug = requireString(context.slug, `hits[${index}].defaultContext.slug`);

  if (products.length === 0 || !products.includes('terraform')) {
    throw new TypeError(`tutorial ${slug} is not tagged with Terraform`);
  }

  return {
    id: requireString(hit.id, `hits[${index}].id`),
    title: requireString(hit.page_title, `hits[${index}].page_title`),
    slug,
    url: tutorialUrl(slug, contextSlug),
    description: requireString(hit.description, `hits[${index}].description`),
    products,
    primaryProduct: products[0],
    edition,
    level: typeof level.slug === 'string' && level.slug.length > 0 ? level.slug : 'unclassified',
    readTime: requireNumber(hit.readTime, `hits[${index}].readTime`),
    hasVideo: requireBoolean(hit.hasVideo, `hits[${index}].hasVideo`),
    isInteractive: requireBoolean(hit.isInteractive, `hits[${index}].isInteractive`),
    collection: {
      slug: contextSlug,
      name: requireString(context.name, `hits[${index}].defaultContext.name`),
    },
    headings: requireStrings(hit.headings, `hits[${index}].headings`),
    relationship: products.length === 1 ? 'terraform-only' : products[0] === 'terraform' ? 'terraform-primary' : 'terraform-secondary',
    studyScope: classifyScope(slug, products, edition),
    objectives: CORE_OBJECTIVES.get(slug) ?? [],
  };
};

const increment = (counts, key) => {
  counts[key] = (counts[key] ?? 0) + 1;
};

export const normalizeCatalogPayload = (value, generatedAt) => {
  const payload = requireObject(value, 'payload');
  const results = requireArray(payload.results, 'payload.results');
  if (results.length !== 1) throw new TypeError(`expected one Algolia result, received ${results.length}`);
  const result = requireObject(results[0], 'payload.results[0]');
  const reportedHits = requireNumber(result.nbHits, 'payload.results[0].nbHits');
  const items = requireArray(result.hits, 'payload.results[0].hits').map(normalizeHit).sort((a, b) => a.slug.localeCompare(b.slug));

  if (reportedHits !== items.length) throw new TypeError(`catalog reported ${reportedHits} hits but returned ${items.length}`);
  const slugs = new Set();
  for (const item of items) {
    if (slugs.has(item.slug)) throw new TypeError(`duplicate tutorial slug: ${item.slug}`);
    slugs.add(item.slug);
  }

  const byEdition = {};
  const byStudyScope = {};
  for (const item of items) {
    increment(byEdition, item.edition);
    increment(byStudyScope, item.studyScope);
  }

  return {
    schemaVersion: 1,
    source: 'https://developer.hashicorp.com/tutorials/library?product=terraform',
    generatedAt: requireString(generatedAt, 'generatedAt'),
    summary: {
      total: items.length,
      terraformOnly: items.filter(({ relationship }) => relationship === 'terraform-only').length,
      terraformPrimaryCrossProduct: items.filter(({ relationship }) => relationship === 'terraform-primary').length,
      terraformSecondary: items.filter(({ relationship }) => relationship === 'terraform-secondary').length,
      byEdition,
      byStudyScope,
    },
    items,
  };
};
