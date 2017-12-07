const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const handleError = require('./handleError');
const shopData = require('../database/queries/shopData');

const handleShopData = (req, res) => {
  if (req.method === 'GET') {
    const filepath = path.join(__dirname, '..','..', 'public', 'generate.html');
    fs.readFile(filepath, (err,file) => {
      if(err) {
        handleError(err, req, res);
      } else {
        res.writeHead(200, {'content-type' : 'text/html'});
        res.end(file);
      }
    });
  } else if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', (err,response) => {
      if (err) {
        handleError(err, req, res);
      } else {
        const first_name = data.split(',')[0];
        const last_name = data.split(',')[1];

        shopData(first_name, last_name, (err, response) => {
          if(err) {
            handleError(err, req, response);
          } else {
              if(response == 'USER NOT FOUND'){
                res.writeHead(200, {'content-type' : 'application/json'});
                res.end(JSON.stringify('USER NOT FOUND'));
              } else {
                res.writeHead(200, {'content-type' : 'application/json'});
                res.end(JSON.stringify(response.rows));
            }
          }
        });
      }
    });
  }
}

module.exports = handleShopData;
