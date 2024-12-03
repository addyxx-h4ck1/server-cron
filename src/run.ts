import https from 'https';
import { config } from 'dotenv';
config();

const options = {
  hostname: process.env.ENDPOINT,
  port: 443,
  path: '/server-status',
  method: 'GET',
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    try {
      const parsedData = JSON.parse(data);
      console.log(parsedData);
    } catch (error: any | unknown) {
      console.error('Error parsing JSON:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('Request error:', error.message);
});

req.end();
