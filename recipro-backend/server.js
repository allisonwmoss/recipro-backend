const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/recipro'
const Recipe = require('./models/Recipe')
require('dotenv').config()

mongoose.connection.on('error', err => console.log(err.message + ' is Mongo not running?'));
mongoose.connection.on('connected', () => console.log('mongo connected'))
mongoose.connection.on('disconnected', () => console.log('mongo disconnected'));

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongoose!!')
});

//import seeds
const seeds = require('./models/seeds')
console.log(`seeds outside the seed route: ${seeds}`)
// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

//seed route
app.get('/seed-data', (req, res, next) => {
    console.log('seed route hit')
    console.log(seeds)
    console.log(Recipe)
    // Recipe.deleteMany({})
    //     .then( () =>)
    Recipe.insertMany(seeds)
        .then((res) => console.log(res))
        .catch(next)
    res.send('Seed recipes inserted.')
})

app.get('/', (req, res, next) => {
    Recipe.find({})
        .then(recipes => res.json(recipes))
        .catch(next)
})

const recipesController = require('./controllers/recipes')
app.use('/recipes/', recipesController)

app.listen(PORT, () => {
    console.log(`✅ PORT: ${PORT} 🌟`)
})
