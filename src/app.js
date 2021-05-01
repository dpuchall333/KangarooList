
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
app.use(bodyParser.json()); 
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
   //res.render("Made it");
    //if user is signed in --> homepage is changed
  if(req.session.user){
      KangarooList.find({username:req.session.user.username},function(err, kangarooLists){
          if(err){
              console.log(err);
          }  
          
          res.render('home',{ list: kangarooLists, username:req.session.user.username})
         
      });/*
      Page.find({},function(err,pages){
          if(err){
              console.log(err);
          }
          res.render('home',{pages: pages});
      });*/
      
      //username: req.sesssion.user.username,
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
        res.redirect('/');
    }
});

app.post('/create/page',function(req,res){
    if(req.session.user.username){
      /*  KangarooList.find({},function(err, kangarooLists){
            if(err){
                console.log(err);
            }
            res.send('create-page',{ list: kangarooLists})
        });*/
       
       const note =  new Note({
            content: req.body.description,
            date: new Date(),
            page_name: req.body.pageName
        });
        note.save(function(err){
             if(err){
                 res.render('create-page',{'message':'Error saving note, try again'});
             }
             
        });

       const p =  new Page({
            //username:  req.session.user.username, //req.session.user.username, 
            list_name: req.body.listName,
            //university: req.body.uni,
            shared: req.body.shared.value,
            page_name: req.body.pageName, 
            url: req.body.url,
            id : req.session.user._id

        })
        p.save(function(err){
            if (err){
                
                res.render('create-page',{'message': 'Error saving page, try again'});
            }
            else{
                res.render('create-page', {'message': 'Successfully Created Page'});
                //res.redirect('/index');
            }

           
        });

       KangarooList.findOneAndUpdate(
           {list_name: req.body.listName},
           {$push:{pages:p }},
           function (err, success){
               if(err){
                   console.log(err);
               }
               else{
                    console.log(success);
               }
           })
       
           Page.findOneAndUpdate(
            {page_name: req.body.pageName},
            {$push:{notes:note }},
            function (err, success){
                if(err){
                    console.log(err);
                }
                else{
                     console.log(success);
                }
            })

    }
    else{
       res.redirect('/');
    }
});

app.get('/page/:slug',(req,res)=>{
if(req.session.user){
    Page.findOne({slug: req.params.slug}, function(err,page){
        Note.findOne({page_name: page.page_name},function(err,notes){
        User.findOne({'_id':page.id},function(err,user){
            
            res.render('mypages',{
                page_name: page.page_name,
                list_name: page.list_name,
                shared: page.shared.value,
                url: page.url,
                slug: page.slug,
                notes: notes.content,
                date: notes.date
                
            });

            if (err){
                console.log(err);
            }
        })
    });
    });
}
else{
    res.redirect('/');
}
});

app.get('/create/list',function(req,res){
    if(req.session.user){
        res.render('create-list',{}); 
    }
    else{
        res.redirect('/');
    }
});

app.post('/create/list',function(req,res){
    if(req.session.user.username){
        
        new KangarooList({
            username:  req.session.user.username, //req.session.user.username, 
            list_name: req.body.listName,
            date: new Date(),
            shared: req.body.shared,
            //page_name: req.body.pageName, 
           header: req.body.header,
            id : req.session.user._id

        }).save(function(err){
            if (err){
                res.render('create-list',{'message': 'Error saving list, try again'});
            }
            else{
                res.render('create-list', {'message': 'Successfully Created List'});
                //res.redirect('/index');
            }
        });

        User.findOne({username: req.session.user.username},function(err,current){
            KangarooList.findOneAndUpdate(
                {list_name: req.body.listName},
                {$push:{university:current.university}},
                function (err, success){
                    if(err){
                        console.log(err);
                    }
                    else{
                         console.log(success);
                    }
                })
        })


    }
    else{
        res.redirect('/');
    }
});

