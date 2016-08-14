DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gallery1 CASCADE;
DROP TABLE IF EXISTS gallery2 CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE gallery1 (
  user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
  collecID VARCHAR(100),
  hex VARCHAR (100)
);

CREATE TABLE gallery2 ()
  collecID2 VARCHAR (100),
  hex2 VARCHAR (100),
  collecID3 VARCHAR (100),
  hex3 VARCHAR (100),
  collecID4 VARCHAR (100),
  hex4 VARCHAR (100),
  collecID5 VARCHAR (100),
  hex5 VARCHAR (100)
);


INSERT INTO users (email, password_digest) VALUES ('me@mail', 'npass');
INSERT INTO users (email, password_digest) VALUES ('bob@mail', 'bpass');
INSERT INTO users (email, password_digest) VALUES ('john@mail', 'jpass');
INSERT INTO users (email, password_digest) VALUES ('pete@mail', 'ppass');
INSERT INTO users (email, password_digest) VALUES ('annalisa@mail', 'apass');

INSERT INTO gallery1 (user_id, collecID) VALUES (1, 'NG-2010-40');

UPDATE gallery1 set hex = '#080808#9B947A#6F5B37#8F7B50#493221#C1AF70' WHERE
collecID = 'NG-2010-40';

-- user_id = 1;
-- (user_id, collecID, hex) VALUES (1, 'NG-2010-40', '#080808#9B947A#6F5B37#8F7B50#493221#C1AF70')
