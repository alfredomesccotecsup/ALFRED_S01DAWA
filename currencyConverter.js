const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const exchangeRate = 0.85;

const server = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname === '/') {
    const filePath = path.join(__dirname, 'form.html');
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) {
        res.writeHead(500);
        res.end('Error loading the file');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });
  } else if (reqUrl.pathname === '/convert') {
    const dollars = parseFloat(reqUrl.query.dollars);
    
    if (isNaN(dollars)) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Invalid input');
    } else {
      const convertedAmount = dollars * exchangeRate;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(`<p>${dollars} dólares son aproximadamente ${convertedAmount.toFixed(2)} euros.</p>`);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

const port = 3000;
server.listen(port, () => {
  console.log('Bienvenido a nuestro convertidor de monedas visite al ')
  console.log(`servidor en funcionamiento en http://localhost:${port}`);
});
