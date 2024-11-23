import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar as solidStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as regularStar } from '@fortawesome/free-regular-svg-icons';

function ProductCard({ product }) {
    const [selectedColor, setSelectedColor] = useState("yellow");

    // Map colors to human-readable names
    const colorNames = {
        yellow: "Yellow Gold",
        rose: "Rose Gold",
        white: "White Gold",
    };

    const handleColorChange = (color) => {
        setSelectedColor(color);
    };

    const popularityRating = (product.popularityScore / 100) * 5;

    const renderStars = () => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(popularityRating)) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={solidStar}
                        className="text-yellow-500"
                        aria-hidden="true"
                    />
                );
            } else if (i - popularityRating <= 0.5) {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={faStarHalfAlt}
                        className="text-yellow-500"
                        aria-hidden="true"
                    />
                );
            } else {
                stars.push(
                    <FontAwesomeIcon
                        key={i}
                        icon={regularStar}
                        className="text-yellow-500"
                        aria-hidden="true"
                    />
                );
            }
        }
        return stars;
    };

    return (
        <div className="rounded-lg p-4">
            <img
                src={product.images[selectedColor]}
                alt={product.name}
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
            />
            <h2 className="text-product-title font-montserrat font-medium mt-2">
                {product.name}
            </h2>
            <p className="text-price font-montserrat font-normal">
                ${parseFloat(product.price).toFixed(2)} USD
            </p>
            <div className="mt-2 flex items-center">
                <div
                    className="w-5 h-5 rounded-full cursor-pointer"
                    style={{ backgroundColor: "#E6CA97" }}
                    onClick={() => handleColorChange("yellow")}
                    aria-label="Yellow Gold"
                ></div>
                <div
                    className="w-5 h-5 rounded-full cursor-pointer ml-2"
                    style={{ backgroundColor: "#E1A4A9" }}
                    onClick={() => handleColorChange("rose")}
                    aria-label="Rose Gold"
                ></div>
                <div
                    className="w-5 h-5 rounded-full cursor-pointer ml-2"
                    style={{ backgroundColor: "#D9D9D9" }}
                    onClick={() => handleColorChange("white")}
                    aria-label="White Gold"
                ></div>
            </div>
            <p className="text-color-text font-avenir font-normal mt-2">
                {colorNames[selectedColor]}
            </p>
            <div className="mt-2 text-sm flex items-center">
                <span className="flex" aria-hidden="true">
                    {renderStars()}
                </span>
                <span className="ml-2 font-avenir font-normal">
                    {popularityRating.toFixed(1)}/5
                </span>
            </div>
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
