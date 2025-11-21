import { useState } from "react"
import Input from "../Component/input";
import { Link } from "react-router-dom";


const Login =()=>{
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

  const handleSubmit = (e)=>{
    e.preventDefault();
    console.log({email , password});
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center mb-6 ">AUREZUK Login</h2>

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