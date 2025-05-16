import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = 3000;
const zipBombPath = path.join(__dirname,'10GB.gz');

app.get('/', (req, res) => {
  res.send('Welcome to the Zip Bomb Demo Server. Try hitting /trap as a bot would.');
});

app.get('/trap', (req, res) => {
  console.log(`Bot caught! IP: ${req.ip}`);
  res.setHeader('Content-Encoding', 'gzip');
  res.setHeader('Content-Type', 'text/html');
  res.setHeader('Content-Length', fs.statSync(zipBombPath).size.toString());
  const stream = fs.createReadStream(zipBombPath);
  stream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`Zip Bomb server running at http://localhost:${PORT}`);
});
