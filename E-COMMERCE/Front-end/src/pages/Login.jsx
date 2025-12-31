import { useState } from "react"

import { Link, useNavigate } from "react-router-dom";
import Input from "../Component/input";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Features/AuthSlice";



const Login =()=>{
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();  


  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/users/login', { email, password });
    console.log(res.data); // token, user, etc.
    // save token, redirect, etc.
    dispatch(
      setCredentials({
        user: res.data.user,
        token: res.data.token,
      })
    );

    if(res.data.user.role === 'admin'){
      navigate('/admin');
    } else {
      navigate('/');
    }
    
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};

   

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-slate-400 shadow-xl rounded-2xl p-8 relative ">
        <Link to="/"><button className="flex justify-items-start ml-[370px] text-xl">×</button></Link>  
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">Login</h2>
        

        <form onSubmit={handleSubmit} className="w-full">
          <Input
            label="Email"
            type="email"
            value={email}
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
        
          />
          <Input
            label="Password"
            type="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button 
            className="w-full bg-black text-white py-3 rounded-lg text-lg font-medium 
                       hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Don't have an account?{" "}
          <Link className="text-black font-medium" to="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}


export default Login;