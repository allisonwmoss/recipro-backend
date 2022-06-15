const express = require('express');
const recipes = express.Router();

//import database
const Recipe = require('../models/Recipe');

//index
recipes.get('/', (req, res, next) => {
    Recipe.find({})
        .populate('owner')
        .then(recipes => res.status(200).send(recipes))
        .catch(next)
})

//show
recipes.get('/:id', (req, res, next) => {
    Recipe.findById(req.params.id)
        .populate('owner')
        .then(foundRecipe => res.status(200).send(foundRecipe))
        .catch(next)
})

//create
recipes.post('/', (req, res, next) => {
    Recipe.create(req.body)
        .then(Recipe => res.status(200).send(Recipe))
        .catch(next);
})

//delete
recipes.delete('/:id', (req, res, next) => {
    Recipe.findOneAndDelete(
        { _id: req.params.id },
    )
        .then(deletedRecipe => res.status(200).send(deletedRecipe))
        .catch(next)
})

//update
recipes.put('/:id', (req, res, next) => {
    Recipe.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
        .then(updatedRecipe => res.status(200).send(updatedRecipe))
        .catch(next)
})

module.exports = recipes;