const fs = require('fs');
const path = require('path');
const handleError = require('./handleError');

const handleStatic = (req, res) => {
  const url = req.url;
  const ext = req.url.split('.')[1];
  const types = {
    css: 'text/css',
    html: 'text/html',
    js: 'application/javascript',
    ico: 'image/x-icon'
  }[ext];

  const filePath = path.join(__dirname, '..', '..', 'public', url);

  fs.readFile(filePath, (err, file) => {
    if (err) {
      handleError(err, req, res);
    } else {
      res.writeHead(200, {'Content-Type' : types });
      res.end(file);
    }
  })
}

module.exports = handleStatic;
