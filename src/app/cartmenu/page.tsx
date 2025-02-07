"use client";
import { useEffect, useState } from "react";
import * as React from "react";
import { getCartItems, removeFromCart, updateCartQuantity, addToCart } from "../actions/actions"; // Your actions file
import Swal from "sweetalert2";
import Image from "next/image";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  inventory: number;
  quantity: number;
  wishlist: string;
  tags: string[];
}

const Cart = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  // Fetch cart items when component mounts
  useEffect(() => {
    const items = getCartItems();
    setCartItems(items);
  }, []);

  // Handle removing product from cart
  const handleRemoveFromCart = (productId: string) => {
    Swal.fire({
      title: "Are you sure you want to remove this item from your cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        setCartItems(getCartItems());
      }
    });
  };

  // Handle quantity change (increase or decrease)
  const handleQuantityChange = (productId: string, action: "increase" | "decrease") => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? {
              ...item,
              quantity:
                action === "increase"
                  ? Math.min(item.quantity + 1, item.inventory) // Limit quantity to inventory
                  : Math.max(item.quantity - 1, 1), // Ensure quantity doesn't go below 1
            }
          : item
      )
    );

    // Get updated quantity after increment or decrement
    const updatedItem = cartItems.find((item) => item._id === productId);
    const updatedQuantity = updatedItem ? updatedItem.quantity : 1;

    // Pass updated quantity directly to updateCartQuantity
    updateCartQuantity(productId, updatedQuantity); // Update cart in storage
  };

  const handleAddToCart = (product: Product, quantity: number) => {
    addToCart({ ...product, tags: product.tags || [] }, quantity);
    setCartItems(getCartItems()); // Refresh the cart
  };

  // Ensure unique _id for cart items (filter duplicates if any)
  const uniqueCartItems = Array.from(new Set(cartItems.map(item => item._id)))
    .map(id => cartItems.find(item => item._id === id));

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Your Cart</h1>

      {uniqueCartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          Your cart is empty. Add items to your cart to view them here.
        </div>
      ) : (
        <div className="space-y-6">
          {uniqueCartItems.map((item) => item && (
            <div
              key={item._id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <Image
                  src={item.imageUrl}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-cover rounded-md"
                />
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="text-sm text-gray-600 mt-2">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleRemoveFromCart(item._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              {/* Quantity Control */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => handleQuantityChange(item._id, "decrease")}
                  disabled={item.quantity <= 1}
                  className="text-gray-500 hover:text-gray-700"
                >
                  -
                </button>
                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item._id, "increase")}
                  disabled={item.quantity >= item.inventory}
                  className="text-gray-500 hover:text-gray-700"
                >
                  +
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Cart Summary</h2>
            <ul className="space-y-4">
              {uniqueCartItems.map((item) => item && (
                <li
                  key={item._id}
                  className="flex justify-between items-center bg-white shadow-sm p-4 rounded-md"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="object-cover rounded-md"
                    />
                    <div className="ml-4">
                      <p className="font-md text-slate-900">{item.title}</p>
                      <p className="text-sm text-blue-600">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-4 text-lg font-semibold text-center">
              <p>Total Price: ${uniqueCartItems.reduce((acc, item) => item ? acc + item.price * item.quantity : acc, 0).toFixed(2)}</p>
            </div>
            <Link href="/checkout">
              <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
