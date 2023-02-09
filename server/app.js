const express = require('express');
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require("cors");
const passport = require('./passport');
const pool = require("./db");
const dotenv = require('dotenv');
const port = 5001;

const app = express();

dotenv.config({ override: true });

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(express.json());

app.use(session({
  name: "user",
  store: new pgSession({
    pool: pool,
    tableName: 'session'
  }),
  secret: process.env.SESSION_SECRET,
  saveUninitialized: false,
  resave: true,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: false,
    maxAge: 30 * 24 * 60 * 60 * 1000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

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

app.get("/items", (req, res) => {
  console.log(req.session.user_id);
  const user_id = req.session.user_id;
  const query = "SELECT count_query.count, cart.* FROM cart JOIN (SELECT COUNT(*) as count FROM cart WHERE user_id = $1) as count_query ON true WHERE cart.user_id = $1";

  pool.query(query, [user_id], (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    let count = 0;
    let items = [];

    if (result.rows.length > 0) {
      count = result.rows[0].count;
      items = result.rows.map((row) => row);
    }

    return res.json({ count, items });
  });
});

app.post('/login', passport.authenticate("local"), (req, res) => {
  // const { username, password } = req.body;

  console.log(req.session);

  res.json({ message: "User logged in successfully" });

  // if (password == null) {
  //   return res.sendStatus(403);
  // }

  // try {
  //   const data = await pool.query("SELECT * FROM users WHERE username = $1",
  //     [username]
  //   );

  //   if (data.rows.length === 0) {
  //     return res.sendStatus(403);
  //   }

  //   const matches = bcrypt.compareSync(password, data.rows[0].password);
  //   if (!matches) {
  //     return res.sendStatus(403);
  //   }

  //   req.session.user_id = data.rows[0].user_id;
  //   req.session.username = data.rows[0].username;
  //   req.session.isAdmin = data.rows[0].is_admin;
  //   req.session.save();
  // } catch (e) {
  //   console.error(e);
  //   return res.sendStatus(403);
  // }
});

app.get('/user', async (req, res) => {
  try {
    console.log(req.session.user_id);
    const userLoggedIn = {
      id: req.session.user_id || 0,
      username: req.session.username || "guest",
      isAdmin: req.session.isAdmin || 0,
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

module.exports = app;