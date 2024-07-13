const mongoose = require('mongoose');
 
// define schema for Form id collection
const gmaseterSchema = new mongoose.Schema({
     head_name:String,
     tkt_abbr_name: {
      type: String,
      unique: true,
      validate: {
        validator: async function (value) {
          const existingDoc = await this.constructor.findOne({ tkt_abbr_name: value });
          return !existingDoc;
        },
        message: 'tkt_abbr_name must be unique'
      }
    },
    formId:{type:String}
    // formId: {
    //   type: String,
    //   sparse: true, // Allows null values to be unique
    //   unique: true,
    //   // validate: {
    //   //   validator: async function (value) {
    //   //     if ( value === null || value === undefined) {
    //   //       return true; // Allow null values
    //   //     }
    //   //     const existingDoc = await this.constructor.findOne({ formId: value });
    //   //     return !existingDoc;
    //   //   },
    //   //   message: 'formId must be unique1111'
        
    //   // }
    // }
    
    
});

 const emasterPost = mongoose.model('gmasterdata',gmaseterSchema);
  
   module.exports = emasterPost;
   