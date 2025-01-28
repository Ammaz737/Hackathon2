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
  quantity: number; // This will track quantity in the cart and for selected items
}

export const addToCart = (product: Product, quantity: number) => {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');

  // Ensure that quantity does not exceed available inventory
  const validQuantity = Math.min(quantity, product.inventory);

  const existingProductIndex = cart.findIndex((item) => item._id === product._id);

  if (existingProductIndex !== -1) {
    // If product exists in cart, update the quantity with the selected amount
    const newQuantity = cart[existingProductIndex].quantity + validQuantity;
    cart[existingProductIndex].quantity = Math.min(newQuantity, product.inventory); // Prevent exceeding inventory
  } else {
    // Add new product to cart with the selected quantity
    cart.push({ ...product, quantity: validQuantity });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const removeFromCart = (productId: string) => {
  let cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  cart = cart.filter((item) => item._id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: Product[] = JSON.parse(localStorage.getItem('cart') || '[]');
  const productIndex = cart.findIndex((item) => item._id === productId);

  if (productIndex > -1) {
    const validQuantity = Math.min(Math.max(quantity, 1), cart[productIndex].inventory); // Ensure valid quantity
    cart[productIndex].quantity = validQuantity;
  }

  localStorage.setItem('cart', JSON.stringify(cart));
};

export const getCartItems = (): Product[] => {
  return JSON.parse(localStorage.getItem('cart') || '[]');
};
