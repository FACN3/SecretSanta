const tape = require('tape');
const qs = require('querystring');
const databaseConnection = require('../database/db_connection.js');
const createWishlist = require('../queries/createWishlist');
const shopData = require('../queries/shopData');
const search = require('../queries/search');
const reserveGifts = require('../queries/reserveGifts');
const runDbBuild = require('../database/db_build');

// Testing if tape is working
tape("Is it working", (t) => {
  t.equals(1, 1, "one equals one");
  t.end();
});

// Testing the createWishlist query for the index.html form.
tape("Inserting a new user with a wish list (all new items)", (t) => {
  runDbBuild((err, res) => {
    const expected = 'New wishlist created.';
    createWishlist('Daniel', 'Doodle', ['money', 'new car', 'plane ticket'], (err, res) => {
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
    const expected = [];
    search('Mynah', 'Marie', (err, res) => {
      if (err) {
        console.log(err);
      } else {
        t.deepEqual(res, expected, "Should return an array representing a wishlist.");
        t.end();
      }
    });
  });
})

//Testing reserving the gifts query
tape('reserves the gifts a user chose and submitted', (t) => {
  runDbBuild((err, res) => {
    const expected = [{
      'res_id': 1,
      'rela_id': 1,
      'donor_id': 2
    }];
    reserveGifts('Hasan', 'Saad', [1], (err) => {
      if (err) {
        console.log(err);
      } else {
        databaseConnection.query('SELECT * FROM reservation', (err, res) => {
          if (err) {
            console.log(err);
          } else {
            t.deepEqual(res.rows, expected, 'should add the new reservation');
            t.end();
          }
        })
      }
    });

  })
})

tape('change the reserved proporty for the gift to true when reserving it',(t)=>{
  runDbBuild((err,res)=>{
    const expected = true;
    reserveGifts('Hasan', 'Saad', [1], (err) => {
      if (err) {
        console.log("HERE",err);
      } else {
        databaseConnection.query('SELECT reserved FROM relationship WHERE rela_id = 1', (err, res) => {
          if (err) {
            console.log(err);
          } else {
            t.deepEqual(res.rows[0]['reserved'], expected, 'should update resrved in the relationship for the gift to true');
            t.end();
          }
        })
      }
    });
  })
})
