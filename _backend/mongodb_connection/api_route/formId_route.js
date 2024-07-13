const express = require('express');
const router = express.Router();
const mongoType = require('mongoose').Types;
const formIdPost= require('../model/formId_model');
// get data from the database

router.get('/',(req,res)=>{
    formIdPost.find()
    .then(data=>{
      res.send(data);
    })
.catch(err=>{
  res.status(500).send('internet Server Error')
})
});
// post the data in database
router.post('/',(req,res)=>{
  const formDataId = new formIdPost({
     FormName:req.body.FormName,
     FormId:req.body.FormId
  });
  formDataId.save()
  .then(saveformDataId=>{
    res.send(saveformDataId)
  })
  .catch(err=>{
    res.status(500).send(err)
  })
});
// get data by id 
router.get('/:id', async(req,res)=>{
    try{
      if(mongoType.ObjectId.isValid(req.params.id)){
        const formid = await formIdPost.findById(req.params.id);
        if(formid){
            res.send(formid);
        }else{
            res.status(404).send('Form id get');
        }

      }else{
        res.status(400).send('Internal error')
      }
    }catch(error){
   res.status(500).send('internal error')
    }
});
module.exports = router;