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
      <h1 className="text-product-list-heading font-avenir font-normal text-center my-6">
        Product List
      </h1>
      <div className="relative">
        {/* Scrollable Container */}
        <div
          className="flex overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 pb-4"
          ref={scrollContainerRef}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-shrink-0 w-full sm:w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        {/* Left Arrow */}
        <button
          className="absolute left-2 sm:left-[-3rem] top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full text-3xl sm:text-5xl bg-white"
          onClick={scrollLeft}
        >
          &#x2039; {/* Left Arrow Icon */}
        </button>
        {/* Right Arrow */}
        <button
          className="absolute right-2 sm:right-[-3rem] top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full text-3xl sm:text-5xl bg-white"
          onClick={scrollRight}
        >
          &#x203A; {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
}

export default ProductList;
