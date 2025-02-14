const http = require("https");

const options = {
  "method": "GET",
  "hostname": "mock-36983b445b244fa3b69aa6cd73757b6c.mock.insomnia.rest",
  "port": null,
  "path": "/forecast5",
  "headers": {
    "cookie": "winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%25253D",
    "Server": "nginx/1.24.0",
    "Date": "Mon, 27 Jan 2025 03:44:47 GMT",
    "Content-Type": "text/html; charset=UTF-8",
    "Transfer-Encoding": "chunked",
    "Connection": "keep-alive",
    "Cache-Control": "private, must-revalidate",
    "pragma": "no-cache",
    "expires": "-1",
    "Set-Cookie": "winter_session=eyJpdiI6InBrZE1XamdOT2RLdFROUno5RytHZWc9PSIsInZhbHVlIjoiSUE5bklzT29WSVI5TG1GcG1OdUE4YzYvRW1kSlMxQTMyVGJaNXlDbHduai91Q1ljVkRrWi9wdk5aYzd5TmFrY0NaOXhNcnhEMG9Gd0djNTJDMFk4d09qbHlYaTBHclRzMk0rU1JJZVVJd2U5d2I4cWlIem1HSTZVblJ6WFA0ZGoiLCJtYWMiOiIwMmIyZjZjNTIzNTljMDU4MjM5NmVlOTA3ODkyOTUxZjg2Nzk1MGIzYjYyNjlkNmZlOGQ0OGE4ODY2N2ExMDliIiwidGFnIjoiIn0%3D; expires=Mon, 27 Jan 2025 05:44:47 GMT; Max-Age=7200; path=/; httponly; samesite=lax",
    "Content-Length": "0"
  }
};

const req = http.request(options, function (res) {
  const chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function () {
    const body = Buffer.concat(chunks);
    console.log(body.toString());
  });
});

req.end();