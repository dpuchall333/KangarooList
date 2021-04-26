const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const User = mongoose.model('User');
const saltRounds = 10; 

function createAccount(username, email, password, errorCallback, successCallback) {
  if (username.length < 8  ){ 
    //Username and Password input are less than 8 characters
    const errObj = {message:"Username is too short. Must be 8 characters long."};
    console.log(errObj.message); 
    errorCallback(errObj);
  }
  else if (password.length < 8){
    const errObj = {message:"Password is too short. Must be 8 characters long."};
    console.log(errObj.message); 
    errorCallback(errObj);
  }
  else{
    //See if user is already registered
    User.findOne({username: username},function(err, result) {
      if(result){
        //Username is found in data base --> Already Exists
       const errObj = {message: "Username already exists"} ; 
        console.log(errObj.message);
        errorCallback(errObj);
      }
      else{
        //Username Does not Exist
        //Create new User
      
          bcrypt.hash(password,saltRounds,function(err,hash){
           
            new User({
              username: username,
              email: email,
              password: hash,
          }).save(function(err,user){
            if(err){
             const errObj = {message: "DOCUMENT SAVE ERROR"};
             console.log(errObj.message);
             errorCallback(errObj);
            }
            else{
            successCallback(user);
            }
          });

          });

      }
      
    });
  } 
}


function login(username, password, errorCallback, successCallback) {
  User.findOne({username: username}, (err, user)=>{
    if (!err && user){
      //compare with form password!
      bcrypt.compare(password, user.password, (err,passwordMatch)=>{
        //regenerate session if passwordMatch is true
      
        if(passwordMatch){
          successCallback(user);
        }
        else{
          //Passwords do not match
          const errObj = {message: "PASSWORDS DO NOT MATCH"};
          console.log(errObj.message);
          errorCallback(errObj);
        
        }
       
      });

    
    }
   else{
     //Use error callback if user is not found
      console.log(err);
      const errObj = {message: "USER NOT FOUND"};
      console.log(errObj.message);
      errorCallback(errObj);
    }
  });
}

function startAuthenticatedSession(req, user, cb) {
  //Assume user is user retrieved from database

  req.session.regenerate((err)=>{
    if(!err){
     req.session.user = user;
    cb();
    }
    else{
      //log out errorcall callback with error
      console.log(err);
      cb(err);
    }
  });
}

module.exports = {
  startAuthenticatedSession: startAuthenticatedSession,
  createAccount:createAccount,
  login: login
};