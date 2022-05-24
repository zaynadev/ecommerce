const Product = require('./../models/product');
const formidable = require('formidable');
const fs = require('fs');
const Joi = require('joi');
const { join } = require('path');

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({error: "Upload faild!"})
        let product = new Product(fields);

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

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    res.json({
        product: req.product
    });

}