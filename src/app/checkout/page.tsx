"use client";
import React, { useEffect, useState } from "react";
import { getCartItems } from "../actions/actions"; // Your cart items fetching function
import Swal from "sweetalert2"; // SweetAlert
import Image from "next/image";

interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  imageUrl: string;
  quantity: number; // This should track the quantity of the item in the cart
}

const Checkout = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    paymentMethod: "Credit Card",
  });
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    address: "",
    paymentMethod: "",
  });

  // Fetch cart items when component mounts
  useEffect(() => {
    setCartItems(getCartItems());
  }, []);

  // Calculate the total price using quantity of the items in the cart
  const totalPrice = cartItems
    .reduce((acc, item) => acc + item.price * item.quantity, 0)
    .toFixed(2); // Use item.quantity instead of item.inventory

  // Handle form field changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Form validation
  const validateForm = () => {
    const validationErrors = { fullName: "", email: "", address: "", paymentMethod: "" };
    let isValid = true;

    if (!formData.fullName.trim()) {
      validationErrors.fullName = "Full Name is required";
      isValid = false;
    }

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!formData.email.trim()) {
      validationErrors.email = "Email is required";
      isValid = false;
    } else if (!emailPattern.test(formData.email)) {
      validationErrors.email = "Enter a valid email address";
      isValid = false;
    }

    if (!formData.address.trim()) {
      validationErrors.address = "Shipping Address is required";
      isValid = false;
    }

    if (!formData.paymentMethod) {
      validationErrors.paymentMethod = "Payment Method is required";
      isValid = false;
    }

    setErrors(validationErrors);
    return isValid;
  };

  // Handle order placement
  const handlePlaceOrder = () => {
    if (validateForm()) {
      Swal.fire({
        title: "Are you sure you want to place the order?",
        text: `Your total amount is $${totalPrice}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, Place Order",
        cancelButtonText: "No, Cancel",
      }).then((result) => {
        if (result.isConfirmed) {
          // Handle the actual order placement logic here
          Swal.fire("Order Placed!", "Your order has been successfully placed.", "success");
          // Optionally, reset cart or redirect
          // Example: clearCart();
        } else {
          Swal.fire("Cancelled", "Your order has not been placed.", "info");
        }
      });
    }
  };

  return (
    <div className="p-8 max-w-screen-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Checkout</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl text-gray-500">
          Your cart is empty. Add items to your cart to proceed.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Cart Items Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Your Items</h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item._id}
                  className="flex items-center justify-between bg-gray-50 p-4 rounded-md shadow-sm"
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
                </div>
              ))}
            </div>
          </div>

          {/* Payment Section */}
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6">Payment Details</h2>
            <form className="space-y-6">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your full name"
                />
                {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email address"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              </div>

              {/* Shipping Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Enter your shipping address"
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleInputChange}
                  className="w-full p-3 mt-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Credit Card">Credit Card</option>
                  <option value="Debit Card">Debit Card</option>
                  <option value="PayPal">PayPal</option>
                </select>
                {errors.paymentMethod && <p className="text-red-500 text-sm">{errors.paymentMethod}</p>}
              </div>

              <div className="flex justify-between items-center mt-6">
                <div className="text-lg font-semibold text-gray-800">Total Price:</div>
                <div className="text-xl font-semibold text-gray-900">${totalPrice}</div>
              </div>

              <button
                type="button"
                onClick={handlePlaceOrder} // Trigger SweetAlert on button click
                className="w-full bg-blue-600 text-white py-3 mt-6 rounded-md hover:bg-blue-700 transition duration-200"
              >
                Place Order
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
