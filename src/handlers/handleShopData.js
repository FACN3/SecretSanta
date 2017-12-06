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
        console.log('there is an error!', err);
      } else {
        // console.log('this is data', data);
        data = qs.parse(data);
        // console.log('this is parsed data', data);

        const first_name = data['first_name'];
        const last_name = data['last_name'];
        // console.log('fname ' + first_name + ' lname ' + last_name);
        shopData(first_name, last_name, (err, response) => {
          if(err) {
            // handleError(err, req, response);
            console.log(err);
          } else {
            console.log(response.rows);
            res.writeHead(200, {'content-type' : 'text/plain'});
            res.end(null, response.rows);
          }
        });
      }
    });
  }
}

module.exports = handleShopData;
