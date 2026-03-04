"use client";

import { useState } from "react";
import axios from "axios";

export default function LoginPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "https://smart-inventory-backend-8jff.onrender.com/api/auth/login",
        {
          email,
          password
        }
      );

      const token = res.data.token;

      localStorage.setItem("token", token);

      alert("Login Successful");
      window.location.href = "/dashboard";

    } catch (error) {
      alert("Login Failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-8 rounded-xl shadow-2xl w-96 border border-zinc-700/50"
      >

        <h2 className="text-zinc-100 text-3xl font-semibold mb-8 text-center tracking-tight">
          Smart Inventory
        </h2>

        <div className="space-y-4">
          <input
            className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition duration-150"
            type="email"
            placeholder="Email Address"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full p-3 rounded-md bg-zinc-800 border border-zinc-700 text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-600 transition duration-150"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          className="w-full bg-zinc-100 text-black font-semibold mt-8 p-3 rounded-md hover:bg-white transition duration-200 shadow-lg"
        >
          Sign In
        </button>

        <div className="mt-6 text-center">
            <a href="#" className="text-zinc-500 hover:text-zinc-300 text-sm transition">Forgot password?</a>
        </div>

      </form>

    </div>
  );
}