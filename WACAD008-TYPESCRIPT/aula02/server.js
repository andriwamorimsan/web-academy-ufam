const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = 5600;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".map": "application/json; charset=utf-8"
};

const server = http.createServer((request, response) => {
  const requestUrl = decodeURIComponent((request.url || "/").split("?")[0]);
  const route = requestUrl === "/" ? "/index.html" : requestUrl;
  const filePath = path.normalize(path.join(root, route));

  if (!filePath.startsWith(root)) {
    response.writeHead(403);
    response.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      response.writeHead(404);
      response.end("Not found");
      return;
    }

    response.writeHead(200, {
      "Content-Type": types[path.extname(filePath)] || "text/plain; charset=utf-8"
    });
    response.end(data);
  });
});

server.on("error", error => {
  if (error.code === "EADDRINUSE") {
    console.log(`A porta ${port} ja esta em uso.`);
    console.log(`Abra http://127.0.0.1:${port} ou feche o outro servidor antes de rodar npm start novamente.`);
    process.exit(1);
  }

  throw error;
});

server.listen(port, "127.0.0.1", () => {
  console.log(`Servidor rodando em http://127.0.0.1:${port}`);
});
