const express = require ('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const Order = require('../models/Order');
const auth = require('../Middleware/auth');

const router = express.Router();

const razorpay = new Razorpay({
  key_id:process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET
});

router.post('/create-order', auth , async(req,res)=>{
  try{
    const {orderId} = req.body;

    const order = await Order.findOne({_id: orderId, user :req.userId });
    if(!order) return res.status(404).json({ message :'Order not found'});

    const options = {
      amount : Math.round(order.totalPrice *100),
      currency: 'INR',
      receipt :`order_rcpt_${order._id}`, 
    };

    const rzpOrder = await razorpay.orders.create(options);

    return res.json({
      orderId: rzpOrder.id,
      amount: rzpOrder.amount,
      currency :rzpOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err){
    return res.status(500).json({ message: 'Razorpay Error', error :err.message});
  }
});

router.post('/verify', auth , async(req,res)=>{
  try{
    const {razorpay_order_id , razorpay_payment_id , razorpay_signature, orderId} = req.body;

    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const expectedSignature = crypto
     .createHmac('sha256', process.env.RAZORPAY_SECRET)
     .update(body.toString())
     .digest('hex');


     if (expectedSignature !== razorpay_signature){
      return res.status(400).json({ message: 'invalid signature'});
     }

     await Order.findOneAndUpdate(
      { _id :orderId, user: req.userId},
      { $set : { paymentStatus: 'paid', status :'paid'}},
      { new : true}
     );

     return res.json({ message: 'Payment verified successfully'});
  } catch (err){
    return res.status(500).json({ message :'verification error', error :err.message});
  }
});

module.exports = router;