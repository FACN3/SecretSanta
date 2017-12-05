const http = require('http');
const router = require('./router.js');

const port = process.env.PORT || 4444;

http.createServer(router).listen(port, () => {
  console.log(`Server running on port ${port}`);
});
