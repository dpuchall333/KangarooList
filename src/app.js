require('./db.js');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get('/',function(req,res){
 res.send('<html><body><h1> Hello, I Made it! </h1></body></html>');
}); 

app.listen(process.env.PORT || 3000);
