
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { FaCartArrowDown } from "react-icons/fa";
import { searchProducts } from "@/lib/dummyApi";

export default function Header() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState(); // Example cart count

  // Fetch search results with debounce
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (search.trim()) {
        setLoading(true);
        searchProducts(search)
          .then((data) => {
            setResults(data.products || []);
            setLoading(false);
          })
          .catch(() => {
            setLoading(false);
          });
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  return (
    <header className="p-4 bg-black text-white shadow-md relative">
      {/* Top Section: Home, Search, Cart */}
      <div className="flex justify-between items-center w-full">
        {/* Logo/Home Link */}
        <Link href="/" className="text-2xl font-bold hover:text-gray-400">
          CaratLane
        </Link>

        {/* Search Bar */}
        <div className="relative w-1/2">
          <input
            type="text"
            placeholder="Search jewelry..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded px-4 py-2 text-black"
          />
          {/* Search Results Dropdown */}
          {results.length > 0 && (
            <div
              className="absolute top-full left-0 w-full mt-1 bg-white text-black rounded shadow-md 
              max-h-60 overflow-y-auto z-50"
            >
              <ul>
                {results.map((product) => (
                  <li key={product.id} className="border-b px-4 py-2 hover:bg-gray-200">
                    <Link href={`/products/${product.id}`}>
                      {product.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {search.trim() && results.length === 0 && !loading && (
            <p className="absolute top-full left-0 w-full bg-white text-gray-600 px-4 py-2 rounded z-50">
              No results found.
            </p>
          )}
        </div>

        {/* Cart Icon */}
        <Link href="/cart" className="relative">
          <FaCartArrowDown size={24} className="hover:text-gray-400" />
          {cartItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs rounded-full px-1.5">
              {cartItems}
            </span>
          )}
        </Link>
      </div>

      {/* Loading Indicator */}
      {loading && <p className="text-gray-400 mt-2 text-center">Loading...</p>}
    </header>
  );
}






