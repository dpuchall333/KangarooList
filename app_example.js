require('./db');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

// enable sessions
const session = require('express-session');
const sessionOptions = {
    secret: 'secret code',
    resave: true,
    saveUninitialized: true
};
app.use(session(sessionOptions));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// body parser setup
app.use(bodyParser.urlencoded({ extended: false }));

// serve static files
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',(req,res){
    //verify user input 
});

app.get('/createAccount',(req,res){
    //create account
})

app.get('/create/page',(req,res){
    res.render('page');
});

app.post('/create/page',(req,res){
    //take in form information from creae/page

});

app.get('/create/List',(req,res){

});

app.post('/create/List',(req,res){
    //use inputs from form to create List
});

app.get('profile',(req,res){
    //display user information 
})
app.post('profile',(req,res){
    //Use a form to take inputs concerning user values (i.e university, interests etc. )
})

app.listen(3000);
