import React, { useEffect, useState } from "react";
import logo from "../assets/logo-with-title-black.svg";
import logo_with_title from "../assets/logo-with-title.svg";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import { login, resetAuthSlice } from "../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const { loading, error, message, user, isAuthenticated } =
    useSelector((state) => state.auth);
    const handleLogin = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    dispatch(login(data));
  }

  useEffect(() => {
      if (message) {
        toast.success(message);
        dispatch(resetAuthSlice());
      }
      if (error) {
        toast.error(error);
        dispatch(resetAuthSlice());
      }
    }, [error, isAuthenticated, dispatch,loading]);
  
    if (isAuthenticated) {
      return <Navigate to="/" />;
    }
  return <>
    <div className="min-h-screen flex">
        {/* Left Section (Login Form) */}
        <div className="flex-1 bg-gradient-to-br from-gray-100 to-white flex items-center justify-center p-3 min-h-150">
          <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-xl p-10 w-full max-w-md">
            <div className="flex flex-col items-center">
              {/* 3D Logo (replace with actual 3D image path) */}
              <img
                src={logo}
                alt="Logo"
                className="w-20 h-20 mb-4"
                style={{ height: "200px", width: "200px" }}
              />
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                Welcome Back
              </h2>
              <p className="text-sm text-gray-500 mb-6">
                Please enter your credentials to login
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>

              <div className="mb-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  className="w-full px-4 py-3 border border-black rounded-md focus:outline-none"
                />
              </div>
              <Link
                to={"/password/forgot"}
                className="font-semibold text-black mb-12 "
              >
                Forgot Password?
              </Link>
              <div className="block md:hidden font-semibold mt-5">
                <p>
                  New to our platform?{" "}
                  <Link
                    to={"/register"}
                    className="text-sm text-gray-500 hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
              <button
                type="submit"
                className="border-2 mt-5 border-bg-indigo-600 w-full font-semibold
              bg-indigo-600 text-white py-2 rounded-lg hover:bg-white
              hover:text-black transition"
              >
                SIGN IN
              </button>
            </form>
          </div>
        </div>

        {/* Right Section (Sign Up Prompt) */}
        <div className="hidden w-full md:w-1/2 bg-[#0f172a] text-white md:flex flex-col items-center justify-center p-10 ">
          <div
            className="w-full max-w-md px-10 py-12 text-center rounded-3xl
    bg-white/5 backdrop-blur-lg border border-white/10
    shadow-[0_8px_30px_rgba(0,0,0,0.35)] transition min-h-150" 
          >
            <img
              src={logo_with_title}
              alt="3D Logo"
              className="mx-auto mb-6 rounded-xl object-contain"
              style={{
                height: "200px",
                width: "200px",
                filter: "drop-shadow(0 0 12px rgba(255, 255, 255, 0.15))",
              }}
            />

            <h2 className="text-3xl font-bold mb-3">Welcome to ByteBooks</h2>
            <p className="text-sm text-gray-300 mb-8">
              New here? Create your account and start exploring digital
              libraries.
            </p>

            <Link
              to="/register"
              className="inline-block w-full py-3 rounded-lg bg-white text-black font-semibold hover:bg-black hover:text-white transition"
            >
              SIGN UP
            </Link>
          </div>
        </div>
      </div>
  </>;
};

export default Login;
