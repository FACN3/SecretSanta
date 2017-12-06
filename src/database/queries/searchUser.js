const databaseConnection = require('../db_connection.js');

const searchUser = (firstName, lastName, cb) => {

  databaseConnection.query('SELECT item AS gifts , reserved , b.rela_id  FROM (SELECT users.first_name , users.last_name , gifts.item , relationship.reserved ,relationship.rela_id FROM relationship INNER JOIN users ON users.user_id = relationship.user_id INNER JOIN gifts ON gifts.gift_id = relationship.gift_id) b WHERE b.first_name = $1 AND b.last_name = $2',
  [firstName,lastName],
  (err, res) => {
    if (err) {
      cb(err);
    } else {
      console.log("Result 1: ", res.rows);
      cb(null, res.rows);
    }
  });
};

module.exports = searchUser;
