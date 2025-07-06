import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faUserCircle } from "@fortawesome/free-solid-svg-icons";

const ServiceCard = ({ card, view }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/services/${card.id}`);
  };

  return (
    <div
      key={card.id}
      onClick={handleCardClick}
      className={`bg-white shadow-md rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 group fade-in-up ${
        view === "list" ? "flex" : "flex flex-col"
      }`}
    >
      {/* Image Section */}
      <div className="relative group overflow-hidden">
        <img
          src={
            card.attchments_array && card.attchments_array.length > 0
              ? card.attchments_array[0].url
              : "https://via.placeholder.com/300x200?text=No+Image"
          }
          alt={card.name}
          className={`img-animattion ${
            view === "list"
              ? "w-100 h-52 object-cover group-hover:scale-105"
              : "w-full h-56 object-cover group-hover:scale-105"
          }`}
        />

        {/* Featured Badge */}
        {card.is_featured && (
          <div className="absolute top-4 left-4 bg-[#26c4a0] text-white text-xs font-bold px-2 py-2 rounded flex items-center gap-1 shadow transition-all duration-300 ease-in-out group-hover:translate-y-full group-hover:opacity-0">
            <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5" />
            FEATURED
          </div>
        )}

        {/* Price Tag */}
        <div className="absolute bottom-2 left-2 bg-white text-black text-sm font-semibold px-3 py-1 rounded shadow">
          {card.price_format} /item
        </div>
      </div>

      {/* Text Section */}
      <div className="p-4 flex flex-col justify-between gap-2 w-full">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            <span
              className="text-[15px] font-semibold font-[poppins] text-black group-hover:text-[#26c4a0]"
              onClick={(e) => e.stopPropagation()}
            >
              {card.name}
            </span>
          </h3>
          <div className="flex items-center text-[13px] font-[poppins] text-gray-500 gap-2 mt-1">
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4" />
              {card.provider_name}
            </span>
            <span className="mx-1">•</span>
            <span>{card.category_name}</span>
          </div>
        </div>

        <div className="border-t border-gray-300 pt-2 font-[poppins] flex justify-between items-center text-[13px] text-gray-700">
          <span>
            {card.visit_type === "ON_SITE" ? "On-Site Service" : "Online"}
          </span>
          <Link
            to={`/services/${card.id}`}
            onClick={(e) => e.stopPropagation()} // Prevent parent click
            className="text-[15px] font-semibold font-[poppins] text-black hover:underline"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;