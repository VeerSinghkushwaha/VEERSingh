 const mongoose = require('mongoose');

 const formidmodel = new mongoose.Schema({
    FormId:String,
    FormName:String,
 },{versionKey:false});
 const formIdPost = mongoose.model('formid', formidmodel);
 module.exports = formIdPost;