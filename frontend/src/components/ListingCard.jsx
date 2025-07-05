import {
  faMapMarkerAlt,
  faRulerCombined,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ListingCard = ({ property, viewType }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/property/${property.id}`, { state: { property } });
  };

  return (
    <motion.div
      onClick={handleClick}
      className={`bg-white rounded-xl shadow overflow-hidden cursor-pointer w-full box-shadow hover:shadow-lg transition-shadow duration-300 ${
        viewType === "list" ? "flex" : ""
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {/* Image with enhanced animations */}
      <div
        className={`relative ${
          viewType === "list" ? "w-[300px] max-h-48" : ""
        }`}
      >
        <div className="overflow-hidden">
          <img
            src={property.image || "https://via.placeholder.com/300"}
            alt={property.name}
            className={`img-animattion object-cover transition-all duration-400 hover:scale-110 hover:rotate-[-1deg] ${
              viewType === "list" ? "w-full h-full" : "w-full h-48"
            }`}
          />
        </div>
        
        {/* Featured badge */}
        {property.featured && (
          <span className="absolute top-2 left-2 bg-[#26c4a0] text-white text-[10px] font-semibold px-2 py-1 rounded">
            FEATURED
          </span>
        )}
        
        {/* Price overlay with fade animation */}
        <span className="absolute bottom-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded shadow fade hover:opacity-90">
          {property.price}
        </span>
      </div>

      {/* Content with fade-in-up animation */}
      <div
        className={`p-4 border-t fade-in-up ${
          viewType === "list"
            ? "w-1/2 border-t-0 border-l flex flex-col justify-between"
            : ""
        }`}
      >
        {/* Title with animate-up-5 */}
        <h3 className="text-md font-semibold text-gray-900 mb-1 animate-up-5">
          {property.name}
        </h3>

        {/* Location */}
        <div className="text-sm text-gray-600 flex items-center mb-2">
          <FontAwesomeIcon
            icon={faMapMarkerAlt}
            className="mr-1 text-gray-500"
          />
          {property.location || "Unknown Location"}
        </div>

        {/* Sqft */}
        {property.sqft && (
          <p className="text-[12px] text-gray-500 flex items-center gap-1 mb-2">
            <FontAwesomeIcon icon={faRulerCombined} className="text-gray-500" />
            {property.sqft} sqft
          </p>
        )}

        {/* Bottom section with enhanced styling */}
        <div className="border-t pt-3 flex items-center justify-between text-sm text-gray-700">
          <span>{property.type === "For Rent" ? "For Rent" : "For Sale"}</span>
          <button className="text-[#181a20] font-semibold hover:underline transition-all duration-200 hover:text-[#26c4a0]">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ListingCard;