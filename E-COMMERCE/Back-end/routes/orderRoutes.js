const express = require ('express');
const Order = require('../models/Order');
const Cart = require('../models/Cart');
const auth = require('../Middleware/auth');

const router = express.Router();

router.post('/', auth , async(req,res)=>{
  try{
    const {shippingAddress, paymentMethod} =req.body;

    const cart = await Cart.findOne({ user :userId}).populate('items.product');
    if(!cart || cart.items.length === 0) {
      return res.status(400).json({ message :'Cart is empty'});
    }

    const items = cart.items.map((item)=>({
      product :item.product._id,
      name :item.product.name,
      price :item.product.price,
      quantity :item.quantity,
    }));

    const totalPrice = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.userId,
      items,
      totalPrice,
      shippingAddress,
      paymentMethod : paymentMethod || 'cod',
      paymentStatus : 'unpaid',
      status : 'pending'
    });

    cart.items = [];
    await cart.save();

    return res.status(201).json(order);
  } catch(err){
    return res.status(500).json({ message :'Error placing order' , error :err.message});
  }
});


router.get('/',auth , async(req,res)=>{
  try{
    const orders = await Order.find({user : req.userId})
     .sort({ createdAt: -1});
    return res.json(orders);
  } catch (err){
    return res.status(500).json({ message :'Error fetching orders', error :err.message});
  }
});

router.get('/:id', auth , async (req,res)=>{
  try{
    const order = await Order.findOne({_id: req.params.id, user : req.userId});
    if(!order) return res.status(404).json({ message : 'Order not found'});
    return res.json(order);
  } catch (err){
    return res.status(400).json({ message : 'Error fetching orders', error : err.message});
  }
});

module.exports = router;