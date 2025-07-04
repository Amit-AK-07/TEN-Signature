import React, { useState, useEffect } from "react";
import ServiceCard from "../ServicesPage/ServiceCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const RelatedService = ({ services }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3); // Default: show 3 cards

  // Adjust cards per page based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 425) {
        setItemsPerPage(1); // Show 1 card on mobile
      } else {
        setItemsPerPage(3); // Show 3 cards on larger screens
      }
    };

    handleResize(); // Set on first render
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, Math.ceil(services.length / itemsPerPage) - 1);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentIndex < maxIndex) setCurrentIndex((prev) => prev + 1);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const visibleServices = services.slice(
    currentIndex * itemsPerPage,
    currentIndex * itemsPerPage + itemsPerPage
  );

  return (
    <div className="max-w-7xl mx-auto p-6 relative">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-3xl font-bold">Discover Related Services</h2>
        <p className="text-gray-600">
          Find services similar to this service that match your preferences.
        </p>
      </div>

      {/* Service Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {visibleServices.map((service) => (
          <ServiceCard key={service.id} card={service} view="grid" />
        ))}
      </div>

      {/* Carousel Controls BELOW the cards */}
      <div className="flex flex-col items-center mt-6 gap-3">
        <div className="flex items-center gap-3">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className={`p-2 rounded-full transition-colors ${
              currentIndex === 0
                ? "text-gray-300 cursor-not-allowed"
                : "text-black hover:text-gray-700"
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
                  idx === currentIndex ? "bg-black" : "bg-gray-300"
                }`}
              ></button>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            disabled={currentIndex === maxIndex}
            className={`p-2 rounded-full transition-colors ${
              currentIndex === maxIndex
                ? "text-gray-300 cursor-not-allowed"
                : "text-black hover:text-gray-700"
            }`}
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RelatedService;
