// route .js file

const express = require('express');
const router = express.Router();
const mongoType = require('mongoose').Types;

const gmasterPost = require('../model/e-master.model')

  // get data from the database
// get data from the database
router.get('/', (req, res) => {
    gmasterPost.find()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
      });
  });
  
    // router to handle form submission

   // get data from the database


// router to handle form submission
router.post('/', async(req, res) => {
    try {
        const gmasterdata = new gmasterPost({
            head_name:req.body.head_name,
            tkt_abbr_name:req.body.tkt_abbr_name,
            formId:req.body.formId,
        });
        await gmasterdata.save();
        return res.status(200).json({ message: 'Successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
});

// Update the function  and syntax
  router.put('/:id',async(req,res)=>{
    const {id} = req.params;
     try{
      if(mongoType.ObjectId.siValid(id)){
        const updateGmaster = await gmasterPost.findByIdAndUpdate(id,req.body,{new:true});
        if(updateGmaster){
            res.send(updateGmaster)
        }else{
            res.status(400).send('Gmaster not found')
        }
        
      }
     }catch(err){
     res.status(500).send({Message:"Internal error"})
     }
  });
// get data by id 
router.get('/:id',async(req,res)=>{
    try{
        const id= req.params;
        if(mongoType.isObjectIdOrHexString.siValid(id)){
            const gmaster = await gmasterPost.findById(id);
            if(gmaster){
                res.send(gmaster);
            }else{
                res.status(404).send('Not Found!');
            }
        }else{
            res.status(500).send('Internal Server Error');
        }

    }catch(err){
   res.status(500).send({message:'internale error'});
    }
});

// get data on the base of database and searchtext
// Assuming you have already defined your router and imported the necessary modules
router.get('/', async (req, res) => {
  try {
    const { database } = req.params;
    const { search } = req.query;

    // Perform a case-insensitive search for head_name and tkt_abbr_name
    const results = await gmasterPost.find({
      $or: [
        { head_name: { $regex: search, $options: 'i' } },
        { tkt_abbr_name: { $regex: search, $options: 'i' } }
      ]
    });

    res.status(200).json(results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;




