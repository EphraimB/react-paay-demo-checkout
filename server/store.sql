CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_title varchar(128) NOT NULL,
    product_description varchar(2048) NOT NULL,
    product_price money NOT NULL
);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username varchar(64) NOT NULL,
    password varchar(512) NOT NULL,
    is_admin integer NOT NULL
);

CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    user_id integer NOT NULL REFERENCES users(user_id),
    product_id integer NOT NULL REFERENCES products(product_id)
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
