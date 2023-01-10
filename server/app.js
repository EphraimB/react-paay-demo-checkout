const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const crypto = require('crypto');
const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
const port = 5000;

dotenv.config({ override: true });

app.use(cors());
app.use(express.json());

const pool = new Pool({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.get("/products", async (req, res) => {
  try {
      const allProducts = await pool.query("SELECT * FROM products");

      res.json(allProducts.rows);
  } catch (err) {
      console.error(err.message);
  }
});

app.get("/products/:id", async (req, res) => {
  try {
      const { id } = req.params;
      const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);

      res.json(product.rows[0]);
  } catch (err) {
      console.error(err.message);
  }
});

app.post("/products", async (req, res) => {
  try {
      const { product_title, product_description, product_price } = req.body;
      const newProduct = await pool.query("INSERT INTO products (product_title, product_description, product_price) VALUES ($1, $2, $3) RETURNING *",
          [product_title, product_description, product_price]
      );

      res.json(newProduct.rows[0], newProduct.rows[1], newProduct.rows[2]);
  } catch (err) {
      console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`PAAY demo checkout app listening on port ${port}`)
});