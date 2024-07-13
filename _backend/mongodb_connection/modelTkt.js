const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    tkt_No:String,
    tkt_Date:Date,
    tkt_Problem:String,
    tkt_FormId:String,
    tkt_Desc:String,
    tkt_Status:String,
    tkt_ResolutionId:String,
    tkt_ReleaseId:String,
    tkt_Priority:String,
});

const ticketPost = mongoose.model('ticketsdata', ticketSchema);
module.exports = ticketPost;