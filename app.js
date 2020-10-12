require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Thought = require('./models/thought');
const methodOverride = require('method-override');

const app = express();
const port = 8000;

mongoose.connect(process.env.dataBaseURI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(result => app.listen(port))
  .catch(err => console.log(err));

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));

// request routers
app.get('/', async (req,res) => {
  try {
    const thoughts = await Thought.find().sort({createdAt: 'descending'});
    res.render('index', {title: "Home", thoughts});
  }
  catch (err) {
    console.log(err);
  }
})

app.get('/new-thought', (req,res) => {
  res.render('newThought', {title: "New Thought"});
})

app.post('/', (req,res) => {
  const thought = new Thought(req.body);
  thought.save()
    .then(response => {
      res.redirect('/');
    })
    .catch(err => {
      console.log(err);
    })
})

app.delete('/:id', async (req,res) => {
  await Thought.findByIdAndDelete(req.params.id)
  res.redirect('/');
})