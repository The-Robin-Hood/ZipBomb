import http from 'http';
import zlib from 'zlib';

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/trap',
  method: 'GET',
  headers: {
    'Accept-Encoding': 'gzip, deflate'
  }
};

const req = http.request(options, res => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

  const gunzip = zlib.createGunzip();
  let totalSize = 0;

  res.pipe(gunzip);

  gunzip.on('data', chunk => {
    totalSize += chunk.length;
    console.log(`Decompressed ${totalSize / (1024 * 1024)} MB...`);
    if (totalSize > 1024 * 1024 * 500) { // Simulate crashing at 500MB
      console.log("💥 Bot crashed! Out of memory.");
      req.destroy();
    }
  });

  gunzip.on('end', () => {
    console.log('Decompression complete.');
  });
});

req.on('error', e => {
  console.error(`problem with request: ${e.message}`);
});

req.end();
