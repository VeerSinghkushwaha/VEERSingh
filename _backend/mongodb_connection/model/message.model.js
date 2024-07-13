// Using the dynamic import module cor.mjs

const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    tkt_FormId:String,
    tkt_message:String,
    tkt_Date: {
      type: Date,
      set: function(value) {
          // Custom setter to parse "DD/MM/YYYY" format
          if (typeof value === 'string') {
              const parts = value.split('/');
              if (parts.length === 3) {
                  const day = parseInt(parts[0], 10);
                  const month = parseInt(parts[1], 10) - 1; // Months are zero-indexed
                  const year = parseInt(parts[2], 10);
                  const date = new Date(year, month, day);
                  if (!isNaN(date.getTime())) {
                      return date;
                  }
              }
              throw new Error('Invalid date format');
          }
          return value; // If value is already a Date object or another format, return as is
      }
  },
    tkt_Resp:String,
    send_deve_name:String
},{versionKey:false});

const messagePost = mongoose.model('messagedata', messageSchema);
module.exports = messagePost;

