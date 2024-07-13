 const express = require('express');
 const router = express.Router();

const mongType = require('mongoose').Types;


 const userStatus = require('../model/userStatusModel')
 // Middleware to update user status
// router.use(async (req, res, next) => {
//     if (req.session.userId) {
//         await userStatus.updateOne({ _id: req.session.userId }, { $set: { isOnline: true } });
//     }
//     next();
// });

// Route to login
router.post('/', async(req, res) => {

try{
  const userStatus1 = new userStatus({
    roleName: req.body.roleName,
    role: req.body.role,
    isOnline: req.body.isOnline,
    date:req.body.date,
    Password:req.body.Password
});
if(userStatus1){
  const savedLogin = await userStatus1.save()
  res.send(savedLogin)
}else{
  res.status(400).send({message:'Not Found'});
  console.log(res.status(400).send({messase:'Not Found'}))
}

}catch(error){
  if (error.code === 11000){
    res.status(404).send(error.keyValue)
  }else{
    res.send(error)
  }

}
});
// logout method with help of delete method
router.delete('/:roleName', async (req, res) => {
  const { roleName } = req.params;

  try {
    // Delete the document with the specified roleName
    const result = await userStatus.deleteMany({ roleName });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No record found with that roleName' });
    }

    res.status(200).json({ message: `Successfully deleted ${result.deletedCount} record(s)` });
  } catch (err) {
    res.status(500).json({ message: `Internal error: ${err.message}` });
  }
});
router.get('/', (req,res)=>{
  userStatus.find()
  .then((data)=>{
    res.send(data)
  })
  .catch(err=>{
    res.status(500).send('internal error',err);
  })
});
module.exports = router;
