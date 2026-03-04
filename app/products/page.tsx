"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  // Step 1: Add Search State
  const [search, setSearch] = useState(""); 
  const [form, setForm] = useState({
    name: "",
    sku: "",
    price: "",
    quantity: "",
    category: "",
  });

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const fetchProducts = async () => {
    try {
      const res = await axios.get("https://smart-inventory-backend-8jff.onrender.com/api/products", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Fetch failed");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search input
  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.sku.toLowerCase().includes(search.toLowerCase())
  );

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addProduct = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/products",
        {
          ...form,
          price: Number(form.price),
          quantity: Number(form.quantity),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchProducts();
      setForm({ name: "", sku: "", price: "", quantity: "", category: "" });
    } catch (error) {
      alert("Error adding product");
    }
  };

  const deleteProduct = async (id: string) => {
    if (!confirm("Remove this item?")) return;
    await axios.delete(`http://localhost:5000/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="flex min-h-screen bg-black text-zinc-100">
      <Sidebar />

      <div className="p-10 flex-1">
        <h1 className="text-3xl font-bold mb-8 text-white tracking-tight">Inventory Control</h1>

        {/* Add Product Form */}
        <form onSubmit={addProduct} className="mb-8 flex gap-3 flex-wrap items-center bg-zinc-900 p-6 rounded-xl border border-zinc-800 shadow-xl">
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:ring-zinc-400 outline-none transition w-full sm:w-auto flex-1"
          />
          <input
            name="sku"
            placeholder="SKU"
            value={form.sku}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:ring-zinc-400 outline-none transition w-full sm:w-auto"
          />
          <input
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:ring-zinc-400 outline-none transition w-full sm:w-auto w-24"
          />
          <input
            name="quantity"
            placeholder="Quantity"
            value={form.quantity}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:ring-zinc-400 outline-none transition w-full sm:w-auto w-24"
          />
          <input
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            className="bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-100 placeholder:text-zinc-500 focus:ring-1 focus:ring-zinc-400 outline-none transition w-full sm:w-auto"
          />
          <button className="bg-zinc-100 text-black px-6 py-2 rounded font-bold hover:bg-white transition shadow-lg active:scale-95">
            Add Product
          </button>
        </form>

        {/* Step 2: Add Search Box */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Search products by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg text-zinc-100 placeholder:text-zinc-600 focus:ring-1 focus:ring-zinc-500 outline-none w-full shadow-inner"
          />
        </div>

        {/* Products Table */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
          <table className="w-full text-left border-collapse">
            <thead className="bg-zinc-800/70 text-zinc-400 uppercase text-xs tracking-widest">
              <tr>
                <th className="px-6 py-4 border-b border-zinc-800 text-center">Name</th>
                <th className="px-6 py-4 border-b border-zinc-800 text-center">SKU</th>
                <th className="px-6 py-4 border-b border-zinc-800 text-center">Price</th>
                <th className="px-6 py-4 border-b border-zinc-800 text-center">Quantity</th>
                <th className="px-6 py-4 border-b border-zinc-800 text-center">Category</th>
                <th className="px-6 py-4 border-b border-zinc-800 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {/* Map over filteredProducts instead of products */}
              {filteredProducts.map((p) => (
                <tr 
                  key={p.id} 
                  className={`border-zinc-800 border text-center transition ${
                    p.quantity <= 5 ? "bg-red-200 text-black font-semibold" : "hover:bg-zinc-800/40"
                  }`}
                >
                  <td className="px-6 py-4">{p.name}</td>
                  <td className="px-6 py-4 font-mono">{p.sku}</td>
                  <td className="px-6 py-4">₹{p.price}</td>
                  <td className="px-6 py-4">{p.quantity}</td>
                  <td className="px-6 py-4">{p.category}</td>
                  <td className="px-6 py-4 flex gap-2 justify-center">
                    <button
                      onClick={() => {
                        setForm({
                          name: p.name,
                          sku: p.sku,
                          price: p.price,
                          quantity: p.quantity,
                          category: p.category,
                        });
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredProducts.length === 0 && (
             <div className="p-10 text-center text-zinc-600 italic">No products match your search.</div>
          )}
        </div>
      </div>
    </div>
  );
}