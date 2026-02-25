const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const SCORES_FILE = path.join(__dirname, 'scores.json');
const GAME_FILE = path.join(__dirname, 'index.html');

function readScores() {
  try {
    var data = fs.readFileSync(SCORES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (e) {
    return { bestTime: null };
  }
}

function writeScores(scores) {
  fs.writeFileSync(SCORES_FILE, JSON.stringify(scores, null, 2), 'utf8');
}

var server = http.createServer(function (req, res) {

  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Serve the game HTML
  if (req.method === 'GET' && (req.url === '/' || req.url === '/index.html')) {
    fs.readFile(GAME_FILE, 'utf8', function (err, data) {
      if (err) {
        res.writeHead(500);
        res.end('Dosya okunamadi');
        return;
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data);
    });
    return;
  }

  // GET best score
  if (req.method === 'GET' && req.url === '/api/scores') {
    var scores = readScores();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(scores));
    return;
  }

  // POST new score
  if (req.method === 'POST' && req.url === '/api/scores') {
    var body = '';
    req.on('data', function (chunk) {
      body += chunk;
    });
    req.on('end', function () {
      try {
        var data = JSON.parse(body);
        var newTime = data.time;

        if (typeof newTime !== 'number' || newTime <= 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'Gecersiz sure' }));
          return;
        }

        var scores = readScores();
        var isNewBest = false;

        if (scores.bestTime === null || newTime < scores.bestTime) {
          scores.bestTime = newTime;
          isNewBest = true;
          writeScores(scores);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          bestTime: scores.bestTime,
          isNewBest: isNewBest
        }));
      } catch (e) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Gecersiz veri' }));
      }
    });
    return;
  }

  res.writeHead(404);
  res.end('Bulunamadi');
});

server.listen(PORT, function () {
  console.log('Oyun sunucusu calisiyor: http://localhost:' + PORT);
});
