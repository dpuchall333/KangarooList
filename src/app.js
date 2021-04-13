const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.listen(3000);