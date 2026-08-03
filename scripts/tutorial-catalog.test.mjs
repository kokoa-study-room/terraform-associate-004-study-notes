import { describe, expect, test } from 'bun:test';

import { normalizeCatalogPayload } from './tutorial-catalog.mjs';

const hit = ({
  slug,
  products = ['terraform'],
  edition = 'open_source',
  level = 'beginner',
}) => ({
  objectID: `tutorial_${slug}`,
  id: `id-${slug}`,
  page_title: `Title for ${slug}`,
  slug,
  description: `Description for ${slug}`,
  products,
  edition,
  readTime: 12,
  hasVideo: false,
  isInteractive: false,
  headings: ['Prerequisites', 'Next steps'],
  level: { slug: level, count: 1, rank: 1 },
  defaultContext: {
    slug: 'terraform/test',
    name: 'Test collection',
    shortName: 'Test',
    theme: 'terraform',
    section: 'terraform',
  },
  type: 'tutorial',
});

describe('normalizeCatalogPayload', () => {
  test('classifies each tutorial by its role in the study guide', () => {
    // Given
    const payload = {
      results: [
        {
          nbHits: 5,
          hits: [
            hit({ slug: 'terraform/variables' }),
            hit({ slug: 'terraform/providers-plugin-framework-resource-create', level: 'advanced' }),
            hit({ slug: 'terraform/stacks-migrate', edition: 'tfc', level: 'advanced' }),
            hit({ slug: 'vault/learn-terraform', products: ['terraform', 'vault'] }),
            hit({ slug: 'vault/terraform-secrets-engine', products: ['vault', 'terraform'], edition: 'tfc' }),
          ],
        },
      ],
    };

    // When
    const catalog = normalizeCatalogPayload(payload, '2026-08-03T00:00:00.000Z');

    // Then
    expect(catalog.items.map(({ slug, studyScope }) => [slug, studyScope])).toEqual([
      ['terraform/providers-plugin-framework-resource-create', 'provider-development'],
      ['terraform/stacks-migrate', 'current-extension'],
      ['terraform/variables', 'exam-core'],
      ['vault/learn-terraform', 'ecosystem-extension'],
      ['vault/terraform-secrets-engine', 'cross-product'],
    ]);
    expect(catalog.items.find(({ slug }) => slug === 'terraform/variables')?.objectives).toEqual(['4c']);
  });

  test('summarizes relationship and edition counts from normalized items', () => {
    // Given
    const payload = {
      results: [
        {
          nbHits: 3,
          hits: [
            hit({ slug: 'terraform/variables' }),
            hit({ slug: 'vault/learn-terraform', products: ['terraform', 'vault'] }),
            hit({ slug: 'vault/terraform-secrets-engine', products: ['vault', 'terraform'], edition: 'tfc' }),
          ],
        },
      ],
    };

    // When
    const catalog = normalizeCatalogPayload(payload, '2026-08-03T00:00:00.000Z');

    // Then
    expect(catalog.summary).toEqual({
      total: 3,
      terraformOnly: 1,
      terraformPrimaryCrossProduct: 1,
      terraformSecondary: 1,
      byEdition: { open_source: 2, tfc: 1 },
      byStudyScope: { 'cross-product': 1, 'ecosystem-extension': 1, 'exam-core': 1 },
    });
  });

  test('marks tutorials without an assigned difficulty as unclassified', () => {
    // Given
    const tutorial = hit({ slug: 'terraform/variables' });
    tutorial.level = {};
    const payload = { results: [{ nbHits: 1, hits: [tutorial] }] };

    // When
    const catalog = normalizeCatalogPayload(payload, '2026-08-03T00:00:00.000Z');

    // Then
    expect(catalog.items[0]?.level).toBe('unclassified');
  });

  test('rejects duplicate slugs at the external-data boundary', () => {
    // Given
    const duplicate = hit({ slug: 'terraform/variables' });
    const payload = { results: [{ nbHits: 2, hits: [duplicate, duplicate] }] };

    // When
    const normalize = () => normalizeCatalogPayload(payload, '2026-08-03T00:00:00.000Z');

    // Then
    expect(normalize).toThrow('duplicate tutorial slug: terraform/variables');
  });

  test('rejects a reported hit count that differs from the returned records', () => {
    // Given
    const payload = { results: [{ nbHits: 2, hits: [hit({ slug: 'terraform/variables' })] }] };

    // When
    const normalize = () => normalizeCatalogPayload(payload, '2026-08-03T00:00:00.000Z');

    // Then
    expect(normalize).toThrow('catalog reported 2 hits but returned 1');
  });
});
