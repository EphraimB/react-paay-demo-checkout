CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_title varchar(128) NOT NULL,
    product_description varchar(2048) NOT NULL,
    product_price money
);