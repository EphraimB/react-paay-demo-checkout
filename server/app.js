const express = require('express')
const { Pool } = require('pg')
const app = express()
const port = 5000

const pool = new Pool({
    database: process.env.DATABASE,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
  })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})