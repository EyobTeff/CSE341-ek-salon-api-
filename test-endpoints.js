const http = require('http');

function testEndpoint(path, callback) {
  const options = {
    hostname: 'localhost',
    port: 8080,
    path: path,
    method: 'GET'
  };

  const req = http.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      console.log(`\n=== Testing ${path} ===`);
      console.log(`Status Code: ${res.statusCode}`);
      console.log(`Response: ${data}`);
      callback();
    });
  });

  req.on('error', (e) => {
    console.error(`Error testing ${path}: ${e.message}`);
    callback();
  });

  req.end();
}

console.log('Testing EK Salon API endpoints...\n');

testEndpoint('/appointments', () => {
  testEndpoint('/barbers', () => {
    console.log('\nTests completed!');
  });
});
