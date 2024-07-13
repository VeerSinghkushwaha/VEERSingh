const mongoose = require('mongoose');
mongoose.set('strict', true);
// user online function
const session = require('express-session');
//const MongoDBStore = require('connect-mongodb-session')(session);

// const MyUrl='mongodb://localhost:27017/GofleetData';
const myoriginalUrl = 'mongodb+srv://Veeru:VEer1994@atlascluster.3hux6uo.mongodb.net/GofleetData';
mongoose.connect(myoriginalUrl,{
   //Transport Layer Security Protocols/ Security Socket Layer;
   tls: true,
   tlsAllowInvalidCertificates: false
});
// const mydublicateUrl = 'mongodb+srv://Veer:VEer1994@atlascluster.deaiz4h.mongodb.net/GofleetData'
//  mongoose.connect(mydublicateUrl);



 mongoose.connection.on('error',(err)=>{
    console.log('connection is error',err);

 });

 mongoose.connection.once('open',(res)=>{
    console.log('Connection is Successful to mongodb');
    console.log(res)
 });

//  // Setup session store
//  const store = new MongoDBStore({
//      uri:myoriginalUrl,
//      collection: 'sessions'
//  });

//  // Catch errors
//  store.on('error', function(error) {
//    console.log(error);
//  });




 module.exports = {mongoose};
