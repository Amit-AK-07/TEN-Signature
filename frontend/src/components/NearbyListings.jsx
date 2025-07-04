import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const NearbyListings = ({ mode, city, excludeId }) => {
  const [activeTab, setActiveTab] = useState("rent");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default: 3 cards

  // Adjust cards per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425 && mode === "detail") {
        setItemsPerPage(1); // Mobile: 1 card for detail page
      } else {
        setItemsPerPage(3); // Larger screens: 3 cards
      }
    };

    handleResize(); // Run on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mode]);

  const maxIndex = Math.max(0, Math.ceil(listings.length / itemsPerPage) - 1);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      try {
        let url = "";
        let params = {};

        if (mode === "detail" && city && excludeId) {
          url = "https://broki-clone-ui.onrender.com/api/nearby-property-list/";
          params = { city, exclude_id: excludeId, per_page: 12, page: 1 };
        } else {
          url = "https://broki-clone-ui.onrender.com/api/filter-property-list/";
        }

        const res = await axios.get(url, { params });

        const mapped = res.data.results.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price_format,
          location: item.city?.name || "Unknown",
          image: item.property_image || "https://via.placeholder.com/300",
          sqft: item.sqft,
          type: item.price_duration === "monthly" ? "For Rent" : "For Sale",
          is_featured: item.is_featured,
        }));

        let filtered = mapped;
        if (mode !== "detail") {
          filtered = mapped.filter(
            (property) =>
              property.type.toLowerCase() ===
              (activeTab === "rent" ? "for rent" : "for sale")
          );
          filtered = filtered.slice(0, 3); // ✅ Only 3 for home
        }

        setListings(filtered);
      } catch (err) {
        console.error("Error fetching nearby listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [activeTab, mode, city, excludeId]);

  if (loading)
    return <p className="text-center py-4">Loading nearby properties...</p>;
  if (listings.length === 0) return null;

  const visibleListings =
    mode === "detail"
      ? listings.slice(
          currentIndex * itemsPerPage,
          currentIndex * itemsPerPage + itemsPerPage
        )
      : listings;

  return (
    <motion.section
      className="w-full px-4 sm:px-6 md:px-10 lg:px-20 xl:px-28 pt-12 pb-6 bg-white"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1">
            Discover Nearby Listings
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            Find properties close to this location that match your preferences.
          </p>
        </div>

        {/* Tabs for Home */}
        {mode !== "detail" && (
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab("rent")}
              className={`px-4 py-1.5 rounded-md font-medium text-sm transition ${
                activeTab === "rent"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-400 text-gray-900 bg-white"
              }`}
            >
              For Rent
            </button>
            <button
              onClick={() => setActiveTab("sale")}
              className={`px-4 py-1.5 rounded-md font-medium text-sm transition ${
                activeTab === "sale"
                  ? "bg-gray-900 text-white"
                  : "border border-gray-400 text-gray-900 bg-white"
              }`}
            >
              For Sale
            </button>
          </div>
        )}
      </div>

      {/* Grid */}
      <div
        className={`grid gap-4 sm:gap-6 grid-cols-1 ${
          mode === "detail" ? "md:grid-cols-3" : "sm:grid-cols-3"
        }`}
      >
        {visibleListings.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>

      {/* Carousel Controls BELOW cards for detail */}
      {mode === "detail" && (
        <div className="flex flex-col items-center mt-6 gap-3">
          <div className="flex items-center gap-3">
            {/* Left Arrow */}
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              className={`p-2 rounded-full ${
                currentIndex === 0
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {/* Dots */}
            <div className="flex gap-1">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full ${
                    idx === currentIndex ? "bg-gray-800" : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>

            {/* Right Arrow */}
            <button
              onClick={handleNext}
              disabled={currentIndex === maxIndex}
              className={`p-2 rounded-full ${
                currentIndex === maxIndex
                  ? "text-gray-300 cursor-not-allowed"
                  : "text-gray-800 hover:bg-gray-200"
              }`}
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        </div>
      )}
    </motion.section>
  );
};

export default NearbyListings;
