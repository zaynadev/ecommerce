const Product = require('./../models/product');
const formidable = require('formidable');
const fs = require('fs');
const Joi = require('joi');
const _ = require('lodash');

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({error: "Upload faild!"})
        let product = new Product(fields);

        product = _.extend(product, fields);

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.string().required(),
        });

        const { error } = schema.validate();
        if(error)
            return res.status(400).json({error: error.details[0].message}) 
        if(files.photo){
            if(files.photo.size > Math.pow(10, 6)) 
                return res.status(400).json({message: "Image should be less than 1mb!"}) 
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = product.photo.type;
        }
        product.save((err, product) => {
            if(err) return res.status(400).json({message: "Bad request!"})

            res.json({product});
        });
    })
    
}


exports.editProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({error: "Upload faild!"})
        let product = req.product;

        const schema = Joi.object({
            name: Joi.string().required(),
            description: Joi.string().required(),
            price: Joi.required(),
            quantity: Joi.required(),
            category: Joi.string().required(),
        });

        const { error } = schema.validate();
        if(error)
            return res.status(400).json({error: error.details[0].message}) 
        if(files.photo){
            if(files.photo.size > Math.pow(10, 6)) 
                return res.status(400).json({message: "Image should be less than 1mb!"}) 
            product.photo.data = fs.readFileSync(files.photo.filepath);
            product.photo.contentType = product.photo.type;
        }
        product.save((err, product) => {
            if(err) return res.status(400).json({message: "Bad request!"})

            res.json({product});
        });
    })
}

exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, product) => {
        if(err) return res.status(404).json({message: "Product not found!"})
        res.status(204).json({});
    });
}

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    res.json({
        product: req.product
    });
}


exports.getProducts = (req, res) => {
    let sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    let order = req.query.order ? req.query.order : 'asc';
    let limit = req.query.limit ? +req.query.limit : 10;
    Product
        .find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, prodcuts) => {
            if(err) return res.status(404).json({message: "Products not found!"});
            res.json(prodcuts);
        })
        ;
}