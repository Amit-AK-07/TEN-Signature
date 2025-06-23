import React, { useState, useEffect } from "react";
import {
  faBolt,
  faUserCircle,
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { servicesData } from "../lib/Constant";

const Services = () => {
  const [cards, setCards] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setCards(servicesData);
  }, []);

  const sortedCards = [...cards].sort((a, b) => {
    switch (sortOption) {
      case "Price Low":
        return a.price - b.price;
      case "Price High":
        return b.price - a.price;
      case "Category A-Z":
        return a.category.localeCompare(b.category);
      case "Category Z-A":
        return b.category.localeCompare(a.category);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedCards.length / itemsPerPage);
  const paginatedCards = sortedCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="max-w-[1300px] mx-auto px-2 sm:px-4 py-10">
      <div className="mb-6">
        <h1 className="text-4xl font-bold text-left">
          Professional Food Photography for Your F&B Business
        </h1>
        <div className="text-sm text-black-600 mt-5">
          <Link to="/" className="text-black-600 hover:text-[#26c4a0]">
            Home
          </Link>{" "}
          / Food Photography
        </div>
      </div>

      {/* Sort & View Toggle */}
      <div className="flex justify-end items-center mb-6 gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <span className="font-light">Sort by</span>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="appearance-none bg-transparent pl-2 pr-1 py-1 font-medium text-black focus:outline-none"
            >
              <option>Newest</option>
              <option>Best Seller</option>
              <option>Best Match</option>
              <option>Price Low</option>
              <option>Price High</option>
              <option>Category A-Z</option>
              <option>Category Z-A</option>
            </select>
            <FontAwesomeIcon
              icon={faChevronDown}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        <div className="border-l h-4 mx-1"></div>

        <div className="flex gap-3 text-sm">
          <button
            onClick={() => setView("grid")}
            className={`font-medium ${
              view === "grid" ? "text-teal-500" : "text-gray-800"
            }`}
          >
            Grid
          </button>
          <button
            onClick={() => setView("list")}
            className={`font-medium ${
              view === "list" ? "text-teal-500" : "text-gray-800"
            }`}
          >
            List
          </button>
        </div>
      </div>

      {/* Cards */}
      <div
        className={`${
          view === "grid"
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            : "grid grid-cols-1 md:grid-cols-2 gap-6"
        }`}
      >
        {paginatedCards.map((card) => (
          <div
            key={card.serviceId}
            className={`bg-white shadow-md rounded-xl overflow-hidden ${
              view === "list" ? "flex" : "flex flex-col"
            }`}
          >
            <div className="relative group overflow-hidden">
              <img
                src={card.image}
                alt={card.name}
                className={` img-animattion ${
                  view === "list"
                    ? "w-100 h-52 object-cover group-hover:scale-105"
                    : "w-full h-56 object-cover group-hover:scale-105"
                }`}
              />
              <div className="absolute top-4 left-4 bg-[#26c4a0] text-white text-xs font-bold px-2 py-2 rounded flex items-center gap-1 shadow transition-all duration-300 ease-in-out group-hover:translate-y-full group-hover:opacity-0">
                <FontAwesomeIcon icon={faBolt} className="w-3.5 h-3.5" />
                FEATURED
              </div>
              <div className="absolute bottom-2 left-2 bg-white text-black text-sm font-semibold px-3 py-1 rounded shadow">
                ₹{card.price} /item
              </div>
            </div>

            <div className="p-4 flex flex-col justify-between gap-2 w-full">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  <Link
                    to={`/services/${card.serviceId}`}
                    className="text-sm font-semibold text-black hover:text-[#26c4a0] hover:underline"
                  >
                    Food Photography by {card.name}
                  </Link>
                </h3>
                <div className="flex items-center text-sm text-gray-500 gap-2 mt-1">
                  <span className="flex items-center gap-1">
                    <FontAwesomeIcon icon={faUserCircle} className="w-4 h-4" />
                    {card.name}
                  </span>
                  <span className="mx-1">•</span>
                  <span>{card.category}</span>
                </div>
              </div>

              <div className="border-t border-gray-300 pt-2 flex justify-between items-center text-sm text-gray-700">
                <span>On-Site Service</span>
                <Link
                  to={`/services/${card.serviceId}`}
                  className="text-sm font-semibold text-black hover:text-[]"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-10 gap-4 text-sm font-medium">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
            currentPage === 1
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#26c4a0] text-white hover:bg-[#26c4a0]"
          }`}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-4 h-4" />
        </button>
        <span className="flex items-center text-[#26c4a0] gap-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className={`flex items-center gap-1 px-2 py-1 rounded border transition-colors ${
            currentPage === totalPages
              ? "bg-gray-200 text-gray-400 cursor-not-allowed"
              : "bg-[#26c4a0] text-white hover:bg-[#26c4a0]"
          }`}
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Services;
