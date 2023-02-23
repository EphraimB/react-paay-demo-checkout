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
    user_id integer REFERENCES users(user_id),
    product_id integer NOT NULL REFERENCES products(product_id),
    quantity integer DEFAULT 1 NOT NULL
);

CREATE TABLE orders (
    order_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(user_id),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    confirmed boolean DEFAULT false NOT NULL,
    payment_method varchar(64) NOT NULL,
    phone_number varchar(20) NOT NULL
);

CREATE TABLE order_items (
    item_id SERIAL PRIMARY KEY,
    order_id integer REFERENCES orders(order_id),
    product_id integer NOT NULL REFERENCES products(product_id),
    quantity integer NOT NULL,
    price money NOT NULL
    
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
