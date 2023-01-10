const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
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

// passport.use(new LocalStrategy(function verify(username, password, cb) {
//   db.get('SELECT * FROM users WHERE username = ?', [username], function (err, user) {
//     if (err) { return cb(err); }
//     if (!user) { return cb(null, false, { message: 'Incorrect username or password.' }); }

//     crypto.pbkdf2(password, user.salt, 310000, 32, 'sha256', function (err, hashedPassword) {
//       if (err) { return cb(err); }
//       if (!crypto.timingSafeEqual(user.hashed_password, hashedPassword)) {
//         return cb(null, false, { message: 'Incorrect username or password.' });
//       }
//       return cb(null, user);
//     });
//   });
// })
// );

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

app.put("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_title, product_description, product_price } = req.body;
    const updateTodo = await pool.query("UPDATE products SET product_title = $1, product_description = $2, product_price = $3 WHERE product_id = $4", [product_title, product_description, product_price, id])

    res.json("Product was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query("DELETE FROM products WHERE product_id = $1", [id]);

    res.json("Product was deleted");
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

// app.get('/login',
//   function (req, res, next) {
//     res.render('login');
//   });

// app.post('/login/password',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function (req, res) {
//     res.redirect('/~' + req.user.username);
//   });

app.post('/signup', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    bcrypt.hash(password, 10, async (err, hash) => {
      const newUser = await pool.query("INSERT INTO users (username, password, is_admin) VALUES ($1, $2, $3) RETURNING *",
        [username, hash, 0]
      );
      res.json("Added user");
    });
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(port, () => {
  console.log(`PAAY demo checkout app listening on port ${port}`)
});