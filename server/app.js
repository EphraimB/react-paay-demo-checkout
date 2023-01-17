const express = require('express');
const app = express();
const cors = require("cors");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const session = require('express-session');
const { Pool, Client } = require('pg');
const dotenv = require('dotenv');
const port = 5000;

dotenv.config({ override: true });

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

const pool = new Pool({
  database: process.env.DATABASE,
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// session store and session config
const store = new (require('connect-pg-simple')(session))({
  pool,
})

app.use(session({
  store: store,
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: false,
  cookie: {
    secure: false,
    httpOnly: false,
    sameSite: false,
    maxAge: 1000 * 60 * 60 * 24,
  },
}));

app.get('/', (req, res) => {
  res.send("<h1 style='text-align: center'>PAAY demo checkout</h1>")
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

app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (password == null) {
    return res.sendStatus(403);
  }

  try {
    const data = await pool.query("SELECT * FROM users WHERE username = $1",
      [username]
    );

    if (data.rows.length === 0) {
      return res.sendStatus(403);
    }

    const matches = bcrypt.compareSync(password, data.rows[0].password);
    if (!matches) {
      return res.sendStatus(403);
    }

    req.session.user = {
      id: data.rows[0].user_id,
      username: data.rows[0].username,
      isAdmin: data.rows[0].is_admin,
    }
    res.send(req.session.connect.sid);
  } catch (e) {
    console.error(e);
    return res.sendStatus(403);
  }
});

app.get('/user', async (req, res) => {
  try {
    const userLoggedIn = {
      id: req.session.user ? req.session.user.id : 0,
      username: req.session.user ? req.session.user.username : "guest",
      isAdmin: req.session.user ? req.session.user.isAdmin : 0,
    }

    res.json(userLoggedIn);
  } catch (err) {
    console.log(err);
  }
});

app.post('/logout', async (req, res) => {
  try {
    await req.session.destroy();
    res.json("Logged out succesfully.");
  } catch (e) {
    console.error(e);
    return res.sendStatus(500);
  }
});

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