const dbConnect = require('../database/db_connection.js');

// Takes 2 strings as first and last name, an array for the wishlist and a callback.
const createWishList = (first_name, last_name, wishlist, callback) => {
  dbConnect.query(
    'INSERT INTO users (first_name, last_name) SELECT $1, $2 WHERE NOT EXISTS (SELECT first_name, last_name FROM users WHERE first_name=$1 AND last_name=$2)',
    [first_name, last_name],
    (err, res) => {
      if (err) {
        return callback(err);
      }
      else {
        callback(null, res);
      }
    }
  );

  const user = dbConnect.query(
    'SELECT user_id FROM users WHERE first_name=$1 AND last_name=$2',
    [first_name, last_name],
    (err, res) => {
      if (err) {
        return callback(err);
      }
      else {
        callback(null, res);
      }
    }
  )

  wishlist.forEach((item) => {
    dbConnect.query(
      'INSERT INTO gifts (item) SELECT $1 WHERE NOT EXISTS (SELECT item FROM gifts WHERE item=$1)',
      [item],
      (err, res) => {
        if (err) {
          return callback(err);
        }
        else {
          dbConnect.query(
            'INSERT INTO relationship (user_id, gift_id) VALUES($1, SELECT gift_id FROM gifts WHERE item=$2))',
            [user, item],
            (err, res) => {
              if (err) {
                return callback(err);
              }
              else {
                console.log(`${item} added to whishlist`);
                callback(null, res);
              }
            }
          )
        }
      }
    )
  });
};
