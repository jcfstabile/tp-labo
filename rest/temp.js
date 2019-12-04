#!/usr/bin/env node
//
// http://tplabo.duckdns.org/api/session?token=s2jYO74NSYxdxaYerEr8DVTRKxaczeLK
//
/**
 * HOW TO Make an HTTP Call - GET
 */
// options for GET
//
const http = require('http');

const data = JSON.stringify({});

const credentials = new Buffer.from('coquitas@mail@here:1234');

const encodedCredentials = credentials.toString('base64');

const token = 'XbLZTuujrWS9RRRmamf9qQFPOk5usV4Z';

const options = {
  hostname: 'tplabo.duckdns.org',
  port: 80,
  path: '/api/session?token=' + token , // <-- ok, token only to create session 
  method: 'GET',
  headers: {
    'Authorization': 'Basic ' + encodedCredentials ,
  }
};

const cokkie = null;

const req = http.request(options, (res) => {
  console.log(options)
  console.log(res)
  console.log(`*** headers ***`)
  console.log(res.headers)
  console.log(`*** statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })

  //res.on('set-cokkie', (c) => { process.stdout.write(c) } )

  console.log(`*** End: ***`)
});

req.on('error', (error) => {
  console.error(error)
});

req.write(data);
req.end();
