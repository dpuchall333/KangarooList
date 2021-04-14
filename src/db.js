// is the environment variable, NODE_ENV, set to PRODUCTION? 
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fs = require('fs');
 const path = require('path');
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/dep333';
}

const mongoose = require('mongoose');
const URLSlugs = require('mongoose-url-slugs');
const Schema = mongoose.Schema; 



//User

const User = new Schema ({
    //REQUIRED AT LOGIN: 
    //username: Option provided to either use authentication plug-in OR provide username
    //password: hash provided either by authentication plug in OR user input ( and hased)
    username: String,
    email: String,
    password: {type:String, unique:true, require:true},
    //Other information for "profile", all optional
    univeristy: {type:String, required: false},
    kangaroo_lists: [{type: Schema.Types.ObjectId, ref: 'KangarooList', required:'false'}],
    likes: [{type: Schema.Types.ObjectId, ref: 'Likes', required:'false'}],
});


//Kangaroo List
const KangarooList = new Schema({
    username: [{type: Schema.Types.ObjectId, ref: 'User', required:'true'}],
    university: {type:String, required: false},
    list_name: String,
    pages : [{type: Schema.Types.ObjectId, ref:'Page'}],
    header: String,
    id: [{type: Schema.Types.ObjectId, ref:'UserSchema'}]

});

//Page (Bookmark) in a Kangaroo List
const Page = new Schema({
    username: [{type: Schema.Types.ObjectId, ref: 'User', required:'true'}],
    university: {type:String, required: false},
    list_name: String,
    shared: {type: Boolean, default: false, required: true},
    page_name: String, 
    url: String,
    notes: [{type: Schema.Types.ObjectId, ref:'Note'}],
    id: [{type: Schema.Types.ObjectId, ref:'UserSchema'}]
});

//Notes than can be added to List 
const Note = new Schema({
    content: {type:String, required:false},
    date:{type:Date, required: false}
})

//Use URL Slugs
KangarooList.plugin(URLSlugs('page_name'));

//register models
mongoose.model('User',User);
mongoose.model('KangarooList',KangarooList);
mongoose.model('Page',Page);
mongoose.model('Note',Note);

mongoose.connect(dbconf);