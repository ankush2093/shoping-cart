// lib/dummyApi.ts
export const fetchProducts = async () => {
    const res = await fetch('https://dummyjson.com/products');
    return res.json();
  };
  
  export const fetchProductsByCategory = async (category: string) => {
    const res = await fetch(`https://dummyjson.com/products/category/${category}`);
    return res.json();
  };
  
  export const searchProducts = async (query: string) => {
    const res = await fetch(`https://dummyjson.com/products/search?q=${query}`);
    return res.json();
  };
  