const express = require('express');
const router = express.Router();
const mongoType = require('mongoose').Types;
const messagePost = require('../model/message.model.js');

// get the message the data
router.get('/',(req,res)=>{
    messagePost.find()
    .then(data=>{
        res.send(data)
    })
    .catch(err=>{
        res.status(400).send('Not found',err)
    });
});



// post the message into database
router.post('/',(req,res)=>{
  // let tkt_Date;
  // try {
  //     tkt_Date = new Date(req.body.tkt_Date); // Parse the date string to a Date object
  //     if (isNaN(tkt_Date.getTime())) { // Check if the date is invalid
  //         throw new Error('Invalid date format');
  //     }
  // } catch (err) {
  //     return res.status(400).send({ error: 'Invalid date format' }); // Send a 400 Bad Request if the date is invalid
  // }
    const message1 = new messagePost({
        tkt_FormId:req.body.tkt_FormId,
        tkt_message:req.body.tkt_message,
        tkt_Date:req.body.tkt_Date,
        tkt_Resp:req.body.tkt_Resp,
        send_deve_name:req.body.send_deve_name,
    });
    message1.save()
    .then(saveMessage=>{
       // res.status(200).send('successfully submitted',saveMessage)
       res.status(200).send(saveMessage);
       console.log("Successful")
    })
    .catch(err=>{
      res.status(500).send({ error: 'An error occurred', details: err.message }); // Send a 500 error with details
     console.log("Not Found")
    })

});
//get message by id

router.get('/:id',async(req,res)=>{
// const {id} = req.params.id;
    try{
    if(mongoType.ObjectId.isValid(req.params.id)){
     const messagetkt = await messagePost.findById(req.params.id);
     if(messagetkt){
        res.send(messagetkt);
     }else{
        res.status(400).send('Not Found')
     }
    }else{
        res.status(500).send('Internal Server Error');
    }
    }catch(error){
 res.status(400).send('Not Found',error)
    }
});
module.exports = router;
