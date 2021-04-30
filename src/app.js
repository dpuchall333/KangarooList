
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
const Post = mongoose.model('Post'); 

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
            data: new Date(),
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
            shared: req.body.shared,
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
                shared: page.shared,
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
        console.log(req.session);
        new KangarooList({
            username:  req.session.user.username, //req.session.user.username, 
            list_name: req.body.listName,
            //university: req.body.uni,
            shared: req.body.status,
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


//Repeat for create List


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
    //res.redirect("register");
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
        KangarooList.find({},function(err,list){
            if(err){
                console.log(err);
            }
            res.render('forum',{ 
                list:list
            });
        });
    }
    else{
        req.redirect('/');
    }
    
   /* const p = new Post({
        title: req.body.title,
        list_name: req.body.list_name,
        author: req.session.user.username,
        university: req.session.user.university,
        comment: req.body.comment

    });

    p.save((err,post)=>{
         if (err){
             console.log(err);
         }
         else{
              res.json(post);
         }
    });*/
});
/*
app.get('/forum/:id/comments/', (req, res)=>{ 
    Post.findByIdAndUpdate(req.params['id'],{
        "$push":{ 
            comment: req.body['comment']
        }
    }, (err, docs)=>{
        if(err){
            res.json({
                "error": "Comment was not added, try again"
            });
        }else{
            res.json({
                "message": "Update to comments succcesful",
                "docs": docs
            });
        }
    });
});
*/
app.get('/forum',(req,res)=>{
    Post.find({}, function (err, post){
        res.render('forum');
        //res.json({err,post});
    })

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
            });
        });
    });

    User.findOneAndUpdate(
        {username: req.session.user.username},
        {$push:{university:req.body.university }},
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

app.listen(process.env.PORT || 3000);
