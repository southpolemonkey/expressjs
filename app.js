const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path');

const app = express()
const PORT = process.env.PORT || 5000;

// app.set('view engine', 'ejs');
app.set('views', 'static');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose
  .connect(
    'mongodb://localhost:27017/ingredient-generator',
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Use Data Model
const Dish = require('./models/Recipe')
const Menu = require('./models/Menu')

app.get('/', function (req, res) {
    // res.render('index')
    res.sendFile(path.join(__dirname + '/static/index.html'));
});

app.get('/menu', function (req, res) {
    Menu.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found' }));
});

app.post('/menu', function(req, res) {
  console.log(req.body.name);
  console.log(req.body.ingredients);  
  const newDish = new Dish({
        name: req.body.name,
        ingredients: req.body.ingredients
    });
    newDish.save()
    .then(dish => res.redirect('/menu'))
    .catch(err => res.status(404).json( {msg:'error when uploading'}))
});

//add the router
app.use(express.static(__dirname + '/view'));
//Store all HTML files in view folder.


app.listen(PORT, () => console.log(`Ingredient Generator listening on port ${PORT}!`))
