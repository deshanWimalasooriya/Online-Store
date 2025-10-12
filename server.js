const http = require('http');
const fs = require('fs');
const path = require('path');
const port = process.env.PORT || 3000;
const publicDir = path.join(__dirname, 'public');

function sendFile(res, filePath, contentType = 'text/html') {
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  const safePath = req.url === '/' ? '/index.html' : req.url;
  const filePath = path.join(publicDir, decodeURIComponent(safePath));
  const ext = path.extname(filePath).toLowerCase();
  const mime = { '.html':'text/html', '.js':'application/javascript', '.css':'text/css', '.png':'image/png', '.jpg':'image/jpeg', '.svg':'image/svg+xml' }[ext] || 'text/plain';
  if (!filePath.startsWith(publicDir)) { res.writeHead(403); res.end('Forbidden'); return; }
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) { res.writeHead(404); res.end('Not found'); return; }
    sendFile(res, filePath, mime);
  });
});

server.listen(port, () => console.log(`Server listening on ${port}`));
