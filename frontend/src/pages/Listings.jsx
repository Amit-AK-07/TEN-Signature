import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import FilterSidebar from "../components/FilterSidebar";
import ListingCard from "../components/ListingCard";
import Pagination from "../components/Pagination";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [cities, setCities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    location: "All Locations",
    category: "All Categories",
    minPrice: "",
    maxPrice: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const [viewType, setViewType] = useState("grid");

  const listingsPerPage = 6;

  // ✅ Fetch Listings with Rent/Sale Type
  useEffect(() => {
    axios
      .get("https://broki-clone-ui.onrender.com/api/filter-property-list/")
      .then((response) => {
        const apiData = response.data.results;

        const mappedListings = apiData.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price_format,
          location: item.city?.name || "Unknown",
          address: item.address,
          image: item.property_image || "https://via.placeholder.com/300",
          sqft: item.sqft,
          type: item.price_duration === "monthly" ? "For Rent" : "For Sale", // ✅ Correct Type
        }));

        setListings(mappedListings);
      })
      .catch((error) => console.error("Failed to fetch listings:", error));
  }, []);

  // Fetch cities
  useEffect(() => {
    axios
      .get("https://broki-clone-ui.onrender.com/api/cities/")
      .then((response) => setCities(response.data.results))
      .catch((error) => console.error("Failed to fetch cities:", error));
  }, []);

  // Fetch categories
  useEffect(() => {
    axios
      .get("https://broki-clone-ui.onrender.com/api/categories/")
      .then((response) => setCategories(response.data.results))
      .catch((error) => console.error("Failed to fetch categories:", error));
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      location: "All Locations",
      category: "All Categories",
      minPrice: "",
      maxPrice: "",
    });
    setCurrentPage(1);
  };

  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (filters.location !== "All Locations") {
      result = result.filter((item) => item.location === filters.location);
    }

    if (filters.category !== "All Categories") {
      result = result.filter((item) => item.category === filters.category);
    }

    const min = parseInt(filters.minPrice.replace(/[^\d]/g, "")) || 0;
    const max = parseInt(filters.maxPrice.replace(/[^\d]/g, "")) || Infinity;

    result = result.filter((item) => {
      const numericPrice = parseInt(item.price.replace(/[^\d]/g, "")) || 0;
      return numericPrice >= min && numericPrice <= max;
    });

    if (sortBy === "Newest") {
      result = result.reverse();
    } else if (sortBy === "Price Low") {
      result.sort(
        (a, b) =>
          parseInt(a.price.replace(/[^\d]/g, "")) -
          parseInt(b.price.replace(/[^\d]/g, ""))
      );
    } else if (sortBy === "Price High") {
      result.sort(
        (a, b) =>
          parseInt(b.price.replace(/[^\d]/g, "")) -
          parseInt(a.price.replace(/[^\d]/g, ""))
      );
    }

    return result;
  }, [listings, filters, sortBy]);

  const indexOfLast = currentPage * listingsPerPage;
  const indexOfFirst = indexOfLast - listingsPerPage;
  const currentListings = filteredListings.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredListings.length / listingsPerPage);

  return (
    <section>
      <div className="pt-2 sm:p-6 bg-white min-h-screen font-[poppins]">
        <section>
          <div className="px-4 sm:px-6 max-w-[1200px] mx-auto">
            <h1 className="text-[20px] sm:text-[30px] font-semibold mb-1 text-gray-900">
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
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
                <p className="text-sm text-gray-500">
                  Showing {indexOfFirst + 1}–
                  {Math.min(indexOfLast, filteredListings.length)} of{" "}
                  {filteredListings.length} results
                </p>

                <div className="flex flex-wrap items-center gap-2">
                  <label className="text-sm text-gray-600">Sort by</label>
                  <select
                    className="border rounded px-2 py-1 text-sm"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option>Newest</option>
                    <option>Price High</option>
                    <option>Price Low</option>
                  </select>

                  <button
                    className={`text-sm px-2 py-1 rounded ${
                      viewType === "grid"
                        ? "underline text-gray-900"
                        : "text-gray-500"
                    }`}
                    onClick={() => setViewType("grid")}
                  >
                    Grid
                  </button>
                  <button
                    className={`text-sm px-2 py-1 rounded ${
                      viewType === "list"
                        ? "underline text-gray-900"
                        : "text-gray-500"
                    }`}
                    onClick={() => setViewType("list")}
                  >
                    List
                  </button>
                </div>
              </div>

              {/* Cards */}
              <div
                className={`grid gap-6 mt-6 ${
                  viewType === "grid"
                    ? "grid-cols-1 sm:grid-cols-2"
                    : "grid-cols-1"
                }`}
              >
                {currentListings.map((item) => (
                  <div key={item.id} className="w-full">
                    <ListingCard property={item} viewType={viewType} />
                  </div>
                ))}
              </div>

              {/* Pagination */}
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
    </section>
  );
};

export default Listing;
