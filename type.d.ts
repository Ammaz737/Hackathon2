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
    quantity: number;
    cart: string;
    inventory: number;
  }