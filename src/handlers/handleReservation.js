const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const handleError = require('./handleError');
const reserveGifts = require('../database/queries/reserveGifts');

const handleReservation = (req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', (err, response) => {
      if (err) {
        handleError(err, req, res);
      } else {
        data = data.split(',');
        const first_name = data.shift();
        const last_name = data.shift();

        reserveGifts(first_name, last_name, data, (err, res) => {
          if (err) {
            handleError(err, req, res);
          } else {
            console.log('Success');
          }
        });
        res.writeHead(200, {'Content-Type' : 'text/html'});
        res.end(JSON.stringify(`Your reservation has been noted!`));
      }
    });
  }
}


module.exports = handleReservation;
