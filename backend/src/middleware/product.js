const Product = require('./../models/product');

exports.ProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err || !product) return res.status(400).json({error: "Product not found!"});
        req.product = product;
        next();
    });
    
}