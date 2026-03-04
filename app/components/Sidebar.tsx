"use client";

import Link from "next/link";

export default function Sidebar() {

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (

    <div className="w-56 bg-gray-900 text-white h-screen p-6">

      <h2 className="text-xl mb-8 font-bold">
        Inventory
      </h2>

      <div className="flex flex-col gap-4">

        <Link href="/dashboard" className="hover:text-blue-400">
          Dashboard
        </Link>

        <Link href="/products" className="hover:text-blue-400">
          Products
        </Link>

        <button
          onClick={logout}
          className="text-left text-red-400 mt-6"
        >
          Logout
        </button>

      </div>

    </div>
  );
}