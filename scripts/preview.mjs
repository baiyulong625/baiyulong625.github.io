import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT || 3000);

const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".mjs": "text/javascript",
  ".css": "text/css",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".json": "application/json",
  ".woff2": "font/woff2",
};

createServer(async (req, res) => {
  try {
    const urlPath = new URL(req.url, "http://localhost").pathname;
    let rel = normalize(urlPath === "/" ? "/index.html" : urlPath);
    if (rel.startsWith(sep)) rel = rel.slice(1);

    let file = join(root, rel);
    if (!file.startsWith(root)) {
      res.writeHead(403);
      return res.end("Forbidden");
    }

    let data;
    try {
      data = await readFile(file);
    } catch {
      data = await readFile(join(root, rel + ".html"));
    }

    res.writeHead(200, {
      "Content-Type": types[extname(file)] || "application/octet-stream",
    });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end("Not Found");
  }
}).listen(port, () => {
  console.log(`Preview 运行中：http://localhost:${port}`);
});
