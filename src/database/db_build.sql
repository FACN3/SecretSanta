BEGIN;

DROP TABLE IF EXISTS users, gifts, relationship, reservation CASCADE;

CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS gifts (
  gift_id SERIAL PRIMARY KEY,
  item TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS relationship (
  rela_id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL,
  gift_id INTEGER NOT NULL,
  reserved BOOLEAN DEFAULT FALSE
);

CREATE TABLE IF NOT EXISTS reservation (
  res_id SERIAL PRIMARY KEY,
  rela_id INTEGER NOT NULL,
  donor_id INTEGER NOT NULL
);

COMMIT;
