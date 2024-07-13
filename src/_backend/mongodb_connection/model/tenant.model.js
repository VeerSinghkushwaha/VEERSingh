const mongoose = require('mongoose');

 const tenantmodel = new mongoose.Schema({
    Id:String,
    Name:String,
 },{versionKey:false});
 const tenantPost = mongoose.model('tenant',tenantmodel);
 module.exports = tenantPost;