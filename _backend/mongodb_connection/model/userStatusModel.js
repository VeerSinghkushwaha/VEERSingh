
let Type;
//using dynamic import module cor.mjs
import('@angular/core').then(module => {
    Type = module.Type;
});
const mongoose = require('mongoose');

const userStatus = new mongoose.Schema({
    roleName:String,
    role:String,
    isOnline:Boolean,
    date:Date,
  Password:String

},{versionKey:false});


const userdata = mongoose.model('loginData', userStatus);
  module.exports = userdata;
