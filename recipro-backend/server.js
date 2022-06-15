const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const Recipe = require('./models/Recipe')

mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

//import seeds
const seeds = require('./models/seeds')

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//seed route
app.get('/seed-data', (req, res, next) => {
    Recipe.insertMany(seeds)
        .then((res) => console.log(res))
        .catch(next)
    res.send('Seed entries inserted.')
})

app.get('/', (req, res, next) => {
    Recipe.find({})
        .then(entries => res.json(entries))
        .catch(next)
})

const recipesController = require('./controllers/recipes')
app.use('/recipes/', recipesController)

app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`)
})
