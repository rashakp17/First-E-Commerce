const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const auth = require('../Middleware/auth');

const router = express.Router();

router.get('/', auth ,async(req,res)=>{
 try{
  const cart = await Cart.findOne({ user :req.userId }).populate('items.product');
  return res.json(cart || {user :req.userId, items:[]});
 } catch (err){
  return res.status(500).json({ message : 'Error fetching cart', error : err.message});
 }
});

router.post('/items', auth, async(req,res)=>{
  try{
    const { productId ,quantity = 1} = req.body;

    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({ message : 'Product not found'});
    
    let cart = await Cart.findOne({ user : req.userId});
    if (!cart) {
      cart = await Cart.create({
        user : req.userId,
        items: [{ product: productId, quantity}],
      });
      return res.status(201).json(cart);
    }

    const index = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (index > -1){
      cart.items[index].quantity += quantity;
    } else {
      cart.items.push({product: productId, quantity});
    }

    await cart.save();
    return res.json(cart);
  } catch (err){
    return res.status(400).json({ message :'Error updating cart', error :err.message})
  }
});

router.put('/items/:productId',auth , async(req,res)=>{
  try{
    const { quantity} = req.body;
    const {productId} = req.params;

    if(quantity <= 0){

      const cart = await Cart.findOneAndUpdate (
        { user : req.userId},
        { $pull: {items : { product : productId}}},
        { new :true}
      );
      return  res.json(cart);
    }

    const cart  = await Cart.findOneAndUpdate(
      { user : req.userId, 'items.product' : productId},
      { $set : { 'items.$.quantity': quantity}},
      { new :true}
    );
    
    if(!cart) return res.status(404).json({ message :'Cart or item not found'});
    return res.json(cart);
  } catch (err){
    return res.status(400).json({ message: 'Error updatind item', error : err.message});
  }
});


router.delete('/items/:productId', auth , async (req,res)=>{
  try{
    const {productId} = req.params;

    const cart = await Cart.findOneAndUpdate(
      { user: req.userId},
      {$pull : {items: { product : productId}}},
      { new :true}
    );

    if (!cart) return res.status(404).json({ message : 'cart not found'});

    return res.json(cart);
  } catch (err){
    return res.status(400).json({ message : 'Error removing item', error : err.message});
  }
});

module.exports = router;

