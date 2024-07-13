const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const csvmodelPost = require('../model/csv.model');
const { createObjectCsvWriter } = require('csv-writer');

router.get('/api/csv',async(req,res)=>{
 try{   const data = await csvmodelPost.find().lean();
    const csvWriter = createObjectCsvWriter({
        path:'data/csv',
        header:['Ticket data'],

    });
    await csvWriter.writeRecords(data);
    res.download('data.csv');
}catch(error){
    res.status(500).send({message:'error-message'});
}
});
module.exports = router;
