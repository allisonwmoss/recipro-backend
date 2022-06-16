const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: { type: String, require: true },
    ingredients: [String],
    prepMinutes: Number,
    difficultyLevel: Number,
    recipeTags: [String]

}, { timestamps: true })

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe;