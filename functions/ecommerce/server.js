require('dotenv').config()
const catalyst = require('zcatalyst-sdk-node')
const express = require('express')
const app = express()

const books = require('./routes/books')
const crm = require('./routes/crm')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  res.status(200).send({
    code: 0,
    status: 'ok',
  })
})

app.use('/books', books)
app.use('/crm', crm)

module.exports = app
