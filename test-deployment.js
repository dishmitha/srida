const https = require('https');

const BACKEND_URL = 'https://srida-backend.onrender.com';
const FRONTEND_URL = 'https://srida-frontend.onrender.com';

const testEndpoints = [
  { url: `${BACKEND_URL}/api/health`, name: 'Backend Health' },
  { url: `${BACKEND_URL}/api/auth/login`, name: 'Auth Endpoint', method: 'POST', 
    body: { email: 'test@example.com', password: 'test123' }
  },
  { url: FRONTEND_URL, name: 'Frontend Static Site' }
];

async function testDeployment() {
  for (const endpoint of testEndpoints) {
    try {
      const options = {
        method: endpoint.method || 'GET',
        headers: { 'Content-Type': 'application/json' }
      };
      
      const req = https.request(endpoint.url, options, (res) => {
        console.log(`[${endpoint.name}] Status: ${res.statusCode}`);
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (data) console.log(`[${endpoint.name}] Response:`, data.substring(0, 100));
        });
      });

      if (endpoint.body) {
        req.write(JSON.stringify(endpoint.body));
      }
      
      req.end();

      req.on('error', (e) => {
        console.error(`[${endpoint.name}] Error:`, e.message);
      });
    } catch (error) {
      console.error(`[${endpoint.name}] Failed:`, error.message);
    }
  }
}

console.log('Testing Srida deployment...');
testDeployment();