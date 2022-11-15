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
    const productId = req.params.productId
    Product.findById(productId)
        .then(result => res.status(200).json( {message: "Resouce Found", found_entry: result} ))
        .catch(err => res.status(500).json({error: err}))
})

router.post('/', (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    })
    product.save()
        .then(result => {
            res.status(201).json( {message: 'POST to DB', createdProduct: result} )
        })
        .catch(err => res.status(500).json({error: err}))
    
})

router.put('/:id', (req, res) => {
    const productId = req.params.id
    const updatedProduct = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }
    Product.findByIdAndUpdate(productId, updatedProduct)
        .then(result => res.status(203).json( {message: 'Update Successful'}))
        .catch(err => res.status(500).json( {message: 'Server Error', error: err} ))
})

router.patch('/:id', (req, res) => {
    const productId = req.params.id
    const updatedProduct = {
        _id: productId,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    }
    Product.findByIdAndUpdate(productId, updatedProduct)
        .then(result => res.status(203).json( {message: 'Update Successfyl', updatedProduct: result} ))
        .catch(err => res.status(500).json( {message: 'Server Error', error: err} ))
})

router.delete('/', (req, res) => {
    res.status(200).json( {message: 'Handling DELETE requests to /products'} )
})

module.exports = router;