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
        viewType === "list" ? "flex" : "flex flex-col"
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5 }}
    >
      {/* Image with animations */}
      <div
        className={`relative overflow-hidden ${
          viewType === "list"
            ? "w-[300px] max-h-48 flex-shrink-0"
            : "w-full h-[220px]"
        }`}
      >
        <img
          src={property.image || "https://via.placeholder.com/300"}
          alt={property.name}
          className={`object-cover transition-transform duration-500 hover:scale-110 hover:rotate-[-1deg] ${
            viewType === "list" ? "w-full h-full" : "w-full h-full"
          }`}
        />

        {/* Featured badge */}
        {property.featured && (
          <span className="absolute top-2 left-2 bg-[#26c4a0] text-white text-[10px] font-semibold px-2 py-1 rounded">
            FEATURED
          </span>
        )}

        {/* Price overlay */}
        <span className="absolute bottom-2 left-2 bg-white text-black text-xs font-bold px-2 py-1 rounded shadow hover:opacity-90 transition duration-300">
          {property.price}
        </span>
      </div>

      {/* Details */}
      <div
        className={`p-4 ${
          viewType === "list"
            ? "flex flex-col justify-between w-full border-l"
            : ""
        }`}
      >
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
          {property.name || "Unnamed Property"}
        </h3>

        {/* Location */}
        <p className="text-[13px] text-gray-600 flex items-center gap-1 mb-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="text-gray-500" />
          {property.location || "Unknown Location"}
        </p>

        {/* Sqft */}
        {property.sqft && (
          <p className="text-[12px] text-gray-500 flex items-center gap-1 mb-2">
            <FontAwesomeIcon icon={faRulerCombined} className="text-gray-500" />
            {property.sqft} sqft
          </p>
        )}

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