const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const handleError = require('./handleError');
const searchUser = require('../database/queries/searchUser');


const handleSearch = (req, res) => {
  if (req.method == 'GET') {
    const filePath = path.join(__dirname, '..', '..', 'public', 'search.html');
    fs.readFile(filePath, (err, file) => {
      if (err) {
        handleError(err, req, res);
      } else {
        res.writeHead(200, {
          'Content-Type': 'text/html'
        });
        res.end(file);
      }
    });
  } else {
    var data = "";
    req.on('data', (chunk) => {
      data += chunk;
    })
    req.on('end', () => {
      data=data.split(' ');
      searchUser(data[0],data[1] , (error, response) => {
        if (error) {
          handleError(error, req, res)
        } else {
          res.writeHead(200, {
            'Content-Type': 'application/json'
          });
          res.end(JSON.stringify(response));
        }
      })
    })

  }
}


module.exports = handleSearch;
