//make the schema
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userShcema = new mongoose.Schema({
    roleName:String,
    loginId:String,
    tenantId:String,
    role:String,
    password:String,
    isActive:Boolean,

   // online: { type: Boolean, default: false }
},{versionKey:false});

// // Password hashing
userShcema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(2);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
// Password comparison
userShcema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
  };

const userPost = mongoose.model('usersdata', userShcema);



module.exports =  userPost;
