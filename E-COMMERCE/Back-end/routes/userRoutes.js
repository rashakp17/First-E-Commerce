const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const auth = require('../Middleware/auth');

const router = express.Router();

router.post('/register',async(req,res)=>{
 try{
  const {name, email, password} = req.body;

  const existing = await User.findOne({ email});
  if(existing) return res.status(400).json({ message :'Email already in use'});

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({name ,email, passwordHash: hash});
  return res.status(201).json({message :'User created' ,userId :user._id })
 }catch(err){
   return res.status(500).json({ message :'Server eerror',error:err.message})
 }
});

router.post('/login', async (req,res)=>{
  try{
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({message :'Invalid credentials'});

    const match = await bcrypt.compare(password, user.passwordHash);
    if(!match) return res.status(400).json({message :'Invalid credentials'});

    const token = jwt.sign(
      {userId: user._id,role: user.role },
      process.env.jwt_secret,
      {expiresIn: '7d'}
    );

    return res.json({
      token,
      user:{id :user._id, name :user.name, email :user.email, role: user.role,},
    });
  }catch (err){
    return res.status(500).json({message: 'server error', error:err.message});
  }
});


router.get('/profile',auth, async (req,res)=>{
  try{
    const user = await User.findById(req.userId).select('-passwordHash');
    if(!user) return res.status(404).json({ message :'User not found'});

    return res.json(user);
  }catch (err){
    return res.status(500).json({ message:'Server error', error :err.message});
  }
});

router.put('/profile', auth , async (req,res)=>{
  try{
    const {name , email , password} = req.body;

    const updateData ={};
    if(name) updateData.name = name;
    if(email) updateData.email = email;
  if (password) {
    updateData.passwordHash = await bcrypt.hash(password,10);
  }

  const user = await User.findByIdAndUpdate(
    req.userId,
    {$set: updateData},
    {new : true}
  ).select('-passwordHash');

  return res.json(user);
  } catch (err){
    return  res.status(500).json({ message: 'Server error', error: err.message});
  }
});

router.delete('/profile', auth , async (req, res)=>{
  try{
    await User.findByIdAndDelete(req.userId);
    return res.json({message: 'User Deleted'});
  } catch (err){
    return res.status(500).json({ message: 'Server error', error :err.message})
  }
})

module.exports = router;