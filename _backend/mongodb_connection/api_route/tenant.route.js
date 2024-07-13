const express = require('express');
const router = express.Router();
const mongoType = require('mongoose').Types;
const tenantid = require('../model/tenant.model');

router.get('/',(req,res)=>{
tenantid.find()
.then(data=>{
    res.send(data);
})
.catch(err=>{
    res.status(500).send('internet Server Error',err)
})
});

// post tenant data Id and Name
 router.post('/',(req,res)=>{
    const tenantdata = new tenantid({
        Id:req.body.Id,
        Name:req.body.Name,
    })
    tenantdata.save()
    .then(savetenantdata=>{
        res.send(savetenantdata)
    })
    .catch(err=>{
        res.status(500).send('Internal error',err)
    })
 });

router.get('/:id',async(req,res)=>{
    try{
        if(mongoType.ObjectId.isValid(req.params.id)){
            const tenantid = await tenantid.findByid(req.params.id);
            if(tenantid){
                res.send(tenantid)
            }else{
                res.status(404).send('tenant id not found')
            }
        }else{
            res.status(400).send('Internal error')
        }

    }
    catch(err){
        res.status(500).send('internal error',err)
    }
});

module.exports = router;