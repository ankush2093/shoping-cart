"use client";

import { useEffect, useState, use } from "react";
import { useRouter } from "next/navigation";
import { fetchProducts } from "@/lib/dummyApi";
import ProductGrid from "@/components/ProductGrid";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
}

export default function ProductPage({ params: paramsPromise }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  // Unwrap the params promise using React.use()
  const params = use(paramsPromise);

  useEffect(() => {
    if (!params?.id) return;

    const fetchProduct = async () => {
      try {
        const data = await fetchProducts(); // Fetch all products
        const selectedProduct = data.products.find(
          (p: Product) => p.id === Number(params.id) // Safely compare using Number
        );

        if (!selectedProduct) {
          console.error("Product not found");
          router.push("/404");
          return;
        }

        setProduct(selectedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id, router]);

  if (loading) return <p>Loading...</p>;
  if (!product) return <p>Product not found</p>;

  return (
    <>

    <div className="flex items-center justify-center min-h-screen  p-1">
    <div className="w-full max-w-md bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-2">
        <h1 className="text-3xl font-bold text-center mb-4">{product.title}</h1>
        <p className="text-gray-700 text-center">{product.description}</p>
        <p className="mt-4 text-lg font-semibold text-center text-gray-900">
          Price: Rs{product.price}
        </p>
        {product.images && product.images.length > 0 && (
          <div className="mt-6 flex justify-center">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full max-w-xs rounded-lg shadow-md"
            />
          </div>
        )}
      </div>
    </div>
    </div>
<ProductGrid/>
    </>
  );
}
