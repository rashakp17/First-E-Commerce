


module.exports = (req , res ,next)=>{
  if(req.role !== 'admin'){
    return res.status(403).json({ message :'Access Denied . Admin only.'});
  }
  next();
};