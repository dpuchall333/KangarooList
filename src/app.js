
const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
require('./db.js');
const auth = require('./auth.js'); 

const app = express();

const User = mongoose.model('User');
const KangarooList = mongoose.model('KangarooList');
const Page = mongoose.model('Page');
const Note = mongoose.model('Note');

// view engine setup
app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));

//User Object middleware
app.use((req,res,next)=>{
    res.locals.user = req.session.user;
    next();
});

app.get('/',function(req,res){
    //if user is signed in --> homepage is changed
  if(req.session.user){
      KangarooList.find({},function(err, kangarooLists){
          if(err){
              console.log(err);
          }
          res.render('index',{lists: kangarooLists})
      });
    }
    else{
          res.render('index');
      }
}); 

app.get('/create/page',function(req,res){
    if(req.session.user.username){
        res.render('create-page',{}); 
    }
    else{
        res.redirect('login');
    }
});

app.post('/create/page',function(req,res){
    if(req.session.user.username){
       /* new Note({
            content: req.body.content,
            data: req.body.date,
        })*/
        new Page({
            username: req.session.user.username, 
            list_name: req.body.listName,
            university: req.body.uni,
            shared: req.body.status,
            page_name: req.body.pageName, 
            url: req.body.url,
            notes: req.body.content.content,
            id : req.session.user._id

        }),save(function(err){
            if (err){
                res.render('create-page',{'message': 'Error saving page, try again'});
            }
            else{
                res.redirect('/');
            }
        });
    }
    else{
        res.redirect('login');
    }
});


app.get('/page/:slug',(req,res)=>{
    Pages.findOne({slug: req.params.slug}, function(err,page){
        User.findOne({'_id':page.id},function(err,user){
            
            res.render('/mypages',{
                username: user.username,
                list_name: page.list_name,
                university: user.university,
                shared: page.shared,
                page_name: page.page_name,
                url: page.url,
                notes: page.content,
            });

            if (err){
                console.log(err);
            }
        })
    });
});

app.get('/profile/:username',(req,res)=>{
    User.findOne({username: req.params.username},function(err,user){
        KangarooList.find({'id':user._id},function(err,lists){
            if(err){
                console.log(err);
            }
            res.render('user',{
                username : user.username,
                kangarooLists: lists,
            });
        });
    });
});

app.get('/register',(req,res)=>{
    res.render("register");
});

app.post('/register', (req, res) => {

    function errorCB(errObj){
        res.render("register",{message:errObj.message});
          console.log("Could not register");
    }

    function successCB(user){
        auth.startAuthenticatedSession(req, user, function(){    
            console.log("registered");
            res.redirect('/');
        });
    }
    auth.register(req.body.username, req.body.email, req.body.password, errorCB, successCB);
    //res.redirect("register");
});

app.listen(process.env.PORT || 3000);
