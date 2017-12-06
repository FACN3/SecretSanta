const tape = require('tape');
const qs = require('querystring');
const createWishlist = require('../queries/createWishlist');
const shopData = require('../queries/shopData');
const search = require('../queries/search');
const runDbBuild = require('../database/db_build');

// Testing if tape is working
tape("Is it working", (t) => {
  t.equals(1,1, "one equals one");
  t.end();
});

// Testing the createWishlist query for the index.html form.
tape("Inserting a new user with a wish list (all new items)", (t) => {
  runDbBuild((err, res) => {
    const expected = 'New wishlist created.';
    createWishlist('Daniel', 'Doodle', ['poney', 'TV'], (err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.equals(res, expected, "Should return a success message.");
        t.end();
      }
    });
  });
});


//Testing shopData function.

tape("Returns the shopping list of a given user.", (t) => {
  runDbBuild((err, res) => {
    const expected = [];
    shopData('Sophie', 'Lim', (err, res) => {
      if (err) {
        console.log('Error is: ', err);
      } else {
        console.log('Result: ', res.rows);
        t.deepEqual(res.rows, expected, "Should return an empty array if user hasn't reserved anything.");
        t.end();
      }
    });
  });
});

// Testing search for a user and see his wishlist.
tape("Returns a given user's wishlist", (t) => {
  runDbBuild((err, res) => {
    const expected = 'plane ticket';
    search('Mynah', 'Marie', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.deepEqual(res[0].gifts, expected, "Should return an array representing a wishlist.");
        t.end();
      }
    });
  });
})
