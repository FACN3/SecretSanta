const handleError = (err, req, res) => {
  console.log(err);
  if (res.status === 500) {
    res.writeHead(500, {'Content-Type' : 'text/html'});
    res.end('<h1>Sorry, there was an error on our side... Please check back later :)');
  } else if (res.status === 404) {
    res.writeHead(404, {'Content-Type': 'text/html'});
    res.end('<h1>PAgE NoT FoUnD</h1>');
  } else {
    res.writeHead(500, {'Content-Type': 'text/html'});
    res.end('<h1>Unknown Error...</h1>');
  }
}

module.exports = handleError;
