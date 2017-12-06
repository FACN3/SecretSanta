const handleHome = require('./handlers/handleHome');
const handleWishlist = require('./handlers/handleWishlist');
const handleSearch = require('./handlers/handleSearch');
const handleStatic = require('./handlers/handleStatic');
const handleShopData = require('./handlers/handleShopData');

const router = (req, res) => {
  const url = req.url;
  if (url === '/') {
    handleHome(req, res);
  } else if (url === '/wishlist') {
    handleWishlist(req, res);
  } else if (url.split('?')[0] === '/search') {
    handleSearch(req, res);
  } else if (url.split('?')[0] === '/generate') {
    handleShopData(req, res);
  } else {
    handleStatic(req, res);
  }
}

module.exports = router;
