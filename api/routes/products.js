const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

// import the DB Schema
const Product = require('../models/products')

router.get('/', (req, res) => {
    Product.find()
        .then(result => res.status(200).json( {message: 'Entries from the DB', entries: result} ) )
        .catch(err => res.status(500).json({error: err}))
    
})

router.get('/:productId', (req, res) => {
    if(req.params.productId === 'special') {
        res.status(200).json({message: 'You have a SPECIAL ID'})
    } else {
        res.status(200).json({message: 'You have a ORDINARY ID'})
    }
})

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            res.status(201).json( {message: 'POST to DB', createdProduct: result} )
        })
        .catch(err => res.status(500).json({error: err}))
    
})

router.put('/', (req, res) => {
    res.status(200).json( {message: 'Handling PUT requests to /products'} )
})

router.patch('/', (req, res) => {
    res.status(200).json( {message: 'Handling PATCH requests to /products'} )
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'Handling DELETE requests to /products'} )
})

module.exports = router;