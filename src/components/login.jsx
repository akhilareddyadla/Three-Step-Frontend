import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// In src/index.js or src/App.js

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      let res = await fetch("http://127.0.0.1:8000/login",{
        method : "POST",
        headers:{
          "Content-Type" : "application/json",
        },
        body:JSON.stringify({"email":email,"password":password})
      });
      res = await res.json();
      let user_id = res.user_id;
      let user = localStorage.setItem("user_id",user_id)
      console.log(res);
      navigate("/second_level");
    }
    catch(e){
      console.log("Error at Login :",e)
    }
    // Add your login logic here (API call, validation, etc.)
    console.log("Email:", email);
    console.log("Password:", password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>

        <div className="mt-4 text-center">
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
