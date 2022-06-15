const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
    recipeName: { type: String, require: true },
    ingredients: { type: Array, require: true },
    prepMinutes: { type: Number, require: true },
    difficultyLevel: { type: Number, require: true },
    recipeTags: { type: Array, require: true }
    // owner: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: false,
    // }
})

const Recipe = mongoose.model('Recipe', RecipeSchema)

module.exports = Recipe;