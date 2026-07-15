# Website Deployment

The website emits a fully static `out/` directory through `npm run build`.

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

## Vercel

Vercel hosts the production static export from the `main` branch at
[atom-ui.com](https://atom-ui.com). Cloudflare owns DNS, the apex record is
DNS-only so traffic reaches Vercel directly, and the proxied `www` record owns
the redirect to the apex domain. The website repository, deployment
configuration, domain, and environment values remain independent from the
package repository.

## Alternative Static Hosting

Because the output is static, another host can serve `out/` if Vercel plan or
repository restrictions do not fit the project.
