
let Type;
//using dynamic import module cor.mjs
import('@angular/core').then(module => {
    Type = module.Type;
});

const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    tkt_No:{ type:Number,required:true },
    tkt_Date:Date,
    tkt_Problem:{ type:String,required:true },
    tkt_TenantId:{ type:String,required:true },
    tkt_FormId:{ type:String,required:true },
    tkt_Desc:{ type:String,required:true },
    tkt_Status:{ type:String,required:true },
    tkt_ResolutionId:{ type:String},
    tkt_ReleaseId:{ type:String},
    tkt_Priority:{ type:String,required:true },
    tkt_Assign:{ type:String,required:true },
    OS:{ type:String,required:true }
   // seq:{Type:String,default:0}
},{versionKey:false});


const ticketPost =  mongoose.model('ticketsdata', ticketSchema);
module.exports = ticketPost;