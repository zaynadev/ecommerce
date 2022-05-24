const Product = require('./../models/product');
const formidable = require('formidable');
const fs = require('fs');

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();

    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
        if(err) return res.status(400).json({error: "Upload faild!"})
        let product = new Product(fields);
        if(files.photo){
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