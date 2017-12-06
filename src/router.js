const handleHome = require('./handleHome');
const handleWishlist = require('./handleWishlist');

const router = (req, res) => {
  const url = req.url
  if (url === '/') {
    handleHome(req, res);
  } else if (url === '/wishlist') {
    handleWishlist(req, res);
  } else if (url === '/search') {
    handleSearch(req, res);
  } else if (url === '/generate') {
    handleShopData(req, res);
  } //else {
  //   handleStatic(req, res);
  // }
}

module.exports = router;
