"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { CiShoppingCart, CiHeart } from "react-icons/ci";
import Swal from "sweetalert2";
import { addToCart, getCartItems } from "@/app/actions/actions";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  wishlist: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  label?: string;
  labelColor?: string;
  tags: string[];
  inventory: number;
  quantity: number; // Added to track quantity in cart
}

const ProductCards: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  // Fetch products from the external API
  const fetchProducts = async () => {
    try {
      const response = await fetch("https://giaic-hackathon-template-08.vercel.app/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.log("Error Fetching Products:", error);
    }
  };

  // Handle add to cart with selected quantity
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();

    if (product.quantity === 0) {
      Swal.fire({
        title: "Out of Stock",
        text: "This product is out of stock. Please choose a different quantity.",
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    // Check if selected quantity is greater than inventory
    if (product.quantity > product.inventory) {
      Swal.fire({
        title: "Quantity Exceeds Inventory",
        text: `You cannot add more than ${product.inventory} items to your cart.`,
        icon: "warning",
        showConfirmButton: true,
      });
      return;
    }

    addToCart(product, product.quantity); // Pass the selected quantity here

    Swal.fire({
      title: "Added to Cart",
      text: `${product.quantity}x ${product.title} has been added to your cart!`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
    });

    // Reset quantity after adding to cart
    setProducts((prevProducts) =>
      prevProducts.map((p) =>
        p._id === product._id ? { ...p, quantity: 0 } : p
      )
    );
  };

  // Truncate description for display
  const truncateDescription = (description: string | undefined | null) => {
    if (!description) return "";
    return description.length > 100 ? description.substring(0, 100) + "..." : description;
  };

  // Fetch products on component mount
  useEffect(() => {
    fetchProducts();
    const storedCart = getCartItems();
    setCart(storedCart);
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm hover:shadow-lg transition-shadow duration-300"
          >
            <div className="relative w-full h-48 mb-4">
              <Link href={`/products/${product._id}`}>
                <Image
                  src={product.imageUrl}
                  alt={product.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </Link>
              {product.label && (
                <span
                  className="absolute top-2 left-2 text-xs text-white px-2 py-1 rounded"
                  style={{ backgroundColor: product.labelColor }}
                >
                  {product.label}
                </span>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">{product.title}</h3>
            <p className="text-sm text-gray-500 mb-4">{truncateDescription(product.description)}</p>
            <div className="flex items-center justify-between w-full text-sm mb-4">
              <div>
                <span className="text-gray-900 font-bold">${product.price.toFixed(2)}</span>
                {product.discountPercentage > 0 && (
                  <span className="line-through ml-2 text-gray-500">
                    ${((product.price * 100) / (100 - product.discountPercentage)).toFixed(2)}
                  </span>
                )}
              </div>
            </div>

            {/* Quantity selection and stock handling */}
            <div className="flex items-center justify-between w-full mb-4">
              <div className="flex items-center">
                <button
                  className="bg-gray-200 px-2 py-1 rounded-l-md"
                  onClick={() =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p._id === product._id && p.quantity > 0
                          ? { ...p, quantity: p.quantity - 1 }
                          : p
                      )
                    )
                  }
                >
                  -
                </button>
                <input
                  type="number"
                  value={product.quantity || 0}  // Ensure quantity is never undefined
                  min="0"
                  max={product.inventory}
                  onChange={(e) =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p._id === product._id
                          ? { ...p, quantity: Math.min(Number(e.target.value), p.inventory) }
                          : p
                      )
                    )
                  }
                  className="text-center w-12 mx-2 border rounded-md"
                />
                <button
                  className="bg-gray-200 px-2 py-1 rounded-r-md"
                  onClick={() =>
                    setProducts((prevProducts) =>
                      prevProducts.map((p) =>
                        p._id === product._id && p.quantity < product.inventory
                          ? { ...p, quantity: p.quantity + 1 }
                          : p
                      )
                    )
                  }
                >
                  +
                </button>
              </div>
              {product.quantity === 0 ? (
                <span className="text-red-500">Out of Stock</span>
              ) : (
                <span className="text-green-500">{product.inventory} in stock</span>
              )}
            </div>

            <div className="flex justify-center">
              <button
                className="flex justify-center w-20 bg-white text-center py-2 rounded-md hover:bg-red-400 mb-2"
                aria-label="Add to wishlist"
              >
                <CiHeart size={40} />
              </button>
              <button
                className="flex justify-center w-20 bg-white text-sky-500 py-2 rounded-md hover:bg-gray-200"
                onClick={(e) => handleAddToCart(e, product)}
                aria-label="Add to cart"
              >
                <CiShoppingCart size={40} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCards;
