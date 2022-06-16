const express = require('express');
const router = express.Router();

//import model
const Recipe = require('../models/Recipe');

//index
router.get('/', (req, res, next) => {
    Recipe.find({})
        .then(recipes => res.json(recipes))
        .catch(next)
})

//show
router.get('/:id', (req, res, next) => {
    Recipe.findById(req.params.id)
        .then(foundRecipe => res.json(foundRecipe))
        .catch(next)
})

//create
router.post('/', (req, res, next) => {
    Recipe.create(req.body)
        .then(recipe => res.status(200).send(recipe))
        .catch(next);
})

//delete
router.delete('/:id', (req, res, next) => {
    Recipe.findOneAndDelete(
        { _id: req.params.id },
    )
        .then(deletedRecipe => res.status(200).send(deletedRecipe))
})

//update
router.put('/:id', (req, res, next) => {
    Recipe.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true }
    )
        .then(updatedRecipe => res.status(200).send(updatedRecipe))
        .catch(next)
})

module.exports = router;