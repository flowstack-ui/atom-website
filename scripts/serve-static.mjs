import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";

const root = resolve(import.meta.dirname, "..", "out");
const host = "127.0.0.1";
const port = 4002;
const types = new Map([
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".png", "image/png"],
  [".svg", "image/svg+xml"],
  [".woff2", "font/woff2"],
]);

async function fileFor(requestUrl) {
  const pathname = decodeURIComponent(new URL(requestUrl, `http://${host}:${port}`).pathname);
  let file = resolve(root, `.${pathname}`);
  if (pathname.endsWith("/")) file = resolve(file, "index.html");
  if (file !== root && !file.startsWith(`${root}${sep}`)) return undefined;
  try {
    const details = await stat(file);
    return details.isFile() ? file : undefined;
  } catch {
    return undefined;
  }
}

const server = createServer(async (request, response) => {
  const file = await fileFor(request.url ?? "/");
  if (!file) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }
  response.writeHead(200, { "content-type": types.get(extname(file)) ?? "application/octet-stream" });
  createReadStream(file).pipe(response);
});

server.listen(port, host, () => console.log(`Serving static website at http://${host}:${port}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
