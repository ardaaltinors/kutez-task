import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

function ProductList() {
  const [products, setProducts] = useState([]);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:3000/api/products");
        if (response.data.success) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollBy({
      left: -200, 
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollBy({
      left: 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="container mx-auto px-4 relative">
      <h1 className="text-center text-2xl font-bold my-6">Product List</h1>
      <div className="relative">
        {/* Scrollable Container */}
        <div
          className="flex overflow-x-auto space-x-24 pb-4"
          ref={scrollContainerRef}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {/* Left Arrow */}
        <button
          className="absolute left-[-3rem] top-1/2 transform -translate-y-1/2 p-3 rounded-full text-5xl"
          onClick={scrollLeft}
        >
          &#x2039; {/* Left Arrow Icon */}
        </button>
        {/* Right Arrow */}
        <button
          className="absolute right-[-3rem] top-1/2 transform -translate-y-1/2 p-3 rounded-full text-5xl"
          onClick={scrollRight}
        >
          &#x203A; {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
}

export default ProductList;
