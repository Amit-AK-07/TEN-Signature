import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServicesPage/ServiceCard"; // 👈 Import ServiceCard

const Services = () => {
  const [cards, setCards] = useState([]);
  const [sortOption, setSortOption] = useState("Newest");
  const [view, setView] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    axios
      .get("https://broki-clone-ui.onrender.com/api/service-list/")
      .then((response) => {
        console.log("API Response:", response.data);
        if (response.data && Array.isArray(response.data.data)) {
          setCards(response.data.data);
        } else {
          console.error("Unexpected API response format:", response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
      });
  }, []);

  const sortedCards = [...cards].sort((a, b) => {
    switch (sortOption) {
      case "Price Low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "Price High":
        return parseFloat(b.price) - parseFloat(a.price);
      case "Category A-Z":
        return a.category_name.localeCompare(b.category_name);
      case "Category Z-A":
        return b.category_name.localeCompare(a.category_name);
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
        <h1 className="text-[30px] sm:text-[36px] font-semibold text-left font-[poppins]">
          Professional Food Photography for Your F&B Business
        </h1>
        <div className="text-sm text-black-600 mt-5 font-[poppins]">
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
          <ServiceCard key={card.id} card={card} view={view} />
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
