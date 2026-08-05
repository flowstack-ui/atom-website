# Website Deployment

The website uses native Next.js output on Vercel. Every known content route is
prerendered at build time; runtime dynamic rendering is not required.

The canonical source repository is
[`flowstack-ui/atom-website`](https://github.com/flowstack-ui/atom-website).
It remains separate from the
[`flowstack-ui/atom`](https://github.com/flowstack-ui/atom) package repository.

## Requirements

- Install from the committed npm lockfile.
- Run content validation, type checking, lint, and build.
- The canonical origin defaults to `https://atom-ui.com`; use
  `NEXT_PUBLIC_SITE_URL` only to override it deliberately.
- Serve generated routes with trailing slashes.
- Do not mount or clone the sibling Atom package repository.
- Merge only after the repository CI workflow passes.

## Vercel

Vercel hosts the production Next.js application from the `main` branch at
[atom-ui.com](https://atom-ui.com). Cloudflare owns DNS, the apex record is
DNS-only so traffic reaches Vercel directly, and the proxied `www` record owns
the redirect to the apex domain. The website repository, deployment
configuration, domain, and environment values remain independent from the
package repository.

## Hosting Boundary

Do not assume the `.next/` directory is a portable static artifact. A future
alternative host must support Next.js output or deliberately restore and
qualify an export pipeline.
