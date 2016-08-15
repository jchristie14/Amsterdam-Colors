DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS gallery;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password_digest VARCHAR(255)
);

CREATE TABLE gallery (
  user_id INTEGER REFERENCES users(id) NOT NULL UNIQUE,
  picid VARCHAR(100),
  picurl VARCHAR (255),
  hex1 VARCHAR (100),
  hex2 VARCHAR (100),
  hex3 VARCHAR (100),
  hex4 VARCHAR (100),
  hex5 VARCHAR (100),
  hex6 VARCHAR (100),
  hex7 VARCHAR (100),
  hex8 VARCHAR (100)
);




INSERT INTO users (email, password_digest) VALUES ('you@mail', 'npass');
INSERT INTO users (email, password_digest) VALUES ('bob@mail', 'bpass');
INSERT INTO users (email, password_digest) VALUES ('john@mail', 'jpass');
INSERT INTO users (email, password_digest) VALUES ('pete@mail', 'ppass');
INSERT INTO users (email, password_digest) VALUES ('annalisa@mail', 'apass');

INSERT INTO gallery (user_id) VALUES (2);

UPDATE gallery SET picid = 'NG-2010-40' WHERE user_id = 2;

UPDATE gallery SET hex1 = '#080808', hex2 = '#9B947A', hex3 = '#6F5B37' hex4 = '#8F7B50' hex5 = '#493221' hex6 = '#C1AF70' WHERE user_id = 2;

UPDATE gallery SET picid2 = 'AK-RBK-17521-A'  WHERE user_id = 2;

UPDATE gallery SET hex1 = '#3F568F', hex2 = '#E8E6DD' hex3 = '#0B1C51' hex4 = '#B9B08B' hex5 = '#707E7F' hex6 = '#453D37' hex7 = '#9D7941' WHERE user_id = 2;
--end bob

INSERT INTO gallery (user_id) VALUES (3);
--end john
--start pete
INSERT INTO gallery (user_id) VALUES (4);

UPDATE gallery SET picid = 'SK-A-1107' WHERE user_id = 4;

UPDATE gallery SET hex1 = '#603926', hex2 = '#825C40', hex3 = '#9D8963', hex4 = '#CEB842', hex5 = '#D6AB7E', hex6 = '#EFE8A7', hex7 = '#F0DC5C' WHERE user_id = 4;

-- UPDATE gallery SET picid2 = 'RP-P-AO-16-127-4'  WHERE user_id = 4;

-- UPDATE gallery SET hex2 = '#EEEEE5#131311#C6B4A4#C9C318#71849C#623B63' WHERE user_id = 4;

-- UPDATE gallery SET picid3 = 'AK-MAK-1712-B' WHERE user_id = 4;

-- UPDATE gallery SET hex3 = '#F1F1F1#0E0E0E#CABC26#8CB0BC#B02866#5E6B49' WHERE user_id = 4;

-- UPDATE gallery SET picid4 = 'BK-KOG-2567'  WHERE user_id = 4;

-- UPDATE gallery SET hex4 = '#ECEEE8 #656A89 #120F31 #8E95A6 #3A3B5F #C1C6C9' WHERE user_id = 4;

-- UPDATE gallery SET picid5 = 'BK-1999-85'  WHERE user_id = 4;

-- UPDATE gallery SET hex5 = '#ECEEE8 #656A89 #120F31 #8E95A6 #3A3B5F #C1C6C9' WHERE user_id = 4;
--end pete

--collecID = 'NG-2010-40';

-- user_id = 1;
-- (user_id, collecID, hex) VALUES (1, 'NG-2010-40', '#080808#9B947A#6F5B37#8F7B50#493221#C1AF70')
