
// api_routes path 

const express = require('express');
const router = express.Router();
const mongType = require('mongoose').Types;
//const ticketPost = require('../mongodb_connection/modelTkt')
const userPost = require('../mongodb_connection/model.js');


// get user data from the database 

router.get('/', (req,res)=>{
    userPost.find()
    .then(data=>{res.send(data)})
    .catch(err =>{
        res.status(400).send('internal error',err);
        console.log(err)
    });
});

// // get ticket data from the data
// router.get('/ticketsdata', (req,res)=>{
//     ticketPost.find()
//     .then(data=>{res.send(data)})
//     .catch(err=>{
//         res.status(400).send('internal error',err)
//     });
// });

// insert the data into the database

router.post('/', (req, res)=>{
    let users = new userPost({
        roleName: req.body.roleName,
        loginId:req.body.loginId,
        tenantId:req.body.tenantId,
        role:req.body.role,
        password:req.body.password,
        isActive:req.body.isActive,
    });
    users.save()
    .then(savedUser=>{
        console.log(savedUser);
        res.send(savedUser);
    })
    .catch(err=>{
        res.status(400).send('bad request or internal err', err)
    });
  
});

// router.post('/ticketsdata', (req, res)=>{

//   // send the tickets data in mongodb
//   let tickets = new ticketPost({
//     tkt_No:req.body.tkt_No,
//     tkt_Date:req.body.tkt_Date,
//     tkt_Problem:req.body.tkt_Problem,
//     tkt_FormId:req.body.tkt_FormId,
//     tkt_Desc:req.body.tkt_Desc,
//     tkt_Status:req.body.tkt_Status,
//     tkt_ResolutionId:req.body.tkt_ResolutionId,
//     tkt_ReleaseId:req.body.tkt_ReleaseId,
//     tkt_Priority:req.body.tkt_Priority,
//  });
//  tickets.save()
//  .then(savedTickets =>{
//    res.send(savedTickets);
//  })
//  .catch(err=>{
//     res.status(500).send('bad request or internal err',err);
//  });


// });

//get data from the database by Id

router.get('/:id',(req, res)=>{
    if(mongType.objectId.isValid(req.params.id)){
        userPost.findById(req.params.id, (err,userdata)=>{
            if(err){
                console.log('internal error', err)
            }else{
                res.send(usersdata)
            }
        })
    }
});

// router.get('/ticketsdatas/:id',(req,res)=>{
//     if(mongType.objectId.isValid(req.params.id)){
//         ticketPost.findById(req.params.id, (err,ticketdata)=>{
//             if(err){
//                 console.log('internal error', err)
//             }else{
//                 res.send(ticketdata)
//             }
//         });
//     }
// });

//export the router 
module.exports = router;