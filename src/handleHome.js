const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const handleError = require('./handleError');

const handleHome = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html');

  fs.readFile(filePath, (err, file) => {
    if (err) {
      handleError(err, req, res);
    } else {
      res.writeHead(200, {'Content-Type' : 'text/html'});
      res.end(file);
    }
  });
}


module.exports = handleHome;
