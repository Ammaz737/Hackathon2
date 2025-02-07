"use client";
import { useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import { addToCart } from "../actions/actions";

export interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  description: string;
  image: string;
  category?: {
    title: string;
  };
  inventory: number;
  tags: string[];
}

export default function ProductDetailClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (quantity > product.inventory) {
      Swal.fire({
        icon: "error",
        title: "Insufficient inventory",
        text: `Only ${product.inventory} items available.`,
      });
      return;
    }

    // Add product to the cart with selected quantity
    addToCart({ ...product, imageUrl: product.image, discountPercentage: 0, wishlist: "" }, quantity);

    Swal.fire({
      icon: "success",
      title: "Added to Cart",
      text: `${quantity} ${product.title}(s) added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative w-full h-96 lg:h-[500px] xl:h-[600px] rounded-lg overflow-hidden shadow-lg bg-white">
            <Image
              src={product.image}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="object-center transition-transform duration-300 transform hover:scale-110"
            />
          </div>

          {/* Details Section */}
          <div className="flex flex-col space-y-6">
            <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
            <p className="text-lg text-gray-700">{product.description}</p>
            {product.category && (
              <p className="text-sm text-gray-500">
                Category: <span className="font-medium">{product.category.title}</span>
              </p>
            )}

            <div className="flex items-center space-x-4">
              <p className="text-3xl font-bold text-gray-900">${product.price}</p>
              {product.priceWithoutDiscount > product.price && (
                <span className="text-lg line-through text-gray-500">
                  ${product.priceWithoutDiscount}
                </span>
              )}
            </div>

            <div className="flex items-center space-x-4">
              <p className="text-sm text-gray-500">Quantity:</p>
              <input
                type="number"
                value={quantity}
                min={1}
                max={product.inventory}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 p-2 border rounded-lg"
              />
            </div>

            <button
              onClick={handleAddToCart}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-3 px-6 rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-600 transition duration-200 transform hover:scale-105"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
