import { useState, useEffect, useRef } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

function ProductList() {
  const [products, setProducts] = useState([]);

  // Filter state
  const [maxPrice, setMaxPrice] = useState(30000);
  const [minPopularity, setMinPopularity] = useState(70);
  const [maxPopularity, setMaxPopularity] = useState(90);

  // Toggle state for filter section
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const scrollContainerRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (filters = {}) => {
    try {
      // Build query parameters based on filters
      const queryParams = new URLSearchParams(filters).toString();
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products?${queryParams}`);


      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // Validate filter values if necessary
    const filters = {
      maxPrice,
      minPopularity,
      maxPopularity,
    };
    fetchProducts(filters);
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible((prev) => !prev);
  };

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
      {/* Heading and Toggle Button */}
      <div className="flex items-center justify-center mb-6">
        <h1 className="text-product-list-heading font-avenir font-normal text-center">
          Product List
        </h1>
        <button
          onClick={toggleFilterVisibility}
          className="ml-2 p-1 bg-blue-500 text-white text-xs rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-1 focus:ring-blue-500"
          aria-expanded={isFilterVisible}
          aria-controls="filter-section"
        >
          {isFilterVisible ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {/* Filter Section */}
      {isFilterVisible && (
        <form onSubmit={handleFilterSubmit} className="mb-6 p-4 bg-gray-100 rounded-lg" id="filter-section">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
            {/* Max Price */}
            <div className="flex flex-col mb-4 sm:mb-0">
              <label htmlFor="maxPrice" className="mb-1 font-medium">Max Price (USD)</label>
              <input
                type="number"
                id="maxPrice"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
              />
            </div>

            {/* Min Popularity */}
            <div className="flex flex-col mb-4 sm:mb-0">
              <label htmlFor="minPopularity" className="mb-1 font-medium">Min Popularity (%)</label>
              <input
                type="number"
                id="minPopularity"
                value={minPopularity}
                onChange={(e) => setMinPopularity(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
            </div>

            {/* Max Popularity */}
            <div className="flex flex-col mb-4 sm:mb-0">
              <label htmlFor="maxPopularity" className="mb-1 font-medium">Max Popularity (%)</label>
              <input
                type="number"
                id="maxPopularity"
                value={maxPopularity}
                onChange={(e) => setMaxPopularity(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                min="0"
                max="100"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Scrollable Product List */}
      <div className="relative">
        {/* Scrollable Container */}
        <div
          className="flex overflow-x-auto space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 pb-4"
          ref={scrollContainerRef}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="flex-shrink-0 w-full sm:w-64">
                <ProductCard product={product} />
              </div>
            ))
          ) : (
            <p className="text-center w-full">No products found with the applied filters.</p>
          )}
        </div>
        {/* Left Arrow */}
        <button
          className="absolute left-2 sm:left-[-3rem] top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full text-3xl sm:text-5xl bg-white shadow-lg"
          onClick={scrollLeft}
        >
          &#x2039; {/* Left Arrow Icon */}
        </button>
        {/* Right Arrow */}
        <button
          className="absolute right-2 sm:right-[-3rem] top-1/2 transform -translate-y-1/2 p-2 sm:p-3 rounded-full text-3xl sm:text-5xl bg-white shadow-lg"
          onClick={scrollRight}
        >
          &#x203A; {/* Right Arrow Icon */}
        </button>
      </div>
    </div>
  );
}

export default ProductList;
