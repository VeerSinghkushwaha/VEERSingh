const mongoose = require('mongoose');
const imgSchema = new mongoose.Schema({
  imgfile:String,
  tkt_No:String,
  
},{versionKey:false});
const imgPost = mongoose.model('imagedata', imgSchema);
module.exports = {imgPost};
