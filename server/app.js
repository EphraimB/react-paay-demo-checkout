const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const multer = require('multer')
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const cors = require("cors");
const passport = require('./passport');
const pool = require("./db");
const dotenv = require('dotenv');
const bcrypt = require('bcrypt');
const port = 5001;

const app = express();

async function handleNotification(payload) {
  console.log('Received notification:', payload);
  // handle the notification payload here
}

(async () => {
  const client = await pool.connect();
  await client.query('LISTEN message');
  console.log('Listening for notifications on channel_name...');
  client.on('notification', handleNotification);
})().catch(err => console.error(err.stack));

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200
}

const createUploadMiddleware = (getId) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const id = getId(req);
      cb(null, './public/data/uploads/')
    },
    filename: function (req, file, cb) {
      const id = getId(req);
      cb(null, file.fieldname + '-' + id + '.jpg')
    }
  })

  return multer({ storage: storage });
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

dotenv.config({ override: true });

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

app.use(express.static('public'));


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

app.put("/products/:id", createUploadMiddleware((req) => req.params.id).single('product_image'), async (req, res) => {
  try {
    const { id } = req.params;

    const { product_title, product_description, product_price } = req.body;
    const product_image = req.file ? req.file.filename : null;

    const updateTodo = await pool.query("UPDATE products SET product_title = $1, product_description = $2, product_price = $3, product_image = $4 WHERE product_id = $5", [product_title, product_description, product_price, product_image, id])

    res.json("Product was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const product = await pool.query("SELECT * FROM products WHERE product_id = $1", [id]);

    if (product.rows[0].product_image !== null) {
      fs.unlink(`./public/data/uploads/${product.rows[0].product_image}`, async (err) => {
        if (err) {
          console.error(err)
          return
        }
        await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
      });
    } else {
      await pool.query("DELETE FROM products WHERE product_id = $1", [id]);
    }

    res.json("Product was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/products", createUploadMiddleware(() => 0).single("product_image"), async (req, res) => {
  try {
    const { product_title, product_description, product_price } = req.body;
    const product_image = req.file ? req.file.filename : null;

    const newProduct = await pool.query("INSERT INTO products (product_image, product_title, product_description, product_price) VALUES ($1, $2, $3, $4) RETURNING *",
      [product_image, product_title, product_description, product_price]
    );

    const rows = newProduct.rows[0];

    if (product_image !== null) {
      // Edit the file name to include the product id
      const newFileName = product_image.replace('product_image-0', `product_image-${rows.product_id}`);

      fs.rename(`./public/data/uploads/${product_image}`, `./public/data/uploads/${newFileName}`, async (err) => {
        if (err) console.log('ERROR: ' + err);

        const updateProduct = await pool.query("UPDATE products SET product_image = $1 WHERE product_id = $2", [newFileName, rows.product_id]);
      });
    }

    res.json(newProduct.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/items", (req, res) => {
  const user_id = req.session.passport ? req.session.passport.user.user_id : null;
  const char = user_id === null ? "IS NULL" : "= $1";
  let count = 0;
  let items = [];
  let totalPrice = 0;

  pool.query(`SELECT * FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id ${char}`, user_id !== null ? [user_id] : '', (err, result) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (result.rows.length > 0) {
      items = result.rows.map((row) => row);
    }

    pool.query(`SELECT SUM(products.product_price * cart.quantity) FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id ${char}`, user_id !== null ? [user_id] : '', (err, result) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }

      if (result.rows.length > 0) {
        totalPrice = result.rows[0].sum;
      }

      pool.query(`SELECT COUNT(*) FROM cart WHERE user_id ${char}`, user_id !== null ? [user_id] : '', (err, result) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }

        if (result.rows.length > 0) {
          count = result.rows[0].count;
        }

        return res.json({ count, totalPrice, items });
      });
    });
  });
});

app.post("/items", async (req, res) => {
  try {
    const user_id = req.session.passport ? req.session.passport.user.user_id : null;
    const { product_id } = req.body;
    const newItem = await pool.query("INSERT INTO cart (user_id, product_id) VALUES ($1, $2) RETURNING *",
      [user_id, product_id]
    );

    res.status(200).json(newItem.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.put("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    const updateCart = await pool.query("UPDATE cart SET quantity = $1 WHERE cart_id = $2", [quantity, id])

    res.json("Cart was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/item/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteProduct = await pool.query("DELETE FROM cart WHERE cart_id = $1", [id]);

    res.json("Product was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

// Post cart items to orders and order_items tables and delete from cart
app.post("/checkout", async (req, res) => {
  try {
    const user_id = req.session.passport ? req.session.passport.user.user_id : null;
    const char = user_id === null ? "IS NULL" : "= $1";
    let paymentMethod = "Credit Card";
    let confirmed = true;
    let phoneNumber = null;

    // Check if phoneNumber is in req.body. If so, create order with phoneTransaction as payment method and confirmed as false
    if (req.body.phoneNumber) {
      paymentMethod = "phone";
      confirmed = false;
      phoneNumber = req.body.phoneNumber;
    }

    const newOrder = await pool.query("INSERT INTO orders (user_id, confirmed, payment_method, phone_number) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, confirmed, paymentMethod, phoneNumber]
    );

    const order_id = newOrder.rows[0].order_id;

    // Get cart and join with products table to get product price
    const cartItems = await pool.query(`SELECT * FROM cart JOIN products ON cart.product_id = products.product_id WHERE user_id ${char}`, user_id !== null ? [user_id] : '');

    cartItems.rows.forEach(async (item) => {
      const newOrderItem = await pool.query("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4) RETURNING *",
        [order_id, item.product_id, item.quantity, item.product_price]
      );
    });

    const deleteCart = await pool.query(`DELETE FROM cart WHERE user_id ${char}`, user_id !== null ? [user_id] : '');

    res.status(200).json(newOrder.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/orders", async (req, res) => {
  try {
    const user_id = req.session.passport ? req.session.passport.user.user_id : null;
    const char = user_id === null ? "IS NULL" : "= $1";
    let orders = [];

    const userOrders = await pool.query(`SELECT * FROM orders WHERE user_id ${char}`, user_id !== null ? [user_id] : '');

    if (userOrders.rows.length > 0) {
      orders = userOrders.rows.map((row) => row);
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error(err.message);
  }
});

app.post('/login', passport.authenticate("local-login"), (req, res) => {
  res.status(200).json({ message: "User logged in successfully" });
});

app.get('/user', async (req, res) => {
  try {
    const userLoggedIn = {
      id: req.session.passport ? req.session.passport.user.user_id : null,
      username: req.session.passport ? req.session.passport.user.username : "guest",
      isAdmin: req.session.passport ? req.session.passport.user.is_admin : 0,
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