const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: { type: String, require: true }
}, { timestamps: true })

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe;