import { mkdir, writeFile } from 'node:fs/promises';

import { normalizeCatalogPayload } from './tutorial-catalog.mjs';

const applicationId = 'YY0FFNI7MF';
const publicSearchKey = '074499cdb522e30a32ebbe75a6d05779';
const endpoint = `https://yy0ffni7mf-dsn.algolia.net/1/indexes/*/queries?x-algolia-api-key=${publicSearchKey}&x-algolia-application-id=${applicationId}`;
const request = {
  requests: [
    {
      indexName: 'prod_DEVDOT_omni',
      facetFilters: ['products:terraform'],
      facets: ['edition', 'hasVideo', 'isInteractive', 'products'],
      filters: 'type:tutorial',
      hitsPerPage: 1000,
      page: 0,
      query: '',
    },
  ],
};

const response = await fetch(endpoint, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(request),
  signal: AbortSignal.timeout(30_000),
});
if (!response.ok) throw new Error(`Unable to fetch the Tutorials Library catalog: ${response.status}`);

const catalog = normalizeCatalogPayload(await response.json(), new Date().toISOString());
await mkdir('src/data', { recursive: true });
await writeFile('src/data/tutorial-catalog.json', `${JSON.stringify(catalog, null, 2)}\n`);

console.log(
  `Indexed ${catalog.summary.total} tutorials: ${catalog.summary.terraformOnly} Terraform-only, ` +
    `${catalog.summary.terraformPrimaryCrossProduct} Terraform-primary integrations, ` +
    `${catalog.summary.terraformSecondary} cross-product.`,
);
