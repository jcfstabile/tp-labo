#!/usr/bin/env node
//
// http://tplabo.duckdns.org/api/session?token=s2jYO74NSYxdxaYerEr8DVTRKxaczeLK
//
const http = require('http');

const data = JSON.stringify({});

const token = 'XbLZTuujrWS9RRRmamf9qQFPOk5usV4Z';

const options_session = {
  hostname: 'tplabo.duckdns.org',
  port: 80,
  path: '/api/session?token=' + token , // <-- ok, token only to create session & get cookie
  method: 'GET',
  headers: {
    'Content-Length': '22',
    'Connection':'keep-alive',
  },
};


const req = http.request(options_session, (res) => {

  res.on('data', (d) => { process.stdout.write(d) })

  const cookie = res.headers['set-cookie'];
  console.log('\n##### response cookie  #####' + cookie);

  devices(res.headers['set-cookie']);

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
      'Cookie': cookie,
    },
  };

  const dev = http.request(options_devices, function(res){
    res.on('data', function(d){ process.stdout.write(d)})
    console.log('\n##### devices #####' + cookie)
  })
  dev.on('error', (error) => { console.error(error) });
  dev.write(data);
  dev.end();
}

req.on('error', (error) => { console.error(error) });

req.write(data);
req.end();
