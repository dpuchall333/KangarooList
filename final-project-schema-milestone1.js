//Daniela Puchall
//Milestone #1 Kangaroo
const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema; 

//User

const User = new Schema ({
    //REQUIRED AT LOGIN: 
    //username: Option provided to either use authentication plug-in OR provide username
    //password: hash provided either by authentication plug in OR user input ( and hased)
    
    //Other information for "profile", all optional
    univeristy: {type:String, required: false},
    kangaroo_lists: [{type: Schema.Types.ObjectId, ref: 'KangarooList', required:'false'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'Likes', required:'false'}],
});


//Kangaroo List
const KangarooList = new Schema({
    //username: provided by User
    university: {type:String, required: false},
    list_name: {type:String},
    pages : [{type: Schema.Types.ObjectId, ref:'Page'}];
    header: {type:String},

});

//Page (Bookmark) in a Kangaroo List
const Page = new Schema({
    //username:provided by User
    university: {type:String, required: false},
    list_name: {type:String},
    shared: {type: Boolean, default: false, required: true},
    page_name:{ type: String}, 
    url: {type:String},
    notes: [{type: Schema.Types.ObjectId, ref='Note'}],
});

//Notes than can be added to List 
const Note = new Schema({
    content: {type:String, required:false},
    date:{type:Date, required: false}
})

//Use URL Slugs
KangarooList.plugin(URLSlugs('page_name'));