const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const path = require('path')
const fs = require('fs')
require('dotenv').config();
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const razorpayPaymentRoutes = require('./routes/paymentRazorpay');


const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.Mongodb_uri).then(() =>{
    console.log('MongoDB connected');
}).catch(err =>console.error('DB error',err));


const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ---------------- ROUTES ----------------
app.get('/', (req, res) => {
  res.send('API is running');
});


app.use('/uploads', express.static(uploadDir)); // serve images

app.use('/api/products', productRoutes);

app.use('/api/users',userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/cart',cartRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/payments/razorpay',razorpayPaymentRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
