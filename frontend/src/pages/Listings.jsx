import React, { useState, useEffect, useMemo, useRef } from "react";
import { useLocation } from "react-router-dom";
import { defaultFilters } from "../lib/Constant";
import {
  fetchProperties,
  fetchCities,
  fetchCategories,
} from "../apiAction/properties/Index";
import FilterSidebar from "../components/FilterSidebar";
import ListingCard from "../components/ListingCard";
import Pagination from "../components/Pagination";
import { motion } from "framer-motion";

const Listing = () => {
  const location = useLocation();

  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const [viewType, setViewType] = useState("grid");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const listingsPerPage = 6;

  const didFetchFilters = useRef(false);

  // Parse filters from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const city = queryParams.get("city");
    const category = queryParams.get("category");
    const minPrice = queryParams.get("min_price");
    const maxPrice = queryParams.get("max_price");
    const propertyFor = queryParams.get("property_for");

    setFilters((prev) => ({
      ...prev,
      location: city || "",
      category: category || "",
      minPrice: minPrice || "",
      maxPrice: maxPrice || "",
      property_for: propertyFor || "",
    }));

    setCurrentPage(1);
  }, [location.search]);

  // Fetch cities & categories
  useEffect(() => {
    if (didFetchFilters.current) return;
    didFetchFilters.current = true;

    const fetchFilterData = async () => {
      try {
        const [citiesData, categoriesData] = await Promise.all([
          fetchCities(),
          fetchCategories(),
        ]);
        setCities(citiesData?.results || []);
        setCategories(categoriesData?.results || []);
      } catch (err) {
        console.error("Failed to fetch filters:", err);
        setError("Failed to load filter options.");
      }
    };

    fetchFilterData();
  }, []);

  // Fetch listings
  useEffect(() => {
    const fetchListings = async () => {
      if (
        !didFetchFilters.current ||
        cities.length === 0 ||
        categories.length === 0
      )
        return;

      setLoading(true);
      setError(null);

      try {
        const params = { page_size: 1000 };

        // Only send valid filters
        if (
          filters.location &&
          filters.location !== "" &&
          filters.location !== "All Locations"
        ) {
          params.city = filters.location;
        }

        if (
          filters.category &&
          filters.category !== "" &&
          filters.category !== "All Categories"
        ) {
          params.category = filters.category;
        }

        if (
          filters.property_for &&
          filters.property_for !== "" &&
          filters.property_for !== "All"
        ) {
          params.property_for = filters.property_for;
        }

        // Sorting
        if (sortBy === "Price Low") {
          params.ordering = "price";
        } else if (sortBy === "Price High") {
          params.ordering = "-price";
        } else {
          params.ordering = "-id";
        }

        const response = await fetchProperties(params);
        let results = response?.results || [];

        // Apply price filter client-side
        const minPrice = parseInt(
          filters.minPrice?.toString().replace(/[^\d]/g, "")
        );
        const maxPrice = parseInt(
          filters.maxPrice?.toString().replace(/[^\d]/g, "")
        );

        results = results.filter((item) => {
          const price = parseInt(item.price || 0);
          const meetsMin = !isNaN(minPrice) ? price >= minPrice : true;
          const meetsMax = !isNaN(maxPrice) ? price <= maxPrice : true;
          return meetsMin && meetsMax;
        });

        const paginated = results.slice(
          (currentPage - 1) * listingsPerPage,
          currentPage * listingsPerPage
        );

        setListings(paginated);
        setTotalCount(results.length);
        setTotalPages(Math.ceil(results.length / listingsPerPage));
      } catch (err) {
        console.error("Error fetching listings:", err);
        setError("Failed to load listings.");
        setListings([]);
        setTotalCount(0);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [filters, currentPage, sortBy, cities, categories]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const transformedListings = useMemo(() => {
    return listings.map((property) => ({
      id: property.id,
      price:
        property.price_format ||
        `property.price ? ₹${property.price} : "Price not available"`,
      name: property.name || "Unnamed Property",
      location:
        property.city?.name || property.city || property.location || "Unknown",
      sqft: property.sqft || null,
      image: property.property_image || "",
      featured: property.premium_property || false,
      type: property.property_for === 0 ? "For Rent" : "For Sale",
      description: property.description || "",
    }));
  }, [listings]);

  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <div className="pt-2 sm:p-6 bg-white min-h-screen font-sans">
        <section>
          <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold mb-1 text-gray-900">
              Find the best listing for your brand
            </h1>
            <p className="text-sm text-gray-500 mb-6">Home / Listings</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 px-4 sm:px-6 max-w-[1200px] mx-auto">
            {/* Sidebar */}
            <aside className="w-full lg:w-[370px]">
              <FilterSidebar
                filters={filters}
                onChange={handleFilterChange}
                onReset={resetFilters}
                cities={cities}
                categories={categories}
              />
            </aside>

            {/* Listings */}
            <section className="flex-1 w-full">
              <div className="flex flex-wrap justify-end sm:justify-between items-center mb-4 gap-2">
                <p className="text-sm text-gray-500">
                  {loading
                    ? "Loading..."
                    : `Showing ${totalCount} result${
                        totalCount === 1 ? "" : "s"
                      }`}
                </p>

                <div className="flex items-center gap-3">
                  <span className="text-gray-600 text-sm">Sort by</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                  >
                    <option>Newest</option>
                    <option>Price High</option>
                    <option>Price Low</option>
                  </select>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setViewType("grid")}
                      className={`text-sm font-medium ${
                        viewType === "grid"
                          ? "underline text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      Grid
                    </button>
                    <button
                      onClick={() => setViewType("list")}
                      className={`text-sm font-medium ${
                        viewType === "list"
                          ? "underline text-black"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      List
                    </button>
                  </div>
                </div>
              </div>

              {/* Cards */}
              {loading ? (
                <div className="text-center py-10">Loading listings...</div>
              ) : error ? (
                <div className="text-center text-red-500">{error}</div>
              ) : transformedListings.length === 0 ? (
                <div className="text-center py-10">No listings found.</div>
              ) : (
                <div
                  className={`grid gap-6 mt-6 ${
                    viewType === "grid"
                      ? "grid-cols-1 sm:grid-cols-2"
                      : "grid-cols-1"
                  }`}
                >
                  {transformedListings.map((item) => (
                    <ListingCard
                      key={item.id}
                      property={item}
                      viewType={viewType}
                    />
                  ))}
                </div>
              )}

              <div className="mt-6">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </section>
          </div>
        </section>
      </div>
    </motion.section>
  );
};

export default Listing;