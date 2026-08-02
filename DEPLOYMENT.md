# Cloudflare Pages Deployment

The production site is a static Astro build for `https://terraform-study.shinkeonkim.com`.

## Build locally

Use Node.js 22 and install exactly the versions in `package-lock.json`.

```bash
npm ci
npm run build
```

The build must report:

- zero Astro diagnostics
- exactly 200 canonical practice questions
- a Pagefind search index
- `dist/sitemap-index.xml`
- `dist/_headers`
- `dist/robots.txt`

## Dashboard Direct Upload

1. Open Cloudflare Dashboard and select **Workers & Pages**.
2. Select **Create application**, then **Pages**, then the Direct Upload option.
3. Use project name `terraform-study`.
4. Upload the complete `dist/` directory, not the repository root.
5. Wait until the generated `*.pages.dev` deployment is active.
6. Open the Pages project, select **Custom domains**, and add `terraform-study.shinkeonkim.com`.
7. If `shinkeonkim.com` is in the same Cloudflare account, allow Pages to create the DNS record. Otherwise create the CNAME target shown by the dashboard.
8. Wait until the custom-domain status is active and the certificate is issued.

Cloudflare does not allow a Direct Upload project to be converted into a Git-integrated Pages project later. Create a separate Git-integrated project if that deployment model is preferred.

## Git-based alternative

If a remote repository is connected instead of Direct Upload, use:

| Setting | Value |
|---|---|
| Framework preset | Astro |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Root directory | `/` |
| Environment variable | `NODE_VERSION=22` |
| Environment variable | `SITE_URL=https://terraform-study.shinkeonkim.com` |

## Production verification

After the custom domain becomes active, verify:

```bash
curl -I https://terraform-study.shinkeonkim.com/
curl -I https://terraform-study.shinkeonkim.com/practice/bank-200/
curl -I https://terraform-study.shinkeonkim.com/sitemap-index.xml
curl -I https://terraform-study.shinkeonkim.com/robots.txt
```

Expected results:

- HTTPS responses are `200`.
- The homepage canonical and sitemap URLs use `terraform-study.shinkeonkim.com`.
- `X-Content-Type-Options`, `Referrer-Policy`, and `Content-Security-Policy` are present.
- Fingerprinted `/_astro/` assets have an immutable cache policy.
- Search opens and returns results for `use_lockfile`, `ephemeral`, and `workspace`.
- Mobile navigation updates `aria-expanded` and all practice answer disclosures open.

## Optional Wrangler check

Dashboard upload is the production procedure. The included `wrangler.toml` also permits an authenticated operator to test a direct deployment with Wrangler:

```bash
npx wrangler pages deploy
```

Do not commit Cloudflare API tokens, account IDs, or local `.wrangler/` state.
