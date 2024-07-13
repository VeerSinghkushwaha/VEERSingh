const express = require('express');
const  router = express.Router();
const mongoType = require('mongoose').Types;
const ticketPost = require('../model/tkt_model.js');
// rother file function
const duration1 = require('../OtherFunction/timefunction')

// get data
router.get('/', (req, res) => {
    ticketPost.find()
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        console.error(err);
        res.status(400).send('Internal Server Error');
      });
  });

 // post the data in the data base
 router.post('/', async(req, res) => {
  try {
    const ticket = new ticketPost({
      tkt_No: req.body.tkt_No,
      tkt_Date: req.body.tkt_Date,
      tkt_Problem: req.body.tkt_Problem,
      tkt_FormId: req.body.tkt_FormId,
      tkt_Desc: req.body.tkt_Desc,
      tkt_Status: req.body.tkt_Status,
      tkt_ResolutionId: req.body.tkt_ResolutionId,
      tkt_ReleaseId: req.body.tkt_ReleaseId,
      tkt_Priority: req.body.tkt_Priority,
      tkt_Assign: req.body.tkt_Assign,
      tkt_TenantId: req.body.tkt_TenantId,
      OS: req.body.OS,
    });

    if(ticket){
      console.log(ticket,'ticketpostdata',ticket.save())

      const saveticket = await ticket.save()
      res.send(saveticket);
      console.log(saveticket,'mongodb saavetickts');
    }else{
      res.status(400).send({message:'Not Found'})
    }

  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate key error
      console.error('Duplicate key error:', error.keyValue);
    } else {
      // Handle other errors
      console.error('Error:', error);
    }
  }
});


// update the ticket
router.put('/:id',async(req,res)=>{
   const {id} = req.params;

try{
  if(mongoType.ObjectId.isValid(id)){
    const tktUpdate = await  ticketPost.findByIdAndUpdate(id,req.body,{new :true});
    if(tktUpdate){
      res.send(tktUpdate)
    }
  }else{
    res.status(400).send('Ticket not found')
  }
}
 catch (err) {
  console.error(err);
  res.status(500).send('Internal Server Error');
}
});

// delete by id
router.delete('/delete/:id', async(req,res)=>{


})
 // get data by id
 router.get('/:id', async(req, res) => {
    try {
      if (mongoType.ObjectId.isValid(req.params.id)) {
        const Updatetkt = await ticketPost.findById(req.params.id);
        if (Updatetkt) {
          res.send(Updatetkt);
        } else {
          res.status(404).send('Ticket not found');
        }
      } else {
        res.status(400).send('Not Found!');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

  // get the ticket the by name  and id

  router.get('/:Assign'), async(req,res)=>{

    try {
      if (mongoType.ObjectId.isValid(req.params.tkt_Assign)) {
        const tktAssign = await ticketPost.findById(req.params.tkt_Assign);
        if (tktAssign) {
          res.send(tktAssign);
        } else {
          res.status(404).send('Ticket not found');
        }
      } else {
        res.status(400).send('Invalid ticket ID');
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  }

  // time duration or show time
// Endpoint to get the current duration for a specific ticket
router.get('/:tkt_No', async (req, res) => {
  try {
    const ticketId = req.params.tkt_FormId;
    const ticket = await ticketPost.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: 'Ticket not found' });
    }

    const ticketDate = new Date(ticket.tkt_Date);
    const now = new Date();
    const durationMs = now - ticketDate;

    const minutes = Math.floor(durationMs / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    res.json({
      minutes: minutes % 60,
      hours: hours % 24,
      days: days,
      tkt_Date: ticket.tkt_Date
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching duration', error });
  }
});



// time duration function
router.get('/:tkt_FormId', async (req, res) => {
  try {
    const items = await ticketPost.find({});
    const now = new Date();
    const itemsWithDurations = items.map(item => {
      const duration = duration(now - new Date(item.createdAt));
      return { ...item.toObject(), duration };
    });
    res.json(itemsWithDurations);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
  module.exports = router;
