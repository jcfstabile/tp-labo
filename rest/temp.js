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

const options_session = {
  hostname: 'tplabo.duckdns.org',
  port: 80,
  path: '/api/session?token=' + token , // <-- ok, token only to create session 
  method: 'GET',
  headers: {
    //'Content-type': 'application/json',
    'Content-Length': '22',
    'Connection':'keep-alive',
    //'Authorization': 'Basic ' + encodedCredentials ,
  },
  body: {'key1':'value', 'k':'v'},
};


const req = http.request(options_session, (res) => {
  //console.log(options_session)
  //console.log(res)
  //console.log(`*** headers ***`)
  //console.log(res.headers)
  //console.log(`set-cookie`)
  //console.log(res.headers['set-cookie'])
  //const cookie = JSON.stringify({});
  const cookie = {};
  cookie['set-cookie'] = res.headers['set-cookie']
  console.log('\n##### before devices #####' + cookie['set-cookie'])
  //console.log(`*** statusCode: ${res.statusCode}`)

  res.on('data', (d) => {
    process.stdout.write(d)
  })

  devices(cookie);

  //res.on('set-cookie', (c) => { process.stdout.write(c) } )

  console.log(`*** End: ***`)
});

function devices(cookie){
  const options_devices = {
    hostname: 'tplabo.duckdns.org',
    port: 80,
    path: '/api/devices',
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Content-Length': '22',
      'Connection':'keep-alive',
      'Authorization': 'Basic ' + encodedCredentials ,
    },
    body: {'key1':'value', 'k':'v'},
  };

  const dev = http.request(options_devices, function(res){
    res.on('data', function(d){ process.stdout.write(d)})
    console.log('\n##### devices #####' + cookie['set-cookie'])
  })
  dev.on('error', (error) => { console.error(error) });
  dev.write(data);
  dev.end();
}

req.on('error', (error) => { console.error(error) });

req.write(data);
req.end();
