import { useState, useEffect } from "react";
import { defaultFilters } from "../lib/Constant";
import FilterSidebar from "../components/FilterSidebar";
import ListingCard from "../components/ListingCard";
import Pagination from "../components/common/pagination/Pagination";

const Listing = () => {
  const [listings, setListings] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [appliedFilters, setAppliedFilters] = useState(defaultFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("Newest");
  const [viewType, setViewType] = useState("grid");
  const [totalPages, setTotalPages] = useState(1);

  const listingsPerPage = 20;

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    setCurrentPage(1);
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
    setCurrentPage(1);
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const params = new URLSearchParams();

        if (appliedFilters.city) {
          params.append("city", appliedFilters.city);
        }

        if (appliedFilters.category) {
          params.append("category", appliedFilters.category);
        }

        if (appliedFilters.property_for) {
          params.append("property_for", appliedFilters.property_for);
        }

        const min = appliedFilters.minPrice.replace(/[^\d]/g, "");
        const max = appliedFilters.maxPrice.replace(/[^\d]/g, "");
        if (min) params.append("price_min", min);
        if (max) params.append("price_max", max);

        params.append("page", currentPage);

        if (sortBy === "Price High") {
          params.append("ordering", "-price");
        } else if (sortBy === "Price Low") {
          params.append("ordering", "price");
        } else {
          params.append("ordering", "-id");
        }

        const response = await fetch(
          `http://127.0.0.1:8000/api/filter-property-list/?${params.toString()}`
        );
        const data = await response.json();

        setListings(data.results || []);
        setTotalPages(Math.ceil(data.count / listingsPerPage));
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, [appliedFilters, sortBy, currentPage]);

  return (
    <div className="p-4 sm:p-6 bg-white min-h-screen font-sans">
      <section>
        <div className="ml-at-1440 lg:ml-44 px-6 max-w-[1200px]">
          <h1 className="text-3xl font-bold mb-1 text-gray-900">
            Find the best listing for your brand
          </h1>
          <p className="text-sm text-gray-500 mb-6">Home / Listings</p>
        </div>

        <div
          className="listing-layout-md-exact px-6 max-w-[1200px]  mx-auto row gx-xl-5">
          {/* Sidebar */}
          <div className=" listing-form px-6 min-w-[370px] col-lg-4 d-none d-lg-block">
            <FilterSidebar
              filters={filters}
              onChange={handleFilterChange}
              onReset={resetFilters}
              onSearch={handleSearch}
            />
          </div>

          {/* Listings */}
          <section className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-5 ml-10 mb-4 gap-2 sm:gap-0">
              <p className="text-sm text-gray-500">
                Showing {listings.length ? (currentPage - 1) * listingsPerPage + 1 : 0}–
                {(currentPage - 1) * listingsPerPage + listings.length} of {totalPages * listingsPerPage} results
              </p>

              <div className="flex items-center space-x-3">
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
                  className={`text-sm px-2 py-1 rounded ${viewType === "grid" ? "underline text-gray-900" : "text-gray-500"}`}
                  onClick={() => setViewType("grid")}
                >
                  Grid
                </button>
                <button
                  className={`text-sm px-2 py-1 rounded ${viewType === "list" ? "underline text-gray-900" : "text-gray-500"}`}
                  onClick={() => setViewType("list")}
                >
                  List
                </button>
              </div>
            </div>

            {/* Listing cards */}
            <div
              className={`w-full grid gap-6 col-lg-8 px-6 mt-6 ${viewType === "grid" || viewType === "list"
                ? "grid-cols-1 sm:grid-cols-2"
                : ""}`}
            >
              {listings.map((item) => (
                <div key={item.id} className="w-full max-w-[500px] mx-auto">
                  <ListingCard data={item} type="listing" viewType={viewType} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </section>
        </div>
      </section>
    </div>
  );
};

export default Listing;
