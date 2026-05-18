const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 0;

const MIME_TYPES = {
  default: 'application/octet-stream',
  html: 'text/html; charset=UTF-8',
  js: 'application/javascript',
  css: 'text/css',
  png: 'image/png',
  jpg: 'image/jpg',
  gif: 'image/gif',
  ico: 'image/x-icon',
  svg: 'image/svg+xml',
};

const STATIC_PATH = process.cwd();

const server = http.createServer(async (req, res) => {
  const file = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(STATIC_PATH, file);
  const ext = path.extname(filePath).substring(1).toLowerCase();

  try {
    const data = await fs.promises.readFile(filePath);
    res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || MIME_TYPES.default });
    res.end(data);
  } catch (err) {
    console.error(err);
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${server.address().port}`);
});
