
"use client";

import { useCart } from "../lib/CartContext";
import Link from "next/link";

export default function CartPage() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  // Calculate subtotal dynamically
  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <section className="p-4">
      {/* Go to Home Button */}
      <Link href="/">
        <button className="text-blue-500 text-x  h-10 w-28 bg-white mb-4"> Home</button>
      </Link>

      {/* Cart Heading */}
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {/* Empty Cart Message */}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {/* Cart Items */}
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 mb-4 border-b pb-4"
            >
              <img
                src={item.thumbnail}
                alt={item.title}
                className="w-16 h-16 object-cover"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-gray-700">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-200"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  <span className="mx-2">{item.quantity}</span>
                  <button
                    className="px-2 py-1 border rounded text-gray-700 hover:bg-gray-200"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-red-500 mt-2 block text-sm hover:underline"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Subtotal and Checkout Section */}
          <div className="mt-6 border-t pt-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Subtotal:</span>
              <span className="text-lg font-semibold">₹{subtotal.toFixed(2)}</span>
            </div>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
