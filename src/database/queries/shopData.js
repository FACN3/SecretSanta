const databaseConnection = require('../db_connection.js');

const shopData = (first_name, last_name, cb) => {
  databaseConnection.query('SELECT user_id FROM users WHERE first_name=$1 AND last_name=$2', [first_name, last_name],
    (err, res) => {
      if (err) {
        cb(err);
      } else {
        console.log('only res ', res);
        console.log('res ', res.rows[0]);
        if (res.rowCount !== 0) {
          console.log('inside the if ', res.rows);
          databaseConnection.query('SELECT first_name, last_name, item FROM(SELECT bb.first_name, bb.last_name, bb.item, reservation.res_id, reservation.donor_id FROM (SELECT aa.rela_id, aa.first_name, aa.last_name, gifts.item FROM (SELECT users.first_name, users.last_name, relationship.rela_id, relationship.gift_id FROM users INNER JOIN relationship ON users.user_id = relationship.user_id  ) aa INNER JOIN gifts ON aa.gift_id = gifts.gift_id) bb INNER JOIN reservation ON bb.rela_id = reservation.rela_id) cc WHERE cc.donor_id =$1', [ res.rows[0]['user_id']],
            (err, res) => {
              if (err) {
                cb(err);
              } else {
                console.log(res);
                cb(null, res);
              }
            });
        } else {
          console.log('inside the query ', res.rows);
          cb(null, 'USER NOT FOUND');
        }
      }
    });
};

module.exports = shopData;
