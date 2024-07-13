const express = require('express');
const router = express.Router();
const mongoType = require('mongoose').Types;
const {imgPost,counterPost }= require('../model/img_model.js');


import('@angular/animations').then(sequence => {
  // Use the module here
}).catch(err => {
  // Handle the error here
});

// api route
router.get('/',async(req,res)=>{

    imgPost.find()
    .then(data=>{
        res.send(data);
    })
    .catch(err =>{
        res.status(400).send('Internal Server error')
    });
});

router.post('/', async (req, res) => {
  try {
      const imgAdd = new imgPost({
          imgfile: req.body.imgfile,
          tkt_No: req.body.tkt_No,
          
      });
        imgAdd.save();
      res.status(200).send(imgAdd);

     // res.status(200).send(saveImg);
      ;
  } catch (err) {
      console.error(err);
      res.status(400).send('Internal Server Error111');
  }
});

 // get data by id
 router.get('/:id', async (req, res) => {
    try {
      if (mongoType.ObjectId.isValid(req.params.id)) {
        const tktImg = await imgPost.findById(req.params.id);
        if (tktImg) {
          res.send(tktImg);
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
  });

module.exports = router;