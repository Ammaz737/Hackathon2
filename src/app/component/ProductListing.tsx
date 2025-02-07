"use client";
import { useEffect, useState } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

const ProductListing = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products'); // Replace with actual API endpoint
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white shadow-lg rounded-lg p-4">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <h3 className="text-xl font-semibold mt-4">{product.title}</h3>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <div className="flex justify-between items-center mt-4">
            <span className="text-lg font-semibold text-gray-800">${product.price}</span>
            <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600">
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
