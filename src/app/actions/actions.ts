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
  quantity: number; // Track selected quantity for the cart
}

// Add product to cart with exact selected quantity
export const addToCart = (product: Omit<Product, "quantity">, selectedQuantity: number) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

  // Ensure quantity does not exceed available inventory
  const validQuantity = Math.min(selectedQuantity, product.inventory);

  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex !== -1) {
    // If product exists in cart, update the quantity
    cart[existingProductIndex].quantity = validQuantity;
  } else {
    // Add new product to cart with the selected quantity
    cart.push({ ...product, quantity: validQuantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Remove product from the cart by ID
export const removeFromCart = (productId: string) => {
  let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

// Update cart quantity with exact value
export const updateCartQuantity = (productId: string, newQuantity: number) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex > -1) {
    // Ensure quantity does not exceed inventory or drop below 1
    const validQuantity = Math.min(Math.max(newQuantity, 1), cart[productIndex].inventory);
    cart[productIndex].quantity = validQuantity;
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

// Fetch cart items
export const getCartItems = (): Product[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};
