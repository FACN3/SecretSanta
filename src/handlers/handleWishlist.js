const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const handleError = require('./handleError');
const createWishlist = require('../database/queries/createWishlist');

const handleWishlist = (req, res) => {
  if (req.method === 'POST') {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', (err, response) => {
      if (err) {
        handleError(err, req, res);
      } else {
        data = qs.parse(data);

        // Send to database
        const firstName = data.first_name;
        const lastName = data.last_name;
        const wishlist = data.wishlist.split(', ');
        // console.log(firstName, lastName, wishlist);
        createWishlist(firstName, lastName, wishlist, (err, response) => {
          if (err) {
            handleError(err, req, response);
          } else {
            console.log('Successfully inserted data in the database');
            res.writeHead(200, {'Content-Type' : 'text/html'});
            res.end("<h2>Wishlist successfully created!</h2><a href='/'>Back to Home Page</a>");
          }
        });
      }
    });
    // res.writeHead(200, {'Content-Type' : 'text/html'});
    // res.end("<h2>Wishlist successfully created!</h2><a href='/'>Back to Home Page</a>");
  } else {
    res.writeHead(307, {'Location' : '/'});
    res.end();
  }
}

module.exports = handleWishlist;
