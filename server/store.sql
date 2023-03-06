CREATE TABLE IF NOT EXISTS products (
    product_id SERIAL PRIMARY KEY,
    product_image varchar(2048),
    product_title varchar(128) NOT NULL,
    product_description varchar(2048) NOT NULL,
    product_price money NOT NULL,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username varchar(64) NOT NULL,
    password varchar(512) NOT NULL,
    is_admin integer NOT NULL,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS cart (
    cart_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(user_id),
    product_id integer NOT NULL REFERENCES products(product_id),
    quantity integer DEFAULT 1 NOT NULL,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS orders (
    order_id SERIAL PRIMARY KEY,
    user_id integer REFERENCES users(user_id),
    created_at timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL,
    confirmed boolean DEFAULT false NOT NULL,
    payment_method varchar(64) NOT NULL,
    phone_number varchar(20),
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP NOT NULL
);

CREATE TABLE IF NOT EXISTS order_items (
    item_id SERIAL PRIMARY KEY,
    order_id integer NOT NULL REFERENCES orders(order_id),
    product_id integer NOT NULL REFERENCES products(product_id),
    quantity integer NOT NULL,
    price money NOT NULL,
    date_created TIMESTAMP NOT NULL,
    date_modified TIMESTAMP NOT NULL
);

CREATE TABLE "session" (
  "sid" varchar NOT NULL COLLATE "default",
  "sess" json NOT NULL,
  "expire" timestamp(6) NOT NULL
)
WITH (OIDS=FALSE);

ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");

-- Trigger to update the date_modified column when a row is updated
CREATE OR REPLACE FUNCTION update_dates()
RETURNS TRIGGER AS $$
BEGIN
    IF (TG_OP = 'INSERT') THEN
        NEW.date_created = current_timestamp;
        NEW.date_modified = current_timestamp;
    ELSIF (TG_OP = 'UPDATE') THEN
        NEW.date_modified = current_timestamp;
    END IF;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE OR REPLACE FUNCTION notify_changes()
RETURNS trigger AS $$
DECLARE
BEGIN
  PERFORM pg_notify('Payment successful', 'Payment is successful');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_dates
BEFORE INSERT OR UPDATE ON products
FOR EACH ROW
EXECUTE PROCEDURE update_dates();

CREATE TRIGGER update_users_dates
BEFORE INSERT OR UPDATE ON users
FOR EACH ROW
EXECUTE PROCEDURE update_dates();

CREATE TRIGGER update_cart_dates
BEFORE INSERT OR UPDATE ON cart
FOR EACH ROW
EXECUTE PROCEDURE update_dates();

CREATE TRIGGER update_orders_dates
BEFORE INSERT OR UPDATE ON orders
FOR EACH ROW
EXECUTE PROCEDURE update_dates();

CREATE TRIGGER update_order_items_dates
BEFORE INSERT OR UPDATE ON order_items
FOR EACH ROW
EXECUTE PROCEDURE update_dates();

CREATE TRIGGER column_change_trigger
AFTER UPDATE OF confirmed ON orders
FOR EACH ROW
EXECUTE FUNCTION notify_changes();