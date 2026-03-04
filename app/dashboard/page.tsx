"use client";

import { useEffect, useState } from "react";
import axios from "axios";
// Import Sidebar as shown in Step 2
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios.get("https://smart-inventory-backend-8jff.onrender.com/api/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then(res => {
      setStats(res.data);
    })
    .catch(() => {
      alert("Unauthorized");
    });
  }, []);

  if (!stats) return (
    <div className="flex h-screen bg-black items-center justify-center text-zinc-500">
      Loading analytics...
    </div>
  );

  return (
    // Layout changed to flex to accommodate Sidebar
    <div className="flex min-h-screen bg-black">
      
      {/* Navigation Sidebar */}
      <Sidebar />

      <main className="p-10 flex-1">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Inventory Dashboard
          </h1>
          <p className="text-zinc-500 mt-2 text-sm">Overview of your current stock performance.</p>
        </header>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Total Products Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg group hover:border-zinc-700 transition-colors">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Total Products
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white leading-none">
                {stats.totalProducts}
              </span>
              <span className="text-zinc-600 text-sm">items</span>
            </div>
            <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-blue-500 w-full opacity-50" />
            </div>
          </div>

          {/* Low Stock Items Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg group hover:border-zinc-700 transition-colors">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Low Stock Alerts
            </p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-red-500 leading-none">
                {stats.lowStockItems}
              </span>
              <span className="text-zinc-600 text-sm">require attention</span>
            </div>
             <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
               <div className={`h-full bg-red-500 transition-all duration-500`} style={{ width: `${(stats.lowStockItems / stats.totalProducts) * 100}%` }} />
            </div>
          </div>

          {/* Inventory Value Card */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl shadow-lg group hover:border-zinc-700 transition-colors">
            <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-4">
              Estimated Value
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-zinc-400 text-2xl font-light">₹</span>
              <span className="text-4xl font-bold text-white leading-none">
                {Number(stats.totalInventoryValue).toLocaleString()}
              </span>
            </div>
             <div className="mt-4 h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
               <div className="h-full bg-green-500 w-full opacity-50" />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}