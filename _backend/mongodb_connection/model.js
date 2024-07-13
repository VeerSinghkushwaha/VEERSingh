//make the schema
const mongoose = require('mongoose');

const userShcema = new mongoose.Schema({
    roleName:String,
    loginId:String,
    tenantId:String,
    role:String,
    password:String,
    isActive:Boolean,

});


const userPost = mongoose.model('User', userShcema);
// for the auth

// function getUserDocument(req, res, next) {
//     User.findOne({email: req.user.email}, (err, user) => {
//        if (err || !user) {
//            res.status('400').json({status: 'user-missing'});
//        }
//        req.userDocument = user;
//        next();
//     });
// }

module.exports =  userPost;
    