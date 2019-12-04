#!/usr/bin/env node
//
// http://tplabo.duckdns.org/api/session?token=s2jYO74NSYxdxaYerEr8DVTRKxaczeLK
//
// options for GET
//
const http = require('http');

const data = JSON.stringify({});

const token = 'XbLZTuujrWS9RRRmamf9qQFPOk5usV4Z';

const options = {
  hostname: 'tplabo.duckdns.org',
  port: 80,
  path: '/api/session?token=' + token , // <-- ok, token only to create session 
  method: 'GET',
}

const req = http.request(options, (res) => {
  console.log(`*** statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })

})

req.on('error', (error) => {
  console.error(error)
})

req.write(data)
req.end()
