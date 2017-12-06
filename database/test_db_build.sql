BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gifts CASCADE;
DROP TABLE IF EXISTS relationship CASCADE;
DROP TABLE IF EXISTS reservation CASCADE;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

INSERT INTO users (first_name, last_name) VALUES
  ('Mynah', 'Marie'),
  ('Hasan', 'Saad'),
  ('Sophie', 'Lim');

CREATE TABLE IF NOT EXISTS gifts (
  gift_id SERIAL PRIMARY KEY,
  item TEXT NOT NULL
);

INSERT INTO gifts (item) VALUES
  ('plane ticket'),
  ('chocolate'),
  ('money'),
  ('new car');

CREATE TABLE IF NOT EXISTS relationship (
  rela_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  gift_id INTEGER NOT NULL,
  reserved BOOLEAN DEFAULT FALSE
);


INSERT INTO relationship (user_id, gift_id) VALUES
  (1, 1),
  (2, 4),
  (3, 2),
  (3, 3);


CREATE TABLE IF NOT EXISTS reservation (
  res_id SERIAL PRIMARY KEY,
  rela_id INTEGER NOT NULL,
  donor_id INTEGER NOT NULL
);

COMMIT;
