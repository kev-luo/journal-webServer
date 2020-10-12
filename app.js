require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const Thought = require('./models/thought');

const app = express();
const port = 8000;

mongoose.connect(process.env.dataBaseURI, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(result => app.listen(port))
  .catch(err => console.log(err));

app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));

// request routers
app.get('/', (req,res) => {
  res.render('index', {title: "Home"});
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