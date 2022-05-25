const Categorie = require('./../models/category');
const Joi = require('joi');
const _ = require('lodash');

exports.createCategory = (req, res) => {
    const category = new Categorie(req.body);
    category.save((err, category) => {
        if(err) return res.status(400).json({error: 'Bad request!'});

        res.json({category})
    });
}

exports.editCategory = (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
    });
    const { error } = schema.validate();
    if(error)
        return res.status(400).json({error: error.details[0].message}) 

    const category = req.category;
    category = _.extend(category, req.body);

    category.save((err, category) => {
        if(err) return res.status(400).json({error: 'Bad request!'});

        res.json({category})
    });
}

exports.getCategory = (req, res) => {
    res.json({category: req.category});
}

exports.getAllCategories = (req, res) => {
    Categorie.find().exec((err, categories) => {
        if(err) return res.status(500).json(err);
        res.json(categories);
    });
}

exports.deleteCategory = (req, res) => {
    const category = req.category;
    category.remove((err, category) => {
        if(err) return res.status(404).json({error: "Product not found"});
        res.status(204).json({});
    });
}