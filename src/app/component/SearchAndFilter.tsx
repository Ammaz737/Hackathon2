"use client";
import { useState } from "react";
import { Product } from "../products/page";

interface SearchAndFilterProps {
  products: Product[];
  onFilteredProducts: (filteredProducts: Product[]) => void;
}

const SearchAndFilter = ({ products, onFilteredProducts }: SearchAndFilterProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(1000); // Set a max price based on your products

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTagFilter = (tag: string) => {
    setSelectedTag(tag === selectedTag ? null : tag); // Toggle the selected tag
  };

  const handlePriceFilter = () => {
    const filteredProducts = products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = selectedTag ? product.tags.includes(selectedTag) : true;
      const matchesPrice =
        product.price >= minPrice && product.price <= maxPrice;

      return matchesSearch && matchesTag && matchesPrice;
    });

    onFilteredProducts(filteredProducts);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: "min" | "max") => {
    if (type === "min") {
      setMinPrice(Number(e.target.value));
    } else {
      setMaxPrice(Number(e.target.value));
    }
  };

  const uniqueTags = Array.from(new Set(products.flatMap((product) => product.tags)));

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          onKeyUp={handlePriceFilter}
          className="w-full p-2 border rounded-lg"
          placeholder="Search for products..."
        />
      </div>

      {/* Tag Filters */}
      <div className="flex space-x-4">
        {uniqueTags.map((tag) => (
          <button
            key={tag}
            onClick={() => handleTagFilter(tag)}
            className={`px-4 py-2 border rounded-lg ${selectedTag === tag ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Price Filter */}
      <div>
        <label className="block text-sm">Price Range</label>
        <div className="flex space-x-2">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => handlePriceChange(e, "min")}
            className="w-1/3 p-2 border rounded-lg"
            placeholder="Min"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => handlePriceChange(e, "max")}
            className="w-1/3 p-2 border rounded-lg"
            placeholder="Max"
          />
        </div>
      </div>

      {/* Apply Filter Button */}
      <div>
        <button
          onClick={handlePriceFilter}
          className="w-full py-2 bg-blue-500 text-white rounded-lg"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default SearchAndFilter;
