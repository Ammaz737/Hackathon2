import { client } from "@/sanity/lib/client";
import ProductDetailClient from "@/app/component/ProductDetailClient";

export interface Product {
  _id: string;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  description: string;
  image: string;
  category: {
    title: string;
  };
  inventory: number;
  tags: string[];
}

type PageProps = {
  params: { id: string };
};

async function ProductDetail({ params }: PageProps) {
  if (!params?.id) {
    return <div className="text-center py-12">Invalid product ID</div>;
  }

  const query = `*[_type == "products" && _id == $id]{
    _id,
    title,
    price,
    priceWithoutDiscount,
    badge,
    description,
    "image": image.asset->url,
    category->{title},
    inventory,
    tags
  }`;

  const data: Product[] = await client.fetch(query, { id: params.id });

  if (!data || data.length === 0) {
    return <div className="text-center py-12">Product not found</div>;
  }

  return <ProductDetailClient product={data[0]} />;
}

export default ProductDetail;
