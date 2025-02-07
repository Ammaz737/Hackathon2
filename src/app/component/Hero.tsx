"use client";
import Image from "next/image";
import Link from "next/link";
import { IoFilterSharp } from "react-icons/io5";
import { categorySchema } from "@/sanity/schemaTypes/categories";// Ensure correct import

const Hero = () => {
  const item = {
    categories: () => console.log("filter clicked"), // Example logic
  };

  const categories = categorySchema || []; // Ensure categorySchema is an array of categories

  return (
    <section className="relative bg-white">
      <button
        type="button"
        className="flex gap-2 font-semibold text-lg mt-2"
        onClick={item.categories} // Executes on click
      >
        Filter
        <div className="mt-1.5">
          <IoFilterSharp />
        </div>
      </button>

      {/* Display categories as a dropdown */}
      <div className="mt-4">
        <ul className="space-y-2">
          {Array.isArray(categories) && categories.length > 0 ? (
            categories.map((category, index) => (
              <li key={index} className="cursor-pointer hover:text-blue-600">
                {category}
              </li>
            ))
          ) : (
            <li>No categories available</li>
          )}
        </ul>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row items-center px-4 md:px-10 py-16">
        <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            Best Furniture Collection For Your Interior.
          </h1>
        <Link href="/products">
        <button className="mt-6 px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-500">
            Shop Now 
        </button>
        </Link>
        </div>

        <div className="md:w-1/2 flex justify-center">
          <Image
            src="/image/chair.png"
            alt="Modern Chair"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>

      <div className="container mx-auto flex justify-center items-center mt-10 space-x-4 flex-wrap">
        <Image src="/image/Chair 1.png" alt="Logo 1" width={100} height={50} />
        <Image src="/image/chair.png" alt="Logo 2" width={100} height={50} />
        <Image src="/image/chair3.png" alt="Logo 3" width={100} height={50} />
        <Image src="/image/Fet.png" alt="Logo 4" width={100} height={50} />
        <Image src="/image/Fe.png" alt="Logo 5" width={100} height={50} />
        <Image src="/image/Feth.png" alt="Logo 6" width={100} height={50} />
        <Image src="/image/whair.png" alt="Logo 7" width={100} height={50} />
      </div>
    </section>
  );
};

export default Hero;

export const Hero2: React.FC = () => {
  const products = [
    { id: 1, label: "New", labelColor: "bg-green-500", title: "Library Stool Chair", price: "$20", Image: "/image/Fe.png" },
    { id: 2, label: "Sale", labelColor: "bg-red-500", title: "Library Stool Chair", price: "$20", originalPrice: "$30", Image: "/image/Fet.png" },
    { id: 3, label: "", labelColor: "", title: "Library Stool Chair", price: "$20", Image: "/image/Feth.png" },
    { id: 4, label: "", labelColor: "", title: "Library Stool Chair", price: "$20", Image: "/image/Feath.png" },
  ];

  return (
    <div className="px-8 py-6">
      <h2 className="text-2xl font-semibold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border border-gray-200 rounded-lg p-4 flex flex-col items-center shadow-sm">
            <div className="relative w-full h-48 mb-4">
              <Image src={product.Image} alt={product.title} width={500} height={500} className="object-cover rounded-lg" />
              {product.label && (
                <span className={`absolute top-2 left-2 text-xs text-white px-2 py-1 rounded ${product.labelColor}`}>
                  {product.label}
                </span>
              )}
            </div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">{product.title}</h3>
            <div className="flex items-center justify-between w-full text-sm mb-4">
              <div>
                <span className="text-gray-900 font-bold">{product.price}</span>
                {product.originalPrice && <span className="line-through ml-2 text-gray-500">{product.originalPrice}</span>}
              </div>
              <button className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg border border-gray-300 shadow-sm transition duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h18l-1.35 13.45A2 2 0 0117.66 18H6.34a2 2 0 01-1.99-1.55L3 3zm3 9h12m-6-6h.01" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const Hero3: React.FC = () => {
  const categories = [
    { id: 1, title: "Wing Chair", ImageUrl: "/image/Chair 1.png", width: 500, height: 500, productCount: 3844 },
    { id: 2, title: "Wooden Chair", ImageUrl: "/image/Chair2.png", width: 500, height: 500, productCount: 157 },
    { id: 3, title: "Desk Chair", ImageUrl: "/image/Chair3.png", width: 500, height: 500, productCount: 114 },
  ];

  return (
    <section className="py-8">
      <h2 className="text-2xl font-semibold mb-6 ml-4">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-3">
        {categories.map((category) => (
          <div key={category.id} className="relative rounded-lg shadow-lg overflow-hidden">
            <div className="aspect-w-4 aspect-h-3">
              <Image src={category.ImageUrl} alt={category.title} width={category.width} height={category.height} className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4 text-white">
              <h3 className="text-lg font-semibold">{category.title}</h3>
              <p className="text-sm">{category.productCount} Products</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export const Hero4: React.FC = () => {
  return (
    <section className="py-8 px-4 md:px-10">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="relative col-span-1 md:col-span-2">
          <Image src="/image/Fet.png" alt="Orange Chair" width={500} height={500} className="w-full h-[300px] md:h-[500px] object-cover rounded-lg" />
          <div className="absolute left-[-200px] top-1/2 -translate-y-1/2 -rotate-90 text-lg font-semibold tracking-widest text-gray-800 whitespace-nowrap">
            EXPLORE NEW AND POPULAR STYLES
          </div>
        </div>

        <div className="col-span-1 md:col-span-3 grid grid-cols-2 gap-4">
          <div className="flex items-center justify-center">
            <Image src="/image/Feth.png" alt="Chair 1" width={500} height={500} className="w-full h-[240px] object-cover rounded-lg" />
          </div>
          <div className="flex items-center justify-center">
            <Image src="/image/Feath.png" alt="Chair 2" width={500} height={500} className="w-full h-[240px] object-cover rounded-lg" />
          </div>
        </div>
      </div>
    </section>
  );
};