app.get('/list/:slug',(req,res)=>{
    if(req.session.user.username){
    KangarooList.findOne({slug: req.params.slug}, function(err,list){
        User.findOne({'_id':list.id},function(err,user){
            Page.find({'list_name':list.list_name}, function(err, page){
                res.render('myLists',{

                username:list.username,
                 title: list.list_name,
                //university: user.university,
                //shared: page.shared,
                pages: page,
                  
                //url: page.url,
                //notes: page.content,
             });

            if (err){
                console.log(err);
            }
        })
        });
    });
    }
    else{
        res.redirect('/');
    }

});

app.get('/create',function(req,res){
    if(req.session.user.username){
    res.render('create');
    }
    else{
        res.redirect('/');
    }
})




app.get('/createAccount',(req,res)=>{
    res.render("createAccount");
});

app.post('/createAccount', (req, res) => {

    function errorCB(errObj){
        res.render("createAccount",{message:errObj.message});
          console.log("Could not Create Account");
    }

    function successCB(user){
        auth.startAuthenticatedSession(req, user, function(){    
            console.log("Account created");
            res.redirect('/');
        });
    }
    auth.createAccount(req.body.username, req.body.email, req.body.password, errorCB, successCB);
  
});

app.get('/login',(req,res)=>{
    res.render('login');
});

app.post('/login',(req,res)=>{
    auth.login(req.body.username, req.body.password, function errorCallback(errObj){
        res.render('login',{message: errObj.message});
    }, function successCallback(user){
        auth.startAuthenticatedSession(req, user, function cb(){
            res.redirect('/');
        });
    });
});

//FORUM - AJAX Based


app.get('/forum',(req,res)=>{
 if(req.session.user){
        KangarooList.find({shared:true},function(err,list){
            if(err){
                console.log(err);
            }
            if((req.query.username==='' || req.query.username === undefined) && (req.query.university==='' || req.query.university===undefined)){
                res.render('forum',{list:list});
            }
            if(req.query.university && req.query.username){
                const allfilter = list.filter(l => l.username === req.query.username);
                const newfilter = allfilter.filter(e => e.univerisity === req.query.univeristy);
                const newmessage = req.query.username + " "+ req.query.university;
                res.render('forum',{message: newmessage , list: newfilter});
            }
            if(req.query.username){ 
                const filteredLists = list.filter(l => l.username === req.query.username);
                res.render('forum',{message: req.query.username, list: filteredLists});
            }
            if(req.query.university){
                const filteredLists2 = list.filter(l => l.university === req.query.university);
                res.render('forum',{message: req.query.university, list: filteredLists2});
            }
            /*if(req.query.sort){
                 list.sort({date:-1}).exec(function(err,items){
                    res.render('forum',{message:"Sorted By Date",list:items});
                        });
                    }   */
            else{
                res.render('forum',{list:list});
            }
        });
 }
    else{
        res.redirect('/');
    }

});


//Profile Section 
app.get('/profile',(req,res)=>{
   const username = req.session.user.username;
    res.redirect('/profile/'+username);
    res.render('profile');
})


app.get('/profile/:username',(req,res)=>{
    if(req.session.user.username){
    User.findOne({username: req.params.username},function(err,user){
        KangarooList.find({username:req.session.user.username},function(err,lists){
            if(err){
                console.log(err);
            }
            res.render('profile',{
                username : user.username,
                university: user.university,
                email:user.email,
                list: lists,
                topics:user.topics,
            });
        });
    });

    }
    else{
        res.redirect('/');
    }
});

app.get('/editProfile',function(req,res){
    if(req.session.user.username){
        res.render('editProfile',{}); 
    }
    else{
        res.redirect('/');
    }
});

app.post('/editProfile',function(req,res){
    if(req.session.user.username){
     
       User.findOneAndUpdate(
           {username: req.session.user.username},
           {$push:{university:req.body.university, topics: req.body.topics}},
           function (err, success){
               if(err){
                   console.log(err);
               }
               else{
                    console.log(success);
                    res.redirect('/');
               }
           })
       
          
    }
    else{
       res.redirect('/');
    }
});
app.listen(process.env.PORT || 3000);
