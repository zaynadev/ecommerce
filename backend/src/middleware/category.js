const Category = require('./../models/category');

exports.getOneCategory = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err || !category)
            return res.status(404).json('Category not found!');
        req.category = category;
        next();
    })
}