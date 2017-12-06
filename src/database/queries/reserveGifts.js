const databaseConnection = require('../db_connection.js');

const reserveGifts = (first_name, last_name, arr, cb) => {
  databaseConnection.query('SELECT user_id FROM users WHERE first_name=$1 AND last_name=$2', [first_name, last_name],
    (err, res) => {
      if (err) {
        cb(err);
      } else {

        arr.forEach((rela_id) => {
          databaseConnection.query('INSERT INTO reservation (rela_id, donor_id) VALUES ($1, $2)', [rela_id, res.rows[0]['user_id']], (err, res) => {
            if (err) {
              cb(err);
            } else {
              databaseConnection.query('UPDATE relationship SET reserved = TRUE WHERE rela_id=$1', [rela_id], (err, res) => {
                if (err) {
                  cb(err);
                }else{
                  cb(null);
                }
              })
            }

          })
        })

      }
    })
}
 module.exports = reserveGifts;
