// HANDLING REQ & RES. IN APP.JS
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()

app.use( cors() )

// Connect to MongoDB using connection string
mongoose.connect(`mongodb+srv://arunkudiyal:examplepwd@cluster0.2pssb.mongodb.net/cu_09_db?retryWrites=true&w=majority`)
    .then(console.log('Connected to MongoDB database'))
    .catch(err => console.log(err))

// Use the body-parser middleware
app.use( bodyParser.urlencoded({ extended: false }) )
app.use( bodyParser.json() )

// Managing your routes
const productsRoute = require('./api/routes/products')
app.use('/products', productsRoute)

// Error Handling
app.use( (req, res) => {
    res.status(404).json( {message: 'Resource Not Found!'} )
} )

module.exports = app;