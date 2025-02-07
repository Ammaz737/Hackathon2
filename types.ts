export interface Product {
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
    quantity: number;
  }
  