import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/users/login", {
        email,
        password
      });

    //  const sotreDat= localStorage.setItem(res.data.user.username)
      console.log("Login success:", res.data.user.username);

      // You can store the token or user data here
      // localStorage.setItem("token", res.data.token);
      navigate('/dashboard'); // Redirect after successful login
    } catch (err) {
      console.error("Login failed:", err.response?.data?.message || err.message);
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="flex h-[700px] w-full">
      <div className="w-full hidden md:inline-block">
        <img
          className="h-full w-full object-cover"
          src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
          alt="Left Side"
        />
      </div>

      <div className="w-full flex flex-col items-center justify-center">
        <form
          className="md:w-96 w-80 flex flex-col items-center justify-center"
          onSubmit={handleLogin}
        >
          <h2 className="text-4xl text-gray-900 font-medium">Log in</h2>
          <p className="text-sm text-gray-500 mt-3">
            Welcome back! Please sign in to continue
          </p>

          <div className="flex items-center gap-4 w-full my-5">
            <div className="w-full h-px bg-gray-300"></div>
            <div className="w-full h-px bg-gray-300"></div>
          </div>

          <div className="flex items-center w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <input
              type="email"
              placeholder="Email id"
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex items-center mt-6 w-full border border-gray-300 h-12 rounded-full pl-6 gap-2">
            <input
              type="password"
              placeholder="Password"
              className="bg-transparent text-gray-700 placeholder-gray-500 outline-none text-sm w-full h-full"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="w-full flex items-center justify-between mt-8 text-gray-500">
            <div className="flex items-center gap-2">
              <input className="h-4 w-4" type="checkbox" id="checkbox" />
              <label className="text-sm" htmlFor="checkbox">Remember me</label>
            </div>
            <Link to="/forgot-password" className="text-sm underline">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="mt-8 w-full h-11 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-opacity"
          >
            Login
          </button>

          <p className="text-gray-500 text-sm mt-4">
            Don’t have an account?{" "}
            <Link to="/register" className="text-indigo-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
