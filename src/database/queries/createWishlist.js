const dbConnect = require('../db_connection.js');

// Takes 2 strings as first and last name, an array for the wishlist and a callback.
const createWishlist = (first_name, last_name, wishlist, callback) => {
  // console.log(1);
  dbConnect.query(
    'INSERT INTO users (first_name, last_name) SELECT $1, $2 WHERE NOT EXISTS (SELECT first_name, last_name FROM users WHERE first_name=$1 AND last_name=$2)',
    [first_name, last_name],
    (err, res) => {
      if (err) {
        console.log(2, err);
      }
      else {
        // console.log(3);
        let user;
        dbConnect.query(
          'SELECT user_id FROM users WHERE first_name=$1 AND last_name=$2',
          [first_name, last_name],
          (err, res) => {
            if (err) {
              console.log(4, err);
              return callback(err);
            }
            else {
              // console.log(5);
              user = JSON.stringify(res.rows[0].user_id);

              wishlist.forEach((item) => {
                console.log(item);
                const u = user; //Needed??

                dbConnect.query(
                  'INSERT INTO gifts (item) SELECT $1 WHERE NOT EXISTS (SELECT item FROM gifts WHERE item=$1)',
                  [item],
                  (err, res) => {
                    if (err) {
                      console.log(6);
                      return callback(err);
                    }
                    else {
                      // console.log(7);
                      dbConnect.query(
                        'INSERT INTO relationship (user_id, gift_id) VALUES($1, (SELECT gift_id FROM gifts WHERE item=$2))',
                        [user, item],
                        (err, res) => {
                          if (err) {
                            console.log(8);
                            return callback(err);
                          }
                          else {
                            console.log(`${item} added to wishlist`);
                          }
                        }
                      )//end of relationship query
                    }//end else
                  }
                )//end gift query
              });//end forEach
            }
          }
        );//end of user query.
        callback(null, 'New wishlist created.');
      }//end else
    }
  );
};

module.exports = createWishlist;
