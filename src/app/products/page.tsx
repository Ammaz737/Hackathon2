"use client";
import Image from "next/image";
import { client } from "@/sanity/lib/client";
import Link from "next/link";
import { useState } from "react";
import SearchAndFilter from "../component/SearchandFilter";
import { useEffect } from 'react';

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
  description: string;
  inventory: number;
  tags: string[];
}

async function fetchProducts(): Promise<Product[]> {
  const query = `*[_type == "products"]{
    _id,
    title,
    price,
    description,
    inventory,
    tags,
    "image": image.asset->url
  }`;

  const data: Product[] = await client.fetch(query);
  return data;
}

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch products on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
        setFilteredProducts(data); // Initially, display all products
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleFilteredProducts = (filtered: Product[]) => {
    setFilteredProducts(filtered);
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="min-h-screen bg-white">
      <section className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-semibold mb-8">All Products</h1>

        {/* Add Search and Filter component */}
        <SearchAndFilter products={products} onFilteredProducts={handleFilteredProducts} />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white shadow-lg rounded-lg p-4">
              <div className="relative aspect-square overflow-hidden">
                <Link href={`/product/${product._id}`}>
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              </div>
              <p className="text-gray-500 mt-2">{product.description}</p>
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-gray-600 mb-4">${product.price}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

