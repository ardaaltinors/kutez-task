import { useState } from "react";
import PropTypes from "prop-types";

function ProductCard({ product }) {
  const [selectedColor, setSelectedColor] = useState("yellow");

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const popularityRating = (product.popularityScore / 100) * 5;

  return (
    <div className="border rounded-lg shadow-lg p-4">
      <img
        src={product.images[selectedColor]}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />
      <h2 className="text-lg font-bold mt-2">{product.name}</h2>
      <p className="text-gray-600">${parseFloat(product.price).toFixed(2)} USD</p>
      <div className="mt-2 flex items-center">
        <div
          className="w-5 h-5 rounded-full bg-yellow-500 cursor-pointer"
          onClick={() => handleColorChange("yellow")}
        ></div>
        <div
          className="w-5 h-5 rounded-full bg-pink-500 cursor-pointer ml-2"
          onClick={() => handleColorChange("rose")}
        ></div>
        <div
          className="w-5 h-5 rounded-full bg-gray-400 cursor-pointer ml-2"
          onClick={() => handleColorChange("white")}
        ></div>
      </div>
      <p className="mt-2 text-sm">Popularity: {popularityRating.toFixed(1)}/5</p>
    </div>
  );
}

// Add PropTypes validation
ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    popularityScore: PropTypes.number.isRequired,
    images: PropTypes.shape({
      yellow: PropTypes.string.isRequired,
      rose: PropTypes.string.isRequired,
      white: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductCard;
