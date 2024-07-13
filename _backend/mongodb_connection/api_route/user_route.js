
// api_routes path 

const express = require('express');
const router = express.Router();
const mongType = require('mongoose').Types;

const userPost = require('../model/user_model.js');



// get user data from the database 

router.get('/', (req,res)=>{
    userPost.find()
    .then(data=>{res.send(data)})
    .catch(err =>{
        res.status(400).send('internal error',err);
        console.log(err)
    });
});



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



//get data from the database by Id

router.get('/:id',(req, res)=>{
    if(mongType.objectId.isValid(req.params.id)){
        userPost.findById(req.params.id, (err,userdata)=>{
            if(err){
                console.log('internal error', err)
            }else{
                res.send(userdata)
            }
        })
    }
});

// get data on the base of role, rolename and password
router.get('/', async(req, res) => {
    const { roleName, password, role } = req.query;
    
    // Construct the query object based on the provided parameters
    const query = {};
    if (roleName) query.roleName = roleName;
    if (password) query.password = password;
    if (role) query.role = role;

    // const userLogin = 
    userPost.find(query, (err, userdata) => {
        if (err) {
            console.log('internal error', err);
            res.status(500).send('Internal Server Error');
        } else {
            res.send(userdata);
        }
    });

// if(!userLogin) return res.status(400).send('Email or password is wrong');
    
// // Assuming a comparePassword method on your user schema
// const validPass = await user.comparePassword(req.body.password);
// if (!validPass) return res.status(400).send('Invalid password');

// req.session.userId = user._id;
// req.session.isOnline = true;
// await User.findByIdAndUpdate(user._id, { online: true });

// res.send('Logged in');

});


//export the router 
module.exports = router;