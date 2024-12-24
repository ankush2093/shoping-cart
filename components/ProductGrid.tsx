// // components/ProductGrid.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { fetchProducts } from "../lib/dummyApi";
// import { useCart } from "../lib/CartContext";

// export default function ProductGrid() {
//   const [products, setProducts] = useState([]);
//   const { addToCart } = useCart();

//   useEffect(() => {
//     fetchProducts().then((data) => setProducts(data.products));
//   }, []);

 

//   const renderStars = (rating: number) => {
//     const fullStars = Math.floor(rating);
//     const emptyStars = 5 - fullStars;
//     return (
//       <span>
//         {"★".repeat(fullStars)}{"☆".repeat(emptyStars)}
//       </span>
//     );
//   };

//   return (
//     <section className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
//       {products.map((product: any) => (
//         <div key={product.id} className="border p-2 shadow-sm bg-slate-400">
//           <img
//             src={product.thumbnail}
//             alt={product.title}
//             className="w-full h-32 object-cover"
//           />
//           <h3 className="font-semibold mt-2">{product.title}</h3>
//           <p className="text-sm">₹{product.price}</p>
//           <p className="text-sm text-yellow-500">{renderStars(product.rating)}</p>

//           <button
//             className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
//             onClick={() =>
//               addToCart({
//                 id: product.id,
//                 title: product.title,
//                 price: product.price,
//                 thumbnail: product.thumbnail,
//                 quantity: 1,
//               })
//             }
//           >
//             Add to Cart
//           </button>
//         </div>
//       ))}
//     </section>
//   );
// }


// components/ProductGrid.tsx
"use client";

import { useEffect, useState } from "react";
import { fetchProducts } from "../lib/dummyApi";
import { useCart } from "../lib/CartContext";

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts().then((data) => setProducts(data.products));
  }, []);

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <span>
        {"★".repeat(fullStars)}{"☆".repeat(emptyStars)}
      </span>
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      quantity: 1,
    });

    // Show success message
    setSuccessMessage(`${product.title} added successfully!`);

    // Hide the message after 2 seconds
    setTimeout(() => setSuccessMessage(null), 2000);
  };

  return (
    <>
      {/* Success message */}
      {successMessage && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow">
          {successMessage}
        </div>
      )}

      {/* Product Grid */}
      <section className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product: any) => (
          <div key={product.id} className="border p-2 shadow-sm bg-slate-400">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-cover"
            />
            <h3 className="font-semibold mt-2">{product.title}</h3>
            <p className="text-sm">₹{product.price}</p>
            <p className="text-sm text-yellow-500">{renderStars(product.rating)}</p>

            <button
              className="mt-2 bg-blue-500 text-white px-2 py-1 rounded"
              onClick={() => handleAddToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </section>
    </>
  );
}
