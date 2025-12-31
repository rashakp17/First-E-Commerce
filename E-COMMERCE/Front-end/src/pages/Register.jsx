import { useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import Input from "../Component/input";
import axios from "axios";


const Register = () =>{
  const [name , setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await axios.post('/api/users/register', { name,email, password });
    console.log(res.data); // token, user, etc.
    navigate("/");
    // save token, redirect, etc.
  } catch (err) {
    console.error(err.response?.data || err.message);
  }
};
  

  return (
     <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-slate-400 shadow-xl rounded-2xl p-8">
        <Link to="/"><button className="flex justify-items-start ml-[370px] text-xl">×</button></Link>  
        <h2 className="text-3xl font-semibold text-center mb-6 text-white">Create Account</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <Input
            label="Full Name"
            type="text"
            value={name}
            placeholder="Enter your full name"
            onChange={(e) => setName(e.target.value)}
          />

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
           onClick={handleSubmit}
            className="mt-2 px-4  md:w-[400px]   md:text-lg  mb-4 active:bg-gray-400 active:bg-opacity-50
            w-full bg-black text-white py-3 rounded-lg text-lg font-medium hover:bg-gray-900 transition"
          >
            Register
          </button>
        </form>

        <p className="text-center mt-4 text-gray-600">
          Already have an account?{" "}
          <Link className="text-black font-medium" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;