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
      className="bg-white shadow rounded-lg overflow-hidden cursor-pointer transition hover:shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Image with price overlay */}
      <div className="relative h-[200px] sm:h-[250px] overflow-hidden">
        <img
          src={property.image || "https://via.placeholder.com/300"}
          alt={property.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2 left-2 bg-white text-black text-sm font-semibold px-2 py-1 rounded">
          {property.price}
        </div>
      </div>

      {/* Details */}
      <div className="p-3">
        {/* Title */}
        <h3 className="text-[15px] font-semibold text-gray-900 mb-1">
          {property.name}
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

        {/* Divider */}
        <hr className="my-1 border-t border-gray-200" />

        {/* Type: For Rent / For Sale */}
        <p className="text-[13px] text-gray-700 font-medium">
          {property.type === "For Rent" ? "For Rent" : "For Sale"}
        </p>
      </div>
    </motion.div>
  );
};

export default ListingCard;
